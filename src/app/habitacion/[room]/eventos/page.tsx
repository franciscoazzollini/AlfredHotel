import { notFound } from "next/navigation";

import { EventsList } from "@/components/guest/events-list";
import { GuestShell } from "@/components/guest/guest-shell";
import { getHotelForRoom } from "@/lib/hotel/repository";

type PageProps = {
  params: Promise<{ room: string }>;
};

export default async function RoomEventsPage({ params }: PageProps) {
  const { room } = await params;
  const hotel = await getHotelForRoom(room);

  if (!room.trim()) {
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
