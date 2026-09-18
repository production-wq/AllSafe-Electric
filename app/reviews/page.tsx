import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PageIntro } from '@/components/PageIntro';
import { ReviewsSection } from '@/components/ReviewsSection';
import { CtaBlock } from '@/components/sections';
import { Schema } from '@/components/Schema';
import { webPageNode, breadcrumbNode } from '@/lib/schema';
import { business, SITE_URL } from '@/lib/business';
import { getReviews } from '@/lib/reviews';

export const metadata: Metadata = pageMetadata({
  path: '/reviews/',
  title: "Allsafe Electric Reviews | South Denver Metro Electrician",
  description:
    "Read Allsafe Electric’s Google reviews. Real customers across the South Denver metro who name our team. Then leave your own after your visit.",
  ogEyebrow: 'Reviews · South Denver Metro',
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Reviews', path: '/reviews/' },
];

export default async function ReviewsPage() {
  const payload = await getReviews();
  const sampleReviews = payload.reviews.slice(0, 8);
  const reviewSchema = sampleReviews.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.authorName },
    reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
    reviewBody: r.text,
    ...(r.publishTime ? { datePublished: r.publishTime.slice(0, 10) } : {}),
    itemReviewed: { '@id': `${SITE_URL}/#business` },
  }));

  return (
    <>
      <Schema
        nodes={[
          webPageNode({
            path: '/reviews/',
            name: 'Allsafe Electric reviews',
            description: 'Google reviews for Allsafe Electric, a residential electrician serving the South Denver metro.',
          }),
          breadcrumbNode(crumbs),
          ...reviewSchema,
        ]}
      />
      <PageIntro
        eyebrow="Reviews"
        title="What South Denver metro homeowners say about us"
        crumbs={crumbs}
      />

      {/* One reviews section, not two. The Featurable JS embed was removed
          2026-09-17: the client preferred the server-rendered version, and it
          is the better choice anyway since the embed renders client-side into
          a shadow DOM, so search engines never see the review text. Both read
          the same Google Business Profile. */}
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
