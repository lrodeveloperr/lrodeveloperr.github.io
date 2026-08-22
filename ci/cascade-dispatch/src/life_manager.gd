class_name LifeManager
extends RefCounted

const MAX_LIVES: int = 5
const RECHARGE_SECONDS: int = 60 * 60

static func prune_losses(loss_timestamps: Array, now_s: int) -> Array[int]:
    var out: Array[int] = []
    for raw in loss_timestamps:
        var ts := int(raw)
        if ts > now_s:
            out.append(ts)
        elif now_s - ts < RECHARGE_SECONDS:
            out.append(ts)
    out.sort()
    while out.size() > MAX_LIVES:
        out.pop_front()
    return out

static func lives_available(loss_timestamps: Array, now_s: int) -> int:
    return MAX_LIVES - prune_losses(loss_timestamps, now_s).size()

static func consume(loss_timestamps: Array, now_s: int) -> Array[int]:
    var active := prune_losses(loss_timestamps, now_s)
    if active.size() >= MAX_LIVES:
        return active
    active.append(now_s)
    active.sort()
    return active

static func seconds_until_next(loss_timestamps: Array, now_s: int) -> int:
    var active := prune_losses(loss_timestamps, now_s)
    if active.is_empty():
        return 0
    return maxi(0, int(active[0]) + RECHARGE_SECONDS - now_s)
