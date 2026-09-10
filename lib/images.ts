import manifest from '@/data/image-manifest.json';

/**
 * Image manifest, written by scripts/images-process.ts from assets/source-photos.
 * Every published image gets explicit width/height (CLS) and a base64 LQIP blur.
 * EXIF (incl. GPS) is stripped at processing time, planning/docs/11 §4.
 */

export interface ImageEntry {
  /** public path without extension, e.g. /img/photos/allsafe-electrician-holding-dog */
  src: string;
  width: number;
  height: number;
  aspectRatio: number;
  lqip: string; // data URI
  bytes: number;
  generated?: boolean;
}

type Manifest = Record<string, ImageEntry>;

const M = manifest as unknown as Manifest;

export function img(name: string): ImageEntry {
  const key = name.replace(/\.(jpe?g|png|webp|avif)$/i, '');
  const entry = M[key] ?? M[name];
  if (!entry) {
    // Fail loud in dev, degrade in prod, a missing image should be caught by audit.
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(`[images] no manifest entry for "${name}". Run: npm run images:process`);
    }
    return {
      src: '/img/photos/placeholder',
      width: 1600,
      height: 1067,
      aspectRatio: 1.5,
      lqip: '',
      bytes: 0,
    };
  }
  return entry;
}

export function hasImage(name: string): boolean {
  const key = name.replace(/\.(jpe?g|png|webp|avif)$/i, '');
  return Boolean(M[key] ?? M[name]);
}

export const imageCount = Object.keys(M).length;
