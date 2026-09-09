# 08 — Local SEO, Google Business Profile & the LSA Problem

The owner's two loudest complaints are both local, not organic:

1. He ranks top-3 in the map pack for "Parker electrician" and "electrician near me," but is
   invisible for service-modified searches like "panel upgrade." Harmony Electric ranks first
   for all of them.
2. Local Services Ads have produced **one lead in six months** regardless of budget.

These are different problems with different causes. Treat them separately.

---

## 1. Why he ranks for the head term but not service terms

Google's local ranking has three components: relevance, distance, prominence. Distance and
prominence are roughly fixed in the short term. **Relevance is what moves, and relevance is
service-specific.**

He ranks for "Parker electrician" because his GBP primary category is Electrician, his name
contains no keyword games, and his reviews say "electrician." He does not rank for "panel
upgrade Parker" because:

- The GBP has no **service items** defined for panel upgrades
- The linked website page for panels is thin, badly structured (see `docs/05` §1), and carries
  no `Service` schema
- Almost no reviews mention the words "panel," "breaker box," or "upgrade"
- There are no city × service pages linking those two concepts together
- Zero GBP posts, photos, or Q&A reference the service

Each of those is fixable and none of them requires waiting.

### The fix, in order of impact

| # | Action | Owner | Effort |
|---|---|---|---|
| 1 | Add every service as a **GBP service item** with a written description, matching the site's service names exactly | Account manager | 1 hour |
| 2 | Rebuild service pages with proper H-structure + `Service` schema (this project) | Build team | Included |
| 3 | Build city × service pages so "panel upgrade" and "Castle Rock" co-occur on a real page | Build team | Tier 1 |
| 4 | Review-gardening: ask customers to name the job. "Jud replaced our panel" is worth ten generic five-stars for panel rankings | Owner | Ongoing |
| 5 | Weekly GBP posts rotating through services, each linking the matching service page | Account manager | 20 min/wk |
| 6 | Seed and answer GBP Q&A for the top 10 service questions | Account manager | 2 hours |
| 7 | Geo-tagged job photos uploaded to GBP weekly, named by service | Owner | 5 min/wk |
| 8 | Consistent citations across the aggregators | Account manager | One-time |

Items 1, 4, 5 and 7 are outside this repo but belong in the same project plan. Flag them to the
account manager; the website alone will not close the gap.

---

## 2. NAP consistency — likely the highest-priority defect

The site currently displays a **CallRail tracking number (303-529-9157)** in the footer,
alongside the real number. Google crawls the footer. A second phone number on the site, not
matching the Google Business Profile, is a direct NAP inconsistency.

For organic local this is a moderate negative. **For Local Services Ads, where Google verifies
business identity against public signals, it is a serious one.**

### Rules

- The footer NAP block, `<address>`, and JSON-LD `telephone` always show **(303) 648-1934**
- CallRail swaps the number client-side only, in call-to-action buttons and the header
- Every citation, every directory, every social profile uses the identical string:

```
Allsafe Electric
11479 Pine Dr M-51
Parker, CO 80134
(303) 648-1934
```

Not "AllSafe Electric," not "All Safe Electric," not "Allsafe Home Service," not "Suite M-51,"
not "#M-51." One string, everywhere, byte-for-byte.

### The address risk — escalate, do not solve in code

`11479 Pine Dr M-51` reads like a mailbox or private suite. If it is a commercial mail
receiving agency rather than a location where the business is staffed, both the GBP and the LSA
verification are exposed. This is a business decision, not a build decision.

**Action:** the account manager confirms with the owner what M-51 actually is, and whether the
GBP should be a service-area business (address hidden) rather than a storefront. If he works
out of his home or a shop, that changes the correct configuration. Do not change the address on
the site — it must match the GBP exactly, whatever the GBP says.

### Citation audit

Check these for exact-match NAP, at minimum:
Google Business Profile · Bing Places · Apple Business Connect · Facebook · Yelp · BBB ·
Angi · HomeAdvisor · Nextdoor · Houzz · Thumbtack · Porch · Data Axle · Foursquare ·
Chamber of Commerce (Parker) · Colorado DORA license listing

Note any variant found in `docs/99-decisions-log.md`. Old variants under a former business name
or a previous address are the ones that cause the damage.

