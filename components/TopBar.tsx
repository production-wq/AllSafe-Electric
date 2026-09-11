import { business } from '@/lib/business';
import { ShieldIcon, MapPinIcon } from './Icons';

/**
 * Slim info bar above the header, matching the designer's artifact: credentials
 * on the left, address on the right, on a near-black ground. Static (no live
 * clock) per the design. Height is reserved so it never shifts layout.
 */
export function TopBar() {
  const a = business.address;
  return (
    <div
      className="surface-dark hidden bg-navy-deep text-white/85 md:block"
      style={{ minHeight: 'var(--strip-h)' }}
    >
      <div className="container-page flex items-center justify-between gap-6 py-2 text-tiny">
        <p className="flex items-center gap-2">
          <ShieldIcon width={14} height={14} className="shrink-0 text-green-600" />
          <span>
            Master License {business.licenses.master.id} &middot; Electrical Contractor{' '}
            {business.licenses.contractor.id} &middot; BBB A+ Accredited
          </span>
        </p>
        <p className="flex items-center gap-2">
          <MapPinIcon width={14} height={14} className="shrink-0 text-green-600" />
          <span>
            {a.streetAddress}, {a.addressLocality}, {a.addressRegion} {a.postalCode}
          </span>
        </p>
      </div>
    </div>
  );
}
