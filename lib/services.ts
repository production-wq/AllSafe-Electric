/**
 * The 16 residential services. URLs are the contract, planning/docs/03 §3 and §3.2.
 * 13 are PRESERVED (byte-identical to the current live site). 3 are NEW.
 *
 * Every `priceRange` carries `needsApproval: true` and renders as a visibly-marked
 * estimate until the owner signs off. The panel-upgrade figure is the one number the
 * planning docs themselves state (planning/docs/09 §4). All others are industry
 * ballparks pending approval, tracked in BUILD-NOTES.md and planning/docs/99.
 *
 * `heroImage` maps to a real photo from assets/source-photos. The mix is deliberate:
 * roughly half are detail and product shots (a chandelier, a panel, an outlet) rather
 * than photos of Jud, so the site does not read as one person over and over.
 * Services with `heroImageGap: true` still want a job-specific image; the mapped file
 * is an honest stand-in and the page labels it as representative.
 *
 * House style: no em dashes anywhere in customer-facing copy.
 */

export type ServiceGroup = 'repairs-safety' | 'power-panels' | 'lighting-comfort';

export interface Faq {
  q: string;
  a: string;
}

export interface Service {
  id: string;
  slug: string;
  h1: string;
  navLabel: string;
  /** One line for cards and menus. */
  blurb: string;
  title: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  group: ServiceGroup;
  indexed: boolean; // true = preserved URL, false = new page
  emergency?: boolean;
  /** slug used for /electricians/[city]-co/[cityServiceSlug]/, only 6 services get variants */
  cityServiceSlug?: string;
  heroImage: string;
  heroAlt: string;
  heroImageGap?: boolean;
  imageBrief?: string;
  /** Second in-page photo, keeps long pages from being a wall of text. */
  bodyImage?: string;
  bodyAlt?: string;
  lead: string;
  /** Three short proof points shown under the hero. */
  highlights: { label: string; value: string }[];
  priceRange: {
    low: number;
    high: number;
    unit?: string;
    drivers: string;
    includes: string;
    needsApproval: boolean;
  };
  signs: { h3: string; body: string }[];
  /** What the price covers. Bulleted, scannable. */
  included: string[];
  process: string[];
  permits: string;
  faqs: Faq[];
  related: string[];
}

const P = '(303) 648-1934';

