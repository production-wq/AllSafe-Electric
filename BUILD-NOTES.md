# Build notes — what is done, what is placeholder, what blocks launch

Built 2026-09-10 against the planning package in `planning/`. Branch `rebuild/allsafe-nextjs`.

This file is the honest state of the build. Read it before launch. Cross-reference
`planning/docs/14-launch-qa-checklist.md` (the full gate) and `planning/docs/99-decisions-log.md`
(the divergences, all logged).

---

## 1. What is built and verified

| Area | State |
|---|---|
| Stack | Next.js 15 App Router, TS, Tailwind, RSC default, `next/image`, hand-authored `<Schema/>`, Server Action form, ISR-only reviews route, Vercel-ready. Per CLAUDE.md §2. |
| Pages | Home + 16 service pages + services hub + About + Reviews + Coupons + Contact + Book + Service-area + Resources + Privacy + `/thank-you/` (noindex) + custom 404 + blog index + 4 posts. **45 static routes.** |
| Tier-1 city pages | 5 authored (`/electricians/{parker,castle-rock,highlands-ranch,lone-tree,centennial}-co/`), **gated** — `noindex`, not in sitemap, not in nav/footer. Flip `lib/publish.ts` `TIER_1_CITIES` after the Tier-0 indexation gate clears (docs/09 §3). |
| Brand hexes | Eyedropped from the logo — `#0165AC` blue, `#008E6C` green, `#007A5C` action-green (AA). No orange anywhere — CI enforces it. |
| Heading structure | One `<h1>` per page, no skipped levels, no heading > 70 chars, no paragraph-in-heading. Enforced by `audit:seo`. |
| Metadata | Every indexable page: unique `<title>` 50–60, unique description 140–158, self-referencing absolute canonical, robots directive, per-page OG image (`/api/og`), Twitter card. Enforced by `audit:seo`. |
| Schema | Root `Electrician` + `WebSite` sitewide by `@id`; per-template `WebPage`/`Service`/`FAQPage`/`BreadcrumbList`/`Article`/`AboutPage`/`Person`/`ContactPage`. **No** `aggregateRating`/`Review`. Enforced by `audit:schema`. |
| 3 CTAs | Call (real `tel:+13036481934` anchor), Book (Housecall Pro, URL imported once), Estimate (on-page Server Action form) — on every page + mobile sticky bar. Emergency page flips Call to primary. |
| NAP | Single source `lib/business.ts`. Footer / `<address>` / schema `telephone` all the **real** number. CallRail swap is display-only (script slot ready). `audit:seo` fails on a wrong `tel:`. |
| Availability strip | Live `America/Denver` state, green/blue dot (never red), truthful JS-off fallback, height reserved. |
| Performance | Shared First Load JS ~103 KB uncompressed (~40 KB gzipped) — inside the 120 KB gzipped budget. Server Components by default; `'use client'` only on strip, sticky bar, booking card, form, reviews, header. Fonts via `next/font` (self-hosted, swap). `next/image` AVIF/WebP + explicit dims + LQIP everywhere. Map is a lazy click-to-load facade. |
| Security headers | CSP, HSTS (preload), X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP — `next.config.mjs`. |
| Redirects | `www`→apex, `/electrical-services/`→hub, + `data/url-map.csv` rows. `trailingSlash: true`. Bucket-D 410s via `middleware.ts` + `data/gone-urls.json`. |
| Guardrails | `audit:seo`, `audit:schema`, `test:preservation`, `typecheck`, `lint` — all green, all in CI, all fail the build. Proven with a deliberately-broken page (caught: 2 h1s, long heading, level jump, missing alt, wrong tel, orange, bad meta length). |
| Images | 58 real client photos processed (EXIF/GPS stripped, resized, WebP+JPEG, LQIP, manifest). Mapped to services/pages in `lib/services.ts`. |
| `/llms.txt` | Published — NAP, key pages, service list, citation facts. |
| Analytics | GA4 + Consent Mode v2 + CallRail script slots wired (`components/Analytics.tsx`), event helpers (`lib/analytics.ts`) fire `click_call` / `click_book` / `generate_lead` / `begin_booking` / `view_reviews` etc. Inert until `NEXT_PUBLIC_GA4_ID` is set. |

---

## 2. Placeholder content — must be resolved before / shortly after launch

Everything here is **scaffolded and visibly marked**, never published as fact (CLAUDE.md §1.8).

### 2a. Price ranges — owner approval required (docs/09 §4)

Every service page shows a range inside a *"Estimated range … your exact price is fixed in
writing"* treatment. **Only the panel-upgrade figure is doc-sourced.** Get the rest approved
and dated by Jud, then set `needsApproval: false` per service in `lib/services.ts`:

