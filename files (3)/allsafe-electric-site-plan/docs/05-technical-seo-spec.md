# 05 — Technical SEO Specification

Every rule here is enforced by `npm run audit:seo`. A violation fails the build.

---

## 1. Heading structure

The current site is broken in a specific and unusually damaging way. On
`/electrical-panel-services/`, entire body paragraphs are wrapped in `<h2>` tags:

> `## Upgrading to a new electrical panel can improve the safety, reliability, and efficiency
> of your electrical system, ensuring that your home is equipped to meet your current and
> future electrical needs...`

There are five paragraph-length `<h2>` elements on that one page, plus an `<h2>` breadcrumb
appearing **above** the `<h1>`, plus `<h6>` used for card titles. Card titles across the site
are `<h6>` with nothing between `<h2>` and `<h6>`.

When every paragraph is a heading, nothing is a heading, and the page has no machine-readable
outline at all. This is a leading candidate for why service pages are crawled and then not
indexed.

### Rules

1. Exactly **one** `<h1>` per page. First heading in the DOM. Describes the page.
2. Levels descend without skipping. `h1 → h2 → h3`. Never `h2 → h6`.
3. A heading is **never longer than 70 characters.** If content needs emphasis, use a
   `<p class="lead">`, `<strong>`, or a styled `<div>`.
4. Headings are never used to make text bigger. Font size is a CSS concern.
5. Breadcrumbs are a `<nav>` with an ordered list, not a heading.
6. Card and list-item titles are `<h3>` inside a section whose `<h2>` names the group.
7. No empty headings. No headings whose only child is an image or an icon.

### Canonical page outline

```html
<h1>Electrical panel upgrades and repairs in Parker, CO</h1>
  <h2>Signs your panel needs upgrading</h2>
    <h3>Breakers that trip repeatedly</h3>
    <h3>A fuse box instead of breakers</h3>
    <h3>Federal Pacific or Zinsco labeling</h3>
  <h2>What a panel upgrade costs in Douglas County</h2>
  <h2>What the job looks like, start to finish</h2>
  <h2>Permits and inspection in Parker</h2>
  <h2>Common questions</h2>
    <h3>How long does it take?</h3>
    <h3>Will my power be off all day?</h3>
```

---

## 2. Metadata

Generated per-page with Next.js `generateMetadata`. Never a template with a variable swapped in
and nothing else.

| Element | Rule |
|---|---|
| `<title>` | 50–60 chars. Unique site-wide. Format: `Primary Keyword \| City \| Allsafe Electric` — but write it to be read by a human, not assembled. |
| Meta description | 140–158 chars. Unique. Contains the primary keyword, a differentiator, and an action. Not a summary of the page. |
| Canonical | Self-referencing, absolute, on every page including the homepage |
| `robots` | `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` |
| Open Graph | `og:title`, `og:description`, `og:image` (1200×630, page-specific), `og:url`, `og:type`, `og:site_name` |
| Twitter | `summary_large_image` |
| `lang` | `en-US` on `<html>` |
| Viewport | `width=device-width, initial-scale=1, viewport-fit=cover` |

### Errors on the current site to not repeat

- `og:type: article` on service pages. Service pages are `website`.
- Two different `google-site-verification` values across pages. Reconcile to one.
- `msapplication-TileImage` pointing at a marketing PNG.
- The Elementor generator meta, `ti-site-data`, and `twitter:data1: admin` leaking author info.

### Description examples

Good:
> `Breaker tripping or fuse box still in service? Jud upgrades panels across Parker and Douglas County. Licensed master electrician, permits handled. Call (303) 648-1934.` *(157)*

Bad, and typical of the current site:
> `Looking for professional electrical panel repairs in Parker? Our experts provide reliable breaker box installation services. Call now or fill out the estimate form.`

The second one is generic, says nothing a competitor could not say, and mentions no person,
no jurisdiction, and no proof.

---

## 3. Crawling and indexing

