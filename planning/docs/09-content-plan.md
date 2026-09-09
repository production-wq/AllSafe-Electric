# 09 — Content Plan

---

## 1. The strategic constraint

Read this before planning a single page.

**86 of 588 pages are indexed. 493 are not.**

The previous site's failure was not too little content. It was ~500 pages that Google crawled
or discovered and judged not worth indexing. Publishing another 500 pages of the same character,
faster, reproduces the failure at higher speed and burns the crawl budget we are trying to
recover.

The right model is the opposite of a page explosion:

> **Publish fewer pages than you can. Make each one the best answer for its query. Only publish
> the next batch once the last batch is indexed.**

Two reasons this matters more here than on a typical build:

1. **Crawl budget is currently being wasted at scale.** ~400 dead pages are consuming crawls
   that should be going to the pages that make money. Retiring them (`docs/04` §1) is a
   prerequisite for anything else working.
2. **Site-level quality signals are already depressed.** A domain where 85% of pages are
   unindexed has taught Google that new URLs from this host are probably not worth indexing.
   Reversing that requires a run of pages that *do* get indexed and *do* earn impressions.
   Volume is what dug the hole.

---

## 2. What "good enough to publish" means

A page ships only if it clears all six:

1. **Answers a query someone actually types.** Verified in Search Console, Ahrefs, or the
   client's call log. Not a keyword-tool derivative.
2. **Contains something only Allsafe could write.** A real price range, a real permit process, a
   real photo of a real job, a real story from Jud. If any competitor could publish it verbatim,
   it is not ready.
3. **Under 30% similarity to every other page on the site.** Enforced by the audit script.
4. **Has a job in the funnel** and links to the next step.
5. **Passes the full technical gate** in `CLAUDE.md` §6.
6. **A human read it and would show it to the client.**

Rule of thumb: **one excellent 1,200-word page beats twelve 400-word template pages.** The
current site is the proof.

---

## 3. Release tiers and indexation gates

| Tier | Contents | Pages | Gate to release |
|---|---|---|---|
| **0** | Homepage, 16 service pages, About, Contact, Reviews, Coupons, Book, Service-area hub, Privacy | ~24 | Launch |
| **1** | 5 Tier-1 city pages | 5 | Tier 0 ≥ 80% indexed **and** ≥ 14 days since launch |
| **2** | 30 city × service pages (5 cities × 6 services) | 30 | Tier 1 ≥ 80% indexed |
| **3** | 5 tools, 5 local resource guides | 10 | Tier 2 ≥ 80% indexed |
| **4** | 7 Tier-2 city pages + their service variants | ~49 | Tier 3 ≥ 80% indexed |
| **5** | 5 Parker neighborhood pages | 5 | Tier 4 ≥ 80% indexed |

Blog posts run **continuously from week 2** at 2–4 per month, outside the tier gates, because
they are not templated and do not carry the same duplication risk.

**Ceiling: ~125 pages by month twelve.** Not 588. If every one of those is indexed and ranking,
that is a dramatically better business than 588 pages with 86 indexed.

### How the gate is measured

```bash
npm run report:indexation -- --tier=1
# pulls GSC Index Coverage via API, filters to the tier's URL list,
# prints indexed / total and blocks the next tier if under 80%
```

If a tier stalls below 80%, **do not publish the next tier.** Diagnose instead: thin content,
weak internal links, duplication, or a crawl issue. Publishing more is never the fix for pages
not being indexed.

---

## 4. Service page template

Every service page, ~1,000–1,500 words:

```
H1: {Service} in Parker, CO
    Lead paragraph: what it is, what the visit costs, how fast someone can be there
    [ Book · Call · Estimate ]

H2: Signs you need this
    H3 × 3–5, each a symptom a homeowner would actually recognize and search

H2: What it costs in Douglas County
    Real range, what moves the price, what's included. Do not dodge this.

H2: How the job goes, start to finish
    Numbered. This is a genuine sequence, so numbering is appropriate here.

H2: Permits and inspection
    Jurisdiction-specific. Parker, Douglas County, Centennial differ.

H2: Why homeowners here call Jud
    2 real reviews mentioning this service + the "we answer the phone" promise

H2: Common questions
    4–8 FAQs, marked up as FAQPage, matching visible text exactly

H2: Areas we cover for {service}
    Links to all city × service variants

[ Full CTA block: Book · Call · Estimate form ]
```

### Price transparency

Include a real range on every service page. The instinct in this trade is to hide price and
force the call. That instinct loses to competitors who publish ranges, because the buyer
filters on price before she filters on anything else, and a page with no number reads as
evasive to someone already primed to distrust contractors.

Get ranges from the owner. Frame honestly: *"Most panel upgrades in Parker run $2,200–$4,500.
What moves it: amperage, meter location, whether the mast needs replacing, and what the
inspector finds."* Numbers must be approved by the owner and dated.

---

## 5. City page template

See `docs/03` §4 for the anti-thin-content requirements. Structure:

