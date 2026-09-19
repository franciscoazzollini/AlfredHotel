export type QuickServiceId =
  | "towels"
  | "water"
  | "housekeeping"
  | "maintenance"
  | "pillows"
  | "checkout";

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  tags?: string[];
};

export type Facility = {
  id: string;
  name: string;
  description: string;
  hours?: string;
  location: string;
  image: string;
};

export type HotelEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
};

export type GalleryPhoto = {
  id: string;
  title: string;
  image: string;
  category: string;
};

export type Hotel = {
  id: string;
  name: string;
  tagline: string;
  logoEmoji: string;
  receptionPhone: string;
  receptionWhatsApp: string;
  wifi: { ssid: string; password: string };
  checkIn: string;
  checkOut: string;
  receptionHours: string;
  breakfastHours: string;
  houseRules: string[];
  menu: MenuCategory[];
  facilities: Facility[];
  events: HotelEvent[];
  gallery: GalleryPhoto[];
};

export type GuestRequestPayload = {
  room: string;
  hotelId: string;
  type: QuickServiceId | "room-service" | "chat";
  message?: string;
  items?: { id: string; name: string; quantity: number; price: number }[];
  guestName?: string;
};
