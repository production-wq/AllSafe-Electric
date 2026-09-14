import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { PageIntro } from '@/components/PageIntro';
import { MapFacade } from '@/components/MapFacade';
import { CtaBlock } from '@/components/sections';
import { Schema } from '@/components/Schema';
import { webPageNode, breadcrumbNode } from '@/lib/schema';
import { cities, tier2Areas, tier3Neighborhoods } from '@/lib/cities';
import { business } from '@/lib/business';

export const metadata: Metadata = pageMetadata({
  path: '/service-area/',
  title: 'Service Area | 21 Communities, South Denver Metro',
  description:
    'Allsafe Electric serves 21 communities in the south Denver metro, including Parker, Castle Rock, Highlands Ranch, Lone Tree, and Centennial.',
  ogEyebrow: 'Service area',
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Areas we serve', path: '/service-area/' },
];

export default function ServiceAreaPage() {
  return (
    <>
      <Schema
        nodes={[
          webPageNode({
            path: '/service-area/',
            name: 'Allsafe Electric service area',
            description:
              'The 21 communities Allsafe Electric serves across Douglas, Arapahoe, Elbert and Jefferson counties in the south Denver metro.',
            about: true,
          }),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageIntro
        eyebrow="Service area"
        title="21 communities across the south Denver metro"
        lead="Based in Parker, covering the south Denver metro. Most of our service area is within 25 minutes of the shop. Parker neighborhoods are usually a same-day call during business hours."
        crumbs={crumbs}
      />

      <div className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_400px]">
          <div className="space-y-10">
            <section>
              <h2 className="text-h2">Priority cities</h2>
              <p className="mt-2 text-grey">
                These get their own dedicated pages with local permit authority, utility provider,
                housing-stock notes and drive-time detail.
              </p>
              <ul className="mt-5 divide-y divide-rule border-y border-rule">
                {cities.map((c) => (
                  <li key={c.slug} className="py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      {/* Canonical pattern: /electricians/{city-slug}-co/ */}
                      <Link
                        href={`/electricians/${c.slug}-co/`}
                        className="text-h3 font-semibold text-blue-700 hover:underline"
                      >
                        {c.name}, CO
                      </Link>
                      <span className="text-[0.9rem] text-grey">
                        {c.county} County ·{' '}
                        {c.driveTimeMin === 0 ? 'home base' : `~${c.driveTimeMin} min from the shop`}
                      </span>
                    </div>
                    <p className="mt-1 text-[1rem] text-grey">{c.responseExpectation}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-h2">Also serving</h2>
              <p className="mt-2 text-grey">
                We cover these communities regularly. Call for the drive time to your specific address.
              </p>
              {/* All communities are linked — plain-text city names are a build failure (docs/03 §9) */}
              <ul className="mt-4 flex flex-wrap gap-2">
                {tier2Areas.map((a) => {
                  // Convert display name to a city-page slug for linking.
                  // e.g. "Castle Pines" → /electricians/castle-pines-co/
                  const slug = a.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                  return (
                    <li key={a}>
                      <Link
                        href={`/electricians/${slug}-co/`}
                        className="rounded border border-rule bg-white px-3 py-1.5 text-[0.95rem] transition-colors hover:border-blue-300 hover:bg-blue-50"
                      >
                        {a}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section>
              <h2 className="text-h2">Parker neighborhoods</h2>
              <p className="mt-2 text-grey">
                Genuine local knowledge. Housing eras, panel brands, HOA design review. These five
                Parker neighborhoods are named on our homepage and are the areas we know best.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {tier3Neighborhoods.map((n) => (
                  <li
                    key={n}
                    className="rounded border border-rule bg-white px-3 py-1.5 text-[0.95rem]"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-5">
            <div className="h-80">
              <MapFacade />
            </div>
            <div className="card p-5 text-[0.95rem]">
              <p className="font-semibold">{business.name}</p>
              <p className="mt-1 text-grey">
                {business.address.streetAddress}
                <br />
                {business.address.addressLocality}, {business.address.addressRegion}{' '}
                {business.address.postalCode}
              </p>
              <a
                href={business.phone.href}
                className="mt-2 inline-block font-semibold text-blue-700"
              >
                {business.phone.display}
              </a>
            </div>
          </aside>
        </div>
      </div>

      <CtaBlock heading="Not sure if you're in the area? Just ask." />
    </>
  );
}
