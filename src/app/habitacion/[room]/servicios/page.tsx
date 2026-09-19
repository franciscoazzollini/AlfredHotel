import { notFound } from "next/navigation";

import { GuestSubpageShell } from "@/components/guest/guest-subpage-shell";
import { QuickServicesPanel } from "@/components/guest/quick-services-panel";
import { getHotelForRoom } from "@/lib/hotel/repository";

type PageProps = {
  params: Promise<{ room: string }>;
};

export default async function RoomServicesPage({ params }: PageProps) {
  const { room } = await params;
  const hotel = await getHotelForRoom(room);

  if (!room.trim()) {
    notFound();
  }

  return (
    <GuestSubpageShell hotelName={hotel.name} room={room} titleKey="servicesTitle">
      <QuickServicesPanel
        room={room}
        hotelId={hotel.id}
        receptionWhatsApp={hotel.receptionWhatsApp}
      />
    </GuestSubpageShell>
  );
}
