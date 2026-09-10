'use client';

import Link from 'next/link';
import { business } from '@/lib/business';
import { track } from '@/lib/analytics';
import { getAvailability } from '@/lib/hours';
import { PhoneIcon, CalendarIcon } from './Icons';
import { useEffect, useState } from 'react';

type Loc =
  | 'header'
  | 'hero'
  | 'sticky_bar'
  | 'mid_page'
  | 'footer'
  | 'availability_strip'
  | 'reviews'
  | 'inline';

/**
 * Click-to-call — a REAL <a href="tel:"> (planning/docs/07 §2). The server-rendered
 * href is always the real number; CallRail's DNI swaps the *display* client-side.
 * Never a JS click handler.
 */
export function CallButton({
  location,
  service,
  variant = 'secondary',
  className = '',
  children,
}: {
  location: Loc;
  service?: string;
  variant?: 'primary' | 'secondary' | 'urgent' | 'plain';
  className?: string;
  children?: React.ReactNode;
}) {
  const [afterHours, setAfterHours] = useState<boolean | null>(null);
  useEffect(() => {
    const a = getAvailability();
    setAfterHours(a.state !== 'open');
  }, []);

  const cls =
    variant === 'plain'
      ? className
      : `btn ${
          variant === 'primary'
            ? 'btn-primary'
            : variant === 'urgent'
              ? 'btn-urgent'
              : 'btn-secondary'
        } ${className}`;

  const label =
    children ??
    (afterHours ? (
      <>
        <PhoneIcon width={20} height={20} /> Call the emergency line
      </>
    ) : (
      <>
        <PhoneIcon width={20} height={20} /> {business.phone.display}
      </>
    ));

  return (
    <a
      href={business.phone.href}
      data-cta="call"
      data-location={location}
      className={cls}
      onClick={() =>
        track.call(location, { service, isBusinessHours: afterHours === null ? undefined : !afterHours })
      }
    >
      {label}
    </a>
  );
}

/** Click-to-book — Housecall Pro. The URL is imported once, never retyped (docs/07 §3). */
export function BookButton({
  location,
  service,
  variant = 'primary',
  className = '',
  children,
}: {
  location: Loc;
  service?: string;
  variant?: 'primary' | 'secondary' | 'plain';
  className?: string;
  children?: React.ReactNode;
}) {
  const url = withUtm(business.bookingUrl, location);
  const cls =
    variant === 'plain'
      ? className
      : `btn ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} ${className}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      data-cta="book"
      data-location={location}
      className={cls}
      onClick={() => track.book(location, { service })}
    >
      {children ?? (
        <>
          <CalendarIcon width={20} height={20} /> Book a visit
        </>
      )}
    </a>
  );
}

export function EstimateLink({
  location,
  className = '',
  children,
}: {
  location: Loc;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href="/contact/#estimate"
      data-cta="estimate"
      data-location={location}
      className={`link-cta ${className}`}
    >
      {children ?? 'Get an estimate'}
    </Link>
  );
}

function withUtm(url: string, location: string) {
  try {
    const u = new URL(url);
    u.searchParams.set('utm_source', 'allsafe-site');
    u.searchParams.set('utm_medium', 'cta');
    u.searchParams.set('utm_campaign', location);
    // Propagate the visitor's original source if we captured it.
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      for (const k of ['gclid', 'utm_source', 'utm_campaign']) {
        const v = params.get(k);
        if (v && k !== 'utm_source') u.searchParams.set(`orig_${k}`, v);
        else if (v && k === 'utm_source') u.searchParams.set('orig_utm_source', v);
      }
    }
    return u.toString();
  } catch {
    return url;
  }
}

/** The standard three-action row. Hierarchy per docs/07 §1; emergency flips Call to primary. */
export function CtaRow({
  location = 'mid_page',
  service,
  emergency = false,
  className = '',
}: {
  location?: Loc;
  service?: string;
  emergency?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {emergency ? (
        <>
          <CallButton location={location} service={service} variant="urgent" />
          <BookButton location={location} service={service} variant="secondary" />
        </>
      ) : (
        <>
          <BookButton location={location} service={service} variant="primary" />
          <CallButton location={location} service={service} variant="secondary" />
        </>
      )}
      <EstimateLink location={location} />
    </div>
  );
}
