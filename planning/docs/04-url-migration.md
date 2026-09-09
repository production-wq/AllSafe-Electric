# 04 — URL Migration & Redirect Strategy

The owner's stated fear, verbatim: *"I definitely don't want to lose how it seems like everybody
calls me in Parker."* He was told on the call that existing URLs would be preserved. That is a
promise, and this document is how it gets kept.

---

## 1. The triage principle

588 known URLs. 86 indexed. 502 not.

Do **not** recreate all 588. Do **not** delete all 502 either. Sort them:

| Bucket | Definition | Action |
|---|---|---|
| **A — Preserve** | Indexed, or has impressions/clicks in the last 90 days, or has an external backlink | Recreate at the **exact same URL**. Non-negotiable. |
| **B — Consolidate** | Not indexed, no impressions, but the topic is covered by a page we are keeping | 301 to the best-matching kept page |
| **C — Rebuild** | Not indexed, no impressions, but the topic genuinely has demand and deserves a real page | Rebuild properly, may use a new URL, 301 the old one |
| **D — Retire** | Not indexed, no impressions, no demand, no links. Thin or duplicative. | 410 Gone |

**Bucket D gets a 410, not a 404 and not a 301 to the homepage.**

- A blanket 301 to the homepage is treated as a soft 404 by Google, wastes crawl budget, and
  tells Google nothing.
- A 404 leaves the URL in the crawl queue for months.
- A **410 Gone** is the explicit signal that removes it fastest. With ~400 pages of dead weight
  to clear, this is the difference between recovering crawl budget in weeks versus quarters.

Expected split, to be confirmed by the script in §2: roughly A=90–120, B=150–200, C=20–40,
D=250–320.

---

## 2. Building the actual map

The Search Console exports provided (`Chart.csv`, `Critical_issues.csv`) give totals, not URLs.
**Before any redirect work, collect these five inputs:**

1. GSC → Indexing → Pages → export **every** status group, with URLs
2. GSC → Performance → Pages → last 12 months, export all rows with impressions
3. The current `sitemap.xml` (fetch as Googlebot; the host serves a bot challenge otherwise)
4. A full crawl of the live site (Screaming Frog or equivalent), including status codes,
   canonicals, and inlinks
5. Referring pages from Ahrefs or GSC → Links → Top linked pages

Then generate the map:

```bash
npm run migrate:build-map
# reads  data/gsc-pages.csv, data/gsc-performance.csv, data/crawl.csv, data/backlinks.csv
# writes data/url-map.csv   columns: old_url, bucket, new_url, status, reason, impressions_90d, inlinks
```

Bucket assignment logic:

```
if indexed OR impressions_90d > 0 OR external_backlinks > 0     -> A  (preserve, 200, same URL)
elif best_semantic_match_score >= 0.72                          -> B  (301 to match)
elif topic_has_search_volume AND not covered elsewhere          -> C  (rebuild, 301 old -> new)
else                                                            -> D  (410)
```

**A human reviews every row before it ships.** The script proposes; it does not decide.
Pay particular attention to any bucket-D row with a non-zero inlink count.

---

## 3. Preservation contract

`data/preserved-urls.csv` is the authoritative list of bucket A. Once populated, it is
enforced in CI:

```
npm run test:preservation
```

The test fails the build if any URL in that file does not resolve 200 on the new site at the
identical path. This test must be wired up **before** the first page is built, so it fails
loudly from day one rather than being discovered at launch.

Known bucket-A members, confirmed from live inspection (seed the file with these):

```
/
/emergency-electrical-repairs-parker-co/
/electrical-services-parker-co/            (verify vs /electrical-services/)
/electrical-wiring-repairs-services/
/electrical-outlet-services/
/electrical-switch-services/
/electrical-panel-services/
/smoke-detectors/
/home-automation/
/ceiling-fan-installation/
/residential-ev-charging/
/whole-home-surge-protection/
/outdoor-lighting/
/lighting-services/
/home-electrical-safety-inspections/
/about/
/reviews/
/coupons/
/contact/
/privacy-policy/
```

---

## 4. Redirect implementation

In `next.config.js`, generated from `data/url-map.csv` at build time. Never hand-maintained.

```js
// next.config.js
const { readFileSync } = require('fs');
const { parse } = require('csv-parse/sync');

const rows = parse(readFileSync('./data/url-map.csv'), { columns: true });

module.exports = {
  trailingSlash: true,
  async redirects() {
    return rows
      .filter(r => r.status === '301')
      .map(r => ({ source: r.old_url, destination: r.new_url, permanent: true }));
  },
};
```

