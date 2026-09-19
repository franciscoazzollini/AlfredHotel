import { notFound } from "next/navigation";

import { FacilitiesGrid } from "@/components/guest/facilities-grid";
import { GuestShell } from "@/components/guest/guest-shell";
import { getHotelForRoom } from "@/lib/hotel/repository";

type PageProps = {
  params: Promise<{ room: string }>;
};

export default async function RoomFacilitiesPage({ params }: PageProps) {
  const { room } = await params;
  const hotel = await getHotelForRoom(room);

  if (!room.trim()) {
    notFound();
  }

  return (
    <GuestShell
      hotelName={hotel.name}
      room={room}
      title="Instalaciones"
      backHref={`/habitacion/${room}`}
    >
      <FacilitiesGrid facilities={hotel.facilities} />
    </GuestShell>
  );
}
