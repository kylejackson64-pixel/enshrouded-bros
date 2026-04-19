"""
Enshrouded Bros - Live Sync Watcher v2
- Reads the Enshrouded save file every 60 seconds
- Pushes status.json to GitHub via Contents API (no CDN cache issues)
- Token loaded from environment variable — never hardcoded
"""

import os, re, json, time, hashlib, base64, requests, zstandard as zstd
from datetime import datetime, timezone

# ════════════════════════════════════════════════════════════════════
#  CONFIG  — set GITHUB_TOKEN as an environment variable, not here
#
#  Windows (run once in Command Prompt as Administrator):
#    setx GITHUB_TOKEN "github_pat_YOUR_TOKEN_HERE"
#
#  Then restart this script. Never paste the token into this file.
# ════════════════════════════════════════════════════════════════════
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")
GITHUB_USER  = "kylejackson64-pixel"
GITHUB_REPO  = "enshrouded-bros"
# ════════════════════════════════════════════════════════════════════

SAVEGAME_DIR = r"C:\steamcmd\steamapps\common\EnshroudedServer\savegame"
WORLD_FILE   = "3ad85aea"
POLL_SECONDS = 60
STATUS_FILE  = "status.json"

# Fields stripped before pushing — not used by dashboard, no need to expose
_STRIP_FIELDS = {"world_guid", "player_guids"}

dctx = zstd.ZstdDecompressor()

def decomp(data, pos):
    try:
        return dctx.stream_reader(data[pos:]).read(5_000_000)
    except:
        return b""

def parse_save(path):
    with open(path, "rb") as f:
        data = f.read()
    if data[:4] != b"KSC1":
        return None

    result = {
        "last_save_ts":  int(os.path.getmtime(path)),
        "last_save_iso": datetime.fromtimestamp(
            os.path.getmtime(path), tz=timezone.utc).isoformat(),
        "file_hash":     hashlib.md5(data).hexdigest()[:12],
        "pushed_at":     datetime.now(tz=timezone.utc).isoformat(),
    }

    idx_path = path + "-index"
    if os.path.exists(idx_path):
        with open(idx_path) as f:
            idx = json.load(f)
        result["index_time"] = idx.get("time", 0)

    positions = [i for i in range(len(data)-3)
                 if data[i:i+4] == b"\x28\xb5\x2f\xfd"]

    for pos in positions:
        chunk = decomp(data, pos)
        if not chunk:
            continue
        if chunk[:4] == b"BDB1" and b"characterId" in chunk:
            guids = []
            for i in range(6):
                off = 0x160 + i * 32
                if off + 16 > len(chunk): break
                g = chunk[off:off+16]
                if sum(g) > 100 and g.hex() not in guids:
                    guids.append(g.hex())
            # player_count kept (shown on dashboard), guids stripped
            result["player_count"] = len(guids)
        elif len(chunk) > 100_000:
            result["structures"] = {
                "flame_altar":   chunk.count(b"Home_Base_FlameAltar"),
                "charcoal_kiln": chunk.count(b"Charcoal_Kiln"),
                "drying_rack":   chunk.count(b"Drying_Rack"),
                "npc_count":     len(re.findall(b"ActiveNpcState\x00", chunk)),
            }
            result["mother_flame_found"] = chunk.count(b"3_MotherFlame") > 0
    return result

def get_file_sha():
    url = f"https://api.github.com/repos/{GITHUB_USER}/{GITHUB_REPO}/contents/{STATUS_FILE}"
    r = requests.get(url, headers={
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
    }, timeout=10)
    if r.status_code == 200:
        return r.json().get("sha")
    return None

def push_to_github(payload):
    # Strip fields not needed by dashboard before pushing
    clean = {k: v for k, v in payload.items() if k not in _STRIP_FIELDS}
    content_b64 = base64.b64encode(
        json.dumps(clean, indent=2).encode()
    ).decode()
    sha = get_file_sha()
    body = {
        "message": f"update {payload.get('file_hash','?')} @ {datetime.now():%H:%M}",
        "content": content_b64,
    }
    if sha:
        body["sha"] = sha
    url = f"https://api.github.com/repos/{GITHUB_USER}/{GITHUB_REPO}/contents/{STATUS_FILE}"
    r = requests.put(url, headers={
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json",
    }, json=body, timeout=15)
    return r.status_code

def main():
    # Fail fast if token not configured
    if not GITHUB_TOKEN or GITHUB_TOKEN == "YOUR_GITHUB_TOKEN":
        print("ERROR: GITHUB_TOKEN environment variable not set.")
        print("Run:  setx GITHUB_TOKEN \"github_pat_...\"  then restart.")
        return

    print("=" * 50)
    print("  Enshrouded Bros - Live Sync Watcher")
    print("=" * 50)
    print(f"  Watching : {os.path.join(SAVEGAME_DIR, WORLD_FILE)}")
    print(f"  Pushing  : github.com/{GITHUB_USER}/{GITHUB_REPO}")
    print(f"  Interval : every {POLL_SECONDS}s")
    print(f"  Token    : {GITHUB_TOKEN[:12]}... (from env)")
    print()

    last_hash = None
    while True:
        try:
            world_path = os.path.join(SAVEGAME_DIR, WORLD_FILE)
            if not os.path.exists(world_path):
                print(f"[{datetime.now():%H:%M:%S}] Save file not found — check SAVEGAME_DIR")
                time.sleep(POLL_SECONDS)
                continue

            data = parse_save(world_path)
            if not data:
                print(f"[{datetime.now():%H:%M:%S}] Could not read save file")
                time.sleep(POLL_SECONDS)
                continue

            if data["file_hash"] == last_hash:
                print(f"[{datetime.now():%H:%M:%S}] No change")
                time.sleep(POLL_SECONDS)
                continue

            print(f"[{datetime.now():%H:%M:%S}] Save changed — pushing...", end=" ", flush=True)
            code = push_to_github(data)
            if code in (200, 201):
                last_hash = data["file_hash"]
                structs   = data.get("structures", {})
                print(f"OK  npcs={structs.get('npc_count','?')}  hash={data['file_hash']}")
            else:
                print(f"FAIL  HTTP {code}  (check token permissions)")

        except KeyboardInterrupt:
            print("\nWatcher stopped.")
            break
        except Exception as e:
            print(f"[{datetime.now():%H:%M:%S}] Error: {e}")

        time.sleep(POLL_SECONDS)

if __name__ == "__main__":
    main()
