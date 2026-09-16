import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageIntro } from '@/components/PageIntro';
import { ReviewsSection } from '@/components/ReviewsSection';
import { FeaturableReviews } from '@/components/FeaturableReviews';
import { CtaBlock } from '@/components/sections';
import { Schema } from '@/components/Schema';
import { webPageNode, breadcrumbNode } from '@/lib/schema';
import { business } from '@/lib/business';

export const metadata: Metadata = pageMetadata({
  path: '/reviews/',
  title: 'Allsafe Electric Reviews | Parker, CO Electrician',
  description:
    'Read Allsafe Electric’s Google reviews. Real customers in Parker and Douglas County who name our team. Then leave your own after your visit.',
  ogEyebrow: 'Reviews · Parker, CO',
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Reviews', path: '/reviews/' },
];

export default function ReviewsPage() {
  return (
    <>
      {/* WebPage only, no Review / aggregateRating schema until first-party
          collection exists (planning/docs/06 §3, docs/99 2026-09-08). */}
      <Schema
        nodes={[
          webPageNode({
            path: '/reviews/',
            name: 'Allsafe Electric reviews',
            description: 'Google reviews for Allsafe Electric, a residential electrician in Parker, CO.',
          }),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageIntro
        eyebrow="Reviews"
        title="What Parker homeowners say about us"
        crumbs={crumbs}
      />

      {/* Live Google reviews pulled from the Google Business Profile via
          Featurable. Added 2026-09-16 at the client's request. */}
      <section className="section" aria-labelledby="google-reviews-heading">
        <div className="container-page">
          <h2 id="google-reviews-heading" className="text-h2">
            Our latest Google reviews
          </h2>
          <p className="mt-3 max-w-2xl text-grey">
            Straight from our Google Business Profile, updated automatically.
          </p>
          <FeaturableReviews className="mt-8" />
        </div>
      </section>

      <ReviewsSection />

      <section className="section">
        <div className="container-page max-w-2xl">
          <h2 className="text-h2">Just had us out? Leave a review</h2>
          <p className="mt-3 text-grey">
            It takes a minute and it genuinely helps other people in Parker find an electrician they
            can trust. If you can mention what we fixed, a panel, an EV charger, a tripping breaker, that helps even more.
          </p>
          <a
            href={business.google.writeReviewUrl}
            target="_blank"
            rel="noopener"
            className="btn btn-primary mt-6"
          >
            Leave a Google review
          </a>
          <p className="mt-4 text-[0.9rem] text-grey">
            We respond to every review, good or bad, usually within a couple of days.
          </p>
        </div>
      </section>

      <CtaBlock heading="Ready to book your own visit?" />
    </>
  );
}