| Service | Range shown (USD) | Source |
|---|---|---|
| `electrical-panel-services` | 2,200 – 4,500 | ✅ planning/docs/09 §4 |
| `emergency-electrical-repairs-parker-co` | 189 – 450 (diagnostic) | ⚠ ballpark — approve |
| `electrical-troubleshooting` | 165 – 385 (diagnostic) | ⚠ approve |
| `electrical-outlet-services` | 145 – 340 /outlet | ⚠ approve |
| `electrical-switch-services` | 135 – 280 /switch | ⚠ approve |
| `electrical-wiring-repairs-services` | 350 – 8,000 | ⚠ approve |
| `home-electrical-safety-inspections` | 189 – 375 | ⚠ approve |
| `smoke-detectors` | 65 – 145 /device | ⚠ approve |
| `whole-home-surge-protection` | 350 – 650 | ⚠ approve |
| `generator-installation` | 6,500 – 18,000 | ⚠ approve |
| `residential-ev-charging` | 650 – 2,200 | ⚠ approve |
| `hot-tub-electrical-hookup` | 750 – 1,900 | ⚠ approve |
| `lighting-services` | 150 – 2,800 | ⚠ approve |
| `outdoor-lighting` | 250 – 4,500 | ⚠ approve |
| `ceiling-fan-installation` | 165 – 425 /fan | ⚠ approve |
| `home-automation` | 145 – 1,600 | ⚠ approve |

### 2b. Live Google reviews (docs/07 §5, open item #6)

- No review text is invented. The reviews section renders a designed **"read on Google"**
  state until real data lands.
- To populate: set `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID` in `.env.local`, run
  `npm run fetch:reviews` (writes `data/reviews.fallback.json`), and the live ISR route
  `/api/reviews` takes over at runtime.
- The 4 known-real reviews from the old site (Todd, D.L., Mark, Nathan) can be carried over
  from a cache if the Place ID is delayed — but do **not** hand-type approximations.
- **Do not** add `aggregateRating`/`Review` schema (docs/06 §3) — the `audit:schema` guard
  blocks it.

### 2c. Award badges (docs/10 §4, open items #8a–c)

`components/TrustBadges.tsx` — `SHOW_DATED = false`. Only **BBB A+** and **HomeAdvisor
Screened & Approved** (both undated) render. Best of Houzz 2023 / Angi 2022 / Nextdoor 2022
are held until:
1. the account manager confirms whether newer badges exist (if so, swap them in);
2. official high-res assets are pulled from each program's kit (current crops are ~130 px);
3. real profile URLs are supplied — wire them into `TrustBadges.tsx` **and** the `sameAs`
   array in `lib/schema.ts`.
The Nextdoor badge is labelled Nextdoor, not HomeAdvisor.

### 2d. Coupons

`data/coupons.json` ships `{ "offers": [] }`. The page shows the always-on value props.
Add offers (owner-approved wording, amount, expiry) to that file when there are any.

### 2e. City utility (CORE vs Xcel) — open item #13

Each city page shows the likely provider with a visible *"verify your address"* flag.
Confirm each city's actual electric provider and current rebate programs before the
`TIER_1_CITIES` flag is flipped; update `lib/cities.ts` `utility.verify` to `false` once done.

### 2f. Hero photo

Home + service pages use real photos of Jud. `docs/11` §2 wants the ~2000 px original of the
Jud bathroom photo (`planning/assets/brand/jud-bathroom-lighting-252x252.png` is 252 px) — a
five-minute ask of the owner. Not blocking; the current hero is a real full-res photo.

### 2g. Generated-image gaps

Services with `heroImageGap: true` (outdoor-lighting, ev-charging, smoke-detectors,
generator, hot-tub) + the 5 city establishing shots + one trust framing use an **interim real
photo**. To fill them: put `GEMINI_API_KEY` in `.env.local`, run `npm run images:generate --
--refs` (review the 3 style refs, keep one), then `npm run images:generate`, then
`npm run images:process`. The script refuses any brief mentioning a person, face, badge,
before/after, or named landmark. Track swaps in `assets/REPLACEMENT-QUEUE.md`.

---

## 3. Blocked on inputs from the account manager / client / GSC

From `planning/prompts/build-sequence.md` Phase 6:

