/**
 * Canonical business facts. Single source of truth.
 * Copied verbatim from planning/CLAUDE.md §3, never paraphrase, never edit a value
 * here without an entry in planning/docs/99-decisions-log.md.
 *
 * NAP (name / address / phone) must render byte-identical everywhere it appears as
 * structured identity: footer, <address>, JSON-LD `telephone`, contact page.
 * The CallRail tracking number is a DISPLAY-only, client-side swap and must never
 * reach any of those places. See planning/docs/06 §2, planning/docs/08 §2.
 */

export const business = {
  name: 'Allsafe Electric',
  alternateName: 'Allsafe Home Service',
  legalTagline: 'Safety Security Satisfaction',
  domain: 'allsafehomeservice.com',

  owner: { name: 'Judson Cushing', firstName: 'Jud', jobTitle: 'Master Electrician' },

  address: {
    streetAddress: '11479 Pine Dr M-51',
    addressLocality: 'Parker',
    addressRegion: 'CO',
    postalCode: '80134',
    addressCountry: 'US',
  },

  /** REAL number. Schema, <address>, footer NAP all use this. Never a tracking number. */
  phone: {
    display: '(303) 648-1934',
    href: 'tel:+13036481934',
    e164: '+13036481934',
  },

  email: {
    /** Shown publicly on the site. */
    public: 'info@allsafehomeservice.com',
    /** Where estimate-form leads are delivered. Plural, unlike the domain. */
    leads: 'allsafehomeservices@gmail.com',
  },

  hours: {
    timeZone: 'America/Denver',
    // Mon–Fri 08:00–18:00. Weekend: closed (request a quote any time). Client-confirmed,
    // planning/docs/09 §1.9 (2026-09-11): no weekend or after-hours phone coverage —
    // this matches GBP and the JSON-LD openingHoursSpecification exactly. A call
    // outside these hours goes to voicemail; request a quote any time instead.
    weekday: { opens: '08:00', closes: '18:00' },
    humanReadable: 'Mon–Fri 8:00am–6:00pm',
  },

  founded: { year: 2018, month: 1, iso: '2018-01' },

  licenses: {
    master: {
      label: 'Master Electrician License',
      id: 'ME.0601023',
      by: 'Colorado State Electrical Board',
    },
    contractor: {
      label: 'Electrical Contractor License',
      id: 'EC.0101068',
      by: 'Colorado State Electrical Board',
    },
    /** DORA public license lookup, makes the numbers verifiable. */
    verifyUrl: 'https://apps.colorado.gov/dora/licensing/Lookup/LicenseLookup.aspx',
  },

  google: {
    cid: '2391241286444373261',
    hexId: '0x876c921d22f6e837:0x212f6547dac3d50d',
    /**
     * Canonical review count (planning/docs/99-decisions-log, 2026-09-15): 149 reviews,
     * 5.0 rating on the Google Business Profile. Update by hand when the client
     * reports a new total. The live reviews API (app/api/reviews) returns up to 5
     * individual reviews, not a count — this is the display/schema source.
     */
    reviewCount: 149,
    /** Fallback only. Live figures come from the Featurable API via
     * lib/reviews.ts; these are the floor if that fetch fails. */
    averageRating: 5,
    /** Read reviews / view the profile. */
    profileUrl: 'https://www.google.com/maps?cid=2391241286444373261',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=Allsafe+Electric+Parker+CO',
    /**
     * Leave-a-review deep link. Needs the Place ID (planning/docs/99 open item #6).
     * Falls back to the profile URL until GOOGLE_PLACE_ID is provided.
     */
    writeReviewUrl: process.env.GOOGLE_PLACE_ID
      ? `https://search.google.com/local/writereview?placeid=${process.env.GOOGLE_PLACE_ID}`
      : 'https://www.google.com/maps?cid=2391241286444373261',
  },

  social: {
    facebook: 'https://www.facebook.com/Allsafehomeservices/',
  },

  /** Online booking URL — stored once, imported everywhere. Do not hard-type in components.
   *  Note the double-encoded space in the slug. Do not hand-retype. */
  bookingUrl:
    'https://book.housecallpro.com/book/ALLSAFE-%20%20ELECTRIC/90cac4ddcd384b32ac8f1b8fd91f6562?v2=true',

  /** planning/docs/06 §2. GeoCoordinates for the LocalBusiness entity. */
  geo: { latitude: 39.5078411, longitude: -104.7595946 },
} as const;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://allsafehomeservice.com'
).replace(/\/$/, '');

/** Absolute URL for a site path. Always trailing-slashed to match next.config. */
export function abs(path = '/'): string {
  if (/^https?:\/\//.test(path)) return path;
  let p = path.startsWith('/') ? path : `/${path}`;
  if (!p.endsWith('/') && !p.includes('.') && !p.includes('#') && !p.includes('?')) p += '/';
  return `${SITE_URL}${p}`;
}

/** Single-line NAP string used for citation-consistency checks. */
export const NAP_ONE_LINE = `${business.name}, ${business.address.streetAddress}, ${business.address.addressLocality}, ${business.address.addressRegion} ${business.address.postalCode}`;
