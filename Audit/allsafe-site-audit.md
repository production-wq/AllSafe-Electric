# Allsafe Electric site audit

Staging build reviewed: `all-safe-electric-web.vercel.app`
Pages crawled: home, about, service area, services hub, wiring & rewiring, `/electrician-parker/`, `/electricians/parker-co/`

Direction this is written against: the site should sell **the business**, not Jud and Justin personally, and it should support expansion across the full service area rather than positioning Allsafe as a Parker neighborhood electrician.

---

## 1. Launch blockers

These ship broken. Fix before anything else.

**1.1 Internal planning notes are rendering on public pages.**
`/electricians/parker-co/` displays this to visitors, in the body copy:

> "Staging note: this city page is built but not yet published (noindex). It releases once Tier 0 clears the indexation gate. See planning/docs/09 §3."

The service area page has a second one: "City pages are being rolled out in stages as each is indexed, see the launch plan." The About page has a third: "Award badges shown on the site link here; profile links are being added." Strip every one of these and grep the codebase for the pattern, since three separate instances means there are almost certainly more.

**1.2 There are two complete sets of city pages at two different URL patterns.**

| | `/electrician-parker/` | `/electricians/parker-co/` |
|---|---|---|
| Robots | index, follow | **noindex, nocache** |
| Length | Long version | Short version |
| Content | Same "Parker at a glance" table, same four FAQs, verbatim | Same |
| Linked from | Footers, service pages, about page | Service area page, nearby-areas links |

This is the single biggest structural problem on the site. Pick one pattern, 301 the other, and make sure every internal link points at the survivor. Right now the service area page, which is the hub that should be passing authority to city pages, links exclusively to the **noindex** set. The indexable city pages get no link from the page whose whole job is linking to them.

My recommendation is to keep `/electricians/parker-co/` as the pattern (scales cleanly, reads as a directory, supports state disambiguation later) and 301 the flat set into it. But whichever you keep, the content has to be deduplicated, not just redirected. The two versions share paragraphs word for word.

**1.3 The Vercel preview domain is fully indexable.**
Pages on the preview are `index, follow` with canonicals pointing to `allsafehomeservice.com`. If Google finds the preview before launch you get a duplicate of the entire site. Add `X-Robots-Tag: noindex` at the Vercel domain level or password protect the deployment.

**1.4 Two different headers and two different footers are in production.**
Home, service area, and `/electricians/*` render the full header: utility bar with license numbers and address, Emergency Repairs link, three-column services mega menu, Reviews, Coupons, Contact.
About, services hub, wiring page, and `/electrician-*/` render a stripped header: no utility bar, no Emergency Repairs, no Reviews, no Coupons, no Contact.

Footers diverge too. On some pages the Service Areas column links to individual city pages; on others every item in that column links to `/service-area/`, and the Company column is replaced by a single "Blog & resources" link. Consolidate to one header component and one footer component.

**1.5 Header CTA targets are inconsistent.**
The stripped header's "Free Estimate" goes to `/contact/`. The full header's goes to `/contact/#estimate`. See section 4 for what these should actually be.

---

## 2. Positioning: it's a company, not two guys

You called the About page out specifically. It's worse than weird, it actively caps the business.

**2.1 The About page is built around the wrong subject.**
- H1: "It's Jud and Justin. That's the company."
- Meta title: "About Allsafe Electric | Jud & Justin, Parker CO"
- Section heading: "Two electricians, not a rotating crew"
- Timeline milestone 4: "Still deliberately two people," including "Growing headcount would mean sending electricians the customer has never met, which is the exact thing Allsafe exists to avoid. The company stays small on purpose."

That last one is the killer. The site publicly commits Jud to never hiring. The day he adds a third electrician, his own About page says that's a downgrade in service. Every one of these needs rewriting around the company: licensed, insured, owner-operated standards, consistent crew, work done to the same standard on every job.

**2.2 Remove every mention of Justin. Confirmed, no exceptions.**
Justin should not appear anywhere on the site. Full removal list:

