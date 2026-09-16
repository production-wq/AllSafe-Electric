import type { Faq } from './services';

/**
 * Homepage FAQ, marked up as FAQPage (planning/docs/06 §4.1).
 * Answer-first structure (planning/docs/09 §10): the first 40 to 60 words answer
 * the question outright, then elaborate. House style: no em dashes.
 */
export const homeFaqs: Faq[] = [
  {
    q: 'Will someone actually show up when they say they will?',
    a: 'Yes, and it is the thing customers mention most. You get a two-hour arrival window rather than a vague day, a real person answers the phone, and if something changes you get a call instead of silence.',
  },
  {
    q: 'What area do you cover?',
    a: 'We cover the full South Denver metro area, including Parker, Castle Rock, Highlands Ranch, Lone Tree, Centennial, The Pinery, Stonegate, Castle Pines, Franktown, Elizabeth, Elbert, Foxfield, Dove Valley, Aurora, Englewood, Littleton, Acres Green, Greenwood Village, Lakewood, Edgewater, and Denver.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes. Allsafe Electric holds Colorado master electrician license ME.0601023 and electrical contractor license EC.0101068, both verifiable through the state DORA lookup, and carries liability insurance. Every permitted job is inspected by the local jurisdiction, so you are never taking our word for the quality of the work.',
  },
  {
    q: 'What does it cost to have you come out?',
    a: 'A flat diagnostic or estimate fee, told to you before you book. High-ticket jobs like panel upgrades, EV chargers and generators get a real price range up front. We do not do "call for pricing", because you deserve to know roughly what you are walking into.',
  },
  {
    q: 'Do you charge for estimates?',
    a: 'Straightforward quotes are free, whether that is a ceiling fan, a few outlets or a fixture swap. A diagnostic visit to find a fault, or a detailed assessment for a large project, is a flat fee.',
  },
  {
    q: 'Can I request a quote online instead of calling?',
    a: 'Yes. Fill out our form and one of our team members will call you with an estimate, or email you more information if you prefer. If it\'s urgent, call us so we can get you into the first available slot.',
  },
  {
    q: 'How quickly can you get here in an emergency?',
    a: 'Same-day for urgent calls, usually within a two-hour arrival window. We are open weekdays, 8am to 6pm.',
  },
  {
    q: 'Are you good with dogs, and will you keep the house clean?',
    a: 'Shoe covers go on at the door, tools stay on a drop cloth, and nobody smokes anywhere on your property. The owner has a dog of his own and is happy working around yours. The owner named all of this himself as the things that matter to customers, and it is standard on every visit rather than a special request.',
  },
  {
    q: 'Do you handle the permit and the inspection?',
    a: 'Yes, on every job that needs one. We work out whether your address falls under the Town of Parker, Douglas County, or another city, file the application, schedule the utility disconnect where a panel is involved, and meet the inspector on site. You do not chase any part of that process.',
  },
  {
    q: 'Do you do commercial work?',
    a: 'No, and that is deliberate. Allsafe is strictly residential. It means the panels, the code questions, the Douglas County permit process and the way a 1990s Parker home is wired are things we deal with every single day rather than occasionally.',
  },
];
