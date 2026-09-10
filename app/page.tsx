import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { SiteImage } from '@/components/SiteImage';
import { BookingCard } from '@/components/BookingCard';
import { TrustBadges } from '@/components/TrustBadges';
import { ServiceCard, CtaBlock, StatBand } from '@/components/sections';
import { Reviews } from '@/components/Reviews';
import { MapFacade } from '@/components/MapFacade';
import { FaqList } from '@/components/Faq';
import { Schema } from '@/components/Schema';
import { Stars, GoogleG, CheckIcon, ShieldIcon, ClockIcon, MapPinIcon } from '@/components/Icons';
import { business } from '@/lib/business';
import { homeFaqs } from '@/lib/faqs';
import { cities } from '@/lib/cities';
import { serviceGroups, services } from '@/lib/services';
import { getFallbackReviewsSync } from '@/lib/reviews';
import { webPageNode, faqPageNode } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: 'Parker Electrician Who Answers the Phone | Allsafe Electric',
  description:
    'Allsafe Electric is a licensed master electrician in Parker, CO. Jud answers his own phone and shows up on time. Panels, EV chargers, wiring and repairs.',
  ogEyebrow: 'Residential electrician, Parker CO',
});

const featured = [
  { slug: 'emergency-electrical-repairs-parker-co', accent: 'blue' as const },
  { slug: 'electrical-panel-services', accent: 'leaf' as const },
  { slug: 'electrical-troubleshooting', accent: 'blue' as const },
  { slug: 'residential-ev-charging', accent: 'leaf' as const },
  { slug: 'electrical-outlet-services', accent: 'blue' as const },
  { slug: 'lighting-services', accent: 'teal' as const },
  { slug: 'ceiling-fan-installation', accent: 'teal' as const },
  { slug: 'generator-installation', accent: 'leaf' as const },
];

const promises = [
  {
    title: 'A real person answers',
    proof:
      'Call during business hours and Jud usually picks up on the first ring. No phone tree, no dispatcher reading from a script, and no promise to "have someone reach out". Customers tell him constantly that they cannot believe someone actually answered, which says more about the trade than it does about us.',
    image: 'allsafe-electrician-blue-uniform-kitchen-portrait.JPG',
    alt: 'Jud Cushing of Allsafe Electric in a blue company polo in a Parker kitchen',
  },
  {
    title: 'He shows up in the window',
    proof:
      'You get a two-hour arrival window rather than "sometime Tuesday", and if anything slips you get a phone call instead of silence. Jud and Justin do the work themselves, so the person you booked is the person standing at your door.',
    image: 'allsafe-electrician-reviewing-project-details-on-tablet.JPG',
    alt: 'Jud from Allsafe Electric going through job details on a tablet',
  },
  {
    title: 'Shoe covers on, every visit',
    proof:
      'Covers go on at the door, tools stay on a drop cloth, and offcuts and packaging leave with us. Nobody smokes anywhere on your property. None of that is a special request, it is just how every visit runs.',
    image: 'electrician-putting-on-indoor-shoe-covers.JPG',
    alt: 'Pulling on protective shoe covers before stepping onto a hardwood floor',
  },
  {
    title: 'Good with dogs',
    proof:
      'Jud has a dog of his own and is happy working around yours, so you do not have to shut anyone in a bedroom for three hours. The owner named this himself as something that matters to customers, and competitors rarely mention it because it sounds small.',
    image: 'allsafe-electrician-holding-dog.JPG',
    alt: 'Jud from Allsafe Electric holding a friendly French bulldog on a job',
  },
];

