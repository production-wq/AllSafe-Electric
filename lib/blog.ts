import 'server-only';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { marked } from 'marked';

/**
 * Blog, planning/docs/09 §8. Posts are Markdown files in content/blog/ with a
 * simple `--- key: value ---` front-matter block. Attributed to Judson Cushing,
 * Master Electrician (ME.0601023), never "Admin" (planning/docs/10 §6).
 * Rendered server-side; `marked` is a build-time dependency only.
 */

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  heroImage: string;
  heroAlt: string;
  category: 'Problem & symptom' | 'Homeowner decisions' | 'Seasonal & local';
  readingMinutes: number;
}

export interface Post extends PostMeta {
  html: string;
}

const DIR = join(process.cwd(), 'content', 'blog');

function parseFrontMatter(raw: string): { data: Record<string, string>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    data[line.slice(0, i).trim()] = line
      .slice(i + 1)
      .trim()
      .replace(/^["']|["']$/g, '');
  }
  return { data, body: m[2] };
}

marked.setOptions({ gfm: true, breaks: false });

async function loadFile(file: string): Promise<Post> {
  const raw = await readFile(join(DIR, file), 'utf8');
  const { data, body } = parseFrontMatter(raw);
  const slug = file.replace(/\.md$/, '');
  const words = body.split(/\s+/).length;
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    datePublished: data.datePublished ?? '2026-09-15',
    dateModified: data.dateModified ?? data.datePublished ?? '2026-09-15',
    heroImage: data.heroImage ?? 'allsafe-electrician-standing-in-modern-home.JPG',
    heroAlt: data.heroAlt ?? 'Allsafe Electric on a job in a Parker home',
    category: (data.category as PostMeta['category']) ?? 'Homeowner decisions',
    readingMinutes: Math.max(3, Math.round(words / 220)),
    html: await marked.parse(body),
  };
}

export async function getAllPosts(): Promise<Post[]> {
  let files: string[] = [];
  try {
    files = (await readdir(DIR)).filter((f) => f.endsWith('.md'));
  } catch {
    return [];
  }
  const posts = await Promise.all(files.map(loadFile));
  return posts.sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

export async function getPost(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPostSlugs(): Promise<string[]> {
  return (await getAllPosts()).map((p) => p.slug);
}
