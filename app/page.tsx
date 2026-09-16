import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { SiteImage } from '@/components/SiteImage';
import { EstimateForm } from '@/components/EstimateForm';
import { ServiceCard, StatBand } from '@/components/sections';
import { ReviewsMarquee } from '@/components/ReviewsMarquee';
import { getFallbackReviewsSync } from '@/lib/reviews';
import { MapFacade } from '@/components/MapFacade';
import { FaqList } from '@/components/Faq';
import { Schema } from '@/components/Schema';
import { Reveal } from '@/components/Reveal';
import { PhotoGallery } from '@/components/PhotoGallery';
import { StepList } from '@/components/StepList';
import { Marquee } from '@/components/Marquee';
import { HeroSlideshow } from '@/components/HeroSlideshow';
import { AnimatedHeading } from '@/components/AnimatedHeading';
import { Parallax } from '@/components/Parallax';
import { SectionHeading } from '@/components/SectionHeading';
import { TrustBadges } from '@/components/TrustBadges';
import { ServiceReviews } from '@/components/ServiceReviews';
import { services } from '@/lib/services';
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
  CalendarIcon,
  GoogleG,
  WrenchIcon,
  OutletIcon,
  SwitchIcon,
  PanelIcon,
  LightbulbIcon,
  FanIcon,
  EvChargerIcon,
  SmokeAlarmIcon,
  SurgeIcon,
  GeneratorIcon,
  HotTubIcon,
  SmartHomeIcon,
  SearchIcon,
} from '@/components/Icons';
import { business } from '@/lib/business';
import { homeFaqs } from '@/lib/faqs';
import { cities, tier3Neighborhoods } from '@/lib/cities';
import { webPageNode, faqPageNode } from '@/lib/schema';

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: "Parker's Trusted Residential Electrician | Allsafe Electric",
  description:
    'Allsafe Electric is Parker, CO’s trusted residential electrician. Fast response, licensed and insured, BBB A+ accredited. Free estimates. Call (303) 648-1934.',
  ogEyebrow: 'Top rated electrician in Parker',
});

const stats = [
  { value: '8+', label: 'Years in Business', icon: <ClockIcon width={20} height={20} /> },
  {
    value: String(business.google.reviewCount),
    label: '5-Star Google Reviews',
    icon: <GoogleG className="h-5 w-5" />,
  },
  { value: 'A+', label: 'BBB Accredited, Licensed & Insured', icon: <ShieldIcon width={20} height={20} /> },
  { value: 'Same-Day', label: 'For Urgent Calls, 2-Hr Window', icon: <BoltIcon width={20} height={20} /> },
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
    body: 'Our licensed electricians know the homes and wiring common across the South Denver metro.',
  },
];

const featuredServices = [
  'emergency-electrical-repairs',
  'electrical-panel-services',
  'electrical-wiring-repairs-services',
  'residential-ev-charging',
];

/*
 * Client request 2026-09-13: "throughout the website, I need more content,
 * especially on the home page. I want more copy."
 *
 * Every claim below is grounded in facts already established in lib/cities.ts
 * (Parker housing stock, panel brands, CORE vs Xcel territory) or lib/business.ts.
 * Nothing here is invented: no made-up stats, job counts, or certifications.
 */
