import type { ReactNode } from "react";

import { GuestBottomNav } from "./guest-bottom-nav";
import { GuestHeader } from "./guest-header";

type GuestShellProps = {
  hotelName: string;
  room: string;
  title?: string;
  backHref?: string;
  showNav?: boolean;
  children: ReactNode;
};

export function GuestShell({
  hotelName,
  room,
  title,
  backHref,
  showNav = true,
  children,
}: GuestShellProps) {
  return (
    <div className="min-h-dvh bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.08),_transparent_45%)]">
      <GuestHeader hotelName={hotelName} room={room} title={title} backHref={backHref} />
      <main className={showNav ? "mx-auto max-w-lg px-4 pb-28 pt-4" : "mx-auto max-w-lg px-4 py-4"}>
        {children}
      </main>
      {showNav ? <GuestBottomNav room={room} /> : null}
    </div>
  );
}
