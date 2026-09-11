import { NextResponse } from 'next/server';

/**
 * planning/docs/09 §1.5. The legacy WordPress site served a KML geo-data file at
 * this path (a real-estate/local-SEO plugin artifact, not a page anyone links to
 * or reads). There is no new-site equivalent, so this is a genuine 410, not a
 * redirect. Not a Bucket D entry in middleware.ts because middleware's matcher
 * deliberately skips any path containing a "." (so it doesn't intercept static
 * assets), so a dotted legacy path needs its own route handler instead.
 */
export async function GET() {
  return new NextResponse(
    `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
      `<meta name="robots" content="noindex"><title>Page removed — Allsafe Electric</title>` +
      `<meta name="viewport" content="width=device-width, initial-scale=1">` +
      `<style>body{font:16px/1.6 system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1.25rem;color:#12283D}` +
      `a{color:#024D80}</style></head><body>` +
      `<h1>That file has been removed</h1>` +
      `<p>It is no longer part of the site. Try the <a href="/">homepage</a>, ` +
      `<a href="/service-area/">our service area</a>, or call ` +
      `<a href="tel:+13036481934">(303) 648-1934</a>.</p></body></html>`,
    { status: 410, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}
