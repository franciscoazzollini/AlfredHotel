import { notFound } from "next/navigation";

import { GuestHub } from "@/components/guest/guest-hub";
import { GuestShell } from "@/components/guest/guest-shell";
import { DEMO_HOTEL_ID, getHotel } from "@/lib/hotel/demo-data";

type PageProps = {
  params: Promise<{ room: string }>;
};

export default async function GuestRoomPage({ params }: PageProps) {
  const { room } = await params;
  const hotel = getHotel(DEMO_HOTEL_ID);
  if (!hotel) {
    notFound();
  }

  return (
    <GuestShell hotelName={hotel.name} room={room}>
      <GuestHub hotel={hotel} room={room} />
    </GuestShell>
  );
}
