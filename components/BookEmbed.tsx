'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { business } from '@/lib/business';
import { getService } from '@/lib/services';
import { track } from '@/lib/analytics';
import { CalendarIcon, PhoneIcon } from './Icons';

/**
 * Housecall Pro booking, planning/docs/07 §3.
 * PREFERRED: embed the HCP booking script here so the visitor stays on-domain and
 * GA4/CallRail attribution stays intact. The embed snippet comes from the client's
 * HCP account → Online Booking → Embed (open item #9). Until it is provided, this
 * shows the FALLBACK: a direct link that opens the hosted booking flow in a new tab,
 * with the GA4 event fired before navigation and the visitor's source propagated.
 */
export function BookEmbed() {
  const params = useSearchParams();
  const service = params.get('service') ?? undefined;
  const when = params.get('when') ?? undefined;
  const zip = params.get('zip') ?? undefined;
  const svc = service ? getService(service) : undefined;
  const [href, setHref] = useState<string>(business.bookingUrl);

  useEffect(() => {
    try {
      const u = new URL(params.get('next') || business.bookingUrl);
      u.searchParams.set('utm_source', 'allsafe-site');
      u.searchParams.set('utm_medium', 'book_page');
      if (service) u.searchParams.set('utm_content', service);
      const orig = new URLSearchParams(window.location.search);
      for (const k of ['gclid', 'utm_campaign']) {
        const v = orig.get(k);
        if (v) u.searchParams.set(`orig_${k}`, v);
      }
      setHref(u.toString());
    } catch {
      setHref(business.bookingUrl);
    }
  }, [params, service]);

  return (
    <div>
      {(svc || when || zip) && (
        <div className="mb-6 rounded-card border border-rule bg-paper p-4 text-[0.95rem]">
          <p className="font-semibold">Carrying over from the last page:</p>
          <ul className="mt-1 text-grey">
            {svc && <li>Service: {svc.navLabel}</li>}
            {when && <li>Timing: {when.replace('-', ' ')}</li>}
            {zip && <li>ZIP: {zip}</li>}
          </ul>
        </div>
      )}

      {/* HCP embed target. Script injected once the snippet is supplied. */}
      <div id="hcp-booking-embed" aria-live="polite" />

      <div className="card p-6 md:p-8">
        <p className="flex items-center gap-2 text-h3 font-bold">
          <CalendarIcon className="text-green-600" /> Request a quote
        </p>
        <p className="mt-2 text-grey">
          Our scheduler is live any time. Pick a service and a window and you are on the calendar.
          It opens in a new tab; your details come back to us automatically.
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener"
          onClick={() => track.book('inline', { service })}
          className="btn btn-primary mt-5"
        >
          Open the booking calendar
        </a>
        <p className="mt-4 text-[0.95rem] text-grey">
          Prefer to talk it through?{' '}
          <a
            href={business.phone.href}
            onClick={() => track.call('inline', { service })}
            className="inline-flex items-center gap-1 font-semibold text-blue-700"
          >
            <PhoneIcon width={16} height={16} /> {business.phone.display}
          </a>
        </p>
      </div>
    </div>
  );
}
