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
 * Rebuilt 2026-09-14. Positioning pivot 2026-09-15 (planning/docs/99-decisions-log):
 * the company is a scaling residential electrician serving 21 communities across four
 * counties — not a two-man operation defined by individual names. Justin is removed
 * from all Allsafe-authored copy (planning/docs/99 entry 2026-09-15). Customer review
 * text that names individuals may remain verbatim (those are the customer's words).
 *
 * The owner (Jud Cushing) is featured on this page as the licensed founder — this is
 * accurate, adds E-E-A-T, and is different from naming him as the singular person
 * who answers, shows up, and does all jobs.
 */

export const metadata: Metadata = pageMetadata({
  path: '/about/',
  title: 'About Allsafe Electric | Licensed Electrician, Parker CO',
  description:
    'Allsafe Electric is a licensed residential electrician based in Parker, CO, serving 21 communities across the south Denver metro since 2018. BBB A+.',
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
            description:
              'Allsafe Electric, a licensed residential electrician based in Parker, CO, serving the south Denver metro since 2018.',
            about: true,
          }),
          personNode(),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageIntro
        eyebrow="About"
        title="Allsafe Electric - licensed, local, residential."
        lead="No call center, no rotating crew. A licensed master electrician answers the phone, and a licensed electrician does the work, start to finish, in your home."
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
                { value: '15+', label: 'Years of master electrician experience', icon: <ShieldIcon width={20} height={20} /> },
                { value: `${cities.length}`, label: 'Communities we serve', icon: <MapPinIcon width={20} height={20} /> },
              ]}
            />
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <TrustBadges />
          </Reveal>
        </div>
      </section>

      {/* ── Who we are ──────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="team-heading">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="The team"
              id="team-heading"
              title="Licensed electricians, not a rotating crew"
              highlight="Licensed electricians"
              lead="Most home-services companies send whoever is free. Allsafe sends a licensed electrician who does your job start to finish. The same person who answers the phone is the person who turns up."
            />
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <Reveal className="flex h-full">
              <article className="card flex h-full flex-col overflow-hidden">
                <Parallax distance={26} className="h-[320px]">
                  <SiteImage
                    name="allsafe-electrician-blue-uniform-kitchen-portrait.JPG"
                    alt="Jud Cushing, owner and master electrician at Allsafe Electric, in a Parker kitchen"
                    fill
                    sizes="(min-width: 768px) 46vw, 100vw"
                    className="object-cover object-top"
                  />
                </Parallax>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-h3">Judson Cushing</h3>
                  <p className="mt-1 text-small font-semibold text-green-700">
                    Owner &amp; Master Electrician - {business.licenses.master.id}
                  </p>
                  <p className="mt-3 flex-1 text-body text-slate">
                    Jud has been in the trade more than fifteen years and founded Allsafe in
                    Parker in January 2018. He holds the master electrician license and oversees
                    every job the company takes on. If you want a straight answer about whether
                    something needs replacing or just repairing, you will get one.
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={120} className="flex h-full">
              <article className="card flex h-full flex-col overflow-hidden">
                <Parallax distance={26} className="h-[320px]">
                  <SiteImage
                    name="allsafe-electrician-holding-dog.JPG"
                    alt="An Allsafe Electric licensed electrician holding a customer's dog during a job"
                    fill
                    sizes="(min-width: 768px) 46vw, 100vw"
                    className="object-cover"
                  />
                </Parallax>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-h3">Good with dogs. Serious about safety.</h3>
                  <p className="mt-1 text-small font-semibold text-green-700">Our standards on every job</p>
                  <p className="mt-3 flex-1 text-body text-slate">
                    Shoe covers go on at the door. Tools stay on a drop cloth. Nobody smokes on
                    your property. We are fine working around your pets. Every job is left cleaner
                    than we found it. These are company standards, not exceptions.
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
                  body: 'Parker and the surrounding Douglas County towns are small enough that reputation travels. The reviews that accumulate name the crew personally rather than the company, which is the clearest sign the work is being done by the people who sold it.',
                },
                {
                  title: 'The service area widens',
                  body: `Castle Rock, Highlands Ranch, Lone Tree, Centennial and the rural properties out toward Franktown and Elizabeth get added as demand appears. Today Allsafe covers ${cities.length} communities across Douglas, Arapahoe, Elbert and Jefferson counties.`,
                },
                {
                  title: 'Growing to serve the whole metro',
                  body: 'Scaling the right way means adding licensed electricians who meet the same standards, not sending whoever is available. Every job still gets a licensed electrician, a fixed price, and a two-hour arrival window.',
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
              Allsafe Electric started in January 2018 after years working for larger shops. The
              idea was simple: be the electrician people actually want in their house. Answer the
              phone. Turn up when you said. Leave the place cleaner than you found it.
            </p>
            <p>
              It sounds obvious. It is also, apparently, rare. The thing customers say most often
              is some version of &ldquo;I can&apos;t believe you answered,&rdquo; or &ldquo;I
              can&apos;t believe you actually showed up.&rdquo; That reaction is the whole reason to
              keep doing it this way.
            </p>

            <h2 className="text-h2">How a visit works</h2>
            <p>
              You call or book online. A real person picks up during business hours. We confirm a
              two-hour arrival window, not &ldquo;sometime Tuesday.&rdquo; A licensed electrician
              arrives, looks at the job, and gives you a fixed price before any work starts. You
              decide. No pressure, no upsell, and if the honest answer is &ldquo;repair it,
              don&apos;t replace it,&rdquo; that is what you will hear.
            </p>
            <p>
              Shoe covers go on at the door. Tools stay on a drop cloth. Nobody smokes on your
              property. We are fine working around your pets.
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
              Screened &amp; Approved. Badge links go to the respective verification profiles.
            </p>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:h-fit">
            <div className="overflow-hidden rounded-card border border-rule">
              <SiteImage
                name="allsafe-electrician-in-home-service-portrait.JPG"
                alt="An Allsafe Electric licensed electrician on a job in a Parker home"
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
                  <dt className="font-semibold">Trade experience</dt>
                  <dd className="text-grey">15+ years in the electrical trade</dd>
                </div>
                <div>
                  <dt className="font-semibold">License holder</dt>
                  <dd className="text-grey">Judson Cushing, Master Electrician</dd>
                </div>
                <div>
                  <dt className="font-semibold">Hours</dt>
                  <dd className="text-grey">{business.hours.humanReadable}, Mountain time</dd>
                </div>
                <div>
                  <dt className="font-semibold">Scheduling</dt>
                  <dd className="text-grey">Call or book online any time</dd>
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

      {/* ── Where to go next ───────────────────────────────────────────── */}
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
              <h3 className="text-h3">Communities we serve</h3>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {cities.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/electricians/${c.slug}-co/`}
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

      <CtaBlock heading="Schedule your visit with Allsafe Electric" />
    </>
  );
}
