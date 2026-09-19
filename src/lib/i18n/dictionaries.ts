import type { Locale } from "./config";

export type Dictionary = {
  common: {
    back: string;
    room: string;
    save: string;
    cancel: string;
    add: string;
    copy: string;
    copied: string;
  };
  nav: { home: string; food: string; services: string; chat: string };
  theme: { light: string; dark: string; toggle: string };
  locale: { label: string };
  stay: {
    title: string;
    subtitle: string;
    checkIn: string;
    checkOut: string;
    nights: string;
  };
  cleaning: {
    title: string;
    subtitle: string;
    weekly: string;
    exceptions: string;
    addException: string;
    skip: string;
    extra: string;
    regular: string;
    off: string;
    date: string;
    time: string;
    note: string;
    noService: string;
    today: string;
  };
  map: {
    title: string;
    subtitle: string;
    floor: string;
    building: string;
    openMaps: string;
    steps: string;
  };
  hub: {
    foodTitle: string;
    foodDesc: string;
    servicesTitle: string;
    servicesDesc: string;
    facilitiesTitle: string;
    facilitiesDesc: string;
    eventsTitle: string;
    eventsDesc: string;
    galleryTitle: string;
    galleryDesc: string;
    chatTitle: string;
    chatDesc: string;
    cleaningTitle: string;
    cleaningDesc: string;
    mapTitle: string;
    mapDesc: string;
    wifiTitle: string;
    network: string;
    password: string;
  };
  weekdays: Record<string, string>;
};

const es: Dictionary = {
  common: {
    back: "Volver",
    room: "Habitación",
    save: "Guardar",
    cancel: "Cancelar",
    add: "Agregar",
    copy: "Copiar contraseña",
    copied: "Contraseña copiada",
  },
  nav: { home: "Inicio", food: "Comida", services: "Servicios", chat: "Chat" },
  theme: { light: "Claro", dark: "Oscuro", toggle: "Cambiar tema" },
  locale: { label: "Idioma" },
  stay: {
    title: "Tu estadía",
    subtitle: "Te localizamos en el hotel estos días",
    checkIn: "Entrada",
    checkOut: "Salida",
    nights: "noches",
  },
  cleaning: {
    title: "Limpieza de habitación",
    subtitle: "Cronograma semanal con excepciones, como una alarma",
    weekly: "Días y horarios",
    exceptions: "Excepciones",
    addException: "Agregar excepción",
    skip: "Sin limpieza",
    extra: "Limpieza extra",
    regular: "Limpieza programada",
    off: "Sin servicio",
    date: "Fecha",
    time: "Hora",
    note: "Nota opcional",
    noService: "No hay limpieza este día",
    today: "Hoy",
  },
  map: {
    title: "Mapa a tu habitación",
    subtitle: "Cómo llegar desde recepción",
    floor: "Piso",
    building: "Edificio",
    openMaps: "Abrir en Google Maps",
    steps: "Indicaciones",
  },
  hub: {
    foodTitle: "Comida a la habitación",
    foodDesc: "Menú y pedidos sin llamar",
    servicesTitle: "Pedidos rápidos",
    servicesDesc: "Toallas, agua, limpieza y más",
    facilitiesTitle: "Instalaciones",
    facilitiesDesc: "Piscina, spa, gym y restaurante",
    eventsTitle: "Eventos",
    eventsDesc: "Cronograma de actividades",
    galleryTitle: "Galería",
    galleryDesc: "Fotos del hotel y experiencias",
    chatTitle: "Chat con recepción",
    chatDesc: "Consultas en tiempo real",
    cleaningTitle: "Cronograma de limpieza",
    cleaningDesc: "Horarios y excepciones de tu habitación",
    mapTitle: "Mapa a la habitación",
    mapDesc: "Cómo llegar desde recepción",
    wifiTitle: "WiFi del hotel",
    network: "Red",
    password: "Contraseña",
  },
  weekdays: {
    mon: "Lunes",
    tue: "Martes",
    wed: "Miércoles",
    thu: "Jueves",
    fri: "Viernes",
    sat: "Sábado",
    sun: "Domingo",
  },
};

