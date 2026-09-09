# 13 — Analytics & Tracking

A $2,500/mo Google Ads campaign starts alongside this site. Google's bidding learns from
conversion signal. Broken or missing tracking in week one costs months of campaign performance,
and the owner is already skeptical about paying for a ramp period.

Set this up before launch, not after.

---

## 1. The stack

| Tool | Purpose | Status |
|---|---|---|
| Google Analytics 4 | Behavior, conversions, attribution | Configure fresh |
| Google Search Console | Indexation, queries, coverage | **Two properties exist — reconcile** |
| CallRail | Call tracking, DNI, recording | Already installed |
| Google Ads | Campaign, imported conversions | Launching |
| Google Business Profile Insights | Local | Existing |
| Housecall Pro | Jobs, revenue, closed-loop | Existing |

### Reconcile Search Console first

The live site serves **two different `google-site-verification` tokens** across pages, which
means two GSC properties. Before launch:

1. Find both properties
2. Determine which has the real historical data
3. Set up a **Domain property** (`allsafehomeservice.com`) as the canonical one, which captures
   every subdomain and protocol
4. Keep both verification TXT records live through migration
5. Export all historical data from both before changing anything

Reading the wrong property is worse than having no data, because it produces confident wrong
conclusions in a client report.

---

## 2. GA4

### Configuration

- One property, one web data stream
- Enhanced measurement on, except `form_start`/`form_submit` (we fire our own, cleaner)
- **Cross-domain measurement including `book.housecallpro.com`** — without this, every online
  booking is attributed to `(direct)` and the campaign never learns which keywords produce jobs
- Internal traffic filter for the office IP and the agency's IPs
- Unwanted referral exclusion for `book.housecallpro.com`
- Data retention set to 14 months
- Link Google Ads and Search Console
- Consent Mode v2 implemented

### Events

| Event | Trigger | Parameters | Key event? |
|---|---|---|---|
| `click_call` | any `tel:` click | `location`, `page_path`, `is_business_hours`, `service` | ✅ |
| `click_book` | booking handoff or widget open | `location`, `page_path`, `service` | ✅ |
| `generate_lead` | estimate form success | `service`, `city`, `page_path`, `has_photo`, `urgency` | ✅ |
| `booking_complete` | HCP confirmation callback | `service`, `value` | ✅ |
| `begin_booking` | hero booking card opened | `page_path` | |
| `form_start` | first field focus | `page_path`, `form_id` | |
| `form_error` | validation failure | `field`, `error_type` | |
| `view_reviews` | reviews 50% visible 2s | `page_path` | |
| `tool_start` / `tool_complete` | calculator | `tool_name`, `result_bucket` | |
| `click_directions` | map/directions link | `page_path` | |
| `click_gbp` | Google Business Profile link | `location` | |
| `scroll_75` | 75% depth | `page_path` | |

`location` is where on the page the action happened: `header`, `hero`, `sticky_bar`, `mid_page`,
`footer`, `availability_strip`. Without this you cannot answer "does the sticky bar work," which
is the highest-value CRO question on this site.

### Custom dimensions

Register as event-scoped: `service`, `city`, `location`, `urgency`, `tool_name`,
`is_business_hours`, `result_bucket`.

`is_business_hours` is worth registering specifically. If a large share of calls happen outside
8–6, that is a business decision the owner needs to see, and it also bears directly on the LSA
responsiveness problem in `docs/08` §4.

---

## 3. CallRail

Already installed on the current site. Carry it forward carefully.

### Rules

- **Dynamic number insertion swaps display numbers client-side only.** The server-rendered HTML
  always contains `+13036481934`.
- **Never** let a tracking number reach: the footer NAP block, `<address>`, JSON-LD, the GBP,
  or any citation. The current site fails this. See `docs/10` §5.
- Number pools sized for concurrent-session volume, so two visitors never share a number
- Source tracking configured for: Google Ads, LSA, organic, GBP, direct, referral, Facebook
- Form capture connected so form leads and call leads land in one place
- Whisper message on inbound calls identifying the source, so Jud knows before he says hello
- Call recording on, with the Colorado one-party consent notice configured

### Attribution wiring

- CallRail → GA4 integration on, so calls appear as GA4 events
- CallRail → Google Ads, importing qualified calls as conversions
- **Qualified call = 60+ seconds.** Matches what the owner was told on the call and filters out
  wrong numbers and hangups.

---

## 4. Google Ads conversions

| Conversion | Source | Count | Value |
|---|---|---|---|
| Phone call 60s+ | CallRail import | One per click | Assign an estimated value |
| Estimate form submission | GA4 `generate_lead` | One | Assign |
| Online booking started | GA4 `click_book` | One | Lower value |
| Online booking completed | HCP callback | One | Highest value |

Assign values even if they are estimates. Smart Bidding with no values optimizes for count, and
count treats a $180 outlet repair the same as a $4,000 panel upgrade. Get rough job values from
the owner and revisit at month three.

### Enhanced conversions

Enable enhanced conversions for leads, hashing the email and phone from the form. This
meaningfully improves match rates and is the difference between the campaign learning in six
weeks and learning in twelve.

---

## 5. Closed-loop reporting

The metric the owner actually cares about is not leads. It is booked, completed, paid jobs.

1. Pass a lead ID from the site into Housecall Pro on every form submission and booking
2. CallRail passes call source into HCP where possible
3. Monthly: export HCP jobs, join on lead ID, produce revenue by channel

This turns "you got 31 leads" into "Google Ads produced $14,200 in completed work last month,"
which is the only number that makes a renewal conversation easy. It requires HCP API access —
request it during onboarding, not at month six.

---

## 6. Dashboard

One Looker Studio dashboard, shared with the owner, updated automatically.

**Page 1 — the money**
Leads by source, cost per lead, calls vs. forms vs. bookings, booked jobs, revenue by channel,
month over month.

**Page 2 — visibility**
Indexed pages vs. the 86 baseline, impressions, clicks, average position for the tracked term
set, map pack grid position for the core terms across the five cities.

**Page 3 — the site**
Top landing pages, conversion rate by page, mobile vs. desktop, Core Web Vitals, form
abandonment.

Keep page 1 first. The owner is a working electrician who reads this on a phone between jobs.
He does not want to scroll past impressions to find out whether it made him money.

---

## 7. Baselines to capture before launch

Capture these now. Once the site changes, they cannot be reconstructed.

- [ ] GSC: 16 months of Performance data, both properties, full export
- [ ] GSC: full Index Coverage export with URLs, every status
- [ ] GA4 / Search Kit: whatever historical behavior data exists
- [ ] Map pack geo-grid for 10 core terms × 5 cities *(this is the one people forget, and it is
      the one the owner cares most about)*
- [ ] GBP Insights: 12 months of calls, direction requests, website clicks
- [ ] Current review count and average rating, with a screenshot
- [ ] CallRail: 6 months of call volume by source
- [ ] LSA: 6 months of impressions, leads, spend, and the profile status field
- [ ] Full-site crawl with status codes, titles, meta, headings, canonicals
- [ ] Backlink profile export
- [ ] Lighthouse scores on 5 representative pages
- [ ] Screenshots of every page template

Store in `data/baseline/` with the capture date. At the 90-day review this folder is the
difference between "it feels better" and a defensible result.