---

## 3. Google Business Profile checklist

| Item | Target state |
|---|---|
| Primary category | Electrician |
| Secondary categories | Electrical installation service. **Not** "Contractor" — too broad, dilutes relevance. |
| Business name | `Allsafe Electric` exactly. No keywords appended. Keyword-stuffed names are the single most-reported spam violation and a competitor will report it. |
| Service items | Every one of the 16 services, each with a 200–300 char description |
| Service areas | The Tier 1 + Tier 2 city list. Do not list 40 cities; over-broad service areas dilute. |
| Hours | Mon–Fri 8:00–18:00, plus every holiday set explicitly |
| Attributes | Identifies as veteran/family-owned if true, appointment required, online estimates, LGBTQ+ friendly if he wants it |
| Description | 750 chars, mentions Parker, the top services, and the "we answer the phone" promise |
| Photos | 20+ minimum, refreshed weekly. Exterior, team, at-work, before/after. Named by service. |
| Products | Use for high-ticket items: panel upgrade, EV charger, standby generator |
| Posts | Weekly. Rotate services. Each links a service page with UTMs. |
| Q&A | Seed 10, answer from the business account |
| Messaging | On, if the owner will actually respond. **Off if he will not** — a slow response rate hurts. |
| Booking link | Point at the Housecall Pro booking URL |
| Website link | The new site, with `?utm_source=gbp&utm_medium=organic` |

### The map embed

Embed the GBP map on the contact page and every city page, pointed at
`cid=2391241286444373261`. Use a lazy-loaded facade image that only loads the iframe on click —
a raw Google Maps iframe costs 500KB+ and will break the LCP target.

Every page footer links to the GBP. Every reviews section links to the GBP. This is a genuine
entity-association signal and it costs nothing.

---

## 4. The LSA failure — diagnostic tree

Six months, one lead, unresponsive to budget. **Assume the website is a contributing factor,
not the cause.** A budget that does not move volume almost always means the ad is not being
served at all, and that is an account or verification problem.

Work this in order. Do not skip to the fun ones.

### Tier 1 — is the ad actually eligible to serve? (check first)

- [ ] Is the **Google Guaranteed badge** active, or is it pending/suspended? An unbadged LSA
      profile serves far less, or not at all.
- [ ] Has the **background check** cleared for the business and for every listed technician?
      Expired checks silently pause serving.
- [ ] Is the **license** on file current and matching state records? Colorado licenses
      ME.0601023 and EC.0101068 — verify against DORA.
- [ ] Is the **insurance certificate** current? Expired COI pauses the profile.
- [ ] Is the profile **live** or in "pending review"? Check the LSA dashboard status field, not
      just the budget field.
- [ ] Are there any **policy strikes** or a suspension notice in the account?

Any one of these being wrong explains the entire symptom, and none of them care about budget.
This is the most likely answer.

### Tier 2 — is it serving to the right searches?

- [ ] Which **job types** are selected? If only a narrow set is on, volume collapses. Turn on
      every job type Allsafe actually performs.
- [ ] What is the **service area** set to? Too small means no volume; too large means the ad is
      shown to people outside a reasonable drive and gets skipped.
- [ ] Is the **weekly budget** set, and is the bid mode "maximize leads" vs. a manual bid that is
      below market? A manual bid under the market rate serves zero.
- [ ] Are **business hours** in the LSA profile correct? LSA heavily favors profiles that can
      answer now. If hours are wrong, or if calls go unanswered, serving is throttled hard.
- [ ] Is **call answer rate** being tracked? LSA demotes advertisers who miss calls. For a
      two-person shop this is a real risk and worth measuring.

### Tier 3 — signals the website influences

- [ ] NAP consistency between the site, the GBP, and the LSA profile *(see §2 — currently broken)*
- [ ] `Electrician` + `LocalBusiness` schema present and correct *(currently missing — this build)*
- [ ] Website reachable and fast; the current host serves a **bot-challenge interstitial**,
      which is worth eliminating regardless *(fixed by moving to Vercel)*
- [ ] Review count and recency; LSA weights reviews connected to the LSA profile specifically,
      which are **not** always the same as GBP reviews. Check that the LSA profile shows them.
