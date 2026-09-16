# 03 — Information Architecture & URL Map

This document is the contract. The URL column is binding. Do not invent, rename, or "clean up"
a URL without an entry in `docs/99-decisions-log.md` and a redirect in `docs/04-url-migration.md`.

---

## 1. URL conventions

| Rule | Value |
|---|---|
| Protocol/host | `https://allsafehomeservice.com` (no `www`, enforce with a 301) |
| Trailing slash | **Yes.** The current site uses them. Changing this creates 588 needless redirects. |
| Case | Lowercase only |
| Separator | Hyphen |
| Depth | Max 2 segments for anything that should rank. `/electricians/castle-rock-co/` is fine; `/services/electrical/panels/upgrade/` is not. |
| Stop words | Drop them unless the phrase reads wrong without |
| Dates | Never in a URL, including blog posts |

**One pattern per page type — this is a hard rule.** Having two URL patterns for the same page
type (e.g., `/electrician-parker/` and `/electricians/parker-co/`) creates duplicate content,
split link equity, competing canonicals, and sitemap confusion. It is the structural failure on
the current site. See §3 and §4 for the canonical patterns and the 301 obligations.

**Legacy inconsistency, preserved deliberately:** existing service pages sit at the root
(`/electrical-panel-services/`) rather than under `/services/`. They are indexed and ranking.
**Keep them at the root.** New pages follow the same flat pattern. Consistency with what Google
already knows beats architectural tidiness.

---

## 2. Top-level structure

```
/                                   Home
/electrical-services/               Services hub     [VERIFY: see §3 note and docs/99 #1]
/[service]/                         Service pages (flat, root-level)
/electricians/[city]-co/            City pages       [sole pattern — see §4]
/electricians/[city]-co/[service]/  City × service pages  (tiered, gated)
/about/                             About Allsafe Electric
/reviews/                           Reviews hub
/coupons/                           Offers
/contact/                           Contact & estimate
/book/                              Booking
/service-area/                      Service area hub
/resources/                         Guides, tools, local resources hub
/resources/tools/[tool]/            Interactive tools
/blog/                              Blog index
/blog/[slug]/                       Posts
/privacy-policy/                    Legal
/sitemap.xml  /robots.txt  /llms.txt
```

> **On the services hub:** the live site references both `/electrical-services/` (homepage hero)
> and `/electrical-services/` (nav and footer). The canonical target is
> `/electrical-services/` (clean, no city baked in). Verify against GSC which URL has
> impressions; 301 the other. Record the decision in `docs/99-decisions-log.md`. The current
> interim redirect is `/electrical-services/` → `/electrical-services/` pending that
> check. Swap if wrong — do not launch without verifying.

---

## 3. Service pages — preserve exactly, with two URL corrections

These URLs exist today. **Recreate every one at the identical path** with the exception of the
two Parker-locked slugs being corrected to metro-neutral versions (see table). Any other change
risks the Parker rankings the owner explicitly asked to protect.

| # | URL | H1 | Primary keyword | Notes |
|---|---|---|---|---|
| S1 | `/emergency-electrical-repairs/` | Emergency electrician in the south Denver metro | emergency electrician parker | **MOVED from `-parker-co/`. 301 the old slug.** |
| S2 | `/electrical-panel-services/` | Electrical panel upgrades and repairs | electrical panel upgrade parker | Preserve exactly |
| S3 | `/electrical-outlet-services/` | Outlet repair and installation | outlet repair parker co | Preserve exactly |
| S4 | `/electrical-switch-services/` | Light switch repair and installation | light switch replacement parker | Preserve exactly |
| S5 | `/electrical-wiring-repairs-services/` | Home wiring repair and rewiring | house rewiring parker co | Preserve exactly |
| S6 | `/lighting-services/` | Indoor lighting installation | lighting installation parker co | Preserve exactly |
| S7 | `/outdoor-lighting/` | Outdoor and landscape lighting | outdoor lighting parker co | Preserve exactly |
| S8 | `/residential-ev-charging/` | EV charger installation | ev charger installation parker | Preserve exactly |
| S9 | `/ceiling-fan-installation/` | Ceiling fan installation | ceiling fan installation parker | Preserve exactly |
| S10 | `/home-automation/` | Smart home and automation wiring | smart home electrician parker | Preserve exactly |
| S11 | `/whole-home-surge-protection/` | Whole-home surge protection | whole home surge protector parker | Preserve exactly |
| S12 | `/smoke-detectors/` | Smoke and CO detector installation | smoke detector installation parker | Preserve exactly |
| S13 | `/home-electrical-safety-inspections/` | Home electrical safety inspection | electrical inspection parker co | Preserve exactly |

