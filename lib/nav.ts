import { services, serviceGroups } from './services';
import { cities, tier2Areas } from './cities';
import { PUBLISH } from './publish';

export interface NavItem {
  label: string;
  href: string;
  /** Renders the three-column services mega panel. */
  mega?: boolean;
  /** Renders a simple dropdown panel of links. */
  children?: { label: string; href: string; note?: string }[];
  /** Renders the full location list as a multi-column dropdown. */
  areas?: boolean;
}

/**
 * Primary header nav.
 *
 * Rewritten 2026-09-14 to client direction: "I don't need the emergency repair
 * on a separate menu item, also the about should be before other things. You
 * can move the reviews under about, like when you hover on about it shows the
 * reviews and resources."
 *
 * Down to three items from six. That is what buys the phone number room to
 * breathe, which was the other complaint ("the number on the header looks weird
 * with so many things all trimmed up together").
 *
 * Emergency Repairs is not lost: it stays the first, highlighted entry inside
 * the Electrical Services panel, and the phone block beside it is a one-tap
 * emergency route on every page.
 *
 * Earlier direction still standing (2026-09-13): Contact and Coupons stay out of
 * the header because the phone number and Free Estimate button already cover
 * that intent; both live in the footer, and Contact is linked from About.
 */
export const primaryNav: NavItem[] = [
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'About Allsafe', href: '/about/', note: 'Who actually shows up' },
      { label: 'Reviews', href: '/reviews/', note: 'What customers say' },
      { label: 'Resources & Guides', href: '/resources/', note: 'Permits, code, utilities' },
      { label: 'Blog', href: '/blog/', note: 'Advice from our electricians' },
      { label: 'Coupons & Offers', href: '/coupons/', note: 'Current savings' },
      { label: 'Contact', href: '/contact/', note: 'Get a free estimate' },
    ],
  },
  { label: 'Electrical Services', href: '/electrical-services-parker-co/', mega: true },
  { label: 'Service Areas', href: '/service-area/', areas: true },
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
        href: PUBLISH.TIER_1_CITIES ? `/electrician-${c.slug}/` : '/service-area/',
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
