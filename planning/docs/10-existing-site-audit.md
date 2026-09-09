# 10 — Existing Site Audit

Findings from direct inspection of the live site (Sept 2026) plus the Search Console coverage
export. Every item has evidence. This is the "before" record — keep it, because in three months
someone will ask what actually changed.

---

## 1. Indexation — the headline finding

| Metric | Value | Read |
|---|---|---|
| Known pages | ~588 | |
| Indexed | **86** | 14.6% |
| Crawled, currently not indexed | 242 | Google looked and declined |
| Discovered, currently not indexed | 251 | Google did not bother to look |
| Excluded by `noindex` | 4 | Verify each was intentional |
| Not found (404) | 3 | |
| Server error (5xx) | 1 | |
| Blocked by robots.txt | 1 | Identify before launch |
| Impressions, daily | 200–700, flat | No growth trend over 3 months |

**"Discovered – currently not indexed" at 251 pages is the loudest signal in the dataset.**
It means Google knows those URLs exist and has chosen not to spend crawl budget on them. That is
a site-level quality and crawl-budget judgment, not a per-page one. It is why publishing more
pages of the same character will not work.

Indexed pages rose from 47 to 88 between June and September while impressions stayed flat.
The pages getting indexed are not earning visibility.

**Severity: critical. Drives the entire content strategy in `docs/09`.**

---

## 2. Heading structure — broken in an unusually damaging way

On `/electrical-panel-services/`:

- An `<h2>` breadcrumb ("Electrical Panel Services") appears **above** the `<h1>`
- **Five separate `<h2>` elements contain full body paragraphs.** Example, verbatim:
  > "Upgrading to a new electrical panel can improve the safety, reliability, and efficiency of
  > your electrical system, ensuring that your home is equipped to meet your current and future
  > electrical needs. If you're experiencing any of the issues mentioned above or have concerns
  > about the safety and performance of your electrical panel, it's important to consult our
  > qualified electricians to determine if a panel upgrade is necessary."

  That is one `<h2>`.
- On the homepage, an `<h3>` contains a run-on list of nine services with no separators
- Card and section titles across the site are `<h6>`, with nothing at `<h3>`, `<h4>` or `<h5>`
- "Serving Parker & Surrounding Areas" and "Monday thru Friday 8-6pm" are both `<h6>`

The page has no usable machine-readable outline. This is a strong candidate for why service
pages are crawled and then not indexed.

**Severity: critical. Fix: `docs/05` §1.**

---

## 3. Broken and wrong internal links

| Issue | Evidence |
|---|---|
| Wrong target | On `/electrical-panel-services/`, the sidebar link labelled "Electrical Panel Services" points to `/electrical-services-parker-co/`, not to the panel page |
| Two versions of the services hub | Homepage hero "VIEW SERVICES" → `/electrical-services/`; nav and footer → `/electrical-services-parker-co/`. Likely one of the 3 reported 404s. |
| Empty `href` | Multiple links render as `href=""` — "Electrical service upgrades & renovations," "Indoor/Outdoor lighting & security," "Troubleshooting for all electrical problems," "Reach out to us to inspect your home," "Residental services" |
| Typo in a link label | "Residental services" (missing an `i`) |

**Severity: high.** Empty-href links are a crawl dead-end and an accessibility failure. Wrong
targets waste the little internal link equity the site has.

---

## 4. Trust badges are misplaced, not missing

The badge row in the footer and sidebar renders **four `<img>` tags all pointing at the same
file**: `/wp-content/uploads/2023/05/image_1589046689-d4cba277-1920w.webp`

That file is the **company logo**. All four alt attributes read "Allsafe Electric - Electrician
Parker Colorado," and the whole block links back to the homepage. So the slot where the awards
should sit renders the logo four times.

The real badges do exist on the site, as a separate composite strip at
`/wp-content/uploads/2024/03/best-electrician-in-parker-colorado.png` (1192 × 173), placed
elsewhere on the homepage without a link. It contains **five** badges:

| Badge | Year shown |
|---|---|
| Best of Houzz — Service | 2023 |
| Angi Super Service Award | 2022 |
| Nextdoor Neighborhood Favorite | 2022 |
| BBB Accredited Business, A+ Rating | undated |
| HomeAdvisor Screened & Approved | undated |

Three findings follow from this:

1. **"Neighborhood Favorite" is a Nextdoor award, not HomeAdvisor.** The call transcript ran the
   two together. They are separate programs and must be labelled correctly.
2. **The dated badges are three and four years old.** It is September 2026 and the site is
   showing 2022 and 2023 awards. All three programs issue annually. Either newer badges exist
   and were never added, or they lapsed. Displaying a 2022 award in 2026 is a worse trust signal
   than showing nothing.
3. **Nothing links anywhere.** A badge with no link to the underlying profile is decoration.

Extracted, cropped assets are in `assets/badges/`. See `assets/README.md`.

**Severity: high (conversion).** The credentials are the client's, they are real, and they are
currently doing no work at all.

---

## 5. NAP and phone number conflict

The footer displays a **CallRail tracking number, `303-529-9157`**, as visible text on every
page, alongside the real number `(303) 648-1934`.

