import { business } from '@/lib/business';
import { ShieldIcon, MapPinIcon, ClockIcon } from './Icons';

/**
 * Slim info bar above the header: credentials left, hours and address right.
 *
 * Ground changed from near-black (`bg-navy-deep`) to brand green on 2026-09-14
 * at the client's request ("the very top line of the header doesn't need to be
 * in black, it can be in green"). Note the icons were `text-green-600`, which
 * would have been invisible against a green ground, so they are now white at
 * reduced opacity. Body text is pure white rather than white/85 because green
 * is a lighter ground than navy was and needed the extra contrast to clear AA.
 *
 * Height is reserved so it never shifts layout.
 */
export function TopBar() {
  const a = business.address;
  return (
    <div
      className="surface-dark hidden bg-green-700 text-white md:block"
      style={{ minHeight: 'var(--strip-h)' }}
    >
      <div className="container-page flex items-center justify-between gap-6 py-2 text-tiny">
        <p className="flex items-center gap-2">
          <ShieldIcon width={14} height={14} className="shrink-0 text-white/70" />
          <span>
            Master License {business.licenses.master.id} &middot; Electrical Contractor{' '}
            {business.licenses.contractor.id} &middot; BBB A+ Accredited
          </span>
        </p>
        <p className="flex items-center gap-5">
          <span className="flex items-center gap-2">
            <ClockIcon width={14} height={14} className="shrink-0 text-white/70" />
            <span>{business.hours.humanReadable}</span>
          </span>
          <span className="hidden items-center gap-2 lg:flex">
            <MapPinIcon width={14} height={14} className="shrink-0 text-white/70" />
            <span>
              {a.streetAddress}, {a.addressLocality}, {a.addressRegion} {a.postalCode}
            </span>
          </span>
        </p>
      </div>
    </div>
  );
}
