import { notFound } from "next/navigation";

import { EventsList } from "@/components/guest/events-list";
import { GuestSubpageShell } from "@/components/guest/guest-subpage-shell";
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
    <GuestSubpageShell hotelName={hotel.name} room={room} titleKey="eventsTitle">
      <EventsList events={hotel.events} />
    </GuestSubpageShell>
  );
}
