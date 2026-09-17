# Handoff: Love & Light Foundation — Scroll-Story Landing Page

## Overview
Single-page public website for **The Love and Light Community and Humanitarian Foundation** (Love & Light Foundation), a Nigerian nonprofit operating in Nigeria and Tanzania. The page tells the organisation's story as seven full-viewport "chapters" revealed by scrolling, with subtle 3D reveal transitions, then closes with a partner band and footer. Goals: drive sign-ups to two Google Forms (Friends monthly giving, Volunteers) and partnership emails.

A second, conventional (non-story) version of the same content is included as `Love & Light Landing.dc.html` for reference. **Implement the Story version.**

## About the Design Files
The `.dc.html` files in this bundle are **design references created in HTML** — interactive prototypes showing intended look, copy, and behaviour. They are not production code. `support.js` and `image-slot.js` are prototype runtime helpers; ignore them. Recreate the design in the target codebase's framework (Next.js/React, Astro, Vue, plain HTML+CSS, etc.). If no codebase exists, a static-site framework (Astro or Next.js static export) with plain CSS is a good fit — there is no backend; every CTA is an external link.

## Fidelity
**High-fidelity.** Colours, type, spacing, radii, shadows, copy and motion are final. Recreate pixel-accurately at 1440px, and follow the responsive rules below for narrower widths.

## Hard brand rules (from the client brief)
- Only two hues: green `#1E7A2C` and yellow `rgb(255,236,60)`.
- Yellow is **never** a fill, button or text colour. It appears only as soft radial light glows (10–18% opacity feathered to 0) behind the hero and the Friends panel.
- Green is **never** a page/section background. It appears only as glass tint, small labels/dates/icon strokes, the primary pill button, the CSR card and the Friends panel.
- One typeface: **Manrope** (Google Fonts), weights 400/500/600. No italics anywhere. No other family.
- No emoji, no gradients other than the light glows, no stock icon tiles. Icons are 1.5px single-stroke green line icons.
- Copy is fixed. Do not paraphrase or invent facts/statistics. Missing content stays a labelled placeholder (`[PHOTO: …]`, `[DATE]`).
- Every button has a real link (see Links).

## Design Tokens

### Colours
- Page ground: `#FCFBF0`
- Heading ink: `#111411`
- Body text: `#5B625B`
- Caption / muted: `#8A908A`
- Brand green: `#1E7A2C` (hover for links: `#166022`)
- Yellow light: `rgba(255,236,60, 0.16)` → `rgba(255,236,60, 0)` (radial glow)
- Hairline divider: `rgba(0,0,0,0.07)`, 1px
- White on green: `#FFFFFF`; muted white `rgba(255,255,255,0.85)` / `0.9`

### Surfaces
**Standard glass** (all cards, chips, event cards, Volunteer panel):
```
background: rgba(30,122,44,0.06);
border: 1px solid rgba(30,122,44,0.18);
backdrop-filter: blur(22px);
box-shadow: inset 0 1px 0 rgba(255,255,255,0.9), 0 12px 40px rgba(17,20,17,0.06);
border-radius: 22–24px (cards/panels), 18px (stat chips)
```
**Strong glass** (CSR card, Friends panel, primary buttons):
```
background: #1E7A2C;
box-shadow: inset 0 1px 0 rgba(255,255,255,0.35), 0 16px 48px rgba(30,122,44,0.28);  /* Friends panel: 0 24px 64px rgba(30,122,44,0.3) */
```
**Fixed nav**: `background: rgba(252,251,240,0.7); backdrop-filter: blur(24px); border-bottom: 1px solid rgba(30,122,44,0.12)`.

