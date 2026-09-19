"use client";

import { CalendarDays, MapPin, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function BookingSearch() {
  return (
    <Card id="search" className="border-border/70 shadow-xl shadow-primary/5">
      <CardContent className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto] lg:items-end">
        <div className="space-y-2">
          <label htmlFor="destination" className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="size-4 text-muted-foreground" aria-hidden="true" />
            Destination
          </label>
          <Input
            id="destination"
            placeholder="City, hotel, or landmark"
            defaultValue=""
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="dates" className="flex items-center gap-2 text-sm font-medium">
            <CalendarDays className="size-4 text-muted-foreground" aria-hidden="true" />
            Dates
          </label>
          <Input id="dates" type="text" placeholder="Check-in — Check-out" />
        </div>

        <div className="space-y-2">
          <label htmlFor="guests" className="flex items-center gap-2 text-sm font-medium">
            <Users className="size-4 text-muted-foreground" aria-hidden="true" />
            Guests
          </label>
          <Input id="guests" type="text" placeholder="2 adults, 1 room" />
        </div>

        <Button className="h-10 w-full lg:w-auto">Search stays</Button>
      </CardContent>
    </Card>
  );
}
