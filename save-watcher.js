#!/usr/bin/env node
/**
 * Enshrouded Solo Save Watcher
 * Run: node save-watcher.js
 * Serves live save data at http://localhost:7788/save
 * solo.html auto-fetches this on load and on each save change.
 */

const http  = require('http');
const fs    = require('fs');
const path  = require('path');
const { decompress } = require('@mongodb-js/zstd');

// ── CONFIG ────────────────────────────────────────────────────────────────────
const STEAM_ID   = '89634925';
const APP_ID     = '1203620';
const SAVE_BASE  = `C:/Program Files (x86)/Steam/userdata/${STEAM_ID}/${APP_ID}/remote`;
const WORLD_FILE = path.join(SAVE_BASE, '3ad85aea');
const INFO_FILE  = path.join(SAVE_BASE, '3ad85aea_info');
const PORT       = 7788;
const POLL_MS    = 5000; // check every 5s for save changes

// ── ZSTD HELPERS ─────────────────────────────────────────────────────────────
function findZstdBlocks(buf) {
  const offs = [];
  for (let i = 0; i < buf.length - 4; i++) {
    if (buf[i] === 0x28 && buf[i+1] === 0xb5 && buf[i+2] === 0x2f && buf[i+3] === 0xfd) {
      offs.push(i); i += 3;
    }
  }
  return offs;
}

async function decompressFirst(buf) {
  const offs = findZstdBlocks(buf);
  if (!offs.length) throw new Error('no zstd block found');
  return decompress(buf.slice(offs[0]));
}

// ── INFO FILE PARSER ─────────────────────────────────────────────────────────
async function parseInfo() {
  const buf = fs.readFileSync(INFO_FILE);
  const dec = await decompressFirst(buf);

  // Extract all length-prefixed strings (uint16LE + chars)
  const fields = {};
  for (let i = 4; i < dec.length - 2; i++) {          // skip BDB1 magic
    const len = dec.readUInt16LE(i);
    if (len < 1 || len > 40) continue;
    if (i + 2 + len >= dec.length) continue;
    const str = dec.slice(i + 2, i + 2 + len).toString('utf8');
    if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(str) || str.length !== len) continue;

    // The value immediately after the field name string varies by type.
    // For 'name': followed by uint16 length + string
    // For 'activeAltarCount': followed by uint32
    const afterOff = i + 2 + len;
    fields[str] = { nameOff: i, afterOff };
    i += 1 + len;
  }

  // World name — after 'name' field, another length-prefixed string follows
  let worldName = 'Unknown';
  if (fields.name) {
    const o = fields.name.afterOff;
    const nlen = dec.readUInt16LE(o);
    if (nlen > 0 && nlen < 64 && o + 2 + nlen <= dec.length) {
      worldName = dec.slice(o + 2, o + 2 + nlen).toString('utf8');
    }
  }

  // activeAltarCount — uint32 after the field name
  let activeAltarCount = 1;
  if (fields.activeAltarCount) {
    const o = fields.activeAltarCount.afterOff;
    if (o + 4 <= dec.length) {
      activeAltarCount = dec.readUInt32LE(o);
    }
  }

  // progressLevel — uint32 (flame altar upgrade level 1–9)
  let progressLevel = 1;
  if (fields.progressLevel) {
    const o = fields.progressLevel.afterOff;
    if (o + 4 <= dec.length) {
      progressLevel = dec.readUInt32LE(o);
      // sanity: should be 1–9
      if (progressLevel < 1 || progressLevel > 9) progressLevel = 1;
    }
  }

  return { worldName, activeAltarCount, progressLevel };
}

