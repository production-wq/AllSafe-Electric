import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { PageIntro } from '@/components/PageIntro';
import { SiteImage } from '@/components/SiteImage';
import { CtaBlock } from '@/components/sections';
import { Schema } from '@/components/Schema';
import { webPageNode, breadcrumbNode, personNode } from '@/lib/schema';
import { business } from '@/lib/business';

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
        lead="No call centre, no rotating crew, no sales rep. When you book Allsafe Electric, one of two licensed electricians shows up, and it is usually Jud, who has run the business out of Parker since 2018."
        crumbs={crumbs}
      />

      <div className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="prose-body space-y-5 text-[1.08rem]">
            <div className="overflow-hidden rounded-card border border-rule">
              <SiteImage
                name="allsafe-electrician-blue-uniform-kitchen-portrait.JPG"
                alt="Jud Cushing of Allsafe Electric in a blue company polo in a Parker kitchen"
                sizes="(min-width: 1024px) 720px, 100vw"
                className="w-full"
              />
            </div>
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
              Licences &amp; credentials
            </h2>
            <p>
              Both licences below are current and verifiable through the Colorado Department of
              Regulatory Agencies (DORA) licence lookup. Every permitted job is inspected by the
              local jurisdiction, the Town of Parker, Douglas County, or the relevant city.
            </p>
            <ul className="not-prose space-y-2">
              <li className="card p-4">
                <span className="font-semibold">Master Electrician Licence</span> ·{' '}
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
                <span className="font-semibold">Electrical Contractor Licence</span> ·{' '}
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
            <p className="text-[0.95rem] text-muted">
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
                  <dd className="text-muted">January {business.founded.year}, in Parker</dd>
                </div>
                <div>
                  <dt className="font-semibold">Team</dt>
                  <dd className="text-muted">Jud Cushing and Justin</dd>
                </div>
                <div>
                  <dt className="font-semibold">Hours</dt>
                  <dd className="text-muted">{business.hours.humanReadable}, Mountain time</dd>
                </div>
                <div>
                  <dt className="font-semibold">Scheduling</dt>
                  <dd className="text-muted">{business.crm}. Book online any time</dd>
                </div>
              </dl>
              <Link href="/reviews/" className="link-cta mt-4 inline-block text-[0.95rem]">
                Read what customers say
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <CtaBlock heading="Meet Jud on your next electrical job" />
    </>
  );
}
