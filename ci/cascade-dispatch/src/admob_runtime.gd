# Loaded dynamically only in mobile exports that include Poing Studios AdMob v5.x.
extends Node

signal ready_for_ads
signal status(message: String)

var _consent_form
var _ad_view

func _ready() -> void:
    name = "AdMobRuntime"

func begin() -> void:
    MobileAds.set_publisher_first_party_id_enabled(false)
    var request := ConsentRequestParameters.new()
    UserMessagingPlatform.consent_information.update(request, _on_consent_updated, _on_consent_update_failed)

func _on_consent_updated() -> void:
    var consent_status = UserMessagingPlatform.consent_information.get_consent_status()
    if consent_status == UserMessagingPlatform.consent_information.ConsentStatus.REQUIRED and UserMessagingPlatform.consent_information.get_is_consent_form_available():
        UserMessagingPlatform.load_consent_form(_on_form_loaded, _on_form_load_failed)
        return
    _initialize_ads_if_allowed()

func _on_consent_update_failed(_form_error: FormError) -> void:
    status.emit("Consent status unavailable; ads suppressed for this session.")

func _on_form_loaded(form: ConsentForm) -> void:
    _consent_form = form
    form.show(_on_form_dismissed)

func _on_form_load_failed(_form_error: FormError) -> void:
    status.emit("Consent form unavailable; ads suppressed for this session.")

func _on_form_dismissed(_form_error: FormError) -> void:
    _initialize_ads_if_allowed()

func _initialize_ads_if_allowed() -> void:
    var consent_status = UserMessagingPlatform.consent_information.get_consent_status()
    var allowed := consent_status == UserMessagingPlatform.consent_information.ConsentStatus.NOT_REQUIRED or consent_status == UserMessagingPlatform.consent_information.ConsentStatus.OBTAINED
    if not allowed:
        status.emit("Consent state does not permit ads; ads suppressed.")
        return
    MobileAds.initialize()
    ready_for_ads.emit()

func show_bottom_banner(unit_id: String) -> void:
    if unit_id.is_empty():
        return
    destroy_banner()
    _ad_view = AdView.new(unit_id, AdSize.BANNER, AdPosition.BOTTOM)
    var ad_request := AdRequest.new()
    ad_request.extras["npa"] = "1"
    ad_request.extras["rdp"] = "1"
    _ad_view.load_ad(ad_request)

func destroy_banner() -> void:
    if _ad_view:
        _ad_view.destroy()
        _ad_view = null

func show_privacy_options() -> void:
    UserMessagingPlatform.show_privacy_options_form(func(_error): pass)
