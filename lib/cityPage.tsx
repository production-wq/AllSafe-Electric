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
import { Reveal } from '@/components/Reveal';
import { StepList } from '@/components/StepList';
import { PhotoGallery } from '@/components/PhotoGallery';
import { webPageNode, breadcrumbNode, faqPageNode, cityMainEntityNode } from '@/lib/schema';
import { business } from '@/lib/business';

/**
 * Shared render/metadata logic for the 5 city pages.
 *
 * NOTE (planning/docs/09, 2026-09-11): the URL spec calls for exact paths like
 * /electrician-parker/ (literal prefix, no separator, singular "electrician").
 * Next.js App Router does NOT support a folder name that mixes literal text with
 * a dynamic segment (`electrician-[city]`) — it is parsed as one literal route,
 * so generateStaticParams is never invoked and no city pages are actually built.
 * (Verified empirically: a minimal `app/test-[foo]/page.tsx` repro never called
 * generateStaticParams either; the folder rendered as a literal, static, param-less
 * route.) So each city gets its own literal top-level folder
 * (app/electrician-parker/, app/electrician-castle-rock/, ...) whose page.tsx just
 * calls the functions below with a hardcoded slug — the same pattern already used
 * for the per-city-service literal routes (electrical-services-parker-co, etc).
 */
export function generateCityMetadata(citySlug: string) {
  return async function generateMetadata(): Promise<Metadata> {
    const c = getCity(citySlug);
    if (!c) return {};
    return pageMetadata({
      path: `/electrician-${c.slug}/`,
      // Fixed-shape templates, sized so every current city name lands inside the
      // audit's title (50-60 char) and meta description (140-158 char) windows —
      // see scripts/audit-seo.ts. Re-check with a real city name before adding one.
      title: `${c.name}, CO Licensed Electrician | Allsafe Electric`,
      description: `Licensed electrician serving ${c.name}, CO: panels, EV chargers, wiring, and emergency repairs. A real person answers the phone. Call ${business.phone.display}.`,
      index: PUBLISH.TIER_1_CITIES, // gated. Planning/docs/09 §3
      ogEyebrow: `Electrician · ${c.name}, CO`,
    });
  };
}

