import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { SiteImage } from '@/components/SiteImage';
import { EstimateForm } from '@/components/EstimateForm';
import { ServiceCard } from '@/components/sections';
import { Testimonials } from '@/components/Testimonials';
import { MapFacade } from '@/components/MapFacade';
import { FaqList } from '@/components/Faq';
import { Schema } from '@/components/Schema';
import { EstimateButton, CallButton } from '@/components/cta';
import {
  PhoneIcon,
  MailIcon,
  ArrowRightIcon,
  CheckIcon,
  BoltIcon,
  ShieldIcon,
  ClockIcon,
  PriceTagIcon,
  MapPinIcon,
} from '@/components/Icons';
import { business } from '@/lib/business';
import { homeFaqs } from '@/lib/faqs';
import { tier3Neighborhoods } from '@/lib/cities';
import { webPageNode, faqPageNode } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: "Parker's Trusted Residential Electrician | Allsafe Electric",
  description:
    'Allsafe Electric is Parker, CO’s trusted residential electrician. Fast response, licensed and insured, BBB A+ accredited. Free estimates. Call (303) 648-1934.',
  ogEyebrow: 'Top rated electrician in Parker',
});

const stats = [
  { value: '15+', label: 'Years in Business' },
  { value: '400+', label: '5-Star Reviews' },
  { value: 'A+', label: 'BBB Accredited, Licensed & Insured' },
  { value: '60 min', label: 'Average Emergency Response' },
];

const aboutPoints = [
  'Fast response, including same-day emergency calls',
  'Fair, up-front pricing with no hidden fees',
  'Local Parker expertise, we know these neighborhoods',
  'Fully licensed and insured for your protection',
];

const whyChoose = [
  {
    icon: ShieldIcon,
    title: 'Licensed & Insured',
    body: `Master electrician license ${business.licenses.master.id} and electrical contractor license ${business.licenses.contractor.id}, fully insured on every job.`,
  },
  {
    icon: BoltIcon,
    title: 'Fast Emergency Response',
    body: 'Electrical problems do not wait. Neither do we. Most emergency calls are on site the same day.',
  },
  {
    icon: PriceTagIcon,
    title: 'Transparent Pricing',
    body: 'You get the price before we start. No surprise line items, no pressure to upsell.',
  },
  {
    icon: MapPinIcon,
    title: 'Local Parker Expertise',
    body: 'We do the work ourselves, and we know the homes and wiring common across Parker.',
  },
];

const featuredServices = [
  'emergency-electrical-repairs-parker-co',
  'electrical-wiring-repairs-services',
  'electrical-outlet-services',
  'electrical-switch-services',
];