Google crawls the footer. Two phone numbers, one of which does not match the Google Business
Profile, is a NAP inconsistency on every page of the site.

Given the Local Services Ads have produced one lead in six months, and LSA verification leans on
public identity signals, this is a live suspect.

**Severity: high. Fix: `docs/07` §2, `docs/08` §2.**

---

## 6. Metadata defects

| Issue | Evidence |
|---|---|
| Two different GSC verification tokens | Homepage: `VSqRj6N7Tsr2PIAGT8fg-...`; panel page: `vDGFIXHqIECZ_10GGLJ3...`. Suggests two Search Console properties. Reconcile before reading any data. |
| Wrong `og:type` | Service pages declare `og:type: article` |
| Author leakage | `twitter:data1: admin` — content attributed to "admin," wasting the owner's real E-E-A-T |
| Generic descriptions | Panel page: "Looking for professional electrical panel repairs in Parker? Our experts provide reliable breaker box installation services." Nothing here a competitor could not publish verbatim. |
| Plugin cruft | `meta-generator: Elementor 4.2.3` and a base64 `ti-site-data` blob on every page |

**Severity: medium.**

---

## 7. Content quality

- **Static, hard-coded testimonials.** Four reviews (Todd, D.L., Mark, Nathan) are typed into
  the page. They are real reviews and they are good, but they are frozen and unverifiable.
  Replace with the live Google feed per `docs/07` §5.
- **Duplicate CTA blocks** repeated verbatim within a single page.
- **Thin service pages.** The panel page is roughly 350 words of substance, most of it wrapped
  in heading tags.
- **Zero city or location pages** despite the owner targeting Parker, Castle Rock and Highlands
  Ranch. The only geographic content is a single line of neighborhood names on the homepage.
- **Cannibalization.** `/lighting-services/` and `/outdoor-lighting/` compete for the same terms.
- **No generator page**, despite the owner mentioning Generac work on the call.
- **No troubleshooting page**, so the entire symptom-search category has nowhere to land.

**Severity: high.**

---

## 8. Form problems

The estimate form on service pages:

- Renders a stray `Δ` character (a plugin honeypot leaking into the DOM)
- Asks for the **email address twice** ("Enter Email" and "Confirm Email"). On a mobile lead
  form this is a measurable conversion killer.
- Splits the name into First and Last
- Placeholder-style labels rather than persistent visible labels

**Severity: medium (conversion).**

---

## 9. Hosting and infrastructure

- **WordPress + Elementor 4.2.3.** Elementor is the primary source of the render-blocking CSS
  and DOM bloat.
- **The host serves a bot-challenge interstitial.** Direct requests to `/robots.txt` and
  `/sitemap.xml` from a non-browser user agent return a JavaScript captcha redirect rather than
  the file. Googlebot is likely allow-listed, but this blocks third-party crawlers, SEO tooling,
  and quite possibly some AI crawlers. It also makes the site harder to audit.
- **Email is hosted with the web host** per the intake form. This is the main DNS migration
  hazard. See `docs/12`.

**Severity: medium, resolved by moving to Vercel.**

---

## 10. Attribution to the prior agency

The footer credits `coloradowebimpressions.com` as "Webmaster" with a live outbound link on
every page. Remove it at launch and confirm with the account manager that no contractual
obligation to display it survives.

---

## 11. What is working — do not break these

Not everything is broken, and the working parts are load-bearing:

- **The homepage ranks for Parker terms** and drives most of the business. The owner said so
  explicitly. Preserve its URL, its title intent, its neighborhood mentions, and its topical
  focus.
- **The Housecall Pro booking link works** and is already in the customer's habit.
- **The Google Business Profile link is present** on every page, in the header and footer.
- **Real, specific reviews** naming Jud and Justin. This is the site's best conversion asset.
- **License numbers are displayed.** Keep them, make them verifiable.
- **Real award badges exist on the site** as a composite strip, and a **real photo of Jud** exists
  at `/wp-content/uploads/2026/03/Allsafe-Electric-Electrician-near-me.png`. Both are recovered
  in `assets/`. The photo is only 252×252, so request the original.
- **The neighborhood list** (Stonegate, Stroh Ranch, Pradera, The Pinery, Canterberry Crossing)
  is genuine local content. Expand it, do not remove it.
- **The service URL structure** is clean, flat, and indexed. Keep every one of them.

---

## 12. Priority order for the rebuild

| Rank | Issue | Why first |
|---|---|---|
| 1 | Preserve the 86 indexed URLs | Everything else is worthless if the Parker rankings drop |
| 2 | Fix heading structure sitewide | Cheapest large fix; likely blocking indexation |
| 3 | Add correct schema to every page | Feeds map pack and LSA, currently absent |
| 4 | Resolve the NAP / tracking-number conflict | Live suspect in the LSA failure |
| 5 | Retire the ~400 dead pages with 410s | Recovers crawl budget |
| 6 | Three working CTAs on every page | Paid campaign launches simultaneously |
| 7 | Build city and city × service pages | The actual ranking gap the owner is paying to close |
| 8 | Live Google reviews | Highest-impact conversion change for this audience |
| 9 | Tools and local resources | Link acquisition, AEO citation |
