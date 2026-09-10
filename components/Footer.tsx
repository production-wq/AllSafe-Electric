import Link from 'next/link';
import { Logo } from './Logo';
import { business } from '@/lib/business';
import { footerColumns } from '@/lib/nav';
import { MapPinIcon, PhoneIcon, ClockIcon, ShieldIcon } from './Icons';

/**
 * Footer, planning/docs/03 §8. A deliberate crawl surface: full service and area
 * lists. The NAP block uses the REAL phone number and is byte-identical to schema
 * and the contact page (planning/docs/06 §2, docs/08 §2). No prior-agency credit
 * (docs/10 §10). Every link has a real target, no href="" (docs/10 §3).
 */
export function Footer() {
  const cols = footerColumns();
  const a = business.address;
  const year = new Date().getFullYear();

  return (
    <footer className="surface-dark relative overflow-hidden bg-brand-900">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-600/20 blur-3xl"
      />

      {/* Contact strip */}
      <div className="relative border-b border-white/10">
        <div className="container-page grid gap-6 py-10 md:grid-cols-3">
          <a
            href={business.phone.href}
            className="group flex items-start gap-4 rounded-card p-3 transition-colors hover:bg-white/5"
          >
            <span className="icon-tile bg-leaf-600 text-white">
              <PhoneIcon width={21} height={21} />
            </span>
            <span>
              <span className="block text-tiny uppercase tracking-wide text-white/55">Call</span>
              <span className="block text-h3 font-bold text-white">{business.phone.display}</span>
              <span className="block text-small text-white/65">
                A real person, {business.hours.humanReadable}
              </span>
            </span>
          </a>

          <Link
            href="/book/"
            className="group flex items-start gap-4 rounded-card p-3 transition-colors hover:bg-white/5"
          >
            <span className="icon-tile bg-brand-600 text-white">
              <ClockIcon width={21} height={21} />
            </span>
            <span>
              <span className="block text-tiny uppercase tracking-wide text-white/55">Book</span>
              <span className="block text-h3 font-bold text-white">Online any time</span>
              <span className="block text-small text-white/65">
                Pick a service and a window
              </span>
            </span>
          </Link>

          <Link
            href="/contact/#estimate"
            className="group flex items-start gap-4 rounded-card p-3 transition-colors hover:bg-white/5"
          >
            <span className="icon-tile bg-teal-600 text-white">
              <ShieldIcon width={21} height={21} />
            </span>
            <span>
              <span className="block text-tiny uppercase tracking-wide text-white/55">Estimate</span>
              <span className="block text-h3 font-bold text-white">Same business day</span>
              <span className="block text-small text-white/65">Free on quoted work</span>
            </span>
          </Link>
        </div>
      </div>

      {/* Link columns */}
      <div className="container-page relative grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-tiny font-bold uppercase tracking-wide text-white/55">Services</h2>
          <ul className="mt-4 space-y-2 text-small">
            {cols.services.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-white/80 transition-colors hover:text-white">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-tiny font-bold uppercase tracking-wide text-white/55">
            Areas we serve
          </h2>
          <ul className="mt-4 space-y-2 text-small">
            {cols.areas.map((s, i) => (
              <li key={`${s.href}-${i}`}>
                <Link href={s.href} className="text-white/80 transition-colors hover:text-white">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-tiny font-bold uppercase tracking-wide text-white/55">Company</h2>
          <ul className="mt-4 space-y-2 text-small">
            {cols.company.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="text-white/80 transition-colors hover:text-white">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* NAP block, real number, matches schema exactly */}
        <div>
          <h2 className="text-tiny font-bold uppercase tracking-wide text-white/55">Get in touch</h2>
          <address className="mt-4 space-y-3.5 text-small not-italic text-white/80">
            <p className="flex items-start gap-2.5">
              <MapPinIcon width={17} height={17} className="mt-0.5 shrink-0 text-leaf-300" />
              <span>
                {business.name}
                <br />
                {a.streetAddress}
                <br />
                {a.addressLocality}, {a.addressRegion} {a.postalCode}
              </span>
            </p>
            <p className="flex items-center gap-2.5">
              <PhoneIcon width={17} height={17} className="shrink-0 text-leaf-300" />
              <a href={business.phone.href} className="font-semibold text-white hover:underline">
                {business.phone.display}
              </a>
            </p>
            <p className="flex items-start gap-2.5">
              <ClockIcon width={17} height={17} className="mt-0.5 shrink-0 text-leaf-300" />
              <span>{business.hours.humanReadable}, Mountain time</span>
            </p>
          </address>

          <div className="mt-5 space-y-1.5 rounded-btn bg-white/5 p-3.5 text-tiny text-white/75">
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

          <div className="mt-4 flex flex-wrap gap-4 text-small">
            <a
              href={business.google.profileUrl}
              target="_blank"
              rel="noopener"
              className="text-white/80 hover:text-white hover:underline"
            >
              Google profile
            </a>
            <a
              href={business.social.facebook}
              target="_blank"
              rel="noopener"
              className="text-white/80 hover:text-white hover:underline"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-start justify-between gap-5 py-7 text-tiny text-white/60 md:flex-row md:items-center">
          <Logo variant="light" showTagline className="h-11 w-auto" />
          <p className="max-w-xl">
            © {year} {business.name}. Licensed and insured Colorado electrical contractor, serving
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
