import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { citySlugs, getCity } from '@/lib/cities';
import { services } from '@/lib/services';
import { PUBLISH } from '@/lib/publish';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqList } from '@/components/Faq';
import { CtaBlock, CtaRow } from '@/components/sections';
import { MapFacade } from '@/components/MapFacade';
import { Schema } from '@/components/Schema';
import { webPageNode, breadcrumbNode, faqPageNode, cityMainEntityNode } from '@/lib/schema';
import { business } from '@/lib/business';

export const dynamicParams = false;

export function generateStaticParams() {
  return citySlugs.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return {};
  const near =
    c.driveTimeMin === 0 ? 'Based right here in Parker' : `About ${c.driveTimeMin} min from the Parker shop`;
  return pageMetadata({
    path: `/electricians/${c.slug}/`,
    title: `${c.name}, CO Electrician | Allsafe Electric`,
    description: `Licensed electrician for ${c.name}, CO — panels, EV chargers, wiring and emergency repairs. ${near}. A real person answers the phone. Call ${business.phone.display}.`,
    index: PUBLISH.TIER_1_CITIES, // gated — planning/docs/09 §3
    ogEyebrow: `Electrician · ${c.name}, CO`,
  });
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Areas we serve', path: '/service-area/' },
    { name: c.name, path: `/electricians/${c.slug}/` },
  ];

  const priorityServices = c.priorityServices
    .map((slug) => services.find((s) => s.cityServiceSlug === slug))
    .filter(Boolean);
  const otherCities = citySlugs.filter((s) => s !== c.slug).slice(0, 2).map(getCity).filter(Boolean);

  return (
    <>
      <Schema
        nodes={[
          {
            ...webPageNode({
              path: `/electricians/${c.slug}/`,
              name: `Electrician in ${c.name}, CO`,
              description: `Allsafe Electric — residential electrical services in ${c.name}, Colorado.`,
              about: true,
              significantLinks: c.priorityServices
                .map((slug) => services.find((s) => s.cityServiceSlug === slug)?.slug)
                .filter(Boolean)
                .map((s) => `/${s}/`),
            }),
            mainEntity: cityMainEntityNode(c),
          },
          breadcrumbNode(crumbs),
          faqPageNode(c.faqs, `/electricians/${c.slug}/`),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      {!PUBLISH.TIER_1_CITIES && (
        <p className="bg-amber-50 px-4 py-2 text-center text-[0.8rem] text-amber-900">
          Staging note: this city page is built but not yet published (noindex) — it releases once
          Tier 0 clears the indexation gate. See planning/docs/09 §3.
        </p>
      )}

      <section className="border-b border-rule bg-[linear-gradient(180deg,#f3f6f8,#ffffff)]">
        <div className="container-page grid gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
          <div>
            <p className="eyebrow">{c.county} County, Colorado</p>
            <h1 className="mt-1 text-[2rem] leading-tight md:text-[2.9rem]">
              Electrician in {c.name}, CO
            </h1>
            <p className="mt-4 max-w-2xl text-step-1 text-muted">{c.lead}</p>
            <CtaRow location="hero" className="mt-6" />
          </div>
          <div className="card h-fit self-center p-6">
            <h2 className="text-step-1">{c.name} at a glance</h2>
            <dl className="mt-3 space-y-2.5 text-[0.98rem]">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">County</dt>
                <dd className="text-right font-medium">{c.county} County</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">From the Parker shop</dt>
                <dd className="text-right font-medium">
                  {c.driveTimeMin === 0 ? 'This is home base' : `~${c.driveTimeMin} min`}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Permit authority</dt>
                <dd className="text-right font-medium">{c.permitAuthority}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Electric utility</dt>
                <dd className="text-right font-medium">
                  {c.utility.name}
                  {c.utility.verify ? '*' : ''}
                </dd>
              </div>
            </dl>
            {c.utility.verify && (
              <p className="mt-3 text-[0.8rem] text-muted">*Confirm your address — CORE/Xcel territory doesn&apos;t follow city limits.</p>
            )}
          </div>
        </div>
      </section>

      <div className="container-page grid gap-12 py-12 lg:grid-cols-[1fr_340px] lg:py-16">
        <div className="min-w-0 space-y-12">
          <section aria-labelledby="svc-heading">
            <h2 id="svc-heading" className="text-step-3">
              Electrical services we provide in {c.name}
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {priorityServices.map((s) => (
                <Link
                  key={s!.slug}
                  href={`/${s!.slug}/`}
                  className="card p-4 hover:border-brand-blue"
                >
                  <span className="font-semibold text-brand-blue-deep">{s!.navLabel}</span>
                  <span className="mt-1 block text-[0.9rem] text-muted">{s!.h1}</span>
                </Link>
              ))}
            </div>
            <Link href="/electrical-services-parker-co/" className="link-cta mt-4 inline-block">
              See all 16 services
            </Link>
          </section>

          <section aria-labelledby="stock-heading">
            <h2 id="stock-heading" className="text-step-3">
              What {c.name} homes are like electrically
            </h2>
            <p className="prose-body mt-4 text-[1.05rem] text-muted">{c.housingStock}</p>
          </section>

          <section aria-labelledby="permit-heading">
            <h2 id="permit-heading" className="text-step-3">
              Permits and inspections in {c.name}
            </h2>
            <p className="mt-2 font-semibold">{c.permitAuthority}</p>
            <p className="prose-body mt-2 text-[1.05rem] text-muted">{c.permitProcess}</p>
            <p className="mt-3 text-[0.9rem] text-muted">
              Permit rules and fees change — we confirm current requirements with the jurisdiction
              before every permitted job.{' '}
              <Link href="/resources/" className="link-cta">
                See our permit guides
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="utility-heading">
            <h2 id="utility-heading" className="text-step-3">
              Who powers your home in {c.name}
            </h2>
            <p className="mt-2 font-semibold">
              {c.utility.name}
              {c.utility.verify && (
                <span className="ml-2 rounded bg-paper px-2 py-0.5 text-[0.75rem] font-normal text-muted">
                  verify your address
                </span>
              )}
            </p>
            <p className="prose-body mt-2 text-[1.05rem] text-muted">{c.utility.note}</p>
          </section>

          <section aria-labelledby="hoods-heading">
            <h2 id="hoods-heading" className="text-step-3">
              Neighbourhoods we work in
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.neighborhoods.map((n) => (
                <li
                  key={n}
                  className="rounded border border-rule bg-white px-3 py-1.5 text-[0.95rem]"
                >
                  {n}
                </li>
              ))}
            </ul>
          </section>

          <FaqList faqs={c.faqs} heading={`Questions from ${c.name} homeowners`} id={`faq-${c.slug}`} />

          <section aria-labelledby="near-heading">
            <h2 id="near-heading" className="text-step-3">
              Nearby areas
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {otherCities.map((oc) => (
                <li key={oc!.slug}>
                  <Link
                    href={`/electricians/${oc!.slug}/`}
                    className="inline-block rounded border border-rule bg-white px-3 py-1.5 text-[0.95rem] hover:border-brand-blue"
                  >
                    Electrician in {oc!.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/service-area/"
                  className="inline-block rounded border border-rule bg-white px-3 py-1.5 text-[0.95rem] hover:border-brand-blue"
                >
                  Full service area
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:h-fit">
          <div className="card p-5">
            <h2 className="text-step-1">Book in {c.name}</h2>
            <p className="mt-1 text-[0.95rem] text-muted">{c.responseExpectation}</p>
            <div className="mt-4">
              <CtaRow
                location="mid_page"
                className="flex-col !items-stretch [&>a]:justify-center"
              />
            </div>
          </div>
          <div className="h-64">
            <MapFacade label={`Allsafe Electric — ${c.name} service area`} />
          </div>
        </aside>
      </div>

      <CtaBlock heading={`Book an electrician in ${c.name}`} />
    </>
  );
}
