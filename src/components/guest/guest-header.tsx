import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";

type GuestHeaderProps = {
  hotelName: string;
  room: string;
  title?: string;
  backHref?: string;
};

export function GuestHeader({ hotelName, room, title, backHref }: GuestHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
        {backHref ? (
          <Link
            href={backHref}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border/70"
            aria-label="Volver"
          >
            <ArrowLeft className="size-4" />
          </Link>
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-muted-foreground">{hotelName}</p>
          <div className="flex items-center gap-2">
            <h1 className="truncate text-lg font-semibold">{title ?? `Habitación ${room}`}</h1>
            <Badge variant="secondary">QR</Badge>
          </div>
        </div>
      </div>
    </header>
  );
}
