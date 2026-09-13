import Link from 'next/link';
import { services, getService } from '@/lib/services';
import { cities, getCity } from '@/lib/cities';
import { ArrowRightIcon, MapPinIcon } from './Icons';

/**
 * Contextual cross-links between the service network and the location network.
 *
 * Added 2026-09-14. Before this every link on the site sat inside a dedicated
 * link-list section, city pages linked to exactly two siblings, and service and
 * location pages never referenced each other at all. The client called internal
 * linking "a very important part", and they were right: with 16 services and 16
 * towns, the cross-product is where most long-tail search intent actually lives.
 *
 * This renders real, readable sentences with links inside them rather than
 * another bare chip row, which is what "naturally occurring internal linking"
 * means in practice.
 */

/** On a service page: link this service to the towns it is offered in. */
export function ServiceToCities({ serviceSlug }: { serviceSlug: string }) {
  const s = getService(serviceSlug);
  if (!s) return null;
  const featured = cities.slice(0, 6);

  return (
    <section aria-labelledby="svc-cities-heading" className="rounded-card bg-paper p-6 md:p-8">
      <h2 id="svc-cities-heading" className="text-h2">
        Where we do {s.navLabel.toLowerCase()}
      </h2>
      <p className="prose-body mt-4 text-body-lg text-slate">
        We handle {s.navLabel.toLowerCase()} across Parker and the surrounding south metro. That
        includes{' '}
        {featured.map((c, i) => (
          <span key={c.slug}>
            <Link href={`/electrician-${c.slug}/`}>{c.name}</Link>
            {i < featured.length - 2 ? ', ' : i === featured.length - 2 ? ' and ' : ''}
          </span>
        ))}
        , plus every other town on our{' '}
        <Link href="/service-area/">service area page</Link>. Response times vary by drive distance,
        and each town page lists its own permit authority and electric utility, which genuinely
        differ across Douglas, Arapahoe and Elbert counties.
      </p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {cities.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/electrician-${c.slug}/`}
              className="inline-flex items-center gap-1.5 rounded-chip border border-rule bg-white px-3 py-1.5 text-small transition-colors hover:border-blue-300 hover:bg-blue-50"
            >
              <MapPinIcon width={13} height={13} className="text-green-600" />
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** On a city page: link this town to the services most relevant to it. */
export function CityToServices({ citySlug }: { citySlug: string }) {
  const c = getCity(citySlug);
  if (!c) return null;

  const priority = c.priorityServices
    .map((slug) => services.find((s) => s.cityServiceSlug === slug))
    .filter(Boolean)
    .slice(0, 4);
  const rest = services.filter((s) => !priority.some((p) => p!.slug === s.slug));

  return (
    <section aria-labelledby="city-svc-heading" className="rounded-card bg-paper p-6 md:p-8">
      <h2 id="city-svc-heading" className="text-h2">
        Every service we offer in {c.name}
      </h2>
      <p className="prose-body mt-4 text-body-lg text-slate">
        {priority.length > 0 ? (
          <>
            The work we get called for most in {c.name} is{' '}
            {priority.map((s, i) => (
              <span key={s!.slug}>
                <Link href={`/${s!.slug}/`}>{s!.navLabel.toLowerCase()}</Link>
                {i < priority.length - 2 ? ', ' : i === priority.length - 2 ? ' and ' : ''}
              </span>
            ))}
            . Everything else we do is available here too, at the same fixed pricing.
          </>
        ) : (
          <>Every Allsafe Electric service is available in {c.name} at the same fixed pricing.</>
        )}
      </p>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {[...priority.filter(Boolean).map((s) => s!), ...rest].map((s) => (
          <li key={s.slug}>
            <Link
              href={`/${s.slug}/`}
              className="group flex items-center justify-between gap-2 rounded-btn border border-rule bg-white px-3 py-2 text-small transition-colors hover:border-blue-300 hover:bg-blue-50"
            >
              <span className={s.emergency ? 'font-semibold text-urgent-500' : 'text-slate'}>
                {s.navLabel}
              </span>
              <ArrowRightIcon
                width={14}
                height={14}
                className="shrink-0 text-grey transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
