"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { LocaleSwitcher } from "@/components/guest/locale-switcher";
import { ThemeToggle } from "@/components/guest/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/context";

type GuestHeaderProps = {
  hotelName: string;
  room: string;
  title?: string;
  backHref?: string;
};

export function GuestHeader({ hotelName, room, title, backHref }: GuestHeaderProps) {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center gap-2 px-4 py-3">
        {backHref ? (
          <Link
            href={backHref}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/70"
            aria-label={t.common.back}
          >
            <ArrowLeft className="size-4" />
          </Link>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-muted-foreground">{hotelName}</p>
          <div className="flex items-center gap-2">
            <h1 className="truncate text-lg font-semibold">
              {title ?? `${t.common.room} ${room}`}
            </h1>
            <Badge variant="secondary">QR</Badge>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
