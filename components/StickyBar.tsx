'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { business } from '@/lib/business';
import { track } from '@/lib/analytics';
import { PhoneIcon, CalendarIcon } from './Icons';

/**
 * Mobile sticky action bar — planning/docs/02 §6.5. Three equal segments:
 * Call · Book · Estimate. Appears after 400px of scroll. Blue ground, Book in green.
 * Height reserved via the spacer so it never covers content.
 * The highest-value component on the site — most emergency traffic is on a phone.
 */
export function StickyBar({ emergency = false }: { emergency?: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const bookUrl = (() => {
    try {
      const u = new URL(business.bookingUrl);
      u.searchParams.set('utm_source', 'allsafe-site');
      u.searchParams.set('utm_medium', 'sticky_bar');
      return u.toString();
    } catch {
      return business.bookingUrl;
    }
  })();

  return (
    <>
      <div
        aria-hidden
        className="lg:hidden"
        style={{ height: show ? 'calc(64px + env(safe-area-inset-bottom))' : 0 }}
      />
      <div
        className={`fixed inset-x-0 bottom-0 z-40 lg:hidden ${show ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-180`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="grid h-16 grid-cols-3 bg-brand-blue-deep text-white shadow-[0_-4px_16px_rgba(0,0,0,0.18)]">
          <a
            href={business.phone.href}
            data-cta="call"
            data-location="sticky_bar"
            onClick={() => track.call('sticky_bar')}
            className={`flex flex-col items-center justify-center gap-0.5 text-[0.8rem] font-semibold ${
              emergency ? 'bg-urgent' : ''
            }`}
          >
            <PhoneIcon width={22} height={22} />
            Call
          </a>
          <a
            href={bookUrl}
            target="_blank"
            rel="noopener"
            data-cta="book"
            data-location="sticky_bar"
            onClick={() => track.book('sticky_bar')}
            className="flex flex-col items-center justify-center gap-0.5 bg-brand-green text-[0.8rem] font-semibold"
          >
            <CalendarIcon width={22} height={22} />
            Book
          </a>
          <Link
            href="/contact/#estimate"
            data-cta="estimate"
            data-location="sticky_bar"
            className="flex flex-col items-center justify-center gap-0.5 text-[0.8rem] font-semibold"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="M4 4h16v16H4z" strokeLinejoin="round" />
              <path d="M8 9h8M8 13h8M8 17h5" strokeLinecap="round" />
            </svg>
            Estimate
          </Link>
        </div>
      </div>
    </>
  );
}