### Typography (Manrope)
- H1 hero: 76px / 1.02 / 500 / letter-spacing -0.03em (fluid: `clamp(42px, 5.3vw, 76px)`)
- Chapter 02 headline: 64px / 1.04 / 500 / -0.03em (`clamp(38px, 4.4vw, 64px)`)
- H2 section: 52px / 1.08 / 500 / -0.03em (`clamp(36px, 3.6vw, 52px)`)
- Partner band H2: 44px / 1.08 / 500 / -0.03em (`clamp(32px, 3vw, 44px)`)
- H3 panel: 36px / 1.1 / 500 / -0.03em (`clamp(28px, 2.5vw, 36px)`)
- Chapter 03 statement: 34px / 1.3 / 500 / -0.02em (`clamp(22px, 2.4vw, 34px)`)
- Impact numbers: 72px / 1 / 500 / -0.04em, `font-variant-numeric: tabular-nums` (`clamp(48px, 5vw, 72px)`)
- Stat chip number: 28px / 600 / -0.03em
- Programme card title: 24px / 500 / -0.02em; event title 22px / 1.25 / 500 / -0.02em
- Body large: 20px / 1.65 / 400; hero body 18px / 1.6; card body 16px / 1.7; small body 15px / 1.6
- Eyebrow / labels: 13px / 600 / letter-spacing 0.08em / uppercase / green
- Footer labels: 12px / 600 / 0.08em / uppercase / green
- Chapter rail labels: 11px / 600 / 0.08em / uppercase
- Nav links: 15px / 500; buttons 15px / 600 (nav button 14px)
- Captions/copyright: 13px `#8A908A`

### Spacing & shape
- Content max-width 1440px, centred. Horizontal page padding `clamp(20px, 5.5vw, 80px)`.
- Chapter sections: `min-height: 100vh`, vertical padding 120px, `border-top: 1px solid rgba(0,0,0,0.07)`, `perspective: 1400–1600px`.
- Card grid gap 20px. Panel padding `clamp(28px, 3.3vw, 48px)`. Card padding 32px.
- Radii: pill buttons `999px`; cards 22px; panels 24px; chips 18px; SDG icons 12px; event photo 14px.
- Buttons: primary `padding 16px 28px`; secondary `15px 28px` with `border: 1px solid rgba(30,122,44,0.35); background: rgba(30,122,44,0.04); color: #1E7A2C`; nav pill `11px 20px`.

## Screens / Sections (single page, in order)

### Fixed nav
Full-width, fixed top, z-index 50, glass (see Surfaces). Inner row: max 1440, `padding 16px [page-padding]`, space-between.
- Left: logo `assets/logo.png`, height 44px, links to `#begin`.
- Centre (≥900px only): links About→`#belief`, Programmes→`#action`, Events→`#now`, News & Stories→`#partner`, Contact→`#contact`. Gap 36px, colour `#111411`.
- Right: pill "Get involved" → `#join`, green primary, `box-shadow: inset 0 1px 0 rgba(255,255,255,0.35), 0 8px 24px rgba(30,122,44,0.25)`.

### Chapter rail (≥900px only)
Fixed, right 28px, vertically centred, z-index 40. Seven rows (Begin, Belief, Change, Action, Reach, Now, Join), column gap 14px, right-aligned. Each row: label (11px, green, opacity 1 when active else 0) + green dot 6px tall, pill; active dot is 28px wide / opacity 1, inactive 6px / opacity 0.3. Transitions 0.3s. Click scrolls smoothly to the chapter. Active chapter = last section whose top ≤ 50% viewport height.

### 01 Begin (`#begin`, hero)
Two-column grid `repeat(auto-fit, minmax(min(100%,520px),1fr))`, gap 60px, align centre, padding `140px [pad] 120px`. Yellow glow: 900×900 circle, `radial-gradient(circle, rgba(255,236,60,0.16) 0%, transparent 62%)`, positioned `right:-60px; top:-80px`, pointer-events none.

Left column:
- Eyebrow: 7px green dot + "Nigeria · Tanzania"
- H1: "Changing lives. Creating possibilities."
- Body (max 560px): "Love & Light Foundation is a nonprofit organization committed to improving lives through humanitarian assistance, quality education, youth and community empowerment, strategic partnerships and sustainable interventions that preserve dignity and create opportunity."
- Button row (gap 14px, wrap, margin-top 40px): primary "Become a Friend", secondary "Become a Volunteer", text link "Partner with us →" (green, 600).

