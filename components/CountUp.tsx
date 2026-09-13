'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Animated counter for stat numbers, client request 2026-09-13 ("the numbers
 * going up or something like those").
 *
 * FAILS OPEN, same rule as components/Reveal.tsx: the final value is what
 * renders server-side and what stays on screen if JS is blocked, the observer
 * never fires, or the visitor prefers reduced motion. The animation is strictly
 * an enhancement layered on top of a correct static value.
 *
 * `value` is the display string, so it handles "148", "8+", "A+" and "Same-Day"
 * alike: the leading number is animated and any prefix/suffix is preserved.
 * Values with no leading number render untouched.
 */
export function CountUp({
  value,
  durationMs = 1600,
  className = '',
}: {
  value: string;
  durationMs?: number;
  className?: string;
}) {
  const parsed = value.match(/^(\D*?)([\d,]+)(.*)$/);
  const prefix = parsed?.[1] ?? '';
  const target = parsed ? Number(parsed[2].replace(/,/g, '')) : null;
  const suffix = parsed?.[3] ?? '';

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (target === null || !Number.isFinite(target)) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let started = false;

    const run = () => {
      started = true;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / durationMs, 1);
        // easeOutExpo: fast start, soft landing on the real number
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        const current = Math.round(target * eased);
        setDisplay(`${prefix}${current.toLocaleString('en-US')}${suffix}`);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setDisplay(`${prefix}0${suffix}`);
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, prefix, suffix, durationMs]);

  // The accessible name stays the final value regardless of animation frame.
  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
