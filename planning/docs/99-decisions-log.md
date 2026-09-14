# 99 — Decisions Log

Every decision that diverges from the docs, resolves an open question, or would confuse
someone in three months. Append only. Newest at the bottom.

Format:

```
## YYYY-MM-DD — Short title
**Decision:** what was decided
**Why:** the reasoning
**Alternatives considered:** what was rejected and why
**Affects:** which docs or files
**Decided by:** name
```

---

## Open questions — resolve and log the answer here

| # | Question | Blocks | Owner |
|---|---|---|---|
| 1 | `/electrical-services/` vs `/electrical-services-parker-co/` — which is real and indexed? | Phase 0 → IA | Build team | **INTERIM 2026-09-10** — recreated `-parker-co` at 200, 301 the bare one. VERIFY against GSC before launch (see log). |
| 2 | ~~Exact brand blue and green hexes from the logo~~ **RESOLVED 2026-09-10** — `#0165AC` / `#008E6C` (action-green `#007A5C` for AA). See log. | All design work | Build team |
| 3 | Which of the two Search Console properties is canonical? | All reporting | Account manager |
| 4 | What is `M-51` in the address? Mailbox, suite, or staffed location? | GBP config, LSA verification | Account manager → owner |
| 5 | Email hosting: migrate to Google Workspace or leave in place? | DNS cutover | Owner |
| 6 | Google Places API key and Place ID | Live reviews, review-request link | Account manager |
| 7 | Approved price ranges for each service | Service page copy | Owner |
| 8 | ~~Real award badge assets~~ **RESOLVED 2026-09-08** — recovered from the live site into `assets/badges/`. Five badges. Profile URLs still needed. | Trust bar, `sameAs` | Account manager |
| 8a | Do newer Houzz / Angi / Nextdoor badges exist? The ones on site are 2022–2023. | Trust bar | Account manager → owner |
| 8b | Official high-res badge assets from each program's kit | Trust bar | Account manager |
| 8c | Full-resolution original of the Jud bathroom photo (site copy is 252×252) | Hero image | Owner |
| 9 | Housecall Pro booking embed snippet and API access | Booking, closed-loop reporting | Account manager |
| 10 | LSA diagnostic result — why one lead in six months? | Nothing in the build, but changes the reporting story | Account manager |
| 11 | Which page is blocked by robots.txt, and should it stay blocked? | Launch | Build team |
| 12 | Were the 4 `noindex` pages intentional? | Launch | Build team |
| 13 | Electric utility per city — CORE vs Xcel boundaries | City pages, rebate content | Build team |
| 14 | Any contractual obligation to keep the prior agency's footer credit? | Launch | Account manager |
| 15 | Estimated job values per service, for Google Ads conversion values | Ads optimization | Owner |

---

## Log

## 2026-09-08 — No CMS
**Decision:** Next.js with content in typed data files. No WordPress, no headless CMS.
**Why:** The owner accepted this on the recorded call and understands changes route through the
agency. Flat static output is the direct fix for the indexation and performance problems.
**Alternatives considered:** WordPress rebuild (owner's initial preference, he was talked
through it and agreed to Next.js); headless CMS (added cost and complexity for a client who
does not want to edit his own site).
**Affects:** CLAUDE.md §2
**Decided by:** Chris Lee, with the owner

## 2026-09-08 — Preserve the flat root-level service URL pattern
**Decision:** New service pages sit at the root (`/generator-installation/`) rather than under
`/services/`.
**Why:** The 13 existing service pages are already at the root and indexed. Moving them costs
rankings for no benefit; putting new pages elsewhere creates two patterns.
**Alternatives considered:** Migrating everything to `/services/` — rejected, all downside.
**Affects:** docs/03 §1
**Decided by:** Build plan

## 2026-09-08 — 410 rather than blanket-301 for retired pages
**Decision:** Bucket-D pages return 410 Gone, not a 301 to the homepage.
**Why:** ~400 pages of dead weight are consuming crawl budget. A blanket 301 to the homepage is
treated as a soft 404 and keeps the URLs in the crawl queue. A 410 clears them fastest, which is
the point.
**Alternatives considered:** 301 to homepage (soft-404 risk); plain 404 (slower removal).
**Affects:** docs/04 §1, §4
**Decided by:** Build plan

