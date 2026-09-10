/**
 * Tier publication gates — planning/CLAUDE.md §1.7, planning/docs/09 §3.
 *
 * Publishing 500 pages at once is what broke the current site (86 of 588 indexed).
 * Tier 0 (home, 16 services, core pages) ships at launch. Every later tier is gated
 * on the previous tier reaching ≥80% indexed. Until a tier's flag is flipped its pages
 * still build and are reachable by direct URL, but they are:
 *   - excluded from sitemap.xml
 *   - served with <meta name="robots" content="noindex,follow">
 *   - excluded from the mega-menu / hub "browse" lists (kept as contextual links only)
 *
 * Flip these ONLY after `npm run report:indexation -- --tier=N` clears the gate.
 */

export const PUBLISH = {
  TIER_1_CITIES: false, // 5 Tier-1 city pages
  TIER_2_CITY_SERVICE: false, // 30 city × service pages
  TIER_3_TOOLS_RESOURCES: false, // 5 tools + 5 resource guides
} as const;

/** Blog posts run continuously from week 2, outside the tier gates (docs/09 §3). */
export const PUBLISH_BLOG = true;

export function cityPagesPublished() {
  return PUBLISH.TIER_1_CITIES;
}
