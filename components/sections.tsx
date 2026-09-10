import Link from 'next/link';
import { SiteImage } from './SiteImage';
import { CtaRow, CallButton, BookButton } from './cta';
import { EstimateForm } from './EstimateForm';
import { business } from '@/lib/business';
import type { Service } from '@/lib/services';
import { getService } from '@/lib/services';

/** Service card — photo, <h3>, one sentence, a text link. No shadow, no hover lift. */
export function ServiceCard({ slug, headingLevel = 3 }: { slug: string; headingLevel?: 2 | 3 }) {
  const s = getService(slug);
  if (!s) return null;
  const H = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <article className="card overflow-hidden">
      <Link href={`/${s.slug}/`} className="block">
        <SiteImage
          name={s.heroImage}
          alt={s.heroAlt}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
          className="aspect-[4/3] w-full object-cover"
          aspable={false}
        />
      </Link>
      <div className="p-5">
        <H className={`text-step-1 ${s.emergency ? 'text-urgent' : ''}`}>
          <Link href={`/${s.slug}/`} className="text-inherit no-underline hover:underline">
            {s.navLabel}
          </Link>
        </H>
        <p className="mt-1.5 text-[1rem] text-muted">{oneLine(s)}</p>
        <Link href={`/${s.slug}/`} className="link-cta mt-3 inline-block text-[0.95rem]">
          {s.emergency ? 'Get help now' : `Learn about ${s.navLabel.toLowerCase()}`}
        </Link>
      </div>
    </article>
  );
}

function oneLine(s: Service): string {
  const map: Record<string, string> = {
    'emergency-electrical-repairs-parker-co':
      'Sparks, burning smell, or half the house dark — a real person answers and Jud comes out.',
    'electrical-panel-services':
      'Fuse boxes, tripping breakers, and Federal Pacific panels replaced. Most run $2,200–$4,500.',
    'electrical-outlet-services': 'Dead outlets traced and fixed, plus new outlets where you need them.',
    'electrical-switch-services': 'Sparking switches, dead three-ways, and humming dimmers, sorted.',
    'electrical-wiring-repairs-services': 'Aluminium wiring, damaged runs, and staged whole-home rewires.',
    'lighting-services': 'Recessed cans, under-cabinet LED, and fixture swaps inside your home.',
    'outdoor-lighting': 'Landscape, path, security, and holiday-light circuits built for Colorado weather.',
    'residential-ev-charging': 'Level 2 home charging with a proper load calculation first.',
    'ceiling-fan-installation': 'Fan-rated boxes, balanced blades, vaulted ceilings included.',
    'home-automation': 'Smart switches, video doorbells, and the neutrals and transformers they need.',
    'whole-home-surge-protection': 'One panel-mounted device shields the whole house from spikes.',
    'smoke-detectors': 'Interconnected smoke and CO detectors, brought up to Colorado code.',
    'home-electrical-safety-inspections': 'A licensed electrician opens the panel and gives you a written report.',
    'generator-installation': 'Automatic standby power sized to what you actually need to keep on.',
    'electrical-troubleshooting': 'Breaker trips, flickering lights, and dead circuits traced to the real cause.',
    'hot-tub-electrical-hookup': 'A code-correct 240V GFCI circuit and disconnect, ready for delivery day.',
  };
  return map[s.slug] ?? s.metaDescription;
}

/** "What happens next" — the conversion lever for an anxious buyer (docs/07 §7). */
export function WhatHappensNext({ emergency = false }: { emergency?: boolean }) {
  const steps = emergency
    ? [
        'You call. We confirm the address and a two-hour arrival window and tell you what to switch off.',
        'Jud arrives, makes it safe, and finds the actual cause.',
        'You get a fixed repair price before any work starts — the diagnostic fee comes off it.',
        'We fix what is dangerous now and flag what to schedule properly later.',
      ]
    : [
        'You call or book online. A real person picks up during business hours.',
        'We confirm a two-hour arrival window that works for you.',
        'Jud arrives, looks at the job, and gives you a fixed price.',
        'You decide. No pressure, no upsell.',
      ];
  return (
    <div className="card p-6 md:p-8">
      <h2 className="text-step-2">What happens next</h2>
      <ol className="mt-4 space-y-4">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue text-[0.95rem] font-bold text-white">
              {i + 1}
            </span>
            <span className="pt-1 text-[1.05rem]">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Price range — always a visibly-marked estimate. planning/docs/09 §4. */
export function PriceRange({ service }: { service: Service }) {
  const p = service.priceRange;
  const fmt = (n: number) => `$${n.toLocaleString('en-US')}`;
  return (
    <div className="card border-l-4 border-l-brand-green p-6">
      <h2 className="text-step-2">
        What it costs {service.slug.includes('parker') ? 'in Parker' : 'in Douglas County'}
      </h2>
      <p className="mt-3 text-step-1 font-semibold text-ink">
        {p.unit ? `${fmt(p.low)}–${fmt(p.high)} ${p.unit}` : `${fmt(p.low)}–${fmt(p.high)}`}
      </p>
      <p className="mt-2 text-[1.02rem] text-muted">
        <strong className="text-ink">What moves the price:</strong> {p.drivers}.
      </p>
      <p className="mt-1.5 text-[1.02rem] text-muted">
        <strong className="text-ink">Included:</strong> {p.includes}.
      </p>
      <p className="mt-3 text-[0.9rem] text-muted">
        {p.needsApproval
          ? 'Estimated range, updated periodically. Your exact price is fixed in writing before any work begins.'
          : 'Typical installed range for this area. Your exact price is fixed in writing after Jud sees the job.'}
      </p>
    </div>
  );
}

/** Full CTA block for the bottom of a page — Book · Call · Estimate form. */
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
    <section className="bg-brand-blue-deep text-white">
      <div className="container-page grid gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <h2 className="text-step-3 text-white">{heading}</h2>
          <p className="mt-3 max-w-md text-white/85">
            {emergency
              ? `Call now — during the day Jud usually picks up on the first ring. Or book the next available window online.`
              : `Book a visit online any time, or call and talk it through with a real person. Free estimates on quoted work; the diagnostic fee on a service call comes off the repair.`}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {emergency ? (
              <>
                <CallButton location="footer" service={service} variant="urgent" />
                <BookButton location="footer" service={service} variant="secondary" />
              </>
            ) : (
              <>
                <BookButton location="footer" service={service} variant="primary" />
                <CallButton location="footer" service={service} variant="secondary" />
              </>
            )}
          </div>
          <p className="mt-6 text-[0.95rem] text-white/75">
            {business.name} · {business.address.streetAddress}, {business.address.addressLocality},{' '}
            {business.address.addressRegion} {business.address.postalCode} ·{' '}
            <a href={business.phone.href} className="font-semibold text-white underline">
              {business.phone.display}
            </a>
          </p>
        </div>
        <div className="rounded-card bg-white p-6 text-ink">
          <h3 className="text-step-1">Get an estimate</h3>
          <p className="mt-1 text-[0.95rem] text-muted">
            Tell us what is going on. We reply the same business day.
          </p>
          <EstimateForm compact defaultService={service} formId="cta-block" />
        </div>
      </div>
    </section>
  );
}

export { CtaRow };
