# 06 — Structured Data Specification

Schema is one of the two site-side inputs to Local Services Ads and map-pack eligibility that we
directly control (the other is NAP consistency). The current site's service pages appear to carry
no page-appropriate structured data. Fixing this is a launch requirement, not an enhancement.

Implementation: a typed `<Schema />` React Server Component that emits
`<script type="application/ld+json">` into `<head>`. No plugin, no client-side injection.

---

## 1. Entity model

Build **one** root entity and reference it everywhere with `@id`. Repeating a full
LocalBusiness block on every page with slightly different values is how NAP drift starts.

```
https://allsafehomeservice.com/#business     Electrician  (the root entity)
https://allsafehomeservice.com/#website      WebSite
https://allsafehomeservice.com/#organization Organization (same as #business, aliased)
https://allsafehomeservice.com/{path}#webpage WebPage      (per page)
```

Every other node references these by `@id`. Change the address in one place, it changes
everywhere.

---

## 2. Root entity — sitewide, in the layout

Use `Electrician`, not the generic `LocalBusiness`. It is a recognised subtype and it tells
Google what the entity *is* rather than that it merely exists.

```json
{
  "@context": "https://schema.org",
  "@type": "Electrician",
  "@id": "https://allsafehomeservice.com/#business",
  "name": "Allsafe Electric",
  "alternateName": "Allsafe Home Service",
  "url": "https://allsafehomeservice.com/",
  "telephone": "+13036481934",
  "email": "info@allsafehomeservice.com",
  "foundingDate": "2018-01",
  "founder": { "@type": "Person", "name": "Judson Cushing" },
  "priceRange": "$$",
  "currenciesAccepted": "USD",
  "paymentAccepted": "Cash, Check, Credit Card",
  "image": "https://allsafehomeservice.com/img/allsafe-electric-jud-parker.jpg",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://allsafehomeservice.com/#logo",
    "url": "https://allsafehomeservice.com/img/allsafe-electric-logo.png",
    "width": 512, "height": 512
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "11479 Pine Dr M-51",
    "addressLocality": "Parker",
    "addressRegion": "CO",
    "postalCode": "80134",
    "addressCountry": "US"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 39.5078411, "longitude": -104.7595946 },
  "hasMap": "https://www.google.com/maps?cid=2391241286444373261",
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "08:00", "closes": "18:00"
  }],
  "areaServed": [
    { "@type": "City", "name": "Parker",           "containedInPlace": { "@type": "AdministrativeArea", "name": "Douglas County, Colorado" } },
    { "@type": "City", "name": "Castle Rock",      "containedInPlace": { "@type": "AdministrativeArea", "name": "Douglas County, Colorado" } },
    { "@type": "City", "name": "Highlands Ranch",  "containedInPlace": { "@type": "AdministrativeArea", "name": "Douglas County, Colorado" } },
    { "@type": "City", "name": "Lone Tree",        "containedInPlace": { "@type": "AdministrativeArea", "name": "Douglas County, Colorado" } },
    { "@type": "City", "name": "Centennial",       "containedInPlace": { "@type": "AdministrativeArea", "name": "Arapahoe County, Colorado" } }
  ],
  "sameAs": [
    "https://www.google.com/maps?cid=2391241286444373261",
    "https://www.facebook.com/Allsafehomeservices/"
  ],
  "hasCredential": [
    { "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Master Electrician License",
      "identifier": "ME.0601023",
      "recognizedBy": { "@type": "GovernmentOrganization", "name": "Colorado State Electrical Board" } },
    { "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Electrical Contractor License",
      "identifier": "EC.0101068",
      "recognizedBy": { "@type": "GovernmentOrganization", "name": "Colorado State Electrical Board" } }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Residential electrical services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Electrical panel upgrades", "url": "https://allsafehomeservice.com/electrical-panel-services/" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Emergency electrical repair", "url": "https://allsafehomeservice.com/emergency-electrical-repairs-parker-co/" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "EV charger installation", "url": "https://allsafehomeservice.com/residential-ev-charging/" } }
    ]
  },
  "potentialAction": {
    "@type": "ReserveAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://book.housecallpro.com/book/ALLSAFE-%20%20ELECTRIC/90cac4ddcd384b32ac8f1b8fd91f6562?v2=true",
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform"
      ]
    },
    "result": { "@type": "Reservation", "name": "Book an electrician visit" }
  }
}
```

