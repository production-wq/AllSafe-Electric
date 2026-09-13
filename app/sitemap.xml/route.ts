import { NextResponse } from 'next/server';
import { sitemapIndexXml, XML_HEADERS } from '@/lib/sitemaps';

/** Sitemap index. Points at the per-section sitemaps (lib/sitemaps.ts). */
export const dynamic = 'force-static';

export async function GET() {
  return new NextResponse(sitemapIndexXml(), { headers: XML_HEADERS });
}
