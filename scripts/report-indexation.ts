/**
 * Tier indexation gate, planning/docs/09 §3, planning/CLAUDE.md §1.7.
 *
 *   npm run report:indexation -- --tier=1
 *
 * Pulls the GSC URL Inspection / Index Coverage status for the tier's URL list and
 * reports indexed / total. A tier does NOT ship until the previous tier is ≥80% indexed.
 *
 * Requires a Google service-account JSON with the Search Console API enabled and
 * added as a full user on the `sc-domain:allsafehomeservice.com` property. Set
 * GSC_SERVICE_ACCOUNT_JSON (path) in .env.local. Until that exists this prints the
 * tier's URL list and the manual check to run in Search Console.
 */
import 'dotenv/config';
import { services } from '../lib/services';
import { cities } from '../lib/cities';
import { abs } from '../lib/business';

const TIERS: Record<string, () => string[]> = {
  '0': () => [
    abs('/'),
    abs('/electrical-services-parker-co/'), ...services.map((s) => abs(`/${s.slug}/`)),
    abs('/about/'),
    abs('/reviews/'),
    abs('/contact/'),
    abs('/coupons/'),
    abs('/book/'),
    abs('/service-area/'),
    abs('/resources/'),
    abs('/privacy-policy/'),
  ],
  '1': () => cities.map((c) => abs(`/electricians/${c.slug}/`)),
};

function tierArg(): string {
  const m = process.argv.find((a) => a.startsWith('--tier='));
  return m ? m.split('=')[1] : '0';
}

async function main() {
  const tier = tierArg();
  const urls = TIERS[tier]?.();
  if (!urls) {
    console.error(`Unknown tier "${tier}". Known: ${Object.keys(TIERS).join(', ')}`);
    process.exit(1);
  }

  const saPath = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!saPath) {
    console.log(`Tier ${tier}, ${urls.length} URLs. GSC API not configured.\n`);
    console.log('Manual check (Search Console → URL Inspection, or Pages report filtered to these):');
    urls.forEach((u) => console.log('  ' + u));
    console.log(
      `\nGate: publish the next tier only when ≥80% of these show "Indexed" AND it has been\n` +
        `≥14 days since launch (Tier 1). Then flip the flag in lib/publish.ts.`
    );
    process.exit(0);
  }

  // With a service account, call the Search Console URL Inspection API here:
  //   POST https://searchconsole.googleapis.com/v1/urlInspection/index:inspect
  //   { inspectionUrl, siteUrl: 'sc-domain:allsafehomeservice.com' }
  // and count `inspectionResult.indexStatusResult.coverageState === 'Submitted and indexed'`.
  console.error('GSC_SERVICE_ACCOUNT_JSON is set but the API client is not wired in this build.');
  console.error('Implement the URL Inspection call above, or run the manual check.');
  process.exit(1);
}

main();
