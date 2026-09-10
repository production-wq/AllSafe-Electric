import { Breadcrumbs } from './Breadcrumbs';

/** Shared page header for the non-templated marketing pages. */
export function PageIntro({
  eyebrow,
  title,
  lead,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs: { name: string; path: string }[];
}) {
  return (
    <>
      <Breadcrumbs items={crumbs} />
      <section className="border-b border-rule bg-[linear-gradient(180deg,#f3f6f8,#ffffff)]">
        <div className="container-page py-12 lg:py-16">
          <div className="max-w-3xl">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="mt-1 text-[2rem] leading-tight md:text-[2.9rem]">{title}</h1>
            {lead && <p className="mt-4 text-step-1 text-muted">{lead}</p>}
          </div>
        </div>
      </section>
    </>
  );
}
