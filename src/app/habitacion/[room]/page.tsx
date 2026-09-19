import { notFound } from "next/navigation";

import { GuestHub } from "@/components/guest/guest-hub";
import { GuestShell } from "@/components/guest/guest-shell";
import { getHotelForRoom } from "@/lib/hotel/repository";

type PageProps = {
  params: Promise<{ room: string }>;
};

export default async function GuestRoomPage({ params }: PageProps) {
  const { room } = await params;
  const hotel = await getHotelForRoom(room);

  if (!room.trim()) {
    notFound();
  }

  return (
    <GuestShell hotelName={hotel.name} room={room}>
      <GuestHub hotel={hotel} room={room} />
    </GuestShell>
  );
}
