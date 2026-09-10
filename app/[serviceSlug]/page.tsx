import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serviceSlugs, getService } from '@/lib/services';
import { cities } from '@/lib/cities';
import { PUBLISH } from '@/lib/publish';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SiteImage } from '@/components/SiteImage';
import { CtaRow, PriceRange, CtaBlock } from '@/components/sections';
import { FaqList } from '@/components/Faq';
import { Schema } from '@/components/Schema';
import { GoogleG } from '@/components/Icons';
import { business } from '@/lib/business';
import {
  serviceNode,
  webPageNode,
  breadcrumbNode,
  faqPageNode,
} from '@/lib/schema';

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
    ogEyebrow: s.emergency ? 'Emergency electrician · Parker, CO' : 'Allsafe Electric · Parker, CO',
  });
}

const crumbs = (s: ReturnType<typeof getService>) => [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/electrical-services-parker-co/' },
  { name: s!.navLabel, path: `/${s!.slug}/` },
];

export default async function ServicePage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = await params;
  const s = getService(serviceSlug);
  if (!s) notFound();

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

      {/* Hero */}
      <section
        className={
          s.emergency
            ? 'border-b border-rule bg-[linear-gradient(180deg,#faf0ef,#ffffff)]'
            : 'border-b border-rule bg-[linear-gradient(180deg,#f3f6f8,#ffffff)]'
        }
      >
        <div className="container-page grid items-stretch gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-16">
          <div className="flex max-w-xl flex-col justify-center">
            {s.emergency && (
              <p className="inline-flex w-fit items-center gap-2 rounded bg-urgent px-2.5 py-1 text-[0.85rem] font-semibold text-white">
                Emergency line open
              </p>
            )}
            <h1 className="mt-3 text-[2rem] leading-tight md:text-[2.9rem]">{s.h1}</h1>
            <p className="mt-4 text-step-1 text-muted">{s.lead}</p>
            <CtaRow location="hero" service={s.slug} emergency={s.emergency} className="mt-6" />
          </div>
          <div className="overflow-hidden rounded-card border border-rule">
            <SiteImage
              name={s.heroImage}
              alt={s.heroAlt}
              priority
              sizes="(min-width: 1024px) 520px, 100vw"
              className="h-full max-h-[460px] w-full object-cover object-center"
              aspable={false}
            />
            {s.heroImageGap && (
              <p className="bg-paper px-3 py-1.5 text-[0.75rem] text-muted">
                Representative photo — a job-specific image is queued (see replacement queue).
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="container-page grid gap-12 py-12 lg:grid-cols-[1fr_320px] lg:py-16">
        <div className="min-w-0 space-y-12">
          {/* Signs */}
          <section aria-labelledby="signs-heading">
            <h2 id="signs-heading" className="text-step-3">
              Signs you need this
            </h2>
            <div className="mt-5 space-y-5">
              {s.signs.map((sign) => (
                <div key={sign.h3} className="border-l-2 border-rule pl-4">
                  <h3 className="text-step-1">{sign.h3}</h3>
                  <p className="mt-1 text-[1.05rem] text-muted">{sign.body}</p>
                </div>
              ))}
            </div>
          </section>

          <PriceRange service={s} />

          {/* Process */}
          <section aria-labelledby="process-heading">
            <h2 id="process-heading" className="text-step-3">
              How the job goes, start to finish
            </h2>
            <ol className="mt-5 space-y-4">
              {s.process.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-[1.05rem]">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Permits */}
          <section aria-labelledby="permits-heading">
            <h2 id="permits-heading" className="text-step-3">
              Permits and inspection
            </h2>
            <p className="prose-body mt-4 text-[1.05rem] text-muted">{s.permits}</p>
            <p className="mt-3 text-[0.95rem]">
              <Link href="/resources/" className="link-cta">
                See our Parker &amp; Douglas County permit guides
              </Link>
            </p>
          </section>

          {/* Why homeowners call Jud */}
          <section aria-labelledby="why-heading" className="card bg-paper p-6">
            <h2 id="why-heading" className="text-step-2">
              Why homeowners here call Jud
            </h2>
            <p className="mt-3 text-[1.05rem] text-muted">
              A real person answers the phone, you get a two-hour window, and Jud or Justin does the
              work — not a rotating crew. Allsafe&apos;s Google reviews name them personally.
            </p>
            <Link
              href="/reviews/"
              className="mt-4 inline-flex items-center gap-2 link-cta"
            >
              <GoogleG /> Read reviews from Parker customers
            </Link>
          </section>

          <FaqList faqs={s.faqs} />

          {/* Areas we cover */}
          {cityVariants.length > 0 && (
            <section aria-labelledby="areas-heading">
              <h2 id="areas-heading" className="text-step-3">
                Areas we cover for {s.navLabel.toLowerCase()}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {cityVariants.map(({ city, href }) => (
                  <li key={city.slug}>
                    <Link
                      href={href}
                      className="inline-block rounded border border-rule bg-white px-3 py-1.5 text-[0.95rem] hover:border-brand-blue"
                    >
                      {s.navLabel} in {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Related services */}
          <section aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-step-3">
              Related electrical work
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {siblings.map((sib) => (
                <li key={sib!.slug}>
                  <Link
                    href={`/${sib!.slug}/`}
                    className="block h-full rounded-card border border-rule bg-white p-4 hover:border-brand-blue"
                  >
                    <span className="font-semibold text-brand-blue-deep">{sib!.navLabel}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:h-fit">
          <div className="card p-5">
            <h2 className="text-step-1">Book {s.navLabel.toLowerCase()}</h2>
            <p className="mt-1 text-[0.95rem] text-muted">
              {s.emergency
                ? 'Call now — during the day Jud usually picks up on the first ring.'
                : 'A real person answers, Mon–Fri 8–6. Book online any time.'}
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              <CtaRow location="mid_page" service={s.slug} emergency={s.emergency} className="flex-col !items-stretch [&>a]:justify-center" />
            </div>
            <p className="mt-4 border-t border-rule pt-3 text-[0.85rem] text-muted">
              {business.name} · Parker, CO ·{' '}
              <a href={business.phone.href} className="font-semibold text-brand-blue-deep">
                {business.phone.display}
              </a>
            </p>
          </div>
        </aside>
      </div>

      <CtaBlock service={s.slug} emergency={s.emergency} heading={`Book ${s.navLabel.toLowerCase()} in Parker`} />
    </>
  );
}
