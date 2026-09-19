import { notFound } from "next/navigation";

import { GuestShell } from "@/components/guest/guest-shell";
import { QuickServicesPanel } from "@/components/guest/quick-services-panel";
import { DEMO_HOTEL_ID, getHotel } from "@/lib/hotel/demo-data";

type PageProps = {
  params: Promise<{ room: string }>;
};

export default async function RoomServicesPage({ params }: PageProps) {
  const { room } = await params;
  const hotel = getHotel(DEMO_HOTEL_ID);
  if (!hotel) {
    notFound();
  }

  return (
    <GuestShell
      hotelName={hotel.name}
      room={room}
      title="Pedidos rápidos"
      backHref={`/habitacion/${room}`}
    >
      <QuickServicesPanel
        room={room}
        hotelId={hotel.id}
        receptionWhatsApp={hotel.receptionWhatsApp}
      />
    </GuestShell>
  );
}
