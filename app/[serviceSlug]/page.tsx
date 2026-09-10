import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serviceSlugs, getService, serviceGroups } from '@/lib/services';
import { cities } from '@/lib/cities';
import { PUBLISH } from '@/lib/publish';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SiteImage } from '@/components/SiteImage';
import { CtaRow, PriceRange, CtaBlock, IncludedList } from '@/components/sections';
import { FaqList } from '@/components/Faq';
import { Schema } from '@/components/Schema';
import { GoogleG, CheckIcon, ShieldIcon } from '@/components/Icons';
import { business } from '@/lib/business';
import { serviceNode, webPageNode, breadcrumbNode, faqPageNode } from '@/lib/schema';

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((serviceSlug) => ({ serviceSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const { serviceSlug } = await params;
  const s = getService(serviceSlug);
  if (!s) return {};
  return pageMetadata({
    path: `/${s.slug}/`,
    title: s.title,
    description: s.metaDescription,
    ogEyebrow: s.emergency ? 'Emergency electrician, Parker CO' : 'Allsafe Electric, Parker CO',
  });
}

const crumbs = (s: NonNullable<ReturnType<typeof getService>>) => [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/electrical-services-parker-co/' },
  { name: s.navLabel, path: `/${s.slug}/` },
];

export default async function ServicePage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = await params;
  const s = getService(serviceSlug);
  if (!s) notFound();

  const group = serviceGroups.find((g) => g.id === s.group);
  const siblings = s.related.map(getService).filter(Boolean);
  const cityVariants = s.cityServiceSlug
    ? cities.map((c) => ({
        city: c,
        href: PUBLISH.TIER_2_CITY_SERVICE
          ? `/electricians/${c.slug}/${s.cityServiceSlug}/`
          : PUBLISH.TIER_1_CITIES
            ? `/electricians/${c.slug}/`
            : '/service-area/',
      }))
    : [];

  return (
    <>
      <Schema
        nodes={[
          serviceNode(s),
          webPageNode({
            path: `/${s.slug}/`,
            name: s.h1,
            description: s.metaDescription,
            primaryImage: `/img/photos/${s.heroImage.replace(/\.\w+$/, '.jpg').toLowerCase()}`,
          }),
          breadcrumbNode(crumbs(s)),
          faqPageNode(s.faqs, `/${s.slug}/`),
        ]}
      />
      <Breadcrumbs items={crumbs(s)} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className={`relative overflow-hidden border-b border-rule ${
          s.emergency
            ? 'bg-gradient-to-b from-urgent-soft via-white to-white'
            : 'bg-gradient-to-b from-brand-50 via-white to-white'
        }`}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:34px_34px] opacity-50"
        />
        <div className="container-page relative grid items-center gap-10 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-16">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {s.emergency ? (
                <span className="chip chip-urgent">Emergency line open</span>
              ) : (
                group && <span className="chip chip-blue">{group.label}</span>
              )}
              <span className="chip chip-sand">
                {s.indexed ? 'Serving Parker since 2018' : 'New service'}
              </span>
            </div>

            <h1 className="mt-5 text-display">{s.h1}</h1>
            <p className="mt-5 max-w-xl text-lead text-ink-soft">{s.lead}</p>
            <CtaRow location="hero" service={s.slug} emergency={s.emergency} className="mt-7" />

            <dl className="mt-9 grid gap-px overflow-hidden rounded-card border border-rule bg-rule sm:grid-cols-3">
              {s.highlights.map((h) => (
                <div key={h.label} className="bg-white px-4 py-4">
                  <dt className="text-tiny font-semibold uppercase tracking-wide text-muted">
                    {h.label}
                  </dt>
                  <dd className="mt-1 text-body font-semibold text-ink">{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="overflow-hidden rounded-card border border-rule shadow-lift">
            <SiteImage
              name={s.heroImage}
              alt={s.heroAlt}
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-[300px] w-full object-cover sm:h-[420px]"
              aspable={false}
            />
            {s.heroImageGap && (
              <p className="bg-paper px-4 py-2 text-tiny text-muted">
                Representative photo. A job-specific image for this service is queued.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="container-page grid gap-14 py-14 lg:grid-cols-[1fr_340px] lg:py-20">
        <div className="min-w-0 space-y-16">
          {/* Signs */}
          <section aria-labelledby="signs-heading">
            <p className="eyebrow eyebrow-blue">Do any of these sound familiar?</p>
            <h2 id="signs-heading" className="mt-3 text-h1">
              Signs you need this
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {s.signs.map((sign, i) => (
                <div key={sign.h3} className="card p-5">
                  <span className="text-tiny font-bold text-brand-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-1.5 text-h3">{sign.h3}</h3>
                  <p className="mt-2 text-body text-ink-soft">{sign.body}</p>
                </div>
              ))}
            </div>
          </section>

          <PriceRange service={s} />

          <IncludedList items={s.included} />

          {/* Mid-page photo */}
          {s.bodyImage && (
            <figure className="overflow-hidden rounded-card border border-rule">
              <SiteImage
                name={s.bodyImage}
                alt={s.bodyAlt ?? s.heroAlt}
                sizes="(min-width: 1024px) 760px, 100vw"
                className="h-[260px] w-full object-cover sm:h-[340px]"
                aspable={false}
              />
            </figure>
          )}

          {/* Process */}
          <section aria-labelledby="process-heading">
            <p className="eyebrow">Start to finish</p>
            <h2 id="process-heading" className="mt-3 text-h1">
              How the job goes
            </h2>
            <ol className="mt-8 space-y-6">
              {s.process.map((step, i) => (
                <li key={i} className="flex gap-5">
                  <span className="icon-tile bg-brand-600 text-body-lg font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-2.5 text-body-lg text-ink-soft">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Permits */}
          <section aria-labelledby="permits-heading" className="rounded-card bg-paper p-6 md:p-8">
            <h2 id="permits-heading" className="text-h2">
              Permits and inspection
            </h2>
            <p className="prose-body mt-4 text-body-lg text-ink-soft">{s.permits}</p>
            <p className="mt-5">
              <Link href="/resources/" className="link-cta">
                See our Parker and Douglas County permit guides
              </Link>
            </p>
          </section>

          {/* Why Jud */}
          <section
            aria-labelledby="why-heading"
            className="surface-dark overflow-hidden rounded-card bg-brand-800 p-6 md:p-8"
          >
            <p className="eyebrow eyebrow-light">Why homeowners here call Jud</p>
            <h2 id="why-heading" className="mt-3 text-h2 text-white">
              A real person, start to finish
            </h2>
            <p className="mt-4 max-w-2xl text-body-lg text-white/80">
              A real person answers the phone, you get a two-hour window rather than a vague day,
              and Jud or Justin does the work. Not a rotating crew, and not a subcontractor you have
              never met. Allsafe&apos;s Google reviews name them both personally.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link href="/reviews/" className="link-cta !text-white !decoration-white/40">
                <GoogleG /> Read reviews from Parker customers
              </Link>
              <span className="flex items-center gap-2 text-small text-white/70">
                <ShieldIcon width={17} height={17} /> Licence {business.licenses.master.id}
              </span>
            </div>
          </section>

          <FaqList faqs={s.faqs} />

          {/* Areas */}
          {cityVariants.length > 0 && (
            <section aria-labelledby="areas-heading">
              <h2 id="areas-heading" className="text-h2">
                Areas we cover for {s.navLabel.toLowerCase()}
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {cityVariants.map(({ city, href }) => (
                  <li key={city.slug}>
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 rounded-chip border border-rule bg-white px-4 py-2 text-small font-medium transition-colors hover:border-brand-300 hover:bg-brand-50"
                    >
                      {s.navLabel} in {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Related */}
          <section aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-h2">
              Related electrical work
            </h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-3">
              {siblings.map((sib) => (
                <li key={sib!.slug}>
                  <Link
                    href={`/${sib!.slug}/`}
                    className="card card-interactive block h-full p-5"
                  >
                    <span className="block font-semibold text-brand-700">{sib!.navLabel}</span>
                    <span className="mt-1.5 block text-small text-muted">{sib!.blurb}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:h-fit lg:self-start">
          <div className="card overflow-hidden">
            <div
              className={`px-5 py-4 ${s.emergency ? 'bg-urgent' : 'bg-brand-800'} surface-dark`}
            >
              <h2 className="text-h3 text-white">Book {s.navLabel.toLowerCase()}</h2>
              <p className="mt-1 text-small text-white/80">
                {s.emergency
                  ? 'Call now. In the daytime Jud usually picks up on the first ring.'
                  : 'A real person answers, Mon to Fri, 8 to 6. Book online any time.'}
              </p>
            </div>
            <div className="p-5">
              <CtaRow
                location="mid_page"
                service={s.slug}
                emergency={s.emergency}
                className="flex-col !items-stretch [&>a]:justify-center"
              />
              <ul className="mt-5 space-y-2 border-t border-rule pt-4 text-small text-muted">
                <li className="flex items-center gap-2">
                  <CheckIcon className="shrink-0 text-leaf-600" width={15} height={15} />
                  Fixed price before work starts
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="shrink-0 text-leaf-600" width={15} height={15} />
                  Permits and inspection handled
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="shrink-0 text-leaf-600" width={15} height={15} />
                  Shoe covers on, good with dogs
                </li>
              </ul>
              <p className="mt-4 border-t border-rule pt-3 text-tiny text-muted">
                {business.name}, Parker CO{' '}
                <a href={business.phone.href} className="font-semibold text-brand-700">
                  {business.phone.display}
                </a>
              </p>
            </div>
          </div>
        </aside>
      </div>

      <CtaBlock
        service={s.slug}
        emergency={s.emergency}
        heading={`Book ${s.navLabel.toLowerCase()} in Parker`}
      />
    </>
  );
}
