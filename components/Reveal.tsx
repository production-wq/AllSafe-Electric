'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Scroll-reveal wrapper, "Job-Site Editorial" refresh (2026-09-13).
 *
 * FAILS OPEN, deliberately. The first version rendered every wrapper at
 * opacity:0 and depended on an IntersectionObserver firing to make it visible,
 * which meant any case where the observer never fired left real content and
 * images as blank white space (client report, 2026-09-13): restored scroll
 * position on a back navigation, an anchor link landing mid-page, JS blocked or
 * slow, or an element that never quite crossed the threshold.
 *
 * Now nothing is hidden until JS has confirmed it is both safe and pointless to
 * animate: content starts visible (so SSR, no-JS, and observer failure all
 * render normally), and only elements still BELOW the fold get hidden and
 * animated in. Anything already on screen is simply left alone, so there is no
 * fade-out flash either. A timeout is the last backstop: content is never left
 * invisible, whatever happens.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  /** Stagger delay in ms, for sequencing items in a grid. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [animating, setAnimating] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Already on screen: leave it visible, never animate it.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setAnimating(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );
    observer.observe(el);

    // Backstop: if the observer somehow never fires, show the content anyway.
    const failSafe = window.setTimeout(() => {
      setShown(true);
      observer.disconnect();
    }, 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failSafe);
    };
  }, []);

  const motion = animating ? `reveal ${shown ? 'reveal-visible' : ''}` : '';

  return (
    <div
      ref={ref}
      className={`${motion} ${className}`.trim()}
      style={animating && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
