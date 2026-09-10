'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { primaryNav, servicesMenu } from '@/lib/nav';
import { business } from '@/lib/business';
import { track } from '@/lib/analytics';
import { BookButton } from './cta';
import { PhoneIcon, MenuIcon, CloseIcon, ChevronDownIcon } from './Icons';

const GROUP_DOT = {
  'repairs-safety': 'bg-brand-500',
  'power-panels': 'bg-leaf-500',
  'lighting-comfort': 'bg-teal-500',
} as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-white/90 backdrop-blur-md">
      <div
        className="container-page flex items-center justify-between gap-6"
        style={{ minHeight: 'var(--header-h)' }}
      >
        <Link href="/" aria-label="Allsafe Electric, home" className="shrink-0 py-2">
          <Logo variant="dark" showTagline={false} className="h-9 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/electrical-services-parker-co/"
              className="flex items-center gap-1 rounded-btn px-3.5 py-2 font-medium text-ink transition-colors hover:bg-brand-50 hover:text-brand-700"
              aria-expanded={servicesOpen}
              onFocus={() => setServicesOpen(true)}
            >
              Services
              <ChevronDownIcon
                width={15}
                height={15}
                className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
              />
            </Link>

            <div
              className={`absolute left-1/2 top-full w-[720px] -translate-x-1/2 pt-2 ${
                servicesOpen ? 'block' : 'hidden'
              }`}
            >
              <div className="overflow-hidden rounded-card border border-rule bg-white shadow-float">
                <div className="grid grid-cols-3 gap-7 p-7">
                  {servicesMenu.map((col) => (
                    <div key={col.id}>
                      <p className="flex items-center gap-2 text-tiny font-bold uppercase tracking-wide text-muted">
                        <span
                          aria-hidden
                          className={`h-1.5 w-1.5 rounded-full ${GROUP_DOT[col.id]}`}
                        />
                        {col.label}
                      </p>
                      <ul className="mt-2.5 space-y-0.5">
                        {col.items.map((it) => (
                          <li key={it.href}>
                            <Link
                              href={it.href}
                              className={`block rounded-btn px-2.5 py-1.5 text-small transition-colors hover:bg-paper ${
                                it.emergency
                                  ? 'font-semibold text-urgent hover:bg-urgent-soft'
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
                <div className="flex items-center justify-between gap-4 border-t border-rule bg-paper px-7 py-3.5">
                  <p className="text-small text-muted">
                    Strictly residential. Every page lists real pricing.
                  </p>
                  <Link href="/electrical-services-parker-co/" className="link-cta text-small">
                    See all 16 services
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {primaryNav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-btn px-3.5 py-2 font-medium text-ink transition-colors hover:bg-brand-50 hover:text-brand-700"
              aria-current={pathname.startsWith(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={business.phone.href}
            data-cta="call"
            data-location="header"
            onClick={() => track.call('header')}
            className="flex items-center gap-2 rounded-btn px-3 py-2 font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            <PhoneIcon width={18} height={18} />
            {business.phone.display}
          </a>
          <BookButton location="header" className="!min-h-[46px] !py-2.5 !text-base" />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={business.phone.href}
            aria-label={`Call ${business.phone.display}`}
            data-cta="call"
            data-location="header"
            onClick={() => track.call('header')}
            className="flex h-11 w-11 items-center justify-center rounded-btn text-brand-700"
          >
            <PhoneIcon />
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-btn text-ink"
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
            {servicesMenu.map((col) => (
              <div key={col.id} className="mb-5">
                <p className="flex items-center gap-2 text-tiny font-bold uppercase tracking-wide text-muted">
                  <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${GROUP_DOT[col.id]}`} />
                  {col.label}
                </p>
                <ul className="mt-1.5">
                  {col.items.map((it) => (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        className={`block border-b border-rule/60 py-2.5 ${
                          it.emergency ? 'font-semibold text-urgent' : 'text-ink'
                        }`}
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="mt-6 border-t border-rule pt-4">
              {primaryNav.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2.5 font-medium text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <BookButton location="header" />
              <a
                href={business.phone.href}
                onClick={() => track.call('header')}
                className="btn btn-secondary"
              >
                <PhoneIcon width={20} height={20} /> {business.phone.display}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