// ── WORLD SAVE PARSER ─────────────────────────────────────────────────────────
// Finds the SBV2/SBV1 character block which contains:
//   [SBV magic 4B][unknown 2B][level uint16LE][deaths uint16LE]...
// Preceded by a length-prefixed player name string.
async function parseWorld() {
  const buf = fs.readFileSync(WORLD_FILE);
  const offs = findZstdBlocks(buf);
  // Player block is always in one of the last 2 zstd chunks (small, ~18-44 bytes)
  const candidates = offs.slice(-4);

  for (const off of candidates) {
    let dec;
    try { dec = await decompress(buf.slice(off)); } catch { continue; }

    // Find SBV magic
    for (let i = 0; i < dec.length - 12; i++) {
      const isSBV = (dec[i] === 0x53 && dec[i+1] === 0x42 && dec[i+2] === 0x56);
      if (!isSBV) continue;

      // Read values after magic (skip 2 bytes of SBV version)
      // SBV2: [01 00][level uint16][deaths uint16]
      // SBV1: [02 00][00 00][01 00][level uint16][deaths uint16]
      let vOff = i + 4; // skip SBVx
      if (dec[i+3] === 0x32) {
        // SBV2: next is [01 00] then level, deaths
        vOff += 2; // skip 01 00
      } else if (dec[i+3] === 0x31) {
        // SBV1: [02 00][00 00][01 00] then level, deaths
        vOff += 6;
      } else continue;

      if (vOff + 4 > dec.length) continue;
      // Layout after SBV version bytes: [deaths uint16][level uint16]
      const deaths = dec.readUInt16LE(vOff);
      const level  = dec.readUInt16LE(vOff + 2);

      // Sanity: level 1–45, deaths 0–9999
      if (level < 1 || level > 45) continue;

      // Extract player name (length-prefixed string before SBV, typically at i-4-nameLen)
      let playerName = 'Player';
      if (i >= 6) {
        // Search backward for a uint32 length followed by ASCII name
        for (let back = i - 2; back >= Math.max(0, i - 20); back--) {
          const nlen = dec.readUInt32LE(back);
          if (nlen > 0 && nlen <= 20 && back + 4 + nlen <= dec.length) {
            const candidate = dec.slice(back + 4, back + 4 + nlen).toString('utf8');
            if (/^[\x20-\x7E]+$/.test(candidate)) {
              playerName = candidate;
              break;
            }
          }
        }
      }

      return { playerName, level, deaths };
    }
  }
  return { playerName: 'Player', level: 1, deaths: 0 };
}

// ── STATE ─────────────────────────────────────────────────────────────────────
let cached = null;
let lastMtime = 0;

async function refresh(force = false) {
  try {
    const stat = fs.statSync(WORLD_FILE);
    if (!force && stat.mtimeMs === lastMtime) return;
    lastMtime = stat.mtimeMs;

    const [info, world] = await Promise.all([parseInfo(), parseWorld()]);
    cached = {
      ok: true,
      worldName:        info.worldName,
      progressLevel:    info.progressLevel,
      activeAltarCount: info.activeAltarCount,
      playerName:       world.playerName,
      level:            world.level,
      deaths:           world.deaths,
      savedAt:          new Date(stat.mtimeMs).toISOString(),
    };
    console.log('[save-watcher]', new Date().toLocaleTimeString(),
      `${cached.playerName} | Lv${cached.level} | ${cached.deaths} deaths | Flame Lv${cached.progressLevel} | "${cached.worldName}"`);
  } catch (e) {
    cached = { ok: false, error: e.message };
    console.error('[save-watcher] parse error:', e.message);
  }
}

// ── HTTP SERVER ───────────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  if (req.url === '/save' || req.url === '/') {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(cached || { ok: false, error: 'not loaded yet' }));
  } else {
    res.writeHead(404); res.end('not found');
  }
});

// ── STARTUP ───────────────────────────────────────────────────────────────────
(async () => {
  console.log('[save-watcher] starting — save dir:', SAVE_BASE);
  await refresh(true);

  setInterval(() => refresh(), POLL_MS);

  server.listen(PORT, '127.0.0.1', () => {
    console.log(`[save-watcher] serving at http://localhost:${PORT}/save`);
    console.log('[save-watcher] open solo.html — it will auto-sync when the save changes');
  });
})();