Right column: box max 680px, aspect 680/620.
- Circular photo, `left 6%; top 2%; width 88%; aspect 1`, masked `radial-gradient(circle, #000 55%, transparent 100%)` so edges fade into the page. Placeholder label **[PHOTO: James & Sunmi]** (client to supply).
- Floating stat chip A (glass, radius 18, padding 16px 22px) at `left 0; top 120px`: "5,000+" / "families reached".
- Chip B at `right 0; bottom 90px`: "80+" / "volunteers".
- Bottom-left scroll cue: 1px×36px green line (40% opacity) bobbing 8px over 1.8s ease-in-out infinite + "SCROLL TO BEGIN THE JOURNEY" (12px, 600, 0.08em, `#8A908A`).

### 02 Belief (`#belief`)
Two columns `minmax(min(100%,440px),1fr)`, gap `clamp(32px,5.5vw,80px)`, align end.
- Left: eyebrow "Chapter 02 · Our story"; headline "We believe where you're born should never determine how far you can go."
- Right: body 20px: "Every day, millions of people are held back not by a lack of potential, but by a lack of opportunity. A child goes to bed hungry instead of learning. A young person with brilliant ideas never gets the chance to develop them. A woman with dreams of financial independence lacks the support to begin. We believe that can change."

### 03 Change (`#change`)
- Eyebrow "Chapter 03 · Compassion into action"
- Statement (34px, max 1100px): "Love & Light Foundation exists to turn compassion into action by providing food where there is hunger, creating opportunities where there are barriers, and empowering individuals and communities to build a better future. Because lasting change doesn't happen through charity alone. It happens when people are given the opportunity to thrive."
- Line (20px body, margin-top 40px): "Together, we're changing lives, creating opportunities, and building hope."
- SDG row (flex, gap 14px, margin-top 48px): four bare images 120×120, radius 12px, no card: `sdg-1.gif` No Poverty, `sdg-2.gif` Zero Hunger, `sdg-4.gif` Quality Education, `sdg-17.gif` Partnerships for the Goals. `alt`/`title` = goal name.

### 04 Action (`#action`, programmes)
- Eyebrow "Chapter 04 · What we do"; H2 "Six ways we turn compassion into action." (max 900px)
- Grid `minmax(min(100%,300px),1fr)`, gap 20, margin-top 64. Six cards, padding 32, radius 22, min-height 240, flex column space-between:
  - Top row: 32px line icon (stroke 1.5, round caps) left; number "01"–"06" right (13px, 600, green).
  - Bottom: title 24px.
  - Cards 01–05 standard glass: Food Security · Education · Youth Empowerment · Women Development · Community Development.
  - Card 06 "CSR Execution for Partners" strong glass: bg `#1E7A2C`, white icon, number `rgba(255,255,255,0.8)`, white title.
- Icon SVG paths (24 viewBox) are in the prototype's `icons` array; reuse or substitute equivalent 1.5px line icons (bowl, open book, sprout, person, buildings, briefcase/checklist).

### 05 Reach (`#reach`, impact)
- Eyebrow "Chapter 05 · Our reach so far"
- Grid `minmax(min(100%,280px),1fr)`, no gap, `border-top` hairline, margin-top 56. Six cells, padding `44px 32px 44px 0`, `border-bottom` hairline, gap 10:
  5,000+ Families Reached · 1,500+ Conference Attendees · 500+ Young People Empowered · 2 Countries Reached (Nigeria & Tanzania) · 80+ Volunteers · 12+ Community Projects
- Numbers count up from 0 as they reveal (see Motion); use `toLocaleString('en-US')` + suffix.

### 06 Now (`#now`, events)
- Eyebrow "Chapter 06 · Events"; H2 "Current opportunities to create impact."
- Three glass cards, padding `12px 12px 28px`, radius 22, gap 20: photo area 260px tall (radius 14, placeholder), then date (13px, 600, green) and title (22px).
  - December 2026 — Food Outreach 2026 — [PHOTO: Food Outreach]
  - 2027 — Global Skills for Youth 2027 — [PHOTO: Global Skills for Youth]
  - [DATE] — Legacy Project: School Renovation — [PHOTO: School Renovation]

