# 07 — Conversion Specification

A $2,500/mo Google Ads campaign launches alongside this site. Conversion quality is a day-one
requirement. Google's bidding learns from the conversion data these pages produce; a page that
converts poorly in week one teaches the algorithm the wrong thing and costs months.

---

## 1. The three actions

Every page carries all three. No exceptions, including blog posts and tools.

| # | Action | Mechanism | Best for |
|---|---|---|---|
| 1 | **Call** | `tel:` link, call-tracking-tracked | Emergency, mobile, older visitors, anyone anxious |
| 2 | **Book** | Online booking (external booking tool) | The self-serve buyer who does not want to talk to anyone |
| 3 | **Estimate** | On-page form, Server Action | Non-urgent, wants to describe the job first, browsing at 11pm |

These are not redundant. They serve genuinely different buyers, and the owner's audience — a
homeowner who has been let down before — splits sharply between "I need to hear a human voice"
and "I do not want to call and be sold to."

### CTA hierarchy

**Standard pages:** Book is the filled primary, Call is the blue outline, Estimate is a text
link. Do not stack all three as identical buttons in a row.

**Emergency page only:** Call becomes the filled primary. A form is the wrong response to a
burning smell. The emergency page CTA order is: Call → Book → Estimate.

**Estimate button label rule:** Do not use "Free Estimate" as the primary label. The FAQ
discloses a diagnostic fee on service calls, creating a contradiction. Use "Get a Quote" or
"Book a Visit" as the button label. The free/paid distinction is disclosed at the CTA block,
not buried in an FAQ.

### Placement

| Location | Call | Book | Estimate |
|---|---|---|---|
| Header (desktop) | number, always visible | primary button | — |
| Availability strip | contextual | — | — |
| Hero | secondary button | booking card, primary | — |
| After each content section | — | inline button | — |
| Mid-page block | ✓ | ✓ | ✓ |
| Page footer block | ✓ | ✓ | full form |
| Mobile sticky bar | ✓ | ✓ | ✓ (one secondary, not all three equal) |

**Estimate CTA on pages that already have a form:** link to the on-page form using an anchor
(`#estimate-form`), not to `/contact/`. Sending a visitor to a different page when the form
is already 400px below them is a conversion loss with no benefit.

**Mobile sticky bar:** two dominant actions only — Call (primary) and Book (secondary). The
third action goes in the full CTA block at page bottom. Three equal competing actions on a 375px
screen produce choice paralysis.

---

## 2. Click-to-call

```html
<a href="tel:+13036481934"
   data-cta="call"
   data-location="hero"
   class="btn-secondary">
  (303) 648-1934
</a>
```

- Real anchor with a `tel:` href. Never a JS click handler — screen readers, long-press to
  copy, and "add to contacts" all depend on the real href.
- The call-tracking service swaps the **displayed** number and href client-side by source.
  The server-rendered fallback is always the real number, so the page works with JS off and
  crawlers only ever see the real one. Do not name the call-tracking vendor in copy.
- Never place the tracking number in `<address>`, the footer NAP block, JSON-LD, or the
  `sameAs` array. See `docs/06-schema-spec.md` §2.
- Outside business hours the label changes to *"Call the emergency line"* rather than hiding.
- The `audit:seo` script fails the build if any `tel:` link does not point to `+13036481934`.

---

## 3. Click-to-book

The online booking URL is stored once in `lib/constants.ts` and imported everywhere.
**Do not hard-type it.** Verify it resolves in CI.

**Note on copy:** do not mention the booking vendor name in any customer-facing copy. Say
"book online" or "book a visit," not the vendor name. See `CLAUDE.md` §1.11.

### Implementation, in preference order

1. **Preferred — embedded widget on `/book/`.** Embedding the widget on our own `/book/` page
   keeps the visitor on the domain, keeps analytics attribution intact, and lets us wrap
   the widget with trust content (licenses, reviews, "here's what happens next"). Load it
   lazily, only when `/book/` is requested or the hero booking card is opened.
