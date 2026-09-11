/**
 * Tier publication gates, planning/CLAUDE.md §1.7, planning/docs/09 §3.
 *
 * TIER_1_CITIES was flipped on 2026-09-11 per the client's audit (Phase 1.1 of the
 * implementation prompt): four of the five city pages already match legacy indexed
 * URLs (/electrician-castle-rock/, /electrician-highlands-ranch/, /electrician-lone-tree/,
 * /electrician-centennial/) and were sitting behind noindex for no reason. See
 * planning/docs/99, 2026-09-11.
 *
 * Later tiers (30 city x service pages, tools/resources) stay gated. Until a tier's
 * flag is flipped its pages still build and are reachable by direct URL, but they are:
 *   - excluded from sitemap.xml
 *   - served with <meta name="robots" content="noindex,follow">
 *   - excluded from the mega-menu / hub "browse" lists (kept as contextual links only)
 */

export const PUBLISH = {
  TIER_1_CITIES: true, // 5 city pages at /electrician-{city}/
  TIER_2_CITY_SERVICE: false, // service x city pages, /{service}-{city}/
  TIER_3_TOOLS_RESOURCES: false, // 5 tools + 5 resource guides
} as const;

/** Blog posts run continuously from week 2, outside the tier gates (docs/09 §3). */
export const PUBLISH_BLOG = true;

export function cityPagesPublished() {
  return PUBLISH.TIER_1_CITIES;
}
