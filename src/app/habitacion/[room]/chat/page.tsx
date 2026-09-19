import { notFound } from "next/navigation";

import { GuestChatPanel } from "@/components/guest/guest-chat-panel";
import { GuestSubpageShell } from "@/components/guest/guest-subpage-shell";
import { getHotelForRoom } from "@/lib/hotel/repository";

type PageProps = {
  params: Promise<{ room: string }>;
};

export default async function RoomChatPage({ params }: PageProps) {
  const { room } = await params;
  const hotel = await getHotelForRoom(room);

  if (!room.trim()) {
    notFound();
  }

  return (
    <GuestSubpageShell hotelName={hotel.name} room={room} titleKey="chatTitle">
      <GuestChatPanel
        room={room}
        hotelId={hotel.id}
        hotelName={hotel.name}
        receptionPhone={hotel.receptionPhone}
        receptionWhatsApp={hotel.receptionWhatsApp}
      />
    </GuestSubpageShell>
  );
}
