# 02 — Design System

**Status: largely superseded by the client-supplied palette and designer homepage artifact
(2026-09-10). The palette in §2 and the homepage wireframe in §4 are authoritative.
Sections of this document that conflict with the decisions log entry dated 2026-09-10
("Client palette + designer homepage adopted") are superseded. Load-bearing rules (no orange
band hex values, accessibility floors, motion budget) are unchanged.**

The brief: a residential electrician whose buyer is a suburban homeowner, most often a woman,
who is screening for **safety and reliability**, not price or credentials. The design's job is
to make her feel that a trustworthy, professional company will answer the phone and arrive on time.

Everything below serves that. If a choice does not, cut it.

---

## 1. Design plan (read before building)

**Concept: "the house call."**

Most home-service sites are built like brochures for a company. This one is built like an
introduction to that company's standards. The buyer is not choosing a firm by its letterhead;
she is deciding who to let in her front door. The site is structured as that decision: meet the
company, see its work, see what neighbors said, book a time.

**What we are deliberately not doing:**

- Not a full-bleed dark hero photo with white text and a translucent overlay. It is the default
  contractor treatment and it looks like every competitor.
- Not industrial imagery. Explicit owner constraint. No conduit, no breaker close-ups above
  the fold, no hard hats.
- Not a grid of identical rounded cards with identical soft shadows.

**The one bold element:** a **live availability strip** pinned under the header on every page,
showing real state — *"Open now. A real person answers this line. Typically on site within
2 hours."* — with the copy changing based on the actual clock in `America/Denver`. Everything
else on the page stays quiet so this reads as information rather than decoration. It is the
direct visual expression of the owner's stated differentiator, and no competitor has it.

---

## 2. Color (authoritative — client-supplied 2026-09-10)

| Token | Hex | Role |
|---|---|---|
| blue-600 | `#0068A8` | Primary, structural, links, headers |
| orange-500 | `#FF6600` | Accent, primary CTAs, eyebrows, icons, badges |
| slate | `#54595F` | Body copy |
| grey | `#7A7A7A` | Secondary / muted text |
| ink / black | `#000000` | Headings |
| navy | `#0A2E4C` family | Hero / CTA / footer grounds |

Additional ramp values recorded in `tailwind.config.ts` and `app/globals.css`.

**Rules**

- Orange is the accent and CTA color. Primary buttons use `#FF6600` with white text.
- Blue is the structural color: header, footer, section grounds, headings.
- `--urgent` (`#A3302A` or equivalent) appears in exactly one place: the emergency-repairs
  banner and the emergency service page hero. Using it anywhere else destroys its meaning.
- No decorative gradients except a very subtle one permitted under the hero booking card.
- Shadows: two levels only. Lift for the booking card and sticky bar; rest for nothing else.

**Contrast gates.** All body text ≥ 4.5:1. All interactive text ≥ 4.5:1. Focus rings 3:1
against both adjacent colors. This audience skews older than the average web user; do not ship
muted-grey text on white at 14px.

**Hex audit rule.** `npm run audit:seo` warns on any hex value outside the approved palette and
the mandated third-party brand colors (Google G colors, BBB red). It no longer fails on orange
(orange is now in the palette). It still fails on the old provisional palette colors.

---

## 3. Typography

**Current fonts (client-directed 2026-09-10):** Poppins (display/headings) + Inter (body).
Load only the weights used. Self-hosted via `next/font` with `display: swap`.

### Type scale

Major third (1.25), 18px base. Body is 18px because the audience skews 35–60 and much of the
traffic arrives on a phone. Values use fluid `clamp()` sizing:

```
display:   clamp(2.5rem, 5vw, 4rem)      hero headings only
h1:        clamp(2rem, 4vw, 3rem)
h2:        clamp(1.5rem, 3vw, 2.25rem)
h3:        clamp(1.25rem, 2.5vw, 1.75rem)
body:      1.125rem / 1.65
small:     0.875rem / 1.5
```

**Rules**

- Max measure **68 characters** for body, **74** for review text.
- Headings are set in Poppins 700 at black or navy. Never green.
- All-caps headings are permitted in hero and eyebrow contexts (client-directed, per designer
  artifact). Limit to those two contexts.
- Sentence case on buttons and navigation. Not `SCHEDULE SERVICE ONLINE` — `Book a visit`.
- No em dashes anywhere in customer-facing copy. All 273 were removed; `npm run audit:seo`
  fails the build on any `—` in visible page text. En dashes in ranges (`Mon–Fri`, `$2,200–$4,500`)
  are correct and still allowed.

---

## 4. Layout (client homepage artifact — authoritative)

The homepage is built section-for-section to the designer artifact supplied 2026-09-10:

