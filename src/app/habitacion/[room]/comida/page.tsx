import { notFound } from "next/navigation";

import { GuestSubpageShell } from "@/components/guest/guest-subpage-shell";
import { RoomServiceMenu } from "@/components/guest/room-service-menu";
import { getHotelForRoom } from "@/lib/hotel/repository";

type PageProps = {
  params: Promise<{ room: string }>;
};

export default async function RoomFoodPage({ params }: PageProps) {
  const { room } = await params;
  const hotel = await getHotelForRoom(room);

  if (!room.trim()) {
    notFound();
  }

  return (
    <GuestSubpageShell hotelName={hotel.name} room={room} titleKey="foodTitle">
      <RoomServiceMenu hotel={hotel} room={room} />
    </GuestSubpageShell>
  );
}
