# CLAUDE.md — Allsafe Electric Website Build

You are building the new website for **Allsafe Electric** (allsafehomeservice.com), a residential
electrician serving 21 communities across the south Denver metro area. This file is loaded every
session. Read it fully before acting.

Client of Built Right Digital. Owner: Judson "Jud" Cushing, master electrician.
The site represents the COMPANY, not any individual. See §7.

---

## 0. Read order (do this first, every new session)

1. This file
2. `docs/01-client-brief.md` — who they are, what the owner actually said
3. `docs/03-information-architecture.md` — the URL map (this is the contract)
4. `docs/05-technical-seo-spec.md` — the non-negotiable rules
5. Whatever doc covers the task at hand

Do not start writing components before you have read 01, 03, and 05.

---

## 1. Prime directives

These override anything else. If a request conflicts with one of these, stop and flag it.

1. **Never break an indexed URL.** Every URL in `data/preserved-urls.csv` must resolve at
   HTTP 200 at the exact same path, or 301 to a closely-matched replacement. Zero exceptions.
   This site's only working asset is its homepage ranking in Parker. Losing it is catastrophic
   and unrecoverable within the client's patience.
2. **One H1 per page, in document order, describing the page.** The current site wraps entire
   paragraphs in `<h2>`. This is a primary reason pages do not rank. Never use a heading tag
   for visual sizing.
3. **Every page ships with valid, page-appropriate JSON-LD.** No page goes live without it.
   See `docs/06-schema-spec.md`.
4. **Three conversion actions on every page:** click-to-call, click-to-book (online booking),
   and an on-page form. Never fewer. See `docs/07-conversion-spec.md`.
5. **NAP is byte-identical everywhere.** See §3 below. A single inconsistency is suspected to be
   part of why their Local Services Ads have produced one lead in six months.
6. **Follow the client's supplied palette.** Palette: `#0068A8` blue (primary/structural),
   `#FF6600` orange (accent, CTAs, eyebrows), `#54595F` slate (body), `#7A7A7A` grey (muted),
   `#000000` black (headings). Dark sections use a navy derived from the blue. See
   `docs/02-design-system.md` and `docs/99-decisions-log.md` for the full history.
7. **Do not publish page tiers out of order.** Indexation gates are defined in
   `docs/09-content-plan.md`. Publishing 500 pages at once is what broke the current site
   (86 of 588 pages indexed). Do not repeat it.
8. **Never invent a review, a rating, a license number, an award, or a year.** If a fact is not
   in `docs/01-client-brief.md` or a source file, ask.
9. **The site sells the company, not an individual.** Allsafe Electric is scaling across a
   21-community metro area. The site must support adding staff without contradiction. See §8.
10. **One URL pattern per page type, enforced.** See §9. A second pattern for the same page type
    is a structural bug, not a style choice.
11. **Zero vendor names on customer-facing pages.** Do not write "Housecall Pro", "CallRail",
    "GA4", "Vercel", or any third-party tool name in copy, headings, or metadata that visitors
    see. Use plain descriptions: "book online", "call tracking", "analytics".
12. **Zero internal doc references in customer-facing copy.** Do not write "Tier 0", "Tier 1",
    "see planning/docs/09 §3", or any internal label in page copy, metadata, or visible HTML.
    These are build-team vocabulary, invisible to visitors.
13. **American English only.** The market is Colorado. Use "aluminum", "neighborhoods",
    "minimize", "color", "license". Any British spelling in page copy is a build failure.

---

## 2. Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router), TypeScript, React Server Components by default |
| Styling | Tailwind CSS with design tokens from `docs/02-design-system.md` |
| Rendering | Static (SSG) for all marketing pages; ISR only for the live reviews feed |
| Images | `next/image`, AVIF + WebP, explicit width/height on every image |
| Hosting | Vercel |
| Forms | Next.js Server Action → email + webhook. No third-party form iframe. |
| Booking | Online booking (external link, embedded widget on `/book/`) |
| Analytics | GA4 + Google Search Console + call tracking |
| Schema | Hand-authored JSON-LD in a typed `<Schema />` component. No plugin. |

