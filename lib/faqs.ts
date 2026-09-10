import type { Faq } from './services';

/** Homepage FAQ — marked up as FAQPage (planning/docs/06 §4.1). Answer-first (docs/09 §10). */
export const homeFaqs: Faq[] = [
  {
    q: 'Will Jud actually show up when he says he will?',
    a: 'Yes, and it is the thing customers mention most. You get a two-hour arrival window, a real person answers the phone, and if something changes you get a call — not silence. Jud and Justin do the work themselves, so the person you booked is the person who comes.',
  },
  {
    q: 'What area do you cover?',
    a: 'Parker first, then Castle Rock, Highlands Ranch, Lone Tree, Centennial and the rest of south Douglas County and the south metro. Parker neighbourhoods — Stonegate, Stroh Ranch, Pradera, The Pinery, Canterberry Crossing — are usually a same-day call during business hours.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes. Allsafe Electric holds Colorado master electrician licence ME.0601023 and electrical contractor licence EC.0101068, both verifiable through the state DORA lookup, and carries liability insurance. Every permitted job is inspected by the local jurisdiction.',
  },
  {
    q: 'What does it cost to have you come out?',
    a: 'A flat diagnostic or estimate fee, told to you before you book, and it comes off the work if you go ahead. High-ticket jobs like panel upgrades, EV chargers and generators get a real price range up front — we do not do "call for pricing."',
  },
  {
    q: 'Do you charge for estimates?',
    a: 'Straightforward quotes — a ceiling fan, a few outlets, a fixture swap — are free. A diagnostic visit to find a fault, or a detailed assessment for a large project, carries the flat fee above, credited toward the work.',
  },
  {
    q: 'Can I book online instead of calling?',
    a: 'Yes. The Book a visit button goes to our Housecall Pro scheduler, live any time. Pick a service and a window and you are on the calendar. If it is urgent, call instead so we can triage it.',
  },
  {
    q: 'Are you good with dogs, and will you keep the house clean?',
    a: 'Shoe covers on, tools kept to a drop cloth, no smoking anywhere on the property, and yes — good with dogs. Jud has one of his own. The owner named all of this himself as things that matter to customers, and they are standard on every visit.',
  },
];
