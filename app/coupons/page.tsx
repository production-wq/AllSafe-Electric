import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageIntro } from '@/components/PageIntro';
import { CtaBlock } from '@/components/sections';
import { Schema } from '@/components/Schema';
import { webPageNode, breadcrumbNode } from '@/lib/schema';
import { CheckIcon } from '@/components/Icons';
import coupons from '@/data/coupons.json';

export const metadata: Metadata = pageMetadata({
  path: '/coupons/',
  title: 'Coupons & Offers | Allsafe Electric — Parker, CO',
  description:
    'Current offers from Allsafe Electric in Parker, plus what is always included on every visit — a real arrival window and a fixed price up front.',
  ogEyebrow: 'Offers · Parker, CO',
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Coupons & offers', path: '/coupons/' },
];

const alwaysIncluded = [
  'A real two-hour arrival window, and a phone call if anything changes',
  'A fixed price in writing before any work starts',
  'The diagnostic fee credited toward the repair if you go ahead',
  'Free estimates on straightforward quoted work',
  'Shoe covers, drop cloths, and a tidy work area — every visit',
  'A licensed master electrician on the job, not a rotating crew',
];

interface Offer {
  title: string;
  detail: string;
  code?: string;
  expires?: string;
}

export default function CouponsPage() {
  const offers = (coupons as { offers?: Offer[] }).offers ?? [];

  return (
    <>
      <Schema
        nodes={[
          webPageNode({
            path: '/coupons/',
            name: 'Allsafe Electric coupons and offers',
            description: 'Current offers and what is always included with Allsafe Electric.',
          }),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageIntro
        eyebrow="Offers"
        title="Coupons & offers"
        lead="We keep pricing honest rather than inflating a rate to discount it. Any current promotion is below — and here is what every customer gets regardless."
        crumbs={crumbs}
      />

      <div className="section">
        <div className="container-page"><div className="max-w-3xl">
          {offers.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {offers.map((o) => (
                <div key={o.title} className="card border-l-4 border-l-brand-green p-6">
                  <h2 className="text-step-1">{o.title}</h2>
                  <p className="mt-2 text-muted">{o.detail}</p>
                  {o.code && (
                    <p className="mt-3 font-mono text-[0.95rem]">
                      Mention <strong>{o.code}</strong> when you book
                    </p>
                  )}
                  {o.expires && <p className="mt-1 text-[0.85rem] text-muted">Through {o.expires}</p>}
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-6">
              <h2 className="text-step-1">No promotions running right now</h2>
              <p className="mt-2 text-muted">
                When there is a seasonal offer — a panel-upgrade rebate window, a generator
                pre-season deal — it will show up here. In the meantime, the value below is standard
                on every job.
              </p>
            </div>
          )}

          <h2 className="mt-12 text-step-2">Always included</h2>
          <ul className="mt-5 space-y-3">
            {alwaysIncluded.map((item) => (
              <li key={item} className="flex gap-3 text-[1.05rem]">
                <CheckIcon className="mt-0.5 shrink-0 text-brand-green" width={22} height={22} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>

      <CtaBlock heading="Book a visit" />
    </>
  );
}