const en: Dictionary = {
  common: {
    back: "Back",
    room: "Room",
    save: "Save",
    cancel: "Cancel",
    add: "Add",
    copy: "Copy password",
    copied: "Password copied",
  },
  nav: { home: "Home", food: "Food", services: "Services", chat: "Chat" },
  theme: { light: "Light", dark: "Dark", toggle: "Toggle theme" },
  locale: { label: "Language" },
  stay: {
    title: "Your stay",
    subtitle: "You are staying with us on these dates",
    checkIn: "Check-in",
    checkOut: "Check-out",
    nights: "nights",
  },
  cleaning: {
    title: "Room cleaning",
    subtitle: "Weekly schedule with exceptions, like a phone alarm",
    weekly: "Days and times",
    exceptions: "Exceptions",
    addException: "Add exception",
    skip: "No cleaning",
    extra: "Extra cleaning",
    regular: "Scheduled cleaning",
    off: "No service",
    date: "Date",
    time: "Time",
    note: "Optional note",
    noService: "No cleaning on this day",
    today: "Today",
  },
  map: {
    title: "Map to your room",
    subtitle: "How to get there from reception",
    floor: "Floor",
    building: "Building",
    openMaps: "Open in Google Maps",
    steps: "Directions",
  },
  hub: {
    foodTitle: "In-room dining",
    foodDesc: "Menu and orders without calling",
    servicesTitle: "Quick requests",
    servicesDesc: "Towels, water, cleaning and more",
    facilitiesTitle: "Facilities",
    facilitiesDesc: "Pool, spa, gym and restaurant",
    eventsTitle: "Events",
    eventsDesc: "Activity schedule",
    galleryTitle: "Gallery",
    galleryDesc: "Hotel photos and experiences",
    chatTitle: "Chat with reception",
    chatDesc: "Real-time questions",
    cleaningTitle: "Cleaning schedule",
    cleaningDesc: "Room cleaning times and exceptions",
    mapTitle: "Map to room",
    mapDesc: "Directions from reception",
    wifiTitle: "Hotel WiFi",
    network: "Network",
    password: "Password",
  },
  weekdays: {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  },
};

const de: Dictionary = {
  ...en,
  common: { ...en.common, back: "Zurück", room: "Zimmer", save: "Speichern", cancel: "Abbrechen", add: "Hinzufügen", copy: "Passwort kopieren", copied: "Passwort kopiert" },
  nav: { home: "Start", food: "Essen", services: "Service", chat: "Chat" },
  theme: { light: "Hell", dark: "Dunkel", toggle: "Theme wechseln" },
  locale: { label: "Sprache" },
  stay: { title: "Ihr Aufenthalt", subtitle: "Sie wohnen an diesen Tagen bei uns", checkIn: "Check-in", checkOut: "Check-out", nights: "Nächte" },
  cleaning: { ...en.cleaning, title: "Zimmerreinigung", subtitle: "Wochenplan mit Ausnahmen wie ein Wecker", weekly: "Tage und Zeiten", exceptions: "Ausnahmen", addException: "Ausnahme hinzufügen", skip: "Keine Reinigung", extra: "Extra-Reinigung", regular: "Geplante Reinigung", off: "Kein Service", today: "Heute" },
  map: { ...en.map, title: "Weg zu Ihrem Zimmer", subtitle: "Von der Rezeption", openMaps: "In Google Maps öffnen", steps: "Wegbeschreibung" },
  hub: { ...en.hub, foodTitle: "Zimmerservice", servicesTitle: "Schnelle Anfragen", cleaningTitle: "Reinigungsplan", mapTitle: "Weg zum Zimmer", wifiTitle: "Hotel-WLAN", network: "Netzwerk", password: "Passwort" },
  weekdays: { mon: "Montag", tue: "Dienstag", wed: "Mittwoch", thu: "Donnerstag", fri: "Freitag", sat: "Samstag", sun: "Sonntag" },
};

