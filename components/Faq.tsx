import type { Faq } from '@/lib/services';

/**
 * FAQ — native <details> so the answers are in the initial HTML (indexable,
 * planning/docs/05 §4) and keyboard-operable with no JS. Visible text must match
 * the FAQPage JSON-LD exactly (planning/docs/06 §7).
 */
export function FaqList({ faqs, heading = 'Common questions', id = 'faq' }: { faqs: Faq[]; heading?: string; id?: string }) {
  return (
    <section aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className="text-step-3">
        {heading}
      </h2>
      <div className="mt-6 divide-y divide-rule border-y border-rule">
        {faqs.map((f, i) => (
          <details key={i} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-step-1 font-semibold [&::-webkit-details-marker]:hidden">
              {f.q}
              <span
                aria-hidden
                className="shrink-0 text-brand-blue transition-transform group-open:rotate-45"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </summary>
            <div className="prose-body mt-3 text-[1.05rem] text-muted">
              <p>{f.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