## 2026-09-08 — Launch without aggregateRating markup
**Decision:** Display live Google reviews for humans, but no `aggregateRating` or `Review`
schema until first-party review collection exists.
**Why:** Marking up third-party reviews as first-party rating data violates Google's structured
data guidelines and risks a manual action. On a domain already struggling to get indexed, that
trade is not worth a star snippet.
**Alternatives considered:** Marking up the Google reviews anyway — rejected on guideline risk.
**Affects:** docs/06 §3, docs/07 §5
**Decided by:** Build plan

## 2026-09-08 — Award badges recovered from the live site
**Decision:** Use the five badges already on the client's site rather than sourcing new ones.
Cropped to individual transparent PNGs in `assets/badges/`.
**Why:** The audit initially read the four repeated images as broken badges. They are the logo
repeated. The real badges were sitting elsewhere on the homepage as an unlinked composite strip.
**Two corrections this forced:** "Neighborhood Favorite" is a **Nextdoor** award, not
HomeAdvisor — the call transcript ran the two together. And there is a **Best of Houzz** award
that appears in neither the call nor the intake form.
**Open risk:** three of the five carry 2022–2023 dates. Do not publish a stale award without
checking for a newer one first. BBB and HomeAdvisor are undated and safe.
**Affects:** docs/01 §1, docs/07 §6, docs/10 §4, docs/14, assets/README.md
**Decided by:** Chris Lee

## 2026-09-08 — Page ceiling of ~125, released behind indexation gates
**Decision:** Target roughly 125 pages at twelve months, released in six gated tiers, rather
than recreating 588 pages.
**Why:** 86 of 588 pages are currently indexed. The failure mode was volume without quality.
Publishing the same volume faster reproduces it.
**Alternatives considered:** Full programmatic build of 144+ city × service pages at launch —
rejected; it is the exact pattern that produced 493 unindexed pages.
**Affects:** docs/03 §5, docs/09 §1, §3
**Decided by:** Build plan

## 2026-09-10 — Brand hexes eyedropped from the logo (closes open question #2)
**Decision:** `--brand-blue: #0165AC` (house mark + wordmark), `--brand-green-bright: #008E6C`
(pine + tagline). The action-green used on buttons is darkened to **`#007A5C`** so white text
on it clears WCAG AA (4.5:1); the true logo green #008E6C is 4.1:1 and is used only for
non-text accents (the availability dot, hairlines). Footer/hover blue is `#024D80`.
**Why:** Provisional values in docs/02 §2 (`#1F4E79` / `#4C8B54`) were placeholders. Sampled
`planning/assets/brand/allsafe-electric-logo.png` — dominant blue #0165AC across 1,500+ px of
the house icon, dominant green #008E6C across the pine. Contrast maths in `tailwind.config.ts`.
**Alternatives considered:** Using the raw logo green on buttons — rejected, fails AA.
**Affects:** docs/02 §2, `tailwind.config.ts`, `app/globals.css`
**Decided by:** Build team

## 2026-09-10 — Full Next.js + Vercel build; Tier 0 + Tier 1 city pages authored (gated)
**Decision:** Built the site as specified in CLAUDE.md §2 — Next.js 15 App Router, TypeScript,
Tailwind, RSC by default, `next/image`, hand-authored `<Schema />`, Server Action form,
ISR-only reviews route. Tier 0 (home, 16 services, About/Reviews/Coupons/Contact/Book/
Service-area/Resources/Privacy) is launch-ready. The 5 Tier-1 city pages are **authored and
in the repo but gated**: `lib/publish.ts` `TIER_1_CITIES = false` → they are `noindex`, absent
from `sitemap.xml`, and not in nav/footer browse lists. Flip the flag only after
`npm run report:indexation -- --tier=0` clears 80% AND ≥14 days since launch (docs/09 §3).
**Why:** The client asked for the geo-targeted pages to exist; the tier gate governs
*publication*, not authoring. Building them now with the real `data/service-areas.csv` detail
means they are ready to ship the moment the gate clears, without a fresh content sprint.
**Affects:** docs/09 §3, `lib/publish.ts`, `app/sitemap.ts`, `app/electricians/[city]/page.tsx`
**Decided by:** Build team + client request

