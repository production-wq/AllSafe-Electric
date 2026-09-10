import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { SiteImage } from '@/components/SiteImage';
import { BookingCard } from '@/components/BookingCard';
import { TrustBadges } from '@/components/TrustBadges';
import { ServiceCard, CtaBlock } from '@/components/sections';
import { Reviews } from '@/components/Reviews';
import { MapFacade } from '@/components/MapFacade';
import { FaqList } from '@/components/Faq';
import { Schema } from '@/components/Schema';
import { Stars, GoogleG, CheckIcon } from '@/components/Icons';
import { business } from '@/lib/business';
import { homeFaqs } from '@/lib/faqs';
import { cities } from '@/lib/cities';
import { getFallbackReviewsSync } from '@/lib/reviews';
import { webPageNode, faqPageNode } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: 'Parker Electrician Who Answers the Phone | Allsafe Electric',
  description:
    'Allsafe Electric is a licensed master electrician in Parker, CO. Jud answers his own phone and shows up on time. Panels, EV chargers, wiring and repairs.',
  ogEyebrow: 'Residential electrician · Parker, CO',
});

const featured = [
  'emergency-electrical-repairs-parker-co',
  'electrical-panel-services',
  'electrical-troubleshooting',
  'residential-ev-charging',
  'electrical-outlet-services',
  'lighting-services',
  'ceiling-fan-installation',
  'generator-installation',
];

const promises = [
  {
    title: 'A real person answers',
    proof:
      'Call during the day and Jud usually picks up on the first ring. Customers tell him constantly that they can\'t believe someone answered — that is the bar now.',
    image: 'allsafe-electrician-reviewing-project-details-on-tablet.JPG',
    alt: 'Jud from Allsafe Electric reviewing job details on a tablet in a Parker kitchen',
  },
  {
    title: 'He shows up in the window',
    proof:
      'You get a two-hour arrival window, not "sometime Tuesday." If anything changes, you get a phone call — not silence. Jud and Justin do the work themselves.',
    image: 'allsafe-electrician-preparing-service-estimate-on-tablet.JPG',
    alt: 'Jud from Allsafe Electric preparing a written estimate on site',
  },
  {
    title: 'Clean, and good with dogs',
    proof:
      'Shoe covers on, tools kept to a drop cloth, no smoking anywhere on your property. Jud has a dog of his own. He named all of this himself as things that matter.',
    image: 'allsafe-electrician-holding-dog.JPG',
    alt: 'Jud from Allsafe Electric holding a friendly French bulldog on a job',
  },
];

