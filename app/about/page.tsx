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
import { ServiceReviews } from '@/components/ServiceReviews';
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
        title="Your trusted residential electricians for the south Denver metro."
        lead="We are a dedicated team of licensed professionals committed to delivering safe, reliable, and high-quality electrical work for every home we serve."
        crumbs={crumbs}
      />

      {/* ── Proof band ──────────────────────────────────────────────────── */}
      <section className="border-b border-rule bg-paper py-10">
        <div className="container-page">
          <Reveal>
            <StatBand
              tone="light"
              items={[
                { value: 'Local', label: 'Parker Electricians', icon: <MapPinIcon width={20} height={20} /> },
                { value: 'Decades', label: 'Of combined experience', icon: <ClockIcon width={20} height={20} /> },
                { value: 'A+', label: 'BBB Rating', icon: <ShieldIcon width={20} height={20} /> },
                { value: '100%', label: 'Guaranteed Work', icon: <ShieldIcon width={20} height={20} /> },
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
              title="Expertise you can rely on"
              highlight="Expertise"
              lead="We bring decades of combined experience to every job. When you hire Allsafe Electric, you get dedicated, licensed professionals who see your project through from the initial estimate to the final inspection."
            />
          </Reveal>
          {/* items-start, and no h-full on either card below: the dog card's
              photo went portrait (see below), so it is now much taller than
              Judson's fixed-height photo. items-start alone was not enough —
              each card had its own `h-full`, an explicit height that still
              resolves to 100% of the row track regardless of align-items
              (align-items:start only stops AUTO-height items from
              stretching). With h-full removed from both cards too, each one
              is finally just as tall as its own content. */}
          <div className="mt-10 grid items-start gap-8 md:grid-cols-2">
            <Reveal>
              <article className="card flex flex-col overflow-hidden">
                <Parallax distance={26} className="h-[400px]">
                  <SiteImage
                    name="allsafe-electrician-blue-uniform-kitchen-portrait.JPG"
                    alt="Jud Cushing, owner and master electrician at Allsafe Electric, in a Parker kitchen"
                    fill
                    sizes="(min-width: 768px) 46vw, 100vw"
                    className="object-cover object-[50%_25%]"
                  />
                </Parallax>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-h3">Judson Cushing</h3>
                  <p className="mt-1 text-small font-semibold text-green-700">
                    Owner &amp; Master Electrician - {business.licenses.master.id}
                  </p>
                  <p className="mt-3 flex-1 text-body text-slate">
                    Jud has been in the trade over 20 years and founded Allsafe in
                    Parker in January 2018. He holds the master electrician license.
                  </p>
                  <p className="mt-3 flex-1 text-body text-slate">
                    He started Allsafe after seeing how hard it was for homeowners to find an
                    electrician they could trust: one who showed up when promised, worked
                    professionally, and treated every customer with the courtesy and respect he
                    would want for anyone working in his own home. Trust, responsibility and
                    courtesy are the foundation the business is built on.
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={120}>
              <article className="card flex flex-col overflow-hidden">
                {/* Portrait 4:5, not the old fixed h-[320px] landscape box, client
                    feedback 2026-09-18: at a landscape crop this 1284x1899 photo
                    (Jud's head ~12% down, the dog filling the lower 55-95%) could
                    only show one of the two, and it was cutting off the dog to
                    chest height, "looks like Jud is holding something dead." A
                    tested object-position on the untouched source file. */}
                <Parallax distance={26} className="aspect-[4/5]">
                  <SiteImage
                    name="allsafe-electrician-holding-dog.JPG"
                    alt="Jud Cushing of Allsafe Electric holding a customer's dog"
                    fill
                    sizes="(min-width: 768px) 46vw, 100vw"
                    className="object-cover object-[50%_68%]"
                  />
                </Parallax>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-h3">Good with dogs. Serious about safety.</h3>
                  <p className="mt-1 text-small font-semibold text-green-700">Our standards on every job</p>
                  <p className="mt-3 flex-1 text-body text-slate">
                    Shoe covers go on at the door. Work areas are fully protected, and every job is left cleaner than we found it. We are polite, respectful of your home, and we love working around your pets.
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
              lead="No acquisition, no franchise, no private equity rollup. Allsafe started as one electrician who wanted to do the work properly, and a business that grew because people kept calling back."
            />
            {/* Taller crop, client feedback 2026-09-18: the old h-60 (fixed
                240px) box cut Jud off at the chest. This image is a tall
                portrait (1284x1885) with his tool belt right at the bottom
                edge, so a 4:5 box anchored to the bottom keeps his head in
                frame and runs down through the belt instead of stopping
                short of it. */}
            <div className="mt-8 overflow-hidden rounded-card border border-rule shadow-photo">
              <SiteImage
                name="allsafe-electrician-in-home-service-portrait.JPG"
                alt="Jud Cushing of Allsafe Electric, tool belt on, in a customer's home"
                sizes="(min-width: 1024px) 420px, 100vw"
                className="aspect-[4/5] w-full object-cover object-bottom"
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
                  body: 'Jud leaves the larger shops and starts Allsafe Electric in Parker in January. We take pride in keeping things simple and efficient. From start to finish, our customers appreciate our quality of service.',
                },
                {
                  title: 'Reputation travels',
                  body: 'Parker and the surrounding Douglas County towns are small enough that reputation travels. The reviews speak for themselves: our electricians, Jud included, are consistently called out by name because homeowners genuinely enjoy working with them.',
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
            <h2 className="text-h2">Who We Are and What We Believe</h2>
            <p>
              Allsafe Electric started in January 2018 after Jud spent years working for larger
              shops. The goal was to be the electrician homeowners trust in their home:
              professional, dependable, and easy to work with.
            </p>
            <p>
              The thing customers say most often is some version of &ldquo;I can&apos;t believe
              you answered,&rdquo; or &ldquo;I can&apos;t believe you actually showed up.&rdquo;
              That reaction is the whole reason to keep doing it this way.
            </p>

            <h2 className="text-h2">How a visit works</h2>
            <p>
              You call or request a quote. A real person picks up during business hours. We confirm a
              two-hour arrival window, not &ldquo;sometime Tuesday.&rdquo; A licensed electrician
              arrives, looks at the job, and gives you a fixed price before any work starts. You
              decide. No pressure, no upsell, and if the honest answer is &ldquo;repair it,
              don&apos;t replace it,&rdquo; that is what you will hear.
            </p>
            <p>
              Shoe covers go on at the door. Tools stay on a drop cloth. Nobody smokes on your
              property. We love working around your pets.
            </p>

            <h2 className="text-h2">Strictly residential</h2>
            <p>
              Allsafe is a residential contractor. The panels, the code questions, the Douglas
              County permit process, the way a 1990s Parker home is wired: that is the work we do
              every day.
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
          </div>

          <aside className="space-y-5 lg:sticky lg:top-[calc(var(--header-h)+1rem)] lg:h-fit">
            {/* The portrait used here used to duplicate the one in the "How
                Allsafe got here" timeline above, back to back with only the
                credentials list between them on a long scroll (client
                feedback 2026-09-18: "it makes it look like the site ran out
                of photos"). Removed rather than swapped in a new photo, since
                this sticky card reads fine on its own next to the
                credentials list. */}
            <div className="card p-5">
              <h2 className="text-h3">The details</h2>
              <dl className="mt-3 space-y-2 text-[0.95rem]">
                <div>
                  <dt className="font-semibold">Founded</dt>
                  <dd className="text-grey">January {business.founded.year}, in Parker (8 years in business)</dd>
                </div>
                <div>
                  <dt className="font-semibold">Trade experience</dt>
                  <dd className="text-grey">Over 20 years in the electrical trade</dd>
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
                  <dd className="text-grey">Call or request a quote any time</dd>
                </div>
              </dl>
              <Link href="/reviews/" className="link-cta mt-4 inline-block text-[0.95rem]">
                Read what customers say
              </Link>
            </div>
          </aside>
        </div>
      </div>


      {/* ── Reviews ─────────────────────────────────────────────────────
          Live Google reviews. This was inside the gallery section that §3.6 of
          the revision doc removed, so it was dropped with it; re-added here as
          its own section 2026-09-17. */}
      <section className="section bg-paper">
        <div className="container-page">
          <ServiceReviews heading="What our customers say" />
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
