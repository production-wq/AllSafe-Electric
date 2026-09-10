import Image from 'next/image';

/**
 * The real Allsafe Electric logo (client-supplied, 2048x316, transparent WebP:
 * blue house + green pine + "ALLSAFE ELECTRIC" wordmark + green tagline).
 *
 * The art is blue-on-transparent, so it reads well on white but not on the navy
 * footer. On dark grounds pass `onDark`, which drops it onto a small white plate.
 */
export function Logo({
  className = 'h-10 w-auto',
  onDark = false,
  priority = false,
}: {
  className?: string;
  onDark?: boolean;
  priority?: boolean;
}) {
  const img = (
    <Image
      src="/img/brand/allsafe-electric-logo.webp"
      alt="Allsafe Electric"
      width={2048}
      height={316}
      priority={priority}
      className={className}
    />
  );

  if (onDark) {
    return <span className="inline-flex rounded-md bg-white px-3 py-2">{img}</span>;
  }
  return img;
}
