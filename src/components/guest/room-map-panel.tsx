"use client";

import Image from "next/image";
import { Building2, ExternalLink, MapPin, Navigation } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/context";
import type { RoomMap } from "@/lib/hotel/types";

type RoomMapPanelProps = {
  room: string;
  roomMap: RoomMap;
};

export function RoomMapPanel({ room, roomMap }: RoomMapPanelProps) {
  const { t } = useI18n();

  return (
    <div className="space-y-4">
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MapPin className="size-4" />
            {t.map.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{t.map.subtitle}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-border/60 p-3">
              <p className="text-xs text-muted-foreground">{t.map.building}</p>
              <p className="font-medium">{roomMap.building}</p>
            </div>
            <div className="rounded-xl border border-border/60 p-3">
              <p className="text-xs text-muted-foreground">{t.map.floor}</p>
              <p className="font-medium">
                {roomMap.floor} · {t.common.room} {room}
              </p>
            </div>
          </div>

          {roomMap.mapImage ? (
            <div className="overflow-hidden rounded-2xl border border-border/70">
              <Image
                src={roomMap.mapImage}
                alt={t.map.title}
                width={800}
                height={420}
                className="h-48 w-full object-cover"
              />
            </div>
          ) : null}

          <a
            href={roomMap.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ className: "w-full gap-2" })}
          >
            <Navigation className="size-4" />
            {t.map.openMaps}
            <ExternalLink className="size-3.5 opacity-70" />
          </a>
        </CardContent>
      </Card>

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Building2 className="size-4" />
            {t.map.steps}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm">
            {roomMap.steps.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-semibold text-teal-800 dark:bg-teal-400/15 dark:text-teal-300">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
