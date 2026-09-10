/**
 * Hand-authored JSON-LD — planning/docs/06. Emitted server-side by <Schema />.
 * No plugin, no client injection.
 *
 * ONE root entity (#business), referenced everywhere by @id. Never repeat a full
 * LocalBusiness block per page. NO aggregateRating / Review nodes built from Google
 * data (planning/docs/06 §3). `telephone` is always the real number.
 */
import { business, abs, SITE_URL } from './business';
import type { Service } from './services';
import type { City } from './cities';
import type { Faq } from './services';

const ID = {
  business: `${SITE_URL}/#business`,
  website: `${SITE_URL}/#website`,
  organization: `${SITE_URL}/#organization`,
  logo: `${SITE_URL}/#logo`,
};

export interface JsonLd {
  [k: string]: unknown;
}

export function graph(nodes: JsonLd[]): JsonLd {
  return { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) };
}

/** Root Electrician entity — sitewide, injected once in the root layout. */
export function businessNode(): JsonLd {
  const a = business.address;
  return {
    '@type': 'Electrician',
    '@id': ID.business,
    name: business.name,
    alternateName: business.alternateName,
    slogan: business.legalTagline,
    url: abs('/'),
    telephone: business.phone.e164,
    email: business.email.public,
    foundingDate: business.founded.iso,
    founder: { '@type': 'Person', name: business.owner.name },
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Check, Credit Card',
    image: abs('/img/brand/allsafe-electric-jud-parker.jpg'),
    logo: {
      '@type': 'ImageObject',
      '@id': ID.logo,
      url: abs('/img/brand/allsafe-electric-logo.png'),
      width: 512,
      height: 512,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.streetAddress,
      addressLocality: a.addressLocality,
      addressRegion: a.addressRegion,
      postalCode: a.postalCode,
      addressCountry: a.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    hasMap: business.google.profileUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: business.hours.weekday.opens,
        closes: business.hours.weekday.closes,
      },
    ],
    areaServed: [
      { name: 'Parker', admin: 'Douglas County, Colorado' },
      { name: 'Castle Rock', admin: 'Douglas County, Colorado' },
      { name: 'Highlands Ranch', admin: 'Douglas County, Colorado' },
      { name: 'Lone Tree', admin: 'Douglas County, Colorado' },
      { name: 'Centennial', admin: 'Arapahoe County, Colorado' },
    ].map((c) => ({
      '@type': 'City',
      name: c.name,
      containedInPlace: { '@type': 'AdministrativeArea', name: c.admin },
    })),
    sameAs: [business.google.profileUrl, business.social.facebook],
    hasCredential: [business.licenses.master, business.licenses.contractor].map((l) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: l.label,
      identifier: l.id,
      recognizedBy: { '@type': 'GovernmentOrganization', name: l.by },
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Residential electrical services',
      itemListElement: [
        { name: 'Electrical panel upgrades', url: abs('/electrical-panel-services/') },
        {
          name: 'Emergency electrical repair',
          url: abs('/emergency-electrical-repairs-parker-co/'),
        },
        { name: 'EV charger installation', url: abs('/residential-ev-charging/') },
        { name: 'Standby generator installation', url: abs('/generator-installation/') },
      ].map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: s.url },
      })),
    },
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: business.bookingUrl,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      result: { '@type': 'Reservation', name: 'Book an electrician visit' },
    },
  };
}

export function websiteNode(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: abs('/'),
    name: business.name,
    publisher: { '@id': ID.business },
    inLanguage: 'en-US',
  };
}

export function webPageNode(opts: {
  path: string;
  name: string;
  description: string;
  primaryImage?: string;
  isPartOf?: boolean;
  about?: boolean;
  significantLinks?: string[];
}): JsonLd {
  return {
    '@type': 'WebPage',
    '@id': `${abs(opts.path)}#webpage`,
    url: abs(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: 'en-US',
    isPartOf: opts.isPartOf === false ? undefined : { '@id': ID.website },
    ...(opts.about ? { about: { '@id': ID.business } } : {}),
    ...(opts.primaryImage
      ? { primaryImageOfPage: { '@type': 'ImageObject', url: abs(opts.primaryImage) } }
      : {}),
    ...(opts.significantLinks?.length ? { significantLink: opts.significantLinks.map(abs) } : {}),
  };
}

export function breadcrumbNode(items: { name: string; path: string }[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${abs(items[items.length - 1].path)}#breadcrumb`,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqPageNode(faqs: Faq[], path: string): JsonLd {
  return {
    '@type': 'FAQPage',
    '@id': `${abs(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceNode(s: Service): JsonLd {
  return {
    '@type': 'Service',
    '@id': `${abs('/' + s.slug + '/')}#service`,
    serviceType: s.h1.replace(/ in .*/i, ''),
    name: s.h1,
    description: s.metaDescription,
    url: abs('/' + s.slug + '/'),
    provider: { '@id': ID.business },
    areaServed: ['Parker', 'Castle Rock', 'Highlands Ranch', 'Lone Tree', 'Centennial'].map(
      (name) => ({ '@type': 'City', name })
    ),
  };
}

export function cityMainEntityNode(city: City): JsonLd {
  return {
    '@type': 'Service',
    serviceType: 'Residential electrical services',
    provider: { '@id': ID.business },
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: `${city.county} County, Colorado`,
      },
    },
  };
}

export function articleNode(opts: {
  path: string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
}): JsonLd {
  return {
    '@type': 'Article',
    '@id': `${abs(opts.path)}#article`,
    headline: opts.headline,
    description: opts.description,
    image: [abs(opts.image)],
    author: {
      '@type': 'Person',
      name: business.owner.name,
      jobTitle: business.owner.jobTitle,
      url: abs('/about/'),
    },
    publisher: { '@id': ID.business },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    mainEntityOfPage: { '@id': `${abs(opts.path)}#webpage` },
  };
}

export function personNode(): JsonLd {
  return {
    '@type': 'Person',
    '@id': `${abs('/about/')}#jud`,
    name: business.owner.name,
    jobTitle: business.owner.jobTitle,
    worksFor: { '@id': ID.business },
    hasCredential: [business.licenses.master, business.licenses.contractor].map((l) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: l.label,
      identifier: l.id,
    })),
    knowsAbout: [
      'Electrical panel upgrades',
      'EV charger installation',
      'Residential wiring',
      'Standby generators',
      'Electrical code compliance in Colorado',
    ],
  };
}
