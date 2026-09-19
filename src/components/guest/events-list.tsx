import { CalendarDays, MapPin } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { HotelEvent } from "@/lib/hotel/types";

type EventsListProps = {
  events: HotelEvent[];
};

export function EventsList({ events }: EventsListProps) {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id} className="border-border/70">
          <CardHeader>
            <CardTitle className="text-lg">{event.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{event.description}</p>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <CalendarDays className="size-4 text-teal-700" />
              {event.date} · {event.time}
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4" />
              {event.location}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
