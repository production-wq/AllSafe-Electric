import Image from 'next/image';
import { img } from '@/lib/images';

/**
 * Every content image goes through here. Pulls width/height + LQIP from the
 * manifest so there is always an explicit aspect ratio (CLS) and a blur-up.
 * `priority` on the hero only (planning/docs/11 §4); everything else is lazy.
 */
export function SiteImage({
  name,
  alt,
  priority = false,
  sizes = '(min-width: 1024px) 600px, 100vw',
  className = '',
  fill = false,
  aspable = true,
}: {
  name: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  fill?: boolean;
  aspable?: boolean;
}) {
  const e = img(name);
  const common = {
    src: `${e.src}.jpg`,
    alt,
    sizes,
    placeholder: e.lqip ? ('blur' as const) : ('empty' as const),
    blurDataURL: e.lqip || undefined,
    priority,
    loading: priority ? ('eager' as const) : ('lazy' as const),
    quality: 72,
  };

  if (fill) {
    return <Image {...common} alt={alt} fill className={`object-cover ${className}`} />;
  }

  return (
    <Image
      {...common}
      alt={alt}
      width={e.width}
      height={e.height}
      className={className}
      style={aspable ? { aspectRatio: `${e.width} / ${e.height}` } : undefined}
    />
  );
}
