/**
 * URL preservation contract — planning/docs/04 §3, planning/CLAUDE.md §1.1.
 *
 *   npm run test:preservation            # static check against the last build
 *   npm run test:preservation -- --live https://staging.example.com
 *
 * Every URL in data/preserved-urls.csv MUST resolve at HTTP 200 on the new site,
 * at the identical path, or 301 to a closely-matched replacement. Zero exceptions.
 * This is wired into CI so it fails loudly from day one, not at launch.
 *
 * Static mode: confirms a prerendered HTML file exists for each preserved path,
 * OR the path has a 301 entry in data/url-map.csv (single hop to a page that
 * itself resolves). Live mode: curls each URL and checks the status + hop count.
 */
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'csv-parse/sync';

const ROOT = process.cwd();
const HTML_DIR = join(ROOT, '.next', 'server', 'app');

const liveIdx = process.argv.indexOf('--live');
const liveBase = liveIdx > -1 ? process.argv[liveIdx + 1]?.replace(/\/$/, '') : null;

function pathToHtml(p: string): string {
  const clean = p.replace(/^\//, '').replace(/\/$/, '');
  return clean === '' ? join(HTML_DIR, 'index.html') : join(HTML_DIR, `${clean}.html`);
}

async function loadCsv(name: string) {
  const file = join(ROOT, 'data', name);
  if (!existsSync(file)) return [];
  return parse(await readFile(file, 'utf8'), { columns: true, skip_empty_lines: true, trim: true });
}

async function staticCheck(preserved: { url: string }[], redirects: Map<string, string>) {
  const failures: string[] = [];
  for (const row of preserved) {
    const url = row.url;
    if (existsSync(pathToHtml(url))) continue;
    const dest = redirects.get(url);
    if (dest && (existsSync(pathToHtml(dest)) || /^https?:/.test(dest))) {
      console.log(`  ↪ ${url} → 301 → ${dest} (ok)`);
      continue;
    }
    failures.push(`  ✗ ${url} — no prerendered page and no 301 in url-map.csv`);
  }
  return failures;
}

async function liveCheck(preserved: { url: string }[]) {
  const failures: string[] = [];
  for (const row of preserved) {
    const target = `${liveBase}${row.url}`;
    try {
      const res = await fetch(target, { redirect: 'manual' });
      if (res.status === 200) continue;
      if (res.status === 301 || res.status === 308) {
        const loc = res.headers.get('location') ?? '';
        const follow = await fetch(new URL(loc, target), { redirect: 'manual' });
        if (follow.status === 200) {
          console.log(`  ↪ ${row.url} → ${res.status} → ${loc} → 200 (ok)`);
          continue;
        }
        failures.push(`  ✗ ${row.url} → ${res.status} → ${loc} → ${follow.status} (chain/broken)`);
      } else {
        failures.push(`  ✗ ${row.url} → ${res.status}`);
      }
    } catch (e) {
      failures.push(`  ✗ ${row.url} — ${(e as Error).message}`);
    }
  }
  return failures;
}

async function main() {
  const preserved = await loadCsv('preserved-urls.csv');
  if (!preserved.length) {
    console.error('data/preserved-urls.csv is empty or missing.');
    process.exit(1);
  }
  const urlMap = await loadCsv('url-map.csv');
  const redirects = new Map<string, string>(
    urlMap.filter((r: Record<string, string>) => r.status === '301').map((r: Record<string, string>) => [r.old_url, r.new_url])
  );

  console.log(
    `Checking ${preserved.length} preserved URLs (${liveBase ? `live: ${liveBase}` : 'static build'})…\n`
  );

  const failures = liveBase ? await liveCheck(preserved) : await staticCheck(preserved, redirects);

  if (failures.length) {
    failures.forEach((f) => console.log(f));
    console.log(`\n✗ Preservation test FAILED — ${failures.length} URL(s) at risk. This blocks launch.`);
    process.exit(1);
  }
  console.log('✓ Every preserved URL resolves. Preservation contract intact.');
}

main();
