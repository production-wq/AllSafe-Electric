import { Breadcrumbs } from './Breadcrumbs';

/** Shared page header for the non-templated marketing pages. */
export function PageIntro({
  eyebrow,
  title,
  lead,
  crumbs,
  tone = 'blue',
  aside,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs: { name: string; path: string }[];
  tone?: 'blue' | 'leaf' | 'sand';
  aside?: React.ReactNode;
}) {
  const grounds = {
    blue: 'bg-gradient-to-b from-blue-50 via-white to-white',
    leaf: 'bg-gradient-to-b from-green-50 via-white to-white',
    sand: 'bg-gradient-to-b from-paper via-white to-white',
  } as const;

  return (
    <>
      <Breadcrumbs items={crumbs} />
      <section className={`relative overflow-hidden border-b border-rule ${grounds[tone]}`}>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:34px_34px] opacity-50"
        />
        <div className="container-page relative grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-20">
          <div className="max-w-2xl">
            {eyebrow && (
              <p className={`eyebrow ${tone === 'blue' ? 'eyebrow-blue' : ''}`}>{eyebrow}</p>
            )}
            <h1 className="mt-3 text-display">{title}</h1>
            {lead && <p className="mt-5 text-lead text-slate">{lead}</p>}
          </div>
          {aside && <div>{aside}</div>}
        </div>
      </section>
    </>
  );
}