const commonProblems = [
  {
    title: 'Breakers trip when the AC and microwave run together',
    body: (
      <>
        Parker grew fast between 1995 and 2015, so a lot of homes here are running 100A or 150A service that was sized before anyone owned an <Link href="/residential-ev-charging/" className="text-blue-600 hover:underline">EV</Link>. The panel is not broken, it is full. A load calculation tells you whether you need a <Link href="/electrical-panel-services/" className="text-blue-600 hover:underline">heavy-up to 200A</Link> or just some circuits rebalanced, and the answer is genuinely cheaper more often than people expect.
      </>
    ),
  },
  {
    title: 'You have a Federal Pacific or Zinsco panel',
    body: (
      <>
        These turn up in the older <Link href="/electricians/the-pinery-co/" className="text-blue-600 hover:underline">Pinery</Link> and Ponderosa areas, mostly 1970s and 80s homes. Both brands have a documented history of breakers that fail to trip under fault, which is the one job a breaker has. If you have a <Link href="/electrical-panel-services/" className="text-blue-600 hover:underline">Federal Pacific or Zinsco panel</Link>, <Link href="/electrical-panel-services/" className="text-blue-600 hover:underline">replacement</Link> is not an upsell, it is the fix. We will tell you plainly which brand you have and show you the label.
      </>
    ),
  },
  {
    title: 'Aluminum branch wiring in an older home',
    body: (
      <>
        Some Parker-area homes from that same era have <Link href="/electrical-wiring-repairs-services/" className="text-blue-600 hover:underline">aluminum branch circuits</Link>. Aluminum is not automatically dangerous, but it expands and contracts differently than copper, so connections loosen over time and loose connections are what start fires. The fix is proper connectors at every device, not rewiring the whole house.
      </>
    ),
  },
  {
    title: 'You are adding an EV charger, hot tub, or generator',
    body: (
      <>
        All three are big continuous loads and all three need a permit. Whether it is an <Link href="/residential-ev-charging/" className="text-blue-600 hover:underline">EV charger</Link>, a <Link href="/hot-tub-electrical-hookup/" className="text-blue-600 hover:underline">hot tub hookup</Link>, or a <Link href="/generator-installation/" className="text-blue-600 hover:underline">standby generator</Link>, start with a load calculation rather than a guess, because the answer determines whether you need a <Link href="/electrical-panel-services/" className="text-blue-600 hover:underline">service upgrade</Link> first. Worth knowing: most of Parker is on CORE Electric Cooperative, not Xcel, so most Colorado rebate articles you will read online do not apply to your address.
      </>
    ),
  },
];

const howItWorks = [
  {
    title: 'Call or request a quote',
    body: 'A real person answers weekdays 8am to 6pm, and you can request a quote any time. Tell us what the house is doing and we will tell you honestly whether it is urgent today or fine to schedule.',
  },
  {
    title: 'You get a two-hour window',
    body: 'Not a vague all-day window. We confirm a two-hour arrival window that works for your schedule, and we call if anything changes on our end.',
  },
  {
    title: 'We diagnose and price it before starting',
    body: 'A licensed electrician looks at the actual job and gives you a fixed price in writing. You approve it before any work begins, so the number on the invoice is the number you agreed to.',
  },
  {
    title: 'We do the work and clean up',
    body: 'Shoe covers on, workspace left clean, and a straight answer about anything else we noticed. If something should be scheduled properly later rather than rushed today, we say so instead of upselling it on the spot.',
  },
];

/*
 * Ticker rows. Each service gets an icon that actually depicts it, per the
 * client's "relevant icons" note (2026-09-14), rather than one repeated
 * generic mark. The same icon set feeds both ticker instances on the page.
 */
const SERVICE_ICON: Record<string, ReactNode> = {
  'emergency-electrical-repairs': <BoltIcon width={17} height={17} />,
  'electrical-troubleshooting': <SearchIcon width={17} height={17} />,
  'electrical-outlet-services': <OutletIcon width={17} height={17} />,
  'electrical-switch-services': <SwitchIcon width={17} height={17} />,
  'electrical-wiring-repairs-services': <WrenchIcon width={17} height={17} />,
  'home-electrical-safety-inspections': <ShieldIcon width={17} height={17} />,
  'smoke-detectors': <SmokeAlarmIcon width={17} height={17} />,
  'electrical-panel-services': <PanelIcon width={17} height={17} />,
  'whole-home-surge-protection': <SurgeIcon width={17} height={17} />,
  'generator-installation': <GeneratorIcon width={17} height={17} />,
  'residential-ev-charging': <EvChargerIcon width={17} height={17} />,
  'hot-tub-electrical-hookup': <HotTubIcon width={17} height={17} />,
  'lighting-services': <LightbulbIcon width={17} height={17} />,
  'outdoor-lighting': <LightbulbIcon width={17} height={17} />,
  'ceiling-fan-installation': <FanIcon width={17} height={17} />,
  'home-automation': <SmartHomeIcon width={17} height={17} />,
};

