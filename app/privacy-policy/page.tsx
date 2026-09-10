import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageIntro } from '@/components/PageIntro';
import { Schema } from '@/components/Schema';
import { webPageNode, breadcrumbNode } from '@/lib/schema';
import { business } from '@/lib/business';

export const metadata: Metadata = pageMetadata({
  path: '/privacy-policy/',
  title: 'Privacy Policy | Allsafe Electric — Parker, CO',
  description:
    'How Allsafe Electric collects and uses your information — the estimate form, phone-call tracking and recording, and website analytics — and your choices.',
  index: true,
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Privacy policy', path: '/privacy-policy/' },
];

const LAST_UPDATED = 'September 10, 2026';

export default function PrivacyPage() {
  return (
    <>
      <Schema
        nodes={[
          webPageNode({
            path: '/privacy-policy/',
            name: 'Privacy policy',
            description: 'Allsafe Electric privacy policy.',
          }),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageIntro eyebrow="Legal" title="Privacy policy" crumbs={crumbs} />

      <div className="section">
        <div className="container-page prose-body space-y-5 text-[1.05rem]">
          <p className="text-muted">Last updated: {LAST_UPDATED}</p>

          <p>
            This policy explains what {business.name} (&ldquo;we,&rdquo; &ldquo;us&rdquo;) collects
            when you use this website or contact us, and what we do with it. Questions? Call{' '}
            <a href={business.phone.href} className="link-cta">
              {business.phone.display}
            </a>{' '}
            or email{' '}
            <a href={`mailto:${business.email.public}`} className="link-cta">
              {business.email.public}
            </a>
            .
          </p>

          <h2 className="text-step-2">What we collect</h2>
          <p>
            <strong>When you send an estimate request:</strong> your name, phone number, email
            address, ZIP code, a description of the work, and optionally a photo and a preferred
            timeframe. We use this only to respond to your request, schedule a visit, and provide
            the service.
          </p>
          <p>
            <strong>When you call us:</strong> we use CallRail to route and track calls. Calls may
            be <strong>recorded for quality and training</strong>. Colorado is a one-party-consent
            state; by continuing a recorded call you consent to the recording. Ask the person on the
            line and we will stop recording. CallRail also assigns a temporary tracking phone number
            so we can tell which ad or page a call came from — this does not identify you personally.
          </p>
          <p>
            <strong>When you book online:</strong> booking is handled by Housecall Pro on their own
            platform under their privacy policy. We receive the appointment details.
          </p>
          <p>
            <strong>When you browse the site:</strong> we use Google Analytics 4 to understand which
            pages are useful. With analytics consent, this sets cookies and collects a trimmed IP
            address, pages viewed, approximate location, device and referral source. Consent is
            requested where required and defaults to denied until you choose.
          </p>

          <h2 className="text-step-2">How we use it</h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>To respond to your request and carry out the work</li>
            <li>To schedule visits and send appointment updates</li>
            <li>To measure which marketing brings in genuine enquiries</li>
            <li>To improve the website</li>
            <li>To meet legal, licensing, and insurance obligations</li>
          </ul>
          <p>
            We do <strong>not</strong> sell your personal information. We do not send marketing
            email unless you ask us to.
          </p>

          <h2 className="text-step-2">Who we share it with</h2>
          <p>
            Only the service providers that make the business run: Housecall Pro (scheduling and
            customer records), CallRail (call handling), Google (analytics and ads measurement), and
            our email provider. Each processes data on our behalf. We may also disclose information
            if required by law.
          </p>

          <h2 className="text-step-2">Cookies and tracking</h2>
          <p>
            Essential cookies keep the site working. Analytics and advertising cookies load only
            after you consent (Google Consent Mode v2). You can clear cookies or block them in your
            browser at any time; the site still works.
          </p>

          <h2 className="text-step-2">Your choices</h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>Ask us what we hold about you, or ask us to correct or delete it</li>
            <li>Opt out of call recording at the start of a call</li>
            <li>Withdraw analytics consent in your browser or via the site&apos;s cookie controls</li>
            <li>
              Opt out of Google Analytics with the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener"
                className="link-cta"
              >
                Google Analytics opt-out add-on
              </a>
            </li>
          </ul>

          <h2 className="text-step-2">Data retention &amp; security</h2>
          <p>
            We keep enquiry and job records for as long as needed for the work, warranty, tax and
            legal purposes, then delete them. Analytics data is retained for 14 months. We use
            reasonable technical and organisational measures to protect your information; no method
            of transmission is completely secure.
          </p>

          <h2 className="text-step-2">Children</h2>
          <p>This site is not directed at children and we do not knowingly collect their data.</p>

          <h2 className="text-step-2">Changes</h2>
          <p>
            We will update this page if our practices change, and revise the date at the top.
          </p>

          <h2 className="text-step-2">Contact</h2>
          <p>
            {business.name}
            <br />
            {business.address.streetAddress}, {business.address.addressLocality},{' '}
            {business.address.addressRegion} {business.address.postalCode}
            <br />
            <a href={business.phone.href} className="link-cta">
              {business.phone.display}
            </a>{' '}
            ·{' '}
            <a href={`mailto:${business.email.public}`} className="link-cta">
              {business.email.public}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