const fr: Dictionary = {
  ...en,
  common: { ...en.common, back: "Retour", room: "Chambre", save: "Enregistrer", cancel: "Annuler", add: "Ajouter", copy: "Copier le mot de passe", copied: "Mot de passe copié" },
  nav: { home: "Accueil", food: "Repas", services: "Services", chat: "Chat" },
  theme: { light: "Clair", dark: "Sombre", toggle: "Changer le thème" },
  locale: { label: "Langue" },
  stay: { title: "Votre séjour", subtitle: "Vous êtes présent à l'hôtel ces jours", checkIn: "Arrivée", checkOut: "Départ", nights: "nuits" },
  cleaning: { ...en.cleaning, title: "Nettoyage de chambre", subtitle: "Planning hebdomadaire avec exceptions", weekly: "Jours et horaires", exceptions: "Exceptions", addException: "Ajouter une exception", skip: "Pas de ménage", extra: "Ménage supplémentaire", regular: "Ménage programmé", today: "Aujourd'hui" },
  map: { ...en.map, title: "Plan vers votre chambre", openMaps: "Ouvrir dans Google Maps", steps: "Indications" },
  hub: { ...en.hub, foodTitle: "Room service", servicesTitle: "Demandes rapides", cleaningTitle: "Planning ménage", mapTitle: "Plan de la chambre", wifiTitle: "WiFi de l'hôtel", network: "Réseau", password: "Mot de passe" },
  weekdays: { mon: "Lundi", tue: "Mardi", wed: "Mercredi", thu: "Jeudi", fri: "Vendredi", sat: "Samedi", sun: "Dimanche" },
};

const ja: Dictionary = {
  ...en,
  common: { ...en.common, back: "戻る", room: "客室", save: "保存", cancel: "キャンセル", add: "追加", copy: "パスワードをコピー", copied: "コピーしました" },
  nav: { home: "ホーム", food: "食事", services: "サービス", chat: "チャット" },
  theme: { light: "ライト", dark: "ダーク", toggle: "テーマ切替" },
  locale: { label: "言語" },
  stay: { title: "ご滞在", subtitle: "この日程でホテルにご滞在です", checkIn: "チェックイン", checkOut: "チェックアウト", nights: "泊" },
  cleaning: { ...en.cleaning, title: "客室清掃", subtitle: "アラームのような週間スケジュール", weekly: "曜日と時間", exceptions: "例外", addException: "例外を追加", skip: "清掃なし", extra: "追加清掃", regular: "定期清掃", today: "今日" },
  map: { ...en.map, title: "客室への地図", openMaps: "Google Mapsで開く", steps: "案内" },
  hub: { ...en.hub, foodTitle: "ルームサービス", servicesTitle: "クイックリクエスト", cleaningTitle: "清掃スケジュール", mapTitle: "客室マップ", wifiTitle: "ホテルWiFi", network: "ネットワーク", password: "パスワード" },
  weekdays: { mon: "月曜", tue: "火曜", wed: "水曜", thu: "木曜", fri: "金曜", sat: "土曜", sun: "日曜" },
};