const tickerItems = services.map((s) => ({
  label: s.navLabel,
  href: `/${s.slug}/`,
  icon: SERVICE_ICON[s.slug] ?? <BoltIcon width={17} height={17} />,
}));

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

      {/*
        ── Hero ──────────────────────────────────────────────────────────
        Background photo added 2026-09-11 (client: "there should be an image
        on the hero section background"). family-and-golden-retriever-living-room
        matches the client's own photography direction for the homepage, warm
        residential, a family and a dog, not a panel/breaker close-up. It is
        the page's LCP element, so it gets `priority` (Phase 1.12) instead of
        the default lazy load. A navy scrim (bg-navy-gradient, translucent) sits
        between the photo and the text so the white hero copy stays fully
        readable at the contrast the audit checks for.
      */}
      <section className="surface-dark relative overflow-hidden bg-navy-deep">
        {/*
          Rotating Ken Burns background, client request 2026-09-14. Mixes the
          warm residential shots the client asked for with real job imagery, so
          the hero shows both who we serve and what we actually do.
        */}
        <HeroSlideshow
          slides={[
            { name: 'family-and-golden-retriever-living-room.jpg', alt: '' },
            { name: 'bright-living-room-interior.jpg', alt: '' },
            { name: 'suburban-home-exterior-daylight.JPG', alt: '' },
            { name: 'illuminated-ornate-crystal-chandelier.JPG', alt: '' },
          ]}
        />
        {/*
          Overlay, reworked 2026-09-14 ("the overlay, I think, could be a little
          bit nicer"). Was one flat 82% navy wash that killed the photograph.
          Now three layers: a directional scrim that is heaviest bottom-left
          where the copy sits and lightest top-right where the image can show
          through, a soft color grade to keep everything on-brand, and a bottom
          fade into the section below.
        */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy-deep/95 via-navy-deep/90 to-navy-deep/80"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/50"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-blue-500/25 blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -left-32 bottom-[-10rem] h-[30rem] w-[30rem] rounded-full bg-green-600/20 blur-3xl"
        />
        <div className="container-page relative pb-28 pt-14 text-center md:pb-36 md:pt-20">
          <p className="eyebrow eyebrow-center rise">Top Rated Electrician in Parker</p>
          {/* Client request 2026-09-14: "modern headings, the main word can be a
              colorful word". "Trusted" carries the brand gradient. */}
          <AnimatedHeading
            as="h1"
            text="Parker's Trusted Residential Electrician"
            highlight="Trusted"
            className="rise mx-auto mt-5 max-w-4xl text-hero uppercase"
          />
          <p className="rise-1 mx-auto mt-6 max-w-2xl text-lead text-white/80">
            Your friendly, professional local electricians. Fast response, licensed and insured, and
            BBB A+ accredited.
          </p>
          {/* Call is the primary CTA, Get a Quote is secondary (revision doc
              §1.1): calls convert faster than form fills, so Call leads and
              carries the green primary styling. */}
          <div className="rise-1 mt-9 flex flex-wrap justify-center gap-4">
            <CallButton location="hero" variant="primary" className="!px-8">
              <PhoneIcon width={19} height={19} /> Call {business.phone.display}
            </CallButton>
            <EstimateButton location="hero" variant="ghost">
              Get a Quote
            </EstimateButton>
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

      {/*
        ── Estimate form (overlapping) ────────────────────────────────────
        Given its own background image and overlay 2026-09-14, at the client's
        request. The band behind the card was flat white, which made the card
        look like it was floating on nothing once the hero above it gained
        depth. The image is dimmed hard and blurred slightly so it reads as
        texture behind the form rather than competing with it.
      */}
      <section className="relative -mt-16 md:-mt-20">
        <div aria-hidden className="absolute inset-x-0 bottom-0 top-24 overflow-hidden">
          <SiteImage
            name="bright-living-room-interior.jpg"
            alt=""
            fill
            sizes="100vw"
            className="scale-105 object-cover blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/92 to-paper" />
          <div className="absolute inset-0 bg-paper/55" />
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="py-14">
        <div className="container-page">
          <Reveal>
            <StatBand items={stats} tone="textured" />
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <TrustBadges />
          </Reveal>
        </div>
      </section>

      <ReviewsMarquee initial={getFallbackReviewsSync()} />

      {/* ── About ────────────────────────────────────────────────────────── */}
      <section className="section bg-paper" aria-labelledby="about-heading">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          {/*
            Redesigned 2026-09-11: the old version stacked a floating "BBB A+" card
            and a headshot chip on top of the photo with negative-margin overlaps,
            which read as cluttered/compact at in-between viewport widths (client
            screenshot feedback). BBB is already covered by the stats row above and
            TrustBadges elsewhere, so the corner card was redundant, not just messy,
            and is dropped rather than repositioned. The headshot keeps its own
            breathing room instead of overlapping the panel photo's corner.
          */}
          <Reveal className="relative pb-14 sm:pb-16">
            <div className="overflow-hidden rounded-card border border-rule shadow-photo">
              <SiteImage
                name="allsafe-electrician-testing-residential-breaker-panel.JPG"
                alt="An Allsafe Electric electrician testing a residential breaker panel in a Parker home"
                sizes="(min-width: 1024px) 560px, 100vw"
                className="h-[360px] w-full object-cover sm:h-[460px]"
                aspable={false}
              />
            </div>
            <div className="absolute -bottom-2 right-6 flex items-center gap-3 rounded-card border-4 border-white bg-white py-2 pl-2 pr-4 shadow-lift sm:-bottom-4">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full">
                <SiteImage
                  name="jud-cushing-headshot.png"
                  alt="Judson Cushing, owner of Allsafe Electric"
                  sizes="56px"
                  className="h-14 w-14 object-cover object-top"
                  aspable={false}
                />
              </div>
              <div>
                <p className="text-small font-semibold leading-tight text-ink">Jud Cushing</p>
                <p className="text-tiny text-grey">Owner, Allsafe Electric</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
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
                  <ArrowRightIcon width={18} height={18} className="mt-1 shrink-0 text-green-600" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <Link href="/about/" className="btn btn-outline mt-8">
              More About Allsafe Electric
            </Link>
          </Reveal>
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
            <Link href="/electrical-services/" className="btn btn-blue shrink-0">
              View All Services
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((slug, i) => (
              <Reveal key={slug} delay={i * 80} className="flex h-full">
                <ServiceCard slug={slug} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/*
        ── Services ticker ───────────────────────────────────────────────
        Client request, made twice (2026-09-13, then again 2026-09-14: "I asked
        you to put this kind of text lines which just goes on on a loop, with
        some icons, but you didn't add those").

        Moved here from directly under the estimate form on 2026-09-14 ("it will
        look nicer further down the page"). Each service carries an icon that
        depicts it rather than one repeated generic mark, and every item links to
        its own service page, so this is a real internal-linking surface as well
        as a design element.

        Deliberately ONE row. A second ticker appears much further down, just
        above the footer, carrying service areas instead: the client's note was
        that the effect should recur in different sections of the page, not stack
        two rows in the same place. Pauses on hover and keyboard focus; stops
        entirely under reduced motion.
      */}
      <Marquee durationSec={54} items={tickerItems} />

      {/* ── Common problems in Parker homes ─────────────────────────────── */}
      <section className="section bg-paper" aria-labelledby="problems-heading">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">What We Get Called For</p>
            <h2 id="problems-heading" className="mt-3 text-h1">
              Common Electrical Problems in Parker Homes
            </h2>
            <p className="mt-4 text-lead text-slate">
              Parker&rsquo;s housing stock has patterns, and after eight years working in these
              neighborhoods we see the same four issues over and over. Here is what is usually
              going on, and what actually fixes it.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {commonProblems.map((p, i) => (
              <Reveal key={p.title} delay={i * 70} className="flex h-full">
                <div className="card h-full p-6 md:p-7">
                  <span className="text-tiny font-bold text-blue-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-1.5 text-h3">{p.title}</h3>
                  <p className="mt-2.5 text-body text-slate">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120} className="mt-8">
            <p className="text-body text-slate">
              Not sure which one you have?{' '}
              <a href={business.phone.href} className="font-semibold text-blue-600">
                Call {business.phone.display}
              </a>{' '}
              and describe what the house is doing. We will tell you what it probably is before we
              ever come out.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="how-heading">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="eyebrow">How It Works</p>
            <h2 id="how-heading" className="mt-3 text-h1">
              What Happens When You Call
            </h2>
            <p className="mt-4 text-lead text-slate">
              We know speed matters, and so does talking to a real person who understands what you need. Here is the whole process, start to finish.
            </p>
            <div className="mt-8 overflow-hidden rounded-card border border-rule shadow-photo">
              <SiteImage
                name="electrician-tool-bag-on-kitchen-counter.JPG"
                alt="An Allsafe Electric tool bag set down on a kitchen counter at the start of a job"
                sizes="(min-width: 1024px) 420px, 100vw"
                className="h-56 w-full object-cover"
                aspable={false}
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <StepList steps={howItWorks} />
          </Reveal>
        </div>
      </section>

      {/* ── Why choose us ───────────────────────────────────────────────── */}
      <section className="section bg-paper" aria-labelledby="why-heading">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Client feedback 2026-09-13: fewer repeated portraits. This slot now
              shows the work rather than the person. */}
          <Reveal className="overflow-hidden rounded-card border border-rule shadow-photo">
            <SiteImage
              name="electrician-tightening-connections-in-breaker-panel.JPG"
              alt="Tightening connections inside a residential breaker panel during a Parker service call"
              sizes="(min-width: 1024px) 480px, 100vw"
              className="h-[420px] w-full object-cover"
              aspable={false}
            />
          </Reveal>
          <Reveal delay={120}>
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
          </Reveal>
        </div>
      </section>

      {/*
        ── Real jobs, real homes ────────────────────────────────────────────
        New section, "Job-Site Editorial" refresh (2026-09-13): the real 61-photo
        job-site library gets a proper showcase instead of sitting behind small
        cropped thumbnails site-wide. All genuine work photos, no stock imagery.
      */}
      <section className="section" aria-labelledby="gallery-heading">
        <div className="container-page">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Real Jobs, Real Homes</p>
            <h2 id="gallery-heading" className="mt-3 text-h1">
              Our Recent Work
            </h2>
            <p className="mt-4 text-lead text-slate">
              A look at recent projects from our electricians across the South Denver metro, from panel work to lighting installs.
            </p>
          </Reveal>
          {/*
            Photo mix, client feedback 2026-09-13: "I don't like all of these
            pictures are just the same guy's picture everywhere. I would like
            more generic images." Rebalanced to finished work and close-up
            detail shots (fixtures, outlets, panels), which also sell the work
            better than another portrait does.
          */}
          <Reveal delay={100} className="mt-10">
            <PhotoGallery
              photos={[
                { name: 'illuminated-ornate-crystal-chandelier.JPG', alt: 'An ornate crystal chandelier wired and hung by Allsafe Electric' },
                { name: 'dual-usb-residential-wall-outlet.JPG', alt: 'A dual USB residential wall outlet installed by Allsafe Electric' },
                { name: 'modern-three-blade-ceiling-fan-with-light.JPG', alt: 'A modern three blade ceiling fan with light kit, installed and balanced' },
                { name: 'open-residential-electrical-breaker-panel.JPG', alt: 'A residential breaker panel with the cover off during service work' },
                { name: 'electrician-testing-gfci-kitchen-outlet.JPG', alt: 'Testing a GFCI kitchen outlet after installation' },
                { name: 'large-windmill-ceiling-fan-in-living-room.JPG', alt: 'A large windmill-style ceiling fan installed in a living room' },
                { name: 'electrician-installing-weatherproof-duplex-outlets.JPG', alt: 'Weatherproof duplex outlets being installed outdoors' },
                { name: 'illuminated-decorative-bowl-chandelier.JPG', alt: 'A decorative bowl chandelier lit after installation' },
                { name: 'electrician-working-on-outdoor-stone-wall-outlet.JPG', alt: 'Outdoor outlet work on a stone wall' },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* ── Service areas ───────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="areas-heading">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Service Areas</p>
            <h2 id="areas-heading" className="mt-3 text-h1">
              Proudly Serving the South Denver Metro Area
            </h2>
            <p className="mt-4 text-lead text-slate">
              Not sure if you are in our area? Call{' '}
              <a href={business.phone.href} className="font-semibold text-blue-600">
                {business.phone.display}
              </a>{' '}
              and we will let you know right away.
            </p>
            {/*
              Client request 2026-09-14: "on the home page on this section, the
              locations can be linked". This was a plain-text list of one city
              plus five Parker neighborhoods, none of them clickable, on a site
              that now has a real page for all 16 towns. Every entry is a link
              to its city page, which also makes the homepage the top of the
              location network for crawlers rather than a dead end.
            */}
            <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-2 sm:grid-cols-3">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/electricians/${c.slug}-co/`}
                    className="group flex items-center gap-2 rounded-btn px-2 py-1.5 text-body transition-colors hover:bg-blue-50"
                  >
                    <MapPinIcon
                      width={17}
                      height={17}
                      className="shrink-0 text-green-600 transition-transform group-hover:-translate-y-0.5"
                    />
                    <span className="group-hover:text-blue-700">{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-small text-grey">
              Plus the Parker neighborhoods of {tier3Neighborhoods.slice(0, -1).join(', ')} and{' '}
              {tier3Neighborhoods[tier3Neighborhoods.length - 1]}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/service-area/" className="btn btn-outline">
                All Service Areas
              </Link>
              <EstimateButton location="mid_page">Get a Quote</EstimateButton>
            </div>
          </Reveal>
          <Reveal delay={120} className="h-[400px] overflow-hidden rounded-card border border-rule shadow-photo">
            <MapFacade label="Allsafe Electric service area around Parker, CO" />
          </Reveal>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────
          Live Google reviews via Featurable. Was <Testimonials />, which read a
          hardcoded four-review JSON file and put the same Todd review on the
          homepage and most other pages (revision doc §1.10). */}
      <section className="section bg-paper">
        <div className="container-page">
          <ServiceReviews heading="What our customers say" />
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="faq-heading">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-heading" className="mt-3 text-h1">
              Questions Homeowners Ask Us
            </h2>
            <div className="mt-6 overflow-hidden rounded-card border border-rule shadow-photo">
              <SiteImage
                name="electrician-pointing-to-circuit-breaker.JPG"
                alt="An Allsafe Electric electrician pointing out a breaker during a home visit"
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
          </Reveal>
          <Reveal delay={120}>
            <FaqList faqs={homeFaqs.slice(0, 6)} heading="Common questions" id="home-faq" />
          </Reveal>
        </div>
      </section>

      {/*
        ── Service-area ticker ───────────────────────────────────────────
        The second instance of the ticker motif, in a different section and
        carrying different content, per the client's clarification 2026-09-14.
        Runs the opposite direction to the services ticker above so the two read
        as a deliberate pair rather than a repeat, and sits directly above the
        closing CTA where "do you cover me?" is the last open question. Every
        town links to its own page.
      */}
      <Marquee
        durationSec={60}
        reverse
        tone="navy"
        items={cities.map((c) => ({
          label: c.name,
          href: `/electricians/${c.slug}-co/`,
          icon: <MapPinIcon width={17} height={17} />,
        }))}
      />

      {/*
        ── CTA band ─────────────────────────────────────────────────────────
        bg-graphite-texture instead of bg-navy-gradient (already used for the
        hero above) so the two dark sections on this page read as distinct,
        "Job-Site Editorial" refresh 2026-09-13.
      */}
      <section className="surface-dark relative overflow-hidden bg-graphite-texture" id="estimate">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-green-600/15 blur-3xl"
        />
        <div className="container-page relative grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="eyebrow">Get a Quote</p>
            <h2 className="mt-3 text-h1 text-white">Ready to Schedule Your Visit?</h2>
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
                <CheckIcon width={16} height={16} className="shrink-0 text-green-500" />
                Licensed &amp; insured, master license {business.licenses.master.id}
              </li>
              <li className="flex items-center gap-2.5">
                <ClockIcon width={16} height={16} className="shrink-0 text-green-500" />
                {business.hours.humanReadable}, same-day emergency calls
              </li>
              <li className="flex items-center gap-2.5">
                <MapPinIcon width={16} height={16} className="shrink-0 text-green-500" />
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