## 2026-09-10 — Dependencies added
**Decision:** Beyond next/react/react-dom: `server-only` (RSC guard), and build-time-only
`sharp` (image processing), `csv-parse` (redirect map + preservation test), `marked`
(blog Markdown → HTML, server-side render, not shipped to client), `node-html-parser`
(audit scripts parse prerendered HTML), `tsx`, `dotenv`, `glob`. **Zero of these ship in the
client bundle.** Shared First Load JS is ~103 KB uncompressed (~40 KB gzipped) — inside the
120 KB gzipped budget in docs/05 §5.
**Why:** `sharp`/`csv-parse`/`marked` are the minimal tools for the image pipeline, the
redirect mechanism, and the no-CMS blog. `node-html-parser` makes the guardrail scripts
robust vs. regex.
**Affects:** CLAUDE.md §4, `package.json`
**Decided by:** Build team

## 2026-09-10 — Front matter is enforced as typed data, not MDX front matter
**Decision:** CLAUDE.md §4 asks every content file for `title / metaDescription / canonical /
primaryKeyword / schemaTypes / lastReviewed` front matter. Services and cities are **typed TS
data** (`lib/services.ts`, `lib/cities.ts`) with the equivalent fields (`title`,
`metaDescription`, `primaryKeyword`, `secondaryKeywords`, canonical derived from `slug`,
`schemaTypes` fixed by template, review cadence in `data/content-review-schedule.csv`). Blog
posts keep a real `--- ---` front-matter block. `npm run audit:seo` + `audit:schema` enforce
the outcomes (unique 50–60 title, 140–158 description, self-canonical, required schema types)
on the built HTML — which is stricter than a field-presence check.
**Why:** Typed data is what "a non-developer can still read" (CLAUDE.md §2) and it makes the
16 service pages impossible to drift apart. The audit-on-output check is the real guardrail.
**Affects:** CLAUDE.md §4, §6
**Decided by:** Build team

## 2026-09-10 — Placeholders shipped with explicit flags (price ranges, reviews, offers)
**Decision:** Per the client's instruction, questionable/pending content is scaffolded and
visibly marked, never published as fact:
- **Price ranges** — every service shows a range inside a "*Estimated range … your exact price
  is fixed in writing*" treatment. Only the **panel-upgrade $2,200–$4,500** figure is
  doc-sourced (docs/09 §4); all 15 others carry `needsApproval: true` and are listed in
  `BUILD-NOTES.md` for owner sign-off. `PriceRange` renders the caveat automatically.
