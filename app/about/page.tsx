import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { PageIntro } from '@/components/PageIntro';
import { SiteImage } from '@/components/SiteImage';
import { CtaBlock, StatBand } from '@/components/sections';
import { Schema } from '@/components/Schema';
import { webPageNode, breadcrumbNode, personNode } from '@/lib/schema';
import { business } from '@/lib/business';
import { Reveal } from '@/components/Reveal';
import { Parallax } from '@/components/Parallax';
import { StepList } from '@/components/StepList';
import { PhotoGallery } from '@/components/PhotoGallery';
import { SectionHeading } from '@/components/SectionHeading';
import { FeaturedTestimonial } from '@/components/Testimonials';
import { TrustBadges } from '@/components/TrustBadges';
import { services } from '@/lib/services';
import { cities } from '@/lib/cities';
import { ClockIcon, ShieldIcon, GoogleG, MapPinIcon } from '@/components/Icons';

/**
 * About page.
 *
 * Rebuilt 2026-09-14. The previous version carried roughly 580 words in <main>:
 * one photo, four headings each followed by a paragraph or two, and a sidebar
 * list. The client's assessment was blunt and correct: "the About Us page has so
 * less content and also isn't really good UI design as well."
 *
 * This version adds a company timeline, a real process walkthrough, a stat band,
 * a gallery, a testimonial, credentials with verification links, and outbound
 * links into the services and service-area networks (it previously linked to
 * nothing but /reviews/).
 *
 * Deliberately, this is also the page that carries the person photography. The
 * client asked that Jud not appear on every page ("I don't want the one guy's
 * picture everywhere. You can use it on about us page or on one section on the
 * home page"), so the portraits concentrate here.
 */

