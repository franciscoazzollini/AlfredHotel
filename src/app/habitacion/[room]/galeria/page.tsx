import { notFound } from "next/navigation";

import { GuestShell } from "@/components/guest/guest-shell";
import { PhotoGallery } from "@/components/guest/photo-gallery";
import { DEMO_HOTEL_ID, getHotel } from "@/lib/hotel/demo-data";

type PageProps = {
  params: Promise<{ room: string }>;
};

export default async function RoomGalleryPage({ params }: PageProps) {
  const { room } = await params;
  const hotel = getHotel(DEMO_HOTEL_ID);
  if (!hotel) {
    notFound();
  }

  return (
    <GuestShell
      hotelName={hotel.name}
      room={room}
      title="Galería"
      backHref={`/habitacion/${room}`}
    >
      <PhotoGallery photos={hotel.gallery} />
    </GuestShell>
  );
}
