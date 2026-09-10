/**
 * City pages. Pattern: /electricians/[city]-co/  (planning/docs/03 §4)
 *
 * TIER GATE: these 5 Tier-1 pages are built here but planning/docs/09 §3 gates their
 * *publication* on Tier 0 reaching ≥80% indexed and ≥14 days since launch. Until then
 * they are excluded from the sitemap and marked noindex, see lib/publish.ts and
 * app/sitemap.ts. Flip `PUBLISH_TIER_1` when the gate clears.
 *
 * Content is built from planning/data/service-areas.csv (housing_notes, drive_time,
 * county, electric_utility_verify). Utility assignments carry a "verify" flag because
 * CORE vs Xcel territory does not follow city limits (planning/docs/08 §5, open item #13).
 * Reviews-from-this-city are NOT included, no verified review text is available
 * (BUILD-NOTES.md). Each page still clears the 4-of-7 anti-thin-content bar on the
 * strength of permits, housing stock, utility, neighborhoods, drive time, and a local FAQ.
 */

export interface City {
  slug: string; // e.g. 'parker-co'
  name: string;
  county: string;
  tier: 1 | 2 | 3;
  driveTimeMin: number;
  responseExpectation: string;
  utility: { name: string; verify: boolean; note: string };
  permitAuthority: string;
  permitProcess: string;
  housingStock: string;
  neighborhoods: string[];
  priorityServices: string[]; // cityServiceSlug values
  lead: string;
  faqs: { q: string; a: string }[];
  heroImageBrief: string;
}

