import { business } from './business';

export type AvailabilityState = 'open' | 'after-hours' | 'closed';

export interface Availability {
  state: AvailabilityState;
  /** 'green' when open, 'blue' when closed/after-hours. Never red. planning/docs/02 §6.2 */
  dot: 'green' | 'blue';
  message: string;
  /** Short label for the sticky bar / call button context. */
  shortLabel: string;
  nextOpenLabel?: string;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** Wall-clock parts in America/Denver, regardless of the runtime's own zone. */
export function denverNow(date = new Date()): { day: number; minutes: number; dayName: string } {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: business.hours.timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const parts = Object.fromEntries(fmt.formatToParts(date).map((p) => [p.type, p.value]));
  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const day = dayMap[parts.weekday as string] ?? 1;
  let hour = parseInt(parts.hour as string, 10);
  if (hour === 24) hour = 0;
  const minutes = hour * 60 + parseInt(parts.minute as string, 10);
  return { day, minutes, dayName: DAYS[day] };
}

function hm(v: string): number {
  const [h, m] = v.split(':').map(Number);
  return h * 60 + m;
}

export function getAvailability(date = new Date()): Availability {
  const { day, minutes } = denverNow(date);
  const isWeekday = day >= 1 && day <= 5;
  const open = hm(business.hours.weekday.opens);
  const close = hm(business.hours.weekday.closes);
  const afterUntil = hm(business.hours.afterHoursUntil);
  const { display } = business.phone;

  if (isWeekday && minutes >= open && minutes < close) {
    return {
      state: 'open',
      dot: 'green',
      message: 'Open now · Jud answers this line · usually on site within 2 hours',
      shortLabel: 'Open now',
    };
  }

  if (isWeekday && minutes >= close && minutes < afterUntil) {
    return {
      state: 'after-hours',
      dot: 'blue',
      message: `After hours · Emergency line open · call ${display}`,
      shortLabel: 'After hours',
    };
  }

  // Closed — figure out the next opening day.
  let d = day;
  let addDays = 0;
  do {
    d = (d + 1) % 7;
    addDays += 1;
  } while (d === 0 || d === 6);
  const nextDay = addDays === 1 && minutes < open && isWeekday ? 'today' : DAYS[d];
  const label =
    isWeekday && minutes < open ? 'today at 8am' : `${DAYS[d]} at 8am`;

  return {
    state: 'closed',
    dot: 'blue',
    message: `Opens ${label} · book online any time`,
    shortLabel: 'Closed now',
    nextOpenLabel: nextDay,
  };
}

/** Truthful, JS-off default for server render. Specialised on the client. */
export const AVAILABILITY_FALLBACK: Availability = {
  state: 'open',
  dot: 'green',
  message: 'Jud answers this line · Mon–Fri 8am–6pm · book online any time',
  shortLabel: 'Mon–Fri 8–6',
};
