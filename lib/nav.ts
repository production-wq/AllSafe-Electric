import { services, serviceGroups } from './services';
import { cities, tier2Areas } from './cities';
import { PUBLISH } from './publish';

/** Primary nav — planning/docs/03 §8. */
export const primaryNav = [
  { label: 'Services', href: '/electrical-services-parker-co/' },
  { label: 'Areas', href: '/service-area/' },
  { label: 'About', href: '/about/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'Resources', href: '/resources/' },
];

/** Mega-menu: 16 services grouped in 3 columns. */
export const servicesMenu = serviceGroups.map((g) => ({
  ...g,
  items: services
    .filter((s) => s.group === g.id)
    .map((s) => ({ label: s.navLabel, href: `/${s.slug}/`, emergency: s.emergency ?? false })),
}));

/** Footer column data — the footer is a crawl surface, so it carries the full lists. */
export function footerColumns() {
  return {
    services: services.map((s) => ({ label: s.navLabel, href: `/${s.slug}/` })),
    areas: [
      ...cities.map((c) => ({
        label: c.name,
        href: PUBLISH.TIER_1_CITIES ? `/electricians/${c.slug}/` : '/service-area/',
      })),
      ...tier2Areas.map((a) => ({ label: a, href: '/service-area/' })),
    ],
    company: [
      { label: 'About Jud & Justin', href: '/about/' },
      { label: 'Reviews', href: '/reviews/' },
      { label: 'Coupons & offers', href: '/coupons/' },
      { label: 'Contact & estimate', href: '/contact/' },
      { label: 'Resources & guides', href: '/resources/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'Privacy policy', href: '/privacy-policy/' },
    ],
  };
}