- **Reviews** — no review text is invented. The reviews section renders a designed "read on
  Google" state until `npm run fetch:reviews` runs with a Places API key + Place ID
  (open items #6). No `aggregateRating` / `Review` schema is emitted (docs/06 §3).
- **Coupons** — `data/coupons.json` ships empty; the page shows the always-on value props only.
- **Award badges** — only the two **undated** badges (BBB A+, HomeAdvisor) render;
  `SHOW_DATED = false` in `components/TrustBadges.tsx` holds Best of Houzz 2023 / Angi 2022 /
  Nextdoor 2022 until newer ones are confirmed (open item #8a). Nextdoor is labelled Nextdoor.
- **City utility** — CORE vs Xcel per city carries a visible "verify your address" flag
  (open item #13).
**Affects:** CLAUDE.md §1.8, docs/06 §3, docs/07 §5–6, docs/09 §4
**Decided by:** Build team + client instruction

## 2026-09-10 — /electrical-services/ → /electrical-services-parker-co/ (interim, VERIFY)
**Decision:** `next.config.mjs` 301s `/electrical-services/` → `/electrical-services-parker-co/`
and a matching row is seeded in `data/url-map.csv`. The `-parker-co` hub is the one recreated
at 200; it is the nav/footer target and the one in `data/preserved-urls.csv`.
**Why:** The live homepage hero links to `/electrical-services/` and nav/footer to
`/electrical-services-parker-co/`; one is likely a live 404 (open question #1). Consolidating
to the nav/footer version is the safe default.
**RISK / TODO:** Confirm against the GSC Pages report which of the two actually has impressions
and inbound links before launch. If `/electrical-services/` is the indexed one, swap the
recreated URL and the redirect direction. Do not launch without checking.
**Affects:** docs/03 §2, CLAUDE.md §5, `next.config.mjs`, `data/url-map.csv`
**Decided by:** Build team

## 2026-09-10 — Sitemap is single-file for now (not section-split)
**Decision:** `app/sitemap.ts` emits one `/sitemap.xml` with all Tier-0 + blog URLs. docs/05 §3
asks for `sitemap-services / -locations / -content` under an index. Next 15's `generateSitemaps`
produces `/sitemap/services.xml` etc. but does **not** auto-create the `/sitemap.xml` index,
and a hand-rolled index route was judged more fragile than valuable at ~30 URLs.
**TODO (v1.1):** split once the URL count grows (post Tier 2) — noted in the file.
**Affects:** docs/05 §3, `app/sitemap.ts`
**Decided by:** Build team

## 2026-09-10 — Content Security Policy shipped with script 'unsafe-inline'
**Decision:** `next.config.mjs` sets a full CSP (default-src 'self', object-src 'none',
frame-ancestors 'self', host-allowlisted script/img/connect/frame), HSTS preload,
X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP. `script-src` includes
`'unsafe-inline'` (+ googletagmanager, cdn.callrail.com).
**Why:** GA4/GTM/CallRail and Next's hydration bootstrap need it; a nonce-based CSP forces
dynamic rendering and breaks full SSG on affected routes.
**TODO (hardening):** move to nonce-based CSP via middleware for the routes that can afford it,
once the third-party set is final. Documented in `BUILD-NOTES.md`.
**Affects:** docs/14 "Legal and privacy", `next.config.mjs`
**Decided by:** Build team

## 2026-09-10 — House style: no em dashes, enforced in CI
**Decision:** Em dashes are banned from all customer-facing copy. All 273 occurrences were
rewritten as periods, commas or restructured sentences. `scripts/audit-seo.ts` now fails the
build if a single `—` appears in the visible text of any rendered page.
**Why:** Client feedback: a page dense with em dashes reads as machine-written, which is the
opposite of the trust this site exists to build for an audience that is already sceptical.
**Note:** EN dashes in ranges are correct typography and are deliberately still allowed:
`Mon–Fri`, `$2,200–$4,500`, `1960–1983`.
**Affects:** every content file, `scripts/audit-seo.ts`
**Decided by:** Client

## 2026-09-10 — Design v2: wider palette, larger type, more copy, more varied photography
**Decision:** Reworked the visual system on client direction. It stays inside the brand
(blue and green, still zero orange) but is materially warmer and more modern:
- **Palette widened** from two colours to full blue and green ramps (50 to 900) plus a teal
  secondary, a warm `sand` neutral for section alternation, and a gold used only for star
  ratings. Every added hue sits OUTSIDE the 16 to 34 degree orange band the audit fails on.
- **Type scale rebuilt** on fluid `clamp()` sizes with a new `display` tier for heroes and
  tighter tracking on large sizes.
- **Surfaces modernised**: card radius 6px to 14px, layered and brand-tinted shadows, subtle
  grid and blur-glow backgrounds, coloured chips, icon tiles, and a restrained hover state on
  cards.
- **More copy** throughout: services gained `blurb`, `highlights` and `included` fields; the
  homepage gained a stat band, a "Meet Jud" section and a work gallery; the FAQ went from 7
  to 10 questions; service pages gained a "what the price covers" block and a second photo.
- **Photography spread out.** Roughly half the service heroes are now detail or product shots
  (a lit chandelier, a ceiling fan, an open panel, a USB outlet) rather than another photo of
  Jud, and the four homepage proof cards use four visually distinct images. Previously two
  near-identical tablet shots sat side by side.
**Divergence from docs/02, logged deliberately:** §6.4 asks for no radius beyond 6px and §7
for no hover state on cards; §2 discourages decorative gradients. The client asked for a more
modern feel and these are the levers that deliver it. The load-bearing rules are untouched:
no orange, green stays the action colour, blue stays structural, `--urgent` is still emergency
only, one bold element per page, and `prefers-reduced-motion` is respected.
**Affects:** `tailwind.config.ts`, `app/globals.css`, every component and page
**Decided by:** Client

## 2026-09-10 — Dark-surface link colour bug, fixed at the root
**Decision:** Added a `.surface-dark` class. Any dark ground (footer, CTA band, availability
strip, sticky bar) sets `color: #fff` and makes descendant anchors inherit it.
**Why:** The base `a { color: brand-700 }` rule was winning on anchors that carried no explicit
text colour, so the mobile sticky bar rendered a blue icon and blue "Book" label on the green
segment. Effectively invisible. Per docs/02 §6.5 and §2 that bar is a blue ground with a green
Book segment and white text on both.
**Affects:** `app/globals.css`, `components/StickyBar.tsx`, `Footer.tsx`, `sections.tsx`,
`AvailabilityStrip.tsx`
**Decided by:** Client report, build team fix

## 2026-09-10 — Client palette + designer homepage adopted; "no orange" reversed

**Decision:** The client supplied a Claude-generated homepage design from their designer
(artifact 3f589566-2420-48b6-8eda-34269e1979ba) and their live brand palette, and instructed
us to build to both. This **reverses CLAUDE.md §1.6 ("no orange")**.

Palette now in use (`tailwind.config.ts`, `app/globals.css`):
| Token | Hex | Role |
|---|---|---|
| blue-600 | `#0068A8` | primary, structural, links, headers |
| orange-500 | `#FF6600` | accent, primary CTAs, eyebrows, icons, badges |
| slate | `#54595F` | body copy |
| grey | `#7A7A7A` | secondary / muted text |
| ink / black | `#000000` | headings |
| navy | derived `#0A2E4C` family | hero / CTA / footer grounds |

**Why:** Direct, specific, repeated client instruction (named the design, then named the exact
hex list). The agency is the decision-maker for their client's brand direction. The original
"no orange" line traced to the owner's words in `docs/01`; flagged this conflict to the client
before proceeding and they confirmed the palette.

**Fonts:** switched to Poppins (display/headings) + Inter (body), matching the Elementor-style
geometric look of the artifact. Was Figtree + Newsreader.

**Layout:** homepage rebuilt section-for-section to the artifact — black info top bar, sticky
white header, navy hero with a curved bottom edge and an overlapping estimate form, stats band,
about with stacked images + BBB tag, 4-card services row, "why choose us" 2×2, service areas
+ map, testimonials, FAQ with a blue contact card, navy CTA band. All-caps hero heading and
eyebrows are now allowed (the artifact uses them), which diverges from `docs/02` §3.

**Audit change:** `scripts/audit-seo.ts` no longer bans orange. It now only *warns* on stray
vivid colours outside the approved palette + mandated third-party brand colours.

**Affects:** CLAUDE.md §1.6, docs/02 (largely superseded), `tailwind.config.ts`,
`app/globals.css`, `app/layout.tsx`, `app/page.tsx`, every component, `scripts/audit-seo.ts`
**Decided by:** Client (production-wq), flagged and confirmed

## 2026-09-10 — Blog rebuilt from the WordPress export; posts live under /blog/

**Decision:** The client supplied the full WordPress XML export and the `wp-content/uploads`
folder. The old site had **6 blog posts** (4 published, 2 scheduled) at root-level URLs. We:
- Deleted the 4 interim posts written on 2026-09-08.
- Rewrote all 6 WP posts in Jud's voice (plain, homeowner-facing, first person, answer-first),
  keeping the useful technical facts and the local geo angle, dropping the corporate/AI tone.
  Titles and slugs preserved.
- Blog index stays at `/blog/`, posts at `/blog/{slug}/` (client instruction). Added six 301s
  in `data/url-map.csv` from the old root URLs to the new `/blog/` paths.

Posts: `residential-ev-charging-castle-rock`, `denver-whole-home-surge-protection`,
`signs-electrical-panel-services-aurora`, `home-electrical-safety-inspection-parker`,
`professional-outdoor-lighting-centennial`, `emergency-electrical-repairs-highlands-ranch`.

**Images:** pulled a handful of genuinely useful photos from `uploads/` into the pipeline
(Jud's headshot `judson-cushing-allsafe-electric.png`, a family + dog lifestyle shot, a
suburban home exterior). Most WP marketing images are low-res (370×245, 520×265) so the 58
original client photos remain the primary source. No new Gemini images were needed for this
pass — the designer's homepage is text-and-form driven and uses fewer photos than the prior build.

**Testimonials:** the 4 real reviews shown on the homepage (Todd, D.L., Mark, Nathan) are
carried verbatim from the client's own previously published site (`/home-1` page in the export),
stored in `data/testimonials.json`. Not invented. No `aggregateRating`/`Review` schema is
emitted from them (docs/06 §3).

**Affects:** `content/blog/*`, `data/url-map.csv`, `data/testimonials.json`,
`components/Testimonials.tsx`, `data/image-manifest.json`
**Decided by:** Client

---

## 2026-09-15 — Positioning pivot: company-wide, not individual-dependent

**Decision:** All site copy, docs, and planning language is updated to sell Allsafe Electric as
a scaling company serving 21 communities, not as a two-person operation defined by its owner.
The trust promise is operational ("a real person answers", "we show up on time") not personal.

**Why:** The current About page H1 reads "It's Jud and Justin. That's the company." The
timeline section actively states "Still deliberately two people." This language is:
(a) commercially limiting — it signals that booking is effectively booking one of two people,
(b) factually risky — Justin's status is not confirmed and any copy naming him creates
    liability if his role changes,
(c) SEO-limiting — a company locked to two individuals cannot plausibly serve a 21-community
    metro in the eyes of a reader or a search engine.
The site must support adding staff without requiring a rewrite.

**Alternatives considered:** Keep the two-person angle as a differentiator and add a team page
later. Rejected — a team page addition would require removing or contradicting the existing
"deliberately small" copy, which is harder than removing it now.

**Affects:** CLAUDE.md, docs/01, docs/02, docs/03, docs/07, docs/09, app/about/page.tsx
(Part B), components/Footer.tsx (Part B).

**Decided by:** Built Right Digital / client brief pivot, 2026-09-15.

---

## 2026-09-15 — Justin removed from all Allsafe-authored copy

**Decision:** Justin does not appear anywhere in Allsafe-authored copy (headings, body,
metadata, team sections, CTAs, About page, schema). Customer review text that names Justin
verbatim is exempt — it is the customer's words.

**Why:** Justin is identified in the audit as not to appear anywhere ("no exceptions" noted
in the audit). His role in the business going forward is not confirmed. The site cannot publish
a team member section for someone whose continued role is uncertain.

**Alternatives considered:** Replace "Justin" with a generic team-member card (e.g. "our
licensed electricians"). Rejected as the page still implies exactly two. Simply removing the
section (which is what will happen) is cleaner.

**Affects:** app/about/page.tsx (Part B), any page referencing Justin.

**Decided by:** Allsafe Electric site audit, implemented 2026-09-15.

---

## 2026-09-15 — Anti-scale language banned across all docs and site copy

**Decision:** The following phrases are explicitly banned and must be removed from all docs and
site copy. The audit script (Part C) will fail the build on these patterns.

- "Still deliberately two people"
- "Growing headcount would mean sending electricians the customer has never met"
- "The company stays small on purpose"
- "one of two licensed electricians shows up, and it is usually Jud"
- "Jud answers his own phone" (personal promise, person-dependent)
- "The closer you are, the faster Jud can be there"
- "Meet Jud on your next electrical job"
- "He is usually the person who answers the phone"
- "two-man" in a context that limits company size

**Replacement pattern:** Reframe as company standards. "A real person answers." "A licensed
electrician arrives on time." "Fixed price before any work starts." "Schedule your visit."

**Why:** These phrases actively undermine the 21-community metro positioning and create
conversion friction for any user asking "but what if he's busy?"

**Affects:** app/about/page.tsx, CLAUDE.md §8, scripts/audit-seo.ts (Part C).

**Decided by:** Built Right Digital, 2026-09-15.

---

## 2026-09-15 — Vendor names banned from customer-facing copy

**Decision:** No third-party vendor or tool name appears in any customer-facing HTML.
Not in copy, not in metadata, not in headings. Internal docs may reference tool names for
build-team clarity.

**Violations to fix (confirmed from site audit):**
- About page "details" sidebar: `<dd>Housecall Pro</dd>` under "Scheduling" → replace with
  "book online any time"
- Any other `Housecall Pro` string in a rendered page
- `CallRail`, `GA4`, `Vercel` do not appear in body copy but the pattern is prohibited

**Why:** Vendor names mean nothing to the homeowner visitor. They also create vendor-lock
perception and expose the company's toolchain unnecessarily.

**Affects:** app/about/page.tsx (Part B), audit script (Part C).

**Decided by:** Built Right Digital, 2026-09-15.

---

## 2026-09-15 — Internal doc labels banned from customer-facing copy

**Decision:** Internal planning terms ("Tier 0", "Tier 1", "Tier 2", "Phase 0", "Batch 1",
"see planning/docs/09") do not appear in any customer-facing page copy, metadata, headings,
or visible HTML. They may appear in code comments, build scripts, and planning docs.

**Why:** The audit found a confirmed instance of staging notes rendering on public pages.
Grepping for these terms should be part of every pre-deploy check.

**Affects:** scripts/audit-seo.ts (Part C), all page files (Part B).

**Decided by:** Built Right Digital, 2026-09-15.

---

## 2026-09-15 — British spellings banned; audit script enforced

**Decision:** American English is the mandatory standard. The audit script will fail the build
on: "aluminium", "neighbourhoods", "minimise", "colour", "favour", "analyse", "recognised",
"centre", "licence" (as a verb), "labour", "behaviour", "realise", "authorise".

**Known instances to fix (Part B):**
- "aluminium" → "aluminum" (confirmed in service copy)
- "neighbourhoods" → "neighborhoods" (confirmed in footer copy)
- "minimise" → "minimize" (confirmed in copy)

**Why:** The market is Colorado. British spellings are keyword mismatches ("aluminum wiring"
is a real search query; "aluminium wiring" is not common in the US). They also signal that
copy was generated by a non-American model without adequate review.

**Affects:** scripts/audit-seo.ts (Part C), components/Footer.tsx (Part B), service pages
(Part B).

**Decided by:** Built Right Digital, 2026-09-15.

---

## 2026-09-15 — Single URL pattern per page type; city-page canonical is /electricians/{city}-co/

**Decision:** Only one URL pattern exists per page type. The directory pattern
`/electricians/{city}-co/` is canonical for city pages. Every instance of `/electrician-{city}/`
(flat pattern) must 301 redirect to the directory pattern. Internal links, footer links,
sitemap entries, and schema `url` values must all point to the canonical pattern only.

**Why:** The current site has both `/electrician-parker/` and `/electricians/parker-co/` active
simultaneously (the flat set is indexed, the structured set has hub links but is noindex). This
creates duplicate content, split link equity, and competing canonicals. The directory pattern
is chosen because it scales cleanly, groups the section for internal linking, avoids 21
root-level slugs at the top level, and the `-co` suffix supports state disambiguation.

**Affects:** docs/03, CLAUDE.md §9, data/url-map.csv, app directory structure (Part B),
middleware.ts (Part B), next.config.mjs (Part B), scripts/audit-seo.ts (Part C).

**Decided by:** Built Right Digital, 2026-09-15.

---

## 2026-09-15 — Services hub and emergency page URLs corrected to metro-neutral slugs

**Decision:**
- Services hub: `/electrical-services/` is canonical. 301 `/electrical-services-parker-co/`
  → `/electrical-services/`. **PENDING GSC VERIFICATION** — confirm which URL has impressions
  before assuming the bare one is not indexed. Update open question #1 when verified.
- Emergency page: `/emergency-electrical-repairs/` is canonical. 301
  `/emergency-electrical-repairs-parker-co/` → `/emergency-electrical-repairs/`.

**Why:** Parker-city-locked slugs on service hub and emergency pages prevent metro-wide
ranking. These are the most commercial pages on the site. Baking a single city into their
URL and their H1 is equivalent to opting out of all other cities.

**Alternatives considered:** Keep the `-parker-co/` versions and add city variants. Rejected —
the hub and emergency page are not city-specific pages; they are metro-wide pages. Adding city
variants compounds the problem.

**Affects:** docs/03 §2 and §3, CLAUDE.md §9, data/url-map.csv, next.config.mjs (Part B),
docs/06 schema `url` for the emergency service entry.

**Decided by:** Built Right Digital, 2026-09-15.

---

## 2026-09-15 — Factual data locked for site copy

**Decision:** The following values are locked and must be used everywhere consistently.
Contradicting values on the live site are incorrect. Change `lib/business.ts` so every
component derives from a single source.

| Field | Locked value | Old incorrect value seen |
|---|---|---|
| Review count | 149 | "400+" on homepage |
| Star rating | 5.0 | "5-Star Reviews" (ambiguous) |
| Years in business | 8 (founded Jan 2018) | "15+" on homepage |
| Trade experience | "15+ years" | "20+ years" on Yelp/Nextdoor |
| Company founded | January 2018 | N/A |

Correct copy: "8 years in business. 15+ years of master electrician experience."
Not: "15+ years in business." Not: "20+ years experience."

**Why:** Inflated claims create credibility damage when a reader notices the math doesn't
work. "Founded 2018" is on the site; "15+ years in business" implies founded 2011. The
conflict is visible and undermines trust.

**Affects:** lib/business.ts, app/about/page.tsx, app/page.tsx, components/Footer.tsx,
all schema `foundingDate` values.

**Decided by:** Allsafe Electric site audit, 2026-09-15.

---

## 2026-09-15 — Service area framing: "21 communities across four counties"

**Decision:** The service area is described as "21 communities across four counties" (Douglas,
Arapahoe, Elbert, and Jefferson). Do not use "21 towns" — Stonegate and The Pinery are Parker
neighborhoods, and Dove Valley / Acres Green are unincorporated communities. "Communities" is
accurate and inclusive.

The label "towns" from the About page stat band ("Towns we cover") is incorrect and must be
updated. The footer tagline "serving Parker, Colorado and its surrounding neighborhoods" must
be updated to reflect metro-level coverage.

**Affects:** components/Footer.tsx (Part B), app/about/page.tsx stat band (Part B),
app/service-area/page.tsx (Part B), docs/03 §10.

**Decided by:** Built Right Digital, 2026-09-15.

---

## 2026-09-15 — "Free Estimate" label replaced with "Get a Quote"

**Decision:** The primary CTA label changes from "Free Estimate" to "Get a Quote" (or
"Book a Visit" where the action is booking). The form submit button says "Get my quote."

**Why:** The FAQ discloses a diagnostic/service call fee. A button labeled "Free Estimate"
directly contradicts this and creates friction when a customer reads both. "Get a Quote"
accurately describes the action (requesting a price quote) without implying no fee.

**Alternatives considered:** Remove the FAQ disclosure. Rejected — the diagnostic fee is real
and hiding it would generate angry customers and bad reviews.

**Affects:** docs/07 §1, CTA components (Part B), form submit button (Part B).

**Decided by:** Built Right Digital, 2026-09-15.
