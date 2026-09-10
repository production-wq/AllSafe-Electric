'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { primaryNav, servicesMenu } from '@/lib/nav';
import { business } from '@/lib/business';
import { track } from '@/lib/analytics';
import { BookButton } from './cta';
import { PhoneIcon, MenuIcon, CloseIcon, ChevronDownIcon } from './Icons';

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

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
    <header className="sticky top-0 z-50 border-b border-rule bg-white/95 backdrop-blur">
      <div
        className="container-page flex items-center justify-between gap-6"
        style={{ minHeight: 'var(--header-h)' }}
        ref={navRef}
      >
        <Link href="/" aria-label="Allsafe Electric — home" className="shrink-0 py-2">
          <Logo variant="dark" showTagline={false} className="h-9 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          <div
            className="group relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/electrical-services-parker-co/"
              className="flex items-center gap-1 rounded px-3 py-2 font-medium text-ink hover:bg-paper"
              aria-expanded={servicesOpen}
              onFocus={() => setServicesOpen(true)}
            >
              Services <ChevronDownIcon width={16} height={16} />
            </Link>
            <div
              className={`absolute left-0 top-full w-[640px] rounded-card border border-rule bg-white p-6 shadow-lift ${
                servicesOpen ? 'block' : 'hidden'
              }`}
            >
              <div className="grid grid-cols-3 gap-6">
                {servicesMenu.map((col) => (
                  <div key={col.id}>
                    <p className="mb-2 text-step--1 font-semibold text-muted">{col.label}</p>
                    <ul className="space-y-1">
                      {col.items.map((it) => (
                        <li key={it.href}>
                          <Link
                            href={it.href}
                            className={`block rounded px-2 py-1.5 text-[0.95rem] hover:bg-paper ${
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
              </div>
              <div className="mt-4 border-t border-rule pt-3">
                <Link href="/electrical-services-parker-co/" className="link-cta text-[0.95rem]">
                  See all residential services
                </Link>
              </div>
            </div>
          </div>

          {primaryNav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-3 py-2 font-medium text-ink hover:bg-paper"
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
            className="flex items-center gap-1.5 font-semibold text-brand-blue-deep"
          >
            <PhoneIcon width={18} height={18} />
            {business.phone.display}
          </a>
          <BookButton location="header" className="!min-h-[44px] !py-2 !text-base" />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={business.phone.href}
            aria-label={`Call ${business.phone.display}`}
            data-cta="call"
            data-location="header"
            onClick={() => track.call('header')}
            className="flex h-11 w-11 items-center justify-center rounded text-brand-blue-deep"
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
            className="max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-t border-rule bg-white px-5 pb-10 pt-3"
          >
            <p className="mb-1 mt-3 text-step--1 font-semibold text-muted">Services</p>
            {servicesMenu.map((col) => (
              <div key={col.id} className="mb-2">
                <p className="mt-2 text-[0.85rem] font-semibold uppercase tracking-wide text-muted">
                  {col.label}
                </p>
                <ul>
                  {col.items.map((it) => (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        className={`block py-2 ${it.emergency ? 'font-semibold text-urgent' : 'text-ink'}`}
                      >
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <hr className="my-3 border-rule" />
            {primaryNav.slice(1).map((item) => (
              <Link key={item.href} href={item.href} className="block py-2.5 font-medium text-ink">
                {item.label}
              </Link>
            ))}
            <div className="mt-5 flex flex-col gap-3">
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
