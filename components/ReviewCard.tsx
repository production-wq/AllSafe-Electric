import type { Review } from '@/lib/reviews';
import { Stars } from '@/components/Icons';

/**
 * One Google review card. Shared by the reviews page grid and the horizontal
 * rails on the homepage, service pages and location pages, so the design only
 * exists in one place (2026-09-17).
 *
 * Avatars are the reviewer's real Google profile photo where one exists, with a
 * lettered fallback otherwise. These load from lh3.googleusercontent.com, which
 * is already allowlisted under img-src in the CSP (next.config.mjs).
 *
 * A plain <img> rather than next/image: these are third-party, per-reviewer
 * URLs that change as Google rotates them, so there is nothing to put in the
 * image manifest and no benefit to routing them through the optimizer.
 *
 * WHY THE TEXT IS CLAMPED. Real reviews run from 40 to 1600 characters. Left
 * unclamped, a single long one stretched every card beside it: measured 980px
 * tall cards forcing 315px reviews into 777px boxes on /reviews/, and a 1222px
 * rail on the service pages. Clamping equalises the rhythm, and anything cut
 * off keeps a link straight to the full review on Google, so nothing a customer
 * wrote is hidden with no way to reach it.
 */

const CLAMP_CLASS: Record<number, string> = {
  6: 'line-clamp-6',
  7: 'line-clamp-7',
  8: 'line-clamp-8',
  9: 'line-clamp-9',
  10: 'line-clamp-10',
};

/** Roughly what a clamped block holds at these card widths. Only used to decide
 * whether to offer the "read the rest" link, so an approximation is fine. */
const CHARS_PER_LINE = 46;

export function ReviewCard({
  review,
  clamp = 8,
  className = '',
}: {
  review: Review;
  /** Lines of review text to show before clamping. 0 disables clamping. */
  clamp?: number;
  className?: string;
}) {
  const clampClass = clamp > 0 ? CLAMP_CLASS[clamp] ?? 'line-clamp-8' : '';
  const isTruncated = clamp > 0 && review.text.length > clamp * CHARS_PER_LINE;

  return (
    <figure className={`card flex h-full flex-col p-6 ${className}`}>
      <div className="mb-4 flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-paper">
          {review.authorPhotoUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={review.authorPhotoUrl}
              alt=""
              width={40}
              height={40}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-blue-600 font-bold text-white">
              {review.authorName.charAt(0)}
            </span>
          )}
        </div>
        <figcaption className="min-w-0">
          <span className="block truncate font-semibold leading-tight text-ink">
            {review.authorName}
          </span>
          <Stars rating={review.rating || 5} size={15} />
        </figcaption>
      </div>

      <blockquote className={`flex-1 text-body italic text-slate ${clampClass}`}>
        &ldquo;{review.text}&rdquo;
      </blockquote>

      {isTruncated && (
        <a
          href={review.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 self-start text-small font-semibold text-blue-600 underline-offset-4 hover:underline"
        >
          Read the full review
        </a>
      )}

      {review.relativeTime && <p className="mt-4 text-tiny text-grey">{review.relativeTime}</p>}
    </figure>
  );
}
