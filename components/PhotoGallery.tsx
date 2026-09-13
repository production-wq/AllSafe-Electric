import { SiteImage } from './SiteImage';

export interface GalleryPhoto {
  name: string;
  alt: string;
}

/**
 * Mosaic grid of real job-site photos at meaningful size, "Job-Site Editorial"
 * refresh (2026-09-13) — photography as primary content, not a small thumbnail.
 * Every 5th tile spans 2x2 as a feature tile so the grid has rhythm without
 * needing per-photo curation data (the photo pool has no before/after pairs or
 * other metadata to key a smarter layout off of).
 */
export function PhotoGallery({ photos, className = '' }: { photos: GalleryPhoto[]; className?: string }) {
  if (photos.length === 0) return null;
  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 ${className}`}>
      {photos.map((p, i) => {
        const feature = i % 5 === 0 && photos.length > 2;
        return (
          <div
            key={p.name}
            className={`overflow-hidden rounded-card shadow-photo ${feature ? 'col-span-2 row-span-2' : ''}`}
          >
            <div className={`relative ${feature ? 'aspect-[4/3] sm:aspect-[16/10]' : 'aspect-[3/4]'}`}>
              <SiteImage
                name={p.name}
                alt={p.alt}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
