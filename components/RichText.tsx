import Link from 'next/link';
import { Fragment } from 'react';

/**
 * Parses a string for markdown-style links like [text](/url) and returns an array
 * of React nodes, replacing the links with Next.js <Link> components.
 */
export function RichText({ text }: { text: string }) {
  if (!text) return null;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const [, label, href] = match;
    // Ensure internal links use Link, external use a
    if (href.startsWith('/')) {
      parts.push(
        <Link key={lastIndex} href={href} className="link-cta underline decoration-rule underline-offset-2">
          {label}
        </Link>
      );
    } else {
      parts.push(
        <a key={lastIndex} href={href} target="_blank" rel="noopener noreferrer" className="link-cta underline decoration-rule underline-offset-2">
          {label}
        </a>
      );
    }
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <>{parts.map((p, i) => <Fragment key={i}>{p}</Fragment>)}</>;
}