```
H1: Electrician in {City}, CO
    Lead: drive time, response window, years serving the city
H2: Electrical services we provide in {City}     → links all 6 service variants
H2: What {City} homes are like electrically      → build era, panel brands, typical problems
H2: Permits and inspections in {City}            → the actual jurisdiction and process
H2: Who powers your home in {City}               → CORE vs Xcel, and what that means for rebates
H2: Neighborhoods we work in                     → named subdivisions
H2: What {City} homeowners say                   → 2+ real reviews from that city
H2: Questions from {City} homeowners             → genuinely local FAQ
```

The permits section and the utility section are what make these pages non-thin. They are also
the sections a national franchise will never bother to write.

---

## 6. Tools

Interactive tools are the highest-leverage content type for this site. They earn links, they get
cited by answer engines, they give the sales conversation a warm lead, and they are impossible
to duplicate with spun text.

| Tool | URL | What it does | Why it's worth building |
|---|---|---|---|
| **Panel load calculator** | `/resources/tools/panel-load-calculator/` | Homeowner enters square footage, appliances, HVAC, EV. Returns estimated load and whether 100A is likely insufficient. | Directly qualifies the highest-margin service. Ends with "your load suggests a 200A upgrade — book an assessment." |
| **EV charger cost estimator** | `/resources/tools/ev-charger-cost-estimator/` | Vehicle, panel location, distance to garage, panel capacity → install range | Highest-growth service, high ticket, and the query has real volume |
| **Do I need a panel upgrade?** | `/resources/tools/do-i-need-a-panel-upgrade/` | 6-question diagnostic: panel brand, age, breaker trips, fuse box, amperage, planned additions | Targets his #1 ranking complaint directly |
| **Generator sizing calculator** | `/resources/tools/generator-sizing-calculator/` | What must stay on during an outage → recommended kW | Supports the new generator page; Front Range outage searches spike seasonally |
| **Outlet & GFCI requirement checker** | `/resources/tools/outlet-and-gfci-requirements/` | Pick a room → where code requires GFCI/AFCI and how many outlets | Broad top-of-funnel, strong link magnet, useful to DIYers who become customers when the job gets real |

**Build rules**

- Client-side only, no account, no email gate to see the result. Gating the answer kills the
  link value, which is the entire point.
- Offer to email or text the result **after** showing it, as the conversion step.
- Every result ends with a specific, relevant CTA — not a generic "contact us."
- `WebApplication` schema, per `docs/06` §4.6.
- Show the assumptions. A calculator that shows its work gets cited; a black box does not.
- Every tool carries a plain disclaimer that it is an estimate and a licensed electrician must
  verify. This is genuinely important for a trade with real safety consequences, and it is also
  the credibility signal that makes the tool trustworthy.

---

## 7. Local resource guides

These are the link-earning assets. Each requires real research and must cite its sources.

| Guide | URL |
|---|---|
| Electrical permits in the Town of Parker: what needs one and how to get it | `/resources/parker-electrical-permit-guide/` |
| Douglas County electrical permits and inspections | `/resources/douglas-county-electrical-permits/` |
| CORE Electric Cooperative vs. Xcel: who powers your home and which rebates you qualify for | `/resources/core-vs-xcel-colorado-rebates/` |
| Colorado electrical code basics for homeowners | `/resources/colorado-electrical-code-basics/` |
| Getting an EV charger, generator, or exterior lighting past your HOA in Douglas County | `/resources/douglas-county-hoa-electrical-approvals/` |
| Federal Pacific, Zinsco and Challenger panels: how to tell what you have | `/resources/electrical-panel-brands-to-watch-for/` |

**Accuracy requirements — these are not optional.** Permit rules, fees, code editions and
rebate amounts change. Every guide:

- cites the authority's own page for every factual claim
- carries a visible `lastReviewed` date
- is re-verified quarterly, tracked in `data/content-review-schedule.csv`
- never states a fee, a rebate amount, or a code section without a source link

A wrong permit fee on a page attributed to a licensed master electrician is a credibility
problem, not a typo.

---

## 8. Blog

2–4 posts per month. Three buckets, roughly balanced.

### Problem / symptom posts — highest intent

These capture the searches that happen at the exact moment a homeowner needs an electrician.