export default function HomePage() {
  return (
    <>
      <Schema
        nodes={[
          webPageNode({
            path: '/',
            name: "Parker's Trusted Residential Electrician | Allsafe Electric",
            description:
              'Licensed residential electrician in Parker, Colorado. Fast response, licensed and insured, BBB A+ accredited.',
            primaryImage: '/img/photos/allsafe-electrician-in-home-service-portrait.jpg',
          }),
          faqPageNode(homeFaqs.slice(0, 6), '/'),
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="surface-dark relative overflow-hidden bg-navy-gradient">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-blue-500/20 blur-3xl"
        />
        <div className="container-page relative pb-28 pt-14 text-center md:pb-36 md:pt-20">
          <p className="eyebrow eyebrow-center rise">Top Rated Electrician in Parker</p>
          <h1 className="rise mx-auto mt-5 max-w-4xl text-hero uppercase">
            Parker&rsquo;s Trusted Residential Electrician
          </h1>
          <p className="rise-1 mx-auto mt-6 max-w-2xl text-lead text-white/80">
            Your friendly, professional local electricians. Fast response, licensed and insured, and
            BBB A+ accredited.
          </p>
          <div className="rise-1 mt-9 flex flex-wrap justify-center gap-4">
            <EstimateButton location="hero" className="!px-8">
              Get My Free Estimate
            </EstimateButton>
            <CallButton location="hero" variant="ghost">
              <PhoneIcon width={19} height={19} /> {business.phone.display}
            </CallButton>
          </div>
        </div>
        {/* curved bottom edge */}
        <svg
          className="absolute inset-x-0 bottom-0 h-12 w-full text-white md:h-16"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0 60 L0 30 Q600 -20 1200 30 L1200 60 Z" fill="currentColor" />
        </svg>
      </section>

      {/* ── Estimate form (overlapping) ──────────────────────────────────── */}
      <section className="relative -mt-16 md:-mt-20">
        <div className="container-page">
          <div className="rounded-card border border-rule bg-white p-6 shadow-form md:p-8">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-h2">Request a Free Estimate</h2>
              <p className="text-small text-grey">
                No obligation. We usually reply the same day.{' '}
                <a href={business.phone.href} className="font-semibold text-blue-600">
                  {business.phone.display}
                </a>
              </p>
            </div>
            <div className="mt-5">
              <EstimateForm variant="row" formId="hero-estimate" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="py-14">
        <div className="container-page">
          <dl className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:divide-x sm:divide-rule">
            {stats.map((s) => (
              <div key={s.label} className="px-4 text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-4xl font-extrabold text-blue-600">
                    {s.value}
                  </span>
                  <span className="mt-1 block text-small text-grey">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section className="section bg-paper" aria-labelledby="about-heading">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="overflow-hidden rounded-card border border-rule shadow-card">
              <SiteImage
                name="allsafe-electrician-testing-residential-breaker-panel.JPG"
                alt="Jud from Allsafe Electric testing a residential breaker panel in a Parker home"
                sizes="(min-width: 1024px) 560px, 100vw"
                className="h-[360px] w-full object-cover sm:h-[440px]"
                aspable={false}
              />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden w-44 overflow-hidden rounded-card border-4 border-white shadow-lift sm:block">
              <SiteImage
                name="jud-cushing-headshot.png"
                alt="Judson Cushing, owner of Allsafe Electric"
                sizes="180px"
                className="h-40 w-full object-cover object-top"
                aspable={false}
              />
            </div>
            <div className="absolute -left-4 top-6 rounded-card bg-blue-600 px-4 py-3 text-white shadow-lift">
              <p className="font-display text-lg font-bold leading-tight">BBB A+</p>
              <p className="text-tiny text-white/80">Accredited, licensed &amp; insured in Colorado</p>
            </div>
          </div>

          <div>
            <p className="eyebrow">About Us</p>
            <h2 id="about-heading" className="mt-3 text-h1">
              Your Friendly, Professional Local Electricians
            </h2>
            <div className="prose-body mt-5 text-body-lg text-slate">
              <p>
                Allsafe Electric is a residential electrical company based in Parker, Colorado. We
                handle everything from a single dead outlet to a full panel upgrade, and we treat
                every home like our own. Shoe covers on, a clean workspace, and a straight answer
                about what your home actually needs.
              </p>
              <p>
                We hold Master License {business.licenses.master.id} and Electrical Contractor
                License {business.licenses.contractor.id}, carry full insurance, and maintain an A+
                rating with the Better Business Bureau.
              </p>
            </div>
            <ul className="mt-6 space-y-3">
              {aboutPoints.map((p) => (
                <li key={p} className="flex items-start gap-3 text-body">
                  <ArrowRightIcon width={18} height={18} className="mt-1 shrink-0 text-orange-500" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <Link href="/about/" className="btn btn-outline mt-8">
              More About Allsafe Electric
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="services-heading">
        <div className="container-page">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow">Our Services</p>
              <h2 id="services-heading" className="mt-3 text-h1">
                Residential Electrical Work, Done Right
              </h2>
              <p className="mt-4 text-lead text-slate">
                From emergency repairs to whole-home upgrades, our licensed electricians handle every
                job in your Parker home.
              </p>
            </div>
            <Link href="/electrical-services-parker-co/" className="btn btn-blue shrink-0">
              View All Services
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((slug) => (
              <ServiceCard key={slug} slug={slug} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why choose us ───────────────────────────────────────────────── */}
      <section className="section bg-paper" aria-labelledby="why-heading">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="overflow-hidden rounded-card border border-rule shadow-card">
            <SiteImage
              name="allsafe-electrician-in-home-service-portrait.JPG"
              alt="Jud Cushing of Allsafe Electric in a Parker home"
              sizes="(min-width: 1024px) 480px, 100vw"
              className="h-[420px] w-full object-cover object-[50%_25%]"
              aspable={false}
            />
          </div>
          <div>
            <p className="eyebrow">Why Choose Us</p>
            <h2 id="why-heading" className="mt-3 text-h1">
              Safe Work, Straight Answers
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {whyChoose.map(({ icon: Icon, title, body }) => (
                <div key={title}>
                  <span className="icon-badge">
                    <Icon width={24} height={24} />
                  </span>
                  <h3 className="mt-3 text-h3">{title}</h3>
                  <p className="mt-1.5 text-small text-slate">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Service areas ───────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="areas-heading">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Service Areas</p>
            <h2 id="areas-heading" className="mt-3 text-h1">
              Proudly Serving Parker and Surrounding Neighborhoods
            </h2>
            <p className="mt-4 text-lead text-slate">
              Not sure if you are in our area? Call{' '}
              <a href={business.phone.href} className="font-semibold text-blue-600">
                {business.phone.display}
              </a>{' '}
              and we will let you know right away.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
              {['Parker', ...tier3Neighborhoods].map((n) => (
                <li key={n} className="flex items-center gap-2.5 text-body">
                  <MapPinIcon width={18} height={18} className="shrink-0 text-orange-500" />
                  {n}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/service-area/" className="btn btn-outline">
                All Service Areas
              </Link>
              <EstimateButton location="mid_page">Contact Us for a Free Estimate</EstimateButton>
            </div>
          </div>
          <div className="h-[400px] overflow-hidden rounded-card border border-rule shadow-card">
            <MapFacade label="Allsafe Electric service area around Parker, CO" />
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────────── */}
      <Testimonials />

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="faq-heading">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-heading" className="mt-3 text-h1">
              Questions Homeowners Ask Us
            </h2>
            <div className="mt-6 overflow-hidden rounded-card border border-rule shadow-card">
              <SiteImage
                name="electrician-pointing-to-circuit-breaker.JPG"
                alt="Jud from Allsafe Electric pointing out a breaker during a home visit"
                sizes="(min-width: 1024px) 400px, 100vw"
                className="h-56 w-full object-cover"
                aspable={false}
              />
              <div className="flex items-center gap-4 bg-blue-600 p-5 text-white">
                <PhoneIcon width={26} height={26} className="shrink-0" />
                <div>
                  <p className="text-small text-white/80">Have a question?</p>
                  <a href={business.phone.href} className="font-display text-h3 font-bold text-white">
                    {business.phone.display}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <FaqList faqs={homeFaqs.slice(0, 6)} heading="Common questions" id="home-faq" />
        </div>
      </section>

      {/* ── CTA band ────────────────────────────────────────────────────── */}
      <section className="surface-dark relative overflow-hidden bg-navy-gradient" id="estimate-cta">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-orange-500/15 blur-3xl"
        />
        <div className="container-page relative grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="eyebrow">Free Estimate</p>
            <h2 className="mt-3 text-h1 text-white">Ready to Get Your Free Estimate?</h2>
            <p className="mt-4 max-w-md text-body-lg text-white/80">
              Schedule service online or call and talk to a licensed Parker electrician today.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CallButton location="footer" variant="primary">
                <PhoneIcon width={19} height={19} /> Call {business.phone.display}
              </CallButton>
              <a href={`mailto:${business.email.public}`} className="btn btn-ghost">
                <MailIcon width={19} height={19} /> Email Us
              </a>
            </div>
            <ul className="mt-10 space-y-2.5 border-t border-white/15 pt-6 text-small text-white/75">
              <li className="flex items-center gap-2.5">
                <CheckIcon width={16} height={16} className="shrink-0 text-orange-400" />
                Licensed &amp; insured, master license {business.licenses.master.id}
              </li>
              <li className="flex items-center gap-2.5">
                <ClockIcon width={16} height={16} className="shrink-0 text-orange-400" />
                {business.hours.humanReadable}, plus a weekday emergency line
              </li>
              <li className="flex items-center gap-2.5">
                <MapPinIcon width={16} height={16} className="shrink-0 text-orange-400" />
                {business.address.streetAddress}, {business.address.addressLocality},{' '}
                {business.address.addressRegion} {business.address.postalCode}
              </li>
            </ul>
          </div>
          <div className="rounded-card bg-white p-6 text-ink shadow-float md:p-8">
            <h3 className="text-h3">Schedule Service Online</h3>
            <p className="mt-1 text-small text-grey">Tell us what is going on and we will be in touch.</p>
            <EstimateForm variant="compact" formId="cta-estimate" />
          </div>
        </div>
      </section>
    </>
  );
}
