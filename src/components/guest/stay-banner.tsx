"use client";

import { CalendarRange } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n/context";
import type { GuestStay } from "@/lib/hotel/types";

type StayBannerProps = {
  stay: GuestStay;
  checkInTime: string;
  checkOutTime: string;
};

function formatDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function nightsBetween(start: string, end: string) {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export function StayBanner({ stay, checkInTime, checkOutTime }: StayBannerProps) {
  const { locale, t } = useI18n();
  const intlLocale = locale === "zh-TW" ? "zh-Hant" : locale;
  const nights = nightsBetween(stay.checkInDate, stay.checkOutDate);

  return (
    <Card className="border-teal-200/70 bg-teal-50/60 dark:border-teal-900 dark:bg-teal-950/40">
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center gap-2 font-medium">
          <CalendarRange className="size-4 text-teal-700 dark:text-teal-300" />
          {t.stay.title}
        </div>
        <p className="text-sm text-muted-foreground">{t.stay.subtitle}</p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-xl border border-border/60 bg-background/70 p-3">
            <p className="text-xs text-muted-foreground">{t.stay.checkIn}</p>
            <p className="font-medium">{formatDate(stay.checkInDate, intlLocale)}</p>
            <p className="text-xs text-muted-foreground">{checkInTime}</p>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/70 p-3">
            <p className="text-xs text-muted-foreground">{t.stay.checkOut}</p>
            <p className="font-medium">{formatDate(stay.checkOutDate, intlLocale)}</p>
            <p className="text-xs text-muted-foreground">{checkOutTime}</p>
          </div>
        </div>
        <p className="text-sm font-medium text-teal-800 dark:text-teal-200">
          {nights} {t.stay.nights}
          {stay.guestName ? ` · ${stay.guestName}` : ""}
        </p>
      </CardContent>
    </Card>
  );
}
