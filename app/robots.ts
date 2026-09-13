import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/business';

/**
 * planning/docs/05 §3, planning/docs/09 §1.6 (client audit, 2026-09-11).
 * - Do NOT block /_next/. It prevents Google rendering the page.
 * - /api/og/ is the OG-image route (dynamic image generation) and must stay
 *   crawlable even though the rest of /api/ is blocked — Allow it explicitly,
 *   ahead of the /api/ Disallow, so social/crawler fetchers can render previews.
 * - AdsBot-Google / AdsBot-Google-Mobile do NOT inherit the '*' group's rules
 *   (Google's own documented behavior), so if we want Google Ads landing-page
 *   quality checks to work they need their own explicit Allow: / group.
 * - No Host: directive. It's a Yandex-only extension Google ignores, and having
 *   it invites confusion when the redirect map/host handling changes.
 * - The /*?utm_ disallow was removed: it was blocking Google Ads-tagged URLs
 *   (?utm_source=google ...) from being crawled/verified, which fights the
 *   conversion-tracking work in 1.11.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/og/'],
        disallow: ['/api/', '/thank-you/', '/actions/', '/*?s='],
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
      {
        userAgent: 'AdsBot-Google-Mobile',
        allow: '/',
      },
    ],
    // The index at /sitemap.xml points to the per-section sitemaps, but listing
    // the children explicitly means a crawler that does not follow index files
    // still finds every section (lib/sitemaps.ts).
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap-pages.xml`,
      `${SITE_URL}/sitemap-services.xml`,
      `${SITE_URL}/sitemap-locations.xml`,
      `${SITE_URL}/sitemap-posts.xml`,
    ],
  };
}
