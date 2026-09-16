import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { citySlugs, getCity, cityLinkForNeighborhood } from '@/lib/cities';
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
import { Parallax } from '@/components/Parallax';
import { SiteImage } from '@/components/SiteImage';
import { StatBand } from '@/components/sections';
import { FeaturedTestimonial } from '@/components/Testimonials';
import { StickyTOC } from '@/components/StickyTOC';
import { CityToServices } from '@/components/RelatedLinks';
import { HomeIcon, ShieldIcon, BoltIcon, ClockIcon, MapPinIcon } from '@/components/Icons';
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
 * for the per-city-service literal routes (electrical-services, etc).
 */
/**
 * Page title for a city, kept inside the audit's 50-60 character window for any
 * city name. Tries the fullest form first and steps down only as needed, so
 * short names keep the richer title and long ones still pass.
 */
function cityTitle(name: string): string {
  const candidates = [
    `${name}, CO Licensed Electrician | Allsafe Electric`,
    `${name}, CO Electrician | Allsafe Electric`,
    `Electrician in ${name}, CO | Allsafe Electric`,
    `${name} Electrician | Allsafe Electric`,
  ];
  return candidates.find((t) => t.length >= 50 && t.length <= 60) ?? candidates[1];
}

export async function generateCityMetadata(citySlug: string): Promise<Metadata> {
  
    const c = getCity(citySlug);
    if (!c) return {};
    return pageMetadata({
      path: `/electricians/${c.slug}-co/`,
      // Length-aware rather than fixed-shape. The old fixed template broke the
      // moment a long city name arrived: "Greenwood Village" pushed the title to
      // 61 characters against the audit's 50-60 window (scripts/audit-seo.ts).
      // Now it falls back to progressively shorter forms, so adding a city can
      // never fail the audit on title length again. 2026-09-14.
      title: cityTitle(c.name),
      description: `Licensed electrician serving ${c.name}, CO: panels, EV chargers, wiring, and emergency repairs. A real person answers the phone. Call ${business.phone.display}.`,
      index: PUBLISH.TIER_1_CITIES, // gated. Planning/docs/09 §3
      ogEyebrow: `Electrician · ${c.name}, CO`,
    });
}

