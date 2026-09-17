# CLAUDE.md — Allsafe Electric

This file is loaded every session working in this repo. The fuller build-phase
context (design system, URL contract, phased rollout) lives in
[planning/CLAUDE.md](planning/CLAUDE.md) — read that too for structural work.
This file exists specifically so the rules below survive session to session:
they were violated once already (an after-hours line got written into a blog
post, and a stale 15-years figure and old price ranges sat live on several
pages until a client review caught them), so treat every rule here as
non-negotiable, not a style preference.

## Business facts: source of truth

- Hours: weekdays, 8am to 6pm. Always state it as "We are open weekdays, 8am to 6pm."
- There is NO after-hours line, emergency line, on-call service, or 24/7 availability. Never write copy that says or implies calls are answered outside business hours. Never state the opposite either (no "closed weekends," no "calls after hours go to voicemail"). Only state the weekday hours.
- Jud Cushing (owner, master electrician ME.0601023) has over 20 years in the trade. Allsafe was founded in Parker in January 2018. Do not confuse the two.
- Diagnostic visits are a flat fee. Never state the amount. Never say the fee is credited toward, or comes off, the repair. Approved phrasing: "A diagnostic visit is a flat fee, and if any repairs or replacements are needed, we'll give you the price in writing before we start any work."
- Price ranges live in `lib/services.ts`, in each service object's `priceRange: { low, high }` field — that pair drives the "What it costs" card on every service page automatically (`components/sections.tsx`, `PriceRange`). Never hardcode a price anywhere else. The one exception that needs manual attention: `electrical-panel-services` also states its price in plain prose in its own `blurb` and `lead` fields (the hero sentence) and in its `highlights` "Typical range" entry — if that service's `priceRange` ever changes, update those three strings in the same edit or they will drift out of sync. No other service currently states a price in prose.
- Service area: the full South Denver metro (21 communities). Never mention drive time, minutes, or distance from the Parker shop.
- Never imply the same person sells, books, and performs every job, or that Jud personally oversees every job. Use "one of our licensed electricians."
- Call is always the primary CTA; the estimate form is secondary.
- Avoid AI-sounding filler: "in plain English," "no filler," "no stock photography," cute contrasts like "houses, not warehouses."
- Blog posts need at least 3 natural in-copy internal links.

Blog posts are hand-authored markdown under `content/blog/`, not generated from
a template or prompt file — there is nothing else to update if this list
changes, just re-check the posts already there.

Before publishing any new or edited copy, grep for: `after-hours`, `after
hours`, `afterhours`, `emergency line`, `24/7`, `on call`, `on-call`, `same
number`, `straight run`, `comes off the repair`, `drive distance`, `drive
time`, and `fifteen` / `15 years` / `15+ years`. Zero hits is the bar.
