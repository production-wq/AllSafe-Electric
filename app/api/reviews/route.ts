import { NextResponse } from 'next/server';
import { getReviews } from '@/lib/reviews';

/**
 * Live Google reviews feed, planning/docs/07 §5.
 * ISR: revalidate every 6 hours. Keeps us inside the Places API caching terms and
 * keeps every marketing page static. The API key stays server-side.
 */
export const revalidate = 21600;
export const dynamic = 'force-static';

export async function GET() {
  const payload = await getReviews();
  return NextResponse.json(payload, {
    headers: {
      'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400',
    },
  });
}