### 07 Join (`#join`, get involved)
Yellow glow 900×900 at `right:-120px; top:40px`. Eyebrow "Chapter 07 · Your part in the story". Two panels `minmax(min(100%,420px),1fr)`, gap 20, margin-top 32, radius 24, flex column.

**Left — standard glass, "Volunteer With Us"**
- Label (13px eyebrow), H3 "Be the reason someone believes tomorrow can be better."
- Body 16px/1.7: "Your time, skills, and passion can create lasting change. Whether you're a student, young professional, creative, entrepreneur, or simply someone who wants to make a difference, there's a place for you at Love & Light Foundation. Join our community of volunteers and help us deliver outreaches, empower communities, organize impactful events, and bring hope to those who need it most."
- Secondary button "Become a Volunteer" (margin-top 36).

**Right — solid green, "Friends of Love & Light"**
- Header row space-between: label (white 85%) + badge "From ₦2,000 / month" (pill, `border 1px rgba(255,255,255,0.35); background rgba(255,255,255,0.1)`, 13px 600 white).
- H3 white "Change a life every month."
- Body white 90%: "Friends of Love & Light is our monthly giving community, a family of compassionate people committed to creating lasting impact through consistent generosity. With a commitment of ₦2,000 or more each month, you help provide meals, expand access to education, empower young people with life-changing skills, and support community development projects throughout the year."
- List (gap 12, 15px 500 white, 18px white check icon): Exclusive impact updates · Transparent reports on your giving · Invitations to special projects and annual gatherings · The joy of knowing you're changing lives consistently
- Closing (15px, white 85%): "Because lasting impact isn't built by one person, it is built by people who choose to show up, month after month."
- Button "Become a Friend": white pill, green text, `box-shadow 0 8px 24px rgba(0,0,0,0.12)`.

### Partner band (`#partner`)
Flex wrap space-between, padding `90px [pad]`, gap `32px 60px`, hairline top. Left: H2 "Partner with us" + 18px body (max 760px) "Corporates, foundations and institutions: we plan and deliver CSR programmes that create measurable change in communities." Right: primary pill "Start a partnership" (nowrap).

### Footer (`#contact`)
Grid `minmax(min(100%,260px),1fr)`, gap 48, padding `64px [pad] 0`, hairline top.
- Col 1: logo 64px tall + 15px body (max 420px): "The Love and Light Community and Humanitarian Foundation is a Nigerian nonprofit improving lives through humanitarian assistance, education and community empowerment."
- Col 2: label "Contact"; `Loveandlightfoundation1@gmail.com` (mailto), `0808 690 4663` (`tel:+2348086904663`).
- Col 3: label "Follow @loveandlightngo"; Instagram, TikTok, LinkedIn, YouTube.
- Copyright row (margin-top 48, hairline top, padding `24px [pad] 40px`, 13px `#8A908A`): "© 2026 The Love and Light Community and Humanitarian Foundation. All rights reserved."

## Links
- Become a Friend → https://forms.gle/JpWV2ySyA9g27Hc68
- Become a Volunteer → https://forms.gle/1QqAi7k2k63Jhjpv6
- Partner with us / Start a partnership → mailto:Loveandlightfoundation1@gmail.com
- Instagram https://www.instagram.com/loveandlightngo · TikTok https://www.tiktok.com/@loveandlightngo · LinkedIn https://www.linkedin.com/company/loveandlightngo/ · YouTube https://youtube.com/@loveandlightngo
- Nav anchors as listed above. `scroll-behavior: smooth` on html.
- Links: default colour `#1E7A2C`, hover `#166022`, no underline. Nav/footer links use `#111411`.

## Interactions & Motion

