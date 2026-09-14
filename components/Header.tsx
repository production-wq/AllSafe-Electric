'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { primaryNav, servicesMenu } from '@/lib/nav';
import { cities } from '@/lib/cities';
import { PUBLISH } from '@/lib/publish';
import { business } from '@/lib/business';
import { track } from '@/lib/analytics';
import { PhoneIcon, MenuIcon, CloseIcon, ChevronDownIcon, BoltIcon } from './Icons';

const GROUP_DOT = {
  'repairs-safety': 'bg-blue-600',
  'power-panels': 'bg-green-600',
  'lighting-comfort': 'bg-blue-400',
} as const;

/**
 * Site header.
 *
 * Rebuilt 2026-09-14 (client design pass). What changed and why:
 *  - Three nav items instead of six, so the phone number stops being crushed.
 *    It now sits in its own bordered block with a "Call us" label above it.
 *  - Multiple dropdowns. The old version tracked a single `megaOpen` boolean
 *    and branched only on `item.mega`, so only one panel could ever exist.
 *    Open state is now the href of the open item, or null.
 *  - Keyboard and pointer dismissal. The old panel opened on focus but had no
 *    blur, Escape, or click-outside handler, so a keyboard user could open it
 *    and nothing would ever close it. All three are handled now.
 *  - The mobile drawer is driven entirely by the nav data. It used to hardcode
 *    an "Emergency Repairs" link and then filter it back out by matching the
 *    label string, which broke the moment that label changed.
 *  - Desktop nav returns at `lg` rather than `xl`. With three items there is
 *    room, and the old `xl` gate pointlessly sent 1024-1279px to the hamburger.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setOpenPanel(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Escape closes any open panel and the drawer.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenPanel(null);
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Click or focus outside the nav closes the open panel.
  useEffect(() => {
    if (!openPanel) return;
    const onOutside = (e: Event) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenPanel(null);
    };
    document.addEventListener('pointerdown', onOutside);
    document.addEventListener('focusin', onOutside);
    return () => {
      document.removeEventListener('pointerdown', onOutside);
      document.removeEventListener('focusin', onOutside);
    };
  }, [openPanel]);

  const publishedCities = PUBLISH.TIER_1_CITIES ? cities : [];

  return (
    <header
      className="sticky top-0 border-b border-rule bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
      style={{ zIndex: 'var(--z-header)' }}
    >
      <div
        className="container-page flex items-center justify-between gap-5"
        style={{ minHeight: 'var(--header-h)' }}
      >
        <Link href="/" aria-label="Allsafe Electric, home" className="shrink-0 py-2">
          <Logo className="h-9 w-auto md:h-10" priority />
        </Link>

        {/* ── Desktop nav ─────────────────────────────────────────────── */}
        <nav ref={navRef} aria-label="Primary" className="hidden items-center lg:flex">
          {primaryNav.map((item) => {
            const hasPanel = Boolean(item.mega || item.areas || item.children);
            const isOpen = openPanel === item.href;
            const active = pathname.startsWith(item.href) && item.href !== '/';

            if (!hasPanel) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className="shrink-0 whitespace-nowrap px-3 py-2 text-[0.95rem] font-medium text-ink transition-colors hover:text-blue-600"
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenPanel(item.href)}
                onMouseLeave={() => setOpenPanel(null)}
              >
                <Link
                  href={item.href}
                  aria-expanded={isOpen}
                  aria-current={active ? 'page' : undefined}
                  onFocus={() => setOpenPanel(item.href)}
                  className="flex shrink-0 items-center gap-1 whitespace-nowrap px-3 py-2 text-[0.95rem] font-medium text-ink transition-colors hover:text-blue-600"
                >
                  {item.label}
                  <ChevronDownIcon
                    width={15}
                    height={15}
                    className={`text-grey transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </Link>

                <div
                  className={`absolute left-1/2 top-full -translate-x-1/2 pt-2 transition-all duration-200 ${
                    isOpen
                      ? 'pointer-events-auto translate-y-0 opacity-100'
                      : 'pointer-events-none -translate-y-1 opacity-0'
                  }`}
                  style={{ zIndex: 'var(--z-dropdown)' }}
                  
                >
                  {item.mega && <ServicesPanel />}
                  {item.areas && <AreasPanel cities={publishedCities} />}
                  {item.children && <LinksPanel items={item.children} />}
                </div>
              </div>
            );
          })}
        </nav>

        {/* ── Phone + CTA ─────────────────────────────────────────────── */}
        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <a
            href={business.phone.href}
            onClick={() => track.call('header')}
            className="group flex items-center gap-2.5 rounded-btn border border-rule px-3.5 py-1.5 transition-colors hover:border-blue-300 hover:bg-blue-50"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <PhoneIcon width={15} height={15} />
            </span>
            <span className="leading-tight">
              <span className="block text-[0.7rem] font-medium uppercase tracking-wide text-grey">
                Call us
              </span>
              <span className="block whitespace-nowrap text-[0.95rem] font-bold text-ink">
                {business.phone.display}
              </span>
            </span>
          </a>
          <Link
            href="#estimate"
            className="btn btn-primary !min-h-[46px] !px-5 !py-2 !text-[0.92rem]"
          >
            Free Estimate
          </Link>
        </div>

        {/* ── Mobile controls ─────────────────────────────────────────── */}
        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={business.phone.href}
            onClick={() => track.call('header')}
            aria-label={`Call ${business.phone.display}`}
            className="flex h-11 w-11 items-center justify-center rounded-btn text-blue-600"
          >
            <PhoneIcon width={22} height={22} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 items-center justify-center rounded-btn text-ink"
          >
            {open ? <MenuIconClose /> : <MenuIcon width={24} height={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────────── */}
      {open && (
        <div
          className="max-h-[calc(100vh-var(--header-h))] overflow-y-auto border-t border-rule bg-white lg:hidden"
          style={{ zIndex: 'var(--z-drawer)' }}
        >
          <div className="container-page space-y-6 py-6">
            {primaryNav.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block text-h3 font-bold text-ink"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>

                {item.mega && (
                  <div className="mt-3 space-y-4">
                    {servicesMenu.map((g) => (
                      <div key={g.id}>
                        <p className="text-tiny font-bold uppercase tracking-wide text-grey">{g.label}</p>
                        <ul className="mt-1.5 space-y-1">
                          {g.items.map((s) => (
                            <li key={s.href}>
                              <Link
                                href={s.href}
                                onClick={() => setOpen(false)}
                                className={`block py-1 text-body ${
                                  s.emergency ? 'font-semibold text-urgent-500' : 'text-slate'
                                }`}
                              >
                                {s.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {item.areas && publishedCities.length > 0 && (
                  <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
                    {publishedCities.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/electricians/${c.slug}-co/`}
                          onClick={() => setOpen(false)}
                          className="block py-1 text-body text-slate"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {item.children && (
                  <ul className="mt-3 space-y-1">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className="block py-1 text-body text-slate"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="flex flex-col gap-3 border-t border-rule pt-5">
              <Link href="#estimate" className="btn btn-primary" onClick={() => setOpen(false)}>
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
          </div>
        </div>
      )}
    </header>
  );
}

