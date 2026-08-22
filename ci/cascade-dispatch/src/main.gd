extends Control

const DEADLINE_SECONDS := 30.0

const BG := Color("edf5f5")
const SURFACE := Color("f9fdfd")
const SURFACE_ALT := Color("e3eeee")
const TEXT := Color("163038")
const MUTED := Color("627980")
const TEAL := Color("159c99")
const BLUE := Color("2478a5")
const ORANGE := Color("e28335")
const PURPLE := Color("7560a4")
const GREEN := Color("18896f")
const RED := Color("bd4c58")
const BORDER := Color("c7d9da")
const WHITE := Color("ffffff")

var state: Dictionary
var commerce: CommerceService
var ads: AdService

var ui_root: Control
var toast_label: Label
var countdown_label: Label
var scenario: Dictionary = {}
var selected_module := -1
var telemetry_scanned := false
var countdown_active := false
var deadline_end_ms := 0
var paused_remaining_ms := 0
var crisis_started_ms := 0
var module_buttons: Array[Button] = []
var module_readouts: Array[Label] = []

func _ready() -> void:
    set_process(true)
    state = SaveManager.load_state()
    state["locale"] = LocaleCatalog.normalize(str(state.get("locale", "en-US")))
    _save()
    _build_shell()

    commerce = CommerceService.new()
    commerce.name = "CommerceService"
    add_child(commerce)
    commerce.entitlement_changed.connect(_on_entitlement_changed)
    commerce.status.connect(_toast)

    ads = AdService.new()
    ads.name = "AdService"
    add_child(ads)
    ads.status.connect(_toast)

    commerce.initialize(bool(state.get("premium_verified_cache", false)))
    ads.initialize(_is_premium())
    _show_home()

func _build_shell() -> void:
    var backdrop := ColorRect.new()
    backdrop.color = BG
    backdrop.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    backdrop.mouse_filter = Control.MOUSE_FILTER_IGNORE
    add_child(backdrop)

    ui_root = Control.new()
    ui_root.name = "UIRoot"
    ui_root.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    add_child(ui_root)

    toast_label = Label.new()
    toast_label.visible = false
    toast_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    toast_label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
    toast_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    toast_label.add_theme_font_size_override("font_size", 18)
    toast_label.add_theme_color_override("font_color", WHITE)
    toast_label.add_theme_stylebox_override("normal", _style(TEXT, 18, 0, Color.TRANSPARENT, 14))
    toast_label.anchor_left = 0.08
    toast_label.anchor_right = 0.92
    toast_label.anchor_top = 0.88
    toast_label.anchor_bottom = 0.97
    toast_label.mouse_filter = Control.MOUSE_FILTER_IGNORE
    add_child(toast_label)

func _process(_delta: float) -> void:
    if not countdown_active or countdown_label == null or not is_instance_valid(countdown_label):
        return
    var remaining_ms := deadline_end_ms - Time.get_ticks_msec()
    if remaining_ms <= 0:
        countdown_active = false
        countdown_label.text = "00.0"
        _resolve_crisis(true)
        return
    countdown_label.text = "%04.1f" % (float(remaining_ms) / 1000.0)
    if remaining_ms <= 7_000:
        countdown_label.add_theme_color_override("font_color", RED)
    elif remaining_ms <= 15_000:
        countdown_label.add_theme_color_override("font_color", ORANGE)
    else:
        countdown_label.add_theme_color_override("font_color", TEXT)

func _notification(what: int) -> void:
    if what == NOTIFICATION_APPLICATION_PAUSED or what == NOTIFICATION_APPLICATION_FOCUS_OUT:
        if countdown_active:
            paused_remaining_ms = maxi(0, deadline_end_ms - Time.get_ticks_msec())
            countdown_active = false
    elif what == NOTIFICATION_APPLICATION_RESUMED or what == NOTIFICATION_APPLICATION_FOCUS_IN:
        if paused_remaining_ms > 0 and countdown_label != null and is_instance_valid(countdown_label):
            deadline_end_ms = Time.get_ticks_msec() + paused_remaining_ms
            paused_remaining_ms = 0
            countdown_active = true

func _loc(key: String) -> String:
    return LocaleCatalog.tr(str(state.get("locale", "en-US")), key)

func _is_premium() -> bool:
    return bool(state.get("premium_verified_cache", false))

func _now() -> int:
    var now := SaveManager.monotonic_wall_now(state)
    _save()
    return now