- About page H1 "It's Jud and Justin. That's the company."
- Meta title and OG title "About Allsafe Electric | Jud & Justin, Parker CO"
- Meta description, OG description and Twitter description on the About page, all of which name him
- The two-person team grid and the "Justin / Licensed electrician / the other half of the company" card
- The stat "2 Licensed electricians, no subcontractors"
- Timeline milestone 2, "The reviews that accumulate name Jud and Justin personally"
- Wiring page, "Allsafe's Google reviews name them both personally"
- The credentials line "**Both** licenses below are current." ME.0601023 and EC.0101068 are both Jud's, master and contractor. Reword so it's clear these are the company's licenses, not one per person.

**The testimonials are fine as they are.** Customer review text is the customer's words, not our copy, so Todd's "He and Justin were out a day later" and Mark's "Judson and Justin did a phenomenal job" can stay verbatim. Don't edit or swap them on Justin's account. The only reason to touch the testimonial set is 3.8, which is about getting reviews from outside Parker into rotation.

What has to change is anything Allsafe wrote. The line on the wiring page, "Allsafe's Google reviews name them both personally," is our sentence about the reviews rather than a review, so it goes.

**2.3 Anti-scale language is sprinkled through the whole site, not just About.**
Search and replace the pattern everywhere it appears:
- "No call center, no rotating crew, no sales rep"
- "one of two licensed electricians shows up, and it is usually Jud"
- "He is usually the person who answers the phone, and usually the person who turns up"
- "Jud arrives, looks at the job, and gives you a fixed price"
- "The closer you are, the faster **Jud** can be there" (service area page)
- "Meet Jud on your next electrical job" (About page final CTA)
- "Jud has a dog of his own and is fine working around yours"

The trust signals underneath these are good and worth keeping. Reframe them as company standards: a real person answers, two-hour arrival windows, fixed price before work starts, shoe covers on, no upsell. None of that requires naming an individual, and all of it survives hiring.

**Where Jud's name does belong:**

- **Blog author byline.** Jud Cushing, Owner and Master Electrician, ME.0601023. Give him a proper author page with an Person schema entity, and link it from every post. That's the E-E-A-T play and it's the right place for the individual.
- **One founder section on About**, not the whole page. Why he started the business in 2018, the standards he holds the company to, and the fact that he's a master electrician. Framed as the origin of the company's standards rather than as a description of who shows up at the door.
- **Nowhere else.** No "Jud arrives," no "Meet Jud on your next job," no "the closer you are the faster Jud can be there."

**2.4 Jud's name is in the site metadata.**
`meta-author: Judson Cushing` on every page. Change to Allsafe Electric.

**2.5 Housecall Pro is named to customers.**
About page "The details" block lists "Scheduling: Housecall Pro," and the homepage FAQ says "The Book a visit button goes to our Housecall Pro scheduler." Customers don't need the vendor name. Say "book online any time."

---

## 3. Geography: Parker is the home base, not the ceiling

**3.1 Parker is hardcoded into core URLs.**
- `/electrical-services-parker-co/` (services hub)
- `/emergency-electrical-repairs-parker-co/` (highest-intent service page)

Every other service page uses a clean slug. These two bake a single city into the URL of pages that need to rank across the whole metro. Change them to `/electrical-services/` and `/emergency-electrical-repairs/` now, while the site is unlaunched and redirects cost nothing. Parker intent gets served by the Parker city page, which is what it's for.

**3.2 Service page titles, H1s and metas are Parker-locked.**
Wiring page: title "Home Wiring Repair & Rewiring in Parker, CO", H1 "Home wiring repair and rewiring in Parker", meta description "...across Parker." Services hub: "Residential electrical services in Parker, CO." Homepage H1: "Parker's Trusted Residential Electrician."

Service pages should target the service plus the metro, not the single city. Something like "Home Wiring Repair & Rewiring | South Denver Metro | Allsafe Electric," with Parker mentioned naturally in the body where it's genuinely relevant. Audit all 16 service pages for the same pattern.

**3.3 The service area page is a Parker page wearing a service area page's clothes.**
Current structure: an intro about how fast Jud can get to you from Parker, five "primary cities," a seven-item unlinked "Also serving" list, then a full section on **Parker neighborhoods**. The neighborhood section is the largest content block on a page that exists to prove metro-wide coverage.

