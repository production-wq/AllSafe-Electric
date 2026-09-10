# CLAUDE.md — Allsafe Electric Website Build

You are building the new website for **Allsafe Electric** (allsafehomeservice.com), a residential
electrician in Parker, Colorado. This file is loaded every session. Read it fully before acting.

Client of Built Right Digital. Owner/operator: **Judson "Jud" Cushing**. Second tech: **Justin**.

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
4. **Three conversion actions on every page:** click-to-call, click-to-book (Housecall Pro),
   and an on-page form. Never fewer. See `docs/07-conversion-spec.md`.
5. **NAP is byte-identical everywhere.** See §3 below. A single inconsistency is suspected to be
   part of why their Local Services Ads have produced one lead in six months.
6. **Follow the client's supplied palette.** ~~No orange.~~ **SUPERSEDED 2026-09-10** by direct
   client instruction (see `docs/99`). The client provided their live brand palette and a
   designer homepage artifact to build against. Palette: `#0068A8` blue (primary/structural),
   `#FF6600` orange (accent, CTAs, eyebrows), `#54595F` slate (body), `#7A7A7A` grey (muted),
   `#000000` black (headings). Dark sections use a navy derived from the blue. The old
   "no orange" line and much of `docs/02-design-system.md` no longer apply; the designer
   artifact + this palette are the source of truth for visual design.
7. **Do not publish page tiers out of order.** Indexation gates are defined in
   `docs/09-content-plan.md`. Publishing 500 pages at once is what broke the current site
   (86 of 588 pages indexed). Do not repeat it.
8. **Never invent a review, a rating, a license number, an award, or a year.** If a fact is not
   in `docs/01-client-brief.md` or a source file, ask.

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
| Booking | Housecall Pro online booking |
| Analytics | GA4 + Google Search Console + CallRail |
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
CRM:               Housecall Pro
```

**Derived URLs you will need:**

- Leave a review: `https://search.google.com/local/writereview?placeid=` *(needs Place ID, request it — do not guess)*
- Read reviews: `https://www.google.com/maps?cid=2391241286444373261`
- Directions: `https://www.google.com/maps/dir/?api=1&destination=Allsafe+Electric+Parker+CO`

**Phone number rule:** the site displays a CallRail tracking number for attribution. The
`LocalBusiness` schema `telephone` field and the footer NAP block must use the **real**
number `(303) 648-1934`. CallRail's dynamic number insertion swaps the display number
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

---

## 7. Tone of voice

Write for a homeowner, most often a woman between 30 and 55, in a Douglas County suburb, who
needs an electrician and has been let down before. Her real question is not "are you qualified,"
it is **"will you actually show up, and are you safe to have in my house around my kids and my dog."**

- Plain language. Say "breaker box," not "load center," unless you then explain it.
- Lead with reassurance and specificity, not superlatives. "Jud answers his own phone" beats
  "unmatched customer service."
- Never use "state-of-the-art," "cutting-edge," "one-stop shop," "we pride ourselves."
- Short sentences. Second person. Active voice.
- Every service page answers, in the first 100 words: what it is, what it costs to find out,
  and how fast someone can be there.
