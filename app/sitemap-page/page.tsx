import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { PageIntro } from '@/components/PageIntro';
import { Schema } from '@/components/Schema';
import { webPageNode, breadcrumbNode } from '@/lib/schema';
import { services } from '@/lib/services';
import { cities } from '@/lib/cities';
import { getAllPosts } from '@/lib/blog';

/**
 * HTML sitemap, planning/docs/09 §1.5 and Phase 3 "remaining technical" list.
 * Redirect target for the legacy /sitemap/ page (data/url-map.csv). A real
 * crawl/nav aid for people, distinct from sitemap.xml (app/sitemap.ts), which
 * is for search engines and does not render as a page.
 */
export const metadata: Metadata = pageMetadata({
  path: '/sitemap-page/',
  title: 'Sitemap, All Pages | Allsafe Electric of Parker, CO',
  description:
    'Every page on the Allsafe Electric site in one place: services, service areas, the blog, and company pages. Use it to find anything quickly.',
  index: true,
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Sitemap', path: '/sitemap-page/' },
];

export default async function SitemapPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Schema
        nodes={[
          webPageNode({
            path: '/sitemap-page/',
            name: 'Sitemap',
            description: 'Every page on the Allsafe Electric site.',
          }),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageIntro
        eyebrow="Sitemap"
        title="Every page on this site"
        lead="A full list of our services, service areas, and company pages, in one place."
        crumbs={crumbs}
      />

      <div className="section">
        <div className="container-page grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="text-h3">Services</h2>
            <ul className="mt-4 space-y-2 text-small">
              <li>
                <Link href="/electrical-services/" className="link-cta">
                  All services
                </Link>
              </li>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}/`} className="text-blue-600 hover:text-blue-700">
                    {s.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-h3">Service areas</h2>
            <ul className="mt-4 space-y-2 text-small">
              <li>
                <Link href="/service-area/" className="link-cta">
                  Full service area
                </Link>
              </li>
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/electricians/${c.slug}-co/`} className="text-blue-600 hover:text-blue-700">
                    Electrician in {c.name}, CO
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-h3">Company</h2>
            <ul className="mt-4 space-y-2 text-small">
              {[
                { href: '/about/', label: 'About' },
                { href: '/reviews/', label: 'Reviews' },
                { href: '/coupons/', label: 'Coupons' },
                { href: '/contact/', label: 'Contact' },
                { href: '/book/', label: 'Book a visit' },
                { href: '/resources/', label: 'Resources' },
                { href: '/privacy-policy/', label: 'Privacy policy' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-blue-600 hover:text-blue-700">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-8 text-h3">Blog</h2>
            <ul className="mt-4 space-y-2 text-small">
              <li>
                <Link href="/blog/" className="link-cta">
                  All posts
                </Link>
              </li>
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}/`} className="text-blue-600 hover:text-blue-700">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
