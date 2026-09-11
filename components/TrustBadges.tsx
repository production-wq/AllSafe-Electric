import Link from 'next/link';
import Image from 'next/image';
import { ShieldIcon, CheckIcon, ClockIcon } from './Icons';
import { business } from '@/lib/business';

/**
 * Award badges, planning/docs/10 §4, assets/README.md, docs/07 §6.
 *
 * Five real badges were recovered from the live site. THREE carry 2022 to 2023
 * dates and it is now Sept 2026. A stale award reads as neglect to exactly the
 * buyer we are reassuring, so per the guidance we show only the two UNDATED
 * badges (BBB, HomeAdvisor) until newer ones are confirmed (open item 8a).
 * Flip SHOW_DATED once re-earned badges are in hand, and add the real profile
 * deep links (open item 8c). Until then each badge links to the on-site
 * credentials section, which is a real and verifiable target.
 */
const SHOW_DATED = false;

type Badge = { file: string; label: string; dated?: string; w: number; h: number };

const undatedBadges: Badge[] = [
  { file: 'bbb-accredited-a-plus.png', label: 'BBB Accredited Business, A+ Rating', w: 150, h: 66 },
  {
    file: 'homeadvisor-screened-approved.png',
    label: 'HomeAdvisor Screened and Approved',
    w: 125,
    h: 115,
  },
];

const datedBadges: Badge[] = [
  { file: 'best-of-houzz-2023.png', label: 'Best of Houzz, Service 2023', dated: '2023', w: 121, h: 124 },
  { file: 'angi-super-service-2022.png', label: 'Angi Super Service Award 2022', dated: '2022', w: 138, h: 121 },
  {
    file: 'nextdoor-neighborhood-favorite-2022.png',
    label: 'Nextdoor Neighborhood Favorite 2022',
    dated: '2022',
    w: 132,
    h: 132,
  },
];

const assurances = [
  { icon: ShieldIcon, text: `License ${business.licenses.master.id}` },
  { icon: CheckIcon, text: 'Free estimates on quoted work' },
  { icon: ClockIcon, text: 'Locally owned since 2018' },
];

export function TrustBadges({ className = '' }: { className?: string }) {
  const badges = SHOW_DATED ? [...undatedBadges, ...datedBadges] : undatedBadges;
  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 lg:flex-row lg:justify-between ${className}`}
    >
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
        {badges.map((b) => (
          <Link
            key={b.file}
            href="/about/#credentials"
            className="rounded-btn px-1 opacity-90 transition-opacity hover:opacity-100"
            aria-label={`${b.label}. See our credentials`}
          >
            <Image
              src={`/img/badges/${b.file}`}
              alt={b.label}
              width={b.w}
              height={b.h}
              className="h-[54px] w-auto"
            />
          </Link>
        ))}
      </div>

      <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5">
        {assurances.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2 text-small text-grey">
            <Icon width={17} height={17} className="shrink-0 text-green-600" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
