class_name SaveManager
extends RefCounted

const SAVE_PATH := "user://cascade_dispatch_save_v2.json"
const SCHEMA_VERSION := 2

static func default_state() -> Dictionary:
    return {
        "schema": SCHEMA_VERSION,
        "current_level": 1,
        "cleared": 0,
        "attempt_nonce": 0,
        "loss_timestamps": [],
        "premium_verified_cache": false,
        "premium_source": "",
        "locale": "en-US",
        "streak": 0,
        "best_time_ms": -1,
        "range_complete": false,
        "last_seen_wall_s": 0
    }

static func load_state() -> Dictionary:
    var state := default_state()
    if not FileAccess.file_exists(SAVE_PATH):
        return state
    var f := FileAccess.open(SAVE_PATH, FileAccess.READ)
    if f == null:
        return state
    var parsed = JSON.parse_string(f.get_as_text())
    if not parsed is Dictionary:
        return state
    for key in state.keys():
        if parsed.has(key):
            state[key] = parsed[key]
    sanitize(state)
    return state

static func save_state(state: Dictionary) -> bool:
    sanitize(state)
    var f := FileAccess.open(SAVE_PATH, FileAccess.WRITE)
    if f == null:
        return false
    f.store_string(JSON.stringify(state))
    return true

static func sanitize(state: Dictionary) -> void:
    state["schema"] = SCHEMA_VERSION
    state["current_level"] = clampi(int(state.get("current_level", 1)), 1, CascadeEngine.MAX_LEVEL)
    state["cleared"] = maxi(0, int(state.get("cleared", 0)))
    state["attempt_nonce"] = maxi(0, int(state.get("attempt_nonce", 0)))
    state["premium_verified_cache"] = bool(state.get("premium_verified_cache", false))
    state["premium_source"] = str(state.get("premium_source", ""))
    state["locale"] = str(state.get("locale", "en-US"))
    state["streak"] = maxi(0, int(state.get("streak", 0)))
    state["best_time_ms"] = int(state.get("best_time_ms", -1))
    state["range_complete"] = bool(state.get("range_complete", false))
    state["last_seen_wall_s"] = maxi(0, int(state.get("last_seen_wall_s", 0)))
    var cleaned: Array[int] = []
    var raw_losses = state.get("loss_timestamps", [])
    if raw_losses is Array:
        for raw in raw_losses:
            cleaned.append(int(raw))
    state["loss_timestamps"] = cleaned

static func monotonic_wall_now(state: Dictionary) -> int:
    var system_now := int(Time.get_unix_time_from_system())
    var last_seen := int(state.get("last_seen_wall_s", 0))
    var effective := maxi(system_now, last_seen)
    state["last_seen_wall_s"] = effective
    return effective
