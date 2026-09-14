import Link from 'next/link';
import { Logo } from './Logo';
import { business } from '@/lib/business';
import { footerColumns } from '@/lib/nav';
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  FacebookIcon,
  InstagramIcon,
} from './Icons';

/**
 * Footer, matching the designer's artifact: navy ground, brand blurb + social on
 * the left, "Get in Touch" / "Services" / "Service Areas" columns, and a bottom
 * bar with the license line + copyright. The NAP block uses the REAL phone number
 * and is byte-identical to schema and the contact page (planning/docs/06 §2).
 * Every link has a real target, no href="" (docs/10 §3).
 */
export function Footer() {
  const cols = footerColumns();
  const a = business.address;
  const year = new Date().getFullYear();

  return (
    <footer className="surface-dark bg-navy-deep">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <Logo onDark className="h-9 w-auto" />
          <p className="mt-5 max-w-xs text-small text-white/70">
            Licensed residential electricians serving 21 communities across the south Denver
            metro, including Parker, Castle Rock, Highlands Ranch, Lone Tree, Centennial and beyond.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={business.social.facebook}
              target="_blank"
              rel="noopener"
              aria-label="Allsafe Electric on Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-btn border border-white/20 text-white/80 transition-colors hover:border-green-600 hover:text-green-600"
            >
              <FacebookIcon />
            </a>
            <a
              href={business.google.profileUrl}
              target="_blank"
              rel="noopener"
              aria-label="Allsafe Electric on Google"
              className="flex h-10 w-10 items-center justify-center rounded-btn border border-white/20 text-white/80 transition-colors hover:border-green-600 hover:text-green-600"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        {/* Get in touch */}
        <div>
          <h2 className="font-display text-tiny font-bold uppercase tracking-[0.12em] text-green-600">
            Get in Touch
          </h2>
          <address className="mt-4 space-y-3.5 text-small not-italic text-white/80">
            <p className="flex items-start gap-2.5">
              <MapPinIcon width={16} height={16} className="mt-0.5 shrink-0 text-white/45" />
              <span>
                {a.streetAddress}
                <br />
                {a.addressLocality}, {a.addressRegion} {a.postalCode}
              </span>
            </p>
            <p className="flex items-center gap-2.5">
              <PhoneIcon width={16} height={16} className="shrink-0 text-white/45" />
              <a href={business.phone.href} className="font-semibold text-white hover:text-green-600">
                {business.phone.display}
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <MailIcon width={16} height={16} className="shrink-0 text-white/45" />
              <a href={`mailto:${business.email.public}`} className="hover:text-green-600">
                {business.email.public}
              </a>
            </p>
          </address>
        </div>

        {/* Services */}
        <div>
          <h2 className="font-display text-tiny font-bold uppercase tracking-[0.12em] text-green-600">
            Services
          </h2>
          <ul className="mt-4 space-y-2 text-small">
            {cols.services.slice(0, 8).map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-white/75 transition-colors hover:text-white">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Service areas */}
        <div>
          <h2 className="font-display text-tiny font-bold uppercase tracking-[0.12em] text-green-600">
            Service Areas
          </h2>
          <ul className="mt-4 space-y-2 text-small">
            {cols.areas.slice(0, 8).map((s, i) => (
              <li key={`${s.href}-${i}`}>
                <Link href={s.href} className="text-white/75 transition-colors hover:text-white">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/*
          Company. Chris' review, 2026-09-08: Blog + Resources were miscategorized
          under Service Areas. They aren't services or areas either, so this turn
          gives them (and About, previously not in the footer at all) their own
          column instead of forcing them into one of those two.
        */}
        <div>
          <h2 className="font-display text-tiny font-bold uppercase tracking-[0.12em] text-green-600">
            Company
          </h2>
          <ul className="mt-4 space-y-2 text-small">
            {[
              { href: '/about/', label: 'About' },
              { href: '/reviews/', label: 'Reviews' },
              { href: '/blog/', label: 'Blog' },
              { href: '/resources/', label: 'Resources' },
              { href: '/coupons/', label: 'Coupons' },
              { href: '/privacy-policy/', label: 'Privacy Policy' },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/75 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-6 text-tiny text-white/55 md:flex-row md:items-center">
          <p>
            Master License {business.licenses.master.id} &middot; Electrical Contractor License{' '}
            {business.licenses.contractor.id} &middot; BBB A+ Accredited
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href="/privacy-policy/" className="hover:text-white">
              Privacy Policy
            </Link>
            <span>
              &copy; {year} {business.name}. All rights reserved.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
