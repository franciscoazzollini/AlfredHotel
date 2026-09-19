"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, ConciergeBell, UtensilsCrossed } from "lucide-react";

import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/context";

type GuestNavProps = {
  room: string;
};

export function GuestBottomNav({ room }: GuestNavProps) {
  const pathname = usePathname();
  const { t } = useI18n();
  const base = `/habitacion/${room}`;

  const navItems = [
    { href: "", label: t.nav.home, icon: Home },
    { href: "/comida", label: t.nav.food, icon: UtensilsCrossed },
    { href: "/servicios", label: t.nav.services, icon: ConciergeBell },
    { href: "/chat", label: t.nav.chat, icon: MessageCircle },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 backdrop-blur-md">
      <div className="mx-auto grid max-w-lg grid-cols-4 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {navItems.map((item) => {
          const href = `${base}${item.href}`;
          const active =
            item.href === ""
              ? pathname === base
              : pathname.startsWith(`${base}${item.href}`);

          return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-xs transition-colors",
                active ? "nav-active" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className="size-5" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
