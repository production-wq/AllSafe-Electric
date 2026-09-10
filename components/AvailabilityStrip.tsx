'use client';

import { useEffect, useState } from 'react';
import { getAvailability, AVAILABILITY_FALLBACK, type Availability } from '@/lib/hours';
import { business } from '@/lib/business';
import { track } from '@/lib/analytics';

/**
 * Live availability strip. Planning/docs/02 §1 (the one bold element), §6.2.
 * SSR renders a truthful JS-off fallback; the client specialises it to the real
 * America/Denver clock and refreshes each minute. Green dot open, blue dot closed.
 * Never red. Height is reserved (var(--strip-h)) so it never shifts layout.
 */
export function AvailabilityStrip() {
  const [a, setA] = useState<Availability>(AVAILABILITY_FALLBACK);

  useEffect(() => {
    const update = () => setA(getAvailability());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const showCall = a.state !== 'open';

  return (
    <div
      className="surface-dark bg-brand-800"
      style={{ minHeight: 'var(--strip-h)' }}
      role="status"
      aria-live="polite"
    >
      <div className="container-page flex items-center justify-center gap-2 py-2 text-center text-[0.9375rem] leading-tight">
        <span
          aria-hidden
          className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ background: a.dot === 'green' ? 'var(--green-bright)' : '#7Fb4dd' }}
        />
        <span className="font-medium">{a.message}</span>
        {showCall && (
          <a
            href={business.phone.href}
            data-cta="call"
            data-location="availability_strip"
            onClick={() => track.call('availability_strip', { isBusinessHours: false })}
            className="ml-1 font-semibold text-white underline decoration-2 underline-offset-2"
          >
            {business.phone.display}
          </a>
        )}
      </div>
    </div>
  );
}
