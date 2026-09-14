# 01 — Client Brief

Sources: intake form (25 Aug 2026), owner call transcript (~48 min), live site inspection,
Google Search Console export (09 Jun – 03 Sep 2026).

---

## 1. The business

Allsafe Electric is a residential electrical contractor in Parker, Colorado, founded
January 2018. Owner **Judson "Jud" Cushing** runs it and works in the field. Hours are
Mon–Fri 8am–6pm Mountain. They use online booking through a third-party scheduling tool
that is already live; the tool name is internal only and must not appear on the site.

They are strictly **residential**. No commercial, no industrial. This matters more than it
sounds — see §3.

**Company positioning:** Allsafe Electric is scaling to serve 21 communities across four
counties. All copy and planning must support hiring without contradiction. The site sells the
company and its standards, not any individual technician.

### Services (from intake + current site)

| Service | Current URL | Notes |
|---|---|---|
| Emergency electrical repairs | `/emergency-electrical-repairs-parker-co/` | Highest-intent. URL moving to `/emergency-electrical-repairs/`. |
| Electrical panel upgrades & repairs | `/electrical-panel-services/` | **Owner's #1 ranking complaint** |
| Outlet repair & installation | `/electrical-outlet-services/` | Bread-and-butter job |
| Switch services | `/electrical-switch-services/` | |
| Wiring, repairs & services | `/electrical-wiring-repairs-services/` | |
| Lighting | `/lighting-services/` | Overlaps with outdoor lighting |
| Outdoor lighting | `/outdoor-lighting/` | **Cannibalization risk** |
| EV charger installation | `/residential-ev-charging/` | High ticket, growing, rebate angle |
| Ceiling fan installation | `/ceiling-fan-installation/` | |
| Home automation / smart home | `/home-automation/` | |
| Whole-home surge protection | `/whole-home-surge-protection/` | |
| Smoke detectors | `/smoke-detectors/` | |
| Home electrical safety inspections | `/home-electrical-safety-inspections/` | Great top-of-funnel |
| Generators | *(none)* | Owner mentioned Generac on the call. **No page exists.** Build one. |

### Trust assets available

Confirmed from the live site, not from the call. The transcript version of this list was
partly wrong.

| Badge | Year shown | Note |
|---|---|---|
| BBB Accredited Business, A+ Rating | undated | Safe to use |
| HomeAdvisor Screened & Approved | undated | Safe to use. See §5.3 on linking. |
| Best of Houzz — Service | 2023 | Never mentioned on the call or intake |
| Angi Super Service Award | 2022 | Stale |
| Nextdoor Neighborhood Favorite | 2022 | **Nextdoor, not HomeAdvisor** |

Plus:

- Master electrician license **ME.0601023**
- Electrical contractor license **EC.0101068**
- Strong Google review corpus (149 reviews, 5.0 rating)
- Logo tagline already in use: **"Safety Security Satisfaction"**

> The three dated badges are 2022–2023 and it is now September 2026. Ask the owner whether
> newer ones exist before publishing them. Assets recovered in `assets/badges/`.

---

## 2. Geography

**Primary:** Parker, CO. **Secondary:** south Denver metro — 21 communities across Douglas,
Arapahoe, Elbert, and Jefferson counties.

Top three named targets from intake: **Parker, Castle Rock, Highlands Ranch.**

Parker neighborhoods already named on the current homepage (keep these, they are local
proof and they do rank):
Stonegate · Stroh Ranch · Pradera · The Pinery · Canterberry Crossing

