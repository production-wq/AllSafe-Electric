/**
 * The 16 residential services. URLs are the contract — planning/docs/03 §3, §3.2.
 * 13 are PRESERVED (byte-identical to the current live site). 3 are NEW.
 *
 * Every `priceRange` carries `needsApproval: true` and renders as a visibly-marked
 * estimate until the owner signs off. The panel-upgrade figure is the one number the
 * planning docs themselves state (planning/docs/09 §4). All others are industry
 * ballparks pending approval — tracked in BUILD-NOTES.md and planning/docs/99.
 *
 * `heroImage` maps to a real photo from assets/source-photos where one exists.
 * Services with `heroImageGap: true` need a generated image (scripts/images-generate.ts)
 * or a real photo from the owner — the mapped file is an interim stand-in.
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
  title: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  group: ServiceGroup;
  indexed: boolean; // true = preserved URL, false = new page
  emergency?: boolean;
  /** slug used for /electricians/[city]-co/[cityServiceSlug]/ — only 6 services get variants */
  cityServiceSlug?: string;
  heroImage: string; // filename in assets/source-photos
  heroAlt: string;
  heroImageGap?: boolean;
  imageBrief?: string; // for scripts/images-generate.ts when heroImageGap
  lead: string;
  priceRange: {
    low: number;
    high: number;
    unit?: string;
    drivers: string;
    includes: string;
    needsApproval: boolean;
  };
  signs: { h3: string; body: string }[];
  process: string[];
  permits: string;
  faqs: Faq[];
  related: string[]; // slugs
}

const P = '(303) 648-1934';

