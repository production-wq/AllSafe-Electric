'use client';

import { useEffect, useState } from 'react';
import type { ReviewsPayload } from '@/lib/reviews';
import { track } from '@/lib/analytics';
import { Stars, GoogleG } from './Icons';

/**
 * Homepage social-proof strip, planning/docs/09 §1.9 (client audit, 2026-09-11:
 * "show those reviews as a scrolling widget"). Same live data source and 6h
 * refresh as the full grid on /reviews/ (components/Reviews.tsx) — Google's
 * Places API only returns up to 5 reviews per place, so this auto-updates
 * whenever those 5 change, it does not attempt to show all 148.
 *
 * A continuous CSS marquee, not JS-driven, so it never blocks the main thread.
 * The track is the review list duplicated once so the loop point is seamless.
 * Pauses on hover/focus so a review can actually be read, and collapses to the
 * "no motion" first-frame under prefers-reduced-motion (globals.css already
 * zeroes animation-duration site-wide for that).
 */
export function ReviewsMarquee({ initial }: { initial: ReviewsPayload }) {
  const [data, setData] = useState(initial);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/reviews/', { headers: { accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((json: ReviewsPayload | null) => {
        if (!cancelled && json?.reviews?.length) setData(json);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const reviews = data.reviews.slice(0, 5);
  if (reviews.length === 0) return null;

  const track_ = [...reviews, ...reviews];

  return (
    <section aria-labelledby="marquee-heading" className="border-y border-rule bg-paper py-10">
      <div className="container-page">
        <p id="marquee-heading" className="eyebrow eyebrow-center mb-6 flex items-center justify-center gap-2">
          <GoogleG /> Live from Google, {data.totalReviewCount} five-star reviews
        </p>
      </div>
      <div className="reviews-marquee group">
        <div className="reviews-marquee-track">
          {track_.map((r, i) => (
            <a
              key={i}
              href={r.sourceUrl}
              target="_blank"
              rel="noopener"
              onClick={() => track.clickGbp('homepage_marquee')}
              className="card mx-3 flex w-[320px] shrink-0 flex-col p-5 text-left transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold leading-tight">{r.authorName}</p>
                <Stars rating={Math.round(r.rating)} size={14} />
              </div>
              <blockquote className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-grey">
                {r.text.length > 140 ? `${r.text.slice(0, 140)}…` : r.text}
              </blockquote>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
