import type { ReactNode } from 'react';

/**
 * Heading with one emphasized keyword, client request (2026-09-14: "You can
 * have modern headings like the main word can be a colorful word or animated
 * headings, things like that that makes the website feels premium").
 *
 * Pass the full heading as `text` and the word or phrase to emphasize as
 * `highlight`. The match is literal and case-sensitive, and if it is not found
 * the heading simply renders plain, so a copy edit can never blank a heading.
 *
 * `underline` draws a hand-drawn-style swash under the highlighted word, which
 * reads as deliberate design rather than a stray color change.
 */
export function AnimatedHeading({
  text,
  highlight,
  as: Tag = 'h2',
  className = '',
  id,
  underline = false,
}: {
  text: string;
  highlight?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  id?: string;
  underline?: boolean;
}) {
  if (!highlight || !text.includes(highlight)) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    );
  }

  const [before, ...rest] = text.split(highlight);
  const after = rest.join(highlight);

  return (
    <Tag id={id} className={className}>
      {before}
      <span className="relative inline-block">
        <span className="text-gradient">{highlight}</span>
        {underline && <Swash />}
      </span>
      {after}
    </Tag>
  );
}

/** Rough underline swash. Decorative only. */
function Swash(): ReactNode {
  return (
    <svg
      className="pointer-events-none absolute -bottom-1.5 left-0 h-[0.42em] w-full text-green-500/70"
      viewBox="0 0 200 14"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
      focusable="false"
    >
      <path
        d="M2 10.5c34-5 62-7 98-7s62 2 98 6"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
