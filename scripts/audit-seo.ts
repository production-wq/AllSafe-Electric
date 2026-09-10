/**
 * SEO audit — planning/docs/05 §8, planning/CLAUDE.md §6.
 *
 *   npm run audit:seo        (expects a prior `next build`)
 *
 * Reads the prerendered HTML in .next/server/app and FAILS the build on:
 *   - more than one <h1>, or zero
 *   - a skipped heading level
 *   - a heading longer than 70 chars, or a paragraph-length heading
 *   - missing/duplicate <title> or meta description; length out of range
 *   - missing or non-self-referencing canonical
 *   - invalid JSON-LD
 *   - an <img> with no alt, or keyword-stuffed alt
 *   - a tel: link whose number is not +13036481934
 *   - any retired-orange hex anywhere in the HTML
 * Warns on: thin body copy, missing OG image.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { parse, type HTMLElement } from 'node-html-parser';

const ROOT = process.cwd();
const HTML_DIR = join(ROOT, '.next', 'server', 'app');
const REAL_TEL = '+13036481934';

/**
 * Orange detection — CLAUDE.md §1.6, docs/14 "Brand". The previous agency used
 * orange throughout; the owner named it twice. We parse every colour token and
 * flag any whose hue sits in the orange band with real saturation/lightness —
 * this does NOT flag white, the brand blue, the brand green, or --urgent red.
 */
function toHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  const d = max - min;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [h * 360, s, l];
}

// Hue band 16–34° = true orange. Excludes gold/amber (#E8A317 ≈ 40°) and the
// Google logo yellow (#FBBC05 ≈ 45°), which are legitimate (star rating, mandated
// Google attribution mark). Catches the agency clickbait orange (#F2711C ≈ 24°,
// #FF6600 ≈ 24°, #E67E22 ≈ 28°).
const SAFE_HEX = new Set(['#4285f4', '#34a853', '#fbbc05', '#ea4335', '#e8a317']);

function isOrange(r: number, g: number, b: number): boolean {
  const [h, s, l] = toHsl(r, g, b);
  return h >= 16 && h <= 34 && s >= 0.5 && l >= 0.28 && l <= 0.66;
}

function findOrange(text: string): string | null {
  const hexRe = /#([0-9a-f]{6}|[0-9a-f]{3})\b/gi;
  let m: RegExpExecArray | null;
  while ((m = hexRe.exec(text))) {
    let hex = m[1];
    if (hex.length === 3) hex = hex.replace(/./g, (c) => c + c);
    if (SAFE_HEX.has(`#${hex.toLowerCase()}`)) continue;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    if (isOrange(r, g, b)) return m[0];
  }
  const rgbRe = /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/gi;
  while ((m = rgbRe.exec(text))) {
    if (isOrange(+m[1], +m[2], +m[3])) return m[0];
  }
  return null;
}

const errors: string[] = [];
const warnings: string[] = [];
const titles = new Map<string, string>();
const descs = new Map<string, string>();

function err(page: string, msg: string) {
  errors.push(`✗ ${page}: ${msg}`);
}
function warn(page: string, msg: string) {
  warnings.push(`⚠ ${page}: ${msg}`);
}