**Why S1 moves:** `/emergency-electrical-repairs/` bakes a single city into the URL
of a page that must rank for emergency queries across the whole metro. The correction costs
one 301 redirect. The H1 and body copy keep Parker prominent; the URL no longer locks the page
out of metro-wide ranking.

**Services hub:** the same logic applies. The hub URL is `/electrical-services/` not
`/electrical-services/`. Service pages that target the metro should not live under
a Parker-locked hub slug.

### 3.1 Cannibalization fix: S6 vs S7

`/lighting-services/` and `/outdoor-lighting/` currently compete. Both stay live, but their
scopes are split hard and each explicitly links to the other:

- **S6 `/lighting-services/`** → indoor only. Recessed, under-cabinet, fixtures, dimmers,
  chandeliers, LED retrofits. Title and H1 say **indoor**.
- **S7 `/outdoor-lighting/`** → exterior only. Landscape, path, security, floods, soffit,
  holiday, pool/patio. Title and H1 say **outdoor**.

Neither page may use the unqualified phrase "lighting services" in its title or H1.

### 3.2 New service pages

| # | URL | H1 | Why |
|---|---|---|---|
| S14 | `/generator-installation/` | Standby generator installation | Owner mentioned Generac on the call. No page exists. High ticket, real local demand from Front Range outages. |
| S15 | `/electrical-troubleshooting/` | Electrical troubleshooting and diagnostics | Captures the huge "why does my outlet not work / breaker keeps tripping" symptom-search volume that currently has nowhere to land. |
| S16 | `/hot-tub-electrical-hookup/` | Hot tub and spa electrical hookup | Strong, uncontested, high-ticket suburban Colorado query. |

---

Be aware changing URLs contradicts the preservation rule in docs/04, deliberately. Both old URLs are indexed on the live site and carry equity, so this is not free. 301 both, keep them in preserved-urls.csv as redirect targets, and monitor them specifically in the first 30 days. Log this in docs/99.

One canonical list of communities in data/service-areas.csv, rendered from that single source everywhere.

## 4. City pages — single canonical pattern

**Pattern: `/electricians/[city]-co/`**

This is the **only** city-page URL pattern. The flat pattern `` that also
exists on the current site must be 301 redirected to the directory pattern for every city.
Building to or linking to the flat pattern is a build failure.

**Rationale:** the `/electricians/` folder provides a clean hub, groups the section for
internal linking, avoids 21 root-level slugs competing with service pages for topical clarity,
and the `-co` suffix supports state disambiguation later. The flat pattern existed on the old
site as dead weight (noindex, no inbound links from hub pages).

### Redirect obligation — one per city

For every city that has both patterns, add a row to `data/url-map.csv`:

```
/electrician-parker/,/electricians/parker-co/,301
/electrician-castle-rock/,/electricians/castle-rock-co/,301
/electrician-highlands-ranch/,/electricians/highlands-ranch-co/,301
```

...and so on for all 21 communities. `npm run test:links` fails if a flat city URL returns
anything other than 301 → canonical.

### Release tiers

**Tier 1 — build at launch (5)**

| URL | City | Rationale |
|---|---|---|
| `/electricians/parker-co/` | Parker | Home city, already ranking |
| `/electricians/castle-rock-co/` | Castle Rock | Named top-3 target |
| `/electricians/highlands-ranch-co/` | Highlands Ranch | Named top-3 target |
| `/electricians/lone-tree-co/` | Lone Tree | Affluent, adjacent, EV-heavy |
| `/electricians/centennial-co/` | Centennial | Volume, adjacent |

**Tier 2 — after Tier 1 indexation gate (7)**

