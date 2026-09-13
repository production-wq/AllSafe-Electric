import type { Faq } from '@/lib/services';

/**
 * FAQ built on native <details> so the answers sit in the initial HTML
 * (indexable, planning/docs/05 §4) and work with the keyboard and no JS.
 * Visible text must match the FAQPage JSON-LD exactly (planning/docs/06 §7).
 */
export function FaqList({
  faqs,
  heading = 'Common questions',
  id = 'faq',
  layout = 'single',
}: {
  faqs: Faq[];
  heading?: string;
  id?: string;
  /** 'split' lays the list out in two columns on wider screens, for the longer
   * 8-10 item FAQ sets the content-depth pass produces. Item order still reads
   * top-to-bottom then wraps to the next column (CSS columns), not left-right
   * pairs, so answer length differences don't misalign the grid. */
  layout?: 'single' | 'split';
}) {
  return (
    <section aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="text-h2">
        {heading}
      </h2>
      <div className={layout === 'split' ? 'mt-7 space-y-3 md:columns-2 md:gap-5 [&>*]:mb-3' : 'mt-7 space-y-3'}>
        {faqs.map((f, i) => (
          <details
            key={i}
            className="group overflow-hidden rounded-card border border-rule bg-white break-inside-avoid-column transition-colors duration-200 open:border-blue-200 hover:border-blue-200"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-body-lg font-semibold [&::-webkit-details-marker]:hidden">
              {f.q}
              <span
                aria-hidden
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-200 group-open:rotate-45 group-open:bg-blue-600 group-open:text-white"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <div className="border-t border-rule/70 bg-blue-50/30 px-5 pb-5 pt-4">
              <p className="prose-body text-body text-slate">{f.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
