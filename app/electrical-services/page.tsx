import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { PageIntro } from '@/components/PageIntro';
import { ServiceCard, CtaBlock } from '@/components/sections';
import { Schema } from '@/components/Schema';
import { webPageNode, breadcrumbNode } from '@/lib/schema';
import { services, serviceGroups } from '@/lib/services';

export const metadata: Metadata = pageMetadata({
  path: '/electrical-services/',
  title: 'Residential Electrical Services in Parker, CO | Allsafe',
  description:
    'All 16 residential electrical services from Allsafe Electric in Parker. Panels, EV chargers, wiring, lighting, generators, inspections and emergency repairs.',
  ogEyebrow: 'Services · Parker, CO',
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/electrical-services/' },
];

export default function ServicesHubPage() {
  return (
    <>
      <Schema
        nodes={[
          webPageNode({
            path: '/electrical-services/',
            name: 'Residential electrical services in Parker, CO',
            description:
              'The full list of residential electrical services offered by Allsafe Electric across Parker and Douglas County.',
            significantLinks: services.map((s) => `/${s.slug}/`),
          }),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageIntro
        eyebrow="Services"
        title="Residential electrical services in Parker, CO"
        lead="Strictly residential, no commercial, no industrial. Every page below tells you what it costs to find out and how fast someone can be there."
        crumbs={crumbs}
      />

      <div className="section">
        <div className="container-page space-y-14">
          {serviceGroups.map((g) => (
            <section key={g.id} aria-labelledby={`grp-${g.id}`}>
              <h2 id={`grp-${g.id}`} className="text-h2">
                {g.label}
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {services
                  .filter((s) => s.group === g.id)
                  .map((s) => (
                    <ServiceCard key={s.slug} slug={s.slug} headingLevel={3} />
                  ))}
              </div>
            </section>
          ))}

          <section className="card bg-paper p-6">
            <h2 className="text-h2">Indoor lighting vs. outdoor lighting</h2>
            <p className="mt-3 max-w-measure text-grey">
              We split lighting into two pages so each answers its own question properly.{' '}
              <Link href="/lighting-services/" className="link-cta">
                Indoor lighting
              </Link>{' '}
              covers recessed cans, under-cabinet LED, fixtures, chandeliers and dimmers.{' '}
              <Link href="/outdoor-lighting/" className="link-cta">
                Outdoor lighting
              </Link>{' '}
              covers landscape, path, security, soffit and holiday-light circuits.
            </p>
          </section>
        </div>
      </div>

      <CtaBlock heading="Not sure which service you need?" />
    </>
  );
}