export function CityPageContent({ citySlug }: { citySlug: string }) {
  const c = getCity(citySlug);
  if (!c) notFound();

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Areas we serve', path: '/service-area/' },
    { name: c.name, path: `/electrician-${c.slug}/` },
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
              path: `/electrician-${c.slug}/`,
              name: `Electrician in ${c.name}, CO`,
              description: `Allsafe Electric. Residential electrical services in ${c.name}, Colorado.`,
              about: true,
              significantLinks: c.priorityServices
                .map((slug) => services.find((s) => s.cityServiceSlug === slug)?.slug)
                .filter(Boolean)
                .map((s) => `/${s}/`),
            }),
            mainEntity: cityMainEntityNode(c),
          },
          breadcrumbNode(crumbs),
          faqPageNode(c.faqs, `/electrician-${c.slug}/`),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <section className="relative overflow-hidden border-b border-rule bg-gradient-to-b from-blue-50 via-white to-white">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:34px_34px] opacity-50"
        />
        <div className="container-page relative grid gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip chip-blue">{c.county} County, Colorado</span>
              <span className="chip chip-blue">
                {c.driveTimeMin === 0 ? 'Home base' : `${c.driveTimeMin} min from the shop`}
              </span>
            </div>
            <h1 className="mt-5 text-display">Electrician in {c.name}, CO</h1>
            <p className="mt-5 max-w-2xl text-lead text-slate">{c.overview ?? c.lead}</p>
            {c.driveTimeContext && <p className="mt-3 max-w-2xl text-body text-grey">{c.driveTimeContext}</p>}
            <CtaRow location="hero" className="mt-7" />
          </div>

          <div className="card overflow-hidden">
            <div className="surface-dark bg-navy px-6 py-4">
              <h2 className="text-h3 text-white">{c.name} at a glance</h2>
            </div>
            <dl className="divide-y divide-rule">
              {[
                { k: 'County', v: `${c.county} County` },
                {
                  k: 'From the Parker shop',
                  v: c.driveTimeMin === 0 ? 'This is home base' : `About ${c.driveTimeMin} min`,
                },
                { k: 'Permit authority', v: c.permitAuthority },
                { k: 'Electric utility', v: `${c.utility.name}${c.utility.verify ? '*' : ''}` },
              ].map((row) => (
                <div key={row.k} className="flex justify-between gap-5 px-6 py-3.5">
                  <dt className="text-small text-grey">{row.k}</dt>
                  <dd className="text-right text-small font-semibold text-ink">{row.v}</dd>
                </div>
              ))}
            </dl>
            {c.utility.verify && (
              <p className="border-t border-rule bg-paper px-6 py-3 text-tiny text-grey">
                *Confirm your address. CORE and Xcel territory does not follow city limits.
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="container-page grid gap-12 py-12 lg:grid-cols-[1fr_340px] lg:py-16">
        <div className="min-w-0 space-y-12">
          <section aria-labelledby="svc-heading">
            <h2 id="svc-heading" className="text-h2">
              Electrical services we provide in {c.name}
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {priorityServices.map((s) => (
                <Link
                  key={s!.slug}
                  href={`/${s!.slug}/`}
                  className="card p-4 hover:border-blue-600"
                >
                  <span className="font-semibold text-blue-700">{s!.navLabel}</span>
                  <span className="mt-1 block text-[0.9rem] text-grey">{s!.h1}</span>
                </Link>
              ))}
            </div>
            <Link href="/electrical-services-parker-co/" className="link-cta mt-4 inline-block">
              See all 16 services
            </Link>
          </section>

          <section aria-labelledby="stock-heading">
            <h2 id="stock-heading" className="text-h2">
              What {c.name} homes are like electrically
            </h2>
            <p className="prose-body mt-4 text-[1.05rem] text-grey">{c.housingStock}</p>
          </section>

          <section aria-labelledby="permit-heading">
            <h2 id="permit-heading" className="text-h2">
              Permits and inspections in {c.name}
            </h2>
            <p className="mt-2 font-semibold">{c.permitAuthority}</p>
            {typeof c.permitProcess === 'string' ? (
              <p className="prose-body mt-2 text-[1.05rem] text-grey">{c.permitProcess}</p>
            ) : (
              <>
                <p className="prose-body mt-2 text-[1.05rem] text-grey">{c.permitProcess.intro}</p>
                <StepList steps={c.permitProcess.steps.map((body) => ({ body }))} tone="green" />
              </>
            )}
            <p className="mt-3 text-[0.9rem] text-grey">
              Permit rules and fees change. We confirm current requirements with the jurisdiction
              before every permitted job.{' '}
              <Link href="/resources/" className="link-cta">
                See our permit guides
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="utility-heading">
            <h2 id="utility-heading" className="text-h2">
              Who powers your home in {c.name}
            </h2>
            <p className="mt-2 font-semibold">
              {c.utility.name}
              {c.utility.verify && (
                <span className="ml-2 rounded bg-paper px-2 py-0.5 text-[0.75rem] font-normal text-grey">
                  verify your address
                </span>
              )}
            </p>
            <p className="prose-body mt-2 text-[1.05rem] text-grey">{c.utility.note}</p>
          </section>

          <section aria-labelledby="hoods-heading">
            <h2 id="hoods-heading" className="text-h2">
              Neighborhoods we work in
            </h2>
            {c.neighborhoodNotes && c.neighborhoodNotes.length > 0 && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {c.neighborhoodNotes.map((nn) => (
                  <div key={nn.name} className="card p-4">
                    <span className="font-semibold text-ink">{nn.name}</span>
                    <p className="mt-1 text-small text-grey">{nn.note}</p>
                  </div>
                ))}
              </div>
            )}
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.neighborhoods
                .filter((n) => !c.neighborhoodNotes?.some((nn) => nn.name === n))
                .map((n) => (
                  <li key={n} className="rounded border border-rule bg-white px-3 py-1.5 text-[0.95rem]">
                    {n}
                  </li>
                ))}
            </ul>
          </section>

          {c.galleryImages && c.galleryImages.length > 0 && (
            <section aria-labelledby="gallery-heading">
              <h2 id="gallery-heading" className="text-h2">
                Our work around {c.name}
              </h2>
              <p className="mt-2 text-small text-grey">
                General job photos from Allsafe Electric, not necessarily taken in {c.name} itself.
              </p>
              <Reveal className="mt-5">
                <PhotoGallery photos={c.galleryImages} />
              </Reveal>
            </section>
          )}

          <FaqList faqs={c.faqs} heading={`Questions from ${c.name} homeowners`} id={`faq-${c.slug}`} />

          <section aria-labelledby="near-heading">
            <h2 id="near-heading" className="text-h2">
              Nearby areas
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {otherCities.map((oc) => (
                <li key={oc!.slug}>
                  <Link
                    href={`/electrician-${oc!.slug}/`}
                    className="inline-block rounded border border-rule bg-white px-3 py-1.5 text-[0.95rem] hover:border-blue-600"
                  >
                    Electrician in {oc!.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/service-area/"
                  className="inline-block rounded border border-rule bg-white px-3 py-1.5 text-[0.95rem] hover:border-blue-600"
                >
                  Full service area
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:h-fit">
          <div className="card p-5">
            <h2 className="text-h3">Book in {c.name}</h2>
            <p className="mt-1 text-[0.95rem] text-grey">{c.responseExpectation}</p>
            <div className="mt-4">
              <CtaRow
                location="mid_page"
                className="flex-col !items-stretch [&>a]:justify-center"
              />
            </div>
          </div>
          <div className="h-64">
            <MapFacade label={`Allsafe Electric, ${c.name} service area`} />
          </div>
        </aside>
      </div>

      <CtaBlock heading={`Book an electrician in ${c.name}`} />
    </>
  );
}
