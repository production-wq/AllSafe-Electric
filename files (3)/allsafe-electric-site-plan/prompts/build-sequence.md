# Claude Code Build Sequence

Copy-paste prompts, in order. Do not skip ahead. Each phase has an exit condition that must be
met before the next one starts.

---

## Phase 0 — Ground truth (before any code)

```
Read CLAUDE.md and docs/01 through docs/14.

Then do only these things, and write no application code:

1. Fetch the live site at allsafehomeservice.com. Crawl every page reachable from
   navigation and the footer. Record for each: URL, status, title, meta description,
   every heading in order with its level, canonical, all JSON-LD found, all internal
   links, all images with alt text. Write to data/crawl.csv.

2. Resolve the open question in docs/03 section 2: does /electrical-services/ exist,
   or does it 404? Which of it and /electrical-services-parker-co/ is indexed and
   linked? Report both answers with evidence.

3. Extract the exact hex values for blue and green from the logo at
   /wp-content/uploads/2024/03/allsafe-electrician-parker-1024x158.png.
   Report the values. Do not proceed past this without them.

4. List every page where a heading tag contains more than 70 characters, with the
   URL, the level, and the first 100 characters. This is our before-state evidence.

5. Identify the 3 pages returning 404, the 1 returning 5xx, the 1 blocked by
   robots.txt, and the 4 with noindex.

Report all five findings. Ask me before doing anything else.
```

**Exit condition:** crawl complete, hub URL question answered, brand hexes extracted.

---

## Phase 1 — Redirect map

```
Using data/crawl.csv plus the GSC exports I place in data/, build data/url-map.csv
following docs/04 sections 1 and 2 exactly.

Assign every discovered URL to bucket A, B, C or D using the stated logic.
For bucket B, show your semantic match score and the target you chose.
For bucket D, list the inlink count so I can spot anything I should rescue.

Do not write next.config.js yet. Output the CSV and a summary table of bucket
counts, then stop. I am reviewing every row before anything ships.
```

**Exit condition:** I have reviewed and approved `url-map.csv`. Do not proceed without that.

---

## Phase 2 — Scaffold and guardrails

```
Scaffold the Next.js App Router project per CLAUDE.md section 2.

Build the guardrails FIRST, before any page:

- scripts/audit-seo.ts implementing every check in docs/05 section 8
- scripts/audit-schema.ts per docs/06 section 6
- scripts/test-preservation.ts reading data/preserved-urls.csv
- Wire all three into npm scripts and a CI workflow that fails the build

Then build the design token layer from docs/02, using the real brand hexes from
Phase 0. Add a CI check that fails if any hex in the retired orange range appears
anywhere in the codebase.

Then the shared layout: header, footer with the full NAP block, availability strip,
mobile sticky bar, breadcrumbs, and the Schema component.

Prove the guardrails work by committing a deliberately broken page and showing me
the build fail. Then remove it.
```

**Exit condition:** a broken page fails CI. The guardrails are real, not decorative.

---

## Phase 3 — Homepage

```
Build the homepage per docs/02 section 4 and docs/07.

Requirements you must not compromise:
- The wireframe in docs/02 section 4, not a generic hero
- The availability strip, live against America/Denver
- All three CTAs, with the placement matrix in docs/07 section 1
- Live Google reviews per docs/07 section 5, with a build-time fallback
- Full sitewide schema per docs/06 section 2, plus WebSite, WebPage, FAQPage
- The neighborhood list preserved from the current homepage

Then run: npm run audit:seo && npm run lighthouse:ci
Show me the results before moving on.
```

---

## Phase 4 — Service pages

```
Build all 16 service pages per docs/03 section 3 and the template in docs/09 section 4.

For the 13 that exist today, the URL must be byte-identical to the current one.

For each page, before writing copy, tell me:
- the price range you intend to publish, so I can get it approved
- which permit jurisdiction rules apply
- the 2 real reviews you plan to surface

Split /lighting-services/ and /outdoor-lighting/ per docs/03 section 3.1. Neither may
use the unqualified phrase "lighting services" in its title or H1.

Every page: one H1, no paragraph inside a heading, Service + FAQPage + BreadcrumbList
schema, minimum 8 contextual internal links, three CTAs.

Run the audits after every 4 pages, not at the end.
```

---

## Phase 5 — Images

```
Run the ingest per docs/11 section 1 against the client's Drive folder.

Report assets/REVIEW.md before publishing anything. I need to see what is usable,
what is flagged for privacy, and what gaps exist.

Then generate only the gaps, per docs/11 section 3. Generate the style reference set
first and show me the three candidates before generating the full run.

Never generate Jud, Justin, before/after photos, or award badges.

Confirm EXIF is stripped from every published image before it ships.
```

---

## Phase 6 — Launch prep

```
Work docs/14 in full. Report every failing item.

Then walk docs/12 sections 1 through 3 and tell me exactly what is blocked on a
decision from me or from the client. Specifically:
- the email hosting decision
- the M-51 address question
- price range approvals
- the Google Places API key and Place ID
- the real award badge assets

Do not schedule a cutover until every one of those is resolved.
```

---

## Phase 7 — Post-launch, gated

```
Run npm run report:indexation for Tier 0.

If it is at or above 80 percent, build Tier 1: the 5 city pages, per docs/03 section 4
and docs/09 section 5. Each must clear the four-of-seven anti-thin-content bar.

If any city page cannot honestly clear that bar, do not publish it. Tell me which one
and why, and we will get the missing information rather than filling it with filler.

If Tier 0 is below 80 percent, do not build Tier 1. Diagnose instead and report what
you think is blocking indexation.
```

---

## Standing rules for every session

- Never change a URL without an entry in `docs/99-decisions-log.md`
- Never invent a price, a review, a permit fee, an award, or a rebate amount
- Never generate an image of a real person connected to this business
- Never put a tracking number in schema, `<address>`, or the footer NAP
- Run `npm run audit:seo` before every commit
- If something in the docs is wrong or impossible, say so instead of working around it silently
