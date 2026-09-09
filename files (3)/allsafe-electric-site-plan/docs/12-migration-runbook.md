# 12 — Migration Runbook

Sequenced cutover. The two irreversible risks are **losing indexed URLs** and **taking the
client's email offline**. Everything below is built around not doing either.

Owner-facing promise from the sales call: existing URLs are preserved, and reverting is about
an hour of work. Both must be true.

---

## 1. Pre-flight — complete before the build finishes

- [ ] Full WordPress backup: files + database, downloaded and verified restorable
- [ ] Full DNS zone export from the current host: A, AAAA, CNAME, **MX**, TXT (SPF/DKIM/DMARC/
      verification), SRV, NS. Screenshot the DNS panel.
- [ ] Full site crawl exported with status codes, canonicals, titles, inlinks
- [ ] All GSC exports captured (`docs/13` §7)
- [ ] `data/url-map.csv` built and **human-reviewed**
- [ ] `data/preserved-urls.csv` populated; `npm run test:preservation` wired into CI
- [ ] Current host billing extended 90 days past launch
- [ ] Registrar access confirmed at GoDaddy — login works, 2FA recovery known,
      domain not locked in a way that blocks a nameserver change
- [ ] Email decision made and approved by the owner (§3)
- [ ] The 4 `noindex` pages reviewed — intentional or not
- [ ] The 1 robots.txt-blocked page identified
- [ ] The 1 5xx page and the 3 404s identified and resolved in the new build
- [ ] Housecall Pro booking embed snippet obtained from the client's account
- [ ] Google Places API key provisioned and the Place ID obtained
- [ ] Gemini API key provisioned
- [ ] Real award badge assets sourced (BBB, Angi, HomeAdvisor ×2)
- [ ] Owner has reviewed the staging site and approved it

Staging is deployed on a Vercel preview URL with `noindex` and HTTP basic auth. **Never let a
staging environment get indexed.**

---

## 2. Owner approval gate

The owner asked to see the site before it goes live. Honor it. Send:

- The staging link with a short guide on what to look at
- A side-by-side of the old and new homepage
- Explicit confirmation that **no orange** appears anywhere
- Confirmation that his blue and green are used, taken from his logo
- The list of preserved URLs, so he can see nothing was thrown away
- A note on which photos are his and which are placeholder, with the replacement queue

Give him 48 hours. Do not launch on a Friday. Do not launch the day before a holiday.

---

## 3. Email decision — resolve before touching DNS

The intake form says email is hosted with the current web host and the owner selected
**"Need help deciding."** He has not decided. Someone must ask him, and it must happen before
cutover, not during.

### Recommended: migrate to Google Workspace

- He already lives in Gmail — leads currently go to `allsafehomeservices@gmail.com`
- Consolidates two inboxes into one
- Removes email as a dependency on whoever hosts the website, permanently
- ~$7/user/month
- Requires a mailbox migration window and his sign-off

### Alternative: leave email where it is

- Keep MX, SPF, DKIM and DMARC records pointed at the current provider
- Change **only** the A and CNAME records to point at Vercel
- **Do not move nameservers.** Moving nameservers without recreating MX takes email down.
- Lower risk today, but leaves the dependency in place

Either way: **record the current MX records in writing before any change**, and have them open
on screen during cutover.

---

## 4. Cutover day

Target: Tuesday or Wednesday morning, Mountain time. Team available for four hours after.

**T-48h**
- Lower DNS TTL to 300 seconds on all records
- Final content freeze on the old site
- Notify the owner of the window and give him a direct number

**T-2h**
- Final production build, all tests green
- `npm run audit:seo` clean
- `npm run test:preservation` green
- Redirect map loaded and verified: spot-check 20 bucket-A and 20 bucket-B URLs against staging

**T-0**
1. Point the apex A record and `www` CNAME at Vercel
2. Confirm the SSL certificate issues (usually under 5 minutes)
3. Verify apex and `www` both resolve, `www` 301s to apex
4. Confirm MX records are unchanged — `dig MX allsafehomeservice.com`
5. Send and receive a test email both directions

**T+15m**
6. `curl -I` every URL in `preserved-urls.csv` → all 200
7. `curl -I` 30 random bucket-B URLs → all single-hop 301
8. Confirm 10 bucket-D URLs return 410
9. `robots.txt` and `sitemap.xml` load without a bot challenge
10. Submit the sitemap in Search Console
11. Request indexing on the homepage and all 16 service pages

**T+30m**
12. Submit a real test form → verify it arrives at the destination inbox, in Housecall Pro, and
    as a GA4 `generate_lead`
13. Make a real test call → verify CallRail records it with the right source
14. Complete a real test booking → verify it lands in Housecall Pro and fires the GA4 event
15. Confirm CallRail DNI swaps the number and that the footer NAP still shows the real one
16. Confirm the live Google reviews feed loads

**T+1h**
17. Lighthouse on 5 templates, mobile → all targets met
18. Rich Results Test on one page per template
19. Confirm the Google Business Profile website link resolves to the new site
20. Annotate GA4 with the launch date
21. Update the GBP website URL with UTM parameters
22. Restore DNS TTLs

**T+4h**
23. Full crawl of the new site → zero 404s, zero redirect chains, zero orphans
24. Confirm no staging URL is publicly reachable
25. Tell the owner it is live, with a short summary of what changed

---

## 5. First 72 hours

- **Hour 1–4:** someone stays on it. Watch Vercel logs for 404s and 5xx.
- **Daily:** GSC Coverage, GSC Performance for Parker queries, GA4 realtime, CallRail volume
- **Expect** "Crawled – currently not indexed" to rise briefly as Google reprocesses. This is
  normal reprocessing, not a regression. Do not make panicked changes in week one.
- **Do not** change URLs, redirects, or titles in the first 14 days unless something is broken.
  Give Google a stable target.

### Escalate immediately if

- Any bucket-A URL returns non-200
- Parker query impressions drop more than 40% over 7 consecutive days
- Form or call volume drops to zero for more than 2 hours
- Email bounces
- The GBP website link breaks

---

## 6. Rollback

**Trigger:** bucket-A URLs 404ing at scale, or a sustained >40% drop in Parker impressions over
7 days not explained by a known Google update, or a business-critical failure (email down,
leads not arriving) that cannot be fixed forward inside 4 hours.

**Procedure — target under 60 minutes**

1. Point the A record and `www` CNAME back at the original host
2. Confirm the WordPress site loads on the old infrastructure
3. Confirm MX unchanged and email flowing
4. Verify 10 URLs return 200 on the old site
5. Tell the owner what happened, in plain language, before he asks

**Preconditions, maintained for 90 days:** old host paid and the site intact, verified backup,
DNS zone export on file, this document current.

Do not delete the old site at 90 days without a written go-ahead from the account manager.

---

## 7. Post-launch schedule

| When | Action |
|---|---|
| Day 1 | Full verification checklist, above |
| Day 3 | Crawl, fix any error |
| Day 7 | First indexation report against the 86 baseline |
| Day 14 | **Tier 1 gate check.** City pages release if Tier 0 is ≥80% indexed. |
| Day 30 | First client report: indexed pages, impressions, leads by source, map grid |
| Day 60 | Content refresh on any page with impressions but no clicks |
| Day 90 | Full audit vs. baseline. Decide on retiring the old host. |
