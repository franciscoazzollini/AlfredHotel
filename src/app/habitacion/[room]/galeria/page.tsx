import { notFound } from "next/navigation";

import { GuestShell } from "@/components/guest/guest-shell";
import { PhotoGallery } from "@/components/guest/photo-gallery";
import { getHotelForRoom } from "@/lib/hotel/repository";

type PageProps = {
  params: Promise<{ room: string }>;
};

export default async function RoomGalleryPage({ params }: PageProps) {
  const { room } = await params;
  const hotel = await getHotelForRoom(room);

  if (!room.trim()) {
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
