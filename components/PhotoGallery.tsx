import { SiteImage } from './SiteImage';

export interface GalleryPhoto {
  name: string;
  alt: string;
}

/**
 * Mosaic grid of real job-site photos, "Job-Site Editorial" refresh.
 *
 * This component has produced two separate white-gap bugs, both reported by the
 * client from screenshots, so the layout maths is now deliberate rather than
 * incidental:
 *
 *  1. (2026-09-13) Tiles were sized by aspect ratio while the feature tile
 *     spanned two grid rows, so its image filled only the top of its cell.
 *     Fixed by giving the grid explicit row heights and letting every image
 *     fill its cell with object-cover.
 *
 *  2. (2026-09-14) A feature tile every fifth item left holes: a 2-column-wide
 *     tile cannot begin in the last column, so auto-placement pushed it to the
 *     next row and stranded an empty cell. Fixed three ways at once: dense flow
 *     backfills interior holes, there is now only ONE feature tile, and the
 *     photo list is trimmed to a count that tiles into complete rows.
 *
 * The tiling rule: the feature occupies 4 slots (2x2). For the grid to end on a
 * complete row at BOTH breakpoints, the single-width count must satisfy
 * `singles % 6 === 2`, which makes the total divisible by 3 on desktop and by 2
 * on mobile. That means 3, 9 or 15 photos. Anything else is trimmed down to the
 * nearest valid count rather than rendered with a hole.
 */
const validCount = (n: number): number => {
  if (n < 3) return n === 2 ? 0 : n; // 2 photos cannot tile with a feature; drop to plain handling below
  // total = 1 feature + singles, valid when (n - 1) % 6 === 2  ->  n = 3, 9, 15...
  let c = n;
  while (c > 3 && (c - 1) % 6 !== 2) c -= 1;
  return (c - 1) % 6 === 2 ? c : 0;
};

export function PhotoGallery({ photos, className = '' }: { photos: GalleryPhoto[]; className?: string }) {
  if (photos.length === 0) return null;

  const count = validCount(photos.length);

  // Fallback: a plain even grid with no feature tile. Always hole-free because
  // every tile is the same size.
  if (count === 0) {
    return (
      <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 ${className}`}>
        {photos.map((p) => (
          <div
            key={p.name}
            className="group relative aspect-[4/3] overflow-hidden rounded-card shadow-photo"
          >
            <SiteImage
              name={p.name}
              alt={p.alt}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        ))}
      </div>
    );
  }

  const shown = photos.slice(0, count);

  return (
    <div
      className={`grid grid-flow-dense grid-cols-2 gap-3 [grid-auto-rows:150px] sm:grid-cols-3 sm:gap-4 sm:[grid-auto-rows:190px] lg:[grid-auto-rows:215px] ${className}`}
    >
      {shown.map((p, i) => {
        const feature = i === 0;
        return (
          <div
            key={p.name}
            className={`group relative overflow-hidden rounded-card shadow-photo ${
              feature ? 'col-span-2 row-span-2' : ''
            }`}
          >
            <SiteImage
              name={p.name}
              alt={p.alt}
              fill
              sizes={feature ? '(min-width: 640px) 66vw, 100vw' : '(min-width: 640px) 33vw, 50vw'}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        );
      })}
    </div>
  );
}