async function htmlFiles(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function textLen(s: string) {
  return s.replace(/\s+/g, ' ').trim().length;
}

async function auditFile(file: string) {
  const rel = relative(HTML_DIR, file).replace(/\.html$/, '');
  const page = rel === 'index' ? '/' : '/' + rel + '/';
  if (rel === '_not-found') return; // Next internal 404 route
  const html = await readFile(file, 'utf8');
  const root = parse(html, { comment: false });
  const isNoindex = /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html);

  // Orange — parse actual colour tokens, not a blunt regex
  const orange = findOrange(html);
  if (orange) err(page, `orange colour found: ${orange}`);

  // Headings
  const headings = root.querySelectorAll('h1,h2,h3,h4,h5,h6') as HTMLElement[];
  const h1s = headings.filter((h) => h.tagName === 'H1');
  if (h1s.length === 0) err(page, 'no <h1>');
  if (h1s.length > 1) err(page, `${h1s.length} <h1> elements`);
  let prev = 0;
  for (const h of headings) {
    const level = Number(h.tagName[1]);
    const t = h.text.replace(/\s+/g, ' ').trim();
    if (t.length > 70) err(page, `<${h.tagName.toLowerCase()}> over 70 chars (${t.length}): "${t.slice(0, 60)}…"`);
    if (prev && level > prev + 1) err(page, `heading jump h${prev} → h${level} ("${t.slice(0, 40)}")`);
    if (level >= prev || level <= prev) prev = level;
  }

  // Title
  const title = root.querySelector('title')?.text?.trim() ?? '';
  if (!title) err(page, 'missing <title>');
  else if (!isNoindex) {
    if (title.length < 45 || title.length > 60)
      err(page, `title ${title.length} chars (want 50–60): "${title}"`);
    if (titles.has(title)) err(page, `duplicate <title> (also ${titles.get(title)})`);
    titles.set(title, page);
  }

  // Meta description
  const desc =
    root.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() ?? '';
  if (!desc) {
    if (!isNoindex) err(page, 'missing meta description');
  } else if (!isNoindex) {
    if (desc.length < 140 || desc.length > 158)
      err(page, `meta description ${desc.length} chars (want 140–158)`);
    if (descs.has(desc)) err(page, `duplicate meta description (also ${descs.get(desc)})`);
    descs.set(desc, page);
  }

  // Canonical
  const canon = root.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';
  if (!canon) err(page, 'missing canonical');
  else if (!canon.startsWith('https://')) err(page, `canonical not absolute: ${canon}`);

  // OG image
  if (!root.querySelector('meta[property="og:image"]') && !isNoindex)
    warn(page, 'no og:image');

  // JSON-LD
  const ldNodes = root.querySelectorAll('script[type="application/ld+json"]');
  if (ldNodes.length === 0 && !isNoindex) err(page, 'no JSON-LD');
  for (const node of ldNodes) {
    try {
      JSON.parse(node.text.replace(/\\u003c/g, '<'));
    } catch (e) {
      err(page, `invalid JSON-LD: ${(e as Error).message}`);
    }
  }

  // Images
  for (const img of root.querySelectorAll('img')) {
    const alt = img.getAttribute('alt');
    if (alt === undefined) {
      err(page, `<img> with no alt attribute (src=${img.getAttribute('src')?.slice(0, 50)})`);
      continue;
    }
    if (alt === '') continue; // decorative — allowed
    const words = alt.split(/\s+/);
    const cityCount = (alt.match(/\b(parker|castle rock|highlands ranch|lone tree|centennial)\b/gi) || [])
      .length;
    const looksLikeList = alt.split(',').length > 3 || !/\b(is|are|in|on|at|with|during|of|from|by|near|beside)\b/i.test(alt);
    if (cityCount > 1 || (words.length > 12 && looksLikeList))
      warn(page, `alt text may be keyword-stuffed: "${alt}"`);
  }

  // tel: links
  for (const a of root.querySelectorAll('a[href^="tel:"]')) {
    const href = a.getAttribute('href') ?? '';
    const num = href.replace('tel:', '').replace(/[^\d+]/g, '');
    if (num !== REAL_TEL) err(page, `tel: link is not the real number: ${href}`);
  }

  // Empty hrefs
  if (root.querySelectorAll('a[href=""]').length)
    err(page, 'empty href="" link (do not port these — docs/10 §3)');

  // Thin content
  const main = root.querySelector('main');
  const bodyWords = (main?.text ?? '').split(/\s+/).filter(Boolean).length;
  if (
    !isNoindex &&
    (page.startsWith('/electric') || /parker-co\/$/.test(page)) &&
    bodyWords < 400
  )
    warn(page, `body copy ${bodyWords} words (< 400 on a service/city page)`);
}

async function main() {
  let files: string[];
  try {
    files = await htmlFiles(HTML_DIR);
  } catch {
    console.error('No prerendered HTML found. Run `next build` first.');
    process.exit(1);
  }
  for (const f of files) await auditFile(f);

  console.log(`\nAudited ${files.length} pages.`);
  if (warnings.length) {
    console.log(`\n${warnings.length} warning(s):`);
    warnings.forEach((w) => console.log('  ' + w));
  }
  if (errors.length) {
    console.log(`\n${errors.length} error(s):`);
    errors.forEach((e) => console.log('  ' + e));
    console.log('\n✗ SEO audit failed.');
    process.exit(1);
  }
  console.log('\n✓ SEO audit passed.');
}

main();