export function CityPageContent({ citySlug }: { citySlug: string }) {
  const c = getCity(citySlug);
  if (!c) notFound();

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Areas we serve', path: '/service-area/' },
    { name: c.name, path: `/electricians/${c.slug}-co/` },
  ];

  const priorityServices = c.priorityServices
    .map((slug) => services.find((s) => s.cityServiceSlug === slug))
    .filter(Boolean);
  /* Every sibling city, not two. The old `.slice(0, 2)` meant a 16-city network
   * had almost no lateral internal linking, which the client flagged as a
   * priority ("naturally occurring internal linking... on all the service and
   * location pages"). 2026-09-14. */
  const otherCities = citySlugs.filter((s) => s !== c.slug).map(getCity).filter(Boolean);

  /* Hero and gallery imagery. 15 of the 16 city pages had no photograph at all
   * before 2026-09-14. Until per-city photography exists these are honest,
   * general job and neighbourhood shots, captioned so they never imply they
   * were taken in this specific city. */
  const heroPhoto = c.galleryImages?.[0]?.name ?? 'suburban-home-exterior-daylight.JPG';
  const heroPhotoAlt =
    c.galleryImages?.[0]?.alt ?? `A residential street of the kind Allsafe Electric works in daily`;
  const gallery =
    c.galleryImages?.length && c.galleryImages.length >= 3
      ? c.galleryImages
      : [
          { name: 'electrician-tightening-connections-in-breaker-panel.JPG', alt: 'Tightening connections inside a residential breaker panel' },
          { name: 'electrician-testing-gfci-kitchen-outlet.JPG', alt: 'Testing a GFCI kitchen outlet after installation' },
          { name: 'modern-three-blade-ceiling-fan-with-light.JPG', alt: 'A ceiling fan installed and balanced' },
        ];

  const tocItems = [
    { id: 'svc-heading', label: `Services in ${c.name}` },
    { id: 'stock-heading', label: 'Local homes' },
    { id: 'permit-heading', label: 'Permits' },
    { id: 'utility-heading', label: 'Your utility' },
    { id: 'hoods-heading', label: 'Neighborhoods' },
    { id: 'gallery-heading', label: 'Our work' },
    { id: `faq-${c.slug}-heading`, label: 'Questions' },
    { id: 'near-heading', label: 'Nearby areas' },
  ];

  return (
    <>
      <Schema
        nodes={[
          {
            ...webPageNode({
              path: `/electricians/${c.slug}-co/`,
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
          faqPageNode(c.faqs, `/electricians/${c.slug}-co/`),
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

      {/* Proof band. Cities had no trust signal between the hero and the prose. */}
      <section className="border-b border-rule bg-paper py-10">
        <div className="container-page">
          <Reveal>
            <StatBand
              tone="light"
              items={[
                {
                  value: c.driveTimeMin === 0 ? 'Local' : `${c.driveTimeMin} min`,
                  label: c.driveTimeMin === 0 ? 'This is our home base' : 'From our Parker shop',
                  icon: <ClockIcon width={20} height={20} />,
                },
                {
                  value: `${business.google.reviewCount}`,
                  label: '5-star Google reviews',
                  icon: <ShieldIcon width={20} height={20} />,
                },
                {
                  value: 'Licensed',
                  label: `Master ${business.licenses.master.id}`,
                  icon: <ShieldIcon width={20} height={20} />,
                },
                {
                  value: 'Same-Day',
                  label: 'For urgent calls, 2-hr window',
                  icon: <BoltIcon width={20} height={20} />,
                },
              ]}
            />
          </Reveal>
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
            <Link href="/electrical-services/" className="link-cta mt-4 inline-block">
              See all 16 services
            </Link>
          </section>

          {/* Housing stock. Was a bare heading over one grey paragraph, the first
              of four identical prose blocks in a row. Now a proper panel with a
              photo, so the page has a visual anchor at this point. 2026-09-14. */}
          <Reveal>
            <section
              aria-labelledby="stock-heading"
              className="overflow-hidden rounded-card border border-rule bg-white shadow-ambient"
            >
              <div className="grid md:grid-cols-[1.15fr_0.85fr]">
                <div className="p-6 md:p-8">
                  <span className="icon-badge">
                    <HomeIcon width={22} height={22} />
                  </span>
                  <h2 id="stock-heading" className="mt-4 text-h2">
                    What {c.name} homes are like electrically
                  </h2>
                  <p className="prose-body mt-4 text-body-lg text-slate">{c.housingStock}</p>
                </div>
                <Parallax distance={28} className="min-h-[220px] md:min-h-full">
                  <SiteImage
                    name={heroPhoto}
                    alt={heroPhotoAlt}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </Parallax>
              </div>
            </section>
          </Reveal>

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

          {/* Utility. Third of the four old prose blocks, now a highlighted
              panel because the CORE vs Xcel distinction is genuinely the most
              commonly misunderstood local fact and deserves to stand out. */}
          <Reveal>
            <section
              aria-labelledby="utility-heading"
              className="rounded-card border border-blue-100 bg-blue-50/60 p-6 md:p-8"
            >
              <div className="flex flex-wrap items-start gap-4">
                <span className="icon-badge icon-badge-blue">
                  <BoltIcon width={22} height={22} />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 id="utility-heading" className="text-h2">
                    Who powers your home in {c.name}
                  </h2>
                  <p className="mt-2 flex flex-wrap items-center gap-2 text-body-lg font-semibold text-ink">
                    {c.utility.name}
                    {c.utility.verify && (
                      <span className="chip chip-grey">Verify your address</span>
                    )}
                  </p>
                  <p className="prose-body mt-3 text-body-lg text-slate">{c.utility.note}</p>
                </div>
              </div>
            </section>
          </Reveal>

          <section aria-labelledby="hoods-heading">
            <h2 id="hoods-heading" className="text-h2">
              Neighborhoods we work in
            </h2>
            {/* Neighborhoods that are also towns with their own page get linked;
                the rest stay plain text. Client asked 2026-09-14 whether these
                could be internally linked, and this is the honest version of
                yes: only real matches, never a link to an unrelated page. */}
            {c.neighborhoodNotes && c.neighborhoodNotes.length > 0 && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {c.neighborhoodNotes.map((nn) => {
                  const slug = cityLinkForNeighborhood(nn.name, c.slug);
                  return (
                    <div key={nn.name} className="card p-4">
                      {slug ? (
                        <Link href={`/electricians/${slug}-co/`} className="font-semibold">
                          {nn.name}
                        </Link>
                      ) : (
                        <span className="font-semibold text-ink">{nn.name}</span>
                      )}
                      <p className="mt-1 text-small text-grey">{nn.note}</p>
                    </div>
                  );
                })}
              </div>
            )}
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.neighborhoods
                .filter((n) => !c.neighborhoodNotes?.some((nn) => nn.name === n))
                .map((n) => {
                  const slug = cityLinkForNeighborhood(n, c.slug);
                  return (
                    <li key={n}>
                      {slug ? (
                        <Link
                          href={`/electricians/${slug}-co/`}
                          className="inline-flex items-center gap-1.5 rounded-btn border border-rule bg-white px-3 py-1.5 text-[0.95rem] no-underline transition-colors hover:border-blue-300 hover:bg-blue-50"
                        >
                          <MapPinIcon width={13} height={13} className="text-green-600" />
                          {n}
                        </Link>
                      ) : (
                        <span className="inline-block rounded-btn border border-rule bg-white px-3 py-1.5 text-[0.95rem] text-slate">
                          {n}
                        </span>
                      )}
                    </li>
                  );
                })}
            </ul>
          </section>

          <Reveal>
            <CityToServices citySlug={c.slug} />
          </Reveal>

          {/* Gallery, now on every city rather than 1 of 16. */}
          <Reveal>
            <section aria-labelledby="gallery-heading">
              <h2 id="gallery-heading" className="text-h2">
                Our work around {c.name}
              </h2>
              <p className="mt-2 text-small text-grey">
                Real Allsafe Electric job photos. General work shots, not necessarily taken in{' '}
                {c.name} itself.
              </p>
              <PhotoGallery photos={gallery} className="mt-6" />
            </section>
          </Reveal>

          <Reveal>
            <FeaturedTestimonial authorIndex={1} />
          </Reveal>

          <Reveal>
            <FaqList
              faqs={c.faqs}
              heading={`Questions from ${c.name} homeowners`}
              id={`faq-${c.slug}`}
            />
          </Reveal>

          {/* Every sibling city, not two. This is the main lateral link surface
              in the location network. 2026-09-14. */}
          <section aria-labelledby="near-heading">
            <h2 id="near-heading" className="text-h2">
              We also cover these nearby areas
            </h2>
            <p className="mt-2 text-body text-slate">
              Allsafe Electric works across Parker, Douglas County and the south metro. If your town
              is on this list, the same licensed electricians and the same pricing apply.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {otherCities.map((oc) => (
                <li key={oc!.slug}>
                  <Link
                    href={`/electricians/${oc!.slug}-co/`}
                    className="flex items-center gap-2 rounded-btn border border-rule bg-white px-3 py-2 text-small transition-colors hover:border-blue-300 hover:bg-blue-50"
                  >
                    <MapPinIcon width={14} height={14} className="shrink-0 text-green-600" />
                    {oc!.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/service-area/" className="link-cta mt-5 inline-block">
              See the full service area
            </Link>
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:h-fit">
          <StickyTOC items={tocItems} className="hidden lg:block" />
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
