import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/business';

/** planning/docs/05 §3. Do NOT block /_next/ — it prevents Google rendering the page. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/thank-you/', '/actions/', '/*?s=', '/*?utm_'],
      },
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
    ],
    host: SITE_URL,
  };
}
