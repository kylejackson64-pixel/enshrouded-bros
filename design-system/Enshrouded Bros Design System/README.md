# Enshrouded Bros Design System

A design system extracted from **Enshrouded Bros** — a 4-player campaign dashboard for the co-op survival/RPG game [Enshrouded](https://enshrouded.com), timed to **Update 8 "Forging the Path"** (April 21, 2026).

> Live at: **[kylejackson64-pixel.github.io/enshrouded-bros](https://kylejackson64-pixel.github.io/enshrouded-bros)**

---

## Product context

Enshrouded Bros is a single-page, static HTML dashboard that a 4-person friend group uses to coordinate a long-running Enshrouded campaign. It is **not** a public marketing site — it's an internal companion app, passphrase-gated, saved to localStorage, and deployed free on GitHub Pages. It polls a live `status.json` (published by a Python watcher on the host's server) to mirror real game state into the dashboard.

The four "bros" each play a fixed party role: **Ranger** (mobility + burst DPS), **Barbarian** (tank), **Wizard** (AoE + boss burn), **Healer** (water aura + sustain). Every piece of UI — tags, hero cards, class color accents — keys off those four archetypes plus a "Group" catch-all.

### Surfaces
There is **one product**: the dashboard itself — a long single-page app stitched together from about 12 sections (live server status, U8 banner, flame altar tracker, party, survivors, phase checklist, crafting reference, bosses, biomes, campaign guide, update-8 reference, footer).

### Sources
- **Codebase** — the `enshrouded-bros/` local folder (mounted read-only). A single `index.html` (~1980 lines), plus `watcher.py` (server-side, not UI), `README.md`, `.gitignore`, `LICENSE`. All CSS and JS is inline in the HTML.
- **No Figma** — there is no design file. Visual language is reverse-engineered from the HTML.
- **No dedicated logo/brand assets** — the "logo" is a gradient-clipped wordmark ("Enshrouded Bros") in Cinzel Decorative; decorative chrome is all emoji (🔥, ⚔️, 🛡️, 🌐, 💀, 🗺, 📡).

---

## Index — what's in this folder

| File / folder | What it is |
|---|---|
| `README.md` | This file — product context + content/visual/iconography fundamentals |
| `SKILL.md` | Skill manifest (Claude Skill-compatible) |
| `colors_and_type.css` | CSS variables for palette + type + gradients |
| `preview/` | Design-system preview cards (typography, color, components — register to the Design System tab) |
| `assets/` | Any captured imagery, favicons, background SVGs |
| `ui_kits/dashboard/` | Pixel-faithful JSX recreation of the dashboard, with core components |

### UI Kits
- **`ui_kits/dashboard/`** — the full dashboard. Components: `Header`, `LiveStatus`, `U8Banner`, `FlameAltar`, `Party`, `BossGuide`, `SessionNotes`, `Footer`, plus shared `Tokens.jsx` (exports `window.EB` + `SectionTitle`). Entry: `ui_kits/dashboard/index.html`.

### Preview cards (registered to the Design System tab)
Brand · Colors · Type · Spacing · Components — 17 cards total, in `preview/`.

### Font substitutions — **please review**
The source dashboard references **Cinzel Decorative**, **Cinzel**, and **Crimson Pro** via Google Fonts. We pull them from Google Fonts directly (no local `.ttf` files in the repo). If you want offline-safe font files, download those three families from [fonts.google.com](https://fonts.google.com) into `fonts/` and the CSS import will still match.

---

## CONTENT FUNDAMENTALS

The voice is **first-person-plural operator / dungeon master**. This is one party member writing briefing notes for the other three: direct, terse, instructional, slightly cheeky. It assumes you already know Enshrouded's systems — the copy coaches *how to coordinate as a team*, not how to play.

### Tone
- **Imperative and role-assigned.** Every action sentence names the role. "Ranger: Lead the route." "Barbarian: Frontline the enemies outside his building." "Healer: Keep everyone above 50% HP."
- **Terse, battle-plan cadence.** Short clauses separated by em-dashes or periods. No hedging.
- **Affectionate game-jargon.** "Bros," "squishies," "melt bosses from range," "get deleted." Voice of someone who's played co-op for years.
- **Quietly proud of its own minimalism.** Footer reads: *"Saves to localStorage · Free forever on GitHub Pages."*
- **Urgent without being panicked.** Countdown language ("U8 in 2d 4h — SOON") is excited, not alarmist.

### Casing
- **Title Case** for display titles (`Enshrouded Bros`, `Flame Altar Progression`).
- **ALL CAPS with wide tracking** for Cinzel labels (`OVERALL`, `PARTY LEVEL`, `LAST SAVE`, `WEAPON ULTIMATE`). This is the section-header / eyebrow style.
- **Sentence case** for body copy, objectives, and bullets.
- Proper names are faithfully cased (`Hydrak'Dal`, `Fell Sicklescythe`, `Pikemead's Reach`).

### Pronouns & POV
- **"You"** when addressing the reader (objectives, tips, patch notes).
- **Role-name imperatives** when assigning tasks ("Barbarian: Tank the adds").
- Third-person game facts ("The Fell Dragon unlocks Veilwater access").
- Never "I" or "we" — this is collaborative doc, not op-ed.

### Copy examples
- *"All skill points refunded on patch day — rebuild your trees before heading out."*
- *"Gear stats recalculated (smaller numbers ≠ nerf)."*
- *"U8 Ultimate = 360° cleave. Fill meter on trash, release on boss."*
- *"Ranger: Bread and butter. Headshot multiplier. Combined with Eagle Eye = massive crits."*
- Button labels: `+ Log`, `Reset all progress`, `ℹ How`.
- Empty states: *"No items logged yet."*
- Footer: *"Update 8 Forging the Path · April 21 2026 · enshrouded.com"*

### Emoji — yes, liberally
Emoji are a first-class part of the voice. They are used as **section icons, status indicators, and tonal punctuation**. Examples:
- Section titles: `🔥 Flame Altar Progression`, `📡 Live Server Status`, `💀 Boss Guide`, `🗺 Biome Reference`, `🧑‍🤝‍🧑 Survivors Directory`, `🔨 Crafting Reference`, `📖 Campaign Guide`, `📝 Session Notes`, `💎 Loot Log`.
- Role avatars: `🏹` Ranger · `⚔️` Barbarian · `🔮` Wizard · `💧` Healer.
- Status: `⚙️` not-configured, `🟢 Active`, `🟡 Idle`, `🔴 Offline`, `✓` complete, `⚠` pending, `ℹ` info.
- Tonal: the loading screen is a single bouncing `🔥`.

### Numbers & data
- Levels: `Lv 45`, `Level 5–10`.
- Quantities: `Berry ×2`, `Iron Bar ×3` (using `×` not `x`).
- Percents are hard numbers, not soft ("21% melee damage").
- Times: `5 min`, `2h ago`, `Just now`.

---

## VISUAL FOUNDATIONS

**Vibe:** forged-metal fantasy tome meets dark-mode console HUD. Think parchment torn out of a quest log, pinned to a late-night Discord screen.

### Color
- **Backdrop** is near-black `#0a0f18` (abyss) layered under two radial glows — warm ember top-left, cool water bottom-right. This vignette is applied via `body::before` and sits on top of everything else as atmosphere.
- **Panels** (`#1e2a3a`) and **surface** (`#1a2235`) are desaturated shroud-blue, not neutral grey.
- **Primary accent is ember orange** (`#e8612a` → `#ff8c42`) — used for the Flame Altar, the primary CTA, active state, and the gradient wordmark. Its matte-darker twin `#9c3a12` anchors button fills.
- **Secondary accent is antique gold** (`#d4a84b` → `#f0c96a`) — used for stat values, hover borders, objective markers, and the gradient wordmark.
- **Class colors are strict and never swapped**:
  - Ranger → ember `#e8612a`/`#ff8c42`
  - Barbarian → red `#c0392b`/`#e74c3c`
  - Wizard → purple `#8e6dbf`/`#a89bd4`
  - Healer → water `#4a9fd4`/`#2a6a9a`
- **Semantic**: success green `#5cb85c`, danger red `#c0392b`, info water `#4a9fd4`.

### Type
- **Cinzel Decorative** (900) → the one-off hero wordmark only.
- **Cinzel** (400/600/700) → every label, eyebrow, button, section title, stat number, tag. Tracked out (.1em–.3em) and frequently ALL CAPS.
- **Crimson Pro** (300/400/600, plus italic) → all body copy, objectives, input, textarea, tooltip content.
- **Hierarchy works through tracking and case**, not only size. A `.6rem` Cinzel ALL CAPS at `.3em` tracking *is* the section header.

### Backgrounds
- **Atmospheric radial-gradient vignette** on body; no photography; no patterns; no repeating textures. The "texture" comes from the type + thin borders, not imagery.
- **Section backgrounds are flat panels** (`#1e2a3a`). No full-bleed imagery, no illustrations.
- **Gradients** are reserved for: the wordmark (gold→ember diag), progress bar fills (ember-dim→ember-bright horizontal), hero-card top strips (2px) per class, and the U8 alert banner (ember→red bleed at 10–15% alpha).

### Animation
- Sparingly used, always physical. Eases are cubic-bezier overshoots (`cubic-bezier(.34, 1.56, .64, 1)`) for entrance "pop," plain `ease-in-out` for breathing loops.
- **Breathing pulses** — live-sync dot and "U8" tag pulse with a box-shadow ring every 2s.
- **Flame pulse** — loading screen 🔥 scales 0.9↔1.1 + brightens, 1s alternate.
- **Card fade-up** — stats stagger in over 0.1s increments.
- **Progress bar fills** use a bouncy overshoot (the `cubic-bezier(.34,1.56,.64,1)` again) — they *arrive* at their value, not slide to it.
- No parallax, no scroll-triggered animation, no video.

### Hover states
- **Cards** → border shifts from `rgba(212,168,75,.2)` (gold @ 20%) to `rgba(232,97,42,.4)` (ember @ 40%) *plus* `transform: translateY(-2px)`.
- **Tabs** → background `rgba(255,255,255,.03)` + color shift to ash.
- **Buttons (ember)** → background lightens from `--ember-dim` to `--ember` + `-1px` lift.
- **Buttons (ghost)** → border goes from gold-dim to ember, text follows.
- **Obj items / list rows** → background `rgba(255,255,255,.04)`.
- **Loot items** → reveal the `✕` delete affordance via opacity 0→1.
- Standard hover transition: `.2s` to `.3s`, property-specific (border-color, transform, background — not `all`).

### Press / active states
- Sliders use `accent-color: var(--gold)` (hero level) or `var(--purple)` (weapon bar).
- Active tabs get a 2px bottom border in gold + a faint `rgba(212,168,75,.05)` wash.
- There are no explicit scale-down press states — this is a pointer-first UI.

### Borders
- **Every panel and card** uses `1px solid rgba(212,168,75,.2)` — a desaturated gold at 20% alpha that reads as aged-brass on the dark background. This is the signature structural detail.
- **Hot/active borders** step up to `rgba(232,97,42,.4)` ember-at-40.
- **Dividers** are hairline horizontal gradients: `linear-gradient(90deg, transparent, var(--gold), transparent)` — parchment-like fades at both edges.
- **Hero card top strips** are 2px full-width gradients per class color (`::before` pseudo on `.hero-card`).

### Shadows & elevation
- There is **no drop-shadow system**. Elevation is entirely border-based.
- The only glow-like effect is the `box-shadow: 0 0 8px rgba(232,97,42,.2)` on the "current" flame altar node — and the live-pulse `box-shadow` ring that animates to transparent.
- Focus rings rely on border-color change, not outline.

### Transparency & blur
- No `backdrop-filter` / blur anywhere.
- Translucency is used liberally for layering: `rgba(255,255,255,.03)` for subtle inset surfaces (live-stat chips, loot cards, input fills), `rgba(255,255,255,.07)` for slider tracks, `rgba(<accent>,.15)` for filled role-colored pill backgrounds.
- Tag/pill bodies are always `background: rgba(<accent>,.15); border: 1px solid rgba(<accent>,.3–.4); color: var(--<accent-bright>)` — a three-channel formula that reads as glowing from within.

### Corner radii
Small and restrained. `2px` for chips/tags, `3–4px` for inputs and small buttons, `5–6px` for mid-size cards, `8px` for the large panels/cards. Avatars are `50%` circles (the only circular elements). **No pill shapes**, no fully-rounded buttons.

### Cards
Pattern repeats everywhere:
```
background: var(--panel);        /* #1e2a3a */
border: 1px solid var(--border); /* gold 20% */
border-radius: 8px;
padding: 1–1.2rem;
```
Many cards carry a **2px gradient strip at `::before` top** colored by role/class/category (hero cards, U8 cards, boss cards, live-sync card, flame detail).

### Layout rules
- **Content max-width: 900px**, centered with `0 auto`. Everything (except the header/footer row) obeys this.
- **Generous outer padding** — `1.5–2rem` horizontally on sections.
- **Grids default to `auto-fit` with `minmax(X, 1fr)`** — so content reflows naturally to mobile.
- **Single mobile breakpoint at 600px** collapses party to 2 columns, U8 cards to 1, campaign to 3.
- Section rhythm: `section-title` eyebrow (→tiny Cinzel uppercase + trailing gradient rule), then the grid, `2–2.5rem` bottom margin.

### Imagery vibe
- There is effectively **no imagery** in the product — no photos, no illustrations, no character portraits.
- Hero "avatars" are initials-in-circle (`RG`, `BB`, `WZ`, `HL`) inside a class-colored ring.
- Where icons appear they are **emoji** (see Iconography section).

### What to avoid
- Bluish-purple Stripe gradients. (Ember→gold only.)
- Soft floaty drop-shadows or neumorphism.
- Full-bleed photography.
- Hand-drawn illustration.
- Oversized pill buttons or "glassmorphism."
- Rounded-left-border accent cards.
- Sans-serif display type (this brand is serif all the way down).

---

## ICONOGRAPHY

**Emoji is the icon system.** Enshrouded Bros does not use an icon font, an SVG sprite, Lucide, Heroicons, or bitmap glyphs. Every symbol you see inline is a native Unicode emoji, rendered in the user's system font stack.

### Why emoji
- Zero download weight (the dashboard has no build step and is deployed static on GitHub Pages).
- Immediately recognizable fantasy-game vocabulary (⚔️, 🛡️, 🔥, 🏹, 🔮, 💧, 💀, 🗺).
- Platform-native variance is *welcome* — Windows-segoe emoji on some bros' laptops, Apple on others, it's fine.

### Inventory (every emoji used in the app)
| Emoji | Role |
|---|---|
| 🔥 | Flame Altar, ember, "ember" brand concept, loading spinner |
| ⚔️ | Update 8 badge, Barbarian avatar, boss fight |
| 🛡️ | Gear & armor U8 card |
| 🏹 | Ranger avatar |
| 🔮 | Wizard avatar |
| 💧 | Healer avatar |
| 🌟 | Skill tree |
| 🌐 | Adventure sharing |
| 📡 | Live server status section |
| ⚙️ | Not-configured / settings |
| ⚒ | Update 8 secondary mark / countdown |
| ⚒️ | U8 banner icon |
| 💀 | Boss guide |
| 🗺 | Biome reference |
| 🧑‍🤝‍🧑 | Survivors directory |
| 🔨 | Crafting reference |
| 📖 | Campaign guide |
| 📝 | Session notes |
| 💎 | Loot log |
| 🪵 | Drying rack |
| 💾 | File hash |
| ℹ | "How" info affordance (inline with objectives) |
| ▸ | Bullet marker (Unicode, not emoji) |
| · | Separator in meta rows |
| ✓ | Complete / done / rescued |
| ✗ | Missing / not built |
| ⚠ | Pending |
| ✕ | Delete / close |
| 🟢 🟡 🔴 | Server status dots (in-copy, in addition to CSS dots) |

### Unicode non-emoji chars used as iconography
- **▸** — list bullets in U8 cards and class-guide tips
- **·** — inline separator in meta rows
- **✓** — objective check, rescued mark
- **✗** — structure missing
- **×** — quantity separator in ingredients (`Berry ×2`)

### Guidance when extending the brand
1. **Prefer emoji first.** If you need an icon, find a Unicode/emoji equivalent before reaching for an SVG. There is already a strong vocabulary — boss (💀), biome (🗺), section header (📡/🔥/⚔️).
2. **Match existing role→emoji mappings.** Never swap a class emoji; Ranger is always 🏹, Wizard is always 🔮, etc.
3. **Reserve 🔥 for the ember brand concept.** It's the primary icon of the system.
4. **If you must use SVG** (e.g. for PPTX, a pixel-perfect favicon, print), only the ember flame + gold wordmark qualify as "brand." Everything else stays emoji.
5. **No icon-font libraries** (Font Awesome, Lucide, Material Icons, etc.) — they'd break the hand-assembled, text-native feel.

### Brand assets in `assets/`
- `wordmark.svg` — "ENSHROUDED BROS" rendered in gold→ember gradient, Cinzel Decorative, for use outside the app (docs, PPTX, OG images).
- `flame-mark.svg` — stylized flame derived from the 🔥 emoji silhouette, solid gold→ember gradient, for use as a favicon or standalone brand badge.
- `favicon.svg` — same flame-mark, optimized as 32×32 icon.

