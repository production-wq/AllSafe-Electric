'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { ReviewsPayload } from '@/lib/reviews';
import { track } from '@/lib/analytics';
import { Stars, GoogleG } from './Icons';
import { business } from '@/lib/business';

/**
 * Live Google reviews, planning/docs/07 §5.
 * - Build-time snapshot is passed as `initial` (SSR content); the client refreshes
 *   from /api/reviews (the ISR route, revalidate 6h).
 * - Google attribution is mandatory: the G mark + "Google review", names and photos
 *   unaltered, each linked to the GBP.
 * - Degrades to a "read on Google" card when there is nothing to show.
 * - NO Review / aggregateRating schema is emitted from this data.
 */
export function Reviews({ initial }: { initial: ReviewsPayload }) {
  const [data, setData] = useState(initial);
  const sectionRef = useRef<HTMLElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/reviews/', { headers: { accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((json: ReviewsPayload | null) => {
        if (!cancelled && json?.reviews) setData(json);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.5 && !firedRef.current) {
            firedRef.current = true;
            track.viewReviews();
          }
        });
      },
      { threshold: [0.5] }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const reviews = data.reviews.slice(0, 5);

  return (
    <section ref={sectionRef} aria-labelledby="reviews-heading" className="section bg-paper">
      <div className="container-page">
        <p className="eyebrow flex items-center gap-2">
          <GoogleG /> Google reviews
        </p>
        <h2 id="reviews-heading" className="mt-1 text-h2">
          What Parker neighbours say about Jud
        </h2>

        {reviews.length > 0 ? (
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <li key={i} className="card flex flex-col p-6">
                <div className="flex items-center gap-3">
                  {r.authorPhotoUrl ? (
                    <Image
                      src={r.authorPhotoUrl}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full"
                      unoptimized
                    />
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600/10 font-semibold text-brand-600">
                      {r.authorName.charAt(0)}
                    </span>
                  )}
                  <div>
                    <p className="font-semibold leading-tight">{r.authorName}</p>
                    <p className="text-[0.85rem] text-muted">{r.relativeTime}</p>
                  </div>
                </div>
                <Stars rating={Math.round(r.rating)} className="mt-3" />
                <blockquote className="review-text mt-3 flex-1 text-[1.05rem] leading-relaxed">
                  {r.text.length > 320 ? `${r.text.slice(0, 320)}…` : r.text}
                </blockquote>
                <a
                  href={r.sourceUrl}
                  target="_blank"
                  rel="noopener"
                  onClick={() => track.clickGbp('reviews')}
                  className="mt-4 inline-flex items-center gap-1.5 text-[0.85rem] text-muted hover:text-brand-700"
                >
                  <GoogleG /> Google review
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 card flex flex-col items-start gap-4 p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="flex items-center gap-2 text-h3 font-semibold">
                <GoogleG /> Read the reviews on Google
              </p>
              <p className="mt-2 max-w-lg text-muted">
                Allsafe Electric&apos;s Google reviews name Jud and Justin by name. The live feed loads
                here once connected. Until then, they are all on the Google Business Profile.
              </p>
            </div>
            <a
              href={business.google.profileUrl}
              target="_blank"
              rel="noopener"
              onClick={() => track.clickGbp('reviews')}
              className="btn btn-secondary shrink-0"
            >
              See Google reviews
            </a>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={data.profileUrl}
            target="_blank"
            rel="noopener"
            onClick={() => track.clickGbp('reviews')}
            className="link-cta"
          >
            See all reviews on Google
          </a>
          <a href={data.writeReviewUrl} target="_blank" rel="noopener" className="link-cta">
            Leave a review
          </a>
        </div>
        <p className="mt-3 text-[0.8rem] text-muted">
          Reviews are shown as returned by Google, unedited and in order. Allsafe Electric does not
          select or filter them.
        </p>
      </div>
    </section>
  );
}
