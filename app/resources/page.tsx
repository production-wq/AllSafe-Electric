import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { PageIntro } from '@/components/PageIntro';
import { CtaBlock } from '@/components/sections';
import { Schema } from '@/components/Schema';
import { webPageNode, breadcrumbNode } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  path: '/resources/',
  title: 'Electrical Permits & Utilities in Douglas County, CO',
  description:
    'Plain-English guidance for Parker and Douglas County homeowners: who issues electrical permits, CORE vs Xcel territory, and Colorado code basics.',
  ogEyebrow: 'Resources',
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Resources', path: '/resources/' },
];

const permitAuthorities = [
  {
    area: 'Inside Parker town limits',
    who: 'Town of Parker Building Division',
    url: 'https://www.parkeronline.org/151/Building-Division',
  },
  {
    area: 'Unincorporated Douglas County (incl. Highlands Ranch, Roxborough, rural Parker)',
    who: 'Douglas County Building Division',
    url: 'https://www.douglas.co.us/building/',
  },
  {
    area: 'Castle Rock',
    who: 'Town of Castle Rock, Development Services',
    url: 'https://www.crgov.com/151/Building-Division',
  },
  {
    area: 'Lone Tree',
    who: 'City of Lone Tree, Community Development',
    url: 'https://www.cityoflonetree.com/',
  },
  {
    area: 'Centennial (Arapahoe County)',
    who: 'City of Centennial, Building Division',
    url: 'https://www.centennialco.gov/',
  },
];

const plannedGuides = [
  'Electrical permits in the Town of Parker: what needs one and how to get it',
  'Douglas County electrical permits and inspections',
  'CORE Electric Cooperative vs. Xcel: who powers your home and which rebates you qualify for',
  'Colorado electrical code basics for homeowners',
  'Getting an EV charger, generator, or exterior lighting past your HOA in Douglas County',
  'Federal Pacific, Zinsco and Challenger panels: how to tell what you have',
];

const plannedTools = [
  'Electrical panel load calculator',
  'EV charger cost estimator',
  'Do I need a panel upgrade? (6-question diagnostic)',
  'Generator sizing calculator',
  'Outlet & GFCI requirement checker',
];

export default function ResourcesPage() {
  return (
    <>
      <Schema
        nodes={[
          webPageNode({
            path: '/resources/',
            name: 'Electrical resources for Douglas County homeowners',
            description:
              'Permit authorities, utility territory, and code basics for Parker and the south Denver metro.',
          }),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageIntro
        eyebrow="Resources"
        title="Permits, utilities & code, the local basics"
        lead="Here are the rules that apply to homes in Parker and Douglas County, with helpful links to the authority for every claim. We re-check these quarterly."
        crumbs={crumbs}
      />

      <div className="section">
        <div className="container-page"><div className="max-w-3xl space-y-12">
          <section>
            <h2 className="text-h2">Who issues your electrical permit</h2>
            <p className="mt-2 text-grey">
              It depends on whether your address is inside a city or in unincorporated county land.
              We determine the right authority for every permitted job and file it for you.
            </p>
            <ul className="mt-5 divide-y divide-rule border-y border-rule">
              {permitAuthorities.map((p) => (
                <li key={p.area} className="py-4">
                  <p className="font-semibold">{p.area}</p>
                  <p className="mt-0.5 text-grey">
                    {p.who}, {' '}
                    <a href={p.url} target="_blank" rel="noopener" className="link-cta text-[0.95rem]">
                      official building page
                    </a>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[0.85rem] text-grey">
              Permit requirements and fees change. Always confirm current details on the authority&apos;s
              own page before relying on them.
            </p>
          </section>

          <section>
            <h2 className="text-h2">CORE Electric Cooperative vs. Xcel Energy</h2>
            <p className="mt-3 text-[1.05rem] text-grey">
              This matters more than most homeowners realize. Parker and Castle Rock are largely
              served by <strong className="text-ink">CORE Electric Cooperative</strong> (formerly
              IREA), while Highlands Ranch, Lone Tree and Centennial are mostly{' '}
              <strong className="text-ink">Xcel Energy</strong>. Territory does not follow city
              limits. It can change street by street. Almost every &ldquo;Colorado electrical
              rebate&rdquo; article online assumes Xcel and is therefore wrong for much of Parker.
            </p>
            <p className="mt-3 text-[1.05rem] text-grey">
              Before you count on a rebate for an EV charger, heat pump, or panel upgrade, confirm
              your provider and its current programs:
            </p>
            <ul className="mt-3 flex flex-wrap gap-4">
              <li>
                <a href="https://www.core.coop/" target="_blank" rel="noopener" className="link-cta">
                  CORE Electric Cooperative
                </a>
              </li>
              <li>
                <a href="https://www.xcelenergy.com/" target="_blank" rel="noopener" className="link-cta">
                  Xcel Energy
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-h2">Colorado electrical code</h2>
            <p className="mt-3 text-[1.05rem] text-grey">
              Colorado is governed by the state{' '}
              <a
                href="https://spdb.colorado.gov/electrical"
                target="_blank"
                rel="noopener"
                className="link-cta"
              >
                Electrical Board (DORA)
              </a>, which adopts a specific edition of the National Electrical Code with state
              amendments, and licenses every electrician and contractor. Local jurisdictions inspect
              to that code. If you want to verify our licenses, {' '}
              <span className="whitespace-nowrap">ME.0601023</span> and{' '}
              <span className="whitespace-nowrap">EC.0101068</span>, the{' '}
              <a
                href="https://apps.colorado.gov/dora/licensing/Lookup/LicenseLookup.aspx"
                target="_blank"
                rel="noopener"
                className="link-cta"
              >
                DORA license lookup
              </a>{' '}
              is public.
            </p>
          </section>

          <section>
            <h2 className="text-h2">In-depth guides &amp; tools, in progress</h2>
            <p className="mt-2 text-grey">
              These are being written and built with proper research and source citations, and
              released as each is ready.
            </p>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-h3">Local guides</h3>
                <ul className="mt-2 space-y-1.5 text-[0.98rem] text-grey">
                  {plannedGuides.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-h3">Free tools</h3>
                <ul className="mt-2 space-y-1.5 text-[0.98rem] text-grey">
                  {plannedTools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-4 text-[0.95rem]">
              Need one of these answered now?{' '}
              <Link href="/contact/" className="link-cta">
                Ask us directly
              </Link>
              .
            </p>
          </section>
        </div>
        </div>
      </div>

      <CtaBlock heading="Prefer to just ask a licensed electrician?" />
    </>
  );
}
