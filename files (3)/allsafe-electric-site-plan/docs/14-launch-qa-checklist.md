# 14 — Launch QA Checklist

Run in full before cutover. Nothing here is optional. `npm run audit:seo` automates roughly
half; the rest is human.

---

## Automated gates

```bash
npm run audit:seo          # headings, meta, canonicals, schema, links, alt, orphans
npm run audit:schema       # JSON-LD validity + declared types present
npm run test:preservation  # every preserved URL returns 200
npm run test:links         # zero internal 404s, zero redirect chains
npm run lighthouse:ci      # all templates, mobile
npm run test:a11y          # axe-core, all templates
```

All six green. A failure blocks launch; it does not get a waiver.

---

## Per-page (every template)

- [ ] Exactly one `<h1>`, first heading in the DOM
- [ ] Heading levels descend without skipping
- [ ] No heading over 70 characters, no paragraph wrapped in a heading tag
- [ ] `<title>` 50–60 chars, unique sitewide
- [ ] Meta description 140–158 chars, unique sitewide
- [ ] Self-referencing absolute canonical
- [ ] `robots` meta correct
- [ ] Page-specific OG image, title, description
- [ ] Valid JSON-LD matching declared `schemaTypes`
- [ ] Breadcrumbs visible and marked up, matching each other
- [ ] All three CTAs present and working
- [ ] ≥3 contextual internal links out, ≥2 in
- [ ] Every image: descriptive alt, explicit dimensions, lazy below the fold
- [ ] No Lorem Ipsum, no `TODO`, no placeholder copy
- [ ] No `href=""` anywhere

## Content accuracy

- [ ] Phone `(303) 648-1934` everywhere it appears as NAP
- [ ] Address exactly `11479 Pine Dr M-51, Parker, CO 80134`
- [ ] Business name exactly `Allsafe Electric`
- [ ] Hours Mon–Fri 8:00am–6:00pm
- [ ] Licenses ME.0601023 and EC.0101068 correct and linked to DORA lookup
- [ ] Founded 2018
- [ ] No claim the owner did not make, no invented award, no invented stat
- [ ] Price ranges approved by the owner and dated
- [ ] Permit and code claims cited to the authority's own page
- [ ] Utility claims verified per city (CORE vs. Xcel)

## Brand

- [ ] **Zero orange anywhere**, including hover states, focus rings, SVG fills, and OG images
- [ ] Blue and green match the logo, values recorded in the decisions log
- [ ] Logo correct and not stretched
- [ ] No industrial imagery above the fold on any page
- [ ] Real photos of Jud on the homepage and About page
- [ ] Generated images tagged in the manifest and queued for replacement
- [ ] Award badges are five distinct real assets linked to real profiles
- [ ] No badge older than the current award year is displayed
- [ ] Nextdoor badge labelled as Nextdoor, not HomeAdvisor
- [ ] No reference to the previous agency anywhere in the markup

## Conversion

- [ ] `tel:` links are real anchors and dial correctly on iOS and Android
- [ ] Housecall Pro booking link resolves — test it, do not eyeball it
- [ ] Booking embed loads and completes a real test booking
- [ ] Estimate form submits, validates, and shows clear errors
- [ ] Lead arrives in the destination inbox, in Housecall Pro, and in GA4
- [ ] Photo upload works on mobile
- [ ] Mobile sticky bar appears, is tappable, and does not cover content
- [ ] Availability strip shows the correct state at 9am, 7pm, and Sunday
- [ ] Live Google reviews load, with attribution and a GBP link
- [ ] Reviews section degrades gracefully if the API fails
- [ ] `/thank-you/` is `noindex` and fires the conversion

## Technical

- [ ] `robots.txt` correct, not blocking `/_next/`
- [ ] Sitemap contains only 200-status indexable URLs
- [ ] Sitemap split by section, referenced from an index
- [ ] `www` → apex, `http` → `https`, single 301 each
- [ ] Trailing slashes consistent
- [ ] `/llms.txt` published
- [ ] Custom 404 page with search and links to services
- [ ] 410s return an actual 410
- [ ] No console errors
- [ ] Works with JavaScript disabled: content, headings, JSON-LD, phone number all present
- [ ] `curl` the raw HTML and confirm the H1 and body copy are in the response

## Performance (mobile, throttled)

- [ ] LCP < 2.0s
- [ ] INP < 150ms
- [ ] CLS < 0.05
- [ ] Lighthouse Performance ≥ 90, Accessibility ≥ 95, SEO 100
- [ ] Initial JS < 120KB gzipped
- [ ] No image over 250KB
- [ ] Fonts self-hosted, preloaded, `display: swap`

## Accessibility

- [ ] Full keyboard traversal, logical order
- [ ] Visible focus on every interactive element
- [ ] Skip-to-content link
- [ ] Landmarks present, one `h1`
- [ ] Text contrast ≥ 4.5:1, interactive ≥ 4.5:1, focus ring ≥ 3:1
- [ ] Form labels persistent and visible; errors in text, not color alone
- [ ] `prefers-reduced-motion` respected
- [ ] 200% zoom without horizontal scroll
- [ ] Reviews carousel keyboard operable and pausable
- [ ] Screen reader pass on homepage and one service page

## Cross-browser and device

- [ ] Safari iOS, Chrome Android, Chrome, Safari, Firefox, Edge
- [ ] 375px, 768px, 1440px
- [ ] Landscape phone
- [ ] Safe-area insets on notched devices
- [ ] Dark mode reads correctly if the OS forces it

## Tracking

- [ ] GA4 firing, correct property
- [ ] Cross-domain measurement includes `book.housecallpro.com`
- [ ] `click_call`, `click_book`, `generate_lead` marked as key events
- [ ] Conversions imported into Google Ads
- [ ] Enhanced conversions enabled
- [ ] CallRail DNI swapping display numbers, real number in the DOM source
- [ ] No tracking number in the footer NAP, `<address>`, or schema
- [ ] Consent Mode v2 implemented
- [ ] Internal IPs filtered
- [ ] GSC domain property verified, sitemap submitted

## Legal and privacy

- [ ] Privacy policy present, current, and covers CallRail recording and GA4
- [ ] Colorado call-recording notice configured in CallRail
- [ ] No customer face, house number, licence plate, or address in any image
- [ ] All EXIF stripped from every published image
- [ ] Cookie/consent notice if required by the client's counsel
- [ ] API keys server-side only, none in the client bundle
- [ ] No `.env` committed

## Baselines captured

- [ ] Everything in `docs/13` §7 exported to `data/baseline/` and dated
- [ ] Map pack geo-grid captured **before** launch
- [ ] Screenshots of every old page template

## Rollback readiness

- [ ] WordPress backup verified restorable
- [ ] DNS zone export on file
- [ ] Old host paid through launch + 90 days
- [ ] Rollback procedure current and someone knows how to run it

## Owner sign-off

- [ ] Owner reviewed staging and approved
- [ ] Owner confirmed the colors are right
- [ ] Owner confirmed no page was thrown away
- [ ] Owner knows go-live date and has a direct contact
- [ ] Google Ads budget approval received in writing

---

## Do not launch if

- Any preserved URL returns non-200
- Any page ships without valid schema
- The form or the booking link does not work end to end
- There is orange anywhere
- Tracking is not verified with a real test lead
- The owner has not seen it
- It is Friday
