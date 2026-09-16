import 'server-only';
import { readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { business } from './business';

/**
 * Live Google reviews, planning/docs/07 §5.
 *
 * - Google Places API (New), `reviews` field, SERVER-SIDE ONLY. The key never
 *   reaches the browser.
 * - Consumed by app/api/reviews/route.ts with ISR revalidate = 21600 (6h), which
 *   keeps us inside the Places API caching terms and keeps pages static.
 * - Up to FIVE reviews. Do not build UI implying more.
 * - Falls back to data/reviews.fallback.json (a build-time snapshot) so an API
 *   outage never blanks the section. If that is empty too, the component renders
 *   a "read our reviews on Google" state.
 * - NO aggregateRating / Review schema is emitted from this data. Marking up
 *   third-party reviews as first-party is a guideline violation (planning/docs/06 §3).
 */

export interface Review {
  authorName: string;
  authorPhotoUrl?: string;
  rating: number; // 1–5
  text: string;
  relativeTime: string;
  publishTime?: string;
  sourceUrl: string;
  tags?: string[];
}

export interface ReviewsPayload {
  reviews: Review[];
  live: boolean;
  profileUrl: string;
  writeReviewUrl: string;
  fetchedAt: string;
  averageRating?: number;
  totalReviewCount?: number;
}

const TAG_KEYWORDS: Record<string, string[]> = {
  panel: ['panel', 'breaker', 'fuse', 'heavy up', 'service upgrade'],
  'ev-charger': ['ev', 'charger', 'tesla', 'electric vehicle'],
  emergency: ['emergency', 'urgent', 'fast', 'quick', 'immediate', 'same day', 'weekend'],
  lighting: ['light', 'lighting', 'chandelier', 'fixture'],
  wiring: ['wiring', 'aluminum', 'rewire', 'circuit'],
};

function autoTag(text: string): string[] {
  const lower = text.toLowerCase();
  const tags = new Set<string>();
  for (const [tag, keywords] of Object.entries(TAG_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      tags.add(tag);
    }
  }
  return Array.from(tags);
}

async function fetchFromFeaturable(): Promise<{ reviews: Review[]; averageRating?: number; totalReviewCount?: number } | null> {
  const widgetId = process.env.FEATURABLE_WIDGET_ID;
  if (!widgetId) return null;

  try {
    const res = await fetch(`https://featurable.com/api/v1/widgets/${encodeURIComponent(widgetId)}`, {
      next: { revalidate: 21600 },
    });
    if (!res.ok) {
      console.warn('[reviews] Featurable API returned', res.status);
      return null;
    }
    const data = await res.json() as {
      reviews?: Array<{
        author?: string;
        rating?: number;
        text?: string;
        publishTime?: string;
      }>;
      averageRating?: number;
      totalReviewCount?: number;
    };
    if (!data.reviews?.length) return { reviews: [], averageRating: data.averageRating, totalReviewCount: data.totalReviewCount };
    
    const mapped = data.reviews.map((r) => ({
      authorName: r.author ?? 'Google user',
      rating: r.rating ?? 5,
      text: r.text?.trim() ?? '',
      relativeTime: '',
      publishTime: r.publishTime,
      sourceUrl: business.google.profileUrl,
      tags: autoTag(r.text ?? ''),
    }));
    return { reviews: mapped, averageRating: data.averageRating, totalReviewCount: data.totalReviewCount };
  } catch (err) {
    console.warn('[reviews] Featurable API fetch failed:', (err as Error).message);
    return null;
  }
}

async function fallbackSnapshot(): Promise<Review[]> {
  try {
    const raw = await readFile(join(process.cwd(), 'data', 'reviews.fallback.json'), 'utf8');
    const parsed = JSON.parse(raw) as { reviews?: Review[] };
    return Array.isArray(parsed.reviews) ? parsed.reviews : [];
  } catch {
    return [];
  }
}

export function getFallbackReviewsSync(): ReviewsPayload {
  let reviews: Review[] = [];
  try {
    const raw = readFileSync(join(process.cwd(), 'data', 'reviews.fallback.json'), 'utf8');
    const parsed = JSON.parse(raw) as { reviews?: Review[] };
    if (Array.isArray(parsed.reviews)) reviews = parsed.reviews.map(r => ({ ...r, tags: autoTag(r.text) }));
  } catch {
    /* empty state renders */
  }
  return {
    reviews,
    live: false,
    profileUrl: business.google.profileUrl,
    writeReviewUrl: business.google.writeReviewUrl,
    fetchedAt: new Date(0).toISOString(),
  };
}

export async function getReviews(): Promise<ReviewsPayload> {
  const liveData = await fetchFromFeaturable();
  const reviews = liveData?.reviews?.length ? liveData.reviews : await fallbackSnapshot();
  return {
    reviews,
    live: Boolean(liveData?.reviews?.length),
    profileUrl: business.google.profileUrl,
    writeReviewUrl: business.google.writeReviewUrl,
    fetchedAt: new Date().toISOString(),
    averageRating: liveData?.averageRating,
    totalReviewCount: liveData?.totalReviewCount,
  };
}