Rebuild it as: a metro-level statement of coverage, then tiered city groupings by county with every city linked, then the map. Parker neighborhoods belong on the Parker city page, where they already live.

**3.4 The "Also serving" list has no links.**
Castle Pines, Aurora, Littleton, Greenwood Village, Franktown, Elizabeth and Sedalia are plain text on the service area page, even though `/electrician-castle-pines/`, `/electrician-aurora/`, `/electrician-littleton/` and the rest all exist. Sedalia is listed but has no page at all. Reconcile the list against the pages that exist and link every one.

**3.5 Three different town lists disagree with each other.**
About page and service pages list 21 linked towns. Service area page lists 5 primary plus 7 "also serving," a different set that includes Sedalia and omits Denver, Lakewood, Edgewater, Elbert, Foxfield, Dove Valley, Acres Green and Englewood. Homepage's service area section lists Parker plus five Parker neighborhoods and no other cities at all. Pick one canonical list and render it from a single data source.

**3.6 The homepage barely acknowledges the service area.**
"Proudly Serving Parker and Surrounding Neighborhoods," followed by Parker, Stonegate, Stroh Ranch, Pradera, The Pinery, Canterberry Crossing. Five of those six are Parker subdivisions. A homeowner in Castle Rock or Centennial lands on this page and concludes Allsafe doesn't serve them. This section should lead with cities.

**3.7 All 21 locations are confirmed serviceable, so the label is the only problem.**
Jud will drive to every one. Keep all 21 pages. But stop calling them all "towns": Stonegate and The Pinery are Parker neighborhoods, and Dove Valley and Acres Green are CDPs rather than incorporated towns. Change the count label to something accurate like "21 communities across four counties," and structure the service area page in tiers, cities first, then neighborhoods and unincorporated areas.

Since he's scaling, these pages need to earn their rankings rather than just exist. Each one needs the genuinely local detail the Parker page has: permit authority, electric utility (CORE vs Xcel is a real differentiator and it splits across this footprint), housing stock and era, and the panel brands that turn up there. A page that's the Parker page with the city name swapped will not rank, and 21 of them will drag the whole site. This is the biggest content workload on the project, so scope it deliberately.

**3.8 Every review on the site is from Parker.**
All four homepage testimonials, the About page pull quote, and the wiring page quote are tagged "Parker, Colorado." That reinforces exactly the perception you're trying to break. Pull reviews from Castle Rock, Highlands Ranch, Lone Tree and Centennial customers if they exist in the GBP, and prioritize collecting them if they don't.

**3.9 Footer tagline.**
"Your friendly, professional local electricians serving Parker, Colorado and its surrounding neighborhoods." Sitewide, on every page. Rewrite to the metro.

---

## 4. CTAs

You're right that click-to-call should be primary. Current state:

**4.1 Estimate is the primary CTA everywhere, phone is secondary.**
Every CTA pair on every page renders "Get a Free Estimate" first, phone number second. Flip the visual hierarchy: phone as the primary filled button, estimate as the secondary. This matters most on mobile and most of all on the emergency page, where a form is the wrong response to a burning smell.

**4.2 The estimate CTA navigates away from a form that's already on the page.**
Every page already renders a full estimate form in the bottom CTA block. The button above it links to `/contact/#estimate`, a different page. So a visitor on the wiring page who clicks "Get a Free Estimate" gets sent to the contact page instead of scrolled 400px down to the identical form they were already looking at. Change these to an on-page anchor to the local form, and keep `/contact/` for the nav item only.

**4.3 The sticky mobile bar has three competing actions.**
Call / Book / Estimate. Book goes to Housecall Pro, Estimate goes to the contact page. Two of the three are the same intent. Cut to Call as the dominant action and one secondary, and make the secondary consistent with whatever you decide the on-page conversion path is.

