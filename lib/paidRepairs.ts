import type { Faq } from './services';

export const diagnosticCopy = "A diagnostic visit is a flat fee, and if any repairs or replacements are needed, we'll give you the price in writing before we start any work.";

export interface PaidRepair {
  slug: string; title: string; description: string; label: string; headline: string;
  intro: string; service: string; photo: string; photoAlt: string; tags: string[];
  symptoms: { title: string; text: string }[];
  detailTitle: string; detail: string; faqs: Faq[];
}

export const paidRepairs: Record<string, PaidRepair> = {
  'outlet-gfci-repair': {
    slug: 'outlet-gfci-repair',
    title: 'Outlet & GFCI Repair in Parker CO | Allsafe Electric',
    description: 'Outlets not working or a GFCI that will not reset? Allsafe Electric diagnoses and repairs home outlet problems in the South Denver metro. Call to book.',
    label: 'Outlet & GFCI repair', headline: 'Outlets not working? GFCI won’t reset?',
    intro: 'Get the cause found and the right repair explained. Our licensed electricians diagnose dead outlets and GFCI problems in homes across Parker and the South Denver metro.',
    service: 'electrical-outlet-services', photo: 'electrician-testing-kitchen-outlet-with-voltage-detector', photoAlt: 'Electrician testing a kitchen outlet', tags: ['outlets'],
    symptoms: [
      { title: 'One outlet has stopped working', text: 'A dead receptacle can have a problem at the outlet or elsewhere on its circuit. We test before recommending a replacement.' },
      { title: 'The GFCI will not reset', text: 'We check the device, its power supply, and the circuit it protects to identify why it will not reset or keeps tripping.' },
      { title: 'Several outlets went out together', text: 'Kitchen, bathroom, garage, and outdoor outlets may share protection. We trace the affected circuit and locate the fault.' },
    ],
    detailTitle: 'Restore reliable power where you need it',
    detail: 'Tell us which outlets stopped working, when you first noticed it, and whether a reset has already been attempted. One of our licensed electricians tests the affected outlets and circuit, explains the findings, and gives you a written repair price. Repairs may involve an outlet, GFCI, connection, or another part of the circuit. We test the repaired area before completing the visit.',
    faqs: [
      { q: 'Can you help if the breaker is on but an outlet is dead?', a: 'Yes. A breaker that appears on does not identify the cause of a dead outlet. We can check the outlet, upstream protection, and circuit connections to locate the problem.' },
      { q: 'Does a GFCI that will not reset need replacing?', a: 'Not always. A device fault, loss of power, or a problem on the protected circuit can prevent a reset. Diagnosis helps determine whether replacement or another repair is appropriate.' },
      { q: 'Do you repair bathroom, garage, and outdoor outlets?', a: 'Yes. We diagnose residential outlet and GFCI problems throughout the home, including bathrooms, kitchens, garages, and outdoor receptacles.' },
    ],
  },
  'circuit-breaker-repair': {
    slug: 'circuit-breaker-repair',
    title: 'Circuit Breaker Repair in Parker | Allsafe Electric',
    description: 'Breaker keeps tripping or will not reset? Get residential circuit diagnosis and repair in Parker and the South Denver metro. Call Allsafe Electric to book.',
    label: 'Circuit breaker & circuit repair', headline: 'Breaker keeps tripping or won’t reset?',
    intro: 'Find out why your circuit is losing power. Our licensed electricians diagnose breaker and circuit problems in Parker and the South Denver metro, then explain the repair you need.',
    service: 'electrical-troubleshooting', photo: 'allsafe-electrician-testing-residential-breaker-panel', photoAlt: 'Allsafe electrician testing a residential panel', tags: ['panel', 'wiring'],
    symptoms: [
      { title: 'A breaker trips repeatedly', text: 'We investigate the affected circuit and connected loads to find what is causing the repeated interruptions.' },
      { title: 'A breaker will not stay on', text: 'A trip can indicate a fault that needs attention. We diagnose the cause before recommending a breaker replacement.' },
      { title: 'Power is out on one circuit', text: 'We test the circuit, breaker, and relevant connections to locate the problem and determine the appropriate repair.' },
    ],
    detailTitle: 'A tripping breaker needs a diagnosis',
    detail: 'A breaker is designed to interrupt power when it detects certain unsafe conditions. Replacing it without finding the cause may leave the underlying problem unresolved. We investigate the affected circuit, explain what we find, and provide the price of any recommended repair in writing. If a wider panel issue is found, we explain your options before you decide.',
    faqs: [
      { q: 'Does a tripping breaker mean I need a new panel?', a: 'Not necessarily. The problem may involve a connected appliance, an overloaded circuit, wiring, or the breaker itself. We diagnose the issue before recommending a repair or discussing panel work.' },
      { q: 'Can you diagnose AFCI and GFCI breaker trips?', a: 'Yes. Tell us which breaker is affected and what was running when it tripped. We investigate the circuit and protection to determine the next step.' },
      { q: 'Should I keep resetting the breaker?', a: 'If it keeps tripping or will not reset, leave it off and arrange a professional assessment. Do not bypass the breaker or replace it with a higher-rated breaker to stop the trips.' },
    ],
  },
  'partial-power-loss': {
    slug: 'partial-power-loss',
    title: 'Partial Power Loss Repair in Parker | Allsafe Electric',
    description: 'Lost power in one room or part of your home? Allsafe Electric diagnoses partial power loss in Parker and the South Denver metro. Call to arrange a visit.',
    label: 'Partial power loss diagnostics', headline: 'Lost power to part of your home?',
    intro: 'One room out, several dead outlets, or power missing with the breaker still on? Our licensed electricians help locate the cause in Parker and the South Denver metro.',
    service: 'electrical-troubleshooting', photo: 'allsafe-electrician-in-home-service-portrait', photoAlt: 'Allsafe electrician visiting a residential home', tags: ['emergency', 'wiring'],
    symptoms: [
      { title: 'One room has no power', text: 'We investigate the affected outlets, lights, and circuit to find why that part of your home has lost power.' },
      { title: 'Several rooms or circuits are out', text: 'We assess the pattern of the outage and help determine whether the problem involves home wiring or the incoming supply.' },
      { title: 'The breaker looks on, but power is off', text: 'Breaker position alone cannot confirm that a circuit is working. We test and trace the loss of power.' },
    ],
    detailTitle: 'Find out where the power loss starts',
    detail: 'Let us know which rooms, lights, and outlets are affected and whether neighbors are experiencing an outage too. Partial power loss can involve a home circuit, a connection, or the utility supply. We assess the problem and explain whether an electrical repair or utility involvement is needed. If repairs within the home are recommended, you receive a written price before work starts.',
    faqs: [
      { q: 'Should I call the utility or an electrician?', a: 'Check your utility’s outage information if neighbors are affected or you suspect a supply problem. If the outage appears limited to part of your home, call us to describe the symptoms. Some partial outages still require utility involvement.' },
      { q: 'Can you help when half the house has no power?', a: 'Yes. We assess partial power loss and help identify whether it involves home circuits or the incoming supply. Utility-owned equipment must be handled by the utility.' },
      { q: 'What information helps when I call?', a: 'Tell us which rooms and devices are affected, when the outage began, whether lights changed brightness, and whether nearby homes have power. You do not need to open a panel or inspect wiring.' },
    ],
  },
};
