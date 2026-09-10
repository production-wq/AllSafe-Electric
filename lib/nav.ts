import { services, serviceGroups } from './services';
import { cities, tier2Areas } from './cities';
import { PUBLISH } from './publish';

/** Primary header nav, matching the designer's homepage artifact. */
export const primaryNav: { label: string; href: string; mega?: boolean }[] = [
  { label: 'Emergency Repairs', href: '/emergency-electrical-repairs-parker-co/' },
  { label: 'Electrical Services', href: '/electrical-services-parker-co/', mega: true },
  { label: 'About', href: '/about/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'Coupons', href: '/coupons/' },
  { label: 'Contact', href: '/contact/' },
];

/** Mega-menu: 16 services grouped in 3 columns. */
export const servicesMenu = serviceGroups.map((g) => ({
  ...g,
  items: services
    .filter((s) => s.group === g.id)
    .map((s) => ({ label: s.navLabel, href: `/${s.slug}/`, emergency: s.emergency ?? false })),
}));

/** Footer column data, the footer is a crawl surface, so it carries the full lists. */
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
      { label: 'About Us', href: '/about/' },
      { label: 'Reviews', href: '/reviews/' },
      { label: 'Coupons & Offers', href: '/coupons/' },
      { label: 'Contact & Estimate', href: '/contact/' },
      { label: 'Resources & Guides', href: '/resources/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'Privacy Policy', href: '/privacy-policy/' },
    ],
  };
}
