import { business } from '@/lib/business';

/**
 * Map, planning/docs/08 §3.
 *
 * Was a click-to-load facade (a raw Google Maps iframe costs 500KB+ and can hurt
 * LCP), but the client's review, 2026-09-11, was that requiring a tap before the
 * map even shows reads as broken, not fast. Renders the real iframe directly now.
 * Native `loading="lazy"` still defers the network fetch until the iframe is near
 * the viewport, on every current placement (service-area, contact, city pages,
 * homepage) it is well below the fold, so this keeps most of the original perf
 * benefit without the click.
 */
export function MapFacade({ label = 'Allsafe Electric service area' }: { label?: string }) {
  const embed = `https://www.google.com/maps?cid=${business.google.cid}&output=embed`;

  return (
    <iframe
      title={label}
      src={embed}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="h-full min-h-[320px] w-full rounded-card border border-rule"
    />
  );
}