### robots.txt

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /thank-you/
Disallow: /*?s=
Disallow: /*?utm_
Sitemap: https://allsafehomeservice.com/sitemap.xml
```

Do **not** block `/_next/`. Blocking it prevents Google from rendering the page.

The current property reports **1 page blocked by robots.txt**. Identify it before launch and
decide deliberately whether it stays blocked.

### Sitemap

Generated at build time via `app/sitemap.ts` from the route manifest. Rules:

- Only bucket-A and newly published URLs. **Never** include a URL that 301s, 404s, or is
  `noindex`. A sitemap containing redirects is a direct quality signal against the site.
- `lastmod` reflects actual content change, not build time. A sitemap where every page changed
  today, every day, is ignored.
- No `priority`, no `changefreq`. Google does not use them.
- Split into `sitemap-services.xml`, `sitemap-locations.xml`, `sitemap-content.xml` under an
  index. This makes GSC coverage debuggable per section, which matters enormously here.

### Indexation gate

New pages are released in tiers. A tier does not ship until the prior tier is **≥ 80% indexed**.
See `docs/09-content-plan.md` §3. This rule exists because ignoring it is exactly how the
current site accumulated 493 unindexed pages.

### Pagination and parameters

- Blog index paginates at `/blog/page/2/`, each page self-canonical, with `rel=prev/next` in the
  markup for user agents that still read it.
- Filter and sort parameters get `noindex, follow`.
- No infinite scroll without paginated URLs behind it.

---

## 4. Rendering

- **Static generation for every marketing page.** No client-side data fetching for content that
  must be indexed.
- The only ISR route is the reviews feed, revalidating every 6 hours.
- No content behind a tab, accordion, or modal that only populates on click. Accordions are
  fine if the content is in the initial HTML and hidden with CSS.
- Verify with `curl -s <url> | grep "<h1"` that the H1, body copy, and JSON-LD are in the raw
  HTML response. If content only appears in the browser, it does not count.

---

## 5. Performance

Targets, mobile, 4G throttled:

| Metric | Target |
|---|---|
| LCP | < 2.0s |
| INP | < 150ms |
| CLS | < 0.05 |
| TTFB | < 400ms |
| Total JS (initial) | < 120KB gzipped |
| Lighthouse Performance | ≥ 90 |

### How

- Server Components by default. `'use client'` only for the availability strip, the sticky bar,
  the booking widget, the form, and the reviews carousel.
- `next/image` everywhere. AVIF then WebP. `priority` on the hero image only. Explicit
  `width`/`height` on every image — the current site's CLS is largely unset image dimensions.
- Self-hosted fonts, `font-display: swap`, preload the two weights used above the fold.
- No jQuery, no icon fonts, no carousel library. Icons are inline SVG.
- Third-party scripts (GA4, CallRail) load with `next/script` `strategy="afterInteractive"`.
  Nothing third-party blocks render.
- Reserve height for the sticky bar and the availability strip so they never shift layout.

The current site runs Elementor on WordPress. Leaving that behind is most of the performance
win; do not spend it back on a heavy component library.

---

## 6. International and duplication

- `hreflang` not needed. Single locale.
- Enforce a single canonical host. `www` → apex, `http` → `https`, one 301 each.
- No `?replytocom`, no calendar archives, no tag archives, no author archives. WordPress
  generated hundreds of these; do not recreate the pattern.
- The blog has categories but **no tag archives.** Tags are a metadata field, not a URL.

---

## 7. Structured data

See `docs/06-schema-spec.md`. Summary rule: every page carries JSON-LD, hand-authored, valid
against the Rich Results Test, injected server-side.

---

## 8. The audit script

`scripts/audit-seo.ts`, run via `npm run audit:seo`, in CI on every PR.

**Fails the build:**

- More than one `<h1>`, or zero
- Skipped heading level
- Heading longer than 70 characters
- Missing or duplicate `<title>` or meta description
- Title outside 50–60 chars, description outside 140–158
- Missing or non-self-referencing canonical
- Invalid JSON-LD, or a page whose declared `schemaTypes` are absent from the output
- Internal link returning non-200
- Image without `alt`, or with keyword-stuffed alt (>6 words, or containing the city name twice)
- Orphan page (zero internal inlinks)
- Any URL in `data/preserved-urls.csv` not returning 200
- A sitemap entry that redirects or 404s
- A `tel:` link whose number is not `+13036481934`
- Any hex value matching the retired orange palette

**Warns:**

- Fewer than 3 contextual outbound internal links
- Fewer than 2 internal inlinks
- Body copy under 400 words on a service or city page
- Duplicate anchor text to the same target on one page
- Any two pages with >85% content similarity
