import Link from 'next/link';
import { SiteImage } from './SiteImage';
import { CtaRow, CallButton, EstimateButton } from './cta';
import { EstimateForm } from './EstimateForm';
import { business } from '@/lib/business';
import type { Service } from '@/lib/services';
import { getService } from '@/lib/services';
import { CheckIcon } from './Icons';

const ACCENT = {
  blue: { bar: 'bg-blue-500', tile: 'bg-blue-50 text-blue-600' },
  leaf: { bar: 'bg-green-600', tile: 'bg-green-50 text-green-600' },
  teal: { bar: 'bg-blue-400', tile: 'bg-blue-50 text-blue-600' },
} as const;

/** Service card. Photo, an h3, one line, a text link. Color comes from the group. */
export function ServiceCard({
  slug,
  headingLevel = 3,
  accent = 'blue',
}: {
  slug: string;
  headingLevel?: 2 | 3;
  accent?: keyof typeof ACCENT;
}) {
  const s = getService(slug);
  if (!s) return null;
  const H = `h${headingLevel}` as 'h2' | 'h3';
  const a = ACCENT[accent];

  return (
    <article className="card card-hover group relative flex flex-col overflow-hidden">
      <div className="relative overflow-hidden">
        <SiteImage
          name={s.heroImage}
          alt={s.heroAlt}
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 92vw"
          className="aspect-[16/11] w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.03]"
          aspable={false}
        />
        <span
          aria-hidden
          className={`absolute inset-x-0 bottom-0 h-1 ${s.emergency ? 'bg-green-600' : a.bar}`}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <H className={`text-h3 ${s.emergency ? 'text-green-700' : ''}`}>
          <Link href={`/${s.slug}/`} className="text-inherit no-underline">
            <span className="absolute inset-0" aria-hidden />
            {s.navLabel}
          </Link>
        </H>
        <p className="mt-2 flex-1 text-small text-grey">{s.blurb}</p>
        <span className="link-cta mt-4 text-small">
          {s.emergency ? 'Get help now' : 'See details and pricing'}
        </span>
      </div>
    </article>
  );
}

