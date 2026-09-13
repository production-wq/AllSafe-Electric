'use client';

import { useEffect, useState } from 'react';
import { SiteImage } from './SiteImage';

export interface Slide {
  name: string;
  alt: string;
}

/**
 * Cross-fading hero background with a slow Ken Burns drift, client request
 * 2026-09-14 ("on this hero section you could probably have multiple images
 * rotating with a Ken Burns effect").
 *
 * FAILS OPEN, the rule every motion component here follows: the first slide is
 * rendered normally and stays fully visible on its own. Rotation and the drift
 * are enhancements layered on top. If JS never runs, or the visitor prefers
 * reduced motion, you get a single clean hero image rather than a blank box.
 *
 * Only the first slide gets `priority`, since it is the LCP element. The rest
 * load lazily and are simply not shown until their turn.
 */
export function HeroSlideshow({
  slides,
  intervalMs = 6500,
  className = '',
}: {
  slides: Slide[];
  intervalMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setAnimate(true);
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slides.length, intervalMs]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {slides.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={s.name}
            className={`absolute inset-0 transition-opacity ease-in-out ${
              animate ? 'duration-[1400ms]' : 'duration-0'
            } ${active ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className={animate && active ? 'kenburns h-full w-full' : 'h-full w-full'}>
              <SiteImage
                name={s.name}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
