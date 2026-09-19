import { notFound } from "next/navigation";

import { GuestShell } from "@/components/guest/guest-shell";
import { RoomServiceMenu } from "@/components/guest/room-service-menu";
import { DEMO_HOTEL_ID, getHotel } from "@/lib/hotel/demo-data";

type PageProps = {
  params: Promise<{ room: string }>;
};

export default async function RoomFoodPage({ params }: PageProps) {
  const { room } = await params;
  const hotel = getHotel(DEMO_HOTEL_ID);
  if (!hotel) {
    notFound();
  }

  return (
    <GuestShell
      hotelName={hotel.name}
      room={room}
      title="Comida a la habitación"
      backHref={`/habitacion/${room}`}
    >
      <RoomServiceMenu hotel={hotel} room={room} />
    </GuestShell>
  );
}
