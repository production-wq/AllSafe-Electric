import type { Metadata } from 'next';
import { Suspense } from 'react';
import { pageMetadata } from '@/lib/seo';
import { PageIntro } from '@/components/PageIntro';
import { BookEmbed } from '@/components/BookEmbed';
import { Schema } from '@/components/Schema';
import { webPageNode, breadcrumbNode } from '@/lib/schema';
import { CheckIcon } from '@/components/Icons';
import { business } from '@/lib/business';

export const metadata: Metadata = pageMetadata({
  path: '/book/',
  title: 'Book an Electrician in Parker, CO | Allsafe Electric',
  description:
    'Book Allsafe Electric online through Housecall Pro, the scheduler is live any time. Or call (303) 648-1934 during business hours and talk to Jud directly.',
  ogEyebrow: 'Book · Parker, CO',
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Book a visit', path: '/book/' },
];

const whatToExpect = [
  'Pick a service and a window that works for you',
  'We confirm a two-hour arrival slot',
  'Jud arrives, looks at the job, and gives you a fixed price',
  'You decide, no pressure, no upsell',
];

export default function BookPage() {
  return (
    <>
      <Schema
        nodes={[
          webPageNode({
            path: '/book/',
            name: 'Book an electrician. Allsafe Electric',
            description: 'Schedule a residential electrical visit with Allsafe Electric in Parker, CO.',
            about: true,
          }),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageIntro
        eyebrow="Book a visit"
        title="Get on the calendar"
        lead="Booking is live any time through Housecall Pro. If it’s urgent, call instead so we can triage it."
        crumbs={crumbs}
      />

      <div className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_320px]">
          <Suspense fallback={<div className="card p-8 text-muted">Loading the scheduler…</div>}>
            <BookEmbed />
          </Suspense>

          <aside className="card h-fit p-6">
            <h2 className="text-h3">What to expect</h2>
            <ol className="mt-4 space-y-3">
              {whatToExpect.map((s, i) => (
                <li key={i} className="flex gap-3 text-[1rem]">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-[0.85rem] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 flex items-start gap-2 border-t border-rule pt-4 text-[0.95rem] text-muted">
              <CheckIcon className="mt-0.5 shrink-0 text-leaf-600" width={20} height={20} />
              Licensed master electrician · {business.licenses.master.id} · serving Parker since{' '}
              {business.founded.year}
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
