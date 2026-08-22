class_name CascadeEngine
extends RefCounted

const MAX_LEVEL: int = 2_000_000_000
const CERTIFIED_SPACE: int = 2_902_376_448 # 24 * 2 * 6^10
const DEADLINE_TICK: int = 70
const RETRY_STRIDE: int = 104_729 # coprime to 2,000,000,000: fresh address for each retry nonce
const MODULE_NAMES := ["A", "B", "C"]
const FAULT_NAMES := [
    "STUCK_CONTROL",
    "CAPACITY_LOSS",
    "ROUTE_MISALIGN",
    "DELAY_SHIFT",
    "CONVERTER_MISMATCH",
    "PRIORITY_INVERSION",
    "RELAY_BREAK",
    "BUFFER_BLOCK"
]
const FAILURE_REASONS := [
    "STUCK_CONTROL_CLOSED",
    "CAPACITY_LOSS",
    "ROUTE_MISALIGN",
    "DEADLINE_MISSED",
    "CONVERTER_MISMATCH",
    "PRIORITY_INVERSION",
    "RELAY_BREAK",
    "BUFFER_BLOCK"
]

static func clamp_level(level: int) -> int:
    return clampi(level, 1, MAX_LEVEL)

static func scenario_address(level: int, attempt_nonce: int) -> int:
    var base := clamp_level(level) - 1
    var nonce := maxi(attempt_nonce, 0)
    return int(((base + nonce * RETRY_STRIDE) % MAX_LEVEL) + 1)

static func generate(level: int, attempt_nonce: int = 0) -> Dictionary:
    var address := scenario_address(level, attempt_nonce)
    var rank := address - 1
    var phase := rank % 24
    rank = int(rank / 24)
    var release_offset := rank % 2
    rank = int(rank / 2)
    var delays: Array[int] = []
    for _i in range(10):
        delays.append(int(rank % 6) + 1)
        rank = int(rank / 6)
    var fault_family := int(phase % 8)
    var selected_module := int(phase % 3)
    return {
        "campaign_level": clamp_level(level),
        "attempt_nonce": maxi(attempt_nonce, 0),
        "scenario_address": address,
        "release_tick": int(release_offset) + 2,
        "relay_delays": delays,
        "fault_family": fault_family,
        "fault_name": FAULT_NAMES[fault_family],
        "selected_module": selected_module,
        "module_name": MODULE_NAMES[selected_module],
        "deadline_tick": DEADLINE_TICK
    }

static func healthy_delivery_tick(scenario: Dictionary) -> int:
    var tick := int(scenario["release_tick"])
    for d in scenario["relay_delays"]:
        tick += int(d)
    tick += int(scenario["selected_module"]) + 1
    return tick

static func simulate(scenario: Dictionary, action_module: int = -1, force_healthy: bool = false) -> Dictionary:
    var tick := int(scenario["release_tick"])
    for d in scenario["relay_delays"]:
        tick += int(d)

    var repaired := force_healthy or action_module == int(scenario["selected_module"])
    if not repaired:
        if int(scenario["fault_family"]) == 3:
            tick += 64 + int(scenario["selected_module"]) + 1
            return {"success": false, "tick": tick, "reason": "DEADLINE_MISSED"}
        return {
            "success": false,
            "tick": tick,
            "reason": FAILURE_REASONS[int(scenario["fault_family"])]
        }

    tick += int(scenario["selected_module"]) + 1
    return {
        "success": tick <= DEADLINE_TICK,
        "tick": tick,
        "reason": "OBJECTIVE_MET" if tick <= DEADLINE_TICK else "DEADLINE_MISSED"
    }

static func telemetry_for(scenario: Dictionary, module_index: int) -> Dictionary:
    var is_fault := module_index == int(scenario["selected_module"])
    var family := int(scenario["fault_family"])
    var normal: String
    var faulted: String
    match family:
        0:
            normal = "CONTROL · ECHO OK"
            faulted = "CONTROL · NO ECHO"
        1:
            normal = "FLOW · 98%"
            faulted = "FLOW · 0%"
        2:
            normal = "ROUTE · SYNC"
            faulted = "ROUTE · DESYNC"
        3:
            normal = "LATENCY · +2"
            faulted = "LATENCY · +64"
        4:
            normal = "CONVERTER · MATCH"
            faulted = "CONVERTER · MISMATCH"
        5:
            normal = "PRIORITY · CRITICAL"
            faulted = "PRIORITY · LOW"
        6:
            normal = "RELAY · LINKED"
            faulted = "RELAY · OPEN"
        _:
            normal = "BUFFER · 31%"
            faulted = "BUFFER · 100% / BLOCKED"
    return {
        "module": module_index,
        "is_fault": is_fault,
        "text": faulted if is_fault else normal
    }

static func sector_of(level: int) -> int:
    return int((clamp_level(level) - 1) / 20) + 1

static func sector_start(level: int) -> int:
    return (sector_of(level) - 1) * 20 + 1