2. **Fallback — direct link**, `target="_blank" rel="noopener"`, with the analytics event fired
   *before* navigation.

### Attribution problem to solve on day one

A booking completed on the external booking domain is a cross-domain event. Without
configuration it will be attributed to `(direct)` and the Google Ads campaign will never learn
which keywords produce bookings. Fix all three:

- Configure GA4 cross-domain measurement to include the booking subdomain
- Append UTM parameters to the booking URL, propagating the visitor's original source
- Fire a `begin_checkout`-style GA4 event on our side at the moment of handoff

Confirm with a real end-to-end test booking before launch, not after.

### The hero booking card

A short pre-qualifier, not the full widget. Three fields: **service**, **when**
(today / this week / not urgent), **zip**. On submit, deep-link into the booking tool with
those values pre-filled if the API supports it, or hand off to `/book/` with the state in
the URL.

Reducing the first interaction to three taps is worth more than any copy change on this page.

---

## 4. The estimate form

Server Action. No third-party iframe. The current site uses a plugin form that renders a
stray `Δ` and asks for the email address **twice** — remove both.

### Fields

| Field | Required | Type | Notes |
|---|---|---|---|
| Name | ✓ | text | One field. Not first/last. |
| Phone | ✓ | tel | `inputmode="tel"`, auto-format, validate US 10-digit |
| Email | ✓ | email | Once. Never a confirmation field. |
| ZIP | ✓ | text | `inputmode="numeric"`, validates against service area, shows drive-time reassurance |
| What's going on? | ✓ | textarea | Placeholder: "Breaker keeps tripping in the kitchen" |
| Service | — | select | Pre-filled from page context |
| Photo | — | file | Optional, huge for diagnosis and for close rate |
| When | — | radio | Today / This week / Just planning |

Eight fields is already generous. Do not add "how did you hear about us" — that is what
call tracking and analytics are for.

### Rules

- Persistent visible labels above every input. Never placeholder-as-label.
- Inline validation on blur, not on every keystroke.
- Errors in text next to the field with `aria-describedby`. Never color alone.
- Honeypot field plus a timing check. **No CAPTCHA.** A CAPTCHA on a residential lead form for
  this audience costs more real leads than the spam it prevents.
- Submit button says **"Get my quote"** and becomes "Sending…" then "Sent." The verb never
  changes meaning mid-flow. ("Quote" not "estimate" — avoids the free/paid contradiction
  created by "Free Estimate" buttons.)
- Success is an inline state change, plus a redirect to `/thank-you/` for conversion tracking.
  `/thank-you/` is `noindex`.
- On failure, the form retains every value and says exactly what to do next, including the
  phone number.

### Where leads go

1. Email to `allsafehomeservices@gmail.com` *(note: plural, unlike the domain)*
2. Webhook to the online booking tool to create the customer record
3. Webhook to the Built Right Digital lead log
4. GA4 `generate_lead` event with the service and page path

If any destination fails, the visitor must still see success and the lead must be queued and
retried. Never show a homeowner an error because a webhook timed out.

---

## 5. Live Google reviews

The owner has a strong review corpus. The current site hard-codes four reviews as static text.
Making them live and current is a real credibility upgrade for an audience explicitly screening
for trustworthiness.

### Implementation

- Google **Places API (New)**, `places.reviews` field, server-side only. The API key never
  reaches the browser.
- Next.js route handler with ISR, `revalidate: 21600` (6 hours). This keeps us inside the
  Places API caching terms and keeps the page static.
- The API returns up to **five** reviews. Design for five; do not build a UI implying more.
- Cache the response with a stale-while-revalidate fallback so an API outage never blanks the
  section. Ship a build-time snapshot as the last-resort fallback.

### Display requirements — mandatory

