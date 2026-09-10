import type { Faq } from './services';

/**
 * Homepage FAQ, marked up as FAQPage (planning/docs/06 §4.1).
 * Answer-first structure (planning/docs/09 §10): the first 40 to 60 words answer
 * the question outright, then elaborate. House style: no em dashes.
 */
export const homeFaqs: Faq[] = [
  {
    q: 'Will Jud actually show up when he says he will?',
    a: 'Yes, and it is the thing customers mention most. You get a two-hour arrival window rather than a vague day, a real person answers the phone, and if something changes you get a call instead of silence. Jud and Justin do the work themselves, so the person you booked is the person who turns up at your door.',
  },
  {
    q: 'What area do you cover?',
    a: 'Parker first, then Castle Rock, Highlands Ranch, Lone Tree, Centennial and the rest of south Douglas County and the south metro. Parker neighbourhoods such as Stonegate, Stroh Ranch, Pradera, The Pinery and Canterberry Crossing are usually a same-day call during business hours. Castle Rock and Highlands Ranch add about 20 minutes of drive time.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes. Allsafe Electric holds Colorado master electrician licence ME.0601023 and electrical contractor licence EC.0101068, both verifiable through the state DORA lookup, and carries liability insurance. Every permitted job is inspected by the local jurisdiction, so you are never taking our word for the quality of the work.',
  },
  {
    q: 'What does it cost to have you come out?',
    a: 'A flat diagnostic or estimate fee, told to you before you book, and it comes off the work if you go ahead. High-ticket jobs like panel upgrades, EV chargers and generators get a real price range up front. We do not do "call for pricing", because you deserve to know roughly what you are walking into.',
  },
  {
    q: 'Do you charge for estimates?',
    a: 'Straightforward quotes are free, whether that is a ceiling fan, a few outlets or a fixture swap. A diagnostic visit to find a fault, or a detailed assessment for a large project, carries the flat fee above, and that fee is credited toward the work if you decide to go ahead.',
  },
  {
    q: 'Can I book online instead of calling?',
    a: 'Yes. The Book a visit button goes to our Housecall Pro scheduler, which is live any time of day. Pick a service and a window and you are on the calendar. If it is urgent, call instead so we can triage it properly and get you into the first available slot.',
  },
  {
    q: 'How quickly can you get here in an emergency?',
    a: 'During business hours we can often be on site within two hours across most of Parker. Weekday evenings reach an after-hours emergency line on the same number. Overnight and weekend calls are triaged, so genuine safety problems get a callback and everything else is booked for the next morning.',
  },
  {
    q: 'Are you good with dogs, and will you keep the house clean?',
    a: 'Shoe covers go on at the door, tools stay on a drop cloth, and nobody smokes anywhere on your property. Jud has a dog of his own and is happy working around yours. The owner named all of this himself as the things that matter to customers, and it is standard on every visit rather than a special request.',
  },
  {
    q: 'Do you handle the permit and the inspection?',
    a: 'Yes, on every job that needs one. We work out whether your address falls under the Town of Parker, Douglas County, or another city, file the application, schedule the utility disconnect where a panel is involved, and meet the inspector on site. You do not chase any part of that process.',
  },
  {
    q: 'Do you do commercial work?',
    a: 'No, and that is deliberate. Allsafe is strictly residential. Houses, not warehouses. It means the panels, the code questions, the Douglas County permit process and the way a 1990s Parker home is wired are things we deal with every single day rather than occasionally.',
  },
];
