(HSC.youtubeRuntime ||= []).push(() => {


// ---------------------------------------------------------------------------------------------
// Generated data (scratchpad i18n/tools/gen.cjs from the 12 legacy packs, 7 November 2026): every player-visible
// string of the game, one flat object per language tag of the locked 40-language catalogue
// (docs/GLOBAL-LANGUAGE-AND-TEXT-CONTRACT.md section 2). labels.js reads it. Translators: see i18n/catalog.json for
// each key's screen, purpose, length budget and placeholders. A key may carry plural forms as "key#one",
// "key#few", "key#many", "key#two", "key#zero" (Intl.PluralRules categories); the bare key is the "other" form.
// All 40 packs are final (owner decision, 7 November 2026: no separate human review); English is the per-key fallback.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  HSC.LABEL_LANGUAGES = [["en","English"],["ar","العربية"],["ca","Català"],["hr","Hrvatski"],["cs","Čeština"],["da","Dansk"],["nl","Nederlands"],["fi","Suomi"],["fr","Français"],["de","Deutsch"],["hu","Magyar"],["id","Bahasa Indonesia"],["it","Italiano"],["ja","日本語"],["ko","한국어"],["ms","Bahasa Melayu"],["nb","Norsk bokmål"],["pl","Polski"],["pt-BR","Português"],["ro","Română"],["ru","Русский"],["zh-Hans","简体中文"],["sk","Slovenčina"],["es-419","Español"],["sv","Svenska"],["th","ไทย"],["zh-Hant","繁體中文"],["tr","Türkçe"],["vi","Tiếng Việt"],["hi","हिन्दी"],["bn","বাংলা"],["ur","اردو"],["ta","தமிழ்"],["fil","Filipino"],["uk","Українська"],["fa","فارسی"],["sw","Kiswahili"],["ha","Hausa"],["yo","Yorùbá"],["he","עברית"]];
  HSC.LABEL_RTL = ['ar', 'ur', 'fa', 'he'];
        HSC.LABEL_PACKS = {
    "en": {
      "play": "Play",
      "modes": "Modes",
      "daily": "Daily",
      "gift": "Gift",
      "wardrobe": "Wardrobe",
      "salon": "Salon",
      "styles": "Styles",
      "regulars": "Regulars",
      "orders": "Orders",
      "freestyle": "Freestyle",
      "rescue": "Rescue",
      "beards": "Beards",
      "rush": "Rush",
      "event": "Event",
      "new": "New",
      "map": "Map",
      "tour": "Tour",
      "home": "Home",
      "choose_city": "Choose a city",
      "no_customers": "No customers yet",
      "sound": "Sound",
      "free": "Free",
      "coins": "Coins",
      "clippers": "Clippers",
      "gowns": "Gowns",
      "pick_city": "Pick your city",
      "next_city": "Next city",
      "m_requests": "Cut what they ask",
      "m_fix": "Fix a bad haircut",
      "m_beard": "Shape the beard",
      "m_rush": "Beat the clock",
      "task_fade": "{n} fades",
      "task_fade#one": "{n} fade",
      "task_beard": "{n} beards",
      "task_beard#one": "{n} beard",
      "task_regular": "Cut a regular",
      "task_star3": "{n} three-star cuts",
      "task_star3#one": "{n} three-star cut",
      "task_customers": "{n} customers",
      "task_customers#one": "{n} customer",
      "task_tips": "Earn {n} in tips",
      "career": "Career",
      "quick_play": "Quick Play",
      "settings": "Settings",
      "shop_name": "Salon name",
      "hand": "Hand",
      "left": "Left",
      "right": "Right",
      "privacy": "Privacy",
      "ad_choices": "Ad choices",
      "full": "Full",
      "language": "Language",
      "shops": "Shops",
      "parts": "Parts",
      "wall": "Wall",
      "lower": "Panels",
      "floor": "Floor",
      "mat": "Mat",
      "mirror": "Mirror",
      "lights": "Lights",
      "shelf": "Shelf",
      "chair": "Chair",
      "decor": "Decor",
      "name": "Name",
      "open": "Open",
      "est": "Est. {y}",
      "classic": "Classic",
      "c_london": "London",
      "c_tokyo": "Tokyo",
      "c_lagos": "Lagos",
      "c_istanbul": "Istanbul",
      "c_mexico": "Mexico",
      "c_mumbai": "Mumbai",
      "shopname": "Barbershop",
      "a_back": "Back",
      "a_close": "Close",
      "a_menu": "Menu",
      "a_modes": "Modes",
      "a_newcust": "New customer",
      "a_goals": "Goals",
      "a_dblday": "Watch a video to double today's reward",
      "a_chest": "Open the weekly chest",
      "a_wear": "Wear it",
      "a_onemore": "Watch a video for one more",
      "a_collect": "Collect",
      "a_undo": "Watch a video to undo the last stroke",
      "a_triple": "Watch a video to triple the tips",
      "a_coins": "Coins",
      "a_shop": "Shop",
      "a_salon": "Salon",
      "a_gift": "Gift",
      "a_take": "Take",
      "a_dblit": "Watch a video to double it",
      "a_wardrobe": "Wardrobe",
      "a_clippers": "Clippers",
      "a_robes": "Robes",
      "a_detail": "Detail level",
      "a_next": "Next",
      "a_prev": "Previous",
      "a_timeleft": "Time left today",
      "a_mute": "Mute game sound",
      "a_unmute": "Unmute game sound",
      "arc_clipper": "Clipper guard: tap or slide, 1 is shortest",
      "a_clipon": "Clipper on: drag on the hair to cut",
      "a_clipoff": "Clipper off: drag to turn the customer",
      "a_finish": "Finish haircut",
      "a_nextcust": "Next customer",
      "a_showing": "Showing finished haircut",
      "a_savefail": "Save failed. Retrying on your next action",
      "a_guard": "Guard {g}, {mm} millimetres",
      "mm": "mm",
      "a_view": "Customer haircut view",
      "a_turn": "Drag to turn the customer",
      "shop": "Shop",
      "collection": "Collection",
      "a_wish": "Save for this",
      "a_bill": "{n} customers to the {c}-coin bill",
      "a_bill#one": "{n} customer to the {c}-coin bill",
      "make_base": "Make base",
      "update_needed": "Update the game to continue Career",
      "buy": "Buy",
      "a_wishvid": "Watch a video for coins toward your wishlist",
      "a_share": "Share haircut",
      "a_wearing": "Wearing",
      "a_wearthis": "Wear this",
      "tut_clipper": "Tap the clipper to switch it on",
      "tut_guard": "Tap or slide the arc to change the guard",
      "tut_cut": "Drag on the hair to cut",
      "boot_new_title": "Update needed",
      "boot_new_msg": "Your progress is safe. Update to the latest version.",
      "boot_fail_title": "The game could not load",
      "boot_fail_msg": "Your progress is kept. Check your connection and retry.",
      "retry": "Retry",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Cairo",
      "city_casablanca": "Casablanca",
      "city_london": "London",
      "city_paris": "Paris",
      "city_berlin": "Berlin",
      "city_madrid": "Madrid",
      "city_warsaw": "Warsaw",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Riyadh",
      "city_dubai": "Dubai",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karachi",
      "city_dhaka": "Dhaka",
      "city_colombo": "Colombo",
      "city_tokyo": "Tokyo",
      "city_seoul": "Seoul",
      "city_shanghai": "Shanghai",
      "city_jakarta": "Jakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montreal",
      "city_mexico-city": "Mexico City",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "ar": {
      "play": "العب",
      "modes": "الأنماط",
      "daily": "تحدي اليوم",
      "gift": "هدية",
      "wardrobe": "الخزانة",
      "salon": "الصالون",
      "styles": "القصات",
      "regulars": "الزبائن الدائمون",
      "orders": "الطلبات",
      "freestyle": "لعب حر",
      "rescue": "إنقاذ",
      "beards": "اللحى",
      "rush": "سباق الوقت",
      "event": "فعالية",
      "new": "جديد",
      "map": "الخريطة",
      "tour": "جولة",
      "home": "الرئيسية",
      "choose_city": "اختر مدينة",
      "no_customers": "لا زبائن بعد",
      "sound": "الصوت",
      "free": "مجانًا",
      "coins": "العملات",
      "clippers": "الماكينات",
      "gowns": "الأردية",
      "pick_city": "اختر مدينتك",
      "next_city": "المدينة التالية",
      "m_requests": "قصّ كما يطلب الزبون",
      "m_fix": "أصلح قصة سيئة",
      "m_beard": "شذّب اللحية",
      "m_rush": "سابق الوقت",
      "task_fade": "{n} قصة فيد",
      "task_fade#one": "قصة فيد واحدة",
      "task_fade#two": "قصتا فيد",
      "task_fade#few": "{n} قصات فيد",
      "task_fade#many": "{n} قصة فيد",
      "task_beard": "شذّب {n} لحية",
      "task_beard#one": "شذّب لحية واحدة",
      "task_beard#two": "شذّب لحيتين",
      "task_beard#few": "شذّب {n} لحى",
      "task_beard#many": "شذّب {n} لحية",
      "task_regular": "قصّ شعر زبون دائم",
      "task_star3": "{n} قصة بثلاث نجوم",
      "task_star3#one": "قصة بثلاث نجوم",
      "task_star3#two": "قصتان بثلاث نجوم",
      "task_star3#few": "{n} قصات بثلاث نجوم",
      "task_star3#many": "{n} قصة بثلاث نجوم",
      "task_customers": "اخدم {n} زبون",
      "task_customers#one": "اخدم زبونًا واحدًا",
      "task_customers#two": "اخدم زبونين",
      "task_customers#few": "اخدم {n} زبائن",
      "task_customers#many": "اخدم {n} زبونًا",
      "task_tips": "اجمع بقشيشًا بقيمة {n}",
      "career": "المسيرة",
      "quick_play": "لعب سريع",
      "settings": "الإعدادات",
      "shop_name": "اسم الصالون",
      "hand": "اليد",
      "left": "اليسرى",
      "right": "اليمنى",
      "privacy": "الخصوصية",
      "ad_choices": "خيارات الإعلانات",
      "full": "كامل",
      "language": "اللغة",
      "shops": "الصالونات",
      "parts": "القطع",
      "wall": "الجدار",
      "lower": "الألواح",
      "floor": "الأرضية",
      "mat": "السجادة",
      "mirror": "المرآة",
      "lights": "الإضاءة",
      "shelf": "الرف",
      "chair": "الكرسي",
      "decor": "الديكور",
      "name": "الاسم",
      "open": "مفتوح",
      "est": "منذ {y}",
      "classic": "كلاسيكي",
      "c_london": "لندن",
      "c_tokyo": "طوكيو",
      "c_lagos": "لاغوس",
      "c_istanbul": "إسطنبول",
      "c_mexico": "المكسيك",
      "c_mumbai": "مومباي",
      "shopname": "صالون حلاقة",
      "a_back": "رجوع",
      "a_close": "إغلاق",
      "a_menu": "القائمة",
      "a_modes": "الأنماط",
      "a_newcust": "زبون جديد",
      "a_goals": "الأهداف",
      "a_dblday": "شاهد فيديو لمضاعفة مكافأة اليوم",
      "a_chest": "افتح صندوق الأسبوع",
      "a_wear": "استخدمه",
      "a_onemore": "شاهد فيديو واحصل على واحد آخر",
      "a_collect": "استلم",
      "a_undo": "شاهد فيديو للتراجع عن آخر تمريرة",
      "a_triple": "شاهد فيديو واحصل على 3 أضعاف البقشيش",
      "a_coins": "العملات",
      "a_shop": "المتجر",
      "a_salon": "الصالون",
      "a_gift": "هدية",
      "a_take": "احصل عليه",
      "a_dblit": "شاهد فيديو لمضاعفة المكافأة",
      "a_wardrobe": "الخزانة",
      "a_clippers": "الماكينات",
      "a_robes": "الأردية",
      "a_detail": "مستوى التفاصيل",
      "a_next": "التالي",
      "a_prev": "السابق",
      "a_timeleft": "الوقت المتبقي اليوم",
      "a_mute": "كتم صوت اللعبة",
      "a_unmute": "تشغيل صوت اللعبة",
      "arc_clipper": "مشط الماكينة: اضغط أو اسحب، 1 هو الأقصر",
      "a_clipon": "الماكينة تعمل: اسحب على الشعر للقص",
      "a_clipoff": "الماكينة متوقفة: اسحب لتدوير الزبون",
      "a_finish": "إنهاء القصة",
      "a_nextcust": "الزبون التالي",
      "a_showing": "عرض القصة النهائية",
      "a_savefail": "تعذّر الحفظ. سنعيد المحاولة عند الإجراء التالي",
      "a_guard": "المشط {g}، {mm} مليمتر",
      "mm": "ملم",
      "a_view": "عرض قصة الزبون",
      "a_turn": "اسحب لتدوير الزبون",
      "shop": "المتجر",
      "collection": "أعمالي",
      "a_wish": "ادّخر لشرائه",
      "a_bill": "فاتورة {c} عملة بعد {n} من الزبائن",
      "make_base": "اجعله أساسًا",
      "update_needed": "حدّث اللعبة لمتابعة مسيرتك",
      "buy": "شراء",
      "a_wishvid": "شاهد فيديو واحصل على عملات لأمنيتك",
      "a_share": "شارك القصة",
      "a_wearing": "قيد الاستخدام",
      "a_wearthis": "استخدم هذا",
      "tut_clipper": "اضغط على الماكينة لتشغيلها",
      "tut_guard": "اضغط على القوس أو اسحبه لتغيير المشط",
      "tut_cut": "اسحب على الشعر للقص",
      "boot_new_title": "يلزم تحديث اللعبة",
      "boot_new_msg": "تقدّمك محفوظ. حدّث اللعبة إلى أحدث إصدار.",
      "boot_fail_title": "تعذّر تحميل اللعبة",
      "boot_fail_msg": "تقدّمك محفوظ. تحقّق من اتصالك وحاول مجددًا.",
      "retry": "حاول مجددًا",
      "city_lagos": "لاغوس",
      "city_kinshasa": "كينشاسا",
      "city_nairobi": "نيروبي",
      "city_johannesburg": "جوهانسبرغ",
      "city_cairo": "القاهرة",
      "city_casablanca": "الدار البيضاء",
      "city_london": "لندن",
      "city_paris": "باريس",
      "city_berlin": "برلين",
      "city_madrid": "مدريد",
      "city_warsaw": "وارسو",
      "city_istanbul": "إسطنبول",
      "city_riyadh": "الرياض",
      "city_dubai": "دبي",
      "city_amman": "عمّان",
      "city_delhi": "دلهي",
      "city_mumbai": "مومباي",
      "city_karachi": "كراتشي",
      "city_dhaka": "دكا",
      "city_colombo": "كولومبو",
      "city_tokyo": "طوكيو",
      "city_seoul": "سول",
      "city_shanghai": "شنغهاي",
      "city_jakarta": "جاكرتا",
      "city_manila": "مانيلا",
      "city_bangkok": "بانكوك",
      "city_new-york": "نيويورك",
      "city_los-angeles": "لوس أنجلوس",
      "city_toronto": "تورونتو",
      "city_montreal": "مونتريال",
      "city_mexico-city": "مكسيكو سيتي",
      "city_sao-paulo": "ساو باولو",
      "city_buenos-aires": "بوينس آيرس",
      "city_kingston": "كينغستون",
      "city_sydney": "سيدني",
      "city_auckland": "أوكلاند"
    },
    "ca": {
      "play": "Juga",
      "modes": "Modes",
      "daily": "Repte diari",
      "gift": "Regal",
      "wardrobe": "Vestidor",
      "salon": "La meva barberia",
      "styles": "Estils",
      "regulars": "Habituals",
      "orders": "Encàrrecs",
      "freestyle": "Lliure",
      "rescue": "Rescat",
      "beards": "Barbes",
      "rush": "Contrarellotge",
      "event": "Esdeveniment",
      "new": "Nou",
      "map": "Mapa",
      "tour": "Gira",
      "home": "Inici",
      "choose_city": "Tria una ciutat",
      "no_customers": "Encara no hi ha clients",
      "sound": "So",
      "free": "Gratis",
      "coins": "Monedes",
      "clippers": "Maquinetes",
      "gowns": "Capes",
      "pick_city": "Tria la ciutat",
      "next_city": "Següent ciutat",
      "m_requests": "Talla el que et demanen",
      "m_fix": "Arregla un mal tall",
      "m_beard": "Dona forma a la barba",
      "m_rush": "Corre contra el rellotge",
      "task_fade": "Fes {n} degradats",
      "task_fade#one": "Fes {n} degradat",
      "task_beard": "Retalla {n} barbes",
      "task_beard#one": "Retalla {n} barba",
      "task_regular": "Atén un client habitual",
      "task_star3": "{n} talls de 3 estrelles",
      "task_star3#one": "{n} tall de 3 estrelles",
      "task_customers": "Atén {n} clients",
      "task_customers#one": "Atén {n} client",
      "task_tips": "Guanya {n} en propines",
      "career": "Carrera",
      "quick_play": "Partida ràpida",
      "settings": "Configuració",
      "shop_name": "Nom de la barberia",
      "hand": "Mà",
      "left": "Esquerra",
      "right": "Dreta",
      "privacy": "Privadesa",
      "ad_choices": "Opcions d’anuncis",
      "full": "Complet",
      "language": "Idioma",
      "shops": "Barberies",
      "parts": "Peces",
      "wall": "Paret",
      "lower": "Plafons",
      "floor": "Terra",
      "mat": "Catifa",
      "mirror": "Mirall",
      "lights": "Llums",
      "shelf": "Prestatge",
      "chair": "Butaca",
      "decor": "Decoració",
      "name": "Nom",
      "open": "Obert",
      "est": "Des de {y}",
      "classic": "Clàssica",
      "c_london": "Londres",
      "c_tokyo": "Tòquio",
      "c_lagos": "Lagos",
      "c_istanbul": "Istanbul",
      "c_mexico": "Mèxic",
      "c_mumbai": "Bombai",
      "shopname": "Barberia",
      "a_back": "Enrere",
      "a_close": "Tanca",
      "a_menu": "Menú",
      "a_modes": "Modes",
      "a_newcust": "Client nou",
      "a_goals": "Objectius",
      "a_dblday": "Mira un vídeo per doblar la recompensa d’avui",
      "a_chest": "Obre el cofre setmanal",
      "a_wear": "Equipa",
      "a_onemore": "Mira un vídeo per aconseguir-ne un més",
      "a_collect": "Recull",
      "a_undo": "Mira un vídeo per desfer l’última passada",
      "a_triple": "Mira un vídeo per triplicar les propines",
      "a_coins": "Monedes",
      "a_shop": "Botiga",
      "a_salon": "La meva barberia",
      "a_gift": "Regal",
      "a_take": "Agafa",
      "a_dblit": "Mira un vídeo per doblar-ho",
      "a_wardrobe": "Vestidor",
      "a_clippers": "Maquinetes",
      "a_robes": "Capes",
      "a_detail": "Nivell de detall",
      "a_next": "Següent",
      "a_prev": "Anterior",
      "a_timeleft": "Temps restant d’avui",
      "a_mute": "Silencia el joc",
      "a_unmute": "Activa el so del joc",
      "arc_clipper": "Pinta de la maquineta: toca o llisca; l’1 és la més curta",
      "a_clipon": "Maquineta engegada: arrossega pels cabells per tallar",
      "a_clipoff": "Maquineta apagada: arrossega per girar el client",
      "a_finish": "Acaba el tall",
      "a_nextcust": "Client següent",
      "a_showing": "Es mostra el tall acabat",
      "a_savefail": "No s’ha pogut desar. Es tornarà a provar a la propera acció",
      "a_guard": "Pinta {g}, {mm} mil·límetres",
      "mm": "mm",
      "a_view": "Vista del tall del client",
      "a_turn": "Arrossega per girar el client",
      "shop": "Botiga",
      "collection": "Col·lecció",
      "a_wish": "Estalvia per a això",
      "a_bill": "Falten {n} clients per a la factura de {c} monedes",
      "a_bill#one": "Falta {n} client per a la factura de {c} monedes",
      "make_base": "Fes-la base",
      "update_needed": "Actualitza el joc per continuar la teva Carrera",
      "buy": "Compra",
      "a_wishvid": "Mira un vídeo per guanyar monedes per a la teva llista de desitjos",
      "a_share": "Comparteix el tall",
      "a_wearing": "En ús",
      "a_wearthis": "Equipa aquest disseny",
      "tut_clipper": "Toca la maquineta per engegar-la",
      "tut_guard": "Toca o llisca l’arc per canviar la pinta",
      "tut_cut": "Arrossega pels cabells per tallar",
      "boot_new_title": "Cal una versió més nova del joc",
      "boot_new_msg": "El teu progrés està segur. Actualitza a la darrera versió.",
      "boot_fail_title": "No s’ha pogut carregar el joc",
      "boot_fail_msg": "El progrés desat s’ha conservat. Comprova la connexió i torna-ho a provar.",
      "retry": "Reintenta",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "El Caire",
      "city_casablanca": "Casablanca",
      "city_london": "Londres",
      "city_paris": "París",
      "city_berlin": "Berlín",
      "city_madrid": "Madrid",
      "city_warsaw": "Varsòvia",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Riad",
      "city_dubai": "Dubai",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Bombai",
      "city_karachi": "Karachi",
      "city_dhaka": "Dhaka",
      "city_colombo": "Colombo",
      "city_tokyo": "Tòquio",
      "city_seoul": "Seül",
      "city_shanghai": "Xangai",
      "city_jakarta": "Jakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "Nova York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Mont-real",
      "city_mexico-city": "Ciutat de Mèxic",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "hr": {
      "play": "Igraj",
      "modes": "Načini igre",
      "daily": "Dnevni izazov",
      "gift": "Poklon",
      "wardrobe": "Garderoba",
      "salon": "Salon",
      "styles": "Frizure",
      "regulars": "Stalni klijenti",
      "orders": "Narudžbe",
      "freestyle": "Slobodna igra",
      "rescue": "Spašavanje",
      "beards": "Brade",
      "rush": "Protiv sata",
      "event": "Događaj",
      "new": "Novo",
      "map": "Karta",
      "tour": "Turneja",
      "home": "Početna",
      "choose_city": "Odaberi grad",
      "no_customers": "Još nema klijenata",
      "sound": "Zvuk",
      "free": "Besplatno",
      "coins": "Novčići",
      "clippers": "Mašinice",
      "gowns": "Ogrtači",
      "pick_city": "Odaberi svoj grad",
      "next_city": "Sljedeći grad",
      "m_requests": "Šišaj po narudžbi",
      "m_fix": "Popravi lošu frizuru",
      "m_beard": "Oblikuj bradu",
      "m_rush": "Stigni na vrijeme",
      "task_fade": "Napravi {n} fade frizura",
      "task_fade#one": "Napravi {n} fade frizuru",
      "task_fade#few": "Napravi {n} fade frizure",
      "task_beard": "Uredi {n} brada",
      "task_beard#one": "Uredi {n} bradu",
      "task_beard#few": "Uredi {n} brade",
      "task_regular": "Ošišaj stalnog klijenta",
      "task_star3": "{n} frizura s 3 zvjezdice",
      "task_star3#one": "{n} frizura s 3 zvjezdice",
      "task_star3#few": "{n} frizure s 3 zvjezdice",
      "task_customers": "{n} klijenata",
      "task_customers#one": "{n} klijent",
      "task_customers#few": "{n} klijenta",
      "task_tips": "Napojnice: {n} novčića",
      "task_tips#one": "Napojnice: {n} novčić",
      "task_tips#few": "Napojnice: {n} novčića",
      "career": "Karijera",
      "quick_play": "Brza igra",
      "settings": "Postavke",
      "shop_name": "Ime salona",
      "hand": "Ruka",
      "left": "Lijeva",
      "right": "Desna",
      "privacy": "Privatnost",
      "ad_choices": "Postavke oglasa",
      "full": "Puna",
      "language": "Jezik",
      "shops": "Saloni",
      "parts": "Dijelovi",
      "wall": "Zid",
      "lower": "Paneli",
      "floor": "Pod",
      "mat": "Tepih",
      "mirror": "Ogledalo",
      "lights": "Svjetla",
      "shelf": "Polica",
      "chair": "Stolica",
      "decor": "Ukrasi",
      "name": "Natpis",
      "open": "Otvoreno",
      "est": "Od {y}.",
      "classic": "Klasika",
      "c_london": "London",
      "c_tokyo": "Tokio",
      "c_lagos": "Lagos",
      "c_istanbul": "Istanbul",
      "c_mexico": "Meksiko",
      "c_mumbai": "Mumbai",
      "shopname": "Brijačnica",
      "a_back": "Natrag",
      "a_close": "Zatvori",
      "a_menu": "Izbornik",
      "a_modes": "Načini igre",
      "a_newcust": "Novi klijent",
      "a_goals": "Ciljevi",
      "a_dblday": "Pogledaj video i udvostruči današnju nagradu",
      "a_chest": "Otvori tjednu škrinju",
      "a_wear": "Odaberi",
      "a_onemore": "Pogledaj video i dobij još jedan",
      "a_collect": "Preuzmi",
      "a_undo": "Pogledaj video i poništi zadnji potez",
      "a_triple": "Pogledaj video i utrostruči napojnice",
      "a_coins": "Novčići",
      "a_shop": "Trgovina",
      "a_salon": "Salon",
      "a_gift": "Poklon",
      "a_take": "Uzmi",
      "a_dblit": "Pogledaj video i udvostruči",
      "a_wardrobe": "Garderoba",
      "a_clippers": "Mašinice",
      "a_robes": "Ogrtači",
      "a_detail": "Razina detalja",
      "a_next": "Sljedeća stranica",
      "a_prev": "Prethodna stranica",
      "a_timeleft": "Preostalo vrijeme danas",
      "a_mute": "Isključi zvuk igre",
      "a_unmute": "Uključi zvuk igre",
      "arc_clipper": "Nastavak mašinice: dodirni ili povuci, 1 je najkraći",
      "a_clipon": "Mašinica uključena: povuci po kosi za šišanje",
      "a_clipoff": "Mašinica isključena: povuci za okretanje klijenta",
      "a_finish": "Završi šišanje",
      "a_nextcust": "Sljedeći klijent",
      "a_showing": "Prikaz gotove frizure",
      "a_savefail": "Spremanje nije uspjelo. Pokušat ćemo ponovno pri sljedećoj radnji",
      "a_guard": "Nastavak {g}, {mm} mm",
      "mm": "mm",
      "a_view": "Prikaz frizure klijenta",
      "a_turn": "Povuci za okretanje klijenta",
      "shop": "Trgovina",
      "collection": "Kolekcija",
      "a_wish": "Štedi za ovo",
      "a_bill": "Još {n} klijenata do računa od {c}",
      "a_bill#one": "Još {n} klijent do računa od {c}",
      "a_bill#few": "Još {n} klijenta do računa od {c}",
      "make_base": "Kao osnova",
      "update_needed": "Ažuriraj igru za nastavak karijere",
      "buy": "Kupi",
      "a_wishvid": "Pogledaj video i zaradi novčiće za svoju želju",
      "a_share": "Podijeli frizuru",
      "a_wearing": "Odabrano",
      "a_wearthis": "Odaberi ovo",
      "tut_clipper": "Dodirni mašinicu da je uključiš",
      "tut_guard": "Dodirni ili povuci luk da promijeniš nastavak",
      "tut_cut": "Povuci po kosi za šišanje",
      "boot_new_title": "Potrebna je novija verzija igre",
      "boot_new_msg": "Tvoj napredak je spremljen. Ažuriraj igru na najnoviju verziju.",
      "boot_fail_title": "Igra se nije mogla učitati",
      "boot_fail_msg": "Tvoj napredak je sačuvan. Provjeri vezu i pokušaj ponovno.",
      "retry": "Pokušaj opet",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Kairo",
      "city_casablanca": "Casablanca",
      "city_london": "London",
      "city_paris": "Pariz",
      "city_berlin": "Berlin",
      "city_madrid": "Madrid",
      "city_warsaw": "Varšava",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Rijad",
      "city_dubai": "Dubai",
      "city_amman": "Aman",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karachi",
      "city_dhaka": "Dhaka",
      "city_colombo": "Colombo",
      "city_tokyo": "Tokio",
      "city_seoul": "Seul",
      "city_shanghai": "Šangaj",
      "city_jakarta": "Jakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montréal",
      "city_mexico-city": "Ciudad de México",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "cs": {
      "play": "Hrát",
      "modes": "Režimy",
      "daily": "Denní výzva",
      "gift": "Dárek",
      "wardrobe": "Šatník",
      "salon": "Salon",
      "styles": "Účesy",
      "regulars": "Stálí zákazníci",
      "orders": "Objednávky",
      "freestyle": "Volný styl",
      "rescue": "Záchrana",
      "beards": "Vousy",
      "rush": "Na čas",
      "event": "Událost",
      "new": "Nové",
      "map": "Mapa",
      "tour": "Turné",
      "home": "Hlavní menu",
      "choose_city": "Vyber si město",
      "no_customers": "Zatím žádní zákazníci",
      "sound": "Zvuk",
      "free": "Zdarma",
      "coins": "Mince",
      "clippers": "Strojky",
      "gowns": "Peleríny",
      "pick_city": "Vyber si město",
      "next_city": "Další město",
      "m_requests": "Stříhej podle přání",
      "m_fix": "Oprav zpackaný účes",
      "m_beard": "Uprav vousy",
      "m_rush": "Stihni to včas",
      "task_fade#one": "Udělej {n} fade střih",
      "task_fade#few": "Udělej {n} fade střihy",
      "task_fade#many": "Udělej {n} fade střihu",
      "task_fade": "Udělej {n} fade střihů",
      "task_beard": "Zastřihni vousy {n}×",
      "task_regular": "Ostříhej stálého zákazníka",
      "task_star3#one": "{n} střih za 3 hvězdy",
      "task_star3#few": "{n} střihy za 3 hvězdy",
      "task_star3#many": "{n} střihu za 3 hvězdy",
      "task_star3": "{n} střihů za 3 hvězdy",
      "task_customers#one": "Obsluž {n} zákazníka",
      "task_customers#few": "Obsluž {n} zákazníky",
      "task_customers#many": "Obsluž {n} zákazníka",
      "task_customers": "Obsluž {n} zákazníků",
      "task_tips": "Vydělej {n} na spropitném",
      "career": "Kariéra",
      "quick_play": "Rychlá hra",
      "settings": "Nastavení",
      "shop_name": "Název salonu",
      "hand": "Ruka",
      "left": "Levá",
      "right": "Pravá",
      "privacy": "Ochrana soukromí",
      "ad_choices": "Nastavení reklam",
      "full": "Plná",
      "language": "Jazyk",
      "shops": "Salony",
      "parts": "Vybavení",
      "wall": "Zeď",
      "lower": "Obklad",
      "floor": "Podlaha",
      "mat": "Koberec",
      "mirror": "Zrcadlo",
      "lights": "Světla",
      "shelf": "Police",
      "chair": "Křeslo",
      "decor": "Dekorace",
      "name": "Název",
      "open": "Otevřeno",
      "est": "Od roku {y}",
      "classic": "Klasika",
      "c_london": "Londýn",
      "c_tokyo": "Tokio",
      "c_lagos": "Lagos",
      "c_istanbul": "Istanbul",
      "c_mexico": "Mexiko",
      "c_mumbai": "Bombaj",
      "shopname": "Holičství",
      "a_back": "Zpět",
      "a_close": "Zavřít",
      "a_menu": "Menu",
      "a_modes": "Režimy",
      "a_newcust": "Nový zákazník",
      "a_goals": "Cíle",
      "a_dblday": "Podívej se na video a zdvojnásob dnešní odměnu",
      "a_chest": "Otevři týdenní truhlu",
      "a_wear": "Použít",
      "a_onemore": "Podívej se na video a získej ještě jeden",
      "a_collect": "Vyzvednout",
      "a_undo": "Podívej se na video a vrať poslední tah",
      "a_triple": "Podívej se na video a ztrojnásob spropitné",
      "a_coins": "Mince",
      "a_shop": "Obchod",
      "a_salon": "Salon",
      "a_gift": "Dárek",
      "a_take": "Vzít",
      "a_dblit": "Podívej se na video a zdvojnásob odměnu",
      "a_wardrobe": "Šatník",
      "a_clippers": "Strojky",
      "a_robes": "Peleríny",
      "a_detail": "Úroveň detailů",
      "a_next": "Další",
      "a_prev": "Předchozí",
      "a_timeleft": "Zbývá do konce dne",
      "a_mute": "Vypnout zvuk hry",
      "a_unmute": "Zapnout zvuk hry",
      "arc_clipper": "Nástavec strojku: klepni nebo posuň, 1 je nejkratší",
      "a_clipon": "Strojek zapnutý: táhni po vlasech a stříhej",
      "a_clipoff": "Strojek vypnutý: táhni a otáčej zákazníkem",
      "a_finish": "Dokončit střih",
      "a_nextcust": "Další zákazník",
      "a_showing": "Ukázka hotového střihu",
      "a_savefail": "Uložení selhalo. Zkusíme to znovu při další akci",
      "a_guard": "Nástavec {g}, {mm} mm",
      "mm": "mm",
      "a_view": "Pohled na střih zákazníka",
      "a_turn": "Táhni a otáčej zákazníkem",
      "shop": "Obchod",
      "collection": "Sbírka",
      "a_wish": "Šetřit na tohle",
      "a_bill#one": "Ještě {n} zákazník do účtu na {c}",
      "a_bill#few": "Ještě {n} zákazníci do účtu na {c}",
      "a_bill#many": "Ještě {n} zákazníka do účtu na {c}",
      "a_bill": "Ještě {n} zákazníků do účtu na {c}",
      "make_base": "Jako základ",
      "update_needed": "Aktualizuj hru a pokračuj v kariéře",
      "buy": "Koupit",
      "a_wishvid": "Podívej se na video a získej mince na vysněnou věc",
      "a_share": "Sdílet účes",
      "a_wearing": "Používáš",
      "a_wearthis": "Použít tento",
      "tut_clipper": "Klepni na strojek a zapni ho",
      "tut_guard": "Klepni na oblouk nebo ho posuň a změň nástavec",
      "tut_cut": "Táhni po vlasech a stříhej",
      "boot_new_title": "Je potřeba novější verze hry",
      "boot_new_msg": "Tvůj postup je v bezpečí. Aktualizuj hru na nejnovější verzi.",
      "boot_fail_title": "Hru se nepodařilo načíst",
      "boot_fail_msg": "Tvůj uložený postup zůstal zachován. Zkontroluj připojení a zkus to znovu.",
      "retry": "Zkusit znovu",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Káhira",
      "city_casablanca": "Casablanca",
      "city_london": "Londýn",
      "city_paris": "Paříž",
      "city_berlin": "Berlín",
      "city_madrid": "Madrid",
      "city_warsaw": "Varšava",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Rijád",
      "city_dubai": "Dubaj",
      "city_amman": "Ammán",
      "city_delhi": "Dillí",
      "city_mumbai": "Bombaj",
      "city_karachi": "Karáčí",
      "city_dhaka": "Dháka",
      "city_colombo": "Kolombo",
      "city_tokyo": "Tokio",
      "city_seoul": "Soul",
      "city_shanghai": "Šanghaj",
      "city_jakarta": "Jakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montreal",
      "city_mexico-city": "Mexiko",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "da": {
      "play": "Spil",
      "modes": "Spiltyper",
      "daily": "Daglig opgave",
      "gift": "Gave",
      "wardrobe": "Garderobe",
      "salon": "Salon",
      "styles": "Frisurer",
      "regulars": "Stamkunder",
      "orders": "Bestillinger",
      "freestyle": "Frit spil",
      "rescue": "Redning",
      "beards": "Skæg",
      "rush": "Myldretid",
      "event": "Event",
      "new": "Ny",
      "map": "Kort",
      "tour": "Turné",
      "home": "Start",
      "choose_city": "Vælg en by",
      "no_customers": "Ingen kunder endnu",
      "sound": "Lyd",
      "free": "Gratis",
      "coins": "Mønter",
      "clippers": "Maskiner",
      "gowns": "Kapper",
      "pick_city": "Vælg din by",
      "next_city": "Næste by",
      "m_requests": "Klip det, de ønsker",
      "m_fix": "Red en fejlklipning",
      "m_beard": "Form skægget",
      "m_rush": "Kapløb mod uret",
      "task_fade": "Klip {n} fades",
      "task_fade#one": "Klip {n} fade",
      "task_beard": "Trim {n} skæg",
      "task_beard#one": "Trim {n} skæg",
      "task_regular": "Klip en stamkunde",
      "task_star3": "Få 3 stjerner {n} gange",
      "task_star3#one": "Få 3 stjerner {n} gang",
      "task_customers": "Klip {n} kunder",
      "task_customers#one": "Klip {n} kunde",
      "task_tips": "{n} mønter i drikkepenge",
      "task_tips#one": "{n} mønt i drikkepenge",
      "career": "Karriere",
      "quick_play": "Hurtigt spil",
      "settings": "Indstillinger",
      "shop_name": "Salonnavn",
      "hand": "Hånd",
      "left": "Venstre",
      "right": "Højre",
      "privacy": "Privatlivspolitik",
      "ad_choices": "Annoncevalg",
      "full": "Maksimal",
      "language": "Sprog",
      "shops": "Saloner",
      "parts": "Dele",
      "wall": "Væg",
      "lower": "Paneler",
      "floor": "Gulv",
      "mat": "Tæppe",
      "mirror": "Spejl",
      "lights": "Lamper",
      "shelf": "Hylde",
      "chair": "Stol",
      "decor": "Pynt",
      "name": "Navn",
      "open": "Åben",
      "est": "Siden {y}",
      "classic": "Klassisk",
      "c_london": "London",
      "c_tokyo": "Tokyo",
      "c_lagos": "Lagos",
      "c_istanbul": "Istanbul",
      "c_mexico": "Mexico",
      "c_mumbai": "Mumbai",
      "shopname": "Barbershop",
      "a_back": "Tilbage",
      "a_close": "Luk",
      "a_menu": "Menu",
      "a_modes": "Spiltyper",
      "a_newcust": "Ny kunde",
      "a_goals": "Mål",
      "a_dblday": "Se en video, og fordobl dagens belønning",
      "a_chest": "Åbn ugens kiste",
      "a_wear": "Brug",
      "a_onemore": "Se en video, og få én mere",
      "a_collect": "Hent",
      "a_undo": "Se en video, og fortryd det sidste klip",
      "a_triple": "Se en video, og tredobl drikkepengene",
      "a_coins": "Mønter",
      "a_shop": "Butik",
      "a_salon": "Salon",
      "a_gift": "Gave",
      "a_take": "Tag den",
      "a_dblit": "Se en video, og fordobl den",
      "a_wardrobe": "Garderobe",
      "a_clippers": "Maskiner",
      "a_robes": "Kapper",
      "a_detail": "Detaljeniveau",
      "a_next": "Næste",
      "a_prev": "Forrige",
      "a_timeleft": "Tid tilbage i dag",
      "a_mute": "Slå spillyd fra",
      "a_unmute": "Slå spillyd til",
      "arc_clipper": "Afstandskam: tryk eller skub, 1 er kortest",
      "a_clipon": "Maskine tændt: træk hen over håret for at klippe",
      "a_clipoff": "Maskine slukket: træk for at dreje kunden",
      "a_finish": "Afslut klipningen",
      "a_nextcust": "Næste kunde",
      "a_showing": "Viser den færdige klipning",
      "a_savefail": "Kunne ikke gemme. Vi prøver igen ved næste handling",
      "a_guard": "Kam {g}, {mm} millimeter",
      "mm": "mm",
      "a_view": "Visning af kundens frisure",
      "a_turn": "Træk for at dreje kunden",
      "shop": "Butik",
      "collection": "Samling",
      "a_wish": "Spar op til denne",
      "a_bill": "{n} kunder til regningen på {c} mønter",
      "a_bill#one": "{n} kunde til regningen på {c} mønter",
      "make_base": "Gør til base",
      "update_needed": "Opdater spillet for at fortsætte din karriere",
      "buy": "Køb",
      "a_wishvid": "Se en video, og få mønter til din ønskeliste",
      "a_share": "Del klipningen",
      "a_wearing": "I brug",
      "a_wearthis": "Brug denne",
      "tut_clipper": "Tryk på maskinen for at tænde den",
      "tut_guard": "Tryk eller skub buen for at skifte kam",
      "tut_cut": "Træk hen over håret for at klippe",
      "boot_new_title": "Ny version påkrævet",
      "boot_new_msg": "Dine fremskridt er i sikkerhed. Opdater til den nyeste version.",
      "boot_fail_title": "Spillet kunne ikke indlæses",
      "boot_fail_msg": "Dine fremskridt er gemt. Tjek din forbindelse, og prøv igen.",
      "retry": "Prøv igen",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Kairo",
      "city_casablanca": "Casablanca",
      "city_london": "London",
      "city_paris": "Paris",
      "city_berlin": "Berlin",
      "city_madrid": "Madrid",
      "city_warsaw": "Warszawa",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Riyadh",
      "city_dubai": "Dubai",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karachi",
      "city_dhaka": "Dhaka",
      "city_colombo": "Colombo",
      "city_tokyo": "Tokyo",
      "city_seoul": "Seoul",
      "city_shanghai": "Shanghai",
      "city_jakarta": "Jakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montreal",
      "city_mexico-city": "Mexico City",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "nl": {
      "play": "Spelen",
      "modes": "Spelmodi",
      "daily": "Daguitdaging",
      "gift": "Cadeau",
      "wardrobe": "Garderobe",
      "salon": "Salon",
      "styles": "Kapsels",
      "regulars": "Vaste klanten",
      "orders": "Opdrachten",
      "freestyle": "Vrij spel",
      "rescue": "Reddingsactie",
      "beards": "Baarden",
      "rush": "Spitsuur",
      "event": "Event",
      "new": "Nieuw",
      "map": "Kaart",
      "tour": "Tour",
      "home": "Start",
      "choose_city": "Kies een stad",
      "no_customers": "Nog geen klanten",
      "sound": "Geluid",
      "free": "Gratis",
      "coins": "Munten",
      "clippers": "Tondeuses",
      "gowns": "Kapmantels",
      "pick_city": "Kies je stad",
      "next_city": "Volgende stad",
      "m_requests": "Knip wat ze vragen",
      "m_fix": "Red een mislukt kapsel",
      "m_beard": "Breng de baard in model",
      "m_rush": "Wees de klok te snel af",
      "task_fade": "Knip {n} fades",
      "task_fade#one": "Knip {n} fade",
      "task_beard": "Trim {n} baarden",
      "task_beard#one": "Trim {n} baard",
      "task_regular": "Knip een vaste klant",
      "task_star3": "Haal {n} keer 3 sterren",
      "task_star3#one": "Haal {n} keer 3 sterren",
      "task_customers": "Knip {n} klanten",
      "task_customers#one": "Knip {n} klant",
      "task_tips": "Verdien {n} munten fooi",
      "task_tips#one": "Verdien {n} munt fooi",
      "career": "Carrière",
      "quick_play": "Snel spelen",
      "settings": "Instellingen",
      "shop_name": "Salonnaam",
      "hand": "Hand",
      "left": "Links",
      "right": "Rechts",
      "privacy": "Privacybeleid",
      "ad_choices": "Advertentiekeuzes",
      "full": "Maximaal",
      "language": "Taal",
      "shops": "Salons",
      "parts": "Onderdelen",
      "wall": "Muur",
      "lower": "Panelen",
      "floor": "Vloer",
      "mat": "Vloerkleed",
      "mirror": "Spiegel",
      "lights": "Lampen",
      "shelf": "Plank",
      "chair": "Stoel",
      "decor": "Decoratie",
      "name": "Naam",
      "open": "Open",
      "est": "Sinds {y}",
      "classic": "Klassiek",
      "c_london": "Londen",
      "c_tokyo": "Tokio",
      "c_lagos": "Lagos",
      "c_istanbul": "Istanboel",
      "c_mexico": "Mexico",
      "c_mumbai": "Mumbai",
      "shopname": "Barbershop",
      "a_back": "Terug",
      "a_close": "Sluiten",
      "a_menu": "Menu",
      "a_modes": "Spelmodi",
      "a_newcust": "Nieuwe klant",
      "a_goals": "Doelen",
      "a_dblday": "Bekijk een video en verdubbel je dagbeloning",
      "a_chest": "Open de weekkist",
      "a_wear": "Gebruiken",
      "a_onemore": "Bekijk een video en krijg er nog één",
      "a_collect": "Ophalen",
      "a_undo": "Bekijk een video en maak de laatste knip ongedaan",
      "a_triple": "Bekijk een video en verdrievoudig je fooi",
      "a_coins": "Munten",
      "a_shop": "Winkel",
      "a_salon": "Salon",
      "a_gift": "Cadeau",
      "a_take": "Pakken",
      "a_dblit": "Bekijk een video en verdubbel het",
      "a_wardrobe": "Garderobe",
      "a_clippers": "Tondeuses",
      "a_robes": "Kapmantels",
      "a_detail": "Detailniveau",
      "a_next": "Volgende",
      "a_prev": "Vorige",
      "a_timeleft": "Resterende tijd vandaag",
      "a_mute": "Spelgeluid uit",
      "a_unmute": "Spelgeluid aan",
      "arc_clipper": "Opzetkam: tik of schuif, 1 is het kortst",
      "a_clipon": "Tondeuse aan: sleep over het haar om te knippen",
      "a_clipoff": "Tondeuse uit: sleep om de klant te draaien",
      "a_finish": "Knipbeurt afronden",
      "a_nextcust": "Volgende klant",
      "a_showing": "Het eindresultaat wordt getoond",
      "a_savefail": "Opslaan mislukt. Bij de volgende actie proberen we het opnieuw",
      "a_guard": "Opzetkam {g}, {mm} millimeter",
      "mm": "mm",
      "a_view": "Weergave van het kapsel",
      "a_turn": "Sleep om de klant te draaien",
      "shop": "Winkel",
      "collection": "Collectie",
      "a_wish": "Hiervoor sparen",
      "a_bill": "Nog {n} klanten tot de rekening van {c} munten",
      "a_bill#one": "Nog {n} klant tot de rekening van {c} munten",
      "make_base": "Als basis",
      "update_needed": "Update de game om je carrière voort te zetten",
      "buy": "Kopen",
      "a_wishvid": "Bekijk een video voor munten voor je verlanglijst",
      "a_share": "Kapsel delen",
      "a_wearing": "In gebruik",
      "a_wearthis": "Gebruik deze",
      "tut_clipper": "Tik op de tondeuse om hem aan te zetten",
      "tut_guard": "Tik of schuif op de boog om de opzetkam te wisselen",
      "tut_cut": "Sleep over het haar om te knippen",
      "boot_new_title": "Nieuwe versie nodig",
      "boot_new_msg": "Je voortgang is veilig. Update naar de nieuwste versie.",
      "boot_fail_title": "De game kon niet laden",
      "boot_fail_msg": "Je voortgang is bewaard. Controleer je verbinding en probeer het opnieuw.",
      "retry": "Opnieuw",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Caïro",
      "city_casablanca": "Casablanca",
      "city_london": "Londen",
      "city_paris": "Parijs",
      "city_berlin": "Berlijn",
      "city_madrid": "Madrid",
      "city_warsaw": "Warschau",
      "city_istanbul": "Istanboel",
      "city_riyadh": "Riyad",
      "city_dubai": "Dubai",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karachi",
      "city_dhaka": "Dhaka",
      "city_colombo": "Colombo",
      "city_tokyo": "Tokio",
      "city_seoul": "Seoel",
      "city_shanghai": "Shanghai",
      "city_jakarta": "Jakarta",
      "city_manila": "Manilla",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montreal",
      "city_mexico-city": "Mexico-Stad",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "fi": {
      "play": "Pelaa",
      "modes": "Pelitilat",
      "daily": "Päivän haaste",
      "gift": "Lahja",
      "wardrobe": "Varusteet",
      "salon": "Parturiliike",
      "styles": "Hiustyylit",
      "regulars": "Kanta-asiakkaat",
      "orders": "Toiveet",
      "freestyle": "Vapaa tyyli",
      "rescue": "Pelastus",
      "beards": "Parrat",
      "rush": "Ruuhka",
      "event": "Tapahtuma",
      "new": "Uusi",
      "map": "Kartta",
      "tour": "Kiertue",
      "home": "Päävalikko",
      "choose_city": "Valitse kaupunki",
      "no_customers": "Ei vielä asiakkaita",
      "sound": "Ääni",
      "free": "Ilmainen",
      "coins": "Kolikot",
      "clippers": "Leikkurit",
      "gowns": "Viitat",
      "pick_city": "Valitse kaupunki",
      "next_city": "Seuraava kaupunki",
      "m_requests": "Leikkaa toiveen mukaan",
      "m_fix": "Korjaa huono leikkaus",
      "m_beard": "Muotoile parta",
      "m_rush": "Kilpaile kelloa vastaan",
      "task_fade#one": "Tee {n} fade-leikkaus",
      "task_fade": "Tee {n} fade-leikkausta",
      "task_beard#one": "Trimmaa {n} parta",
      "task_beard": "Trimmaa {n} partaa",
      "task_regular": "Palvele kanta-asiakasta",
      "task_star3#one": "Kolme tähteä {n} kerran",
      "task_star3": "Kolme tähteä {n} kertaa",
      "task_customers#one": "Palvele {n} asiakas",
      "task_customers": "Palvele {n} asiakasta",
      "task_tips": "Ansaitse {n} juomarahoina",
      "career": "Ura",
      "quick_play": "Pikapeli",
      "settings": "Asetukset",
      "shop_name": "Liikkeen nimi",
      "hand": "Käsi",
      "left": "Vasen",
      "right": "Oikea",
      "privacy": "Tietosuoja",
      "ad_choices": "Mainosasetukset",
      "full": "Täysi",
      "language": "Kieli",
      "shops": "Liikkeet",
      "parts": "Osat",
      "wall": "Seinä",
      "lower": "Paneelit",
      "floor": "Lattia",
      "mat": "Matto",
      "mirror": "Peili",
      "lights": "Valot",
      "shelf": "Hylly",
      "chair": "Tuoli",
      "decor": "Koristeet",
      "name": "Nimi",
      "open": "Avoinna",
      "est": "Vuodesta {y}",
      "classic": "Klassinen",
      "c_london": "Lontoo",
      "c_tokyo": "Tokio",
      "c_lagos": "Lagos",
      "c_istanbul": "Istanbul",
      "c_mexico": "México",
      "c_mumbai": "Mumbai",
      "shopname": "Parturi",
      "a_back": "Takaisin",
      "a_close": "Sulje",
      "a_menu": "Valikko",
      "a_modes": "Pelitilat",
      "a_newcust": "Uusi asiakas",
      "a_goals": "Tavoitteet",
      "a_dblday": "Katso video ja tuplaa päivän palkinto",
      "a_chest": "Avaa viikon aarrearkku",
      "a_wear": "Ota käyttöön",
      "a_onemore": "Katso video ja saat yhden lisää",
      "a_collect": "Lunasta",
      "a_undo": "Katso video ja peru viimeinen veto",
      "a_triple": "Katso video ja kolminkertaista juomarahat",
      "a_coins": "Kolikot",
      "a_shop": "Kauppa",
      "a_salon": "Parturiliike",
      "a_gift": "Lahja",
      "a_take": "Ota",
      "a_dblit": "Katso video ja tuplaa",
      "a_wardrobe": "Varusteet",
      "a_clippers": "Leikkurit",
      "a_robes": "Viitat",
      "a_detail": "Grafiikan taso",
      "a_next": "Seuraava",
      "a_prev": "Edellinen",
      "a_timeleft": "Aikaa jäljellä tänään",
      "a_mute": "Mykistä pelin äänet",
      "a_unmute": "Palauta pelin äänet",
      "arc_clipper": "Leikkurin kampa: napauta tai liu'uta, 1 on lyhin",
      "a_clipon": "Leikkuri päällä: leikkaa vetämällä hiuksia",
      "a_clipoff": "Leikkuri pois: käännä asiakasta vetämällä",
      "a_finish": "Viimeistele leikkaus",
      "a_nextcust": "Seuraava asiakas",
      "a_showing": "Valmis leikkaus näkyvissä",
      "a_savefail": "Tallennus epäonnistui. Yritämme uudelleen seuraavalla toiminnolla",
      "a_guard": "Kampa {g}, {mm} millimetriä",
      "mm": "mm",
      "a_view": "Asiakkaan leikkausnäkymä",
      "a_turn": "Käännä asiakasta vetämällä",
      "shop": "Kauppa",
      "collection": "Kokoelma",
      "a_wish": "Säästä tätä varten",
      "a_bill#one": "{n} asiakas, sitten {c} kolikon lasku",
      "a_bill": "{n} asiakasta, sitten {c} kolikon lasku",
      "make_base": "Tee pohjaksi",
      "update_needed": "Päivitä peli ja jatka uraasi",
      "buy": "Osta",
      "a_wishvid": "Katso video ja kerää kolikoita toivelistaasi",
      "a_share": "Jaa leikkaus",
      "a_wearing": "Käytössä",
      "a_wearthis": "Käytä tätä",
      "tut_clipper": "Käynnistä leikkuri napauttamalla",
      "tut_guard": "Vaihda kampaa napauttamalla tai liu'uttamalla kaarta",
      "tut_cut": "Leikkaa vetämällä hiuksia",
      "boot_new_title": "Tarvitaan uudempi peliversio",
      "boot_new_msg": "Edistymisesi on tallessa. Päivitä peli uusimpaan versioon.",
      "boot_fail_title": "Peliä ei voitu ladata",
      "boot_fail_msg": "Tallennettu edistymisesi on tallessa. Tarkista yhteys ja yritä uudelleen.",
      "retry": "Uudelleen",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Kairo",
      "city_casablanca": "Casablanca",
      "city_london": "Lontoo",
      "city_paris": "Pariisi",
      "city_berlin": "Berliini",
      "city_madrid": "Madrid",
      "city_warsaw": "Varsova",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Riad",
      "city_dubai": "Dubai",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karachi",
      "city_dhaka": "Dhaka",
      "city_colombo": "Colombo",
      "city_tokyo": "Tokio",
      "city_seoul": "Soul",
      "city_shanghai": "Shanghai",
      "city_jakarta": "Jakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montreal",
      "city_mexico-city": "Méxicon kaupunki",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "fr": {
      "play": "Jouer",
      "modes": "Modes",
      "daily": "Défi du jour",
      "gift": "Cadeau",
      "wardrobe": "Garde-robe",
      "salon": "Mon salon",
      "styles": "Styles",
      "regulars": "Habitués",
      "orders": "Commandes",
      "freestyle": "Libre",
      "rescue": "Sauvetage",
      "beards": "Barbes",
      "rush": "Chrono",
      "event": "Événement",
      "new": "Nouveau",
      "map": "Carte",
      "tour": "Tournée",
      "home": "Accueil",
      "choose_city": "Choisissez une ville",
      "no_customers": "Aucun client pour l’instant",
      "sound": "Son",
      "free": "Gratuit",
      "coins": "Pièces",
      "clippers": "Tondeuses",
      "gowns": "Capes",
      "pick_city": "Choisir sa ville",
      "next_city": "Ville suivante",
      "m_requests": "Coupez selon la demande",
      "m_fix": "Rattrapez une coupe ratée",
      "m_beard": "Taillez la barbe",
      "m_rush": "Battez le chrono",
      "task_fade": "Faites {n} dégradés",
      "task_fade#one": "Faites {n} dégradé",
      "task_beard": "Taillez {n} barbes",
      "task_beard#one": "Taillez {n} barbe",
      "task_regular": "Coiffez un habitué",
      "task_star3": "{n} coupes 3 étoiles",
      "task_star3#one": "{n} coupe 3 étoiles",
      "task_customers": "Servez {n} clients",
      "task_customers#one": "Servez {n} client",
      "task_tips": "Gagnez {n} en pourboires",
      "career": "Carrière",
      "quick_play": "Partie rapide",
      "settings": "Paramètres",
      "shop_name": "Nom du salon",
      "hand": "Main",
      "left": "Gauche",
      "right": "Droite",
      "privacy": "Confidentialité",
      "ad_choices": "Choix publicitaires",
      "full": "Complet",
      "language": "Langue",
      "shops": "Salons",
      "parts": "Éléments",
      "wall": "Mur",
      "lower": "Lambris",
      "floor": "Sol",
      "mat": "Tapis",
      "mirror": "Miroir",
      "lights": "Lumières",
      "shelf": "Étagère",
      "chair": "Fauteuil",
      "decor": "Déco",
      "name": "Nom",
      "open": "Ouvert",
      "est": "Depuis {y}",
      "classic": "Classique",
      "c_london": "Londres",
      "c_tokyo": "Tokyo",
      "c_lagos": "Lagos",
      "c_istanbul": "Istanbul",
      "c_mexico": "Mexico",
      "c_mumbai": "Bombay",
      "shopname": "Barbier",
      "a_back": "Retour",
      "a_close": "Fermer",
      "a_menu": "Menu",
      "a_modes": "Modes",
      "a_newcust": "Nouveau client",
      "a_goals": "Objectifs",
      "a_dblday": "Regardez une vidéo pour doubler la récompense du jour",
      "a_chest": "Ouvrir le coffre de la semaine",
      "a_wear": "Équiper",
      "a_onemore": "Regardez une vidéo pour en obtenir un autre",
      "a_collect": "Récupérer",
      "a_undo": "Regardez une vidéo pour annuler le dernier passage",
      "a_triple": "Regardez une vidéo pour tripler les pourboires",
      "a_coins": "Pièces",
      "a_shop": "Boutique",
      "a_salon": "Mon salon",
      "a_gift": "Cadeau",
      "a_take": "Prendre",
      "a_dblit": "Regardez une vidéo pour doubler",
      "a_wardrobe": "Garde-robe",
      "a_clippers": "Tondeuses",
      "a_robes": "Capes",
      "a_detail": "Niveau de détail",
      "a_next": "Suivant",
      "a_prev": "Précédent",
      "a_timeleft": "Temps restant aujourd’hui",
      "a_mute": "Couper le son du jeu",
      "a_unmute": "Réactiver le son du jeu",
      "arc_clipper": "Sabot de la tondeuse : touchez ou glissez, le 1 est le plus court",
      "a_clipon": "Tondeuse allumée : glissez sur les cheveux pour couper",
      "a_clipoff": "Tondeuse éteinte : glissez pour faire tourner le client",
      "a_finish": "Terminer la coupe",
      "a_nextcust": "Client suivant",
      "a_showing": "Affichage de la coupe terminée",
      "a_savefail": "Échec de la sauvegarde. Nouvel essai à la prochaine action",
      "a_guard": "Sabot {g}, {mm} millimètres",
      "mm": "mm",
      "a_view": "Vue de la coupe du client",
      "a_turn": "Glissez pour faire tourner le client",
      "shop": "Boutique",
      "collection": "Collection",
      "a_wish": "Économiser pour ça",
      "a_bill": "Encore {n} clients avant la facture de {c} pièces",
      "a_bill#one": "Encore {n} client avant la facture de {c} pièces",
      "make_base": "Comme base",
      "update_needed": "Mettez le jeu à jour pour continuer votre Carrière",
      "buy": "Acheter",
      "a_wishvid": "Regardez une vidéo pour gagner des pièces pour votre liste d’envies",
      "a_share": "Partager la coupe",
      "a_wearing": "Équipé",
      "a_wearthis": "Équiper ce modèle",
      "tut_clipper": "Touchez la tondeuse pour l’allumer",
      "tut_guard": "Touchez ou glissez l’arc pour changer de sabot",
      "tut_cut": "Glissez sur les cheveux pour couper",
      "boot_new_title": "Une version plus récente du jeu est requise",
      "boot_new_msg": "Votre progression est en sécurité. Passez à la dernière version.",
      "boot_fail_title": "Le jeu n’a pas pu se charger",
      "boot_fail_msg": "Votre progression a été conservée. Vérifiez votre connexion et réessayez.",
      "retry": "Réessayer",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Le Caire",
      "city_casablanca": "Casablanca",
      "city_london": "Londres",
      "city_paris": "Paris",
      "city_berlin": "Berlin",
      "city_madrid": "Madrid",
      "city_warsaw": "Varsovie",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Riyad",
      "city_dubai": "Dubaï",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Bombay",
      "city_karachi": "Karachi",
      "city_dhaka": "Dacca",
      "city_colombo": "Colombo",
      "city_tokyo": "Tokyo",
      "city_seoul": "Séoul",
      "city_shanghai": "Shanghai",
      "city_jakarta": "Jakarta",
      "city_manila": "Manille",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montréal",
      "city_mexico-city": "Mexico",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "de": {
      "play": "Spielen",
      "modes": "Modi",
      "daily": "Tagesaufgabe",
      "gift": "Geschenk",
      "wardrobe": "Garderobe",
      "salon": "Salon",
      "styles": "Frisuren",
      "regulars": "Stammkunden",
      "orders": "Aufträge",
      "freestyle": "Freies Spiel",
      "rescue": "Rettung",
      "beards": "Bärte",
      "rush": "Ansturm",
      "event": "Event",
      "new": "Neu",
      "map": "Karte",
      "tour": "Tour",
      "home": "Start",
      "choose_city": "Wähle eine Stadt",
      "no_customers": "Noch keine Kunden",
      "sound": "Ton",
      "free": "Gratis",
      "coins": "Münzen",
      "clippers": "Maschinen",
      "gowns": "Umhänge",
      "pick_city": "Wähle deine Stadt",
      "next_city": "Nächste Stadt",
      "m_requests": "Schneide, was sie wollen",
      "m_fix": "Rette verpfuschte Frisuren",
      "m_beard": "Bring den Bart in Form",
      "m_rush": "Schneller als die Uhr",
      "task_fade": "{n} Fades schneiden",
      "task_fade#one": "{n} Fade schneiden",
      "task_beard": "{n} Bärte trimmen",
      "task_beard#one": "{n} Bart trimmen",
      "task_regular": "Einen Stammkunden bedienen",
      "task_star3": "{n} Schnitte mit 3 Sternen",
      "task_star3#one": "{n} Schnitt mit 3 Sternen",
      "task_customers": "{n} Kunden bedienen",
      "task_customers#one": "{n} Kunden bedienen",
      "task_tips": "{n} Münzen Trinkgeld holen",
      "task_tips#one": "{n} Münze Trinkgeld holen",
      "career": "Karriere",
      "quick_play": "Schnellspiel",
      "settings": "Einstellungen",
      "shop_name": "Salonname",
      "hand": "Hand",
      "left": "Links",
      "right": "Rechts",
      "privacy": "Datenschutz",
      "ad_choices": "Werbeeinstellungen",
      "full": "Maximal",
      "language": "Sprache",
      "shops": "Salons",
      "parts": "Teile",
      "wall": "Wand",
      "lower": "Paneele",
      "floor": "Boden",
      "mat": "Teppich",
      "mirror": "Spiegel",
      "lights": "Lampen",
      "shelf": "Regal",
      "chair": "Stuhl",
      "decor": "Deko",
      "name": "Name",
      "open": "Geöffnet",
      "est": "Seit {y}",
      "classic": "Klassisch",
      "c_london": "London",
      "c_tokyo": "Tokio",
      "c_lagos": "Lagos",
      "c_istanbul": "Istanbul",
      "c_mexico": "Mexiko",
      "c_mumbai": "Mumbai",
      "shopname": "Barbershop",
      "a_back": "Zurück",
      "a_close": "Schließen",
      "a_menu": "Menü",
      "a_modes": "Modi",
      "a_newcust": "Neuer Kunde",
      "a_goals": "Ziele",
      "a_dblday": "Video ansehen und heutige Belohnung verdoppeln",
      "a_chest": "Wochentruhe öffnen",
      "a_wear": "Ausrüsten",
      "a_onemore": "Video ansehen und noch eins holen",
      "a_collect": "Abholen",
      "a_undo": "Video ansehen und letzten Schnitt rückgängig machen",
      "a_triple": "Video ansehen und Trinkgeld verdreifachen",
      "a_coins": "Münzen",
      "a_shop": "Shop",
      "a_salon": "Salon",
      "a_gift": "Geschenk",
      "a_take": "Nehmen",
      "a_dblit": "Video ansehen und verdoppeln",
      "a_wardrobe": "Garderobe",
      "a_clippers": "Maschinen",
      "a_robes": "Umhänge",
      "a_detail": "Detailstufe",
      "a_next": "Weiter",
      "a_prev": "Zurück",
      "a_timeleft": "Heute noch verfügbar",
      "a_mute": "Spielton aus",
      "a_unmute": "Spielton an",
      "arc_clipper": "Aufsatz: tippen oder schieben, 1 ist am kürzesten",
      "a_clipon": "Maschine an: zum Schneiden über die Haare ziehen",
      "a_clipoff": "Maschine aus: ziehen, um den Kunden zu drehen",
      "a_finish": "Haarschnitt beenden",
      "a_nextcust": "Nächster Kunde",
      "a_showing": "Fertiger Haarschnitt wird gezeigt",
      "a_savefail": "Speichern fehlgeschlagen. Wird beim nächsten Schritt erneut versucht",
      "a_guard": "Aufsatz {g}, {mm} Millimeter",
      "mm": "mm",
      "a_view": "Ansicht des Haarschnitts",
      "a_turn": "Ziehen, um den Kunden zu drehen",
      "shop": "Shop",
      "collection": "Sammlung",
      "a_wish": "Darauf sparen",
      "a_bill": "Noch {n} Kunden bis zur Rechnung ({c} Münzen)",
      "a_bill#one": "Noch {n} Kunde bis zur Rechnung ({c} Münzen)",
      "make_base": "Als Basis",
      "update_needed": "Aktualisiere das Spiel, um deine Karriere fortzusetzen",
      "buy": "Kaufen",
      "a_wishvid": "Video ansehen und Münzen für deinen Wunsch sammeln",
      "a_share": "Haarschnitt teilen",
      "a_wearing": "Ausgerüstet",
      "a_wearthis": "Ausrüsten",
      "tut_clipper": "Tippe auf die Maschine, um sie einzuschalten",
      "tut_guard": "Tippe oder schiebe den Bogen, um den Aufsatz zu wechseln",
      "tut_cut": "Zieh über die Haare, um zu schneiden",
      "boot_new_title": "Neue Version nötig",
      "boot_new_msg": "Dein Fortschritt ist sicher. Hol dir die neueste Version.",
      "boot_fail_title": "Spiel konnte nicht geladen werden",
      "boot_fail_msg": "Dein Fortschritt bleibt erhalten. Prüfe deine Verbindung und versuch es erneut.",
      "retry": "Neu laden",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Kairo",
      "city_casablanca": "Casablanca",
      "city_london": "London",
      "city_paris": "Paris",
      "city_berlin": "Berlin",
      "city_madrid": "Madrid",
      "city_warsaw": "Warschau",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Riad",
      "city_dubai": "Dubai",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karatschi",
      "city_dhaka": "Dhaka",
      "city_colombo": "Colombo",
      "city_tokyo": "Tokio",
      "city_seoul": "Seoul",
      "city_shanghai": "Shanghai",
      "city_jakarta": "Jakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montreal",
      "city_mexico-city": "Mexiko-Stadt",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "hu": {
      "play": "Játék",
      "modes": "Játékmódok",
      "daily": "Napi kihívás",
      "gift": "Ajándék",
      "wardrobe": "Ruhatár",
      "salon": "Szalon",
      "styles": "Frizurák",
      "regulars": "Törzsvendégek",
      "orders": "Kívánságok",
      "freestyle": "Szabad stílus",
      "rescue": "Mentőakció",
      "beards": "Szakállak",
      "rush": "Csúcsidő",
      "event": "Esemény",
      "new": "Új",
      "map": "Térkép",
      "tour": "Turné",
      "home": "Főmenü",
      "choose_city": "Válassz várost",
      "no_customers": "Még nincsenek vendégek",
      "sound": "Hang",
      "free": "Ingyenes",
      "coins": "Érmék",
      "clippers": "Hajvágók",
      "gowns": "Vágókendők",
      "pick_city": "Válassz várost",
      "next_city": "Következő város",
      "m_requests": "Vágd, amit kérnek",
      "m_fix": "Javíts ki egy rossz frizurát",
      "m_beard": "Formázd meg a szakállt",
      "m_rush": "Versenyezz az idővel",
      "task_fade": "Vágj {n} fade frizurát",
      "task_beard": "Igazíts meg {n} szakállt",
      "task_regular": "Vágj hajat törzsvendégnek",
      "task_star3": "{n} háromcsillagos vágás",
      "task_customers": "Szolgálj ki {n} vendéget",
      "task_tips": "Gyűjts {n} érme borravalót",
      "career": "Karrier",
      "quick_play": "Gyors játék",
      "settings": "Beállítások",
      "shop_name": "Szalon neve",
      "hand": "Kéz",
      "left": "Bal",
      "right": "Jobb",
      "privacy": "Adatvédelem",
      "ad_choices": "Hirdetési beállítások",
      "full": "Teljes",
      "language": "Nyelv",
      "shops": "Szalonok",
      "parts": "Elemek",
      "wall": "Fal",
      "lower": "Lambéria",
      "floor": "Padló",
      "mat": "Szőnyeg",
      "mirror": "Tükör",
      "lights": "Lámpák",
      "shelf": "Polc",
      "chair": "Szék",
      "decor": "Dekoráció",
      "name": "Név",
      "open": "Nyitva",
      "est": "Alapítva {y}",
      "classic": "Klasszikus",
      "c_london": "London",
      "c_tokyo": "Tokió",
      "c_lagos": "Lagos",
      "c_istanbul": "Isztambul",
      "c_mexico": "Mexikó",
      "c_mumbai": "Mumbai",
      "shopname": "Borbélyüzlet",
      "a_back": "Vissza",
      "a_close": "Bezárás",
      "a_menu": "Menü",
      "a_modes": "Játékmódok",
      "a_newcust": "Új vendég",
      "a_goals": "Célok",
      "a_dblday": "Nézz meg egy videót, és duplázd meg a mai jutalmat",
      "a_chest": "Nyisd ki a heti ládát",
      "a_wear": "Használd",
      "a_onemore": "Nézz meg egy videót, és kapsz még egyet",
      "a_collect": "Begyűjtés",
      "a_undo": "Nézz meg egy videót, és vond vissza az utolsó vágást",
      "a_triple": "Nézz meg egy videót, és háromszorozd meg a borravalót",
      "a_coins": "Érmék",
      "a_shop": "Bolt",
      "a_salon": "Szalon",
      "a_gift": "Ajándék",
      "a_take": "Elveszem",
      "a_dblit": "Nézz meg egy videót, és duplázd meg",
      "a_wardrobe": "Ruhatár",
      "a_clippers": "Hajvágók",
      "a_robes": "Vágókendők",
      "a_detail": "Részletesség",
      "a_next": "Következő",
      "a_prev": "Előző",
      "a_timeleft": "Mára hátralévő idő",
      "a_mute": "Játékhang némítása",
      "a_unmute": "Játékhang bekapcsolása",
      "arc_clipper": "Hajvágó-feltét: koppints vagy húzd, az 1 a legrövidebb",
      "a_clipon": "Hajvágó bekapcsolva: húzd a hajon a vágáshoz",
      "a_clipoff": "Hajvágó kikapcsolva: húzással fordítsd a vendéget",
      "a_finish": "Frizura befejezése",
      "a_nextcust": "Következő vendég",
      "a_showing": "A kész frizura látható",
      "a_savefail": "A mentés nem sikerült. A következő műveletnél újrapróbáljuk",
      "a_guard": "Feltét: {g}, {mm} milliméter",
      "mm": "mm",
      "a_view": "A vendég frizurájának nézete",
      "a_turn": "Húzással fordítsd a vendéget",
      "shop": "Bolt",
      "collection": "Gyűjtemény",
      "a_wish": "Spórolj rá",
      "a_bill": "Számla ({c} érme): {n} vendég múlva",
      "make_base": "Legyen alap",
      "update_needed": "Frissítsd a játékot a karrier folytatásához",
      "buy": "Vásárlás",
      "a_wishvid": "Nézz meg egy videót, és gyűjts érméket a kívánságlistádra",
      "a_share": "Frizura megosztása",
      "a_wearing": "Használatban",
      "a_wearthis": "Ezt használom",
      "tut_clipper": "Koppints a hajvágóra a bekapcsoláshoz",
      "tut_guard": "Koppints az ívre vagy húzd a feltét cseréjéhez",
      "tut_cut": "Húzd az ujjad a hajon a vágáshoz",
      "boot_new_title": "Újabb játékverzió szükséges",
      "boot_new_msg": "Az előrehaladásod biztonságban van. Frissíts a legújabb verzióra.",
      "boot_fail_title": "Nem sikerült betölteni a játékot",
      "boot_fail_msg": "A mentett előrehaladásod megmaradt. Ellenőrizd a kapcsolatot, és próbáld újra.",
      "retry": "Újra",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Kairó",
      "city_casablanca": "Casablanca",
      "city_london": "London",
      "city_paris": "Párizs",
      "city_berlin": "Berlin",
      "city_madrid": "Madrid",
      "city_warsaw": "Varsó",
      "city_istanbul": "Isztambul",
      "city_riyadh": "Rijád",
      "city_dubai": "Dubaj",
      "city_amman": "Ammán",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karacsi",
      "city_dhaka": "Dakka",
      "city_colombo": "Colombo",
      "city_tokyo": "Tokió",
      "city_seoul": "Szöul",
      "city_shanghai": "Sanghaj",
      "city_jakarta": "Jakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montréal",
      "city_mexico-city": "Mexikóváros",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "id": {
      "play": "Main",
      "modes": "Mode",
      "daily": "Harian",
      "gift": "Hadiah",
      "wardrobe": "Lemari",
      "salon": "Barbershop",
      "styles": "Gaya rambut",
      "regulars": "Langganan",
      "orders": "Pesanan",
      "freestyle": "Bebas",
      "rescue": "Perbaiki",
      "beards": "Jenggot",
      "rush": "Kilat",
      "event": "Event",
      "new": "Baru",
      "map": "Peta",
      "tour": "Tur",
      "home": "Beranda",
      "choose_city": "Pilih kota",
      "no_customers": "Belum ada pelanggan",
      "sound": "Suara",
      "free": "Gratis",
      "coins": "Koin",
      "clippers": "Clipper",
      "gowns": "Kain cukur",
      "pick_city": "Pilih kotamu",
      "next_city": "Kota berikutnya",
      "m_requests": "Potong sesuai permintaan",
      "m_fix": "Perbaiki potongan gagal",
      "m_beard": "Rapikan jenggot",
      "m_rush": "Berpacu dengan waktu",
      "task_fade": "Potong {n} fade",
      "task_beard": "Rapikan {n} jenggot",
      "task_regular": "Layani langganan",
      "task_star3": "{n} potongan bintang 3",
      "task_customers": "Layani {n} pelanggan",
      "task_tips": "Kumpulkan {n} koin tip",
      "career": "Karier",
      "quick_play": "Main Cepat",
      "settings": "Pengaturan",
      "shop_name": "Nama barbershop",
      "hand": "Tangan",
      "left": "Kiri",
      "right": "Kanan",
      "privacy": "Privasi",
      "ad_choices": "Pilihan iklan",
      "full": "Maksimal",
      "language": "Bahasa",
      "shops": "Barbershop",
      "parts": "Bagian",
      "wall": "Dinding",
      "lower": "Panel",
      "floor": "Lantai",
      "mat": "Karpet",
      "mirror": "Cermin",
      "lights": "Lampu",
      "shelf": "Rak",
      "chair": "Kursi",
      "decor": "Dekorasi",
      "name": "Nama",
      "open": "Buka",
      "est": "Sejak {y}",
      "classic": "Klasik",
      "c_london": "London",
      "c_tokyo": "Tokyo",
      "c_lagos": "Lagos",
      "c_istanbul": "Istanbul",
      "c_mexico": "Meksiko",
      "c_mumbai": "Mumbai",
      "shopname": "Pangkas Rambut",
      "a_back": "Kembali",
      "a_close": "Tutup",
      "a_menu": "Menu",
      "a_modes": "Mode",
      "a_newcust": "Pelanggan baru",
      "a_goals": "Misi",
      "a_dblday": "Tonton video untuk hadiah hari ini 2x lipat",
      "a_chest": "Buka peti mingguan",
      "a_wear": "Pakai",
      "a_onemore": "Tonton video untuk dapat satu lagi",
      "a_collect": "Klaim",
      "a_undo": "Tonton video untuk membatalkan potongan terakhir",
      "a_triple": "Tonton video untuk tip 3x lipat",
      "a_coins": "Koin",
      "a_shop": "Toko",
      "a_salon": "Barbershop",
      "a_gift": "Hadiah",
      "a_take": "Ambil",
      "a_dblit": "Tonton video untuk 2x lipat",
      "a_wardrobe": "Lemari",
      "a_clippers": "Clipper",
      "a_robes": "Kain cukur",
      "a_detail": "Tingkat detail",
      "a_next": "Berikutnya",
      "a_prev": "Sebelumnya",
      "a_timeleft": "Sisa waktu hari ini",
      "a_mute": "Bisukan suara game",
      "a_unmute": "Nyalakan suara game",
      "arc_clipper": "Sisir clipper: ketuk atau geser, 1 paling pendek",
      "a_clipon": "Clipper menyala: geser di rambut untuk memotong",
      "a_clipoff": "Clipper mati: geser untuk memutar pelanggan",
      "a_finish": "Selesaikan potongan",
      "a_nextcust": "Pelanggan berikutnya",
      "a_showing": "Menampilkan hasil potongan",
      "a_savefail": "Gagal menyimpan. Akan dicoba lagi pada aksi berikutnya",
      "a_guard": "Sisir {g}, {mm} milimeter",
      "mm": "mm",
      "a_view": "Tampilan potongan pelanggan",
      "a_turn": "Geser untuk memutar pelanggan",
      "shop": "Toko",
      "collection": "Koleksi",
      "a_wish": "Nabung untuk ini",
      "a_bill": "{n} pelanggan lagi ke tagihan {c} koin",
      "make_base": "Pakai desain",
      "update_needed": "Perbarui game untuk lanjut Karier",
      "buy": "Beli",
      "a_wishvid": "Tonton video untuk koin barang incaranmu",
      "a_share": "Bagikan hasil potongan",
      "a_wearing": "Dipakai",
      "a_wearthis": "Pakai ini",
      "tut_clipper": "Ketuk clipper untuk menyalakannya",
      "tut_guard": "Ketuk atau geser busur untuk ganti sisir",
      "tut_cut": "Geser di rambut untuk memotong",
      "boot_new_title": "Perlu pembaruan",
      "boot_new_msg": "Progresmu aman. Perbarui ke versi terbaru.",
      "boot_fail_title": "Game gagal dimuat",
      "boot_fail_msg": "Progresmu tetap tersimpan. Cek koneksi lalu coba lagi.",
      "retry": "Coba lagi",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Kairo",
      "city_casablanca": "Casablanca",
      "city_london": "London",
      "city_paris": "Paris",
      "city_berlin": "Berlin",
      "city_madrid": "Madrid",
      "city_warsaw": "Warsawa",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Riyadh",
      "city_dubai": "Dubai",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karachi",
      "city_dhaka": "Dhaka",
      "city_colombo": "Kolombo",
      "city_tokyo": "Tokyo",
      "city_seoul": "Seoul",
      "city_shanghai": "Shanghai",
      "city_jakarta": "Jakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montreal",
      "city_mexico-city": "Kota Meksiko",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "it": {
      "play": "Gioca",
      "modes": "Modalità",
      "daily": "Sfida del giorno",
      "gift": "Regalo",
      "wardrobe": "Guardaroba",
      "salon": "La mia barberia",
      "styles": "Stili",
      "regulars": "Clienti fissi",
      "orders": "Richieste",
      "freestyle": "Libero",
      "rescue": "Salvataggio",
      "beards": "Barbe",
      "rush": "Contro il tempo",
      "event": "Evento",
      "new": "Nuovo",
      "map": "Mappa",
      "tour": "Tour",
      "home": "Home",
      "choose_city": "Scegli una città",
      "no_customers": "Ancora nessun cliente",
      "sound": "Audio",
      "free": "Gratis",
      "coins": "Monete",
      "clippers": "Macchinette",
      "gowns": "Mantelle",
      "pick_city": "Scegli la città",
      "next_city": "Prossima città",
      "m_requests": "Taglia come chiedono",
      "m_fix": "Ripara un taglio sbagliato",
      "m_beard": "Modella la barba",
      "m_rush": "Corri contro il tempo",
      "task_fade": "Fai {n} sfumature",
      "task_fade#one": "Fai {n} sfumatura",
      "task_beard": "Regola {n} barbe",
      "task_beard#one": "Regola {n} barba",
      "task_regular": "Servi un cliente fisso",
      "task_star3": "{n} tagli a 3 stelle",
      "task_star3#one": "{n} taglio a 3 stelle",
      "task_customers": "Servi {n} clienti",
      "task_customers#one": "Servi {n} cliente",
      "task_tips": "Guadagna {n} di mance",
      "career": "Carriera",
      "quick_play": "Partita rapida",
      "settings": "Impostazioni",
      "shop_name": "Nome della barberia",
      "hand": "Mano",
      "left": "Sinistra",
      "right": "Destra",
      "privacy": "Privacy",
      "ad_choices": "Preferenze annunci",
      "full": "Completo",
      "language": "Lingua",
      "shops": "Barberie",
      "parts": "Pezzi",
      "wall": "Parete",
      "lower": "Pannelli",
      "floor": "Pavimento",
      "mat": "Tappeto",
      "mirror": "Specchio",
      "lights": "Luci",
      "shelf": "Mensola",
      "chair": "Poltrona",
      "decor": "Decori",
      "name": "Nome",
      "open": "Aperto",
      "est": "Dal {y}",
      "classic": "Classica",
      "c_london": "Londra",
      "c_tokyo": "Tokyo",
      "c_lagos": "Lagos",
      "c_istanbul": "Istanbul",
      "c_mexico": "Messico",
      "c_mumbai": "Mumbai",
      "shopname": "Barberia",
      "a_back": "Indietro",
      "a_close": "Chiudi",
      "a_menu": "Menu",
      "a_modes": "Modalità",
      "a_newcust": "Nuovo cliente",
      "a_goals": "Obiettivi",
      "a_dblday": "Guarda un video per raddoppiare il premio di oggi",
      "a_chest": "Apri lo scrigno settimanale",
      "a_wear": "Usa",
      "a_onemore": "Guarda un video per averne un altro",
      "a_collect": "Riscuoti",
      "a_undo": "Guarda un video per annullare l’ultima passata",
      "a_triple": "Guarda un video per triplicare le mance",
      "a_coins": "Monete",
      "a_shop": "Negozio",
      "a_salon": "La mia barberia",
      "a_gift": "Regalo",
      "a_take": "Prendi",
      "a_dblit": "Guarda un video per raddoppiarlo",
      "a_wardrobe": "Guardaroba",
      "a_clippers": "Macchinette",
      "a_robes": "Mantelle",
      "a_detail": "Livello di dettaglio",
      "a_next": "Successivo",
      "a_prev": "Precedente",
      "a_timeleft": "Tempo rimasto oggi",
      "a_mute": "Disattiva l’audio del gioco",
      "a_unmute": "Attiva l’audio del gioco",
      "arc_clipper": "Rialzo della macchinetta: tocca o scorri, l’1 è il più corto",
      "a_clipon": "Macchinetta accesa: trascina sui capelli per tagliare",
      "a_clipoff": "Macchinetta spenta: trascina per girare il cliente",
      "a_finish": "Termina il taglio",
      "a_nextcust": "Prossimo cliente",
      "a_showing": "Ecco il taglio finito",
      "a_savefail": "Salvataggio non riuscito. Riproveremo alla prossima azione",
      "a_guard": "Rialzo {g}, {mm} millimetri",
      "mm": "mm",
      "a_view": "Vista del taglio del cliente",
      "a_turn": "Trascina per girare il cliente",
      "shop": "Negozio",
      "collection": "Collezione",
      "a_wish": "Risparmia per questo",
      "a_bill": "Mancano {n} clienti alla bolletta da {c} monete",
      "a_bill#one": "Manca {n} cliente alla bolletta da {c} monete",
      "make_base": "Fai da base",
      "update_needed": "Aggiorna il gioco per continuare la tua Carriera",
      "buy": "Acquista",
      "a_wishvid": "Guarda un video per avere monete per la tua lista dei desideri",
      "a_share": "Condividi il taglio",
      "a_wearing": "In uso",
      "a_wearthis": "Usa questo modello",
      "tut_clipper": "Tocca la macchinetta per accenderla",
      "tut_guard": "Tocca o scorri l’arco per cambiare rialzo",
      "tut_cut": "Trascina sui capelli per tagliare",
      "boot_new_title": "Serve una versione più recente del gioco",
      "boot_new_msg": "I tuoi progressi sono al sicuro. Aggiorna all’ultima versione.",
      "boot_fail_title": "Impossibile caricare il gioco",
      "boot_fail_msg": "I tuoi progressi salvati sono al sicuro. Controlla la connessione e riprova.",
      "retry": "Riprova",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Il Cairo",
      "city_casablanca": "Casablanca",
      "city_london": "Londra",
      "city_paris": "Parigi",
      "city_berlin": "Berlino",
      "city_madrid": "Madrid",
      "city_warsaw": "Varsavia",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Riad",
      "city_dubai": "Dubai",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karachi",
      "city_dhaka": "Dacca",
      "city_colombo": "Colombo",
      "city_tokyo": "Tokyo",
      "city_seoul": "Seul",
      "city_shanghai": "Shanghai",
      "city_jakarta": "Giacarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montréal",
      "city_mexico-city": "Città del Messico",
      "city_sao-paulo": "San Paolo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "ja": {
      "play": "プレイ",
      "modes": "モード",
      "daily": "デイリー",
      "gift": "ギフト",
      "wardrobe": "装備",
      "salon": "サロン",
      "styles": "スタイル",
      "regulars": "常連さん",
      "orders": "オーダー",
      "freestyle": "フリースタイル",
      "rescue": "お直し",
      "beards": "ヒゲ",
      "rush": "ラッシュ",
      "event": "イベント",
      "new": "NEW",
      "map": "マップ",
      "tour": "ツアー",
      "home": "ホーム",
      "choose_city": "街を選ぼう",
      "no_customers": "まだお客さんがいません",
      "sound": "サウンド",
      "free": "無料",
      "coins": "コイン",
      "clippers": "バリカン",
      "gowns": "ケープ",
      "pick_city": "街を選ぼう",
      "next_city": "次の街",
      "m_requests": "オーダー通りにカット",
      "m_fix": "失敗カットをお直し",
      "m_beard": "ヒゲを整えよう",
      "m_rush": "時間内に仕上げよう",
      "task_fade": "フェードを{n}回",
      "task_beard": "ヒゲを{n}回整える",
      "task_regular": "常連さんをカット",
      "task_star3": "星3つのカットを{n}回",
      "task_customers": "お客さん{n}人",
      "task_tips": "チップを{n}獲得",
      "career": "キャリア",
      "quick_play": "クイックプレイ",
      "settings": "設定",
      "shop_name": "サロン名",
      "hand": "利き手",
      "left": "左",
      "right": "右",
      "privacy": "プライバシーポリシー",
      "ad_choices": "広告設定",
      "full": "最高",
      "language": "言語",
      "shops": "内装",
      "parts": "パーツ",
      "wall": "壁",
      "lower": "腰壁",
      "floor": "床",
      "mat": "マット",
      "mirror": "鏡",
      "lights": "照明",
      "shelf": "棚",
      "chair": "椅子",
      "decor": "飾り",
      "name": "看板",
      "open": "営業中",
      "est": "{y}年創業",
      "classic": "クラシック",
      "c_london": "ロンドン",
      "c_tokyo": "東京",
      "c_lagos": "ラゴス",
      "c_istanbul": "イスタンブール",
      "c_mexico": "メキシコ",
      "c_mumbai": "ムンバイ",
      "shopname": "理容室",
      "a_back": "戻る",
      "a_close": "閉じる",
      "a_menu": "メニュー",
      "a_modes": "モード",
      "a_newcust": "新しいお客さん",
      "a_goals": "目標",
      "a_dblday": "動画を見て今日の報酬を2倍にする",
      "a_chest": "週間宝箱を開ける",
      "a_wear": "装備する",
      "a_onemore": "動画を見てもう1つもらう",
      "a_collect": "受け取る",
      "a_undo": "動画を見て最後のひと刈りを元に戻す",
      "a_triple": "動画を見てチップを3倍にする",
      "a_coins": "コイン",
      "a_shop": "ショップ",
      "a_salon": "サロン",
      "a_gift": "ギフト",
      "a_take": "受け取る",
      "a_dblit": "動画を見て2倍にする",
      "a_wardrobe": "装備",
      "a_clippers": "バリカン",
      "a_robes": "ケープ",
      "a_detail": "画質",
      "a_next": "次へ",
      "a_prev": "前へ",
      "a_timeleft": "本日の残り時間",
      "a_mute": "ゲーム音をミュート",
      "a_unmute": "ゲーム音のミュートを解除",
      "arc_clipper": "バリカンのアタッチメント：タップかスライドで変更、1が最も短い",
      "a_clipon": "バリカンON：髪の上をドラッグしてカット",
      "a_clipoff": "バリカンOFF：ドラッグでお客さんを回す",
      "a_finish": "カットを仕上げる",
      "a_nextcust": "次のお客さん",
      "a_showing": "仕上がりを表示中",
      "a_savefail": "保存できませんでした。次の操作で自動的に再試行します",
      "a_guard": "アタッチメント{g}、{mm}ミリメートル",
      "mm": "mm",
      "a_view": "お客さんのヘアスタイル",
      "a_turn": "ドラッグでお客さんを回す",
      "shop": "ショップ",
      "collection": "コレクション",
      "a_wish": "これを目指してコインを貯める",
      "a_bill": "{c}コインの支払いまで、あとお客さん{n}人",
      "make_base": "ベースにする",
      "update_needed": "キャリアを続けるにはゲームをアップデートしてください",
      "buy": "購入",
      "a_wishvid": "動画を見て、ほしい物のためのコインをもらう",
      "a_share": "ヘアスタイルをシェア",
      "a_wearing": "装備中",
      "a_wearthis": "これを装備",
      "tut_clipper": "バリカンをタップしてスイッチON",
      "tut_guard": "アーチをタップかスライドしてアタッチメントを変更",
      "tut_cut": "髪の上をドラッグしてカット",
      "boot_new_title": "アップデートが必要です",
      "boot_new_msg": "セーブデータは無事です。最新バージョンにアップデートしてください。",
      "boot_fail_title": "ゲームを読み込めませんでした",
      "boot_fail_msg": "セーブデータは残っています。通信環境を確認して、もう一度お試しください。",
      "retry": "再試行",
      "city_lagos": "ラゴス",
      "city_kinshasa": "キンシャサ",
      "city_nairobi": "ナイロビ",
      "city_johannesburg": "ヨハネスブルグ",
      "city_cairo": "カイロ",
      "city_casablanca": "カサブランカ",
      "city_london": "ロンドン",
      "city_paris": "パリ",
      "city_berlin": "ベルリン",
      "city_madrid": "マドリード",
      "city_warsaw": "ワルシャワ",
      "city_istanbul": "イスタンブール",
      "city_riyadh": "リヤド",
      "city_dubai": "ドバイ",
      "city_amman": "アンマン",
      "city_delhi": "デリー",
      "city_mumbai": "ムンバイ",
      "city_karachi": "カラチ",
      "city_dhaka": "ダッカ",
      "city_colombo": "コロンボ",
      "city_tokyo": "東京",
      "city_seoul": "ソウル",
      "city_shanghai": "上海",
      "city_jakarta": "ジャカルタ",
      "city_manila": "マニラ",
      "city_bangkok": "バンコク",
      "city_new-york": "ニューヨーク",
      "city_los-angeles": "ロサンゼルス",
      "city_toronto": "トロント",
      "city_montreal": "モントリオール",
      "city_mexico-city": "メキシコシティ",
      "city_sao-paulo": "サンパウロ",
      "city_buenos-aires": "ブエノスアイレス",
      "city_kingston": "キングストン",
      "city_sydney": "シドニー",
      "city_auckland": "オークランド"
    },
    "ko": {
      "play": "플레이",
      "modes": "모드",
      "daily": "일일 도전",
      "gift": "선물",
      "wardrobe": "꾸미기",
      "salon": "바버샵",
      "styles": "스타일",
      "regulars": "단골손님",
      "orders": "주문",
      "freestyle": "자유",
      "rescue": "머리 살리기",
      "beards": "수염",
      "rush": "러시",
      "event": "이벤트",
      "new": "NEW",
      "map": "지도",
      "tour": "투어",
      "home": "홈",
      "choose_city": "도시를 선택하세요",
      "no_customers": "아직 손님이 없어요",
      "sound": "사운드",
      "free": "무료",
      "coins": "코인",
      "clippers": "바리캉",
      "gowns": "가운",
      "pick_city": "도시를 고르세요",
      "next_city": "다음 도시",
      "m_requests": "주문대로 자르기",
      "m_fix": "망친 머리 고치기",
      "m_beard": "수염 다듬기",
      "m_rush": "시간 안에 끝내기",
      "task_fade": "페이드 {n}회",
      "task_beard": "수염 {n}회 다듬기",
      "task_regular": "단골손님 커트",
      "task_star3": "별 3개 커트 {n}회",
      "task_customers": "손님 {n}명",
      "task_tips": "팁 {n} 벌기",
      "career": "커리어",
      "quick_play": "빠른 플레이",
      "settings": "설정",
      "shop_name": "바버샵 이름",
      "hand": "주로 쓰는 손",
      "left": "왼손",
      "right": "오른손",
      "privacy": "개인정보처리방침",
      "ad_choices": "광고 설정",
      "full": "최고",
      "language": "언어",
      "shops": "테마",
      "parts": "파츠",
      "wall": "벽",
      "lower": "벽 패널",
      "floor": "바닥",
      "mat": "매트",
      "mirror": "거울",
      "lights": "조명",
      "shelf": "선반",
      "chair": "의자",
      "decor": "장식",
      "name": "간판",
      "open": "영업 중",
      "est": "{y}년 개업",
      "classic": "클래식",
      "c_london": "런던",
      "c_tokyo": "도쿄",
      "c_lagos": "라고스",
      "c_istanbul": "이스탄불",
      "c_mexico": "멕시코",
      "c_mumbai": "뭄바이",
      "shopname": "바버샵",
      "a_back": "뒤로",
      "a_close": "닫기",
      "a_menu": "메뉴",
      "a_modes": "모드",
      "a_newcust": "새 손님",
      "a_goals": "목표",
      "a_dblday": "영상을 보고 오늘 보상 2배 받기",
      "a_chest": "주간 상자 열기",
      "a_wear": "착용하기",
      "a_onemore": "영상을 보고 하나 더 받기",
      "a_collect": "받기",
      "a_undo": "영상을 보고 마지막 커트 되돌리기",
      "a_triple": "영상을 보고 팁 3배 받기",
      "a_coins": "코인",
      "a_shop": "상점",
      "a_salon": "바버샵",
      "a_gift": "선물",
      "a_take": "받기",
      "a_dblit": "영상을 보고 2배로 받기",
      "a_wardrobe": "꾸미기",
      "a_clippers": "바리캉",
      "a_robes": "가운",
      "a_detail": "그래픽 품질",
      "a_next": "다음",
      "a_prev": "이전",
      "a_timeleft": "오늘 남은 시간",
      "a_mute": "게임 소리 끄기",
      "a_unmute": "게임 소리 켜기",
      "arc_clipper": "바리캉 가드: 탭하거나 밀어서 변경, 1이 가장 짧아요",
      "a_clipon": "바리캉 켜짐: 머리카락 위를 드래그해서 자르기",
      "a_clipoff": "바리캉 꺼짐: 드래그해서 손님 돌리기",
      "a_finish": "커트 완료",
      "a_nextcust": "다음 손님",
      "a_showing": "완성된 헤어스타일 보는 중",
      "a_savefail": "저장하지 못했어요. 다음 동작 때 자동으로 다시 시도해요",
      "a_guard": "가드 {g}, {mm}밀리미터",
      "mm": "mm",
      "a_view": "손님 헤어스타일 화면",
      "a_turn": "드래그해서 손님 돌리기",
      "shop": "상점",
      "collection": "컬렉션",
      "a_wish": "이 아이템을 목표로 코인 모으기",
      "a_bill": "{c}코인 청구서까지 손님 {n}명 남음",
      "make_base": "기본으로",
      "update_needed": "커리어를 계속하려면 게임을 업데이트하세요",
      "buy": "구매",
      "a_wishvid": "영상을 보고 위시리스트용 코인 받기",
      "a_share": "헤어스타일 공유",
      "a_wearing": "착용 중",
      "a_wearthis": "이것 착용하기",
      "tut_clipper": "바리캉을 탭해서 켜세요",
      "tut_guard": "아치를 탭하거나 밀어서 가드를 바꾸세요",
      "tut_cut": "머리카락 위를 드래그해서 자르세요",
      "boot_new_title": "업데이트가 필요해요",
      "boot_new_msg": "진행 상황은 안전해요. 최신 버전으로 업데이트하세요.",
      "boot_fail_title": "게임을 불러오지 못했어요",
      "boot_fail_msg": "저장된 진행 상황은 그대로예요. 인터넷 연결을 확인하고 다시 시도하세요.",
      "retry": "다시 시도",
      "city_lagos": "라고스",
      "city_kinshasa": "킨샤사",
      "city_nairobi": "나이로비",
      "city_johannesburg": "요하네스버그",
      "city_cairo": "카이로",
      "city_casablanca": "카사블랑카",
      "city_london": "런던",
      "city_paris": "파리",
      "city_berlin": "베를린",
      "city_madrid": "마드리드",
      "city_warsaw": "바르샤바",
      "city_istanbul": "이스탄불",
      "city_riyadh": "리야드",
      "city_dubai": "두바이",
      "city_amman": "암만",
      "city_delhi": "델리",
      "city_mumbai": "뭄바이",
      "city_karachi": "카라치",
      "city_dhaka": "다카",
      "city_colombo": "콜롬보",
      "city_tokyo": "도쿄",
      "city_seoul": "서울",
      "city_shanghai": "상하이",
      "city_jakarta": "자카르타",
      "city_manila": "마닐라",
      "city_bangkok": "방콕",
      "city_new-york": "뉴욕",
      "city_los-angeles": "로스앤젤레스",
      "city_toronto": "토론토",
      "city_montreal": "몬트리올",
      "city_mexico-city": "멕시코시티",
      "city_sao-paulo": "상파울루",
      "city_buenos-aires": "부에노스아이레스",
      "city_kingston": "킹스턴",
      "city_sydney": "시드니",
      "city_auckland": "오클랜드"
    },
    "ms": {
      "play": "Main",
      "modes": "Mod",
      "daily": "Harian",
      "gift": "Hadiah",
      "wardrobe": "Almari",
      "salon": "Kedai gunting",
      "styles": "Gaya rambut",
      "regulars": "Pelanggan tetap",
      "orders": "Pesanan",
      "freestyle": "Bebas",
      "rescue": "Selamatkan",
      "beards": "Janggut",
      "rush": "Kejar masa",
      "event": "Acara",
      "new": "Baru",
      "map": "Peta",
      "tour": "Jelajah",
      "home": "Utama",
      "choose_city": "Pilih bandar",
      "no_customers": "Belum ada pelanggan",
      "sound": "Bunyi",
      "free": "Percuma",
      "coins": "Syiling",
      "clippers": "Pemangkas",
      "gowns": "Apron",
      "pick_city": "Pilih bandar anda",
      "next_city": "Bandar seterusnya",
      "m_requests": "Gunting ikut permintaan",
      "m_fix": "Baiki potongan yang teruk",
      "m_beard": "Bentukkan janggut",
      "m_rush": "Lawan masa",
      "task_fade": "{n} potongan fade",
      "task_beard": "Rapikan {n} janggut",
      "task_regular": "Layan pelanggan tetap",
      "task_star3": "{n} potongan 3 bintang",
      "task_customers": "Layan {n} pelanggan",
      "task_tips": "Kumpul {n} syiling tip",
      "career": "Kerjaya",
      "quick_play": "Main Pantas",
      "settings": "Tetapan",
      "shop_name": "Nama kedai",
      "hand": "Tangan",
      "left": "Kiri",
      "right": "Kanan",
      "privacy": "Privasi",
      "ad_choices": "Pilihan iklan",
      "full": "Maksimum",
      "language": "Bahasa",
      "shops": "Gaya kedai",
      "parts": "Bahagian",
      "wall": "Dinding",
      "lower": "Panel",
      "floor": "Lantai",
      "mat": "Permaidani",
      "mirror": "Cermin",
      "lights": "Lampu",
      "shelf": "Rak",
      "chair": "Kerusi",
      "decor": "Hiasan",
      "name": "Nama",
      "open": "Buka",
      "est": "Sejak {y}",
      "classic": "Klasik",
      "c_london": "London",
      "c_tokyo": "Tokyo",
      "c_lagos": "Lagos",
      "c_istanbul": "Istanbul",
      "c_mexico": "Mexico",
      "c_mumbai": "Mumbai",
      "shopname": "Kedai Gunting",
      "a_back": "Kembali",
      "a_close": "Tutup",
      "a_menu": "Menu",
      "a_modes": "Mod",
      "a_newcust": "Pelanggan baru",
      "a_goals": "Misi",
      "a_dblday": "Tonton video untuk gandakan ganjaran hari ini",
      "a_chest": "Buka peti mingguan",
      "a_wear": "Pakai",
      "a_onemore": "Tonton video untuk satu lagi",
      "a_collect": "Tuntut",
      "a_undo": "Tonton video untuk buat asal potongan terakhir",
      "a_triple": "Tonton video untuk tip 3x ganda",
      "a_coins": "Syiling",
      "a_shop": "Kedai",
      "a_salon": "Kedai gunting",
      "a_gift": "Hadiah",
      "a_take": "Ambil",
      "a_dblit": "Tonton video untuk gandakan",
      "a_wardrobe": "Almari",
      "a_clippers": "Pemangkas",
      "a_robes": "Apron",
      "a_detail": "Tahap perincian",
      "a_next": "Seterusnya",
      "a_prev": "Sebelumnya",
      "a_timeleft": "Baki masa hari ini",
      "a_mute": "Senyapkan bunyi permainan",
      "a_unmute": "Hidupkan bunyi permainan",
      "arc_clipper": "Sikat pemangkas: ketik atau leret, 1 paling pendek",
      "a_clipon": "Pemangkas hidup: seret pada rambut untuk gunting",
      "a_clipoff": "Pemangkas mati: seret untuk pusingkan pelanggan",
      "a_finish": "Siapkan potongan",
      "a_nextcust": "Pelanggan seterusnya",
      "a_showing": "Menunjukkan potongan yang siap",
      "a_savefail": "Gagal disimpan. Akan dicuba semula pada tindakan seterusnya",
      "a_guard": "Sikat {g}, {mm} milimeter",
      "mm": "mm",
      "a_view": "Paparan potongan pelanggan",
      "a_turn": "Seret untuk pusingkan pelanggan",
      "shop": "Kedai",
      "collection": "Koleksi",
      "a_wish": "Kumpul untuk ini",
      "a_bill": "{n} pelanggan lagi ke bil {c} syiling",
      "make_base": "Jadikan asas",
      "update_needed": "Kemas kini permainan untuk teruskan Kerjaya",
      "buy": "Beli",
      "a_wishvid": "Tonton video untuk syiling bagi barang idaman",
      "a_share": "Kongsi potongan",
      "a_wearing": "Sedang dipakai",
      "a_wearthis": "Pakai ini",
      "tut_clipper": "Ketik pemangkas untuk hidupkannya",
      "tut_guard": "Ketik atau leret lengkung untuk tukar sikat",
      "tut_cut": "Seret pada rambut untuk gunting",
      "boot_new_title": "Kemas kini diperlukan",
      "boot_new_msg": "Kemajuan anda selamat. Kemas kini ke versi terbaharu.",
      "boot_fail_title": "Permainan gagal dimuatkan",
      "boot_fail_msg": "Kemajuan anda tetap disimpan. Semak sambungan dan cuba semula.",
      "retry": "Cuba semula",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Kaherah",
      "city_casablanca": "Casablanca",
      "city_london": "London",
      "city_paris": "Paris",
      "city_berlin": "Berlin",
      "city_madrid": "Madrid",
      "city_warsaw": "Warsaw",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Riyadh",
      "city_dubai": "Dubai",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karachi",
      "city_dhaka": "Dhaka",
      "city_colombo": "Colombo",
      "city_tokyo": "Tokyo",
      "city_seoul": "Seoul",
      "city_shanghai": "Shanghai",
      "city_jakarta": "Jakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montreal",
      "city_mexico-city": "Bandar Mexico",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "nb": {
      "play": "Spill",
      "modes": "Moduser",
      "daily": "Daglig oppgave",
      "gift": "Gave",
      "wardrobe": "Garderobe",
      "salon": "Salong",
      "styles": "Frisyrer",
      "regulars": "Faste kunder",
      "orders": "Bestillinger",
      "freestyle": "Fritt spill",
      "rescue": "Redning",
      "beards": "Skjegg",
      "rush": "Rushtid",
      "event": "Event",
      "new": "Ny",
      "map": "Kart",
      "tour": "Turné",
      "home": "Start",
      "choose_city": "Velg en by",
      "no_customers": "Ingen kunder ennå",
      "sound": "Lyd",
      "free": "Gratis",
      "coins": "Mynter",
      "clippers": "Maskiner",
      "gowns": "Kapper",
      "pick_city": "Velg din by",
      "next_city": "Neste by",
      "m_requests": "Klipp det de ønsker",
      "m_fix": "Redd en mislykket klipp",
      "m_beard": "Form skjegget",
      "m_rush": "Kappløp mot klokka",
      "task_fade": "Klipp {n} fades",
      "task_fade#one": "Klipp {n} fade",
      "task_beard": "Trim {n} skjegg",
      "task_beard#one": "Trim {n} skjegg",
      "task_regular": "Klipp en fast kunde",
      "task_star3": "Få 3 stjerner {n} ganger",
      "task_star3#one": "Få 3 stjerner {n} gang",
      "task_customers": "Klipp {n} kunder",
      "task_customers#one": "Klipp {n} kunde",
      "task_tips": "Tjen {n} mynter i tips",
      "task_tips#one": "Tjen {n} mynt i tips",
      "career": "Karriere",
      "quick_play": "Hurtigspill",
      "settings": "Innstillinger",
      "shop_name": "Salongnavn",
      "hand": "Hånd",
      "left": "Venstre",
      "right": "Høyre",
      "privacy": "Personvern",
      "ad_choices": "Annonsevalg",
      "full": "Maks",
      "language": "Språk",
      "shops": "Salonger",
      "parts": "Deler",
      "wall": "Vegg",
      "lower": "Paneler",
      "floor": "Gulv",
      "mat": "Teppe",
      "mirror": "Speil",
      "lights": "Lamper",
      "shelf": "Hylle",
      "chair": "Stol",
      "decor": "Pynt",
      "name": "Navn",
      "open": "Åpent",
      "est": "Siden {y}",
      "classic": "Klassisk",
      "c_london": "London",
      "c_tokyo": "Tokyo",
      "c_lagos": "Lagos",
      "c_istanbul": "Istanbul",
      "c_mexico": "Mexico",
      "c_mumbai": "Mumbai",
      "shopname": "Barbershop",
      "a_back": "Tilbake",
      "a_close": "Lukk",
      "a_menu": "Meny",
      "a_modes": "Moduser",
      "a_newcust": "Ny kunde",
      "a_goals": "Mål",
      "a_dblday": "Se en video og doble dagens belønning",
      "a_chest": "Åpne ukens kiste",
      "a_wear": "Bruk",
      "a_onemore": "Se en video og få én til",
      "a_collect": "Hent",
      "a_undo": "Se en video og angre det siste klippet",
      "a_triple": "Se en video og tredoble tipsen",
      "a_coins": "Mynter",
      "a_shop": "Butikk",
      "a_salon": "Salong",
      "a_gift": "Gave",
      "a_take": "Ta den",
      "a_dblit": "Se en video og doble den",
      "a_wardrobe": "Garderobe",
      "a_clippers": "Maskiner",
      "a_robes": "Kapper",
      "a_detail": "Detaljnivå",
      "a_next": "Neste",
      "a_prev": "Forrige",
      "a_timeleft": "Tid igjen i dag",
      "a_mute": "Slå av spillyd",
      "a_unmute": "Slå på spillyd",
      "arc_clipper": "Avstandskam: trykk eller skyv, 1 er kortest",
      "a_clipon": "Maskin på: dra over håret for å klippe",
      "a_clipoff": "Maskin av: dra for å snu kunden",
      "a_finish": "Fullfør klippen",
      "a_nextcust": "Neste kunde",
      "a_showing": "Viser den ferdige klippen",
      "a_savefail": "Lagring mislyktes. Vi prøver igjen ved neste handling",
      "a_guard": "Kam {g}, {mm} millimeter",
      "mm": "mm",
      "a_view": "Visning av kundens frisyre",
      "a_turn": "Dra for å snu kunden",
      "shop": "Butikk",
      "collection": "Samling",
      "a_wish": "Spar til denne",
      "a_bill": "{n} kunder til regningen på {c} mynter",
      "a_bill#one": "{n} kunde til regningen på {c} mynter",
      "make_base": "Som base",
      "update_needed": "Oppdater spillet for å fortsette karrieren din",
      "buy": "Kjøp",
      "a_wishvid": "Se en video og få mynter til ønskelisten",
      "a_share": "Del klippen",
      "a_wearing": "I bruk",
      "a_wearthis": "Bruk denne",
      "tut_clipper": "Trykk på maskinen for å slå den på",
      "tut_guard": "Trykk eller skyv buen for å bytte kam",
      "tut_cut": "Dra over håret for å klippe",
      "boot_new_title": "Ny versjon kreves",
      "boot_new_msg": "Fremgangen din er trygg. Oppdater til nyeste versjon.",
      "boot_fail_title": "Spillet kunne ikke lastes",
      "boot_fail_msg": "Fremgangen din er lagret. Sjekk tilkoblingen og prøv igjen.",
      "retry": "Prøv igjen",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Kairo",
      "city_casablanca": "Casablanca",
      "city_london": "London",
      "city_paris": "Paris",
      "city_berlin": "Berlin",
      "city_madrid": "Madrid",
      "city_warsaw": "Warszawa",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Riyadh",
      "city_dubai": "Dubai",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karachi",
      "city_dhaka": "Dhaka",
      "city_colombo": "Colombo",
      "city_tokyo": "Tokyo",
      "city_seoul": "Seoul",
      "city_shanghai": "Shanghai",
      "city_jakarta": "Jakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montréal",
      "city_mexico-city": "Mexico by",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "pl": {
      "play": "Graj",
      "modes": "Tryby",
      "daily": "Wyzwanie dnia",
      "gift": "Prezent",
      "wardrobe": "Garderoba",
      "salon": "Salon",
      "styles": "Fryzury",
      "regulars": "Stali klienci",
      "orders": "Zamówienia",
      "freestyle": "Wolny styl",
      "rescue": "Ratunek",
      "beards": "Brody",
      "rush": "Na czas",
      "event": "Wydarzenie",
      "new": "Nowość",
      "map": "Mapa",
      "tour": "Trasa",
      "home": "Menu główne",
      "choose_city": "Wybierz miasto",
      "no_customers": "Nie masz jeszcze klientów",
      "sound": "Dźwięk",
      "free": "Za darmo",
      "coins": "Monety",
      "clippers": "Maszynki",
      "gowns": "Peleryny",
      "pick_city": "Wybierz miasto",
      "next_city": "Następne miasto",
      "m_requests": "Strzyż na życzenie",
      "m_fix": "Popraw nieudaną fryzurę",
      "m_beard": "Wymodeluj brodę",
      "m_rush": "Wygraj z czasem",
      "task_fade#one": "Zrób {n} fryzurę fade",
      "task_fade#few": "Zrób {n} fryzury fade",
      "task_fade#many": "Zrób {n} fryzur fade",
      "task_fade": "Zrób {n} fryzur fade",
      "task_beard#one": "Przytnij {n} brodę",
      "task_beard#few": "Przytnij {n} brody",
      "task_beard#many": "Przytnij {n} bród",
      "task_beard": "Przytnij {n} bród",
      "task_regular": "Ostrzyż stałego klienta",
      "task_star3#one": "{n} fryzura na 3 gwiazdki",
      "task_star3#few": "{n} fryzury na 3 gwiazdki",
      "task_star3#many": "{n} fryzur na 3 gwiazdki",
      "task_star3": "{n} fryzur na 3 gwiazdki",
      "task_customers#one": "Obsłuż {n} klienta",
      "task_customers#few": "Obsłuż {n} klientów",
      "task_customers#many": "Obsłuż {n} klientów",
      "task_customers": "Obsłuż {n} klientów",
      "task_tips": "Zarób {n} na napiwkach",
      "career": "Kariera",
      "quick_play": "Szybka gra",
      "settings": "Ustawienia",
      "shop_name": "Nazwa salonu",
      "hand": "Ręka",
      "left": "Lewa",
      "right": "Prawa",
      "privacy": "Prywatność",
      "ad_choices": "Ustawienia reklam",
      "full": "Pełna",
      "language": "Język",
      "shops": "Salony",
      "parts": "Elementy",
      "wall": "Ściana",
      "lower": "Panele",
      "floor": "Podłoga",
      "mat": "Dywanik",
      "mirror": "Lustro",
      "lights": "Lampy",
      "shelf": "Półka",
      "chair": "Fotel",
      "decor": "Dekoracje",
      "name": "Nazwa",
      "open": "Otwarte",
      "est": "Od {y}",
      "classic": "Klasyka",
      "c_london": "Londyn",
      "c_tokyo": "Tokio",
      "c_lagos": "Lagos",
      "c_istanbul": "Stambuł",
      "c_mexico": "Meksyk",
      "c_mumbai": "Mumbaj",
      "shopname": "Barber Shop",
      "a_back": "Wstecz",
      "a_close": "Zamknij",
      "a_menu": "Menu",
      "a_modes": "Tryby",
      "a_newcust": "Nowy klient",
      "a_goals": "Cele",
      "a_dblday": "Obejrzyj film i podwój dzisiejszą nagrodę",
      "a_chest": "Otwórz skrzynię tygodnia",
      "a_wear": "Użyj",
      "a_onemore": "Obejrzyj film i zgarnij jeszcze jeden",
      "a_collect": "Odbierz",
      "a_undo": "Obejrzyj film i cofnij ostatnie cięcie",
      "a_triple": "Obejrzyj film i potrój napiwki",
      "a_coins": "Monety",
      "a_shop": "Sklep",
      "a_salon": "Salon",
      "a_gift": "Prezent",
      "a_take": "Weź",
      "a_dblit": "Obejrzyj film i podwój nagrodę",
      "a_wardrobe": "Garderoba",
      "a_clippers": "Maszynki",
      "a_robes": "Peleryny",
      "a_detail": "Poziom szczegółów",
      "a_next": "Dalej",
      "a_prev": "Wstecz",
      "a_timeleft": "Czas do końca dnia",
      "a_mute": "Wycisz dźwięk gry",
      "a_unmute": "Włącz dźwięk gry",
      "arc_clipper": "Nasadka maszynki: dotknij lub przesuń, 1 to najkrótsza",
      "a_clipon": "Maszynka włączona: przeciągnij po włosach, by strzyc",
      "a_clipoff": "Maszynka wyłączona: przeciągnij, by obrócić klienta",
      "a_finish": "Zakończ strzyżenie",
      "a_nextcust": "Następny klient",
      "a_showing": "Pokaz gotowej fryzury",
      "a_savefail": "Nie udało się zapisać. Spróbujemy ponownie przy następnej akcji",
      "a_guard": "Nasadka {g}, {mm} mm",
      "mm": "mm",
      "a_view": "Widok fryzury klienta",
      "a_turn": "Przeciągnij, by obrócić klienta",
      "shop": "Sklep",
      "collection": "Kolekcja",
      "a_wish": "Zbieraj na to",
      "a_bill#one": "Jeszcze {n} klient do rachunku na {c}",
      "a_bill#few": "Jeszcze {n} klientów do rachunku na {c}",
      "a_bill#many": "Jeszcze {n} klientów do rachunku na {c}",
      "a_bill": "Jeszcze {n} klientów do rachunku na {c}",
      "make_base": "Ustaw bazę",
      "update_needed": "Zaktualizuj grę, by kontynuować karierę",
      "buy": "Kup",
      "a_wishvid": "Obejrzyj film i zdobądź monety na wymarzoną rzecz",
      "a_share": "Udostępnij fryzurę",
      "a_wearing": "W użyciu",
      "a_wearthis": "Użyj tego",
      "tut_clipper": "Dotknij maszynki, by ją włączyć",
      "tut_guard": "Dotknij lub przesuń łuk, by zmienić nasadkę",
      "tut_cut": "Przeciągnij po włosach, by strzyc",
      "boot_new_title": "Potrzebna nowsza wersja gry",
      "boot_new_msg": "Twoje postępy są bezpieczne. Zaktualizuj grę do najnowszej wersji.",
      "boot_fail_title": "Nie udało się wczytać gry",
      "boot_fail_msg": "Twoje postępy są zachowane. Sprawdź połączenie i spróbuj ponownie.",
      "retry": "Ponów",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinszasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Kair",
      "city_casablanca": "Casablanca",
      "city_london": "Londyn",
      "city_paris": "Paryż",
      "city_berlin": "Berlin",
      "city_madrid": "Madryt",
      "city_warsaw": "Warszawa",
      "city_istanbul": "Stambuł",
      "city_riyadh": "Rijad",
      "city_dubai": "Dubaj",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbaj",
      "city_karachi": "Karaczi",
      "city_dhaka": "Dhaka",
      "city_colombo": "Kolombo",
      "city_tokyo": "Tokio",
      "city_seoul": "Seul",
      "city_shanghai": "Szanghaj",
      "city_jakarta": "Dżakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "Nowy Jork",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montreal",
      "city_mexico-city": "Meksyk",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "pt-BR": {
      "play": "Jogar",
      "modes": "Modos",
      "daily": "Desafio diário",
      "gift": "Presente",
      "wardrobe": "Guarda-roupa",
      "salon": "Minha barbearia",
      "styles": "Estilos",
      "regulars": "Clientes fiéis",
      "orders": "Pedidos",
      "freestyle": "Livre",
      "rescue": "Resgate",
      "beards": "Barbas",
      "rush": "Contra o tempo",
      "event": "Evento",
      "new": "Novo",
      "map": "Mapa",
      "tour": "Turnê",
      "home": "Início",
      "choose_city": "Escolha uma cidade",
      "no_customers": "Nenhum cliente ainda",
      "sound": "Som",
      "free": "Grátis",
      "coins": "Moedas",
      "clippers": "Máquinas",
      "gowns": "Capas",
      "pick_city": "Escolha sua cidade",
      "next_city": "Próxima cidade",
      "m_requests": "Corte o que pedirem",
      "m_fix": "Conserte um corte ruim",
      "m_beard": "Modele a barba",
      "m_rush": "Corra contra o relógio",
      "task_fade": "Faça {n} degradês",
      "task_fade#one": "Faça {n} degradê",
      "task_beard": "Apare {n} barbas",
      "task_beard#one": "Apare {n} barba",
      "task_regular": "Atenda um cliente fiel",
      "task_star3": "{n} cortes 3 estrelas",
      "task_star3#one": "{n} corte 3 estrelas",
      "task_customers": "Atenda {n} clientes",
      "task_customers#one": "Atenda {n} cliente",
      "task_tips": "Ganhe {n} em gorjetas",
      "career": "Carreira",
      "quick_play": "Partida rápida",
      "settings": "Configurações",
      "shop_name": "Nome da barbearia",
      "hand": "Mão",
      "left": "Esquerda",
      "right": "Direita",
      "privacy": "Privacidade",
      "ad_choices": "Opções de anúncios",
      "full": "Completo",
      "language": "Idioma",
      "shops": "Barbearias",
      "parts": "Peças",
      "wall": "Parede",
      "lower": "Painéis",
      "floor": "Piso",
      "mat": "Tapete",
      "mirror": "Espelho",
      "lights": "Luzes",
      "shelf": "Prateleira",
      "chair": "Cadeira",
      "decor": "Decoração",
      "name": "Nome",
      "open": "Aberto",
      "est": "Desde {y}",
      "classic": "Clássica",
      "c_london": "Londres",
      "c_tokyo": "Tóquio",
      "c_lagos": "Lagos",
      "c_istanbul": "Istambul",
      "c_mexico": "México",
      "c_mumbai": "Mumbai",
      "shopname": "Barbearia",
      "a_back": "Voltar",
      "a_close": "Fechar",
      "a_menu": "Menu",
      "a_modes": "Modos",
      "a_newcust": "Novo cliente",
      "a_goals": "Metas",
      "a_dblday": "Assista a um vídeo e dobre a recompensa de hoje",
      "a_chest": "Abrir o baú semanal",
      "a_wear": "Usar",
      "a_onemore": "Assista a um vídeo e ganhe mais um",
      "a_collect": "Coletar",
      "a_undo": "Assista a um vídeo para desfazer a última passada",
      "a_triple": "Assista a um vídeo e triplique as gorjetas",
      "a_coins": "Moedas",
      "a_shop": "Loja",
      "a_salon": "Minha barbearia",
      "a_gift": "Presente",
      "a_take": "Pegar",
      "a_dblit": "Assista a um vídeo e dobre",
      "a_wardrobe": "Guarda-roupa",
      "a_clippers": "Máquinas",
      "a_robes": "Capas",
      "a_detail": "Nível de detalhe",
      "a_next": "Próximo",
      "a_prev": "Anterior",
      "a_timeleft": "Tempo restante hoje",
      "a_mute": "Silenciar o jogo",
      "a_unmute": "Ativar o som do jogo",
      "arc_clipper": "Pente da máquina: toque ou deslize; o 1 é o mais curto",
      "a_clipon": "Máquina ligada: arraste no cabelo para cortar",
      "a_clipoff": "Máquina desligada: arraste para girar o cliente",
      "a_finish": "Finalizar o corte",
      "a_nextcust": "Próximo cliente",
      "a_showing": "Mostrando o corte pronto",
      "a_savefail": "Falha ao salvar. Vamos tentar de novo na próxima ação",
      "a_guard": "Pente {g}, {mm} milímetros",
      "mm": "mm",
      "a_view": "Visão do corte do cliente",
      "a_turn": "Arraste para girar o cliente",
      "shop": "Loja",
      "collection": "Coleção",
      "a_wish": "Juntar moedas para isto",
      "a_bill": "Faltam {n} clientes para a conta de {c} moedas",
      "a_bill#one": "Falta {n} cliente para a conta de {c} moedas",
      "make_base": "Usar de base",
      "update_needed": "Atualize o jogo para continuar sua Carreira",
      "buy": "Comprar",
      "a_wishvid": "Assista a um vídeo e ganhe moedas para sua lista de desejos",
      "a_share": "Compartilhar corte",
      "a_wearing": "Em uso",
      "a_wearthis": "Usar este modelo",
      "tut_clipper": "Toque na máquina para ligá-la",
      "tut_guard": "Toque ou deslize o arco para trocar o pente",
      "tut_cut": "Arraste no cabelo para cortar",
      "boot_new_title": "É preciso uma versão mais nova do jogo",
      "boot_new_msg": "Seu progresso está seguro. Atualize para a versão mais recente.",
      "boot_fail_title": "Não foi possível carregar o jogo",
      "boot_fail_msg": "Seu progresso salvo foi mantido. Verifique sua conexão e tente de novo.",
      "retry": "Recarregar",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairóbi",
      "city_johannesburg": "Joanesburgo",
      "city_cairo": "Cairo",
      "city_casablanca": "Casablanca",
      "city_london": "Londres",
      "city_paris": "Paris",
      "city_berlin": "Berlim",
      "city_madrid": "Madri",
      "city_warsaw": "Varsóvia",
      "city_istanbul": "Istambul",
      "city_riyadh": "Riad",
      "city_dubai": "Dubai",
      "city_amman": "Amã",
      "city_delhi": "Délhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karachi",
      "city_dhaka": "Daca",
      "city_colombo": "Colombo",
      "city_tokyo": "Tóquio",
      "city_seoul": "Seul",
      "city_shanghai": "Xangai",
      "city_jakarta": "Jacarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangcoc",
      "city_new-york": "Nova York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montreal",
      "city_mexico-city": "Cidade do México",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "ro": {
      "play": "Joacă",
      "modes": "Moduri",
      "daily": "Provocarea zilei",
      "gift": "Cadou",
      "wardrobe": "Garderobă",
      "salon": "Salon",
      "styles": "Tunsori",
      "regulars": "Clienți fideli",
      "orders": "Comenzi",
      "freestyle": "Joc liber",
      "rescue": "Salvare",
      "beards": "Bărbi",
      "rush": "Ora de vârf",
      "event": "Eveniment",
      "new": "Nou",
      "map": "Hartă",
      "tour": "Turneu",
      "home": "Acasă",
      "choose_city": "Alege un oraș",
      "no_customers": "Încă nu ai clienți",
      "sound": "Sunet",
      "free": "Gratuit",
      "coins": "Monede",
      "clippers": "Aparate",
      "gowns": "Pelerine",
      "pick_city": "Alege-ți orașul",
      "next_city": "Următorul oraș",
      "m_requests": "Tunde la comandă",
      "m_fix": "Repară o tunsoare ratată",
      "m_beard": "Modelează barba",
      "m_rush": "Bate cronometrul",
      "task_fade": "Fă {n} de fade-uri",
      "task_fade#one": "Fă {n} fade",
      "task_fade#few": "Fă {n} fade-uri",
      "task_beard": "Aranjează {n} de bărbi",
      "task_beard#one": "Aranjează {n} barbă",
      "task_beard#few": "Aranjează {n} bărbi",
      "task_regular": "Tunde un client fidel",
      "task_star3": "{n} de tunsori de 3 stele",
      "task_star3#one": "{n} tunsoare de 3 stele",
      "task_star3#few": "{n} tunsori de 3 stele",
      "task_customers": "{n} de clienți",
      "task_customers#one": "{n} client",
      "task_customers#few": "{n} clienți",
      "task_tips": "{n} de monede din bacșiș",
      "task_tips#one": "{n} monedă din bacșiș",
      "task_tips#few": "{n} monede din bacșiș",
      "career": "Carieră",
      "quick_play": "Joc rapid",
      "settings": "Setări",
      "shop_name": "Numele salonului",
      "hand": "Mâna",
      "left": "Stânga",
      "right": "Dreapta",
      "privacy": "Confidențialitate",
      "ad_choices": "Opțiuni reclame",
      "full": "Complet",
      "language": "Limbă",
      "shops": "Saloane",
      "parts": "Piese",
      "wall": "Perete",
      "lower": "Lambriu",
      "floor": "Podea",
      "mat": "Covor",
      "mirror": "Oglindă",
      "lights": "Lumini",
      "shelf": "Raft",
      "chair": "Scaun",
      "decor": "Decor",
      "name": "Firmă",
      "open": "Deschis",
      "est": "Din {y}",
      "classic": "Clasic",
      "c_london": "Londra",
      "c_tokyo": "Tokyo",
      "c_lagos": "Lagos",
      "c_istanbul": "Istanbul",
      "c_mexico": "Mexic",
      "c_mumbai": "Mumbai",
      "shopname": "Frizerie",
      "a_back": "Înapoi",
      "a_close": "Închide",
      "a_menu": "Meniu",
      "a_modes": "Moduri",
      "a_newcust": "Client nou",
      "a_goals": "Obiective",
      "a_dblday": "Vezi un video și dublează recompensa de azi",
      "a_chest": "Deschide cufărul săptămânal",
      "a_wear": "Folosește",
      "a_onemore": "Vezi un video pentru încă unul",
      "a_collect": "Colectează",
      "a_undo": "Vezi un video și anulează ultima trecere",
      "a_triple": "Vezi un video și triplează bacșișul",
      "a_coins": "Monede",
      "a_shop": "Magazin",
      "a_salon": "Salon",
      "a_gift": "Cadou",
      "a_take": "Revendică",
      "a_dblit": "Vezi un video și dublează",
      "a_wardrobe": "Garderobă",
      "a_clippers": "Aparate de tuns",
      "a_robes": "Pelerine",
      "a_detail": "Nivel de detaliu",
      "a_next": "Pagina următoare",
      "a_prev": "Pagina anterioară",
      "a_timeleft": "Timp rămas azi",
      "a_mute": "Oprește sunetul jocului",
      "a_unmute": "Pornește sunetul jocului",
      "arc_clipper": "Pieptenele aparatului: atinge sau glisează, 1 e cel mai scurt",
      "a_clipon": "Aparat pornit: trage pe păr ca să tunzi",
      "a_clipoff": "Aparat oprit: trage ca să rotești clientul",
      "a_finish": "Termină tunsoarea",
      "a_nextcust": "Următorul client",
      "a_showing": "Se arată tunsoarea finală",
      "a_savefail": "Salvarea a eșuat. Reîncercăm la următoarea acțiune",
      "a_guard": "Pieptenele {g}, {mm} mm",
      "mm": "mm",
      "a_view": "Vizualizare tunsoare client",
      "a_turn": "Trage ca să rotești clientul",
      "shop": "Magazin",
      "collection": "Colecție",
      "a_wish": "Strânge pentru asta",
      "a_bill": "Încă {n} de clienți până la factura de {c}",
      "a_bill#one": "Încă {n} client până la factura de {c}",
      "a_bill#few": "Încă {n} clienți până la factura de {c}",
      "make_base": "Fă-l bază",
      "update_needed": "Actualizează jocul ca să-ți continui cariera",
      "buy": "Cumpără",
      "a_wishvid": "Vezi un video și primești monede pentru ce-ți dorești",
      "a_share": "Distribuie tunsoarea",
      "a_wearing": "În uz",
      "a_wearthis": "Folosește acest model",
      "tut_clipper": "Atinge aparatul ca să-l pornești",
      "tut_guard": "Atinge sau glisează arcul ca să schimbi pieptenele",
      "tut_cut": "Trage pe păr ca să tunzi",
      "boot_new_title": "Ai nevoie de o versiune mai nouă a jocului",
      "boot_new_msg": "Progresul tău e în siguranță. Actualizează la cea mai nouă versiune.",
      "boot_fail_title": "Jocul nu s-a putut încărca",
      "boot_fail_msg": "Progresul tău e salvat. Verifică conexiunea și încearcă din nou.",
      "retry": "Reîncearcă",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Cairo",
      "city_casablanca": "Casablanca",
      "city_london": "Londra",
      "city_paris": "Paris",
      "city_berlin": "Berlin",
      "city_madrid": "Madrid",
      "city_warsaw": "Varșovia",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Riad",
      "city_dubai": "Dubai",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karachi",
      "city_dhaka": "Dhaka",
      "city_colombo": "Colombo",
      "city_tokyo": "Tokyo",
      "city_seoul": "Seul",
      "city_shanghai": "Shanghai",
      "city_jakarta": "Jakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montréal",
      "city_mexico-city": "Ciudad de México",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "ru": {
      "play": "Играть",
      "modes": "Режимы",
      "daily": "Задание дня",
      "gift": "Подарок",
      "wardrobe": "Гардероб",
      "salon": "Салон",
      "styles": "Стрижки",
      "regulars": "Постоянные",
      "orders": "Заказы",
      "freestyle": "Свободная игра",
      "rescue": "Спасение",
      "beards": "Бороды",
      "rush": "Час пик",
      "event": "Событие",
      "new": "Новое",
      "map": "Карта",
      "tour": "Турне",
      "home": "Главная",
      "choose_city": "Выбери город",
      "no_customers": "Клиентов пока нет",
      "sound": "Звук",
      "free": "Бесплатно",
      "coins": "Монеты",
      "clippers": "Машинки",
      "gowns": "Накидки",
      "pick_city": "Выбери свой город",
      "next_city": "Следующий город",
      "m_requests": "Стриги по заказу",
      "m_fix": "Исправь неудачную стрижку",
      "m_beard": "Оформи бороду",
      "m_rush": "Успей вовремя",
      "task_fade": "Сделай {n} фейдов",
      "task_fade#one": "Сделай {n} фейд",
      "task_fade#few": "Сделай {n} фейда",
      "task_fade#many": "Сделай {n} фейдов",
      "task_beard": "Подровняй {n} бород",
      "task_beard#one": "Подровняй {n} бороду",
      "task_beard#few": "Подровняй {n} бороды",
      "task_beard#many": "Подровняй {n} бород",
      "task_regular": "Постриги постоянного",
      "task_star3": "{n} стрижек на 3 звезды",
      "task_star3#one": "{n} стрижка на 3 звезды",
      "task_star3#few": "{n} стрижки на 3 звезды",
      "task_star3#many": "{n} стрижек на 3 звезды",
      "task_customers": "{n} клиентов",
      "task_customers#one": "{n} клиент",
      "task_customers#few": "{n} клиента",
      "task_customers#many": "{n} клиентов",
      "task_tips": "Собери {n} монет чаевых",
      "task_tips#one": "Собери {n} монету чаевых",
      "task_tips#few": "Собери {n} монеты чаевых",
      "task_tips#many": "Собери {n} монет чаевых",
      "career": "Карьера",
      "quick_play": "Быстрая игра",
      "settings": "Настройки",
      "shop_name": "Название салона",
      "hand": "Рука",
      "left": "Левая",
      "right": "Правая",
      "privacy": "Конфиденциальность",
      "ad_choices": "Настройки рекламы",
      "full": "Полная",
      "language": "Язык",
      "shops": "Салоны",
      "parts": "Детали",
      "wall": "Стена",
      "lower": "Панели",
      "floor": "Пол",
      "mat": "Коврик",
      "mirror": "Зеркало",
      "lights": "Свет",
      "shelf": "Полка",
      "chair": "Кресло",
      "decor": "Декор",
      "name": "Вывеска",
      "open": "Открыто",
      "est": "С {y} года",
      "classic": "Классика",
      "c_london": "Лондон",
      "c_tokyo": "Токио",
      "c_lagos": "Лагос",
      "c_istanbul": "Стамбул",
      "c_mexico": "Мехико",
      "c_mumbai": "Мумбаи",
      "shopname": "Барбершоп",
      "a_back": "Назад",
      "a_close": "Закрыть",
      "a_menu": "Меню",
      "a_modes": "Режимы",
      "a_newcust": "Новый клиент",
      "a_goals": "Цели",
      "a_dblday": "Посмотри видео и удвой награду дня",
      "a_chest": "Открыть недельный сундук",
      "a_wear": "Выбрать",
      "a_onemore": "Посмотри видео и получи ещё один",
      "a_collect": "Забрать",
      "a_undo": "Посмотри видео и отмени последний проход",
      "a_triple": "Посмотри видео и утрой чаевые",
      "a_coins": "Монеты",
      "a_shop": "Магазин",
      "a_salon": "Салон",
      "a_gift": "Подарок",
      "a_take": "Взять",
      "a_dblit": "Посмотри видео и удвой",
      "a_wardrobe": "Гардероб",
      "a_clippers": "Машинки",
      "a_robes": "Накидки",
      "a_detail": "Детализация",
      "a_next": "Следующая страница",
      "a_prev": "Предыдущая страница",
      "a_timeleft": "До конца дня",
      "a_mute": "Выключить звук игры",
      "a_unmute": "Включить звук игры",
      "arc_clipper": "Насадка: нажми или проведи, 1 — самая короткая",
      "a_clipon": "Машинка включена: проведи по волосам, чтобы стричь",
      "a_clipoff": "Машинка выключена: проведи, чтобы повернуть клиента",
      "a_finish": "Завершить стрижку",
      "a_nextcust": "Следующий клиент",
      "a_showing": "Показ готовой стрижки",
      "a_savefail": "Не удалось сохранить. Повторим при следующем действии",
      "a_guard": "Насадка {g}, {mm} мм",
      "mm": "мм",
      "a_view": "Вид стрижки клиента",
      "a_turn": "Проведи, чтобы повернуть клиента",
      "shop": "Магазин",
      "collection": "Коллекция",
      "a_wish": "Копить на это",
      "a_bill": "Ещё {n} клиентов до счёта на {c}",
      "a_bill#one": "Ещё {n} клиент до счёта на {c}",
      "a_bill#few": "Ещё {n} клиента до счёта на {c}",
      "a_bill#many": "Ещё {n} клиентов до счёта на {c}",
      "make_base": "За основу",
      "update_needed": "Обнови игру, чтобы продолжить карьеру",
      "buy": "Купить",
      "a_wishvid": "Посмотри видео и получи монеты на желанную покупку",
      "a_share": "Поделиться стрижкой",
      "a_wearing": "Выбрано",
      "a_wearthis": "Выбрать это",
      "tut_clipper": "Нажми на машинку, чтобы включить её",
      "tut_guard": "Нажми или проведи по дуге, чтобы сменить насадку",
      "tut_cut": "Проведи по волосам, чтобы стричь",
      "boot_new_title": "Нужна новая версия игры",
      "boot_new_msg": "Твой прогресс сохранён. Обнови игру до последней версии.",
      "boot_fail_title": "Не удалось загрузить игру",
      "boot_fail_msg": "Твой прогресс сохранён. Проверь подключение и попробуй снова.",
      "retry": "Повторить",
      "city_lagos": "Лагос",
      "city_kinshasa": "Киншаса",
      "city_nairobi": "Найроби",
      "city_johannesburg": "Йоханнесбург",
      "city_cairo": "Каир",
      "city_casablanca": "Касабланка",
      "city_london": "Лондон",
      "city_paris": "Париж",
      "city_berlin": "Берлин",
      "city_madrid": "Мадрид",
      "city_warsaw": "Варшава",
      "city_istanbul": "Стамбул",
      "city_riyadh": "Эр-Рияд",
      "city_dubai": "Дубай",
      "city_amman": "Амман",
      "city_delhi": "Дели",
      "city_mumbai": "Мумбаи",
      "city_karachi": "Карачи",
      "city_dhaka": "Дакка",
      "city_colombo": "Коломбо",
      "city_tokyo": "Токио",
      "city_seoul": "Сеул",
      "city_shanghai": "Шанхай",
      "city_jakarta": "Джакарта",
      "city_manila": "Манила",
      "city_bangkok": "Бангкок",
      "city_new-york": "Нью-Йорк",
      "city_los-angeles": "Лос-Анджелес",
      "city_toronto": "Торонто",
      "city_montreal": "Монреаль",
      "city_mexico-city": "Мехико",
      "city_sao-paulo": "Сан-Паулу",
      "city_buenos-aires": "Буэнос-Айрес",
      "city_kingston": "Кингстон",
      "city_sydney": "Сидней",
      "city_auckland": "Окленд"
    },
    "zh-Hans": {
      "play": "开始",
      "modes": "模式",
      "daily": "每日挑战",
      "gift": "礼物",
      "wardrobe": "装扮",
      "salon": "理发店",
      "styles": "发型",
      "regulars": "老顾客",
      "orders": "订单",
      "freestyle": "自由模式",
      "rescue": "发型急救",
      "beards": "胡须",
      "rush": "限时挑战",
      "event": "活动",
      "new": "新",
      "map": "地图",
      "tour": "城市之旅",
      "home": "主页",
      "choose_city": "选择城市",
      "no_customers": "还没有顾客",
      "sound": "声音",
      "free": "免费",
      "coins": "金币",
      "clippers": "电推剪",
      "gowns": "围布",
      "pick_city": "选择你的城市",
      "next_city": "下一座城市",
      "m_requests": "按顾客要求剪",
      "m_fix": "修好失败的发型",
      "m_beard": "修整胡须",
      "m_rush": "和时间赛跑",
      "task_fade": "完成{n}次渐变",
      "task_beard": "修{n}次胡须",
      "task_regular": "为一位老顾客理发",
      "task_star3": "{n}次三星理发",
      "task_customers": "服务{n}位顾客",
      "task_tips": "赚取{n}小费",
      "career": "生涯模式",
      "quick_play": "快速游戏",
      "settings": "设置",
      "shop_name": "店名",
      "hand": "惯用手",
      "left": "左手",
      "right": "右手",
      "privacy": "隐私政策",
      "ad_choices": "广告设置",
      "full": "最高",
      "language": "语言",
      "shops": "店面",
      "parts": "部件",
      "wall": "墙面",
      "lower": "护墙板",
      "floor": "地板",
      "mat": "地垫",
      "mirror": "镜子",
      "lights": "灯光",
      "shelf": "置物架",
      "chair": "理发椅",
      "decor": "装饰",
      "name": "招牌",
      "open": "营业中",
      "est": "始于{y}",
      "classic": "经典",
      "c_london": "伦敦",
      "c_tokyo": "东京",
      "c_lagos": "拉各斯",
      "c_istanbul": "伊斯坦布尔",
      "c_mexico": "墨西哥",
      "c_mumbai": "孟买",
      "shopname": "理发店",
      "a_back": "返回",
      "a_close": "关闭",
      "a_menu": "菜单",
      "a_modes": "模式",
      "a_newcust": "新顾客",
      "a_goals": "目标",
      "a_dblday": "看视频，今日奖励翻倍",
      "a_chest": "打开每周宝箱",
      "a_wear": "装备",
      "a_onemore": "看视频再领一个",
      "a_collect": "领取",
      "a_undo": "看视频撤销上一刀",
      "a_triple": "看视频，小费翻三倍",
      "a_coins": "金币",
      "a_shop": "商店",
      "a_salon": "理发店",
      "a_gift": "礼物",
      "a_take": "领取",
      "a_dblit": "看视频翻倍",
      "a_wardrobe": "装扮",
      "a_clippers": "电推剪",
      "a_robes": "围布",
      "a_detail": "画质",
      "a_next": "下一页",
      "a_prev": "上一页",
      "a_timeleft": "今日剩余时间",
      "a_mute": "游戏静音",
      "a_unmute": "取消游戏静音",
      "arc_clipper": "电推剪限位梳：点按或滑动切换，1号最短",
      "a_clipon": "电推剪已开启：在头发上拖动来剪",
      "a_clipoff": "电推剪已关闭：拖动来转动顾客",
      "a_finish": "完成理发",
      "a_nextcust": "下一位顾客",
      "a_showing": "正在展示完成的发型",
      "a_savefail": "保存失败，下次操作时会自动重试",
      "a_guard": "{g}号限位梳，{mm}毫米",
      "mm": "毫米",
      "a_view": "顾客发型视图",
      "a_turn": "拖动来转动顾客",
      "shop": "商店",
      "collection": "作品集",
      "a_wish": "为它攒金币",
      "a_bill": "再服务{n}位顾客，就要支付{c}金币账单",
      "make_base": "设为基础",
      "update_needed": "请更新游戏以继续生涯模式",
      "buy": "购买",
      "a_wishvid": "看视频领取心愿单金币",
      "a_share": "分享发型",
      "a_wearing": "已装备",
      "a_wearthis": "装备这个",
      "tut_clipper": "点按电推剪来开启",
      "tut_guard": "点按或滑动弧形条来更换限位梳",
      "tut_cut": "在头发上拖动来剪",
      "boot_new_title": "需要更新游戏",
      "boot_new_msg": "你的进度很安全。请更新到最新版本。",
      "boot_fail_title": "游戏无法加载",
      "boot_fail_msg": "你的进度已保存。请检查网络连接后重试。",
      "retry": "重试",
      "city_lagos": "拉各斯",
      "city_kinshasa": "金沙萨",
      "city_nairobi": "内罗毕",
      "city_johannesburg": "约翰内斯堡",
      "city_cairo": "开罗",
      "city_casablanca": "卡萨布兰卡",
      "city_london": "伦敦",
      "city_paris": "巴黎",
      "city_berlin": "柏林",
      "city_madrid": "马德里",
      "city_warsaw": "华沙",
      "city_istanbul": "伊斯坦布尔",
      "city_riyadh": "利雅得",
      "city_dubai": "迪拜",
      "city_amman": "安曼",
      "city_delhi": "德里",
      "city_mumbai": "孟买",
      "city_karachi": "卡拉奇",
      "city_dhaka": "达卡",
      "city_colombo": "科伦坡",
      "city_tokyo": "东京",
      "city_seoul": "首尔",
      "city_shanghai": "上海",
      "city_jakarta": "雅加达",
      "city_manila": "马尼拉",
      "city_bangkok": "曼谷",
      "city_new-york": "纽约",
      "city_los-angeles": "洛杉矶",
      "city_toronto": "多伦多",
      "city_montreal": "蒙特利尔",
      "city_mexico-city": "墨西哥城",
      "city_sao-paulo": "圣保罗",
      "city_buenos-aires": "布宜诺斯艾利斯",
      "city_kingston": "金斯敦",
      "city_sydney": "悉尼",
      "city_auckland": "奥克兰"
    },
    "sk": {
      "play": "Hrať",
      "modes": "Režimy",
      "daily": "Denná výzva",
      "gift": "Darček",
      "wardrobe": "Šatník",
      "salon": "Salón",
      "styles": "Účesy",
      "regulars": "Stáli zákazníci",
      "orders": "Objednávky",
      "freestyle": "Voľný štýl",
      "rescue": "Záchrana",
      "beards": "Brady",
      "rush": "Na čas",
      "event": "Udalosť",
      "new": "Nové",
      "map": "Mapa",
      "tour": "Turné",
      "home": "Hlavné menu",
      "choose_city": "Vyber si mesto",
      "no_customers": "Zatiaľ žiadni zákazníci",
      "sound": "Zvuk",
      "free": "Zadarmo",
      "coins": "Mince",
      "clippers": "Strojčeky",
      "gowns": "Peleríny",
      "pick_city": "Vyber si mesto",
      "next_city": "Ďalšie mesto",
      "m_requests": "Strihaj podľa priania",
      "m_fix": "Oprav pokazený účes",
      "m_beard": "Uprav bradu",
      "m_rush": "Stihni to načas",
      "task_fade#one": "Urob {n} fade strih",
      "task_fade#few": "Urob {n} fade strihy",
      "task_fade#many": "Urob {n} fade strihu",
      "task_fade": "Urob {n} fade strihov",
      "task_beard#one": "Zastrihni {n} bradu",
      "task_beard#few": "Zastrihni {n} brady",
      "task_beard#many": "Zastrihni {n} brady",
      "task_beard": "Zastrihni {n} brád",
      "task_regular": "Ostrihaj stáleho zákazníka",
      "task_star3#one": "{n} strih za 3 hviezdy",
      "task_star3#few": "{n} strihy za 3 hviezdy",
      "task_star3#many": "{n} strihu za 3 hviezdy",
      "task_star3": "{n} strihov za 3 hviezdy",
      "task_customers#one": "Obslúž {n} zákazníka",
      "task_customers#few": "Obslúž {n} zákazníkov",
      "task_customers#many": "Obslúž {n} zákazníka",
      "task_customers": "Obslúž {n} zákazníkov",
      "task_tips": "Zarob {n} na sprepitnom",
      "career": "Kariéra",
      "quick_play": "Rýchla hra",
      "settings": "Nastavenia",
      "shop_name": "Názov salónu",
      "hand": "Ruka",
      "left": "Ľavá",
      "right": "Pravá",
      "privacy": "Ochrana súkromia",
      "ad_choices": "Nastavenia reklám",
      "full": "Plná",
      "language": "Jazyk",
      "shops": "Salóny",
      "parts": "Vybavenie",
      "wall": "Stena",
      "lower": "Obklad",
      "floor": "Podlaha",
      "mat": "Koberec",
      "mirror": "Zrkadlo",
      "lights": "Svetlá",
      "shelf": "Polica",
      "chair": "Kreslo",
      "decor": "Dekorácie",
      "name": "Názov",
      "open": "Otvorené",
      "est": "Od roku {y}",
      "classic": "Klasika",
      "c_london": "Londýn",
      "c_tokyo": "Tokio",
      "c_lagos": "Lagos",
      "c_istanbul": "Istanbul",
      "c_mexico": "Mexiko",
      "c_mumbai": "Bombaj",
      "shopname": "Holičstvo",
      "a_back": "Späť",
      "a_close": "Zavrieť",
      "a_menu": "Menu",
      "a_modes": "Režimy",
      "a_newcust": "Nový zákazník",
      "a_goals": "Ciele",
      "a_dblday": "Pozri si video a zdvojnásob dnešnú odmenu",
      "a_chest": "Otvor týždennú truhlicu",
      "a_wear": "Použiť",
      "a_onemore": "Pozri si video a získaj ešte jeden",
      "a_collect": "Vyzdvihnúť",
      "a_undo": "Pozri si video a vráť posledný ťah",
      "a_triple": "Pozri si video a strojnásob sprepitné",
      "a_coins": "Mince",
      "a_shop": "Obchod",
      "a_salon": "Salón",
      "a_gift": "Darček",
      "a_take": "Vziať",
      "a_dblit": "Pozri si video a zdvojnásob odmenu",
      "a_wardrobe": "Šatník",
      "a_clippers": "Strojčeky",
      "a_robes": "Peleríny",
      "a_detail": "Úroveň detailov",
      "a_next": "Ďalej",
      "a_prev": "Predchádzajúce",
      "a_timeleft": "Zostáva do konca dňa",
      "a_mute": "Vypnúť zvuk hry",
      "a_unmute": "Zapnúť zvuk hry",
      "arc_clipper": "Nadstavec strojčeka: ťukni alebo posuň, 1 je najkratší",
      "a_clipon": "Strojček zapnutý: ťahaj po vlasoch a strihaj",
      "a_clipoff": "Strojček vypnutý: ťahaj a otáčaj zákazníkom",
      "a_finish": "Dokončiť strih",
      "a_nextcust": "Ďalší zákazník",
      "a_showing": "Ukážka hotového strihu",
      "a_savefail": "Uloženie zlyhalo. Skúsime to znova pri ďalšej akcii",
      "a_guard": "Nadstavec {g}, {mm} mm",
      "mm": "mm",
      "a_view": "Pohľad na strih zákazníka",
      "a_turn": "Ťahaj a otáčaj zákazníkom",
      "shop": "Obchod",
      "collection": "Zbierka",
      "a_wish": "Šetriť na toto",
      "a_bill#one": "Ešte {n} zákazník do účtu na {c}",
      "a_bill#few": "Ešte {n} zákazníci do účtu na {c}",
      "a_bill#many": "Ešte {n} zákazníka do účtu na {c}",
      "a_bill": "Ešte {n} zákazníkov do účtu na {c}",
      "make_base": "Ako základ",
      "update_needed": "Aktualizuj hru a pokračuj v kariére",
      "buy": "Kúpiť",
      "a_wishvid": "Pozri si video a získaj mince na vysnívanú vec",
      "a_share": "Zdieľať účes",
      "a_wearing": "Používaš",
      "a_wearthis": "Použiť tento",
      "tut_clipper": "Ťukni na strojček a zapni ho",
      "tut_guard": "Ťukni na oblúk alebo ho posuň a zmeň nadstavec",
      "tut_cut": "Ťahaj po vlasoch a strihaj",
      "boot_new_title": "Je potrebná novšia verzia hry",
      "boot_new_msg": "Tvoj postup je v bezpečí. Aktualizuj hru na najnovšiu verziu.",
      "boot_fail_title": "Hru sa nepodarilo načítať",
      "boot_fail_msg": "Tvoj uložený postup zostal zachovaný. Skontroluj pripojenie a skús to znova.",
      "retry": "Skúsiť znova",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Káhira",
      "city_casablanca": "Casablanca",
      "city_london": "Londýn",
      "city_paris": "Paríž",
      "city_berlin": "Berlín",
      "city_madrid": "Madrid",
      "city_warsaw": "Varšava",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Rijád",
      "city_dubai": "Dubaj",
      "city_amman": "Ammán",
      "city_delhi": "Dillí",
      "city_mumbai": "Bombaj",
      "city_karachi": "Karáči",
      "city_dhaka": "Dháka",
      "city_colombo": "Kolombo",
      "city_tokyo": "Tokio",
      "city_seoul": "Soul",
      "city_shanghai": "Šanghaj",
      "city_jakarta": "Jakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montreal",
      "city_mexico-city": "Mexiko",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "es-419": {
      "play": "Jugar",
      "modes": "Modos",
      "daily": "Reto diario",
      "gift": "Regalo",
      "wardrobe": "Vestuario",
      "salon": "Mi barbería",
      "styles": "Estilos",
      "regulars": "Habituales",
      "orders": "Pedidos",
      "freestyle": "Libre",
      "rescue": "Rescate",
      "beards": "Barbas",
      "rush": "Contrarreloj",
      "event": "Evento",
      "new": "Nuevo",
      "map": "Mapa",
      "tour": "Gira",
      "home": "Inicio",
      "choose_city": "Elige una ciudad",
      "no_customers": "Aún no hay clientes",
      "sound": "Sonido",
      "free": "Gratis",
      "coins": "Monedas",
      "clippers": "Máquinas",
      "gowns": "Capas",
      "pick_city": "Elige tu ciudad",
      "next_city": "Próxima ciudad",
      "m_requests": "Corta lo que te piden",
      "m_fix": "Arregla un mal corte",
      "m_beard": "Dale forma a la barba",
      "m_rush": "Gánale al reloj",
      "task_fade": "Haz {n} degradados",
      "task_fade#one": "Haz {n} degradado",
      "task_beard": "Recorta {n} barbas",
      "task_beard#one": "Recorta {n} barba",
      "task_regular": "Atiende a un habitual",
      "task_star3": "{n} cortes de 3 estrellas",
      "task_star3#one": "{n} corte de 3 estrellas",
      "task_customers": "Atiende a {n} clientes",
      "task_customers#one": "Atiende a {n} cliente",
      "task_tips": "Gana {n} en propinas",
      "career": "Carrera",
      "quick_play": "Partida rápida",
      "settings": "Configuración",
      "shop_name": "Nombre de la barbería",
      "hand": "Mano",
      "left": "Izquierda",
      "right": "Derecha",
      "privacy": "Privacidad",
      "ad_choices": "Opciones de anuncios",
      "full": "Completo",
      "language": "Idioma",
      "shops": "Barberías",
      "parts": "Piezas",
      "wall": "Pared",
      "lower": "Paneles",
      "floor": "Piso",
      "mat": "Tapete",
      "mirror": "Espejo",
      "lights": "Luces",
      "shelf": "Repisa",
      "chair": "Sillón",
      "decor": "Decoración",
      "name": "Nombre",
      "open": "Abierto",
      "est": "Desde {y}",
      "classic": "Clásica",
      "c_london": "Londres",
      "c_tokyo": "Tokio",
      "c_lagos": "Lagos",
      "c_istanbul": "Estambul",
      "c_mexico": "México",
      "c_mumbai": "Bombay",
      "shopname": "Barbería",
      "a_back": "Atrás",
      "a_close": "Cerrar",
      "a_menu": "Menú",
      "a_modes": "Modos",
      "a_newcust": "Nuevo cliente",
      "a_goals": "Metas",
      "a_dblday": "Mira un video y duplica la recompensa de hoy",
      "a_chest": "Abrir el cofre semanal",
      "a_wear": "Usar",
      "a_onemore": "Mira un video y gana uno más",
      "a_collect": "Reclamar",
      "a_undo": "Mira un video para deshacer la última pasada",
      "a_triple": "Mira un video y triplica las propinas",
      "a_coins": "Monedas",
      "a_shop": "Tienda",
      "a_salon": "Mi barbería",
      "a_gift": "Regalo",
      "a_take": "Llévatelo",
      "a_dblit": "Mira un video y duplícalo",
      "a_wardrobe": "Vestuario",
      "a_clippers": "Máquinas",
      "a_robes": "Capas",
      "a_detail": "Nivel de detalle",
      "a_next": "Siguiente",
      "a_prev": "Anterior",
      "a_timeleft": "Tiempo restante de hoy",
      "a_mute": "Silenciar el juego",
      "a_unmute": "Activar el sonido del juego",
      "arc_clipper": "Peine de la máquina: toca o desliza; el 1 es el más corto",
      "a_clipon": "Máquina encendida: arrastra sobre el cabello para cortar",
      "a_clipoff": "Máquina apagada: arrastra para girar al cliente",
      "a_finish": "Terminar el corte",
      "a_nextcust": "Siguiente cliente",
      "a_showing": "Mostrando el corte terminado",
      "a_savefail": "No se pudo guardar. Se volverá a intentar en tu próxima acción",
      "a_guard": "Peine {g}, {mm} milímetros",
      "mm": "mm",
      "a_view": "Vista del corte del cliente",
      "a_turn": "Arrastra para girar al cliente",
      "shop": "Tienda",
      "collection": "Colección",
      "a_wish": "Ahorrar para esto",
      "a_bill": "Faltan {n} clientes para la factura de {c} monedas",
      "a_bill#one": "Falta {n} cliente para la factura de {c} monedas",
      "make_base": "Usar de base",
      "update_needed": "Actualiza el juego para seguir con tu Carrera",
      "buy": "Comprar",
      "a_wishvid": "Mira un video y gana monedas para tu lista de deseos",
      "a_share": "Compartir corte",
      "a_wearing": "En uso",
      "a_wearthis": "Usar este diseño",
      "tut_clipper": "Toca la máquina para encenderla",
      "tut_guard": "Toca o desliza el arco para cambiar el peine",
      "tut_cut": "Arrastra sobre el cabello para cortar",
      "boot_new_title": "Se necesita una versión más reciente",
      "boot_new_msg": "Tu progreso está a salvo. Actualiza a la versión más reciente.",
      "boot_fail_title": "No se pudo cargar el juego",
      "boot_fail_msg": "Tu progreso guardado está a salvo. Revisa tu conexión e inténtalo de nuevo.",
      "retry": "Reintentar",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinsasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburgo",
      "city_cairo": "El Cairo",
      "city_casablanca": "Casablanca",
      "city_london": "Londres",
      "city_paris": "París",
      "city_berlin": "Berlín",
      "city_madrid": "Madrid",
      "city_warsaw": "Varsovia",
      "city_istanbul": "Estambul",
      "city_riyadh": "Riad",
      "city_dubai": "Dubái",
      "city_amman": "Amán",
      "city_delhi": "Delhi",
      "city_mumbai": "Bombay",
      "city_karachi": "Karachi",
      "city_dhaka": "Daca",
      "city_colombo": "Colombo",
      "city_tokyo": "Tokio",
      "city_seoul": "Seúl",
      "city_shanghai": "Shanghái",
      "city_jakarta": "Yakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "Nueva York",
      "city_los-angeles": "Los Ángeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montreal",
      "city_mexico-city": "Ciudad de México",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sídney",
      "city_auckland": "Auckland"
    },
    "sv": {
      "play": "Spela",
      "modes": "Spellägen",
      "daily": "Dagens utmaning",
      "gift": "Gåva",
      "wardrobe": "Garderob",
      "salon": "Salong",
      "styles": "Frisyrer",
      "regulars": "Stamkunder",
      "orders": "Beställningar",
      "freestyle": "Fritt spel",
      "rescue": "Räddning",
      "beards": "Skägg",
      "rush": "Rusningstid",
      "event": "Event",
      "new": "Ny",
      "map": "Karta",
      "tour": "Turné",
      "home": "Start",
      "choose_city": "Välj en stad",
      "no_customers": "Inga kunder än",
      "sound": "Ljud",
      "free": "Gratis",
      "coins": "Mynt",
      "clippers": "Maskiner",
      "gowns": "Kappor",
      "pick_city": "Välj din stad",
      "next_city": "Nästa stad",
      "m_requests": "Klipp det de vill ha",
      "m_fix": "Rädda en misslyckad frisyr",
      "m_beard": "Forma skägget",
      "m_rush": "Tävla mot klockan",
      "task_fade": "Klipp {n} fades",
      "task_fade#one": "Klipp {n} fade",
      "task_beard": "Trimma {n} skägg",
      "task_beard#one": "Trimma {n} skägg",
      "task_regular": "Klipp en stamkund",
      "task_star3": "Få 3 stjärnor {n} gånger",
      "task_star3#one": "Få 3 stjärnor {n} gång",
      "task_customers": "Klipp {n} kunder",
      "task_customers#one": "Klipp {n} kund",
      "task_tips": "Få {n} mynt i dricks",
      "task_tips#one": "Få {n} mynt i dricks",
      "career": "Karriär",
      "quick_play": "Snabbspel",
      "settings": "Inställningar",
      "shop_name": "Salongens namn",
      "hand": "Hand",
      "left": "Vänster",
      "right": "Höger",
      "privacy": "Integritetspolicy",
      "ad_choices": "Annonsval",
      "full": "Max",
      "language": "Språk",
      "shops": "Salonger",
      "parts": "Delar",
      "wall": "Vägg",
      "lower": "Paneler",
      "floor": "Golv",
      "mat": "Matta",
      "mirror": "Spegel",
      "lights": "Lampor",
      "shelf": "Hylla",
      "chair": "Stol",
      "decor": "Dekor",
      "name": "Namn",
      "open": "Öppet",
      "est": "Sedan {y}",
      "classic": "Klassisk",
      "c_london": "London",
      "c_tokyo": "Tokyo",
      "c_lagos": "Lagos",
      "c_istanbul": "Istanbul",
      "c_mexico": "Mexiko",
      "c_mumbai": "Mumbai",
      "shopname": "Barbershop",
      "a_back": "Tillbaka",
      "a_close": "Stäng",
      "a_menu": "Meny",
      "a_modes": "Spellägen",
      "a_newcust": "Ny kund",
      "a_goals": "Mål",
      "a_dblday": "Titta på en video och dubbla dagens belöning",
      "a_chest": "Öppna veckans kista",
      "a_wear": "Använd",
      "a_onemore": "Titta på en video och få en till",
      "a_collect": "Hämta",
      "a_undo": "Titta på en video och ångra det senaste klippet",
      "a_triple": "Titta på en video och tredubbla dricksen",
      "a_coins": "Mynt",
      "a_shop": "Butik",
      "a_salon": "Salong",
      "a_gift": "Gåva",
      "a_take": "Ta den",
      "a_dblit": "Titta på en video och dubbla den",
      "a_wardrobe": "Garderob",
      "a_clippers": "Maskiner",
      "a_robes": "Kappor",
      "a_detail": "Detaljnivå",
      "a_next": "Nästa",
      "a_prev": "Föregående",
      "a_timeleft": "Tid kvar i dag",
      "a_mute": "Stäng av spelljud",
      "a_unmute": "Slå på spelljud",
      "arc_clipper": "Distanskam: tryck eller dra, 1 är kortast",
      "a_clipon": "Maskin på: dra över håret för att klippa",
      "a_clipoff": "Maskin av: dra för att vrida kunden",
      "a_finish": "Avsluta klippningen",
      "a_nextcust": "Nästa kund",
      "a_showing": "Visar den färdiga frisyren",
      "a_savefail": "Det gick inte att spara. Vi försöker igen vid nästa åtgärd",
      "a_guard": "Kam {g}, {mm} millimeter",
      "mm": "mm",
      "a_view": "Vy av kundens frisyr",
      "a_turn": "Dra för att vrida kunden",
      "shop": "Butik",
      "collection": "Samling",
      "a_wish": "Spara till den här",
      "a_bill": "{n} kunder kvar till räkningen på {c} mynt",
      "a_bill#one": "{n} kund kvar till räkningen på {c} mynt",
      "make_base": "Gör till bas",
      "update_needed": "Uppdatera spelet för att fortsätta din karriär",
      "buy": "Köp",
      "a_wishvid": "Titta på en video för mynt till din önskelista",
      "a_share": "Dela frisyren",
      "a_wearing": "Används",
      "a_wearthis": "Använd den här",
      "tut_clipper": "Tryck på maskinen för att slå på den",
      "tut_guard": "Tryck eller dra i bågen för att byta kam",
      "tut_cut": "Dra över håret för att klippa",
      "boot_new_title": "En nyare version behövs",
      "boot_new_msg": "Dina framsteg är säkra. Uppdatera till den senaste versionen.",
      "boot_fail_title": "Spelet kunde inte laddas",
      "boot_fail_msg": "Dina framsteg är sparade. Kontrollera anslutningen och försök igen.",
      "retry": "Försök igen",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Kairo",
      "city_casablanca": "Casablanca",
      "city_london": "London",
      "city_paris": "Paris",
      "city_berlin": "Berlin",
      "city_madrid": "Madrid",
      "city_warsaw": "Warszawa",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Riyadh",
      "city_dubai": "Dubai",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karachi",
      "city_dhaka": "Dhaka",
      "city_colombo": "Colombo",
      "city_tokyo": "Tokyo",
      "city_seoul": "Seoul",
      "city_shanghai": "Shanghai",
      "city_jakarta": "Jakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montréal",
      "city_mexico-city": "Mexico City",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "th": {
      "play": "เล่น",
      "modes": "โหมด",
      "daily": "ภารกิจรายวัน",
      "gift": "ของขวัญ",
      "wardrobe": "ไอเทมของฉัน",
      "salon": "ร้านตัดผม",
      "styles": "ทรงผม",
      "regulars": "ลูกค้าประจำ",
      "orders": "ตัดตามสั่ง",
      "freestyle": "ตัดอิสระ",
      "rescue": "แก้ทรงผม",
      "beards": "เครา",
      "rush": "แข่งเวลา",
      "event": "อีเวนต์",
      "new": "ใหม่",
      "map": "แผนที่",
      "tour": "ทัวร์",
      "home": "หน้าหลัก",
      "choose_city": "เลือกเมือง",
      "no_customers": "ยังไม่มีลูกค้า",
      "sound": "เสียง",
      "free": "ฟรี",
      "coins": "เหรียญ",
      "clippers": "ปัตตาเลี่ยน",
      "gowns": "ผ้าคลุม",
      "pick_city": "เลือกเมืองของคุณ",
      "next_city": "เมืองถัดไป",
      "m_requests": "ตัดตามที่ลูกค้าขอ",
      "m_fix": "แก้ทรงผมที่ตัดพัง",
      "m_beard": "แต่งทรงเครา",
      "m_rush": "แข่งกับเวลา",
      "task_fade": "ตัดทรงเฟด {n} ครั้ง",
      "task_beard": "แต่งเครา {n} ครั้ง",
      "task_regular": "ตัดผมให้ลูกค้าประจำ",
      "task_star3": "ตัดได้ 3 ดาว {n} ครั้ง",
      "task_customers": "บริการลูกค้า {n} คน",
      "task_tips": "รับทิป {n}",
      "career": "โหมดอาชีพ",
      "quick_play": "เล่นด่วน",
      "settings": "ตั้งค่า",
      "shop_name": "ชื่อร้าน",
      "hand": "มือที่ถนัด",
      "left": "ซ้าย",
      "right": "ขวา",
      "privacy": "นโยบายความเป็นส่วนตัว",
      "ad_choices": "ตัวเลือกโฆษณา",
      "full": "สูงสุด",
      "language": "ภาษา",
      "shops": "ธีมร้าน",
      "parts": "ชิ้นส่วน",
      "wall": "ผนัง",
      "lower": "แผงผนัง",
      "floor": "พื้น",
      "mat": "พรม",
      "mirror": "กระจก",
      "lights": "ไฟ",
      "shelf": "ชั้นวาง",
      "chair": "เก้าอี้",
      "decor": "ของตกแต่ง",
      "name": "ป้ายร้าน",
      "open": "เปิด",
      "est": "ก่อตั้ง {y}",
      "classic": "คลาสสิก",
      "c_london": "ลอนดอน",
      "c_tokyo": "โตเกียว",
      "c_lagos": "ลากอส",
      "c_istanbul": "อิสตันบูล",
      "c_mexico": "เม็กซิโก",
      "c_mumbai": "มุมไบ",
      "shopname": "ร้านตัดผม",
      "a_back": "ย้อนกลับ",
      "a_close": "ปิด",
      "a_menu": "เมนู",
      "a_modes": "โหมด",
      "a_newcust": "ลูกค้าใหม่",
      "a_goals": "เป้าหมาย",
      "a_dblday": "ดูวิดีโอเพื่อรับรางวัลวันนี้สองเท่า",
      "a_chest": "เปิดหีบรายสัปดาห์",
      "a_wear": "ใช้ไอเทมนี้",
      "a_onemore": "ดูวิดีโอเพื่อรับเพิ่มอีกหนึ่ง",
      "a_collect": "รับ",
      "a_undo": "ดูวิดีโอเพื่อย้อนการตัดครั้งล่าสุด",
      "a_triple": "ดูวิดีโอเพื่อรับทิปสามเท่า",
      "a_coins": "เหรียญ",
      "a_shop": "ร้านค้า",
      "a_salon": "ร้านตัดผม",
      "a_gift": "ของขวัญ",
      "a_take": "รับเลย",
      "a_dblit": "ดูวิดีโอเพื่อรับสองเท่า",
      "a_wardrobe": "ไอเทมของฉัน",
      "a_clippers": "ปัตตาเลี่ยน",
      "a_robes": "ผ้าคลุม",
      "a_detail": "ระดับกราฟิก",
      "a_next": "ถัดไป",
      "a_prev": "ก่อนหน้า",
      "a_timeleft": "เวลาที่เหลือวันนี้",
      "a_mute": "ปิดเสียงเกม",
      "a_unmute": "เปิดเสียงเกม",
      "arc_clipper": "หวีรองปัตตาเลี่ยน: แตะหรือเลื่อนเพื่อเปลี่ยน เบอร์ 1 สั้นที่สุด",
      "a_clipon": "ปัตตาเลี่ยนเปิดอยู่: ลากบนผมเพื่อตัด",
      "a_clipoff": "ปัตตาเลี่ยนปิดอยู่: ลากเพื่อหมุนลูกค้า",
      "a_finish": "ตัดผมเสร็จ",
      "a_nextcust": "ลูกค้าคนถัดไป",
      "a_showing": "กำลังแสดงทรงผมที่ตัดเสร็จ",
      "a_savefail": "บันทึกไม่สำเร็จ ระบบจะลองใหม่อัตโนมัติเมื่อคุณเล่นต่อ",
      "a_guard": "หวีรองเบอร์ {g} ยาว {mm} มิลลิเมตร",
      "mm": "มม.",
      "a_view": "มุมมองทรงผมของลูกค้า",
      "a_turn": "ลากเพื่อหมุนลูกค้า",
      "shop": "ร้านค้า",
      "collection": "ผลงาน",
      "a_wish": "เก็บเหรียญซื้ออันนี้",
      "a_bill": "อีก {n} คนจะถึงบิล {c} เหรียญ",
      "make_base": "ตั้งเป็นหลัก",
      "update_needed": "อัปเดตเกมเพื่อเล่นโหมดอาชีพต่อ",
      "buy": "ซื้อ",
      "a_wishvid": "ดูวิดีโอเพื่อรับเหรียญสำหรับของที่อยากได้",
      "a_share": "แชร์ทรงผม",
      "a_wearing": "กำลังใช้",
      "a_wearthis": "ใช้อันนี้",
      "tut_clipper": "แตะปัตตาเลี่ยนเพื่อเปิด",
      "tut_guard": "แตะหรือเลื่อนแถบโค้งเพื่อเปลี่ยนหวีรอง",
      "tut_cut": "ลากบนผมเพื่อตัด",
      "boot_new_title": "ต้องอัปเดตเกม",
      "boot_new_msg": "ความคืบหน้าของคุณปลอดภัย อัปเดตเป็นเวอร์ชันล่าสุดได้เลย",
      "boot_fail_title": "โหลดเกมไม่สำเร็จ",
      "boot_fail_msg": "ความคืบหน้าที่บันทึกไว้ยังอยู่ครบ ตรวจสอบการเชื่อมต่อแล้วลองอีกครั้ง",
      "retry": "ลองอีกครั้ง",
      "city_lagos": "ลากอส",
      "city_kinshasa": "กินชาซา",
      "city_nairobi": "ไนโรบี",
      "city_johannesburg": "โจฮันเนสเบิร์ก",
      "city_cairo": "ไคโร",
      "city_casablanca": "คาซาบลังกา",
      "city_london": "ลอนดอน",
      "city_paris": "ปารีส",
      "city_berlin": "เบอร์ลิน",
      "city_madrid": "มาดริด",
      "city_warsaw": "วอร์ซอ",
      "city_istanbul": "อิสตันบูล",
      "city_riyadh": "ริยาด",
      "city_dubai": "ดูไบ",
      "city_amman": "อัมมาน",
      "city_delhi": "เดลี",
      "city_mumbai": "มุมไบ",
      "city_karachi": "การาจี",
      "city_dhaka": "ธากา",
      "city_colombo": "โคลัมโบ",
      "city_tokyo": "โตเกียว",
      "city_seoul": "โซล",
      "city_shanghai": "เซี่ยงไฮ้",
      "city_jakarta": "จาการ์ตา",
      "city_manila": "มะนิลา",
      "city_bangkok": "กรุงเทพฯ",
      "city_new-york": "นิวยอร์ก",
      "city_los-angeles": "ลอสแอนเจลิส",
      "city_toronto": "โทรอนโต",
      "city_montreal": "มอนทรีออล",
      "city_mexico-city": "เม็กซิโกซิตี",
      "city_sao-paulo": "เซาเปาโล",
      "city_buenos-aires": "บัวโนสไอเรส",
      "city_kingston": "คิงสตัน",
      "city_sydney": "ซิดนีย์",
      "city_auckland": "โอ๊คแลนด์"
    },
    "zh-Hant": {
      "play": "開始",
      "modes": "模式",
      "daily": "每日挑戰",
      "gift": "禮物",
      "wardrobe": "裝扮",
      "salon": "理髮店",
      "styles": "髮型",
      "regulars": "常客",
      "orders": "訂單",
      "freestyle": "自由模式",
      "rescue": "髮型急救",
      "beards": "鬍鬚",
      "rush": "限時挑戰",
      "event": "活動",
      "new": "新",
      "map": "地圖",
      "tour": "城市之旅",
      "home": "首頁",
      "choose_city": "選擇城市",
      "no_customers": "還沒有客人",
      "sound": "音效",
      "free": "免費",
      "coins": "金幣",
      "clippers": "電剪",
      "gowns": "圍布",
      "pick_city": "選擇你的城市",
      "next_city": "下一座城市",
      "m_requests": "照客人要求剪",
      "m_fix": "修好失敗的髮型",
      "m_beard": "修整鬍鬚",
      "m_rush": "和時間賽跑",
      "task_fade": "完成{n}次漸層",
      "task_beard": "修{n}次鬍鬚",
      "task_regular": "幫一位常客剪髮",
      "task_star3": "{n}次三星剪髮",
      "task_customers": "服務{n}位客人",
      "task_tips": "賺取{n}小費",
      "career": "生涯模式",
      "quick_play": "快速遊戲",
      "settings": "設定",
      "shop_name": "店名",
      "hand": "慣用手",
      "left": "左手",
      "right": "右手",
      "privacy": "隱私權政策",
      "ad_choices": "廣告設定",
      "full": "最高",
      "language": "語言",
      "shops": "店面",
      "parts": "部件",
      "wall": "牆面",
      "lower": "護牆板",
      "floor": "地板",
      "mat": "地墊",
      "mirror": "鏡子",
      "lights": "燈光",
      "shelf": "置物架",
      "chair": "理髮椅",
      "decor": "裝飾",
      "name": "招牌",
      "open": "營業中",
      "est": "始於{y}",
      "classic": "經典",
      "c_london": "倫敦",
      "c_tokyo": "東京",
      "c_lagos": "拉哥斯",
      "c_istanbul": "伊斯坦堡",
      "c_mexico": "墨西哥",
      "c_mumbai": "孟買",
      "shopname": "理髮店",
      "a_back": "返回",
      "a_close": "關閉",
      "a_menu": "選單",
      "a_modes": "模式",
      "a_newcust": "新客人",
      "a_goals": "目標",
      "a_dblday": "看影片，今日獎勵加倍",
      "a_chest": "開啟每週寶箱",
      "a_wear": "裝備",
      "a_onemore": "看影片再領一個",
      "a_collect": "領取",
      "a_undo": "看影片復原上一刀",
      "a_triple": "看影片，小費變三倍",
      "a_coins": "金幣",
      "a_shop": "商店",
      "a_salon": "理髮店",
      "a_gift": "禮物",
      "a_take": "領取",
      "a_dblit": "看影片加倍",
      "a_wardrobe": "裝扮",
      "a_clippers": "電剪",
      "a_robes": "圍布",
      "a_detail": "畫質",
      "a_next": "下一頁",
      "a_prev": "上一頁",
      "a_timeleft": "今日剩餘時間",
      "a_mute": "遊戲靜音",
      "a_unmute": "取消遊戲靜音",
      "arc_clipper": "電剪限位梳：點按或滑動切換，1號最短",
      "a_clipon": "電剪已開啟：在頭髮上拖曳來剪",
      "a_clipoff": "電剪已關閉：拖曳來轉動客人",
      "a_finish": "完成剪髮",
      "a_nextcust": "下一位客人",
      "a_showing": "正在展示完成的髮型",
      "a_savefail": "儲存失敗，下次操作時會自動重試",
      "a_guard": "{g}號限位梳，{mm}公釐",
      "mm": "公釐",
      "a_view": "客人髮型畫面",
      "a_turn": "拖曳來轉動客人",
      "shop": "商店",
      "collection": "作品集",
      "a_wish": "為它存金幣",
      "a_bill": "再服務{n}位客人，就要支付{c}金幣帳單",
      "make_base": "設為基本",
      "update_needed": "請更新遊戲以繼續生涯模式",
      "buy": "購買",
      "a_wishvid": "看影片領取願望清單金幣",
      "a_share": "分享髮型",
      "a_wearing": "裝備中",
      "a_wearthis": "裝備這個",
      "tut_clipper": "點按電剪來開啟",
      "tut_guard": "點按或滑動弧形條來更換限位梳",
      "tut_cut": "在頭髮上拖曳來剪",
      "boot_new_title": "需要更新遊戲",
      "boot_new_msg": "你的進度很安全。請更新到最新版本。",
      "boot_fail_title": "遊戲無法載入",
      "boot_fail_msg": "你的進度已保留。請檢查網路連線後再試一次。",
      "retry": "重試",
      "city_lagos": "拉哥斯",
      "city_kinshasa": "金夏沙",
      "city_nairobi": "奈洛比",
      "city_johannesburg": "約翰尼斯堡",
      "city_cairo": "開羅",
      "city_casablanca": "卡薩布蘭加",
      "city_london": "倫敦",
      "city_paris": "巴黎",
      "city_berlin": "柏林",
      "city_madrid": "馬德里",
      "city_warsaw": "華沙",
      "city_istanbul": "伊斯坦堡",
      "city_riyadh": "利雅德",
      "city_dubai": "杜拜",
      "city_amman": "安曼",
      "city_delhi": "德里",
      "city_mumbai": "孟買",
      "city_karachi": "喀拉蚩",
      "city_dhaka": "達卡",
      "city_colombo": "可倫坡",
      "city_tokyo": "東京",
      "city_seoul": "首爾",
      "city_shanghai": "上海",
      "city_jakarta": "雅加達",
      "city_manila": "馬尼拉",
      "city_bangkok": "曼谷",
      "city_new-york": "紐約",
      "city_los-angeles": "洛杉磯",
      "city_toronto": "多倫多",
      "city_montreal": "蒙特婁",
      "city_mexico-city": "墨西哥城",
      "city_sao-paulo": "聖保羅",
      "city_buenos-aires": "布宜諾斯艾利斯",
      "city_kingston": "京斯敦",
      "city_sydney": "雪梨",
      "city_auckland": "奧克蘭"
    },
    "tr": {
      "play": "Oyna",
      "modes": "Modlar",
      "daily": "Günlük Görev",
      "gift": "Hediye",
      "wardrobe": "Gardırop",
      "salon": "Salon",
      "styles": "Saç Modelleri",
      "regulars": "Müdavimler",
      "orders": "Siparişler",
      "freestyle": "Serbest Oyun",
      "rescue": "Kurtarma",
      "beards": "Sakallar",
      "rush": "Zamana Karşı",
      "event": "Etkinlik",
      "new": "Yeni",
      "map": "Harita",
      "tour": "Dünya Turu",
      "home": "Ana Menü",
      "choose_city": "Bir şehir seç",
      "no_customers": "Henüz müşteri yok",
      "sound": "Ses",
      "free": "Ücretsiz",
      "coins": "Altın",
      "clippers": "Makineler",
      "gowns": "Önlükler",
      "pick_city": "Şehrini seç",
      "next_city": "Sıradaki şehir",
      "m_requests": "İstediği gibi kes",
      "m_fix": "Kötü kesimi düzelt",
      "m_beard": "Sakalı şekillendir",
      "m_rush": "Süre dolmadan bitir",
      "task_fade": "{n} fade kesim yap",
      "task_beard": "{n} sakal düzelt",
      "task_regular": "Bir müdavimin saçını kes",
      "task_star3": "{n} üç yıldızlı kesim",
      "task_customers": "{n} müşteri",
      "task_tips": "{n} altın bahşiş kazan",
      "career": "Kariyer",
      "quick_play": "Hızlı Oyun",
      "settings": "Ayarlar",
      "shop_name": "Salon adı",
      "hand": "El",
      "left": "Sol",
      "right": "Sağ",
      "privacy": "Gizlilik",
      "ad_choices": "Reklam tercihleri",
      "full": "Tam",
      "language": "Dil",
      "shops": "Salonlar",
      "parts": "Parçalar",
      "wall": "Duvar",
      "lower": "Lambri",
      "floor": "Zemin",
      "mat": "Halı",
      "mirror": "Ayna",
      "lights": "Işıklar",
      "shelf": "Raf",
      "chair": "Koltuk",
      "decor": "Dekor",
      "name": "Tabela",
      "open": "Açık",
      "est": "Kuruluş {y}",
      "classic": "Klasik",
      "c_london": "Londra",
      "c_tokyo": "Tokyo",
      "c_lagos": "Lagos",
      "c_istanbul": "İstanbul",
      "c_mexico": "Meksiko",
      "c_mumbai": "Mumbai",
      "shopname": "Berber",
      "a_back": "Geri",
      "a_close": "Kapat",
      "a_menu": "Menü",
      "a_modes": "Modlar",
      "a_newcust": "Yeni müşteri",
      "a_goals": "Hedefler",
      "a_dblday": "Video izle, bugünün ödülünü ikiye katla",
      "a_chest": "Haftalık sandığı aç",
      "a_wear": "Kullan",
      "a_onemore": "Video izle, bir tane daha al",
      "a_collect": "Topla",
      "a_undo": "Video izle, son geçişi geri al",
      "a_triple": "Video izle, bahşişi üçe katla",
      "a_coins": "Altın",
      "a_shop": "Mağaza",
      "a_salon": "Salon",
      "a_gift": "Hediye",
      "a_take": "Al",
      "a_dblit": "Video izle, ikiye katla",
      "a_wardrobe": "Gardırop",
      "a_clippers": "Makineler",
      "a_robes": "Önlükler",
      "a_detail": "Ayrıntı düzeyi",
      "a_next": "Sonraki sayfa",
      "a_prev": "Önceki sayfa",
      "a_timeleft": "Bugün kalan süre",
      "a_mute": "Oyun sesini kapat",
      "a_unmute": "Oyun sesini aç",
      "arc_clipper": "Makine tarağı: dokun veya kaydır, 1 en kısası",
      "a_clipon": "Makine açık: kesmek için saçın üzerinde sürükle",
      "a_clipoff": "Makine kapalı: müşteriyi döndürmek için sürükle",
      "a_finish": "Saç kesimini bitir",
      "a_nextcust": "Sıradaki müşteri",
      "a_showing": "Bitmiş saç kesimi gösteriliyor",
      "a_savefail": "Kaydedilemedi. Bir sonraki işlemde yeniden denenecek",
      "a_guard": "Tarak {g}, {mm} milimetre",
      "mm": "mm",
      "a_view": "Müşterinin saç kesimi görünümü",
      "a_turn": "Müşteriyi döndürmek için sürükle",
      "shop": "Mağaza",
      "collection": "Koleksiyon",
      "a_wish": "Bunun için biriktir",
      "a_bill": "{c} altınlık faturaya {n} müşteri kaldı",
      "make_base": "Temel yap",
      "update_needed": "Kariyerine devam etmek için oyunu güncelle",
      "buy": "Satın al",
      "a_wishvid": "Video izle, istek listen için altın kazan",
      "a_share": "Saç kesimini paylaş",
      "a_wearing": "Kullanılıyor",
      "a_wearthis": "Bunu kullan",
      "tut_clipper": "Makineyi açmak için ona dokun",
      "tut_guard": "Tarağı değiştirmek için yaya dokun veya kaydır",
      "tut_cut": "Kesmek için saçın üzerinde sürükle",
      "boot_new_title": "Oyunun yeni sürümü gerekiyor",
      "boot_new_msg": "İlerlemen güvende. Oyunu en son sürüme güncelle.",
      "boot_fail_title": "Oyun yüklenemedi",
      "boot_fail_msg": "Kayıtlı ilerlemen korundu. Bağlantını kontrol edip tekrar dene.",
      "retry": "Tekrar dene",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinşasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Kahire",
      "city_casablanca": "Kazablanka",
      "city_london": "Londra",
      "city_paris": "Paris",
      "city_berlin": "Berlin",
      "city_madrid": "Madrid",
      "city_warsaw": "Varşova",
      "city_istanbul": "İstanbul",
      "city_riyadh": "Riyad",
      "city_dubai": "Dubai",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karaçi",
      "city_dhaka": "Dakka",
      "city_colombo": "Kolombo",
      "city_tokyo": "Tokyo",
      "city_seoul": "Seul",
      "city_shanghai": "Şanghay",
      "city_jakarta": "Cakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montreal",
      "city_mexico-city": "Meksiko",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sidney",
      "city_auckland": "Auckland"
    },
    "vi": {
      "play": "Chơi",
      "modes": "Chế độ",
      "daily": "Hằng ngày",
      "gift": "Quà",
      "wardrobe": "Tủ đồ",
      "salon": "Tiệm tóc",
      "styles": "Kiểu tóc",
      "regulars": "Khách quen",
      "orders": "Yêu cầu",
      "freestyle": "Tự do",
      "rescue": "Cứu tóc",
      "beards": "Râu",
      "rush": "Đua giờ",
      "event": "Sự kiện",
      "new": "Mới",
      "map": "Bản đồ",
      "tour": "Hành trình",
      "home": "Trang chủ",
      "choose_city": "Chọn thành phố",
      "no_customers": "Chưa có khách nào",
      "sound": "Âm thanh",
      "free": "Miễn phí",
      "coins": "Xu",
      "clippers": "Tông đơ",
      "gowns": "Áo choàng",
      "pick_city": "Chọn thành phố",
      "next_city": "Thành phố kế tiếp",
      "m_requests": "Cắt theo yêu cầu",
      "m_fix": "Sửa kiểu tóc hỏng",
      "m_beard": "Tạo dáng râu",
      "m_rush": "Đua với thời gian",
      "task_fade": "Cắt {n} kiểu fade",
      "task_beard": "Tỉa {n} bộ râu",
      "task_regular": "Cắt cho khách quen",
      "task_star3": "{n} lần cắt 3 sao",
      "task_customers": "Phục vụ {n} khách",
      "task_tips": "Kiếm {n} xu tiền tip",
      "career": "Sự nghiệp",
      "quick_play": "Chơi nhanh",
      "settings": "Cài đặt",
      "shop_name": "Tên tiệm",
      "hand": "Tay thuận",
      "left": "Trái",
      "right": "Phải",
      "privacy": "Quyền riêng tư",
      "ad_choices": "Tùy chọn quảng cáo",
      "full": "Tối đa",
      "language": "Ngôn ngữ",
      "shops": "Mẫu tiệm",
      "parts": "Nội thất",
      "wall": "Tường",
      "lower": "Ốp tường",
      "floor": "Sàn",
      "mat": "Thảm",
      "mirror": "Gương",
      "lights": "Đèn",
      "shelf": "Kệ",
      "chair": "Ghế",
      "decor": "Trang trí",
      "name": "Biển tên",
      "open": "Mở cửa",
      "est": "Từ năm {y}",
      "classic": "Cổ điển",
      "c_london": "London",
      "c_tokyo": "Tokyo",
      "c_lagos": "Lagos",
      "c_istanbul": "Istanbul",
      "c_mexico": "Mexico",
      "c_mumbai": "Mumbai",
      "shopname": "Tiệm Cắt Tóc",
      "a_back": "Quay lại",
      "a_close": "Đóng",
      "a_menu": "Menu",
      "a_modes": "Chế độ",
      "a_newcust": "Khách mới",
      "a_goals": "Nhiệm vụ",
      "a_dblday": "Xem video để nhân đôi thưởng hôm nay",
      "a_chest": "Mở rương tuần",
      "a_wear": "Trang bị",
      "a_onemore": "Xem video để nhận thêm một",
      "a_collect": "Nhận thưởng",
      "a_undo": "Xem video để hoàn tác nhát cắt cuối",
      "a_triple": "Xem video để nhân ba tiền tip",
      "a_coins": "Xu",
      "a_shop": "Cửa hàng",
      "a_salon": "Tiệm tóc",
      "a_gift": "Quà",
      "a_take": "Nhận",
      "a_dblit": "Xem video để nhân đôi",
      "a_wardrobe": "Tủ đồ",
      "a_clippers": "Tông đơ",
      "a_robes": "Áo choàng",
      "a_detail": "Mức chi tiết",
      "a_next": "Tiếp",
      "a_prev": "Trước",
      "a_timeleft": "Thời gian còn lại hôm nay",
      "a_mute": "Tắt âm thanh game",
      "a_unmute": "Bật âm thanh game",
      "arc_clipper": "Cữ tông đơ: chạm hoặc trượt, số 1 ngắn nhất",
      "a_clipon": "Tông đơ đang bật: kéo trên tóc để cắt",
      "a_clipoff": "Tông đơ đang tắt: kéo để xoay khách",
      "a_finish": "Hoàn tất kiểu tóc",
      "a_nextcust": "Khách tiếp theo",
      "a_showing": "Đang xem kiểu tóc đã hoàn tất",
      "a_savefail": "Lưu thất bại. Sẽ thử lại ở thao tác tiếp theo",
      "a_guard": "Cữ {g}, {mm} milimét",
      "mm": "mm",
      "a_view": "Khung xem tóc của khách",
      "a_turn": "Kéo để xoay khách",
      "shop": "Cửa hàng",
      "collection": "Bộ sưu tập",
      "a_wish": "Để dành cho món này",
      "a_bill": "Còn {n} khách nữa đến hóa đơn {c} xu",
      "make_base": "Đặt làm nền",
      "update_needed": "Cập nhật game để tiếp tục Sự nghiệp",
      "buy": "Mua",
      "a_wishvid": "Xem video nhận xu cho món bạn muốn",
      "a_share": "Chia sẻ kiểu tóc",
      "a_wearing": "Đang dùng",
      "a_wearthis": "Dùng mẫu này",
      "tut_clipper": "Chạm vào tông đơ để bật",
      "tut_guard": "Chạm hoặc trượt vòng cung để đổi cữ",
      "tut_cut": "Kéo trên tóc để cắt",
      "boot_new_title": "Cần cập nhật",
      "boot_new_msg": "Tiến trình của bạn vẫn an toàn. Hãy cập nhật lên bản mới nhất.",
      "boot_fail_title": "Không thể tải game",
      "boot_fail_msg": "Tiến trình của bạn vẫn được giữ. Hãy kiểm tra kết nối và thử lại.",
      "retry": "Thử lại",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Cairo",
      "city_casablanca": "Casablanca",
      "city_london": "London",
      "city_paris": "Paris",
      "city_berlin": "Berlin",
      "city_madrid": "Madrid",
      "city_warsaw": "Warszawa",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Riyadh",
      "city_dubai": "Dubai",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karachi",
      "city_dhaka": "Dhaka",
      "city_colombo": "Colombo",
      "city_tokyo": "Tokyo",
      "city_seoul": "Seoul",
      "city_shanghai": "Thượng Hải",
      "city_jakarta": "Jakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montréal",
      "city_mexico-city": "TP. México",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "hi": {
      "play": "खेलें",
      "modes": "मोड",
      "daily": "रोज़ाना",
      "gift": "गिफ़्ट",
      "wardrobe": "अलमारी",
      "salon": "सैलून",
      "styles": "स्टाइल",
      "regulars": "पक्के ग्राहक",
      "orders": "ऑर्डर",
      "freestyle": "फ़्रीस्टाइल",
      "rescue": "बचाव",
      "beards": "दाढ़ी",
      "rush": "फटाफट",
      "event": "इवेंट",
      "new": "नया",
      "map": "नक्शा",
      "tour": "टूर",
      "home": "होम",
      "choose_city": "शहर चुनें",
      "no_customers": "अभी कोई ग्राहक नहीं",
      "sound": "आवाज़",
      "free": "फ़्री",
      "coins": "सिक्के",
      "clippers": "क्लिपर",
      "gowns": "गाउन",
      "pick_city": "अपना शहर चुनें",
      "next_city": "अगला शहर",
      "m_requests": "जैसा कहें, वैसा काटें",
      "m_fix": "बिगड़ा कट सुधारें",
      "m_beard": "दाढ़ी सेट करें",
      "m_rush": "टाइम से पहले काटें",
      "task_fade": "{n} फ़ेड कट करें",
      "task_beard": "{n} दाढ़ी ट्रिम करें",
      "task_regular": "पक्के ग्राहक की कटिंग",
      "task_star3": "3 स्टार वाले {n} कट",
      "task_customers": "{n} ग्राहकों के बाल काटें",
      "task_tips": "टिप में {n} कमाएँ",
      "career": "करियर",
      "quick_play": "क्विक प्ले",
      "settings": "सेटिंग्स",
      "shop_name": "सैलून का नाम",
      "hand": "हाथ",
      "left": "बायाँ",
      "right": "दायाँ",
      "privacy": "गोपनीयता",
      "ad_choices": "विज्ञापन विकल्प",
      "full": "फ़ुल",
      "language": "भाषा",
      "shops": "सैलून",
      "parts": "हिस्से",
      "wall": "दीवार",
      "lower": "पैनल",
      "floor": "फ़र्श",
      "mat": "मैट",
      "mirror": "आईना",
      "lights": "लाइटें",
      "shelf": "शेल्फ़",
      "chair": "कुर्सी",
      "decor": "सजावट",
      "name": "नाम",
      "open": "खुला है",
      "est": "स्थापित {y}",
      "classic": "क्लासिक",
      "c_london": "लंदन",
      "c_tokyo": "टोक्यो",
      "c_lagos": "लागोस",
      "c_istanbul": "इस्तांबुल",
      "c_mexico": "मेक्सिको",
      "c_mumbai": "मुंबई",
      "shopname": "हेयर सैलून",
      "a_back": "वापस",
      "a_close": "बंद करें",
      "a_menu": "मेन्यू",
      "a_modes": "मोड",
      "a_newcust": "नया ग्राहक",
      "a_goals": "लक्ष्य",
      "a_dblday": "वीडियो देखें और आज का इनाम दोगुना पाएँ",
      "a_chest": "हफ़्ते का खज़ाना खोलें",
      "a_wear": "इस्तेमाल करें",
      "a_onemore": "वीडियो देखें और एक और पाएँ",
      "a_collect": "इनाम लें",
      "a_undo": "वीडियो देखें और आख़िरी कट वापस लें",
      "a_triple": "वीडियो देखें और टिप तीन गुना पाएँ",
      "a_coins": "सिक्के",
      "a_shop": "दुकान",
      "a_salon": "सैलून",
      "a_gift": "गिफ़्ट",
      "a_take": "लें",
      "a_dblit": "वीडियो देखें और दोगुना पाएँ",
      "a_wardrobe": "अलमारी",
      "a_clippers": "क्लिपर",
      "a_robes": "गाउन",
      "a_detail": "ग्राफ़िक्स क्वालिटी",
      "a_next": "अगला पेज",
      "a_prev": "पिछला पेज",
      "a_timeleft": "आज का बचा हुआ समय",
      "a_mute": "गेम की आवाज़ बंद करें",
      "a_unmute": "गेम की आवाज़ चालू करें",
      "arc_clipper": "क्लिपर गार्ड: टैप करें या खिसकाएँ, 1 सबसे छोटा काटता है",
      "a_clipon": "क्लिपर चालू: काटने के लिए बालों पर उँगली चलाएँ",
      "a_clipoff": "क्लिपर बंद: ग्राहक को घुमाने के लिए उँगली चलाएँ",
      "a_finish": "कटिंग पूरी करें",
      "a_nextcust": "अगला ग्राहक",
      "a_showing": "पूरी हुई कटिंग दिखाई जा रही है",
      "a_savefail": "सेव नहीं हुआ। अगले कदम पर अपने-आप फिर कोशिश होगी",
      "a_guard": "गार्ड {g}, {mm} मिलीमीटर",
      "mm": "मिमी",
      "a_view": "ग्राहक की कटिंग का दृश्य",
      "a_turn": "ग्राहक को घुमाने के लिए उँगली चलाएँ",
      "shop": "दुकान",
      "collection": "कलेक्शन",
      "a_wish": "इसके लिए सिक्के जोड़ें",
      "a_bill": "{c} सिक्कों के बिल से पहले {n} ग्राहक बाकी",
      "make_base": "बेस बनाएँ",
      "update_needed": "करियर जारी रखने के लिए गेम अपडेट करें",
      "buy": "खरीदें",
      "a_wishvid": "वीडियो देखें और अपनी पसंदीदा चीज़ के लिए सिक्के पाएँ",
      "a_share": "कटिंग शेयर करें",
      "a_wearing": "इस्तेमाल में",
      "a_wearthis": "इसे इस्तेमाल करें",
      "tut_clipper": "क्लिपर चालू करने के लिए उस पर टैप करें",
      "tut_guard": "गार्ड बदलने के लिए आर्क पर टैप करें या खिसकाएँ",
      "tut_cut": "काटने के लिए बालों पर उँगली चलाएँ",
      "boot_new_title": "गेम का नया वर्ज़न चाहिए",
      "boot_new_msg": "आपकी प्रोग्रेस सुरक्षित है। गेम को नए वर्ज़न पर अपडेट करें।",
      "boot_fail_title": "गेम लोड नहीं हो सका",
      "boot_fail_msg": "आपकी प्रोग्रेस सुरक्षित है। इंटरनेट कनेक्शन देखें और फिर कोशिश करें।",
      "retry": "दोबारा कोशिश",
      "city_lagos": "लागोस",
      "city_kinshasa": "किंशासा",
      "city_nairobi": "नैरोबी",
      "city_johannesburg": "जोहान्सबर्ग",
      "city_cairo": "काहिरा",
      "city_casablanca": "कासाब्लांका",
      "city_london": "लंदन",
      "city_paris": "पेरिस",
      "city_berlin": "बर्लिन",
      "city_madrid": "मैड्रिड",
      "city_warsaw": "वारसॉ",
      "city_istanbul": "इस्तांबुल",
      "city_riyadh": "रियाद",
      "city_dubai": "दुबई",
      "city_amman": "अम्मान",
      "city_delhi": "दिल्ली",
      "city_mumbai": "मुंबई",
      "city_karachi": "कराची",
      "city_dhaka": "ढाका",
      "city_colombo": "कोलंबो",
      "city_tokyo": "टोक्यो",
      "city_seoul": "सियोल",
      "city_shanghai": "शंघाई",
      "city_jakarta": "जकार्ता",
      "city_manila": "मनीला",
      "city_bangkok": "बैंकॉक",
      "city_new-york": "न्यूयॉर्क",
      "city_los-angeles": "लॉस एंजेलिस",
      "city_toronto": "टोरंटो",
      "city_montreal": "मॉन्ट्रियल",
      "city_mexico-city": "मेक्सिको सिटी",
      "city_sao-paulo": "साओ पाउलो",
      "city_buenos-aires": "ब्यूनस आयर्स",
      "city_kingston": "किंग्स्टन",
      "city_sydney": "सिडनी",
      "city_auckland": "ऑकलैंड"
    },
    "bn": {
      "play": "খেলুন",
      "modes": "মোড",
      "daily": "দৈনিক",
      "gift": "উপহার",
      "wardrobe": "আলমারি",
      "salon": "সেলুন",
      "styles": "স্টাইল",
      "regulars": "বাঁধা খদ্দের",
      "orders": "অর্ডার",
      "freestyle": "ফ্রিস্টাইল",
      "rescue": "উদ্ধার",
      "beards": "দাড়ি",
      "rush": "ঝটপট",
      "event": "ইভেন্ট",
      "new": "নতুন",
      "map": "ম্যাপ",
      "tour": "ট্যুর",
      "home": "হোম",
      "choose_city": "শহর বেছে নিন",
      "no_customers": "এখনও কোনো খদ্দের নেই",
      "sound": "শব্দ",
      "free": "ফ্রি",
      "coins": "কয়েন",
      "clippers": "ক্লিপার",
      "gowns": "গাউন",
      "pick_city": "আপনার শহর বেছে নিন",
      "next_city": "পরের শহর",
      "m_requests": "যেমন চায়, তেমন কাটুন",
      "m_fix": "খারাপ ছাঁট ঠিক করুন",
      "m_beard": "দাড়ি সাজান",
      "m_rush": "সময়ের আগে শেষ করুন",
      "task_fade": "{n}টি ফেড কাট দিন",
      "task_beard": "{n}টি দাড়ি ছাঁটুন",
      "task_regular": "বাঁধা খদ্দেরের চুল কাটুন",
      "task_star3": "তিন তারার {n}টি কাট",
      "task_customers": "{n} জন খদ্দেরের চুল কাটুন",
      "task_tips": "টিপস থেকে {n} আয় করুন",
      "career": "ক্যারিয়ার",
      "quick_play": "কুইক প্লে",
      "settings": "সেটিংস",
      "shop_name": "সেলুনের নাম",
      "hand": "হাত",
      "left": "বাম",
      "right": "ডান",
      "privacy": "গোপনীয়তা",
      "ad_choices": "বিজ্ঞাপনের পছন্দ",
      "full": "পূর্ণ",
      "language": "ভাষা",
      "shops": "সেলুন",
      "parts": "অংশ",
      "wall": "দেয়াল",
      "lower": "প্যানেল",
      "floor": "মেঝে",
      "mat": "ম্যাট",
      "mirror": "আয়না",
      "lights": "আলো",
      "shelf": "তাক",
      "chair": "চেয়ার",
      "decor": "সাজসজ্জা",
      "name": "নাম",
      "open": "খোলা",
      "est": "স্থাপিত {y}",
      "classic": "ক্লাসিক",
      "c_london": "লন্ডন",
      "c_tokyo": "টোকিও",
      "c_lagos": "লাগোস",
      "c_istanbul": "ইস্তাম্বুল",
      "c_mexico": "মেক্সিকো",
      "c_mumbai": "মুম্বাই",
      "shopname": "হেয়ার সেলুন",
      "a_back": "ফিরে যান",
      "a_close": "বন্ধ করুন",
      "a_menu": "মেনু",
      "a_modes": "মোড",
      "a_newcust": "নতুন খদ্দের",
      "a_goals": "লক্ষ্য",
      "a_dblday": "ভিডিও দেখে আজকের পুরস্কার দ্বিগুণ করুন",
      "a_chest": "সাপ্তাহিক সিন্দুক খুলুন",
      "a_wear": "ব্যবহার করুন",
      "a_onemore": "ভিডিও দেখে আরও একটি নিন",
      "a_collect": "পুরস্কার নিন",
      "a_undo": "ভিডিও দেখে শেষ কাটটা ফিরিয়ে নিন",
      "a_triple": "ভিডিও দেখে টিপস তিনগুণ করুন",
      "a_coins": "কয়েন",
      "a_shop": "দোকান",
      "a_salon": "সেলুন",
      "a_gift": "উপহার",
      "a_take": "নিন",
      "a_dblit": "ভিডিও দেখে দ্বিগুণ করুন",
      "a_wardrobe": "আলমারি",
      "a_clippers": "ক্লিপার",
      "a_robes": "গাউন",
      "a_detail": "গ্রাফিক্সের মান",
      "a_next": "পরের পাতা",
      "a_prev": "আগের পাতা",
      "a_timeleft": "আজকের বাকি সময়",
      "a_mute": "গেমের শব্দ বন্ধ করুন",
      "a_unmute": "গেমের শব্দ চালু করুন",
      "arc_clipper": "ক্লিপার গার্ড: ট্যাপ বা স্লাইড করুন, 1 সবচেয়ে ছোট কাটে",
      "a_clipon": "ক্লিপার চালু: কাটতে চুলের ওপর আঙুল টানুন",
      "a_clipoff": "ক্লিপার বন্ধ: খদ্দেরকে ঘোরাতে আঙুল টানুন",
      "a_finish": "চুলকাটা শেষ করুন",
      "a_nextcust": "পরের খদ্দের",
      "a_showing": "শেষ হওয়া ছাঁট দেখানো হচ্ছে",
      "a_savefail": "সেভ হয়নি। পরের পদক্ষেপে নিজে থেকেই আবার চেষ্টা হবে",
      "a_guard": "গার্ড {g}, {mm} মিলিমিটার",
      "mm": "মিমি",
      "a_view": "খদ্দেরের চুলকাটার দৃশ্য",
      "a_turn": "খদ্দেরকে ঘোরাতে আঙুল টানুন",
      "shop": "দোকান",
      "collection": "সংগ্রহ",
      "a_wish": "এর জন্য কয়েন জমান",
      "a_bill": "{c} কয়েনের বিলের আগে আর {n} জন খদ্দের",
      "make_base": "বেস বানান",
      "update_needed": "ক্যারিয়ার চালিয়ে যেতে গেমটি আপডেট করুন",
      "buy": "কিনুন",
      "a_wishvid": "ভিডিও দেখে পছন্দের জিনিসের জন্য কয়েন নিন",
      "a_share": "ছাঁট শেয়ার করুন",
      "a_wearing": "ব্যবহার হচ্ছে",
      "a_wearthis": "এটি ব্যবহার করুন",
      "tut_clipper": "ক্লিপার চালু করতে এতে ট্যাপ করুন",
      "tut_guard": "গার্ড বদলাতে আর্কে ট্যাপ বা স্লাইড করুন",
      "tut_cut": "কাটতে চুলের ওপর আঙুল টানুন",
      "boot_new_title": "গেমের নতুন সংস্করণ লাগবে",
      "boot_new_msg": "আপনার অগ্রগতি নিরাপদ আছে। গেমটি সর্বশেষ সংস্করণে আপডেট করুন।",
      "boot_fail_title": "গেম লোড হয়নি",
      "boot_fail_msg": "আপনার অগ্রগতি নিরাপদ আছে। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।",
      "retry": "আবার চেষ্টা",
      "city_lagos": "লাগোস",
      "city_kinshasa": "কিনশাসা",
      "city_nairobi": "নাইরোবি",
      "city_johannesburg": "জোহানেসবার্গ",
      "city_cairo": "কায়রো",
      "city_casablanca": "কাসাব্লাঙ্কা",
      "city_london": "লন্ডন",
      "city_paris": "প্যারিস",
      "city_berlin": "বার্লিন",
      "city_madrid": "মাদ্রিদ",
      "city_warsaw": "ওয়ারশ",
      "city_istanbul": "ইস্তাম্বুল",
      "city_riyadh": "রিয়াদ",
      "city_dubai": "দুবাই",
      "city_amman": "আম্মান",
      "city_delhi": "দিল্লি",
      "city_mumbai": "মুম্বাই",
      "city_karachi": "করাচি",
      "city_dhaka": "ঢাকা",
      "city_colombo": "কলম্বো",
      "city_tokyo": "টোকিও",
      "city_seoul": "সিউল",
      "city_shanghai": "সাংহাই",
      "city_jakarta": "জাকার্তা",
      "city_manila": "ম্যানিলা",
      "city_bangkok": "ব্যাংকক",
      "city_new-york": "নিউ ইয়র্ক",
      "city_los-angeles": "লস অ্যাঞ্জেলেস",
      "city_toronto": "টরন্টো",
      "city_montreal": "মন্ট্রিয়ল",
      "city_mexico-city": "মেক্সিকো সিটি",
      "city_sao-paulo": "সাও পাওলো",
      "city_buenos-aires": "বুয়েনোস আইরেস",
      "city_kingston": "কিংস্টন",
      "city_sydney": "সিডনি",
      "city_auckland": "অকল্যান্ড"
    },
    "ur": {
      "play": "کھیلیں",
      "modes": "موڈز",
      "daily": "روزانہ چیلنج",
      "gift": "تحفہ",
      "wardrobe": "الماری",
      "salon": "سیلون",
      "styles": "ہیئر اسٹائل",
      "regulars": "مستقل گاہک",
      "orders": "آرڈرز",
      "freestyle": "آزاد کھیل",
      "rescue": "بچاؤ",
      "beards": "داڑھی",
      "rush": "وقت کی دوڑ",
      "event": "ایونٹ",
      "new": "نیا",
      "map": "نقشہ",
      "tour": "سفر",
      "home": "ہوم",
      "choose_city": "شہر منتخب کریں",
      "no_customers": "ابھی کوئی گاہک نہیں",
      "sound": "آواز",
      "free": "مفت",
      "coins": "سکے",
      "clippers": "مشینیں",
      "gowns": "گاؤن",
      "pick_city": "اپنا شہر چنیں",
      "next_city": "اگلا شہر",
      "m_requests": "جیسا کہیں ویسا کاٹیں",
      "m_fix": "بگڑی کٹنگ ٹھیک کریں",
      "m_beard": "داڑھی سنواریں",
      "m_rush": "وقت سے پہلے مکمل کریں",
      "task_fade": "{n} فیڈ کٹنگ کریں",
      "task_beard": "{n} داڑھیاں سنواریں",
      "task_beard#one": "{n} داڑھی سنواریں",
      "task_regular": "مستقل گاہک کی کٹنگ کریں",
      "task_star3": "{n} تین اسٹار کٹنگ",
      "task_customers": "{n} گاہکوں کی کٹنگ",
      "task_customers#one": "{n} گاہک کی کٹنگ",
      "task_tips": "ٹپ میں {n} کمائیں",
      "career": "کیریئر",
      "quick_play": "فوری کھیل",
      "settings": "ترتیبات",
      "shop_name": "سیلون کا نام",
      "hand": "ہاتھ",
      "left": "بایاں",
      "right": "دایاں",
      "privacy": "رازداری",
      "ad_choices": "اشتہاری ترجیحات",
      "full": "مکمل",
      "language": "زبان",
      "shops": "سیلون",
      "parts": "سامان",
      "wall": "دیوار",
      "lower": "پینل",
      "floor": "فرش",
      "mat": "قالین",
      "mirror": "آئینہ",
      "lights": "روشنیاں",
      "shelf": "شیلف",
      "chair": "کرسی",
      "decor": "سجاوٹ",
      "name": "نام",
      "open": "کھلا ہے",
      "est": "{y} سے",
      "classic": "کلاسک",
      "c_london": "لندن",
      "c_tokyo": "ٹوکیو",
      "c_lagos": "لاگوس",
      "c_istanbul": "استنبول",
      "c_mexico": "میکسیکو",
      "c_mumbai": "ممبئی",
      "shopname": "باربر شاپ",
      "a_back": "واپس",
      "a_close": "بند کریں",
      "a_menu": "مینو",
      "a_modes": "موڈز",
      "a_newcust": "نیا گاہک",
      "a_goals": "اہداف",
      "a_dblday": "ویڈیو دیکھیں اور آج کا انعام دگنا کریں",
      "a_chest": "ہفتہ وار صندوق کھولیں",
      "a_wear": "استعمال کریں",
      "a_onemore": "ویڈیو دیکھیں اور ایک اور پائیں",
      "a_collect": "وصول کریں",
      "a_undo": "ویڈیو دیکھیں اور آخری اسٹروک واپس لیں",
      "a_triple": "ویڈیو دیکھیں اور ٹپ تین گنا کریں",
      "a_coins": "سکے",
      "a_shop": "اسٹور",
      "a_salon": "سیلون",
      "a_gift": "تحفہ",
      "a_take": "حاصل کریں",
      "a_dblit": "ویڈیو دیکھیں اور دگنا پائیں",
      "a_wardrobe": "الماری",
      "a_clippers": "مشینیں",
      "a_robes": "گاؤن",
      "a_detail": "تفصیل کی سطح",
      "a_next": "اگلا",
      "a_prev": "پچھلا",
      "a_timeleft": "آج کا باقی وقت",
      "a_mute": "گیم کی آواز بند کریں",
      "a_unmute": "گیم کی آواز کھولیں",
      "arc_clipper": "مشین کا گارڈ: ٹیپ یا سلائیڈ کریں، 1 سب سے چھوٹا",
      "a_clipon": "مشین آن: کاٹنے کے لیے بالوں پر گھسیٹیں",
      "a_clipoff": "مشین آف: گاہک کو گھمانے کے لیے گھسیٹیں",
      "a_finish": "کٹنگ مکمل کریں",
      "a_nextcust": "اگلا گاہک",
      "a_showing": "مکمل کٹنگ دکھائی جا رہی ہے",
      "a_savefail": "محفوظ نہیں ہو سکا۔ اگلے قدم پر دوبارہ کوشش ہوگی",
      "a_guard": "گارڈ {g}، {mm} ملی میٹر",
      "mm": "ملی میٹر",
      "a_view": "گاہک کی کٹنگ کا منظر",
      "a_turn": "گاہک کو گھمانے کے لیے گھسیٹیں",
      "shop": "اسٹور",
      "collection": "میرا کام",
      "a_wish": "اس کے لیے بچت کریں",
      "a_bill": "{c} سکوں کے بل تک {n} گاہک",
      "make_base": "بنیاد بنائیں",
      "update_needed": "کیریئر جاری رکھنے کے لیے گیم اپ ڈیٹ کریں",
      "buy": "خریدیں",
      "a_wishvid": "ویڈیو دیکھیں اور پسندیدہ چیز کے لیے سکے پائیں",
      "a_share": "کٹنگ شیئر کریں",
      "a_wearing": "زیر استعمال",
      "a_wearthis": "یہ استعمال کریں",
      "tut_clipper": "مشین آن کرنے کے لیے اس پر ٹیپ کریں",
      "tut_guard": "گارڈ بدلنے کے لیے قوس پر ٹیپ یا سلائیڈ کریں",
      "tut_cut": "کاٹنے کے لیے بالوں پر گھسیٹیں",
      "boot_new_title": "گیم کا نیا ورژن درکار ہے",
      "boot_new_msg": "آپ کی پیش رفت محفوظ ہے۔ تازہ ترین ورژن پر اپ ڈیٹ کریں۔",
      "boot_fail_title": "گیم لوڈ نہیں ہو سکی",
      "boot_fail_msg": "آپ کی پیش رفت محفوظ ہے۔ کنکشن چیک کریں اور دوبارہ کوشش کریں۔",
      "retry": "دوبارہ کوشش",
      "city_lagos": "لاگوس",
      "city_kinshasa": "کنشاسا",
      "city_nairobi": "نیروبی",
      "city_johannesburg": "جوہانسبرگ",
      "city_cairo": "قاہرہ",
      "city_casablanca": "کاسابلانکا",
      "city_london": "لندن",
      "city_paris": "پیرس",
      "city_berlin": "برلن",
      "city_madrid": "میڈرڈ",
      "city_warsaw": "وارسا",
      "city_istanbul": "استنبول",
      "city_riyadh": "ریاض",
      "city_dubai": "دبئی",
      "city_amman": "عمان",
      "city_delhi": "دہلی",
      "city_mumbai": "ممبئی",
      "city_karachi": "کراچی",
      "city_dhaka": "ڈھاکہ",
      "city_colombo": "کولمبو",
      "city_tokyo": "ٹوکیو",
      "city_seoul": "سیول",
      "city_shanghai": "شنگھائی",
      "city_jakarta": "جکارتہ",
      "city_manila": "منیلا",
      "city_bangkok": "بینکاک",
      "city_new-york": "نیویارک",
      "city_los-angeles": "لاس اینجلس",
      "city_toronto": "ٹورنٹو",
      "city_montreal": "مونٹریال",
      "city_mexico-city": "میکسیکو سٹی",
      "city_sao-paulo": "ساؤ پاؤلو",
      "city_buenos-aires": "بیونس آئرس",
      "city_kingston": "کنگسٹن",
      "city_sydney": "سڈنی",
      "city_auckland": "آکلینڈ"
    },
    "ta": {
      "play": "விளையாடு",
      "modes": "மோடுகள்",
      "daily": "தினசரி",
      "gift": "பரிசு",
      "wardrobe": "அலமாரி",
      "salon": "சலூன்",
      "styles": "ஸ்டைல்கள்",
      "regulars": "ரெகுலர்கள்",
      "orders": "ஆர்டர்கள்",
      "freestyle": "ஃப்ரீஸ்டைல்",
      "rescue": "மீட்பு",
      "beards": "தாடி",
      "rush": "அவசரம்",
      "event": "நிகழ்வு",
      "new": "புதிது",
      "map": "வரைபடம்",
      "tour": "சுற்றுலா",
      "home": "முகப்பு",
      "choose_city": "நகரத்தைத் தேர்வுசெய்யவும்",
      "no_customers": "இன்னும் வாடிக்கையாளர்கள் இல்லை",
      "sound": "ஒலி",
      "free": "இலவசம்",
      "coins": "நாணயங்கள்",
      "clippers": "கிளிப்பர்",
      "gowns": "கவுன்",
      "pick_city": "நகரைத் தேர்வுசெய்க",
      "next_city": "அடுத்த நகரம்",
      "m_requests": "கேட்டபடி வெட்டவும்",
      "m_fix": "கெட்ட கட்டிங்கைச் சரிசெய்யவும்",
      "m_beard": "தாடியை வடிவமைக்கவும்",
      "m_rush": "நேரத்தை வெல்லவும்",
      "task_fade": "{n} ஃபேட் கட் செய்யவும்",
      "task_beard": "{n} தாடி ட்ரிம் செய்யவும்",
      "task_regular": "ரெகுலருக்கு முடிவெட்டவும்",
      "task_star3": "{n} 3-நட்சத்திர கட்டிங்",
      "task_customers": "{n} பேருக்கு முடிவெட்டவும்",
      "task_tips": "டிப்ஸில் {n} பெறவும்",
      "career": "கேரியர்",
      "quick_play": "குயிக் ப்ளே",
      "settings": "அமைப்புகள்",
      "shop_name": "சலூன் பெயர்",
      "hand": "கை",
      "left": "இடது",
      "right": "வலது",
      "privacy": "தனியுரிமை",
      "ad_choices": "விளம்பரத் தேர்வுகள்",
      "full": "முழு",
      "language": "மொழி",
      "shops": "சலூன்கள்",
      "parts": "பாகங்கள்",
      "wall": "சுவர்",
      "lower": "பேனல்கள்",
      "floor": "தரை",
      "mat": "மிதியடி",
      "mirror": "கண்ணாடி",
      "lights": "விளக்குகள்",
      "shelf": "ஷெல்ஃப்",
      "chair": "நாற்காலி",
      "decor": "அலங்காரம்",
      "name": "பெயர்",
      "open": "திறந்துள்ளது",
      "est": "{y} முதல்",
      "classic": "கிளாசிக்",
      "c_london": "லண்டன்",
      "c_tokyo": "டோக்கியோ",
      "c_lagos": "லாகோஸ்",
      "c_istanbul": "இஸ்தான்புல்",
      "c_mexico": "மெக்சிகோ",
      "c_mumbai": "மும்பை",
      "shopname": "முடிதிருத்தகம்",
      "a_back": "பின் செல்லவும்",
      "a_close": "மூடவும்",
      "a_menu": "மெனு",
      "a_modes": "மோடுகள்",
      "a_newcust": "புதிய வாடிக்கையாளர்",
      "a_goals": "இலக்குகள்",
      "a_dblday": "வீடியோ பார்த்து இன்றைய வெகுமதியை இரட்டிப்பாக்கவும்",
      "a_chest": "வாராந்திரப் பெட்டியைத் திறக்கவும்",
      "a_wear": "பயன்படுத்தவும்",
      "a_onemore": "வீடியோ பார்த்து இன்னொன்றைப் பெறவும்",
      "a_collect": "வெகுமதியைப் பெறவும்",
      "a_undo": "வீடியோ பார்த்து கடைசி வெட்டை ரத்து செய்யவும்",
      "a_triple": "வீடியோ பார்த்து டிப்ஸை மூன்று மடங்காக்கவும்",
      "a_coins": "நாணயங்கள்",
      "a_shop": "கடை",
      "a_salon": "சலூன்",
      "a_gift": "பரிசு",
      "a_take": "பெறவும்",
      "a_dblit": "வீடியோ பார்த்து இரட்டிப்பாக்கவும்",
      "a_wardrobe": "அலமாரி",
      "a_clippers": "கிளிப்பர்கள்",
      "a_robes": "கவுன்கள்",
      "a_detail": "கிராஃபிக்ஸ் தரம்",
      "a_next": "அடுத்த பக்கம்",
      "a_prev": "முந்தைய பக்கம்",
      "a_timeleft": "இன்று மீதமுள்ள நேரம்",
      "a_mute": "கேம் ஒலியை அணைக்கவும்",
      "a_unmute": "கேம் ஒலியை இயக்கவும்",
      "arc_clipper": "கிளிப்பர் கார்டு: தட்டவும் அல்லது நகர்த்தவும், 1 மிகக் குட்டையாக வெட்டும்",
      "a_clipon": "கிளிப்பர் இயக்கத்தில்: வெட்ட முடியின் மேல் இழுக்கவும்",
      "a_clipoff": "கிளிப்பர் அணைப்பில்: வாடிக்கையாளரைத் திருப்ப இழுக்கவும்",
      "a_finish": "கட்டிங்கை முடிக்கவும்",
      "a_nextcust": "அடுத்த வாடிக்கையாளர்",
      "a_showing": "முடிந்த கட்டிங் காட்டப்படுகிறது",
      "a_savefail": "சேமிக்க முடியவில்லை. அடுத்த செயலில் தானாக மீண்டும் முயலும்",
      "a_guard": "கார்டு {g}, {mm} மில்லிமீட்டர்",
      "mm": "மி.மீ.",
      "a_view": "வாடிக்கையாளரின் கட்டிங் காட்சி",
      "a_turn": "வாடிக்கையாளரைத் திருப்ப இழுக்கவும்",
      "shop": "கடை",
      "collection": "சேகரிப்பு",
      "a_wish": "இதற்காக நாணயம் சேர்க்கவும்",
      "a_bill": "{c} நாணய பில்லுக்கு இன்னும் {n} பேர்",
      "make_base": "பேஸ் ஆக்கு",
      "update_needed": "கேரியரைத் தொடர கேமைப் புதுப்பிக்கவும்",
      "buy": "வாங்கு",
      "a_wishvid": "வீடியோ பார்த்து விருப்பப் பட்டியலுக்கு நாணயங்கள் பெறவும்",
      "a_share": "கட்டிங்கைப் பகிரவும்",
      "a_wearing": "பயன்பாட்டில் உள்ளது",
      "a_wearthis": "இதைப் பயன்படுத்தவும்",
      "tut_clipper": "கிளிப்பரை இயக்க அதைத் தட்டவும்",
      "tut_guard": "கார்டை மாற்ற வளைவைத் தட்டவும் அல்லது நகர்த்தவும்",
      "tut_cut": "வெட்ட முடியின் மேல் இழுக்கவும்",
      "boot_new_title": "கேமின் புதிய பதிப்பு தேவை",
      "boot_new_msg": "உங்கள் முன்னேற்றம் பாதுகாப்பாக உள்ளது. புதிய பதிப்புக்குப் புதுப்பிக்கவும்.",
      "boot_fail_title": "கேமை ஏற்ற முடியவில்லை",
      "boot_fail_msg": "சேமித்த முன்னேற்றம் பாதுகாப்பாக உள்ளது. இணைப்பைச் சரிபார்த்து மீண்டும் முயலவும்.",
      "retry": "மறுமுயற்சி",
      "city_lagos": "லாகோஸ்",
      "city_kinshasa": "கின்ஷாசா",
      "city_nairobi": "நைரோபி",
      "city_johannesburg": "ஜோகன்னஸ்பர்க்",
      "city_cairo": "கெய்ரோ",
      "city_casablanca": "காசாபிளாங்கா",
      "city_london": "லண்டன்",
      "city_paris": "பாரிஸ்",
      "city_berlin": "பெர்லின்",
      "city_madrid": "மாட்ரிட்",
      "city_warsaw": "வார்சா",
      "city_istanbul": "இஸ்தான்புல்",
      "city_riyadh": "ரியாத்",
      "city_dubai": "துபாய்",
      "city_amman": "அம்மான்",
      "city_delhi": "டெல்லி",
      "city_mumbai": "மும்பை",
      "city_karachi": "கராச்சி",
      "city_dhaka": "டாக்கா",
      "city_colombo": "கொழும்பு",
      "city_tokyo": "டோக்கியோ",
      "city_seoul": "சியோல்",
      "city_shanghai": "ஷாங்காய்",
      "city_jakarta": "ஜகார்த்தா",
      "city_manila": "மணிலா",
      "city_bangkok": "பாங்காக்",
      "city_new-york": "நியூயார்க்",
      "city_los-angeles": "லாஸ் ஏஞ்சலஸ்",
      "city_toronto": "டொராண்டோ",
      "city_montreal": "மாண்ட்ரியல்",
      "city_mexico-city": "மெக்சிகோ சிட்டி",
      "city_sao-paulo": "சாவோ பாலோ",
      "city_buenos-aires": "புவெனஸ் ஐரிஸ்",
      "city_kingston": "கிங்ஸ்டன்",
      "city_sydney": "சிட்னி",
      "city_auckland": "ஆக்லாந்து"
    },
    "fil": {
      "play": "Maglaro",
      "modes": "Mga Mode",
      "daily": "Araw-araw",
      "gift": "Regalo",
      "wardrobe": "Aparador",
      "salon": "Barberya",
      "styles": "Mga Estilo",
      "regulars": "Mga Suki",
      "orders": "Mga Order",
      "freestyle": "Malayang Laro",
      "rescue": "Sagip-Gupit",
      "beards": "Balbas",
      "rush": "Bilisan",
      "event": "Event",
      "new": "Bago",
      "map": "Mapa",
      "tour": "Paglalakbay",
      "home": "Home",
      "choose_city": "Pumili ng lungsod",
      "no_customers": "Wala pang customer",
      "sound": "Tunog",
      "free": "Libre",
      "coins": "Coins",
      "clippers": "Clipper",
      "gowns": "Kapa",
      "pick_city": "Piliin ang lungsod",
      "next_city": "Susunod na lungsod",
      "m_requests": "Gupitin ang hiling nila",
      "m_fix": "Ayusin ang palpak na gupit",
      "m_beard": "Hubugin ang balbas",
      "m_rush": "Talunin ang oras",
      "task_fade": "Gumawa ng {n} fade",
      "task_beard": "Mag-trim ng {n} balbas",
      "task_regular": "Gupitan ang isang suki",
      "task_star3": "{n} gupit na 3-star",
      "task_customers": "Gupitan ang {n} customer",
      "task_tips": "Kumita ng {n} tip",
      "career": "Career",
      "quick_play": "Mabilisang Laro",
      "settings": "Mga Setting",
      "shop_name": "Pangalan ng barberya",
      "hand": "Kamay",
      "left": "Kaliwa",
      "right": "Kanan",
      "privacy": "Privacy",
      "ad_choices": "Mga pagpipilian sa ad",
      "full": "Pinakamataas",
      "language": "Wika",
      "shops": "Barberya",
      "parts": "Mga Parte",
      "wall": "Pader",
      "lower": "Panel",
      "floor": "Sahig",
      "mat": "Alpombra",
      "mirror": "Salamin",
      "lights": "Ilaw",
      "shelf": "Istante",
      "chair": "Upuan",
      "decor": "Dekorasyon",
      "name": "Pangalan",
      "open": "Bukas",
      "est": "Mula {y}",
      "classic": "Klasiko",
      "c_london": "London",
      "c_tokyo": "Tokyo",
      "c_lagos": "Lagos",
      "c_istanbul": "Istanbul",
      "c_mexico": "Mexico",
      "c_mumbai": "Mumbai",
      "shopname": "Barberya",
      "a_back": "Bumalik",
      "a_close": "Isara",
      "a_menu": "Menu",
      "a_modes": "Mga Mode",
      "a_newcust": "Bagong customer",
      "a_goals": "Mga Misyon",
      "a_dblday": "Manood ng video para doble ang reward ngayong araw",
      "a_chest": "Buksan ang lingguhang chest",
      "a_wear": "Gamitin",
      "a_onemore": "Manood ng video para sa isa pa",
      "a_collect": "I-claim",
      "a_undo": "Manood ng video para bawiin ang huling galaw",
      "a_triple": "Manood ng video para triple ang tip",
      "a_coins": "Coins",
      "a_shop": "Tindahan",
      "a_salon": "Barberya",
      "a_gift": "Regalo",
      "a_take": "Kunin",
      "a_dblit": "Manood ng video para doblehin ito",
      "a_wardrobe": "Aparador",
      "a_clippers": "Mga Clipper",
      "a_robes": "Mga Kapa",
      "a_detail": "Antas ng detalye",
      "a_next": "Susunod",
      "a_prev": "Nakaraan",
      "a_timeleft": "Natitirang oras ngayong araw",
      "a_mute": "I-mute ang tunog ng laro",
      "a_unmute": "I-unmute ang tunog ng laro",
      "arc_clipper": "Guard ng clipper: i-tap o i-slide, 1 ang pinakamaikli",
      "a_clipon": "Naka-on ang clipper: i-drag sa buhok para gupitin",
      "a_clipoff": "Naka-off ang clipper: i-drag para iikot ang customer",
      "a_finish": "Tapusin ang gupit",
      "a_nextcust": "Susunod na customer",
      "a_showing": "Ipinapakita ang tapos na gupit",
      "a_savefail": "Hindi na-save. Susubukan ulit sa susunod mong galaw",
      "a_guard": "Guard {g}, {mm} milimetro",
      "mm": "mm",
      "a_view": "View ng gupit ng customer",
      "a_turn": "I-drag para iikot ang customer",
      "shop": "Tindahan",
      "collection": "Koleksyon",
      "a_wish": "Pag-ipunan ito",
      "a_bill": "{n} customer pa bago ang bayaring {c} coins",
      "make_base": "Gawing base",
      "update_needed": "I-update ang laro para ituloy ang Career",
      "buy": "Bilhin",
      "a_wishvid": "Manood ng video para sa coins sa gusto mong item",
      "a_share": "I-share ang gupit",
      "a_wearing": "Ginagamit",
      "a_wearthis": "Gamitin ito",
      "tut_clipper": "I-tap ang clipper para i-on",
      "tut_guard": "I-tap o i-slide ang arc para palitan ang guard",
      "tut_cut": "I-drag sa buhok para gupitin",
      "boot_new_title": "Kailangang mag-update",
      "boot_new_msg": "Ligtas ang progress mo. Mag-update sa pinakabagong bersyon.",
      "boot_fail_title": "Hindi ma-load ang laro",
      "boot_fail_msg": "Naka-save pa rin ang progress mo. I-check ang koneksyon at subukan ulit.",
      "retry": "Subukan ulit",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Cairo",
      "city_casablanca": "Casablanca",
      "city_london": "London",
      "city_paris": "Paris",
      "city_berlin": "Berlin",
      "city_madrid": "Madrid",
      "city_warsaw": "Warsaw",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Riyadh",
      "city_dubai": "Dubai",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karachi",
      "city_dhaka": "Dhaka",
      "city_colombo": "Colombo",
      "city_tokyo": "Tokyo",
      "city_seoul": "Seoul",
      "city_shanghai": "Shanghai",
      "city_jakarta": "Jakarta",
      "city_manila": "Maynila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montreal",
      "city_mexico-city": "Mexico City",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "uk": {
      "play": "Грати",
      "modes": "Режими",
      "daily": "Завдання дня",
      "gift": "Подарунок",
      "wardrobe": "Гардероб",
      "salon": "Салон",
      "styles": "Стрижки",
      "regulars": "Постійні",
      "orders": "Замовлення",
      "freestyle": "Вільна гра",
      "rescue": "Порятунок",
      "beards": "Бороди",
      "rush": "Година пік",
      "event": "Подія",
      "new": "Нове",
      "map": "Карта",
      "tour": "Турне",
      "home": "Головна",
      "choose_city": "Обери місто",
      "no_customers": "Клієнтів поки немає",
      "sound": "Звук",
      "free": "Безплатно",
      "coins": "Монети",
      "clippers": "Машинки",
      "gowns": "Накидки",
      "pick_city": "Обери своє місто",
      "next_city": "Наступне місто",
      "m_requests": "Стрижи на замовлення",
      "m_fix": "Виправ невдалу стрижку",
      "m_beard": "Оформи бороду",
      "m_rush": "Встигни вчасно",
      "task_fade": "Зроби {n} фейдів",
      "task_fade#one": "Зроби {n} фейд",
      "task_fade#few": "Зроби {n} фейди",
      "task_fade#many": "Зроби {n} фейдів",
      "task_beard": "Підрівняй {n} борід",
      "task_beard#one": "Підрівняй {n} бороду",
      "task_beard#few": "Підрівняй {n} бороди",
      "task_beard#many": "Підрівняй {n} борід",
      "task_regular": "Постриж постійного",
      "task_star3": "{n} стрижок на 3 зірки",
      "task_star3#one": "{n} стрижка на 3 зірки",
      "task_star3#few": "{n} стрижки на 3 зірки",
      "task_star3#many": "{n} стрижок на 3 зірки",
      "task_customers": "{n} клієнтів",
      "task_customers#one": "{n} клієнт",
      "task_customers#few": "{n} клієнти",
      "task_customers#many": "{n} клієнтів",
      "task_tips": "Збери {n} монет чайових",
      "task_tips#one": "Збери {n} монету чайових",
      "task_tips#few": "Збери {n} монети чайових",
      "task_tips#many": "Збери {n} монет чайових",
      "career": "Кар’єра",
      "quick_play": "Швидка гра",
      "settings": "Налаштування",
      "shop_name": "Назва салону",
      "hand": "Рука",
      "left": "Ліва",
      "right": "Права",
      "privacy": "Конфіденційність",
      "ad_choices": "Налаштування реклами",
      "full": "Повна",
      "language": "Мова",
      "shops": "Салони",
      "parts": "Деталі",
      "wall": "Стіна",
      "lower": "Панелі",
      "floor": "Підлога",
      "mat": "Килимок",
      "mirror": "Дзеркало",
      "lights": "Світло",
      "shelf": "Полиця",
      "chair": "Крісло",
      "decor": "Декор",
      "name": "Вивіска",
      "open": "Відчинено",
      "est": "З {y} року",
      "classic": "Класика",
      "c_london": "Лондон",
      "c_tokyo": "Токіо",
      "c_lagos": "Лагос",
      "c_istanbul": "Стамбул",
      "c_mexico": "Мехіко",
      "c_mumbai": "Мумбаї",
      "shopname": "Барбершоп",
      "a_back": "Назад",
      "a_close": "Закрити",
      "a_menu": "Меню",
      "a_modes": "Режими",
      "a_newcust": "Новий клієнт",
      "a_goals": "Цілі",
      "a_dblday": "Подивись відео й подвой нагороду дня",
      "a_chest": "Відкрити тижневу скриню",
      "a_wear": "Обрати",
      "a_onemore": "Подивись відео й отримай ще один",
      "a_collect": "Забрати",
      "a_undo": "Подивись відео й скасуй останній прохід",
      "a_triple": "Подивись відео й потрой чайові",
      "a_coins": "Монети",
      "a_shop": "Магазин",
      "a_salon": "Салон",
      "a_gift": "Подарунок",
      "a_take": "Взяти",
      "a_dblit": "Подивись відео й подвой",
      "a_wardrobe": "Гардероб",
      "a_clippers": "Машинки",
      "a_robes": "Накидки",
      "a_detail": "Деталізація",
      "a_next": "Наступна сторінка",
      "a_prev": "Попередня сторінка",
      "a_timeleft": "До кінця дня",
      "a_mute": "Вимкнути звук гри",
      "a_unmute": "Увімкнути звук гри",
      "arc_clipper": "Насадка: торкнись або проведи, 1 — найкоротша",
      "a_clipon": "Машинку ввімкнено: проведи по волоссю, щоб стригти",
      "a_clipoff": "Машинку вимкнено: проведи, щоб повернути клієнта",
      "a_finish": "Завершити стрижку",
      "a_nextcust": "Наступний клієнт",
      "a_showing": "Показ готової стрижки",
      "a_savefail": "Не вдалося зберегти. Спробуємо ще раз під час наступної дії",
      "a_guard": "Насадка {g}, {mm} мм",
      "mm": "мм",
      "a_view": "Вигляд стрижки клієнта",
      "a_turn": "Проведи, щоб повернути клієнта",
      "shop": "Магазин",
      "collection": "Колекція",
      "a_wish": "Збирати на це",
      "a_bill": "Ще {n} клієнтів до рахунку на {c}",
      "a_bill#one": "Ще {n} клієнт до рахунку на {c}",
      "a_bill#few": "Ще {n} клієнти до рахунку на {c}",
      "a_bill#many": "Ще {n} клієнтів до рахунку на {c}",
      "make_base": "За основу",
      "update_needed": "Онови гру, щоб продовжити кар’єру",
      "buy": "Купити",
      "a_wishvid": "Подивись відео й отримай монети на бажану покупку",
      "a_share": "Поділитися стрижкою",
      "a_wearing": "Обрано",
      "a_wearthis": "Обрати це",
      "tut_clipper": "Торкнись машинки, щоб увімкнути її",
      "tut_guard": "Торкнись або проведи по дузі, щоб змінити насадку",
      "tut_cut": "Проведи по волоссю, щоб стригти",
      "boot_new_title": "Потрібна новіша версія гри",
      "boot_new_msg": "Твій прогрес збережено. Онови гру до останньої версії.",
      "boot_fail_title": "Не вдалося завантажити гру",
      "boot_fail_msg": "Твій прогрес збережено. Перевір з’єднання і спробуй ще раз.",
      "retry": "Повторити",
      "city_lagos": "Лагос",
      "city_kinshasa": "Кіншаса",
      "city_nairobi": "Найробі",
      "city_johannesburg": "Йоганнесбург",
      "city_cairo": "Каїр",
      "city_casablanca": "Касабланка",
      "city_london": "Лондон",
      "city_paris": "Париж",
      "city_berlin": "Берлін",
      "city_madrid": "Мадрид",
      "city_warsaw": "Варшава",
      "city_istanbul": "Стамбул",
      "city_riyadh": "Ер-Ріяд",
      "city_dubai": "Дубай",
      "city_amman": "Амман",
      "city_delhi": "Делі",
      "city_mumbai": "Мумбаї",
      "city_karachi": "Карачі",
      "city_dhaka": "Дакка",
      "city_colombo": "Коломбо",
      "city_tokyo": "Токіо",
      "city_seoul": "Сеул",
      "city_shanghai": "Шанхай",
      "city_jakarta": "Джакарта",
      "city_manila": "Маніла",
      "city_bangkok": "Бангкок",
      "city_new-york": "Нью-Йорк",
      "city_los-angeles": "Лос-Анджелес",
      "city_toronto": "Торонто",
      "city_montreal": "Монреаль",
      "city_mexico-city": "Мехіко",
      "city_sao-paulo": "Сан-Паулу",
      "city_buenos-aires": "Буенос-Айрес",
      "city_kingston": "Кінгстон",
      "city_sydney": "Сідней",
      "city_auckland": "Окленд"
    },
    "fa": {
      "play": "بازی کن",
      "modes": "حالت‌ها",
      "daily": "چالش روزانه",
      "gift": "هدیه",
      "wardrobe": "کمد",
      "salon": "آرایشگاه",
      "styles": "مدل‌های مو",
      "regulars": "مشتری‌های ثابت",
      "orders": "سفارش‌ها",
      "freestyle": "بازی آزاد",
      "rescue": "نجات",
      "beards": "ریش",
      "rush": "مسابقه با زمان",
      "event": "رویداد",
      "new": "جدید",
      "map": "نقشه",
      "tour": "سفر",
      "home": "خانه",
      "choose_city": "یک شهر انتخاب کن",
      "no_customers": "هنوز مشتری نداری",
      "sound": "صدا",
      "free": "رایگان",
      "coins": "سکه‌ها",
      "clippers": "ماشین‌ها",
      "gowns": "پیش‌بندها",
      "pick_city": "شهرت را انتخاب کن",
      "next_city": "شهر بعدی",
      "m_requests": "طبق سفارش اصلاح کن",
      "m_fix": "یک مدل خراب را درست کن",
      "m_beard": "ریش را فرم بده",
      "m_rush": "از زمان جلو بزن",
      "task_fade": "{n} مدل فید بزن",
      "task_beard": "{n} ریش را مرتب کن",
      "task_regular": "موی یک مشتری ثابت را بزن",
      "task_star3": "{n} اصلاح سه‌ستاره",
      "task_customers": "{n} مشتری را راه بینداز",
      "task_tips": "{n} سکه انعام بگیر",
      "career": "مسیر حرفه‌ای",
      "quick_play": "بازی سریع",
      "settings": "تنظیمات",
      "shop_name": "نام آرایشگاه",
      "hand": "دست",
      "left": "چپ",
      "right": "راست",
      "privacy": "حریم خصوصی",
      "ad_choices": "تنظیمات تبلیغات",
      "full": "کامل",
      "language": "زبان",
      "shops": "سالن‌ها",
      "parts": "وسایل",
      "wall": "دیوار",
      "lower": "دیوارپوش",
      "floor": "کف",
      "mat": "فرش",
      "mirror": "آینه",
      "lights": "چراغ‌ها",
      "shelf": "قفسه",
      "chair": "صندلی",
      "decor": "تزئینات",
      "name": "نام",
      "open": "باز است",
      "est": "تأسیس {y}",
      "classic": "کلاسیک",
      "c_london": "لندن",
      "c_tokyo": "توکیو",
      "c_lagos": "لاگوس",
      "c_istanbul": "استانبول",
      "c_mexico": "مکزیک",
      "c_mumbai": "بمبئی",
      "shopname": "آرایشگاه",
      "a_back": "بازگشت",
      "a_close": "بستن",
      "a_menu": "منو",
      "a_modes": "حالت‌ها",
      "a_newcust": "مشتری جدید",
      "a_goals": "هدف‌ها",
      "a_dblday": "ویدیو ببین و جایزهٔ امروز را دو برابر کن",
      "a_chest": "صندوق هفتگی را باز کن",
      "a_wear": "استفاده کن",
      "a_onemore": "ویدیو ببین و یکی دیگر بگیر",
      "a_collect": "دریافت",
      "a_undo": "ویدیو ببین و آخرین حرکت را برگردان",
      "a_triple": "ویدیو ببین و انعام را سه برابر کن",
      "a_coins": "سکه‌ها",
      "a_shop": "فروشگاه",
      "a_salon": "آرایشگاه",
      "a_gift": "هدیه",
      "a_take": "بگیرش",
      "a_dblit": "ویدیو ببین و دو برابرش کن",
      "a_wardrobe": "کمد",
      "a_clippers": "ماشین‌ها",
      "a_robes": "پیش‌بندها",
      "a_detail": "سطح جزئیات",
      "a_next": "بعدی",
      "a_prev": "قبلی",
      "a_timeleft": "زمان باقی‌ماندهٔ امروز",
      "a_mute": "قطع صدای بازی",
      "a_unmute": "وصل صدای بازی",
      "arc_clipper": "شانهٔ ماشین: بزن یا بکش، ۱ از همه کوتاه‌تر",
      "a_clipon": "ماشین روشن: روی مو بکش تا کوتاه شود",
      "a_clipoff": "ماشین خاموش: بکش تا مشتری بچرخد",
      "a_finish": "پایان اصلاح",
      "a_nextcust": "مشتری بعدی",
      "a_showing": "نمایش مدل نهایی",
      "a_savefail": "ذخیره نشد. با کار بعدی دوباره تلاش می‌شود",
      "a_guard": "شانهٔ {g}، {mm} میلی‌متر",
      "mm": "میلی‌متر",
      "a_view": "نمای اصلاح مشتری",
      "a_turn": "بکش تا مشتری بچرخد",
      "shop": "فروشگاه",
      "collection": "کارهای من",
      "a_wish": "برای این پس‌انداز کن",
      "a_bill": "{n} مشتری تا صورت‌حساب {c} سکه‌ای",
      "make_base": "انتخاب پایه",
      "update_needed": "برای ادامهٔ مسیر حرفه‌ای، بازی را به‌روز کن",
      "buy": "خرید",
      "a_wishvid": "ویدیو ببین و برای چیزی که می‌خواهی سکه بگیر",
      "a_share": "اشتراک‌گذاری مدل",
      "a_wearing": "در حال استفاده",
      "a_wearthis": "از این استفاده کن",
      "tut_clipper": "روی ماشین بزن تا روشن شود",
      "tut_guard": "روی کمان بزن یا بکش تا شانه عوض شود",
      "tut_cut": "روی مو بکش تا کوتاه شود",
      "boot_new_title": "نسخهٔ جدیدتر بازی لازم است",
      "boot_new_msg": "پیشرفتت محفوظ است. بازی را به آخرین نسخه به‌روز کن.",
      "boot_fail_title": "بازی بارگیری نشد",
      "boot_fail_msg": "پیشرفتت حفظ شده است. اتصالت را بررسی کن و دوباره امتحان کن.",
      "retry": "تلاش دوباره",
      "city_lagos": "لاگوس",
      "city_kinshasa": "کینشاسا",
      "city_nairobi": "نایروبی",
      "city_johannesburg": "ژوهانسبورگ",
      "city_cairo": "قاهره",
      "city_casablanca": "کازابلانکا",
      "city_london": "لندن",
      "city_paris": "پاریس",
      "city_berlin": "برلین",
      "city_madrid": "مادرید",
      "city_warsaw": "ورشو",
      "city_istanbul": "استانبول",
      "city_riyadh": "ریاض",
      "city_dubai": "دبی",
      "city_amman": "امان",
      "city_delhi": "دهلی",
      "city_mumbai": "بمبئی",
      "city_karachi": "کراچی",
      "city_dhaka": "داکا",
      "city_colombo": "کلمبو",
      "city_tokyo": "توکیو",
      "city_seoul": "سئول",
      "city_shanghai": "شانگهای",
      "city_jakarta": "جاکارتا",
      "city_manila": "مانیل",
      "city_bangkok": "بانکوک",
      "city_new-york": "نیویورک",
      "city_los-angeles": "لس‌آنجلس",
      "city_toronto": "تورنتو",
      "city_montreal": "مونترال",
      "city_mexico-city": "مکزیکوسیتی",
      "city_sao-paulo": "سائوپائولو",
      "city_buenos-aires": "بوئنوس آیرس",
      "city_kingston": "کینگستون",
      "city_sydney": "سیدنی",
      "city_auckland": "اوکلند"
    },
    "sw": {
      "play": "Cheza",
      "modes": "Michezo",
      "daily": "Kila Siku",
      "gift": "Zawadi",
      "wardrobe": "Kabati",
      "salon": "Kinyozi",
      "styles": "Mitindo",
      "regulars": "Wateja wa Kudumu",
      "orders": "Maagizo",
      "freestyle": "Cheza Huru",
      "rescue": "Okoa",
      "beards": "Ndevu",
      "rush": "Mbio za Saa",
      "event": "Tukio",
      "new": "Mpya",
      "map": "Ramani",
      "tour": "Ziara",
      "home": "Nyumbani",
      "choose_city": "Chagua mji",
      "no_customers": "Bado hakuna wateja",
      "sound": "Sauti",
      "free": "Bure",
      "coins": "Sarafu",
      "clippers": "Mashine",
      "gowns": "Majoho",
      "pick_city": "Chagua mji wako",
      "next_city": "Mji unaofuata",
      "m_requests": "Nyoa kama wanavyotaka",
      "m_fix": "Rekebisha unyoaji mbaya",
      "m_beard": "Tengeneza ndevu",
      "m_rush": "Maliza kabla ya muda",
      "task_fade": "Nyoa fade {n}",
      "task_beard": "Punguza ndevu {n}",
      "task_regular": "Mnyoe mteja wa kudumu",
      "task_star3": "Nyota 3 mara {n}",
      "task_customers": "Hudumia wateja {n}",
      "task_customers#one": "Hudumia mteja {n}",
      "task_tips": "Pata bakshishi ya {n}",
      "career": "Safari Yangu",
      "quick_play": "Cheza Haraka",
      "settings": "Mipangilio",
      "shop_name": "Jina la kinyozi",
      "hand": "Mkono",
      "left": "Kushoto",
      "right": "Kulia",
      "privacy": "Faragha",
      "ad_choices": "Chaguo za matangazo",
      "full": "Kamili",
      "language": "Lugha",
      "shops": "Vinyozi",
      "parts": "Vifaa",
      "wall": "Ukuta",
      "lower": "Paneli",
      "floor": "Sakafu",
      "mat": "Zulia",
      "mirror": "Kioo",
      "lights": "Taa",
      "shelf": "Rafu",
      "chair": "Kiti",
      "decor": "Mapambo",
      "name": "Jina",
      "open": "Wazi",
      "est": "Tangu {y}",
      "classic": "Klasiki",
      "c_london": "London",
      "c_tokyo": "Tokyo",
      "c_lagos": "Lagos",
      "c_istanbul": "Istanbul",
      "c_mexico": "Meksiko",
      "c_mumbai": "Mumbai",
      "shopname": "Kinyozi",
      "a_back": "Rudi",
      "a_close": "Funga",
      "a_menu": "Menyu",
      "a_modes": "Michezo",
      "a_newcust": "Mteja mpya",
      "a_goals": "Malengo",
      "a_dblday": "Tazama video upate zawadi ya leo mara mbili",
      "a_chest": "Fungua sanduku la wiki",
      "a_wear": "Tumia",
      "a_onemore": "Tazama video upate moja zaidi",
      "a_collect": "Pokea",
      "a_undo": "Tazama video ufute mpigo wa mwisho",
      "a_triple": "Tazama video upate bakshishi mara tatu",
      "a_coins": "Sarafu",
      "a_shop": "Duka",
      "a_salon": "Kinyozi",
      "a_gift": "Zawadi",
      "a_take": "Chukua",
      "a_dblit": "Tazama video uipate mara mbili",
      "a_wardrobe": "Kabati",
      "a_clippers": "Mashine",
      "a_robes": "Majoho",
      "a_detail": "Kiwango cha undani",
      "a_next": "Inayofuata",
      "a_prev": "Iliyotangulia",
      "a_timeleft": "Muda uliobaki leo",
      "a_mute": "Zima sauti ya mchezo",
      "a_unmute": "Washa sauti ya mchezo",
      "arc_clipper": "Kichana cha mashine: gusa au telezesha, 1 ni fupi zaidi",
      "a_clipon": "Mashine imewashwa: buruta kwenye nywele kunyoa",
      "a_clipoff": "Mashine imezimwa: buruta kumgeuza mteja",
      "a_finish": "Maliza kunyoa",
      "a_nextcust": "Mteja anayefuata",
      "a_showing": "Inaonyesha mtindo uliokamilika",
      "a_savefail": "Imeshindwa kuhifadhi. Itajaribu tena kwenye hatua inayofuata",
      "a_guard": "Kichana {g}, milimita {mm}",
      "mm": "mm",
      "a_view": "Mwonekano wa nywele za mteja",
      "a_turn": "Buruta kumgeuza mteja",
      "shop": "Duka",
      "collection": "Kazi Zangu",
      "a_wish": "Weka akiba kwa hii",
      "a_bill": "Wateja {n} hadi bili ya sarafu {c}",
      "make_base": "Fanya msingi",
      "update_needed": "Sasisha mchezo uendelee na safari yako",
      "buy": "Nunua",
      "a_wishvid": "Tazama video upate sarafu za kitu unachotaka",
      "a_share": "Shiriki mtindo",
      "a_wearing": "Inatumika",
      "a_wearthis": "Tumia hii",
      "tut_clipper": "Gusa mashine kuiwasha",
      "tut_guard": "Gusa au telezesha tao kubadilisha kichana",
      "tut_cut": "Buruta kwenye nywele kunyoa",
      "boot_new_title": "Toleo jipya la mchezo linahitajika",
      "boot_new_msg": "Maendeleo yako yako salama. Sasisha hadi toleo jipya zaidi.",
      "boot_fail_title": "Mchezo haukuweza kupakia",
      "boot_fail_msg": "Maendeleo yako yamehifadhiwa. Angalia muunganisho wako kisha ujaribu tena.",
      "retry": "Jaribu tena",
      "city_lagos": "Lagos",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Kairo",
      "city_casablanca": "Casablanca",
      "city_london": "London",
      "city_paris": "Paris",
      "city_berlin": "Berlin",
      "city_madrid": "Madrid",
      "city_warsaw": "Warshawa",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Riyadh",
      "city_dubai": "Dubai",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karachi",
      "city_dhaka": "Dhaka",
      "city_colombo": "Colombo",
      "city_tokyo": "Tokyo",
      "city_seoul": "Seoul",
      "city_shanghai": "Shanghai",
      "city_jakarta": "Jakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montreal",
      "city_mexico-city": "Jiji la Meksiko",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "ha": {
      "play": "Yi wasa",
      "modes": "Salon wasa",
      "daily": "Na kullum",
      "gift": "Kyauta",
      "wardrobe": "Kayana",
      "salon": "Shagon aski",
      "styles": "Salon aski",
      "regulars": "Masu dawowa",
      "orders": "Buƙatu",
      "freestyle": "Aski na 'yanci",
      "rescue": "Ceto",
      "beards": "Gemu",
      "rush": "Gaggawa",
      "event": "Taro",
      "new": "Sabo",
      "map": "Taswira",
      "tour": "Rangadi",
      "home": "Babban shafi",
      "choose_city": "Zaɓi birni",
      "no_customers": "Babu kwastoma tukuna",
      "sound": "Sauti",
      "free": "Kyauta",
      "coins": "Tsabobi",
      "clippers": "Injin aski",
      "gowns": "Zanin aski",
      "pick_city": "Zaɓi birnin farko",
      "next_city": "Birni na gaba",
      "m_requests": "Yi aski yadda aka nema",
      "m_fix": "Gyara mummunan aski",
      "m_beard": "Tsara gemu",
      "m_rush": "Gama kafin lokaci ya ƙare",
      "task_fade": "Yi askin fade guda {n}",
      "task_beard": "Gyara gemu guda {n}",
      "task_regular": "Yi wa mai dawowa aski",
      "task_star3": "Aski {n} mai tauraro 3",
      "task_customers": "Yi wa mutum {n} aski",
      "task_tips": "Sami tukuici {n}",
      "career": "Hanyar nasara",
      "quick_play": "Wasa cikin sauri",
      "settings": "Saituna",
      "shop_name": "Sunan shago",
      "hand": "Hannu",
      "left": "Hagu",
      "right": "Dama",
      "privacy": "Sirri",
      "ad_choices": "Zaɓin talla",
      "full": "Cikakke",
      "language": "Harshe",
      "shops": "Shaguna",
      "parts": "Sassa",
      "wall": "Bango",
      "lower": "Allunan bango",
      "floor": "Dabe",
      "mat": "Tabarma",
      "mirror": "Madubi",
      "lights": "Fitilu",
      "shelf": "Ma'ajiya",
      "chair": "Kujera",
      "decor": "Ado",
      "name": "Suna",
      "open": "A buɗe",
      "est": "Tun {y}",
      "classic": "Na gargajiya",
      "c_london": "Landan",
      "c_tokyo": "Tokyo",
      "c_lagos": "Legas",
      "c_istanbul": "Istanbul",
      "c_mexico": "Mexico",
      "c_mumbai": "Mumbai",
      "shopname": "Shagon Aski",
      "a_back": "Koma baya",
      "a_close": "Rufe",
      "a_menu": "Menu",
      "a_modes": "Salon wasa",
      "a_newcust": "Sabon kwastoma",
      "a_goals": "Manufofi",
      "a_dblday": "Kalli bidiyo don ninka ladan yau",
      "a_chest": "Buɗe akwatin mako",
      "a_wear": "Yi amfani da shi",
      "a_onemore": "Kalli bidiyo don samun ƙari ɗaya",
      "a_collect": "Karɓi lada",
      "a_undo": "Kalli bidiyo don soke yanka na ƙarshe",
      "a_triple": "Kalli bidiyo don ninka tukuici sau uku",
      "a_coins": "Tsabobi",
      "a_shop": "Kanti",
      "a_salon": "Shagon aski",
      "a_gift": "Kyauta",
      "a_take": "Karɓa",
      "a_dblit": "Kalli bidiyo don ninka shi",
      "a_wardrobe": "Kayana",
      "a_clippers": "Injin aski",
      "a_robes": "Zanin aski",
      "a_detail": "Ingancin hoto",
      "a_next": "Shafi na gaba",
      "a_prev": "Shafin baya",
      "a_timeleft": "Lokacin da ya rage yau",
      "a_mute": "Kashe sautin wasa",
      "a_unmute": "Kunna sautin wasa",
      "arc_clipper": "Gadin injin aski: taɓa ko ja, 1 shi ne mafi gajarta",
      "a_clipon": "Injin aski a kunne: ja a kan gashi don yanka",
      "a_clipoff": "Injin aski a kashe: ja don juya kwastoma",
      "a_finish": "Kammala aski",
      "a_nextcust": "Kwastoma na gaba",
      "a_showing": "Ana nuna askin da aka kammala",
      "a_savefail": "Ba a adana ba. Za a sake gwadawa a mataki na gaba",
      "a_guard": "Gadi {g}, milimita {mm}",
      "mm": "mm",
      "a_view": "Kallon askin kwastoma",
      "a_turn": "Ja don juya kwastoma",
      "shop": "Kanti",
      "collection": "Tarin aski",
      "a_wish": "Tara tsabobi don wannan",
      "a_bill": "Saura kwastoma {n} kafin biyan tsabobi {c}",
      "make_base": "Mai da tushe",
      "update_needed": "Sabunta wasan don ci gaba da Hanyar nasara",
      "buy": "Saya",
      "a_wishvid": "Kalli bidiyo don samun tsabobi ga abin da ake tarawa",
      "a_share": "Raba aski",
      "a_wearing": "Ana amfani da shi",
      "a_wearthis": "Yi amfani da wannan",
      "tut_clipper": "Taɓa injin aski don kunna shi",
      "tut_guard": "Taɓa ko ja baka don canza gadi",
      "tut_cut": "Ja a kan gashi don yanka",
      "boot_new_title": "Ana buƙatar sabuwar sigar wasan",
      "boot_new_msg": "Ci gaban wasa yana nan lafiya. Sabunta zuwa sabuwar siga.",
      "boot_fail_title": "Wasan ya kasa buɗewa",
      "boot_fail_msg": "An adana ci gaban wasa. Duba haɗin intanet sannan a sake gwadawa.",
      "retry": "Sake gwadawa",
      "city_lagos": "Legas",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Alƙahira",
      "city_casablanca": "Casablanca",
      "city_london": "Landan",
      "city_paris": "Paris",
      "city_berlin": "Berlin",
      "city_madrid": "Madrid",
      "city_warsaw": "Warsaw",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Riyadh",
      "city_dubai": "Dubai",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karachi",
      "city_dhaka": "Dhaka",
      "city_colombo": "Colombo",
      "city_tokyo": "Tokyo",
      "city_seoul": "Seoul",
      "city_shanghai": "Shanghai",
      "city_jakarta": "Jakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montreal",
      "city_mexico-city": "Birnin Mexico",
      "city_sao-paulo": "Sao Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "yo": {
      "play": "Ṣeré",
      "modes": "Oríṣìí eré",
      "daily": "Ojoojúmọ́",
      "gift": "Ẹ̀bùn",
      "wardrobe": "Àwọn nǹkan mi",
      "salon": "Ilé gígé irun",
      "styles": "Àṣà irun",
      "regulars": "Oníbàárà déédé",
      "orders": "Ìbéèrè",
      "freestyle": "Gígé òmìnira",
      "rescue": "Àtúnṣe",
      "beards": "Irùngbọ̀n",
      "rush": "Ìkánjú",
      "event": "Ayẹyẹ",
      "new": "Tuntun",
      "map": "Màápù",
      "tour": "Ìrìn àgbáyé",
      "home": "Ilé",
      "choose_city": "Yan ìlú kan",
      "no_customers": "Kò sí oníbàárà síbẹ̀",
      "sound": "Ohùn",
      "free": "Ọ̀fẹ́",
      "coins": "Owó ẹyọ",
      "clippers": "Ẹ̀rọ irun",
      "gowns": "Aṣọ ìbora",
      "pick_city": "Yan ìlú rẹ",
      "next_city": "Ìlú tó kàn",
      "m_requests": "Gé bí wọ́n ṣe fẹ́",
      "m_fix": "Tún irun tó bàjẹ́ ṣe",
      "m_beard": "Ṣe ìrísí irùngbọ̀n",
      "m_rush": "Parí kí àkókò tó tán",
      "task_fade": "Ṣe irun fade {n}",
      "task_beard": "Gé irùngbọ̀n {n}",
      "task_regular": "Gé irun oníbàárà déédé",
      "task_star3": "Gé irun {n} ní ìràwọ̀ 3",
      "task_customers": "Gé irun oníbàárà {n}",
      "task_tips": "Gba owó ìmoore {n}",
      "career": "Ìrìnàjò",
      "quick_play": "Eré kíákíá",
      "settings": "Ètò",
      "shop_name": "Orúkọ ṣọ́ọ̀bù",
      "hand": "Ọwọ́",
      "left": "Òsì",
      "right": "Ọ̀tún",
      "privacy": "Àṣírí",
      "ad_choices": "Àṣàyàn ìpolówó",
      "full": "Kíkún",
      "language": "Èdè",
      "shops": "Ṣọ́ọ̀bù",
      "parts": "Ẹ̀yà",
      "wall": "Ògiri",
      "lower": "Pátákó ògiri",
      "floor": "Ilẹ̀",
      "mat": "Ẹní",
      "mirror": "Dígí",
      "lights": "Iná",
      "shelf": "Pẹpẹ",
      "chair": "Àga",
      "decor": "Ọ̀ṣọ́",
      "name": "Orúkọ",
      "open": "A ṣí sílẹ̀",
      "est": "Láti {y}",
      "classic": "Àtijọ́",
      "c_london": "Lọ́ndọ̀nù",
      "c_tokyo": "Tokyo",
      "c_lagos": "Èkó",
      "c_istanbul": "Istanbul",
      "c_mexico": "Mẹ́síkò",
      "c_mumbai": "Mumbai",
      "shopname": "Ilé Gígé Irun",
      "a_back": "Padà sẹ́yìn",
      "a_close": "Pa á dé",
      "a_menu": "Mẹ́nù",
      "a_modes": "Oríṣìí eré",
      "a_newcust": "Oníbàárà tuntun",
      "a_goals": "Àfojúsùn",
      "a_dblday": "Wo fídíò láti ṣe ẹ̀bùn òní ní ìlọ́po méjì",
      "a_chest": "Ṣí àpótí ọ̀sẹ̀ yìí",
      "a_wear": "Lò ó",
      "a_onemore": "Wo fídíò láti gba ọ̀kan sí i",
      "a_collect": "Gba ẹ̀bùn",
      "a_undo": "Wo fídíò láti yí gígé tó kẹ́yìn padà",
      "a_triple": "Wo fídíò láti ṣe owó ìmoore ní ìlọ́po mẹ́ta",
      "a_coins": "Owó ẹyọ",
      "a_shop": "Ọjà",
      "a_salon": "Ilé gígé irun",
      "a_gift": "Ẹ̀bùn",
      "a_take": "Gbà á",
      "a_dblit": "Wo fídíò láti ṣe é ní ìlọ́po méjì",
      "a_wardrobe": "Àwọn nǹkan mi",
      "a_clippers": "Ẹ̀rọ irun",
      "a_robes": "Aṣọ ìbora",
      "a_detail": "Ìpele àwòrán",
      "a_next": "Ojú-ìwé tó kàn",
      "a_prev": "Ojú-ìwé tó ṣáájú",
      "a_timeleft": "Àkókò tó kù lónìí",
      "a_mute": "Pa ohùn eré",
      "a_unmute": "Tan ohùn eré",
      "arc_clipper": "Gádì ẹ̀rọ irun: tẹ tàbí fà á, 1 ló gé kúrú jù",
      "a_clipon": "Ẹ̀rọ irun wà ní títàn: fà á lórí irun láti gé",
      "a_clipoff": "Ẹ̀rọ irun wà ní pípa: fà á láti yí oníbàárà padà",
      "a_finish": "Parí gígé irun",
      "a_nextcust": "Oníbàárà tó kàn",
      "a_showing": "À ń fi irun tí a gé tán hàn",
      "a_savefail": "Kò fi pamọ́. A ó tún gbìyànjú ní ìgbésẹ̀ tó kàn",
      "a_guard": "Gádì {g}, mílímítà {mm}",
      "mm": "mm",
      "a_view": "Ìwòran irun oníbàárà",
      "a_turn": "Fà á láti yí oníbàárà padà",
      "shop": "Ọjà",
      "collection": "Àkójọ",
      "a_wish": "Tọ́jú owó fún èyí",
      "a_bill": "Oníbàárà {n} ló kù kí o san owó ẹyọ {c}",
      "make_base": "Fi ṣe ìpìlẹ̀",
      "update_needed": "Ṣe ìmúdójúìwọ̀n eré láti tẹ̀síwájú nínú Ìrìnàjò rẹ",
      "buy": "Rà á",
      "a_wishvid": "Wo fídíò láti gba owó ẹyọ fún nǹkan tí o fẹ́",
      "a_share": "Pín irun yìí",
      "a_wearing": "Ò ń lò ó",
      "a_wearthis": "Lo èyí",
      "tut_clipper": "Tẹ ẹ̀rọ irun láti tàn án",
      "tut_guard": "Tẹ tàbí fà á láti yí gádì padà",
      "tut_cut": "Fà á lórí irun láti gé",
      "boot_new_title": "A nílò ẹ̀dà eré tuntun",
      "boot_new_msg": "Ìlọsíwájú rẹ wà láìléwu. Ṣe ìmúdójúìwọ̀n sí ẹ̀dà tuntun.",
      "boot_fail_title": "Eré náà kò lè ṣí",
      "boot_fail_msg": "A ti fi ìlọsíwájú rẹ pamọ́. Ṣàyẹ̀wò ìsopọ̀ rẹ kí o tún gbìyànjú.",
      "retry": "Tún gbìyànjú",
      "city_lagos": "Èkó",
      "city_kinshasa": "Kinshasa",
      "city_nairobi": "Nairobi",
      "city_johannesburg": "Johannesburg",
      "city_cairo": "Káírò",
      "city_casablanca": "Casablanca",
      "city_london": "Lọ́ndọ̀nù",
      "city_paris": "Párìsì",
      "city_berlin": "Berlin",
      "city_madrid": "Madrid",
      "city_warsaw": "Warsaw",
      "city_istanbul": "Istanbul",
      "city_riyadh": "Riyadh",
      "city_dubai": "Dubai",
      "city_amman": "Amman",
      "city_delhi": "Delhi",
      "city_mumbai": "Mumbai",
      "city_karachi": "Karachi",
      "city_dhaka": "Dhaka",
      "city_colombo": "Colombo",
      "city_tokyo": "Tokyo",
      "city_seoul": "Seoul",
      "city_shanghai": "Shanghai",
      "city_jakarta": "Jakarta",
      "city_manila": "Manila",
      "city_bangkok": "Bangkok",
      "city_new-york": "New York",
      "city_los-angeles": "Los Angeles",
      "city_toronto": "Toronto",
      "city_montreal": "Montreal",
      "city_mexico-city": "Ìlú Mẹ́síkò",
      "city_sao-paulo": "São Paulo",
      "city_buenos-aires": "Buenos Aires",
      "city_kingston": "Kingston",
      "city_sydney": "Sydney",
      "city_auckland": "Auckland"
    },
    "he": {
      "play": "שחקו",
      "modes": "מצבים",
      "daily": "אתגר יומי",
      "gift": "מתנה",
      "wardrobe": "ארון",
      "salon": "המספרה",
      "styles": "תספורות",
      "regulars": "לקוחות קבועים",
      "orders": "הזמנות",
      "freestyle": "משחק חופשי",
      "rescue": "הצלה",
      "beards": "זקנים",
      "rush": "נגד השעון",
      "event": "אירוע",
      "new": "חדש",
      "map": "מפה",
      "tour": "מסע",
      "home": "בית",
      "choose_city": "בחרו עיר",
      "no_customers": "עדיין אין לקוחות",
      "sound": "צלילים",
      "free": "חינם",
      "coins": "מטבעות",
      "clippers": "מכונות",
      "gowns": "גלימות",
      "pick_city": "בחרו את העיר שלכם",
      "next_city": "העיר הבאה",
      "m_requests": "ספרו לפי הבקשה",
      "m_fix": "תקנו תספורת גרועה",
      "m_beard": "עצבו את הזקן",
      "m_rush": "נצחו את השעון",
      "task_fade": "{n} תספורות פייד",
      "task_fade#one": "תספורת פייד אחת",
      "task_beard": "סדרו {n} זקנים",
      "task_beard#one": "סדרו זקן אחד",
      "task_regular": "ספרו לקוח קבוע",
      "task_star3": "{n} תספורות ב-3 כוכבים",
      "task_star3#one": "תספורת אחת ב-3 כוכבים",
      "task_customers": "ספרו {n} לקוחות",
      "task_customers#one": "ספרו לקוח אחד",
      "task_tips": "הרוויחו {n} בטיפים",
      "career": "קריירה",
      "quick_play": "משחק מהיר",
      "settings": "הגדרות",
      "shop_name": "שם המספרה",
      "hand": "יד",
      "left": "שמאל",
      "right": "ימין",
      "privacy": "פרטיות",
      "ad_choices": "העדפות מודעות",
      "full": "מלא",
      "language": "שפה",
      "shops": "מספרות",
      "parts": "חלקים",
      "wall": "קיר",
      "lower": "לוחות",
      "floor": "רצפה",
      "mat": "שטיח",
      "mirror": "מראה",
      "lights": "תאורה",
      "shelf": "מדף",
      "chair": "כיסא",
      "decor": "קישוטים",
      "name": "שם",
      "open": "פתוח",
      "est": "מאז {y}",
      "classic": "קלאסי",
      "c_london": "לונדון",
      "c_tokyo": "טוקיו",
      "c_lagos": "לגוס",
      "c_istanbul": "איסטנבול",
      "c_mexico": "מקסיקו",
      "c_mumbai": "מומבאי",
      "shopname": "מספרה",
      "a_back": "חזרה",
      "a_close": "סגירה",
      "a_menu": "תפריט",
      "a_modes": "מצבים",
      "a_newcust": "לקוח חדש",
      "a_goals": "יעדים",
      "a_dblday": "צפו בסרטון והכפילו את פרס היום",
      "a_chest": "פתחו את התיבה השבועית",
      "a_wear": "השתמשו בו",
      "a_onemore": "צפו בסרטון וקבלו עוד אחד",
      "a_collect": "איסוף",
      "a_undo": "צפו בסרטון לביטול התנועה האחרונה",
      "a_triple": "צפו בסרטון ושלשו את הטיפים",
      "a_coins": "מטבעות",
      "a_shop": "חנות",
      "a_salon": "המספרה",
      "a_gift": "מתנה",
      "a_take": "קבלו",
      "a_dblit": "צפו בסרטון והכפילו",
      "a_wardrobe": "ארון",
      "a_clippers": "מכונות",
      "a_robes": "גלימות",
      "a_detail": "רמת פירוט",
      "a_next": "הבא",
      "a_prev": "הקודם",
      "a_timeleft": "הזמן שנותר היום",
      "a_mute": "השתקת צלילי המשחק",
      "a_unmute": "הפעלת צלילי המשחק",
      "arc_clipper": "מסרק המכונה: הקישו או החליקו, 1 הכי קצר",
      "a_clipon": "המכונה פועלת: גררו על השיער כדי לספר",
      "a_clipoff": "המכונה כבויה: גררו כדי לסובב את הלקוח",
      "a_finish": "סיום התספורת",
      "a_nextcust": "הלקוח הבא",
      "a_showing": "מוצגת התספורת הסופית",
      "a_savefail": "השמירה נכשלה. ננסה שוב בפעולה הבאה",
      "a_guard": "מסרק {g}, {mm} מילימטר",
      "mm": "מ״מ",
      "a_view": "תצוגת התספורת של הלקוח",
      "a_turn": "גררו כדי לסובב את הלקוח",
      "shop": "חנות",
      "collection": "העבודות שלי",
      "a_wish": "חוסכים לזה",
      "a_bill": "עוד {n} לקוחות עד החשבון של {c}",
      "make_base": "הגדרה כבסיס",
      "update_needed": "עדכנו את המשחק כדי להמשיך בקריירה",
      "buy": "קנייה",
      "a_wishvid": "צפו בסרטון וקבלו מטבעות לפריט שאתם רוצים",
      "a_share": "שיתוף התספורת",
      "a_wearing": "בשימוש",
      "a_wearthis": "השתמשו בזה",
      "tut_clipper": "הקישו על המכונה כדי להפעיל אותה",
      "tut_guard": "הקישו או החליקו על הקשת כדי להחליף מסרק",
      "tut_cut": "גררו על השיער כדי לספר",
      "boot_new_title": "נדרשת גרסה חדשה של המשחק",
      "boot_new_msg": "ההתקדמות שלכם שמורה. עדכנו לגרסה האחרונה.",
      "boot_fail_title": "לא הצלחנו לטעון את המשחק",
      "boot_fail_msg": "ההתקדמות שלכם שמורה. בדקו את החיבור ונסו שוב.",
      "retry": "נסו שוב",
      "city_lagos": "לגוס",
      "city_kinshasa": "קינשאסה",
      "city_nairobi": "ניירובי",
      "city_johannesburg": "יוהנסבורג",
      "city_cairo": "קהיר",
      "city_casablanca": "קזבלנקה",
      "city_london": "לונדון",
      "city_paris": "פריז",
      "city_berlin": "ברלין",
      "city_madrid": "מדריד",
      "city_warsaw": "ורשה",
      "city_istanbul": "איסטנבול",
      "city_riyadh": "ריאד",
      "city_dubai": "דובאי",
      "city_amman": "עמאן",
      "city_delhi": "דלהי",
      "city_mumbai": "מומבאי",
      "city_karachi": "קראצ'י",
      "city_dhaka": "דאקה",
      "city_colombo": "קולומבו",
      "city_tokyo": "טוקיו",
      "city_seoul": "סיאול",
      "city_shanghai": "שנגחאי",
      "city_jakarta": "ג'קרטה",
      "city_manila": "מנילה",
      "city_bangkok": "בנגקוק",
      "city_new-york": "ניו יורק",
      "city_los-angeles": "לוס אנג'לס",
      "city_toronto": "טורונטו",
      "city_montreal": "מונטריאול",
      "city_mexico-city": "מקסיקו סיטי",
      "city_sao-paulo": "סאו פאולו",
      "city_buenos-aires": "בואנוס איירס",
      "city_kingston": "קינגסטון",
      "city_sydney": "סידני",
      "city_auckland": "אוקלנד"
    },
  };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1): menus use the shortest natural text that removes uncertainty; the
// cutting screen stays visual-first. Language is chosen from the saved preference or the initialized host client,
// never from browser globals on a hosted game. The text itself lives in labels-packs.js (HSC.LABEL_PACKS, loaded
// just before this file): one flat pack per tag of the locked 40-language catalogue
// (GLOBAL-LANGUAGE-AND-TEXT-CONTRACT.md section 2). A key a pack lacks reads English; the release gate
// (android/tests/i18n.cjs) requires zero missing keys.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  const T = HSC.LABEL_PACKS || { en: {} };
  const LANGUAGE_OPTIONS = HSC.LABEL_LANGUAGES || [['en', 'English']];
  for (const [tag] of LANGUAGE_OPTIONS) if (!T[tag]) T[tag] = {};
  // the lower-case form of each canonical tag, for matching host and saved values case-insensitively
  const LOWER = new Map(Object.keys(T).map((t) => [t.toLowerCase(), t]));
  // locale routing (language contract section 3): every Spanish region (and the old saved `es`) to es-419, every
  // Portuguese one (and `pt`) to pt-BR; Chinese to Simplified or Traditional by region or script; Norwegian
  // (`no`, `nb`, `nn`) to Bokmål; the legacy tags `iw` (Hebrew), `in` (Indonesian) and `tl` (Tagalog) to he, id, fil.
  const route = (raw) => {
    const base = raw.split('-')[0];
    if (base === 'es') return 'es-419';
    if (base === 'pt') return 'pt-BR';
    if (base === 'zh') return /hant|-tw|-hk|-mo/.test(raw) ? 'zh-Hant' : 'zh-Hans';
    if (base === 'no' || base === 'nb' || base === 'nn') return 'nb';
    if (base === 'iw') return 'he';
    if (base === 'in') return 'id';
    if (base === 'tl' || base === 'fil') return 'fil';
    return null;
  };
  const resolve = (value) => {
    const raw = String(value || '').trim().replace(/_/g, '-').toLowerCase();
    const routed = route(raw);
    if (routed) return T[routed] ? routed : 'en';
    return LOWER.get(raw) || LOWER.get(raw.split('-')[0]) || 'en';
  };
  // packs are keyed by their canonical tag (document language, number formatting); right-to-left set
  const TAG = {};
  const RTL = new Set(HSC.LABEL_RTL || ['ar', 'he', 'fa', 'ur']);
  const sync = () => {
    const host = HSC.meta?.client?.language;
    const lang = resolve(host || document.documentElement.lang || 'en');
    document.documentElement.lang = TAG[lang] || lang;
    document.documentElement.dir = RTL.has(lang) ? 'rtl' : 'ltr';
    return lang;
  };
  HSC.lang = () => sync();
  HSC.rtl = () => RTL.has(sync());
  HSC.langTag = () => TAG[sync()] || sync();
  // numbers in the chosen language (not the device's), e.g. 1,800 / 1.800 / ١٬٨٠٠
  const nf = new Map();
  HSC.num = (n) => { const tag = HSC.langTag(); if (!nf.has(tag)) { try { nf.set(tag, new Intl.NumberFormat(tag)); } catch (e) { nf.set(tag, new Intl.NumberFormat('en')); } } return nf.get(tag).format(n); };
  HSC.t = (k) => { const l = sync(); return (T[l] && T[l][k]) || T.en[k] || ''; };
  // the chosen pack's own text for a key, or '' when only English has it (for callers with their own fallback)
  HSC.tHas = (k) => { const l = sync(); return (T[l] && T[l][k]) || ''; };
  // a counted message: the pack's plural form for n ("key#one", "key#few"...; the bare key is "other"), with {n}
  // written as a number in the chosen language and any further {name} placeholders from args
  const pr = new Map();
  HSC.tn = (k, n, args) => {
    const l = sync(), tag = HSC.langTag();
    if (!pr.has(tag)) { try { pr.set(tag, new Intl.PluralRules(tag)); } catch (e) { pr.set(tag, new Intl.PluralRules('en')); } }
    const cat = pr.get(tag).select(n), p = T[l] || {};
    let out = p[k + '#' + cat] || p[k] || (cat === 'one' && l === 'en' && T.en[k + '#one']) || T.en[k] || '';
    out = out.replace(/\{n\}/g, HSC.num(n));
    for (const [a, v] of Object.entries(args || {})) out = out.split('{' + a + '}').join(typeof v === 'number' ? HSC.num(v) : v);
    return out;
  };
  // shrink compact menu labels only as far as 12 px; supported translations must remain readable
  // labels inside a `.hsc-same` group then all take the smallest size any of them needed, so a row of buttons
  // keeps one text size and one baseline
  HSC.fitLabels = function (root) {
    const els = [...(root || document).querySelectorAll('.hsc-lbl')].filter((el) => el.offsetParent);
    for (const el of els) {
      el.style.fontSize = '';
      let s = parseFloat(getComputedStyle(el).fontSize) || 14;
      let guard = 40;
      while (el.scrollWidth > el.clientWidth + 0.5 && s > 12 && guard--) { s -= 0.5; el.style.fontSize = s + 'px'; }
    }
    const groups = new Map();
    for (const el of els) { const g = el.closest('.hsc-same'); if (g) { if (!groups.has(g)) groups.set(g, []); groups.get(g).push(el); } }
    for (const list of groups.values()) {
      const min = Math.min(...list.map((el) => parseFloat(getComputedStyle(el).fontSize) || 14));
      for (const el of list) el.style.fontSize = min + 'px';
    }
  };
  HSC.languageOptions = LANGUAGE_OPTIONS.map((x) => x.slice());

  // ---- one pass that puts the whole interface in the current language ----
  // Every module's visible labels carry their key (.hsc-lbl[data-k], [data-t]); the spoken names of controls,
  // including the engine's and the frozen wardrobe's, are matched from their English source and translated here,
  // so a language change reaches every surface at once without touching frozen code.
  const EN2K = new Map();
  for (const [k, v] of Object.entries(T.en)) if (typeof v === 'string' && v && !v.includes('{')) EN2K.set(v, k);
  const PATTERNS = [
    [/^Guard (\d+), ([\d.]+) millimetres$/, 'a_guard', (m) => ({ g: m[1], mm: HSC.num(+m[2]) })],
  ];
  function spoken(src) {
    if (EN2K.has(src)) return HSC.t(EN2K.get(src));
    for (const [re, k, args] of PATTERNS) { const m = src.match(re); if (m) { let out = HSC.t(k); for (const [a, v] of Object.entries(args(m))) out = out.replace('{' + a + '}', v); return out; } }
    return null;
  }
  function ariaOne(el) {
    const cur = el.getAttribute('aria-label');
    if (!cur) return;
    // the English source: kept when first seen, replaced when the page writes a new English label
    if (cur !== el.dataset.hscAt && (EN2K.has(cur) || PATTERNS.some(([re]) => re.test(cur)))) el.dataset.hscA = cur;
    const src = el.dataset.hscA;
    if (!src) return;
    const out = spoken(src);
    if (out && out !== cur) { el.dataset.hscAt = out; el.setAttribute('aria-label', out); }
    else if (out) el.dataset.hscAt = out;
  }
  function retext(root) {
    const r = root || document;
    r.querySelectorAll('.hsc-lbl[data-k]').forEach((e) => { const v = HSC.t(e.dataset.k); if (v && e.textContent !== v) e.textContent = v; });
    r.querySelectorAll('[aria-label]').forEach(ariaOne);
    document.querySelectorAll('#hsc-menu,#hsc-set,#hsc-salon,.hsc-coll-panel').forEach((el) => el.setAttribute('dir', HSC.rtl() ? 'rtl' : 'ltr'));
    if (HSC.fitLabels) requestAnimationFrame(() => HSC.fitLabels(document));
  }
  HSC.retext = retext;
  // a module that writes its own spoken label registers the English source, so the translator keeps it
  HSC.setSpoken = (el, key, args) => {
    let en = T.en[key] || key, out = HSC.t(key) || en;
    // numbers read in the chosen language (4,5 mm in German); the English source keeps plain digits
    for (const [a, v] of Object.entries(args || {})) { en = en.replace('{' + a + '}', v); out = out.replace('{' + a + '}', typeof v === 'number' ? HSC.num(v) : v); }
    el.dataset.hscA = en; el.dataset.hscAt = out;
    if (el.getAttribute('aria-label') !== out) el.setAttribute('aria-label', out);
  };
  let queued = false;
  const later = () => { if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; document.querySelectorAll('[aria-label]').forEach(ariaOne); }); };
  new MutationObserver((list) => { for (const m of list) if (m.type === 'childList' ? m.addedNodes.length : m.attributeName === 'aria-label') { later(); return; } })
    .observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['aria-label'] });
  HSC.LABELS = T;
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1): the game's one icon set. Every interface icon is a Phosphor duotone icon
// (MIT, see THIRD-PARTY-NOTICES) in the game's navy ink with one accent colour, so Home, panels and the chair match.
// The coin is drawn apart, with depth, because players buy it; the level is a blue hexagon so it can never be confused
// with the coin. HSC.icon(name, size) returns the SVG; HSC.levelBadge(n, size) the level.
// Generated from @phosphor-icons/core 2.1.1 duotone; add an icon by adding its path pair here.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  const K = '#10223f'; // ink
  const ICON = {
    flame: "<path d=\"M208,144a80,80,0,0,1-160,0c0-30.57,14.42-58.26,31-80l33,32,26.27-72C159.86,41.92,208,88.15,208,144Z\" fill=\"#ff8a2b\"/><path d=\"M183.89,153.34a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68ZM216,144a88,88,0,0,1-176,0c0-27.92,11-56.47,32.66-84.85a8,8,0,0,1,11.93-.89l24.12,23.41,22-60.41a8,8,0,0,1,12.63-3.41C165.21,36,216,84.55,216,144Zm-16,0c0-46.09-35.79-85.92-58.21-106.33L119.52,98.74a8,8,0,0,1-13.09,3L80.06,76.16C64.09,99.21,56,122,56,144a72,72,0,0,0,144,0Z\"/>",
    compare: "<path d=\"M128,32a96,96,0,0,1,0,192Z\" fill=\"#ffc21a\"/><circle cx=\"128\" cy=\"128\" r=\"96\" fill=\"none\" stroke=\"#10223f\" stroke-width=\"16\"/>",
    gear: "<path d=\"M230.1,108.76,198.25,90.62c-.64-1.16-1.31-2.29-2-3.41l-.12-36A104.61,104.61,0,0,0,162,32L130,49.89c-1.34,0-2.69,0-4,0L94,32A104.58,104.58,0,0,0,59.89,51.25l-.16,36c-.7,1.12-1.37,2.26-2,3.41l-31.84,18.1a99.15,99.15,0,0,0,0,38.46l31.85,18.14c.64,1.16,1.31,2.29,2,3.41l.12,36A104.61,104.61,0,0,0,94,224l32-17.87c1.34,0,2.69,0,4,0L162,224a104.58,104.58,0,0,0,34.08-19.25l.16-36c.7-1.12,1.37-2.26,2-3.41l31.84-18.1A99.15,99.15,0,0,0,230.1,108.76ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z\" fill=\"#9fb6cf\"/><path d=\"M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm109.94-52.79a8,8,0,0,0-3.89-5.4l-29.83-17-.12-33.62a8,8,0,0,0-2.83-6.08,111.91,111.91,0,0,0-36.72-20.67,8,8,0,0,0-6.46.59L128,41.85,97.88,25a8,8,0,0,0-6.47-.6A111.92,111.92,0,0,0,54.73,45.15a8,8,0,0,0-2.83,6.07l-.15,33.65-29.83,17a8,8,0,0,0-3.89,5.4,106.47,106.47,0,0,0,0,41.56,8,8,0,0,0,3.89,5.4l29.83,17,.12,33.63a8,8,0,0,0,2.83,6.08,111.91,111.91,0,0,0,36.72,20.67,8,8,0,0,0,6.46-.59L128,214.15,158.12,231a7.91,7.91,0,0,0,3.9,1,8.09,8.09,0,0,0,2.57-.42,112.1,112.1,0,0,0,36.68-20.73,8,8,0,0,0,2.83-6.07l.15-33.65,29.83-17a8,8,0,0,0,3.89-5.4A106.47,106.47,0,0,0,237.94,107.21Zm-15,34.91-28.57,16.25a8,8,0,0,0-3,3c-.58,1-1.19,2.06-1.81,3.06a7.94,7.94,0,0,0-1.22,4.21l-.15,32.25a95.89,95.89,0,0,1-25.37,14.3L134,199.13a8,8,0,0,0-3.91-1h-.19c-1.21,0-2.43,0-3.64,0a8.1,8.1,0,0,0-4.1,1l-28.84,16.1A96,96,0,0,1,67.88,201l-.11-32.2a8,8,0,0,0-1.22-4.22c-.62-1-1.23-2-1.8-3.06a8.09,8.09,0,0,0-3-3.06l-28.6-16.29a90.49,90.49,0,0,1,0-28.26L61.67,97.63a8,8,0,0,0,3-3c.58-1,1.19-2.06,1.81-3.06a7.94,7.94,0,0,0,1.22-4.21l.15-32.25a95.89,95.89,0,0,1,25.37-14.3L122,56.87a8,8,0,0,0,4.1,1c1.21,0,2.43,0,3.64,0a8,8,0,0,0,4.1-1l28.84-16.1A96,96,0,0,1,188.12,55l.11,32.2a8,8,0,0,0,1.22,4.22c.62,1,1.23,2,1.8,3.06a8.09,8.09,0,0,0,3,3.06l28.6,16.29A90.49,90.49,0,0,1,222.9,142.12Z\"/>",
    play: "<path d=\"M228.23,134.69,84.15,222.81A8,8,0,0,1,72,216.12V39.88a8,8,0,0,1,12.15-6.69l144.08,88.12A7.82,7.82,0,0,1,228.23,134.69Z\" fill=\"#7fe07a\"/><path d=\"M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z\"/>",
    back: "<path d=\"M160,48V208L80,128Z\" fill=\"#9fb6cf\"/><path d=\"M163.06,40.61a8,8,0,0,0-8.72,1.73l-80,80a8,8,0,0,0,0,11.32l80,80A8,8,0,0,0,168,208V48A8,8,0,0,0,163.06,40.61ZM152,188.69,91.31,128,152,67.31Z\"/>",
    home: "<path d=\"M216,120v96H152V152H104v64H40V120a8,8,0,0,1,2.34-5.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,216,120Z\" fill=\"#ffc21a\"/><path d=\"M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z\"/>",
    lock: "<path d=\"M216,96V208a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8H208A8,8,0,0,1,216,96Z\" fill=\"#ffc21a\"/><path d=\"M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-68-56a12,12,0,1,1-12-12A12,12,0,0,1,140,152Z\"/>",
    modes: "<path d=\"M112,56v48a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8h48A8,8,0,0,1,112,56Zm88-8H152a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V56A8,8,0,0,0,200,48Zm-96,96H56a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V152A8,8,0,0,0,104,144Zm96,0H152a8,8,0,0,0-8,8v48a8,8,0,0,0,8,8h48a8,8,0,0,0,8-8V152A8,8,0,0,0,200,144Z\" fill=\"#ffc21a\"/><path d=\"M200,136H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48ZM104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Z\"/>",
    map: "<path d=\"M160,72V216L96,184V40Z\" fill=\"#7fd0ff\"/><path d=\"M228.92,49.69a8,8,0,0,0-6.86-1.45L160.93,63.52,99.58,32.84a8,8,0,0,0-5.52-.6l-64,16A8,8,0,0,0,24,56V200a8,8,0,0,0,9.94,7.76l61.13-15.28,61.35,30.68A8.15,8.15,0,0,0,160,224a8,8,0,0,0,1.94-.24l64-16A8,8,0,0,0,232,200V56A8,8,0,0,0,228.92,49.69ZM104,52.94l48,24V203.06l-48-24ZM40,62.25l48-12v127.5l-48,12Zm176,131.5-48,12V78.25l48-12Z\"/>",
    gift: "<path d=\"M208,128v72a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V128Z\" fill=\"#ff7fb0\"/><path d=\"M216,72H180.92c.39-.33.79-.65,1.17-1A29.53,29.53,0,0,0,192,49.57,32.62,32.62,0,0,0,158.44,16,29.53,29.53,0,0,0,137,25.91a54.94,54.94,0,0,0-9,14.48,54.94,54.94,0,0,0-9-14.48A29.53,29.53,0,0,0,97.56,16,32.62,32.62,0,0,0,64,49.57,29.53,29.53,0,0,0,73.91,71c.38.33.78.65,1.17,1H40A16,16,0,0,0,24,88v32a16,16,0,0,0,16,16v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V136a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM149,36.51a13.69,13.69,0,0,1,10-4.5h.49A16.62,16.62,0,0,1,176,49.08a13.69,13.69,0,0,1-4.5,10c-9.49,8.4-25.24,11.36-35,12.4C137.7,60.89,141,45.5,149,36.51Zm-64.09.36A16.63,16.63,0,0,1,96.59,32h.49a13.69,13.69,0,0,1,10,4.5c8.39,9.48,11.35,25.2,12.39,34.92-9.72-1-25.44-4-34.92-12.39a13.69,13.69,0,0,1-4.5-10A16.6,16.6,0,0,1,84.87,36.87ZM40,88h80v32H40Zm16,48h64v64H56Zm144,64H136V136h64Zm16-80H136V88h80v32Z\"/>",
    wardrobe: "<path d=\"M232,192H24a8,8,0,0,1-4.8-14.4L128,96l108.79,81.6A8,8,0,0,1,232,192Z\" fill=\"#7fd0ff\"/><path d=\"M241.57,171.2,141.33,96l23.46-17.6A8,8,0,0,0,168,72a40,40,0,1,0-80,0,8,8,0,0,0,16,0,24,24,0,0,1,47.69-3.78L123.34,89.49l-.28.22L14.43,171.2A16,16,0,0,0,24,200H232a16,16,0,0,0,9.6-28.8ZM232,184H24l104-78,104,78Z\"/>",
    salon: "<path d=\"M224,96v16a32,32,0,0,1-64,0V96H96v16a32,32,0,0,1-64,0V96L46.34,45.8A8,8,0,0,1,54,40H202a8,8,0,0,1,7.69,5.8Z\" fill=\"#ff9a5c\"/><path d=\"M231.69,93.81,217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.81A7.94,7.94,0,0,0,24,96v16a40,40,0,0,0,16,32v72a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V144a40,40,0,0,0,16-32V96A7.94,7.94,0,0,0,231.69,93.81ZM54,48H202l11.42,40H42.61Zm98,56v8a24,24,0,0,1-48,0v-8ZM51.06,132.2A24,24,0,0,1,40,112v-8H88v8a24,24,0,0,1-35.12,21.26A7.88,7.88,0,0,0,51.06,132.2ZM200,208H56V151.2a40.57,40.57,0,0,0,8,.8,40,40,0,0,0,32-16,40,40,0,0,0,64,0,40,40,0,0,0,32,16,40.57,40.57,0,0,0,8-.8Zm16-96a24,24,0,0,1-11.07,20.2,8.08,8.08,0,0,0-1.8,1.05A24,24,0,0,1,168,112v-8h48Z\"/>",
    styles: "<path d=\"M232,56V200H160a32,32,0,0,0-32,32,32,32,0,0,0-32-32H24V56H96a32,32,0,0,1,32,32,32,32,0,0,1,32-32Z\" fill=\"#7fe0b8\"/><path d=\"M232,48H160a40,40,0,0,0-32,16A40,40,0,0,0,96,48H24a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H96a24,24,0,0,1,24,24,8,8,0,0,0,16,0,24,24,0,0,1,24-24h72a8,8,0,0,0,8-8V56A8,8,0,0,0,232,48ZM96,192H32V64H96a24,24,0,0,1,24,24V200A39.81,39.81,0,0,0,96,192Zm128,0H160a39.81,39.81,0,0,0-24,8V88a24,24,0,0,1,24-24h64Z\"/>",
    regulars: "<path d=\"M136,108A52,52,0,1,1,84,56,52,52,0,0,1,136,108Z\" fill=\"#ff7fb0\"/><path d=\"M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z\"/>",
    orders: "<path d=\"M208,48V216a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H96a39.83,39.83,0,0,0-8,24v8h80V64a39.83,39.83,0,0,0-8-24h40A8,8,0,0,1,208,48Z\" fill=\"#7fd0ff\"/><path d=\"M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z\"/>",
    freestyle: "<path d=\"M40.2,95.8a28,28,0,1,1,39.6,0A28,28,0,0,1,40.2,95.8Zm0,64.4a28,28,0,1,0,39.6,0A28,28,0,0,0,40.2,160.2Z\" fill=\"#ffc21a\"/><path d=\"M157.73,113.13A8,8,0,0,1,159.82,102L227.48,55.7a8,8,0,0,1,9,13.21l-67.67,46.3a7.92,7.92,0,0,1-4.51,1.4A8,8,0,0,1,157.73,113.13Zm80.87,85.09a8,8,0,0,1-11.12,2.08L136,137.7,93.49,166.78a36,36,0,1,1-9-13.19L121.83,128,84.44,102.41a35.86,35.86,0,1,1,9-13.19l143,97.87A8,8,0,0,1,238.6,198.22ZM80,180a20,20,0,1,0-5.86,14.14A19.85,19.85,0,0,0,80,180ZM74.14,90.13a20,20,0,1,0-28.28,0A19.85,19.85,0,0,0,74.14,90.13Z\"/>",
    rescue: "<path d=\"M224,72V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H216A8,8,0,0,1,224,72Z\" fill=\"#ff8078\"/><path d=\"M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Zm-56-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V144H104a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,136Z\"/>",
    rush: "<path d=\"M96,240l16-80L48,136,160,16,144,96l64,24Z\" fill=\"#ffc21a\"/><path d=\"M215.79,118.17a8,8,0,0,0-5-5.66L153.18,90.9l14.66-73.33a8,8,0,0,0-13.69-7l-112,120a8,8,0,0,0,3,13l57.63,21.61L88.16,238.43a8,8,0,0,0,13.69,7l112-120A8,8,0,0,0,215.79,118.17ZM109.37,214l10.47-52.38a8,8,0,0,0-5-9.06L62,132.71l84.62-90.66L136.16,94.43a8,8,0,0,0,5,9.06l52.8,19.8Z\"/>",
    medal: "<path d=\"M200,48v63.1c0,39.7-31.75,72.6-71.45,72.9A72,72,0,0,1,56,112V48Z\" fill=\"#ffc21a\"/><path d=\"M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-29,64.64-64,64.9a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z\"/>",
    video: "<path d=\"M128,32a96,96,0,1,0,96,96A96,96,0,0,0,128,32ZM108,168V88l64,40Z\" fill=\"#7fd0ff\"/><path d=\"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48.24-94.78-64-40A8,8,0,0,0,100,88v80a8,8,0,0,0,12.24,6.78l64-40a8,8,0,0,0,0-13.56ZM116,153.57V102.43L156.91,128Z\"/>",
    tick: "<path d=\"M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z\" fill=\"#7fe07a\"/><path d=\"M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z\"/>",
    swap: "<path d=\"M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z\" fill=\"#7fd0ff\"/><path d=\"M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h28.69L182.06,73.37a79.56,79.56,0,0,0-56.13-23.43h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27a96,96,0,0,1,135,.79L208,76.69V48a8,8,0,0,1,16,0ZM186.41,183.29a80,80,0,0,1-112.47-.66L59.31,168H88a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V179.31l14.63,14.63A95.43,95.43,0,0,0,130,222.06h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z\"/>",
    daily: "<path d=\"M216,48V88H40V48a8,8,0,0,1,8-8H208A8,8,0,0,1,216,48Z\" fill=\"#ff8078\"/><path d=\"M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-38.34-85.66a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L116,164.69l42.34-42.35A8,8,0,0,1,169.66,122.34Z\"/>",
    sound: "<path d=\"M80,88v80H32a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8Z\" fill=\"#7fd0ff\"/><path d=\"M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM32,96H72v64H32ZM144,207.64,88,164.09V91.91l56-43.55Zm54-106.08a40,40,0,0,1,0,52.88,8,8,0,0,1-12-10.58,24,24,0,0,0,0-31.72,8,8,0,0,1,12-10.58ZM248,128a79.9,79.9,0,0,1-20.37,53.34,8,8,0,0,1-11.92-10.67,64,64,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67A79.83,79.83,0,0,1,248,128Z\"/>",
    mute: "<path d=\"M80,88v80H32a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8Z\" fill=\"#ff8078\"/><path d=\"M53.92,34.62A8,8,0,1,0,42.08,45.38L73.55,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V175.09l42.08,46.29a8,8,0,1,0,11.84-10.76ZM32,96H72v64H32ZM144,207.64,88,164.09V95.89l56,61.6Zm42-63.77a24,24,0,0,0,0-31.72,8,8,0,1,1,12-10.57,40,40,0,0,1,0,52.88,8,8,0,0,1-12-10.59Zm-80.16-76a8,8,0,0,1,1.4-11.23l39.85-31A8,8,0,0,1,160,32v74.83a8,8,0,0,1-16,0V48.36l-26.94,21A8,8,0,0,1,105.84,67.91ZM248,128a79.9,79.9,0,0,1-20.37,53.34,8,8,0,0,1-11.92-10.67,64,64,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67A79.83,79.83,0,0,1,248,128Z\"/>",
    undo: "<path d=\"M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z\" fill=\"#ffc21a\"/><path d=\"M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z\"/>",
    // no beard icon exists in the set: drawn on the same 256 grid, stroke and accent
    beards: `<path d="M52 92v44c0 48 34 92 76 92s76-44 76-92V92c-13 22-32 33-52 33-10 0-17-7-24-7s-14 7-24 7c-20 0-39-11-52-33z" fill="#c98f5a"/><path d="M52 92v44c0 48 34 92 76 92s76-44 76-92V92c-13 22-32 33-52 33-10 0-17-7-24-7s-14 7-24 7c-20 0-39-11-52-33z" fill="none" stroke="currentColor" stroke-width="16" stroke-linejoin="round"/><path d="M104 160c8 7 16 10 24 10s16-3 24-10" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round"/>`,
  };
  let uid = 0;
  // the coin: a struck gold piece with a milled rim, a bevel, a light from the top left and crossed shears in relief
  function coin(size) {
    const u = 'hc' + (++uid), S = size ? ` width="${size}" height="${size}"` : '', compact = !!size && size <= 28, count = compact ? 18 : 36;
    // At 18--28 CSS pixels the original 36 one-pixel rim cuts land between device pixels and read as dirt. The compact
    // strike keeps the same coin, bevel, shears and highlight, with every other milled cut retained at a drawable width.
    const ticks = Array.from({ length: count }, (_, i) => { const a = (i * Math.PI * 2) / count, c = Math.cos(a), s = Math.sin(a); return `M${(24 + c * 20.2).toFixed(2)} ${(24 + s * 20.2).toFixed(2)}L${(24 + c * 22.6).toFixed(2)} ${(24 + s * 22.6).toFixed(2)}`; }).join('');
    return `<svg class="hsc-ic hsc-ic-coin${compact ? ' compact' : ''}" viewBox="0 0 48 48"${S} shape-rendering="geometricPrecision" aria-hidden="true"><defs>
<radialGradient id="${u}a" cx=".36" cy=".3" r=".85"><stop offset="0" stop-color="#fff3b0"/><stop offset=".42" stop-color="#ffd24a"/><stop offset=".78" stop-color="#f0a315"/><stop offset="1" stop-color="#b86b05"/></radialGradient>
<linearGradient id="${u}b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff7c9"/><stop offset=".5" stop-color="#f2b021"/><stop offset="1" stop-color="#8f4f02"/></linearGradient>
<linearGradient id="${u}c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c47a08"/><stop offset="1" stop-color="#ffe27a"/></linearGradient></defs>
<circle cx="24" cy="25.4" r="22.6" fill="#7a4300"/><circle cx="24" cy="24" r="22.6" fill="url(#${u}b)"/><path d="${ticks}" stroke="#a9650a" stroke-width="${compact ? 1.8 : 1.5}" stroke-linecap="round" opacity=".75"/>
<circle cx="24" cy="24" r="19.2" fill="url(#${u}c)"/><circle cx="24" cy="24" r="17.6" fill="url(#${u}a)"/>
<g fill="none" stroke-linecap="round" stroke-linejoin="round"><g stroke="#fff4b8" stroke-width="2.6" transform="translate(-.5 -.6)"><path d="M17.5 14.5L30 31M30.5 14.5L18 31"/><circle cx="16.4" cy="33.4" r="3.1"/><circle cx="31.6" cy="33.4" r="3.1"/></g><g stroke="#a65c04" stroke-width="2.6"><path d="M17.5 14.5L30 31M30.5 14.5L18 31"/><circle cx="16.4" cy="33.4" r="3.1"/><circle cx="31.6" cy="33.4" r="3.1"/></g></g>
<path d="M9.5 19.5A15.6 15.6 0 0 1 21 8.7" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".9"/><circle cx="12.3" cy="13.2" r="1.4" fill="#fff"/></svg>`;
  }
  HSC.levelBadge = function (n, size) {
    const u = 'hl' + (++uid), S = size ? ` width="${size}" height="${size}"` : '', t = String(n), fs = t.length > 2 ? 15 : t.length > 1 ? 19 : 22;
    return `<svg class="hsc-ic hsc-ic-level" viewBox="0 0 48 48"${S} aria-hidden="true"><defs><linearGradient id="${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6fc2ff"/><stop offset="1" stop-color="#1f62d6"/></linearGradient></defs><path d="M24 2.5l18.6 10.75v21.5L24 45.5 5.4 34.75v-21.5z" fill="url(#${u})" stroke="${K}" stroke-width="3" stroke-linejoin="round"/><path d="M10 15.5L24 7.4l14 8.1" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/><text x="24" y="${24 + fs * 0.36}" text-anchor="middle" font-family="Arial Rounded MT Bold,Nunito,system-ui,sans-serif" font-weight="900" font-size="${fs}" fill="#fff" stroke="${K}" stroke-width="2.4" paint-order="stroke">${t}</text></svg>`;
  };
  HSC.icon = function (name, size) {
    if (name === 'coin') return coin(size);
    const body = ICON[name];
    if (!body) return '';
    return `<svg class="hsc-ic hsc-ic-${name}" viewBox="0 0 256 256" fill="${K}" color="${K}"${size ? ` width="${size}" height="${size}"` : ''} aria-hidden="true">${body}</svg>`;
  };
  // the icon as a CSS image, for buttons the frozen game draws itself (their own glyph is hidden, the control unchanged)
  HSC.iconCss = (name) => `url("data:image/svg+xml,${encodeURIComponent(HSC.icon(name).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" '))}")`;
  HSC.ICON_NAMES = Object.keys(ICON).concat('coin');
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1; owner request 5 November 2026): the feel of the menus.
//   sound   soft ASMR taps, synthesised (no audio files): a short wooden "tok" when a button goes down, a lighter
//           click when it comes up, a swish between screens, a sparkle and coin clinks for rewards. They follow the
//           game's own mute and volume.
//   touch   a small haptic tick on press (the settings' vibration switch applies, settings.js)
//   ripple  a liquid ring spreading from the finger on every menu button
// Any element inside the menus marked as a button gets all three; nothing in the cutting screen is touched.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  const view = () => { try { return globalThis.skinFadeStudio.getView(); } catch (e) { return null; } };
  const S = { ctx: null, out: null, noise: null };
  function ac() {
    const v = view();
    if (!v || !v.audio) return null;
    // the one audio engine (audio.js): its context and limiter, this file's own level
    const A = HSC.audio;
    S.ctx = A && A.ctx({ ui: true });
    if (!S.ctx) return null;
    S.out = A.bus('ui', 0.5);
    if (!S.noise) S.noise = A.noiseBuffer('white');
    return S.ctx;
  }
  // a damped sine "tok": wood block on press, a higher, quieter tick on release
  function tok(f, len, vol) {
    const c = ac();
    if (!c) return;
    const t = c.currentTime, o = c.createOscillator(), g = c.createGain(), bp = c.createBiquadFilter();
    o.type = 'sine';
    o.frequency.setValueAtTime(f * 1.6, t);
    o.frequency.exponentialRampToValueAtTime(f, t + 0.012);
    bp.type = 'bandpass'; bp.frequency.value = f * 1.2; bp.Q.value = 1.4;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    o.connect(bp).connect(g).connect(S.out);
    o.start(t); o.stop(t + len + 0.02);
  }
  // filtered noise: a swish (falling band) or a soft brush
  function swish(from, to, len, vol) {
    const c = ac();
    if (!c) return;
    const t = c.currentTime, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = S.noise;
    f.type = 'bandpass'; f.Q.value = 0.9;
    f.frequency.setValueAtTime(from, t);
    f.frequency.exponentialRampToValueAtTime(to, t + len);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + len * 0.35);
    g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    s.connect(f).connect(g).connect(S.out);
    s.start(t, Math.random() * 0.5, len + 0.05);
  }
  function chime(notes, gap, vol) {
    const c = ac();
    if (!c) return;
    notes.forEach((f, i) => {
      const t = c.currentTime + i * gap, o = c.createOscillator(), o2 = c.createOscillator(), g = c.createGain();
      o.type = 'sine'; o.frequency.value = f; o2.type = 'sine'; o2.frequency.value = f * 2.01;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
      o.connect(g); o2.connect(g); g.connect(S.out);
      o.start(t); o2.start(t); o.stop(t + 0.65); o2.stop(t + 0.65);
    });
  }
  const SND = {
    down: () => { tok(420 + Math.random() * 40, 0.09, 0.32); },
    up: () => tok(980 + Math.random() * 60, 0.05, 0.12),
    swish: () => swish(2600, 700, 0.22, 0.16),
    back: () => swish(700, 2200, 0.2, 0.14),
    open: () => { swish(1800, 900, 0.18, 0.12); tok(620, 0.08, 0.18); },
    nope: () => { tok(240, 0.08, 0.3); HSC.lifecycle.timeout(() => tok(200, 0.09, 0.26), 90); },
    reward: () => chime([1046.5, 1318.5, 1568, 2093], 0.07, 0.16),
    coin: () => { chime([2637, 3136], 0.05, 0.1); },
    // the Rush clock: quiet enough to sit under the clipper
    tick: () => tok(1500, 0.035, 0.1),
    tock: () => tok(1120, 0.04, 0.1),
    bell: () => chime([880, 1320], 0.14, 0.2),
  };
  HSC.fx = { play: (k) => { try { SND[k] && SND[k](); } catch (e) {} } };

  // ---- every button in the menus: sound, haptic tick and a ripple ----
  const MENUS = '#hsc-menu,#hsc-salon,#hsc-set,#hsc-score';
  const PRESSABLE = 'button,[role=button],.hsc-btn';
  const st = document.createElement('style');
  st.textContent = `
.hsc-rip{position:absolute;inset:0;border-radius:inherit;overflow:hidden;pointer-events:none;z-index:3}
.hsc-ripple{position:absolute;border-radius:50%;pointer-events:none;background:radial-gradient(circle,#ffffffb0 0,#ffffff60 45%,#ffffff00 70%);transform:scale(0);animation:hsc-ripple .55s cubic-bezier(.2,.7,.3,1) forwards;z-index:3;mix-blend-mode:soft-light}
@keyframes hsc-ripple{to{transform:scale(1);opacity:0}}
@media (prefers-reduced-motion:reduce){.hsc-ripple{display:none}}
`;
  (document.head || document.documentElement).appendChild(st);
  let pressed = null;
  addEventListener('pointerdown', (e) => {
    const b = e.target.closest && e.target.closest(PRESSABLE);
    if (!b || !b.closest(MENUS) || b.disabled) return;
    pressed = b;
    SND.down();
    // the ripple, from the finger, sized to cover the button
    const r = b.getBoundingClientRect(), z = parseFloat(getComputedStyle(b).zoom) || 1;
    if (getComputedStyle(b).position === 'static') b.style.position = 'relative';
    // the ring is clipped to the button's own rounded shape (a wrapper), so nothing outside it is cut off
    const S2 = (HSC.S || 1) * z, size = Math.hypot(r.width, r.height) * 2 / S2;
    const w = document.createElement('span'); w.className = 'hsc-rip';
    const k = document.createElement('span'); k.className = 'hsc-ripple';
    Object.assign(k.style, { width: size + 'px', height: size + 'px', left: (e.clientX - r.left) / S2 - size / 2 + 'px', top: (e.clientY - r.top) / S2 - size / 2 + 'px' });
    w.appendChild(k); b.appendChild(w);
    HSC.lifecycle.timeout(() => w.remove(), 600);
  }, true);
  addEventListener('pointerup', () => { if (pressed) { SND.up(); pressed = null; } }, true);
  addEventListener('pointercancel', () => { pressed = null; }, true);
  // a refused tap (HSC.nope) sounds like one
  const nope = HSC.nope;
  const wrapNope = () => { if (HSC.nope && !HSC.nope.__fx) { const n = HSC.nope; HSC.nope = (el) => { SND.nope(); return n(el); }; HSC.nope.__fx = true; } };
  if (nope) wrapNope(); else HSC.lifecycle.timeout(wrapNope, 1500);
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1): the economy (docs/ECONOMY-ARCHITECTURE.md, ECONOMY-BALANCE-MODEL.md,
// ECONOMY-IMPLEMENTATION-AND-QA.md; owner-approved and locked 5 November 2026). Rollout Gate A: offline economy.
//
// Pure logic: one versioned configuration holds every number, and every coin change is one transaction with an
// idempotency key, so a replayed reveal, a duplicate ad callback or a reload can never pay twice.
//
//   job payout   net = haircut fee - operating cost + organic tip + demand bonus. Stars decide the
//                tip (0 / 25 / 60% of the net fee; 60% from the 7 November 2026 calibration); regular +4 and VIP +25% of the net fee apply to the tip, which is then capped at the net fee. A rewarded triple adds two tips, as its
//                own transaction.
//   bill         the first five contracts are sponsored; each later five-contract cycle starts with a 60-coin
//                operating bill, posted at the preceding result boundary so it is visible before the next shift,
//                into debt. The balance is signed: debt never blocks play; discretionary buys need the price.
//   milestones   career facts pay once (first haircut, home chapter, licence, first city showcase, ...).
//   ledger       the balance and lifetime totals by category are authoritative; a bounded recent ledger explains
//                them. Recent idempotency keys are kept in a bounded ring; career contracts are idempotent by id.
// Not here: Play Billing (Gate C), interstitial changes (Gate D), staff and facilities (Gate E).
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  const CONFIG = {
    version: 2,
    // [gross fee, operating cost] per contract type (balance model section 3)
    fee: { requests: [28, 4], fix: [30, 6], beard: [26, 4], rush: [13, 2], showcase: [52, 8], free: [0, 0] },
    // the result video: two more tips, never less than the floor. It comes at random, in every mode, so seeing it is a small
    // relief and a reason for one more customer. After each offer a hidden wait is drawn: waits[n] is the chance of n results
    // with no video, so no count ever tells the player when it is due. Quick Play earns only this, a few a day
    video: { floor: 15, practicePerDay: 5, waits: [0.5, 0.25, 0.12, 0.08, 0.05] },
    flatTip: 6, // Rescue and Beards have no order to score: the barber's judgment earns a set tip, so the result video stays
    tipShare: { 1: 0, 2: 0.25, 3: 0.6 }, // of the net fee
    regular: 4, vipShare: 0.25, rushMax: 5,
    // owner decision 7 November 2026: Rush is two to three times faster than other jobs, so it pays about 2.5 times less a
    // job (fee 32 -> 13, time bonus up to 12 -> 5) and earns about the same a minute. The first 20 paid jobs forgive a
    // weak cut: a 1-star job still earns the 2-star tip, because new players leave over bad early results, not prices
    early: { jobs: 20, tipShare: 0.25 },
    demand: { share: 0.2, max: 12, perShift: 3, shiftLength: 5 },
    // Quick Play pays a little for real work, up to a daily limit: no bill, no level, and never worth farming over paid jobs
    quickPlay: { pay: 5, perDay: 10 },
    // a video toward the wishlist, and the one-time Starter Pack for when Play Billing goes in (shown after the first shop
    // visit or wishlist, once three customers are done; Monetization Strategy section 11)
    wishVideo: { coins: 40, perDay: 2 },
    bill: { every: 5, amount: 60, subsidised: 5, lines: { rent: 30, utilities: 15, cleaning: 10, supplies: 5 } },
    // owner decision 6 November 2026 (economy simulator): one-off payouts cut so ordinary work carries more of the income; paid milestones keep their keys and are never repaid or taken back
    milestones: { firstHaircut: 40, homeChapter: 75, licence: 300, cityShowcase: 50, cityMastery: 100, cityChapter: 20, tour: 200 },
    levels: [[2, 5, 50], [6, 9, 75], [10, 12, 100]], // one-time coins for reaching a level; none after 12
    goal: 25, // one daily task
    gift: { at: [600, 1200, 1800], pay: [20, 40, 60] }, // the play-time gift: seconds played today and what each pays
    salon: [100, 300, 800, 1750], // price of tier 0->1, 1->2, 2->3, 3->4 in every slot
    wardrobe: { starter: 0, common: 120, uncommon: 350, rare: 900, premium: 2400 },
    ledgerSize: 60, keyRing: 300,
    maxBalance: 999999999, minBalance: -999999999,
  };

  function fresh() {
    return { v: 1, cfg: CONFIG.version, balance: 0, seq: 0, ledger: [], keys: [], sources: {}, sinks: {}, paid: 0, cycle: { id: 0, billed: 0 }, milestones: [], levelsPaid: 0, daily: null, freestyleThanked: false, demand: null, migrated: false };
  }
  const clampBal = (n) => Math.max(CONFIG.minBalance, Math.min(CONFIG.maxBalance, n));

  // ---- one transaction: idempotent by key; returns { eco, txn, duplicate } (the input is not changed) ----
  function apply(eco0, t) {
    if (!t || !t.key || !Number.isSafeInteger(t.amount) || Math.abs(t.amount) > 1e9) return { eco: eco0, error: 'bad-transaction' };
    if (eco0.keys.includes(t.key)) return { eco: eco0, duplicate: true, txn: eco0.ledger.find((x) => x.key === t.key) || null };
    // discretionary purchases need the price in hand; mandatory costs post even into debt
    if (t.type === 'buy' && eco0.balance < -t.amount) return { eco: eco0, error: 'insufficient' };
    const eco = JSON.parse(JSON.stringify(eco0));
    const before = eco.balance;
    eco.balance = clampBal(before + t.amount);
    eco.seq++;
    const txn = { id: eco.seq, key: t.key, type: t.type, cat: t.cat, amount: t.amount, item: t.item || null, ref: t.ref || null, before, after: eco.balance, cfg: CONFIG.version, lines: t.lines || null };
    eco.ledger.push(txn); if (eco.ledger.length > CONFIG.ledgerSize) eco.ledger.splice(0, eco.ledger.length - CONFIG.ledgerSize);
    eco.keys.push(t.key); if (eco.keys.length > CONFIG.keyRing) eco.keys.splice(0, eco.keys.length - CONFIG.keyRing);
    const book = t.amount >= 0 ? eco.sources : eco.sinks;
    book[t.cat] = (book[t.cat] || 0) + Math.abs(t.amount);
    return { eco, txn };
  }

  // ---- the job payout (balance model sections 2-7) ----
  // job: { kind (mode or 'showcase'), stars, judged (no order: a set tip), valid, regular, vip, rushBonus (0..12), demandMatch }
  function payout(job) {
    const kind = job.kind in CONFIG.fee ? job.kind : 'requests';
    const [gross, cost] = CONFIG.fee[kind];
    const net = gross - cost;
    if (!job.valid || kind === 'free') return { total: 0, net: 0, tip: 0, lines: [], kind };
    // the organic tip: from stars, then regular and VIP, capped at the net fee
    let tip = job.judged ? CONFIG.flatTip : net * Math.max(CONFIG.tipShare[job.stars] || 0, job.early ? CONFIG.early.tipShare : 0);
    if (job.regular) tip += CONFIG.regular;
    if (job.vip) tip += net * CONFIG.vipShare;
    tip = Math.round(Math.min(tip, net));
    const rush = kind === 'rush' ? Math.max(0, Math.min(CONFIG.rushMax, Math.round(job.rushBonus || 0))) : 0;
    const demand = job.demandMatch ? Math.min(CONFIG.demand.max, Math.round(net * CONFIG.demand.share)) : 0;
    const lines = [['fee', gross], ['cost', -cost]];
    if (tip) lines.push(['tip', tip]);
    if (rush) lines.push(['rush', rush]);
    if (demand) lines.push(['demand', demand]);
    const total = lines.reduce((a, l) => a + l[1], 0);
    return { total, net, tip, lines, kind };
  }

  // ---- demand shifts (balance model section 7): each shift of five paid contracts highlights up to two modes ----
  // Derived from the paid-contract count, so nothing to save and nothing a reload can re-roll: a seeded permutation
  // per pass of the list means every eligible mode appears before the deck repeats. Only the bonuses used this shift
  // are stored. Quick Play is never a target; demand never depends on who the customer is.
  const DEMAND_MODES = ['requests', 'fix', 'beard', 'rush'];
  const shiftOf = (paid) => Math.floor(paid / CONFIG.demand.shiftLength);
  function demandModes(paid, eligible) {
    const list = DEMAND_MODES.filter((m) => !eligible || eligible.includes(m));
    if (!list.length) return [];
    const shift = shiftOf(paid), n = Math.min(2, list.length), out = [];
    const deck = (c) => { const a = list.slice(); let h = (c + 1) * 2654435761 >>> 0; for (let i = a.length - 1; i > 0; i--) { h = Math.imul(h ^ (h >>> 15), 0x2c1b3c6d) >>> 0; const j = h % (i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    for (let k = 0, i = shift * n; out.length < n && k < n + list.length; k++, i++) { const m = deck(Math.floor(i / list.length))[i % list.length]; if (!out.includes(m)) out.push(m); }
    return out;
  }
  function demandMatch(eco, mode, eligible) {
    const used = eco.demand && eco.demand.shift === shiftOf(eco.paid) ? eco.demand.used : 0;
    return used < CONFIG.demand.perShift && demandModes(eco.paid, eligible).includes(mode);
  }

  // ---- paying a finished job: the base transaction, then the operating bill when a cycle closes ----
  function payJob(eco0, key, job) {
    const p = payout(job);
    if (!p.total && !p.lines.length) return { eco: eco0, payout: p };
    let r = apply(eco0, { key, type: 'earn', cat: 'job', amount: p.total, lines: p.lines, ref: job.ref || null });
    if (r.error || r.duplicate) return Object.assign(r, { payout: p });
    let eco = r.eco;
    if (job.demandMatch) { const sh = shiftOf(eco.paid), d = eco.demand; eco.demand = { shift: sh, used: (d && d.shift === sh ? d.used : 0) + 1 }; }
    eco.paid++;
    // At the end of jobs 5/10/15..., post the next cycle's bill. The result screen therefore discloses it before
    // the player can start jobs 6/11/16..., while a duplicate result cannot post it twice.
    const B = CONFIG.bill;
    let bill = null;
    if (eco.paid >= B.subsidised && eco.paid % B.every === 0) {
      const cycle = eco.paid / B.every;
      const b = apply(eco, { key: 'bill:' + cycle, type: 'cost', cat: 'bill', amount: -B.amount, lines: Object.entries(B.lines).map(([k, v]) => [k, -v]) });
      eco = b.eco; bill = b.txn || null; eco.cycle = { id: cycle, billed: cycle };
    }
    return { eco, txn: r.txn, payout: p, bill };
  }
  // the next bill: how many paid contracts until it posts (for the player's view)
  function billDue(eco) {
    const B = CONFIG.bill;
    if (eco.paid < B.subsidised) return { sponsored: B.subsidised - eco.paid, amount: B.amount };
    return { inJobs: B.every - (eco.paid % B.every), amount: B.amount };
  }
  // the rewarded result video: two more organic tips, at least the floor, keyed to the job so a duplicate callback cannot pay again
  const videoPay = (tip) => Math.max(2 * Math.max(0, tip | 0), CONFIG.video.floor);
  // the hidden wait until the next offer, from a roll of 0..1
  const videoWait = (roll) => { let a = 0; const w = CONFIG.video.waits; for (let i = 0; i < w.length; i++) { a += w[i]; if (roll < a) return i; } return w.length - 1; };
  function tripleTip(eco, jobKey, tip) { return apply(eco, { key: jobKey + ':triple', type: 'reward', cat: 'rewarded', amount: videoPay(tip) }); }

  // ---- career milestones (balance model section 9): one payment per career fact ----
  function milestonesFor(events, pos, firstHaircut) {
    const out = [];
    if (firstHaircut) out.push(['first-haircut', CONFIG.milestones.firstHaircut]);
    for (const e of events || []) {
      if (e === 'licence-complete') out.push(['licence', CONFIG.milestones.licence]);
      else if (e.startsWith('branch-established:')) out.push(['showcase:' + e.split(':')[1], CONFIG.milestones.cityShowcase]);
      else if (e.startsWith('tour-complete:')) out.push(['tour:' + e.split(':')[1], CONFIG.milestones.tour]);
      else if (e === 'chapter-complete' && pos) out.push(['chapter:' + pos.city + ':' + pos.visit + ':' + (pos.tour || 0), CONFIG.milestones.cityChapter]);
    }
    if (pos && pos.licence && pos.slot === 4) out.push(['home-chapter:' + pos.visit, CONFIG.milestones.homeChapter]);
    return out;
  }
  // A milestone that can be reached again (a mastered city is still mastered on its next chapter) is also kept in
  // the permanent `milestones` list, because the idempotency key ring is bounded and would forget it. Chapter
  // milestones are unique per chapter, so only their key is kept.
  const PERMANENT = (id) => !id.startsWith('chapter:');
  function payMilestones(eco0, list) {
    let eco = eco0;
    const paid = [];
    for (const [id, amount] of list) {
      if (PERMANENT(id) && Array.isArray(eco.milestones) && eco.milestones.includes(id)) continue;
      const r = apply(eco, { key: 'milestone:' + id, type: 'earn', cat: 'milestone', amount });
      if (!r.duplicate && !r.error) paid.push([id, amount]);
      eco = r.eco;
      if (!r.error && PERMANENT(id)) { eco = Object.assign({}, eco, { milestones: (Array.isArray(eco.milestones) ? eco.milestones : []).concat([id]) }); }
    }
    return { eco, paid };
  }
  // level rewards: capped (no automatic coins after level 12); paid once per level, never twice after migration
  function levelReward(level) { const row = CONFIG.levels.find(([a, b]) => level >= a && level <= b); return row ? row[2] : 0; }
  function payLevels(eco0, level) {
    let eco = eco0;
    for (let l = Math.max(2, eco.levelsPaid + 1); l <= level; l++) {
      const n = levelReward(l);
      const r = apply(eco, { key: 'level:' + l, type: 'earn', cat: 'level', amount: n });
      eco = r.eco; eco.levelsPaid = Math.max(eco.levelsPaid, l);
    }
    return eco;
  }
  // a discretionary purchase: the balance must cover the price (debt never buys)
  function buy(eco, key, cat, price, item) { return apply(eco, { key, type: 'buy', cat, amount: -Math.abs(price | 0), item }); }
  // a grant from a daily, weekly or calendar claim (key = the claim id)
  function grant(eco, key, cat, amount) { return apply(eco, { key, type: 'earn', cat, amount: Math.max(0, amount | 0) }); }

  // ---- migration from the existing game (implementation contract section 6) ----
  // keeps every coin; levels already reached are recorded as paid so history is never paid twice
  function migrate(eco0, old) {
    if (eco0.migrated) return eco0;
    const eco = JSON.parse(JSON.stringify(eco0));
    eco.balance = clampBal(Math.max(0, old.coins | 0));
    eco.levelsPaid = Math.max(1, old.level | 0);
    eco.migrated = true;
    eco.seq++;
    eco.ledger.push({ id: eco.seq, key: 'migration', type: 'migration', cat: 'migration', amount: 0, before: eco.balance, after: eco.balance, cfg: CONFIG.version });
    eco.keys.push('migration');
    return eco;
  }
  // the seven-day source-to-sink ratio and shares (for the simulator and QA)
  function report(eco) {
    const src = Object.values(eco.sources).reduce((a, b) => a + b, 0), snk = Object.values(eco.sinks).reduce((a, b) => a + b, 0);
    return { balance: eco.balance, sources: eco.sources, sinks: eco.sinks, ratio: src ? snk / src : 0 };
  }

  HSC.economy = { CONFIG, fresh, apply, payout, payJob, demandModes, demandMatch, billDue, tripleTip, videoPay, videoWait, milestonesFor, payMilestones, levelReward, payLevels, buy, grant, migrate, report };
})(globalThis.HSC || (globalThis.HSC = {}));

// Ads-only browser economy. Loaded immediately after customers/economy.js and
// before the shop, rewards, salon, and career modules capture configuration.
(function applyPortalEconomy(HSC) {
  'use strict';
  const C = HSC.economy && HSC.economy.CONFIG;
  if (!C) throw new Error('Portal economy loaded before the shared economy');

  // Version 3 removes every real-money shortcut. It deliberately leaves the
  // haircut payouts and recurring operating bill unchanged: the ordinary route
  // must stay satisfying when an advert is blocked, unavailable, or disabled.
  C.version = 3;
  C.portalNoPurchases = true;
  C.portalDailyCosmeticUnlocks = 1;
  delete C.packs;
  delete C.starterPack;
  delete C.supporterBundle;

  // Lifecycle curve: quick first ownership, visible midgame progress, and
  // aspirational items that remain achievable without a payment shortcut.
  C.salon.splice(0, C.salon.length, 100, 250, 450, 700, 900);
  Object.assign(C.wardrobe, {
    starter: 0,
    common: 100,
    uncommon: 300,
    rare: 750,
    premium: 1600,
  });

  // Reduce repeated result prompts from about once per 1.83 customers to once
  // per 2.75 customers on average. The reward itself remains meaningful and
  // every direct-coin advert remains capped by the existing daily limits. The
  // portal build also lets the player choose one of the two daily cosmetic
  // offers; the other remains an earned-coin goal instead of a second advert.
  C.video.waits.splice(0, C.video.waits.length, 0.20, 0.25, 0.25, 0.20, 0.10);
})(globalThis.HSC || (globalThis.HSC = {}));

// YouTube Playables economy (owner direction, 16 November 2026). Loaded directly after the ads-only
// portal economy (desktop/portal-economy.js), which has already removed every real-money product and
// set the portal prices. This file changes only coin INCOME and the result video:
//
//   * Every paid haircut pays about 60% less (fees, tips and bonuses scaled), prices unchanged.
//   * The result video is offered after EVERY paid haircut and pays the haircut's full coins again
//     (a double), instead of two extra tips on a random subset of results.
//   * Recurring and one-off sources are scaled in proportion, so the bill keeps its share of income and
//     milestones keep their weight relative to ordinary work. The first-haircut milestone stays at 40 so
//     the first cosmetic remains a second-session goal.
//
// Android and the other portals keep their own values; this file is injected only into the YouTube build.
(function applyYouTubeEconomy(HSC) {
  'use strict';
  const E = HSC.economy;
  const C = E && E.CONFIG;
  if (!C || !C.portalNoPurchases) throw new Error('YouTube economy must load after the purchase-free portal economy');

  C.version = 4;
  C.youtubePlayables = true;

  // [gross fee, operating cost]: requests 24 -> 10 net, fix 24 -> 10, beard 22 -> 9, rush 11 -> 5, showcase 44 -> 18
  Object.assign(C.fee, { requests: [12, 2], fix: [13, 3], beard: [11, 2], rush: [6, 1], showcase: [22, 4], free: [0, 0] });
  C.flatTip = 3;          // Rescue / Beards judged tip (was 6)
  C.regular = 2;          // regular-customer tip bonus (was 4)
  C.rushMax = 2;          // Rush time bonus cap (was 5)
  C.demand.max = 5;       // demand bonus cap (was 12)
  C.quickPlay.pay = 2;    // Quick Play pay per real haircut (was 5), same daily limit

  // the result video: always offered, pays the haircut's coins again (at least the floor)
  C.video.floor = 6;
  C.video.waits.splice(0, C.video.waits.length, 1, 0, 0, 0, 0); // no hidden wait: every result
  C.video.double = true;

  C.wishVideo.coins = 20; // wishlist video (was 40), still twice a day
  C.goal = 12;            // daily task (was 25)
  C.gift.pay.splice(0, C.gift.pay.length, 10, 20, 30); // play-time gifts (were 20/40/60)

  // operating bill keeps ~the same share of income: 60 -> 25 every five paid haircuts
  C.bill.amount = 25;
  C.bill.lines = { rent: 12, utilities: 7, cleaning: 4, supplies: 2 };

  // one-off career payouts halved; the first haircut keeps its 40
  Object.assign(C.milestones, { homeChapter: 38, licence: 150, cityShowcase: 25, cityMastery: 50, cityChapter: 10, tour: 100 });
  C.levels.splice(0, C.levels.length, [2, 5, 25], [6, 9, 38], [10, 12, 50]);

  // The shared economy closes over its own videoPay/tripleTip. Replace both: the reward is the haircut's
  // paid total (passed by requests.js), never less than the floor, keyed exactly as before (`<job>:triple`)
  // so a duplicate callback or a reload still cannot pay twice.
  const videoPay = (total) => Math.max(Math.max(0, total | 0), C.video.floor);
  E.videoPay = videoPay;
  E.tripleTip = function (eco, jobKey, total) {
    return E.apply(eco, { key: jobKey + ':triple', type: 'reward', cat: 'rewarded', amount: videoPay(total) });
  };
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1; owner decision 6 November 2026): the gown, built around the customer in the
// chair. The frozen game's cape is one fixed shape made for the small YouTube and playable builds, and customers' necks
// differ by about 40%, so skin could cut through it. Here the cloth and the neck are rebuilt for each customer from their
// real neck and shoulders.
//
// Every neck starts inside the skin and comes out of it, so there can be no space between the neck and the gown from any
// angle, and it overlaps the cloth below it. Eight kinds of neck, all taken from real barber gowns:
//
//   snap  stand collar, metal snaps at the nape, white paper neck strip folded over it (the starting gown)
//   towel folded towel wrapped round the neck, its end overlapping at the nape
//   band  wide soft neckband lying on the shoulders, metal clasp
//   rib   knitted ribbed collar
//   hook  flat band with a hook-and-loop tab
//   neo   padded neoprene seal with one plastic snap
//   tie   thin binding tied in a bow
//   clip  cloth gathered at the neck over a paper strip, held by a barber's clip
//
// Each of the 600 gown designs keeps its id, colours, pattern and price, and gains one kind of neck (HSC.gownCut).
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  const AXIS = -0.35, BACK = -1.3, FRONT = -1.62, HEM = -7.5, TAU = Math.PI * 2;
  const NT = 128, TOP = -0.55, DY = 0.04, BOTTOM = -4, NY = Math.ceil((TOP - BOTTOM) / DY) + 1;
  const COLS = 160, ROWS = 110;
  const CUTS = ['snap', 'towel', 'band', 'rib', 'hook', 'neo', 'tie', 'clip'];
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const smooth = (x) => { x = clamp(x); return x * x * (3 - 2 * x); };
  const neckline = (t) => { const c = Math.max(0, Math.cos(t)); return BACK + (FRONT - BACK) * c * c; };

  // every design keeps a fixed neck of its own
  HSC.gownCut = (d) => (d.i === 0 ? 'snap' : CUTS[(Math.imul(d.i + 1, 2654435761) >>> 0) >>> 29]);
  // Gowns are bright (owner, 6 November 2026): a dark gown swallows a dark-skinned customer's neck, and browns, tans and
  // peaches sit too close to skin. Each such colour becomes its nearest bright one; ids, patterns and prices do not change.
  const BRIGHT = {
    charcoal: 'silver', jet: 'silver', graphite: 'silver', grey: 'silver', midnight: 'sky', navy: 'blue', steel: 'sky', denim: 'sky', indigo: 'violet',
    burgundy: 'candy-red', brown: 'orange', forest: 'green', olive: 'lime', tan: 'amber', mustard: 'amber', khaki: 'lime', sand: 'pearl', cream: 'pearl', peach: 'coral', rose: 'pink',
  };
  const bright = (c) => BRIGHT[c] || c;
  if (HSC.catalog) {
    for (const d of HSC.catalog.designs.gown) {
      const p = d.parts, main = bright(p.main), second = bright(p.second);
      d.parts = Object.assign({}, p, { main, second: second === main ? (main === 'white' ? 'sky' : 'white') : second, collar: bright(p.collar) });
    }
    // the starting gown: a plain light neutral
    const first = HSC.catalog.byKey.get('gown:0');
    if (first) first.parts = Object.assign({}, first.parts, { main: 'silver', second: 'white', collar: 'white' });
  }

  // ---- the customer: how far their neck and shoulders reach, by angle and height ----
  let tris = null;
  function profile(head) {
    const P = head.geometry.attributes.position.array, I = head.geometry.index.array, S = new Float32Array(NT * NY).fill(-1);
    if (!tris) { tris = []; for (let i = 0; i < I.length; i += 3) if (Math.min(P[I[i] * 3 + 1], P[I[i + 1] * 3 + 1], P[I[i + 2] * 3 + 1]) < TOP + 0.5) tris.push(I[i] * 3, I[i + 1] * 3, I[i + 2] * 3); }
    let m = 9187;
    const R = () => (m = Math.imul(m, 1664525) + 1013904223 >>> 0, m / 4294967296);
    const put = (x, y, z) => {
      if (y > TOP || y < BOTTOM) return;
      const a = Math.round(((Math.atan2(x, z - AXIS) + TAU) % TAU) / TAU * NT) % NT, b = Math.round((TOP - y) / DY), r = Math.hypot(x, z - AXIS);
      if (b >= 0 && b < NY && r > S[a * NY + b]) S[a * NY + b] = r;
    };
    for (let i = 0; i < tris.length; i += 3) {
      const a = tris[i], b = tris[i + 1], c = tris[i + 2];
      if (Math.min(P[a + 1], P[b + 1], P[c + 1]) > TOP) continue;
      const ux = P[b] - P[a], uy = P[b + 1] - P[a + 1], uz = P[b + 2] - P[a + 2], vx = P[c] - P[a], vy = P[c + 1] - P[a + 1], vz = P[c + 2] - P[a + 2];
      const area = Math.hypot(uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx) * 0.5, n = Math.min(60, Math.max(3, Math.ceil(area * 500)));
      for (let k = 0; k < n; k++) { let p = R(), q = R(); if (p + q > 1) { p = 1 - p; q = 1 - q; } put(P[a] + ux * p + vx * q, P[a + 1] + uy * p + vy * q, P[a + 2] + uz * p + vz * q); }
    }
    for (let pass = 0; pass < 30; pass++) {
      let open = 0;
      const s = S.slice();
      for (let a = 0; a < NT; a++) for (let b = 0; b < NY; b++) {
        if (s[a * NY + b] >= 0) continue;
        open++;
        const v = Math.max(s[((a + NT - 1) % NT) * NY + b], s[((a + 1) % NT) * NY + b], b ? s[a * NY + b - 1] : -1, b < NY - 1 ? s[a * NY + b + 1] : -1);
        if (v >= 0) S[a * NY + b] = v;
      }
      if (!open) break;
    }
    return S;
  }
  const along = (S, A, B, op) => {
    const t = new Float32Array(S.length), o = new Float32Array(S.length);
    for (let a = 0; a < NT; a++) for (let b = 0; b < NY; b++) { let v = op ? -1 : 0; for (let i = -A; i <= A; i++) { const x = S[((a + i + NT) % NT) * NY + b]; v = op ? Math.max(v, x) : v + x; } t[a * NY + b] = op ? v : v / (2 * A + 1); }
    for (let a = 0; a < NT; a++) for (let b = 0; b < NY; b++) { let v = op ? -1 : 0, n = 0; for (let j = -B; j <= B; j++) { const y = b + j; if (y < 0 || y >= NY) continue; const x = t[a * NY + y]; v = op ? Math.max(v, x) : v + x; n++; } o[a * NY + b] = op ? v : v / n; }
    return o;
  };
  const widen = (S, A, B) => along(S, A, B, true), soften = (S, A, B) => along(S, A, B, false);
  const look = (S, t, y) => {
    const f = ((t % TAU + TAU) % TAU) / TAU * NT, a = Math.floor(f), u = f - a, g = clamp((TOP - y) / DY, 0, NY - 1.001), b = Math.floor(g), v = g - b;
    const q = (i, j) => S[((i % NT + NT) % NT) * NY + j];
    return (q(a, b) * (1 - u) + q(a + 1, b) * u) * (1 - v) + (q(a, b + 1) * (1 - u) + q(a + 1, b + 1) * u) * v;
  };
  function shape(S) {
    // the neck: the real skin, smoothed a little; under the chin the jaw above the collar line is ignored
    const Q = S.slice();
    for (let a = 0; a < NT; a++) { const t = a / NT * TAU, top = Math.floor((TOP - (neckline(t) + 0.08)) / DY); if (Math.cos(t) > 0.25) for (let b = top - 1; b >= 0; b--) Q[a * NY + b] = Q[a * NY + top]; }
    const N = soften(Q, 2, 1);
    // the body: from the collar line down, widened and softened more with depth, so the cloth hangs rather than clings
    const B = new Float32Array(S.length);
    for (let a = 0; a < NT; a++) { const t = a / NT * TAU, top = Math.floor((TOP - (neckline(t) + 0.1)) / DY); for (let b = 0; b < NY; b++) B[a * NY + b] = b < top ? -1 : S[a * NY + b]; for (let b = top - 1; b >= 0; b--) B[a * NY + b] = B[a * NY + top]; }
    const down = (X) => { for (let a = 0; a < NT; a++) for (let b = 1; b < NY; b++) X[a * NY + b] = Math.max(X[a * NY + b], X[a * NY + b - 1]); return X; };
    const near = down(soften(widen(B, 6, 3), 6, 3)), far = soften(down(widen(B, 12, 6)), 12, 9), C = new Float32Array(S.length);
    for (let a = 0; a < NT; a++) { const t = a / NT * TAU; for (let b = 0; b < NY; b++) { const z = smooth((neckline(t) - (TOP - b * DY) - 0.3) / 0.9), i = a * NY + b; C[i] = near[i] + (far[i] - near[i]) * z; } }
    return { N, C: down(C) };
  }

  // ---- the cloth ----
  const grid = (rows, cols, fn) => {
    const pos = new Float32Array((rows + 1) * (cols + 1) * 3), uv = new Float32Array((rows + 1) * (cols + 1) * 2), ix = [];
    for (let r = 0, i = 0; r <= rows; r++) for (let c = 0; c <= cols; c++, i++) { const p = fn(r / rows, c / cols); pos[i * 3] = p[0]; pos[i * 3 + 1] = p[1]; pos[i * 3 + 2] = p[2]; uv[i * 2] = p[3] == null ? c / cols : p[3]; uv[i * 2 + 1] = p[4] == null ? r / rows : p[4]; }
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const a = r * (cols + 1) + c, b = a + cols + 1; ix.push(a, b, a + 1, a + 1, b, b + 1); }
    return { pos, uv, ix, rows, cols };
  };
  const at = (t, r, y, u, v) => [Math.sin(t) * r, y, AXIS + Math.cos(t) * r, u, v];
  const ridge = (x, p) => Math.pow(0.5 + 0.5 * Math.sin(x), p) * 2 - 1;
  const CLOTH = {
    nylon: { gap: 0.085, fall: 0.13, amp: 0.13, k1: 11, k2: 17, k3: 21, sharp: 1.5, fine: 0.04, nape: 0.05, grow: 1.9 },
    heavy: { gap: 0.1, fall: 0.15, amp: 0.17, k1: 9, k2: 15, k3: 19, sharp: 1.7, fine: 0.032, nape: 0.04, grow: 1.7 },
    crisp: { gap: 0.075, fall: 0.11, amp: 0.095, k1: 10, k2: 16, k3: 24, sharp: 1.3, fine: 0.02, nape: 0.022, grow: 2.2 },
    gathered: { gap: 0.09, fall: 0.13, amp: 0.14, k1: 11, k2: 18, k3: 28, sharp: 1.5, fine: 0.045, nape: 0.05, grow: 1.7 },
  };
  function fold(t, d, o) {
    const back = Math.max(0, -Math.cos(t)), side = Math.abs(Math.sin(t));
    const wob = 1.1 * Math.sin(t * 3 + d * 0.27 + 1.1) + 0.6 * Math.sin(t * 5 - d * 0.41 + 0.5) + 0.3 * Math.sin(t * 9 + d * 0.6);
    const tense = 1 - 0.55 * Math.exp(-Math.pow((side - 1) / 0.18, 2)) * (1 - smooth(d / 3.2));
    let f = o.amp * smooth(d / o.grow) * tense * (0.62 * ridge(t * o.k1 + wob, o.sharp) + 0.38 * ridge(t * o.k2 - wob * 1.3 + 1.9, o.sharp));
    f += o.fine * Math.exp(-d / 1.15) * smooth(d / 0.12) * (0.4 + 0.6 * back) * Math.sin(t * o.k3 + 1.7 * Math.sin(t * 5 + d * 0.6));
    f += o.nape * back * back * Math.exp(-d / 2.1) * smooth(d / 0.3) * ridge(t * 13 + 0.4 * Math.sin(d * 0.8), 1.5);
    return f;
  }
  // the outside of the cloth at this angle and height; x is where the cloth starts
  function clothAt(F, o, t, y, x) {
    const d = x - y, low = BOTTOM + 0.05, base = look(F.C, t, Math.max(y, low)) + o.gap + Math.max(0, low - y) * o.fall;
    const r0 = look(F.N, t, x) + 0.02, k = smooth(d / 0.22);
    return Math.max(r0, base * k + r0 * (1 - k)) + fold(t, d, o);
  }
  const cloth = (F, o, start, rows, cols, hem) => grid(rows, cols, (v, u) => {
    const t = u * TAU, x = start(t), y = x + (hem - x) * Math.pow(v, 1.55);
    return at(t, clothAt(F, o, t, y, x), y, u, v);
  });

  // ---- the necks ----
  // comes out of the skin at the top edge: e is how far the neck then stands off the skin
  const out = (s, e) => -0.03 + (0.03 + e) * smooth(s / 0.08);
  // a stand-up band following the neck, overlapping the cloth at its foot
  function band(F, o, start, top, height, e, cols) {
    return grid(16, cols, (s, u) => {
      const t = u * TAU, y = top(t) - height * s, x = start(t);
      let r = look(F.N, t, y) + out(s, e) + 0.012 * Math.sin(Math.PI * s);
      if (y < x - 0.02) r = Math.max(r, clothAt(F, o, t, y, x) + 0.014 + o.fine);
      return at(t, r, y, u * 10, s);
    });
  }
  const bandAt = (F, o, start, e) => (t, y) => { const x = start(t); let r = look(F.N, t, y) + e + 0.012; if (y < x - 0.02) r = Math.max(r, clothAt(F, o, t, y, x) + 0.014 + o.fine); return r; };
  // white paper strip: out of the skin, over the band's top edge and down its face
  function strip(F, top, cols) {
    const p = [[-0.035, 0.09], [0.002, 0.095], [0.024, 0.085], [0.042, 0.055], [0.052, 0], [0.054, -0.075]];
    return grid(15, cols, (s, u) => {
      const t = u * TAU, f = s * (p.length - 1), i = Math.min(p.length - 2, Math.floor(f)), k = f - i, y = top(t) + p[i][1] + (p[i + 1][1] - p[i][1]) * k;
      return at(t, look(F.N, t, y) + p[i][0] + (p[i + 1][0] - p[i][0]) * k + 0.005 * Math.sin(t * 17 + 1) + 0.003 * Math.sin(t * 31), y, u * 14, s);
    });
  }
  // a soft roll round the neck; the inner side is always inside the skin, at every height
  function roll(F, o, start, y0, a0, b0, opts, cols) {
    return grid(34, cols, (s, u) => {
      const t = u * TAU, ph = s * TAU, c = Math.cos(ph), q = Math.sin(ph), L = opts.lump || 0;
      const over = opts.overlap ? smooth((t - (Math.PI - 0.5)) / 0.035) * (1 - smooth((t - (Math.PI + 0.62)) / 0.03)) : 0;
      const lump = 1 + L * Math.sin(t * 3 + 1) + 0.7 * L * Math.sin(t * 5 + 2) + 0.4 * L * Math.sin(t * 11);
      const a = a0 * lump + 0.04 * over, b = b0 * (1 + 0.5 * L * Math.sin(t * 4 + 0.4)) + 0.02 * over;
      const sq = Math.sign(c) * Math.pow(Math.abs(c), opts.flat || 1), sr = Math.sign(q) * Math.pow(Math.abs(q), opts.flat ? 0.72 : 1);
      const y = y0(t) + 0.012 * over + b * sr;
      const step = opts.layers ? 0.04 * (1 - smooth((q + 0.18) / 0.06)) * (c > 0 ? 1 : 0) : 0;
      const spread = (opts.spread || 0) * smooth((0.1 - q) / 0.9) * (c > 0 ? 1 : 0.5);
      let r = look(F.N, t, y) + a * (sq + 0.8) + step + spread;
      if (c > 0 && y < start(t) - 0.02) r = Math.max(r, clothAt(F, o, t, y, start(t)) + 0.012);
      return at(t, r, y, u * 22, s * 5);
    });
  }
  // a soft rounded patch lying on a surface; rot turns it, sizes are in the game's units
  function patch(R, tc, yc, hw, hh, lift, rot = 0, n = 5) {
    const co = Math.cos(rot), si = Math.sin(rot), R0 = R(tc, yc);
    return grid(12, 20, (v, u) => {
      const a = u * 2 - 1, b = v * 2 - 1, m = Math.max(Math.abs(a), Math.abs(b)), q = Math.pow(Math.pow(Math.abs(a), n) + Math.pow(Math.abs(b), n), 1 / n) || 1, x = a * (m / q) * hw, y = -b * (m / q) * hh;
      const t = tc + (x * co - y * si) / R0, yy = yc + x * si + y * co;
      return at(t, R(t, yy) + lift * (1 - Math.pow(m, 7)) - 0.004, yy, u, v);
    });
  }
  function stud(R, tc, yc, rad, h) {
    const r0 = R(tc, yc);
    return grid(8, 18, (s, u) => { const f = u * TAU; return at(tc + Math.sin(f) * rad * s / r0, r0 + h * Math.sqrt(Math.max(0, 1 - s * s * 0.92)), yc + Math.cos(f) * rad * s, u, s); });
  }
  const PI = Math.PI;
  const NECKS = {
    snap(F, c) {
      const top = (t) => neckline(t) + 0.2, o = c.o, R = bandAt(F, o, c.start, 0.05), y = BACK + 0.2 - 0.17;
      const parts = [{ kind: 'paper', grid: strip(F, top, c.cols) }, { kind: 'self', grid: patch(R, PI - 0.13, y, 0.42, 0.115, 0.03) }];
      for (const dt of [-0.3, -0.12, 0.06]) parts.push({ kind: 'metal', grid: stud((t, yy) => R(t, yy) + 0.03, PI + dt, y, 0.05, 0.026) });
      return { band: band(F, o, c.start, top, 0.32, 0.04, c.cols), tex: 'stitch', colour: 'main', parts };
    },
    towel(F, c) { return { band: roll(F, c.o, c.start, (t) => neckline(t) + 0.04, 0.135, 0.225, { lump: 0.1, flat: 0.62, layers: true, overlap: true, spread: 0.09 }, c.cols), tex: 'terry', colour: 'collar', parts: [] }; },
    band(F, c) {
      const o = c.o, top = (t) => neckline(t) + 0.14;
      const R = (t, y) => { const tp = top(t), s = clamp((tp - y) / 0.34), x = c.start(t); let r = look(F.N, t, Math.max(y, tp - 0.2)) + out(s * 2, 0.035) + 0.52 * Math.pow(s, 1.25); if (y < x - 0.02) r = Math.max(r, clothAt(F, o, t, y, x) + 0.03); return r; };
      const g = grid(22, c.cols, (s, u) => { const t = u * TAU, y = top(t) - 0.12 * smooth(s / 0.14) - (0.2 + 0.14 * Math.abs(Math.cos(t))) * Math.pow(s, 1.25) - 0.012 * smooth((s - 0.9) / 0.1), x = c.start(t); let r = look(F.N, t, Math.max(y, top(t) - 0.2)) + out(s, 0.035) + (0.52 + 0.06 * Math.sin(t * 2 + 1.2)) * Math.pow(s, 1.25); if (y < x - 0.02) r = Math.max(r, clothAt(F, o, t, y, x) + 0.03 - 0.02 * smooth((s - 0.9) / 0.1)); return at(t, r, y, u * 10, s); });
      const y = BACK + 0.14 - 0.2, parts = [{ kind: 'metal', grid: patch(R, PI, y, 0.17, 0.075, 0.02, 0, 4) }];
      for (const dt of [-0.075, 0, 0.075]) parts.push({ kind: 'dark', grid: stud((t, yy) => R(t, yy) + 0.018, PI + dt, y, 0.02, 0.004) });
      return { band: g, tex: 'smooth', colour: 'collar', parts };
    },
    rib(F, c) { return { band: band(F, c.o, c.start, (t) => neckline(t) + 0.2, 0.34, 0.045, c.cols), tex: 'rib', colour: 'collar', parts: [] }; },
    hook(F, c) {
      const top = (t) => neckline(t) + 0.16, R = bandAt(F, c.o, c.start, 0.05), y = BACK + 0.16 - 0.13;
      return { band: band(F, c.o, c.start, top, 0.28, 0.04, c.cols), tex: 'stitch', colour: 'main', parts: [{ kind: 'loop', grid: patch(R, PI, y, 0.3, 0.085, 0.016) }] };
    },
    neo(F, c) {
      const y0 = (t) => neckline(t) + 0.06, R = (t, y) => look(F.N, t, y) + 0.13, y = BACK + 0.06;
      return { band: roll(F, c.o, c.start, y0, 0.075, 0.15, { lump: 0.02 }, c.cols), tex: 'smooth', colour: 'collar', parts: [{ kind: 'dark', grid: stud(R, PI, y, 0.052, 0.02) }] };
    },
    tie(F, c) {
      const top = (t) => neckline(t) + 0.13, R = bandAt(F, c.o, c.start, 0.05), y = BACK + 0.13 - 0.08;
      const parts = [{ kind: 'trim', grid: patch(R, PI - 0.13, y + 0.015, 0.14, 0.05, 0.04, 0.3) }, { kind: 'trim', grid: patch(R, PI + 0.13, y + 0.015, 0.14, 0.05, 0.04, -0.3) }];
      parts.push({ kind: 'trim', grid: patch(R, PI - 0.08, y - 0.17, 0.035, 0.17, 0.028, 0.2) }, { kind: 'trim', grid: patch(R, PI + 0.08, y - 0.17, 0.035, 0.17, 0.028, -0.2) });
      parts.push({ kind: 'trim', grid: stud((t, yy) => R(t, yy) + 0.03, PI, y, 0.05, 0.035) });
      return { band: band(F, c.o, c.start, top, 0.2, 0.04, c.cols), tex: 'plain', colour: 'collar', parts };
    },
    clip(F, c) {
      const top = (t) => neckline(t) + 0.15, R = bandAt(F, c.o, c.start, 0.05), y = BACK + 0.15 - 0.09;
      return { band: band(F, c.o, c.start, top, 0.22, 0.036, c.cols), tex: 'plain', colour: 'main', parts: [{ kind: 'paper', grid: strip(F, top, c.cols) }, { kind: 'metal', grid: patch(R, PI, y, 0.2, 0.06, 0.03, 0, 4) }, { kind: 'dark', grid: patch((t, yy) => R(t, yy) + 0.03, PI, y, 0.15, 0.012, 0.006, 0, 4) }] };
    },
  };
  const FABRIC = { snap: 'nylon', towel: 'heavy', band: 'crisp', rib: 'crisp', hook: 'nylon', neo: 'crisp', tie: 'nylon', clip: 'gathered' };
  const CLOTH_TOP = { towel: 0.06, band: 0.03 };
  function build(F, cut, rows = ROWS, cols = COLS, hem = HEM) {
    const o = CLOTH[FABRIC[cut]], start = (t) => neckline(t) + (CLOTH_TOP[cut] || 0);
    return Object.assign(NECKS[cut](F, { o, start, cols }), { cloth: cloth(F, o, start, rows, cols, hem) });
  }

  // ---- in the game ----
  const G = { F: null, cut: null, tex: {}, mats: {}, dirty: true, queued: false };
  const W = () => HSC.wardrobe;
  const headOf = (robe) => { let h = null; robe.parent.children.forEach((o) => { if (o.isMesh && o !== robe && o.geometry.index && (!h || o.geometry.attributes.position.count > h.geometry.attributes.position.count)) h = o; }); return h; };
  function texture(name) {
    if (G.tex[name] !== undefined) return G.tex[name];
    const T = W().T, make = (w, h, draw, srgb) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new T.Fg(c); t.wrapS = t.wrapT = T.Pn; t.anisotropy = 4; if (srgb) t.colorSpace = T.Lt; return t; };
    const noise = (x, w, h, lo, hi) => { const d = x.createImageData(w, h); let m = 77; for (let i = 0; i < w * h; i++) { m = Math.imul(m, 1664525) + 1013904223 >>> 0; const v = lo + (m / 4294967296) * (hi - lo); d.data[i * 4] = d.data[i * 4 + 1] = d.data[i * 4 + 2] = v; d.data[i * 4 + 3] = 255; } x.putImageData(d, 0, 0); };
    const set = {
      stitch: () => make(256, 256, (x, w, h) => { x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.fillStyle = '#7d848c'; for (const y of [24, 224]) for (let i = 0; i < w; i += 26) x.fillRect(i, y, 17, 5); }, true),
      rib: () => make(256, 16, (x, w, h) => { x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.fillStyle = '#00000040'; for (let i = 0; i < w; i += 16) x.fillRect(i, 0, 5, h); }, true),
      terry: () => make(256, 256, (x, w, h) => noise(x, w, h, 208, 255), true),
      terryBump: () => make(256, 256, (x, w, h) => noise(x, w, h, 40, 215)),
      crepe: () => make(128, 128, (x, w, h) => { x.fillStyle = '#808080'; x.fillRect(0, 0, w, h); for (let i = 0; i < w; i += 4) { x.fillStyle = i % 8 ? '#666' : '#9a9a9a'; x.fillRect(i, 0, 2, h); } }),
      fuzz: () => make(64, 64, (x, w, h) => noise(x, w, h, 60, 200)),
    };
    return (G.tex[name] = set[name] ? set[name]() : null);
  }
  const kindMat = (kind, base) => {
    if (G.mats[kind]) return G.mats[kind];
    const m = base.clone();
    m.map = null; m.bumpMap = null; m.metalness = 0; m.roughness = 0.6;
    if (kind === 'paper') { m.color.set('#f6f3ec'); m.roughness = 0.88; m.bumpMap = texture('crepe'); m.bumpScale = 0.6; }
    if (kind === 'metal') { m.color.set('#aab1b9'); m.metalness = 0.6; m.roughness = 0.34; }
    if (kind === 'dark') { m.color.set('#17191d'); m.roughness = 0.42; }
    if (kind === 'loop') { m.color.set('#c9ccd0'); m.roughness = 0.95; m.bumpMap = texture('fuzz'); m.bumpScale = 1.4; }
    return (G.mats[kind] = m);
  };
  function geometry(mesh, g, seam) {
    const B = mesh.geometry.constructor, A = mesh.geometry.attributes.position.constructor, o = new B();
    o.setAttribute('position', new A(g.pos, 3)); o.setAttribute('uv', new A(g.uv, 2)); o.setIndex(g.ix); o.computeVertexNormals();
    if (seam) { const n = o.attributes.normal, c = g.cols + 1; for (let r = 0; r <= g.rows; r++) { const a = r * c, b = a + g.cols, x = n.getX(a) + n.getX(b), y = n.getY(a) + n.getY(b), z = n.getZ(a) + n.getZ(b), l = Math.hypot(x, y, z) || 1; n.setXYZ(a, x / l, y / l, z / l); n.setXYZ(b, x / l, y / l, z / l); } }
    return o;
  }
  function paint(built, parts) {
    const w = W(), C = HSC.catalog, hex = (id) => C.colourHex.get(id) || '#888888', m = w.gown.collar;
    const self = built.colour === 'main' ? hex(parts.main) : hex(parts.collar);
    m.color.set(self);
    m.roughness = built.tex === 'terry' ? 0.96 : built.tex === 'smooth' ? 0.42 : 0.62;
    m.map = built.tex === 'stitch' ? texture('stitch') : built.tex === 'rib' ? texture('rib') : built.tex === 'terry' ? texture('terry') : null;
    m.bumpMap = built.tex === 'terry' ? texture('terryBump') : null;
    m.bumpScale = 3;
    m.needsUpdate = true;
    if (G.mats.self) G.mats.self.color.set(hex(parts.main));
    if (G.mats.trim) G.mats.trim.color.set(hex(parts.collar));
  }
  function apply() {
    const w = W(), gown = w && w.gown;
    if (!gown || !gown.robe || !w.T || !G.design) return false;
    const robe = gown.robe, [cloth0, collar0] = robe.children, head = headOf(robe);
    if (!head) return false;
    if (G.dirty || !G.F) { G.F = shape(profile(head)); G.dirty = false; }
    const cut = HSC.gownCut(G.design), built = build(G.F, cut);
    const old = cloth0.geometry, oldBand = collar0.geometry;
    cloth0.geometry = geometry(cloth0, built.cloth, true);
    collar0.geometry = geometry(collar0, built.band, true);
    old.dispose(); oldBand.dispose();
    for (const o of robe.children.slice(2)) { robe.remove(o); o.geometry.dispose(); }
    for (const p of built.parts) { const k = new cloth0.constructor(geometry(cloth0, p.grid, p.grid.cols === COLS), kindMat(p.kind, gown.collar)); robe.add(k); }
    const cm = gown.cloth;
    cm.roughness = 0.62; cm.sheen = 0.5; cm.sheenRoughness = 0.5; // no bump map on the cloth: over this much of the screen it cost 5 frames a second against 60
    G.cut = cut; G.built = built;
    paint(built, G.design.parts);
    if (HSC.clippingsCape) HSC.clippingsCape(robe);
    return true;
  }
  // the wardrobe's look changed
  HSC.gownDress = (design) => { const changed = !G.design || HSC.gownCut(design) !== G.cut; G.design = design; if (changed || !G.F) apply(); else paint(G.built, design.parts); };
  // a new customer sat down: fit once, on the next frame, so previews of other customers cost nothing
  const morphed = HSC.onMorph;
  HSC.onMorph = function (P, N, person) {
    if (morphed) morphed(P, N, person);
    G.dirty = true;
    if (G.queued) return;
    G.queued = true;
    requestAnimationFrame(() => {
      G.queued = false;
      try { apply(); } catch (e) { console.error('gown: fit failed', e); }
      G.redraw = true;
      redraw();
    });
  };
  // the game draws on demand: ask for the frame that shows the new fit (turn(0) moves nothing), or the previous
  // customer's gown stays on screen until the first touch. Never while a finger is on the game: turn releases the
  // pointer, which would end a stroke or a rotate drag; the frame is asked for once the last finger lifts
  const down = new Set();
  function redraw() {
    if (!G.redraw) return;
    const clip = HSC.view && HSC.view.clipperScreen && HSC.view.clipperScreen().visible;
    if (down.size || clip) return;
    G.redraw = false;
    const g = globalThis.skinFadeStudio;
    try { if (g && g.turn && g.getState().status === 'cutting') g.turn(0); } catch (e) {}
  }
  if (typeof addEventListener === 'function') {
    // capture on the window: seen before the game's own handlers, and also when it holds pointer capture
    addEventListener('pointerdown', (e) => { if (e.target && e.target.closest && e.target.closest('#scene')) down.add(e.pointerId); }, true);
    const up = (e) => { if (down.delete(e.pointerId) && !down.size && G.redraw) HSC.lifecycle.timeout(redraw, 0); };
    addEventListener('pointerup', up, true);
    addEventListener('pointercancel', up, true);
    // a lift the page never heard (the app sent to the background mid-drag) must not hold the redraw forever
    const lost = () => { down.clear(); if (G.redraw) HSC.lifecycle.timeout(redraw, 0); };
    addEventListener('blur', lost);
    if (HSC.onHostPause) HSC.onHostPause((paused) => { if (paused) lost(); });
  }
  HSC.gownFit = apply; // tests

  // ---- the shop's product shot: the same gown on a plain form ----
  let form = null;
  const shots = {};
  function plainForm() {
    if (form) return form;
    const S = new Float32Array(NT * NY);
    for (let a = 0; a < NT; a++) {
      const t = a / NT * TAU, side = Math.abs(Math.sin(t));
      for (let b = 0; b < NY; b++) {
        const y = TOP - b * DY, k = smooth((-1.15 - y) / 1.5), wide = 1.25 + (0.45 + 1.15 * Math.pow(side, 2)) * k;
        S[a * NY + b] = wide;
      }
    }
    return (form = shape(S));
  }
  HSC.gownShape = (cut) => (shots[cut] || (shots[cut] = build(plainForm(), cut, 60, 112, -5.2)));
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1): the completed-customer result router (docs/MONETIZATION-STRATEGY.md
// sections 4 and 6; implementation plan 3.2; locked by the owner; AGENTS.md: replaces the reveal-time
// interstitial only once implemented and tested).
//
// One full-screen commercial opportunity at the host's configured completed-customer cadence, decided at the
// result break. Android retains its established every-customer default; MediaCube sets this to every second.
//   rewarded       a rewarded video asked for on that result came on screen (watched to the end or closed early):
//                  that wins the break and the interstitial is suppressed. One that never showed (no fill, no
//                  consent, offline) leaves the break to the interstitial
//   interstitial   on an eligible completion the ordinary Continue (Next) puts one interstitial on screen
//   unavailable    Continue attempted that break once, but no interstitial reached the screen
//   none           a cadence-skipped completion, incomplete work, a result restored after a reload (not completed
//                  in this session), a recent reward, or the break already used
// The record is per job id, decided synchronously, and bounded; nothing here grants rewards or changes the
// earned-reward callbacks (the wardrobe's watchVideo still owns them).
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  HSC.interstitialEvery = 2;
  const every = Number.isSafeInteger(HSC.interstitialEvery) ? Math.max(1, Math.min(10, HSC.interstitialEvery)) : 1;
  const MAX = 50;
  const recs = new Map(); // job id -> 'pending' | 'attempting' | 'rewarded' | 'interstitial' | 'unavailable' | 'none'
  const counts = { rewarded: 0, interstitial: 0, unavailable: 0, none: 0 };
  let completedCount = 0;
  const G = () => globalThis.skinFadeStudio;
  const set = (job, v) => { recs.delete(job); recs.set(job, v); while (recs.size > MAX) recs.delete(recs.keys().next().value); };
  const settle = (job, v) => { if (recs.get(job) === 'pending') { set(job, v); counts[v]++; } };
  const onResult = () => { const g = G(), s = g && g.getState(); return s && s.status === 'reveal' ? s.jobId : null; };
  let asked = null; // the result on screen when the rewarded video in flight was asked for, until it ends
  const router = {
    // The per-job guard keeps replay/double-finish callbacks from consuming another slot. `meaningful` preserves
    // Android's existing result rule; `complete` lets less frequent host cadences ignore unfinished retries.
    completed(job, meaningful, complete = meaningful) {
      if (job == null || recs.has(job)) return;
      if (!meaningful || (every > 1 && !complete)) { set(job, 'none'); counts.none++; return; }
      completedCount++;
      if (completedCount % every) { set(job, 'none'); counts.none++; return; }
      set(job, 'pending');
    },
    // a rewarded video came on screen (or paid out) while a result was showing: it wins that result's break
    rewardedStarted() {
      const job = asked != null ? asked : onResult();
      if (job != null) settle(job, 'rewarded');
    },
    // Continue claims a pending break exactly once. It becomes an impression only after Android confirms that the
    // full-screen ad opened; no fill, consent, offline and SDK failures remain a distinct unavailable outcome.
    route(job) {
      if (recs.get(job) !== 'pending') return null;
      set(job, 'attempting');
      return 'interstitial';
    },
    interstitialFinished(job, displayed) {
      if (recs.get(job) !== 'attempting') return;
      const result = displayed ? 'interstitial' : 'unavailable';
      set(job, result);
      counts[result]++;
    },
    outcome: (job) => recs.get(job) || null,
    counts: () => Object.assign({}, counts),
    completedCount: () => completedCount,
    every: () => every,
  };
  // every rewarded video in the game goes through HSC.watchVideo (the wardrobe owns it and its earned callback);
  // the router notes which result it was asked on and hands over unchanged: the break is the rewarded one only
  // once Android says the video opened, or it paid out (an earned reward means it showed)
  const wrap = () => {
    if (typeof HSC.watchVideo !== 'function') { if (typeof setTimeout === 'function') HSC.lifecycle.timeout(wrap, 300); return; }
    if (HSC.watchVideo.__routed) return;
    const wv = HSC.watchVideo;
    const routed = function () {
      const job = onResult();
      asked = job;
      const done = () => { if (asked === job) asked = null; };
      let p;
      try { p = wv.apply(this, arguments); } catch (e) { done(); throw e; }
      return Promise.resolve(p).then((ok) => { try { if (ok) router.rewardedStarted(); } catch (e) {} done(); return ok; }, (e) => { done(); throw e; });
    };
    routed.__routed = true;
    HSC.watchVideo = routed;
  };
  wrap();
  // Android's ad events (native-transport.js): 'opened' is the moment a rewarded video is really on screen
  const host = globalThis.__androidHost;
  if (host && typeof host.ad === 'function' && !host.ad.__routed) {
    const ad = host.ad;
    const seen = function (kind, state) { try { if (kind === 'rewarded' && state === 'opened' && asked != null) router.rewardedStarted(); } catch (e) {} return ad.apply(this, arguments); };
    seen.__routed = true;
    host.ad = seen;
  }
  HSC.adRouter = router;
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1; owner-approved 5 November 2026): the core loop around each haircut.
//
//   request   each customer (after the first) asks for a cut: a thought bubble shows it from the side and the
//             back. The cut suits his age, hair type and hair loss, and is always shorter than what he walked
//             in with. A regular asks for his usual.
//   stars     the finished cut is scored with the engine's own match (patch18): 1 star for any cut, 2 from a
//             60% match, 3 from 85%. Never a fail.
//   tips      coins at the reveal: 10 + 5 per star, +5 for a regular, x2 for a VIP.
//   video     a rewarded video on the result, in every mode, after a hidden random wait, so it can never be predicted (the first
//             result always has it): two more tips, at least the floor. Quick Play pays nothing else, so its video needs
//             real work and stops after a few a day. Next without a video watched: interstitial.
//   undo      a permanent button: each undo of the last stroke is a rewarded video (up to 20 strokes back).
// No text: icons, stars and numbers only. Every video is optional.
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  const INK = '#10223f';
  const M = () => HSC.meta, G = () => globalThis.skinFadeStudio;

  // ---- the cuts customers ask for (shapes the walk-in builder draws: side / blend / top hair levels, 1 = 3 mm) ----
  const STYLES = [];
  const add = (fam, side, blend, top, contour) => STYLES.push({ id: `${fam}:${side}${blend}${top}:${contour}`, fam, side, blend, top, contour, variant: 0 });
  for (const c of ['low', 'mid', 'high', 'drop', 'burst']) for (const t of [3, 4, 5]) add('skin', 0, 2, t, c);
  for (const c of ['low', 'mid', 'high', 'drop', 'taper']) for (const t of [3, 4, 5]) add('fade', 1, t === 5 ? 3 : 2, t, c);
  for (const t of [4, 5]) add('taper', 2, 3, t, 'taper');
  for (const t of [3, 4]) add('temple', 1, 2, t, 'temple');
  for (const sd of [1, 2]) add('undercut', sd, sd, 5, 'undercut');
  for (const t of [4, 5]) add('classic', 2, 3, t, 'part');
  add('crew', 2, 3, 4, 'crew');
  add('hawk', 1, 3, 5, 'hawk');
  for (const t of [1, 2, 3]) add('buzz', t, t, t, 'even');
  add('buzz', 0, 0, 0, 'even'); // shaved right down: what many men with hair loss ask for
  for (const t of [3, 4]) add('caesar', 2, 2, t, 'low'); // short, even and neat all round
  STYLES.push({ id: 'trim', fam: 'trim' });
  const byId = new Map(STYLES.map((s) => [s.id, s]));
  HSC.REQUEST_STYLES = STYLES;

  const grids = new Map();
  const gridOf = (style) => {
    if (!grids.has(style.id)) grids.set(style.id, HSC.walkIns.build(style));
    return grids.get(style.id);
  };
  // the target: the style, never longer than the hair he walked in with (a trim: one level shorter everywhere)
  function targetFor(style, start) {
    if (style.fam === 'trim') return start.map((v) => Math.max(1, v - 1));
    const g = gridOf(style);
    return start.map((v, i) => Math.min(v, g[i]));
  }
  // how a style suits a customer (0 = never asked for)
  function suit(style, p) {
    const age = p.years || 30, ty = (p.hair && p.hair.type) || '1b', b = p.bald || {};
    const stage = { 1: 0, 2: 1, 3: 2, '3v': 2.5, 4: 3, 5: 4, 6: 5, 7: 6 }[b.norwood] || 0;
    const heavy = stage >= 3 || b.type === 'diffuse', coily = /^(3c|4)/.test(ty), straight = /^[12]/.test(ty);
    const f = style.fam;
    if (f === 'buzz' && style.top === 0 && !heavy && age < 30) return 0.15; // shaved right down is rarer on a full young head
    if (heavy && !(f === 'buzz' || f === 'trim' || (f === 'skin' && style.top <= 3) || (f === 'fade' && style.top <= 3))) return 0;
    if ((f === 'classic' || f === 'crew') && !straight) return 0;
    if (f === 'undercut' && ty > '3a') return 0;
    if (age >= 56 && (f === 'hawk' || f === 'undercut' || (f === 'skin' && style.contour !== 'low') || style.contour === 'high')) return 0;
    let w = 1;
    if (age < 30) w *= { skin: 1.6, fade: 1.4, hawk: 1.2, undercut: 1.1, taper: 0.7, classic: 0.6, trim: 0.4 }[f] || 1;
    else if (age < 56) w *= { fade: 1.3, taper: 1.3, classic: 1.2, crew: 1.2, skin: 0.9, hawk: 0.4 }[f] || 1;
    else w *= { taper: 2, classic: 1.6, buzz: 1.5, trim: 2.2, fade: 0.8 }[f] || 1;
    if (coily) w *= { skin: 1.5, temple: 2.2, fade: 1.2, buzz: 1.2 }[f] || (f === 'temple' ? 1 : 0.9);
    else if (f === 'temple') w *= 0.15;
    if (heavy) w *= f === 'buzz' ? 3 : 1;
    if (style.contour === 'burst' && !coily) w *= 0.5;
    return w;
  }
  // what a man asks for follows the hair he walks in with: a full head usually wants shape, not a shave; a fade comes back
  // to be refreshed; a short even cut stays short. Read from the hair itself (side and top lengths). See docs/STYLE-MATRIX.md
  const startKinds = new WeakMap();
  function startKind(start) {
    if (startKinds.has(start)) return startKinds.get(start);
    let top = 0, nt = 0, side = 0, ns = 0;
    for (let i = 0; i < start.length; i++) { const v = (i >> 7) / 64; if (v > 0.7) { top += start[i]; nt++; } else if (v < 0.3) { side += start[i]; ns++; } }
    top /= nt || 1; side /= ns || 1;
    const k = top - side > 1.2 ? (side <= 1.6 ? 'faded' : 'shaped') : top >= 3.5 ? 'full' : top >= 2 ? 'even' : 'short';
    startKinds.set(start, k);
    return k;
  }
  const FROM = {
    full: { taper: 1.5, classic: 1.5, fade: 1.2, crew: 1.2, caesar: 1.1, undercut: 1.2, skin: 0.8, buzz: 0.6 },
    shaped: { taper: 1.4, classic: 1.4, fade: 1.3, undercut: 1.2, skin: 1, caesar: 1, buzz: 0.7 },
    faded: { skin: 1.6, fade: 1.6, temple: 1.4, hawk: 1.1, taper: 0.8, classic: 0.5, buzz: 0.6 },
    even: { crew: 1.5, caesar: 1.5, buzz: 1.3, fade: 1.2, taper: 1.1, skin: 1 },
    short: { buzz: 2, skin: 1.1, fade: 1 },
  };
  // and his hair type: what actually sits well on it
  const TYPE = {
    1: { classic: 1.3, crew: 1.3, undercut: 1.2, taper: 1.1, caesar: 1.1 }, 2: { taper: 1.2, fade: 1.2, undercut: 1.2, caesar: 1.1 },
    3: { fade: 1.3, taper: 1.3, skin: 1.1, temple: 1.2, caesar: 1.1 }, 4: { buzz: 1.2, caesar: 1.3 },
  };
  // a family with many variants (15 fades) must not crowd out one with two (tapers): each family gets a fair share
  const famSize = {}; for (const st of STYLES) famSize[st.fam] = (famSize[st.fam] || 0) + 1;
  const askFor = (style, p, start) => suit(style, p) * ((FROM[startKind(start)] || {})[style.fam] || 1) * ((TYPE[((p.hair && p.hair.type) || '1b')[0]] || {})[style.fam] || 1) / Math.sqrt(famSize[style.fam] || 1);
  // enough to cut: at least about a fifth of the head shorter, and a real change on the sides or top
  // a customer asks for a style his hair can really make: at most a fifth of his head may already be shorter than it wants
  function fits(style, start) {
    if (style.fam === 'trim') return true;
    const g = gridOf(style);
    let hair = 0, short = 0;
    for (let i = 0; i < start.length; i++) if (start[i] > 0) { hair++; if (g[i] > start[i]) short++; }
    return !hair || short / hair <= 0.2;
  }
  function worthCutting(start, target) {
    let cells = 0, drop = 0;
    for (let i = 0; i < start.length; i++) if (target[i] < start[i]) { cells++; drop += start[i] - target[i]; }
    return cells >= 1500 && drop >= 2200;
  }

  // the request for this job: {job, style, target}; the very first customer cuts freely (the tutorial)
  // a beard order only when the clipper's guards can really reach it: 85% of the beard it changes within one length of
  // the target, the 3-star line (the same test as Career's catalog)
  function beardReachable(start, t) {
    if (!HSC.beardReach) return true;
    const reach = HSC.beardReach();
    let need = 0, ok = 0;
    for (let i = 0; i < t.length; i++) {
      if (!(t[i] < start[i])) continue;
      need++;
      if (reach.some((l) => l <= start[i] && Math.abs(l - t[i]) <= 1)) ok++;
    }
    return !need || ok / need >= 0.85;
  }
  const req = { job: null, style: null, target: null };
  HSC.requestFor = function (s) {
    if (!s || !s.look || !s.look.person || !Array.isArray(s.startHair)) return null;
    if (req.job === s.jobId && req.start === s.startHair) return req.style ? req : null;
    const p = s.look.person;
    Object.assign(req, { job: s.jobId, start: s.startHair, style: null, target: null, beard: null });
    if (p.first || !HSC.walkIns) return null;
    // a game mode (modes.js) may decide the request: null for none, or {style, target} / {style, beard}
    const mr = HSC.modes ? HSC.modes.request(s) : undefined;
    if (mr !== undefined) { if (!mr) return null; Object.assign(req, { style: mr.style, target: mr.target || null, beard: mr.beard || null }); return req; }
    // the order once chosen is saved with the job, so a reload (the result screen too, after the order was noted as
    // recently asked) shows the same order and scores the same cut
    const md = M() && M().data && M().data.modes;
    const kept = md && md.ord && md.ord.n === s.jobId && md.ord.p === (p.seed >>> 0) && byId.get(md.ord.st);
    if (kept) {
      req.style = kept; req.target = targetFor(kept, s.startHair);
      if (md.ord.bs && Array.isArray(s.startBeard) && HSC.modes && HSC.modes.beardTarget) req.beard = HSC.modes.beardTarget(p, s.startBeard, md.ord.bs);
      return req;
    }
    const R = HSC.rng(((p.seed >>> 0) ^ Math.imul((s.jobId | 0) + 7, 0x27d4eb2d)) >>> 0 || 1);
    const usual = p.usual && byId.get(p.usual);
    let pick = null;
    if (!pick && usual && suit(usual, p) > 0 && R.next() < 0.75) { const t = targetFor(usual, s.startHair); if (worthCutting(s.startHair, t)) pick = { style: usual, target: t }; }
    if (!pick) {
      const opts = [];
      for (const st of STYLES) {
        const w = askFor(st, p, s.startHair);
        if (!w) continue;
        const t = targetFor(st, s.startHair);
        if (worthCutting(s.startHair, t)) opts.push([w, st, t]);
      }
      // only styles his hair can really make; if none fully fits, the closest list stays, so he always has a request
      const honest = opts.filter((o) => fits(o[1], s.startHair));
      if (honest.length) opts.splice(0, opts.length, ...honest);
      // what was asked for lately is far less likely to come up again
      if (HSC.modes && HSC.modes.recently) for (const o of opts) if (HSC.modes.recently(o[1])) o[0] *= 0.1;
      let r = R.next() * opts.reduce((a, o) => a + o[0], 0);
      for (const o of opts) if ((r -= o[0]) <= 0) { pick = { style: o[1], target: o[2] }; break; }
      if (!pick && opts.length) pick = { style: opts[opts.length - 1][1], target: opts[opts.length - 1][2] };
    }
    if (!pick) return null;
    req.style = pick.style; req.target = pick.target;
    // about half of the men with a beard want it done too: the order is for the hair and the beard together
    let bs = null;
    if (HSC.modes && HSC.modes.beardJob && Array.isArray(s.startBeard) && R.next() < 0.5) {
      const j = HSC.modes.beardJob(p, s.startBeard, R);
      if (j && beardReachable(s.startBeard, j.target)) { req.beard = j.target; bs = j.style; }
    }
    if (md && byId.has(pick.style.id)) { md.ord = { n: s.jobId, p: p.seed >>> 0, st: pick.style.id, bs }; M().save(); }
    return req;
  };
  // the style a customer asked for on a job (meta.js keeps it as a regular's usual)
  HSC.requestStyleFor = (job) => (req.job === job && req.style && byId.has(req.style.id) ? req.style.id : null);
  // for modes.js: the cut catalogue and its rules
  HSC.requestKit = { STYLES, byId, targetFor, suit, askFor, startKind, worthCutting, fits };

  // ---- scoring (the engine's own match, patch18) ----
  // real work (modes.js): hair or beard really changed from the start; builds without the modes keep the stroke count
  const worked = (s) => !!s && (HSC.modes && HSC.modes.worked ? HSC.modes.worked(s) : s.cutStrokeCount > 0);
  // A cut is scored as two things measured apart, so the score is fair whatever the size of the order: the job done
  // (what was too long and now is not, as a share of what was too long at the start) and a slip (what is now shorter
  // than the order, weighed against the order's size but never against less than SLIP_FLOOR of the head). A small order
  // (most Rush tidy-ups, a few Orders) is no longer lost to one slip: it costs what it costs on a typical order (the
  // median Orders job changes about a fifth of the head, which scores exactly as before). A perfect cut is 3 stars, an
  // untouched head none of the job.
  const SLIP_FLOOR = 0.2;
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  function cutScore(hair, start, target, w) {
    const match = HSC.requests.match, a = match(start, target, w);
    const longer = hair.map((v, i) => Math.max(v, target[i])), shorter = hair.map((v, i) => Math.min(v, target[i]));
    const job = a >= 0.999 ? 1 : clamp01((match(longer, target, w) - a) / (1 - a)), slip = 1 - match(shorter, target, w);
    return clamp01(job - slip / Math.max(1 - a, SLIP_FLOOR));
  }
  function starsFor(s) {
    if (!worked(s)) return 0;
    const r = HSC.requestFor(s);
    // no order: only the very first customer (the tutorial, a free cut) is a great cut by design; anyone else without
    // an order (none could be made for him) is never given stars he did not earn: the plain one star of any real cut
    if (!r) return s.look && s.look.person && s.look.person.first ? 3 : 1;
    const bs = r.beard && HSC.modes ? HSC.modes.beardStars(s, r) : null;
    if (bs != null && !r.target) return bs;
    if (!r.target || !HSC.requests || !HSC.requests.match) return 1;
    let w;
    try { w = G().getView().surface.weights; } catch (e) {}
    const n = cutScore(s.hair, s.startHair, r.target, w);
    const hs = n >= 0.85 ? 3 : n >= 0.6 ? 2 : 1;
    return bs == null ? hs : Math.min(hs, bs); // hair and beard: the job is as good as its weaker half
  }
  const tipsFor = (p, stars) => (stars ? (10 + 5 * stars + (p && p.regular ? 5 : 0)) * (p && p.vip ? 2 : 1) : 0);

  // ---- coins ----
  // the balance lives in the economy (economy.js, kept in the career journal) once it is up; until then (and in
  // other builds) the progress save holds it
  const EC = () => (HSC.econ && HSC.econ.ready() ? HSC.econ : null);
  const t2 = (k) => (HSC.t ? HSC.t(k) : k);
  const coins = () => (EC() ? EC().balance() : M() && M().data ? M().data.coins || 0 : 0);
  let miscKey = 0;
  // credits that arrive while the career journal is still loading wait for it (or for its failure), so the
  // ledger's first mirror cannot overwrite them
  const waiting = [];
  function drain() {
    if (HSC.econ && HSC.econ.starting && HSC.econ.starting()) return HSC.lifecycle.timeout(drain, 200);
    for (const w of waiting.splice(0)) Promise.resolve(addCoins(w[0], w[1], w[2])).then(w[3], () => w[3](null));
  }
  // The result says whether the coins really landed: the economy's transaction (a repeated key is a duplicate, also
  // landed), true for the progress save, null when nothing was credited (a journal commit that failed). A caller
  // that owes coins for an earned video keeps what it owes until the result is truthy without .error. A credit made
  // while the journal is loading resolves once it has really been made.
  function addCoins(n, cat, key) {
    if (!(n > 0)) return Promise.resolve(null);
    if (!EC() && HSC.econ && HSC.econ.starting && HSC.econ.starting()) {
      if (!waiting.length) HSC.lifecycle.timeout(drain, 200);
      return new Promise((done) => waiting.push([n, cat, key || 'misc:' + Date.now().toString(36) + ':' + (miscKey++), done]));
    }
    if (EC()) return EC().earn(key || 'misc:' + Date.now().toString(36) + ':' + (miscKey++), cat || 'misc', Math.round(n)).then((r) => { ui.coinPill(true); return r || null; }, () => null);
    const d = M() && M().data;
    if (!d) return Promise.resolve(null);
    d.coins = Math.min(99999999, (d.coins || 0) + Math.round(n));
    M().save();
    ui.coinPill(true);
    return Promise.resolve(true);
  }
  const landed = (r) => !!r && !r.error;
  function spendCoins(price, cat, key) { if (EC()) return EC().spend(key, cat, price).then((ok) => { ui.coinPill(true); return ok; }); const d = M().data; d.coins -= price; M().save(); return Promise.resolve(true); }
  // a purchase that grants an item: atomic in the career journal when it is up (career-run.js buyItem)
  function buyItem(price, cat, key) { if (EC() && EC().buyItem) return EC().buyItem(key, cat, price).then((ok) => { ui.coinPill(true); return ok; }); return spendCoins(price, cat, key); }
  HSC.coins = { get: coins, add: addCoins, spend: spendCoins, buyItem };

  // a finished haircut: score it and pay, once per customer
  const done = HSC.onHaircutDone;
  // a result scored while the career journal is still loading (a reload at the reveal) would not know a Career
  // contract from an Orders job: the whole finish waits for the journal (or its failure), once per job
  let deferred = null;
  HSC.onHaircutDone = function (state) {
    if (HSC.econ && HSC.econ.starting && HSC.econ.starting()) {
      if (state && deferred !== state.jobId) {
        deferred = state.jobId;
        const retry = () => { if (HSC.econ.starting()) return HSC.lifecycle.timeout(retry, 200); deferred = null; HSC.onHaircutDone(state); };
        HSC.lifecycle.timeout(retry, 200);
      }
      return undefined;
    }
    try { scoreRound(state); } catch (e) { console.error('customers: scoring failed', e); }
    return done ? done.apply(this, arguments) : undefined;
  };
  // a job seen a second time (a reveal restored after a reload) pays nothing and is not a second customer
  let repeat = null;
  HSC.repeatJob = (job) => repeat === job;
  // who a job was: its number, the customer's seed and the engine session's seed. The engine's job numbers start again
  // at 1 if its session is ever replaced, so a number alone is not the same job: the seeds must match too (a saved
  // round from before they were kept has only its number)
  const u32 = (v) => (Number.isFinite(v) ? v >>> 0 : null);
  const whoOf = (s) => ({ job: s.jobId, p: u32(s.look && s.look.person && s.look.person.seed), sd: u32(s.seed) });
  const sameJob = (last, s) => {
    if (!last || last.job !== s.jobId) return false;
    const w = whoOf(s);
    return (last.p == null || w.p == null || last.p === w.p) && (last.sd == null || w.sd == null || last.sd === w.sd);
  };
  HSC.sameRound = sameJob; // the saved result belongs to this job (meta.js, progress.js may use it)
  function scoreRound(s) {
    const d = M() && M().data;
    if (!d || !s) return;
    // freestyle (modes.js) has no request: no stars, a flat tip
    const free = !!(HSC.modes && HSC.modes.unscored());
    const last = sameJob(d.lastRound, s) ? d.lastRound : null;
    repeat = last ? s.jobId : null;
    if (last) return finishRound(s, d, last.stars, free);
    // no order (Rescue, Beards): nothing is scored, and the set pay needs real work. The 2 is only a neutral record for Career
    const judged = !free && !!(HSC.modes && HSC.modes.judged && HSC.modes.judged(s));
    const stars = free ? (worked(s) ? 1 : 0) : judged ? (worked(s) ? 2 : 0) : starsFor(s), p = s.look && s.look.person;
    // the economy pays the job (economy.js): fee - cost + tip (stars, regular, VIP; capped)
    if (EC() && HSC.economy) { econRound(s, d, stars, free, p, judged); return finishRound(s, d, stars, free); }
    let base = free ? (stars ? 10 : 0) : tipsFor(p, stars);
    if (HSC.modes && stars) base = HSC.modes.tips(base, stars, s);
    d.lastRound = { ...whoOf(s), stars, tips: base, paid: base, tripled: false, free };
    addCoins(base);
    return finishRound(s, d, stars, free);
  }
  // the economy's round: one idempotent transaction per job (career jobs pay inside the career's own commit)
  function econRound(s, d, stars, free, p, judged) {
    // only the Career chair holds a contract: another mode's job may carry the same number
    const careerJob = HSC.modes && HSC.modes.current() === 'career' && HSC.careerRun && HSC.careerRun.active() && HSC.careerRun.active().job === s.jobId ? HSC.careerRun.active() : null;
    // (the Rush time bonus is for a job done well: 2 stars or more, modes.js)
    const mj = HSC.modes ? HSC.modes.econJob(s, stars) : { kind: 'requests' };
    const kind = careerJob ? (careerJob.role === 'showcase' ? 'showcase' : careerJob.mode) : HSC.modes && HSC.modes.current() === 'free' ? 'free' : mj.kind;
    // real work, never the stroke counter (an undo of every stroke leaves nothing done)
    const valid = stars > 0 && worked(s);
    const job = { kind, stars, judged, valid, regular: !!(p && p.regular) || !!(careerJob && careerJob.regular), vip: !!(p && p.vip), rushBonus: valid && stars >= 2 ? mj.rushBonus || 0 : 0,
      // the first paid jobs forgive a weak cut (economy CONFIG.early): counted by paid real work, so practice never uses them up
      early: valid && (d.cuts | 0) < HSC.economy.CONFIG.early.jobs };
    // a demand shift's highlighted mode pays its bonus (never Quick Play)
    if (valid && EC() && EC().demandMatch) job.demandMatch = EC().demandMatch(careerJob ? careerJob.mode : kind);
    // Quick Play: a little for real work, up to a daily limit; keyed, so a reload cannot pay twice
    const quick = HSC.modes && HSC.modes.current() === 'free' && valid && EC() && quickDay().n < HSC.economy.CONFIG.quickPlay.perDay ? HSC.economy.CONFIG.quickPlay.pay : 0;
    const qkey = quick ? 'quick:' + quickDay().day + ':' + (quickDay().n + 1) : null;
    if (quick) quickDay().n++;
    // every job the economy pays has its own number in this install: the engine's job number starts again at 1 if its
    // session is ever replaced, and a reused key would pay nothing
    if (!careerJob) d.jobSeq = (Number.isSafeInteger(d.jobSeq) ? d.jobSeq : 0) + 1;
    const key = careerJob ? careerJob.id : 'job:' + (d.firstDay || '') + ':n' + d.jobSeq;
    const pay = HSC.economy.payout(job);
    const practice = kind === 'free', earned = !valid ? 0 : !practice ? HSC.economy.videoPay(pay.total) : practiceDay().n < HSC.economy.CONFIG.video.practicePerDay ? HSC.economy.videoPay(0) : 0;
    // the roll is made once and saved with the result, so a reload cannot change it
    const md = d.modes, wait = md && Number.isSafeInteger(md.wait) ? md.wait : 0;
    // a level-up is a moment of joy: the video is always there for it
    const levelUp = !practice && HSC.meta && HSC.meta.levelOf(d.cuts + 1) > HSC.meta.levelOf(d.cuts);
    const video = earned > 0 && (wait <= 0 || levelUp) ? earned : 0;
    if (md && earned > 0) md.wait = video ? HSC.economy.videoWait(Math.random()) : wait - 1;
    // The result router keeps the established meaningful-work signal for Android and also receives the stronger
    // genuine-completion signal used by MediaCube's every-second-customer cadence.
    const meaningful = s.cutStrokeCount > 0 || (Array.isArray(s.hair) && Array.isArray(s.startHair) && s.hair.some((v, i) => v !== s.startHair[i]));
    if (HSC.adRouter) HSC.adRouter.completed(s.jobId, meaningful, valid);
    d.lastRound = { ...whoOf(s), seq: careerJob ? undefined : d.jobSeq, key, stars, tips: pay.tip, tip: pay.tip, paid: pay.total + quick, lines: pay.lines, tripled: false, free: free || kind === 'free', judged, video };
    HSC.lastJob = { key, job, s };
    // the pay waits in the saved result until the economy has committed it: an app killed in between pays it at the
    // next start (the same keys, so it can never pay twice). Career jobs pay inside the career's own commit.
    const pend = {};
    if (!careerJob && valid && pay.total) pend.job = job;
    if (qkey) pend.quick = [qkey, quick];
    if (pend.job || pend.quick) d.lastRound.pend = pend;
    settle(d.lastRound);
  }
  // commit what a result still owes (also on the next start, recover below); each part clears once committed
  function settle(last) {
    const pend = last && last.pend, E = EC();
    if (!pend || !E) return;
    const clear = (part) => { if (last.pend) { delete last.pend[part]; if (!last.pend.job && !last.pend.quick) delete last.pend; } M().save(); };
    if (pend.quick) E.earn(pend.quick[0], 'job', pend.quick[1]).then((r) => { if (landed(r)) clear('quick'); else later(); ui.coinPill(true); }).catch(later);
    if (pend.job) E.payJob(last.key, pend.job).then((paid) => {
      if (paid && paid.bill && !last.bill) { last.bill = paid.bill; last.lines = (last.lines || []).concat(paid.bill.lines || []); }
      if (landed(paid)) clear('job'); else later();
      ui.coinPill(true);
    }).catch(later);
  }
  // A result left owing by an app killed before the economy committed it, a wish video's coins and a tripled tip:
  // paid at the next start, and again a few seconds after a commit that failed in this session (a full disk, a slow
  // bridge). Every credit is keyed, so a retry can never pay twice.
  let recovered = false, retryAt = 0;
  function later() { if (!retryAt) retryAt = performance.now() + 4000; }
  function recover() {
    if (!HSC.econ || (HSC.econ.starting && HSC.econ.starting())) return;
    if (recovered && !(retryAt && performance.now() >= retryAt)) return;
    recovered = true; retryAt = 0;
    if (!EC()) return;
    const d = M() && M().data;
    if (d && d.lastRound && d.lastRound.pend && d.lastRound.key) settle(d.lastRound);
    const wv = d && d.modes && d.modes.wv, c = HSC.economy && HSC.economy.CONFIG.wishVideo;
    if (wv && wv.pend && c) { const k = wv.pend; addCoins(c.coins, 'rewarded', k).then((r) => { if (!landed(r)) return later(); if (wv.pend === k) wv.pend = null; M().save(); }); }
    if (d && d.lastRound && owesTriple(d.lastRound)) payTriple(d.lastRound);
  }
  function finishRound(s, d, stars, free) {
    d.lastRound.shownStars = stars;
    const r = HSC.requestFor(s);
    if (!free && r && r.style && HSC.modes && HSC.modes.noteAsk && !(HSC.modes.recently(r.style))) HSC.modes.noteAsk(r.style);
    ui.round = { job: s.jobId, stars };
    if (HSC.modes) HSC.modes.done(s, stars);
    M().save();
  }

  // keep frames coming while coins fly (the game draws only when something changes)
  const clipActive = HSC.clippingsActive;
  HSC.clippingsActive = () => ui.flying > 0 || (clipActive ? clipActive() : false);

  // ---- undo: one rewarded video per stroke undone ----
  // the undo button is permanent while there is a stroke to take back: the player watches a video whenever it is
  // worth it to them (owner decision 5 November 2026, replacing the one-per-customer rule of plan 3.3)
  const undo = { job: null, stack: [], snap: null, busy: false };
  // one stroke is everything from the first finger down to that finger up: a second finger (a turn, a pinch) neither
  // starts a new snapshot mid-stroke nor ends the stroke. A primary pointer going down means no other finger is
  // down, so it always starts afresh (an up that never arrived cannot block undo)
  function onDown(e) {
    const g = G();
    if (!g || e.button > 0) return;
    if (undo.snap && e.isPrimary === false) return;
    const s = g.getState();
    if (s.status !== 'cutting') return;
    undo.snap = { job: s.jobId, hair: s.hair, beard: s.beard, brow: s.brow, pid: e.pointerId };
  }
  function onUp(e) {
    const g = G(), snap = undo.snap;
    if (snap && e && e.pointerId != null && snap.pid != null && e.pointerId !== snap.pid) return;
    undo.snap = null;
    if (!g || !snap) return;
    const s = g.getState();
    if (s.status !== 'cutting' || s.jobId !== snap.job) return;
    if (s.hair !== snap.hair || s.beard !== snap.beard || s.brow !== snap.brow) {
      if (undo.job !== s.jobId) { undo.job = s.jobId; undo.stack = []; }
      undo.stack.push({ hair: snap.hair, beard: snap.beard, brow: snap.brow });
      if (undo.stack.length > 20) undo.stack.shift();
      ui.undoButton();
    }
  }
  // a video toward the wishlist: a few coins at the moment the player wants them, a few times a day
  // (coins still owed from an earlier wish video stay owed across midnight, and a new one waits until they land: the
  // save holds one owed wish video)
  const wishDay = () => { const md = M().data.modes, day = M().today(); if (!md.wv || md.wv.day !== day) md.wv = { day, n: 0, pend: (md.wv && md.wv.pend) || null }; return md.wv; };
  const canWishVideo = () => { const c = HSC.economy && HSC.economy.CONFIG.wishVideo; return !!(c && M() && M().data && M().data.modes && HSC.canVideo && HSC.canVideo() && wishDay().n < c.perDay && !wishDay().pend); };
  HSC.wishVideo = { state: () => { const c = HSC.economy && HSC.economy.CONFIG.wishVideo; return canWishVideo() ? { coins: c.coins, left: c.perDay - wishDay().n } : null; }, run: () => wishVideo() };
  async function wishVideo() {
    if (!canWishVideo()) return;
    const ok = HSC.watchVideo ? await HSC.watchVideo('wish-coins') : false;
    if (!ok) return; // only a really earned video pays
    const w = wishDay(), c = HSC.economy.CONFIG.wishVideo;
    w.n++;
    // the coins wait in the save until the economy has them (also while the journal is still loading): an app killed
    // in between, or a commit that failed, pays them later (recover)
    const key = 'wish:' + w.day + ':' + w.n;
    w.pend = key; M().save();
    const r = await addCoins(c.coins, 'rewarded', key);
    if (!landed(r)) return later();
    if (w.pend === key) w.pend = null;
    M().save();
  }
  async function doUndo() {
    const g = G();
    if (!g || undo.busy || !undo.stack.length) return;
    const job = g.getState().jobId;
    undo.busy = true;
    ui.el.undo.disabled = true;
    try {
      const ok = HSC.watchVideo ? await HSC.watchVideo('undo') : false;
      const s = g.getState();
      if (ok && s.status === 'cutting' && s.jobId === job && undo.job === job && undo.stack.length) {
        const prev = undo.stack.pop();
        // the game can stay paused for a moment after the video: retry until it takes the restore
        let back = false;
        for (let k = 0; k < 40 && !back; k++) { back = g.restore ? await g.restore(prev.hair, prev.beard, prev.brow) : false; if (!back) await new Promise((r) => HSC.lifecycle.timeout(r, 150)); }
        if (!back) undo.stack.push(prev);
      } else if (!ok) HSC.nope && HSC.nope(ui.el.undo);
    } finally {
      undo.busy = false;
      ui.el.undo.disabled = false;
      ui.undoButton();
    }
  }

  // ---- the result video ----
  const quickDay = () => { const md = M().data.modes, day = M().today(); if (!md.qp || md.qp.day !== day) md.qp = { day, n: 0 }; return md.qp; };
  const practiceDay = () => { const md = M().data.modes, day = M().today(); if (!md.pv || md.pv.day !== day) md.pv = { day, n: 0 }; return md.pv; };
  async function triple() {
    const d = M() && M().data, b = ui.el.x3;
    const last = d && d.lastRound;
    if (!last || last.tripled || !(last.key ? last.video : last.paid) || b.disabled) return;
    b.disabled = true;
    const ok = HSC.watchVideo ? await HSC.watchVideo('triple-tips') : false;
    if (ok && d.lastRound === last && !last.tripled) {
      // the video is earned: `tripled` is saved at once and means the two more tips are owed. The economy's round counts
      // them in its total only once its keyed commit has landed (payTriple); until then recover() commits it again
      last.tripled = true;
      if (last.free) practiceDay().n++;
      M().save();
      if (EC() && last.key) payTriple(last);
      else addCoins(last.paid * 2); // the old round (no economy) multiplies on show
    } else if (!ok) { HSC.nope && HSC.nope(b); b.disabled = false; }
    ui.scoreView();
  }
  // a tripled tip the economy has not got yet: the round's own key is still in the economy's key ring (so the check is
  // exact) and its triple key is not; it is committed this session only once (`x3in`), retried after a failure
  const x3Key = (last) => last.key + ':triple';
  function owesTriple(last) {
    const st = EC() && EC().state && EC().state();
    if (!last.tripled || !last.key || last.x3in || last.x3busy || !st || !Array.isArray(st.keys)) return false;
    return st.keys.includes(last.key) && !st.keys.includes(x3Key(last));
  }
  function payTriple(last) {
    if (last.x3busy || last.x3in) return;
    last.x3busy = true;
    EC().triple(last.key, last.video || 0).then((r) => {
      last.x3busy = false;
      if (!landed(r)) return later();
      // (a duplicate: an earlier commit landed, shown once)
      last.x3in = true; last.paid += last.video; M().save();
      ui.coinPill(true); ui.scoreView();
    }, () => { last.x3busy = false; later(); });
  }

  // ---- UI ----
  const STAR = (on) => `<svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z" fill="${on ? '#ffc83d' : 'none'}" stroke="${INK}"${on ? '' : ' stroke-dasharray="2.6 2.2" opacity=".55"'} stroke-width="2" stroke-linejoin="round"/></svg>`;
  const COIN_OLD = (s = 26) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}"><circle cx="12" cy="12" r="9.5" fill="#ffc83d" stroke="${INK}" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="none" stroke="#c98a12" stroke-width="1.8"/><path d="M10.6 8.6h2.8v6.8" fill="none" stroke="#c98a12" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const COIN = (s = 26) => (HSC.icon ? HSC.icon('coin', s) : COIN_OLD(s)); // the theme's one coin (icons.js)
  const UNDO = '<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7H15a5 5 0 0 1 0 10H8"/><path d="M11.5 3.5L7.5 7l4 3.5"/></svg>';
  const CSS = `
#hsc-req,#hsc-undo,#hsc-score{zoom:var(--hsc-s,1);font-family:"DM Sans",system-ui,-apple-system,"Segoe UI",sans-serif;color:${INK};-webkit-user-select:none;user-select:none}
#hsc-req{--k:1;position:fixed;z-index:20;left:calc(50% - 53px);top:calc(env(safe-area-inset-top) / var(--hsc-s,1) + 72px);transform:scale(var(--k));transform-origin:50% 100%;pointer-events:auto;cursor:pointer;
  display:flex;gap:4px;padding:6px;border-radius:22px;background:#fff6e6;border:3px solid ${INK};box-shadow:0 3px 0 ${INK};transition:transform .25s,left .25s,top .25s}
#hsc-req img{width:88px;height:88px;border-radius:15px;display:block;background:radial-gradient(circle at 50% 35%,#fff,#e4d2b4)}
#hsc-req::after,#hsc-req::before{content:"";position:absolute;border-radius:50%;background:#fff6e6;border:3px solid ${INK}}
#hsc-req::after{width:14px;height:14px;left:calc(50% - 6px);bottom:-24px}
#hsc-req::before{width:8px;height:8px;left:calc(50% + 8px);bottom:-38px}
#hsc-req.flip::after{left:calc(50% - 14px)}
#hsc-req.flip::before{left:calc(50% - 22px)}
#hsc-req[data-tail=r]::after,#hsc-req[data-tail=l]::after{bottom:auto;top:calc(72% - 10px)}
#hsc-req[data-tail=r]::before,#hsc-req[data-tail=l]::before{bottom:auto;top:calc(72% + 8px)}
#hsc-req[data-tail=r]::after{left:auto;right:-24px}
#hsc-req[data-tail=r]::before{left:auto;right:-38px}
#hsc-req[data-tail=l]::after{left:-24px}
#hsc-req[data-tail=l]::before{left:-38px}
#hsc-req.pop{animation:hsc-reqpop .6s ease-out}
#hsc-req.thru,#hsc-req.clash{pointer-events:none}
@keyframes hsc-reqpop{0%{transform:scale(calc(var(--k) * .4));opacity:0}70%{transform:scale(calc(var(--k) * 1.1));opacity:1}100%{transform:scale(var(--k))}}
#hsc-req[hidden],#hsc-undo[hidden],#hsc-score[hidden],#hsc-score [hidden]{display:none}
body.hsc-reveal #hsc-req,body.hsc-spin #hsc-req,body.hsc-reveal #hsc-undo,body.hsc-spin #hsc-undo{display:none}
#hsc-undo{position:fixed;z-index:20;width:56px;height:56px;border-radius:50%;padding:0;display:flex;align-items:center;justify-content:center;background:#fff6e6;color:${INK};border:3px solid ${INK};box-shadow:0 3px 0 ${INK};cursor:pointer}
#hsc-undo:active{transform:translateY(3px);box-shadow:0 1px 0 ${INK}}
#hsc-undo:disabled{opacity:.6}
#hsc-undo .hsc-ad,#hsc-score .hsc-ad{position:absolute;right:-8px;bottom:-6px;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#ffb627;color:${INK};border:2.5px solid ${INK}}
.hsc-coins{pointer-events:auto;position:relative}
.hsc-coins svg{flex:none}
.hsc-coins.bump{animation:hsc-pop .45s ease-out}
#hsc-score{--k:1;position:fixed;z-index:21;left:calc(50% - 75px);top:calc(env(safe-area-inset-top) / var(--hsc-s,1) + 14px);transform:scale(var(--k));transform-origin:0 0;display:flex;flex-direction:column;align-items:center;gap:8px;pointer-events:none}
#hsc-score .stars{display:flex;gap:6px;height:46px}
#hsc-score .stars svg{width:46px;height:46px;transform:scale(0);animation:hsc-starin .45s cubic-bezier(.3,1.6,.6,1) forwards}
#hsc-score .stars svg:nth-child(2){animation-delay:.25s}
#hsc-score .stars svg:nth-child(3){animation-delay:.5s}
@keyframes hsc-starin{to{transform:scale(1)}}
#hsc-score .tip{position:relative}
#hsc-score .line{position:absolute;left:calc(100% + 8px);top:6px;white-space:nowrap;display:flex;align-items:center;gap:6px;height:30px;padding:0 12px;border-radius:15px;background:#10223fcc;color:#fff;font-weight:900;font-size:16px;font-variant-numeric:tabular-nums;direction:ltr}
#hsc-score .line[hidden]{display:none}
#hsc-score .line .hsc-ic{width:22px;height:22px}
#hsc-score .line span{display:flex;align-items:center;gap:3px}
#hsc-hud .hsc-gap{font-style:normal;font-size:13px;font-weight:800;opacity:.9;margin-inline-start:4px;white-space:nowrap}
@keyframes hsc-rcpt{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
#hsc-score .tip{display:flex;gap:6px;align-items:center;height:48px;padding:0 14px 0 10px;border-radius:24px;background:#fff6e6;border:3px solid ${INK};box-shadow:0 3px 0 ${INK};font-weight:900;font-size:22px;font-variant-numeric:tabular-nums}
#hsc-score .x3{pointer-events:auto;position:relative;display:flex;gap:4px;align-items:center;height:52px;padding:0 16px 0 10px;border-radius:26px;background:linear-gradient(#a8e4ff,#3aa2f2);border:3px solid ${INK};box-shadow:0 4px 0 ${INK};font-weight:900;font-size:24px;color:${INK};cursor:pointer;animation:hsc-rbreathe 1.3s ease-in-out infinite}
#hsc-score .x3:disabled{animation:none;opacity:.55;cursor:default}
#hsc-score .x3:not(:disabled):active{transform:translateY(3px);box-shadow:0 1px 0 ${INK}}
.hsc-fly{position:fixed;z-index:40;pointer-events:none;transition:transform .7s cubic-bezier(.5,-0.2,.7,1),opacity .7s}
@media (prefers-reduced-motion:reduce){#hsc-score .stars svg{animation-duration:.01s}#hsc-score .x3{animation:none}}
`;
  // ---- where the order and the result sit: never on the customer's head ----
  // The camera is the owner's and stays put, so these move instead. Each is placed against the head's box on
  // screen (the engine's headScreen), the controls, the safe-area cut-outs and the screen edges: above the head
  // when it fits, otherwise beside it on the free side, shrinking (never below `kMin`) only when it must. Worked
  // out in screen pixels; the layers are drawn at the UI scale S, so a position is divided by S when it is set.
  // Kinds: 'above' (over the head, tail down), 'left' / 'right' (beside it, tail toward him), 'downL' / 'downR' (beside
  // his head under the top buttons, tail down: narrower than a side bubble, for a head that fills the screen's width).
  const place = {
    probe: null,
    // the safe-area insets in screen pixels (env() inside a zoomed layer would be multiplied by S)
    insets() {
      let p = this.probe;
      if (!p || !p.isConnected) {
        p = this.probe = document.createElement('div');
        p.style.cssText = 'position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;pointer-events:none;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)';
        document.body.appendChild(p);
      }
      const c = getComputedStyle(p), n = (v) => parseFloat(v) || 0;
      return { t: n(c.paddingTop), r: n(c.paddingRight), b: n(c.paddingBottom), l: n(c.paddingLeft) };
    },
    // The head's box costs the engine a pass over the head mesh (2 ms, over 10 on a slow phone), so it is kept while
    // the camera, the customer and the canvas are unchanged. Right after any change it is measured again every call
    // (at most once a tick), in case the engine settles a frame later; `moved` is when the camera last moved.
    hc: { key: null, box: null, at: -1e9, moved: -1e9 },
    headKey() {
      try {
        const g = G(), s = g && g.getState(), c = document.querySelector('#scene canvas') || document.querySelector('canvas'), r = c && c.getBoundingClientRect();
        return s && r ? [s.jobId, s.status, s.cameraYawDeg, s.cameraElevation, r.left, r.top, r.width, r.height, innerWidth, innerHeight].join() : null;
      } catch (e) { return null; }
    },
    head() {
      const now = performance.now(), c = this.hc, key = this.headKey();
      if (key !== c.key) { c.key = key; c.moved = now; c.at = -1e9; }
      if (key && c.box && (now - c.at < 50 || (now - c.moved > 600 && now - c.at < 2000))) return c.box;
      let h = null, box;
      try { const g = G(); h = g && g.headScreen ? g.headScreen() : HSC.view && HSC.view.headScreen ? HSC.view.headScreen() : null; } catch (e) { h = null; }
      if (h && [h.left, h.top, h.right, h.bottom].every(Number.isFinite) && h.right > h.left && h.bottom > h.top) box = { l: h.left, t: h.top, r: h.right, b: h.bottom };
      // no box yet: keep clear of the middle of the screen, where the head always is (not kept)
      else return { l: innerWidth * 0.3, t: innerHeight * 0.2, r: innerWidth * 0.7, b: innerHeight * 0.6 };
      c.box = box; c.at = now;
      return box;
    },
    // the camera (or the screen) changed within the last `ms`: placements check every tick while it moves
    moving(ms = 400) { this.headKey() !== this.hc.key && this.head(); return performance.now() - this.hc.moved < ms; },
    // the boxes of what is on screen and must stay uncovered
    rects(sel, skip) {
      const out = [];
      for (const e of document.querySelectorAll(sel)) {
        if (skip && skip.contains(e)) continue;
        if (e.checkVisibility ? !e.checkVisibility({ visibilityProperty: true }) : !e.offsetParent && getComputedStyle(e).position !== 'fixed') continue;
        const r = e.getBoundingClientRect();
        if (r.width > 1 && r.height > 1) out.push({ l: r.left, t: r.top, r: r.right, b: r.bottom });
      }
      return out;
    },
    hit: (a, b, m = 0) => a.l < b.r + m && a.r > b.l - m && a.t < b.b + m && a.b > b.t - m,
    // the whole space a placement takes: the box (w x h at scale k) and its tail toward the head
    down: (kind) => kind === 'above' || kind === 'downL' || kind === 'downR' || kind === 'cornerL' || kind === 'cornerR',
    corner: (kind) => kind === 'cornerL' || kind === 'cornerR',
    // The head itself in its box: the engine's box is the scalp's, so it is square at the corners where a round head
    // is not, and the hair stands out past it (about a tenth of the head's height on top). A corner spot is tested
    // against this oval: the box's own oval grown by the gap and that hair. A rectangle clears it when its point
    // nearest the oval's centre lies outside it.
    oval(h, gap) { const hh = h.b - h.t, m = gap + 0.12 * hh; return { x: (h.l + h.r) / 2, y: (h.t + h.b) / 2, a: (h.r - h.l) / 2 + m, b: hh / 2 + m }; },
    offOval(r, e) { const qx = Math.max(r.l, Math.min(e.x, r.r)), qy = Math.max(r.t, Math.min(e.y, r.b)), dx = (qx - e.x) / e.a, dy = (qy - e.y) / e.b; return dx * dx + dy * dy > 1; },
    span(kind, x, y, k, o) {
      const dn = this.down(kind);
      return { l: x, t: y, r: x + (o.w + (dn ? 0 : o.tail)) * k, b: y + (o.h + (dn ? o.tail : 0)) * k };
    },
    ok(kind, x, y, k, o) {
      const a = this.span(kind, x, y, k, o), B = o.bounds, h = o.head;
      if (a.l < B.l - 0.5 || a.t < B.t - 0.5 || a.r > B.r + 0.5 || a.b > B.b + 0.5) return false;
      if (!this.corner(kind) && this.hit(a, h, o.gap)) return false;
      for (const r of o.avoid) if (this.hit(a, r, o.pad)) return false;
      // in a top corner beside the top buttons, the tail down toward his head (a head that fills a tablet leaves no
      // room above it): the box and the tail's dots (the middle of its width) clear his head's oval, and the tail ends
      // level with his head's upper half, on his side of it
      if (this.corner(kind)) {
        const e = this.oval(h, o.gap), bw = o.w * k, cx = x + bw / 2;
        if (!this.offOval({ l: x, t: y, r: x + bw, b: y + o.h * k }, e) || !this.offOval({ l: cx - bw * 0.2, t: y + o.h * k, r: cx + bw * 0.2, b: a.b }, e)) return false;
        if (y + o.h * k > h.t || a.b < h.t || a.b > e.y) return false; // the box over the top of his head, the tail beside it
        return kind === 'cornerL' ? cx <= e.x - (h.r - h.l) * 0.15 : cx >= e.x + (h.r - h.l) * 0.15;
      }
      // the box belongs to the customer: above him it is over his head, beside him it is level with it
      if (kind === 'above') { const cx = (a.l + a.r) / 2; return a.b <= h.t && cx >= h.l && cx <= h.r; }
      if ((kind === 'left' || kind === 'downL') && a.r > h.l) return false;
      if ((kind === 'right' || kind === 'downR') && a.l < h.r) return false;
      // a tail down beside him ends level with the top of his head
      if (kind === 'downL' || kind === 'downR') return a.b >= h.t && a.b <= h.t + (h.b - h.t) * 0.6;
      if (o.tail) { const ty = y + o.h * k * 0.72; return ty >= h.t && ty <= h.b; }
      return true;
    },
    // the nearest free spot for one kind at scale k, or null
    at(kind, k, o) {
      const dn = this.down(kind), p = o.pref(kind, k), W = (o.w + (dn ? 0 : o.tail)) * k, H = (o.h + (dn ? o.tail : 0)) * k;
      const hd = o.head, ty = o.h * k * 0.72; // the side tail's height on the box
      const xs = [p.x, o.bounds.l, o.bounds.r - W, hd.l - o.gap - W, hd.r + o.gap, hd.l - W / 2 + 1, hd.r - W / 2 - 1, hd.l, hd.r - W];
      const ys = [p.y, o.bounds.t, o.bounds.b - H, hd.t - o.gap - H, hd.t, hd.t - ty + 1, hd.b - ty - 1, hd.t - H + 1, hd.t + (hd.b - hd.t) * 0.6 - H - 1];
      for (const r of o.avoid) xs.push(r.r + o.pad + 0.5, r.l - o.pad - W - 0.5), ys.push(r.b + o.pad + 0.5, r.t - o.pad - H - 0.5);
      let best = null;
      for (const x of xs) for (const y of ys) {
        const cost = Math.abs(x - p.x) + Math.abs(y - p.y);
        if ((!best || cost < best.cost) && this.ok(kind, x, y, k, o)) best = { kind, x, y, k, cost };
      }
      return best;
    },
    // the biggest scale (up to kMax) at which each kind fits, then the best kind; null when nothing fits at kMin. The
    // first kind has a `bonus`, the kind it already shows (`prev`) a `keep` bonus, so it does not hop sides as he turns
    best(o) {
      let win = null;
      for (const kind of o.kinds) {
        const bonus = (kind === o.kinds[0] ? o.bonus || 0 : 0) + (kind === o.prev ? o.keep || 0 : 0);
        if (win && win.score >= o.kMax + bonus) continue; // already the full size: nothing can beat it
        let got = this.at(kind, o.kMin, o);
        if (!got) continue;
        const top = this.at(kind, o.kMax, o);
        if (top) got = top;
        else {
          let a = o.kMin, b = o.kMax;
          for (let i = 0; i < 6; i++) { const m = (a + b) / 2, r = this.at(kind, m, o); if (r) { a = m; got = r; } else b = m; }
        }
        // (the first kind's bonus holds only at `firm` size or more: below it, any spot clearly bigger wins)
        const score = got.k + (got.k >= (o.firm || 0) || kind !== o.kinds[0] ? bonus : bonus - (o.bonus || 0));
        if (!win || score > win.score + 1e-6) win = { ...got, score };
      }
      // a little smaller is better than far from its own place (a corner of the screen): `slack` of the scale is traded
      if (win && o.slack) { const near = this.at(win.kind, Math.max(o.kMin, win.k - o.slack), o); if (near && near.cost < win.cost - (o.W + o.H) * 0.1) win = { ...near, score: win.score }; }
      return win;
    },
    // The order bubble: N px square at scale 1 with a tail of T px, first choice just below the top buttons (`below`)
    // over his head; then beside him; then beside his head (or in a top corner beside the top buttons) with the tail
    // down, which wins whenever it is clearly bigger than a small bubble over his head (a tablet's head fills its
    // width and comes up near the top). While it is
    // enlarged (`big`) it grows only where it still clears everything, on the side it already sits if it can. Null
    // when nothing fits even at half size.
    order(f, avoid, below) {
      const { N, T, head: hd } = f;
      const pref = (kind, k) => kind === 'above' ? { x: (hd.l + hd.r - N * k) / 2, y: below }
        : kind === 'left' ? { x: hd.l - f.gap - (N + T) * k, y: hd.t - 0.2 * N * k } : kind === 'right' ? { x: hd.r + f.gap, y: hd.t - 0.2 * N * k }
        : kind === 'downL' ? { x: hd.l - f.gap - N * k, y: below } : kind === 'downR' ? { x: hd.r + f.gap, y: below }
        : kind === 'cornerL' ? { x: hd.l, y: f.bounds.t } : { x: hd.r - N * k, y: f.bounds.t };
      return { ...f, w: N, h: N, tail: T, avoid, pref, kMin: 0.5, kMax: 1, bonus: 0.15, firm: 0.75, keep: 0.1, kinds: ['above', 'left', 'right', 'downL', 'downR', 'cornerL', 'cornerR'] };
    },
    orderSpot(o, big, prev) {
      const normal = this.best({ ...o, prev });
      if (!big || !normal) return normal;
      const grow = { ...o, kMin: Math.min(1.8, normal.k + 0.15), kMax: 1.8 };
      return (prev && this.best({ ...grow, kinds: [prev] })) || this.best(grow) || normal;
    },
    // the result column: cw px wide (w with the bill that hangs off it) by h; over the head, or centred in the free side.
    // `x3`: the video button's own size at scale 1 ({w, h} screen px) while it is offered
    result(f, avoid, cw, w, h, x3) {
      const hd = f.head, top = f.ins.t + 14 * f.S;
      const pref = (kind, k) => kind === 'above' ? { x: (hd.l + hd.r - cw * k) / 2, y: top }
        : kind === 'left' ? { x: (f.bounds.l + hd.l - f.gap - cw * k) / 2, y: top } : { x: (hd.r + f.gap + f.bounds.r - cw * k) / 2, y: top };
      // the video button is never a touch under 44 px: the column takes the free side before it shrinks under that
      return { ...f, w, h, cw, x3, tail: 0, avoid, pref, kMin: x3 ? Math.max(0.5, Math.min(1, 44 / x3.h)) : 0.5, kMax: 1, bonus: 0.05, slack: 0.1, kinds: ['above', 'left', 'right'] };
    },
    // the result's spot. Where even that does not fit (a small phone's head fills the screen) the column shrinks on
    // to half size but its video button does not: it is drawn `x3z` times its scale (44 px tall), and the column's
    // larger box (w2 x h2 at scale 1) is what must clear the head
    resultSpot(o) {
      const spot = this.best(o);
      if (spot || !o.x3) return spot && { ...spot, x3z: 1, w2: o.w, h2: o.h };
      for (let k = o.kMin - 0.02; k >= 0.5 - 1e-9; k -= 0.02) {
        const z = 44 / (o.x3.h * k), w2 = o.w + Math.max(0, o.x3.w * z - o.cw), h2 = o.h + o.x3.h * (z - 1);
        const got = this.best({ ...o, w: w2, h: h2, kMin: k, kMax: k, slack: 0 });
        if (got) return { ...got, x3z: z, w2, h2 };
      }
      return null;
    },
    // everything a placement needs from the screen right now
    frame(extra) { return this.frameOf(innerWidth, innerHeight, HSC.S || 1, this.insets(), this.head(), extra); },
    // a screen W x H at UI scale S: 6 px (at S) clear of the head and of each control, 8 px inside the safe area
    frameOf(W, H, S, ins, head, extra) {
      const m = 8 * S;
      return { S, W, H, ins, head, gap: 6 * S, pad: 6 * S, bounds: { l: ins.l + m, t: ins.t + m, r: W - ins.r - m, b: H - ins.b - m }, ...extra };
    },
  };
  // other layers (the mode toast) ask for a free spot the same way
  HSC.uiPlace = {
    // a box of w x h screen px: the free spot nearest the top of the screen, off the head; {x, y, k}
    spot(w, h, avoid = []) {
      const f = place.frame({ w, h, tail: 0, kMax: 1, kMin: 0.5, bonus: 0.05, kinds: ['above', 'left', 'right'] });
      const ctl = place.rects('.ui button,#hsc-hud button,#hsc-rush.on,#hsc-score:not([hidden]),#hsc-req:not([hidden])');
      const o = { ...f, avoid: ctl.concat(avoid) };
      o.pref = (kind, k) => kind === 'above' ? { x: (f.head.l + f.head.r - w * k) / 2, y: f.bounds.t } : kind === 'left' ? { x: (f.bounds.l + f.head.l - f.gap - w * k) / 2, y: f.bounds.t } : { x: (f.head.r + f.gap + f.bounds.r - w * k) / 2, y: f.bounds.t };
      return place.best(o) || { x: (f.W - w * 0.5) / 2, y: f.bounds.t, k: 0.5 };
    },
    head: () => place.head(),
    place, // the placement rules themselves, for android/tests/fix-scale-game.cjs
  };
  const TURN = 15, TURNS = 24; // the order's head turns with the customer in steps this small, in degrees
  const LEVEL = 0; // and it always looks straight ahead, so a beard or a jawline can be read from the front
  const ui = {
    el: {}, built: false, ring: new Map(), touching: false, round: null, flying: 0, shownJob: null,
    build() {
      if (this.built || !document.body) return;
      this.built = true;
      const style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);
      const reqEl = document.createElement('div'); reqEl.id = 'hsc-req'; reqEl.hidden = true; reqEl.setAttribute('aria-hidden', 'true');
      reqEl.innerHTML = '<img alt="">';
      reqEl.addEventListener('click', () => this.big(!reqEl.classList.contains('big')));
      const undoEl = document.createElement('button'); undoEl.id = 'hsc-undo'; undoEl.type = 'button'; undoEl.hidden = true;
      undoEl.setAttribute('aria-label', 'Watch a video to undo the last stroke');
      undoEl.innerHTML = `${HSC.icon ? HSC.icon('undo', 32) : UNDO}<span class="hsc-ad">${HSC.AD_ICON ? HSC.AD_ICON(18) : ''}</span>`;
      undoEl.addEventListener('click', doUndo);
      const score = document.createElement('div'); score.id = 'hsc-score'; score.hidden = true;
      score.innerHTML = `<div class="stars"></div><div class="tip">${COIN(30)}<span></span><div class="line" hidden></div></div>
        <button class="x3" type="button" aria-label="Watch a video to double it">${HSC.icon ? HSC.icon('video', 26) : ''}<span></span>${COIN(24)}</button>`;
      score.querySelector('.x3').addEventListener('click', triple);
      document.body.append(reqEl, undoEl, score);
      Object.assign(this.el, { line: score.querySelector('.line'), req: reqEl, undo: undoEl, score, stars: score.querySelector('.stars'), tip: score.querySelector('.tip span'), x3: score.querySelector('.x3') });
      const scene = document.getElementById('scene') || document;
      scene.addEventListener('pointerdown', onDown, true);
      addEventListener('pointerup', onUp, true);
      addEventListener('pointercancel', onUp, true);
      HSC.lifecycle.interval(() => this.tick(), 60);
      addEventListener('pointerdown', () => { this.touching = true; }, true);
      for (const e of ['pointerup', 'pointercancel']) addEventListener(e, () => { this.touching = false; reqEl.classList.remove('thru'); }, true);
      // a stroke that starts on the customer never ends on the bubble: it lets every touch through until the finger lifts
      scene.addEventListener('pointerdown', () => reqEl.classList.add('thru'), true);
    },
    coinPill() {},
    undoButton() {
      const g = G(), b = this.el.undo;
      if (!g || !b) return;
      const s = g.getState();
      const show = s.status === 'cutting' && undo.job === s.jobId && undo.stack.length > 0 && !!(HSC.canVideo && HSC.canVideo());
      b.hidden = !show;
      if (!show) return;
      const u = this.undoSpot(), S = HSC.S || 1;
      Object.assign(b.style, { left: u.l / S + 'px', top: u.t / S + 'px' });
    },
    // under the top-left buttons; the order keeps clear of this spot even before the button appears
    undoSpot() {
      const row = document.querySelector('#hsc-hud .hsc-row'), S = HSC.S || 1;
      const r = row && row.getBoundingClientRect();
      const left = document.querySelector('.ui .top button');
      const lr = left && left.getBoundingClientRect();
      const x = lr && lr.width ? lr.left : r ? r.left : 12, y = Math.max(r ? r.bottom : 0, lr ? lr.bottom : 0) + 14;
      return { l: x, t: y, r: x + 56 * S, b: y + 56 * S };
    },
    // the order grows for a closer look (a tap, or a new customer for 2.6 s) only where it still clears the head
    big(on, fresh) {
      const el = this.el.req;
      HSC.lifecycle.clear(this.bigT);
      el.classList.toggle('big', on);
      if (on) this.bigT = HSC.lifecycle.timeout(() => this.big(false), 2600);
      if (!fresh) this.placeReq(true);
    },
    // the order: above the head when it fits with its tail, otherwise beside it with the tail toward him
    placeReq(force, appear) {
      const el = this.el.req, now = performance.now();
      // checked every 200 ms, and every tick while the camera moves (his head can turn or tilt under it)
      if (!el || el.hidden || (!force && now - (this.reqT || 0) < 200 && !place.moving())) return;
      this.reqT = now;
      const S = HSC.S || 1, N = 106 * S, T = 40 * S, big = el.classList.contains('big'); // 88 px picture + padding + border; tail dots
      const rush = document.querySelector('#hsc-rush.on');
      const f = place.frame({ N, T }), hd = f.head;
      const avoid = place.rects('.ui button,#hsc-hud button,#hsc-rush.on', el);
      if (HSC.canVideo && HSC.canVideo()) avoid.push(this.undoSpot());
      // first choice as before: just below the top buttons (and clear of the Rush clock), over his head
      const row = document.querySelector('#hsc-hud .hsc-row'), bar = document.querySelector('.ui .top');
      const below = Math.max(f.bounds.t, row ? row.getBoundingClientRect().bottom : 0, bar ? bar.getBoundingClientRect().bottom : 0, rush ? rush.getBoundingClientRect().bottom : 0) + (rush ? 12 : 10) * S;
      const key = [f.W, f.H, S, f.ins.t, f.ins.r, f.ins.b, f.ins.l, !!rush, big].join();
      const cur = this.reqSpot;
      const o = place.order(f, avoid, below);
      const clear = cur && cur.key === key && !cur.clash && place.ok(cur.kind, cur.x, cur.y, cur.k, o), still = !force && clear;
      // it stays where it is while that is still clear; it only moves for a clearly bigger spot, never under a finger
      if (still && (now - cur.at < 1500 || this.touching)) return;
      let spot = place.orderSpot(o, big, cur && !appear ? cur.kind : null); // a new customer starts afresh
      if (still && (!spot || spot.k < cur.k + 0.1)) { cur.at = now; return; }
      if (!spot) {
        // nowhere clear even at half size (not seen on any screen): the smallest bubble, and touches go through it
        const k = 0.5;
        spot = { kind: 'above', x: Math.max(f.bounds.l, Math.min(f.bounds.r - N * k, (hd.l + hd.r - N * k) / 2)), y: below, k, clash: true };
      }
      const k = spot.k, tail = place.down(spot.kind) ? 'b' : spot.kind === 'left' ? 'r' : 'l';
      const bx = spot.kind === 'right' ? spot.x + T * k : spot.x, by = spot.y;
      const ox = tail === 'b' ? 0.5 : tail === 'r' ? 1 : 0, oy = tail === 'b' ? 1 : 0.72;
      // a new customer's bubble appears in place, a move to another side jumps, and so does a bubble his head has turned
      // or tilted into: it never slides across his head
      if (appear || !clear || (cur && cur.kind !== spot.kind)) el.style.transition = 'none';
      el.dataset.tail = tail;
      // the second dot leans toward his head
      el.classList.toggle('flip', tail === 'b' && (hd.l + hd.r) / 2 < bx + N * k / 2);
      el.classList.toggle('clash', !!spot.clash);
      el.style.transformOrigin = `${ox * 100}% ${oy * 100}%`;
      el.style.setProperty('--k', k.toFixed(3));
      el.style.left = (bx - ox * N * (1 - k)) / S + 'px';
      el.style.top = (by - oy * N * (1 - k)) / S + 'px';
      if (el.style.transition) { void el.offsetWidth; el.style.transition = ''; }
      this.reqSpot = { ...spot, key, at: now };
    },
    // the result (stars, coins, the video): over the head in portrait, in the free half beside it in landscape
    placeScore(force) {
      const el = this.el.score, now = performance.now();
      if (!force && now - (this.scoreT || 0) < 200) return;
      this.scoreT = now;
      const S = HSC.S || 1, k0 = this.scoreK || 1, x3 = this.el.x3, z0 = x3.style.zoom;
      // its own size (the video button measured at its own scale), with the bill that hangs off the coins to the right
      if (z0) x3.style.zoom = '';
      const r = el.getBoundingClientRect(), xr = x3.getBoundingClientRect(), ln = this.el.line, lr = !ln.hidden && ln.getBoundingClientRect();
      if (z0) x3.style.zoom = z0;
      if (!r.width) return;
      const cw = r.width / k0, w = (Math.max(r.right, lr && lr.width ? lr.right : 0) - r.left) / k0, h = r.height / k0;
      const offer = x3.style.visibility !== 'hidden' && !x3.hidden && xr.height > 0 ? { w: xr.width / k0, h: xr.height / k0 } : null;
      const f = place.frame({});
      const avoid = place.rects('.ui button,#hsc-hud button,#hsc-hub button,.training-continue', el);
      const key = [f.W, f.H, S, f.ins.t, f.ins.r, f.ins.b, f.ins.l, Math.round(w / 4), Math.round(h / 4), !!offer].join(); // a pixel of rounding is no change
      const o = place.result(f, avoid, cw, w, h, offer);
      const cur = this.scoreSpot, still = !force && cur && cur.key === key && place.ok(cur.kind, cur.x, cur.y, cur.k, { ...o, w: cur.w2, h: cur.h2 });
      // it stays put while it is clear (the video button must not move under a finger), unless a clearly bigger spot opens
      if (still && (now - cur.at < 1500 || this.touching)) return;
      let spot = place.resultSpot(o);
      if (still && (!spot || spot.k < cur.k + 0.1)) { cur.at = now; return; }
      if (!spot) spot = { kind: 'above', x: Math.max(f.bounds.l, (f.W - cw * o.kMin) / 2), y: f.ins.t + 14 * S, k: o.kMin, x3z: 1, w2: w, h2: h };
      this.scoreK = +spot.k.toFixed(3);
      el.style.setProperty('--k', String(this.scoreK));
      el.style.left = spot.x / S + 'px';
      el.style.top = spot.y / S + 'px';
      x3.style.zoom = spot.x3z > 1.001 ? spot.x3z.toFixed(3) : '';
      this.scoreSpot = { ...spot, key, at: now };
    },
    // the order's head at one angle, drawn once per customer
    reqPic(s, r, yaw) {
      const v = HSC.view;
      if (this.ring.has(yaw)) return this.ring.get(yaw);
      let url = null;
      try {
        if (r.beard) v.setBeard(r.beard);
        url = v.thumbnail(r.target || s.startHair, yaw * TURN, LEVEL, { size: 160, headOnly: true });
      } catch (e) { console.error('customers: request picture failed', e); }
      finally { if (r.beard) v.setBeard(s.beard); }
      if (url) this.ring.set(yaw, url);
      return url;
    },
    request(s) {
      const r = HSC.requestFor(s), el = this.el.req;
      if (!r) { el.hidden = true; return; }
      // one head with the cut he wants, always at the angle the barber is looking from
      const yaw = ((Math.round(s.cameraYawDeg / TURN) % TURNS) + TURNS) % TURNS, fresh = this.reqKey !== r.job + ':' + r.style.id;
      if (fresh) { this.reqKey = r.job + ':' + r.style.id; this.ring = new Map(); this.reqAt = null; }
      if (this.reqAt !== yaw) {
        const url = this.reqPic(s, r, yaw);
        if (!url) { el.hidden = true; this.reqKey = null; return; }
        el.querySelector('img').src = url;
        this.reqAt = yaw;
      }
      const appear = el.hidden || fresh;
      el.hidden = false;
      if (fresh) {
        el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
        this.big(true, true);
      }
      // the other angles fill in quietly, nearest first, never under a finger, so turning the customer stays smooth
      const now = performance.now();
      if (!this.touching && now - (this.reqFill || 0) > 220) {
        for (let d = 1; d <= TURNS / 2; d++) {
          const near = [(yaw + d) % TURNS, (yaw - d + TURNS) % TURNS].find((n) => !this.ring.has(n));
          if (near != null) { this.reqFill = now; this.reqPic(s, r, near); break; }
        }
      }
      // off his head, wherever the screen, the clock or the turn of his head leaves room
      this.placeReq(appear, appear);
    },
    scoreView() {
      const d = M() && M().data, last = d && d.lastRound, s = G() && G().getState();
      const show = !!(last && s && s.status === 'reveal' && last.job === s.jobId && document.body.classList.contains('hsc-reveal'));
      const appear = show && this.el.score.hidden;
      this.el.score.hidden = !show;
      if (!show) return;
      const stars = last.shownStars || last.stars;
      const key = last.job + ':' + stars;
      const plain = !!(last.free || last.judged); // no order to score: no stars, the coins and video stay in their place
      if (this.starKey !== key + ':' + plain) {
        this.starKey = key + ':' + plain;
        this.el.stars.innerHTML = plain ? '' : [1, 2, 3].map((n) => STAR(n <= stars)).join('');
      }
      this.el.tip.textContent = '+' + ((last.key ? last.paid : last.paid * (last.tripled ? 3 : 1)) + (last.mile || 0));
      // one coin number: the job, plus any milestone or level coins it brought
      const mile = EC() && EC().takeMilestones ? EC().takeMilestones() : 0;
      if (mile) last.mile = (last.mile || 0) + mile;
      // the shop bill, only on the job that charges it
      const lk = String(last.bill ? last.bill.amount : 0);
      if (this.el.line.dataset.k !== lk) {
        this.el.line.dataset.k = lk;
        this.el.line.innerHTML = last.bill ? `${HSC.icon ? HSC.icon('salon', 22) : ''}<span>−${last.bill.amount}</span>` : '';
        this.el.line.hidden = !last.bill;
      }
      // Do not offer the result reward until the base haircut transaction has landed. Otherwise a very fast tap can
      // make the visible balance jump by the base pay and reward together, and queues several journal commits at once.
      const canX = !last.pend && !last.tripled && (last.key ? last.video > 0 : last.paid > 0) && !!(HSC.canVideo && HSC.canVideo());
      // nothing moves between modes: what does not apply keeps its place empty
      this.el.tip.parentNode.style.visibility = last.paid || last.mile ? '' : 'hidden';
      this.el.x3.style.visibility = canX ? '' : 'hidden';
      this.el.x3.hidden = false;
      { const round = String(last.key || last.seq || ''); if (this.el.x3.dataset.round !== round) { this.el.x3.dataset.round = round; this.el.x3.disabled = false; } }
      if (canX) this.el.x3.querySelector('span').textContent = '+' + (last.key ? last.video : 2 * last.paid);
      this.placeScore(appear);
    },
    tick() {
      const g = G();
      if (!g || !M() || !M().data) return;
      const s = g.getState();
      this.coinPill(false);
      recover();
      if (s.status === 'cutting') {
        this.request(s);
        if (undo.job !== s.jobId) { undo.job = s.jobId; undo.stack = []; }
        this.shownJob = null;
      } else this.el.req.hidden = true;
      this.undoButton();
      this.scoreView();
      this.lastStatus = s.status;
    },
  };
  const boot = () => { if (G() && document.body) ui.build(); else HSC.lifecycle.timeout(boot, 300); };
  boot();
})(globalThis.HSC || (globalThis.HSC = {}));


// ---------------------------------------------------------------------------------------------
// Android only (buildall.sh, HEAD_SHAPES=1): the level moment and the daily tasks.
//
//   level        reaching a new level pays the economy's one-time level coins (economy.js).
//   daily tasks  3 small goals a day (fades, beards, regulars, 3-star cuts, customers, tips), each paying CONFIG.goal.
// Items are bought with coins: nothing here gives away a clipper or a gown (owner decision, 6 November 2026).
// ---------------------------------------------------------------------------------------------
(function (HSC) {
  'use strict';
  if (!HSC.PHENOTYPES) return;
  const KEY = 'skin-fade-studio-progress-v1';
  const M = () => HSC.meta, G = () => globalThis.skinFadeStudio;
  const dayKey = (d = new Date()) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  // the day the tasks count by: the game's day (meta.js), which never moves backwards, so turning the clock back
  // cannot bring back a day's tasks
  const today = () => (M() && M().today ? M().today() : dayKey());
  // real work (modes.js): hair or beard really changed from the start, never the stroke counter
  const worked = (s) => !!s && (HSC.modes && HSC.modes.worked ? HSC.modes.worked(s) : s.cutStrokeCount > 0);
  const hash = (str) => { let h = 2166136261; for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; };

  const TASKS = {
    fade: { goal: 3, test: (e) => e.fade },
    beard: { goal: 2, test: (e) => e.beard },
    regular: { goal: 1, test: (e) => e.regular },
    star3: { goal: 2, test: (e) => e.stars === 3 },
    customers: { goal: 5, test: () => true },
    tips: { goal: 120, amount: (e) => e.tips },
  };
  const taskPay = () => HSC.economy.CONFIG.goal;

  // ---- saved state ----
  let P = null, client = null;
  const fresh = () => ({ v: 1, tasks: { day: null, list: [] }, days: HSC.dayBook ? HSC.dayBook.fresh() : null, level: 0, lastJob: null });
  function sanitize(d) {
    const f = fresh();
    if (!d || typeof d !== 'object' || d.v !== 1) return f;
    const int = (v, lo, hi, dflt) => (Number.isSafeInteger(v) && v >= lo && v <= hi ? v : dflt);
    const day = (v) => (typeof v === 'string' && /^\d{4}-\d\d-\d\d$/.test(v) ? v : null);
    const list = d.tasks && Array.isArray(d.tasks.list) ? d.tasks.list.filter((t) => t && TASKS[t.k]).slice(0, 3).map((t) => ({ k: t.k, n: int(t.n, 0, 1e6, 0), claimed: t.claimed === true })) : [];
    return {
      v: 1,
      tasks: { day: day(d.tasks && d.tasks.day), list },
      days: HSC.dayBook ? HSC.dayBook.clean(d.days, (e) => { const t = sanitize({ v: 1, tasks: e }).tasks; return t.day ? { day: t.day, list: t.list } : null; }, day(d.tasks && d.tasks.day)) : null,
      level: int(d.level, 0, 9999, 0), lastJob: Number.isSafeInteger(d.lastJob) || (typeof d.lastJob === 'string' && d.lastJob.length <= 160) ? d.lastJob : null,
    };
  }
  const save = () => { if (client && client.saveProgress && P) client.saveProgress(KEY, P).catch(() => {}); };

  // ---- daily tasks ----
  // the tasks keep their own book of days (meta.js HSC.dayBook), filed with their day: meta decides the game day, so a
  // clock moved back and forth gets each day's own tasks back (claimed ones stay claimed) and never deals a day twice
  function ensureTasks() {
    const day = today();
    if (P.tasks.day !== day && HSC.dayBook) {
      if (P.tasks.day) HSC.dayBook.put(P.days, { day: P.tasks.day, list: P.tasks.list });
      const back = HSC.dayBook.take(P.days, day);
      if (back) { P.tasks = { day, list: back.list }; save(); }
    }
    if (P.tasks.day !== day) {
      // goals come only from what this barber can do today (balance model section 11): beards from level 2, regulars
      // once there is one to come back; fades, stars, customers and tips are always reachable, so three always exist
      const hasRegular = Object.values((HSC.careerRun && HSC.careerRun.body && HSC.careerRun.body() && HSC.careerRun.body().regs) || {}).some((l) => l && l.length) || !!(M() && M().data && (M().data.regulars || []).length);
      const keys = Object.keys(TASKS).filter((k) => (k !== 'beard' || (M() && M().level() >= 2)) && (k !== 'regular' || hasRegular)), out = [];
      let h = hash('tasks|' + day);
      while (out.length < 3) { h = Math.imul(h ^ (h >>> 15), 0x2c1b3c6d) >>> 0; const k = keys[h % keys.length]; if (!out.includes(k)) out.push(k); }
      P.tasks = { day, list: out.map((k) => ({ k, n: 0, claimed: false })) };
    }
    return P.tasks.list;
  }
  const taskDone = (t) => t.n >= TASKS[t.k].goal;
  function track(e) {
    let changed = false;
    for (const t of ensureTasks()) {
      if (t.claimed || taskDone(t)) continue;
      const T = TASKS[t.k], add = T.amount ? T.amount(e) : T.test(e) ? 1 : 0;
      if (add > 0) { t.n = Math.min(T.goal, t.n + add); changed = true; }
    }
    if (changed) save();
  }

  // ---- after every finished customer (requests.js has scored him): the tasks ----
  const done = HSC.onHaircutDone;
  HSC.onHaircutDone = function (state) {
    const r = done ? done.apply(this, arguments) : undefined;
    try { afterCut(state); } catch (e) { console.error('customers: progress failed', e); }
    return r;
  };
  function afterCut(s) {
    const d = M() && M().data, last = d && d.lastRound;
    // only a paid customer with real work counts (an untouched one, one with every stroke undone, or a job seen twice)
    // the job's pay key, not its number, marks it counted (the engine's job numbers can start again)
    const id = last && (last.key || s.jobId);
    if (!P || !last || last.job !== s.jobId || P.lastJob === id || !(last.stars > 0) || !worked(s)) return;
    if (HSC.repeatJob && HSC.repeatJob(s.jobId)) return;
    // Quick Play is outside the tasks (a pressure-free customer cannot farm them)
    if (HSC.modes && HSC.modes.econJob && HSC.modes.econJob(s).kind === 'free') return;
    P.lastJob = id;
    const p = s.look && s.look.person, req = HSC.requestFor ? HSC.requestFor(s) : null;
    const beard = Array.isArray(s.beard) && Array.isArray(s.startBeard) && s.beard.some((v, i) => v < s.startBeard[i]);
    track({ stars: last.stars, tips: last.paid, regular: !!(p && p.regular), beard, fade: !!(req && ['skin', 'fade', 'taper', 'temple'].includes(req.style.fam)) });
    save();
  }

  // rewards from goals (tips from customers count toward the tips task in afterCut)
  // every claim is one idempotent transaction keyed by its claim id (economy.js)
  const pay = (n, cat, key) => HSC.coins.add(n, cat, key);

  // ---- the Free tab (shop.js) ----
  const WORDS = { fade: 'task_fade', beard: 'task_beard', regular: 'task_regular', star3: 'task_star3', customers: 'task_customers', tips: 'task_tips' };
  HSC.tasks = {
    list: () => (P ? ensureTasks().map((x) => ({ k: x.k, n: x.n, goal: TASKS[x.k].goal, done: taskDone(x), claimed: x.claimed, pay: taskPay(), text: HSC.tn ? HSC.tn(WORDS[x.k], TASKS[x.k].goal) : (HSC.t ? HSC.t(WORDS[x.k]) : x.k).replace('{n}', TASKS[x.k].goal) })) : []),
    ready: () => !!P && ensureTasks().some((x) => taskDone(x) && !x.claimed),
    claim(i) {
      const x = P && P.tasks.list[i];
      if (!x || x.claimed || !taskDone(x)) return false;
      // keyed by the tasks' own day, not the day of the claim (a claim after midnight is still that day's task)
      x.claimed = true; pay(taskPay(), 'goal', 'goal:' + P.tasks.day + ':' + x.k); save();
      return true;
    },
  };

  // ---- a new level: the economy's one-time coins, added to the result's one coin number ----
  const ui = {
    reveal(s) {
      const key = String(s.jobId);
      if (this.revealKey === key) return;
      this.revealKey = key;
      const last = M().data.lastRound, lv = M().level();
      if (!last || last.job !== s.jobId || lv <= P.level) return;
      if (P.level > 0) for (let l = Math.max(2, P.level + 1); l <= lv; l++) { const n = HSC.economy ? HSC.economy.levelReward(l) : 0; if (n) { pay(n, 'level', 'level:' + l); last.mile = (last.mile || 0) + n; } }
      P.level = lv; save();
    },
    tick() {
      const g = G();
      if (!g || !P || !M() || !M().data) return;
      const s = g.getState();
      if (s.status === 'reveal' && document.body.classList.contains('hsc-reveal')) this.reveal(s);
      else if (s.status === 'cutting') this.revealKey = null;
    },
  };

  // QA: the saved progress (read only in the game)
  HSC.progressDebug = () => P;
  async function boot() {
    if (!G() || !document.body || !M() || !M().data || !HSC.coins) { HSC.lifecycle.timeout(boot, 300); return; }
    client = M().client;
    const d = client && client.loadProgress ? await client.loadProgress(KEY, null).catch(() => null) : null;
    P = sanitize(d);
    if (!P.level) P.level = M().level();
    ensureTasks(); save();
    HSC.lifecycle.interval(() => ui.tick(), 200);
  }
  boot();
})(globalThis.HSC || (globalThis.HSC = {}));

});
