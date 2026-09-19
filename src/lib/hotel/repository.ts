import { portalExtras } from "./portal-defaults";
import type {
  CleaningSchedule,
  Facility,
  GalleryPhoto,
  GuestStay,
  Hotel,
  HotelEvent,
  MenuCategory,
  RoomMap,
} from "./types";

export const DEFAULT_HOTEL_ID = "alfred-hotel";

type HotelPortalSettings = {
  tagline?: string;
  logoEmoji?: string;
  receptionPhone?: string;
  demoRooms?: string[];
  menu?: MenuCategory[];
  facilities?: Facility[];
  events?: HotelEvent[];
  gallery?: GalleryPhoto[];
  stay?: GuestStay;
  cleaningSchedule?: CleaningSchedule;
  roomMap?: RoomMap;
};

type BabSettingsRow = {
  wifi?: { ssid: string; password: string };
  receptionWhatsApp?: string;
  checkInOut?: { checkIn: string; checkOut: string };
  houseRules?: { title?: string; rules: string[] };
  breakfastHours?: Record<string, { open: string; close: string } | null>;
  hotelPortal?: HotelPortalSettings;
};

type RestaurantRow = {
  id: string;
  name: string;
  locale: string;
  settings: BabSettingsRow;
};

export const alfredHotelFallback: Hotel = {
  id: DEFAULT_HOTEL_ID,
  name: "Alfred Hotel",
  tagline: "Tu estadía, simplificada desde el QR de la habitación",
  logoEmoji: "🏨",
  receptionPhone: "+5491112345678",
  receptionWhatsApp: "5491112345678",
  wifi: { ssid: "Alfred_Guest", password: "alfred2026" },
  checkIn: "15:00",
  checkOut: "11:00",
  receptionHours: "Recepción 24 hs",
  breakfastHours: "Desayuno 07:00 – 10:30 (Planta baja)",
  houseRules: [
    "Horario de silencio 22:00 – 08:00",
    "Prohibido fumar en habitaciones",
    "Visitas hasta las 23:00 con registro en recepción",
  ],
  menu: [
    {
      id: "desayuno",
      name: "Desayuno en habitación",
      items: [
        {
          id: "continental",
          name: "Desayuno continental",
          description: "Croissant, mermelada, jugo y café",
          price: 8500,
          tags: ["Popular"],
        },
        {
          id: "fitness",
          name: "Bowl fitness",
          description: "Yogur, granola, frutas frescas",
          price: 9200,
        },
      ],
    },
    {
      id: "comidas",
      name: "Comidas",
      items: [
        {
          id: "burger",
          name: "Burger Alfred",
          description: "Carne angus, cheddar, papas rústicas",
          price: 14500,
          tags: ["Best seller"],
        },
        {
          id: "salmon",
          name: "Salmón grillado",
          description: "Verduras de estación y limón",
          price: 18900,
        },
      ],
    },
    {
      id: "bebidas",
      name: "Bebidas",
      items: [
        { id: "agua", name: "Agua mineral", description: "500 ml", price: 2500 },
        { id: "vino", name: "Copa de vino", description: "Malbec de la casa", price: 6500 },
      ],
    },
  ],
  facilities: [
    {
      id: "pool",
      name: "Piscina climatizada",
      description: "Toallas en recepción. Ideal para relajarse.",
      hours: "09:00 – 21:00",
      location: "Planta baja, jardín",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    },
    {
      id: "spa",
      name: "Spa Alfred",
      description: "Masajes, sauna y sala de relax.",
      hours: "10:00 – 20:00",
      location: "Nivel -1",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    },
    {
      id: "gym",
      name: "Gimnasio",
      description: "Equipamiento completo, agua y toallas incluidas.",
      hours: "06:00 – 22:00",
      location: "Primer piso",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    },
  ],
  events: [
    {
      id: "yoga",
      title: "Yoga matinal",
      description: "Sesión guiada en la terraza.",
      date: "Domingo 21 sep",
      time: "08:00",
      location: "Terraza solarium",
    },
    {
      id: "wine",
      title: "Cata de vinos",
      description: "Degustación con sommelier.",
      date: "Viernes 26 sep",
      time: "19:30",
      location: "Salón Alfred",
    },
  ],
  gallery: [
    {
      id: "lobby",
      title: "Lobby Alfred",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      category: "Hotel",
    },
    {
      id: "room",
      title: "Habitación superior",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      category: "Habitaciones",
    },
  ],
  stay: portalExtras.stay,
  cleaningSchedule: portalExtras.cleaningSchedule,
  roomMap: portalExtras.roomMap,
};

function mapRowToHotel(row: RestaurantRow): Hotel {
  const settings = row.settings ?? {};
  const portal = settings.hotelPortal ?? {};

  return {
    id: row.id,
    name: row.name,
    tagline: portal.tagline ?? alfredHotelFallback.tagline,
    logoEmoji: portal.logoEmoji ?? "🏨",
    receptionPhone: portal.receptionPhone ?? alfredHotelFallback.receptionPhone,
    receptionWhatsApp: settings.receptionWhatsApp ?? alfredHotelFallback.receptionWhatsApp,
    wifi: settings.wifi ?? alfredHotelFallback.wifi,
    checkIn: settings.checkInOut?.checkIn ?? alfredHotelFallback.checkIn,
    checkOut: settings.checkInOut?.checkOut ?? alfredHotelFallback.checkOut,
    receptionHours: alfredHotelFallback.receptionHours,
    breakfastHours: alfredHotelFallback.breakfastHours,
    houseRules: settings.houseRules?.rules ?? alfredHotelFallback.houseRules,
    menu: portal.menu ?? alfredHotelFallback.menu,
    facilities: portal.facilities ?? alfredHotelFallback.facilities,
    events: portal.events ?? alfredHotelFallback.events,
    gallery: portal.gallery ?? alfredHotelFallback.gallery,
    stay: portal.stay ?? alfredHotelFallback.stay,
    cleaningSchedule: portal.cleaningSchedule ?? alfredHotelFallback.cleaningSchedule,
    roomMap: portal.roomMap ?? alfredHotelFallback.roomMap,
  };
}

export async function getHotelForRoom(_room: string): Promise<Hotel> {
  try {
    const { isSupabaseAdminConfigured } = await import("@/lib/supabase/admin");
    if (!isSupabaseAdminConfigured()) {
      return alfredHotelFallback;
    }

    const { getSupabaseAdmin } = await import("@/lib/supabase/admin");
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("restaurants")
      .select("id, name, locale, settings")
      .eq("id", DEFAULT_HOTEL_ID)
      .maybeSingle();

    if (error || !data) {
      return alfredHotelFallback;
    }

    return mapRowToHotel(data as RestaurantRow);
  } catch {
    return alfredHotelFallback;
  }
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const quickServices = [
  { id: "towels" as const, label: "Toallas extra", emoji: "🛁" },
  { id: "water" as const, label: "Agua / minibar", emoji: "💧" },
  { id: "housekeeping" as const, label: "Limpieza", emoji: "🧹" },
  { id: "maintenance" as const, label: "Mantenimiento", emoji: "🔧" },
  { id: "pillows" as const, label: "Almohadas extra", emoji: "🛏️" },
  { id: "checkout" as const, label: "Late checkout", emoji: "🕚" },
];

export const DEMO_ROOM = "305";
