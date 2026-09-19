import { notFound } from "next/navigation";

import { FacilitiesGrid } from "@/components/guest/facilities-grid";
import { GuestSubpageShell } from "@/components/guest/guest-subpage-shell";
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
    <GuestSubpageShell hotelName={hotel.name} room={room} titleKey="facilitiesTitle">
      <FacilitiesGrid facilities={hotel.facilities} />
    </GuestSubpageShell>
  );
}
