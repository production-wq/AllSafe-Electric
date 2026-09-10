'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { primaryNav, servicesMenu } from '@/lib/nav';
import { business } from '@/lib/business';
import { track } from '@/lib/analytics';
import { PhoneIcon, MenuIcon, CloseIcon, ChevronDownIcon } from './Icons';

const GROUP_DOT = {
  'repairs-safety': 'bg-blue-600',
  'power-panels': 'bg-orange-500',
  'lighting-comfort': 'bg-blue-400',
} as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-white">
      <div
        className="container-page flex items-center justify-between gap-4"
        style={{ minHeight: 'var(--header-h)' }}
      >
        <Link href="/" aria-label="Allsafe Electric, home" className="shrink-0 py-2">
          <Logo className="h-9 w-auto md:h-10" priority />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center lg:flex">
          {primaryNav.map((item) =>
            item.mega ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-2.5 py-2 text-[0.92rem] font-medium text-ink transition-colors hover:text-blue-600"
                  aria-expanded={megaOpen}
                  onFocus={() => setMegaOpen(true)}
                >
                  {item.label}
                  <ChevronDownIcon
                    width={14}
                    height={14}
                    className={`transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`}
                  />
                </Link>
                <div
                  className={`absolute left-1/2 top-full w-[680px] -translate-x-1/2 pt-2 ${
                    megaOpen ? 'block' : 'hidden'
                  }`}
                >
                  <div className="overflow-hidden rounded-card border border-rule bg-white shadow-float">
                    <div className="grid grid-cols-3 gap-6 p-6">
                      {servicesMenu.map((col) => (
                        <div key={col.id}>
                          <p className="flex items-center gap-2 text-tiny font-bold uppercase tracking-wide text-grey">
                            <span
                              aria-hidden
                              className={`h-1.5 w-1.5 rounded-full ${GROUP_DOT[col.id]}`}
                            />
                            {col.label}
                          </p>
                          <ul className="mt-2 space-y-0.5">
                            {col.items.map((it) => (
                              <li key={it.href}>
                                <Link
                                  href={it.href}
                                  className={`block rounded px-2 py-1.5 text-small transition-colors hover:bg-paper ${
                                    it.emergency
                                      ? 'font-semibold text-orange-600'
                                      : 'text-ink'
                                  }`}
                                >
                                  {it.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/electrical-services-parker-co/"
                      className="flex items-center justify-between border-t border-rule bg-paper px-6 py-3 text-small font-semibold text-blue-600"
                    >
                      See all residential services
                      <span aria-hidden>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="px-2.5 py-2 text-[0.92rem] font-medium text-ink transition-colors hover:text-blue-600"
                aria-current={pathname.startsWith(item.href) && item.href !== '/' ? 'page' : undefined}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <a
            href={business.phone.href}
            data-cta="call"
            data-location="header"
            onClick={() => track.call('header')}
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[0.95rem] font-bold text-blue-600"
          >
            <PhoneIcon width={17} height={17} />
            {business.phone.display}
          </a>
          <Link
            href="/contact/#estimate"
            className="btn btn-primary shrink-0 whitespace-nowrap !min-h-[44px] !px-5 !py-2 !text-[0.9rem]"
          >
            Free Estimate
          </Link>
        </div>

        {/* Mobile / tablet controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={business.phone.href}
            aria-label={`Call ${business.phone.display}`}
            data-cta="call"
            data-location="header"
            onClick={() => track.call('header')}
            className="flex h-11 w-11 items-center justify-center rounded text-blue-600"
          >
            <PhoneIcon />
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded text-ink"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden">
          <nav
            aria-label="Mobile"
            className="max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-rule bg-white px-5 pb-12 pt-4"
          >
            <Link href="/emergency-electrical-repairs-parker-co/" className="block py-2.5 font-semibold text-orange-600">
              Emergency Repairs
            </Link>
            {servicesMenu.map((col) => (
              <div key={col.id} className="mt-4">
                <p className="flex items-center gap-2 text-tiny font-bold uppercase tracking-wide text-grey">
                  <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${GROUP_DOT[col.id]}`} />
                  {col.label}
                </p>
                <ul className="mt-1">
                  {col.items.map((it) => (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        className={`block border-b border-rule/60 py-2.5 ${
                          it.emergency ? 'font-semibold text-orange-600' : 'text-ink'
                        }`}
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="mt-5 border-t border-rule pt-4">
              {primaryNav
                .filter((i) => !i.mega && i.label !== 'Emergency Repairs')
                .map((item) => (
                  <Link key={item.href} href={item.href} className="block py-2.5 font-medium text-ink">
                    {item.label}
                  </Link>
                ))}
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/contact/#estimate" className="btn btn-primary">
                Get a Free Estimate
              </Link>
              <a
                href={business.phone.href}
                onClick={() => track.call('header')}
                className="btn btn-outline"
              >
                <PhoneIcon width={18} height={18} /> {business.phone.display}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
