# Enshrouded Bros — Dashboard UI Kit

Pixel-faithful JSX recreation of the Enshrouded Bros single-page dashboard.

## Files
- `index.html` — entry point, loads Babel + renders `<App />`
- `Tokens.jsx` — shared style vars (also available as CSS vars from `../../colors_and_type.css`)
- `Header.jsx` — brand wordmark + live countdown
- `LiveStatus.jsx` — 📡 Live Server Status card
- `U8Banner.jsx` — Update 8 alert banner
- `FlameAltar.jsx` — 🔥 Flame Altar progression with 5-node track
- `Party.jsx` — 4-hero grid with level + class colors
- `PhaseChecklist.jsx` — objectives list with role-assigned tips
- `BossGuide.jsx` — boss cards
- `SessionNotes.jsx` — notes textarea + loot log
- `Footer.jsx`

## Notes
- All components draw directly from the source `index.html` in the mounted codebase.
- Data is fake/sample — we focus on visuals, not wiring to `status.json`.
- Interactivity: objective checkboxes toggle, loot items can be added/removed, tabs switch, party levels editable via click.
