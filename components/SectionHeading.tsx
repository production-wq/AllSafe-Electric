import type { ReactNode } from 'react';
import { AnimatedHeading } from './AnimatedHeading';

/**
 * Standard section header: eyebrow, heading with an optional colored keyword,
 * and an optional lead paragraph.
 *
 * Added 2026-09-14 because every section across the site was re-implementing
 * this by hand, which is why headings drifted between `text-h1` and `text-h2`
 * for the same level of section and why some had eyebrows and others did not.
 * One component, one rhythm.
 */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  lead,
  id,
  as = 'h2',
  align = 'left',
  tone = 'light',
  className = '',
  children,
}: {
  eyebrow?: string;
  title: string;
  /** Word or phrase inside `title` to render in the brand gradient. */
  highlight?: string;
  lead?: string;
  id?: string;
  as?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
  children?: ReactNode;
}) {
  const centered = align === 'center';
  const size = as === 'h1' ? 'text-display' : 'text-h1';

  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow ${centered ? 'eyebrow-center' : ''} ${tone === 'dark' ? 'eyebrow-light' : ''}`}>
          {eyebrow}
        </p>
      )}
      <AnimatedHeading
        as={as}
        id={id}
        text={title}
        highlight={highlight}
        className={`mt-3 ${size} ${tone === 'dark' ? 'text-white' : ''}`}
      />
      {lead && (
        <p className={`mt-4 text-lead ${tone === 'dark' ? 'text-white/75' : 'text-slate'}`}>{lead}</p>
      )}
      {children}
    </div>
  );
}
