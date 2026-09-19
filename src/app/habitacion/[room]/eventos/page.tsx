import { notFound } from "next/navigation";

import { EventsList } from "@/components/guest/events-list";
import { GuestShell } from "@/components/guest/guest-shell";
import { DEMO_HOTEL_ID, getHotel } from "@/lib/hotel/demo-data";

type PageProps = {
  params: Promise<{ room: string }>;
};

export default async function RoomEventsPage({ params }: PageProps) {
  const { room } = await params;
  const hotel = getHotel(DEMO_HOTEL_ID);
  if (!hotel) {
    notFound();
  }

  return (
    <GuestShell
      hotelName={hotel.name}
      room={room}
      title="Eventos"
      backHref={`/habitacion/${room}`}
    >
      <EventsList events={hotel.events} />
    </GuestShell>
  );
}
