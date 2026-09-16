import { getReviews } from '@/lib/reviews';
import { Stars } from '@/components/Icons';
import { ReviewCard } from './ReviewCard';

/**
 * Full reviews grid for the /reviews/ page.
 *
 * Uses the shared <ReviewCard> so the card design matches the rails on the
 * homepage, service and location pages (client request 2026-09-17). This one
 * stays a grid rather than a rail: on a dedicated reviews page you want to see
 * everything at once, not swipe through it.
 */
export async function ReviewsSection({ services = [] }: { services?: string[] }) {
  const data = await getReviews();
  let reviews = data.reviews;

  if (services.length > 0) {
    const filtered = reviews.filter((r) => r.tags?.some((tag) => services.includes(tag)));
    if (filtered.length >= 2) reviews = filtered;
  }

  if (reviews.length === 0) return null;

  return (
    <section className="section bg-paper">
      <div className="container-page">
        <div className="mb-10 text-center">
          <h2 className="text-h2">What our customers say</h2>
          <p className="mt-2 flex flex-wrap items-center justify-center gap-2 text-slate">
            <span className="font-semibold">{data.averageRating.toFixed(1)} out of 5</span>
            <Stars rating={Math.round(data.averageRating)} size={18} />
            <span>based on {data.totalReviewCount} reviews</span>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={data.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            See all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
