# 02 — Design System

The brief: a residential electrician whose buyer is a suburban homeowner, most often a woman,
who is screening for **safety and reliability**, not price or credentials. The design's job is
to make her feel that a specific, trustworthy person will answer the phone and arrive on time.

Everything below serves that. If a choice does not, cut it.

---

## 1. Design plan (read before building)

**Concept: "the house call."**

Most home-service sites are built like brochures for a company. This one is built like an
introduction to a person. The buyer is not choosing a firm, she is deciding who to let in her
front door. The site is structured as that decision: meet him, see his work, see what
neighbors said, book a time.

**What we are deliberately not doing:**

- Not a full-bleed dark hero photo with white text and a translucent overlay. It is the default
  contractor treatment and it looks like every competitor.
- Not industrial imagery. Explicit owner constraint. No conduit, no breaker close-ups above
  the fold, no hard hats.
- Not orange. Explicit owner rejection.
- Not a grid of identical rounded cards with identical soft shadows.
- Not all-caps tracked-out eyebrow labels above every section.
- Not numbered `01 / 02 / 03` markers except on the booking flow, which genuinely is a sequence.

**The one bold element:** a **live availability strip** pinned under the header on every page,
showing real state — *"Open now. Jud answers this line. Typically on site within 2 hours."* —
with the copy changing based on the actual clock in `America/Denver`. Everything else on the
page stays quiet so this reads as information rather than decoration. It is the direct visual
expression of the owner's stated differentiator, and no competitor has it.

---

## 2. Color

Provisional values. **First build task: eyedropper the actual logo** at
`https://allsafehomeservice.com/wp-content/uploads/2024/03/allsafe-electrician-parker-1024x158.png`
(the house-with-bushes mark) and replace `--brand-blue` and `--brand-green` with the exact
hexes. Record what you found in `docs/99-decisions-log.md`. Do not proceed to component work
with placeholder brand colors.

```css
--ink:          #12283D;  /* body text, deep navy-black. never pure #000 */
--brand-blue:   #1F4E79;  /* primary brand, headers, structural */
--blue-deep:    #143755;  /* hover/pressed on blue, footer ground */
--brand-green:  #4C8B54;  /* primary action. from the logo bushes */
--green-lift:   #3D7345;  /* green hover/pressed */
--paper:        #F3F6F8;  /* page ground. cool, not cream */
--white:        #FFFFFF;
--rule:         #D8E2E8;  /* hairlines, input borders */
--muted:        #5B7186;  /* secondary text. 4.6:1 on paper */
--urgent:       #A3302A;  /* emergency banner ONLY. never a CTA, never decoration */
```

**Rules**

- Green is the action color. Every primary button is `--brand-green` with `--white` text.
  Never use green for a non-clickable element, so green becomes a learned signal for "this does
  something."
- Blue is the structural color: header, footer, section grounds, headings.
- `--urgent` appears in exactly one place: the emergency-repairs banner and the emergency
  service page hero. Using it anywhere else destroys its meaning.
- No gradients as decoration. One permitted use: a very subtle vertical `--paper` → `--white`
  on the hero ground to lift the booking card. Under 4% luminance shift.
- Shadows: two levels only. `--shadow-lift` for the booking card and sticky bar,
  `--shadow-rest` for nothing else. Do not put a shadow under every card.

**Contrast gates.** All body text ≥ 4.5:1. All interactive text ≥ 4.5:1. Focus rings 3:1
against both adjacent colors. This audience skews older than the average web user; do not ship
`--muted` on `--white` at 14px.

---

## 3. Typography

Two families, clearly distinct roles.

| Role | Family | Why |
|---|---|---|
| Interface, headings, body | **Figtree** | Humanist geometric, warm open apertures, wide weight range. Friendly without being childish. Not Inter, not Poppins. |
| Customer reviews, pull quotes, Jud's own words | **Newsreader** | A reading serif. Reviews are the emotional core of this page; setting them in a different voice makes them read as a person talking rather than as UI text. |

Load only the weights used: Figtree 400/500/700, Newsreader 400/400italic. Self-host via
`next/font/local` with `display: swap`. No render-blocking font CSS.

### Type scale

Major third (1.25), 18px base. Body is 18px because the audience skews 35–60 and much of the
traffic arrives on a phone.