### Add these to `sameAs` once the URLs are confirmed

BBB profile · Angi profile · HomeAdvisor profile · Yelp · Nextdoor · Houzz.
Do not add a placeholder or a guessed URL. `sameAs` pointing at a 404 is worse than an
omission because it weakens entity confidence.

### `telephone` rule

Always the real number `+13036481934`. **Never the CallRail tracking number.** The tracking
number appears in the visible DOM via client-side swap only. A tracking number in schema
creates a NAP conflict with the Google Business Profile, and NAP conflict is a live suspect in
the LSA failure. See `docs/08-local-seo-and-lsa.md`.

---

## 3. AggregateRating — read this before you add stars

**Do not add `aggregateRating` or `review` markup built from Google reviews scraped or pulled
via the Places API.**

Google's structured data guidelines prohibit marking up reviews sourced from a third-party
platform as your own first-party review data. Doing it is a common cause of a structured-data
manual action, and the stars would not render anyway. This is exactly the trap a site that
displays live Google reviews walks into.

**What is allowed:**

- Display Google reviews on the page for humans, with Google attribution, per the Places API
  display requirements. This is the plan in `docs/07-conversion-spec.md` §5.
- Mark up **first-party** reviews the business collected itself — reviews submitted through
  Allsafe's own form, on a page where a visitor can also submit one. If we build that, it
  qualifies. If we do not, no rating markup.

**Recommendation:** launch without `aggregateRating`. Add a first-party review collection flow
in phase two, then mark that up. The star-rating rich result is not worth a manual action on a
domain that is already struggling to get indexed.

---

## 4. Per-template schema

### 4.1 Homepage

`WebSite` + `Electrician` (@id reference) + `WebPage` + `BreadcrumbList` + `FAQPage`

```json
{
  "@type": "WebSite",
  "@id": "https://allsafehomeservice.com/#website",
  "url": "https://allsafehomeservice.com/",
  "name": "Allsafe Electric",
  "publisher": { "@id": "https://allsafehomeservice.com/#business" },
  "inLanguage": "en-US"
}
```

No `SearchAction` unless the site actually has a working search endpoint.

### 4.2 Service page

