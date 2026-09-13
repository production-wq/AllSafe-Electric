import type { ReactNode } from 'react';
import Link from 'next/link';

export interface MarqueeItem {
  label: string;
  href?: string;
}

/**
 * Infinite scrolling ticker strip, client request (2026-09-13, repeated
 * 2026-09-14: "I asked you to put this kind of text lines which just goes on
 * on a loop, uh, with some icons, but you didn't add those").
 *
 * Technique matches the proven ReviewsMarquee: the item list is rendered
 * exactly twice and the track translates -50%, so the seam is invisible. The
 * duration and direction are CSS variables here rather than baked into the
 * keyframe, so the same rule serves every strip on the site.
 *
 * Accessibility: the duplicate track is aria-hidden so screen readers announce
 * the list once, and the whole strip pauses on hover and on keyboard focus.
 * Under prefers-reduced-motion the animation is removed entirely (globals.css)
 * rather than merely sped up, so the text sits still and stays readable.
 */
export function Marquee({
  items,
  separator,
  durationSec = 38,
  reverse = false,
  tone = 'green',
  className = '',
}: {
  items: MarqueeItem[];
  /** Icon rendered between items. Defaults to a four-point sparkle. */
  separator?: ReactNode;
  durationSec?: number;
  reverse?: boolean;
  tone?: 'green' | 'navy' | 'paper';
  className?: string;
}) {
  if (items.length === 0) return null;

  const tones = {
    green: 'bg-green-600 text-white',
    navy: 'bg-navy text-white',
    paper: 'bg-paper text-ink',
  } as const;

  const sep = separator ?? <SparkIcon />;

  const renderRun = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((it, i) => (
        <span key={`${it.label}-${i}`} className="flex shrink-0 items-center">
          <span className="px-6 py-3.5 font-display text-[0.95rem] font-extrabold uppercase tracking-[0.14em] sm:text-[1.05rem]">
            {it.href && !hidden ? (
              <Link href={it.href} className="text-inherit no-underline transition-opacity hover:opacity-75">
                {it.label}
              </Link>
            ) : (
              it.label
            )}
          </span>
          <span className="shrink-0 opacity-60">{sep}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`marquee group ${tones[tone]} ${className}`}
      style={
        {
          '--marquee-duration': `${durationSec}s`,
          '--marquee-direction': reverse ? 'reverse' : 'normal',
        } as React.CSSProperties
      }
    >
      <div className="marquee-track">
        {renderRun(false)}
        {renderRun(true)}
      </div>
    </div>
  );
}

function SparkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M12 2c.3 4.6 2.4 6.8 7 7-4.6.3-6.7 2.4-7 7-.3-4.6-2.4-6.7-7-7 4.6-.3 6.7-2.4 7-7z" />
    </svg>
  );
}
