# Image ingest review

Per `planning/docs/11-image-pipeline.md` §1. The client supplied **58 real photos** in
`assets/source-photos/` (already sensibly named, no reorg needed). All processed by
`npm run images:process` → `public/img/photos/` (WebP + JPEG, EXIF/GPS stripped, LQIP,
`data/image-manifest.json`).

## Quality

- All ≥ 1067 px on the short edge after processing; none rejected for resolution or blur.
- **No GPS EXIF** in any source file (checked). All metadata stripped on export regardless.
- No customer faces, house numbers, licence plates, or legible documents visible in any frame.
- Every photo is Jud (bearded, blue/white/grey Allsafe polo) working in modern residential
  interiors, plus detail shots (outlets, switches, panels, chandeliers, fans, tool bags).
- One photo includes a dog (French bulldog), `allsafe-electrician-holding-dog`, used in the
  homepage trust section (owner named "good with dogs" unprompted, docs/02 §8).

## Privacy sign-off needed

None outstanding, no identifiable third parties or properties. If the account manager wants a
belt-and-braces release on file for the interior shots, that is a paperwork item, not a
blocker.

## Coverage vs. the 16 services

| Have a real photo | Gap (interim real photo used; generate or get a real one) |
|---|---|
| Panel, outlet, switch, wiring, indoor lighting, ceiling fan, home automation, troubleshooting, safety inspection, emergency | Outdoor lighting, EV charging, smoke detectors, generator, hot tub |

Gaps + the 5 city establishing shots are listed in `assets/REPLACEMENT-QUEUE.md`.
Generate with `npm run images:generate` (Gemini / Nano Banana, env key, gaps only): the
script refuses any brief with a person, face, badge, before/after, or named landmark.

## Never generate (enforced in `scripts/images-generate.ts`)

Jud · Justin · anyone representing them · before/after work photos · award badges · licence
documents · customer faces · anything a viewer could mistake for evidence of real work ·
recognizable real landmarks or addresses.