export default function HomePage() {
  const reviews = getFallbackReviewsSync();

  return (
    <>
      <Schema
        nodes={[
          webPageNode({
            path: '/',
            name: 'Allsafe Electric — Parker, CO residential electrician',
            description:
              'Licensed master electrician in Parker, Colorado. Panels, EV chargers, wiring, lighting and emergency repairs.',
            primaryImage: '/img/photos/allsafe-electrician-in-home-service-portrait.jpg',
          }),
          faqPageNode(homeFaqs, '/'),
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="border-b border-rule bg-[linear-gradient(180deg,#f3f6f8,#ffffff)]">
        <div className="container-page py-12 lg:py-16">
          <div className="hero-rise max-w-3xl">
            <h1 className="text-[2.25rem] leading-[1.1] md:text-[3.25rem]">
              Your Parker electrician answers the phone.
            </h1>
            <p className="mt-5 max-w-2xl text-step-1 text-muted">
              Licensed master electrician serving Parker, Castle Rock and Highlands Ranch since
              2018. Jud and Justin do the work themselves — the person you booked is the person who
              shows up.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Stars rating={5} />
              <span className="text-[0.95rem] text-muted">
                <GoogleG className="mr-1 inline align-text-bottom" />
                Reviews that name Jud and Justin by name
              </span>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch lg:gap-14">
            <div className="hero-rise overflow-hidden rounded-card border border-rule">
              <SiteImage
                name="allsafe-electrician-in-home-service-portrait.JPG"
                alt="Jud Cushing of Allsafe Electric, a licensed master electrician, in a Parker home"
                priority
                sizes="(min-width: 1024px) 640px, 100vw"
                className="h-full max-h-[560px] w-full object-cover object-[50%_22%]"
                aspable={false}
              />
            </div>
            <div className="hero-rise-2 flex flex-col justify-center">
              <BookingCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust badges ─────────────────────────────────────────────────── */}
      <section className="border-b border-rule bg-white py-8">
        <div className="container-page">
          <TrustBadges />
        </div>
      </section>

      {/* ── What we fix ──────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="services-heading">
        <div className="container-page">
          <p className="eyebrow">Residential electrical work</p>
          <h2 id="services-heading" className="mt-1 text-step-3">
            What we fix
          </h2>
          <p className="mt-2 max-w-measure text-muted">
            Strictly residential — no commercial, no industrial. Every service page tells you what
            it costs to find out and how fast someone can be there.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((slug) => (
              <ServiceCard key={slug} slug={slug} />
            ))}
          </div>
          <Link href="/electrical-services-parker-co/" className="link-cta mt-8 inline-block">
            See all 16 residential services
          </Link>
        </div>
      </section>

      {/* ── Will he show up? ─────────────────────────────────────────────── */}
      <section className="section bg-white" aria-labelledby="promises-heading">
        <div className="container-page">
          <h2 id="promises-heading" className="text-step-3">
            &ldquo;Will he actually show up?&rdquo;
          </h2>
          <p className="mt-2 max-w-measure text-muted">
            It is the real question, and it is fair — a lot of people have been let down by a
            contractor before. Here is the answer, with the proof underneath instead of a claim on
            top.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {promises.map((p) => (
              <div key={p.title} className="card overflow-hidden">
                <SiteImage
                  name={p.image}
                  alt={p.alt}
                  sizes="(min-width: 768px) 380px, 90vw"
                  className="aspect-[4/3] w-full object-cover"
                  aspable={false}
                />
                <div className="p-5">
                  <h3 className="flex items-center gap-2 text-step-1">
                    <CheckIcon className="shrink-0 text-brand-green" width={22} height={22} />
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[1rem] text-muted">{p.proof}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────────────── */}
      <Reviews initial={reviews} />

      {/* ── Where we work ───────────────────────────────────────────────── */}
      <section className="section bg-white" aria-labelledby="areas-heading">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Service area</p>
            <h2 id="areas-heading" className="mt-1 text-step-3">
              Where we work
            </h2>
            <p className="mt-3 max-w-measure text-muted">
              Based in Parker, covering the south Denver metro. Parker neighbourhoods — Stonegate,
              Stroh Ranch, Pradera, The Pinery, Canterberry Crossing — are usually a same-day call
              during business hours.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-[1.02rem]">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href="/service-area/" className="text-brand-blue-deep hover:underline">
                    {c.name}, CO
                  </Link>
                  <span className="text-muted"> · {c.driveTimeMin === 0 ? 'home base' : `${c.driveTimeMin} min`}</span>
                </li>
              ))}
            </ul>
            <Link href="/service-area/" className="link-cta mt-6 inline-block">
              See every area we serve
            </Link>
          </div>
          <MapFacade />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="faq-heading">
        <div className="container-page max-w-3xl">
          <p className="eyebrow">Answers</p>
          <FaqList faqs={homeFaqs} heading="Questions homeowners ask us first" id="home-faq" />
          <p className="mt-6 text-muted">
            More in our{' '}
            <Link href="/resources/" className="link-cta">
              guides and resources
            </Link>
            , or just{' '}
            <a href={business.phone.href} className="link-cta">
              call and ask
            </a>
            .
          </p>
        </div>
      </section>

      <CtaBlock heading="Book Jud for a visit" />
    </>
  );
}