`Service` + `WebPage` + `BreadcrumbList` + `FAQPage`

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://allsafehomeservice.com/electrical-panel-services/#service",
  "serviceType": "Electrical panel upgrade and repair",
  "name": "Electrical panel upgrades and repairs in Parker, CO",
  "description": "Panel replacement, breaker box upgrades, fuse box conversion and service upgrades for homes in Parker and Douglas County.",
  "url": "https://allsafehomeservice.com/electrical-panel-services/",
  "provider": { "@id": "https://allsafehomeservice.com/#business" },
  "areaServed": [
    { "@type": "City", "name": "Parker" },
    { "@type": "City", "name": "Castle Rock" },
    { "@type": "City", "name": "Highlands Ranch" },
    { "@type": "City", "name": "Lone Tree" },
    { "@type": "City", "name": "Centennial" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Panel services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "100A to 200A service upgrade" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fuse box to breaker panel conversion" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Federal Pacific or Zinsco panel replacement" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Subpanel installation" } }
    ]
  }
}
```

**Every service page also gets `FAQPage`** with 4–8 questions. These must be real questions
with real answers, matching visible on-page content exactly. Mismatched FAQ markup is a
guideline violation.

### 4.3 City page

`Electrician` (a `ServiceArea` variant referencing the root) + `WebPage` + `BreadcrumbList`
+ `FAQPage`

Do **not** emit a second full `Electrician` entity with the city as `addressLocality`. Creating
one business entity per city is a classic local-SEO mistake that fragments the entity. Reference
the root and scope with `areaServed`:

```json
{
  "@type": "WebPage",
  "@id": "https://allsafehomeservice.com/electricians/castle-rock-co/#webpage",
  "about": { "@id": "https://allsafehomeservice.com/#business" },
  "primaryImageOfPage": { "@type": "ImageObject", "url": "..." },
  "significantLink": [
    "https://allsafehomeservice.com/electricians/castle-rock-co/panel-upgrade/",
    "https://allsafehomeservice.com/electricians/castle-rock-co/ev-charger-installation/"
  ],
  "mainEntity": {
    "@type": "Service",
    "serviceType": "Residential electrical services",
    "provider": { "@id": "https://allsafehomeservice.com/#business" },
    "areaServed": {
      "@type": "City",
      "name": "Castle Rock",
      "containedInPlace": { "@type": "AdministrativeArea", "name": "Douglas County, Colorado" }
    }
  }
}
```

### 4.4 City × service page

`Service` with a single-city `areaServed`, plus `WebPage`, `BreadcrumbList`, `FAQPage` whose
questions are genuinely city-specific (permit process, inspection timing, utility).

### 4.5 Blog post / guide

`Article` (or `HowTo` where the content genuinely is a numbered procedure) + `WebPage` +
`BreadcrumbList` + `Person` author.

```json
{
  "@type": "Article",
  "headline": "How to tell if your Parker home needs a panel upgrade",
  "author": { "@type": "Person", "name": "Judson Cushing",
              "jobTitle": "Master Electrician",
              "url": "https://allsafehomeservice.com/about/" },
  "publisher": { "@id": "https://allsafehomeservice.com/#business" },
  "datePublished": "2026-09-15",
  "dateModified": "2026-09-15",
  "image": ["https://allsafehomeservice.com/img/..."],
  "mainEntityOfPage": { "@id": "https://allsafehomeservice.com/blog/.../#webpage" }
}
```

Attributing content to Jud by name, with his license and job title, is a real E-E-A-T signal for
a trade site. Use it consistently. Do not attribute to "Admin" — the current site leaks
`twitter:data1: admin`.

### 4.6 Tools and calculators

`WebApplication` + `WebPage` + `BreadcrumbList`.

```json
{
  "@type": "WebApplication",
  "name": "Electrical panel load calculator",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "provider": { "@id": "https://allsafehomeservice.com/#business" }
}
```

### 4.7 Contact page

`ContactPage` + `Electrician` reference + `BreadcrumbList`.

### 4.8 About page

`AboutPage` + `Person` for Jud, with `worksFor` pointing at `#business`, `hasCredential`
mirroring the license entries, and `knowsAbout` listing the service topics.

### 4.9 Reviews page

`WebPage` only, until first-party review collection exists. See §3.

---

## 5. Breadcrumbs

On every page below the root. Must match the visible breadcrumb exactly.

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home",
      "item": "https://allsafehomeservice.com/" },
    { "@type": "ListItem", "position": 2, "name": "Areas we serve",
      "item": "https://allsafehomeservice.com/service-area/" },
    { "@type": "ListItem", "position": 3, "name": "Castle Rock",
      "item": "https://allsafehomeservice.com/electricians/castle-rock-co/" }
  ]
}
```

---

## 6. Validation

1. `npm run audit:schema` — validates every route's JSON-LD against schema.org and against the
   `schemaTypes` declared in that page's front matter. Missing declared type = build failure.
2. Google Rich Results Test on one page of each template, before launch.
3. Schema.org validator for full-vocabulary correctness.
4. GSC → Enhancements, weekly for the first month.

## 7. Anti-patterns

| Never | Why |
|---|---|
| `aggregateRating` from Google reviews | Guideline violation, manual action risk |
| A separate `LocalBusiness` per city page | Fragments the entity, dilutes the map pack |
| `FAQPage` markup for questions not visible on the page | Guideline violation |
| CallRail number in `telephone` | NAP conflict, LSA risk |
| `sameAs` pointing at a 404 or a guessed profile | Weakens entity confidence |
| Multiple `@type: Organization` blocks with different names | Entity confusion |
| Schema injected by client-side JavaScript | May not be seen |
| `HowTo` on a page that is not a numbered procedure | Mismatch |
