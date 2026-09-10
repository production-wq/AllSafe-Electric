/**
 * Image processing — planning/docs/11 §4.
 *
 *   npm run images:process
 *
 * Reads real photos from assets/source-photos/ and any generated fills from
 * assets/generated/, then for each image:
 *   1. auto-orients from EXIF and STRIPS all metadata (incl. GPS) on write
 *   2. downscales to a sane master size (long edge ≤ 2000px)
 *   3. writes an optimised master .jpg + .webp into public/img/photos/
 *      (next/image derives AVIF/WebP + the responsive set from the master)
 *   4. records width/height + a 20px base64 LQIP blur in data/image-manifest.json
 *
 * No image is deleted. Re-running is idempotent.
 */
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const SOURCES = [
  { dir: join(ROOT, 'assets', 'source-photos'), generated: false },
  { dir: join(ROOT, 'assets', 'generated'), generated: true },
];
const OUT_DIR = join(ROOT, 'public', 'img', 'photos');
const MANIFEST = join(ROOT, 'data', 'image-manifest.json');
const MAX_EDGE = 2000;
const EXT = /\.(jpe?g|png|webp|avif)$/i;

sharp.cache(false);

interface Entry {
  src: string;
  width: number;
  height: number;
  aspectRatio: number;
  lqip: string;
  bytes: number;
  generated?: boolean;
}

async function exists(p: string) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function lqip(input: Buffer): Promise<string> {
  const buf = await sharp(input)
    .resize(20, 20, { fit: 'inside' })
    .webp({ quality: 40 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString('base64')}`;
}

async function processOne(file: string, generated: boolean): Promise<[string, Entry] | null> {
  const { name } = parse(file);
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const pipeline = sharp(file, { failOn: 'none' }).rotate(); // EXIF orient, then metadata dropped
  const meta = await pipeline.metadata();
  const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0);
  const resize =
    longEdge > MAX_EDGE
      ? { width: meta.width! >= meta.height! ? MAX_EDGE : undefined, height: meta.height! > meta.width! ? MAX_EDGE : undefined }
      : undefined;

  const base = sharp(file, { failOn: 'none' }).rotate();
  if (resize) base.resize({ ...resize, withoutEnlargement: true });

  const jpgBuf = await base.clone().jpeg({ quality: 78, mozjpeg: true, progressive: true }).toBuffer();
  const webpBuf = await base.clone().webp({ quality: 80 }).toBuffer();
  const out = await sharp(jpgBuf).metadata();

  await writeFile(join(OUT_DIR, `${slug}.jpg`), jpgBuf);
  await writeFile(join(OUT_DIR, `${slug}.webp`), webpBuf);

  const entry: Entry = {
    src: `/img/photos/${slug}`,
    width: out.width ?? 0,
    height: out.height ?? 0,
    aspectRatio: +((out.width ?? 1) / (out.height ?? 1)).toFixed(4),
    lqip: await lqip(jpgBuf),
    bytes: jpgBuf.byteLength,
    ...(generated ? { generated: true } : {}),
  };
  return [slug, entry];
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const manifest: Record<string, Entry> = {};
  let count = 0;
  let oversize = 0;

  for (const { dir, generated } of SOURCES) {
    if (!(await exists(dir))) continue;
    const files = (await readdir(dir)).filter((f) => EXT.test(f));
    for (const f of files) {
      try {
        const res = await processOne(join(dir, f), generated);
        if (!res) continue;
        manifest[res[0]] = res[1];
        count += 1;
        if (res[1].bytes > 250_000) oversize += 1;
        process.stdout.write(
          `  ${res[0]}  ${res[1].width}×${res[1].height}  ${(res[1].bytes / 1024).toFixed(0)}KB\n`
        );
      } catch (err) {
        console.error(`  ! failed on ${f}:`, (err as Error).message);
      }
    }
  }

  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  await writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + '\n');
  console.log(`\n${count} images processed → public/img/photos/`);
  console.log(`manifest → data/image-manifest.json`);
  if (oversize) console.warn(`⚠ ${oversize} master JPEGs over 250KB — acceptable for masters; next/image serves smaller derivatives.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
