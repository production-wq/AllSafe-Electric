import { RichText } from "@/components/RichText";
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serviceSlugs, getService, serviceGroups } from '@/lib/services';
import { cities } from '@/lib/cities';
import { PUBLISH } from '@/lib/publish';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SiteImage } from '@/components/SiteImage';
import { CtaRow, PriceRange, CtaBlock, IncludedList, StatBand } from '@/components/sections';
import { FaqList } from '@/components/Faq';
import { Schema } from '@/components/Schema';
import { Reveal } from '@/components/Reveal';
import { StepList } from '@/components/StepList';
import { PhotoGallery } from '@/components/PhotoGallery';
import { StickyTOC } from '@/components/StickyTOC';
import { ServiceToCities } from '@/components/RelatedLinks';
import { Parallax } from '@/components/Parallax';
import { ServiceReviews } from '@/components/ServiceReviews';
import { reviewTagsForService } from '@/lib/reviewTags';
import { ShieldIcon as ShieldMark, ClockIcon, PriceTagIcon, BoltIcon } from '@/components/Icons';
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
  { name: 'Services', path: '/electrical-services/' },
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
  // process is string[] on services not yet migrated to the richer step shape
  // (planning/plans/crispy-forging-clock.md Part B) — normalize to StepItem[].
  const processSteps = s.process.map((step) => (typeof step === 'string' ? { body: step } : step));

  /*
   * Gallery for EVERY service, 2026-09-14. Only 1 of 16 services had
   * `galleryImages`, so 15 service pages showed a single flat photo and nothing
   * else. Where a service has no curated set we fall back to its own hero and
   * body photos plus a small pool of genuine, service-agnostic job shots, so the
   * page still gets a real gallery without inventing anything. Trimmed to 3 so
   * PhotoGallery tiles it into complete rows (see its own tiling rule).
   */
  const fallbackGallery = [
    { name: s.heroImage, alt: s.heroAlt },
    ...(s.bodyImage ? [{ name: s.bodyImage, alt: s.bodyAlt ?? s.heroAlt }] : []),
    { name: 'electrician-tool-belt-and-ladder-low-angle.JPG', alt: 'Allsafe Electric tools on site in a Parker home' },
    { name: 'allsafe-electrician-putting-on-protective-shoe-covers.JPG', alt: 'Shoe covers going on before work starts' },
  ];
  const gallery = s.galleryImages?.length ? s.galleryImages : fallbackGallery.slice(0, 3);

  const tocItems = [
    ...(s.signs?.length ? [{ id: 'signs-heading', label: 'Signs you need this' }] : []),
    { id: 'price-heading', label: 'What it costs' },
    ...(s.included?.length ? [{ id: 'included-heading', label: "What's included" }] : []),
    ...(s.notIncluded?.length ? [{ id: 'not-included-heading', label: "What isn't covered" }] : []),
    { id: 'gallery-heading', label: 'Our work' },
    ...(s.process?.length ? [{ id: 'process-heading', label: 'How the job goes' }] : []),
    ...(s.permits ? [{ id: 'permits-heading', label: 'Permits and inspection' }] : []),
    ...(s.faqs?.length ? [{ id: 'faq-heading', label: 'Common questions' }] : []),
    { id: 'areas-heading', label: 'Areas we cover' },
    ...(s.related?.length ? [{ id: 'related-heading', label: 'Related work' }] : []),
  ];
  const cityVariants = s.cityServiceSlug
    ? cities.map((c) => ({
        city: c,
        href: PUBLISH.TIER_2_CITY_SERVICE
          ? `/electricians/${c.slug}-co/${s.cityServiceSlug}/`
          : PUBLISH.TIER_1_CITIES
            ? `/electricians/${c.slug}-co/`
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
            ? 'bg-gradient-to-b from-green-50 via-white to-white'
            : 'bg-gradient-to-b from-blue-50 via-white to-white'
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
                <span className="chip chip-green">Same-day emergency service</span>
              ) : (
                group && <span className="chip chip-blue">{group.label}</span>
              )}
              <span className="chip chip-grey">
                {s.indexed ? 'Serving the South Denver metro since 2018' : 'New service'}
              </span>
            </div>

            <h1 className="mt-5 text-display">{s.h1}</h1>
            <p className="mt-5 max-w-xl text-lead text-slate"><RichText text={s.lead || ""} /></p>
            <CtaRow location="hero" service={s.slug} emergency={s.emergency} className="mt-7" />

            <dl className="mt-9 grid gap-px overflow-hidden rounded-card border border-rule bg-rule sm:grid-cols-3">
              {s.highlights.map((h) => (
                <div key={h.label} className="bg-white px-4 py-4">
                  <dt className="text-tiny font-semibold uppercase tracking-wide text-grey">
                    {h.label}
                  </dt>
                  <dd className="mt-1 text-body font-semibold text-ink">{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/*
            Kevin's review, 2026-09-08: this internal "photo queued" note was
            rendering to real visitors on the s.heroImageGap === true pages. It
            is production-tracking metadata, not something a homeowner should
            see, so it no longer renders. s.heroImageGap stays in lib/services.ts
            as the internal checklist of which hero photos are still stock and
            need a real job photo (planning/docs, photography direction).

            Parallax added 2026-09-14 for the premium pass. It scales the image
            slightly and drifts it, so the frame is never left with an empty edge.
          */}
          <Parallax distance={36} className="rounded-card border border-rule shadow-photo">
            <SiteImage
              name={s.heroImage}
              alt={s.heroAlt}
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-[300px] w-full object-cover sm:h-[440px]"
              aspable={false}
            />
          </Parallax>
        </div>
      </section>

      {/*
        ── Proof band ────────────────────────────────────────────────────
        Added 2026-09-14. StatBand already existed but was used on the homepage
        only; every service page went straight from hero into a wall of text
        with no trust signal at all.
      */}
      <section className="border-b border-rule bg-paper py-10">
        <div className="container-page">
          <Reveal>
            <StatBand
              tone="light"
              items={[
                {
                  value: `${business.google.reviewCount}`,
                  label: '5-star Google reviews',
                  icon: <GoogleG className="h-5 w-5" />,
                },
                {
                  value: '8+',
                  label: 'Years serving the South Denver metro',
                  icon: <ClockIcon width={20} height={20} />,
                },
                {
                  value: 'Licensed',
                  label: `Master ${business.licenses.master.id}`,
                  icon: <ShieldMark width={20} height={20} />,
                },
                {
                  value: 'Fixed',
                  label: 'Price agreed before work starts',
                  icon: <PriceTagIcon width={20} height={20} />,
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="container-page grid gap-14 py-14 lg:grid-cols-[1fr_340px] lg:py-20">
        <div className="min-w-0 space-y-16">
          {/* Overview, planning/plans/crispy-forging-clock.md Part B */}
          {s.overview && (
            <Reveal>
              <p className="prose-body text-lead text-slate">{s.overview}</p>
            </Reveal>
          )}

          {/* Signs */}
          <Reveal>
            <section aria-labelledby="signs-heading">
              <p className="eyebrow eyebrow-blue">Do any of these sound familiar?</p>
              <h2 id="signs-heading" className="mt-3 text-h1">
                Signs you need this
              </h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {s.signs.map((sign, i) => (
                  <div key={sign.h3} className="card p-5">
                    <span className="text-tiny font-bold text-blue-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-1.5 text-h3">{sign.h3}</h3>
                    <p className="mt-2 text-body text-slate">{sign.body}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <PriceRange service={s} />

          <IncludedList items={s.included} />

          {/* Not included, planning/plans/crispy-forging-clock.md Part B: honest
              "what this doesn't cover" — genuinely useful, not padding. */}
          {s.notIncluded && s.notIncluded.length > 0 && (
            <section aria-labelledby="not-included-heading" className="rounded-card border border-rule p-6 md:p-8">
              <h2 id="not-included-heading" className="text-h2">
                What this doesn&apos;t cover
              </h2>
              <ul className="mt-4 space-y-2.5">
                {s.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-body text-slate">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-grey" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Gallery, now on every service rather than 1 of 16. */}
          <Reveal>
            <section aria-labelledby="gallery-heading">
              <p className="eyebrow">Our work</p>
              <h2 id="gallery-heading" className="mt-3 text-h1">
                Our {s.navLabel.toLowerCase()} work
              </h2>
              <PhotoGallery photos={gallery} className="mt-8" />
            </section>
          </Reveal>

          {/* Process */}
          <Reveal>
            <section aria-labelledby="process-heading">
              <p className="eyebrow">Start to finish</p>
              <h2 id="process-heading" className="mt-3 text-h1">
                How the job goes
              </h2>
              <StepList steps={processSteps} />
            </section>
          </Reveal>

          {/* Permits */}
          <section aria-labelledby="permits-heading" className="rounded-card bg-paper p-6 md:p-8">
            <h2 id="permits-heading" className="text-h2">
              Permits and inspection
            </h2>
            <p className="prose-body mt-4 text-body-lg text-slate">{s.permits}</p>
            {s.codeNote && <p className="prose-body mt-4 text-body text-slate">{s.codeNote}</p>}
            <p className="mt-5">
              <Link href="/resources/" className="link-cta">
                See our Parker and Douglas County permit guides
              </Link>
            </p>
          </section>

          {/* Why us */}
          <Reveal>
            <section
              aria-labelledby="why-heading"
              className="surface-dark overflow-hidden rounded-card bg-graphite-texture p-6 md:p-8"
            >
              <p className="eyebrow eyebrow-light">Why homeowners here call us</p>
              <h2 id="why-heading" className="mt-3 text-h2 text-white">
                {s.whyUs?.heading ?? 'A real person, start to finish'}
              </h2>
              <p className="mt-4 max-w-2xl text-body-lg text-white/80">
                {s.whyUs?.body ??
                  'A real person answers the phone, you get a two-hour window rather than a vague day, and one of our licensed electricians does the work. Allsafe’s Google reviews name our electricians personally.'}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href="/reviews/" className="link-cta !text-white !decoration-white/40">
                  <GoogleG /> Read customer reviews
                </Link>
                <span className="flex items-center gap-2 text-small text-white/70">
                  <ShieldIcon width={17} height={17} /> License {business.licenses.master.id}
                </span>
              </div>
            </section>
          </Reveal>

          {/* Live, service-matched Google reviews, placed where doubt peaks:
              after the price and process, before the FAQ. Was a hardcoded
              testimonial that showed the same Todd review on nearly every page
              (revision doc §1.10); now pulled from Featurable and keyword-
              matched to this service. */}
          <Reveal>
            <ServiceReviews tags={reviewTagsForService(s.slug)} />
          </Reveal>

          <Reveal>
            <FaqList faqs={s.faqs} id="faq" />
          </Reveal>

          {/* Keep reading, planning/plans/crispy-forging-clock.md Part B */}
          {s.relatedReading && s.relatedReading.length > 0 && (
            <section aria-labelledby="reading-heading">
              <h2 id="reading-heading" className="text-h2">
                Keep reading
              </h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {s.relatedReading.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} className="link-cta">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

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
                      className="inline-flex items-center gap-2 rounded-chip border border-rule bg-white px-4 py-2 text-small font-medium transition-colors hover:border-blue-300 hover:bg-blue-50"
                    >
                      {s.navLabel} in {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <Reveal>
            <ServiceToCities serviceSlug={s.slug} />
          </Reveal>

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
                    className="card card-hover block h-full p-5"
                  >
                    <span className="block font-semibold text-blue-700">{sib!.navLabel}</span>
                    <span className="mt-1.5 block text-small text-grey">{sib!.blurb}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:h-fit lg:self-start">
          <StickyTOC items={tocItems} className="hidden lg:block" />
          <div className="card overflow-hidden">
            <div
              className={`px-5 py-4 ${s.emergency ? 'bg-green-600' : 'bg-navy'} surface-dark`}
            >
              <h2 className="text-h3 text-white">Book {s.navLabel.toLowerCase()}</h2>
              <p className="mt-1 text-small text-white/80">
                {s.emergency
                  ? 'Call now. In the daytime we usually pick up on the first ring.'
                  : 'A real person answers, Mon to Fri, 8 to 6. Request a quote any time.'}
              </p>
            </div>
            <div className="p-5">
              <CtaRow
                location="mid_page"
                service={s.slug}
                emergency={s.emergency}
                className="flex-col !items-stretch [&>a]:justify-center"
              />
              <ul className="mt-5 space-y-2 border-t border-rule pt-4 text-small text-grey">
                <li className="flex items-center gap-2">
                  <CheckIcon className="shrink-0 text-green-600" width={15} height={15} />
                  Fixed price before work starts
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="shrink-0 text-green-600" width={15} height={15} />
                  Permits and inspection handled
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="shrink-0 text-green-600" width={15} height={15} />
                  Shoe covers on, good with dogs
                </li>
              </ul>
              <p className="mt-4 border-t border-rule pt-3 text-tiny text-grey">
                {business.name}, Parker CO{' '}
                <a href={business.phone.href} className="font-semibold text-blue-700">
                  {business.phone.display}
                </a>
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/*
        Kevin's review, 2026-09-08: the old heading interpolated the raw nav
        keyword ("Book ceiling fans in Parker", "Book switches & dimmers in
        Parker"), which reads like scraped SEO text rather than something a
        person would say. CtaBlock's own default heading, "Ready to get it
        sorted?", already works for every service without that risk.
      */}
      <CtaBlock service={s.slug} emergency={s.emergency} />
    </>
  );
}
