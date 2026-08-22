class_name CommerceService
extends Node

signal entitlement_changed(is_premium: bool)
signal status(message: String)

const PRODUCT_ID := ReleaseConfig.PRODUCT_ID
const GOOGLE_PRODUCT_TYPE_INAPP := 0
const GOOGLE_PURCHASED_STATE := 1
const GOOGLE_OK := 0

var premium := false
var billing_client: Object
var apple_store: Object
var _google_product_ready := false
var _google_purchase_requested := false

func initialize(cached_verified: bool) -> void:
    premium = cached_verified
    if OS.get_name() == "Android":
        _initialize_google_play()
    elif OS.get_name() == "iOS":
        _initialize_apple_store()
    else:
        status.emit("Store verification runs only on Android/iOS exports.")

func _initialize_google_play() -> void:
    var script_path := "res://addons/GodotGooglePlayBilling/BillingClient.gd"
    if not ResourceLoader.exists(script_path):
        status.emit("Google Play Billing plugin not installed.")
        return
    var billing_script = load(script_path)
    billing_client = billing_script.new()
    if billing_client == null:
        status.emit("Google Play Billing could not start.")
        return
    add_child(billing_client)
    if billing_client.has_signal("connected"):
        billing_client.connect("connected", Callable(self, "_on_google_connected"))
    if billing_client.has_signal("query_product_details_response"):
        billing_client.connect("query_product_details_response", Callable(self, "_on_google_product_details"))
    if billing_client.has_signal("query_purchases_response"):
        billing_client.connect("query_purchases_response", Callable(self, "_on_google_purchases"))
    if billing_client.has_signal("on_purchase_updated"):
        billing_client.connect("on_purchase_updated", Callable(self, "_on_google_purchase_updated"))
    if billing_client.has_method("start_connection"):
        billing_client.call("start_connection")

func _on_google_connected() -> void:
    _query_google_product_details()
    _restore_google(false)

func _query_google_product_details() -> void:
    if billing_client == null or not billing_client.has_method("query_product_details"):
        status.emit("Google Play product lookup is unavailable in this build.")
        return
    billing_client.call("query_product_details", PackedStringArray([PRODUCT_ID]), GOOGLE_PRODUCT_TYPE_INAPP)

func _on_google_product_details(result: Dictionary) -> void:
    _google_product_ready = false
    if int(result.get("response_code", -1)) == GOOGLE_OK:
        var details = result.get("product_details", result.get("product_details_list", []))
        if details is Array:
            for detail in details:
                if detail is Dictionary:
                    var product_id := str(detail.get("product_id", detail.get("productId", "")))
                    if product_id == PRODUCT_ID:
                        _google_product_ready = true
                        break
    if _google_product_ready:
        if _google_purchase_requested:
            _google_purchase_requested = false
            _launch_google_purchase()
    else:
        _google_purchase_requested = false
        status.emit("Unlimited Play is not available from Google Play right now.")

func _on_google_purchases(result: Dictionary) -> void:
    _consume_google_result(result, true)

func _on_google_purchase_updated(result: Dictionary) -> void:
    _consume_google_result(result, false)

func _purchase_products(purchase: Dictionary) -> Array:
    var products = purchase.get("products", purchase.get("product_ids", []))
    return products if products is Array else []

func _consume_google_result(result: Dictionary, authoritative: bool) -> void:
    var purchases = result.get("purchases", [])
    var found := false
    if purchases is Array:
        for purchase in purchases:
            if not (purchase is Dictionary):
                continue
            var products := _purchase_products(purchase)
            var purchase_state := int(purchase.get("purchase_state", 0))
            if PRODUCT_ID in products and purchase_state == GOOGLE_PURCHASED_STATE:
                found = true
                var token := str(purchase.get("purchase_token", ""))
                var acknowledged := bool(purchase.get("is_acknowledged", false))
                if not acknowledged and not token.is_empty() and billing_client != null and billing_client.has_method("acknowledge_purchase"):
                    billing_client.call("acknowledge_purchase", token)
    if found:
        _set_premium(true)
        status.emit("Unlimited Play verified by Google Play.")
    elif authoritative and int(result.get("response_code", -1)) == GOOGLE_OK:
        _set_premium(false)
        status.emit("No lifetime unlock found on this Google Play account.")

func _initialize_apple_store() -> void:
    if not ClassDB.class_exists("GodotStoreKit2"):
        status.emit("StoreKit 2 plugin not installed in this export.")
        return
    apple_store = ClassDB.instantiate("GodotStoreKit2")
    if apple_store == null:
        status.emit("StoreKit 2 could not start.")
        return
    if apple_store.has_signal("transaction_state_changed"):
        apple_store.connect("transaction_state_changed", Callable(self, "_on_apple_transaction"))
    _verify_apple_ownership(false)

func _verify_apple_ownership(user_initiated: bool) -> void:
    if apple_store == null or not apple_store.has_method("request_product_info"):
        if user_initiated:
            status.emit("App Store verification is unavailable in this build.")
        return
    var info: Dictionary = await apple_store.request_product_info(PRODUCT_ID)
    var error_text := str(info.get("error", ""))
    if not error_text.is_empty():
        status.emit("App Store verification could not be completed.")
        return
    var owned := bool(info.get("is_purchased", false)) and str(info.get("product_id", "")) == PRODUCT_ID
    _set_premium(owned)
    status.emit("Unlimited Play verified by App Store." if owned else "No lifetime unlock found on this Apple account.")

func _on_apple_transaction(transaction: Dictionary) -> void:
    if str(transaction.get("product_id", "")) != PRODUCT_ID:
        return
    _verify_apple_ownership(false)

func purchase() -> void:
    if OS.get_name() == "Android" and billing_client != null:
        _google_purchase_requested = true
        if _google_product_ready:
            _google_purchase_requested = false
            _launch_google_purchase()
        else:
            status.emit("Checking Unlimited Play with Google Play…")
            _query_google_product_details()
        return
    if OS.get_name() == "iOS" and apple_store != null and apple_store.has_method("purchase_product"):
        status.emit("Opening App Store purchase…")
        await apple_store.purchase_product(PRODUCT_ID, 1)
        await _verify_apple_ownership(false)
        return
    status.emit("Purchase service is unavailable in this build.")

func _launch_google_purchase() -> void:
    if billing_client == null or not billing_client.has_method("purchase"):
        status.emit("Google Play purchase is unavailable in this build.")
        return
    var launch = billing_client.call("purchase", PRODUCT_ID, "", "", false)
    if launch is Dictionary and int(launch.get("response_code", GOOGLE_OK)) != GOOGLE_OK:
        status.emit("Google Play could not open the purchase flow.")
        return
    status.emit("Opening Google Play purchase…")

func restore() -> void:
    if OS.get_name() == "Android":
        _restore_google(true)
        return
    if OS.get_name() == "iOS" and apple_store != null and apple_store.has_method("sync"):
        status.emit("Restoring App Store purchase…")
        await apple_store.sync()
        await _verify_apple_ownership(true)
        return
    status.emit("Restore service is unavailable in this build.")

func _restore_google(user_initiated: bool) -> void:
    if billing_client != null and billing_client.has_method("query_purchases"):
        billing_client.call("query_purchases", GOOGLE_PRODUCT_TYPE_INAPP)
        if user_initiated:
            status.emit("Restoring Google Play purchase…")
    elif user_initiated:
        status.emit("Google Play restore is unavailable in this build.")

func _set_premium(value: bool) -> void:
    if premium == value:
        return
    premium = value
    entitlement_changed.emit(premium)
