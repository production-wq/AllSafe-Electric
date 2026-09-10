/**
 * Build-time Google reviews snapshot — planning/docs/07 §5.
 *
 *   npm run fetch:reviews
 *
 * Pulls up to 5 reviews from the Google Places API (New) and writes them to
 * data/reviews.fallback.json. This snapshot is what the site ships with and what
 * it falls back to if the live ISR route ever fails. The API key is read from
 * .env.local (GOOGLE_PLACES_API_KEY) and never leaves this process.
 *
 * NO review text is ever hand-written into that file. If this script has no key,
 * the reviews section renders a "read on Google" state — which is honest and fine.
 */
import 'dotenv/config';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const OUT = join(process.cwd(), 'data', 'reviews.fallback.json');

async function main() {
  if (!KEY || !PLACE_ID) {
    console.error(
      'GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID must be set in .env.local.\n' +
        'Request the Place ID from the account manager (planning/docs/99 #6).\n' +
        'Skipping — the site will show the "read on Google" state until this runs.'
    );
    process.exit(1);
  }

  const res = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}`,
    {
      headers: {
        'X-Goog-Api-Key': KEY,
        'X-Goog-FieldMask': 'displayName,rating,userRatingCount,reviews',
      },
    }
  );
  if (!res.ok) {
    console.error(`Places API ${res.status}: ${await res.text()}`);
    process.exit(1);
  }
  const data = (await res.json()) as {
    rating?: number;
    userRatingCount?: number;
    reviews?: Array<{
      rating?: number;
      text?: { text?: string };
      originalText?: { text?: string };
      authorAttribution?: { displayName?: string; photoUri?: string; uri?: string };
      relativePublishTimeDescription?: string;
      publishTime?: string;
    }>;
  };

  const reviews = (data.reviews ?? []).slice(0, 5).map((r) => ({
    authorName: r.authorAttribution?.displayName ?? 'Google user',
    authorPhotoUrl: r.authorAttribution?.photoUri,
    rating: r.rating ?? 5,
    text: (r.text?.text ?? r.originalText?.text ?? '').trim(),
    relativeTime: r.relativePublishTimeDescription ?? '',
    publishTime: r.publishTime,
    sourceUrl: r.authorAttribution?.uri ?? `https://www.google.com/maps?cid=`,
  }));

  await writeFile(
    OUT,
    JSON.stringify(
      {
        _comment:
          'Build-time snapshot from the Google Places API. Regenerate with `npm run fetch:reviews`. Do not hand-edit review text.',
        fetchedAt: new Date().toISOString(),
        rating: data.rating ?? null,
        ratingCount: data.userRatingCount ?? null,
        reviews,
      },
      null,
      2
    ) + '\n'
  );
  console.log(`✓ wrote ${reviews.length} reviews → data/reviews.fallback.json`);
  console.log('  (Reminder: do NOT emit aggregateRating / Review schema from this — docs/06 §3.)');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
