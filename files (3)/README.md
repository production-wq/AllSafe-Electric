# Allsafe Electric — Website Rebuild Plan

Planning package for rebuilding `allsafehomeservice.com` on Next.js with Claude Code.
Built by Built Right Digital.

**Client:** Allsafe Electric, Parker CO. Residential electrician. Owner: Judson "Jud" Cushing.
**Target:** live within two weeks of build start.

---

## Start here

1. **`CLAUDE.md`** — loaded by Claude Code every session. Prime directives, canonical business
   facts, known traps, definition of done.
2. **`prompts/build-sequence.md`** — copy-paste prompts in order, with exit conditions.
3. **`docs/99-decisions-log.md`** — the 15 open questions blocking parts of the build.
   Several need answers from the client or the account manager before cutover.

---

## The one thing to understand

**86 of 588 pages are indexed. 493 are not.**

The previous site's problem was never too little content. It was ~500 pages Google crawled or
discovered and judged not worth indexing, which taught Google that new URLs from this host are
probably not worth the crawl. Indexed pages crept from 47 to 88 over three months while
impressions stayed flat.

Everything in this plan follows from that: preserve the small set that works, retire the dead
weight with 410s, and grow behind indexation gates instead of shipping a page explosion.

Recreating 588 pages faster reproduces the failure faster.

---

## Contents

| File | What it covers |
|---|---|
| `CLAUDE.md` | Persistent instructions, business facts, traps, done criteria |
| `docs/01-client-brief.md` | Who they are, what the owner said on the call, audience insight |
| `docs/02-design-system.md` | Color, type, layout, components, the "house call" concept |
| `docs/03-information-architecture.md` | Full URL map, city and service structure, internal linking |
| `docs/04-url-migration.md` | Preservation contract, A/B/C/D triage, redirects, DNS |
| `docs/05-technical-seo-spec.md` | Headings, metadata, crawling, rendering, performance, audit script |
| `docs/06-schema-spec.md` | JSON-LD per template, entity model, the aggregateRating trap |
| `docs/07-conversion-spec.md` | Three CTAs, forms, Housecall Pro booking, live Google reviews |
| `docs/08-local-seo-and-lsa.md` | GBP, NAP, and the Local Services Ads diagnostic tree |
| `docs/09-content-plan.md` | Tiered rollout with gates, blogs, listicles, comparisons, tools |
| `docs/10-existing-site-audit.md` | Every defect found, with evidence |
| `docs/11-image-pipeline.md` | Drive folder ingest, Gemini generation, processing, privacy |
| `docs/12-migration-runbook.md` | Hour-by-hour cutover, email risk, rollback |
| `docs/13-analytics-and-tracking.md` | GA4, CallRail, Ads conversions, baselines to capture |
| `docs/14-launch-qa-checklist.md` | Pre-launch gates |
| `docs/99-decisions-log.md` | Open questions and decision record |
| `data/preserved-urls.csv` | URLs that must not break |
| `data/service-areas.csv` | 17 cities and neighborhoods with local detail |
| `data/keyword-map.csv` | Page-to-keyword mapping |
| `data/content-review-schedule.csv` | What has to be re-verified and how often |
| `prompts/build-sequence.md` | Ordered Claude Code prompts |
| `prompts/image-briefs.md` | Per-page generation briefs |
| `assets/README.md` | Recovered badges and brand files, with the corrections they forced |
| `assets/badges/` | Five award badges cropped from the live site |
| `assets/brand/` | Logo (palette source) and the one real photo of Jud

---

## The five things most likely to go wrong

1. **Breaking an indexed URL.** The homepage ranking in Parker is the client's entire lead flow
   and he said so explicitly. `data/preserved-urls.csv` plus the CI preservation test exist to
   make this impossible.
2. **Taking his email down.** Email is hosted with the current web host and the owner has not
   decided what to do about it. Do not touch DNS until that is resolved. `docs/12` §3.
3. **Shipping a page explosion.** The gates in `docs/09` §3 are not advisory.
4. **Assuming the rebuild fixes the LSA problem.** One lead in six months, unresponsive to
   budget, is an account or verification problem. Work the tree in `docs/08` §4 in parallel so
   we know what actually moved.
5. **Orange.** The owner named it twice, unprompted. There is a CI check for it.

---

## What is not in this repo but is on the critical path

These sit with the account manager, not the build team, and the site alone will not close the
ranking gap without them:

- GBP service items for all 16 services
- Weekly GBP posts and photo uploads
- Review-gardening: getting customers to name the job in the review
- The LSA diagnostic
- Citation cleanup across the aggregators
- The pre-launch map pack geo-grid baseline

---

## Handover

The owner asked whether he could hire someone else to run this if he ever left. The honest
answer is yes, and this package is part of what makes it true: a developer who reads `CLAUDE.md`
and `docs/03` can pick the site up without a conversation. Keep it current as the build
diverges, and keep the decisions log honest.