No CMS. The owner accepted this on the call and understands changes route through the agency.
Content lives in typed MDX/TS data files so a non-developer can still read it.

---

## 3. Canonical business facts — copy these exactly, never paraphrase

```
Legal/brand name:  Allsafe Electric
Domain:            allsafehomeservice.com   (singular "service" — do not typo)
Owner:             Judson Cushing ("Jud")
Address:           11479 Pine Dr M-51, Parker, CO 80134
Primary phone:     (303) 648-1934      tel:+13036481934
Email (public):    info@allsafehomeservice.com
Email (leads to):  allsafehomeservices@gmail.com   (plural — this one IS plural)
Hours:             Mon–Fri 08:00–18:00 America/Denver
Founded:           January 2018
Master license:              ME.0601023
Electrical contractor lic.:  EC.0101068
Google Business Profile CID: 2391241286444373261
GBP hex ID:                  0x876c921d22f6e837:0x212f6547dac3d50d
Facebook:          https://www.facebook.com/Allsafehomeservices/
Booking URL:       https://book.housecallpro.com/book/ALLSAFE-%20%20ELECTRIC/90cac4ddcd384b32ac8f1b8fd91f6562?v2=true
Google reviews:    149
Rating:            5.0
Founded:           January 2018 (8 years in business)
Jud's experience:  15+ years as a master electrician (NOT the company's age)
GBP type:          Location-based at 11479 Pine Dr M-51 — citations must match exactly
Service area:      21 communities across 4 counties, all confirmed serviceable
```

**Derived URLs you will need:**

- Leave a review: `https://search.google.com/local/writereview?placeid=` *(needs Place ID, request it — do not guess)*
- Read reviews: `https://www.google.com/maps?cid=2391241286444373261`
- Directions: `https://www.google.com/maps/dir/?api=1&destination=Allsafe+Electric+Parker+CO`

**Phone number rule:** the site displays a call-tracking number for attribution. The
`LocalBusiness` schema `telephone` field and the footer NAP block must use the **real**
number `(303) 648-1934`. The dynamic number insertion swaps the display number
client-side only. Never hard-code a tracking number into schema, structured data, `<address>`,
or the footer NAP. This is currently broken on the live site.

---

## 4. Working agreements

- **Ask before deleting.** If a task implies removing an existing URL, stop and confirm.
- **Every content file gets front matter** with `title`, `metaDescription`, `canonical`,
  `primaryKeyword`, `schemaTypes`, `lastReviewed`. Build fails if any are missing.
- **Run the audit script before every commit:** `npm run audit:seo`. It checks heading order,
  meta length, schema validity, internal link targets, image alt text, and orphan pages.
  See `docs/14-launch-qa-checklist.md`.
- **Commit messages** reference the doc section driving the change, e.g.
  `feat(schema): add Service + FAQPage to panel pages (docs/06 §4.2)`.
- **When you learn something the docs do not say**, append it to `docs/99-decisions-log.md`
  with the date and reason. Do not silently diverge.
- **Do not add a dependency** without noting why in the decisions log. Every kilobyte of JS
  costs mobile conversion for an audience that is often searching on a phone in a house with
  no power.

---

## 5. Known traps on this project

