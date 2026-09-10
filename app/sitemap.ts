import type { MetadataRoute } from 'next';
import { abs } from '@/lib/business';
import { services } from '@/lib/services';
import { cities } from '@/lib/cities';
import { PUBLISH } from '@/lib/publish';
import { getPostSlugs } from '@/lib/blog';

/**
 * Sitemap, planning/docs/05 §3.
 * - ONLY 200-status, indexable URLs. Never a URL that 301s, 404s, or is noindex.
 * - lastmod reflects real content change, not build time.
 * - No priority / changefreq, Google ignores them.
 * - Tier-1 city pages enter ONLY once PUBLISH.TIER_1_CITIES is flipped (docs/09 §3).
 *
 * TODO (v1.1): split into sitemap-services / -locations / -content under an index
 * for per-section GSC Coverage debugging (docs/05 §3). Single sitemap is correct
 * and sufficient at this URL count.
 */
const CONTENT_DATE = new Date('2026-09-15');

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getPostSlugs();

  const entries: MetadataRoute.Sitemap = [
    { url: abs('/'), lastModified: CONTENT_DATE },
    { url: abs('/electrical-services-parker-co/'), lastModified: CONTENT_DATE }, ...services.map((s) => ({ url: abs(`/${s.slug}/`), lastModified: CONTENT_DATE })),
    { url: abs('/service-area/'), lastModified: CONTENT_DATE },
    { url: abs('/about/'), lastModified: CONTENT_DATE },
    { url: abs('/reviews/'), lastModified: CONTENT_DATE },
    { url: abs('/coupons/'), lastModified: CONTENT_DATE },
    { url: abs('/contact/'), lastModified: CONTENT_DATE },
    { url: abs('/book/'), lastModified: CONTENT_DATE },
    { url: abs('/resources/'), lastModified: CONTENT_DATE },
    { url: abs('/privacy-policy/'), lastModified: CONTENT_DATE },
    { url: abs('/blog/'), lastModified: CONTENT_DATE }, ...slugs.map((slug) => ({ url: abs(`/blog/${slug}/`), lastModified: CONTENT_DATE })),
  ];

  if (PUBLISH.TIER_1_CITIES) {
    for (const c of cities) {
      entries.push({ url: abs(`/electricians/${c.slug}/`), lastModified: CONTENT_DATE });
    }
  }

  return entries;
}
