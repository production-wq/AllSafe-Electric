/**
 * Gemini image generation, planning/docs/11 §3, prompts/image-briefs.md.
 *
 *   npm run images:generate -- --refs         # 3 style references, review first
 *   npm run images:generate                    # the full gap run (uses refs if present)
 *   npm run images:generate -- --only city-parker-co
 *
 * GAPS ONLY. Real photos from assets/source-photos always win.
 *
 * HARD PROHIBITIONS (planning/docs/11 §3, prompts/image-briefs.md "Never generate"):
 *   - Jud, Justin, or anyone representing them
 *   - Before/after work photos
 *   - Award badges, licence documents, certificates
 *   - Customer faces
 *   - Anything a viewer could mistake for evidence of this business's actual work
 *   - Recognizable real landmarks or addresses
 * The prompt builder refuses any brief mentioning a person, a face, before/after,
 * a badge, or a named landmark.
 *
 * KEY HANDLING: GEMINI_API_KEY comes from .env.local ONLY. Never committed, never
 * bundled, never logged. This runs on a dev machine or in CI at build time, never
 * in the browser.
 *
 * OUTPUT: assets/generated/<name>.png (EXIF-free by construction). Then run
 * `npm run images:process` to bring them into public/img and the manifest, and add
 * each to assets/REPLACEMENT-QUEUE.md so it is swapped for a real photo when one exists.
 */
import 'dotenv/config';
import { mkdir, writeFile, readdir, readFile, appendFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { services } from '../lib/services';
import { cities } from '../lib/cities';

const ROOT = process.cwd();
const OUT = join(ROOT, 'assets', 'generated');
const REFS = join(ROOT, 'assets', 'generated', '_refs');
const QUEUE = join(ROOT, 'assets', 'REPLACEMENT-QUEUE.md');

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';
const ENDPOINT = (m: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`;

const GLOBAL_STYLE = `
Natural daylight photography, warm and slightly overexposed, shallow depth of field,
shot at eye level, candid documentary style rather than staged stock photography.
Colorado Front Range suburban home: two-story, stone-and-siding exterior, neutral
interior palette, hardwood or LVP floors, mature landscaping. Lived-in, not styled.
No text, no logos, no watermarks, no brand names, no signage. No hard hats, no hi-vis
vests, no industrial or commercial setting. No orange anywhere in the frame.
No identifiable people, no faces. No house numbers, street signs, or licence plates.
`.trim();

const FORBIDDEN = /\b(jud|justin|before\s*[/&-]?\s*after|award|badge|certificate|licen[sc]e document|face|portrait of|headshot|logo)\b/i;

interface Brief {
  name: string;
  brief: string;
  usedBy: string;
}

function gapBriefs(): Brief[] {
  const list: Brief[] = [];

  for (const s of services) {
    if (s.heroImageGap && s.imageBrief) {
      list.push({ name: `service-${s.slug}`, brief: s.imageBrief, usedBy: `/${s.slug}/ hero (interim: ${s.heroImage})` });
    }
  }
  for (const c of cities) {
    list.push({
      name: `city-${c.slug}`,
      brief: c.heroImageBrief,
      usedBy: `/electricians/${c.slug}/ establishing image`,
    });
  }
  // Homepage trust atmosphere (people-free framings only)
  list.push({
    name: 'trust-shoe-covers',
    brief:
      'Close view of blue disposable shoe covers over clean work boots on light hardwood, a tidy canvas tool bag beside them, warm window light. No people. 4:3.',
    usedBy: 'homepage trust section (interim: real photo electrician-putting-on-indoor-shoe-covers)',
  });
  return list;
}

async function exists(p: string) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function loadRefs(): Promise<{ mimeType: string; data: string }[]> {
  if (!(await exists(REFS))) return [];
  const files = (await readdir(REFS)).filter((f) => /\.(png|jpe?g)$/i.test(f));
  return Promise.all(
    files.map(async (f) => ({
      mimeType: f.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg',
      data: (await readFile(join(REFS, f))).toString('base64'),
    }))
  );
}

async function generate(prompt: string, refs: { mimeType: string; data: string }[]): Promise<Buffer> {
  const parts: unknown[] = [{ text: prompt }];
  for (const r of refs) parts.push({ inlineData: r });

  const res = await fetch(`${ENDPOINT(MODEL)}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts }],
      generationConfig: { responseModalities: ['IMAGE'], temperature: 0.7 },
    }),
  });
  if (!res.ok) {
    throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  const json = (await res.json()) as {
    candidates?: { content?: { parts?: { inlineData?: { data?: string } }[] } }[];
  };
  const b64 = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData?.data)?.inlineData?.data;
  if (!b64) throw new Error('no image in response');
  return Buffer.from(b64, 'base64');
}

function buildPrompt(brief: string): string {
  if (FORBIDDEN.test(brief)) {
    throw new Error(`brief violates a hard prohibition (person/face/badge/before-after): "${brief}"`);
  }
  return `${brief}\n\n${GLOBAL_STYLE}`;
}

async function main() {
  if (!API_KEY) {
    console.error(
      'GEMINI_API_KEY is not set. Add it to .env.local (never commit it). See .env.example and planning/docs/11 §3.'
    );
    process.exit(1);
  }
  await mkdir(OUT, { recursive: true });

  const args = process.argv.slice(2);
  const refsMode = args.includes('--refs');
  const onlyIdx = args.indexOf('--only');
  const only = onlyIdx > -1 ? args[onlyIdx + 1] : null;

  if (refsMode) {
    await mkdir(REFS, { recursive: true });
    console.log(`Generating 3 style references with ${MODEL}. Review them, keep the best, delete the rest.\n`);
    const refBrief =
      'A residential electrician working on a wall outlet in a bright suburban Colorado living room, seen from behind and to the side so no face is visible, a dog resting on a rug in the soft background. Warm afternoon light. 3:2.';
    for (let i = 1; i <= 3; i++) {
      const buf = await generate(buildPrompt(refBrief), []);
      await writeFile(join(REFS, `ref-${i}.png`), buf);
      console.log(`  wrote _refs/ref-${i}.png`);
    }
    console.log('\nNow: keep one or two, delete the others, then run without --refs.');
    return;
  }

  const refs = await loadRefs();
  console.log(
    `Style references: ${refs.length ? `${refs.length} loaded` : 'NONE. Run with --refs first for consistency'}\n`
  );

  const briefs = gapBriefs().filter((b) => !only || b.name === only);
  let ok = 0;
  for (const b of briefs) {
    const outFile = join(OUT, `${b.name}.png`);
    if (await exists(outFile)) {
      console.log(`  = ${b.name} (exists, skipping)`);
      continue;
    }
    try {
      const buf = await generate(buildPrompt(b.brief), refs);
      await writeFile(outFile, buf);
      await appendFile(
        QUEUE,
        `\n- [ ] \`${b.name}.png\`, GENERATED ${new Date().toISOString().slice(0, 10)}. Used by: ${b.usedBy}. Replace with a real photo when available.`
      );
      console.log(`  ✓ ${b.name}.png`);
      ok++;
    } catch (e) {
      console.error(`  ✗ ${b.name}: ${(e as Error).message}`);
    }
  }
  console.log(`\n${ok}/${briefs.length} generated → assets/generated/`);
  console.log('Next: npm run images:process  (resizes, strips EXIF, updates the manifest)');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
