import { Stars, GoogleG } from './Icons';
import { business } from '@/lib/business';
import data from '@/data/testimonials.json';

interface Review {
  author: string;
  location: string;
  headline: string;
  rating: number;
  text: string;
}

/**
 * Homepage testimonials, matching the designer's artifact. The four reviews are
 * REAL, carried over from the client's own previously published site (WordPress
 * export). No aggregateRating / Review schema is emitted from this (planning/docs/06 §3);
 * the number shown is the client's own stated Google rating.
 */
export function Testimonials() {
  const reviews = data.reviews as Review[];
  return (
    <section className="section bg-paper" aria-labelledby="testimonials-heading">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Testimonials</p>
            <h2 id="testimonials-heading" className="mt-3 text-h1">
              What Parker Homeowners Say
            </h2>
          </div>
          <a
            href={business.google.profileUrl}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-3 rounded-card border border-rule bg-white px-5 py-3 shadow-card"
          >
            <span className="text-2xl font-extrabold text-ink">{data.aggregate.rating}.0</span>
            <span>
              <Stars rating={5} size={16} />
              <span className="mt-0.5 flex items-center gap-1.5 text-tiny text-grey">
                <GoogleG className="h-3.5 w-3.5" /> {business.google.reviewCount} Google reviews &middot;{' '}
                {data.aggregate.cityLabel}
              </span>
            </span>
          </a>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <li key={r.author} className="flex flex-col rounded-card border border-rule bg-white p-6 shadow-card">
              <Stars rating={r.rating} size={16} />
              <p className="mt-3 font-display text-h3 text-ink">{r.headline}</p>
              <p className="mt-2 flex-1 text-small text-slate">{r.text}</p>
              <div className="mt-5 flex items-center gap-3 border-t border-rule pt-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-pill bg-blue-600 text-small font-bold text-white">
                  {r.author.charAt(0)}
                </span>
                <span>
                  <span className="block text-small font-semibold text-ink">{r.author}</span>
                  <span className="block text-tiny text-grey">{r.location}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center">
          <a href={business.google.profileUrl} target="_blank" rel="noopener" className="link-cta">
            Read every review on Google
          </a>
        </p>
      </div>
    </section>
  );
}