const gallery = [
  {
    image: 'illuminated-ornate-crystal-chandelier.JPG',
    alt: 'An ornate crystal chandelier lit above a stairwell',
    caption: 'Chandelier hung and wired',
  },
  {
    image: 'open-residential-electrical-breaker-panel.JPG',
    alt: 'A tidy residential breaker panel with the cover removed',
    caption: 'Panel labelled and torqued',
  },
  {
    image: 'modern-three-blade-ceiling-fan-with-light.JPG',
    alt: 'A modern three-blade ceiling fan with an integrated light',
    caption: 'Fan on a rated box',
  },
  {
    image: 'dual-usb-residential-wall-outlet.JPG',
    alt: 'A finished dual-USB residential wall outlet',
    caption: 'USB outlets fitted',
  },
  {
    image: 'large-windmill-ceiling-fan-in-living-room.JPG',
    alt: 'A large windmill-style ceiling fan in a vaulted living room',
    caption: 'Vaulted ceiling install',
  },
  {
    image: 'electrician-tool-bag-on-kitchen-counter.JPG',
    alt: 'A tidy canvas tool bag set down on a kitchen counter',
    caption: 'Tidy site, every time',
  },
];

const stats = [
  { value: '2018', label: 'Serving Parker since' },
  { value: '16', label: 'Residential services' },
  { value: '2 hrs', label: 'Typical arrival window' },
  { value: '100%', label: 'Residential, never commercial' },
];

