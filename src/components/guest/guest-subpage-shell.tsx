"use client";

import type { ReactNode } from "react";

import { GuestShell } from "@/components/guest/guest-shell";
import { useI18n } from "@/lib/i18n/context";

type HubTitleKey =
  | "foodTitle"
  | "servicesTitle"
  | "cleaningTitle"
  | "mapTitle"
  | "facilitiesTitle"
  | "eventsTitle"
  | "galleryTitle"
  | "chatTitle";

type GuestSubpageShellProps = {
  hotelName: string;
  room: string;
  titleKey: HubTitleKey;
  children: ReactNode;
};

export function GuestSubpageShell({
  hotelName,
  room,
  titleKey,
  children,
}: GuestSubpageShellProps) {
  const { t } = useI18n();

  return (
    <GuestShell
      hotelName={hotelName}
      room={room}
      title={t.hub[titleKey]}
      backHref={`/habitacion/${room}`}
    >
      {children}
    </GuestShell>
  );
}
