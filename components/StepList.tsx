export interface StepItem {
  /** Omit or leave empty for a plain numbered list item with no sub-heading
   * (the shape services not yet migrated to the richer step type still use). */
  title?: string;
  body: string;
}

/**
 * Numbered step spine. Unifies what used to be duplicated inline: once as
 * WhatHappensNext (sections.tsx) and once as the "How the job goes" block in
 * app/[serviceSlug]/page.tsx. Both were a bare numbered list with no connecting
 * line; this adds the spine as part of the "Job-Site Editorial" refresh
 * (2026-09-13). The connecting segment is sized with flexbox (flex-1 inside a
 * flex-row <li>, stretched to the row's full height) rather than absolute
 * positioning, so it always reaches the next icon exactly regardless of how
 * much the step body text wraps.
 */
import { RichText } from "./RichText";

export function StepList({
  steps,
  tone = 'blue',
}: {
  steps: StepItem[];
  tone?: 'blue' | 'green';
}) {
  const badge = tone === 'green' ? 'bg-green-600' : 'bg-blue-600';
  return (
    <ol className="mt-8">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-5">
          <div className="flex flex-col items-center">
            <span className={`icon-tile shrink-0 ${badge} text-body-lg font-bold text-white`}>{i + 1}</span>
            {i < steps.length - 1 && <span aria-hidden className="mt-2 w-px flex-1 bg-rule" />}
          </div>
          <div className={i < steps.length - 1 ? 'pb-8 pt-2.5' : 'pt-2.5'}>
            {step.title && <h3 className="text-h3">{step.title}</h3>}
            <p className={`text-body-lg text-slate ${step.title ? 'mt-1.5' : ''}`}><RichText text={step.body} /></p>
          </div>
        </li>
      ))}
    </ol>
  );
}
