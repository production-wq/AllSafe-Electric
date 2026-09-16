import { getReviews } from '@/lib/reviews';
import { Stars } from '@/components/Icons';

export async function ReviewsSection({ services = [] }: { services?: string[] }) {
  const data = await getReviews();
  let reviews = data.reviews;

  // Filter reviews based on tags if services are provided
  if (services.length > 0) {
    const filtered = reviews.filter((r) => r.tags?.some((tag) => services.includes(tag)));
    if (filtered.length >= 2) {
      // Use filtered if we have at least a couple, otherwise fall back to all
      reviews = filtered;
    }
  }

  // Cap at a reasonable number for display, e.g. 5
  reviews = reviews.slice(0, 5);

  return (
    <section className="section bg-paper">
      <div className="container-page">
        <div className="text-center mb-10">
          <h2 className="text-h2">What our customers say</h2>
          {data.averageRating && data.totalReviewCount && (
            <p className="mt-2 text-slate flex items-center justify-center gap-2">
              <span className="font-semibold">{data.averageRating.toFixed(1)} out of 5</span>
              <Stars rating={Math.round(data.averageRating)} className="text-yellow-500 text-lg" />
              <span>based on {data.totalReviewCount} reviews</span>
            </p>
          )}
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <div key={i} className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-200">
                  {review.authorPhotoUrl ? (
                    <img src={review.authorPhotoUrl} alt={review.authorName} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-bold text-slate-500">
                      {review.authorName.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-ink leading-tight">{review.authorName}</p>
                  <Stars rating={review.rating || 5} className="text-yellow-500 mt-1" />
                </div>
              </div>
              <p className="text-body text-slate italic">&quot;{review.text}&quot;</p>
              {review.relativeTime && <p className="mt-4 text-tiny text-grey">{review.relativeTime}</p>}
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <a href={data.profileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Read more reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