func _active_losses() -> Array[int]:
    var cleaned := LifeManager.prune_losses(state.get("loss_timestamps", []), _now())
    state["loss_timestamps"] = cleaned
    _save()
    return cleaned

func _lives() -> int:
    if _is_premium():
        return LifeManager.MAX_LIVES
    return LifeManager.lives_available(_active_losses(), _now())

func _seconds_until_life() -> int:
    if _is_premium():
        return 0
    return LifeManager.seconds_until_next(_active_losses(), _now())

func _consume_life() -> void:
    if _is_premium():
        return
    state["loss_timestamps"] = LifeManager.consume(_active_losses(), _now())
    _save()

func _save() -> void:
    SaveManager.save_state(state)

func _clear_screen() -> void:
    countdown_active = false
    paused_remaining_ms = 0
    countdown_label = null
    module_buttons.clear()
    module_readouts.clear()
    if ads != null:
        ads.destroy_banner()
    for child in ui_root.get_children():
        child.queue_free()

func _screen_scroller() -> VBoxContainer:
    _clear_screen()
    ui_root.layout_direction = Control.LAYOUT_DIRECTION_RTL if LocaleCatalog.is_rtl(str(state["locale"])) else Control.LAYOUT_DIRECTION_LTR
    var scroll := ScrollContainer.new()
    scroll.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    scroll.horizontal_scroll_mode = ScrollContainer.SCROLL_MODE_DISABLED
    ui_root.add_child(scroll)

    var margin := MarginContainer.new()
    margin.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    margin.add_theme_constant_override("margin_left", 28)
    margin.add_theme_constant_override("margin_right", 28)
    margin.add_theme_constant_override("margin_top", 36)
    margin.add_theme_constant_override("margin_bottom", 54)
    scroll.add_child(margin)

    var column := VBoxContainer.new()
    column.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    column.add_theme_constant_override("separation", 18)
    margin.add_child(column)
    return column

func _show_home() -> void:
    var column := _screen_scroller()
    _brand_header(column, false)
    _gap(column, 20)

    var hero := _panel(WHITE, 30, 1, BORDER, 26)
    column.add_child(hero)
    var hero_box := VBoxContainer.new()
    hero_box.add_theme_constant_override("separation", 14)
    hero.add_child(hero_box)

    var eyebrow := _label("GOODUSE STUDIOS  ·  OCEAN PEARL", 15, TEAL)
    eyebrow.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    hero_box.add_child(eyebrow)
    var title := _label(_loc("title"), 38, TEXT, true)
    title.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    hero_box.add_child(title)
    var tagline := _label(_loc("tagline"), 21, MUTED, true)
    tagline.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    hero_box.add_child(tagline)

    var current := int(state.get("current_level", 1))
    var range_complete := bool(state.get("range_complete", false))
    var record_text := _loc("range_complete") if range_complete else "%s %s  ·  %s %s" % [_loc("level"), _fmt(current), _fmt(int(state.get("cleared", 0))), _loc("cleared")]
    var record := _label(record_text, 18, TEXT, true)
    record.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    hero_box.add_child(record)

    var attempt_text := _loc("unlimited") if _is_premium() else "%s  %s" % [_loc("attempts"), _hearts(_lives())]
    var attempts := _label(attempt_text, 20, GREEN if _is_premium() else ORANGE)
    attempts.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    hero_box.add_child(attempts)

    if not range_complete:
        var primary := _button(_loc("begin") if current == 1 else _loc("continue"), TEAL, WHITE, 64)
        primary.pressed.connect(_on_continue_pressed)
        hero_box.add_child(primary)
    else:
        var complete := _label(_loc("range_complete"), 18, GREEN, true)
        complete.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
        hero_box.add_child(complete)

    var campaign := _button(_loc("map"), SURFACE_ALT, TEXT, 58, BORDER)
    campaign.pressed.connect(_show_campaign)
    column.add_child(campaign)

    var how := _button(_loc("how"), SURFACE_ALT, TEXT, 58, BORDER)
    how.pressed.connect(_show_how)
    column.add_child(how)

    var settings := _button(_loc("settings"), SURFACE_ALT, TEXT, 58, BORDER)
    settings.pressed.connect(_show_settings)
    column.add_child(settings)

    var note := _label(_loc("privacy_note"), 14, MUTED, true)
    note.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    column.add_child(note)

func _on_continue_pressed() -> void:
    if _is_premium() or _lives() > 0:
        _start_crisis()
    else:
        _show_play_options()

