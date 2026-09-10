import Link from 'next/link';
import { Logo } from './Logo';
import { business } from '@/lib/business';
import { footerColumns } from '@/lib/nav';
import { MapPinIcon, PhoneIcon, ClockIcon } from './Icons';

/**
 * Footer — planning/docs/03 §8. A deliberate crawl surface: full service + area
 * lists. The NAP block uses the REAL phone number and is byte-identical to schema
 * and the contact page (planning/docs/06 §2, docs/08 §2). No prior-agency credit
 * (docs/10 §10). Every link has a real target — no href="" (docs/10 §3).
 */
export function Footer() {
  const cols = footerColumns();
  const a = business.address;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue-deep text-white/90">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-step--1 font-semibold uppercase tracking-wide text-white/70">
            Services
          </h2>
          <ul className="mt-3 space-y-1.5 text-[0.95rem]">
            {cols.services.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-white/85 hover:text-white hover:underline">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-step--1 font-semibold uppercase tracking-wide text-white/70">
            Areas we serve
          </h2>
          <ul className="mt-3 space-y-1.5 text-[0.95rem]">
            {cols.areas.map((s, i) => (
              <li key={`${s.href}-${i}`}>
                <Link href={s.href} className="text-white/85 hover:text-white hover:underline">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-step--1 font-semibold uppercase tracking-wide text-white/70">
            Company
          </h2>
          <ul className="mt-3 space-y-1.5 text-[0.95rem]">
            {cols.company.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-white/85 hover:text-white hover:underline">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* NAP block — real number, matches schema exactly */}
        <div>
          <h2 className="text-step--1 font-semibold uppercase tracking-wide text-white/70">
            Get in touch
          </h2>
          <address className="mt-3 space-y-3 text-[0.95rem] not-italic text-white/85">
            <p className="flex items-start gap-2">
              <MapPinIcon width={18} height={18} className="mt-0.5 shrink-0" />
              <span>
                {business.name}
                <br />
                {a.streetAddress}
                <br />
                {a.addressLocality}, {a.addressRegion} {a.postalCode}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <PhoneIcon width={18} height={18} className="shrink-0" />
              <a href={business.phone.href} className="font-semibold text-white hover:underline">
                {business.phone.display}
              </a>
            </p>
            <p className="flex items-start gap-2">
              <ClockIcon width={18} height={18} className="mt-0.5 shrink-0" />
              <span>{business.hours.humanReadable} · Mountain time</span>
            </p>
          </address>

          <div className="mt-4 space-y-1.5 text-[0.9rem] text-white/80">
            <p>
              <a
                href={business.licenses.verifyUrl}
                target="_blank"
                rel="noopener"
                className="hover:text-white hover:underline"
              >
                Master electrician {business.licenses.master.id}
              </a>
            </p>
            <p>
              <a
                href={business.licenses.verifyUrl}
                target="_blank"
                rel="noopener"
                className="hover:text-white hover:underline"
              >
                Electrical contractor {business.licenses.contractor.id}
              </a>
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-[0.9rem]">
            <a
              href={business.google.profileUrl}
              target="_blank"
              rel="noopener"
              className="text-white/85 hover:text-white hover:underline"
            >
              Google Business Profile
            </a>
            <a
              href={business.social.facebook}
              target="_blank"
              rel="noopener"
              className="text-white/85 hover:text-white hover:underline"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-page flex flex-col items-start justify-between gap-4 py-6 text-[0.85rem] text-white/70 md:flex-row md:items-center">
          <Logo variant="light" showTagline className="h-11 w-auto" />
          <p>
            © {year} {business.name}. Licensed &amp; insured Colorado electrical contractor. Serving
            Parker and the south Denver metro since {business.founded.year}.
          </p>
          <Link href="/privacy-policy/" className="hover:text-white hover:underline">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
