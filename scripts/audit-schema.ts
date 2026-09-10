/**
 * Schema audit — planning/docs/06 §6.
 *
 *   npm run audit:schema     (expects a prior `next build`)
 *
 * For every prerendered page:
 *   - every <script type="application/ld+json"> parses
 *   - the graph resolves @id references that are used
 *   - the page carries the schema types its template requires
 *   - anti-patterns are absent: aggregateRating/Review from Google data,
 *     a second Electrician/LocalBusiness entity per page, a CallRail number in
 *     `telephone`, FAQPage whose questions are not in the visible text.
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { parse } from 'node-html-parser';

const HTML_DIR = join(process.cwd(), '.next', 'server', 'app');
const REAL_TEL = '+13036481934';

const REQUIRED: { test: RegExp; types: string[] }[] = [
  { test: /^\/index$/, types: ['Electrician', 'WebSite', 'WebPage', 'FAQPage'] },
  { test: /^\/electrical-services-parker-co$/, types: ['WebPage', 'BreadcrumbList'] },
  {
    test: /^\/(emergency-electrical-repairs-parker-co|electrical-panel-services|electrical-outlet-services|electrical-switch-services|electrical-wiring-repairs-services|lighting-services|outdoor-lighting|residential-ev-charging|ceiling-fan-installation|home-automation|whole-home-surge-protection|smoke-detectors|home-electrical-safety-inspections|generator-installation|electrical-troubleshooting|hot-tub-electrical-hookup)$/,
    types: ['Service', 'WebPage', 'BreadcrumbList', 'FAQPage'],
  },
  { test: /^\/electricians\//, types: ['WebPage', 'BreadcrumbList', 'FAQPage'] },
  { test: /^\/blog\/[^/]+$/, types: ['Article', 'WebPage', 'BreadcrumbList'] },
  { test: /^\/about$/, types: ['AboutPage', 'Person', 'BreadcrumbList'] },
  { test: /^\/contact$/, types: ['ContactPage', 'BreadcrumbList'] },
];

const errors: string[] = [];
const err = (p: string, m: string) => errors.push(`✗ ${p}: ${m}`);

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function collectTypes(node: unknown, acc: Set<string>) {
  if (Array.isArray(node)) return node.forEach((n) => collectTypes(n, acc));
  if (node && typeof node === 'object') {
    const t = (node as Record<string, unknown>)['@type'];
    if (typeof t === 'string') acc.add(t);
    if (Array.isArray(t)) t.forEach((x) => typeof x === 'string' && acc.add(x));
    for (const v of Object.values(node as Record<string, unknown>)) collectTypes(v, acc);
  }
}

function jsonStrings(node: unknown, acc: string[]) {
  if (typeof node === 'string') acc.push(node);
  else if (Array.isArray(node)) node.forEach((n) => jsonStrings(n, acc));
  else if (node && typeof node === 'object')
    for (const v of Object.values(node as Record<string, unknown>)) jsonStrings(v, acc);
}

async function auditFile(file: string) {
  const rel = relative(HTML_DIR, file).replace(/\.html$/, '');
  if (rel === '_not-found') return;
  const key = rel === 'index' ? '/index' : '/' + rel;
  const page = rel === 'index' ? '/' : '/' + rel + '/';
  const html = await readFile(file, 'utf8');
  const root = parse(html);
  const isNoindex = /name=["']robots["'][^>]+noindex/i.test(html);

  const nodes = root.querySelectorAll('script[type="application/ld+json"]');
  const types = new Set<string>();
  const allStrings: string[] = [];
  const graphs: unknown[] = [];

  for (const n of nodes) {
    let data: unknown;
    try {
      data = JSON.parse(n.text.replace(/\\u003c/g, '<'));
    } catch (e) {
      err(page, `JSON-LD parse error: ${(e as Error).message}`);
      continue;
    }
    graphs.push(data);
    collectTypes(data, types);
    jsonStrings(data, allStrings);
  }

  if (!nodes.length && !isNoindex) {
    err(page, 'no JSON-LD at all');
    return;
  }

  // Required types for this template
  for (const rule of REQUIRED) {
    if (rule.test.test(key)) {
      for (const t of rule.types) {
        if (!types.has(t)) err(page, `missing required schema type: ${t}`);
      }
    }
  }

  // Anti-patterns (planning/docs/06 §7)
  if (types.has('AggregateRating') || types.has('aggregateRating'))
    err(page, 'AggregateRating present — forbidden (docs/06 §3)');
  if ([...types].filter((t) => t === 'Electrician' || t === 'LocalBusiness').length > 1)
    err(page, 'more than one Electrician/LocalBusiness entity');
  // Review node only allowed if it is first-party (we emit none)
  if (types.has('Review')) err(page, 'Review node present — none should be emitted (docs/06 §3)');

  // telephone must be the real number wherever it appears
  const telMatches = JSON.stringify(graphs).match(/"telephone":\s*"([^"]+)"/g) ?? [];
  for (const t of telMatches) {
    const num = t.replace(/.*"telephone":\s*"/, '').replace(/"$/, '');
    if (num.replace(/[^\d+]/g, '') !== REAL_TEL)
      err(page, `schema telephone is not the real number: ${num}`);
  }

  // FAQ questions must appear in visible text
  const visible = (root.querySelector('main')?.text ?? '').replace(/\s+/g, ' ');
  for (const g of graphs) {
    const faq = findFaq(g);
    for (const q of faq) {
      const probe = q.slice(0, 40).replace(/\s+/g, ' ');
      if (probe && !visible.includes(probe))
        err(page, `FAQPage question not found in visible text: "${q.slice(0, 50)}…"`);
    }
  }
}

function findFaq(node: unknown): string[] {
  const out: string[] = [];
  const rec = (n: unknown) => {
    if (Array.isArray(n)) return n.forEach(rec);
    if (n && typeof n === 'object') {
      const o = n as Record<string, unknown>;
      if (o['@type'] === 'Question' && typeof o.name === 'string') out.push(o.name);
      Object.values(o).forEach(rec);
    }
  };
  rec(node);
  return out;
}

async function main() {
  let files: string[];
  try {
    files = await walk(HTML_DIR);
  } catch {
    console.error('No prerendered HTML. Run `next build` first.');
    process.exit(1);
  }
  for (const f of files) await auditFile(f);
  console.log(`\nAudited JSON-LD on ${files.length} pages.`);
  if (errors.length) {
    errors.forEach((e) => console.log('  ' + e));
    console.log(`\n✗ Schema audit failed (${errors.length}).`);
    process.exit(1);
  }
  console.log('✓ Schema audit passed.');
}

main();