/** Compact stat and proof row. */
export function StatBand({
  items,
  tone = 'light',
}: {
  items: { value: string; label: string }[];
  tone?: 'light' | 'dark';
}) {
  return (
    <dl
      className={`grid gap-px overflow-hidden rounded-card sm:grid-cols-2 lg:grid-cols-4 ${
        tone === 'dark' ? 'bg-white/15' : 'bg-rule'
      }`}
    >
      {items.map((it) => (
        <div
          key={it.label}
          className={`px-5 py-7 text-center ${tone === 'dark' ? 'bg-navy' : 'bg-white'}`}
        >
          <dt className="sr-only">{it.label}</dt>
          <dd>
            <span
              className={`block text-h2 font-bold ${
                tone === 'dark' ? 'text-white' : 'text-blue-600'
              }`}
            >
              {it.value}
            </span>
            <span
              className={`mt-1.5 block text-small ${tone === 'dark' ? 'text-white/75' : 'text-grey'}`}
            >
              {it.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** "What happens next", the conversion lever for an anxious buyer (docs/07 §7). */
export function WhatHappensNext({ emergency = false }: { emergency?: boolean }) {
  const steps = emergency
    ? [
        'You call. We confirm the address and a two-hour arrival window, and tell you what to switch off.',
        'We arrive, makes it safe, and finds the actual cause.',
        'You get a fixed repair price before any work starts. The diagnostic fee comes off it.',
        'We fix what is dangerous now and flag what to schedule properly later.',
      ]
    : [
        'You call or book online. A real person picks up during business hours.',
        'We confirm a two-hour arrival window that works for you.',
        'We arrive, looks at the job, and gives you a fixed price.',
        'You decide. No pressure, and no upsell.',
      ];
  return (
    <div className="card p-6 md:p-8">
      <h2 className="text-h2">What happens next</h2>
      <ol className="mt-6 space-y-5">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-4">
            <span className="icon-tile bg-blue-50 text-body-lg font-bold text-blue-600">
              {i + 1}
            </span>
            <span className="pt-2.5 text-body text-slate">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Price range. Always a visibly-marked estimate (planning/docs/09 §4). */
export function PriceRange({ service }: { service: Service }) {
  const p = service.priceRange;
  const fmt = (n: number) => `$${n.toLocaleString('en-US')}`;
  return (
    <div className="overflow-hidden rounded-card border border-green-100 bg-green-50">
      <div className="border-b border-green-100 bg-white/60 px-6 py-4">
        <h2 className="text-h2">
          What it costs {service.slug.includes('parker') ? 'in Parker' : 'in Douglas County'}
        </h2>
      </div>
      <div className="p-6">
        <p className="text-h1 font-bold tracking-tight text-green-700">
          {fmt(p.low)}
          <span className="mx-2 text-h3 font-normal text-green-600/70">to</span>
          {fmt(p.high)}
        </p>
        {p.unit && <p className="mt-1 text-small font-semibold text-green-700">{p.unit}</p>}

        <dl className="mt-6 space-y-4 border-t border-green-100 pt-5 text-body">
          <div>
            <dt className="font-semibold text-ink">What moves the price</dt>
            <dd className="mt-0.5 text-slate">{p.drivers}.</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">What is included</dt>
            <dd className="mt-0.5 text-slate">{p.includes}.</dd>
          </div>
        </dl>

        <p className="mt-5 rounded-btn bg-white/70 px-4 py-3 text-small text-slate">
          {p.needsApproval
            ? 'Estimated range, reviewed regularly. Your exact price is fixed in writing before any work begins.'
            : 'Typical installed range for this area. Your exact price is fixed in writing after we have seen the job.'}
        </p>
      </div>
    </div>
  );
}

/** Bulleted "what is included" list. */
export function IncludedList({
  items,
  title = 'What the price covers',
}: {
  items: string[];
  title?: string;
}) {
  return (
    <section aria-labelledby="included-heading">
      <h2 id="included-heading" className="text-h2">
        {title}
      </h2>
      <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-body">
            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100">
              <CheckIcon className="text-green-700" width={13} height={13} />
            </span>
            <span className="text-slate">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Full CTA band for the bottom of a page. Book, Call, and the estimate form. */
export function CtaBlock({
  service,
  emergency = false,
  heading = 'Ready to get it sorted?',
}: {
  service?: string;
  emergency?: boolean;
  heading?: string;
}) {
  return (
    <section className="surface-dark relative overflow-hidden bg-navy">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-600/40 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-green-600/25 blur-3xl"
      />
      <div className="container-page relative grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="eyebrow eyebrow-light">Talk to a real person</p>
          <h2 className="mt-3 text-h1 text-white">{heading}</h2>
          <p className="mt-4 max-w-md text-body-lg text-white/80">
            {emergency
              ? 'Call now. During the day we usually pick up on the first ring, and you get a two-hour arrival window rather than a vague promise.'
              : 'Book a visit online any time, or call and talk it through with a real person. Free estimates on quoted work, and the diagnostic fee on a service call comes off the repair.'}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {emergency ? (
              <>
                <CallButton location="footer" service={service} variant="primary">
                  Call {business.phone.display}
                </CallButton>
                <EstimateButton location="footer" className="!bg-transparent !shadow-none btn-ghost">
                  Get a Free Estimate
                </EstimateButton>
              </>
            ) : (
              <>
                <EstimateButton location="footer" />
                <CallButton location="footer" service={service} variant="ghost" />
              </>
            )}
          </div>

          <ul className="mt-10 space-y-2.5 border-t border-white/15 pt-6 text-small text-white/75">
            <li className="flex items-start gap-2.5">
              <CheckIcon className="mt-0.5 shrink-0 text-green-200" width={17} height={17} />
              Licensed master electrician, {business.licenses.master.id}
            </li>
            <li className="flex items-start gap-2.5">
              <CheckIcon className="mt-0.5 shrink-0 text-green-200" width={17} height={17} />
              Serving Parker and the south metro since {business.founded.year}
            </li>
            <li className="flex items-start gap-2.5">
              <CheckIcon className="mt-0.5 shrink-0 text-green-200" width={17} height={17} />
              {business.address.streetAddress}, {business.address.addressLocality},{' '}
              {business.address.addressRegion} {business.address.postalCode}
            </li>
          </ul>
        </div>

        <div className="rounded-card bg-white p-6 text-ink shadow-float md:p-8">
          <h3 className="text-h3">Get an estimate</h3>
          <p className="mt-1.5 text-small text-grey">
            Tell us what is going on. We reply the same business day.
          </p>
          <EstimateForm variant="compact" defaultService={service} formId="cta-block" />
        </div>
      </div>
    </section>
  );
}

export { CtaRow };