Aurora (south) · Castle Pines · Littleton · Greenwood Village · Franktown · Elizabeth · Sedalia

**Tier 3 — Parker neighborhood pages (5), only if Tiers 1–2 index cleanly**

Stonegate · Stroh Ranch · Pradera · The Pinery · Canterberry Crossing
at `/electricians/parker-co/[neighborhood]/`

These five are already named on the current homepage and are genuinely distinct residential
areas with distinct housing stock and electrical characteristics. They are the *only*
neighborhood pages permitted; do not extrapolate the pattern.

Full list with population, county, drive time and housing-stock notes: `data/service-areas.csv`.

### City page anti-thin-content requirements

A city page that is a service page with the city name swapped in is exactly what produced 493
non-indexed pages. Every city page must contain **at least four** of the following, specific to
that city and verifiable:

- The permitting authority and its actual process for that jurisdiction (Town of Parker vs.
  Douglas County vs. City of Centennial differ — this is real, useful, unique information)
- Predominant housing stock and build era, and what that means electrically
  (e.g. 1970s Federal Pacific / Zinsco panels, aluminum branch wiring in mid-70s builds,
  100A service in homes now running two EVs)
- The electric utility serving that area and its relevant programs
- Named neighborhoods and subdivisions
- At least two real reviews from customers in that city
- Drive time from the Parker shop and honest response-time expectation
- A locally relevant FAQ that would not make sense in another city

If four cannot be written honestly, **do not publish that city page.** A missing page costs
nothing. A thin page costs crawl budget and drags the domain.

---

## 5. City × service pages

Pattern: `/electricians/[city]-co/[service-slug]/`

**This is the page type that will make or break the site.** It is also the page type that
destroyed the current one. It is therefore gated hard.

Only these 6 services get city variants — the ones with genuine standalone commercial intent:

`panel-upgrade` · `ev-charger-installation` · `emergency-electrician` ·
`outlet-repair` · `generator-installation` · `electrical-inspection`

5 Tier-1 cities × 6 services = **30 pages maximum in phase one.** Not 144. Not 500.

Release gates are defined in `docs/09-content-plan.md` §3 and are not optional.

---

## 6. Resources, tools, and content

```
/resources/                                        hub
/resources/parker-electrical-permit-guide/         local resource
/resources/douglas-county-electrical-permits/      local resource
/resources/xcel-energy-rebates-colorado/           local resource
/resources/colorado-electrical-code-basics/        local resource
/resources/electrical-panel-brands-to-watch-for/   evergreen, links to S2

/resources/tools/panel-load-calculator/            tool
/resources/tools/ev-charger-cost-estimator/        tool
/resources/tools/do-i-need-a-panel-upgrade/        tool
/resources/tools/generator-sizing-calculator/      tool
/resources/tools/outlet-and-gfci-requirements/     tool
```

Full editorial rationale, blog topics, listicles and comparison pages: `docs/09-content-plan.md`.

---

## 7. Internal linking model

Internal linking is the single highest-leverage lever available for the indexation problem.
493 pages are not indexed largely because nothing meaningful links to them.

### Rules

1. **Every page is reachable from the homepage in ≤ 3 clicks.** Enforced by the orphan check
   in `npm run audit:seo`. An orphan page is a build failure, not a warning.
2. **Every service page links to:** the services hub, its 5 Tier-1 city variants, 2 sibling
   services, 1 resource or tool, and the booking page. Minimum 8 contextual outbound links,
   in body copy, with descriptive anchors.
3. **Every city page links to:** the service-area hub, all 6 of its service variants, 2
   neighboring cities, and 1 locally relevant resource.
4. **Every city × service page links up to both parents** (the city page and the service page)
   and across to 2 sibling city × service pages.
5. **Every blog post links to at least 2 money pages** within the first 500 words.
6. **Anchor text is descriptive and varied.** Never "click here," never the bare URL, never the
   exact same anchor to the same target twice on one page.
7. **Breadcrumbs on every page below the root**, marked up as `BreadcrumbList`. They are a
   crawl path, not decoration.

### The link equity path