export const metadata: Metadata = pageMetadata({
  path: '/about/',
  title: 'About Allsafe Electric | Jud & Justin, Parker CO',
  description:
    'Allsafe Electric is Jud Cushing, a licensed master electrician in Parker since 2018, and Justin. The two of them do the work themselves, start to finish.',
  ogEyebrow: 'About · Parker, CO',
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about/' },
];

export default function AboutPage() {
  return (
    <>
      <Schema
        nodes={[
          {
            '@type': 'AboutPage',
            '@id': `${business.google.profileUrl}#about`,
            name: 'About Allsafe Electric',
            url: '/about/',
          },
          webPageNode({
            path: '/about/',
            name: 'About Allsafe Electric',
            description: 'Who Jud and Justin are, and how Allsafe Electric works.',
            about: true,
          }),
          personNode(),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageIntro
        eyebrow="About"
        title="It's Jud and Justin. That's the company."
        lead="No call center, no rotating crew, no sales rep. When you book Allsafe Electric, one of two licensed electricians shows up, and it is usually Jud, who has run the business out of Parker since 2018."
        crumbs={crumbs}
      />

      {/* ── Proof band ──────────────────────────────────────────────────── */}
      <section className="border-b border-rule bg-paper py-10">
        <div className="container-page">
          <Reveal>
            <StatBand
              tone="light"
              items={[
                { value: '8+', label: 'Years in business', icon: <ClockIcon width={20} height={20} /> },
                {
                  value: `${business.google.reviewCount}`,
                  label: '5-star Google reviews',
                  icon: <GoogleG className="h-5 w-5" />,
                },
                { value: '2', label: 'Licensed electricians, no subcontractors', icon: <ShieldIcon width={20} height={20} /> },
                { value: `${cities.length}`, label: 'Towns we cover', icon: <MapPinIcon width={20} height={20} /> },
              ]}
            />
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <TrustBadges />
          </Reveal>
        </div>
      </section>

      {/* ── The two of us ───────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="team-heading">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="The team"
              id="team-heading"
              title="Two electricians, not a rotating crew"
              highlight="Two electricians"
              lead="Most home-services companies send whoever is free. Allsafe is Jud and Justin, and one of them does your job start to finish."
            />
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <Reveal className="flex h-full">
              <article className="card flex h-full flex-col overflow-hidden">
                <Parallax distance={26} className="h-[320px]">
                  <SiteImage
                    name="allsafe-electrician-blue-uniform-kitchen-portrait.JPG"
                    alt="Jud Cushing of Allsafe Electric in a blue company polo in a Parker kitchen"
                    fill
                    sizes="(min-width: 768px) 46vw, 100vw"
                    className="object-cover object-top"
                  />
                </Parallax>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-h3">Jud Cushing</h3>
                  <p className="mt-1 text-small font-semibold text-green-700">
                    Owner, Master Electrician {business.licenses.master.id}
                  </p>
                  <p className="mt-3 flex-1 text-body text-slate">
                    Jud has been in the trade more than fifteen years and has run Allsafe out of
                    Parker since 2018. He is usually the person who answers the phone, and usually
                    the person who turns up. If you get a straight answer about whether something
                    needs replacing or just repairing, it came from him.
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={120} className="flex h-full">
              <article className="card flex h-full flex-col overflow-hidden">
                <Parallax distance={26} className="h-[320px]">
                  <SiteImage
                    name="allsafe-electrician-holding-dog.JPG"
                    alt="An Allsafe Electric electrician holding a customer's dog during a job"
                    fill
                    sizes="(min-width: 768px) 46vw, 100vw"
                    className="object-cover"
                  />
                </Parallax>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-h3">Justin</h3>
                  <p className="mt-1 text-small font-semibold text-green-700">Licensed electrician</p>
                  <p className="mt-3 flex-1 text-body text-slate">
                    Justin is the other half of the company. Between the two of them every job is
                    covered without bringing in a subcontractor nobody has met. Customers name them
                    both personally in Google reviews, which is not something that happens when a
                    different van shows up each visit.
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Timeline ────────────────────────────────────────────────────── */}
      <section className="section bg-paper" aria-labelledby="story-heading">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Our story"
              id="story-heading"
              title="How Allsafe got here"
              highlight="Allsafe"
              lead="No acquisition, no franchise, no private-equity roll-up. One electrician who wanted to do it properly, and a business that grew because people kept calling back."
            />
            <div className="mt-8 overflow-hidden rounded-card border border-rule shadow-photo">
              <SiteImage
                name="allsafe-electrician-in-home-service-portrait.JPG"
                alt="An Allsafe Electric electrician working in a Parker home"
                sizes="(min-width: 1024px) 420px, 100vw"
                className="h-60 w-full object-cover object-[50%_25%]"
                aspable={false}
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <StepList
              tone="green"
              steps={[
                {
                  title: '2018, the business starts',
                  body: 'Jud leaves the larger shops and starts Allsafe Electric in Parker in January. The premise is unglamorous: answer the phone, arrive when you said you would, and leave the house cleaner than you found it.',
                },
                {
                  title: 'Word of mouth does the marketing',
                  body: 'Parker and the surrounding Douglas County towns are small enough that reputation travels. The reviews that accumulate name Jud and Justin personally rather than the company, which is the clearest sign the work is being done by the people who sold it.',
                },
                {
                  title: 'The service area widens',
                  body: `Castle Rock, Highlands Ranch, Lone Tree, Centennial and the rural properties out toward Franktown and Elizabeth get added as demand appears. Today Allsafe covers ${cities.length} towns across Douglas, Arapahoe, Elbert and Jefferson counties.`,
                },
                {
                  title: 'Still deliberately two people',
                  body: 'Growing headcount would mean sending electricians the customer has never met, which is the exact thing Allsafe exists to avoid. The company stays small on purpose, which is also why the schedule is weekdays 8am to 6pm rather than a 24-hour promise nobody could keep.',
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <div className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="prose-body space-y-5 text-[1.08rem]">
            <h2 className="text-h2">Why the business exists</h2>
            <p>
              Jud started Allsafe Electric in January 2018 after years working for larger shops. The
              idea was simple: be the electrician people actually want in their house. Answer the
              phone. Turn up when you said. Leave the place cleaner than you found it.
            </p>
            <p>
              It sounds obvious. It is also, apparently, rare, the thing customers say most often
              is some version of &ldquo;I can&apos;t believe you answered,&rdquo; or &ldquo;I
              can&apos;t believe you actually showed up.&rdquo; That reaction is the whole reason to
              keep doing it this way.
            </p>

            <h2 className="text-h2">How a visit works</h2>
            <p>
              You call or book online. A real person picks up during business hours. We confirm a
              two-hour arrival window, not &ldquo;sometime Tuesday.&rdquo; Jud arrives, looks at the
              job, and gives you a fixed price before any work starts. You decide. No pressure, no
              upsell, and if the honest answer is &ldquo;repair it, don&apos;t replace it,&rdquo;
              that is what you will hear.
            </p>
            <p>
              Shoe covers go on at the door. Tools stay on a drop cloth. Nobody smokes on your
              property. Jud has a dog of his own and is fine working around yours.
            </p>

            <h2 className="text-h2">Strictly residential</h2>
            <p>
              Allsafe is a residential contractor, houses, not warehouses. That focus is
              deliberate. The panels, the code questions, the Douglas County permit process, the way
              a 1990s Parker home is wired: that is the work we do every day and know cold.
            </p>

            <h2 id="credentials" className="scroll-mt-28 text-h2">
              Licenses &amp; credentials
            </h2>
            <p>
              Both licenses below are current and verifiable through the Colorado Department of
              Regulatory Agencies (DORA) license lookup. Every permitted job is inspected by the
              local jurisdiction, the Town of Parker, Douglas County, or the relevant city.
            </p>
            <ul className="not-prose space-y-2">
              <li className="card p-4">
                <span className="font-semibold">Master Electrician License</span> ·{' '}
                {business.licenses.master.id} ·{' '}
                <a
                  href={business.licenses.verifyUrl}
                  target="_blank"
                  rel="noopener"
                  className="link-cta text-[0.95rem]"
                >
                  Verify on DORA
                </a>
              </li>
              <li className="card p-4">
                <span className="font-semibold">Electrical Contractor License</span> ·{' '}
                {business.licenses.contractor.id} ·{' '}
                <a
                  href={business.licenses.verifyUrl}
                  target="_blank"
                  rel="noopener"
                  className="link-cta text-[0.95rem]"
                >
                  Verify on DORA
                </a>
              </li>
            </ul>
            <p className="text-[0.95rem] text-grey">
              Allsafe Electric is also a BBB Accredited Business with an A+ rating and HomeAdvisor
              Screened &amp; Approved. Award badges shown on the site link here; profile links are
              being added.
            </p>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:h-fit">
            <div className="overflow-hidden rounded-card border border-rule">
              <SiteImage
                name="allsafe-electrician-holding-dog.JPG"
                alt="Jud from Allsafe Electric holding a French bulldog during a job"
                sizes="360px"
                className="w-full"
              />
            </div>
            <div className="card p-5">
              <h2 className="text-h3">The details</h2>
              <dl className="mt-3 space-y-2 text-[0.95rem]">
                <div>
                  <dt className="font-semibold">Founded</dt>
                  <dd className="text-grey">January {business.founded.year}, in Parker (8 years in business)</dd>
                </div>
                <div>
                  <dt className="font-semibold">Jud&apos;s experience</dt>
                  <dd className="text-grey">15+ years in the trade, 8 running Allsafe</dd>
                </div>
                <div>
                  <dt className="font-semibold">Team</dt>
                  <dd className="text-grey">Jud Cushing and Justin</dd>
                </div>
                <div>
                  <dt className="font-semibold">Hours</dt>
                  <dd className="text-grey">{business.hours.humanReadable}, Mountain time</dd>
                </div>
                <div>
                  <dt className="font-semibold">Scheduling</dt>
                  <dd className="text-grey">{business.crm}. Book online any time</dd>
                </div>
              </dl>
              <Link href="/reviews/" className="link-cta mt-4 inline-block text-[0.95rem]">
                Read what customers say
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Gallery ─────────────────────────────────────────────────────── */}
      <section className="section bg-paper" aria-labelledby="about-gallery-heading">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="On the job"
              id="about-gallery-heading"
              title="This is what our work actually looks like"
              highlight="our work"
              lead="Every photograph on this site is a real Allsafe job. No stock photography, and no borrowed portfolios."
            />
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <PhotoGallery
              photos={[
                { name: 'electrician-tightening-connections-in-breaker-panel.JPG', alt: 'Tightening connections inside a residential breaker panel' },
                { name: 'illuminated-ornate-crystal-chandelier.JPG', alt: 'A crystal chandelier wired and hung by Allsafe Electric' },
                { name: 'electrician-testing-gfci-kitchen-outlet.JPG', alt: 'Testing a GFCI kitchen outlet' },
                { name: 'allsafe-electrician-putting-on-protective-shoe-covers.JPG', alt: 'Shoe covers going on before entering a customer home' },
                { name: 'electrician-installing-weatherproof-duplex-outlets.JPG', alt: 'Installing weatherproof outdoor outlets' },
                { name: 'modern-three-blade-ceiling-fan-with-light.JPG', alt: 'A ceiling fan installed and balanced' },
                { name: 'open-residential-electrical-breaker-panel.JPG', alt: 'An open residential breaker panel during service work' },
                { name: 'electrician-tool-bag-on-kitchen-counter.JPG', alt: 'An Allsafe Electric tool bag on a kitchen counter' },
                { name: 'dual-usb-residential-wall-outlet.JPG', alt: 'A dual USB wall outlet installed by Allsafe Electric' },
              ]}
            />
          </Reveal>
          <Reveal delay={160} className="mt-10">
            <FeaturedTestimonial authorIndex={0} />
          </Reveal>
        </div>
      </section>

      {/* ── Where to go next. About previously linked to nothing but /reviews/. */}
      <section className="section" aria-labelledby="next-heading">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Explore"
              id="next-heading"
              title="What we do, and where we do it"
              highlight="where we do it"
            />
          </Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <Reveal>
              <h3 className="text-h3">Our services</h3>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/${s.slug}/`}
                      className="block rounded-btn border border-rule bg-white px-3 py-2 text-small transition-colors hover:border-blue-300 hover:bg-blue-50"
                    >
                      {s.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="text-h3">Towns we cover</h3>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {cities.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/electrician-${c.slug}/`}
                      className="flex items-center gap-2 rounded-btn border border-rule bg-white px-3 py-2 text-small transition-colors hover:border-blue-300 hover:bg-blue-50"
                    >
                      <MapPinIcon width={14} height={14} className="shrink-0 text-green-600" />
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-body text-slate">
                Not sure if you are covered? <Link href="/service-area/">See the full service area</Link>{' '}
                or <Link href="/contact/">get in touch</Link> and we will tell you straight away.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBlock heading="Meet Jud on your next electrical job" />
    </>
  );
}