- Why does my breaker keep tripping? *(and when it's actually dangerous)*
- Why do my lights flicker when the AC turns on?
- What to do when half your house loses power but the rest is fine
- Burning smell from an outlet: what to do in the next five minutes
- Why does my GFCI keep tripping in the bathroom?
- Outlet stopped working and the breaker isn't tripped: what's going on
- Buzzing sound from the breaker panel: how worried should you be
- Why your bathroom fan trips the circuit
- What that scorch mark around an outlet actually means

### Homeowner decision posts — mid funnel

- 100 amp vs. 200 amp service: which does a Parker home need?
- What a panel upgrade actually costs in Douglas County in 2026
- Level 1 vs. Level 2 EV charging at home: which is right for your commute
- Do you need a permit to install a ceiling fan in Parker?
- Standby generator vs. portable: what Front Range outages actually call for
- Should you replace a Federal Pacific panel even if it's working?
- Whole-home surge protection: what it does and does not cover
- Aluminum wiring in 1970s Colorado homes: what to do about it
- Hardwired vs. battery smoke detectors, and what code requires here

### Seasonal and local

- Getting your electrical ready for a Colorado winter storm
- Holiday lighting without tripping every circuit in the house
- Wildfire season and your generator: safe placement and fuel storage
- Spring electrical safety check for homes over 20 years old
- What Douglas County's growth means for aging neighborhood electrical service
- Hail damage and your outdoor electrical: what to check after a Front Range storm

### Rules

- Attributed to **Judson Cushing, Master Electrician (ME.0601023)**, never "Admin"
- 800–1,500 words. No filler to hit a word count.
- At least two internal links to money pages in the first 500 words
- One original photo or diagram minimum
- Opens by answering the question in the first 60 words. Do not make someone scroll past
  three paragraphs of preamble to learn whether a burning smell is dangerous.

---

## 9. Listicles and comparisons

### Listicles

| Title | Angle |
|---|---|
| 7 electrical problems in Parker homes built before 1990 | Local + specific housing stock |
| 10 signs your electrical panel is on borrowed time | Feeds the panel page and the diagnostic tool |
| 5 electrical upgrades that actually add resale value in Douglas County | Realtor link bait |
| 8 things to check before you buy a home in Parker (electrical edition) | Realtor and inspector links |
| 6 electrical code changes Colorado homeowners should know about | Authority signal |
| 9 outlets in your house that should be GFCI and probably aren't | Pairs with the GFCI tool |

### Comparisons

Comparison pages capture decided-but-not-chosen intent, which converts far better than
informational traffic.

| Title | Notes |
|---|---|
| Panel upgrade vs. subpanel: which one do you actually need | Genuine confusion, high ticket both ways |
| Tesla Wall Connector vs. universal Level 2 charger | Real product decision, real volume |
| Whole-home surge protector vs. power strips | Easy sell once explained |
| Repair vs. replace: when an outlet is worth fixing | Trust-building; sometimes the answer is "repair" |
| Hiring a licensed electrician vs. a handyman in Colorado | Positions against the actual competition, and is legitimately about safety and code |
| Generac vs. Kohler vs. Briggs standby generators for Colorado homes | Supports the new generator page |

**Do not write "Allsafe vs. Harmony Electric."** Competitor-comparison pages naming a small
local business invite retaliation, read as unprofessional to the buyer, and are a poor use of
a page. Compete on the service terms instead.

---

## 10. Answer-engine optimization

An increasing share of "electrician near me" research now happens in an AI assistant that never
shows a blue link. Optimizing for citation is cheap if built in from the start.

- **Answer-first structure.** Every H2 section opens with a 40–60 word direct answer, then
  elaborates. That paragraph is the citable unit.
- **`FAQPage` schema everywhere**, matching visible text exactly.
- **Publish an `/llms.txt`** at the root: a plain-text index of the site's key pages with
  one-line descriptions, plus the NAP block and service list.
- **Entity consistency.** "Allsafe Electric," "Parker, Colorado," "Judson Cushing,"
  "master electrician" appear in consistent form across the site, the GBP, and every citation.
  Answer engines resolve entities by consensus across sources.
- **Real numbers and named sources.** Models cite pages with specific, attributable facts far
  more than pages with adjectives. "Panel upgrades in Douglas County run $2,200–$4,500" gets
  quoted. "Affordable panel upgrades" does not.
- **Tables for comparable data.** Structured comparisons get extracted cleanly.
- **Author credentials on the page**, with license numbers.
- Monitor: search Allsafe's core queries in ChatGPT, Perplexity, Gemini and Google AI Overviews
  monthly, and log whether the site is cited. Track it in `data/aeo-citation-log.csv`.

---

## 11. Twelve-month calendar

| Month | Publish | Gate check |
|---|---|---|
| 1 | Launch Tier 0. 2 blog posts. | Tier 0 indexation |
| 2 | Tier 1 (5 city pages). 3 posts. | Tier 1 indexation |
| 3 | Tier 2 (30 city × service). 3 posts. | Tier 2 indexation |
| 4 | 2 tools. 3 posts. First quarterly resource review. | |
| 5 | 3 tools. 2 resource guides. 3 posts. | Tier 3 indexation |
| 6 | 3 resource guides. 3 posts. **Six-month review with the owner.** | Full audit |
| 7–8 | Tier 4 (Tier-2 cities + variants). 3 posts/mo. | Tier 4 indexation |
| 9 | Tier 5 (neighborhood pages). Listicles. 3 posts. | |
| 10–12 | Comparisons, seasonal content, refresh underperformers. 3 posts/mo. | Annual audit |

**Every quarter:** re-run the full technical audit, re-verify the resource guides, review which
pages have impressions but no clicks (title/meta rewrite candidates) and which have clicks but
no conversions (CRO candidates). Refreshing an existing page that already ranks is almost always
a better use of an hour than writing a new one.