```
--step--1:  0.875rem / 1.5    14px   labels, legal, captions
--step-0:   1.125rem / 1.65   18px   body
--step-1:   1.375rem / 1.5    22px   lead paragraph, h4
--step-2:   1.75rem  / 1.35   28px   h3
--step-3:   2.25rem  / 1.25   36px   h2
--step-4:   3rem     / 1.15   48px   h1  (mobile: 2.25rem)
--step-5:   3.75rem  / 1.05   60px   hero h1 only, desktop
```

**Rules**

- Max measure **68 characters** for Figtree body, **74** for Newsreader review text.
- Headings are set in Figtree 700 at `--ink` or `--brand-blue`. Never green.
- Never accent one word inside a headline in a different color or italic. It is the single
  most common generated-page tell.
- Sentence case everywhere, including buttons. Not `SCHEDULE SERVICE ONLINE` — `Book a visit`.
- No all-caps labels. If a label needs emphasis, use weight or a rule, not caps.
- Do not append `→` to link or button text.

---

## 4. Layout

12-column grid, 1200px max content width, 72px gutters desktop / 20px mobile.
Section vertical rhythm: 96px desktop, 56px mobile. One rhythm, applied consistently — most of
the "cheap" feeling in the current site comes from arbitrary section padding.

Content is **left-aligned**. Centered body copy at this length is harder to read and reads as
template. Center only: the availability strip, and single-line section labels above a grid.

### Homepage wireframe

```
┌──────────────────────────────────────────────────────────────┐
│  logo            services  areas  about  reviews   (303)…  ▸ │   sticky
├──────────────────────────────────────────────────────────────┤
│  ● Open now · Jud answers this line · usually on site in 2h  │   live strip
├────────────────────────────────┬─────────────────────────────┤
│ h1  Your Parker electrician    │  ┌───────────────────────┐  │
│     answers the phone.         │  │  Book a visit          │  │
│                                │  │  ○ Today  ○ Tomorrow   │  │
│  Licensed since 2018. Jud and  │  │  [ service ▾ ]         │  │
│  Justin do the work themselves.│  │  [ zip ]               │  │
│                                │  │  ( Check availability )│  │
│  ★★★★★ 200+ Google reviews     │  └───────────────────────┘  │
│                                │   or call (303) 648-1934    │
│  [ photo: Jud, real, on a      │                             │
│    front porch, daylight ]     │                             │
├────────────────────────────────┴─────────────────────────────┤
│  BBB A+   ·   Angi Super Service   ·   HomeAdvisor Approved  │   real badges
├──────────────────────────────────────────────────────────────┤
│  What we fix           (8 services, image + one line each)   │
├──────────────────────────────────────────────────────────────┤
│  "Will he actually show up?"                                 │
│   3 promises, each with the proof underneath, not a claim    │
├──────────────────────────────────────────────────────────────┤
│  Live Google reviews  (5, real, with GBP attribution)        │
├──────────────────────────────────────────────────────────────┤
│  Where we work   (map + linked city list, all service areas) │
├──────────────────────────────────────────────────────────────┤
│  Answers  (FAQ, marked up as FAQPage)                        │
├──────────────────────────────────────────────────────────────┤
│  Footer: NAP · licenses · services · areas · GBP link        │
└──────────────────────────────────────────────────────────────┘
       [ mobile only: sticky bar — Call · Book · Estimate ]
```

The booking card overlapping the hero photo is the layout's one asymmetry. Everything else is
disciplined and aligned.

---

## 5. The hero

**Do not** use a stock image of an electrician in a hard hat.

The hero photo is a real photo of **Jud**, outdoors or in a home entryway, in daylight, in a
company shirt, looking at camera, not holding a tool. It should read like a photo of a neighbor,
not a headshot and not an action shot. From the client's Drive folder; if nothing usable exists,
generate per `docs/11-image-pipeline.md` and mark it for replacement.

**Headline** must be about answering and showing up, not about being licensed. Options to test:

- "Your Parker electrician answers the phone."
- "A real person picks up. Usually Jud."
- "We show up when we said we would."

**Subhead** carries the credentials so the headline does not have to:
*"Licensed master electrician serving Parker, Castle Rock and Highlands Ranch since 2018.
Jud and Justin do the work themselves."*

