import { notFound } from "next/navigation";

import { FacilitiesGrid } from "@/components/guest/facilities-grid";
import { GuestShell } from "@/components/guest/guest-shell";
import { DEMO_HOTEL_ID, getHotel } from "@/lib/hotel/demo-data";

type PageProps = {
  params: Promise<{ room: string }>;
};

export default async function RoomFacilitiesPage({ params }: PageProps) {
  const { room } = await params;
  const hotel = getHotel(DEMO_HOTEL_ID);
  if (!hotel) {
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
