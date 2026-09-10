# Allsafe Electric — website

Residential electrician in Parker, Colorado. Owner/operator **Judson "Jud" Cushing**;
second tech **Justin**. Client of Built Right Digital.

Next.js 15 (App Router) · TypeScript · Tailwind · static-first · Vercel.

> **Read [`planning/CLAUDE.md`](planning/CLAUDE.md) and [`planning/docs/03-information-architecture.md`](planning/docs/03-information-architecture.md) before changing anything.**
> The URL map is a contract. The 8 prime directives are not advisory.
> Everything currently placeholder or pending a client decision is in **[`BUILD-NOTES.md`](BUILD-NOTES.md)**.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # fill in keys as they become available (all optional for local dev)
npm run images:process         # resize/strip-EXIF the real photos → public/img/photos + manifest
npm run dev                    # http://localhost:3000
```

`npm run images:process` must be run once after checkout (its output — `public/img/photos/`
and `data/image-manifest.json` — is git-ignored). The source photos live in
`assets/source-photos/` (58 real photos of Jud, from the client).

## Verify before every commit

```bash
npm run build          # static export of every page
npm run audit:seo      # headings, meta length, canonicals, alt text, NO ORANGE, real tel number
npm run audit:schema   # JSON-LD validity, required types per template, anti-patterns
npm run test:preservation   # every URL in data/preserved-urls.csv still resolves
npm run typecheck
```

All five are wired into CI (`.github/workflows/ci.yml`) and **fail the build** — no waiver
(planning/docs/14). A deliberately-broken page was used to prove they bite; see BUILD-NOTES.

## Project layout

```
app/                     App Router routes
  page.tsx               Home (wireframe: planning/docs/02 §4)
  [serviceSlug]/         16 service pages — flat root URLs, generateStaticParams, dynamicParams=false
  electrical-services-parker-co/   Services hub (preserved URL)
  electricians/[city]/   5 Tier-1 city pages (GATED — see lib/publish.ts)
  blog/ , blog/[slug]/   Blog index + posts (content/blog/*.md)
  about/ reviews/ coupons/ contact/ book/ service-area/ resources/ privacy-policy/
  thank-you/             noindex, fires the conversion
  api/reviews/route.ts   ISR (6h) — live Google reviews, server-side key
  api/og/route.tsx       per-page OG images (next/og)
  actions/submit-estimate.ts   Server Action — form → email + HCP + lead-log + GA4
  sitemap.ts robots.ts llms.txt/  not-found.tsx  icon.svg
components/              Header, Footer, AvailabilityStrip, StickyBar, BookingCard,
                         EstimateForm, Reviews, Schema, Breadcrumbs, cta.tsx, sections.tsx, …
lib/
  business.ts            CANONICAL FACTS — single source. NAP, phone, licences, booking URL.
  services.ts cities.ts faqs.ts   typed content data
  schema.ts              hand-authored JSON-LD builders (planning/docs/06)
  seo.ts hours.ts analytics.ts images.ts reviews.ts blog.ts nav.ts publish.ts
scripts/
  images-process.ts      sharp: resize, strip EXIF, LQIP, manifest
  images-generate.ts     Gemini (Nano Banana) — GAPS ONLY, env key, never people/badges
  fetch-reviews.ts       Places API (New) → data/reviews.fallback.json snapshot
  audit-seo.ts audit-schema.ts test-preservation.ts report-indexation.ts
data/
  preserved-urls.csv     bucket A — enforced in CI
  url-map.csv            redirects (next.config reads this); seed only
  gone-urls.json         bucket D 410s (middleware.ts reads this); empty until migration
  service-areas.csv keyword-map.csv content-review-schedule.csv
  reviews.fallback.json coupons.json image-manifest.json
planning/                the full planning package (docs 01–14, prompts, data). Keep current.
```

## Deploy (Vercel)

1. Import the repo. Framework preset: Next.js. Build command `npm run build` (default).
2. Set environment variables from `.env.example` (Production + Preview).
3. Domains: apex `allsafehomeservice.com` primary, `www` → 301 to apex.
4. **Do not touch DNS `MX` records** — email is on the current host. See
   `planning/docs/12-migration-runbook.md` §3. Change only `A`/`CNAME` unless the owner
   has approved a Google Workspace migration.
5. Staging previews: password-protect them (Vercel → Deployment Protection) and confirm
   `noindex`. Never let a preview get indexed.
6. Security headers, CSP, and redirects are in `next.config.mjs` (also mirrored in
   `vercel.json` for reference).

## Editing content (no CMS)

| To change… | Edit… |
|---|---|
| A service page's copy, price range, FAQs, hero photo | `lib/services.ts` |
| A city page | `lib/cities.ts` |
| Business facts (phone, address, hours, licences) | `lib/business.ts` — **only** here |
| Homepage FAQ | `lib/faqs.ts` |
| A blog post | `content/blog/<slug>.md` |
| Nav / mega-menu / footer | `lib/nav.ts` |
| Which tiers are published | `lib/publish.ts` |
| Redirects | `data/url-map.csv` (never `next.config.mjs` by hand) |

Run `npm run build && npm run audit:seo && npm run audit:schema` after any content edit.
