import Link from 'next/link';
import { services } from '@/lib/services';
import { business } from '@/lib/business';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page max-w-2xl">
        <p className="eyebrow">Page not found</p>
        <h1 className="mt-1 text-h1">That page isn&apos;t here</h1>
        <p className="mt-4 text-h3 text-muted">
          The link may be old, or the page moved. Here is where most people are headed.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            ['Emergency electrician', '/emergency-electrical-repairs-parker-co/'],
            ['Electrical panel upgrades', '/electrical-panel-services/'],
            ['All services', '/electrical-services-parker-co/'],
            ['Areas we serve', '/service-area/'],
            ['Reviews', '/reviews/'],
            ['Contact & estimate', '/contact/'],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-card border border-rule bg-white p-4 font-semibold text-brand-700 hover:border-brand-600"
            >
              {label}
            </Link>
          ))}
        </div>

        <p className="mt-8 text-muted">
          Or just call, {' '}
          <a href={business.phone.href} className="link-cta">
            {business.phone.display}
          </a>
          . A real person answers Mon–Fri 8–6.
        </p>

        <details className="mt-8">
          <summary className="cursor-pointer font-semibold">Full list of services</summary>
          <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}/`} className="text-brand-700 hover:underline">
                  {s.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