export const services: Service[] = [
  // ─── Repairs & safety ────────────────────────────────────────────────────
  {
    id: 'S1',
    slug: 'emergency-electrical-repairs-parker-co',
    h1: 'Emergency electrician in Parker, CO',
    navLabel: 'Emergency repairs',
    title: 'Emergency Electrician in Parker, CO | Allsafe Electric',
    metaDescription:
      'Sparks, burning smell, or half the house dark? Call Allsafe Electric at (303) 648-1934. If it is daytime, Jud usually picks up on the first ring. Parker and Douglas County.',
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
    heroAlt:
      'Jud from Allsafe Electric checking voltage at an open breaker panel during a service call',
    lead:
      'If you smell burning, see sparks, or lost power to part of the house, stop and call. During business hours Jud usually answers on the first ring and can often be on site within two hours. A diagnostic visit is a flat fee that comes off the repair if you go ahead. After 6pm the same number reaches the emergency line.',
    priceRange: {
      low: 189,
      high: 450,
      drivers: 'time of day, what failed, and whether a part has to be sourced',
      includes: 'the diagnostic visit, a written cause, and a fixed price to repair before any work starts',
      needsApproval: true,
    },
    signs: [
      { h3: 'A burning or fishy smell near an outlet or panel', body: 'That smell is hot plastic. Turn the breaker off if you can reach it safely and call. This is not a wait-until-morning problem.' },
      { h3: 'Buzzing, crackling, or a warm breaker panel', body: 'A panel should be silent and cool. Noise or heat means a loose connection arcing behind the cover.' },
      { h3: 'Half the house has power and half does not', body: 'Usually a lost neutral or one leg of the incoming service. It can push 240 volts into 120-volt circuits and damage electronics, so kill the main if you know how.' },
      { h3: 'Scorch marks, a hot outlet, or a plug that fell out loose', body: 'Worn or overloaded outlets overheat. Stop using it and cover it.' },
      { h3: 'Water reached wiring, a panel, or outlets', body: 'After a burst pipe, ice dam, or roof leak, do not re-energise anything that got wet until it is checked.' },
    ],
    process: [
      'You call. We confirm the address and a two-hour arrival window, and tell you what to switch off in the meantime.',
      'Jud arrives, makes the area safe, and finds the actual cause — not just the symptom.',
      'You get a fixed price to repair before any work happens. The diagnostic fee comes off it.',
      'We fix what is dangerous now and flag anything that should be scheduled properly later.',
    ],
    permits: 'Most emergency repairs are like-for-like and do not need a permit. If the fix turns into a panel or service replacement, we pull the permit with the Town of Parker or Douglas County and handle the inspection. Verify current requirements with your jurisdiction before scheduling non-urgent follow-up work.',
    faqs: [
      { q: 'Are you actually available after hours?', a: `The same number, ${P}, reaches an after-hours emergency line on weekday evenings. Overnight and weekend calls are triaged — genuine safety emergencies get a callback, and everything else is booked for the next morning.` },
      { q: 'What does an emergency visit cost?', a: 'A flat diagnostic fee, higher in the evening than during the day, and it comes off the repair if you approve the work. You get the repair price in writing before anything starts.' },
      { q: 'Should I turn the power off myself?', a: 'If you can safely reach the breaker for the affected area, switch it off. If the panel is hot, buzzing, or you are not sure which breaker it is, leave it and call.' },
      { q: 'How fast can someone get here?', a: 'During business hours, often within two hours for Parker, Stonegate, The Pinery, Stroh Ranch and Canterberry Crossing. Castle Rock and Highlands Ranch add 15–20 minutes of drive time.' },
      { q: 'The power company says the outage is on my side. Now what?', a: 'That means the fault is past the meter — the panel, the main, or a circuit. That is exactly what we handle. Call and we will meet the timeline you are working against.' },
    ],
    related: ['electrical-panel-services', 'electrical-troubleshooting', 'electrical-outlet-services'],
  },
  {
    id: 'S15',
    slug: 'electrical-troubleshooting',
    h1: 'Electrical troubleshooting and diagnostics in Parker',
    navLabel: 'Troubleshooting',
    title: 'Electrical Troubleshooting in Parker, CO | Allsafe Electric',
    metaDescription:
      'Breaker keeps tripping? Lights flicker? Outlet dead but the breaker is fine? Jud finds the actual cause and fixes it. Flat diagnostic fee in Parker and Douglas County.',
    primaryKeyword: 'electrical troubleshooting parker',
    secondaryKeywords: [
      'breaker keeps tripping parker',
      'why do my lights flicker',
      'half my house has no power',
    ],
    group: 'repairs-safety',
    indexed: false,
    cityServiceSlug: undefined,
    heroImage: 'electrician-testing-kitchen-outlet-with-voltage-detector.JPG',
    heroAlt:
      'Jud from Allsafe Electric testing a kitchen outlet with a voltage detector to trace a dead circuit',
    lead:
      'A circuit that keeps tripping, lights that flicker, or an outlet that quit are all symptoms of something specific — a loose connection, an overloaded circuit, a failing breaker, or a fault in the wall. We charge a flat fee to find it, trace it to the real cause, and give you a fixed price to repair. Same-week appointments, usually within two hours during business hours if it is urgent.',
    priceRange: {
      low: 165,
      high: 385,
      drivers: 'how far the fault is buried and how many circuits are involved',
      includes: 'the diagnostic visit, a written explanation of the cause, and a fixed repair price',
      needsApproval: true,
    },
    signs: [
      { h3: 'A breaker that trips again the moment you reset it', body: 'That is a hard short or a ground fault on the circuit. It is not a bad breaker until proven otherwise, and forcing it back on is not safe.' },
      { h3: 'Lights that dim or flicker when the AC or microwave starts', body: 'Usually a loose neutral, an undersized circuit, or a connection failing at the panel. It gets worse, not better.' },
      { h3: 'An outlet is dead but nothing tripped', body: 'Often a failed backstab connection upstream or a tripped GFCI in another room. Easy to find, cheap to fix, and it will not fix itself.' },
      { h3: 'Switches or outlets that are warm, discoloured, or crackle', body: 'Heat means resistance, and resistance in a connection means it is on its way to arcing.' },
    ],
    process: [
      'You describe what is happening and when. Half the diagnosis is in the pattern.',
      'Jud isolates the circuit, tests under load, and traces the fault to a specific device, connection, or run.',
      'You get the cause in plain language and a fixed price to repair it.',
      'We fix it and re-test the whole circuit, not just the one point.',
    ],
    permits: 'Diagnostics and most repairs are maintenance work and do not require a permit. If tracing the fault reveals unsafe wiring that needs replacing at scale, that portion is permitted with the local authority. Confirm requirements with the Town of Parker or Douglas County.',
    faqs: [
      { q: 'Why not just replace the breaker?', a: 'A breaker that trips is usually doing its job — something on the circuit is faulting. Swapping the breaker without finding the fault removes the safety device and leaves the hazard.' },
      { q: 'Can you tell me the cost over the phone?', a: 'Not honestly. The diagnostic fee is flat and known up front; the repair price depends on what we find, and you get that in writing before we proceed.' },
      { q: 'My lights flicker all over the house, not one room. Is that dangerous?', a: 'Whole-house flicker points to the main service connection or the panel itself, which is the more serious category. Get it looked at soon rather than waiting.' },
      { q: 'Do you fix it the same visit?', a: 'Most of the time, yes. If a part has to be sourced we make the area safe, quote the return, and come back.' },
    ],
    related: ['electrical-panel-services', 'electrical-outlet-services', 'emergency-electrical-repairs-parker-co'],
  },
  {
    id: 'S3',
    slug: 'electrical-outlet-services',
    h1: 'Outlet repair and installation in Parker',
    navLabel: 'Outlets',
    title: 'Outlet Repair & Installation in Parker, CO | Allsafe Electric',
    metaDescription:
      'Dead outlets, loose plugs, and new outlets where you actually need them. GFCI and USB outlets, kitchen and garage circuits. Allsafe Electric, Parker and Douglas County.',
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
    heroAlt: 'Jud from Allsafe Electric fitting the cover plate on a new dual-USB wall outlet',
    lead:
      'A dead outlet is usually a fast, inexpensive fix once someone finds the failed connection. Adding outlets — for a kitchen island, a garage freezer, a home office, or a bedroom that has two and needs six — is a clean half-day job. We use spec-grade devices and back-wire them properly, not the push-in connectors that cause most of the dead outlets we get called about.',
    priceRange: {
      low: 145,
      high: 340,
      unit: 'per outlet',
      drivers: 'whether we are repairing, replacing, or running a new circuit, and how far from the panel',
      includes: 'a spec-grade device, a new cover plate, and testing on the whole circuit',
      needsApproval: true,
    },
    signs: [
      { h3: 'Plugs fall out or only work when wiggled', body: 'The contacts inside the outlet are worn. A worn outlet arcs and overheats — replace it, do not tape the plug in.' },
      { h3: 'No power and the breaker is not tripped', body: 'Usually a failed connection at another outlet on the same run. Quick to trace.' },
      { h3: 'No GFCI protection in the kitchen, bath, garage, or outdoors', body: 'Current code requires it in those areas. It is the cheapest life-safety upgrade in the house.' },
      { h3: 'Extension cords doing a permanent job', body: 'That is a sign the room is short on circuits, not just outlets. We can add a dedicated circuit instead.' },
    ],
    process: [
      'You call or book, and tell us which rooms and roughly how many.',
      'Jud confirms the circuit can take the load, or plans a new one.',
      'We install spec-grade, back-wired devices and tamper-resistant receptacles where kids are around.',
      'Every outlet on the affected circuit gets tested before we leave.',
    ],
    permits: 'Replacing outlets is maintenance and is not permitted. Adding a new circuit or a significant number of new outlets is permitted work in the Town of Parker and Douglas County; we pull it and meet the inspector. Verify current thresholds with your jurisdiction.',
    faqs: [
      { q: 'How much to replace one outlet?', a: 'A straightforward replacement is at the low end of the range above. It drops per-outlet when we do several in one visit.' },
      { q: 'Can you add an outlet without opening the wall?', a: 'Often, yes — we can fish a new outlet off a nearby box or circuit with minimal drywall work. We tell you before we start if a patch will be needed.' },
      { q: 'What is a GFCI and do I need one?', a: 'A GFCI shuts the outlet off in a fraction of a second if current leaks to ground — the scenario that causes electrocution. Code requires them in kitchens, bathrooms, garages, basements, and outdoors.' },
      { q: 'Why do my outlets keep going bad?', a: 'Almost always the original installer used push-in (backstab) connectors. They loosen over time. We wire to the screws, which do not.' },
    ],
    related: ['electrical-switch-services', 'electrical-troubleshooting', 'electrical-wiring-repairs-services'],
  },
  {
    id: 'S4',
    slug: 'electrical-switch-services',
    h1: 'Light switch repair and installation in Parker',
    navLabel: 'Switches & dimmers',
    title: 'Light Switch Repair & Installation in Parker | Allsafe Electric',
    metaDescription:
      'Switches that spark, three-way switches that fight each other, and dimmers that hum. Repaired or replaced properly by Allsafe Electric in Parker and Douglas County.',
    primaryKeyword: 'light switch replacement parker',
    secondaryKeywords: ['dimmer switch installation parker', 'three way switch repair parker'],
    group: 'repairs-safety',
    indexed: true,
    heroImage: 'electrician-installing-three-gang-light-switch-cover.JPG',
    heroAlt:
      'Jud from Allsafe Electric fitting a three-gang switch plate on a freshly installed set of light switches',
    lead:
      'A switch that sparks, gets warm, or has stopped working is a 20-minute fix in most rooms. So is replacing a wall of tired switches with matching decora devices, adding a dimmer, or sorting out a three-way pair that never worked right. Dimmers need to be matched to the bulbs or they hum and flicker — we bring the right one.',
    priceRange: {
      low: 135,
      high: 280,
      unit: 'per switch',
      drivers: 'single-pole vs three-way or smart, and the state of the existing wiring in the box',
      includes: 'the device, a new plate, and a function test',
      needsApproval: true,
    },
    signs: [
      { h3: 'A switch that sparks or feels warm', body: 'A small spark as contacts part can be normal; a visible arc, heat, or a scorch mark is not.' },
      { h3: 'A three-way pair where one switch cancels the other', body: 'Miswired travelers. Common in homes where someone replaced one of the pair without tracing it.' },
      { h3: 'A dimmer that hums, flickers, or only works over half its range', body: 'Wrong dimmer for the LED load. The fix is a compatible dimmer, not new bulbs.' },
      { h3: 'A switch that does nothing', body: 'Either the switch failed or the fixture did. Quick to isolate.' },
    ],
    process: [
      'Tell us which switches and what they do — or do not do.',
      'Jud checks the box for backstabbed or aluminium connections and corrects them.',
      'We install matched devices, and program smart switches to your network if you want them.',
      'Every switch and the fixtures it controls get tested.',
    ],
    permits: 'Switch replacement and repair is maintenance and is not permitted work. Confirm with your jurisdiction if the job expands into new circuits.',
    faqs: [
      { q: 'Can you make all my switches match?', a: 'Yes. Replacing mismatched toggles with a consistent decora set across a floor is one of the most common jobs we do and it makes a house feel finished.' },
      { q: 'Do smart switches need a neutral wire?', a: 'Most do. Many Parker homes built after the mid-1980s have a neutral in the switch box; older ones may not. Jud checks before recommending a specific switch.' },
      { q: 'Why does my dimmer buzz?', a: 'The dimmer and the bulbs are not compatible. LED dimming is picky. We carry dimmers rated for the common bulb types and swap to the right one.' },
      { q: 'One switch controls nothing. Can you remove it?', a: 'We can trace it first — sometimes it is a switched outlet or a disconnected fixture worth restoring — then either make it live or safely retire it.' },
    ],
    related: ['electrical-outlet-services', 'lighting-services', 'home-automation'],
  },
  {
    id: 'S5',
    slug: 'electrical-wiring-repairs-services',
    h1: 'Home wiring repair and rewiring in Parker',
    navLabel: 'Wiring & rewiring',
    title: 'Home Wiring Repair & Rewiring in Parker, CO | Allsafe Electric',
    metaDescription:
      'Aluminium branch wiring, backstabbed connections, additions, and full rewires. Allsafe Electric repairs and replaces residential wiring across Parker and Douglas County.',
    primaryKeyword: 'house rewiring parker co',
    secondaryKeywords: [
      'aluminum wiring replacement colorado',
      'knob and tube replacement parker',
      'wiring repair parker',
    ],
    group: 'repairs-safety',
    indexed: true,
    heroImage: 'electrician-repairing-light-fixture-wiring.JPG',
    heroAlt:
      'Jud from Allsafe Electric repairing the wiring connections behind a ceiling light fixture',
    lead:
      'Most homes here do not need a full rewire. They need specific problems fixed: aluminium branch circuits pigtailed correctly, a run that was damaged by a nail or a rodent, or new circuits for a finished basement. When a rewire genuinely is the right call — some 1970s Pinery and Ponderosa homes, older Castle Rock stock — we stage it room by room so you are never without power for long.',
    priceRange: {
      low: 350,
      high: 8000,
      drivers: 'a single repair vs remediating aluminium throughout vs a full rewire, and access above the ceilings',
      includes: 'copper materials, proper connectors, patching coordination, and permit and inspection where required',
      needsApproval: true,
    },
    signs: [
      { h3: 'Silver-coloured branch wiring and a house built 1965–1975', body: 'Aluminium branch wiring. It is not a teardown, but the connections need proper correction with rated connectors.' },
      { h3: 'Warm cover plates, flickering, or a faint plastic smell across several rooms', body: 'Connections failing at multiple points, often from age or the original wiring method.' },
      { h3: 'Cloth-covered or ungrounded two-prong wiring', body: 'Common in pre-1970 homes. Grounding and selective replacement bring it up to a safe standard.' },
      { h3: 'A renovation, addition, or finished basement', body: 'New square footage needs new circuits sized and run to current code.' },
    ],
    process: [
      'Jud inspects accessible wiring, the panel, and a sample of boxes, and tells you honestly whether this is a repair or a rewire.',
      'You get a written scope with a room-by-room sequence and a price.',
      'We pull the permit, do the work in stages, and keep the essential circuits live.',
      'The jurisdiction inspects, and we coordinate the drywall patching.',
    ],
    permits: 'Rewiring and new-circuit work is permitted and inspected by the Town of Parker, Douglas County, or the relevant city. We handle the application and meet the inspector. Fees and process differ by jurisdiction — see our permit guides and verify before scheduling.',
    faqs: [
      { q: 'Does my house need a full rewire?', a: 'Usually not. Most calls are resolved with targeted repairs and connection corrections. Jud will tell you if a rewire is genuinely warranted, and why.' },
      { q: 'Is aluminium wiring a dealbreaker on a house I am buying?', a: 'No. It is a known, correctable condition. Proper pigtailing with rated connectors, or a partial replacement, resolves it and satisfies most inspectors and insurers.' },
      { q: 'Will you tear up my walls?', a: 'We minimise it — fishing walls, using existing chases, and working from unfinished spaces. Where a patch is unavoidable we mark it and coordinate the repair.' },
      { q: 'How long does a rewire take?', a: 'A staged whole-home rewire is typically several days to two weeks depending on size and access. You keep power throughout.' },
    ],
    related: ['electrical-panel-services', 'home-electrical-safety-inspections', 'electrical-outlet-services'],
  },
  {
    id: 'S13',
    slug: 'home-electrical-safety-inspections',
    h1: 'Home electrical safety inspection in Parker',
    navLabel: 'Safety inspections',
    title: 'Home Electrical Safety Inspection in Parker | Allsafe Electric',
    metaDescription:
      'Buying a home, or in one over 20 years old? A licensed master electrician checks the panel, grounding, GFCI protection and wiring, and gives you a written report. Parker, CO.',
    primaryKeyword: 'electrical inspection parker co',
    secondaryKeywords: [
      'home electrical safety inspection colorado',
      'pre purchase electrical inspection parker',
    ],
    group: 'repairs-safety',
    indexed: true,
    cityServiceSlug: 'electrical-inspection',
    heroImage: 'electrician-pointing-to-circuit-breaker.JPG',
    heroAlt:
      'Jud from Allsafe Electric pointing out a breaker during a home electrical safety inspection',
    lead:
      'A home inspector spends about ten minutes on the electrical system. A licensed electrician spends an hour and actually opens the panel. You get a written report: what is safe, what needs attention now, and what to budget for — with photos and no pressure to buy anything. Worth doing before you buy, after a bad storm, or on any home over 20 years old.',
    priceRange: {
      low: 189,
      high: 375,
      drivers: 'home size, panel accessibility, and whether a report needs to be formatted for a lender or insurer',
      includes: 'a full walk of the system, panel inspection, GFCI/AFCI and grounding tests, and a written report with photos',
      needsApproval: true,
    },
    signs: [
      { h3: 'You are under contract on a home', body: 'The general inspection will not open the panel or identify a Federal Pacific or Zinsco box. This one does.' },
      { h3: 'The house is over 20 years old and has never been checked', body: 'Panels, breakers, and connections age. Most Highlands Ranch and Stonegate homes are now in that window.' },
      { h3: 'You are adding an EV charger, hot tub, or major appliance', body: 'Know whether the service can take it before you buy the equipment.' },
      { h3: 'After a lightning storm, a power surge, or water intrusion', body: 'Damage is often hidden until it is not.' },
    ],
    process: [
      'Jud walks the whole system: service entrance, meter, panel, grounding and bonding, a sample of outlets and switches, GFCI and AFCI protection, and visible wiring.',
      'Everything gets photographed and rated: safe, monitor, or address now.',
      'You get the written report the same day or the next morning.',
      'If you want the flagged items fixed, that is a separate quote — there is no obligation.',
    ],
    permits: 'An inspection itself needs no permit. Any corrective work that follows is permitted per the local jurisdiction. If you need a report in a specific format for a lender, insurer, or real-estate transaction, tell us when you book.',
    faqs: [
      { q: 'Is this the same as the home inspection?', a: 'No. A general home inspector does a visual, non-invasive check and explicitly does not open the panel or evaluate the system in depth. This is a licensed electrician doing exactly that.' },
      { q: 'Will you try to sell me repairs?', a: 'The report stands on its own. If you want us to fix what we found, we will quote it. If you want to take the report to someone else, that is fine too.' },
      { q: 'Can you check for Federal Pacific or Zinsco panels?', a: 'Yes, and it is one of the first things we look for in homes from the 1960s to early 1980s. Both brands have documented failure-to-trip problems.' },
      { q: 'How long does it take?', a: 'About an hour for a typical Douglas County home, longer for larger or older properties.' },
    ],
    related: ['electrical-panel-services', 'electrical-wiring-repairs-services', 'whole-home-surge-protection'],
  },
  {
    id: 'S12',
    slug: 'smoke-detectors',
    h1: 'Smoke and CO detector installation in Parker',
    navLabel: 'Smoke & CO detectors',
    title: 'Smoke & CO Detector Installation in Parker, CO | Allsafe Electric',
    metaDescription:
      'Hardwired smoke and carbon monoxide detectors installed, interconnected, and brought up to code. Ten-year sealed units available. Allsafe Electric, Parker and Douglas County.',
    primaryKeyword: 'smoke detector installation parker',
    secondaryKeywords: [
      'hardwired smoke detector replacement parker',
      'co detector installation colorado',
    ],
    group: 'repairs-safety',
    indexed: true,
    heroImage: 'allsafe-electrician-standing-in-modern-home.JPG',
    heroAlt: 'Jud from Allsafe Electric in the hallway of a modern Parker home',
    heroImageGap: true,
    imageBrief:
      'A hand mounting a white smoke detector to a hallway ceiling, viewed from below, warm daylight, suburban Colorado home. 4:3.',
    lead:
      'Hardwired detectors have a lifespan — about ten years — and then they start chirping, false-alarming, or missing real events. We replace them as an interconnected set so that when one senses smoke, every alarm in the house sounds. Colorado requires a CO alarm within 15 feet of every sleeping area, and we sort that out at the same time.',
    priceRange: {
      low: 65,
      high: 145,
      unit: 'per device installed',
      drivers: 'combo smoke/CO vs smoke-only, sealed 10-year vs replaceable battery, and ceiling height',
      includes: 'the device, interconnection to the existing set, and a full-system test',
      needsApproval: true,
    },
    signs: [
      { h3: 'Alarms chirping or false-alarming for no reason', body: 'Sensors drift as they age. Past about ten years the whole set is due.' },
      { h3: 'A date stamp on the back older than ten years', body: 'Every detector has a manufacture date printed on it. If you cannot find one, it is old enough to replace.' },
      { h3: 'No CO alarm near the bedrooms', body: 'Colorado law requires one within 15 feet of every sleeping area in homes with fuel appliances or an attached garage.' },
      { h3: 'Alarms that do not sound together', body: 'If setting off one does not trigger the others, the interconnection is broken or was never there.' },
    ],
    process: [
      'We count the existing detectors and check the date codes and interconnection.',
      'You choose combo or smoke-only, and sealed 10-year or replaceable-battery units.',
      'We replace the set, keep them interconnected, and add CO coverage where code requires it.',
      'We test every alarm and confirm they all sound together.',
    ],
    permits: 'Like-for-like detector replacement is maintenance. Adding detectors on new wiring, or interconnection where none existed, may be permitted depending on scope — confirm with the Town of Parker or Douglas County.',
    faqs: [
      { q: 'How often do hardwired smoke detectors need replacing?', a: 'About every ten years. The battery is a backup; the sensor itself wears out on that timeline regardless of battery changes.' },
      { q: 'Can I mix battery and hardwired detectors?', a: 'They should be one interconnected system. We can add battery-interconnect units where running a wire is impractical, so a fire in the basement still wakes the bedrooms.' },
      { q: 'Where does code require CO alarms in Colorado?', a: 'Within 15 feet of each room used for sleeping, in homes with fuel-burning appliances or an attached garage. We place them correctly as part of the job.' },
      { q: 'My alarm keeps chirping even with a new battery. Why?', a: 'End of life. Modern units chirp a distinct pattern when the sensor expires. Replacing the battery will not stop it.' },
    ],
    related: ['whole-home-surge-protection', 'home-electrical-safety-inspections', 'electrical-panel-services'],
  },

  // ─── Power & panels ──────────────────────────────────────────────────────
  {
    id: 'S2',
    slug: 'electrical-panel-services',
    h1: 'Electrical panel upgrades and repairs in Parker, CO',
    navLabel: 'Panel upgrades & repairs',
    title: 'Electrical Panel Upgrades & Repairs in Parker, CO | Allsafe',
    metaDescription:
      'Breaker tripping or fuse box still in service? Jud upgrades panels across Parker and Douglas County. Licensed master electrician, permits handled. Call (303) 648-1934.',
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
    heroImage: 'allsafe-electrician-testing-residential-breaker-panel.JPG',
    heroAlt:
      'Jud from Allsafe Electric testing circuits at a newly installed residential breaker panel',
    lead:
      'If your breakers trip when the microwave and the toaster run together, you still have a fuse box, or your panel is a Federal Pacific or Zinsco, an upgrade is the fix. Most panel upgrades in Parker run $2,200–$4,500. What moves the price: the amperage you need, where the meter sits, whether the mast has to be replaced, and what the inspector finds. Jud gives you the range on a first call and a fixed number after seeing it.',
    priceRange: {
      low: 2200,
      high: 4500,
      drivers: 'amperage, meter location, whether the service mast needs replacing, and inspection findings',
      includes:
        'the panel, breakers, labelling, grounding and bonding brought to current code, the permit, and the inspection',
      needsApproval: false, // this figure is stated in planning/docs/09 §4
    },
    signs: [
      { h3: 'Breakers that trip repeatedly', body: 'Not an inconvenience — a circuit or the panel is overloaded or failing. Resetting it over and over is not a fix.' },
      { h3: 'A fuse box instead of breakers', body: 'Fuses work, but they get bypassed with the wrong amperage and the panels are usually undersized for a modern house.' },
      { h3: 'Federal Pacific (Stab-Lok) or Zinsco labelling', body: 'Both have a documented history of breakers that fail to trip on a fault. Common in Colorado homes built 1960–1983.' },
      { h3: '100-amp service and a growing list of loads', body: 'A house with AC, an EV, a hot tub, and an electric range is asking more of a 100-amp service than it was built for.' },
      { h3: 'Rust, scorching, a burning smell, or a warm panel cover', body: 'Water intrusion or a connection arcing behind the deadfront. Have it looked at now.' },
    ],
    process: [
      'Jud confirms the amperage you need based on the actual loads, not a guess, and checks the meter, mast, and grounding.',
      'You get a fixed price and the permit is filed with the Town of Parker or Douglas County.',
      'On the day, the utility disconnects, the old panel comes out, the new one goes in with every circuit labelled, and power is usually back within the day.',
      'The jurisdiction inspects, and CORE or Xcel reconnects.',
    ],
    permits: 'A panel or service upgrade is always permitted and inspected. In Parker that is the Town of Parker Building Division; unincorporated areas go through Douglas County; Centennial has its own process. We file the application, schedule the utility disconnect and reconnect, and meet the inspector. See our Parker and Douglas County permit guides, and verify current fees before scheduling.',
    faqs: [
      { q: 'How long does a panel upgrade take?', a: 'Most are a single day. The power is off for part of it while the old panel comes out and the new one goes in. A service change that also needs a new mast or meter can run into a second day.' },
      { q: 'Will my power be off all day?', a: 'No. It is off for the window when the panel is physically swapped — usually a few hours. We schedule the utility disconnect and reconnect around that.' },
      { q: 'Do I need 200-amp service?', a: 'Many Douglas County homes do once you add an EV charger, hot tub, or electric heat. Some are fine at 150. Jud sizes it to your real loads and your plans, not a default.' },
      { q: 'Is a Federal Pacific panel actually dangerous?', a: 'The concern is well documented: a meaningful share of Stab-Lok breakers do not trip on an overload or fault in testing. Most electricians, and many insurers, recommend replacement.' },
      { q: 'Can you just add a subpanel instead?', a: 'Sometimes a subpanel is the right, cheaper answer — if the main service has capacity and you just need more circuit space. If the service itself is undersized, a subpanel does not solve it. We will tell you which situation you are in.' },
    ],
    related: ['whole-home-surge-protection', 'residential-ev-charging', 'home-electrical-safety-inspections'],
  },
  {
    id: 'S11',
    slug: 'whole-home-surge-protection',
    h1: 'Whole-home surge protection in Parker',
    navLabel: 'Surge protection',
    title: 'Whole-Home Surge Protection in Parker, CO | Allsafe Electric',
    metaDescription:
      'A panel-mounted surge protective device shields everything in the house from grid spikes and lightning. Installed in about an hour by Allsafe Electric in Parker and Douglas County.',
    primaryKeyword: 'whole home surge protector parker',
    secondaryKeywords: ['surge protection installation colorado'],
    group: 'power-panels',
    indexed: true,
    heroImage: 'allsafe-electrician-installing-breaker-panel-cover.JPG',
    heroAlt:
      'Jud from Allsafe Electric refitting a breaker panel cover after installing a surge protective device',
    lead:
      'The Front Range gets grid switching spikes and summer lightning, and modern homes are full of electronics and appliance control boards that do not survive them. A surge protective device wired at the panel clamps those spikes before they reach anything. It installs in about an hour, mounts to a double-pole breaker, and covers the whole house.',
    priceRange: {
      low: 350,
      high: 650,
      drivers: 'the device rating (kA), panel space, and whether a two-stage setup is worthwhile',
      includes: 'a UL-1449 listed device, the breaker, installation, and a status check',
      needsApproval: true,
    },
    signs: [
      { h3: 'You have replaced a garage-door board, a mini-split board, or an oven panel', body: 'Those failures are frequently surge damage, not age.' },
      { h3: 'Lights flicker or blink when the grid switches', body: 'You are seeing the small end of what also delivers the big spikes.' },
      { h3: 'A new panel with an open slot', body: 'The best and cheapest time to add one is when the panel is already open.' },
      { h3: 'A house full of smart devices, a home office, or a media room', body: 'The replacement cost of what is plugged in is now well past the cost of protecting it.' },
    ],
    process: [
      'Jud checks the panel for space and the grounding, which the device depends on.',
      'We mount a UL-1449 listed SPD on a dedicated double-pole breaker.',
      'The indicator confirms it is live and protecting.',
      'We note it on the panel schedule so the next electrician knows it is there.',
    ],
    permits: 'A panel-mounted SPD is typically installed under the same rules as adding a breaker. Some jurisdictions want it on a permit; the Town of Parker and Douglas County differ. We confirm and handle it.',
    faqs: [
      { q: 'Does this replace the power strips?', a: 'It works with them. The panel device takes the large external spikes; point-of-use protectors handle the small stuff generated inside the house. Two layers is the right setup for expensive electronics.' },
      { q: 'How long does a surge protector last?', a: 'The device sacrifices itself absorbing surges. A good one lasts years and has an indicator light; when it goes out, the module is replaced, not the whole unit.' },
      { q: 'Will it stop a direct lightning strike?', a: 'No device stops a direct strike to the house. It handles the far more common nearby strikes and grid transients, which is what actually damages most equipment.' },
      { q: 'Can you add it without a new panel?', a: 'Yes, as long as there is space for a double-pole breaker and the grounding is sound. Jud checks both first.' },
    ],
    related: ['electrical-panel-services', 'smoke-detectors', 'home-electrical-safety-inspections'],
  },
  {
    id: 'S14',
    slug: 'generator-installation',
    h1: 'Standby generator installation in Parker, CO',
    navLabel: 'Standby generators',
    title: 'Standby Generator Installation in Parker, CO | Allsafe Electric',
    metaDescription:
      'Automatic standby generators sized, installed, and wired to a transfer switch so the house rides through Front Range outages. Allsafe Electric, Parker and Douglas County.',
    primaryKeyword: 'standby generator installation parker co',
    secondaryKeywords: ['generac installer parker', 'whole house generator colorado cost'],
    group: 'power-panels',
    indexed: false,
    cityServiceSlug: 'generator-installation',
    heroImage: 'allsafe-electrician-beside-home-sauna.JPG',
    heroAlt: 'Jud from Allsafe Electric beside equipment at a Parker home',
    heroImageGap: true,
    imageBrief:
      'A standby generator on a concrete pad beside a suburban Colorado home, landscaping around it, autumn light, mountains faint on the horizon. 3:2. No brand marks.',
    lead:
      'Wind events, ice storms, and wildfire-season shutoffs put parts of Douglas County dark for hours to days. An automatic standby generator sits beside the house on a pad, runs on natural gas or propane, and starts itself within seconds of an outage through a transfer switch. We size it to what you actually need to keep on — not oversell you a unit that idles.',
    priceRange: {
      low: 6500,
      high: 18000,
      drivers: 'generator kW, whole-house vs essential-circuits transfer switch, gas line and pad work, and distance from the meter',
      includes: 'the generator, transfer switch, pad, electrical and gas connection, permit, inspection, and startup',
      needsApproval: true,
    },
    signs: [
      { h3: 'You are on a well or a septic pump', body: 'No power means no water and no drainage. Franktown, Elizabeth, Sedalia and rural Parker acreage feel outages differently than a city lot.' },
      { h3: 'Someone in the house depends on powered medical equipment', body: 'This moves a generator from convenience to necessity.' },
      { h3: 'You lose the fridge, freezer, and sump every time the wind blows', body: 'The cost of spoiled food and a wet basement adds up against the install.' },
      { h3: 'You work from home', body: 'A multi-hour outage is a lost workday. A standby unit makes it a non-event.' },
    ],
    process: [
      'Jud does a load assessment: what must stay on, what would be nice, and what that means in kW.',
      'We choose whole-house or essential-circuits, site the pad for clearances and noise, and confirm the gas supply.',
      'We pull the electrical and gas permits, set the pad, and wire the transfer switch at the panel.',
      'The jurisdiction inspects, we commission and test it under load, and show you how it exercises itself weekly.',
    ],
    permits: 'Standby generators need an electrical permit and usually a mechanical/gas permit, plus inspection. Some HOAs in Pradera, Castle Pines and Castle Rock have placement and screening rules. We handle the jurisdiction; see our Douglas County HOA guide for the association side.',
    faqs: [
      { q: 'What size generator do I need?', a: 'It depends on whether you want the whole house or just essentials — furnace, fridge, well, sump, some lights and outlets. Jud runs the numbers on your actual loads rather than quoting a default 22kW.' },
      { q: 'Natural gas or propane?', a: 'If you have natural gas at the house, that is usually simplest — no tank, no refills. Propane makes sense on acreage without gas service. We confirm the meter or tank can supply the demand.' },
      { q: 'How much does a whole-house generator cost in Colorado?', a: 'Installed, most residential projects land in the range above. The spread is real — a small essential-circuits system versus a large whole-house unit with a long gas run are very different jobs.' },
      { q: 'How loud is it, and how close to the house can it go?', a: 'Modern units are about as loud as an AC condenser. Placement has to meet clearance from windows, doors, and the meter, and any HOA rules. We site it to satisfy all three.' },
    ],
    related: ['electrical-panel-services', 'whole-home-surge-protection', 'home-electrical-safety-inspections'],
  },
  {
    id: 'S8',
    slug: 'residential-ev-charging',
    h1: 'EV charger installation in Parker, CO',
    navLabel: 'EV chargers',
    title: 'EV Charger Installation in Parker, CO | Allsafe Electric',
    metaDescription:
      'Level 2 home EV charger installation, panel checks, and load calculations. Tesla and universal chargers wired to code across Parker, Lone Tree and Douglas County.',
    primaryKeyword: 'ev charger installation parker co',
    secondaryKeywords: [
      'level 2 charger installation parker',
      'tesla wall connector installer parker',
      'home ev charger cost colorado',
    ],
    group: 'power-panels',
    indexed: true,
    cityServiceSlug: 'ev-charger-installation',
    heroImage: 'electrician-tightening-connections-in-breaker-panel.JPG',
    heroAlt:
      'Jud from Allsafe Electric torquing breaker connections while adding a circuit for an EV charger',
    heroImageGap: true,
    imageBrief:
      'A wall-mounted Level 2 EV charger on a clean garage wall with the cable coiled, an SUV parked beside it, natural daylight from an open garage door. 3:2. No visible brand marks.',
    lead:
      'A Level 2 charger adds 20–40 miles of range per hour, versus 3–5 on a standard outlet. The job is a 240-volt circuit from the panel to where you park, plus the charger. Most Douglas County homes can take one on the existing service; some need a panel upgrade or a load-management device first. Jud does the load calculation before you buy anything, so you know which situation you are in.',
    priceRange: {
      low: 650,
      high: 2200,
      drivers: 'distance from the panel, whether the service has spare capacity, and hardwired vs plug-in',
      includes: 'the 240V circuit, breaker, charger mounting and connection, and testing at full current',
      needsApproval: true,
    },
    signs: [
      { h3: 'You just ordered an EV, or you are close', body: 'Get the load calc done now — if a panel upgrade is needed, that is the long-lead item.' },
      { h3: 'You are trickle-charging on a garage outlet', body: 'It works, barely. A Level 2 circuit turns overnight charging from "maybe enough" into "always full."' },
      { h3: 'Two EVs on one 100-amp service', body: 'Usually needs either a service upgrade or a load-sharing setup. Both are straightforward once planned.' },
      { h3: 'You want the charger on the far side of the garage or outside', body: 'Distance and conditions change the circuit. Worth planning before the drywall or the concrete.' },
    ],
    process: [
      'Jud runs a NEC load calculation on your panel and service to confirm capacity.',
      'We plan the route, the breaker size, and hardwired vs a NEMA 14-50 outlet.',
      'We install the circuit and the charger, and configure any app or amperage limit.',
      'We test at full rated current and confirm the vehicle charges at the expected rate.',
    ],
    permits: 'EV charger circuits are permitted and inspected in the Town of Parker, Douglas County, and surrounding cities. We pull the permit and meet the inspector. CORE Electric Cooperative and Xcel have had EV rebate and time-of-use programs — check current offers on the utility\'s own page before assuming an amount.',
    faqs: [
      { q: 'How much does it cost to install an EV charger at home?', a: 'Most installs land in the range above. A charger on a wall near the panel is at the low end; a long run to a detached garage, or a panel upgrade first, moves it up.' },
      { q: 'Do I need a permit for an EV charger in Parker?', a: 'Yes. A new 240-volt circuit is permitted and inspected. We handle it as part of the job.' },
      { q: 'Can my panel handle a charger?', a: 'Often yes. Jud does a proper load calculation rather than guessing. If it is close, a load-management device can avoid a full panel upgrade.' },
      { q: 'Hardwired or plug-in?', a: 'Hardwired is cleaner and required above 48 amps. A plug-in on a NEMA 14-50 lets you take the charger with you or swap it easily. We fit either.' },
      { q: 'Tesla or a universal charger?', a: 'Both are fine work for us. Universal (J1772 / NACS) chargers keep your options open across brands; a Tesla Wall Connector is the tidiest option if you are staying with Tesla.' },
    ],
    related: ['electrical-panel-services', 'home-automation', 'hot-tub-electrical-hookup'],
  },
  {
    id: 'S16',
    slug: 'hot-tub-electrical-hookup',
    h1: 'Hot tub and spa electrical hookup in Parker',
    navLabel: 'Hot tub hookup',
    title: 'Hot Tub & Spa Electrical Hookup in Parker, CO | Allsafe Electric',
    metaDescription:
      'A 240-volt GFCI-protected circuit and disconnect for your hot tub or swim spa, wired to code and passed by the inspector. Allsafe Electric, Parker and Douglas County.',
    primaryKeyword: 'hot tub electrical hookup parker',
    secondaryKeywords: ['spa wiring parker co', 'hot tub 220v installation colorado'],
    group: 'power-panels',
    indexed: false,
    heroImage: 'electrician-working-on-outdoor-stone-wall-outlet.JPG',
    heroAlt: 'Jud from Allsafe Electric wiring an exterior GFCI box on a stone wall',
    heroImageGap: true,
    imageBrief:
      'An outdoor GFCI disconnect box mounted on a fence near a covered hot tub on a backyard deck, evening light, suburban Colorado home. 3:2.',
    lead:
      'A hot tub needs its own 240-volt circuit, GFCI protection, and a disconnect within sight of the tub but at least five feet away. That is code, and the inspector checks it. We run the circuit from the panel, set the disconnect, and coordinate with your delivery so the tub is ready to fill the day it lands.',
    priceRange: {
      low: 750,
      high: 1900,
      drivers: 'distance from the panel, trenching vs surface conduit, panel capacity, and the tub\'s amperage',
      includes: 'the GFCI circuit, the exterior disconnect, bonding, the permit, and inspection',
      needsApproval: true,
    },
    signs: [
      { h3: 'A hot tub is on order or being delivered', body: 'Get the electrical planned before delivery day so the tub is not sitting dry for a week.' },
      { h3: 'You have an old spa on a non-GFCI or undersized circuit', body: 'Older installs often predate current GFCI rules. It is a real shock hazard around water.' },
      { h3: 'The panel is on the opposite side of the house from the deck', body: 'A long run changes the wire size and the price. Worth knowing early.' },
      { h3: 'You are pouring a patio or building a deck', body: 'Run the conduit before the concrete and the decking go down.' },
    ],
    process: [
      'Jud confirms the tub\'s electrical spec and checks the panel has capacity.',
      'We plan the route — buried conduit or surface — and the disconnect location for the five-foot rule and line of sight.',
      'We install the GFCI-protected circuit, the disconnect, and the equipotential bonding.',
      'The jurisdiction inspects, and you fill the tub.',
    ],
    permits: 'Spa and hot tub circuits are permitted and inspected everywhere in the area — the GFCI, the disconnect location, and the bonding are all checked. We handle the permit with the Town of Parker or Douglas County.',
    faqs: [
      { q: 'Does a hot tub need its own circuit?', a: 'Yes. A dedicated 240-volt GFCI-protected circuit, sized to the tub. It cannot share with anything else.' },
      { q: 'Why does the disconnect have to be so far from the tub?', a: 'Code requires it within sight for a fast shutoff but at least five feet away (or behind a barrier) so nobody reaches it from the water.' },
      { q: 'Can you bury the wire?', a: 'Yes — in conduit at the required depth. We can also run surface conduit along a fence or wall if trenching is not practical.' },
      { q: 'How long does the hookup take?', a: 'Most are a single day once the permit is in hand. A long buried run adds time for trenching.' },
    ],
    related: ['residential-ev-charging', 'electrical-panel-services', 'outdoor-lighting'],
  },

  // ─── Lighting & comfort ──────────────────────────────────────────────────
  {
    id: 'S6',
    slug: 'lighting-services',
    h1: 'Indoor lighting installation in Parker',
    navLabel: 'Indoor lighting',
    title: 'Indoor Lighting Installation in Parker, CO | Allsafe Electric',
    metaDescription:
      'Recessed lighting, under-cabinet LED, fixture swaps, dimmers and chandeliers — installed cleanly inside your home. Allsafe Electric serves Parker and Douglas County.',
    primaryKeyword: 'indoor lighting installation parker',
    secondaryKeywords: [
      'recessed lighting installation parker',
      'under cabinet lighting parker',
      'chandelier installation parker',
    ],
    group: 'lighting-comfort',
    indexed: true,
    heroImage: 'allsafe-electrician-inspecting-kitchen-chandelier.JPG',
    heroAlt:
      'Jud from Allsafe Electric checking a pendant fixture over a kitchen island in a Parker home',
    lead:
      'This page is indoor lighting — recessed cans, under-cabinet strips, fixture and chandelier swaps, closet and pantry lights, and dimmers matched to the bulbs. For landscape, path, security and holiday lighting, see our outdoor lighting page. Most indoor lighting projects are a half to a full day, with minimal drywall work and every fixture on a dimmer if you want it.',
    priceRange: {
      low: 150,
      high: 2800,
      drivers: 'a single fixture swap vs a room of new recessed cans, ceiling height and access, and whether a circuit or switch is added',
      includes: 'fixtures where we supply them, dimmers, patch coordination, and testing',
      needsApproval: true,
    },
    signs: [
      { h3: 'A room that is lit by one ceiling fixture and some lamps', body: 'Recessed lighting on a dimmer makes it usable, and it is a clean retrofit in most Douglas County homes.' },
      { h3: 'Dark kitchen counters', body: 'Under-cabinet LED is a small job with a big daily payoff. Hard-wired looks far better than stick-on.' },
      { h3: 'A chandelier or heavy fixture to hang', body: 'Anything over 35 pounds, or on a high or sloped ceiling, needs a rated box and often a lift. We come equipped.' },
      { h3: 'Yellowing, buzzing, or dated fixtures', body: 'Swapping a floor of fixtures to a consistent style is one of the highest-impact updates in a house.' },
    ],
    process: [
      'We walk the rooms and talk through layout, colour temperature, and dimming.',
      'Jud confirms the circuits and switch locations, and where cans can go around joists and HVAC.',
      'We install, keeping cuts tidy, and set every fixture on a compatible dimmer.',
      'We aim, test, and clean up.',
    ],
    permits: 'Fixture replacement is maintenance. New recessed lighting, new circuits, or added switches are permitted work in the Town of Parker and Douglas County. We handle it where it applies.',
    faqs: [
      { q: 'How many recessed lights does a room need?', a: 'As a rule of thumb, one every 4 to 6 feet in a grid, adjusted for the furniture and the ceiling height. Jud lays it out with you before drilling anything.' },
      { q: 'Can you add recessed lighting without wrecking the ceiling?', a: 'In most cases, yes. From an attic above it is straightforward; on a lower floor we fish the wiring with small, patchable access points and tell you first.' },
      { q: 'Why do my LED lights flicker on the dimmer?', a: 'The dimmer is not rated for the LED load. We swap it for a compatible one — it is almost never the bulbs.' },
      { q: 'Do you hang customer-supplied chandeliers?', a: 'Yes. If you bought the fixture, we will install it, check that the box is rated for the weight, and add a support if it is not.' },
    ],
    related: ['outdoor-lighting', 'ceiling-fan-installation', 'electrical-switch-services'],
  },
  {
    id: 'S7',
    slug: 'outdoor-lighting',
    h1: 'Outdoor and landscape lighting in Parker',
    navLabel: 'Outdoor lighting',
    title: 'Outdoor & Landscape Lighting in Parker, CO | Allsafe Electric',
    metaDescription:
      'Landscape, path, security and soffit lighting, plus weatherproof exterior outlets and holiday-light circuits. Allsafe Electric, Parker, Castle Rock and Douglas County.',
    primaryKeyword: 'outdoor lighting parker co',
    secondaryKeywords: [
      'landscape lighting parker',
      'security light installation parker',
      'holiday light installation parker',
    ],
    group: 'lighting-comfort',
    indexed: true,
    heroImage: 'allsafe-electrician-installing-outdoor-weatherproof-outlet.JPG',
    heroAlt:
      'Jud from Allsafe Electric installing a weatherproof exterior outlet on a Parker home',
    heroImageGap: true,
    imageBrief:
      'A suburban Colorado home exterior at blue hour with warm low-voltage path lighting along a walkway and soft uplighting on a tree, mature landscaping. 16:9.',
    lead:
      'This page is exterior only — landscape and path lighting, security and motion floods, soffit and facade lighting, pool and patio, and dedicated holiday-light circuits with a switch inside. For interior lighting, see our indoor lighting page. Colorado weather is hard on outdoor wiring, so everything goes in with proper wet-rated fittings and GFCI protection.',
    priceRange: {
      low: 250,
      high: 4500,
      drivers: 'low-voltage vs line-voltage, transformer sizing, run lengths, and trenching',
      includes: 'wet-rated fixtures where we supply them, the transformer, a timer or photocell, and GFCI protection',
      needsApproval: true,
    },
    signs: [
      { h3: 'A dark walkway, driveway, or set of steps', body: 'Path and step lighting is the highest-value outdoor lighting for safety, and it is a low-voltage job that does not need trenching for power.' },
      { h3: 'You run holiday lights off a bathroom GFCI through a cracked window', body: 'A switched, weatherproof exterior circuit with a timer solves this permanently.' },
      { h3: 'Motion floods that never worked or point at the neighbour', body: 'Re-aimed, re-wired, or replaced with something that covers the right area without lighting up the bedroom.' },
      { h3: 'A new patio, deck, or pergola', body: 'Get the conduit and boxes in before the finishes.' },
    ],
    process: [
      'We walk the property at dusk if we can — it is the only way to plan lighting properly.',
      'Jud sizes the transformer and plans runs, keeping low-voltage where possible to avoid trenching.',
      'We install wet-rated fixtures, a timer or photocell, and GFCI protection on every exterior circuit.',
      'We aim each fixture after dark and set the schedule.',
    ],
    permits: 'Low-voltage landscape lighting off an existing exterior outlet is generally not permitted. New exterior circuits, line-voltage fixtures, and added outlets are permitted in the Town of Parker and Douglas County. HOA design review applies in Stonegate, Pradera, The Pinery and Canterberry Crossing — see our HOA guide.',
    faqs: [
      { q: 'Low-voltage or line-voltage landscape lighting?', a: 'Low-voltage (12V) is the standard for path and accent lighting — safer, easier to adjust, and no trenching for the wire. Line-voltage makes sense for bright security floods and long runs.' },
      { q: 'Can you put my holiday lights on a switch?', a: 'Yes. A dedicated weatherproof soffit or eave outlet on an inside switch, usually with a timer, is a popular late-fall job. Book it early.' },
      { q: 'Will the wiring survive Colorado winters?', a: 'When it is installed right — wet-rated fixtures, gasketed connections, GFCI protection, and proper burial depth for any line-voltage runs. That is the whole job.' },
      { q: 'Do you work with a landscape designer\'s plan?', a: 'Happily. Give us the plan and we will handle the transformer sizing, runs, and controls.' },
    ],
    related: ['lighting-services', 'residential-ev-charging', 'hot-tub-electrical-hookup'],
  },
  {
    id: 'S9',
    slug: 'ceiling-fan-installation',
    h1: 'Ceiling fan installation in Parker',
    navLabel: 'Ceiling fans',
    title: 'Ceiling Fan Installation in Parker, CO | Allsafe Electric',
    metaDescription:
      'New ceiling fans, replacements, and fan-rated box upgrades — including vaulted and two-story ceilings. Wobble-free, quiet, on the right switch. Allsafe Electric, Parker CO.',
    primaryKeyword: 'ceiling fan installation parker',
    secondaryKeywords: ['ceiling fan replacement parker co'],
    group: 'lighting-comfort',
    indexed: true,
    heroImage: 'allsafe-electrician-checking-ceiling-fan-light.JPG',
    heroAlt:
      'Jud from Allsafe Electric checking the light kit on a newly installed ceiling fan',
    lead:
      'A ceiling fan has to hang from a fan-rated box, not the light box that is usually there. That is the part DIY installs get wrong, and it is why fans wobble, drop, or crack the ceiling. We fit a rated box — even on a vaulted or two-story ceiling — balance the fan, and put it on the control you want, whether that is a wall switch, a remote, or a smart switch.',
    priceRange: {
      low: 165,
      high: 425,
      unit: 'per fan',
      drivers: 'replacing vs new location, ceiling height and slope, and whether a rated box or new wiring is needed',
      includes: 'a fan-rated box, mounting, balancing, and control setup',
      needsApproval: true,
    },
    signs: [
      { h3: 'A fan that wobbles or has dropped slightly', body: 'The box is not fan-rated or the mount has loosened. This is a safety fix, not cosmetic.' },
      { h3: 'You want a fan where there is only a ceiling light — or nothing', body: 'We can add the rated box and, if needed, the wiring and switch.' },
      { h3: 'A high or sloped ceiling', body: 'Needs a proper down-rod, an angled mount, and a lift. We are set up for it.' },
      { h3: 'A fan that hums or the light flickers', body: 'Usually the wrong control, a failing capacitor, or a loose connection at the canopy.' },
    ],
    process: [
      'We confirm the box — almost always replacing it with a fan-rated one.',
      'For a new location, Jud runs the wiring and sets the switch.',
      'We assemble, hang, and balance the fan, and set the down-rod for the ceiling height.',
      'We test every speed, the light, and the control.',
    ],
    permits: 'Replacing a fan is maintenance. Adding a fan where there is no existing box, with new wiring and a switch, can be permitted work — we confirm with the Town of Parker or Douglas County.',
    faqs: [
      { q: 'Why can\'t I hang a fan from the existing light box?', a: 'A standard box is not built for the moving load of a fan and can work loose or pull out. Code requires a listed fan-rated box, which we install.' },
      { q: 'Can you install a fan on my vaulted ceiling?', a: 'Yes. It needs an extended down-rod and often an angled ceiling adapter, plus a lift to reach it safely. We come equipped for two-story great rooms.' },
      { q: 'My new fan wobbles. Can you fix it?', a: 'Usually. It is typically the box, the mount, or blade balance. Sometimes a blade is warped and needs replacing.' },
      { q: 'Can the fan and light be on separate switches?', a: 'Yes, if there are enough wires in the box, or with a remote or smart control. Jud checks what is there and gives you the options.' },
    ],
    related: ['lighting-services', 'electrical-switch-services', 'home-automation'],
  },
  {
    id: 'S10',
    slug: 'home-automation',
    h1: 'Smart home and automation wiring in Parker',
    navLabel: 'Smart home',
    title: 'Smart Home & Automation Wiring in Parker, CO | Allsafe Electric',
    metaDescription:
      'Smart switches, video doorbells, thermostats, and the neutral wires and hubs they need — installed and actually working before we leave. Allsafe Electric, Parker CO.',
    primaryKeyword: 'smart home electrician parker',
    secondaryKeywords: ['smart switch installation parker', 'home automation wiring colorado'],
    group: 'lighting-comfort',
    indexed: true,
    heroImage: 'allsafe-electrician-using-front-door-smart-doorbell.JPG',
    heroAlt:
      'Jud from Allsafe Electric testing a video doorbell at the front door of a Parker home',
    lead:
      'The hard part of smart home devices is rarely the app — it is the wiring behind the wall. Smart switches need a neutral. Video doorbells need the right transformer. Smart thermostats often need a C-wire. We handle that side: the neutrals, the transformers, the wiring, and getting the device onto your network and working before we pack up.',
    priceRange: {
      low: 145,
      high: 1600,
      drivers: 'device count, whether neutrals or a C-wire have to be added, and hub or panel work',
      includes: 'installation, any wiring changes, network setup for the device, and a working demo',
      needsApproval: true,
    },
    signs: [
      { h3: 'You bought smart switches and the box has no neutral', body: 'Common in homes built before the mid-1980s. We can add the neutral or fit switches that do not need one.' },
      { h3: 'A video doorbell that keeps going offline or rings weakly', body: 'Almost always an undersized doorbell transformer. A quick swap fixes it for good.' },
      { h3: 'A smart thermostat that says it needs a C-wire', body: 'We run the C-wire or fit an adapter at the furnace board.' },
      { h3: 'You want it set up once, properly', body: 'Rather than a drawer of half-configured devices.' },
    ],
    process: [
      'We go through the device list and check each box and circuit for what it needs.',
      'Jud adds neutrals, upgrades the doorbell transformer, or runs a C-wire as required.',
      'We install the devices, join them to your Wi-Fi or hub, and label everything.',
      'We show you it working — every switch, scene, and camera.',
    ],
    permits: 'Device swaps and low-voltage work are generally not permitted. Adding circuits, neutrals via new wiring, or panel devices may be — we confirm with the local jurisdiction.',
    faqs: [
      { q: 'Do all smart switches need a neutral wire?', a: 'Most do. Some newer models work without one but can cause flicker or a minimum-load issue with LED bulbs. Jud checks your boxes and recommends accordingly.' },
      { q: 'Why does my video doorbell keep dropping offline?', a: 'Usually the existing doorbell transformer is 10VA and the camera needs 16–24VA. Replacing the transformer is a small job that solves it permanently.' },
      { q: 'Can you set up the whole system, not just wire it?', a: 'Yes. We get each device onto your network, into the app, and grouped the way you want it, and we do not leave until it works.' },
      { q: 'Which platforms do you work with?', a: 'The common ones — the major switch, doorbell, thermostat and hub brands. If you have a preference, tell us and we will confirm compatibility before buying anything.' },
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

export const serviceGroups: { id: ServiceGroup; label: string }[] = [
  { id: 'repairs-safety', label: 'Repairs & safety' },
  { id: 'power-panels', label: 'Power & panels' },
  { id: 'lighting-comfort', label: 'Lighting & comfort' },
];