```
Home  ──►  Services hub  ──►  Service page  ──►  City × service page
  │              │                  ▲                     ▲
  │              └──────────────────┘                     │
  ├──►  Service-area hub  ──►  City page  ──────────────►─┘
  │                              │
  └──►  Resources hub  ──►  Tool / guide  ──────────────►─┘
```

Every node links back up. No node is a dead end. Tools and guides are the cheapest way to push
equity into the deep city × service pages, because they attract links naturally and can link
down without looking spammy.

---

## 8. Navigation

**Header (desktop):** Services (mega menu, all 16 grouped in 3 columns) · Areas · About ·
Reviews · Resources · phone · **Book a visit** button

**Header (mobile):** logo · phone icon · hamburger. Book button lives in the sticky bar.

**One header component. One footer component.** The current site renders two different headers
and two different footers depending on which page template is active. That is a launch blocker.
Every page uses the same header and the same footer.

**Footer:** 4 columns — Services (all 16) · Areas we serve (all Tier-1 and Tier-2 communities,
linked to `/electricians/{city}-co/`) · Company (About, Reviews, Coupons, Contact, Resources,
Privacy) · Get in touch (full NAP block, licenses, GBP link, Facebook, hours).

The footer is a crawl surface. It carries the full service and city lists deliberately.

**Do not port from the old site:** the duplicated triple nav render, and any `href=""` links.

---

## 9. Service-area page structure

The service-area hub at `/service-area/` is a hub page whose job is to pass link authority to
every city page. Its structure must reflect that.

**Required structure:**

1. Metro-level coverage statement ("21 communities across four counties in the south Denver
   metro area")
2. Cities grouped by county, with every city linked to its `/electricians/{city}-co/` page
3. Map
4. Brief coverage note on response times

**What does not belong on the service-area hub:**
- A list of Parker neighborhoods (those belong on the Parker city page)
- Unlinked plain-text city mentions
- A section that is primarily about one city

**The "Also serving" unlinked list must become linked city cards.** Every community in the
service area is linked. Plain-text city names on the hub page are a build failure.

---

## 10. Redirects that must be in `data/url-map.csv` before launch

| Old URL | New URL | Status |
|---|---|---|
| `/electrical-services/` | `/electrical-services/` | 301 — pending GSC verification |
| `/emergency-electrical-repairs/` | `/emergency-electrical-repairs/` | 301 |
| `/electrician-parker/` | `/electricians/parker-co/` | 301 |
| `/electrician-castle-rock/` | `/electricians/castle-rock-co/` | 301 |
| `/electrician-highlands-ranch/` | `/electricians/highlands-ranch-co/` | 301 |
| `/electrician-lone-tree/` | `/electricians/lone-tree-co/` | 301 |
| `/electrician-centennial/` | `/electricians/centennial-co/` | 301 |
| `/electrician-aurora/` | `/electricians/aurora-co/` | 301 |
| `/electrician-castle-pines/` | `/electricians/castle-pines-co/` | 301 |
| `/electrician-littleton/` | `/electricians/littleton-co/` | 301 |
| `/electrician-greenwood-village/` | `/electricians/greenwood-village-co/` | 301 |
| `/electrician-franktown/` | `/electricians/franktown-co/` | 301 |
| `/electrician-elizabeth/` | `/electricians/elizabeth-co/` | 301 |
| `/electrician-denver/` | `/electricians/denver-co/` | 301 |
| `/electrician-lakewood/` | `/electricians/lakewood-co/` | 301 |
| `/electrician-edgewater/` | `/electricians/edgewater-co/` | 301 |
| `/electrician-elbert/` | `/electricians/elbert-co/` | 301 |
| `/electrician-englewood/` | `/electricians/englewood-co/` | 301 |
| `/electrician-foxfield/` | `/electricians/foxfield-co/` | 301 |
| `/electrician-stonegate/` | `/electricians/parker-co/stonegate/` | 301 |
| `/electrician-the-pinery/` | `/electricians/parker-co/the-pinery/` | 301 |
| `/electrician-dove-valley/` | `/electricians/dove-valley-co/` | 301 |
| `/electrician-acres-green/` | `/electricians/acres-green-co/` | 301 |