| Trap | What to do |
|---|---|
| `/electrical-services/` vs `/electrical-services-parker-co/` | Both are referenced on the live site. One likely 404s. Verify which is indexed, keep that one, 301 the other. Do not guess. |
| `/lighting-services/` vs `/outdoor-lighting/` | Near-duplicate, cannibalizing. Consolidate per `docs/04-url-migration.md`. |
| Two different `google-site-verification` tokens across pages | There are probably two GSC properties. Reconcile before launch or you will read the wrong data. |
| The 4 identical "award badge" images | Those four are the **logo**, repeated. The real badges are a separate composite strip elsewhere on the homepage, recovered and cropped into `assets/badges/`. Five badges, three of them dated 2022–2023. Read `assets/README.md`. |
| Empty `href=""` links in the current footer/sidebar | Do not port these. Every link gets a real target or is not a link. |
| SiteGround bot-challenge wall | Current host serves a captcha interstitial to non-Google crawlers. Moving to Vercel removes it. Confirm removal post-launch. |
| Email hosting is on the current host | Migrating hosting will break email if DNS is moved carelessly. See `docs/12-migration-runbook.md` §3 before touching DNS. |
| Address contains "M-51" | Possible mailbox/suite. Flagged as a GBP and Local Services Ads verification risk. Do not change it on the site; escalate to the account manager. |
| Two city-page URL patterns | `/electrician-{city}/` (flat) and `/electricians/{city}-co/` (directory) both exist. **Keep `/electricians/{city}-co/` only.** 301 every flat pattern. See §9. |
| British spellings | "aluminium", "neighbourhoods", "minimise" appear in legacy content. Replace with American spellings in every file you touch. The audit script fails on British spellings. |
| Vendor names in copy | Vendor product names appear in some copy blocks (e.g., the About page "details" sidebar). Replace with plain English: say "book online" not the vendor name. |
| Internal planning notes in rendered HTML | Three confirmed instances render on public pages. Grep for staging notes before every deploy. |
| Vendor names in customer-facing copy | Never say "Housecall Pro" to a visitor. Say "book online any time." Same for CallRail, Vercel, any tool. |
| Doc references leaking into body copy | Never write "Tier 0," "docs/09 §3," "indexation gate," or "staging note" into rendered output. Three of these shipped. |
| British spellings | American English only. aluminum, neighborhood, minimize. "Aluminium wiring" is also a keyword mismatch. |
| Two URL patterns for one page type | One pattern per page type, enforced in CI. Two complete city-page sets shipped. |

---

## 6. What "done" means for a page

A page is not done until all of the following are true:

- [ ] Exactly one `<h1>`, heading levels descend without skipping
- [ ] `<title>` 50–60 chars, meta description 140–158 chars, both unique site-wide
- [ ] Self-referencing canonical
- [ ] Valid JSON-LD for the page's declared `schemaTypes`, passing Rich Results Test
- [ ] All three CTAs present and functional
- [ ] At least 3 contextual internal links out, at least 2 internal links in
- [ ] Every image has descriptive alt text, explicit dimensions, and lazy loading below the fold
- [ ] Listed in `sitemap.xml` and reachable from navigation or a hub page within 3 clicks
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO 100
- [ ] Passes `npm run audit:seo`
- [ ] Zero vendor names in visitor-facing copy
- [ ] Zero internal planning notes in rendered HTML
- [ ] American English throughout (no British spellings)
- [ ] Company voice throughout (no personal promises tied to a named individual)
- [ ] Contains no individual employee name, no vendor name, no doc reference, no British spelling, and no number that isn't sourced from lib/business.ts.

---

## 7. Tone of voice

Write for a homeowner, most often a woman between 30 and 55, in a Douglas County suburb, who
needs an electrician and has been let down before. Her real question is not "are you qualified,"
it is **"will someone actually show up, and are they safe to have in my house around my kids and my dog."**

- Plain language. Say "breaker box," not "load center," unless you then explain it.
- Lead with reassurance and specificity, not superlatives. "A real person answers" beats
  "unmatched customer service."
- Never use "state-of-the-art," "cutting-edge," "one-stop shop," "we pride ourselves."
- Short sentences. Second person. Active voice.
- Every service page answers, in the first 100 words: what it is, what it costs to find out,
  and how fast someone can be there.

Never name an individual employee in site copy. Trust promises are company standards, not personal ones. "A real person answers the phone" is correct. "Jud answers his own phone" is not — it breaks the day he hires a dispatcher.

Justin does not appear anywhere on the site. Not in copy, metadata, alt text, schema, or image filenames. The only exception is verbatim customer review text, which is the customer's words and stays unedited.

Jud's name appears in exactly two places: the blog author byline (with Person schema and an author page) and one founder section on About, framed as the origin of the company's standards. Nowhere else.

---