export const services: Service[] = [
  // ─── Repairs & safety ────────────────────────────────────────────────────
  {
    id: 'S1',
    slug: 'emergency-electrical-repairs-parker-co',
    h1: 'Emergency electrician in Parker, CO',
    navLabel: 'Emergency repairs',
    blurb: 'Sparks, a burning smell, or half the house dark. A real person answers and We come out.',
    title: 'Emergency Electrician in Parker, CO | Allsafe Electric',
    metaDescription:
      'Sparks, a burning smell, or half the house dark? Call Allsafe Electric. In the daytime we usually answer on the first ring. Parker and Douglas County.',
    primaryKeyword: 'emergency electrician parker',
    secondaryKeywords: [
      '24 hour electrician parker co',
      'emergency electrical repair parker',
      'power outage electrician parker',
    ],
    group: 'repairs-safety',
    indexed: true,
    emergency: true,
    cityServiceSlug: 'emergency-electrician',
    heroImage: 'allsafe-electrician-voltage-testing-breaker-panel.JPG',
    heroAlt: 'An Allsafe Electric electrician checking voltage at an open breaker panel',
    bodyImage: 'electrician-testing-voltage-in-electrical-panel.JPG',
    bodyAlt: 'Voltage testing inside a residential electrical panel during a callout',
    lead:
      'If you smell burning, see sparks, or lost power to part of the house, stop and call. Same-day for urgent calls, usually within a two-hour window, weekdays 8am to 6pm. We usually answer on the first ring. A diagnostic visit is a flat fee that comes off the repair if you go ahead.',
    highlights: [
      { label: 'Typical response', value: 'Within 2 hours in Parker' },
      { label: 'Diagnostic fee', value: 'Flat, credited to the repair' },
      { label: 'Who arrives', value: 'One of our licensed electricians, never a subcontractor' },
    ],
    priceRange: {
      low: 189,
      high: 450,
      drivers: 'time of day, what failed, and whether a part has to be sourced',
      includes:
        'the diagnostic visit, a written cause, and a fixed price to repair before any work starts',
      needsApproval: true,
    },
    signs: [
      {
        h3: 'A burning or fishy smell near an outlet or panel',
        body: 'That smell is hot plastic. Turn the breaker off if you can reach it safely and call. This is not a wait-until-morning problem.',
      },
      {
        h3: 'Buzzing, crackling, or a warm breaker panel',
        body: 'A panel should be silent and cool to the touch. Noise or heat means a loose connection is arcing behind the cover.',
      },
      {
        h3: 'Half the house has power and half does not',
        body: 'Usually a lost neutral or one leg of the incoming service. It can push 240 volts into 120-volt circuits and damage electronics, so kill the main if you know how.',
      },
      {
        h3: 'Scorch marks, a hot outlet, or a plug that falls out',
        body: 'Worn or overloaded outlets overheat. Stop using it, cover it, and have it replaced rather than taped over.',
      },
      {
        h3: 'Water reached wiring, a panel, or outlets',
        body: 'After a burst pipe, an ice dam, or a roof leak, do not re-energise anything that got wet until it has been checked.',
      },
    ],
    included: [
      'A confirmed two-hour arrival window, and a call if anything changes',
      'Making the area safe before anything else happens',
      'Tracing the fault to its actual cause, not just the symptom',
      'A fixed repair price in writing before work starts',
      'The diagnostic fee credited against the repair',
      'A written note of anything that should be scheduled properly later',
    ],
    process: [
      'You call. We confirm the address and a two-hour arrival window, and tell you what to switch off in the meantime.',
      'We arrive, makes the area safe, and finds the actual cause rather than the symptom.',
      'You get a fixed price to repair before any work happens. The diagnostic fee comes off it.',
      'We fix what is dangerous now and flag anything that should be scheduled properly later.',
    ],
    permits:
      'Most emergency repairs are like-for-like and do not need a permit. If the fix turns into a panel or service replacement, we pull the permit with the Town of Parker or Douglas County and handle the inspection. Verify current requirements with your jurisdiction before scheduling non-urgent follow-up work.',
    faqs: [
      {
        q: 'Are you available on weekends or after hours?',
        a: `We are open weekdays, 8am to 6pm, nothing on weekends. Call ${P} for a same-day urgent slot during those hours. A call outside them goes to voicemail and gets a callback first thing the next business day.`,
      },
      {
        q: 'What does an emergency visit cost?',
        a: 'A flat diagnostic fee, and it comes off the repair if you approve the work. You get the repair price in writing before anything starts.',
      },
      {
        q: 'Should I turn the power off myself?',
        a: 'If you can safely reach the breaker for the affected area, switch it off. If the panel is hot, buzzing, or you are not sure which breaker it is, leave it alone and call.',
      },
      {
        q: 'How fast can someone get here?',
        a: 'During business hours, often within two hours for Parker, Stonegate, The Pinery, Stroh Ranch and Canterberry Crossing. Castle Rock and Highlands Ranch add 15 to 20 minutes of drive time.',
      },
      {
        q: 'The power company says the outage is on my side. Now what?',
        a: 'That means the fault is past the meter, so it is the panel, the main, or a circuit. That is exactly what we handle. Call and we will work to the timeline you are dealing with.',
      },
    ],
    related: [
      'electrical-panel-services',
      'electrical-troubleshooting',
      'electrical-outlet-services',
    ],
  },
  {
    id: 'S15',
    slug: 'electrical-troubleshooting',
    h1: 'Electrical troubleshooting and diagnostics in Parker',
    navLabel: 'Troubleshooting',
    blurb: 'Breaker trips, flickering lights, and dead circuits traced back to the real cause.',
    title: 'Electrical Troubleshooting in Parker, CO | Allsafe Electric',
    metaDescription:
      'Breaker keeps tripping? Lights flicker? Outlet dead but the breaker is fine? We trace the real cause and fix it, for a flat diagnostic fee in Parker.',
    primaryKeyword: 'electrical troubleshooting parker',
    secondaryKeywords: [
      'breaker keeps tripping parker',
      'why do my lights flicker',
      'half my house has no power',
    ],
    group: 'repairs-safety',
    indexed: false,
    heroImage: 'electrician-testing-kitchen-outlet-with-voltage-detector.JPG',
    heroAlt: 'An Allsafe Electric electrician testing a kitchen outlet with a voltage detector',
    bodyImage: 'electrician-testing-three-gang-light-switches.JPG',
    bodyAlt: 'Testing a bank of three light switches to isolate a dead circuit',
    lead:
      'A circuit that keeps tripping, lights that flicker, or an outlet that quit are all symptoms of something specific. It is usually a loose connection, an overloaded circuit, a failing breaker, or a fault buried in the wall. We charge a flat fee to find it, trace it to the real cause, and give you a fixed price to repair. Same-week appointments, and often within two hours if it is urgent.',
    highlights: [
      { label: 'Flat diagnostic fee', value: 'Known before you book' },
      { label: 'Most faults found', value: 'On the first visit' },
      { label: 'You get', value: 'The cause in plain English' },
    ],
    priceRange: {
      low: 165,
      high: 385,
      drivers: 'how far the fault is buried and how many circuits are involved',
      includes: 'the diagnostic visit, a written explanation of the cause, and a fixed repair price',
      needsApproval: true,
    },
    signs: [
      {
        h3: 'A breaker that trips again the moment you reset it',
        body: 'That is a hard short or a ground fault on the circuit. It is not a bad breaker until proven otherwise, and forcing it back on is not safe.',
      },
      {
        h3: 'Lights that dim when the AC or microwave starts',
        body: 'Usually a loose neutral, an undersized circuit, or a connection failing at the panel. It gets worse over time, not better.',
      },
      {
        h3: 'An outlet is dead but nothing tripped',
        body: 'Often a failed backstab connection upstream, or a tripped GFCI in another room. Easy to find, cheap to fix, and it will not fix itself.',
      },
      {
        h3: 'Switches or outlets that are warm or crackle',
        body: 'Heat means resistance, and resistance in a connection means it is on its way to arcing.',
      },
    ],
    included: [
      'A flat fee agreed before the visit, with no hourly surprise',
      'Isolating the circuit and testing it under real load',
      'Tracing the fault to a specific device, connection, or run',
      'A written explanation you can actually follow',
      'A fixed repair price before any work begins',
      'Re-testing the whole circuit, not just the one point we fixed',
    ],
    process: [
      'You describe what is happening and when. Half the diagnosis is in the pattern.',
      'We isolate the circuit, tests under load, and traces the fault to a specific device, connection, or run.',
      'You get the cause in plain language and a fixed price to repair it.',
      'We fix it and re-test the whole circuit, not just the one point.',
    ],
    permits:
      'Diagnostics and most repairs are maintenance work and do not require a permit. If tracing the fault reveals unsafe wiring that needs replacing at scale, that portion is permitted with the local authority. Confirm requirements with the Town of Parker or Douglas County.',
    faqs: [
      {
        q: 'Why not just replace the breaker?',
        a: 'A breaker that trips is usually doing its job, because something on the circuit is faulting. Swapping the breaker without finding the fault removes the safety device and leaves the hazard in place.',
      },
      {
        q: 'Can you tell me the cost over the phone?',
        a: 'We can tell you the diagnostic fee up front. Because repair costs depend on what we find, we cannot give you an accurate repair price until we have diagnosed the issue. Once we do, you will receive the price in writing and approve it before any repair work begins.',
      },
      {
        q: 'My lights flicker all over the house. Is that dangerous?',
        a: 'Whole-house flicker points at the main service connection or the panel itself, which is the more serious category. Get it looked at soon rather than waiting.',
      },
      {
        q: 'Do you fix it on the same visit?',
        a: 'Most of the time, yes. If a part has to be sourced we make the area safe, quote the return visit, and come back.',
      },
    ],
    related: [
      'electrical-panel-services',
      'electrical-outlet-services',
      'emergency-electrical-repairs-parker-co',
    ],
  },
  {
    id: 'S3',
    slug: 'electrical-outlet-services',
    h1: 'Outlet repair and installation in Parker',
    navLabel: 'Outlets',
    blurb: 'Dead outlets traced and fixed, plus new GFCI and USB outlets where you need them.',
    title: 'Outlet Repair & Installation in Parker, CO | Allsafe',
    metaDescription:
      'Dead outlets traced and fixed, plus new, GFCI and USB outlets where you need them. Spec-grade devices, back-wired properly. Allsafe Electric, Parker CO.',
    primaryKeyword: 'outlet repair parker co',
    secondaryKeywords: [
      'outlet not working parker',
      'gfci outlet installation parker',
      'add outlet parker co',
    ],
    group: 'repairs-safety',
    indexed: true,
    cityServiceSlug: 'outlet-repair',
    heroImage: 'electrician-installing-dual-usb-wall-outlet-cover.JPG',
    heroAlt: 'Fitting the cover plate on a new dual-USB wall outlet',
    bodyImage: 'dual-usb-residential-wall-outlet.JPG',
    bodyAlt: 'A finished dual-USB residential wall outlet on a painted wall',
    lead:
      'A dead outlet is usually a fast, inexpensive fix once someone finds the failed connection. Adding outlets is a clean half-day job, whether that is a kitchen island, a garage freezer, a home office, or a bedroom that has two and needs six. We use spec-grade devices and wire them to the screws, not the push-in connectors that cause most of the dead outlets we get called about.',
    highlights: [
      { label: 'Most repairs', value: 'Done in one visit' },
      { label: 'Devices used', value: 'Spec-grade, screw-terminated' },
      { label: 'Per-outlet price', value: 'Drops when we do several' },
    ],
    priceRange: {
      low: 145,
      high: 340,
      unit: 'per outlet',
      drivers:
        'whether we are repairing, replacing, or running a new circuit, and how far it is from the panel',
      includes: 'a spec-grade device, a new cover plate, and testing on the whole circuit',
      needsApproval: true,
    },
    signs: [
      {
        h3: 'Plugs fall out or only work when you wiggle them',
        body: 'The contacts inside the outlet are worn. A worn outlet arcs and overheats, so replace it rather than taping the plug in place.',
      },
      {
        h3: 'No power and the breaker is not tripped',
        body: 'Usually a failed connection at another outlet on the same run. Quick to trace once you know what to look for.',
      },
      {
        h3: 'No GFCI in the kitchen, bath, garage, or outside',
        body: 'Current code requires it in all of those areas. It is the cheapest life-safety upgrade in the house.',
      },
      {
        h3: 'Extension cords doing a permanent job',
        body: 'That is a sign the room is short on circuits, not just outlets. We can add a dedicated circuit instead.',
      },
    ],
    included: [
      'Spec-grade devices wired to the screw terminals, never backstabbed',
      'Tamper-resistant receptacles as standard where children are around',
      'A new cover plate on every outlet we touch',
      'A load check before we add anything to an existing circuit',
      'Testing on every outlet on the affected circuit before we leave',
      'Tidy drywall work and a clean-up, with any patch pointed out first',
    ],
    process: [
      'You call or book, and tell us which rooms and roughly how many.',
      'We confirm the circuit can take the load, or plans a new one.',
      'We install spec-grade, back-wired devices and tamper-resistant receptacles where kids are around.',
      'Every outlet on the affected circuit gets tested before we leave.',
    ],
    permits:
      'Replacing outlets is maintenance and is not permitted. Adding a new circuit or a significant number of new outlets is permitted work in the Town of Parker and Douglas County, and we pull it and meet the inspector. Verify current thresholds with your jurisdiction.',
    faqs: [
      {
        q: 'How much does it cost to replace one outlet?',
        a: 'A straightforward replacement sits at the low end of the range above, and the per-outlet price drops when we do several in one visit.',
      },
      {
        q: 'Can you add an outlet without opening the wall?',
        a: 'Often, yes. We can fish a new outlet off a nearby box or circuit with minimal drywall work, and we tell you before we start if a patch will be needed.',
      },
      {
        q: 'What is a GFCI and do I need one?',
        a: 'A GFCI shuts the outlet off in a fraction of a second if current leaks to ground, which is the scenario that causes electrocution. Code requires them in kitchens, bathrooms, garages, basements, and outdoors.',
      },
      {
        q: 'Why do my outlets keep going bad?',
        a: 'Almost always because the original installer used push-in backstab connectors, which loosen over time. We wire to the screws, which do not.',
      },
    ],
    related: [
      'electrical-switch-services',
      'electrical-troubleshooting',
      'electrical-wiring-repairs-services',
    ],
  },
  {
    id: 'S4',
    slug: 'electrical-switch-services',
    h1: 'Light switch repair and installation in Parker',
    navLabel: 'Switches & dimmers',
    blurb: 'Sparking switches, dead three-way pairs, and humming dimmers, sorted properly.',
    title: 'Light Switch Repair in Parker, CO | Allsafe Electric',
    metaDescription:
      'Switches that spark, dead three-way pairs, and dimmers that hum, repaired or replaced properly by a licensed electrician in Parker and Douglas County.',
    primaryKeyword: 'light switch replacement parker',
    secondaryKeywords: ['dimmer switch installation parker', 'three way switch repair parker'],
    group: 'repairs-safety',
    indexed: true,
    heroImage: 'electrician-installing-three-gang-light-switch-cover.JPG',
    heroAlt: 'Fitting a three-gang switch plate over newly installed light switches',
    bodyImage: 'electrician-leveling-two-gang-light-switch-plate.JPG',
    bodyAlt: 'Levelling a two-gang switch plate against a hallway wall',
    lead:
      'A switch that sparks, gets warm, or has stopped working is a 20-minute fix in most rooms. So is replacing a wall of tired switches with matching decora devices, adding a dimmer, or sorting out a three-way pair that never worked right. Dimmers have to be matched to the bulbs or they hum and flicker, and we bring the right one rather than guessing.',
    highlights: [
      { label: 'Typical swap', value: 'About 20 minutes' },
      { label: 'Dimmers', value: 'Matched to your bulbs' },
      { label: 'Finish', value: 'Consistent plates across a floor' },
    ],
    priceRange: {
      low: 135,
      high: 280,
      unit: 'per switch',
      drivers: 'single-pole versus three-way or smart, and the state of the wiring in the box',
      includes: 'the device, a new plate, and a function test',
      needsApproval: true,
    },
    signs: [
      {
        h3: 'A switch that sparks or feels warm',
        body: 'A small spark as the contacts part can be normal. A visible arc, real heat, or a scorch mark is not.',
      },
      {
        h3: 'A three-way pair where one cancels the other',
        body: 'Miswired travellers. Common in homes where someone replaced one of the pair without tracing it first.',
      },
      {
        h3: 'A dimmer that hums or only works over half its range',
        body: 'That is the wrong dimmer for the LED load. The fix is a compatible dimmer, not new bulbs.',
      },
      {
        h3: 'A switch that does nothing at all',
        body: 'Either the switch failed or the fixture did. Quick to isolate once we are on site.',
      },
    ],
    included: [
      'Checking the box for backstabbed or aluminum connections and correcting them',
      'Matched decora devices and plates so a whole floor looks finished',
      'Dimmers rated for your actual bulb type, brought to the visit',
      'Smart switches joined to your network and named before we go',
      'A function test on every switch and the fixtures it controls',
      'Old devices and packaging taken away',
    ],
    process: [
      'Tell us which switches and what they do, or fail to do.',
      'We check each box for backstabbed or aluminum connections and corrects them.',
      'We install matched devices, and program smart switches onto your network if you want them.',
      'Every switch and the fixtures it controls get tested.',
    ],
    permits:
      'Switch replacement and repair is maintenance and is not permitted work. Confirm with your jurisdiction if the job expands into new circuits.',
    faqs: [
      {
        q: 'Can you make all my switches match?',
        a: 'Yes. Replacing mismatched toggles with a consistent decora set across a floor is one of the most common jobs we do, and it makes a house feel finished.',
      },
      {
        q: 'Do smart switches need a neutral wire?',
        a: 'Most do. Many Parker homes built after the mid-1980s have a neutral in the switch box, and older ones may not. We check before recommending a specific switch.',
      },
      {
        q: 'Why does my dimmer buzz?',
        a: 'The dimmer and the bulbs are not compatible. LED dimming is picky, so we carry dimmers rated for the common bulb types and swap to the right one.',
      },
      {
        q: 'One switch controls nothing. Can you remove it?',
        a: 'We can trace it first, because sometimes it is a switched outlet or a disconnected fixture worth restoring. Then we either make it live or safely retire it.',
      },
    ],
    related: ['electrical-outlet-services', 'lighting-services', 'home-automation'],
  },
  {
    id: 'S5',
    slug: 'electrical-wiring-repairs-services',
    h1: 'Home wiring repair and rewiring in Parker',
    navLabel: 'Wiring & rewiring',
    blurb: 'Aluminum wiring, damaged runs, additions, and staged whole-home rewires.',
    title: 'Home Wiring Repair & Rewiring in Parker, CO | Allsafe',
    metaDescription:
      'Aluminum branch wiring, damaged runs, additions and staged whole-home rewires. Allsafe Electric repairs and replaces residential wiring across Parker.',
    primaryKeyword: 'house rewiring parker co',
    secondaryKeywords: [
      'aluminum wiring replacement colorado',
      'knob and tube replacement parker',
      'wiring repair parker',
    ],
    group: 'repairs-safety',
    indexed: true,
    heroImage: 'electrician-repairing-light-fixture-wiring.JPG',
    heroAlt: 'Repairing the wiring connections behind a ceiling light fixture',
    bodyImage: 'allsafe-electrician-wiring-decorative-light-fixture.JPG',
    bodyAlt: 'Wiring a decorative light fixture into a ceiling box',
    lead:
      'Most homes here do not need a full rewire. They need specific problems fixed: aluminum branch circuits pigtailed correctly, a run damaged by a nail or a rodent, or new circuits for a finished basement. When a rewire genuinely is the right call, which happens in some 1970s Pinery and Ponderosa homes and older Castle Rock stock, we stage it room by room so you are never without power for long.',
    highlights: [
      { label: 'Most calls', value: 'Resolved without a full rewire' },
      { label: 'Rewires', value: 'Staged so power stays on' },
      { label: 'Permits', value: 'Filed and inspected by us' },
    ],
    priceRange: {
      low: 350,
      high: 8000,
      drivers:
        'a single repair versus remediating aluminum throughout versus a full rewire, plus access above the ceilings',
      includes:
        'copper materials, rated connectors, patching coordination, and the permit and inspection where required',
      needsApproval: true,
    },
    signs: [
      {
        h3: 'Silver branch wiring in a house built 1965 to 1975',
        body: 'That is aluminum branch wiring. It is not a teardown, but the connections need proper correction with rated connectors.',
      },
      {
        h3: 'Warm cover plates or a faint plastic smell in several rooms',
        body: 'Connections failing at multiple points, often from age or from the original wiring method.',
      },
      {
        h3: 'Cloth-covered or ungrounded two-prong wiring',
        body: 'Common in pre-1970 homes. Grounding and selective replacement bring it up to a safe standard.',
      },
      {
        h3: 'A renovation, an addition, or a finished basement',
        body: 'New square footage needs new circuits sized and run to current code, and it is far cheaper before the drywall.',
      },
    ],
    included: [
      'An honest assessment of whether this is a repair or a genuine rewire',
      'A written scope with a room-by-room sequence and a price',
      'Copper conductors and rated connectors throughout',
      'The permit filed and the inspector met on site',
      'Essential circuits kept live while the work is staged',
      'Drywall patching coordinated so you are not left chasing a second trade',
    ],
    process: [
      'We inspect accessible wiring, the panel, and a sample of boxes, then tells you honestly whether this is a repair or a rewire.',
      'You get a written scope with a room-by-room sequence and a price.',
      'We pull the permit, do the work in stages, and keep the essential circuits live.',
      'The jurisdiction inspects, and we coordinate the drywall patching.',
    ],
    permits:
      'Rewiring and new-circuit work is permitted and inspected by the Town of Parker, Douglas County, or the relevant city. We handle the application and meet the inspector. Fees and process differ by jurisdiction, so see our permit guides and verify before scheduling.',
    faqs: [
      {
        q: 'Does my house need a full rewire?',
        a: 'Usually not. Most calls are resolved with targeted repairs and connection corrections. We will tell you if a rewire is genuinely warranted, and why.',
      },
      {
        q: 'Is aluminum wiring a dealbreaker on a house I am buying?',
        a: 'No. It is a known, correctable condition. Proper pigtailing with rated connectors, or a partial replacement, resolves it and satisfies most inspectors and insurers.',
      },
      {
        q: 'Will you tear up my walls?',
        a: 'We minimise it by fishing walls, using existing chases, and working from unfinished spaces. Where a patch is unavoidable we mark it and coordinate the repair.',
      },
      {
        q: 'How long does a rewire take?',
        a: 'A staged whole-home rewire is typically several days to two weeks depending on size and access. You keep power throughout.',
      },
    ],
    related: [
      'electrical-panel-services',
      'home-electrical-safety-inspections',
      'electrical-outlet-services',
    ],
  },
  {
    id: 'S13',
    slug: 'home-electrical-safety-inspections',
    h1: 'Home electrical safety inspection in Parker',
    navLabel: 'Safety inspections',
    blurb: 'A licensed electrician opens the panel and gives you a written report with photos.',
    title: 'Electrical Safety Inspection in Parker, CO | Allsafe',
    metaDescription:
      'Buying a home or in one over 20 years old? A licensed master electrician opens the panel, tests grounding and GFCI protection, and gives you a written report.',
    primaryKeyword: 'electrical inspection parker co',
    secondaryKeywords: [
      'home electrical safety inspection colorado',
      'pre purchase electrical inspection parker',
    ],
    group: 'repairs-safety',
    indexed: true,
    cityServiceSlug: 'electrical-inspection',
    heroImage: 'electrician-pointing-to-circuit-breaker.JPG',
    heroAlt: 'Pointing out a specific breaker during a home electrical safety inspection',
    bodyImage: 'electrical-panel-main-breaker-inspection.JPG',
    bodyAlt: 'Close inspection of the main breaker and bus bar inside a residential panel',
    lead:
      'A home inspector spends about ten minutes on the electrical system. A licensed electrician spends an hour and actually opens the panel. You get a written report covering what is safe, what needs attention now, and what to budget for, with photos and no pressure to buy anything. Worth doing before you buy, after a bad storm, or on any home over 20 years old.',
    highlights: [
      { label: 'Time on site', value: 'About an hour' },
      { label: 'Report', value: 'Same day or next morning' },
      { label: 'Obligation', value: 'None, the report stands alone' },
    ],
    priceRange: {
      low: 189,
      high: 375,
      drivers:
        'home size, panel accessibility, and whether the report needs formatting for a lender or insurer',
      includes:
        'a full walk of the system, panel inspection, GFCI, AFCI and grounding tests, and a written report with photos',
      needsApproval: true,
    },
    signs: [
      {
        h3: 'You are under contract on a home',
        body: 'The general inspection will not open the panel or identify a Federal Pacific or Zinsco box. This one does, while you still have negotiating room.',
      },
      {
        h3: 'The house is over 20 years old and never checked',
        body: 'Panels, breakers, and connections age. Most Highlands Ranch and Stonegate homes are now well inside that window.',
      },
      {
        h3: 'You are adding an EV charger, hot tub, or big appliance',
        body: 'Find out whether the service can take it before you buy the equipment, not after it is delivered.',
      },
      {
        h3: 'After a lightning storm, a surge, or water intrusion',
        body: 'Damage is frequently hidden until it is not, and a surge can weaken a connection that fails months later.',
      },
    ],
    included: [
      'The service entrance, meter, mast, and main panel',
      'Grounding and bonding, tested rather than eyeballed',
      'A representative sample of outlets, switches, and fixtures',
      'GFCI and AFCI protection tested where it exists and flagged where it does not',
      'Photographs of every item raised, rated safe, monitor, or address now',
      'A written report you can hand to a lender, an insurer, or another contractor',
    ],
    process: [
      'We walk the whole system: service entrance, meter, panel, grounding and bonding, a sample of outlets and switches, GFCI and AFCI protection, and visible wiring.',
      'Everything gets photographed and rated as safe, monitor, or address now.',
      'You get the written report the same day or the next morning.',
      'If you want the flagged items fixed, that is a separate quote and there is no obligation.',
    ],
    permits:
      'An inspection itself needs no permit. Any corrective work that follows is permitted per the local jurisdiction. If you need a report in a specific format for a lender, insurer, or real-estate transaction, tell us when you book.',
    faqs: [
      {
        q: 'Is this the same as the home inspection?',
        a: 'No. A general home inspector does a visual, non-invasive check and explicitly does not open the panel or evaluate the system in depth. This is a licensed electrician doing exactly that.',
      },
      {
        q: 'Will you try to sell me repairs?',
        a: 'The report stands on its own. If you want us to fix what we found, we will quote it. If you want to take the report to someone else, that is fine too.',
      },
      {
        q: 'Can you check for Federal Pacific or Zinsco panels?',
        a: 'Yes, and it is one of the first things we look for in homes from the 1960s to the early 1980s. Both brands have documented failure-to-trip problems.',
      },
      {
        q: 'How long does it take?',
        a: 'About an hour for a typical Douglas County home, and longer for larger or older properties.',
      },
    ],
    related: [
      'electrical-panel-services',
      'electrical-wiring-repairs-services',
      'whole-home-surge-protection',
    ],
  },
  {
    id: 'S12',
    slug: 'smoke-detectors',
    h1: 'Smoke and CO detector installation in Parker',
    navLabel: 'Smoke & CO detectors',
    blurb: 'Interconnected smoke and CO detectors, brought up to Colorado code.',
    title: 'Smoke Detector Installation in Parker | Allsafe Electric',
    metaDescription:
      'Hardwired smoke and CO detectors installed, interconnected and brought up to Colorado code, with ten-year sealed units available. Allsafe Electric, Parker.',
    primaryKeyword: 'smoke detector installation parker',
    secondaryKeywords: [
      'hardwired smoke detector replacement parker',
      'co detector installation colorado',
    ],
    group: 'repairs-safety',
    indexed: true,
    heroImage: 'allsafe-electrician-standing-in-modern-home.JPG',
    heroAlt: 'An Allsafe Electric electrician in the hallway of a modern Parker home',
    heroImageGap: true,
    imageBrief:
      'A hand mounting a white smoke detector to a hallway ceiling, viewed from below, warm daylight, suburban Colorado home. 4:3.',
    lead:
      'Hardwired detectors have a lifespan of about ten years, and then they start chirping, false-alarming, or missing real events. We replace them as an interconnected set so that when one senses smoke, every alarm in the house sounds. Colorado requires a CO alarm within 15 feet of every sleeping area, and we sort that out at the same visit.',
    highlights: [
      { label: 'Replace every', value: 'About 10 years' },
      { label: 'Interconnected', value: 'One sounds, all sound' },
      { label: 'CO coverage', value: 'Placed to Colorado code' },
    ],
    priceRange: {
      low: 65,
      high: 145,
      unit: 'per device installed',
      drivers:
        'combination smoke and CO versus smoke only, sealed ten-year versus replaceable battery, and ceiling height',
      includes: 'the device, interconnection to the existing set, and a full-system test',
      needsApproval: true,
    },
    signs: [
      {
        h3: 'Alarms chirping or false-alarming for no reason',
        body: 'Sensors drift as they age. Past about ten years the whole set is due rather than the one that is complaining.',
      },
      {
        h3: 'A date stamp on the back older than ten years',
        body: 'Every detector has a manufacture date printed on it. If you cannot find one, it is old enough to replace.',
      },
      {
        h3: 'No CO alarm near the bedrooms',
        body: 'Colorado law requires one within 15 feet of every sleeping area in homes with fuel appliances or an attached garage.',
      },
      {
        h3: 'Alarms that do not sound together',
        body: 'If setting one off does not trigger the others, the interconnection is broken or was never there.',
      },
    ],
    included: [
      'A count and date check on every existing detector',
      'Devices matched across the house so they interconnect reliably',
      'CO coverage placed correctly for Colorado requirements',
      'Sealed ten-year units offered so you stop changing batteries',
      'A full-system test with every alarm confirmed sounding together',
      'Old units disposed of properly',
    ],
    process: [
      'We count the existing detectors and check the date codes and interconnection.',
      'You choose combination or smoke only, and sealed ten-year or replaceable battery units.',
      'We replace the set, keep them interconnected, and add CO coverage where code requires it.',
      'We test every alarm and confirm they all sound together.',
    ],
    permits:
      'Like-for-like detector replacement is maintenance. Adding detectors on new wiring, or interconnection where none existed, may be permitted depending on scope, so confirm with the Town of Parker or Douglas County.',
    faqs: [
      {
        q: 'How often do hardwired smoke detectors need replacing?',
        a: 'About every ten years. The battery is a backup, and the sensor itself wears out on that timeline regardless of how often you change batteries.',
      },
      {
        q: 'Can I mix battery and hardwired detectors?',
        a: 'They should behave as one interconnected system. We can add battery-interconnect units where running a wire is impractical, so a fire in the basement still wakes the bedrooms.',
      },
      {
        q: 'Where does code require CO alarms in Colorado?',
        a: 'Within 15 feet of each room used for sleeping, in homes with fuel-burning appliances or an attached garage. We place them correctly as part of the job.',
      },
      {
        q: 'My alarm chirps even with a new battery. Why?',
        a: 'That is end of life. Modern units chirp a distinct pattern when the sensor expires, and replacing the battery will not stop it.',
      },
    ],
    related: [
      'whole-home-surge-protection',
      'home-electrical-safety-inspections',
      'electrical-panel-services',
    ],
  },

  // ─── Power & panels ──────────────────────────────────────────────────────
  {
    id: 'S2',
    slug: 'electrical-panel-services',
    h1: 'Electrical panel upgrades and repairs in Parker, CO',
    navLabel: 'Panel upgrades & repairs',
    blurb: 'Fuse boxes, tripping breakers, and Federal Pacific panels replaced. Most run $2,200 to $4,500.',
    title: 'Electrical Panel Upgrades & Repairs in Parker, CO | Allsafe',
    metaDescription:
      'Breaker tripping or a fuse box still in service? We upgrade panels across Parker and Douglas County. Licensed master electrician, permits handled for you.',
    primaryKeyword: 'electrical panel upgrade parker',
    secondaryKeywords: [
      'breaker box replacement parker',
      '200 amp service upgrade parker',
      'fuse box replacement parker',
      'federal pacific panel replacement',
    ],
    group: 'power-panels',
    indexed: true,
    cityServiceSlug: 'panel-upgrade',
    heroImage: 'electrician-tightening-connections-in-breaker-panel.JPG',
    heroAlt: 'Torquing breaker connections inside a newly installed residential panel',
    bodyImage: 'allsafe-electrician-installing-breaker-panel-cover.JPG',
    bodyAlt: 'Refitting the deadfront cover on a finished breaker panel',
    lead:
      'If your breakers trip when the microwave and the toaster run together, you still have a fuse box, or your panel is a Federal Pacific or Zinsco, an upgrade is the fix. Most panel upgrades in Parker run $2,200 to $4,500. What moves the price is the amperage you need, where the meter sits, whether the mast has to be replaced, and what the inspector finds. We give you the range on a first call and a fixed number after seeing it.',
    highlights: [
      { label: 'Typical range', value: '$2,200 to $4,500' },
      { label: 'Time on site', value: 'Usually a single day' },
      { label: 'Power off for', value: 'A few hours, not all day' },
    ],
    priceRange: {
      low: 2200,
      high: 4500,
      drivers:
        'amperage, meter location, whether the service mast needs replacing, and inspection findings',
      includes:
        'the panel, breakers, labelling, grounding and bonding brought to current code, the permit, and the inspection',
      needsApproval: false, // figure stated in planning/docs/09 §4
    },
    signs: [
      {
        h3: 'Breakers that trip repeatedly',
        body: 'Not an inconvenience. A circuit or the panel is overloaded or failing, and resetting it over and over is not a fix.',
      },
      {
        h3: 'A fuse box instead of breakers',
        body: 'Fuses work, but they get bypassed with the wrong amperage and the panels are usually undersized for a modern house.',
      },
      {
        h3: 'Federal Pacific or Zinsco labelling',
        body: 'Both have a documented history of breakers that fail to trip on a fault. Common in Colorado homes built between 1960 and 1983.',
      },
      {
        h3: '100-amp service and a growing list of loads',
        body: 'A house with AC, an EV, a hot tub, and an electric range is asking more of a 100-amp service than it was built for.',
      },
      {
        h3: 'Rust, scorching, a burning smell, or a warm cover',
        body: 'Water intrusion, or a connection arcing behind the deadfront. Have that looked at now rather than next month.',
      },
    ],
    included: [
      'A load calculation on your actual usage, not a default guess',
      'The panel, breakers, and a legible typed circuit schedule',
      'Grounding and bonding brought up to current code',
      'The permit filed with the correct jurisdiction',
      'Utility disconnect and reconnect scheduled around your day',
      'The inspection attended, and the old panel removed',
    ],
    process: [
      'We confirm the amperage you need based on the actual loads rather than a guess, and checks the meter, mast, and grounding.',
      'You get a fixed price and the permit is filed with the Town of Parker or Douglas County.',
      'On the day, the utility disconnects, the old panel comes out, the new one goes in with every circuit labelled, and power is usually back within the day.',
      'The jurisdiction inspects, and CORE or Xcel reconnects.',
    ],
    permits:
      'A panel or service upgrade is always permitted and inspected. In Parker that is the Town of Parker Building Division, unincorporated areas go through Douglas County, and Centennial has its own process. We file the application, schedule the utility disconnect and reconnect, and meet the inspector. See our Parker and Douglas County permit guides, and verify current fees before scheduling.',
    faqs: [
      {
        q: 'How long does a panel upgrade take?',
        a: 'Most are a single day. The power is off for part of it while the old panel comes out and the new one goes in. A service change that also needs a new mast or meter can run into a second day.',
      },
      {
        q: 'Will my power be off all day?',
        a: 'No. It is off for the window when the panel is physically swapped, usually a few hours. We schedule the utility disconnect and reconnect around that.',
      },
      {
        q: 'Do I need 200-amp service?',
        a: 'Many Douglas County homes do once you add an EV charger, hot tub, or electric heat. Some are fine at 150. We size it to your real loads and your plans rather than a default.',
      },
      {
        q: 'Is a Federal Pacific panel actually dangerous?',
        a: 'The concern is well documented. A meaningful share of Stab-Lok breakers do not trip on an overload or fault in testing, and most electricians and many insurers recommend replacement.',
      },
      {
        q: 'Can you just add a subpanel instead?',
        a: 'Sometimes a subpanel is the right and cheaper answer, if the main service has capacity and you only need more circuit space. If the service itself is undersized, a subpanel does not solve it. We will tell you which situation you are in.',
      },
    ],
    related: [
      'whole-home-surge-protection',
      'residential-ev-charging',
      'home-electrical-safety-inspections',
    ],
  },
  {
    id: 'S11',
    slug: 'whole-home-surge-protection',
    h1: 'Whole-home surge protection in Parker',
    navLabel: 'Surge protection',
    blurb: 'One panel-mounted device shields the whole house from grid spikes and lightning.',
    title: 'Whole-Home Surge Protection in Parker, CO | Allsafe',
    metaDescription:
      'A panel-mounted device shields the whole house from grid spikes and lightning strikes. Installed in about an hour by a licensed Parker electrician.',
    primaryKeyword: 'whole home surge protector parker',
    secondaryKeywords: ['surge protection installation colorado'],
    group: 'power-panels',
    indexed: true,
    heroImage: 'open-residential-electrical-breaker-panel.JPG',
    heroAlt: 'An open residential breaker panel with the deadfront removed',
    bodyImage: 'electrician-removing-breaker-panel-cover-screw.JPG',
    bodyAlt: 'Removing a panel cover screw to fit a surge protective device',
    lead:
      'The Front Range gets grid switching spikes and summer lightning, and modern homes are full of electronics and appliance control boards that do not survive them. A surge protective device wired at the panel clamps those spikes before they reach anything. It installs in about an hour, mounts to a double-pole breaker, and covers the whole house rather than one power strip at a time.',
    highlights: [
      { label: 'Install time', value: 'About an hour' },
      { label: 'Covers', value: 'Every circuit in the house' },
      { label: 'Best fitted', value: 'While the panel is already open' },
    ],
    priceRange: {
      low: 350,
      high: 650,
      drivers: 'the device rating in kA, panel space, and whether a two-stage setup is worthwhile',
      includes: 'a UL-1449 listed device, the breaker, installation, and a status check',
      needsApproval: true,
    },
    signs: [
      {
        h3: 'You have replaced an appliance control board',
        body: 'Garage-door, mini-split and oven boards fail from surge damage far more often than from age.',
      },
      {
        h3: 'Lights flicker or blink when the grid switches',
        body: 'You are seeing the small end of the same phenomenon that delivers the large spikes.',
      },
      {
        h3: 'A new panel with an open slot',
        body: 'The best and cheapest time to add one is while the panel is already open for other work.',
      },
      {
        h3: 'A home office, a media room, or a smart home',
        body: 'The replacement cost of what is plugged in is now well past the cost of protecting it.',
      },
    ],
    included: [
      'A check that the panel has space and that the grounding is sound',
      'A UL-1449 listed device on its own double-pole breaker',
      'Confirmation that the status indicator is live and protecting',
      'A note added to the panel schedule so the next electrician knows it is there',
      'Advice on point-of-use protection for the few things that need both layers',
    ],
    process: [
      'We check the panel for space and inspects the grounding, which the device depends on.',
      'We mount a UL-1449 listed device on a dedicated double-pole breaker.',
      'The indicator confirms it is live and protecting.',
      'We note it on the panel schedule so the next electrician knows it is there.',
    ],
    permits:
      'A panel-mounted device is typically installed under the same rules as adding a breaker. Some jurisdictions want it on a permit and the Town of Parker and Douglas County differ, so we confirm and handle it.',
    faqs: [
      {
        q: 'Does this replace my power strips?',
        a: 'It works with them. The panel device takes the large external spikes, and point-of-use protectors handle the small stuff generated inside the house. Two layers is the right setup for expensive electronics.',
      },
      {
        q: 'How long does a surge protector last?',
        a: 'The device sacrifices itself absorbing surges. A good one lasts years and has an indicator light, and when that goes out the module is replaced rather than the whole unit.',
      },
      {
        q: 'Will it stop a direct lightning strike?',
        a: 'No device stops a direct strike to the house. It handles the far more common nearby strikes and grid transients, which is what actually damages most equipment.',
      },
      {
        q: 'Can you add it without a new panel?',
        a: 'Yes, as long as there is space for a double-pole breaker and the grounding is sound. We check both before quoting.',
      },
    ],
    related: [
      'electrical-panel-services',
      'smoke-detectors',
      'home-electrical-safety-inspections',
    ],
  },
  {
    id: 'S14',
    slug: 'generator-installation',
    h1: 'Standby generator installation in Parker, CO',
    navLabel: 'Standby generators',
    blurb: 'Automatic standby power, sized to what you actually need to keep running.',
    title: 'Generator Installation in Parker, CO | Allsafe Electric',
    metaDescription:
      'Automatic standby generators sized, installed and wired to a transfer switch so your house rides through Front Range outages. Allsafe Electric, Parker CO.',
    primaryKeyword: 'standby generator installation parker co',
    secondaryKeywords: ['generac installer parker', 'whole house generator colorado cost'],
    group: 'power-panels',
    indexed: false,
    cityServiceSlug: 'generator-installation',
    heroImage: 'allsafe-electrician-beside-home-sauna.JPG',
    heroAlt: 'An Allsafe Electric electrician beside installed equipment at a Parker home',
    heroImageGap: true,
    imageBrief:
      'A standby generator on a concrete pad beside a suburban Colorado home, landscaping around it, autumn light, mountains faint on the horizon. 3:2. No brand marks.',
    lead:
      'Wind events, ice storms, and wildfire-season shutoffs put parts of Douglas County dark for hours to days. An automatic standby generator sits beside the house on a pad, runs on natural gas or propane, and starts itself within seconds of an outage through a transfer switch. We size it to what you actually need to keep on rather than selling you a unit that spends its life idling.',
    highlights: [
      { label: 'Starts within', value: 'Seconds of an outage' },
      { label: 'Fuel', value: 'Natural gas or propane' },
      { label: 'Sizing', value: 'From your real loads' },
    ],
    priceRange: {
      low: 6500,
      high: 18000,
      drivers:
        'generator kW, whole-house versus essential-circuits transfer switch, gas line and pad work, and distance from the meter',
      includes:
        'the generator, transfer switch, pad, electrical and gas connection, permit, inspection, and startup',
      needsApproval: true,
    },
    signs: [
      {
        h3: 'You are on a well or a septic pump',
        body: 'No power means no water and no drainage. Franktown, Elizabeth, Sedalia and rural Parker acreage feel outages very differently to a city lot.',
      },
      {
        h3: 'Someone depends on powered medical equipment',
        body: 'That moves a generator from a convenience to a necessity, and it changes how we size and site it.',
      },
      {
        h3: 'You lose the fridge, freezer, and sump every time',
        body: 'The cost of spoiled food and a wet basement adds up quickly against the cost of the install.',
      },
      {
        h3: 'You work from home',
        body: 'A multi-hour outage is a lost workday. A standby unit turns it into a non-event you barely notice.',
      },
    ],
    included: [
      'A load assessment covering what must stay on and what would be nice',
      'Whole-house or essential-circuits transfer switch, chosen with you',
      'The pad set, and siting that meets clearances, noise, and HOA rules',
      'Electrical and gas permits filed, and both inspections attended',
      'Commissioning and a load test before we hand it over',
      'A walkthrough of the weekly self-exercise cycle and what to expect',
    ],
    process: [
      'We do a load assessment covering what must stay on, what would be nice, and what that means in kW.',
      'We choose whole-house or essential circuits, site the pad for clearances and noise, and confirm the gas supply.',
      'We pull the electrical and gas permits, set the pad, and wire the transfer switch at the panel.',
      'The jurisdiction inspects, we commission and test it under load, and show you how it exercises itself weekly.',
    ],
    permits:
      'Standby generators need an electrical permit and usually a mechanical or gas permit, plus inspection. Some HOAs in Pradera, Castle Pines and Castle Rock have placement and screening rules. We handle the jurisdiction, and our Douglas County HOA guide covers the association side.',
    faqs: [
      {
        q: 'What size generator do I need?',
        a: 'It depends on whether you want the whole house or just essentials such as the furnace, fridge, well, sump, and some lights and outlets. We run the numbers on your actual loads rather than quoting a default 22kW.',
      },
      {
        q: 'Natural gas or propane?',
        a: 'If you have natural gas at the house that is usually simplest, with no tank and no refills. Propane makes sense on acreage without gas service. We confirm the meter or tank can supply the demand.',
      },
      {
        q: 'How much does a whole-house generator cost in Colorado?',
        a: 'Installed, most residential projects land in the range above. The spread is real, because a small essential-circuits system and a large whole-house unit with a long gas run are very different jobs.',
      },
      {
        q: 'How loud is it, and how close to the house can it go?',
        a: 'Modern units are about as loud as an AC condenser. Placement has to meet clearance from windows, doors, and the meter, plus any HOA rules, and we site it to satisfy all three.',
      },
    ],
    related: [
      'electrical-panel-services',
      'whole-home-surge-protection',
      'home-electrical-safety-inspections',
    ],
  },
  {
    id: 'S8',
    slug: 'residential-ev-charging',
    h1: 'EV charger installation in Parker, CO',
    navLabel: 'EV chargers',
    blurb: 'Level 2 home charging, with a proper load calculation done first.',
    title: 'EV Charger Installation in Parker, CO | Allsafe Electric',
    metaDescription:
      'Level 2 home EV charger installation with a proper NEC load calculation first. Tesla and universal chargers wired to code across Parker and Douglas County.',
    primaryKeyword: 'ev charger installation parker co',
    secondaryKeywords: [
      'level 2 charger installation parker',
      'tesla wall connector installer parker',
      'home ev charger cost colorado',
    ],
    group: 'power-panels',
    indexed: true,
    cityServiceSlug: 'ev-charger-installation',
    heroImage: 'electrical-panel-main-breaker-inspection.JPG',
    heroAlt: 'Checking main breaker capacity before adding a 240-volt EV charger circuit',
    heroImageGap: true,
    imageBrief:
      'A wall-mounted Level 2 EV charger on a clean garage wall with the cable coiled, an SUV parked beside it, natural daylight from an open garage door. 3:2. No visible brand marks.',
    bodyImage: 'electrician-tightening-connections-in-breaker-panel.JPG',
    bodyAlt: 'Landing a new 240-volt circuit on a double-pole breaker in the panel',
    lead:
      'A Level 2 charger adds 20 to 40 miles of range per hour, against 3 to 5 on a standard outlet. The job is a 240-volt circuit from the panel to where you park, plus the charger itself. Most Douglas County homes can take one on the existing service, and some need a panel upgrade or a load-management device first. We do the load calculation before you buy anything, so you know which situation you are in.',
    highlights: [
      { label: 'Charging speed', value: '20 to 40 miles per hour' },
      { label: 'Load calc', value: 'Done before you buy' },
      { label: 'Fits', value: 'Tesla and universal units' },
    ],
    priceRange: {
      low: 650,
      high: 2200,
      drivers:
        'distance from the panel, whether the service has spare capacity, and hardwired versus plug-in',
      includes:
        'the 240V circuit, breaker, charger mounting and connection, and testing at full current',
      needsApproval: true,
    },
    signs: [
      {
        h3: 'You just ordered an EV, or you are close',
        body: 'Get the load calculation done now. If a panel upgrade is needed, that is the long-lead item and it is better known early.',
      },
      {
        h3: 'You are trickle-charging on a garage outlet',
        body: 'It works, barely. A Level 2 circuit turns overnight charging from "maybe enough" into "always full".',
      },
      {
        h3: 'Two EVs on one 100-amp service',
        body: 'Usually needs either a service upgrade or a load-sharing setup. Both are straightforward once they are planned properly.',
      },
      {
        h3: 'You want the charger away from the panel',
        body: 'Distance and conditions change the wire size and the price, so it is worth planning before the drywall or the concrete goes in.',
      },
    ],
    included: [
      'A full NEC load calculation on your panel and service',
      'The 240-volt circuit, correctly sized for the run length',
      'The breaker, conduit, and mounting hardware',
      'Hardwired or a NEMA 14-50 receptacle, whichever suits you',
      'App setup and amperage limits configured for your vehicle',
      'A test at full rated current with the car actually charging',
    ],
    process: [
      'We run an NEC load calculation on your panel and service to confirm capacity.',
      'We plan the route, the breaker size, and whether hardwired or a NEMA 14-50 outlet suits you better.',
      'We install the circuit and the charger, and configure any app or amperage limit.',
      'We test at full rated current and confirm the vehicle charges at the expected rate.',
    ],
    permits:
      'EV charger circuits are permitted and inspected in the Town of Parker, Douglas County, and surrounding cities. We pull the permit and meet the inspector. CORE Electric Cooperative and Xcel have both run EV rebate and time-of-use programs, so check current offers on the utility\'s own page before assuming an amount.',
    faqs: [
      {
        q: 'How much does it cost to install an EV charger at home?',
        a: 'Most installs land in the range above. A charger on a wall near the panel sits at the low end, and a long run to a detached garage, or a panel upgrade first, moves it up.',
      },
      {
        q: 'Do I need a permit for an EV charger in Parker?',
        a: 'Yes. A new 240-volt circuit is permitted and inspected, and we handle that as part of the job.',
      },
      {
        q: 'Can my panel handle a charger?',
        a: 'Often yes. We do a proper load calculation rather than guessing, and if it is close, a load-management device can avoid a full panel upgrade.',
      },
      {
        q: 'Hardwired or plug-in?',
        a: 'Hardwired is cleaner and is required above 48 amps. A plug-in on a NEMA 14-50 lets you take the charger with you or swap it easily. We fit either.',
      },
      {
        q: 'Tesla or a universal charger?',
        a: 'Both are fine work for us. Universal J1772 or NACS chargers keep your options open across brands, and a Tesla Wall Connector is the tidiest option if you are staying with Tesla.',
      },
    ],
    related: ['electrical-panel-services', 'home-automation', 'hot-tub-electrical-hookup'],
  },
  {
    id: 'S16',
    slug: 'hot-tub-electrical-hookup',
    h1: 'Hot tub and spa electrical hookup in Parker',
    navLabel: 'Hot tub hookup',
    blurb: 'A code-correct 240V GFCI circuit and disconnect, ready for delivery day.',
    title: 'Hot Tub Electrical Hookup in Parker | Allsafe Electric',
    metaDescription:
      'A code-correct 240-volt GFCI circuit and disconnect for your hot tub or swim spa, wired and signed off by the inspector. Allsafe Electric, Parker CO.',
    primaryKeyword: 'hot tub electrical hookup parker',
    secondaryKeywords: ['spa wiring parker co', 'hot tub 220v installation colorado'],
    group: 'power-panels',
    indexed: false,
    heroImage: 'electrician-working-on-outdoor-stone-wall-outlet.JPG',
    heroAlt: 'Wiring an exterior weatherproof box on a stone wall',
    heroImageGap: true,
    imageBrief:
      'An outdoor GFCI disconnect box mounted on a fence near a covered hot tub on a backyard deck, evening light, suburban Colorado home. 3:2.',
    bodyImage: 'electrician-installing-weatherproof-duplex-outlets.JPG',
    bodyAlt: 'Installing weatherproof duplex outlets on an exterior wall',
    lead:
      'A hot tub needs its own 240-volt circuit, GFCI protection, and a disconnect within sight of the tub but at least five feet away. That is code, and the inspector checks it. We run the circuit from the panel, set the disconnect, and coordinate with your delivery so the tub is ready to fill the day it lands rather than sitting dry for a week.',
    highlights: [
      { label: 'Disconnect', value: 'In sight, 5ft minimum' },
      { label: 'Protection', value: 'GFCI, as code requires' },
      { label: 'Timed to', value: 'Your delivery date' },
    ],
    priceRange: {
      low: 750,
      high: 1900,
      drivers:
        'distance from the panel, trenching versus surface conduit, panel capacity, and the amperage the tub draws',
      includes: 'the GFCI circuit, the exterior disconnect, bonding, the permit, and inspection',
      needsApproval: true,
    },
    signs: [
      {
        h3: 'A hot tub is on order or being delivered',
        body: 'Get the electrical planned before delivery day so the tub is not sitting dry in the driveway.',
      },
      {
        h3: 'An old spa on a non-GFCI or undersized circuit',
        body: 'Older installs often predate current GFCI rules. Around water, that is a genuine shock hazard rather than a paperwork problem.',
      },
      {
        h3: 'The panel is on the far side of the house',
        body: 'A long run changes the wire size and the price, so it is worth knowing early.',
      },
      {
        h3: 'You are pouring a patio or building a deck',
        body: 'Run the conduit before the concrete and the decking go down, and it costs a fraction of retrofitting.',
      },
    ],
    included: [
      'Confirming the tub spec and that the panel has capacity',
      'A dedicated 240-volt GFCI-protected circuit',
      'The exterior disconnect, sited for the five-foot and line-of-sight rules',
      'Equipotential bonding as required',
      'Buried conduit at the correct depth, or tidy surface conduit',
      'The permit filed and the inspection attended',
    ],
    process: [
      'We confirm the tub\'s electrical spec and checks the panel has capacity.',
      'We plan the route, buried or surface, and the disconnect location for the five-foot rule and line of sight.',
      'We install the GFCI-protected circuit, the disconnect, and the equipotential bonding.',
      'The jurisdiction inspects, and you fill the tub.',
    ],
    permits:
      'Spa and hot tub circuits are permitted and inspected everywhere in the area. The GFCI, the disconnect location, and the bonding are all checked. We handle the permit with the Town of Parker or Douglas County.',
    faqs: [
      {
        q: 'Does a hot tub need its own circuit?',
        a: 'Yes. A dedicated 240-volt GFCI-protected circuit sized to the tub. It cannot share with anything else.',
      },
      {
        q: 'Why must the disconnect be so far from the tub?',
        a: 'Code requires it within sight for a fast shutoff, but at least five feet away or behind a barrier, so nobody can reach it from the water.',
      },
      {
        q: 'Can you bury the wire?',
        a: 'Yes, in conduit at the required depth. We can also run surface conduit along a fence or wall where trenching is not practical.',
      },
      {
        q: 'How long does the hookup take?',
        a: 'Most are a single day once the permit is in hand. A long buried run adds time for trenching.',
      },
    ],
    related: ['residential-ev-charging', 'electrical-panel-services', 'outdoor-lighting'],
  },

  // ─── Lighting & comfort ──────────────────────────────────────────────────
  {
    id: 'S6',
    slug: 'lighting-services',
    h1: 'Indoor lighting installation in Parker',
    navLabel: 'Indoor lighting',
    blurb: 'Recessed cans, under-cabinet LED, and fixture swaps inside your home.',
    title: 'Indoor Lighting Installation in Parker, CO | Allsafe',
    metaDescription:
      'Recessed cans, under-cabinet LED, fixture and chandelier swaps, and dimmers matched to the bulbs, installed cleanly inside your Parker home.',
    primaryKeyword: 'indoor lighting installation parker',
    secondaryKeywords: [
      'recessed lighting installation parker',
      'under cabinet lighting parker',
      'chandelier installation parker',
    ],
    group: 'lighting-comfort',
    indexed: true,
    heroImage: 'illuminated-ornate-crystal-chandelier.JPG',
    heroAlt: 'An ornate crystal chandelier lit in a residential entryway',
    bodyImage: 'electrician-installing-glass-shade-on-chandelier.JPG',
    bodyAlt: 'Fitting a glass shade onto a newly hung chandelier',
    lead:
      'This page is indoor lighting: recessed cans, under-cabinet strips, fixture and chandelier swaps, closet and pantry lights, and dimmers matched to the bulbs. For landscape, path, security and holiday lighting, see our outdoor lighting page. Most indoor lighting projects are a half to a full day, with minimal drywall work and every fixture on a dimmer if you want it.',
    highlights: [
      { label: 'Most projects', value: 'Half a day to a day' },
      { label: 'Dimming', value: 'Matched to your bulbs' },
      { label: 'Ceilings', value: 'Vaulted and two-storey handled' },
    ],
    priceRange: {
      low: 150,
      high: 2800,
      drivers:
        'a single fixture swap versus a room of new recessed cans, ceiling height and access, and whether a circuit or switch is added',
      includes: 'fixtures where we supply them, dimmers, patch coordination, and testing',
      needsApproval: true,
    },
    signs: [
      {
        h3: 'A room lit by one ceiling fixture and some lamps',
        body: 'Recessed lighting on a dimmer makes it usable, and it is a clean retrofit in most Douglas County homes.',
      },
      {
        h3: 'Dark kitchen counters',
        body: 'Under-cabinet LED is a small job with a big daily payoff, and hard-wired looks far better than stick-on strips.',
      },
      {
        h3: 'A chandelier or heavy fixture to hang',
        body: 'Anything over 35 pounds, or on a high or sloped ceiling, needs a rated box and often a lift. We come equipped for both.',
      },
      {
        h3: 'Yellowing, buzzing, or dated fixtures',
        body: 'Swapping a floor of fixtures to a consistent style is one of the highest-impact updates in a house.',
      },
    ],
    included: [
      'A layout walked through with you before anything is drilled',
      'Color temperature and dimming chosen to suit the room',
      'Cans placed around joists, HVAC, and existing framing',
      'Compatible dimmers so nothing hums or flickers',
      'Tidy cuts, with any patch pointed out before we make it',
      'Every fixture aimed, tested, and the site cleaned up',
    ],
    process: [
      'We walk the rooms and talk through layout, color temperature, and dimming.',
      'We confirm the circuits and switch locations, and where cans can go around joists and HVAC.',
      'We install, keeping cuts tidy, and set every fixture on a compatible dimmer.',
      'We aim, test, and clean up.',
    ],
    permits:
      'Fixture replacement is maintenance. New recessed lighting, new circuits, or added switches are permitted work in the Town of Parker and Douglas County, and we handle it where it applies.',
    faqs: [
      {
        q: 'How many recessed lights does a room need?',
        a: 'As a rule of thumb, one every 4 to 6 feet in a grid, adjusted for the furniture and the ceiling height. We lay it out with you before drilling anything.',
      },
      {
        q: 'Can you add recessed lighting without wrecking the ceiling?',
        a: 'In most cases, yes. From an attic above it is straightforward, and on a lower floor we fish the wiring with small, patchable access points and tell you first.',
      },
      {
        q: 'Why do my LED lights flicker on the dimmer?',
        a: 'The dimmer is not rated for the LED load. We swap it for a compatible one, and it is almost never the bulbs at fault.',
      },
      {
        q: 'Do you hang customer-supplied chandeliers?',
        a: 'Yes. If you bought the fixture we will install it, check that the box is rated for the weight, and add a support if it is not.',
      },
    ],
    related: ['outdoor-lighting', 'ceiling-fan-installation', 'electrical-switch-services'],
  },
  {
    id: 'S7',
    slug: 'outdoor-lighting',
    h1: 'Outdoor and landscape lighting in Parker',
    navLabel: 'Outdoor lighting',
    blurb: 'Landscape, path, security and holiday circuits built for Colorado weather.',
    title: 'Outdoor & Landscape Lighting in Parker, CO | Allsafe',
    metaDescription:
      'Landscape, path, security and soffit lighting, plus weatherproof outlets and holiday-light circuits, built for Colorado weather. Allsafe Electric, Parker CO.',
    primaryKeyword: 'outdoor lighting parker co',
    secondaryKeywords: [
      'landscape lighting parker',
      'security light installation parker',
      'holiday light installation parker',
    ],
    group: 'lighting-comfort',
    indexed: true,
    heroImage: 'allsafe-electrician-installing-outdoor-weatherproof-outlet.JPG',
    heroAlt: 'Installing a weatherproof exterior outlet on a Parker home',
    heroImageGap: true,
    imageBrief:
      'A suburban Colorado home exterior at blue hour with warm low-voltage path lighting along a walkway and soft uplighting on a tree, mature landscaping. 16:9.',
    bodyImage: 'electrician-installing-outdoor-outlet-cover.JPG',
    bodyAlt: 'Fitting an in-use weatherproof cover over an exterior outlet',
    lead:
      'This page is exterior only: landscape and path lighting, security and motion floods, soffit and facade lighting, pool and patio, and dedicated holiday-light circuits with a switch inside. For interior lighting, see our indoor lighting page. Colorado weather is hard on outdoor wiring, so everything goes in with proper wet-rated fittings and GFCI protection.',
    highlights: [
      { label: 'Low voltage', value: 'No trenching for the wire' },
      { label: 'Holiday circuits', value: 'Switched from inside' },
      { label: 'Fittings', value: 'Wet-rated and gasketed' },
    ],
    priceRange: {
      low: 250,
      high: 4500,
      drivers: 'low-voltage versus line-voltage, transformer sizing, run lengths, and trenching',
      includes:
        'wet-rated fixtures where we supply them, the transformer, a timer or photocell, and GFCI protection',
      needsApproval: true,
    },
    signs: [
      {
        h3: 'A dark walkway, driveway, or set of steps',
        body: 'Path and step lighting is the highest-value outdoor lighting for safety, and low-voltage runs do not need trenching for power.',
      },
      {
        h3: 'Holiday lights run through a cracked window',
        body: 'A switched, weatherproof exterior circuit with a timer solves that permanently, and it is a quick autumn job.',
      },
      {
        h3: 'Motion floods that never worked properly',
        body: 'Re-aimed, re-wired, or replaced with something that covers the right area without lighting up a bedroom.',
      },
      {
        h3: 'A new patio, deck, or pergola',
        body: 'Get the conduit and boxes in before the finishes go on and the cost drops sharply.',
      },
    ],
    included: [
      'A dusk walk of the property where we can, because that is when lighting is planned properly',
      'Transformer sized correctly for the run, with headroom to add later',
      'Wet-rated fixtures and gasketed connections throughout',
      'GFCI protection on every exterior circuit',
      'A timer or photocell set to your schedule',
      'Every fixture aimed after dark, not guessed at in daylight',
    ],
    process: [
      'We walk the property at dusk where we can, because that is the only way to plan lighting properly.',
      'We size the transformer and plans runs, keeping low-voltage where possible to avoid trenching.',
      'We install wet-rated fixtures, a timer or photocell, and GFCI protection on every exterior circuit.',
      'We aim each fixture after dark and set the schedule.',
    ],
    permits:
      'Low-voltage landscape lighting off an existing exterior outlet is generally not permitted. New exterior circuits, line-voltage fixtures, and added outlets are permitted in the Town of Parker and Douglas County. HOA design review applies in Stonegate, Pradera, The Pinery and Canterberry Crossing, and our HOA guide covers that.',
    faqs: [
      {
        q: 'Low-voltage or line-voltage landscape lighting?',
        a: 'Low-voltage at 12V is the standard for path and accent lighting, because it is safer, easier to adjust, and needs no trenching for the wire. Line-voltage makes sense for bright security floods and long runs.',
      },
      {
        q: 'Can you put my holiday lights on a switch?',
        a: 'Yes. A dedicated weatherproof soffit or eave outlet on an inside switch, usually with a timer, is a popular late-autumn job. Book it early.',
      },
      {
        q: 'Will the wiring survive Colorado winters?',
        a: 'When it is installed right, with wet-rated fixtures, gasketed connections, GFCI protection, and proper burial depth for line-voltage runs. That is the whole job.',
      },
      {
        q: 'Do you work with a landscape designer\'s plan?',
        a: 'Happily. Give us the plan and we will handle the transformer sizing, the runs, and the controls.',
      },
    ],
    related: ['lighting-services', 'residential-ev-charging', 'hot-tub-electrical-hookup'],
  },
  {
    id: 'S9',
    slug: 'ceiling-fan-installation',
    h1: 'Ceiling fan installation in Parker',
    navLabel: 'Ceiling fans',
    blurb: 'Fan-rated boxes, balanced blades, and vaulted ceilings included.',
    title: 'Ceiling Fan Installation in Parker, CO | Allsafe Electric',
    metaDescription:
      'New ceiling fans and replacements on proper fan-rated boxes, including vaulted and two-story ceilings. Wobble-free and quiet. Allsafe Electric, Parker CO.',
    primaryKeyword: 'ceiling fan installation parker',
    secondaryKeywords: ['ceiling fan replacement parker co'],
    group: 'lighting-comfort',
    indexed: true,
    heroImage: 'modern-three-blade-ceiling-fan-with-light.JPG',
    heroAlt: 'A modern three-blade ceiling fan with an integrated light',
    bodyImage: 'large-windmill-ceiling-fan-in-living-room.JPG',
    bodyAlt: 'A large windmill-style ceiling fan in a vaulted living room',
    lead:
      'A ceiling fan has to hang from a fan-rated box, not the light box that is usually already there. That is the part DIY installs get wrong, and it is why fans wobble, drop, or crack the ceiling. We fit a rated box, even on a vaulted or two-storey ceiling, balance the fan, and put it on the control you want, whether that is a wall switch, a remote, or a smart switch.',
    highlights: [
      { label: 'Fan-rated box', value: 'Fitted as standard' },
      { label: 'High ceilings', value: 'Lift and down-rod included' },
      { label: 'Result', value: 'Balanced and quiet' },
    ],
    priceRange: {
      low: 165,
      high: 425,
      unit: 'per fan',
      drivers:
        'replacing versus a new location, ceiling height and slope, and whether a rated box or new wiring is needed',
      includes: 'a fan-rated box, mounting, balancing, and control setup',
      needsApproval: true,
    },
    signs: [
      {
        h3: 'A fan that wobbles or has dropped slightly',
        body: 'The box is not fan-rated or the mount has loosened. This is a safety fix rather than a cosmetic one.',
      },
      {
        h3: 'You want a fan where there is only a light',
        body: 'We can add the rated box and, if needed, the wiring and the switch to control it separately.',
      },
      {
        h3: 'A high or sloped ceiling',
        body: 'Needs a proper down-rod, an angled mount, and a lift. We are set up for two-storey great rooms.',
      },
      {
        h3: 'A fan that hums or a light that flickers',
        body: 'Usually the wrong control, a failing capacitor, or a loose connection at the canopy.',
      },
    ],
    included: [
      'A listed fan-rated box, almost always replacing what is there',
      'The correct down-rod length for your ceiling height and slope',
      'Blade balancing so it runs quiet at every speed',
      'The control you want, whether wall switch, remote, or smart switch',
      'A test on every speed, the light, and the reverse function',
      'Packaging and the old fixture taken away',
    ],
    process: [
      'We confirm the box, and almost always replace it with a fan-rated one.',
      'For a new location, we run the wiring and set the switch.',
      'We assemble, hang, and balance the fan, and set the down-rod for the ceiling height.',
      'We test every speed, the light, and the control.',
    ],
    permits:
      'Replacing a fan is maintenance. Adding a fan where there is no existing box, with new wiring and a switch, can be permitted work, and we confirm with the Town of Parker or Douglas County.',
    faqs: [
      {
        q: 'Why can I not hang a fan from the existing light box?',
        a: 'A standard box is not built for the moving load of a fan and can work loose or pull out. Code requires a listed fan-rated box, which we install.',
      },
      {
        q: 'Can you install a fan on my vaulted ceiling?',
        a: 'Yes. It needs an extended down-rod and often an angled ceiling adapter, plus a lift to reach it safely. We come equipped for two-storey great rooms.',
      },
      {
        q: 'My new fan wobbles. Can you fix it?',
        a: 'Usually. It is typically the box, the mount, or blade balance, and occasionally a blade is warped and needs replacing.',
      },
      {
        q: 'Can the fan and light be on separate switches?',
        a: 'Yes, if there are enough wires in the box, or with a remote or smart control. We check what is there and give you the options.',
      },
    ],
    related: ['lighting-services', 'electrical-switch-services', 'home-automation'],
  },
  {
    id: 'S10',
    slug: 'home-automation',
    h1: 'Smart home and automation wiring in Parker',
    navLabel: 'Smart home',
    blurb: 'Smart switches, doorbells and thermostats, plus the wiring they actually need.',
    title: 'Smart Home Wiring in Parker, CO | Allsafe Electric',
    metaDescription:
      'Smart switches, video doorbells and thermostats, plus the neutrals, transformers and C-wires they need, installed and working before we leave. Parker, CO.',
    primaryKeyword: 'smart home electrician parker',
    secondaryKeywords: ['smart switch installation parker', 'home automation wiring colorado'],
    group: 'lighting-comfort',
    indexed: true,
    heroImage: 'allsafe-electrician-using-front-door-smart-doorbell.JPG',
    heroAlt: 'Testing a video doorbell at the front door of a Parker home',
    bodyImage: 'electrician-securing-residential-light-switch.JPG',
    bodyAlt: 'Securing a smart light switch into a wall box',
    lead:
      'The hard part of smart home devices is rarely the app. It is the wiring behind the wall. Smart switches need a neutral. Video doorbells need the right transformer. Smart thermostats often need a C-wire. We handle that side: the neutrals, the transformers, the wiring, and getting the device onto your network and working before we pack up.',
    highlights: [
      { label: 'We handle', value: 'Neutrals and C-wires' },
      { label: 'Doorbells', value: 'Transformer sized properly' },
      { label: 'Before we go', value: 'Everything demonstrated working' },
    ],
    priceRange: {
      low: 145,
      high: 1600,
      drivers:
        'device count, whether neutrals or a C-wire have to be added, and any hub or panel work',
      includes: 'installation, wiring changes, network setup for the device, and a working demo',
      needsApproval: true,
    },
    signs: [
      {
        h3: 'You bought smart switches and there is no neutral',
        body: 'Common in homes built before the mid-1980s. We can add the neutral, or fit switches that do not need one.',
      },
      {
        h3: 'A video doorbell that keeps going offline',
        body: 'Almost always an undersized doorbell transformer. A quick swap fixes it for good.',
      },
      {
        h3: 'A smart thermostat asking for a C-wire',
        body: 'We run the C-wire, or fit an adapter at the furnace board where running one is impractical.',
      },
      {
        h3: 'A drawer of half-configured devices',
        body: 'We would rather set it up once, properly, than have you fight an app on a Saturday.',
      },
    ],
    included: [
      'A check of every box and circuit against what each device actually needs',
      'Neutrals added, doorbell transformers upgraded, C-wires run',
      'Devices installed, joined to your Wi-Fi or hub, and sensibly named',
      'Scenes and groups set up the way you actually use the rooms',
      'A walkthrough with everything demonstrated working',
      'Old devices removed and packaging taken away',
    ],
    process: [
      'We go through the device list and check each box and circuit for what it needs.',
      'We add neutrals, upgrades the doorbell transformer, or runs a C-wire as required.',
      'We install the devices, join them to your Wi-Fi or hub, and label everything.',
      'We show you it working, every switch, scene, and camera.',
    ],
    permits:
      'Device swaps and low-voltage work are generally not permitted. Adding circuits, running neutrals on new wiring, or panel devices may be, and we confirm with the local jurisdiction.',
    faqs: [
      {
        q: 'Do all smart switches need a neutral wire?',
        a: 'Most do. Some newer models work without one but can cause flicker or a minimum-load issue with LED bulbs. We check your boxes and recommend accordingly.',
      },
      {
        q: 'Why does my video doorbell keep dropping offline?',
        a: 'Usually the existing doorbell transformer is 10VA and the camera needs 16 to 24VA. Replacing the transformer is a small job that solves it permanently.',
      },
      {
        q: 'Can you set up the whole system, not just wire it?',
        a: 'Yes. We get each device onto your network, into the app, and grouped the way you want it, and we do not leave until it works.',
      },
      {
        q: 'Which platforms do you work with?',
        a: 'The common ones, covering the major switch, doorbell, thermostat and hub brands. If you have a preference, tell us and we will confirm compatibility before anything is bought.',
      },
    ],
    related: ['electrical-switch-services', 'ceiling-fan-installation', 'residential-ev-charging'],
  },
];

export const serviceSlugs = services.map((s) => s.slug);
export const preservedServiceSlugs = services.filter((s) => s.indexed).map((s) => s.slug);
export const cityServiceServices = services.filter((s) => s.cityServiceSlug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceGroups: {
  id: ServiceGroup;
  label: string;
  blurb: string;
  accent: 'blue' | 'leaf' | 'teal';
}[] = [
  {
    id: 'repairs-safety',
    label: 'Repairs & safety',
    blurb: 'Something is wrong, or you want to know it is not.',
    accent: 'blue',
  },
  {
    id: 'power-panels',
    label: 'Power & panels',
    blurb: 'More capacity, and keeping it on when the grid is not.',
    accent: 'leaf',
  },
  {
    id: 'lighting-comfort',
    label: 'Lighting & comfort',
    blurb: 'The work you actually see and live with every day.',
    accent: 'teal',
  },
];
