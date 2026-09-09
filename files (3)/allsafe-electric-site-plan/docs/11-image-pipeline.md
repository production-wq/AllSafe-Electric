# 11 — Image Pipeline

Two sources: the client's Google Drive folder of real job photos, and generated images via the
Gemini API for anything the client cannot supply. Real photos always win. Generated images fill
gaps.

---

## 1. First task: reorganize the client's Drive folder

The owner is uploading photos with minimal organization. His own description:

> "it's mostly just me standing around smiling and working on outlets and working on panels...
> Is it okay if I just kind of like dump them all in there"

He was asked to name files by subject. Assume he partially did. **This is the first task in the
build, before any component work.**

```bash
npm run images:ingest -- --drive-folder="<FOLDER_ID>" --out=./assets/source
```

### Ingest process

1. Download everything to `assets/source/_unsorted/`
2. Read EXIF: capture date, orientation, GPS if present
3. Classify each image. Use a vision model pass to tag subject, setting, people present,
   indoor/outdoor, and technical quality (blur, exposure, resolution)
4. Move into the taxonomy below and rename
5. Write `assets/manifest.json` with every image's tags, dimensions, source, and a drafted
   alt text
6. Produce `assets/REVIEW.md` listing anything ambiguous, low quality, or containing a
   customer's face or identifiable property

### Target structure

```
assets/source/
  people/
    jud/                     jud-portrait-porch-01.jpg
    justin/
    team/
  services/
    panel/                   panel-upgrade-parker-before-01.jpg
    outlet/
    switch/
    wiring/
    lighting-indoor/
    lighting-outdoor/
    ev-charging/
    ceiling-fan/
    generator/
    surge-protection/
    smoke-detector/
    inspection/
    troubleshooting/
  homes/                     exterior and interior context shots
  before-after/              paired, same filename + -before / -after
  brand/                     logo, badges, truck, uniforms
  rejected/                  too low quality to use, kept for reference
```

### Naming convention

```
{subject}-{context}-{location}-{nn}.{ext}
panel-upgrade-parker-01.jpg
jud-portrait-porch-01.jpg
ev-charger-garage-castle-rock-02.jpg
```

Lowercase, hyphens, no spaces, no dates in the filename. The filename is a mild ranking signal
and a large maintenance signal.

### Quality gate

| Reject if | Threshold |
|---|---|
| Resolution | < 1200px on the long edge |
| Blur | Laplacian variance below threshold |
| Exposure | Clipped highlights or crushed shadows across >20% of frame |
| Content | A customer's face without a release, a house number, a licence plate, an address, or anything identifying a client's property |

Flag borderline cases in `REVIEW.md`. Do not delete anything — move it to `rejected/`.

### Privacy — treat this as a hard rule

These are photos taken inside customers' homes. Before any image goes live:

- No visible house numbers, street signs, or mail
- No licence plates
- No customer faces unless the account manager confirms a release
- No documents, screens, or paperwork legible in frame
- Strip **all** EXIF, especially GPS, on export. A geotagged photo of a customer's home
  published on the internet is a real problem, not a theoretical one.

---

## 2. What real photos are needed, in priority order

| Priority | Shot | Where it goes |
|---|---|---|
| 1 | Jud, daylight, company shirt, looking at camera, at a home entryway | Hero. Carries the whole trust load. |
| 2 | Jud and Justin together, van visible | About page, homepage |
| 3 | One clean work shot per service, in a home setting | Service page heroes ×16 |
| 4 | 3–5 before/after panel pairs | Panel page, the highest-value service |
| 5 | EV charger installed in a residential garage | EV page |
| 6 | A dog in frame during a job | Homepage trust section. The owner named "good with dogs" unprompted. |
| 7 | Shoe covers on, tidy tool bag, clean work area | Trust section. Directly answers his stated fear. |
| 8 | Van in a recognisable Parker or Castle Rock setting | City pages |
| 9 | ~~Award badges~~ — **already recovered** into `assets/badges/`, five of them | Trust bar |

Items 1, 6 and 7 matter more than any of the technical shots. The buyer is deciding whether to
let a man into her house.

### Already in hand

`assets/brand/jud-bathroom-lighting-252x252.png` — a real photo of Jud on a step ladder
installing vanity lighting in a renovated residential bathroom, white polo, smiling at camera.
It is close to the hero brief in §5 of the design system, but it is only 252×252. **Ask the
owner for the original before generating any placeholder hero.** It is almost certainly on his
phone and it removes the weakest element of the launch for five minutes of his time.

---

## 3. Generated images via Gemini

For gaps only. Every generated image is tagged in the manifest and queued for replacement with
a real photo when one becomes available.

### Model selection

