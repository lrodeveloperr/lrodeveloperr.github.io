class_name ReleaseConfig
extends RefCounted

const APP_NAME := "Cascade Dispatch"
const VERSION := "1.0.0-rc1"
const BUNDLE_ID := "com.goodusestudios.cascadedispatch"
const PRODUCT_ID := "cascade_dispatch_unlimited_forever"
const LIFETIME_PRICE_COPY := "US$2.99"
const PRIVACY_URL := "https://lrodeveloperr.github.io/privacy-policy/cascade-dispatch/privacy/"
const SUPPORT_URL := "https://lrodeveloperr.github.io/privacy-policy/cascade-dispatch/support/"
const ADMOB_PLUGIN_VERSION := "5.0.0"
const GOOGLE_PLAY_BILLING_PLUGIN_VERSION := "3.3.0"
const GODOT_VERSION := "4.7.2"

const ANDROID_TEST_BANNER_ID := "ca-app-pub-3940256099942544/6300978111"
const IOS_TEST_BANNER_ID := "ca-app-pub-3940256099942544/2934735716"

static func _project_string(key: String) -> String:
    return str(ProjectSettings.get_setting(key, "")).strip_edges()

static func android_banner_id() -> String:
    var configured := _project_string("cascade/ads/android_banner_id")
    if not configured.is_empty():
        return configured
    return ANDROID_TEST_BANNER_ID if OS.is_debug_build() else ""

static func ios_banner_id() -> String:
    var configured := _project_string("cascade/ads/ios_banner_id")
    if not configured.is_empty():
        return configured
    return IOS_TEST_BANNER_ID if OS.is_debug_build() else ""

static func platform_banner_id() -> String:
    match OS.get_name():
        "Android":
            return android_banner_id()
        "iOS":
            return ios_banner_id()
        _:
            return ""
