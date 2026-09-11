import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageIntro } from '@/components/PageIntro';
import { EstimateForm } from '@/components/EstimateForm';
import { MapFacade } from '@/components/MapFacade';
import { Schema } from '@/components/Schema';
import { webPageNode, breadcrumbNode } from '@/lib/schema';
import { business } from '@/lib/business';
import { CallButton, BookButton } from '@/components/cta';
import { PhoneIcon, MapPinIcon, ClockIcon } from '@/components/Icons';

export const metadata: Metadata = pageMetadata({
  path: '/contact/',
  title: 'Contact Allsafe Electric | Parker, CO Electrician',
  description:
    'Call (303) 648-1934, book online, or send an estimate request. Allsafe Electric replies the same business day. Parker, CO and the south Denver metro.',
  ogEyebrow: 'Contact · Parker, CO',
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact/' },
];

export default function ContactPage() {
  const a = business.address;
  return (
    <>
      <Schema
        nodes={[
          { '@type': 'ContactPage', name: 'Contact Allsafe Electric', url: '/contact/' },
          webPageNode({
            path: '/contact/',
            name: 'Contact Allsafe Electric',
            description: 'Call, book, or request an estimate from Allsafe Electric in Parker, CO.',
            about: true,
          }),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageIntro
        eyebrow="Contact"
        title="Three ways to reach us"
        lead="Call and talk to a real person, book a visit online, or send the details and we'll reply the same business day. If it's an emergency, call. Don't wait for the email."
        crumbs={crumbs}
      />

      <div className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="flex flex-wrap gap-3">
              <CallButton location="mid_page" variant="outline" />
              <BookButton location="mid_page" variant="primary" />
            </div>

            <div id="estimate" className="mt-10 scroll-mt-28 card p-6 md:p-8">
              <h2 className="text-h2">Request an estimate</h2>
              <p className="mt-2 text-grey">
                Eight quick fields. A photo of the panel or the problem really speeds things up.
              </p>
              <EstimateForm formId="contact-estimate" />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card p-6">
              <h2 className="text-h3">Allsafe Electric</h2>
              <address className="mt-3 space-y-3 not-italic text-[1rem]">
                <p className="flex items-start gap-2 text-grey">
                  <MapPinIcon width={18} height={18} className="mt-1 shrink-0 text-blue-600" />
                  <span>
                    {a.streetAddress}
                    <br />
                    {a.addressLocality}, {a.addressRegion} {a.postalCode}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <PhoneIcon width={18} height={18} className="shrink-0 text-blue-600" />
                  <a href={business.phone.href} className="font-semibold text-blue-700">
                    {business.phone.display}
                  </a>
                </p>
                <p className="flex items-start gap-2 text-grey">
                  <ClockIcon width={18} height={18} className="mt-1 shrink-0 text-blue-600" />
                  <span>
                    {business.hours.humanReadable}
                    <br />
                    Mountain time · book online any time
                  </span>
                </p>
              </address>
              <div className="mt-4 flex flex-wrap gap-4 text-[0.95rem]">
                <a href={business.google.directionsUrl} target="_blank" rel="noopener" className="link-cta">
                  Get directions
                </a>
                <a href={business.google.profileUrl} target="_blank" rel="noopener" className="link-cta">
                  Google profile
                </a>
              </div>
              <p className="mt-4 border-t border-rule pt-3 text-[0.9rem] text-grey">
                Licenses {business.licenses.master.id} · {business.licenses.contractor.id}
              </p>
            </div>
            <div className="h-72">
              <MapFacade />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
