/**
 * Large standalone quote treatment, "Job-Site Editorial" refresh (2026-09-13).
 * Same green-rule/green-50 language as .article-prose blockquote (globals.css)
 * but sized for use outside article flow — an owner-voice aside on a service
 * page, or a featured testimonial line. `attribution` should always be a real
 * name/title (Jud Cushing, or a real reviewer) — never fabricated.
 */
export function PullQuote({ quote, attribution }: { quote: string; attribution?: string }) {
  return (
    <figure className="rounded-card border-l-4 border-green-600 bg-green-50 p-6 md:p-8">
      <blockquote className="text-2xl font-display font-semibold leading-snug text-ink md:text-3xl">
        &ldquo;{quote}&rdquo;
      </blockquote>
      {attribution && <figcaption className="mt-4 text-small font-semibold text-green-700">{attribution}</figcaption>}
    </figure>
  );
}
