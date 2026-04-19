# Enshrouded Bros

4-player campaign dashboard for [Enshrouded](https://enshrouded.com), built for **Update 8 — Forging the Path** (April 21, 2026).

Live at: **[kylejackson64-pixel.github.io/enshrouded-bros](https://kylejackson64-pixel.github.io/enshrouded-bros)**

---

## What it does

- **Phase checklist** — 5 campaign phases, 44 objectives with step-by-step instructions on who does what and how
- **Party tracker** — level sliders, weapon ultimate bars, armor upgrade pips, and U8 skill reset status per hero
- **Live server sync** — polls the game server's save file via GitHub and shows last save time, NPC count, and key structure status
- **Loot log** — track item drops with location and owner per session
- **Session notes** — shared text area per phase
- **Progress stats** — overall %, objectives completed, current phase, average party level, loot logged
- Saves everything to `localStorage` — no backend, works offline

---

## Roles

| Hero | Role | Responsibilities |
|------|------|-----------------|
| Ranger | Mobility & Burst DPS | Scouting, grapple/glider upgrades, stealth, single-target boss DPS |
| Barbarian | Frontline Bruiser | Tanking, melee DPS, armor crafting, leading dungeon pushes |
| Wizard | AoE Pack Clear & Boss Burn | Forge/Kiln setup, AoE damage, add clearing |
| Healer | Support & Water Aura | Potion supply, NPC shelters, Dye Station, party sustain |

---

## Live server sync setup

The dashboard can display real-time server state (last save, NPC count, structures built).

**Requirements:**
- erocko38 runs `watcher.py` on the game server — it reads the Enshrouded save file and commits `status.json` to this repo
- The GitHub username in `index.html` must match the repo owner

**How it works:**
1. `watcher.py` watches the Enshrouded save directory for changes
2. On save, it parses the save file and writes `status.json` to the repo
3. The dashboard polls the [GitHub Contents API](https://docs.github.com/en/rest/repos/contents) every 60 seconds — always fresh, no CDN cache delay
4. Status shows as Active (< 10 min), Idle (< 1 hr), or Offline

To disable sync, set `GITHUB_USER = "YOUR_GITHUB_USERNAME"` in `index.html`.

---

## Local development

No build step. Just open `index.html` in a browser.

```bash
# Or serve it locally
npx serve .
```

---

## Resetting progress

Click **Reset all progress** in the footer. Clears all `localStorage` data — cannot be undone.
