import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { PageIntro } from '@/components/PageIntro';
import { MapFacade } from '@/components/MapFacade';
import { CtaBlock } from '@/components/sections';
import { Schema } from '@/components/Schema';
import { webPageNode, breadcrumbNode } from '@/lib/schema';
import { cities, tier2Areas, tier3Neighborhoods } from '@/lib/cities';
import { PUBLISH } from '@/lib/publish';
import { business } from '@/lib/business';

export const metadata: Metadata = pageMetadata({
  path: '/service-area/',
  title: 'Service Area | Parker, Castle Rock, Highlands Ranch',
  description:
    'Allsafe Electric serves Parker, Castle Rock, Highlands Ranch, Lone Tree, Centennial and the south Denver metro. Drive times, response windows, neighbourhoods.',
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
              'The cities and neighbourhoods Allsafe Electric covers across Douglas County and the south Denver metro.',
            about: true,
          }),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageIntro
        eyebrow="Service area"
        title="Where Allsafe Electric works"
        lead="Based in Parker, covering the south Denver metro. The closer you are, the faster Jud can be there. Parker neighbourhoods are usually a same-day call during business hours."
        crumbs={crumbs}
      />

      <div className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_400px]">
          <div className="space-y-10">
            <section>
              <h2 className="text-h2">Primary cities</h2>
              <p className="mt-2 text-muted">
                These five get their own pages with local permit and utility detail.
              </p>
              <ul className="mt-5 divide-y divide-rule border-y border-rule">
                {cities.map((c) => (
                  <li key={c.slug} className="py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <Link
                        href={`/electricians/${c.slug}/`}
                        className="text-h3 font-semibold text-brand-700 hover:underline"
                      >
                        {c.name}, CO
                      </Link>
                      <span className="text-[0.9rem] text-muted">
                        {c.county} County ·{' '}
                        {c.driveTimeMin === 0 ? 'home base' : `~${c.driveTimeMin} min from the shop`}
                      </span>
                    </div>
                    <p className="mt-1 text-[1rem] text-muted">{c.responseExpectation}</p>
                  </li>
                ))}
              </ul>
              {!PUBLISH.TIER_1_CITIES && (
                <p className="mt-3 text-[0.85rem] text-muted">
                  City pages are being rolled out in stages as each is indexed, see the launch plan.
                </p>
              )}
            </section>

            <section>
              <h2 className="text-h2">Also serving</h2>
              <p className="mt-2 text-muted">
                We cover these regularly. Call for the drive time to your address.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {tier2Areas.map((a) => (
                  <li
                    key={a}
                    className="rounded border border-rule bg-white px-3 py-1.5 text-[0.95rem]"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-h2">Parker neighbourhoods</h2>
              <p className="mt-2 text-muted">
                Genuine local knowledge. Housing eras, panel brands, HOA design review. These five
                are named on our homepage and are the areas we know best.
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
              <p className="mt-1 text-muted">
                {business.address.streetAddress}
                <br />
                {business.address.addressLocality}, {business.address.addressRegion}{' '}
                {business.address.postalCode}
              </p>
              <a
                href={business.phone.href}
                className="mt-2 inline-block font-semibold text-brand-700"
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
