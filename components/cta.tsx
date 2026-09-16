'use client';

import Link from 'next/link';
import { business } from '@/lib/business';
import { track } from '@/lib/analytics';
import { PhoneIcon, CalendarIcon } from './Icons';

type Loc =
  | 'header'
  | 'hero'
  | 'sticky_bar'
  | 'mid_page'
  | 'footer'
  | 'reviews'
  | 'inline';

type Variant = 'primary' | 'blue' | 'outline' | 'ghost' | 'plain';

function btnClass(variant: Variant, className: string) {
  if (variant === 'plain') return className;
  const map: Record<Exclude<Variant, 'plain'>, string> = {
    primary: 'btn-primary',
    blue: 'btn-blue',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  };
  return `btn ${map[variant]} ${className}`;
}

/**
 * Click-to-call, a REAL <a href="tel:">. The server-rendered href is always the
 * real number; CallRail DNI swaps the display client-side. Never a JS handler.
 */
export function CallButton({
  location,
  service,
  variant = 'primary',
  className = '',
  children,
}: {
  location: Loc;
  service?: string;
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={business.phone.href}
      data-cta="call"
      data-location={location}
      className={btnClass(variant, className)}
      onClick={() => track.call(location, { service })}
    >
      {children ?? (
        <>
          <PhoneIcon width={19} height={19} /> {business.phone.display}
        </>
      )}
    </a>
  );
}

/** Click-to-book, Housecall Pro. URL imported once, never retyped (docs/07 §3). */
export function BookButton({
  location,
  service,
  variant = 'outline',
  className = '',
  children,
}: {
  location: Loc;
  service?: string;
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href="/contact#estimate"
      data-cta="quote"
      data-location={location}
      className={btnClass(variant, className)}
    >
      {children ?? (
        <>
          <CalendarIcon width={19} height={19} /> Get a Quote
        </>
      )}
    </Link>
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
      href="#estimate"
      data-cta="estimate"
      data-location={location}
      className={`link-cta ${className}`}
    >
      {children ?? 'Get a quote'}
    </Link>
  );
}

/** Secondary CTA used across the design: a secondary "Get a Quote" button. */
/**
 * Secondary CTA. Call is the primary action site-wide (revision doc §1.1), so
 * this defaults to outline styling and never to the green primary. `variant`
 * exists so dark grounds can use `ghost` instead of a white-filled button.
 */
export function EstimateButton({
  location,
  className = '',
  children,
  variant = 'outline',
}: {
  location: Loc;
  className?: string;
  children?: React.ReactNode;
  variant?: Extract<Variant, 'outline' | 'ghost' | 'blue'>;
}) {
  return (
    <Link
      href="#estimate"
      data-cta="estimate"
      data-location={location}
      className={btnClass(variant, className)}
    >
      {children ?? 'Get a Quote'}
    </Link>
  );
}

function withUtm(url: string, location: string) {
  try {
    const u = new URL(url);
    u.searchParams.set('utm_source', 'allsafe-site');
    u.searchParams.set('utm_medium', 'cta');
    u.searchParams.set('utm_campaign', location);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      for (const k of ['gclid', 'utm_campaign']) {
        const v = params.get(k);
        if (v) u.searchParams.set(`orig_${k}`, v);
      }
      const os = params.get('utm_source');
      if (os) u.searchParams.set('orig_utm_source', os);
    }
    return u.toString();
  } catch {
    return url;
  }
}

/** Standard action row: Call (primary green), Estimate (outline). */
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
      <CallButton location={location} service={service} variant="primary" />
      <EstimateButton location={location} />
    </div>
  );
}
