class_name AdService
extends Node

signal status(message: String)

var ready := false
var consent_ready := false
var _runtime: Node

func initialize(is_premium: bool) -> void:
    if _runtime != null:
        if is_premium:
            destroy_banner()
        return
    if is_premium:
        destroy_banner()
        return
    var runtime_path := "res://src/admob_runtime.gd"
    if not ResourceLoader.exists(runtime_path):
        status.emit("AdMob runtime missing; ads disabled safely.")
        return
    if not ResourceLoader.exists("res://addons/admob/plugin.cfg"):
        status.emit("AdMob plugin not installed; ads disabled safely.")
        return
    var runtime_script = load(runtime_path)
    _runtime = runtime_script.new()
    _runtime.name = "AdMobRuntime"
    add_child(_runtime)
    if _runtime.has_signal("ready_for_ads"):
        _runtime.connect("ready_for_ads", Callable(self, "_on_ready_for_ads"))
    if _runtime.has_signal("status"):
        _runtime.connect("status", Callable(self, "_forward_status"))
    if _runtime.has_method("begin"):
        _runtime.call("begin")

func _forward_status(message: String) -> void:
    status.emit(message)

func _on_ready_for_ads() -> void:
    consent_ready = true
    ready = true

func load_banner() -> void:
    if not ready or not consent_ready:
        return
    var unit_id := ReleaseConfig.platform_banner_id()
    if unit_id.is_empty():
        status.emit("Production banner ID missing; banner suppressed.")
        return
    if _runtime != null and _runtime.has_method("show_bottom_banner"):
        _runtime.call("show_bottom_banner", unit_id)

func destroy_banner() -> void:
    if _runtime != null and _runtime.has_method("destroy_banner"):
        _runtime.call("destroy_banner")

func show_privacy_options() -> void:
    if _runtime != null and _runtime.has_method("show_privacy_options"):
        _runtime.call("show_privacy_options")
    else:
        status.emit("Advertising privacy controls are unavailable in this build.")