**4.4 "Free Estimate" contradicts the FAQ.**
The button says free estimate. The homepage FAQ says "A flat diagnostic or estimate fee, told to you before you book," and every CTA block's fine print says "Free estimates on quoted work, and the diagnostic fee on a service call comes off the repair." A visitor reads "free," calls, and hears about a fee. Either change the button text to something honest ("Get a Quote," "Book a Visit") or make the free/paid distinction visible right at the CTA rather than buried in an FAQ.

---

## 5. Factual conflicts

These contradict each other on the same site. Every one needs a real number from Jud.

| Claim | Homepage says | About says | **Correct value** |
|---|---|---|---|
| Reviews | 400+ | 148 | **149** |
| Rating | "5-Star Reviews" | "5-star Google reviews" | **5.0** |
| Years in business | 15+ | 8+ | **8** (founded Jan 2018) |
| Emergency response | "60 min average" | Mon-Fri 8-6, no 24-hour promise | Needs a decision |

Use 149 and 5.0 everywhere, from a single config value so the next update is one edit. The 15 vs 8 conflict comes from the homepage passing Jud's years in the trade off as the company's age; say "8 years in business, 15+ years of master electrician experience" and both numbers stay true.

"Average Emergency Response: 60 min" is a promise the business hasn't agreed to make, sitting on a site that elsewhere says weekdays only. Resolve before launch.

**5.1 NAP consistency is a mess in the wild, and this matters more now that the GBP is location-based.**
The GBP is set to **11479 Pine Dr M-51, Parker, CO 80134**. A location-based listing means Google is matching that exact address against citations across the web. Right now it doesn't match anything:

| Source | Address | Phone |
|---|---|---|
| Site / GBP | 11479 Pine Dr **M-51** | (303) 648-1934 |
| BBB, listing 1 | 11479 Pine Dr **Unit 21** | (303) 648-1934 |
| BBB, listing 2 | 11479 Pine Dr **Ste 21** | (303) 648-1934 |
| BBB, listing 3 | **10940 S Parker Rd PMB 128** | (303) 648-1934 |
| Yellow Pages | **10940 S Parker Rd Ste 128** | **(720) 740-6900** |

Three unit designators for the same street address, a second street address entirely, and a second phone number. BBB is carrying three separate location records for one business. A citation cleanup should be a launch-adjacent task, not an afterthought: pick the GBP address as canonical, get BBB merged down to one record, fix Yellow Pages, and audit Angi, HomeAdvisor, Yelp and Nextdoor against the same string.

**5.2 Third-party profiles contradict the site on experience.**
Yelp and Nextdoor both say "over 20 years experience." The site says 15+. Pick one number and push it everywhere.

**5.3 Third-party ratings are lower than Google.**
Angi and HomeAdvisor both show 4.7. That's fine, but the site currently displays a HomeAdvisor badge without linking to the profile. If you link it, the 4.7 sits next to a 5.0 claim. Decide whether the badge earns its place.

Also verify:
- Published price ranges ($350 to $8,000 for wiring, $2,200 to $4,500 for panels) should be confirmed as current and as ranges Jud will honor across the whole service area, not just Parker.
- Hours: "Mon–Fri 8:00am–6:00pm" vs homepage "plus a weekday emergency line." Decide what the emergency offer actually is.

---

## 6. Copy bugs from the de-personalization pass

Someone ran a find-and-replace swapping Jud for "we" and didn't proofread. The artifacts are visible:

- Services hub, emergency card: "A real person answers and **We** come out." Capital W mid-sentence.
- Wiring page, step 1: "We inspect accessible wiring, the panel, and a sample of boxes, then **tells** you honestly whether this is a repair or a rewire." Verb never got updated from the singular.
- Wiring page: "A real person answers the phone... Allsafe's Google reviews name **them both** personally." The paragraph is in company voice, then references two people with no antecedent.

Proofread all 16 service pages and all 21 city pages for the same pattern rather than fixing these three.

**British spellings throughout.** "Aluminium" (homepage), "neighbourhoods" (service area, about, homepage FAQ), "minimise" (wiring page). The Parker city page uses American spellings for the same words, so it's inconsistent as well as wrong for the market. "Aluminium wiring" in particular is a keyword mismatch on a term homeowners search.

---

