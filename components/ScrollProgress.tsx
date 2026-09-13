'use client';

import { useEffect, useRef } from 'react';

/**
 * Thin reading-progress bar pinned under the header, added 2026-09-14 for the
 * premium pass. Purely decorative feedback, so it is aria-hidden and never
 * announced.
 *
 * FAILS OPEN in the sense that matters here: if JS never runs the bar simply
 * stays at zero width and nothing else on the page is affected. It is removed
 * entirely under prefers-reduced-motion, where a constantly-moving element is
 * exactly what the setting is asking us not to do.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let ticking = false;

    const apply = () => {
      ticking = false;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      bar.style.transform = `scaleX(${pct.toFixed(4)})`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 h-[3px]"
      style={{ zIndex: 'var(--z-overlay)' }}
    >
      <div
        ref={ref}
        className="h-full origin-left bg-gradient-to-r from-green-600 via-green-500 to-blue-600"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
