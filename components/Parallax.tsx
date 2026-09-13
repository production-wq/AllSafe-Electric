'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Subtle scroll-linked parallax, client request (2026-09-14: "I need entrance
 * animation, parallax animation, hover animations, these kind of things that
 * makes the website looks premium").
 *
 * FAILS OPEN, same rule as Reveal.tsx and CountUp.tsx: the child renders at its
 * natural position with no transform at all unless JS is running, the viewport
 * is wide enough to be worth it, and the visitor has not asked for reduced
 * motion. Nothing is ever hidden or displaced in a way that could strand
 * content off-screen.
 *
 * Movement is deliberately small (default 40px across the whole scroll pass)
 * and applied to an inner wrapper that is scaled slightly, so the translate can
 * never expose an empty edge where the image used to be.
 */
export function Parallax({
  children,
  /** Total travel in px across the element's full pass through the viewport. */
  distance = 40,
  className = '',
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Not worth the scroll work on small screens, where it mostly reads as jitter.
    if (window.innerWidth < 768) return;

    let raf = 0;
    let ticking = false;

    const apply = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      // -1 when the element is entering at the bottom, +1 when leaving at the top.
      const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      const offset = Math.max(-1, Math.min(1, progress)) * (distance / 2);
      inner.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) scale(1.06)`;
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
  }, [distance]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div ref={innerRef} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
