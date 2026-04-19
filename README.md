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

The dashboard displays real-time server state (last save, NPC count, structures built).

`watcher.py` runs on erocko38's server, reads the Enshrouded save file every 60 seconds, and pushes `status.json` to this repo. The dashboard polls the GitHub Contents API every 60 seconds — always fresh, no CDN cache delay.

### GitHub token setup (erocko38 does this once)

The token is **never stored in the script** — it lives only as an environment variable on the server.

**1. Create a fine-grained Personal Access Token**
- Go to: GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens
- Repository access: **Only `enshrouded-bros`**
- Permissions: **Contents → Read and Write** (nothing else)
- Set an expiration (90 days recommended — rotate it when it expires)

**2. Set it as an environment variable on the server**
```
# Run once in Command Prompt as Administrator, then restart watcher.py
setx GITHUB_TOKEN "github_pat_YOUR_TOKEN_HERE"
```

**3. Run the watcher**
```
pip install requests zstandard
python watcher.py
```

The script will print `Token: github_pat_XXXX... (from env)` on startup to confirm it loaded correctly. If the token is missing it will fail immediately with a clear error rather than silently.

### What gets pushed (status.json)

Only the data the dashboard actually displays — internal game GUIDs and world identifiers are stripped before pushing:

| Field | Description |
|-------|-------------|
| `last_save_ts` / `last_save_iso` | When the world was last saved |
| `file_hash` | 12-char MD5 of save file (change detection) |
| `player_count` | Number of character slots found |
| `structures` | Flame altar, kiln, drying rack counts + NPC count |
| `mother_flame_found` | Boolean |

To disable sync entirely, set `GITHUB_USER = "YOUR_GITHUB_USERNAME"` in `index.html`.

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