export default function HomePage() {
  const reviews = getFallbackReviewsSync();

  return (
    <>
      <Schema
        nodes={[
          webPageNode({
            path: '/',
            name: 'Allsafe Electric, Parker CO residential electrician',
            description:
              'Licensed master electrician in Parker, Colorado. Panels, EV chargers, wiring, lighting and emergency repairs.',
            primaryImage: '/img/photos/allsafe-electrician-in-home-service-portrait.jpg',
          }),
          faqPageNode(homeFaqs, '/'),
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-rule bg-gradient-to-b from-brand-50 via-white to-white">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:34px_34px] opacity-60"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-leaf-100/50 blur-3xl"
        />
        <div className="container-page relative py-12 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16">
            <div className="rise">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip chip-leaf">
                  <ShieldIcon width={15} height={15} /> Licensed master electrician
                </span>
                <span className="chip chip-blue">
                  <MapPinIcon width={15} height={15} /> Parker, CO
                </span>
              </div>

              <h1 className="mt-5 text-display-lg">
                Your Parker electrician answers the phone.
              </h1>

              <p className="mt-6 max-w-xl text-lead text-ink-soft">
                Allsafe Electric is Jud Cushing and Justin, and that is the whole company. No call
                centre, no rotating crew, no sales rep. You get a licensed master electrician who
                turns up inside the window he gave you, keeps your house clean, and tells you the
                price before he starts.
              </p>

              <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                {[
                  'Two-hour arrival windows',
                  'Fixed price before work starts',
                  'Permits and inspections handled',
                  'Shoe covers on, good with dogs',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-body text-ink-soft">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf-100">
                      <CheckIcon className="text-leaf-700" width={13} height={13} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-rule pt-6">
                <span className="flex items-center gap-2">
                  <Stars rating={5} />
                  <span className="text-small text-muted">
                    <GoogleG className="mr-1 inline align-text-bottom" />
                    Reviews that name Jud and Justin
                  </span>
                </span>
                <span className="hidden h-5 w-px bg-rule sm:block" />
                <span className="flex items-center gap-2 text-small text-muted">
                  <ClockIcon width={17} height={17} className="text-brand-500" />
                  {business.hours.humanReadable}
                </span>
              </div>
            </div>

            <div className="rise-1 grid gap-6">
              <div className="relative overflow-hidden rounded-card border border-rule shadow-lift">
                <SiteImage
                  name="allsafe-electrician-in-home-service-portrait.JPG"
                  alt="Jud Cushing of Allsafe Electric, a licensed master electrician, in a Parker home"
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="h-[300px] w-full object-cover object-[50%_20%] sm:h-[380px]"
                  aspable={false}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-900/85 to-transparent px-5 pb-4 pt-14">
                  <p className="text-body font-semibold text-white">Jud Cushing</p>
                  <p className="text-small text-white/80">
                    Owner, master electrician {business.licenses.master.id}
                  </p>
                </div>
              </div>
              <BookingCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats + badges ───────────────────────────────────────────────── */}
      <section className="border-b border-rule bg-paper py-12">
        <div className="container-page">
          <StatBand items={stats} />
          <div className="mt-10 border-t border-rule pt-8">
            <TrustBadges />
          </div>
        </div>
      </section>

      {/* ── What we fix ──────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="services-heading">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">Residential electrical work</p>
            <h2 id="services-heading" className="mt-3 text-h1">
              What we fix
            </h2>
            <p className="mt-4 text-lead text-ink-soft">
              Strictly residential. Houses, not warehouses. Every service page tells you what it
              costs to find out, what the work involves, and how fast someone can be there, because
              a page with no numbers on it reads as evasive.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((f) => (
              <ServiceCard key={f.slug} slug={f.slug} accent={f.accent} />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 rounded-card bg-paper px-6 py-5">
            <p className="text-body text-ink-soft">
              Eight of sixteen shown. The rest cover switches, wiring, outdoor lighting, smart home,
              surge protection, smoke detectors, inspections and hot tubs.
            </p>
            <Link href="/electrical-services-parker-co/" className="link-cta">
              See all 16 residential services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Will he show up ──────────────────────────────────────────────── */}
      <section className="section bg-sand" aria-labelledby="promises-heading">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow eyebrow-blue">The real question</p>
            <h2 id="promises-heading" className="mt-3 text-h1">
              &ldquo;Will he actually show up?&rdquo;
            </h2>
            <p className="mt-4 text-lead text-ink-soft">
              It is a fair question, and most people asking it have been let down by a contractor
              before. Here is the answer with the proof underneath, rather than a claim on top.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p) => (
              <div key={p.title} className="card overflow-hidden">
                <SiteImage
                  name={p.image}
                  alt={p.alt}
                  sizes="(min-width: 1024px) 290px, (min-width: 640px) 45vw, 92vw"
                  className="aspect-[4/3] w-full object-cover"
                  aspable={false}
                />
                <div className="p-5">
                  <h3 className="flex items-start gap-2.5 text-h3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-leaf-100">
                      <CheckIcon className="text-leaf-700" width={13} height={13} />
                    </span>
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-small text-muted">{p.proof}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet Jud ─────────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="jud-heading">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <div className="overflow-hidden rounded-card border border-rule shadow-card">
            <SiteImage
              name="allsafe-electrician-seated-in-home-portrait.JPG"
              alt="Jud Cushing, owner of Allsafe Electric, in a customer's living room"
              sizes="(min-width: 1024px) 440px, 100vw"
              className="h-[420px] w-full object-cover object-[50%_25%]"
              aspable={false}
            />
          </div>
          <div>
            <p className="eyebrow">The person who turns up</p>
            <h2 id="jud-heading" className="mt-3 text-h1">
              Meet Jud
            </h2>
            <div className="prose-body mt-5 text-body-lg text-ink-soft">
              <p>
                Jud Cushing started Allsafe Electric in January 2018 after years working for larger
                shops, with one idea behind it: be the electrician people actually want inside their
                house. Answer the phone. Turn up when you said. Leave the place cleaner than you
                found it.
              </p>
              <p>
                That sounds obvious, and it is also apparently rare. The thing customers say most
                often is some version of &ldquo;I cannot believe you answered&rdquo; or &ldquo;I
                cannot believe you actually showed up.&rdquo; Justin, the second electrician, shows
                up in the reviews by name just as often.
              </p>
              <p>
                Between them they hold Colorado master electrician licence {business.licenses.master.id}{' '}
                and electrical contractor licence {business.licenses.contractor.id}, both of which
                you can verify yourself on the state DORA lookup. Every permitted job is inspected
                by the Town of Parker, Douglas County, or the relevant city.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/about/" className="btn btn-secondary">
                More about Jud and Justin
              </Link>
              <Link href="/reviews/" className="btn btn-secondary">
                Read the reviews
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Recent work ──────────────────────────────────────────────────── */}
      <section className="section bg-brand-900 surface-dark" aria-labelledby="work-heading">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="eyebrow eyebrow-light">From recent jobs</p>
              <h2 id="work-heading" className="mt-3 text-h1 text-white">
                The work itself
              </h2>
              <p className="mt-4 text-body-lg text-white/75">
                Chandeliers hung straight, panels labelled properly, fans on rated boxes, and a
                tidy site at the end of it. Small things, and they are most of what separates a
                good electrician from a cheap one.
              </p>
            </div>
            <Link href="/electrical-services-parker-co/" className="btn btn-ghost">
              Browse every service
            </Link>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {gallery.map((g) => (
              <li key={g.image} className="overflow-hidden rounded-card border border-white/10">
                <SiteImage
                  name={g.image}
                  alt={g.alt}
                  sizes="(min-width: 1024px) 190px, 45vw"
                  className="aspect-square w-full object-cover"
                  aspable={false}
                />
                <p className="bg-white/5 px-3 py-2.5 text-tiny text-white/70">{g.caption}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────────────── */}
      <Reviews initial={reviews} />

      {/* ── Where we work ───────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="areas-heading">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow eyebrow-blue">Service area</p>
            <h2 id="areas-heading" className="mt-3 text-h1">
              Where we work
            </h2>
            <p className="mt-4 text-lead text-ink-soft">
              Based in Parker, covering the south Denver metro. Parker neighbourhoods such as
              Stonegate, Stroh Ranch, Pradera, The Pinery and Canterberry Crossing are usually a
              same-day call during business hours.
            </p>
            <p className="mt-4 text-body text-muted">
              We also cover Castle Pines, south Aurora, Littleton, Greenwood Village, Franktown,
              Elizabeth and Sedalia. Permitting differs between the Town of Parker, Douglas County,
              Castle Rock, Lone Tree and Centennial, and we handle whichever one applies to your
              address.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {cities.map((c) => (
                <li key={c.slug} className="rounded-btn border border-rule bg-white px-4 py-3">
                  <span className="block font-semibold text-ink">{c.name}, CO</span>
                  <span className="text-small text-muted">
                    {c.driveTimeMin === 0
                      ? 'Home base'
                      : `About ${c.driveTimeMin} min from the shop`}
                  </span>
                </li>
              ))}
            </ul>

            <Link href="/service-area/" className="link-cta mt-7 inline-flex">
              See every area we serve
            </Link>
          </div>
          <MapFacade />
        </div>
      </section>

      {/* ── Service groups + FAQ ─────────────────────────────────────────── */}
      <section className="section bg-paper" aria-labelledby="faq-heading">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.25fr]">
          <div>
            <p className="eyebrow">Answers</p>
            <h2 id="faq-heading" className="mt-3 text-h1">
              Questions we get first
            </h2>
            <p className="mt-4 text-body-lg text-ink-soft">
              The things people ask before they book, answered plainly. If yours is not here, call
              and ask. Nobody will try to sell you anything on the phone.
            </p>

            <div className="mt-8 space-y-3">
              {serviceGroups.map((g) => (
                <div key={g.id} className="rounded-btn border border-rule bg-white px-4 py-3.5">
                  <p className="font-semibold text-ink">{g.label}</p>
                  <p className="mt-0.5 text-small text-muted">{g.blurb}</p>
                  <p className="mt-1.5 text-tiny text-muted">
                    {services.filter((s) => s.group === g.id).length} services
                  </p>
                </div>
              ))}
            </div>
          </div>

          <FaqList faqs={homeFaqs} heading="Common questions" id="home-faq" />
        </div>
      </section>

      <CtaBlock heading="Book Jud for a visit" />
    </>
  );
}