func _show_campaign() -> void:
    var column := _screen_scroller()
    _brand_header(column, true)
    var current := int(state.get("current_level", 1))
    var sector := CascadeEngine.sector_of(current)
    column.add_child(_label("%s %s" % [_loc("sector"), _fmt(sector)], 30, TEXT))
    column.add_child(_label("%s · %s %s" % [_loc("record"), _fmt(int(state.get("cleared", 0))), _loc("cleared")], 17, MUTED))

    var panel := _panel(WHITE, 24, 1, BORDER, 20)
    column.add_child(panel)
    var grid := GridContainer.new()
    grid.columns = 4
    grid.add_theme_constant_override("h_separation", 10)
    grid.add_theme_constant_override("v_separation", 10)
    panel.add_child(grid)
    var start := CascadeEngine.sector_start(current)
    for level in range(start, mini(start + 20, CascadeEngine.MAX_LEVEL + 1)):
        var label_text := str(level)
        var btn := _button(label_text, TEAL if level == current else SURFACE_ALT, WHITE if level == current else MUTED, 54, BORDER)
        btn.disabled = level != current or bool(state.get("range_complete", false))
        if level == current:
            btn.pressed.connect(_start_crisis)
        grid.add_child(btn)

func _show_how() -> void:
    var column := _screen_scroller()
    _brand_header(column, true)
    column.add_child(_label(_loc("how"), 30, TEXT))
    for key in ["how1", "how2", "how3", "how4"]:
        var p := _panel(WHITE, 22, 1, BORDER, 18)
        column.add_child(p)
        p.add_child(_label(_loc(key), 19, TEXT, true))
    var note := _label(_loc("fresh"), 16, MUTED, true)
    column.add_child(note)

func _show_settings() -> void:
    var column := _screen_scroller()
    _brand_header(column, true)
    column.add_child(_label(_loc("settings"), 30, TEXT))

    var language_panel := _panel(WHITE, 22, 1, BORDER, 18)
    column.add_child(language_panel)
    var language_box := VBoxContainer.new()
    language_box.add_theme_constant_override("separation", 10)
    language_panel.add_child(language_box)
    language_box.add_child(_label(_loc("language"), 20, TEXT))
    var option := OptionButton.new()
    option.custom_minimum_size = Vector2(0, 58)
    option.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    option.add_theme_font_size_override("font_size", 18)
    var selected := 0
    for i in range(LocaleCatalog.LOCALES.size()):
        var entry: Dictionary = LocaleCatalog.LOCALES[i]
        option.add_item(str(entry["name"]))
        option.set_item_metadata(i, str(entry["id"]))
        if str(entry["id"]) == str(state["locale"]):
            selected = i
    option.select(selected)
    option.item_selected.connect(func(index: int):
        state["locale"] = str(option.get_item_metadata(index))
        _save()
        _show_settings()
    )
    language_box.add_child(option)

    var purchase_panel := _panel(WHITE, 22, 1, BORDER, 18)
    column.add_child(purchase_panel)
    var purchase_box := VBoxContainer.new()
    purchase_box.add_theme_constant_override("separation", 10)
    purchase_panel.add_child(purchase_box)
    purchase_box.add_child(_label(_loc("premium"), 22, TEXT))
    if _is_premium():
        purchase_box.add_child(_label(_loc("unlimited"), 18, GREEN))
    else:
        var unlock := _button(_loc("unlock"), TEAL, WHITE, 58)
        unlock.pressed.connect(func(): commerce.purchase())
        purchase_box.add_child(unlock)
    var restore := _button(_loc("restore"), SURFACE_ALT, TEXT, 54, BORDER)
    restore.pressed.connect(func(): commerce.restore())
    purchase_box.add_child(restore)

    var privacy := _button(_loc("privacy"), SURFACE_ALT, TEXT, 54, BORDER)
    privacy.pressed.connect(func(): OS.shell_open(ReleaseConfig.PRIVACY_URL))
    column.add_child(privacy)
    var choices := _button(_loc("privacy_choices"), SURFACE_ALT, TEXT, 54, BORDER)
    choices.pressed.connect(func(): ads.show_privacy_options())
    column.add_child(choices)
    var support := _button(_loc("support"), SURFACE_ALT, TEXT, 54, BORDER)
    support.pressed.connect(func(): OS.shell_open(ReleaseConfig.SUPPORT_URL))
    column.add_child(support)

