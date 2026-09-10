# Image replacement queue

Generated / interim images to swap for real photos as the client supplies them.
Per `planning/docs/11-image-pipeline.md` §3 "Disclosure". `scripts/images-generate.ts`
appends here automatically when it produces an image.

## Priority order (docs/11 §2)

1. **Jud, daylight, entryway, looking at camera** — currently a real full-res photo
   (`allsafe-electrician-in-home-service-portrait`). docs/11 wants the ~2000 px original of
   the bathroom-lighting photo too — a 5-minute ask of the owner.
2. Jud + Justin together, van visible — not yet supplied.
3. Van in a recognisable Parker / Castle Rock setting (for city pages) — ask the owner to take
   one on his next job in each service area. Beats any generated street shot.

## Service hero gaps (interim real photo in use; generate or replace)

| Slot | Interim photo now shown | Brief for generation |
|---|---|---|
| `/outdoor-lighting/` | `allsafe-electrician-installing-outdoor-weatherproof-outlet` | Suburban home exterior at blue hour, warm path lighting + soft tree uplighting. 16:9. |
| `/residential-ev-charging/` | `electrician-tightening-connections-in-breaker-panel` | Wall-mounted Level 2 charger on a clean garage wall, cable coiled, SUV beside it. No brand marks. 3:2. |
| `/smoke-detectors/` | `allsafe-electrician-standing-in-modern-home` | Hand mounting a white smoke detector to a hallway ceiling, from below. 4:3. |
| `/generator-installation/` | `allsafe-electrician-beside-home-sauna` | Standby generator on a concrete pad beside a suburban Colorado home, autumn light. 3:2. No brand marks. |
| `/hot-tub-electrical-hookup/` | `electrician-working-on-outdoor-stone-wall-outlet` | Outdoor GFCI disconnect box on a fence near a covered hot tub on a deck, evening light. 3:2. |

## City establishing images (no image shown now — hero uses an "at a glance" card)

`city-parker-co`, `city-castle-rock-co`, `city-highlands-ranch-co`, `city-lone-tree-co`,
`city-centennial-co` — briefs in `lib/cities.ts` (`heroImageBrief`). Prefer a real van photo
in that city. Vary lighting/season across the five so they are not visibly identical.

## Log

_(empty — `scripts/images-generate.ts` appends entries here on each run)_
