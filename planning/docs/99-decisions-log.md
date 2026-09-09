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
| 1 | `/electrical-services/` vs `/electrical-services-parker-co/` — which is real and indexed? | Phase 0 → IA | Build team |
| 2 | Exact brand blue and green hexes from the logo | All design work | Build team |
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