func _show_play_options() -> void:
    var column := _screen_scroller()
    _brand_header(column, true)
    column.add_child(_label(_loc("no_attempts"), 30, TEXT))
    var seconds := _seconds_until_life()
    column.add_child(_label("%s · %s" % [_loc("recharge"), _format_duration(seconds)], 20, ORANGE))

    var panel := _panel(WHITE, 24, 1, BORDER, 20)
    column.add_child(panel)
    var box := VBoxContainer.new()
    box.add_theme_constant_override("separation", 12)
    panel.add_child(box)
    box.add_child(_label(_loc("premium"), 22, TEXT))
    box.add_child(_label(_loc("privacy_note"), 15, MUTED, true))
    var unlock := _button(_loc("unlock"), TEAL, WHITE, 60)
    unlock.pressed.connect(func(): commerce.purchase())
    box.add_child(unlock)
    var restore := _button(_loc("restore"), SURFACE_ALT, TEXT, 54, BORDER)
    restore.pressed.connect(func(): commerce.restore())
    box.add_child(restore)
    if not _is_premium():
        ads.load_banner()

func _start_crisis() -> void:
    if bool(state.get("range_complete", false)):
        _show_home()
        return
    if not _is_premium() and _lives() <= 0:
        _show_play_options()
        return
    var column := _screen_scroller()
    ads.destroy_banner()
    selected_module = -1
    telemetry_scanned = false
    scenario = CascadeEngine.generate(int(state["current_level"]), int(state["attempt_nonce"]))
    crisis_started_ms = Time.get_ticks_msec()

    _brand_header(column, false)
    var top := HBoxContainer.new()
    top.add_theme_constant_override("separation", 12)
    column.add_child(top)
    var title := _label("%s %s" % [_loc("level"), _fmt(int(state["current_level"]))], 26, TEXT)
    title.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    top.add_child(title)
    countdown_label = _label("30.0", 28, TEXT)
    countdown_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
    top.add_child(countdown_label)

    var metadata := _label("%s %s  ·  %s %s" % [_loc("address"), _fmt(int(scenario["scenario_address"])), _loc("deadline"), "T+70"], 14, MUTED, true)
    column.add_child(metadata)

    var chain_panel := _panel(WHITE, 20, 1, BORDER, 16)
    column.add_child(chain_panel)
    var chain_box := VBoxContainer.new()
    chain_box.add_theme_constant_override("separation", 8)
    chain_panel.add_child(chain_box)
    chain_box.add_child(_label(_loc("relay"), 17, TEXT))
    chain_box.add_child(_label(_relay_text(), 15, MUTED, true))

    var telemetry_title := _label(_loc("telemetry"), 20, TEXT)
    column.add_child(telemetry_title)
    for module_index in range(3):
        var card := _panel(WHITE, 20, 1, BORDER, 16)
        column.add_child(card)
        var row := HBoxContainer.new()
        row.add_theme_constant_override("separation", 12)
        card.add_child(row)
        var code := _label("%s %s" % [_loc("reset_short"), CascadeEngine.MODULE_NAMES[module_index]], 18, [BLUE, ORANGE, PURPLE][module_index])
        code.custom_minimum_size = Vector2(180, 0)
        row.add_child(code)
        var readout := _label("••••••", 16, MUTED, true)
        readout.size_flags_horizontal = Control.SIZE_EXPAND_FILL
        row.add_child(readout)
        module_readouts.append(readout)
        var choose := _button(CascadeEngine.MODULE_NAMES[module_index], SURFACE_ALT, TEXT, 50, BORDER)
        choose.disabled = true
        choose.pressed.connect(_select_module.bind(module_index))
        module_buttons.append(choose)
        row.add_child(choose)

    var scan := _button(_loc("scan"), BLUE, WHITE, 60)
    scan.pressed.connect(_scan_telemetry.bind(scan))
    column.add_child(scan)

    var commit := _button(_loc("commit"), TEAL, WHITE, 62)
    commit.name = "CommitButton"
    commit.disabled = true
    commit.pressed.connect(_commit_selection)
    column.add_child(commit)

    deadline_end_ms = Time.get_ticks_msec() + int(DEADLINE_SECONDS * 1000.0)
    countdown_active = true

func _relay_text() -> String:
    var parts: Array[String] = []
    for i in range(scenario["relay_delays"].size()):
        parts.append("R%d +%d" % [i + 1, int(scenario["relay_delays"][i])])
    return "  ›  ".join(parts)

