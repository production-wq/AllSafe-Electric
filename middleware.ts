import { NextResponse, type NextRequest } from 'next/server';
import gone from './data/gone-urls.json';

/**
 * Bucket D (retired) URLs return a real 410 Gone — planning/docs/04 §1, §4.
 * A 410 is the explicit "this is permanently removed" signal that clears a URL
 * from Google's crawl queue fastest. NOT a 404, NOT a blanket 301 to the homepage.
 *
 * The list is generated from data/url-map.csv (rows where status === '410').
 * Populate data/gone-urls.json during the migration (planning/docs/12 §1).
 */
const goneSet = new Set<string>(gone as string[]);

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (goneSet.has(path) || goneSet.has(path.replace(/\/$/, ''))) {
    return new NextResponse(
      `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
        `<meta name="robots" content="noindex"><title>Page removed — Allsafe Electric</title>` +
        `<meta name="viewport" content="width=device-width, initial-scale=1">` +
        `<style>body{font:16px/1.6 system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1.25rem;color:#12283D}` +
        `a{color:#024D80}</style></head><body>` +
        `<h1>That page has been removed</h1>` +
        `<p>It is no longer part of the site. Try the <a href="/">homepage</a>, ` +
        `<a href="/electrical-services-parker-co/">our services</a>, or call ` +
        `<a href="tel:+13036481934">(303) 648-1934</a>.</p></body></html>`,
      { status: 410, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/|api/|img/|fonts/|favicon|icon|robots.txt|sitemap|.*\\.).*)'],
};