## 7. Design: the window blocks

To answer your question directly: no, this is not best practice, and it's the main reason the site reads as generated.

Every page runs the same module sequence. Eyebrow label, H2, stat strip of four boxed figures, numbered card grid, image gallery, boxed process steps, FAQ, table of contents, dual CTA, then a second full CTA block with a complete estimate form, then the footer. The wiring page alone has roughly a dozen distinct boxed sections. The About page has the stat strip, a team card grid, a four-step timeline, a details table, a nine-image gallery, a quote card, and two full link grids.

Three problems with it:

**It is not an SEO benefit.** Google doesn't reward section count. What it does penalize, in effect, is a low ratio of unique content to boilerplate. Right now the bottom third of every single page is identical: same CTA copy ("Book a visit online any time, or call and talk it through with a real person..."), same three bullets, same full form, same footer. On a short service page that boilerplate can outweigh the unique content.

**It is a conversion problem.** The module rhythm is so uniform that nothing reads as important. There is no visual hierarchy telling a homeowner with a sparking outlet what to do.

**It is the specific tell for AI-generated sites.** Uniform card grids, four-stat strips, eyebrow-label-above-every-heading, numbered "signs you need this" boxes. Buyers and competitors recognize the pattern now.

What I'd do:
- Cut each service page to five or six sections. The problem, what it costs, what's included, how the job goes, FAQ, CTA. Drop the stat strips on interior pages entirely.
- Let some content be prose in a plain container. Not everything needs a bordered box.
- Render the estimate form once per page, not twice, and drop the duplicate mid-page form on the homepage.
- Replace the 21-item flat town link block that appears at the bottom of every service page with three or four contextual links to the tier-one cities. Sitewide boilerplate link blocks dilute rather than help.
- Vary the layout between page types so services, cities and About don't look like the same template with different words.

Related: the "On this page" table of contents on the wiring page lists a section called "What isn't covered" (`#not-included-heading`) that doesn't exist on the page. Broken anchor. Check the TOC generator against actual rendered sections across all service pages.

---

## 8. Technical items to verify

I couldn't inspect these from the rendered output. Add them to the QA pass.

- **Schema.** Confirm Electrician or LocalBusiness JSON-LD on every page with consistent NAP, `areaServed` covering the full list of cities rather than Parker only, `sameAs` pointing to the GBP and Facebook, plus Service schema on service pages, FAQPage where FAQs render, and BreadcrumbList.
- **Aggregate rating markup.** If review counts are marked up anywhere, they have to match the real GBP number, which is the same 148 vs 400 problem.
- **Sitemap.** Must exclude the noindex city set and every URL you decide to 301.
- **Canonicals.** Currently point to `allsafehomeservice.com`, which is right for launch, but verify after the URL changes in 3.1.
- **Image weight.** The About page loads a nine-image gallery plus four inline photos at `w=2400`. Check LCP and total page weight on mobile.
- **Duplicate images.** `allsafe-electrician-holding-dog.jpg` renders twice on the About page.
- **Badge links.** BBB and HomeAdvisor badges link to `/about/#credentials` instead of the actual verification profiles. Link them out or remove the badges.
- **Form handling.** Confirm where submissions go, that CallRail or equivalent is capturing source, and that the thank-you state fires a conversion for the $2,500/mo Ads launch.

---

## 9. Questions

**Answered:**
- Justin comes off entirely.
- 149 Google reviews, 5.0 rating.
- All 21 locations are serviceable.
- GBP is location-based at 11479 Pine Dr M-51.
- Jud is scaling, so the site is written for a growing company.
- Jud gets a blog byline and a founder section, not the whole site.

**Still open for Jud:**
1. Does he want an emergency or after-hours offer? If yes, what are the real hours and what happens to the "60 min average" claim?
2. Are the published price ranges current, and will he honor them in Denver and Lakewood the same as in Parker?
3. Who is hired next, and in what role? A dispatcher changes "a real person answers" from a personal promise to an operational one, which is the copy we want either way.
4. Can we get access to fix the BBB and Yellow Pages records, or does he need to do it? (See 5.1.)