```
[ Black info top bar: license numbers, hours, address ]
[ Sticky white header: logo · services mega-menu · areas · reviews · phone · Book button ]
[ Availability strip ]
[ Navy hero: all-caps H1, subhead, overlapping estimate form on right ]
[ Stats band ]
[ About: stacked images + BBB tag ]
[ 4-card services row ]
[ Why choose us: 2×2 grid ]
[ Service areas + map ]
[ Testimonials ]
[ FAQ with blue contact card ]
[ Navy CTA band ]
[ Footer ]
[ Mobile sticky bar: Call · Book · Estimate ]
```

12-column grid, 1200px max content width. Section vertical rhythm: 96px desktop, 56px mobile.
Content is **left-aligned** except the availability strip and single-line eyebrow labels.

---

## 5. The hero

**Do not** use a stock image of an electrician in a hard hat.

The hero photo comes from the client's real photo library. It should read like a photo of a
trusted neighbor, not a headshot and not an action shot.

**Headline** must be about answering and showing up, not about being licensed.

- "Your south Denver metro electrician answers the phone."
- "A real person picks up. We show up when we said we would."
- "We show up when we said we would."

**Subhead** carries the credentials:
*"Licensed master electrician serving Parker, Castle Rock, Highlands Ranch and 18 more
communities since 2018."*

Do not name an individual in the hero headline or subhead. The differentiator is operational
("we answer," "we show up"), not personal.

---

## 6. Components

### 6.1 Buttons

| Variant | Use | Style |
|---|---|---|
| Primary | Book a visit | `#FF6600` orange fill, white text, 6px radius, 52px min height |
| Secondary | Call | `#0068A8` blue outline 2px, blue text, transparent fill |
| Tertiary | Get an estimate | text link with 2px underline offset 4px |

Minimum tap target 48×48. Focus ring: 3px offset 2px, visible on keyboard only via
`:focus-visible`.

### 6.2 Live availability strip

Server-rendered initial state from `America/Denver`, hydrated to stay accurate.

| State | Copy |
|---|---|
| Mon–Fri 08:00–18:00 | ● Open now · A real person answers · typically on site within 2 hours |
| Mon–Fri 18:00–20:00 | ● After hours · Emergency line open · call (303) 648-1934 |
| All other | ● Opens {day} at 8am · book online any time |

Green dot when open, blue dot when closed. Never red — red is reserved for emergency-only
contexts. Do not name an individual in the strip copy; the promise is operational.

### 6.3 Review card

Review text in Poppins or Inter at the lead paragraph size; reviewer's first name and
neighborhood underneath in a smaller weight. Google's "G" mark and the words "Google review"
for attribution, per the Places API display requirements. Stars rendered as inline SVG with
an accessible label.

### 6.4 Service card

Photo, `<h3>` service name, one sentence, a text link. Card radius 14px. One subtle shadow.

### 6.5 Mobile sticky action bar

Three equal segments: **Call · Book · Estimate**. Appears after 400px of scroll. 64px tall,
safe-area inset padding, blue ground with the Book segment in orange.
This is the highest-value component on the site — most emergency traffic is on a phone.

---

## 7. Motion

One orchestrated moment: on first paint, the hero headline and the booking card fade up 12px
over 320ms with a 60ms stagger. That is the entire motion budget for the page load.

- No fade-and-slide-up on every section as it scrolls into view.
- Restrained hover state on cards (scale or shadow lift, not both).
- Motion in response to a user action (accordion open, form step) should be 150–200ms.
- Respect `prefers-reduced-motion: reduce` — disable all non-essential transitions.

---

## 8. Imagery direction

| Do | Don't |
|---|---|
| Homes, porches, kitchens, living rooms | Warehouses, industrial panels, conduit runs |
| Daylight, warm, slightly overexposed | Dramatic low-key lighting |
| Real company photos (Jud on About/homepage) | Faceless generic "technician" stock |
| Families, kids' rooms, dogs in frame | Empty rooms with equipment |
| Clean shoe covers, tidy tool bag | Anything that reads as messy or rushed |
| Real Colorado suburban housing stock | Coastal or southwest architecture |

The dog is not a gimmick. The owner named "good with dogs" unprompted as a trust signal. At
least two images on the site should include a dog in a home setting.

Alt text is written for a person using a screen reader, not for keyword stuffing.
"An electrician replacing an outlet in a Parker kitchen" is correct. "parker electrician
electrical services parker co" is not, and the audit script will flag it.

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
3. Does anything commit the company to staying small, naming only one person as the one who
   answers and arrives? If yes, reframe it as a company standard.
4. Does the fold answer "will someone show up and are they safe in my house"? If not, restructure.
5. Is there any vendor name, British spelling, or internal planning note visible to visitors?
   If yes, remove it.
