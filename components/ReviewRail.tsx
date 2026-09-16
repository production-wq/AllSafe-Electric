'use client';

import { useEffect, useRef, useState } from 'react';
import type { Review } from '@/lib/reviews';
import { ReviewCard } from './ReviewCard';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';

/**
 * Horizontally scrollable rail of review cards, client request 2026-09-17
 * ("make these reviews on the home page and on the service area and service
 * pages left-to-right scrollable").
 *
 * Built on native overflow scrolling with CSS scroll-snap rather than a
 * carousel library, which means:
 *  - it works with no JS (the cards are just a scrollable row),
 *  - touch/trackpad swipe is the platform's own, so it feels right on mobile,
 *  - the container is focusable, so keyboard users can scroll it with arrow keys.
 *
 * JS only adds the two arrow buttons and their disabled states. They are
 * aria-hidden because the rail itself is already reachable and operable by
 * keyboard; exposing them would just add duplicate stops.
 */
export function ReviewRail({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const sync = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [reviews.length]);

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // Scroll by roughly one card, so a click always lands on a new card.
    const card = el.querySelector('[data-review-card]') as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  if (reviews.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-label="Customer reviews, scroll for more"
        className="review-rail flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {reviews.map((r) => (
          <div
            key={r.id}
            data-review-card
            className="w-[86%] shrink-0 snap-start sm:w-[22rem] lg:w-[24rem]"
          >
            <ReviewCard review={r} />
          </div>
        ))}
      </div>

      {/* Arrows are supplementary; the rail itself is keyboard scrollable. */}
      <div aria-hidden className="mt-4 hidden justify-end gap-2 sm:flex">
        <button
          type="button"
          onClick={() => nudge(-1)}
          disabled={!canLeft}
          tabIndex={-1}
          className="flex h-10 w-10 items-center justify-center rounded-pill border border-rule bg-white text-ink transition-colors hover:border-blue-300 hover:bg-blue-50 disabled:cursor-default disabled:opacity-35 disabled:hover:border-rule disabled:hover:bg-white"
        >
          <ArrowLeftIcon width={18} height={18} />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          disabled={!canRight}
          tabIndex={-1}
          className="flex h-10 w-10 items-center justify-center rounded-pill border border-rule bg-white text-ink transition-colors hover:border-blue-300 hover:bg-blue-50 disabled:cursor-default disabled:opacity-35 disabled:hover:border-rule disabled:hover:bg-white"
        >
          <ArrowRightIcon width={18} height={18} />
        </button>
      </div>
    </div>
  );
}
