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
  permitProcess: string | { intro: string; steps: string[] };
  housingStock: string;
  neighborhoods: string[];
  priorityServices: string[]; // cityServiceSlug values
  lead: string;
  faqs: { q: string; a: string }[];
  heroImageBrief: string;

  /**
   * Content-depth fields, planning/plans/crispy-forging-clock.md Part B, added
   * 2026-09-13. All optional so cities not yet migrated keep building/typing
   * clean. Every new field must trace to a fact already in this entry or in
   * lib/business.ts, never an invented detail.
   */
  /** 150-200w, promoted/expanded from `lead`. */
  overview?: string;
  /** 3-5 of the `neighborhoods` entries get one real sentence (home age, a
   * common issue) — only where genuinely differentiable, not forced onto every
   * neighborhood. */
  neighborhoodNotes?: { name: string; note: string }[];
  /** 20-30w, reuses `driveTimeMin` to tie response-time trust into copy. */
  driveTimeContext?: string;
  /** General job photos. Explicitly NOT staged as taken in this specific city
   * (none are) — caption honestly. */
  galleryImages?: { name: string; alt: string }[];
}

export const cities: City[] = [
  {
    slug: 'parker',
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
    permitProcess: {
      intro:
        'Panel and service upgrades, new circuits, EV chargers, hot tubs and generators all require a permit and a rough and/or final inspection inside Parker town limits.',
      steps: [
        'We confirm whether your address is inside Parker town limits or unincorporated Douglas County, since each permits through a different office.',
        'We file the permit application with the correct authority and pull any required CORE Electric Cooperative disconnect and reconnect for service work.',
        'We schedule and meet the inspector on site, so you do not have to take time off work to be there.',
        'We verify current permit fees on parkerco.gov before scheduling non-urgent work, since they change periodically.',
      ],
    },
    housingStock:
      'Parker grew fast between 1995 and 2015, so a large share of homes are 1990s–2000s builds now running 100A–150A service that was never meant to carry two EVs, a hot tub and central AC at once. The older Pinery and Ponderosa areas have 1970s–80s homes with aging panels. Some Federal Pacific and Zinsco, and the occasional aluminum branch circuit. Panel capacity, not damaged wiring, is the single most common reason we get called out to a Parker home for anything beyond a repair: the house was fine until a second EV or a hot tub got added to a panel that was already near its limit.',
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
      'Allsafe Electric is based in Parker. We have run the business here since 2018 and live the same commute you do, for most of the town: Stonegate, Stroh Ranch, Canterberry Crossing, The Pinery. We can often be on site within two hours during business hours, and a real person answers the phone when you call.',
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
      {
        q: 'How is response time different in Parker versus your other service areas?',
        a: 'We are based here, so there is no drive time added to a Parker appointment window, unlike Castle Rock or Highlands Ranch, which add 15 to 20 minutes. During business hours, urgent calls in Parker are usually on site within two hours.',
      },
      {
        q: 'Do you handle both older and newer Parker homes?',
        a: 'Yes, and they tend to need different things. Newer subdivisions like Stonegate and Canterberry Crossing mostly need panel capacity work as families add EVs and hot tubs to a panel sized for less. Older Pinery-area homes more often need an outdated panel brand, Federal Pacific or Zinsco, replaced outright.',
      },
      {
        q: 'What license should I ask to see?',
        a: 'Master Electrician License ME.0601023 and Electrical Contractor License EC.0101068, both verifiable through the Colorado State Electrical Board\'s public license lookup. We are also BBB A+ accredited.',
      },
    ],
    heroImageBrief:
      'A quiet residential street of two-story stone-and-siding homes in Parker, Colorado, mature trees, mountains faint on the horizon, late afternoon light. 16:9.',
    overview:
      'Allsafe Electric is based in Parker, and has been since 2018. This is not a satellite territory for us, it is where the shop is, and where Jud and Justin live the same streets and the same seasons as the people who call us. We know which subdivisions were built to what panel size, which older neighborhoods still have a Federal Pacific panel or two waiting to be found, and which HOAs want outdoor lighting work done a certain way. Being based here also means no drive-time markup on your appointment window, and it means the person quoting your job has probably already been three streets over that same week.',
    neighborhoodNotes: [
      {
        name: 'Stonegate',
        note: '1990s-2000s tract homes on 100-150A panels, common candidates for a capacity upgrade once an EV or hot tub gets added.',
      },
      {
        name: 'The Pinery',
        note: '1970s-80s stock where Federal Pacific and Zinsco panels still turn up, along with the occasional aluminum branch circuit.',
      },
      {
        name: 'Pradera',
        note: 'Custom-built homes with active HOA design review, most often outdoor lighting and generator placement.',
      },
    ],
    driveTimeContext: 'We are based in Parker itself, so there is no drive time built into your appointment window.',
    galleryImages: [
      { name: 'suburban-home-exterior-daylight.JPG', alt: 'A suburban Parker, Colorado home exterior in daylight' },
      { name: 'allsafe-electrician-standing-in-modern-home.JPG', alt: 'Allsafe electrician on a job inside a Parker home' },
      { name: 'electrician-tool-bag-on-kitchen-counter.JPG', alt: 'Allsafe electrician tool bag staged on a kitchen counter' },
      { name: 'allsafe-electrician-preparing-service-estimate-on-tablet.JPG', alt: 'Allsafe electrician preparing a written estimate on a tablet' },
    ],
  },
  {
    slug: 'castle-rock',
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
      'Castle Rock is about 18 minutes from the Parker shop, so we cover it regularly. Downtown\'s older homes see a lot of inspection and rewiring work; the newer subdivisions off Founders and Meadows Parkway are more panel upgrades and EV chargers. Either way, you get the same licensed master electrician and the same phone that gets answered.',
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
        a: 'Same-day, usually within an hour or so once we confirm the call, the drive from Parker is straightforward. We are open weekdays 8am to 6pm; a call outside those hours gets a callback the next business day.',
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
    slug: 'highlands-ranch',
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
      'Highlands Ranch is a straight 20-minute run from the Parker shop. The housing stock is consistent, mostly 1990s master-planned, so we know what to expect: original panels reaching the end of their service life, and homeowners adding EV chargers to a service that can usually take one with a proper load calculation.',
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
        a: 'Usually, if it has 200A service and some spare capacity. We run a load calculation first. If it is tight, a load-management device often avoids a full upgrade.',
      },
    ],
    heroImageBrief:
      'A residential street in Highlands Ranch, Colorado, rows of consistent two-story homes, foothills in the background, bright midday light. 16:9.',
  },
  {
    slug: 'lone-tree',
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
      'Lone Tree is only about 15 minutes from the Parker shop, so it is one of the areas we reach quickest. The work here tends toward the higher end. Dual EV chargers, whole-house generators, smart-home wiring, and landscape lighting on larger lots, on homes that usually have the 200A service to support it.',
    faqs: [
      {
        q: 'Does Lone Tree handle its own permits?',
        a: 'Yes. Lone Tree is an incorporated city with its own building department, so permits do not go through Douglas County. We file with the City and meet their inspector.',
      },
      {
        q: 'We have two EVs in Lone Tree. What are our options?',
        a: 'Two chargers on one 200A service is common here. Depending on your other loads, that can be two dedicated circuits, a load-sharing pair, or a small service upgrade. We run the numbers and lay out the choices.',
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
    slug: 'centennial',
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
      'Centennial covers a broad range, roughly 1960s to 2000s. The older stock, meaning the parts of the area built in the 1960s and 70s, is where aluminum branch wiring and Federal Pacific panels show up, and where inspection, panel and outlet work is heaviest. The newer subdivisions off Smoky Hill and in the southeast are more straightforward.',
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
      'Centennial is about 22 minutes from Parker and sits in Arapahoe County, so the permitting is different from our Douglas County work, we handle that. The 1960s–70s neighborhoods here keep us busy with panel replacements, aluminum-wiring corrections, and outlet work in homes getting updated for the first time in decades.',
    faqs: [
      {
        q: 'Centennial is in a different county, does that change anything?',
        a: 'Only the paperwork. Centennial is an incorporated city in Arapahoe County with its own permit process, separate from Douglas County. The work and the standards are the same; we file with the right authority.',
      },
      {
        q: 'My 1970s Centennial home has aluminum wiring. What do I do?',
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

  /* ─────────────────────────────────────────────────────────────────────────
   * Tier 2, added 2026-09-13.
   *
   * Scope comes from the client's OWN live site service-area page
   * (allsafehomeservice.com/service-areas/, fetched 2026-09-13), which names:
   * Parker, The Pinery, Stonegate, Foxfield, Castle Pines, Castle Rock,
   * Centennial, Dove Valley, Elbert, Elizabeth, Franktown, Englewood,
   * Littleton, Highlands Ranch, Aurora, Lone Tree. The five Tier-1 entries
   * above covered only a third of that list, so every remaining named area now
   * gets a real page rather than a footer label pointing at /service-area/.
   *
   * This list is also corroborated by demand: Search Console shows real
   * impressions for the legacy /electrician-{aurora,englewood,littleton,
   * franktown,castle-pines,the-pinery,stonegate,foxfield,dove-valley,elbert,
   * elizabeth}/ URLs, several ranking in the top 10 already.
   *
   * Cities appearing in GSC but NOT on the client's service-area list
   * (Lakewood, Denver, Greenwood Village, Edgewater, Acres Green) are
   * deliberately NOT built: claiming coverage the business has not confirmed
   * would be inventing a service area. Flagged for the client instead.
   *
   * Utility territory carries verify:true wherever CORE / Xcel / MVEA
   * boundaries do not follow municipal lines, which is most of this list.
   * ───────────────────────────────────────────────────────────────────────── */

  {
    slug: 'the-pinery',
    name: 'The Pinery',
    county: 'Douglas',
    tier: 2,
    driveTimeMin: 10,
    responseExpectation:
      'About 10 minutes from the Parker shop. Same-day for urgent calls, and often within two hours during business hours.',
    utility: {
      name: 'CORE Electric Cooperative',
      verify: true,
      note: 'The Pinery sits in CORE Electric Cooperative territory rather than Xcel. That matters for rebates: most Colorado rebate guidance you will find online assumes Xcel and does not apply here. Confirm your address on CORE\'s service map.',
    },
    permitAuthority: 'Douglas County Building Division',
    permitProcess:
      'The Pinery is unincorporated Douglas County, so permits go through the county rather than the Town of Parker. Panel and service upgrades, new circuits, EV chargers, hot tubs and standby generators all require a permit and inspection. We file with Douglas County, coordinate the CORE disconnect and reconnect on service work, and meet the inspector. Verify current fees with Douglas County before scheduling.',
    housingStock:
      'The Pinery is where Parker-area homes get older. Much of it is 1970s and 80s construction on larger, treed lots, and that era brings specific problems: Federal Pacific and Zinsco panels that should be replaced rather than repaired, ungrounded two-prong circuits, and the occasional aluminum branch run. Original 100A services are common and undersized for how these homes are actually used now. On the flip side, the lots are big and the trees are mature, so outdoor lighting and buried feeds to sheds, shops and gates come up far more often here than in newer subdivisions.',
    neighborhoods: ['The Pinery', 'Pinery West', 'Sagebrush', 'Bell Mountain Ranch', 'Ponderosa Hills'],
    priorityServices: [
      'panel-upgrade',
      'electrical-inspection',
      'generator-installation',
      'emergency-electrician',
    ],
    lead:
      'The Pinery is ten minutes from the shop and it is one of the areas we know best. The older housing stock here means more panel replacements and safety inspections than anywhere else we cover, and we will tell you honestly whether your panel is a genuine hazard or simply old.',
    overview:
      'The Pinery is close enough to the Parker shop that we are there most weeks, and the work has a distinct character. These are largely 1970s and 80s homes on big treed lots, which means two things. First, the panels: this is where we still find Federal Pacific and Zinsco equipment, both of which have a documented history of breakers failing to trip under fault, and replacement is the fix rather than an upsell. Second, the lots: mature trees, outbuildings, long driveways and gates mean buried feeds, exterior lighting and generator work come up far more often than they do in a newer subdivision. If you are buying here, an electrical inspection before closing is genuinely worth the money, because what is behind the panel cover in a fifty-year-old home is not something a general home inspection will tell you.',
    neighborhoodNotes: [
      {
        name: 'The Pinery',
        note: 'Original 1970s-80s sections, the most likely place in Douglas County to still find a Federal Pacific or Zinsco panel.',
      },
      {
        name: 'Bell Mountain Ranch',
        note: 'Larger acreage properties where standby generators and buried feeds to outbuildings are common requests.',
      },
    ],
    driveTimeContext: 'About 10 minutes from our Parker shop, so urgent calls here are usually same-day.',
    faqs: [
      {
        q: 'Do Pinery permits go through Parker or Douglas County?',
        a: 'Douglas County. The Pinery is unincorporated, so the Town of Parker Building Division has no jurisdiction there. We confirm which office covers your exact address before filing, because the boundary is not always obvious from the street.',
      },
      {
        q: 'I have a Federal Pacific panel in my Pinery home. Is it really a problem?',
        a: 'Yes, and it is worth taking seriously. Federal Pacific Stab-Lok breakers have a documented history of failing to trip under fault conditions, which is the single job a breaker exists to do. Replacement is the fix. We will show you the label so you can see what you have rather than taking our word for it.',
      },
      {
        q: 'Is The Pinery on CORE or Xcel?',
        a: 'CORE Electric Cooperative for the large majority of addresses. This affects which rebate and time-of-use programs you qualify for, especially on EV chargers. We confirm your provider before quoting anything that depends on a rebate.',
      },
      {
        q: 'Can you run power to a shed, shop or gate out here?',
        a: 'Yes, and it is common work in The Pinery given the lot sizes. A buried feed needs a permit, correct burial depth, proper conduit and a disconnect at the far end. We handle the trenching plan, the permit and the inspection.',
      },
      {
        q: 'Are outages bad enough here to justify a generator?',
        a: 'It depends where you are. The more treed and exposed sections lose power in wind and snow events more often than central Parker does. We size standby units honestly, including telling you when a smaller unit covering well pump, furnace and a few circuits makes more sense than whole-home coverage.',
      },
    ],
    heroImageBrief:
      'A wooded residential lot in The Pinery, Douglas County Colorado, mature ponderosa pines, a 1980s two-story home set back from the road, late afternoon light. 16:9.',
  },

  {
    slug: 'stonegate',
    name: 'Stonegate',
    county: 'Douglas',
    tier: 2,
    driveTimeMin: 6,
    responseExpectation:
      'About 6 minutes from the Parker shop. Same-day for urgent calls, frequently within the hour during business hours.',
    utility: {
      name: 'CORE Electric Cooperative',
      verify: true,
      note: 'Stonegate is CORE Electric Cooperative territory, not Xcel. Rebate programs differ accordingly. Confirm your address on CORE\'s service map before counting on any advertised rebate.',
    },
    permitAuthority: 'Douglas County Building Division',
    permitProcess:
      'Most of Stonegate is unincorporated Douglas County, so permits are filed with the county rather than the Town of Parker. Panel upgrades, EV charger circuits, hot tub feeds and generators all require a permit and inspection. We confirm jurisdiction for your specific address first, since the Parker town boundary runs close by, then file, coordinate CORE, and meet the inspector.',
    housingStock:
      'Stonegate is almost entirely 1990s and early 2000s construction, which makes the electrical picture unusually consistent. Homes here were typically built with 100A or 150A service, sized for a household that did not own an electric vehicle, run a hot tub, or charge four devices per bedroom. The wiring itself is generally in good condition, copper and grounded, so this is rarely a safety-hazard area. It is a capacity area: the most common call is a panel that is simply full, and the most common fix is a heavy-up to 200A or a load rebalance rather than anything dramatic.',
    neighborhoods: ['Stonegate', 'Stonegate Village', 'Prairie Meadows', 'Piney Creek'],
    priorityServices: [
      'panel-upgrade',
      'ev-charger-installation',
      'outlet-repair',
      'emergency-electrician',
    ],
    lead:
      'Stonegate is minutes from the shop. The homes here are mostly 1990s and 2000s builds on 100A or 150A service, so the work is usually about capacity: making room for an EV charger, a hot tub, or a finished basement without tripping the whole house.',
    overview:
      'Stonegate is one of the closest neighborhoods to our shop, and electrically it is one of the most predictable areas we work in. Nearly everything here went up between the early 1990s and the mid 2000s, built to the codes of the day with copper wiring and grounded circuits, so genuine safety hazards are rare. What is common is running out of room. A panel sized for a 1990s household does not comfortably absorb an EV charger, a hot tub and a finished basement, and the symptom homeowners notice is breakers tripping when several big loads run at once. That is a capacity problem, not a broken panel, and the honest answer is often cheaper than people expect: a load calculation will tell you whether you genuinely need a 200A service upgrade or whether rebalancing circuits solves it.',
    driveTimeContext: 'Roughly 6 minutes from our Parker shop, one of the fastest areas we cover.',
    faqs: [
      {
        q: 'Is Stonegate permitted through Parker or Douglas County?',
        a: 'Most of Stonegate is unincorporated Douglas County, so the county handles it. The Parker town boundary is close, though, so we verify your specific address before filing rather than assuming.',
      },
      {
        q: 'My breakers trip when the AC and the microwave run together. Is my panel bad?',
        a: 'Almost certainly not bad, just full. That is the single most common call we get from Stonegate. A load calculation tells you whether you need a heavy-up to 200A or whether moving a couple of circuits solves it, and we will tell you which one it actually is.',
      },
      {
        q: 'Can I add an EV charger to a 1990s Stonegate home?',
        a: 'Usually yes, but the load calculation comes first. A Level 2 charger is a large continuous load, and whether your existing service supports it depends on what else the house is running. We do that math before quoting, so nobody buys a charger that the panel cannot feed.',
      },
      {
        q: 'How fast can you get here for an emergency?',
        a: 'Stonegate is about six minutes out, so during business hours we are frequently on site within the hour. We are open weekdays 8am to 6pm; a call outside those hours gets a callback the next business day.',
      },
    ],
    heroImageBrief:
      'A Stonegate, Colorado residential street of late-1990s two-story homes with young trees and open sky, bright morning light. 16:9.',
  },

  {
    slug: 'castle-pines',
    name: 'Castle Pines',
    county: 'Douglas',
    tier: 2,
    driveTimeMin: 16,
    responseExpectation:
      'About 16 minutes from the Parker shop. Same-day for urgent calls, next-day for scheduled work.',
    utility: {
      name: 'CORE Electric Cooperative',
      verify: true,
      note: 'Castle Pines is largely CORE Electric Cooperative territory. Confirm your address, since the I-25 corridor has pockets served differently.',
    },
    permitAuthority: 'City of Castle Pines',
    permitProcess:
      'Castle Pines incorporated in 2008 and handles its own building permits, separate from Douglas County. Panel and service work, EV chargers, generators, hot tubs and outdoor lighting circuits are permitted and inspected. Many neighborhoods also carry active HOA design review, which is separate from the permit and matters most for anything visible outside: generator placement, exterior fixtures and landscape lighting. We file the permit and will tell you when an HOA submittal is likely needed too.',
    housingStock:
      'Castle Pines is mostly 1990s through 2000s construction, with a significant share of larger custom and semi-custom homes. Electrically that means bigger systems than average: 200A services are common, sub-panels are frequent, and there is often far more exterior and landscape lighting than a standard subdivision carries. The failure points tend to be outdoor rather than indoor, buried landscape lighting runs, exterior GFCI circuits, and transformer or timer equipment that has weathered fifteen Colorado winters.',
    neighborhoods: ['Castle Pines Village', 'The Canyons', 'Daniels Gate', 'Castle Pines North', 'Beverly Hills'],
    priorityServices: [
      'panel-upgrade',
      'generator-installation',
      'ev-charger-installation',
      'electrical-inspection',
    ],
    lead:
      'Castle Pines is about 16 minutes down I-25 from the shop. The homes here are larger than average and so are the electrical systems, with more exterior lighting, more sub-panels and more generator work than a typical subdivision.',
    overview:
      'Castle Pines is a custom-home market, and the electrical work reflects that. Services are usually already 200A, sub-panels are common, and there is typically far more going on outside the house than inside it: landscape and architectural lighting, exterior GFCI circuits, gate and driveway feeds, water features. That is also where most of our calls originate, because buried runs and outdoor equipment take a beating through fifteen or twenty Colorado winters in a way that interior wiring simply does not. The other thing worth knowing here is process: Castle Pines runs its own building department rather than using Douglas County, and most neighborhoods carry active HOA design review on top of that. Anything visible from outside can need both approvals, and we will tell you upfront when that is the case rather than after the fact.',
    neighborhoodNotes: [
      {
        name: 'Castle Pines Village',
        note: 'Gated custom homes with extensive landscape lighting and active design review on anything visible outside.',
      },
      {
        name: 'The Canyons',
        note: 'Newer construction, mostly EV charger additions and finished-basement circuits rather than repairs.',
      },
    ],
    driveTimeContext: 'About 16 minutes from our Parker shop, straight down I-25.',
    faqs: [
      {
        q: 'Does Castle Pines permit through Douglas County?',
        a: 'No. Castle Pines incorporated in 2008 and runs its own building department. Only unincorporated addresses nearby go through the county. We confirm which applies to your address and file accordingly.',
      },
      {
        q: 'Will my HOA need to approve electrical work?',
        a: 'For anything visible outside, often yes. Generator placement, exterior fixtures and landscape lighting commonly need design review, and that is a separate process from the city permit. We will flag it before we start so it does not stall the job halfway through.',
      },
      {
        q: 'My landscape lighting has stopped working in sections. What causes that?',
        a: 'Usually a failed transformer, a corroded buried connection, or a run that has been nicked by landscaping work. It is very common here given how much exterior lighting these homes carry. We trace the actual break rather than replacing the whole system by default.',
      },
      {
        q: 'Are standby generators worth it in Castle Pines?',
        a: 'For many homes here, yes. Ridge and canyon exposure means wind-related outages are more frequent than in flatter areas. We size units honestly, and that sometimes means telling you a partial-coverage unit is the sensible buy rather than whole-home.',
      },
    ],
    heroImageBrief:
      'A large custom home in Castle Pines, Colorado with stone and timber detailing, mature landscaping and evening architectural lighting just switching on. 16:9.',
  },

  {
    slug: 'franktown',
    name: 'Franktown',
    county: 'Douglas',
    tier: 2,
    driveTimeMin: 15,
    responseExpectation:
      'About 15 minutes from the Parker shop. Same-day for urgent calls in most of the Franktown area.',
    utility: {
      name: 'CORE Electric Cooperative',
      verify: true,
      note: 'Franktown is generally CORE Electric Cooperative territory. Rural addresses east and south can differ, so confirm yours before relying on any rebate program.',
    },
    permitAuthority: 'Douglas County Building Division',
    permitProcess:
      'Franktown is unincorporated Douglas County, so the county building division permits and inspects electrical work. Acreage properties add wrinkles a subdivision does not have: well pumps, septic controls, detached shops and barns, and long buried feeds between buildings. All of those are permitted work. We file with Douglas County, coordinate CORE for any service change, and meet the inspector.',
    housingStock:
      'Franktown is rural Douglas County, which changes the electrical picture entirely. Properties are on acreage, many on well and septic, and a lot of homes have detached shops, barns or garages fed by buried runs that were installed decades ago and never inspected since. Well pumps are the critical load nobody thinks about until the power goes out and there is no water, which is why standby generators are far more common here than in town. Panel work often means an outdoor meter main plus interior sub-panels rather than a single indoor panel.',
    neighborhoods: ['Franktown', 'Russellville', 'Bell Mountain', 'Ponderosa Park', 'Cherry Creek Valley'],
    priorityServices: [
      'generator-installation',
      'panel-upgrade',
      'emergency-electrician',
      'electrical-inspection',
    ],
    lead:
      'Franktown is about 15 minutes out and it is acreage country. Well pumps, detached shops, buried feeds and standby generators make up most of the work here, and those are jobs that need someone who has actually done them rather than someone guessing.',
    overview:
      'Franktown work is rural work, and it is genuinely different from a subdivision call. Properties sit on acreage, most are on well and septic, and the electrical system is usually spread across more than one building: a meter main outside, a panel in the house, a sub-panel in a shop or barn, and buried feeds between them that in many cases went in decades ago. Two things follow from that. First, when the power goes out here you also lose water, because the well pump is electric, which is why standby generators are far more common in Franktown than in town and why sizing them around the pump, furnace and septic controls matters. Second, fault-finding takes longer, because a problem can be anywhere along a few hundred feet of buried run rather than inside four walls. We price that honestly rather than quoting a subdivision rate and then adding to it.',
    driveTimeContext: 'About 15 minutes from our Parker shop, straight out Parker Road.',
    faqs: [
      {
        q: 'Do you cover acreage properties with outbuildings?',
        a: 'Yes, and it is a lot of what we do in Franktown. Feeds to shops, barns and detached garages, sub-panels at the far end, and the buried runs in between are all standard work for us. They do need a permit, correct burial depth and a disconnect at the building being fed.',
      },
      {
        q: 'My well pump stops when the power goes out. What are my options?',
        a: 'A standby generator sized to include the well pump is the usual answer, and it does not have to be a whole-home unit. Covering the pump, the furnace, septic controls and a handful of circuits is often the sensible buy. We will size it around what you actually need to keep running.',
      },
      {
        q: 'Something is wrong between the house and the shop. Can you find it?',
        a: 'Yes. Faults in buried runs are common out here, usually from age, rodent damage, or a trench dug by someone who did not know the feed was there. We trace the actual fault rather than trenching the whole run on spec, and we tell you honestly when replacement is cheaper than repair.',
      },
      {
        q: 'Is Franktown permitted through Douglas County?',
        a: 'Yes. Franktown is unincorporated, so the Douglas County Building Division handles permits and inspections. We file and meet the inspector so you do not have to be there.',
      },
    ],
    heroImageBrief:
      'A rural Franktown, Colorado acreage property with a house, a detached metal shop building and open grassland, mountains distant, clear light. 16:9.',
  },

  {
    slug: 'elizabeth',
    name: 'Elizabeth',
    county: 'Elbert',
    tier: 2,
    driveTimeMin: 25,
    responseExpectation:
      'About 25 minutes from the Parker shop. Same-day for urgent calls where the schedule allows, otherwise next business day.',
    utility: {
      name: 'CORE Electric Cooperative or Mountain View Electric',
      verify: true,
      note: 'Elizabeth sits near a utility boundary: some addresses are CORE Electric Cooperative, others are Mountain View Electric Association. This genuinely changes which rebates apply, so we confirm your provider from a recent bill before quoting rebate-dependent work.',
    },
    permitAuthority: 'Town of Elizabeth or Elbert County',
    permitProcess:
      'Addresses inside Elizabeth town limits permit through the Town of Elizabeth. Properties outside town limits go through Elbert County instead, and the boundary is not obvious from the road. We determine which applies to your address before filing. Panel and service work, generators, well pump circuits, EV chargers and outbuilding feeds are all permitted work in both jurisdictions.',
    housingStock:
      'Elizabeth is a mix of an older small-town core and newer acreage development around it. In town you find mid-century homes with original panels and occasionally ungrounded circuits. Outside town it is rural: well and septic, detached shops and barns, long buried feeds, and homes that were built or added onto in stages, which tends to leave a patchwork of panels and sub-panels rather than one clean system. Outages are more noticeable here than in the metro, so generators come up often.',
    neighborhoods: ['Downtown Elizabeth', 'Gold Creek Valley', 'Sun Country', 'Pine Ridge', 'Spring Valley Ranch'],
    priorityServices: [
      'generator-installation',
      'panel-upgrade',
      'electrical-inspection',
      'emergency-electrician',
    ],
    lead:
      'Elizabeth is about 25 minutes out in Elbert County. Work here is mostly rural: generators, well pump circuits, outbuilding feeds and panel upgrades on homes that have been added onto over the years.',
    overview:
      'Elizabeth is far enough out that a lot of metro electricians will not make the drive, which is exactly why we get called. The work splits two ways. In the older town core, it is mid-century homes with original equipment, where the honest first step is often an inspection rather than a quote, because what needs doing is not obvious until the panel cover comes off. Outside town it is acreage: well and septic, detached shops, buried feeds, and houses that grew in stages over decades, which typically leaves a patchwork of panels and sub-panels that nobody has ever documented. Two practical notes for Elizabeth specifically. Permits may be Town of Elizabeth or Elbert County depending on which side of the town boundary you are on, and the utility may be CORE or Mountain View Electric, which changes your rebate eligibility. We confirm both before quoting rather than guessing.',
    driveTimeContext: 'About 25 minutes from our Parker shop. We schedule Elizabeth work in blocks where we can.',
    faqs: [
      {
        q: 'Do you actually come out to Elizabeth?',
        a: 'Yes. It is about 25 minutes from the Parker shop and it is on our regular service-area list. For scheduled work we will often group Elizabeth jobs into the same run, which is also why booking a little further ahead gets you a better window here than in Parker.',
      },
      {
        q: 'Is Elizabeth on CORE or Mountain View Electric?',
        a: 'It depends on your address, the boundary runs through the area. It matters because rebate and time-of-use programs differ between the two. The quickest way to settle it is a recent bill, and we will check before quoting anything rebate-dependent.',
      },
      {
        q: 'Town of Elizabeth or Elbert County for permits?',
        a: 'Inside town limits it is the Town of Elizabeth; outside it is Elbert County. The line is not obvious from the street, so we confirm your parcel before filing rather than submitting to the wrong office and losing a week.',
      },
      {
        q: 'My house has been added onto and the wiring is a mess. Where do we start?',
        a: 'An inspection, honestly. Homes that grew in stages usually have multiple panels, abandoned circuits and undocumented runs. Mapping what is actually there first means the upgrade quote you get is real rather than a number that changes once we open things up.',
      },
    ],
    heroImageBrief:
      'A rural property outside Elizabeth, Colorado in Elbert County, ranch-style home on acreage with a detached shop and open prairie, big sky. 16:9.',
  },

  {
    slug: 'elbert',
    name: 'Elbert',
    county: 'Elbert',
    tier: 2,
    driveTimeMin: 35,
    responseExpectation:
      'About 35 minutes from the Parker shop. Scheduled work is easiest to arrange; urgent calls depend on the day.',
    utility: {
      name: 'Mountain View Electric Association',
      verify: true,
      note: 'The Elbert area is generally Mountain View Electric Association rather than CORE or Xcel. Confirm from a recent bill, since the surrounding boundaries are irregular and rebate programs differ by provider.',
    },
    permitAuthority: 'Elbert County',
    permitProcess:
      'Elbert is unincorporated, so Elbert County handles permits and inspections. Rural work here is heavy on the things acreage properties need: well pump circuits, generator interlocks and transfer switches, outbuilding feeds and service replacements. All of it is permitted work. We file with the county and meet the inspector rather than leaving it with you.',
    housingStock:
      'Elbert is genuinely rural. Properties sit on significant acreage, almost everything is on well and septic, and outbuildings are the rule rather than the exception. Homes here vary widely in age and in how they were built, including owner-built and stage-built construction, so there is no single typical electrical setup. What is consistent is exposure: long overhead or buried service runs, more weather events reaching the equipment, and outages that last longer than they do in town because there are simply fewer customers on the line.',
    neighborhoods: ['Elbert', 'Kiowa Creek', 'Running Creek', 'Fondis'],
    priorityServices: [
      'generator-installation',
      'panel-upgrade',
      'emergency-electrician',
      'electrical-inspection',
    ],
    lead:
      'Elbert is about 35 minutes out and it is true acreage country. Generators, well pump circuits, transfer switches and outbuilding feeds are the bulk of the work, and outages here last long enough that backup power is a practical purchase rather than a luxury.',
    overview:
      'Elbert is the furthest point we regularly serve, and we are upfront about what that means: scheduled work is straightforward to arrange, while same-day emergency coverage depends on where the day already has us. What brings us out here is rural infrastructure. Almost every property is on a well, which means no power equals no water, and rural lines are restored after town lines simply because fewer customers are affected. That combination is why backup power in Elbert is a practical purchase rather than a luxury, and why a transfer switch or interlock done properly matters: back-feeding a generator through an unprotected connection is genuinely dangerous to you and to the lineman working on the circuit. Beyond generators, the common work is service replacements, outbuilding feeds, and sorting out homes that were built or expanded in stages.',
    driveTimeContext: 'About 35 minutes from our Parker shop, the outer edge of our regular service area.',
    faqs: [
      {
        q: 'Is Elbert too far for you to service?',
        a: 'No, but we are straight with you about it. It is roughly 35 minutes, so scheduled work is easy to arrange and we will usually group Elbert jobs into one run. Same-day emergency coverage depends on where the day already has us, and we will tell you honestly when we cannot make it rather than leaving you waiting.',
      },
      {
        q: 'What size generator do I need out here?',
        a: 'It depends on what you genuinely need running, and the well pump is the load people forget. A unit covering the pump, furnace, septic controls, refrigeration and some lighting is often the right buy rather than whole-home coverage. We size it around your actual well pump rating, not a guess.',
      },
      {
        q: 'Can I just back-feed a portable generator into a dryer outlet?',
        a: 'Please do not. Back-feeding without a proper transfer switch or interlock can push power back onto the utility line and injure the lineman working to restore it, and it puts your own wiring at risk. A permitted interlock kit or transfer switch is not expensive and it makes the whole thing safe and legal.',
      },
      {
        q: 'Who permits electrical work in Elbert?',
        a: 'Elbert County, since the area is unincorporated. We file the permit and meet the inspector on site.',
      },
    ],
    heroImageBrief:
      'Open prairie acreage near Elbert, Colorado with a ranch home, outbuildings and a long gravel drive, wide sky, late day light. 16:9.',
  },

  {
    slug: 'foxfield',
    name: 'Foxfield',
    county: 'Arapahoe',
    tier: 2,
    driveTimeMin: 15,
    responseExpectation:
      'About 15 minutes from the Parker shop. Same-day for urgent calls during business hours.',
    utility: {
      name: 'Xcel Energy',
      verify: true,
      note: 'Foxfield is generally Xcel Energy territory rather than CORE, unlike the Douglas County areas just south. That changes which rebate programs apply, so confirm your provider before relying on one.',
    },
    permitAuthority: 'Town of Foxfield with Arapahoe County inspection',
    permitProcess:
      'Foxfield is a small incorporated town that works alongside Arapahoe County for building services, so electrical permits and inspections generally route through the county process. Horse-property features matter here: barn and loafing-shed feeds, arena or exterior lighting, well and pump circuits, and automatic gates are all permitted work. We confirm the current filing route for your address before starting rather than assuming.',
    housingStock:
      'Foxfield is large-lot horse property, roughly one to five acres per home, which makes it electrically unusual for how close it sits to the metro. Most homes are 1980s through 2000s, generally in sound condition, but the load is spread across more than the house: barns, loafing sheds, tack rooms, arena lighting, gates, and water systems. Buried feeds between buildings are the norm, and those runs are where most problems eventually appear.',
    neighborhoods: ['Foxfield', 'Arapahoe Hunt', 'Piney Creek', 'Saddle Rock'],
    priorityServices: [
      'panel-upgrade',
      'outlet-repair',
      'electrical-inspection',
      'emergency-electrician',
    ],
    lead:
      'Foxfield is about 15 minutes from the shop and it is horse-property country: barns, arena lighting, gates and buried feeds between buildings alongside the usual work inside the house.',
    overview:
      'Foxfield is unusual for how rural it feels given how close it is to the metro. These are one to five acre horse properties, and the electrical system almost always extends well past the house: a barn or loafing shed with its own sub-panel, tack room circuits, arena or exterior lighting, automatic gates, and water or pump equipment. The houses themselves are mostly 1980s through 2000s and generally in decent shape, so the calls tend to come from everything else. Buried feeds between buildings are where problems eventually surface, whether from age, rodent damage, or a trench dug by someone who did not know the run was there. Worth knowing: unlike the Douglas County areas just south, Foxfield is generally Xcel rather than CORE, which changes your rebate eligibility.',
    driveTimeContext: 'About 15 minutes from our Parker shop.',
    faqs: [
      {
        q: 'Do you do barn and outbuilding electrical work?',
        a: 'Yes, and it is a lot of what Foxfield calls are. Sub-panels in barns, tack room circuits, exterior and arena lighting, gate feeds and water system circuits are all standard work. Buildings fed from the house need a permit, correct burial depth and a disconnect at the far end.',
      },
      {
        q: 'Is Foxfield on Xcel or CORE?',
        a: 'Generally Xcel Energy, which differs from the Douglas County areas just to the south. It matters for rebate eligibility on things like EV chargers, so we confirm from your bill before quoting anything rebate-dependent.',
      },
      {
        q: 'Lights in the barn dim when the well pump kicks on. Is that a problem?',
        a: 'It is worth looking at. Some voltage drop on pump start is normal, but pronounced dimming can point to an undersized or aging feed to the outbuilding, or a loose connection somewhere in the run. Both are fixable, and the loose connection version is the one you want found early.',
      },
      {
        q: 'Who handles permits in Foxfield?',
        a: 'Foxfield is a small town that works alongside Arapahoe County for building services, so inspections generally route through the county. We confirm the current process for your address and handle the filing.',
      },
    ],
    heroImageBrief:
      'A Foxfield, Colorado horse property at golden hour, white fencing, a barn with exterior lights on, a house set back on acreage. 16:9.',
  },

  {
    slug: 'dove-valley',
    name: 'Dove Valley',
    county: 'Arapahoe',
    tier: 2,
    driveTimeMin: 14,
    responseExpectation:
      'About 14 minutes from the Parker shop. Same-day for urgent residential calls during business hours.',
    utility: {
      name: 'Xcel Energy',
      verify: true,
      note: 'Dove Valley is generally Xcel Energy territory. Confirm your address before relying on a rebate program, since nearby Douglas County addresses are on CORE instead.',
    },
    permitAuthority: 'Arapahoe County',
    permitProcess:
      'Dove Valley is unincorporated Arapahoe County, so the county building division permits and inspects electrical work. Panel and service upgrades, EV chargers, hot tub circuits and generator installs all require a permit. We file with Arapahoe County, coordinate the utility on service work, and meet the inspector.',
    housingStock:
      'Dove Valley sits near Centennial Airport and mixes residential pockets with business park development. The homes are mostly 1980s through 2000s on standard lots, generally sound, with the usual pattern for that era: panels sized before EVs and hot tubs were common, and original 100A or 150A services that are now working harder than they were designed to. Because the area is close to the airport and major corridors, finished basements and home offices are common, and those additions are a frequent trigger for needing more circuits than the panel has room for.',
    neighborhoods: ['Dove Valley', 'Piney Creek', 'Saddle Rock', 'Antelope'],
    priorityServices: [
      'panel-upgrade',
      'ev-charger-installation',
      'outlet-repair',
      'emergency-electrician',
    ],
    lead:
      'Dove Valley is about 14 minutes from the shop. Most of the residential work here is panel capacity: making room for an EV charger, a hot tub, or a finished basement in a home built before any of those were standard.',
    overview:
      'Dove Valley sits right next to Centennial Airport, mixing residential streets with business-park development, and the residential work follows a familiar Front Range pattern. Homes are largely 1980s through 2000s, structurally and electrically sound, running original 100A or 150A services that were sized for a very different household. Finished basements and home offices are especially common here, and both are reliable triggers for discovering that the panel has no room left. The fix is usually straightforward and the honest version of it starts with a load calculation, because the answer is sometimes a 200A heavy-up and sometimes just rebalancing what is already there. One local note: Dove Valley is Xcel territory while addresses a few minutes south in Douglas County are on CORE, which trips people up on rebates.',
    driveTimeContext: 'About 14 minutes from our Parker shop.',
    faqs: [
      {
        q: 'Is Dove Valley permitted through Arapahoe County?',
        a: 'Yes. Dove Valley is unincorporated Arapahoe County, so the county building division handles permits and inspections. We file and meet the inspector.',
      },
      {
        q: 'I am finishing a basement. How many circuits will I need?',
        a: 'It depends on the layout, but a finished basement typically needs dedicated circuits for general receptacles, lighting, and often a bathroom or wet bar, with AFCI and GFCI protection as required. The question underneath it is usually whether your panel has room, which a load calculation answers before you frame anything.',
      },
      {
        q: 'Is Dove Valley on Xcel or CORE?',
        a: 'Generally Xcel Energy, unlike Douglas County addresses just south of here, which are on CORE. It matters for rebates on EV chargers and similar work, so we confirm before quoting.',
      },
      {
        q: 'Can you add an EV charger in my garage?',
        a: 'Usually yes. The load calculation comes first to confirm your service supports it, then it is a dedicated circuit, the right breaker, and a permit with Arapahoe County. We handle the permit and inspection as part of the job.',
      },
    ],
    heroImageBrief:
      'A residential street in the Dove Valley area of Arapahoe County, Colorado, 1990s two-story homes, mature landscaping, clear afternoon light. 16:9.',
  },

  {
    slug: 'aurora',
    name: 'Aurora',
    county: 'Arapahoe',
    tier: 2,
    driveTimeMin: 22,
    responseExpectation:
      'About 22 minutes to south Aurora from the Parker shop. Same-day for urgent calls where the schedule allows.',
    utility: {
      name: 'Xcel Energy',
      verify: true,
      note: 'Aurora is predominantly Xcel Energy territory. Confirm your address before relying on a rebate, since the city spans three counties and utility boundaries do not follow city limits.',
    },
    permitAuthority: 'City of Aurora Building Division',
    permitProcess:
      'Aurora runs its own building division, separate from Arapahoe, Adams or Douglas County. Panel and service upgrades, EV chargers, hot tubs, generators and new circuits are permitted and inspected through the city. Aurora is one of the more process-driven jurisdictions we work in, so we file early, coordinate the utility for service work, and meet the inspector rather than leaving scheduling to you.',
    housingStock:
      'Aurora is large enough that there is no single answer, so what matters is which part you are in. We focus on south Aurora, the part closest to Parker. Much of it is 1990s through 2010s construction in good condition, where the work is capacity driven: EV chargers, hot tubs, finished basements pushing an original panel past what it was sized for. Older sections north and west carry mid-century housing with original panels, ungrounded circuits and occasionally aluminum branch wiring, which is inspection and repair territory rather than upgrade territory.',
    neighborhoods: ['Southshore', "Tallyn's Reach", 'Saddle Rock', 'Blackstone', 'Beacon Point', 'Wheatlands'],
    priorityServices: [
      'panel-upgrade',
      'ev-charger-installation',
      'emergency-electrician',
      'electrical-inspection',
    ],
    lead:
      'We cover south Aurora, roughly 22 minutes from the Parker shop. Most of the work there is panel capacity and EV charger installs in 1990s to 2010s homes, plus inspections when people are buying into the older sections.',
    overview:
      'Aurora is a big city spanning three counties, so the useful thing to say is which part of it we serve and what the work actually looks like there. We cover south Aurora, the side nearest Parker, roughly 22 minutes from the shop. Neighborhoods like Southshore, Tallyn\'s Reach, Blackstone and Beacon Point are mostly 1990s through 2010s construction in sound condition, where calls are capacity driven: a Level 2 EV charger, a hot tub, or a finished basement asking more of a panel than it was sized to give. Older sections further north and west are a different job entirely, mid-century homes where original panels, ungrounded circuits and sometimes aluminum branch wiring mean an inspection is the honest first step rather than a quote. One practical note: Aurora permits through its own city building division, not the county, and it is a more process-driven jurisdiction than most, so we file early to keep timelines realistic.',
    neighborhoodNotes: [
      {
        name: 'Southshore',
        note: 'Newer construction around Aurora Reservoir, mostly EV charger and finished-basement circuit work.',
      },
      {
        name: "Tallyn's Reach",
        note: 'Late 1990s and 2000s homes now hitting the point where panel capacity limits what can be added.',
      },
    ],
    driveTimeContext: 'About 22 minutes from our Parker shop to south Aurora.',
    faqs: [
      {
        q: 'Which parts of Aurora do you serve?',
        a: 'South Aurora primarily, the side closest to Parker, including Southshore, Tallyn\'s Reach, Saddle Rock, Blackstone, Beacon Point and Wheatlands. For addresses much further north or west, call and we will tell you honestly whether we are the right fit or whether someone closer serves you better.',
      },
      {
        q: 'Does Aurora permit through the county?',
        a: 'No. Aurora has its own building division, even though the city spans Arapahoe, Adams and Douglas counties. We file with the city and handle the inspection scheduling.',
      },
      {
        q: 'Can you install an EV charger in a Tallyn\'s Reach or Southshore home?',
        a: 'Yes, and it is one of our most common Aurora jobs. A load calculation confirms your existing service supports the charger, then it is a dedicated circuit, the correct breaker, a city permit and an inspection. If the panel is already full, we will tell you that before you buy the charger, not after.',
      },
      {
        q: 'I am buying an older Aurora home. Is an inspection worth it?',
        a: 'In the older sections, yes. Mid-century homes can have original panels, ungrounded two-prong circuits, or aluminum branch wiring, and none of that shows up meaningfully in a general home inspection. A licensed electrical inspection opens the panel and tells you what you are actually buying.',
      },
    ],
    heroImageBrief:
      'A south Aurora, Colorado residential street of 2000s-era homes near Aurora Reservoir, open sky, clear morning light. 16:9.',
  },

  {
    slug: 'englewood',
    name: 'Englewood',
    county: 'Arapahoe',
    tier: 2,
    driveTimeMin: 26,
    responseExpectation:
      'About 26 minutes from the Parker shop. Scheduled work is easiest to arrange; same-day urgent calls depend on the day.',
    utility: {
      name: 'Xcel Energy',
      verify: true,
      note: 'Englewood is Xcel Energy territory. Rebate programs differ from the CORE areas in Douglas County, so guidance written for Parker does not transfer directly.',
    },
    permitAuthority: 'City of Englewood',
    permitProcess:
      'Englewood runs its own building division. Because the housing stock is older, service and panel replacements are a large share of permitted work here, and those require utility coordination for the disconnect and reconnect as well as a city inspection. Knob-and-tube remediation and rewiring are also permitted work. We file with the City of Englewood, coordinate Xcel, and meet the inspector.',
    housingStock:
      'Englewood is genuinely old housing by Front Range standards, much of it built from the 1940s through the 1960s, with pockets older still. That means the electrical issues here are different from the newer suburbs: original fuse panels or early breaker panels, 60A or 100A services that are badly undersized for modern use, ungrounded two-prong outlets throughout, cloth-insulated wiring, and in the oldest homes, surviving knob-and-tube. Bungalows and small ranches dominate, and many have been partially updated over the decades, which leaves a mix of old and new work in the same house.',
    neighborhoods: ['Englewood', 'Cherry Hills Village', 'Broadway', 'Old Englewood', 'Centennial Acres'],
    priorityServices: [
      'panel-upgrade',
      'electrical-inspection',
      'outlet-repair',
      'emergency-electrician',
    ],
    lead:
      'Englewood is about 26 minutes from the shop, and the work there is older-home work: service upgrades from 60A or 100A, grounding, ungrounded outlet replacement, and inspections on homes that have been partly updated over the decades.',
    overview:
      'Englewood is the oldest housing stock we regularly work in, and that changes the job completely. Much of the city dates from the 1940s through the 1960s, so instead of capacity problems you get condition problems: original fuse or early breaker panels, 60A and 100A services that are genuinely undersized rather than merely tight, ungrounded two-prong outlets throughout, cloth-insulated conductors, and in the oldest homes surviving knob-and-tube. Most of these houses have also been partially updated at some point, which leaves a patchwork where a modern kitchen circuit runs off a panel that has not been touched since the Eisenhower administration. The honest starting point in Englewood is usually an inspection rather than a quote, because a realistic upgrade price depends on what is actually behind the walls and in the panel, and that is not visible from the outside.',
    driveTimeContext: 'About 26 minutes from our Parker shop. Scheduled Englewood work is easiest to book ahead.',
    faqs: [
      {
        q: 'My Englewood home still has two-prong outlets. What are my options?',
        a: 'Three, honestly. Running a proper ground is the best answer where it is feasible. A GFCI-protected replacement labeled "no equipment ground" is a code-compliant middle path. Replacing the outlet with a grounded one and no actual ground is the one thing you should not do, and it is unfortunately common. We will tell you which applies circuit by circuit.',
      },
      {
        q: 'Do I need to remove knob-and-tube wiring?',
        a: 'Not always all of it, but any that is still energized, buried in insulation, or spliced into modern work needs addressing, and insurers increasingly ask about it. We map what is actually still live rather than quoting a whole-house rewire by default, because in many homes a good portion was abandoned in place years ago.',
      },
      {
        q: 'Is a 100A service enough for an older Englewood home?',
        a: 'Sometimes, depending on what the house runs. Where it is not enough is when you add central air, an EV charger, or a modern kitchen. A load calculation gives you a real answer rather than a rule of thumb, and it is worth doing before committing to a remodel.',
      },
      {
        q: 'Do you cover Englewood for emergencies?',
        a: 'Yes, though we are straight about the drive: it is about 26 minutes, so same-day urgent coverage depends on where the day already has us. Scheduled work is easy to arrange. We are open weekdays 8am to 6pm.',
      },
    ],
    heroImageBrief:
      'A tree-lined street of 1950s brick bungalows in Englewood, Colorado, mature trees, established front gardens, soft light. 16:9.',
  },

  {
    slug: 'littleton',
    name: 'Littleton',
    county: 'Arapahoe',
    tier: 2,
    driveTimeMin: 30,
    responseExpectation:
      'About 30 minutes from the Parker shop. Best booked as scheduled work; same-day urgent calls depend on the day.',
    utility: {
      name: 'Xcel Energy',
      verify: true,
      note: 'Littleton is predominantly Xcel Energy territory. Because the city touches Arapahoe, Jefferson and Douglas counties, confirm both your utility and your permitting jurisdiction rather than assuming from the mailing address.',
    },
    permitAuthority: 'City of Littleton, or the county for addresses outside city limits',
    permitProcess:
      'Addresses inside Littleton city limits permit through the City of Littleton. A Littleton mailing address does not always mean you are inside city limits, though, since the area spans Arapahoe, Jefferson and Douglas counties, and unincorporated addresses go through the relevant county instead. We confirm your parcel first. Service and panel replacements, rewiring, EV chargers and generators are all permitted and inspected work.',
    housingStock:
      'Littleton spans a wide range. Historic downtown and the older established neighborhoods carry pre-1960 homes where original panels, ungrounded circuits and occasionally knob-and-tube still turn up, and those are inspection and rewiring jobs. The large 1970s and 80s neighborhoods in between are the sweet spot for panel upgrades, since original services are now well past the point where they comfortably carry modern loads. Newer development to the south and west is mostly capacity work, EV chargers and basement circuits.',
    neighborhoods: ['Downtown Littleton', 'Ken Caryl', 'Columbine', 'Southglenn', 'Highlands Ranch border', 'Roxborough'],
    priorityServices: [
      'panel-upgrade',
      'electrical-inspection',
      'ev-charger-installation',
      'emergency-electrician',
    ],
    lead:
      'Littleton is about 30 minutes from the shop and it covers a lot of ground electrically, from pre-1960 homes downtown that need inspections and rewiring to 1970s and 80s neighborhoods where the original panel has finally run out of room.',
    overview:
      'Littleton covers more electrical ground than almost anywhere else we serve, because the housing runs from pre-1960 to brand new. Historic downtown and the older established streets are condition work: original panels, ungrounded circuits, cloth-insulated conductors and occasionally knob-and-tube, where an inspection is the sensible first step before anyone quotes an upgrade. The big 1970s and 80s neighborhoods in between are where most of our Littleton panel work happens, because those original services are now decades past the load they were designed around. Newer development south and west is straightforward capacity work, mostly EV chargers and basement circuits. One thing genuinely worth checking before anything else: a Littleton mailing address does not guarantee you are inside city limits, and the area touches three counties, so the permitting office depends on your actual parcel rather than your mail.',
    driveTimeContext: 'About 30 minutes from our Parker shop, so Littleton work is best booked as a scheduled visit.',
    faqs: [
      {
        q: 'Do you serve Littleton, given the drive?',
        a: 'Yes, it is on our service-area list. At about 30 minutes it is best booked as scheduled work, and we will usually group Littleton jobs into the same run. For a genuine emergency we will tell you honestly whether we can get there today or whether you are better served by someone closer.',
      },
      {
        q: 'Is my Littleton address in the city or the county?',
        a: 'Worth checking, because it decides who permits your job. A Littleton mailing address can still be unincorporated Arapahoe, Jefferson or Douglas County. We confirm the parcel before filing so the permit does not go to the wrong office.',
      },
      {
        q: 'My 1970s Littleton home keeps tripping breakers. Upgrade or repair?',
        a: 'Usually capacity rather than a fault, and that era is the most common panel upgrade we do here. A load calculation tells you whether a 200A heavy-up is genuinely needed or whether rebalancing circuits fixes it. We would rather sell you the smaller answer if it works.',
      },
      {
        q: 'Do older downtown Littleton homes still have knob-and-tube?',
        a: 'Some do, often partially abandoned rather than fully live. Any that is still energized, buried in insulation, or spliced into newer work needs attention, and insurers increasingly ask. We map what is actually live before recommending scope.',
      },
    ],
    heroImageBrief:
      'A historic residential street near downtown Littleton, Colorado, early 20th century homes with porches, mature trees, warm afternoon light. 16:9.',
  },

  /* ─────────────────────────────────────────────────────────────────────────
   * Tier 3, added 2026-09-14.
   *
   * These five are NOT on the client's published service-area page, but all
   * five carry real Search Console demand against the legacy site (Lakewood is
   * the single strongest non-Tier-1 signal in the whole dataset: 455 impressions
   * on panel services, 395 on outlets, 294 on safety inspections). The client
   * confirmed on 2026-09-14 that Allsafe does service them, so they get real
   * pages rather than staying redirects.
   *
   * All five sit outside Douglas County, which means Xcel rather than CORE and
   * a different permit office in each case. Both facts carry verify flags,
   * because getting either wrong costs a customer a rebate or a failed
   * inspection.
   * ───────────────────────────────────────────────────────────────────────── */

  {
    slug: 'acres-green',
    name: 'Acres Green',
    county: 'Douglas',
    tier: 2,
    driveTimeMin: 12,
    responseExpectation:
      'About 12 minutes from the Parker shop. Same-day for urgent calls, often within two hours during business hours.',
    utility: {
      name: 'CORE Electric Cooperative',
      verify: true,
      note: 'Acres Green is generally CORE Electric Cooperative rather than Xcel, like most of Douglas County. Confirm your address before relying on any rebate written for Xcel customers.',
    },
    permitAuthority: 'Douglas County Building Division',
    permitProcess:
      'Acres Green is unincorporated Douglas County, so permits go through the county rather than a city office. Panel and service upgrades, EV chargers, hot tub circuits and generators all require a permit and inspection. We file with Douglas County, coordinate CORE for service work, and meet the inspector.',
    housingStock:
      'Acres Green is a compact 1970s and early 80s subdivision just north of Lone Tree, and the housing is unusually consistent for the area: single-family homes on modest lots, most still on their original service. That era means 100A panels are common, grounding is sometimes partial, and a fair number of homes still have the panel brands that era installed. Because the neighborhood sits close to the Lincoln Avenue corridor, a lot of owners here are adding EV charging, which is where the original panel size becomes the limiting factor.',
    neighborhoods: ['Acres Green', 'Lincoln Park', 'Bradbury Ranch'],
    priorityServices: ['panel-upgrade', 'ev-charger-installation', 'electrical-inspection', 'emergency-electrician'],
    lead:
      'Acres Green is twelve minutes from the shop and it is one of the more predictable neighborhoods we work in: 1970s and 80s homes, mostly original panels, and a steady stream of EV charger and panel capacity work.',
    overview:
      'Acres Green is a small, self-contained 1970s and 80s subdivision, which makes the electrical picture unusually consistent. Almost everything here was built within a narrow window, so homes tend to share the same original 100A service, the same grounding practices, and in a number of cases the same panel brands that era favored. None of that is automatically a problem, but it does mean a very high proportion of our calls here resolve into the same two jobs: a capacity upgrade, or replacing a panel that should not still be in service. The other driver is location. Acres Green sits right by the Lincoln Avenue corridor, so EV adoption is high, and a Level 2 charger is exactly the kind of continuous load a 1970s panel was never sized for. We do the load calculation before quoting, because sometimes the honest answer is that you have room already.',
    driveTimeContext: 'About 12 minutes from our Parker shop.',
    faqs: [
      {
        q: 'Is Acres Green permitted through Douglas County or Lone Tree?',
        a: 'Douglas County. Acres Green is unincorporated, so despite sitting right next to Lone Tree it does not use the city building department. We confirm the parcel before filing.',
      },
      {
        q: 'My 1970s home has a 100A panel. Can I add an EV charger?',
        a: 'Sometimes, and the load calculation is what settles it. A Level 2 charger is a large continuous load, so whether your existing service carries it depends on what else the house runs. We do that math first rather than selling you an upgrade you may not need.',
      },
      {
        q: 'Is Acres Green on CORE or Xcel?',
        a: 'Generally CORE Electric Cooperative, like most of Douglas County. It matters because EV charger and heat pump rebates differ between providers, and most Colorado rebate articles online assume Xcel.',
      },
      {
        q: 'Should I have the panel checked before buying here?',
        a: 'It is worth it in this neighborhood specifically, because the housing is all from one era and that era has known panel issues. An electrical inspection opens the cover and tells you what brand and what condition, which a general home inspection will not.',
      },
    ],
    heroImageBrief:
      'A 1970s single-family home on a modest lot in the Acres Green area of Douglas County Colorado, mature trees, clear light. 16:9.',
  },

  {
    slug: 'greenwood-village',
    name: 'Greenwood Village',
    county: 'Arapahoe',
    tier: 2,
    driveTimeMin: 18,
    responseExpectation:
      'About 18 minutes from the Parker shop. Same-day for urgent calls, next-day for scheduled work.',
    utility: {
      name: 'Xcel Energy',
      verify: true,
      note: 'Greenwood Village is Xcel Energy territory, unlike the Douglas County towns to the south which are on CORE. Rebate eligibility differs accordingly, so confirm from a recent bill.',
    },
    permitAuthority: 'City of Greenwood Village',
    permitProcess:
      'Greenwood Village runs its own building division. Panel and service work, EV chargers, generators, hot tubs and landscape lighting circuits are permitted and inspected by the city. Several neighborhoods also carry HOA architectural review, which is separate from the permit and applies to anything visible outside. We file the city permit and flag when an HOA submittal is likely needed too.',
    housingStock:
      'Greenwood Village spans large-lot estates and established 1970s through 1990s neighborhoods, with a commercial core along the Tech Center corridor that we do not serve. On the residential side the systems are bigger than average: 200A services are common, sub-panels are frequent, and there is usually substantial exterior work, landscape lighting, gate feeds, pool and spa circuits, water features. Older estates on acreage often have long buried runs between the house and outbuildings that were installed decades ago.',
    neighborhoods: ['Greenwood Village', 'Cherry Hills Village', 'Preston Hollow', 'Greenwood Hills', 'The Preserve'],
    priorityServices: ['panel-upgrade', 'generator-installation', 'electrical-inspection', 'ev-charger-installation'],
    lead:
      'Greenwood Village is about 18 minutes from the shop. The homes are larger than average and so are the electrical systems, with more exterior lighting, more sub-panels and more generator work than a standard subdivision.',
    overview:
      'Greenwood Village is an estate market, and residential electrical work there reflects it. Services are usually already 200A, sub-panels are normal rather than exceptional, and the majority of what goes wrong is outside the house: landscape and architectural lighting, gate and driveway feeds, pool and spa circuits, and buried runs to outbuildings. Those are the components that take twenty Colorado winters of freeze and thaw, and they fail long before interior wiring does. Two practical local notes. Greenwood Village permits through its own city building division rather than Arapahoe County, and it is Xcel territory while the Douglas County towns a few minutes south are on CORE, which regularly trips people up on rebate eligibility. We confirm both before quoting. Note that we are a strictly residential contractor, so the Tech Center commercial corridor is outside what we do.',
    driveTimeContext: 'About 18 minutes from our Parker shop.',
    faqs: [
      {
        q: 'Do you work on the large estate properties here?',
        a: 'Yes, on the residential side. Bigger homes usually mean a main panel plus one or more sub-panels, extensive exterior lighting and buried feeds to outbuildings or gates. That is standard work for us, though fault-finding on a long buried run takes longer than a subdivision call and we price that honestly.',
      },
      {
        q: 'Do you take commercial work in the Tech Center?',
        a: 'No. Allsafe is a strictly residential contractor, houses rather than office buildings. If your address is commercial we will tell you straight away rather than taking the job and subcontracting it.',
      },
      {
        q: 'Is Greenwood Village on Xcel or CORE?',
        a: 'Xcel Energy. That differs from Parker, Castle Rock and the rest of Douglas County just south, which are on CORE. It matters for EV charger and heat pump rebate eligibility, so we check before quoting anything rebate-dependent.',
      },
      {
        q: 'Sections of my landscape lighting have stopped working. What causes that?',
        a: 'Usually a failed transformer, a corroded buried splice, or a run nicked during landscaping. It is one of the most common calls we get in this area given how much exterior lighting these properties carry. We trace the actual fault rather than replacing the whole system by default.',
      },
    ],
    heroImageBrief:
      'A large estate home in Greenwood Village, Colorado with mature landscaping and architectural exterior lighting at dusk. 16:9.',
  },

  {
    slug: 'lakewood',
    name: 'Lakewood',
    county: 'Jefferson',
    tier: 2,
    driveTimeMin: 35,
    responseExpectation:
      'About 35 minutes from the Parker shop. Best booked as scheduled work; same-day urgent coverage depends on the day.',
    utility: {
      name: 'Xcel Energy',
      verify: true,
      note: 'Lakewood is Xcel Energy territory. Rebate programs differ from the CORE areas in Douglas County, so guidance written for Parker does not transfer.',
    },
    permitAuthority: 'City of Lakewood',
    permitProcess:
      'Lakewood runs its own building division, separate from Jefferson County. Because a large share of the housing predates 1980, service and panel replacements make up much of the permitted work here, and those need utility coordination for the disconnect and reconnect alongside the city inspection. Rewiring and grounding work is also permitted. We file with the City of Lakewood, coordinate Xcel, and meet the inspector.',
    housingStock:
      'Lakewood is one of the older suburbs on the Front Range and the housing splits sharply by era. The post-war neighborhoods, roughly 1950s through 1970s, carry the classic problems: original or first-replacement panels now well past their service life, 100A services that are undersized for modern use, ungrounded two-prong circuits, and cloth-insulated conductors in the oldest stock. Belmar and the newer infill developments are a different job entirely, mostly capacity work. The volume of older housing is why panel replacement is far and away the most common request we get from this area.',
    neighborhoods: ['Belmar', 'Green Mountain', 'Applewood', 'Glennon Heights', 'Eiber', 'Union Square'],
    priorityServices: ['panel-upgrade', 'electrical-inspection', 'outlet-repair', 'emergency-electrician'],
    lead:
      'Lakewood is about 35 minutes from the shop, and it is panel country. A large share of the housing is 1950s to 1970s, which means original services, ungrounded circuits, and panels that have reached the end of their working life.',
    overview:
      'Lakewood generates more panel-replacement enquiries than anywhere else we cover, and the housing stock explains why. Large parts of the city went up between the 1950s and 1970s, so the typical call involves an original or first-replacement panel that is now decades past its design life, a 100A service that was generous in 1962 and is not now, and ungrounded two-prong circuits throughout. The oldest homes add cloth-insulated conductors to that list. None of it is cause for alarm on its own, but it does mean the honest first step here is often an inspection rather than a quote, because what a realistic upgrade costs depends entirely on what is behind the panel cover and inside the walls. Newer infill around Belmar is straightforward capacity work by comparison. We are upfront about the drive: at roughly 35 minutes, Lakewood is best booked as scheduled work, and we group jobs there into the same run where we can.',
    driveTimeContext: 'About 35 minutes from our Parker shop, so Lakewood work is best booked ahead as a scheduled visit.',
    faqs: [
      {
        q: 'Is Lakewood too far for you?',
        a: 'No, but we are straight about what the distance means. At about 35 minutes, scheduled work is easy to arrange and we group Lakewood jobs into one run where possible. For a genuine same-day emergency we will tell you honestly whether we can get there or whether someone closer serves you better.',
      },
      {
        q: 'My Lakewood home still has a fuse box. Does it have to be replaced?',
        a: 'In practical terms, yes. Fuse boxes are not inherently unsafe when intact, but they cannot support modern loads, most insurers now ask about them, and replacement parts are increasingly hard to source. A panel replacement also gets you grounding and AFCI or GFCI protection that a fuse box cannot provide.',
      },
      {
        q: 'What does an upgrade cost in an older Lakewood home?',
        a: 'It depends on what is found once the cover is off, which is why we recommend starting with an inspection. Service length, meter position, grounding condition and whether the circuits themselves need attention all move the number. You get a fixed written price before any work begins.',
      },
      {
        q: 'Are two-prong outlets a problem?',
        a: 'They indicate ungrounded circuits, which is common in this housing stock. Running a proper ground is best where feasible; a GFCI-protected replacement labeled "no equipment ground" is a code-compliant middle path. Swapping in a three-prong outlet with no actual ground is the one thing to avoid, and it is unfortunately common in homes that have changed hands a few times.',
      },
      {
        q: 'Does Lakewood permit through Jefferson County?',
        a: 'No. The City of Lakewood has its own building division. Only unincorporated addresses nearby go through the county, and we confirm which applies before filing.',
      },
    ],
    heroImageBrief:
      'A 1960s brick ranch home on a tree-lined street in Lakewood, Colorado, established front garden, soft daylight. 16:9.',
  },

  {
    slug: 'edgewater',
    name: 'Edgewater',
    county: 'Jefferson',
    tier: 2,
    driveTimeMin: 38,
    responseExpectation:
      'About 38 minutes from the Parker shop. Scheduled work only in most cases; we will say honestly if we cannot cover an urgent call.',
    utility: {
      name: 'Xcel Energy',
      verify: true,
      note: 'Edgewater is Xcel Energy territory. Confirm from a recent bill before relying on a rebate, since programs differ from the CORE areas we usually work in.',
    },
    permitAuthority: 'City of Edgewater',
    permitProcess:
      'Edgewater is a small city with its own building department. The housing is old enough that most permitted work here is service replacement, rewiring and grounding rather than new circuits, and those need Xcel coordination for the disconnect and reconnect alongside the city inspection. Lot sizes are tight, which occasionally affects where a new meter or panel can go. We file with the City of Edgewater and meet the inspector.',
    housingStock:
      'Edgewater is one of the oldest and most compact housing stocks we work in: small single-family homes on narrow lots, much of it pre-1960 and some considerably older, sitting just east of Sloan Lake. That age brings the full set of older-home electrical issues, original panels, 60A and 100A services, ungrounded circuits, cloth-insulated wiring and surviving knob-and-tube in the oldest properties. A significant amount of the housing has also been renovated in stages over the decades, which tends to leave modern circuits running off equipment that has not been touched in fifty years.',
    neighborhoods: ['Edgewater', 'Sloan Lake', 'West Colfax', 'Lakeside'],
    priorityServices: ['panel-upgrade', 'electrical-inspection', 'outlet-repair', 'emergency-electrician'],
    lead:
      'Edgewater is about 38 minutes out and it is the oldest housing stock we cover. Service upgrades, grounding, and inspections on homes that have been renovated piecemeal over decades make up nearly all the work.',
    overview:
      'Edgewater is small, old and dense, and the electrical work reflects all three. Most of the housing predates 1960 and a good deal predates 1940, so instead of capacity problems you get condition problems: original panels, 60A and 100A services that are genuinely undersized rather than merely tight, ungrounded two-prong circuits throughout, cloth-insulated conductors, and knob-and-tube surviving in the oldest properties. Nearly everything here has also been renovated in stages, which leaves the common Edgewater pattern of a modern kitchen circuit feeding off a panel nobody has opened since the 1950s. The honest starting point is an inspection: a realistic upgrade price depends on what is actually in the walls, and in this housing stock that is not visible from outside. One practical note, lots are narrow, so where a new meter or panel can physically go sometimes shapes the job.',
    driveTimeContext: 'About 38 minutes from our Parker shop, the far edge of our range. Scheduled work suits it best.',
    faqs: [
      {
        q: 'Do you really cover Edgewater from Parker?',
        a: 'Yes, but honestly: at about 38 minutes it is the outer edge of our range and it suits scheduled work rather than emergencies. If you need someone the same hour we will say so rather than leaving you waiting.',
      },
      {
        q: 'Does my Edgewater home have knob-and-tube?',
        a: 'Possibly, in the pre-1940 stock. Often it is partially abandoned rather than fully live. Any that is still energized, buried in insulation, or spliced into modern work needs addressing, and insurers increasingly ask about it. We map what is genuinely still live before recommending scope.',
      },
      {
        q: 'Is a 60A service enough?',
        a: 'Not for a modern household, no. A 60A service predates central air, electric ranges of current draw, and anything resembling modern kitchen loads. If you are renovating, a service upgrade is usually the first line item rather than an optional extra.',
      },
      {
        q: 'My lot is narrow. Does that affect a panel replacement?',
        a: 'It can. Meter and panel placement has clearance requirements, and on tight Edgewater lots the obvious spot is not always a legal one. We check that on site before quoting, so the price you get accounts for where the equipment can actually go.',
      },
    ],
    heroImageBrief:
      'A small pre-1950 single-family home on a narrow lot in Edgewater, Colorado near Sloan Lake, mature street trees. 16:9.',
  },

  {
    slug: 'denver',
    name: 'Denver',
    county: 'Denver',
    tier: 2,
    driveTimeMin: 32,
    responseExpectation:
      'About 32 minutes to south Denver from the Parker shop. Scheduled work is easiest to arrange.',
    utility: {
      name: 'Xcel Energy',
      verify: true,
      note: 'Denver is Xcel Energy territory throughout. Rebate and time-of-use programs differ from the CORE areas in Douglas County, so guidance written for Parker does not apply.',
    },
    permitAuthority: 'Denver Community Planning and Development',
    permitProcess:
      'Denver permits through Community Planning and Development, and it is the most process-heavy jurisdiction we work in. Service and panel replacements, rewiring, EV chargers and new circuits all require permits and inspection, and historic districts add review on anything that changes a street-facing elevation. We file early and coordinate Xcel for service work, because Denver timelines are longer than Douglas County ones and it is better to plan around that than be surprised by it.',
    housingStock:
      'Denver covers more housing eras than anywhere else we serve, so what matters is which part. We focus on south Denver, the side closest to Parker. Older central neighborhoods carry pre-1940 bungalows where knob-and-tube, ungrounded circuits and 60A services still turn up, and those are inspection and rewiring jobs. The post-war southern and southeastern neighborhoods are mostly 1950s through 1970s, which is panel replacement territory. Newer infill and scrape-and-rebuild properties are straightforward capacity work by comparison.',
    neighborhoods: ['University Hills', 'Hampden', 'Virginia Village', 'Washington Park', 'Platt Park', 'Southmoor Park'],
    priorityServices: ['panel-upgrade', 'electrical-inspection', 'ev-charger-installation', 'emergency-electrician'],
    lead:
      'We cover south Denver, roughly 32 minutes from the Parker shop. Most of the work is panel replacement in post-war neighborhoods and inspections on the older pre-war bungalows closer to the center.',
    overview:
      'Denver is a big enough market that the only useful thing to say is which part of it we serve and what the work involves. We cover south Denver, the side nearest Parker, roughly 32 minutes out. Neighborhoods like University Hills, Hampden, Virginia Village and Southmoor Park are largely 1950s to 1970s, and the typical job there is a panel replacement: an original service that has aged out, sometimes partial grounding, and a household now drawing considerably more than the panel was sized for. Closer to the center, the pre-1940 bungalows around Washington Park and Platt Park are a different job, where knob-and-tube, ungrounded circuits and 60A services mean an inspection is the honest first step before anyone quotes a number. Two practical notes specific to Denver: permitting runs through Community Planning and Development and takes longer than Douglas County, and historic district review can apply to anything that changes a street-facing elevation. We plan timelines around both rather than promising around them.',
    driveTimeContext: 'About 32 minutes from our Parker shop to south Denver.',
    faqs: [
      {
        q: 'Which parts of Denver do you serve?',
        a: 'South Denver primarily, the side closest to Parker, including University Hills, Hampden, Virginia Village, Southmoor Park and the Washington Park area. For addresses well north or west, call and we will tell you honestly whether we are the right fit.',
      },
      {
        q: 'How long do Denver permits take?',
        a: 'Longer than Douglas County, and it varies by workload and whether historic review applies. We file early and build the timeline around the real process rather than quoting you an optimistic date we cannot control.',
      },
      {
        q: 'My 1920s bungalow still has original wiring. Where do we start?',
        a: 'An inspection. In pre-war housing what is behind the plaster genuinely determines the scope, and any quote given without opening the panel and checking a few boxes is a guess. Often a portion of the old wiring was abandoned years ago, which makes the real job smaller than people fear.',
      },
      {
        q: 'Can you install an EV charger at a Denver home?',
        a: 'Yes. It starts with a load calculation to confirm the existing service supports it, then a dedicated circuit, the right breaker, a Denver permit and an inspection. In older neighborhoods the answer is sometimes that a service upgrade comes first, and we tell you that before you buy the charger.',
      },
      {
        q: 'Is Denver on Xcel?',
        a: 'Yes, throughout. That differs from Parker and the rest of Douglas County, which are largely CORE Electric Cooperative, and it changes which rebate programs you qualify for.',
      },
    ],
    heroImageBrief:
      'A post-war brick ranch home on a wide street in south Denver, Colorado, mature trees, clear morning light. 16:9.',
  },
];

/**
 * Areas we serve that do NOT have a page of their own.
 *
 * As of 2026-09-13 this is down to the handful not named on the client's own
 * service-area page: everything they do list (Castle Pines, Aurora, Littleton,
 * Franktown, Elizabeth, Elbert, Foxfield, Dove Valley, The Pinery, Stonegate,
 * Englewood) now has a real city page in `cities` above.
 *
 * Greenwood Village had a legacy URL and still draws impressions, but it is not
 * on the client's current service-area list, so it stays a footer label and a
 * redirect rather than a page claiming coverage they have not confirmed. Same
 * question is open for Lakewood, Denver, Edgewater and Acres Green, all of
 * which show real Search Console demand but no confirmed coverage.
 */
export const tier2Areas = ['Sedalia', 'Larkspur'];

/**
 * Neighborhood name -> city page, where one genuinely exists.
 *
 * Client asked (2026-09-14) whether the "Neighborhoods we work in" entries could
 * be linked. Some can: a number of names in those lists ARE towns with their own
 * page, either exactly ("Stonegate", "The Pinery") or under an obvious variant
 * ("Castle Pines North" -> Castle Pines). Most are not, and those stay plain
 * text. Linking a neighborhood to an unrelated city page would mislead the
 * reader and dilute the signal, so this only ever returns an exact or
 * explicitly-aliased match.
 *
 * Returns the slug, or null when the neighborhood has no page of its own.
 */
const NEIGHBORHOOD_ALIASES: Record<string, string> = {
  'castle pines north': 'castle-pines',
  'castle pines village': 'castle-pines',
  'pinery west': 'the-pinery',
  'stonegate village': 'stonegate',
  'aurora (south)': 'aurora',
  'highlands ranch border': 'highlands-ranch',
};

export function cityLinkForNeighborhood(name: string, currentSlug?: string): string | null {
  const key = name.trim().toLowerCase();
  const exact = cities.find((c) => c.name.toLowerCase() === key);
  const slug = exact?.slug ?? NEIGHBORHOOD_ALIASES[key] ?? null;
  if (!slug) return null;
  // Never link a page to itself.
  if (currentSlug && slug === currentSlug) return null;
  return cities.some((c) => c.slug === slug) ? slug : null;
}

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
