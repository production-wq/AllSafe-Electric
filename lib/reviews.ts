import 'server-only';
import { readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { business } from './business';

/**
 * Live Google reviews via the Featurable API, rendered SERVER-SIDE.
 * Revision doc §4.2.
 *
 * Why this shape:
 *  - Server-side fetch, not Featurable's JS embed or <ReactGoogleReviews />,
 *    so reviews are in the server-rendered HTML and therefore crawlable.
 *  - Revalidated on a 12h ISR window. Featurable itself refreshes from Google
 *    roughly every 48h, so anything tighter just burns requests.
 *  - Every review is auto-tagged by keyword so a service page can ask for the
 *    reviews that actually relate to it (§1.10), with a manual override map for
 *    anything the keywords miss.
 *  - Falls back to the last-known snapshot on failure rather than blanking the
 *    section (§4.2 "fail gracefully").
 *  - No Review / aggregateRating JSON-LD is emitted from this data. Self-serving
 *    review markup on a LocalBusiness page is not eligible for star rich results
 *    (§4.2, planning/docs/06 §3).
 *
 * TWO BUGS FIXED HERE, 2026-09-16. The previous version never returned live
 * data for either of these reasons:
 *  1. It requested `/api/v1/widgets/{id}` with no trailing slash, which answers
 *     308 rather than 200.
 *  2. It mapped fields that do not exist on the response. Featurable passes the
 *     Google Business Profile shape through: `reviewer.displayName`,
 *     `starRating`, `comment`, `createTime` — not `author` / `rating` / `text`.
 */

export interface Review {
  id: string;
  authorName: string;
  authorPhotoUrl?: string;
  rating: number; // 1-5
  text: string;
  publishTime?: string;
  /** Human-readable age, derived from publishTime. */
  relativeTime?: string;
  sourceUrl: string;
  tags: string[];
}

export interface ReviewsPayload {
  reviews: Review[];
  live: boolean;
  profileUrl: string;
  writeReviewUrl: string;
  fetchedAt: string;
  /** Live average from Google. Falls back to the documented figure. */
  averageRating: number;
  /** Live total from Google, which is larger than the number of reviews that
   * carry written text. Badges site-wide should use this. */
  totalReviewCount: number;
}

/** Keyword taxonomy per revision doc §4.2. Order does not matter; a review can
 * carry several tags. Keep terms lowercase. */
const TAG_KEYWORDS: Record<string, string[]> = {
  panel: ['panel', 'breaker', 'federal pacific', 'zinsco', '200a', 'fuse box', 'heavy up', 'service upgrade', 'sub panel', 'subpanel'],
  'ev-charger': ['ev charger', 'ev ', 'charger', 'tesla', 'electric vehicle', 'car charger'],
  emergency: ['emergency', 'outage', 'spark', 'burning', 'urgent', 'same day', 'right away', 'no power', 'lost power'],
  wiring: ['wiring', 'rewire', 'rewiring', 'aluminum', 'circuit', 'wire'],
  outlets: ['outlet', 'gfci', 'usb', 'receptacle', 'plug'],
  switches: ['switch', 'dimmer'],
  lighting: ['light', 'lighting', 'fixture', 'recessed', 'chandelier', 'can light', 'sconce'],
  fans: ['fan'],
  generator: ['generator', 'generac', 'standby power'],
  'hot-tub': ['hot tub', 'spa', 'jacuzzi'],
  inspection: ['inspection', 'inspector', 'code', 'permit'],
  'smoke-detector': ['smoke detector', 'smoke alarm', 'carbon monoxide', 'co detector'],
  'home-automation': ['smart home', 'automation', 'doorbell', 'thermostat'],
};

/**
 * Manual tag overrides, keyed by Featurable/Google reviewId (§4.2).
 * For reviews the keyword pass misses or mis-classifies. Empty is fine.
 */
const MANUAL_TAGS: Record<string, string[]> = {};

/** "3 days ago" style age from an ISO timestamp. */
function relativeTimeFrom(iso?: string): string | undefined {
  if (!iso) return undefined;
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return undefined;
  const days = Math.floor((Date.now() - then) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return months === 1 ? 'a month ago' : `${months} months ago`;
  const years = Math.floor(months / 12);
  return years === 1 ? 'a year ago' : `${years} years ago`;
}

function autoTag(text: string, reviewId: string): string[] {
  const manual = MANUAL_TAGS[reviewId];
  if (manual?.length) return manual;
  const lower = ` ${text.toLowerCase()} `;
  const tags = new Set<string>();
  for (const [tag, keywords] of Object.entries(TAG_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) tags.add(tag);
  }
  return Array.from(tags);
}

interface FeaturableReview {
  reviewId?: string;
  reviewer?: { displayName?: string; profilePhotoUrl?: string };
  starRating?: number;
  comment?: string;
  createTime?: string;
}

interface FeaturableResponse {
  success?: boolean;
  reviews?: FeaturableReview[];
  hiddenReviews?: string[];
  totalReviewCount?: number;
  averageRating?: number;
}

async function fetchFromFeaturable(): Promise<{
  reviews: Review[];
  averageRating?: number;
  totalReviewCount?: number;
} | null> {
  const widgetId = process.env.FEATURABLE_WIDGET_ID;
  if (!widgetId) return null;

  try {
    // NOTE the trailing slash. Without it the API answers 308.
    const res = await fetch(
      `https://featurable.com/api/v1/widgets/${encodeURIComponent(widgetId)}/`,
      { next: { revalidate: 43200 } } // 12h
    );
    if (!res.ok) {
      console.warn('[reviews] Featurable API returned', res.status);
      return null;
    }

    const data = (await res.json()) as FeaturableResponse;
    const hidden = new Set(data.hiddenReviews ?? []);

    const mapped: Review[] = (data.reviews ?? [])
      .filter((r) => r.reviewId && !hidden.has(r.reviewId))
      .filter((r) => (r.comment ?? '').trim().length > 0)
      .map((r) => {
        const id = r.reviewId as string;
        const text = (r.comment ?? '').trim();
        return {
          id,
          authorName: r.reviewer?.displayName?.trim() || 'Google user',
          authorPhotoUrl: r.reviewer?.profilePhotoUrl,
          rating: typeof r.starRating === 'number' ? r.starRating : 5,
          text,
          publishTime: r.createTime,
          relativeTime: relativeTimeFrom(r.createTime),
          sourceUrl: business.google.profileUrl,
          tags: autoTag(text, id),
        };
      })
      // Newest first, so "recent" fallbacks really are recent.
      .sort((a, b) => (b.publishTime ?? '').localeCompare(a.publishTime ?? ''));

    return {
      reviews: mapped,
      averageRating: data.averageRating,
      totalReviewCount: data.totalReviewCount,
    };
  } catch (err) {
    console.warn('[reviews] Featurable fetch failed:', (err as Error).message);
    return null;
  }
}

function normalizeSnapshot(raw: unknown): Review[] {
  const parsed = raw as { reviews?: Partial<Review>[] };
  if (!Array.isArray(parsed?.reviews)) return [];
  return parsed.reviews
    .filter((r) => (r.text ?? '').trim().length > 0)
    .map((r, i) => {
      const id = r.id ?? `snapshot-${i}`;
      const text = (r.text ?? '').trim();
      return {
        id,
        authorName: r.authorName ?? 'Google user',
        authorPhotoUrl: r.authorPhotoUrl,
        rating: r.rating ?? 5,
        text,
        publishTime: r.publishTime,
        relativeTime: r.relativeTime ?? relativeTimeFrom(r.publishTime),
        sourceUrl: business.google.profileUrl,
        tags: r.tags?.length ? r.tags : autoTag(text, id),
      };
    });
}

async function fallbackSnapshot(): Promise<Review[]> {
  try {
    const raw = await readFile(join(process.cwd(), 'data', 'reviews.fallback.json'), 'utf8');
    return normalizeSnapshot(JSON.parse(raw));
  } catch {
    return [];
  }
}

/** Sync snapshot read, for the few call sites that cannot await. */
export function getFallbackReviewsSync(): ReviewsPayload {
  let reviews: Review[] = [];
  try {
    const raw = readFileSync(join(process.cwd(), 'data', 'reviews.fallback.json'), 'utf8');
    reviews = normalizeSnapshot(JSON.parse(raw));
  } catch {
    /* empty state renders */
  }
  return {
    reviews,
    live: false,
    profileUrl: business.google.profileUrl,
    writeReviewUrl: business.google.writeReviewUrl,
    fetchedAt: new Date(0).toISOString(),
    averageRating: business.google.averageRating,
    totalReviewCount: business.google.reviewCount,
  };
}

export async function getReviews(): Promise<ReviewsPayload> {
  const live = await fetchFromFeaturable();
  const reviews = live?.reviews?.length ? live.reviews : await fallbackSnapshot();
  return {
    reviews,
    live: Boolean(live?.reviews?.length),
    profileUrl: business.google.profileUrl,
    writeReviewUrl: business.google.writeReviewUrl,
    fetchedAt: new Date().toISOString(),
    // Live figures win; the documented values are the floor so a failed fetch
    // never renders "0 reviews".
    averageRating: live?.averageRating ?? business.google.averageRating,
    totalReviewCount: live?.totalReviewCount ?? business.google.reviewCount,
  };
}

/**
 * Reviews relevant to a given set of service tags, newest first.
 *
 * Falls back to the most recent 5-star reviews when there are not enough tag
 * matches, so a page never renders an empty or one-item section (§4.2).
 */
export async function getReviewsForServices(
  tags: string[],
  limit = 3
): Promise<{ reviews: Review[]; payload: ReviewsPayload }> {
  const payload = await getReviews();
  if (tags.length === 0) {
    return { reviews: payload.reviews.slice(0, limit), payload };
  }

  const matched = payload.reviews.filter((r) => r.tags.some((t) => tags.includes(t)));
  const rest = payload.reviews.filter((r) => !matched.includes(r));
  const topped = [...matched, ...rest.filter((r) => r.rating >= 5)].slice(0, limit);

  return { reviews: topped, payload };
}
