import Link from 'next/link';
import testimonials from '@/data/testimonials.json';
import { CallButton, EstimateButton } from './cta';
import { EstimateForm } from './EstimateForm';
import { SiteImage } from './SiteImage';
import { ServiceReviews } from './ServiceReviews';
import { FaqList } from './Faq';
import { Schema } from './Schema';
import { CheckIcon } from './Icons';
import { business, abs } from '@/lib/business';
import { webPageNode, faqPageNode } from '@/lib/schema';
import { diagnosticCopy, type PaidRepair } from '@/lib/paidRepairs';

export function PaidRepairPage({ page }: { page: PaidRepair }) {
  const path = `/${page.slug}/`;
  const faqs = [...page.faqs,
    { q: 'What does a diagnostic visit cost?', a: `${diagnosticCopy} Call to confirm the diagnostic fee and current appointment availability.` },
    { q: 'When can I arrange a visit?', a: 'We are open weekdays, 8am to 6pm. Call to discuss the problem and current appointment availability, or send a repair request using the form on this page.' },
  ];
  return <>
    <Schema nodes={[
      webPageNode({ path, name: page.label, description: page.description, about: true }),
      { '@type': 'Service', '@id': `${abs(path)}#service`, name: page.label, description: page.intro, url: abs(path), provider: { '@id': `${abs('/')}#business` } },
      faqPageNode(faqs, path),
    ]} />
    <section className="surface-dark bg-aurora py-10 md:py-16">
      <div className="container-page grid items-center gap-9 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div>
          <p className="eyebrow">{page.label} · Parker & South Denver metro</p>
          <h1 className="mt-4 text-[2.15rem] leading-[1.14] sm:text-[2.9rem] lg:text-[3.35rem]">{page.headline}</h1>
          <p className="mt-5 max-w-xl text-body-lg text-white/90">{page.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CallButton location="hero" service={page.slug} />
            <EstimateButton location="hero" variant="ghost">Request a repair visit</EstimateButton>
          </div>
          <p className="mt-4 text-small text-white/90">We are open weekdays, 8am to 6pm.</p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-small">
            {['Licensed & insured', 'Flat-fee diagnosis', 'Written repair pricing'].map(t => <li key={t} className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-green-300" />{t}</li>)}
          </ul>
        </div>
        <figure className="overflow-hidden rounded-card border border-white/20 bg-white/5">
          <SiteImage name={page.photo} alt={page.photoAlt} priority sizes="(min-width: 1024px) 520px, 100vw" aspable={false} className="mx-auto h-[300px] w-full object-contain sm:h-[400px]" />
          <figcaption className="px-5 py-3 text-small text-white/90">Residential electrical service from Allsafe Electric.</figcaption>
        </figure>
      </div>
    </section>
    <section className="border-b border-rule bg-green-50 py-6">
      <div className="container-page flex flex-col gap-2 md:flex-row md:items-center md:gap-8">
        <h2 className="shrink-0 text-h3">Know what to expect.</h2>
        <p className="max-w-3xl text-body text-slate">{diagnosticCopy}</p>
      </div>
    </section>
    <section className="container-page py-12 md:py-16" aria-labelledby="symptoms">
      <p className="eyebrow">We can help</p>
      <h2 id="symptoms" className="mt-3 text-h2">Does this sound like your home?</h2>
      <div className="mt-7 grid gap-5 md:grid-cols-3">
        {page.symptoms.map(s => <article key={s.title} className="card p-6"><CheckIcon className="h-7 w-7 text-green-600" /><h3 className="mt-4 text-h3">{s.title}</h3><p className="mt-3 text-body text-slate">{s.text}</p></article>)}
      </div>
    </section>
    <section className="bg-paper py-12 md:py-16">
      <div className="container-page grid gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Diagnosis before repair</p>
          <h2 className="mt-3 text-h2">{page.detailTitle}</h2>
          <p className="mt-5 text-body-lg text-slate">{page.detail}</p>
          <p className="mt-5 text-body text-slate">Based in Parker and serving the South Denver metro. <Link href="/service-area/" className="underline">Check our service area</Link> or call to confirm coverage for your address.</p>
          <div className="mt-6"><CallButton location="mid_page" service={page.slug} /></div>
        </div>
        <div className="card p-6 md:p-8">
          <h2 className="text-h3">Your repair visit, step by step</h2>
          <ol className="mt-6 space-y-6">
            {[
              ['Tell us what stopped working', 'Call to describe the issue, confirm the diagnostic fee, and discuss appointment availability.'],
              ['Get the problem diagnosed', 'One of our licensed electricians tests the affected area and explains the findings.'],
              ['Approve the repair price', 'You receive the price in writing before repair work starts. We test the repaired area when the work is complete.'],
            ].map(([title, text], i) => <li key={title} className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50 font-bold text-green-700" aria-hidden>{i + 1}</span><div><h3 className="text-body-lg font-semibold">{title}</h3><p className="mt-1 text-body text-slate">{text}</p></div></li>)}
          </ol>
        </div>
      </div>
    </section>
    <div className="container-page py-12 md:py-16"><ServiceReviews tags={page.tags} limit={3} heading="Homeowners on working with Allsafe" /></div>
    <section className="border-y border-rule bg-blue-50 py-12 md:py-16" aria-labelledby="request-heading">
      <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow">Let’s get it checked</p>
          <h2 id="request-heading" className="mt-3 text-h2">Request a repair visit</h2>
          <p className="mt-4 text-body-lg text-slate">Call to discuss your {page.slug === 'partial-power-loss' ? 'power loss' : page.slug === 'outlet-gfci-repair' ? 'outlet or GFCI problem' : 'breaker or circuit problem'}, or tell us what is happening using the form.</p>
          <div className="mt-5"><CallButton location="mid_page" service={page.slug} /></div>
          <p className="mt-4 text-body text-slate">We are open weekdays, 8am to 6pm.</p>
          <p className="mt-4 text-small text-slate">Sending a request does not confirm an appointment. We will contact you to discuss availability and next steps.</p>
          <p className="mt-6 text-small text-slate">Colorado electrical contractor license {business.licenses.contractor.id}. <a className="underline" href={business.licenses.verifyUrl}>Verify licensing</a>.</p>
          <blockquote className="mt-6 border-l-4 border-green-600 pl-4 text-body text-slate">
            <p>“{testimonials.reviews[1].text}”</p>
            <footer className="mt-3 text-small font-semibold text-ink">{testimonials.reviews[1].author}, Allsafe customer</footer>
          </blockquote>
          <p className="mt-3 text-small"><Link href="/about/" className="underline">About Allsafe Electric</Link></p>
        </div>
        <div className="card p-6 md:p-8">
          <p className="font-semibold text-ink">{page.label}</p>
          <EstimateForm variant="compact" defaultService={page.service} submitLabel="Request My Repair Visit" repairRequest />
        </div>
      </div>
    </section>
    <div className="container-page max-w-4xl py-12 md:py-16"><FaqList faqs={faqs} heading="Before you book" /></div>
  </>;
}
