'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { business } from '@/lib/business';
import { track } from '@/lib/analytics';
import { PhoneIcon, CalendarIcon } from './Icons';

/**
 * Mobile sticky action bar. planning/docs/02 §6.5: three equal segments
 * (Call · Book · Estimate), appears after 400px of scroll, brand-blue ground with
 * the Book segment in brand green. Text and icons are WHITE on both grounds, set
 * explicitly so the base `a` colour rule cannot win and produce blue-on-green.
 * Height is reserved by the spacer so the bar never covers content.
 *
 * This is the highest-value component on the site. Most emergency traffic is on a phone.
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

  const seg =
    'flex flex-col items-center justify-center gap-1 text-tiny font-semibold !text-white hover:!text-white transition-colors duration-200';

  return (
    <>
      <div
        aria-hidden
        className="lg:hidden"
        style={{ height: show ? 'calc(66px + env(safe-area-inset-bottom))' : 0 }}
      />
      <div
        className={`fixed inset-x-0 bottom-0 z-40 lg:hidden ${
          show ? 'translate-y-0' : 'translate-y-full'
        } transition-transform duration-300 ease-smooth`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="grid h-[66px] grid-cols-3 bg-brand-800 text-white shadow-[0_-6px_24px_rgba(1,46,77,0.34)]">
          <a
            href={business.phone.href}
            data-cta="call"
            data-location="sticky_bar"
            onClick={() => track.call('sticky_bar')}
            className={`${seg} ${
              emergency ? 'bg-urgent hover:bg-[#952b26]' : 'hover:bg-brand-700'
            }`}
          >
            <PhoneIcon width={21} height={21} />
            Call
          </a>
          <a
            href={bookUrl}
            target="_blank"
            rel="noopener"
            data-cta="book"
            data-location="sticky_bar"
            onClick={() => track.book('sticky_bar')}
            className={`${seg} bg-leaf-600 hover:bg-leaf-700`}
          >
            <CalendarIcon width={21} height={21} />
            Book
          </a>
          <Link
            href="/contact/#estimate"
            data-cta="estimate"
            data-location="sticky_bar"
            className={`${seg} hover:bg-brand-700`}
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
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
