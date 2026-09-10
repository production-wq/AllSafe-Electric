import Link from 'next/link';

/**
 * Visible breadcrumb, a <nav> with an ordered list, never headings
 * (planning/docs/05 §1 rule 5). Must match the BreadcrumbList JSON-LD exactly.
 */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-rule bg-white">
      <div className="container-page py-3">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.9rem] text-muted">
          {items.map((it, i) => {
            const last = i === items.length - 1;
            return (
              <li key={it.path} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {last ? (
                  <span aria-current="page" className="text-ink">
                    {it.name}
                  </span>
                ) : (
                  <Link href={it.path} className="hover:text-brand-700 hover:underline">
                    {it.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
