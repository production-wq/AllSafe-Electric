import 'server-only';
import { abs } from '@/lib/business';
import { services } from '@/lib/services';
import { cities } from '@/lib/cities';
import { PUBLISH } from '@/lib/publish';
import { getPostSlugs } from '@/lib/blog';

/**
 * Sitemap sections, planning/docs/05 §3.
 *
 * Split into an index plus per-section children (2026-09-13, client request:
 * "the sitemap.xml needs to be there with all the post and pages sitemaps, so
 * it is easy for search engines to find all the page links"). This also
 * completes the TODO that used to sit in app/sitemap.ts, and mirrors the shape
 * the legacy WordPress site had (post-sitemap.xml / page-sitemap.xml /
 * local-sitemap.xml), which is what Search Console is already used to seeing.
 *
 * Splitting by section is not cosmetic: GSC reports index coverage per
 * submitted sitemap, so a services/locations/posts split tells you WHICH group
 * is failing to get indexed instead of one undifferentiated number.
 *
 * Hard rule, unchanged: only 200-status, indexable URLs belong here. Never a
 * URL that 301s, 404s, or carries noindex. /book/ stays out (it is a thin
 * Housecall Pro pass-through, deliberately noindex,follow per docs/09 §1.4).
 */

/** Real content change date, not build time. */
export const CONTENT_DATE = '2026-09-15';

export interface SitemapEntry {
  url: string;
  lastmod?: string;
}

export const SECTIONS = ['pages', 'services', 'locations', 'posts'] as const;
export type SitemapSection = (typeof SECTIONS)[number];

/** Core site pages: home, company, conversion and utility pages. */
function pageEntries(): SitemapEntry[] {
  return [
    '/',
    '/about/',
    '/contact/',
    '/reviews/',
    '/coupons/',
    '/resources/',
    '/sitemap-page/',
    '/privacy-policy/',
  ].map((p) => ({ url: abs(p), lastmod: CONTENT_DATE }));
}

/** The services hub plus every individual service page. */
function serviceEntries(): SitemapEntry[] {
  return [
    { url: abs('/electrical-services/'), lastmod: CONTENT_DATE },
    ...services.map((s) => ({ url: abs(`/${s.slug}/`), lastmod: CONTENT_DATE })),
  ];
}

/** The service-area hub plus each published city page. */
function locationEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [{ url: abs('/service-area/'), lastmod: CONTENT_DATE }];
  if (PUBLISH.TIER_1_CITIES) {
    for (const c of cities) {
      entries.push({ url: abs(`/electricians/${c.slug}-co/`), lastmod: CONTENT_DATE });
    }
  }
  return entries;
}

/** The blog index plus every post. */
async function postEntries(): Promise<SitemapEntry[]> {
  const slugs = await getPostSlugs();
  return [
    { url: abs('/blog/'), lastmod: CONTENT_DATE },
    ...slugs.map((slug) => ({ url: abs(`/blog/${slug}/`), lastmod: CONTENT_DATE })),
  ];
}

export async function entriesFor(section: SitemapSection): Promise<SitemapEntry[]> {
  switch (section) {
    case 'pages':
      return pageEntries();
    case 'services':
      return serviceEntries();
    case 'locations':
      return locationEntries();
    case 'posts':
      return postEntries();
  }
}

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function urlSetXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${escapeXml(e.url)}</loc>${
          e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ''
        }\n  </url>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function sitemapIndexXml(): string {
  const items = SECTIONS.map(
    (s) =>
      `  <sitemap>\n    <loc>${escapeXml(abs(`/sitemap-${s}.xml`))}</loc>\n    <lastmod>${CONTENT_DATE}</lastmod>\n  </sitemap>`
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;
}

export const XML_HEADERS = {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
};