Bucket D is handled in middleware, returning a real 410 with a helpful page:

```ts
// middleware.ts
import { NextResponse } from 'next/server';
import gone from './data/gone-urls.json';

export function middleware(req) {
  if (gone.includes(new URL(req.url).pathname)) {
    return new NextResponse(null, { status: 410 });
  }
}
```

### Redirect rules

- **One hop, always.** No chains. If A→B existed before and B is now retired, write A→C directly.
- **301, never 302.** A temporary redirect passes no equity.
- **Preserve query strings** on redirects that carry `gclid`, `utm_*`, or CallRail parameters.
- Also enforce, at the edge: `http`→`https`, `www`→ apex, and non-trailing-slash → trailing slash.
  Each as a single 301, never stacked.

---

## 5. DNS, hosting and email cutover

The intake form says email is hosted with the current website host, and the owner marked
"need help deciding." **This is the highest-risk step in the entire project.** Moving
nameservers without preserving MX records takes the business's email offline, and this is a
business where the phone and inbox *are* the product.

Sequence:

1. **Inventory current DNS first.** Export the full zone from the current host: A, AAAA,
   CNAME, **MX**, TXT (SPF, DKIM, DMARC, Google site verification), SRV. Screenshot it.
2. **Decide the email path** before touching anything. Recommendation: migrate to Google
   Workspace on `allsafehomeservice.com`. The owner is already living in Gmail
   (`allsafehomeservices@gmail.com`), it consolidates a second inbox that currently receives
   leads, and it removes email as a dependency on the web host permanently. Ballpark $7/user/mo.
   Requires the owner's approval and a mailbox migration window.
3. If the owner declines, **keep MX pointed at the existing provider** and change only the
   A/CNAME records. Never move nameservers wholesale in that case.
4. Lower TTL to 300s at least 48 hours before cutover. Raise it back after.
5. Point apex + `www` to Vercel. Verify the certificate issues before announcing.
6. **Re-verify Google Search Console** immediately. Note there are currently two different
   `google-site-verification` tokens in play across pages — reconcile which property is the
   real one first, and keep both verification TXT records during transition.
7. Confirm the Google Business Profile website URL still resolves. A broken GBP website link
   is a direct map-pack ranking hit.

### Post-cutover verification, within 1 hour

- [ ] Send and receive a test email in both directions
- [ ] `dig MX allsafehomeservice.com` matches the pre-cutover export
- [ ] SPF, DKIM, DMARC all resolve; send a test through mail-tester.com
- [ ] SSL valid on apex and `www`
- [ ] `curl -I` on 10 random bucket-A URLs → all 200
- [ ] `curl -I` on 10 random bucket-B URLs → all 301, single hop
- [ ] Housecall Pro booking link loads
- [ ] Contact form submits and the lead lands in the destination inbox
- [ ] CallRail swaps the number correctly
- [ ] GBP website link resolves

---

## 6. Launch-day and post-launch SEO actions

**Day 0**

1. Submit the new `sitemap.xml` in Search Console
2. Use the URL Inspection tool to request indexing on the homepage and all 16 service pages
3. Confirm `robots.txt` allows everything it should — the current site has **1 page blocked by
   robots.txt**; find out what it is before launch and decide deliberately
4. Resolve the 1 server error (5xx) and 3 404s flagged in the coverage report
5. Review the 4 pages `noindex`ed on the old site — confirm each was intentional
6. Annotate GA4 with the launch date

**Days 1–14**

- Watch GSC Coverage daily. Expect "Crawled – currently not indexed" to *rise* briefly as
  Google reprocesses. That is normal. Do not panic-change things.
- Watch Performance → Pages for the homepage and Parker queries specifically. This is the
  early-warning system for the owner's stated fear.
- Fix any new crawl error inside 24 hours.

**Day 30 checkpoint**

Report against baseline: 86 indexed, ~350 impressions/day average.
Targets: indexed pages > 120, impressions trending up, zero bucket-A URLs 404ing.

**Day 90 checkpoint**

Targets: indexation rate > 70% of published pages, Parker head terms held or improved,
first movement on service-modified terms (panel upgrade, EV charger), LSA lead flow restored.

---

## 7. Rollback plan

The owner was told reverting is roughly an hour of work. Make that true:

- Keep a full export of the current WordPress site (files + database) before anything changes
- Keep the current host active and paid for **90 days** past launch
- Keep the old DNS zone export
- Document the exact records to revert, in `docs/12-migration-runbook.md`

Rollback trigger: bucket-A URLs 404ing at scale, or a >40% drop in Parker-query impressions
sustained over 7 days that is not explained by a known Google update.
