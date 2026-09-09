# Recovered Assets

Pulled from the live site September 2026. These replace the "source the real badge assets"
open item.

> The host serves a bot challenge on direct requests. These were retrieved through an image
> proxy. If you need to re-pull anything, that is the workaround.

---

## Badges — `assets/badges/`

The awards **are** on the live site, but not where the four repeated `<img>` tags are. Those
four are the company logo repeated. The real badge strip is a separate composite image:

`/wp-content/uploads/2024/03/best-electrician-in-parker-colorado.png` (1192 × 173)

There are **five** badges in it, not four. Cropped to individual transparent PNGs:

| File | Badge | Year on badge |
|---|---|---|
| `best-of-houzz-2023.png` | Best of Houzz — Service | **2023** |
| `angi-super-service-2022.png` | Angi Super Service Award | **2022** |
| `nextdoor-neighborhood-favorite-2022.png` | Nextdoor Neighborhood Favorite | **2022** |
| `bbb-accredited-a-plus.png` | BBB Accredited Business, A+ Rating | undated |
| `homeadvisor-screened-approved.png` | HomeAdvisor Screened & Approved | undated |

`_source-strip-1192x173.png` is the uncropped original, kept for reference.

### Two corrections to the earlier brief

1. **"Neighborhood Favorite" is Nextdoor, not HomeAdvisor.** The call transcript ran
   "HomeAdvisor approved" and "neighborhood favorite" together and they are two different
   programs from two different platforms. Label them correctly on the site.
2. **There is a Best of Houzz award** that was never mentioned on the call or the intake form.

### Three things to resolve before these ship

1. **The dates are stale.** Best of Houzz 2023, Angi 2022, Nextdoor 2022. It is September 2026.
   Houzz, Angi and Nextdoor all issue these annually. Either Allsafe has newer badges that were
   never added to the site, or they stopped qualifying. **Ask the owner and check each
   platform's dashboard.** Displaying a 2022 award in 2026 reads as neglect to exactly the
   buyer we are trying to reassure, and it is a worse signal than showing no badge at all.
   - If newer badges exist: use those, drop these.
   - If not: show BBB and HomeAdvisor (both undated) and hold the dated three until they are
     re-earned. Do not crop the year off a dated badge — that violates every one of these
     programs' brand terms.
2. **Resolution is marginal.** Each crop is roughly 120–150px wide. That renders acceptably at
   about 60px tall, not at 90px, and it will look soft on a retina display. Every one of these
   programs publishes an official asset kit at proper resolution. Pull from there for production
   and treat these as the interim.
3. **Profile URLs are still needed.** Each badge should link to the real profile it represents:
   BBB, Angi, HomeAdvisor, Nextdoor, Houzz. Those URLs also belong in the `sameAs` array in
   `docs/06-schema-spec.md` §2. A badge that links nowhere is decoration; a badge that links to
   a verifiable profile is proof.

---

## Brand — `assets/brand/`

### `allsafe-electric-logo.png` (1097 × 274)

The logo the owner described on the call: a house mark with a green pine element and two
starburst accents, wordmark in blue, tagline "Safety Security Satisfaction" in green.

**This is the source for the brand palette.** Eyedropper it and record the exact hexes in
`docs/99-decisions-log.md`, closing open question #2. Provisional values in
`docs/02-design-system.md` §2 are placeholders until this is done.

Note the tagline. "Safety Security Satisfaction" is already his positioning and it lines up with
what he said the site needs to communicate. Use it.

### `jud-bathroom-lighting-252x252.png` (252 × 252)

**A real photo of Jud**, on a step ladder installing vanity lighting in a renovated residential
bathroom, in a white polo, smiling at camera. Arched mirrors, blue-grey vanity, bright and warm.

This is very close to the hero brief in `docs/02-design-system.md` §5 and `docs/11` §2: a real
person, a real home, residential rather than industrial, warm and approachable.

**But 252 × 252 is far too small for a hero.** It needs roughly 2000px on the long edge.
Request the original from the owner before generating any placeholder hero. It is almost
certainly sitting on his phone, and it is a five-minute ask that removes the single weakest
element of the launch.

---

## Follow-ups this opens

| # | Item | Owner |
|---|---|---|
| A | Are there newer Houzz / Angi / Nextdoor badges? | Account manager → owner |
| B | Official high-res badge assets from each program's kit | Account manager |
| C | Profile URLs for all five badges, for links and `sameAs` | Account manager |
| D | The full-resolution original of the Jud bathroom photo | Owner |
| E | Exact brand hexes eyedropped from the logo | Build team |
