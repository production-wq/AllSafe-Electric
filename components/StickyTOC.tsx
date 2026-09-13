'use client';

import { useEffect, useState } from 'react';

export interface TocItem {
  id: string;
  label: string;
}

/**
 * In-page section navigation for long service and city pages, added 2026-09-14
 * as part of the depth pass. Once a page carries 1800+ words across eight or
 * more sections, a reader needs a way to jump; it also gives crawlers a clean
 * outline of the page's structure.
 *
 * FAILS OPEN: renders as a plain, fully usable list of anchor links with no JS.
 * The scroll-spy highlight is the only thing JS adds, and if the observer never
 * runs the links still work and the list is still visible.
 *
 * Items whose target element is missing from the DOM are dropped on mount, so a
 * section that only renders for some services never leaves a dead anchor.
 */
export function StickyTOC({ items, className = '' }: { items: TocItem[]; className?: string }) {
  const [present, setPresent] = useState<TocItem[]>(items);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const found = items.filter((i) => document.getElementById(i.id));
    setPresent(found);
    if (found.length === 0) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Bias the band toward the top of the viewport so the highlighted item is
      // the section you are actually reading, not one half off the bottom.
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    found.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (present.length < 3) return null;

  return (
    <nav aria-label="On this page" className={className}>
      <p className="text-tiny font-bold uppercase tracking-[0.12em] text-grey">On this page</p>
      <ul className="mt-3 space-y-0.5 border-l border-rule">
        {present.map((i) => {
          const active = activeId === i.id;
          return (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={active ? 'location' : undefined}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-small transition-colors duration-200 ${
                  active
                    ? 'border-green-600 font-semibold text-ink'
                    : 'border-transparent text-grey hover:border-rule hover:text-ink'
                }`}
              >
                {i.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
