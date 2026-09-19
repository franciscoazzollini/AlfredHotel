import { notFound } from "next/navigation";

import { GuestSubpageShell } from "@/components/guest/guest-subpage-shell";
import { RoomMapPanel } from "@/components/guest/room-map-panel";
import { getHotelForRoom } from "@/lib/hotel/repository";

type PageProps = {
  params: Promise<{ room: string }>;
};

export default async function RoomMapPage({ params }: PageProps) {
  const { room } = await params;
  const hotel = await getHotelForRoom(room);

  if (!room.trim()) {
    notFound();
  }

  return (
    <GuestSubpageShell hotelName={hotel.name} room={room} titleKey="mapTitle">
      <RoomMapPanel room={room} roomMap={hotel.roomMap} />
    </GuestSubpageShell>
  );
}
