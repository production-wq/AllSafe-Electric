/**
 * Service slug -> review tag mapping.
 *
 * Feeds <ServiceReviews> so each service page shows reviews about that work
 * (revision doc §1.10, §4.2). Tags must match the keys in TAG_KEYWORDS in
 * lib/reviews.ts. A service can map to several tags; an empty array means
 * "no strong match, just show recent reviews".
 */
export const SERVICE_REVIEW_TAGS: Record<string, string[]> = {
  'emergency-electrical-repairs': ['emergency'],
  'electrical-troubleshooting': ['emergency', 'wiring'],
  'electrical-outlet-services': ['outlets'],
  'electrical-switch-services': ['switches', 'outlets'],
  'electrical-wiring-repairs-services': ['wiring'],
  'home-electrical-safety-inspections': ['inspection', 'panel'],
  'smoke-detectors': ['smoke-detector'],
  'electrical-panel-services': ['panel'],
  'whole-home-surge-protection': ['panel'],
  'generator-installation': ['generator'],
  'residential-ev-charging': ['ev-charger'],
  'hot-tub-electrical-hookup': ['hot-tub'],
  'lighting-services': ['lighting'],
  'outdoor-lighting': ['lighting'],
  'ceiling-fan-installation': ['fans', 'lighting'],
  'home-automation': ['home-automation'],
};

export function reviewTagsForService(slug: string): string[] {
  return SERVICE_REVIEW_TAGS[slug] ?? [];
}
