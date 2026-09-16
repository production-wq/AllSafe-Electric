import Link from 'next/link';
import { getReviewsForServices } from '@/lib/reviews';
import { Stars, GoogleG } from '@/components/Icons';
import { ReviewRail } from './ReviewRail';

/**
 * Live, service-matched Google reviews in a horizontal rail. Server component.
 *
 * Replaces the hardcoded testimonial that showed the same Todd review on nearly
 * every page (revision doc §1.10). Reviews come from the Featurable API, are
 * keyword-tagged in lib/reviews.ts, and update on their own as new Google
 * reviews land.
 *
 * Card design and rail behaviour are shared with the reviews page via
 * <ReviewCard> and <ReviewRail>, at the client's request 2026-09-17: same look
 * everywhere, scrollable left-to-right on homepage, service and location pages.
 *
 * `tags` are the service tags this page cares about. Where there are not enough
 * matches the helper tops up with recent 5-star reviews, so a page never
 * renders a thin section. Renders nothing at all when there are no reviews.
 */
export async function ServiceReviews({
  tags = [],
  limit = 8,
  heading = 'What customers say about this work',
  className = '',
}: {
  tags?: string[];
  limit?: number;
  heading?: string;
  className?: string;
}) {
  const { reviews, payload } = await getReviewsForServices(tags, limit);
  if (reviews.length === 0) return null;

  return (
    <section aria-labelledby="service-reviews-heading" className={className}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Reviews</p>
          <h2 id="service-reviews-heading" className="mt-3 text-h2">
            {heading}
          </h2>
        </div>
        <p className="flex items-center gap-2 text-small text-grey">
          <GoogleG className="h-4 w-4" />
          <span className="font-semibold text-ink">{payload.averageRating.toFixed(1)}</span>
          <Stars rating={5} size={15} />
          <span>{payload.totalReviewCount} reviews</span>
        </p>
      </div>

      <div className="mt-8">
        <ReviewRail reviews={reviews} />
      </div>

      <p className="mt-2">
        <Link href="/reviews/" className="link-cta">
          Read more customer reviews
        </Link>
      </p>
    </section>
  );
}
