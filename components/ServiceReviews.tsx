import Link from 'next/link';
import { getReviewsForServices } from '@/lib/reviews';
import { Stars, GoogleG } from '@/components/Icons';

/**
 * Live, service-matched Google reviews. Server component.
 *
 * Replaces <FeaturedTestimonial>, which read a hardcoded four-review JSON file
 * and therefore showed the same Todd review on nearly every page (revision doc
 * §1.10). Reviews here come from the Featurable API, are keyword-tagged in
 * lib/reviews.ts, and update on their own as new Google reviews land.
 *
 * `tags` are the service tags this page cares about. When there are not enough
 * matches the helper tops up with recent 5-star reviews, so the section is
 * never thin.
 *
 * Renders nothing at all if there are no reviews, rather than an empty shell.
 */
export async function ServiceReviews({
  tags = [],
  limit = 3,
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

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {reviews.map((r) => (
          <figure key={r.id} className="card flex h-full flex-col p-5">
            <Stars rating={r.rating} size={15} />
            <blockquote className="mt-3 flex-1 text-body text-slate">
              {truncate(r.text, 240)}
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-2.5 border-t border-rule pt-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-blue-600 text-small font-bold text-white">
                {r.authorName.charAt(0)}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-small font-semibold text-ink">
                  {r.authorName}
                </span>
                <span className="block text-tiny text-grey">Google review</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-6">
        <Link href="/reviews/" className="link-cta">
          Read more customer reviews
        </Link>
      </p>
    </section>
  );
}

/** Trim to a word boundary so cards stay even without cutting mid-word. */
function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' '))}...`;
}