- Attribute to Google. Show the Google mark and the words "Google review."
- Show the reviewer's display name and profile photo as returned by the API. Do not alter them.
- Link each review, and the section as a whole, to the Google Business Profile:
  `https://www.google.com/maps?cid=2391241286444373261`
- Do not edit review text. Truncation with a "read more" that expands the full text is fine.
- Do not cherry-pick to hide criticism. Display what the API returns, in the order returned.
- **Reviews from outside Parker** should be surfaced when they exist (Castle Rock, Highlands
  Ranch, Lone Tree, Centennial). The current static set is entirely Parker. Prioritize
  collecting reviews from other served communities and surface them when they appear.

### Schema warning

Do **not** wrap these in `Review` or `aggregateRating` markup. See `docs/06-schema-spec.md` §3.

---

## 6. Trust signals

Ordered by how much they matter to *this* buyer, which is not the usual order.

1. **Real photos of the team.** A real face beats every badge on the page. Jud's photo belongs
   on the About page and the homepage "Meet the owner" section.
2. **Live Google reviews from multiple communities.** Reviews from Castle Rock, Centennial,
   and Highlands Ranch alongside Parker reviews signal metro-wide credibility.
3. **"We answer the phone."** The availability strip. The company's actual differentiator,
   stated as a company standard.
4. **License numbers, displayed as text** — ME.0601023 and EC.0101068 — near the footer,
   linked to the Colorado DORA license lookup so they are verifiable.
5. **BBB A+, HomeAdvisor Screened & Approved, Best of Houzz, Angi Super Service, Nextdoor
   Neighborhood Favorite.** Five badges, recovered in `assets/badges/`, each linked to its real
   profile. *Three carry 2022–2023 dates. Confirm whether newer ones exist; a stale award
   undercuts the trust it is meant to build. BBB and HomeAdvisor are undated and safe.*
6. **"Good with dogs. Shoe covers on. No smoking on your property."** State it plainly as
   company standards. The owner named these unprompted; competitors will not say them.
7. Licensed since 2018 · Locally owned.

Do not build a badge wall. Six trust elements placed where a doubt arises beats twelve in a row.

---

## 7. Conversion copy patterns

**Above the fold, answer:** will someone come, will they show up, how fast, what does it cost
to find out.

**Emergency pages** lead with the phone and a time. *"Call (303) 648-1934. If it's during
business hours, a real person picks up on the first ring."*

**High-ticket pages** (panel, EV charger, generator) lead with a price range and what drives
it. Refusing to discuss price is the single biggest source of drop-off on these pages. A range
with honest caveats converts better than "call for pricing."

**Every service page includes a "what happens next" block:** you call or book → we confirm a
2-hour window → a licensed electrician arrives, looks, quotes → you decide. Removing
uncertainty is the conversion lever for an anxious buyer.

---

## 8. Tracking

| Event | Trigger | Params |
|---|---|---|
| `click_call` | `tel:` link click | `location`, `page_path`, `is_business_hours` |
| `click_book` | booking handoff | `location`, `page_path`, `service` |
| `generate_lead` | form success | `service`, `city`, `page_path`, `has_photo` |
| `begin_booking` | booking card opened | `page_path` |
| `view_reviews` | reviews section 50% visible | `page_path` |
| `tool_complete` | calculator finished | `tool_name`, `result_bucket` |

Mark `click_call`, `click_book`, and `generate_lead` as key events in the analytics tool
and import them into Google Ads. Details in `docs/13-analytics-and-tracking.md`.

---

## 9. Post-launch testing queue

Do not A/B test at this traffic volume. Instead, ship these sequentially and read call
tracking and analytics over 3–4 weeks each:

1. Hero headline: "answers the phone" vs. "shows up when we said"
2. Booking card in hero vs. booking card below the fold
3. Price ranges shown vs. hidden on the panel page
4. Photo upload field present vs. absent
5. Mobile sticky bar: 2 actions vs. 3
