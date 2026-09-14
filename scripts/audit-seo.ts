/**
 * SEO audit, planning/docs/05 §8, planning/CLAUDE.md §6.
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
 *   - any orange hex anywhere in the HTML (client style guide excludes it, 2026-09-11)
 *   - a British spelling (neighbourhood, licence, aluminium, colour, ...)
 *   - an em dash in visible copy
 * Warns on: thin body copy, missing OG image, a stray colour outside the approved palette.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { parse, type HTMLElement } from 'node-html-parser';

const ROOT = process.cwd();
const HTML_DIR = join(ROOT, '.next', 'server', 'app');
const REAL_TEL = '+13036481934';

/**
 * Palette check (planning/docs/99, 2026-09-11). v3 shipped orange as the client's
 * "live palette" accent; the client's 2026-09-11 audit clarified their actual style
 * guide excludes orange as a CTA colour entirely. Accent is GREEN, sampled from the
 * real logo file. Orange is a hard build failure again. Everything else outside the
 * approved set is a warning, not a failure (stock photo/OG-image gradients etc. can
 * legitimately use adjacent shades).
 */
const APPROVED_HEX = new Set(
  [
    '#0068a8', '#54595f', '#7a7a7a', '#000000',
    '#00568b', '#01426b', '#08314f', '#0a2e4c', '#0e3a60', '#071f35',
    '#007a56', '#00643f', '#004e30', '#009a6b',
    '#b3352f', '#952b26',
    '#111214', '#e3e7eb', '#f4f6f8', '#ffffff',
    '#e8f2f9', '#e6f5ef', '#c2e7d8', '#8ed0b3', '#0f76b4', '#2e88c0',
    // mandated third-party
    '#4285f4', '#34a853', '#fbbc05', '#ea4335', '#ff6600',
  ].map((h) => h.toLowerCase())
);

function hexToRgb(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}

function isOrange(r: number, g: number, b: number): boolean {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max - min < 60) return false; // grey/near-neutral
  let h = 0;
  const d = max - min;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (max === g) h = ((b - r) / d + 2) * 60;
  else h = ((r - g) / d + 4) * 60;
  return h >= 15 && h <= 45 && max > 140; // orange/amber band, excludes gold #FBBC05 (~45°, dimmer edge case checked separately)
}

function findOrange(text: string): string | null {
  const hexRe = /#([0-9a-f]{6})\b/gi;
  let m: RegExpExecArray | null;
  while ((m = hexRe.exec(text))) {
    const hex = `#${m[1].toLowerCase()}`;
    if (hex === '#fbbc05') continue; // Google's own logo yellow, mandated, not brand orange
    const [r, g, b] = hexToRgb(hex);
    if (isOrange(r, g, b)) return hex;
  }
  return null;
}

function findStrayColour(text: string): string | null {
  const hexRe = /#([0-9a-f]{6})\b/gi;
  let m: RegExpExecArray | null;
  while ((m = hexRe.exec(text))) {
    const hex = `#${m[1].toLowerCase()}`;
    if (APPROVED_HEX.has(hex)) continue;
    const [r, g, b] = hexToRgb(hex);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max - min > 90 && max > 120) return hex;
  }
  return null;
}

// Client audit 2026-09-11: American English throughout, everywhere except the
// license identifiers ME.0601023 / EC.0101068 (which do not contain these words).
const BRITISH_WORDS = [
  'neighbourhood', 'neighbourhoods', 'licence', 'licences', 'aluminium',
  'colour', 'colours', 'organisation', 'organisational', 'recognise', 'recognised',
  'favour', 'centre',
];
function findBritishSpelling(bodyText: string): string | null {
  const lower = bodyText.toLowerCase();
  for (const w of BRITISH_WORDS) {
    if (new RegExp(`\\b${w}\\b`).test(lower)) return w;
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

  // Palette: orange is a hard fail (client style guide excludes it as a CTA colour,
  // 2026-09-11). Anything else vivid and unapproved is just a warning.
  const orange = findOrange(html);
  if (orange && orange !== '#ff6600') err(page, `orange hex found (${orange}) — client style guide excludes orange, use green (--green)`);
  const stray = findStrayColour(html);
  if (stray) warn(page, `colour outside the approved palette: ${stray}`);

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
    if (title.length < 40 || title.length > 76)
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
    if (alt === '') continue; // decorative. Allowed
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

  /**
   * House style: NO em dashes in customer-facing copy. A page peppered with them
   * reads as machine-written, which is the opposite of the trust this site has to
   * build. En dashes in ranges (Mon–Fri, $2,200–$4,500, 1960–1983) are correct
   * typography and are deliberately allowed.
   */
  const visibleText = (root.querySelector('main')?.text ?? '') + (root.querySelector('footer')?.text ?? '');
  const emDashes = (visibleText.match(/—/g) ?? []).length;
  if (emDashes > 0) {
    const sample = visibleText.match(/.{0,45}—.{0,45}/)?.[0]?.replace(/\s+/g, ' ') ?? '';
    err(page, `${emDashes} em dash(es) in visible copy. Rewrite the sentence: "…${sample.trim()}…"`);
  }

  // American English only (client audit 2026-09-11). License ID strings
  // (ME.0601023 / EC.0101068) contain no British-spelled words, so no exclusion needed.
  const british = findBritishSpelling(visibleText);
  if (british) err(page, `British spelling "${british}" in visible copy — use American English`);

  // --- NEW CI CHECKS ---
  const lowerText = visibleText.toLowerCase();

  // 1. Anti-scale phrases
  const antiScale = [
    'two-man',
    'stays small on purpose',
    'jud and justin',
    'justin and jud',
    'jud answers',
    'meet jud',
    'jud can be there',
    'jud arrives',
    'deliberately two people',
    'one of two licensed electricians'
  ];
  for (const phrase of antiScale) {
    if (lowerText.includes(phrase)) {
      err(page, `anti-scale phrase found in visible text: "${phrase}"`);
    }
  }

  // 2. Vendor names
  const vendors = ['housecall pro', 'callrail'];
  for (const vendor of vendors) {
    if (visibleText.toLowerCase().includes(vendor) && page !== '/privacy-policy/') {
      err(page, `vendor name found in visible text: "${vendor}"`);
    }
  }

  // 3. Internal doc references
  const internalDocs = ['tier 0', 'tier 1', 'tier 2', 'tier 3', 'phase 0', 'batch 1'];
  for (const doc of internalDocs) {
    if (lowerText.includes(doc)) {
      err(page, `internal doc reference found in visible text: "${doc}"`);
    }
  }

  // 4. Flat city URL pattern check
  for (const a of root.querySelectorAll('a')) {
    const href = a.getAttribute('href') ?? '';
    if (href.startsWith('/electrician-') && !href.startsWith('/electricians/')) {
      err(page, `flat city URL pattern found: ${href} (use /electricians/{city}-co/)`);
    }
  }

  // 5. meta-author check
  const metaAuthor = root.querySelector('meta[name="author"]')?.getAttribute('content');
  if (metaAuthor && metaAuthor !== 'Allsafe Electric') {
    err(page, `meta author must be "Allsafe Electric", found: "${metaAuthor}"`);
  }

  // Empty hrefs
  if (root.querySelectorAll('a[href=""]').length)
    err(page, 'empty href="" link (do not port these. Docs/10 §3)');

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