func _scan_telemetry(scan_button: Button) -> void:
    if telemetry_scanned:
        return
    telemetry_scanned = true
    scan_button.disabled = true
    for i in range(3):
        var telemetry := CascadeEngine.telemetry_for(scenario, i)
        module_readouts[i].text = str(telemetry["text"])
        module_readouts[i].add_theme_color_override("font_color", RED if bool(telemetry["is_fault"]) else MUTED)
        module_buttons[i].disabled = false

func _select_module(module_index: int) -> void:
    if not telemetry_scanned:
        return
    selected_module = module_index
    for i in range(module_buttons.size()):
        var selected := i == module_index
        module_buttons[i].add_theme_stylebox_override("normal", _style([BLUE, ORANGE, PURPLE][i] if selected else SURFACE_ALT, 12, 1, BORDER, 10))
        module_buttons[i].add_theme_color_override("font_color", WHITE if selected else TEXT)
    var commit := ui_root.find_child("CommitButton", true, false) as Button
    if commit != null:
        commit.disabled = false

func _commit_selection() -> void:
    if selected_module < 0:
        return
    countdown_active = false
    _resolve_crisis(false)

func _resolve_crisis(timed_out: bool) -> void:
    countdown_active = false
    var result := {"success": false, "tick": 0, "reason": "TIMEOUT"}
    if not timed_out:
        result = CascadeEngine.simulate(scenario, selected_module)
    var success := bool(result.get("success", false))
    var elapsed_ms := maxi(0, Time.get_ticks_msec() - crisis_started_ms)

    if success:
        state["streak"] = int(state.get("streak", 0)) + 1
        state["cleared"] = int(state.get("cleared", 0)) + 1
        var best := int(state.get("best_time_ms", -1))
        if best < 0 or elapsed_ms < best:
            state["best_time_ms"] = elapsed_ms
        if int(state["current_level"]) >= CascadeEngine.MAX_LEVEL:
            state["range_complete"] = true
        else:
            state["current_level"] = int(state["current_level"]) + 1
        state["attempt_nonce"] = 0
    else:
        state["streak"] = 0
        state["attempt_nonce"] = int(state["attempt_nonce"]) + 1
        _consume_life()
    _save()
    _show_result(success, timed_out, result, elapsed_ms)

func _show_result(success: bool, timed_out: bool, result: Dictionary, elapsed_ms: int) -> void:
    var column := _screen_scroller()
    _brand_header(column, false)
    var tone := GREEN if success else RED
    var headline := _loc("resolved") if success else (_loc("timeout") if timed_out else _loc("failed"))
    var hero := _panel(WHITE, 28, 2, tone, 22)
    column.add_child(hero)
    var box := VBoxContainer.new()
    box.add_theme_constant_override("separation", 12)
    hero.add_child(box)
    var head := _label(headline, 31, tone, true)
    head.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    box.add_child(head)
    var body := _label(_loc("success") if success else (_loc("fresh") if timed_out else "%s\n%s" % [_loc("wrong"), _loc("fresh")]), 18, TEXT, true)
    body.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    box.add_child(body)
    if success:
        var detail := _label("T+%s  ·  %.1fs" % [str(result.get("tick", "—")), float(elapsed_ms) / 1000.0], 16, MUTED)
        detail.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
        box.add_child(detail)
    else:
        var attempts := _label(_loc("unlimited") if _is_premium() else "%s  %s" % [_loc("attempts"), _hearts(_lives())], 18, ORANGE)
        attempts.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
        box.add_child(attempts)

    if bool(state.get("range_complete", false)):
        var complete := _label(_loc("range_complete"), 18, GREEN, true)
        complete.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
        column.add_child(complete)
        var home_complete := _button(_loc("menu"), SURFACE_ALT, TEXT, 58, BORDER)
        home_complete.pressed.connect(_show_home)
        column.add_child(home_complete)
    elif success:
        var next := _button(_loc("next"), TEAL, WHITE, 62)
        next.pressed.connect(_start_crisis)
        column.add_child(next)
    elif _is_premium() or _lives() > 0:
        var retry := _button(_loc("retry"), TEAL, WHITE, 62)
        retry.pressed.connect(_start_crisis)
        column.add_child(retry)
    else:
        var options := _button(_loc("premium"), TEAL, WHITE, 62)
        options.pressed.connect(_show_play_options)
        column.add_child(options)

    var home := _button(_loc("menu"), SURFACE_ALT, TEXT, 56, BORDER)
    home.pressed.connect(_show_home)
    column.add_child(home)
    if not _is_premium():
        ads.load_banner()