- [ ] **Which of `/electrical-services/` vs `/electrical-services-parker-co/` is the indexed
  one** (open #1). Interim: recreated `-parker-co`, 301'd the bare one. Pull the GSC Pages
  report and confirm; swap if wrong. **Do not launch without this.**
- [ ] **GSC exports** — `data/gsc-pages.csv`, `data/gsc-performance.csv`, `data/crawl.csv`,
  `data/backlinks.csv` — to build the real `data/url-map.csv` (buckets A/B/C/D) and populate
  `data/gone-urls.json`. A human reviews every row (docs/04 §2).
- [ ] **Two `google-site-verification` tokens** — reconcile to one GSC domain property
  (docs/13 §1). Add the real token(s) via `app/layout.tsx` metadata `verification`.
- [ ] **`M-51` address** — confirm what it is (mailbox / suite / staffed). GBP + LSA
  verification risk. Do **not** change it on the site; it must match the GBP.
- [ ] **Email hosting decision** (Google Workspace vs stay). Blocks DNS cutover. docs/12 §3.
- [ ] **Google Places API key + Place ID** — reviews + the leave-a-review deep link.
- [ ] **Housecall Pro embed snippet** (HCP account → Online Booking → Embed) → drop into
  `components/BookEmbed.tsx` (`#hcp-booking-embed`). Currently a direct-link fallback.
- [ ] **Housecall Pro API access** — for the webhook that creates the customer record and for
  closed-loop revenue reporting (docs/13 §5).
- [ ] **Transactional email provider** (Resend/Postmark/SES) → `RESEND_API_KEY` +
  `LEAD_EMAIL_*`. The Server Action logs the lead and never errors the user without it, but
  leads are not delivered until this is set.
- [ ] **Lead-log + HCP webhook URLs** → `HCP_LEAD_WEBHOOK_URL`, `BRD_LEAD_LOG_WEBHOOK_URL`.
- [ ] **The 1 robots.txt-blocked page + the 4 `noindex` pages + the 1 5xx + 3 404s** on the
  old site — identify, decide deliberately, resolve in the new build (docs/04 §6).
- [ ] **Real badge profile URLs** for `sameAs` (open #8c).
- [ ] **Prior-agency footer credit** — confirm no contractual obligation before launch
  (open #14). It is **not** ported.
- [ ] **Estimated job values per service** for Google Ads conversion values (open #15).
- [ ] **CallRail** — DNI swap script → `NEXT_PUBLIC_CALLRAIL_SWAP_SCRIPT`; number pool sizing;
  Colorado one-party recording notice; CallRail→GA4 and CallRail→Ads (qualified = 60s+).
- [ ] **GA4** — property + `NEXT_PUBLIC_GA4_ID`; cross-domain measurement incl.
  `book.housecallpro.com`; mark `click_call`/`click_book`/`generate_lead` as key events;
  import to Ads; enhanced conversions.
- [ ] **Baselines** (docs/13 §7) — capture the map-pack geo-grid, GSC 16-month export, GBP
  Insights, review count screenshot, LSA 6-month export **before** cutover. Store in
  `data/baseline/`.
- [ ] **LSA diagnostic** (docs/08 §4) — parallel workstream; report before launch so the two
  efforts are not confounded.

---

## 4. Known TODOs in the code (v1.1, not launch-blocking)

- **Nonce-based CSP.** `script-src` currently allows `'unsafe-inline'` for GA/GTM/CallRail +
  Next hydration. Move to a middleware nonce for routes that can afford dynamic rendering once
  the third-party set is final. (`next.config.mjs`, logged in docs/99.)
- **Section-split sitemap** (`sitemap-services` / `-locations` / `-content` under an index) —
  worth doing once the URL count grows past Tier 2. (`app/sitemap.ts`.)
- **`report:indexation`** — wire the GSC URL Inspection API call (service account) so the tier
  gate is measured, not eyeballed. Manual check works now.
- **Live preservation check in CI** against the Vercel preview URL (`test:preservation --live`)
  — stubbed in the workflow, needs the preview-URL wiring.
- **`app/opengraph-image` per route** vs the current `/api/og?title=` query route — either is
  fine; the query route is simpler and already per-page.
- **Reviews carousel** — the reviews component is a responsive grid; if a carousel is wanted
  on mobile it must stay keyboard-operable and pausable (docs/02 §9).

---

## 5. How to run the launch checklist

`planning/docs/14-launch-qa-checklist.md` is the gate. Automated half:

```bash
npm run build
npm run audit:seo
npm run audit:schema
npm run test:preservation                 # static
npm run test:preservation -- --live <preview-url>   # after deploy
```

The manual half (real test lead, real test call, real test booking, Lighthouse on 5
templates, Rich Results Test, screen-reader pass, cross-browser, "no orange" visual sweep,
owner sign-off) is on a human. **Do not launch on a Friday. Do not launch before a holiday.**
