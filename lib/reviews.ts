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
}

export interface ReviewsPayload {
  reviews: Review[];
  /** Whether the data came from the live API (true) or the fallback snapshot (false). */
  live: boolean;
  profileUrl: string;
  writeReviewUrl: string;
  fetchedAt: string;
}

const PLACES_ENDPOINT = 'https://places.googleapis.com/v1/places';

async function fetchFromPlaces(): Promise<Review[] | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;

  try {
    const res = await fetch(`${PLACES_ENDPOINT}/${encodeURIComponent(placeId)}`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'reviews',
      },
      // The route handler is ISR (revalidate 6h); align the upstream fetch cache.
      next: { revalidate: 21600 },
    });
    if (!res.ok) {
      console.warn('[reviews] Places API returned', res.status);
      return null;
    }
    const data = (await res.json()) as {
      reviews?: Array<{
        rating?: number;
        text?: { text?: string };
        originalText?: { text?: string };
        authorAttribution?: { displayName?: string; photoUri?: string; uri?: string };
        relativePublishTimeDescription?: string;
        publishTime?: string;
      }>;
    };
    if (!data.reviews?.length) return [];
    return data.reviews.slice(0, 5).map((r) => ({
      authorName: r.authorAttribution?.displayName ?? 'Google user',
      authorPhotoUrl: r.authorAttribution?.photoUri,
      rating: r.rating ?? 5,
      text: (r.text?.text ?? r.originalText?.text ?? '').trim(),
      relativeTime: r.relativePublishTimeDescription ?? '',
      publishTime: r.publishTime,
      sourceUrl: r.authorAttribution?.uri ?? business.google.profileUrl,
    }));
  } catch (err) {
    console.warn('[reviews] Places API fetch failed:', (err as Error).message);
    return null;
  }
}

async function fallbackSnapshot(): Promise<Review[]> {
  try {
    const raw = await readFile(join(process.cwd(), 'data', 'reviews.fallback.json'), 'utf8');
    const parsed = JSON.parse(raw) as { reviews?: Review[] };
    return Array.isArray(parsed.reviews) ? parsed.reviews.slice(0, 5) : [];
  } catch {
    return [];
  }
}

/**
 * Synchronous build-time snapshot. Used by SSG pages so they stay fully static.
 * The client <Reviews> component then refreshes from /api/reviews/ (the ISR route).
 */
export function getFallbackReviewsSync(): ReviewsPayload {
  let reviews: Review[] = [];
  try {
    const raw = readFileSync(join(process.cwd(), 'data', 'reviews.fallback.json'), 'utf8');
    const parsed = JSON.parse(raw) as { reviews?: Review[] };
    if (Array.isArray(parsed.reviews)) reviews = parsed.reviews.slice(0, 5);
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
  const live = await fetchFromPlaces();
  const reviews = live && live.length ? live : await fallbackSnapshot();
  return {
    reviews,
    live: Boolean(live && live.length),
    profileUrl: business.google.profileUrl,
    writeReviewUrl: business.google.writeReviewUrl,
    fetchedAt: new Date().toISOString(),
  };
}