## 8. Company positioning — the site sells the company, not an individual

Allsafe Electric is a growing residential electrical contractor serving 21 communities across
four counties. The site must support that story without contradiction.

**What this means in practice:**

- The trust promise is operational: "A real person answers the phone." "We confirm a two-hour
  window." "Fixed price before any work starts." These survive staff changes.
- Jud Cushing appears **in two contexts only:**
  1. **Blog author byline.** Jud Cushing, Owner and Master Electrician, ME.0601023, with a
     `Person` schema entity linked from every post. This is the E-E-A-T play.
  2. **One founder section on the About page.** Why he started the business, the standards he
     holds the company to, the fact that he is a master electrician. Framed as the origin of
     the company's standards, not a description of who shows up at the door.
- **Justin does not appear anywhere on the site.** Not in copy, not in headings, not in team
  sections, not in metadata. Customer review text that names Justin may remain verbatim (it
  is the customer's words). Allsafe-authored copy that names Justin must be removed.
- Anti-scale language is banned. Every phrase that commits the company to staying small must
  be removed or reframed. Examples:
  - "Still deliberately two people" → delete
  - "Growing headcount would mean sending electricians the customer has never met" → delete
  - "The company stays small on purpose" → delete
  - "one of two licensed electricians shows up, and it is usually Jud" → "a licensed
    electrician arrives on time"
  - "Jud answers his own phone" → "a real person answers"
  - "The closer you are, the faster Jud can be there" → "we serve your area"
  - "Meet Jud on your next electrical job" → "Schedule your visit"
  - "He is usually the person who answers the phone, and usually the person who turns up"
    → "A real person answers. A licensed electrician arrives on time."

**What stays:**
- The trust signals themselves (two-hour windows, fixed price, shoe covers, no smoking, good
  with dogs). Reframe as company standards.
- Jud's founder story on the About page.
- Customer reviews that name Jud or Justin verbatim.
- Jud's blog bylines.

---

## 9. Single URL pattern per page type

One pattern. One. Any second pattern for the same page type is a structural bug.

| Page type | **Canonical pattern** | Action on alternatives |
|---|---|---|
| Services hub | `/electrical-services/` | 301 `/electrical-services-parker-co/` → `/electrical-services/` **(pending GSC verification — see docs/99 open item #1; swap if wrong)** |
| Emergency page | `/emergency-electrical-repairs/` | 301 `/emergency-electrical-repairs-parker-co/` → `/emergency-electrical-repairs/` |
| Service pages | `/{service-slug}/` | Root-level flat. No `/services/` prefix. |
| City pages | `/electricians/{city}-co/` | 301 `/electrician-{city}/` → `/electricians/{city}-co/` for every city |
| City × service | `/electricians/{city}-co/{service-slug}/` | No alternative pattern |
| Service-area hub | `/service-area/` | No alternative |
| About | `/about/` | No alternative |

**Rationale for `/electricians/{city}-co/`:** the directory scales cleanly, reads as a hub,
and supports state disambiguation (`-co`) if national expansion ever matters. The flat
`/electrician-{city}/` pattern creates 21 root-level slugs competing with service pages.

Every internal link, footer link, sitemap entry, and schema `url` must point to the canonical
pattern. A link to the non-canonical pattern is a bug caught by `npm run test:links`.

---

## 10. Service area framing

The site covers **21 communities across four counties**: Douglas, Arapahoe, Elbert, and
Jefferson.

**Label rule:** do not call all 21 "towns." Use "21 communities across four counties" or
"21 communities in the south Denver metro." Stonegate and The Pinery are Parker neighborhoods;
Dove Valley and Acres Green are unincorporated communities, not incorporated towns.

**Data source:** `data/service-areas.csv` is the single source of truth for the community list.
All pages that display the service area (footer, service-area hub, service pages, city pages)
pull from this file. A hard-coded list in a component is a build failure.

**Service-area page structure:** metro-level coverage statement first, then cities grouped
by county with every city linked, then the map. Parker neighborhoods belong on the Parker
city page, not on the service-area hub.

---