function MenuIconClose() {
  return <CloseIcon width={24} height={24} />;
}

/** Three-column services panel, with emergency pinned first. */
function ServicesPanel() {
  return (
    <div className="w-[720px] rounded-card border border-rule bg-white p-6 shadow-float">
      <div className="grid grid-cols-3 gap-6">
        {servicesMenu.map((g) => (
          <div key={g.id}>
            <p className="flex items-center gap-2 text-tiny font-bold uppercase tracking-wide text-grey">
              <span className={`h-2 w-2 rounded-full ${GROUP_DOT[g.id as keyof typeof GROUP_DOT]}`} />
              {g.label}
            </p>
            <ul className="mt-2.5 space-y-0.5">
              {g.items.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className={`block rounded px-2 py-1.5 text-small transition-colors hover:bg-paper ${
                      s.emergency ? 'font-semibold text-urgent-500' : 'text-slate'
                    }`}
                  >
                    {s.emergency && <BoltIcon width={13} height={13} className="mr-1 inline-block" />}
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-5 border-t border-rule pt-4">
        <Link href="/electrical-services/" className="link-cta text-small">
          See all 16 services
        </Link>
      </div>
    </div>
  );
}

/** All published service areas, so every location page is one hover away. */
function AreasPanel({ cities: list }: { cities: typeof cities }) {
  return (
    <div className="w-[560px] rounded-card border border-rule bg-white p-6 shadow-float">
      <p className="text-tiny font-bold uppercase tracking-wide text-grey">Where we work</p>
      <ul className="mt-3 grid grid-cols-3 gap-x-4 gap-y-0.5">
        {list.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/electricians/${c.slug}-co/`}
              className="block rounded px-2 py-1.5 text-small text-slate transition-colors hover:bg-paper"
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-5 border-t border-rule pt-4">
        <Link href="/service-area/" className="link-cta text-small">
          See the full service area
        </Link>
      </div>
    </div>
  );
}

/** Simple link list panel, used by About. */
function LinksPanel({ items }: { items: { label: string; href: string; note?: string }[] }) {
  return (
    <div className="w-[330px] rounded-card border border-rule bg-white p-3 shadow-float">
      <ul className="space-y-0.5">
        {items.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="block rounded px-3 py-2 transition-colors hover:bg-paper">
              <span className="block text-small font-semibold text-ink">{c.label}</span>
              {c.note && <span className="mt-0.5 block text-tiny text-grey">{c.note}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