Named competitors: **Harmony Electric** (owner says they rank #1 for everything),
**Fix It 24/7**, **Mister Sparky**.

Full service-area build-out is in `data/service-areas.csv`. The label for the full coverage
area is "21 communities across four counties," not "21 towns" — some entries are neighborhoods
or unincorporated communities.

---

## 3. What the owner actually said — verbatim intent

This is the most important section in this document. It comes from the recorded call and it
should drive design and copy decisions more than any keyword tool.

### 3.1 Who the customer is

> "Primarily my clients are stay at home moms or divorced moms... it seems like 80% of my
> customers are women."

The buyer is a woman, typically 30–55, homeowner, suburban Douglas County. She is not shopping
on price first. She is screening for **safety and reliability**.

### 3.2 What she is afraid of

> "I know a lot of other companies will show up with, you know, they'll show up drunk or beer
> cans falling out. They'll be smoking cigarettes in the front yard."

She has had, or has heard about, a bad contractor experience. The site's job is to eliminate
that fear in the first five seconds.

### 3.3 What the site must communicate

> "someone that you can trust, someone that's clean cut, they're not going to be smoking on
> the property, they're good with dogs... just like family friendly website type thing."

**Explicit design constraints from the owner:**

- **Do NOT** look industrial or commercial
- **Do NOT** lead with photos of breakers, panels, and conduit
- **DO** show homes, families, pets, and real company photos
- The current site's photo of "the girls and the dog" is the *kind* of image he wants

### 3.4 The actual differentiator

> "these days, man, you can't even get people to show up or on time or answer their phones or
> even show up at all... I can't even tell you how many customers tell me like, hey, I can't
> believe you answered your phone. And I can't believe you actually showed up."

**This is the whole positioning.** Not "licensed and insured" — every competitor says that.
The promise is: *a real person answers, and they show up when they said they would.*

Build the hero around this. Frame it as a company standard, not a personal guarantee tied to
one person. See `docs/02-design-system.md` §5.

### 3.5 Brand colors — final

Brand palette (client-supplied, supersedes all earlier provisional values):

| Token | Hex | Role |
|---|---|---|
| Blue | `#0068A8` | Primary, structural, links, headers |
| Orange | `#FF6600` | Accent, primary CTAs, eyebrows, icons |
| Slate | `#54595F` | Body copy |
| Grey | `#7A7A7A` | Secondary / muted text |
| Black | `#000000` | Headings |
| Navy | derived `#0A2E4C` family | Hero / CTA / footer grounds |

Full history in `docs/99-decisions-log.md`.

### 3.6 Photography

The owner is uploading a Google Drive folder of real job photos. His own description:

> "it's mostly just me standing around smiling and working on outlets and working on panels...\
> I don't really have a lot of pictures with customers"

Plan accordingly: real photos of Jud carry the trust load on the About page and the homepage;
everything else is generated or stock. Naming convention and pipeline in `docs/11-image-pipeline.md`.

### 3.7 Ranking complaint (intake form, his words)

> "Ranking really well in some words on map packs like Parker electrician and Electrician near
> me. But not ranking as well as competitors and things like Panel upgrades and other services
> people would Google. Need to fix my map pack so I'm ranking top three in all searches, not
> just some."

Translation: the **brand/geo head term works, the service-modified terms do not.** That is a
content-depth and internal-linking problem, not a GBP problem. Addressed in
`docs/08-local-seo-and-lsa.md` and `docs/09-content-plan.md`.

### 3.8 Local Services Ads complaint

> "my LSA ads are not functioning correctly. It doesn't matter what I set my budget to. I
> don't get any leads... I also have good reviews as well so I'm not sure what's going on."

Six months, one lead. **Do not assume the website rebuild fixes this.** It is being treated
as a separate parallel workstream with its own diagnostic tree. See
`docs/08-local-seo-and-lsa.md` §4. The website contributes (NAP, schema) but is very unlikely
to be the whole cause.

### 3.9 What he is worried about with the rebuild

- Losing the Parker rankings he already has:
  > "I definitely don't want to lose how it seems like everybody calls me in Parker"
- Being able to hire someone else to maintain it if he ever leaves the agency
- Whether existing URLs are preserved

All three are addressed by the URL preservation contract in `docs/04-url-migration.md`.
He was told existing URLs would be preserved. **Treat that as a promise made, not a nice-to-have.**

---

## 4. Where the current site actually stands

From the Search Console index coverage export, 09 Jun – 03 Sep 2026:

| Metric | Value |
|---|---|
| Total known pages | ~588 |
| **Indexed** | **86** |
| Not indexed | 502 |
| Indexation rate | **14.6%** |
| Crawled, currently not indexed | 242 |
| Discovered, currently not indexed | 251 |
| Excluded by `noindex` | 4 |
| Not found (404) | 3 |
| Server error (5xx) | 1 |
| Blocked by robots.txt | 1 |
| Daily impressions | ~200–700, flat, no trend |

Read that carefully. **493 pages have been published that Google either refuses to index or
has not bothered to crawl.** Indexed pages crept from 47 to 88 over three months while
impressions stayed flat — meaning the pages that did get indexed are not earning visibility.

This is the single most important fact in the whole engagement, and it dictates strategy:

> The problem is not that this site has too few pages. It is that it has ~500 pages Google has
> judged not worth indexing. Rebuilding 588 pages of the same quality reproduces the failure at
> higher speed.

The plan is therefore: **preserve what works, consolidate the rest, and grow in quality-gated
tiers** rather than shipping a page explosion on day one. Full reasoning in
`docs/09-content-plan.md` §1.

---

## 5. Factual conflicts to resolve (from the site audit)

These facts contradict each other on the current site. Canonical values are in §3 of this doc
and in `CLAUDE.md` §3. Do not use any other value.

| Claim | Wrong value seen | Canonical value |
|---|---|---|
| Reviews | 400+ (homepage) | **149** |
| Rating | "5-Star Reviews" | **5.0** |
| Years in business | 15+ (homepage, conflating trade experience with company age) | **8 years in business, 15+ years of trade experience** |
| Emergency response | "60 min average" | **Pending client decision — do not publish until confirmed** |

Use 149 and 5.0 from a single config value (`lib/business.ts`) so the next update is one edit.

### 5.1 NAP consistency

The GBP is set to **11479 Pine Dr M-51, Parker, CO 80134**. Current citations do not match:

| Source | Address | Phone |
|---|---|---|
| Site / GBP | 11479 Pine Dr **M-51** | (303) 648-1934 |
| BBB, listing 1 | 11479 Pine Dr **Unit 21** | (303) 648-1934 |
| BBB, listing 2 | 11479 Pine Dr **Ste 21** | (303) 648-1934 |
| BBB, listing 3 | **10940 S Parker Rd PMB 128** | (303) 648-1934 |
| Yellow Pages | **10940 S Parker Rd Ste 128** | **(720) 740-6900** |

Citation cleanup is a launch-adjacent task. Pick GBP address as canonical, get BBB merged to
one record, fix Yellow Pages, audit Angi, HomeAdvisor, Yelp, and Nextdoor.

### 5.2 Experience claim

Third-party profiles (Yelp, Nextdoor) say "over 20 years experience." The site says 15+.
Canonical value: "15+ years of master electrician experience." Push to all profiles.

### 5.3 HomeAdvisor badge

Site currently displays a HomeAdvisor badge without linking to the profile. If linked,
the 4.7 rating on HomeAdvisor will sit next to a 5.0 Google claim. Client decision required:
keep the badge and link it, keep it unlinked, or remove it. See `docs/99-decisions-log.md`
for where to record that decision.

### 5.4 Published price ranges

Published ranges ($350–$8,000 for wiring, $2,200–$4,500 for panels) need owner confirmation
that they are current and apply across the full service area, not just Parker. Every range
that has not been explicitly approved is flagged `needsApproval: true` in `lib/services.ts`.

---

## 6. Commercial context (background, not a site requirement)

- Google Ads budget approved at **$2,500/mo**, launching alongside the site
- LSA runs on a separate budget
- Modeled at ~$80 CPL by month three → ~31 leads/mo → ~11 estimates at a 35% qualified set rate
- Target go-live: end of the week following the call

Relevance to this build: the paid campaigns will send traffic to these pages from day one.
**Landing page conversion quality is not a phase-two concern.** Ship the three CTAs, the
tracking, and the form validation correctly on day one or the ad spend is wasted during the
exact window when Google is learning the account.