| Use | Model |
|---|---|
| Hero and above-the-fold images | `gemini-3-pro-image` (Nano Banana Pro) — best fidelity and text rendering |
| Service page and section images | `gemini-3.1-flash-image` (Nano Banana 2) — the generalist workhorse |
| Bulk thumbnails, OG images, icons | `gemini-3.1-flash-lite-image` (Nano Banana 2 Lite) |

> Model names change. Verify against the current Gemini API model list before the first run and
> record what you used in `docs/99-decisions-log.md`. Imagen models are retired; do not use them.

### Setup

```bash
export GEMINI_API_KEY="<provided by Chris>"
npm run images:generate -- --spec=prompts/image-briefs.md --out=./assets/generated
```

Key handling: `.env.local` only, never committed, never in client bundles. Generation runs at
build time on a developer machine or in CI, never in the browser.

### Prompt construction

Every prompt is built from four parts. Full briefs in `prompts/image-briefs.md`.

```
[SUBJECT]  what is happening, specifically
[SETTING]  a Colorado Front Range suburban home. Specify the architecture:
           two-story, stone-and-siding, neutral palette, mature landscaping
[STYLE]    natural daylight photography, warm, slightly overexposed, shallow depth of
           field, shot at eye level, documentary rather than staged, 3:2
[CONSTRAINTS] no text, no logos, no watermarks, no visible brand names, no faces in
           sharp focus unless specified, no industrial or commercial setting,
           no hard hats, no orange
```

### Worked example

> A residential electrician in a plain blue work shirt kneeling to install a white outlet in a
> baseboard of a bright suburban living room. A golden retriever lies on a rug in the soft
> background. Natural daylight from a large window, warm tones, slightly overexposed, shallow
> depth of field, shot at eye level, candid documentary photography. Colorado suburban home
> interior, neutral walls, hardwood floors. No text, no logos, no watermarks. Not industrial.
> 3:2 aspect ratio.

### Style consistency

Generate a small reference set first, pick the best 3, then pass them as reference images on
every subsequent call. Without this, sixteen service pages will look like sixteen different
websites. This is the single most common failure mode in AI-generated site imagery.

### What must never be generated

- **Jud or Justin.** Their real faces are the trust asset. A generated person representing the
  business owner is a misrepresentation.
- **Before/after work photos.** These are implicit claims about work performed. Real only.
- **Award badges or license documents.** Obviously.
- **Anything implying a specific completed job at a specific address.**
- **Customer faces.**
- **Any image where a viewer could reasonably believe they are seeing this business's actual work
  when they are not.**

Generated imagery is for context, atmosphere and illustration. It is never evidence.

### Disclosure

Keep the generated/real distinction in the manifest so anyone can answer "is this a real photo
of your work?" honestly. Prioritize replacing generated images with real ones as the client
supplies them; track it in `assets/REPLACEMENT-QUEUE.md`.

---

## 4. Processing and delivery

```bash
npm run images:process
```

1. Strip all EXIF
2. Resize to the responsive set: 400 / 800 / 1200 / 1600 / 2400 on the long edge
3. Encode AVIF (q 55) and WebP (q 80), keep a JPEG fallback
4. Generate a 20px LQIP blur placeholder, inline as base64
5. Write dimensions into the manifest so `next/image` always has explicit width and height
6. Output to `public/img/{category}/`

### Rules

- Hero image: `priority`, preloaded, AVIF, under 150KB
- Everything below the fold: `loading="lazy"`, `decoding="async"`
- Every image has explicit `width` and `height`. Unset dimensions are the main CLS source on
  the current site.
- No image over 250KB in any format at any breakpoint
- Total image weight per page under 800KB on mobile

### Alt text

Written for a person using a screen reader. One sentence, describing what is in the image.

| Good | Bad |
|---|---|
| Jud from Allsafe Electric replacing a worn outlet in a Parker living room | parker electrician electrical outlet repair parker co services |
| A new 200-amp breaker panel installed beside the old fuse box it replaced | electrical panel upgrade parker colorado electrician |
| Level 2 EV charger mounted on a garage wall next to a parked SUV | ev charger installation |

The audit script flags alt text over 6 words that reads as a keyword list, and any alt text
containing the city name more than once.

Decorative images get `alt=""` and `aria-hidden="true"`. Do not describe a background texture.

---

## 5. Open Graph images

One per page, 1200×630, generated at build time with `next/og`. Composition: the page's primary
image, the Allsafe logo, the page title in Figtree 700, and the phone number. Brand blue ground.

Do not reuse one OG image sitewide — page-specific OG images measurably improve share and
message-preview click-through, and much of this audience shares contractor recommendations in
text threads and neighborhood Facebook groups.
