import { NextResponse } from 'next/server';
import { entriesFor, urlSetXml, XML_HEADERS } from '@/lib/sitemaps';

/** The "posts" section of the sitemap index (lib/sitemaps.ts). */
export const dynamic = 'force-static';

export async function GET() {
  return new NextResponse(urlSetXml(await entriesFor('posts')), { headers: XML_HEADERS });
}
