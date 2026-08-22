class_name LocaleCatalog
extends RefCounted

const LOCALES := [
    {"id":"en-US","name":"English"},
    {"id":"fr-FR","name":"Français"},
    {"id":"es-ES","name":"Español"},
    {"id":"de-DE","name":"Deutsch"},
    {"id":"it-IT","name":"Italiano"},
    {"id":"pt-BR","name":"Português (Brasil)"},
    {"id":"pl-PL","name":"Polski"},
    {"id":"ja-JP","name":"日本語"},
    {"id":"ko-KR","name":"한국어"},
    {"id":"zh-CN","name":"简体中文"},
    {"id":"zh-TW","name":"繁體中文"},
    {"id":"ar-SA","name":"العربية"},
]

const TEXT := {
    "en-US": {
        "title":"CASCADE DISPATCH", "tagline":"Spot the fault. Stop the cascade.", "begin":"Begin dispatch", "continue":"Continue dispatch",
        "map":"Campaign", "how":"How to play", "settings":"Settings", "level":"Crisis", "sector":"Sector", "cleared":"cleared", "streak":"streak",
        "attempts":"Attempts", "unlimited":"Unlimited", "scan":"Scan telemetry", "commit":"Commit reset", "choose":"Choose one module to hard-reset",
        "telemetry":"Telemetry", "relay":"Relay chain", "deadline":"Decision window", "resolved":"Cascade stopped", "failed":"Cascade continued", "timeout":"Decision timed out",
        "fresh":"That grid is discarded. Your retry is fresh.", "next":"Next crisis", "retry":"Fresh retry", "menu":"Main menu", "wrong":"Reset did not stop the cascade.",
        "success":"Critical flow reached the sink inside the objective.", "no_attempts":"No attempts available", "recharge":"Next attempt", "free":"Free mode",
        "premium":"Unlimited Play", "unlock":"Unlock unlimited · US$2.99", "restore":"Restore purchase", "privacy":"Privacy policy", "privacy_choices":"Ad privacy choices",
        "support":"Support", "language":"Language", "done":"Done", "back":"Back", "how1":"1. Scan modules A, B and C.", "how2":"2. Read the telemetry pattern.",
        "how3":"3. Choose exactly one module to reset.", "how4":"4. Commit before 30 seconds expires.", "store_pending":"Store verification is still pending.",
        "address":"Grid", "record":"Campaign record", "privacy_note":"Progress stays on this device. Ads are never shown during active play.", "reset_short":"Reset",
        "range_complete":"All 2,000,000,000 crises cleared."
    },
    "fr-FR": {
        "title":"CASCADE DISPATCH", "tagline":"Repérez la panne. Stoppez la cascade.", "begin":"Commencer", "continue":"Continuer",
        "map":"Campagne", "how":"Comment jouer", "settings":"Réglages", "level":"Crise", "sector":"Secteur", "cleared":"résolues", "streak":"série",
        "attempts":"Essais", "unlimited":"Illimité", "scan":"Scanner la télémétrie", "commit":"Valider la réinitialisation", "choose":"Choisissez un module à réinitialiser",
        "telemetry":"Télémétrie", "relay":"Chaîne de relais", "deadline":"Temps de décision", "resolved":"Cascade stoppée", "failed":"Cascade poursuivie", "timeout":"Temps écoulé",
        "fresh":"Cette grille est supprimée. Le nouvel essai sera différent.", "next":"Crise suivante", "retry":"Nouvel essai", "menu":"Menu principal", "wrong":"La réinitialisation n'a pas stoppé la cascade.",
        "success":"Le flux critique a atteint la sortie dans l'objectif.", "no_attempts":"Aucun essai disponible", "recharge":"Prochain essai", "free":"Mode gratuit",
        "premium":"Jeu illimité", "unlock":"Débloquer l'illimité · 2,99 $US", "restore":"Restaurer l'achat", "privacy":"Politique de confidentialité", "privacy_choices":"Choix de confidentialité publicitaire",
        "support":"Assistance", "language":"Langue", "done":"Terminé", "back":"Retour", "how1":"1. Scannez les modules A, B et C.", "how2":"2. Lisez le schéma de télémétrie.",
        "how3":"3. Choisissez un seul module à réinitialiser.", "how4":"4. Validez avant la fin des 30 secondes.", "store_pending":"La vérification de la boutique est en attente.",
        "address":"Grille", "record":"Progression", "privacy_note":"La progression reste sur cet appareil. Aucune publicité pendant le jeu actif.", "reset_short":"Réinit.",
        "range_complete":"Les 2 000 000 000 crises sont résolues."
    },
    "es-ES": {
        "title":"CASCADE DISPATCH", "tagline":"Detecta el fallo. Detén la cascada.", "begin":"Iniciar despacho", "continue":"Continuar",
        "map":"Campaña", "how":"Cómo jugar", "settings":"Ajustes", "level":"Crisis", "sector":"Sector", "cleared":"resueltas", "streak":"racha",
        "attempts":"Intentos", "unlimited":"Ilimitado", "scan":"Escanear telemetría", "commit":"Confirmar reinicio", "choose":"Elige un módulo para reiniciar",
        "telemetry":"Telemetría", "relay":"Cadena de relés", "deadline":"Tiempo de decisión", "resolved":"Cascada detenida", "failed":"La cascada continuó", "timeout":"Tiempo agotado",
        "fresh":"Esta cuadrícula se descarta. El reintento será nuevo.", "next":"Siguiente crisis", "retry":"Reintento nuevo", "menu":"Menú principal", "wrong":"El reinicio no detuvo la cascada.",
        "success":"El flujo crítico llegó al destino dentro del objetivo.", "no_attempts":"No hay intentos disponibles", "recharge":"Próximo intento", "free":"Modo gratuito",
        "premium":"Juego ilimitado", "unlock":"Desbloquear ilimitado · 2,99 US$", "restore":"Restaurar compra", "privacy":"Política de privacidad", "privacy_choices":"Opciones de privacidad de anuncios",
        "support":"Ayuda", "language":"Idioma", "done":"Listo", "back":"Atrás", "how1":"1. Escanea los módulos A, B y C.", "how2":"2. Lee el patrón de telemetría.",
        "how3":"3. Elige exactamente un módulo para reiniciar.", "how4":"4. Confirma antes de que pasen 30 segundos.", "store_pending":"La verificación de la tienda sigue pendiente.",
        "address":"Cuadrícula", "record":"Progreso", "privacy_note":"El progreso permanece en este dispositivo. No hay anuncios durante el juego activo.", "reset_short":"Reiniciar",
        "range_complete":"Se han resuelto las 2.000.000.000 crisis."
    },
    "de-DE": {
        "title":"CASCADE DISPATCH", "tagline":"Fehler finden. Kaskade stoppen.", "begin":"Einsatz starten", "continue":"Fortsetzen",
        "map":"Kampagne", "how":"Spielanleitung", "settings":"Einstellungen", "level":"Krise", "sector":"Sektor", "cleared":"gelöst", "streak":"Serie",
        "attempts":"Versuche", "unlimited":"Unbegrenzt", "scan":"Telemetrie scannen", "commit":"Reset ausführen", "choose":"Ein Modul für den Hard-Reset wählen",
        "telemetry":"Telemetrie", "relay":"Relaiskette", "deadline":"Entscheidungszeit", "resolved":"Kaskade gestoppt", "failed":"Kaskade läuft weiter", "timeout":"Zeit abgelaufen",
        "fresh":"Dieses Raster wird verworfen. Der nächste Versuch ist neu.", "next":"Nächste Krise", "retry":"Neuer Versuch", "menu":"Hauptmenü", "wrong":"Der Reset hat die Kaskade nicht gestoppt.",
        "success":"Der kritische Fluss erreichte das Ziel rechtzeitig.", "no_attempts":"Keine Versuche verfügbar", "recharge":"Nächster Versuch", "free":"Kostenloser Modus",
        "premium":"Unbegrenztes Spiel", "unlock":"Unbegrenzt freischalten · 2,99 US$", "restore":"Kauf wiederherstellen", "privacy":"Datenschutz", "privacy_choices":"Datenschutzoptionen für Werbung",
        "support":"Support", "language":"Sprache", "done":"Fertig", "back":"Zurück", "how1":"1. Module A, B und C scannen.", "how2":"2. Telemetriemuster lesen.",
        "how3":"3. Genau ein Modul zurücksetzen.", "how4":"4. Vor Ablauf von 30 Sekunden bestätigen.", "store_pending":"Store-Prüfung ist noch ausstehend.",
        "address":"Raster", "record":"Kampagnenstand", "privacy_note":"Fortschritt bleibt auf diesem Gerät. Während des Spiels werden keine Anzeigen gezeigt.", "reset_short":"Reset",
        "range_complete":"Alle 2.000.000.000 Krisen wurden gelöst."
    },
    "it-IT": {
        "title":"CASCADE DISPATCH", "tagline":"Trova il guasto. Ferma la cascata.", "begin":"Avvia intervento", "continue":"Continua",
        "map":"Campagna", "how":"Come si gioca", "settings":"Impostazioni", "level":"Crisi", "sector":"Settore", "cleared":"risolte", "streak":"serie",
        "attempts":"Tentativi", "unlimited":"Illimitato", "scan":"Scansiona telemetria", "commit":"Conferma reset", "choose":"Scegli un modulo da resettare",
        "telemetry":"Telemetria", "relay":"Catena relè", "deadline":"Tempo decisione", "resolved":"Cascata fermata", "failed":"La cascata continua", "timeout":"Tempo scaduto",
        "fresh":"Questa griglia viene eliminata. Il nuovo tentativo sarà diverso.", "next":"Crisi successiva", "retry":"Nuovo tentativo", "menu":"Menu principale", "wrong":"Il reset non ha fermato la cascata.",
        "success":"Il flusso critico ha raggiunto la destinazione in tempo.", "no_attempts":"Nessun tentativo disponibile", "recharge":"Prossimo tentativo", "free":"Modalità gratuita",
        "premium":"Gioco illimitato", "unlock":"Sblocca illimitato · 2,99 USD", "restore":"Ripristina acquisto", "privacy":"Informativa privacy", "privacy_choices":"Scelte privacy annunci",
        "support":"Assistenza", "language":"Lingua", "done":"Fine", "back":"Indietro", "how1":"1. Scansiona i moduli A, B e C.", "how2":"2. Leggi lo schema telemetrico.",
        "how3":"3. Scegli un solo modulo da resettare.", "how4":"4. Conferma entro 30 secondi.", "store_pending":"La verifica dello store è ancora in corso.",
        "address":"Griglia", "record":"Progresso", "privacy_note":"I progressi restano sul dispositivo. Nessuna pubblicità durante il gioco attivo.", "reset_short":"Reset",
        "range_complete":"Tutte le 2.000.000.000 crisi sono state risolte."
    },
    "pt-BR": {
        "title":"CASCADE DISPATCH", "tagline":"Encontre a falha. Pare a cascata.", "begin":"Iniciar despacho", "continue":"Continuar",
        "map":"Campanha", "how":"Como jogar", "settings":"Configurações", "level":"Crise", "sector":"Setor", "cleared":"resolvidas", "streak":"sequência",
        "attempts":"Tentativas", "unlimited":"Ilimitado", "scan":"Escanear telemetria", "commit":"Confirmar reinício", "choose":"Escolha um módulo para reiniciar",
        "telemetry":"Telemetria", "relay":"Cadeia de relés", "deadline":"Tempo de decisão", "resolved":"Cascata interrompida", "failed":"A cascata continuou", "timeout":"Tempo esgotado",
        "fresh":"Esta grade foi descartada. A nova tentativa será diferente.", "next":"Próxima crise", "retry":"Nova tentativa", "menu":"Menu principal", "wrong":"O reinício não interrompeu a cascata.",
        "success":"O fluxo crítico chegou ao destino dentro do objetivo.", "no_attempts":"Sem tentativas disponíveis", "recharge":"Próxima tentativa", "free":"Modo gratuito",
        "premium":"Jogo ilimitado", "unlock":"Desbloquear ilimitado · US$ 2,99", "restore":"Restaurar compra", "privacy":"Política de privacidade", "privacy_choices":"Opções de privacidade de anúncios",
        "support":"Suporte", "language":"Idioma", "done":"Concluir", "back":"Voltar", "how1":"1. Escaneie os módulos A, B e C.", "how2":"2. Leia o padrão de telemetria.",
        "how3":"3. Escolha exatamente um módulo para reiniciar.", "how4":"4. Confirme antes de 30 segundos.", "store_pending":"A verificação da loja ainda está pendente.",
        "address":"Grade", "record":"Progresso", "privacy_note":"O progresso fica neste dispositivo. Não há anúncios durante a partida.", "reset_short":"Reiniciar",
        "range_complete":"Todas as 2.000.000.000 crises foram resolvidas."
    },
    "pl-PL": {
        "title":"CASCADE DISPATCH", "tagline":"Znajdź usterkę. Zatrzymaj kaskadę.", "begin":"Rozpocznij", "continue":"Kontynuuj",
        "map":"Kampania", "how":"Jak grać", "settings":"Ustawienia", "level":"Kryzys", "sector":"Sektor", "cleared":"rozwiązanych", "streak":"seria",
        "attempts":"Próby", "unlimited":"Bez limitu", "scan":"Skanuj telemetrię", "commit":"Zatwierdź reset", "choose":"Wybierz jeden moduł do resetu",
        "telemetry":"Telemetria", "relay":"Łańcuch przekaźników", "deadline":"Czas decyzji", "resolved":"Kaskada zatrzymana", "failed":"Kaskada trwa", "timeout":"Czas minął",
        "fresh":"Ta plansza została odrzucona. Kolejna próba będzie nowa.", "next":"Następny kryzys", "retry":"Nowa próba", "menu":"Menu główne", "wrong":"Reset nie zatrzymał kaskady.",
        "success":"Krytyczny przepływ dotarł do celu w czasie.", "no_attempts":"Brak dostępnych prób", "recharge":"Następna próba", "free":"Tryb darmowy",
        "premium":"Gra bez limitu", "unlock":"Odblokuj bez limitu · 2,99 USD", "restore":"Przywróć zakup", "privacy":"Polityka prywatności", "privacy_choices":"Ustawienia prywatności reklam",
        "support":"Pomoc", "language":"Język", "done":"Gotowe", "back":"Wstecz", "how1":"1. Skanuj moduły A, B i C.", "how2":"2. Odczytaj wzorzec telemetrii.",
        "how3":"3. Wybierz dokładnie jeden moduł do resetu.", "how4":"4. Zatwierdź przed upływem 30 sekund.", "store_pending":"Weryfikacja sklepu nadal trwa.",
        "address":"Plansza", "record":"Postęp", "privacy_note":"Postęp pozostaje na tym urządzeniu. Reklam nie ma podczas aktywnej gry.", "reset_short":"Reset",
        "range_complete":"Rozwiązano wszystkie 2 000 000 000 kryzysów."
    },
    "ja-JP": {
        "title":"CASCADE DISPATCH", "tagline":"故障を見抜き、連鎖を止める。", "begin":"出動開始", "continue":"続ける",
        "map":"キャンペーン", "how":"遊び方", "settings":"設定", "level":"クライシス", "sector":"セクター", "cleared":"クリア", "streak":"連続",
        "attempts":"挑戦回数", "unlimited":"無制限", "scan":"テレメトリをスキャン", "commit":"リセットを実行", "choose":"リセットするモジュールを1つ選択",
        "telemetry":"テレメトリ", "relay":"リレーチェーン", "deadline":"判断時間", "resolved":"連鎖停止", "failed":"連鎖継続", "timeout":"時間切れ",
        "fresh":"このグリッドは破棄されます。再挑戦は新しい問題です。", "next":"次のクライシス", "retry":"新しい再挑戦", "menu":"メインメニュー", "wrong":"リセットでは連鎖を止められませんでした。",
        "success":"重要フローは期限内に到達しました。", "no_attempts":"挑戦回数がありません", "recharge":"次の挑戦", "free":"無料モード",
        "premium":"無制限プレイ", "unlock":"無制限を解除 · US$2.99", "restore":"購入を復元", "privacy":"プライバシーポリシー", "privacy_choices":"広告プライバシー設定",
        "support":"サポート", "language":"言語", "done":"完了", "back":"戻る", "how1":"1. A・B・Cをスキャンします。", "how2":"2. テレメトリのパターンを読みます。",
        "how3":"3. リセットするモジュールを1つだけ選びます。", "how4":"4. 30秒以内に実行します。", "store_pending":"ストア確認はまだ完了していません。",
        "address":"グリッド", "record":"進行状況", "privacy_note":"進行状況は端末内に保存されます。プレイ中に広告は表示されません。", "reset_short":"リセット",
        "range_complete":"2,000,000,000件すべてのクライシスをクリアしました。"
    },
    "ko-KR": {
        "title":"CASCADE DISPATCH", "tagline":"고장을 찾고 연쇄를 멈추세요.", "begin":"출동 시작", "continue":"계속하기",
        "map":"캠페인", "how":"플레이 방법", "settings":"설정", "level":"위기", "sector":"섹터", "cleared":"해결", "streak":"연속",
        "attempts":"시도", "unlimited":"무제한", "scan":"텔레메트리 스캔", "commit":"리셋 실행", "choose":"하드 리셋할 모듈 하나를 선택하세요",
        "telemetry":"텔레메트리", "relay":"릴레이 체인", "deadline":"결정 시간", "resolved":"연쇄 중단", "failed":"연쇄 지속", "timeout":"시간 초과",
        "fresh":"이 그리드는 폐기됩니다. 재시도는 새 문제입니다.", "next":"다음 위기", "retry":"새 재시도", "menu":"메인 메뉴", "wrong":"리셋으로 연쇄를 멈추지 못했습니다.",
        "success":"중요 흐름이 제한 시간 안에 목적지에 도달했습니다.", "no_attempts":"사용 가능한 시도가 없습니다", "recharge":"다음 시도", "free":"무료 모드",
        "premium":"무제한 플레이", "unlock":"무제한 잠금 해제 · US$2.99", "restore":"구매 복원", "privacy":"개인정보 처리방침", "privacy_choices":"광고 개인정보 선택",
        "support":"지원", "language":"언어", "done":"완료", "back":"뒤로", "how1":"1. A, B, C 모듈을 스캔합니다.", "how2":"2. 텔레메트리 패턴을 읽습니다.",
        "how3":"3. 리셋할 모듈 하나만 선택합니다.", "how4":"4. 30초 안에 실행합니다.", "store_pending":"스토어 확인이 아직 진행 중입니다.",
        "address":"그리드", "record":"진행 기록", "privacy_note":"진행 기록은 이 기기에만 저장됩니다. 플레이 중에는 광고가 표시되지 않습니다.", "reset_short":"리셋",
        "range_complete":"2,000,000,000개의 위기를 모두 해결했습니다."
    },
    "zh-CN": {
        "title":"CASCADE DISPATCH", "tagline":"找出故障，阻止级联。", "begin":"开始调度", "continue":"继续",
        "map":"战役", "how":"玩法", "settings":"设置", "level":"危机", "sector":"区域", "cleared":"已解决", "streak":"连胜",
        "attempts":"尝试", "unlimited":"无限", "scan":"扫描遥测", "commit":"执行重置", "choose":"选择一个模块进行硬重置",
        "telemetry":"遥测", "relay":"中继链", "deadline":"决策时间", "resolved":"级联已阻止", "failed":"级联仍在继续", "timeout":"决策超时",
        "fresh":"此网格已丢弃。重试将生成新问题。", "next":"下一危机", "retry":"全新重试", "menu":"主菜单", "wrong":"重置未能阻止级联。",
        "success":"关键流在目标时间内到达终点。", "no_attempts":"暂无可用尝试", "recharge":"下一次尝试", "free":"免费模式",
        "premium":"无限游玩", "unlock":"解锁无限 · US$2.99", "restore":"恢复购买", "privacy":"隐私政策", "privacy_choices":"广告隐私选项",
        "support":"支持", "language":"语言", "done":"完成", "back":"返回", "how1":"1. 扫描 A、B、C 模块。", "how2":"2. 读取遥测模式。",
        "how3":"3. 只选择一个模块重置。", "how4":"4. 在30秒内提交。", "store_pending":"商店验证仍在进行中。",
        "address":"网格", "record":"战役记录", "privacy_note":"进度仅保存在此设备。进行游戏时绝不显示广告。", "reset_short":"重置",
        "range_complete":"全部 2,000,000,000 个危机已解决。"
    },
    "zh-TW": {
        "title":"CASCADE DISPATCH", "tagline":"找出故障，阻止級聯。", "begin":"開始調度", "continue":"繼續",
        "map":"戰役", "how":"玩法", "settings":"設定", "level":"危機", "sector":"區域", "cleared":"已解決", "streak":"連勝",
        "attempts":"嘗試", "unlimited":"無限", "scan":"掃描遙測", "commit":"執行重置", "choose":"選擇一個模組進行硬重置",
        "telemetry":"遙測", "relay":"中繼鏈", "deadline":"決策時間", "resolved":"級聯已阻止", "failed":"級聯仍在繼續", "timeout":"決策逾時",
        "fresh":"此網格已丟棄。重試將產生新問題。", "next":"下一危機", "retry":"全新重試", "menu":"主選單", "wrong":"重置未能阻止級聯。",
        "success":"關鍵流程在目標時間內到達終點。", "no_attempts":"暫無可用嘗試", "recharge":"下一次嘗試", "free":"免費模式",
        "premium":"無限遊玩", "unlock":"解鎖無限 · US$2.99", "restore":"回復購買", "privacy":"隱私權政策", "privacy_choices":"廣告隱私選項",
        "support":"支援", "language":"語言", "done":"完成", "back":"返回", "how1":"1. 掃描 A、B、C 模組。", "how2":"2. 讀取遙測模式。",
        "how3":"3. 只選擇一個模組重置。", "how4":"4. 在30秒內提交。", "store_pending":"商店驗證仍在進行中。",
        "address":"網格", "record":"戰役紀錄", "privacy_note":"進度僅保存在此裝置。遊戲進行中絕不顯示廣告。", "reset_short":"重置",
        "range_complete":"全部 2,000,000,000 個危機已解決。"
    },
    "ar-SA": {
        "title":"CASCADE DISPATCH", "tagline":"اكتشف العطل. أوقف السلسلة.", "begin":"بدء المهمة", "continue":"متابعة",
        "map":"الحملة", "how":"طريقة اللعب", "settings":"الإعدادات", "level":"الأزمة", "sector":"القطاع", "cleared":"تم حلها", "streak":"سلسلة",
        "attempts":"المحاولات", "unlimited":"غير محدود", "scan":"فحص القياسات", "commit":"تنفيذ إعادة الضبط", "choose":"اختر وحدة واحدة لإعادة الضبط",
        "telemetry":"القياسات", "relay":"سلسلة المرحلات", "deadline":"وقت القرار", "resolved":"تم إيقاف السلسلة", "failed":"استمرت السلسلة", "timeout":"انتهى الوقت",
        "fresh":"تم حذف هذه الشبكة. المحاولة التالية ستكون جديدة.", "next":"الأزمة التالية", "retry":"محاولة جديدة", "menu":"القائمة الرئيسية", "wrong":"إعادة الضبط لم توقف السلسلة.",
        "success":"وصل التدفق الحرج إلى الهدف ضمن الوقت المحدد.", "no_attempts":"لا توجد محاولات متاحة", "recharge":"المحاولة التالية", "free":"الوضع المجاني",
        "premium":"لعب غير محدود", "unlock":"فتح اللعب غير المحدود · 2.99 US$", "restore":"استعادة الشراء", "privacy":"سياسة الخصوصية", "privacy_choices":"خيارات خصوصية الإعلانات",
        "support":"الدعم", "language":"اللغة", "done":"تم", "back":"رجوع", "how1":"1. افحص الوحدات A وB وC.", "how2":"2. اقرأ نمط القياسات.",
        "how3":"3. اختر وحدة واحدة فقط لإعادة الضبط.", "how4":"4. نفّذ القرار قبل انتهاء 30 ثانية.", "store_pending":"التحقق من المتجر ما زال قيد الانتظار.",
        "address":"الشبكة", "record":"سجل الحملة", "privacy_note":"يبقى التقدم على هذا الجهاز. لا تظهر الإعلانات أثناء اللعب النشط.", "reset_short":"إعادة ضبط",
        "range_complete":"تم حل جميع الأزمات وعددها 2,000,000,000."
    },
}

static func normalize(locale: String) -> String:
    if TEXT.has(locale):
        return locale
    if locale == "en":
        return "en-US"
    var normalized_input := locale.replace("_", "-")
    if TEXT.has(normalized_input):
        return normalized_input
    var base := normalized_input.split("-")[0]
    for entry in LOCALES:
        if str(entry["id"]).begins_with(base + "-"):
            return str(entry["id"])
    return "en-US"

static func tr(locale: String, key: String) -> String:
    var resolved := normalize(locale)
    var dict: Dictionary = TEXT.get(resolved, TEXT["en-US"])
    return str(dict.get(key, TEXT["en-US"].get(key, key)))

static func is_rtl(locale: String) -> bool:
    return normalize(locale) == "ar-SA"
