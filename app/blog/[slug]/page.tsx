import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SiteImage } from '@/components/SiteImage';
import { CtaBlock } from '@/components/sections';
import { Schema } from '@/components/Schema';
import { articleNode, webPageNode, breadcrumbNode } from '@/lib/schema';
import { getAllPosts, getPost, getPostSlugs } from '@/lib/blog';
import { business } from '@/lib/business';

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return pageMetadata({
    path: `/blog/${post.slug}/`,
    title: post.title.length > 60 ? `${post.title.slice(0, 57)}…` : post.title,
    description: post.description,
    type: 'article',
    ogImagePath: `/img/photos/${post.heroImage.replace(/\.\w+$/, '.jpg').toLowerCase()}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const others = (await getAllPosts()).filter((p) => p.slug !== slug).slice(0, 2);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog/' },
    { name: post.title.length > 48 ? `${post.title.slice(0, 45)}…` : post.title, path: `/blog/${post.slug}/` },
  ];

  return (
    <>
      <Schema
        nodes={[
          articleNode({
            path: `/blog/${post.slug}/`,
            headline: post.title,
            description: post.description,
            image: `/img/photos/${post.heroImage.replace(/\.\w+$/, '.jpg').toLowerCase()}`,
            datePublished: post.datePublished,
            dateModified: post.dateModified,
          }),
          webPageNode({
            path: `/blog/${post.slug}/`,
            name: post.title,
            description: post.description,
          }),
          breadcrumbNode(crumbs),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <article>
        <header className="border-b border-rule bg-[linear-gradient(180deg,#f3f6f8,#ffffff)]">
          <div className="container-page max-w-3xl py-12">
            <p className="text-[0.8rem] font-semibold uppercase tracking-wide text-green-600">
              {post.category}
            </p>
            <h1 className="mt-2 text-[2rem] leading-tight md:text-[2.75rem]">{post.title}</h1>
            <p className="mt-4 text-[0.95rem] text-grey">
              By {business.owner.name}, {business.owner.jobTitle} ({business.licenses.master.id}) ·{' '}
              {new Date(post.datePublished).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}{' '}
              · {post.readingMinutes} min read
            </p>
          </div>
        </header>

        <div className="container-page max-w-3xl py-10">
          <div className="mb-8 overflow-hidden rounded-card border border-rule">
            <SiteImage
              name={post.heroImage}
              alt={post.heroAlt}
              priority
              sizes="(min-width: 768px) 720px, 100vw"
              className="w-full"
            />
          </div>
          <div
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="mt-10 rounded-card bg-paper p-5 text-[0.95rem]">
            <p className="font-semibold">About the author</p>
            <p className="mt-1 text-grey">
              {business.owner.name} is a licensed master electrician ({business.licenses.master.id})
              and the owner of {business.name}, serving Parker and the south Denver metro since{' '}
              {business.founded.year}.{' '}
              <Link href="/about/" className="link-cta">
                More about Jud
              </Link>
              .
            </p>
          </div>

          {others.length > 0 && (
            <section className="mt-12">
              <h2 className="text-h2">Keep reading</h2>
              <ul className="mt-4 space-y-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/blog/${o.slug}/`} className="link-cta text-[1.05rem]">
                      {o.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>

      <CtaBlock heading="Want a licensed electrician to just take a look?" />
    </>
  );
}