---

## 6. Components

### 6.1 Buttons

| Variant | Use | Style |
|---|---|---|
| Primary | Book a visit | `--brand-green` fill, white text, 6px radius, 52px min height |
| Secondary | Call | `--brand-blue` outline 2px, blue text, transparent fill |
| Tertiary | Get an estimate | text link with 2px underline offset 4px |

Minimum tap target 48×48. Focus ring: 3px `--brand-blue` offset 2px, visible on keyboard only
via `:focus-visible`.

### 6.2 Live availability strip

Server-rendered initial state from `America/Denver`, hydrated to stay accurate.

| State | Copy |
|---|---|
| Mon–Fri 08:00–18:00 | ● Open now · Jud answers this line · usually on site within 2 hours |
| Mon–Fri 18:00–20:00 | ● After hours · Emergency line open · call (303) 648-1934 |
| All other | ● Opens {day} at 8am · book online any time |

Green dot when open, blue dot when closed. Never red — red is reserved for `--urgent`.

### 6.3 Review card

Newsreader 400, the review text at `--step-1`, the reviewer's first name and neighborhood
underneath in Figtree 500 `--step--1`. Google's "G" mark and the words "Google review" for
attribution, per Google's Places API display requirements. Stars rendered as inline SVG, not
an icon font, with an accessible label.

### 6.4 Service card

Photo, `<h3>` service name, one sentence, a text link. No shadow, no hover lift, no border
radius beyond 6px. The differentiation between cards is the photograph, not the chrome.

### 6.5 Mobile sticky action bar

Three equal segments: **Call · Book · Estimate**. Appears after 400px of scroll. 64px tall,
safe-area inset padding, `--brand-blue` ground with the Book segment in `--brand-green`.
This is the highest-value component on the site — most emergency traffic is on a phone.

---

## 7. Motion

One orchestrated moment: on first paint, the hero headline and the booking card fade up 12px
over 320ms with a 60ms stagger. That is the entire motion budget for the page load.

- No fade-and-slide-up on every section as it scrolls into view. It is the clearest
  generated-page tell and it hurts perceived performance.
- No hover lift or scale on cards.
- Motion in response to a user action (accordion open, form step, booking confirmation) is
  welcome and should be 150–200ms.
- Respect `prefers-reduced-motion: reduce` — disable all non-essential transitions.

---

## 8. Imagery direction

| Do | Don't |
|---|---|
| Homes, porches, kitchens, living rooms | Warehouses, industrial panels, conduit runs |
| Daylight, warm, slightly overexposed | Dramatic low-key lighting, blue-hour |
| Jud and Justin, clearly, repeatedly | Faceless generic "technician" |
| Families, kids' rooms, dogs in frame | Empty rooms with equipment |
| Clean shoe covers, tidy tool bag | Anything that reads as messy or rushed |
| Real Colorado suburban housing stock | Coastal or southwest architecture |

The dog is not a gimmick. The owner named "good with dogs" unprompted as a trust signal. At
least two images on the site should include a dog in a home setting.

Alt text is written for a person using a screen reader, not for a keyword. "Jud from Allsafe
Electric replacing an outlet in a Parker home" is correct. "parker electrician electrical
services parker co" is not, and will be flagged by `npm run audit:seo`.

---

## 9. Accessibility floor

- Semantic landmarks: `header`, `nav`, `main`, `footer`, one `h1`
- Skip-to-content link, first focusable element
- All form inputs have persistent visible labels. Never placeholder-only.
- Errors described in text next to the field, not by color alone, with `aria-describedby`
- Phone links are real `tel:` anchors, not `onClick` handlers
- Reviews carousel is keyboard operable and pausable
- Tested at 200% browser zoom without horizontal scroll

---

## 10. Self-critique gate

Before shipping any page, look at it and ask:

1. Could this be any home-service company in any city? If yes, the photography and copy are
   not doing their job.
2. Is there a single memorable element, or is boldness spread across five things?
3. Is there any orange? Any all-caps label? Any `→` in a button? Any word accented inside a
   headline? Remove it.
4. Does the fold answer "will he show up and is he safe in my house"? If not, restructure.
5. Remove one accessory. There is almost always one decorative element that can go.
