# Image Generation Briefs

For gaps only. Real photos from the client's Drive folder always take precedence. Every
generated image is tagged in `assets/manifest.json` and queued in
`assets/REPLACEMENT-QUEUE.md`.

See `docs/11-image-pipeline.md` for models, setup, and the hard prohibitions.

---

## Global style block

Append to every prompt:

```
Natural daylight photography, warm and slightly overexposed, shallow depth of field,
shot at eye level, candid documentary style rather than staged stock photography.
Colorado Front Range suburban home: two-story, stone-and-siding exterior, neutral
interior palette, hardwood or LVP floors, mature landscaping. Lived-in, not styled.
No text, no logos, no watermarks, no brand names, no signage. No hard hats, no hi-vis
vests, no industrial or commercial setting. No orange anywhere in the frame.
```

**Style consistency:** generate three references first, pick the best, pass it as a reference
image on every subsequent call. Without this the site will look like sixteen different websites.

---

## Homepage

| Slot | Brief |
|---|---|
| Hero fallback | An electrician in a plain blue work shirt standing on the front porch of a suburban Colorado home, tool bag at his feet, relaxed and approachable, looking toward camera, face slightly soft. Morning light. 3:2. *Replace with a real photo of Jud as soon as one exists. This is a placeholder, and it is the first image to swap.* |
| Trust: dog | A golden retriever lying on a living room rug in the foreground while an electrician works on a wall outlet in the soft background. Warm afternoon light. 3:2. |
| Trust: clean work | Close view of blue disposable shoe covers over work boots on clean light hardwood, a tidy canvas tool bag beside them. 4:3. |
| Trust: the call | A woman in her forties in a bright kitchen holding a phone to her ear, relieved expression, not staged. 3:2. |

---

## Service pages

| Page | Brief |
|---|---|
| Panel upgrade | A newly installed grey 200-amp breaker panel with the cover open and neatly labelled breakers, mounted on a clean garage wall. Daylight through a nearby window. 4:3. |
| Emergency repair | A dim suburban living room at dusk lit by a single lamp, an electrician's flashlight illuminating an open wall switch box. Calm, not alarming. 3:2. |
| Outlet repair | Hands installing a white outlet in a baseboard of a bright living room, kids' toys visible nearby out of focus. 4:3. |
| Switch | A hand installing a modern white dimmer in a hallway wall plate, warm light. 4:3. |
| Wiring | Neat new white Romex runs through open ceiling joists in a partially finished basement. 3:2. |
| Indoor lighting | A kitchen with new recessed ceiling lights and under-cabinet lighting on at dusk. Warm, inviting. 3:2. |
| Outdoor lighting | A suburban home exterior at blue hour with warm path lighting along a walkway and soft uplighting on a tree. 16:9. |
| EV charging | A wall-mounted Level 2 charger on a clean garage wall with the cable coiled, an SUV parked beside it. No visible brand marks. 3:2. |
| Ceiling fan | A modern five-blade ceiling fan installed in a bright vaulted living room. 4:3. |
| Home automation | A smart wall panel beside a front door in a bright entryway, a hand reaching toward it. 4:3. |
| Surge protection | A whole-home surge protection device mounted beside a breaker panel in a clean utility area. 4:3. |
| Smoke detectors | A hand mounting a white smoke detector to a hallway ceiling, viewed from below. 4:3. |
| Safety inspection | An electrician with a clipboard and a small meter examining an open panel in a garage, focused. 3:2. |
| Generator | A standby generator on a concrete pad beside a suburban home, landscaping around it, autumn light. 3:2. |
| Troubleshooting | A hand holding a multimeter probe to an open outlet box, meter display out of focus. 4:3. |
| Hot tub hookup | An outdoor GFCI disconnect box mounted on a fence near a covered hot tub on a deck, evening light. 3:2. |

---

## City pages

One establishing image per city. Do not fabricate a recognizable landmark — a generated
approximation of a real downtown is both inaccurate and obvious.

```
A quiet residential street of two-story stone-and-siding homes in a Colorado Front Range
suburb, mature trees, mountains faintly visible on the horizon, late afternoon light. 16:9.
```

Vary lighting and season across the five cities so they are not visibly identical. **Prefer a
real photo of the van in that city.** Ask the owner to take one on his next job in each
service area — five minutes of his time is worth more here than any prompt.

---

## Resources and tools

| Asset | Brief |
|---|---|
| Permit guide | A flat overhead of a permit application, a pen, and a tape measure on a light wood desk. No legible text. 16:9. |
| Utility guide | An electric meter on the exterior wall of a suburban home, clean daylight. 16:9. |
| Panel brands guide | Three older breaker panel covers side by side showing visible age difference. No manufacturer names legible. 16:9. |
| Tool headers | Simple flat-vector illustrations in brand blue and green on `--paper`. Not photographs. Consistent line weight across all five. |

---

## Open Graph images

Generated with `next/og` at build time, not with Gemini. Composition in `docs/11` §5.

---

## Never generate

- Jud, Justin, or anyone representing them
- Before/after work photos
- Award badges, license documents, certificates
- Customer faces
- Anything a viewer could mistake for evidence of this business's actual work
- Recognizable real landmarks or addresses