const zh: Dictionary = {
  ...en,
  common: { ...en.common, back: "返回", room: "房间", save: "保存", cancel: "取消", add: "添加", copy: "复制密码", copied: "已复制" },
  nav: { home: "首页", food: "餐饮", services: "服务", chat: "聊天" },
  theme: { light: "浅色", dark: "深色", toggle: "切换主题" },
  locale: { label: "语言" },
  stay: { title: "您的入住", subtitle: "您在这些日期入住本酒店", checkIn: "入住", checkOut: "退房", nights: "晚" },
  cleaning: { ...en.cleaning, title: "客房清洁", subtitle: "像闹钟一样的每周计划与例外", weekly: "日期与时间", exceptions: "例外", addException: "添加例外", skip: "不清洁", extra: "额外清洁", regular: "计划清洁", today: "今天" },
  map: { ...en.map, title: "前往您房间的地图", openMaps: "在 Google 地图中打开", steps: "路线指引" },
  hub: { ...en.hub, foodTitle: "客房送餐", servicesTitle: "快速请求", cleaningTitle: "清洁时间表", mapTitle: "房间地图", wifiTitle: "酒店 WiFi", network: "网络", password: "密码" },
  weekdays: { mon: "周一", tue: "周二", wed: "周三", thu: "周四", fri: "周五", sat: "周六", sun: "周日" },
};

const zhTW: Dictionary = {
  ...zh,
  common: { ...zh.common, back: "返回", room: "房間", save: "儲存", cancel: "取消", add: "新增", copy: "複製密碼", copied: "已複製" },
  nav: { home: "首頁", food: "餐飲", services: "服務", chat: "聊天" },
  theme: { light: "淺色", dark: "深色", toggle: "切換主題" },
  locale: { label: "語言" },
  stay: { title: "您的住宿", subtitle: "您在这些日期入住本飯店", checkIn: "入住", checkOut: "退房", nights: "晚" },
  cleaning: { ...zh.cleaning, title: "客房清潔", subtitle: "像鬧鐘一樣的每週排程與例外", weekly: "日期與時間", exceptions: "例外", addException: "新增例外", skip: "不清潔", extra: "額外清潔", regular: "排程清潔", today: "今天" },
  map: { ...zh.map, title: "前往您房間的地圖", openMaps: "在 Google 地圖中開啟", steps: "路線指引" },
  hub: { ...zh.hub, foodTitle: "客房送餐", servicesTitle: "快速請求", cleaningTitle: "清潔時間表", mapTitle: "房間地圖", wifiTitle: "飯店 WiFi", network: "網路", password: "密碼" },
  weekdays: { mon: "週一", tue: "週二", wed: "週三", thu: "週四", fri: "週五", sat: "週六", sun: "週日" },
};

const id: Dictionary = {
  ...en,
  common: { ...en.common, back: "Kembali", room: "Kamar", save: "Simpan", cancel: "Batal", add: "Tambah", copy: "Salin kata sandi", copied: "Kata sandi disalin" },
  nav: { home: "Beranda", food: "Makanan", services: "Layanan", chat: "Chat" },
  theme: { light: "Terang", dark: "Gelap", toggle: "Ganti tema" },
  locale: { label: "Bahasa" },
  stay: { title: "Masa inap Anda", subtitle: "Anda menginap di hotel pada tanggal ini", checkIn: "Check-in", checkOut: "Check-out", nights: "malam" },
  cleaning: { ...en.cleaning, title: "Kebersihan kamar", subtitle: "Jadwal mingguan dengan pengecualian seperti alarm", weekly: "Hari dan waktu", exceptions: "Pengecualian", addException: "Tambah pengecualian", skip: "Tanpa bersih", extra: "Bersih extra", regular: "Bersih terjadwal", today: "Hari ini" },
  map: { ...en.map, title: "Peta ke kamar Anda", openMaps: "Buka di Google Maps", steps: "Petunjuk arah" },
  hub: { ...en.hub, foodTitle: "Makan di kamar", servicesTitle: "Permintaan cepat", cleaningTitle: "Jadwal kebersihan", mapTitle: "Peta kamar", wifiTitle: "WiFi hotel", network: "Jaringan", password: "Kata sandi" },
  weekdays: { mon: "Senin", tue: "Selasa", wed: "Rabu", thu: "Kamis", fri: "Jumat", sat: "Sabtu", sun: "Minggu" },
};

export const dictionaries: Record<Locale, Dictionary> = {
  es,
  en,
  de,
  fr,
  ja,
  zh,
  "zh-TW": zhTW,
  id,
};