export const cities: City[] = [
  {
    slug: 'parker-co',
    name: 'Parker',
    county: 'Douglas',
    tier: 1,
    driveTimeMin: 0,
    responseExpectation:
      'Same-day for urgent calls in most of Parker, and often within two hours during business hours.',
    utility: {
      name: 'CORE Electric Cooperative',
      verify: true,
      note: 'Most of Parker is served by CORE Electric Cooperative (formerly IREA), not Xcel. This matters for rebates. Most "Colorado electrical rebate" articles assume Xcel and are wrong for Parker. Confirm your address on CORE\'s service map.',
    },
    permitAuthority: 'Town of Parker Building Division',
    permitProcess:
      'Homes inside Parker town limits permit through the Town of Parker Building Division. Panel and service upgrades, new circuits, EV chargers, hot tubs and generators all require a permit and a rough and/or final inspection. We file the application, coordinate the CORE disconnect and reconnect for service work, and meet the inspector. Verify current fees on parkerco.gov before scheduling.',
    housingStock:
      'Parker grew fast between 1995 and 2015, so a large share of homes are 1990s–2000s builds now running 100A–150A service that was never meant to carry two EVs, a hot tub and central AC at once. The older Pinery and Ponderosa areas have 1970s–80s homes with aging panels. Some Federal Pacific and Zinsco, and the occasional aluminium branch circuit.',
    neighborhoods: [
      'Stonegate',
      'Stroh Ranch',
      'Pradera',
      'The Pinery',
      'Canterberry Crossing',
      'Cottonwood',
      'Clarke Farms',
      'Newlin Meadows',
    ],
    priorityServices: [
      'panel-upgrade',
      'ev-charger-installation',
      'emergency-electrician',
      'outlet-repair',
    ],
    lead:
      'Allsafe Electric is based in Parker. Jud has run the business here since 2018 and lives the same commute you do. For most of the town. Stonegate, Stroh Ranch, Canterberry Crossing, The Pinery. He can often be on site within two hours during business hours, and a real person answers the phone when you call.',
    faqs: [
      {
        q: 'Who issues electrical permits in Parker?',
        a: 'The Town of Parker Building Division for addresses inside town limits. Properties in unincorporated Douglas County go through the county instead. We determine which applies to your address and handle the filing.',
      },
      {
        q: 'Is Parker on CORE or Xcel?',
        a: 'Most of Parker is CORE Electric Cooperative. That affects which rebate and time-of-use programs you qualify for, especially for EV chargers and heat pumps. We confirm your provider before quoting anything rebate-dependent.',
      },
      {
        q: 'My 1990s Parker home trips breakers when the AC and microwave run together. Is that a panel problem?',
        a: 'Often, yes. A lot of Parker homes from that era have 100A or 150A panels that are simply full. A load assessment tells you whether you need a heavy-up to 200A or just some circuit rebalancing.',
      },
      {
        q: 'Do you cover the Pinery and Pradera?',
        a: 'Yes. Both are a short drive from the shop. The Pinery\'s older homes see more panel and generator work; Pradera\'s custom homes and HOA design review come up on outdoor lighting and generator placement.',
      },
    ],
    heroImageBrief:
      'A quiet residential street of two-story stone-and-siding homes in Parker, Colorado, mature trees, mountains faint on the horizon, late afternoon light. 16:9.',
  },
  {
    slug: 'castle-rock-co',
    name: 'Castle Rock',
    county: 'Douglas',
    tier: 1,
    driveTimeMin: 18,
    responseExpectation:
      'About 18 minutes from the Parker shop. Same-day for urgent calls, next-day for scheduled work in most of Castle Rock.',
    utility: {
      name: 'CORE Electric Cooperative',
      verify: true,
      note: 'Castle Rock is largely CORE Electric Cooperative territory. Confirm your specific address, since parts of the I-25 corridor differ.',
    },
    permitAuthority: 'Town of Castle Rock',
    permitProcess:
      'The Town of Castle Rock runs its own building department, separate from Douglas County. Panel upgrades, service changes, generators, EV chargers and hot tub circuits are permitted and inspected. Historic downtown properties can carry extra review. We file with the Town, coordinate the utility, and meet the inspector. Confirm current fees with the Town of Castle Rock before scheduling.',
    housingStock:
      'Castle Rock is a split personality electrically. The historic downtown core has pre-1950 homes where knob-and-tube and early wiring still turn up, and inspection and rewiring demand is high. The Meadows, Founders Village, Crystal Valley and the newer subdivisions are largely post-2000 and in good shape, though the earliest of those panels are now 20-plus years old.',
    neighborhoods: [
      'The Meadows',
      'Founders Village',
      'Crystal Valley',
      'Plum Creek',
      'Castlewood Ranch',
      'Metzler Ranch',
      'Downtown Castle Rock',
    ],
    priorityServices: [
      'panel-upgrade',
      'electrical-inspection',
      'generator-installation',
      'emergency-electrician',
    ],
    lead:
      'Castle Rock is about 18 minutes from the Parker shop, so Jud covers it regularly. Downtown\'s older homes see a lot of inspection and rewiring work; the newer subdivisions off Founders and Meadows Parkway are more panel upgrades and EV chargers. Either way, you get the same licensed master electrician and the same phone that gets answered.',
    faqs: [
      {
        q: 'Does Castle Rock use Douglas County for permits?',
        a: 'No. The Town of Castle Rock has its own building department. Only unincorporated addresses near Castle Rock go through the county. We confirm which applies and file accordingly.',
      },
      {
        q: 'I\'m buying a home in downtown Castle Rock. Should I get the wiring checked?',
        a: 'Strongly recommend it. Pre-1950 homes in the historic core can still have knob-and-tube, ungrounded circuits, or a mix of old and new work. A licensed electrical inspection opens the panel and tells you what you are actually buying.',
      },
      {
        q: 'How quickly can you get to The Meadows or Crystal Valley for an emergency?',
        a: 'During business hours, usually within an hour or so once we confirm the call, the drive from Parker is straightforward. Evenings route through the after-hours line.',
      },
      {
        q: 'Are generators common in Castle Rock?',
        a: 'Yes, especially on the west side and toward the ridge, where wind events and outages are more frequent. We size and install standby units and handle both the electrical and gas permits with the Town.',
      },
    ],
    heroImageBrief:
      'A residential street in Castle Rock, Colorado with two-story homes, the Castle Rock butte faint in the distance, clear morning light, autumn. 16:9.',
  },
  {
    slug: 'highlands-ranch-co',
    name: 'Highlands Ranch',
    county: 'Douglas',
    tier: 1,
    driveTimeMin: 20,
    responseExpectation:
      'About 20 minutes from Parker. Same-day for urgent work, next-day scheduling for most jobs.',
    utility: {
      name: 'Xcel Energy',
      verify: true,
      note: 'Highlands Ranch is primarily Xcel Energy territory, unlike most of Parker and Castle Rock. That changes which rebate and time-of-use programs apply. Confirm your address before assuming a rebate amount.',
    },
    permitAuthority: 'Douglas County Building Division',
    permitProcess:
      'Highlands Ranch is unincorporated, so electrical permits go through the Douglas County Building Division. Panel and service upgrades, EV chargers, generators and hot tub circuits require a permit and inspection. The Highlands Ranch Community Association also has architectural guidelines that can apply to exterior work like generators and outdoor lighting. We handle the county permit; the HRCA side is covered in our HOA guide.',
    housingStock:
      'Highlands Ranch is almost entirely 1980s–2000s master-planned development, which makes it predictable: consistent construction, mostly 150A or 200A service, and a lot of original panels now 30–40 years old and due for evaluation. The most common calls are panel assessments, EV charger installs, and outlet and switch work in homes getting their first real refresh.',
    neighborhoods: [
      'Northridge',
      'Westridge',
      'Eastridge',
      'Southridge',
      'The Hearth',
      'Firelight',
      'BackCountry',
    ],
    priorityServices: [
      'panel-upgrade',
      'ev-charger-installation',
      'outlet-repair',
      'electrical-inspection',
    ],
    lead:
      'Highlands Ranch is a straight 20-minute run from the Parker shop. The housing stock is consistent, mostly 1990s master-planned, so Jud knows what he is walking into: original panels reaching the end of their service life, and homeowners adding EV chargers to a service that can usually take one with a proper load calculation.',
    faqs: [
      {
        q: 'Which building department covers Highlands Ranch?',
        a: 'Douglas County, Highlands Ranch is unincorporated. Permits and inspections for panel work, EV chargers and generators all go through the county Building Division, which we handle for you.',
      },
      {
        q: 'Is Highlands Ranch on Xcel or CORE?',
        a: 'Mostly Xcel Energy, which is different from most of Parker and Castle Rock. It matters for EV and electrification rebates. We check your provider before quoting anything that depends on a rebate.',
      },
      {
        q: 'My Highlands Ranch home still has its original 1990s panel. Does it need replacing?',
        a: 'Not automatically, but at 30-plus years it is worth an inspection. We check the brand, the breaker condition, the bus, and the grounding, and tell you whether it is fine, worth monitoring, or due.',
      },
      {
        q: 'Can my Highlands Ranch home take an EV charger without a panel upgrade?',
        a: 'Usually, if it has 200A service and some spare capacity. Jud runs a load calculation first. If it is tight, a load-management device often avoids a full upgrade.',
      },
    ],
    heroImageBrief:
      'A residential street in Highlands Ranch, Colorado, rows of consistent two-story homes, foothills in the background, bright midday light. 16:9.',
  },
  {
    slug: 'lone-tree-co',
    name: 'Lone Tree',
    county: 'Douglas',
    tier: 1,
    driveTimeMin: 15,
    responseExpectation:
      'About 15 minutes from Parker, one of the closer service areas. Same-day for urgent calls.',
    utility: {
      name: 'Xcel Energy',
      verify: true,
      note: 'Lone Tree is generally Xcel Energy territory, though the CORE/Xcel line runs nearby. Verify your address before relying on a specific rebate program.',
    },
    permitAuthority: 'City of Lone Tree',
    permitProcess:
      'Lone Tree is an incorporated city with its own permitting, separate from Douglas County. Panel upgrades, EV chargers, generators, hot tubs and new circuits are permitted and inspected by the City. Several Lone Tree communities also have active HOAs with design review for exterior equipment. We file with the City and coordinate the utility and inspection.',
    housingStock:
      'Lone Tree skews newer, larger, and more affluent, with high EV adoption and strong demand for smart-home wiring, standby generators, and landscape lighting. Most homes have 200A service, so the work is less about capacity and more about adding well-planned circuits, a second EV charger, a shop subpanel, a whole-house generator, to homes that can support them.',
    neighborhoods: [
      'Heritage Hills',
      'Carriage Club',
      'Montecito',
      'RidgeGate',
      'Fairways',
      'Lone Tree (original)',
    ],
    priorityServices: [
      'ev-charger-installation',
      'generator-installation',
      'panel-upgrade',
      'electrical-inspection',
    ],
    lead:
      'Lone Tree is only about 15 minutes from the Parker shop, so it is one of the areas Jud reaches quickest. The work here tends toward the higher end. Dual EV chargers, whole-house generators, smart-home wiring, and landscape lighting on larger lots, on homes that usually have the 200A service to support it.',
    faqs: [
      {
        q: 'Does Lone Tree handle its own permits?',
        a: 'Yes. Lone Tree is an incorporated city with its own building department, so permits do not go through Douglas County. We file with the City and meet their inspector.',
      },
      {
        q: 'We have two EVs in Lone Tree. What are our options?',
        a: 'Two chargers on one 200A service is common here. Depending on your other loads, that can be two dedicated circuits, a load-sharing pair, or a small service upgrade. Jud runs the numbers and lays out the choices.',
      },
      {
        q: 'Do Lone Tree HOAs restrict generators?',
        a: 'Several do. Placement, screening, and sound are the usual concerns, especially in Heritage Hills and Carriage Club. We site the unit to meet both the City code and the HOA guidelines; our HOA guide covers the association process.',
      },
      {
        q: 'Can you do whole-home surge protection and smart-home wiring in the same visit?',
        a: 'Yes. Bundling the panel-side work, an SPD, a generator interlock, smart-switch neutrals. Into one visit is efficient and common on Lone Tree jobs.',
      },
    ],
    heroImageBrief:
      'A residential street in Lone Tree, Colorado with larger newer two-story homes, manicured landscaping, foothills behind, warm late-afternoon light. 16:9.',
  },
  {
    slug: 'centennial-co',
    name: 'Centennial',
    county: 'Arapahoe',
    tier: 1,
    driveTimeMin: 22,
    responseExpectation:
      'About 22 minutes from the Parker shop. Same-day for urgent calls, next-day for scheduled work.',
    utility: {
      name: 'Xcel Energy',
      verify: true,
      note: 'Most of Centennial is Xcel Energy, though the far south edge can be CORE. Centennial is in Arapahoe County, not Douglas, the permitting is different. Verify both for your address.',
    },
    permitAuthority: 'City of Centennial (permits administered through a third-party provider)',
    permitProcess:
      'Centennial is an incorporated city in Arapahoe County and contracts out building-permit administration. Panel upgrades, EV chargers, generators and new circuits are permitted and inspected. The process and fee schedule differ from Douglas County, so we confirm the current requirements with the City\'s permit provider before scheduling.',
    housingStock:
      'Centennial covers a broad range, roughly 1960s to 2000s. The older stock, meaning the parts of the area built in the 1960s and 70s, is where aluminium branch wiring and Federal Pacific panels show up, and where inspection, panel and outlet work is heaviest. The newer subdivisions off Smoky Hill and in the southeast are more straightforward.',
    neighborhoods: [
      'Willow Creek',
      'Homestead',
      'Walnut Hills',
      'Foxridge',
      'Piney Creek',
      'Smoky Hill',
      'The Knolls',
    ],
    priorityServices: [
      'panel-upgrade',
      'electrical-inspection',
      'outlet-repair',
      'emergency-electrician',
    ],
    lead:
      'Centennial is about 22 minutes from Parker and sits in Arapahoe County, so the permitting is different from our Douglas County work, we handle that. The 1960s–70s neighbourhoods here keep Jud busy with panel replacements, aluminium-wiring corrections, and outlet work in homes getting updated for the first time in decades.',
    faqs: [
      {
        q: 'Centennial is in a different county, does that change anything?',
        a: 'Only the paperwork. Centennial is an incorporated city in Arapahoe County with its own permit process, separate from Douglas County. The work and the standards are the same; we file with the right authority.',
      },
      {
        q: 'My 1970s Centennial home has aluminium wiring. What do I do?',
        a: 'It is a known, correctable condition, not a teardown. The fix is proper pigtailing with rated connectors at every device, or selective replacement. We assess the extent and give you a scoped price.',
      },
      {
        q: 'Do Centennial homes from the 60s and 70s have Federal Pacific panels?',
        a: 'Some do, along with Zinsco. Both have documented failure-to-trip issues. If you have one, replacement is the standard recommendation and we can usually do it in a day.',
      },
      {
        q: 'Is Centennial on Xcel?',
        a: 'Mostly Xcel Energy, with some CORE on the southern edge. It affects rebate eligibility, so we verify before quoting rebate-dependent work.',
      },
    ],
    heroImageBrief:
      'An established residential street in Centennial, Colorado with mature trees and 1970s-era ranch and two-story homes, soft overcast light. 16:9.',
  },
];

/** Tier-2 service areas. Listed in the footer and service-area hub, not yet built as pages. */
export const tier2Areas = [
  'Castle Pines',
  'Aurora (south)',
  'Littleton',
  'Greenwood Village',
  'Franktown',
  'Elizabeth',
  'Sedalia',
];

/** Tier-3 Parker neighborhoods, only these five, per planning/docs/03 §4. Not yet built. */
export const tier3Neighborhoods = [
  'Stonegate',
  'Stroh Ranch',
  'Pradera',
  'The Pinery',
  'Canterberry Crossing',
];

export const citySlugs = cities.map((c) => c.slug);
export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
