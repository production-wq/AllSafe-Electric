import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { PageIntro } from '@/components/PageIntro';
import { SiteImage } from '@/components/SiteImage';
import { CtaBlock } from '@/components/sections';
import { Schema } from '@/components/Schema';
import { webPageNode, breadcrumbNode } from '@/lib/schema';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = pageMetadata({
  path: '/blog/',
  title: 'Electrical Advice for Parker Homeowners | Allsafe',
  description:
    'Straight answers from a licensed master electrician in Parker. Tripping breakers, panel upgrades, EV chargers, old panels and getting ready for winter.',
  ogEyebrow: 'Blog',
});

const crumbs = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog/' },
];

export default async function BlogIndex() {
  const posts = await getAllPosts();
  return (
    <>
      <Schema
        nodes={[
          webPageNode({
            path: '/blog/',
            name: 'Allsafe Electric blog',
            description: 'Electrical advice for Parker and Douglas County homeowners.',
          }),
          breadcrumbNode(crumbs),
        ]}
      />
      <PageIntro
        eyebrow="Blog"
        title="Answering the questions homeowners ask."
        lead="Written by a licensed master electrician, for homeowners, not other electricians. Every post answers the question in the first paragraph."
        crumbs={crumbs}
      />

      <div className="section">
        <div className="container-page grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.slug} className="card flex flex-col overflow-hidden">
              <Link href={`/blog/${p.slug}/`}>
                <SiteImage
                  name={p.heroImage}
                  alt={p.heroAlt}
                  sizes="(min-width: 1024px) 360px, 90vw"
                  className="aspect-[16/10] w-full object-cover"
                  aspable={false}
                />
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[0.8rem] font-semibold uppercase tracking-wide text-green-600">
                  {p.category}
                </p>
                <h2 className="mt-1.5 text-h3">
                  <Link href={`/blog/${p.slug}/`} className="text-inherit no-underline hover:underline">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-[0.98rem] text-grey">{p.description}</p>
                <p className="mt-3 text-[0.85rem] text-grey">
                  {new Date(p.datePublished).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}{' '}
                  · {p.readingMinutes} min read
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <CtaBlock heading="Have a question we haven't covered?" />
    </>
  );
}
