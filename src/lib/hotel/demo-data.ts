import type { Hotel } from "./types";

export const DEMO_HOTEL_ID = "harbor-demo";

export const demoHotel: Hotel = {
  id: DEMO_HOTEL_ID,
  name: "Harbor Hotels",
  tagline: "Tu estadía, simplificada desde el QR de la habitación",
  logoEmoji: "🏨",
  receptionPhone: "+5491112345678",
  receptionWhatsApp: "5491112345678",
  wifi: { ssid: "Harbor_Guest", password: "bienvenido2026" },
  checkIn: "15:00",
  checkOut: "11:00",
  receptionHours: "Recepción 24 hs",
  breakfastHours: "Desayuno 07:00 – 10:30 (Planta baja)",
  houseRules: [
    "Horario de silencio 22:00 – 08:00",
    "Prohibido fumar en habitaciones",
    "Mascotas solo en suites autorizadas",
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
          name: "Burger clásica",
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
        {
          id: "pasta",
          name: "Pasta al pesto",
          description: "Albahaca fresca y parmesano",
          price: 12800,
        },
      ],
    },
    {
      id: "bebidas",
      name: "Bebidas",
      items: [
        {
          id: "agua",
          name: "Agua mineral",
          description: "500 ml",
          price: 2500,
        },
        {
          id: "vino",
          name: "Copa de vino tinto",
          description: "Malbec de la casa",
          price: 6500,
        },
        {
          id: "cafe",
          name: "Café espresso",
          description: "Doble shot",
          price: 3200,
        },
      ],
    },
  ],
  facilities: [
    {
      id: "pool",
      name: "Piscina climatizada",
      description: "Toallas disponibles en recepción. Ideal para relajarse después del check-in.",
      hours: "09:00 – 21:00",
      location: "Planta baja, sector jardín",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    },
    {
      id: "spa",
      name: "Spa & wellness",
      description: "Masajes, sauna y sala de relax con reserva previa.",
      hours: "10:00 – 20:00",
      location: "Nivel -1",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    },
    {
      id: "gym",
      name: "Gimnasio",
      description: "Equipamiento Technogym, agua y toallas incluidas.",
      hours: "06:00 – 22:00",
      location: "Primer piso",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    },
    {
      id: "restaurant",
      name: "Restaurante Vista Mar",
      description: "Cocina internacional con vista al puerto.",
      hours: "12:00 – 23:30",
      location: "Lobby principal",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    },
  ],
  events: [
    {
      id: "yoga",
      title: "Yoga matinal",
      description: "Sesión guiada en la terraza. Traé ropa cómoda.",
      date: "Domingo 21 sep",
      time: "08:00",
      location: "Terraza solarium",
    },
    {
      id: "wine",
      title: "Cata de vinos",
      description: "Degustación de etiquetas locales con sommelier.",
      date: "Viernes 26 sep",
      time: "19:30",
      location: "Salón Harbor",
    },
    {
      id: "kids",
      title: "Cine bajo las estrellas",
      description: "Película familiar en el jardín con snacks incluidos.",
      date: "Sábado 27 sep",
      time: "21:00",
      location: "Jardín central",
    },
  ],
  gallery: [
    {
      id: "lobby",
      title: "Lobby principal",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      category: "Hotel",
    },
    {
      id: "room",
      title: "Habitación superior",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      category: "Habitaciones",
    },
    {
      id: "breakfast",
      title: "Desayuno buffet",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80",
      category: "Gastronomía",
    },
    {
      id: "sunset",
      title: "Atardecer en la terraza",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      category: "Experiencias",
    },
  ],
};

export function getHotel(hotelId: string): Hotel | null {
  if (hotelId === DEMO_HOTEL_ID) {
    return demoHotel;
  }
  return null;
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
