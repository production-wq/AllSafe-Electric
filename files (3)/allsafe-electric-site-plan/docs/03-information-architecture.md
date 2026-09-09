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

**Legacy inconsistency, preserved deliberately:** existing service pages sit at the root
(`/electrical-panel-services/`) rather than under `/services/`. They are indexed and ranking.
**Keep them at the root.** New pages follow the same flat pattern. Consistency with what Google
already knows beats architectural tidiness.

---

## 2. Top-level structure

```
/                                   Home
/electrical-services-parker-co/     Services hub          [VERIFY — see note]
/[service]/                         Service pages (flat, root-level)
/electricians/[city]-co/            City pages
/electricians/[city]-co/[service]/  City × service pages  (tiered, gated)
/about/                             About Jud & Justin
/reviews/                           Reviews hub
/coupons/                           Offers
/contact/                           Contact & estimate
/book/                              Booking (Housecall Pro)
/service-area/                      Service area hub
/resources/                         Guides, tools, local resources hub
/resources/tools/[tool]/            Interactive tools
/blog/                              Blog index
/blog/[slug]/                       Posts
/privacy-policy/                    Legal
/sitemap.xml  /robots.txt  /llms.txt
```

> **VERIFY BEFORE BUILD:** the live site links to both `/electrical-services/` (homepage hero
> button) and `/electrical-services-parker-co/` (nav and footer). One of these is very likely
> among the 3 reported 404s. Pull the Search Console Pages report, keep whichever has
> impressions and inbound links, and 301 the other. Do not guess. Record the decision.

---

## 3. Service pages — preserve exactly

These URLs exist today. **Recreate every one at the identical path.** Any change here risks the
Parker rankings the owner explicitly asked to protect.

| # | URL | H1 | Primary keyword |
|---|---|---|---|
| S1 | `/emergency-electrical-repairs-parker-co/` | Emergency electrician in Parker, CO | emergency electrician parker |
| S2 | `/electrical-panel-services/` | Electrical panel upgrades and repairs in Parker | electrical panel upgrade parker |
| S3 | `/electrical-outlet-services/` | Outlet repair and installation in Parker | outlet repair parker co |
| S4 | `/electrical-switch-services/` | Light switch repair and installation in Parker | light switch replacement parker |
| S5 | `/electrical-wiring-repairs-services/` | Home wiring repair and rewiring in Parker | house rewiring parker co |
| S6 | `/lighting-services/` | Indoor lighting installation in Parker | lighting installation parker co |
| S7 | `/outdoor-lighting/` | Outdoor and landscape lighting in Parker | outdoor lighting parker co |
| S8 | `/residential-ev-charging/` | EV charger installation in Parker, CO | ev charger installation parker |
| S9 | `/ceiling-fan-installation/` | Ceiling fan installation in Parker | ceiling fan installation parker |
| S10 | `/home-automation/` | Smart home and automation wiring in Parker | smart home electrician parker |
| S11 | `/whole-home-surge-protection/` | Whole-home surge protection in Parker | whole home surge protector parker |
| S12 | `/smoke-detectors/` | Smoke and CO detector installation in Parker | smoke detector installation parker |
| S13 | `/home-electrical-safety-inspections/` | Home electrical safety inspection in Parker | electrical inspection parker co |

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
| S14 | `/generator-installation/` | Standby generator installation in Parker, CO | Owner mentioned Generac on the call. No page exists. High ticket, real local demand from Front Range outages. |
| S15 | `/electrical-troubleshooting/` | Electrical troubleshooting and diagnostics in Parker | Captures the huge "why does my outlet not work / breaker keeps tripping" symptom-search volume that currently has nowhere to land. |
| S16 | `/hot-tub-electrical-hookup/` | Hot tub and spa electrical hookup in Parker | Strong, uncontested, high-ticket suburban Colorado query. |

---

## 4. City pages

Pattern: `/electricians/[city]-co/`

Chosen over `/[city]-electrician/` because the `/electricians/` folder gives a clean hub,
groups the section for internal linking, and avoids 20 root-level slugs competing with the
service pages for topical clarity. No existing city page is being moved, so there is no
preservation cost.

### Tier 1 — build at launch (5)

| URL | City | Rationale |
|---|---|---|
| `/electricians/parker-co/` | Parker | Home city, already ranking |
| `/electricians/castle-rock-co/` | Castle Rock | Named top-3 target |
| `/electricians/highlands-ranch-co/` | Highlands Ranch | Named top-3 target |
| `/electricians/lone-tree-co/` | Lone Tree | Affluent, adjacent, EV-heavy |
| `/electricians/centennial-co/` | Centennial | Volume, adjacent |

### Tier 2 — after Tier 1 indexation gate (7)

Aurora (south) · Castle Pines · Littleton · Greenwood Village · Franktown · Elizabeth · Sedalia

### Tier 3 — Parker neighborhood pages (5), only if Tiers 1–2 index cleanly

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

**Footer:** 4 columns — Services (all 16) · Areas we serve (all Tier 1+2) · Company
(About, Reviews, Coupons, Contact, Resources, Privacy) · Get in touch (full NAP block,
licenses, GBP link, Facebook, hours).

The footer is a crawl surface. It carries the full service and city lists deliberately.

**Do not port from the old site:** the duplicated triple nav render, and any `href=""` links.
