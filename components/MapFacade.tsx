'use client';

import { useState } from 'react';
import { business } from '@/lib/business';
import { track } from '@/lib/analytics';
import { MapPinIcon } from './Icons';

/**
 * Lazy map facade, planning/docs/08 §3. A raw Google Maps iframe costs 500KB+ and
 * breaks the LCP target, so we show a lightweight placeholder and only load the
 * iframe on click.
 */
export function MapFacade({ label = 'Allsafe Electric service area' }: { label?: string }) {
  const [loaded, setLoaded] = useState(false);
  const embed = `https://www.google.com/maps?cid=${business.google.cid}&output=embed`;

  if (loaded) {
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

  return (
    <button
      type="button"
      onClick={() => {
        setLoaded(true);
        track.clickDirections();
      }}
      className="group relative flex h-full min-h-[320px] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-card border border-rule bg-[linear-gradient(135deg,#e7eef3,#f3f6f8)] p-6 text-center"
      aria-label={`Load the interactive map of the ${label}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(#d3dee6_1px,transparent_1px),linear-gradient(90deg,#d3dee6_1px,transparent_1px)] [background-size:28px_28px]"
      />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lift">
        <MapPinIcon />
      </span>
      <span className="relative font-semibold text-ink">Parker, CO &amp; the south Denver metro</span>
      <span className="relative text-[0.9rem] text-muted">Tap to load the interactive map</span>
    </button>
  );
}
