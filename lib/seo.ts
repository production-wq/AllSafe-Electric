import type { Metadata } from 'next';
import { abs, SITE_URL, business } from './business';

/**
 * Per-page metadata, planning/docs/05 §2.
 * title 50–60 chars, description 140–158, self-referencing absolute canonical,
 * page-specific OG image, robots directive. Uniqueness is enforced by
 * scripts/audit-seo.ts, which fails the build on a duplicate or an out-of-range length.
 */

const ROBOTS_INDEX = {
  index: true,
  follow: true,
  'max-image-preview': 'large',
  'max-snippet': -1,
  'max-video-preview': -1,
} as const;

export function ogImage(title: string, eyebrow?: string): string {
  const p = new URLSearchParams({ title });
  if (eyebrow) p.set('eyebrow', eyebrow);
  return `${SITE_URL}/api/og/?${p.toString()}`;
}

export interface PageMetaInput {
  path: string;
  title: string;
  description: string;
  /** Set false for /thank-you/, staging, and un-gated tier pages. */
  index?: boolean;
  ogEyebrow?: string;
  ogImagePath?: string; // explicit static OG image instead of the dynamic one
  type?: 'website' | 'article';
}

export function pageMetadata(input: PageMetaInput): Metadata {
  const url = abs(input.path);
  const indexable = input.index !== false;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    robots: indexable
      ? ROBOTS_INDEX
      : { index: false, follow: true, nocache: true },
    openGraph: {
      type: input.type ?? 'website',
      url,
      siteName: business.name,
      title: input.title,
      description: input.description,
      locale: 'en_US',
      images: [
        {
          url: input.ogImagePath ? abs(input.ogImagePath) : ogImage(input.title, input.ogEyebrow),
          width: 1200,
          height: 630,
          alt: input.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [input.ogImagePath ? abs(input.ogImagePath) : ogImage(input.title, input.ogEyebrow)],
    },
  };
}

export const siteMetadataBase = new URL(SITE_URL);
