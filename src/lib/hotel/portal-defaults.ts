import { defaultCleaningSchedule } from "./cleaning-schedule";
import type { GuestStay, RoomMap } from "./types";

export const defaultGuestStay: GuestStay = {
  checkInDate: "2026-09-19",
  checkOutDate: "2026-09-22",
  guestName: "Huésped demo",
};

export const defaultRoomMap: RoomMap = {
  floor: "3",
  building: "Torre Alfred",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Av.+Corrientes+1234,+Buenos+Aires",
  mapImage:
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
  steps: [
    "Desde recepción, tomá el ascensor al 3er piso",
    "Salí a la derecha y seguí el pasillo azul",
    "La habitación está al final del pasillo, lado ventana",
  ],
};

export const defaultCleaningScheduleWithExceptions = () => ({
  ...defaultCleaningSchedule(),
  exceptions: [
    {
      id: "2026-09-21-skip",
      date: "2026-09-21",
      type: "skip" as const,
      note: "Do not disturb",
    },
  ],
});

export const portalExtras = {
  stay: defaultGuestStay,
  cleaningSchedule: defaultCleaningScheduleWithExceptions(),
  roomMap: defaultRoomMap,
};
