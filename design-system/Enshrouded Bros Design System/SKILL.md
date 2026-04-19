---
name: enshrouded-bros-design
description: Use this skill to generate well-branded interfaces and assets for Enshrouded Bros — the 4-player Enshrouded campaign companion dashboard — either for production or for throwaway prototypes, mocks, slides, or decks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill and explore the other available files (`colors_and_type.css`, `assets/`, `ui_kits/dashboard/`, `preview/`).

If creating visual artifacts (slides, mocks, throwaway prototypes, decks, etc), copy assets out of this skill folder and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts *or* production code, depending on the need.

Key things to load first:
- `README.md` — product context, content/visual/iconography fundamentals
- `colors_and_type.css` — CSS variables for palette + type + gradients
- `ui_kits/dashboard/` — JSX components recreating the live dashboard
- `assets/wordmark.svg`, `assets/flame-mark.svg`, `assets/favicon.svg` — brand marks

House rules that are easy to forget:
- Ember orange + antique gold are the only brand gradients. No bluish-purple.
- Every label and button is Cinzel, ALL CAPS, tracked out (≥ .1em). Body is Crimson Pro serif.
- Class→color is fixed: Ranger=ember, Barbarian=red, Wizard=purple, Healer=water.
- Emoji IS the icon system. Do not introduce an icon font.
- Elevation is border-only — no drop shadows.
- Cards: `var(--panel)` background, 1px gold-20% border, 8px radius. Add a 2px gradient `::before` top strip when it carries role/category meaning.