- [ ] Responsiveness score in the LSA dashboard

### Tier 4 — competitive

- [ ] What are Harmony Electric, Fix It 24/7 and Mister Sparky bidding? LSA is an auction
      weighted by proximity, review score, responsiveness and budget. A national franchise
      (Mister Sparky) may simply be outbidding at a level a solo operator cannot match on
      every job type — in which case the answer is to narrow to the job types where he can win.

**Deliverable:** the account manager works this tree and reports findings before the site
launches, so the two efforts are not confounded and we know what actually moved the needle.

---

## 5. Local content that earns local links

Links are the missing prominence input. For a residential electrician, the realistic sources are
local and topical, not editorial. Ordered by achievability:

1. **Town of Parker / Douglas County permit guides.** Genuinely useful pages that HOAs,
   realtors and Facebook neighborhood groups link to organically.
2. **CORE Electric Cooperative vs. Xcel — who actually powers your house.** Parker, Castle Rock
   and Highlands Ranch are served by **CORE Electric Cooperative** (formerly IREA), not Xcel,
   while other parts of the south metro are Xcel. Almost every "Colorado electrical rebate"
   article on the internet assumes Xcel and is therefore wrong for his primary market. A page
   that gets this right is genuinely useful, genuinely local, and impossible for a national
   franchise to replicate.
   > **Verify per city before publishing.** Territory boundaries do not follow city limits.
   > Confirm each city's electric provider and each provider's current rebate programs, and
   > cite the source. Do not state a rebate amount without a link to the provider's own page.
3. **HOA and metro district resources.** Stonegate, Pradera, The Pinery and Canterberry Crossing
   all have HOAs with design review boards. A guide to getting exterior lighting, EV chargers or
   a generator past an HOA review board is exactly the kind of page an HOA site links to.
4. **Douglas County School District** sponsorships, youth sports, the Parker Chamber. The owner
   already mentioned he works with teachers at a local school and gets word-of-mouth from them.
   That relationship is a link and a review-velocity engine that is being left on the table.
5. **Local news / Parker Chronicle** — pitch a seasonal piece on holiday-lighting circuit loads
   or winter-storm generator safety.
6. **Supplier and manufacturer "find a pro" directories** — Generac, ChargePoint, Tesla Wall
   Connector installer network, Lutron, Kasa. These are high-authority, easy, and most
   competitors never claim them.
7. **Colorado DORA license lookup** and the state electrical board listing.

Do not buy links, do not do guest-post networks, do not do reciprocal link schemes with other
contractors.

---

## 6. Review strategy

Reviews are the highest-leverage, lowest-cost local ranking factor available here, and this
business already has strong ones.

- **Ask every customer, at the moment of relief.** Right after the fix works, not by email
  three days later.
- **QR code on the invoice and the truck.** Link to
  `https://search.google.com/local/writereview?placeid={PLACE_ID}`
- **Housecall Pro can automate the review request.** Turn it on. It is already paid for.
- **Ask them to name the job.** "If you can mention what we fixed, it helps other people find
  us." This is what converts review volume into service-term rankings.
- **Respond to every review within 48 hours**, using the service name naturally in the reply.
  Owner responses are indexed and count toward relevance.
- **Target: 4+ new reviews per month.** Velocity matters more than total count.
- Never gate, never incentivize, never buy. A review-gating violation would cost the profile.

---

## 7. Measurement

| Metric | Baseline | Source | Cadence |
|---|---|---|---|
| Map pack rank, 10 core terms × 5 cities | TBD | Local Falcon / BrightLocal grid | Monthly |
| GBP calls, direction requests, website clicks | TBD | GBP Insights | Monthly |
| Review count, average, velocity | TBD | GBP | Monthly |
| LSA leads, cost/lead, dispute rate | ~1 lead / 6 months | LSA dashboard | Weekly |
| Indexed pages | 86 | GSC | Weekly |
| Organic impressions | ~350/day | GSC | Weekly |
| Form + call leads by source | TBD | CallRail + GA4 | Weekly |

**Set the geo-grid baseline before launch.** Without a pre-launch grid there is no way to prove
the map-pack improvement the owner is paying for, and he has already told us the map pack is
where his business comes from.
