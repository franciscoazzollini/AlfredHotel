import { notFound } from "next/navigation";

import { GuestChatPanel } from "@/components/guest/guest-chat-panel";
import { GuestShell } from "@/components/guest/guest-shell";
import { DEMO_HOTEL_ID, getHotel } from "@/lib/hotel/demo-data";

type PageProps = {
  params: Promise<{ room: string }>;
};

export default async function RoomChatPage({ params }: PageProps) {
  const { room } = await params;
  const hotel = getHotel(DEMO_HOTEL_ID);
  if (!hotel) {
    notFound();
  }

  return (
    <GuestShell
      hotelName={hotel.name}
      room={room}
      title="Chat con recepción"
      backHref={`/habitacion/${room}`}
    >
      <GuestChatPanel
        room={room}
        hotelId={hotel.id}
        hotelName={hotel.name}
        receptionPhone={hotel.receptionPhone}
        receptionWhatsApp={hotel.receptionWhatsApp}
      />
    </GuestShell>
  );
}