func _on_entitlement_changed(is_premium: bool) -> void:
    state["premium_verified_cache"] = is_premium
    state["premium_source"] = OS.get_name() if is_premium else ""
    _save()
    if is_premium:
        ads.destroy_banner()
    else:
        ads.initialize(false)
    _show_home()

func _brand_header(column: VBoxContainer, show_back: bool) -> void:
    var row := HBoxContainer.new()
    row.add_theme_constant_override("separation", 10)
    column.add_child(row)
    if show_back:
        var back := _button("‹  %s" % _loc("back"), SURFACE_ALT, TEXT, 48, BORDER)
        back.pressed.connect(_show_home)
        row.add_child(back)
    var spacer := Control.new()
    spacer.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    row.add_child(spacer)
    var status_text := _loc("unlimited") if _is_premium() else "%s %s" % [_loc("attempts"), str(_lives())]
    var chip := _label(status_text, 15, GREEN if _is_premium() else MUTED)
    chip.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
    row.add_child(chip)

func _panel(fill: Color, radius: int, border_width: int, border_color: Color, padding: int) -> PanelContainer:
    var panel := PanelContainer.new()
    panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    panel.add_theme_stylebox_override("panel", _style(fill, radius, border_width, border_color, padding))
    return panel

func _style(fill: Color, radius: int, border_width: int = 0, border_color: Color = Color.TRANSPARENT, padding: int = 12) -> StyleBoxFlat:
    var style := StyleBoxFlat.new()
    style.bg_color = fill
    style.corner_radius_top_left = radius
    style.corner_radius_top_right = radius
    style.corner_radius_bottom_left = radius
    style.corner_radius_bottom_right = radius
    style.border_width_left = border_width
    style.border_width_right = border_width
    style.border_width_top = border_width
    style.border_width_bottom = border_width
    style.border_color = border_color
    style.content_margin_left = padding
    style.content_margin_right = padding
    style.content_margin_top = padding
    style.content_margin_bottom = padding
    return style

func _label(text_value: String, size: int, color: Color, wrap: bool = false) -> Label:
    var label := Label.new()
    label.text = text_value
    label.add_theme_font_size_override("font_size", size)
    label.add_theme_color_override("font_color", color)
    if wrap:
        label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    return label

func _button(text_value: String, fill: Color, color: Color, height: int, border_color: Color = Color.TRANSPARENT) -> Button:
    var button := Button.new()
    button.text = text_value
    button.custom_minimum_size = Vector2(0, height)
    button.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    button.add_theme_font_size_override("font_size", 18)
    button.add_theme_color_override("font_color", color)
    button.add_theme_color_override("font_hover_color", color)
    button.add_theme_color_override("font_pressed_color", color)
    button.add_theme_stylebox_override("normal", _style(fill, 16, 1 if border_color != Color.TRANSPARENT else 0, border_color, 12))
    button.add_theme_stylebox_override("hover", _style(fill.lightened(0.04), 16, 1 if border_color != Color.TRANSPARENT else 0, border_color, 12))
    button.add_theme_stylebox_override("pressed", _style(fill.darkened(0.05), 16, 1 if border_color != Color.TRANSPARENT else 0, border_color, 12))
    button.add_theme_stylebox_override("disabled", _style(SURFACE_ALT, 16, 1, BORDER, 12))
    button.add_theme_color_override("font_disabled_color", MUTED)
    return button

func _gap(column: VBoxContainer, height: int) -> void:
    var spacer := Control.new()
    spacer.custom_minimum_size = Vector2(0, height)
    column.add_child(spacer)

func _hearts(count: int) -> String:
    return "♥".repeat(clampi(count, 0, 5)) + "♡".repeat(5 - clampi(count, 0, 5))

func _format_duration(seconds: int) -> String:
    var s := maxi(0, seconds)
    return "%02d:%02d" % [int(s / 60), s % 60]

func _fmt(value: int) -> String:
    var raw := str(value)
    var out := ""
    var group := 0
    for i in range(raw.length() - 1, -1, -1):
        if group > 0 and group % 3 == 0:
            out = "," + out
        out = raw.substr(i, 1) + out
        group += 1
    return out

func _toast(message: String) -> void:
    if message.strip_edges().is_empty():
        return
    toast_label.text = message
    toast_label.visible = true
    var timer := get_tree().create_timer(2.8)
    timer.timeout.connect(func():
        if toast_label != null and is_instance_valid(toast_label):
            toast_label.visible = false
    )