### Scroll-driven 3D reveal (core behaviour)
Every element marked `data-reveal` in the prototype animates as a function of scroll position (not a one-shot intersection trigger — it is reversible and scrubs with scroll). On each frame (rAF-throttled scroll/resize):
```
progress p = clamp01( (vh - el.top) / (vh * 0.55) - delay )   // delay per element, 0–0.56
e = 1 - (1 - p)^3                                             // ease-out cubic
k = 1 - e
opacity = e
```
Transforms by variant (parent has `perspective: 1400–1600px`; grids use `transform-style: preserve-3d`):
- `up`: `rotateX(k·28deg) translateY(k·90px)`
- `left`: `rotateY(k·50deg) translateX(-k·160px)`
- `right`: `rotateY(-k·50deg) translateX(k·160px)`
- `depth`: `translateZ(-k·700px) rotateX(k·14deg)`
- `flip`: `rotateY(-k·75deg) translateZ(-k·200px)`, `transform-origin: left center` (SDG icons)
Staggers: eyebrow 0, headline 0.1, body 0.2–0.3, buttons 0.3, chips 0.35/0.45; programme cards `0.15 + i·0.07` with variants left/depth/right repeating; impact cells `0.1 + i·0.08`; events 0.15/0.25/0.35; Join panels left 0.1 (origin right) / right 0.2 (origin left).
Impact numbers: `text = round(e · target).toLocaleString() + suffix`.

Hero photo parallax (`data-tilt`), s = scrollY:
`rotateY(min(s/10,40)deg) rotateX(min(s/30,10)deg) translateY(s·0.2px) scale(max(0.7, 1 - s/2500))`, opacity `max(0, 1 - s/(0.9·vh))`.

Implementation notes: use one rAF-throttled scroll listener (or GSAP ScrollTrigger with `scrub: true`, or Framer Motion `useScroll` + `useTransform`). Set `will-change: transform, opacity` on animated nodes. Respect `prefers-reduced-motion: reduce` → render everything at final state (opacity 1, no transform), keep the count-up instant.

### Other
- Chapter rail: active-state transitions 0.3s; click → smooth scroll to section top.
- Scroll cue: `@keyframes bob { 0%,100%{translateY(0)} 50%{translateY(8px)} }` 1.8s infinite.
- Buttons have no hover styles in the prototype; add a subtle one within the rules if desired (e.g. primary `#166022`).
- Tweakable constants exposed in the prototype (`glowStrength` 0.08–0.22 default 0.16; `depth` multiplier 0.3–2 default 1; `revealSpeed` 0.3–0.9vh default 0.55) — treat as CSS/JS constants.

## Responsive behaviour
- Fluid to 1440 max; page padding `clamp(20px, 5.5vw, 80px)`; headings use the clamp values above.
- All grids are `repeat(auto-fit, minmax(min(100%, N), 1fr))` so they collapse to one column naturally (hero 520, belief 440, cards 300, impact 280, join 420, footer 260).
- Below 900px: hide nav centre links and the chapter rail (logo + "Get involved" remain). No hamburger was designed; add one only if the client asks.
- Hero visual scales with its column (max 680px); stat chips stay absolutely positioned inside it.
- Keep `min-height: 100vh` per chapter on desktop; on mobile it is acceptable to drop to `min-height: auto` if chapters feel too sparse.

## State Management
Purely presentational: `activeChapter` (int 0–6, derived from scroll), `isDesktop` (≥900px), scroll progress per element. No data fetching, no forms (all CTAs are external links).

## Assets (in `assets/`)
- `logo.png` — client's official lockup (transparent PNG). Use at 44px (nav) / 64px (footer) height.
- `sdg-1.gif`, `sdg-2.gif`, `sdg-4.gif`, `sdg-17.gif` — official UN SDG icons supplied by the client (animated GIFs). Keep aspect 1:1, 120px.
- Manrope from Google Fonts: `https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&display=swap` (or self-host).
- Programme line icons: inline SVG paths in the prototype (`icons` array in the script at the bottom of `Love & Light Story.dc.html`).
- **Missing, client to supply:** hero photo (James & Sunmi), three event photos, School Renovation date.
- `brief.docx` — the client's original website brief, for reference.

## Files
- `Love & Light Story.dc.html` — the design to implement (template + scroll logic in the trailing `<script>`).
- `Love & Light Landing.dc.html` — earlier conventional layout of the same content (reference only).
- `support.js`, `image-slot.js` — prototype runtime, not needed in production.
- `assets/` — logo and SDG icons.
