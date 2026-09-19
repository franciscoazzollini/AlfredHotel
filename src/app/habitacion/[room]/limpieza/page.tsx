import { notFound } from "next/navigation";

import { CleaningSchedulePanel } from "@/components/guest/cleaning-schedule-panel";
import { GuestSubpageShell } from "@/components/guest/guest-subpage-shell";
import { getHotelForRoom } from "@/lib/hotel/repository";

type PageProps = {
  params: Promise<{ room: string }>;
};

export default async function RoomCleaningPage({ params }: PageProps) {
  const { room } = await params;
  const hotel = await getHotelForRoom(room);

  if (!room.trim()) {
    notFound();
  }

  return (
    <GuestSubpageShell hotelName={hotel.name} room={room} titleKey="cleaningTitle">
      <CleaningSchedulePanel room={room} schedule={hotel.cleaningSchedule} />
    </GuestSubpageShell>
  );
}
