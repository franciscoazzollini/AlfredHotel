"use client";

import Link from "next/link";
import {
  CalendarDays,
  Images,
  MapPin,
  Phone,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

import { WifiCard } from "@/components/guest/wifi-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Hotel } from "@/lib/hotel/types";

type GuestHubProps = {
  hotel: Hotel;
  room: string;
};

const hubLinks = [
  {
    href: "comida",
    label: "Comida a la habitación",
    description: "Menú y pedidos sin llamar",
    icon: UtensilsCrossed,
    color: "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-100",
  },
  {
    href: "servicios",
    label: "Pedidos rápidos",
    description: "Toallas, agua, limpieza y más",
    icon: Sparkles,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-100",
  },
  {
    href: "instalaciones",
    label: "Instalaciones",
    description: "Piscina, spa, gym y restaurante",
    icon: MapPin,
    color: "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-100",
  },
  {
    href: "eventos",
    label: "Eventos",
    description: "Cronograma de actividades",
    icon: CalendarDays,
    color: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-100",
  },
  {
    href: "galeria",
    label: "Galería",
    description: "Fotos del hotel y experiencias",
    icon: Images,
    color: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-100",
  },
  {
    href: "chat",
    label: "Chat con recepción",
    description: "Consultas en tiempo real",
    icon: Phone,
    color: "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-100",
  },
];

export function GuestHub({ hotel, room }: GuestHubProps) {
  const base = `/habitacion/${room}`;

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-teal-700 text-2xl text-white">
            {hotel.logoEmoji}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{hotel.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{hotel.tagline}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>Hab. {room}</Badge>
              <Badge variant="outline">Check-in {hotel.checkIn}</Badge>
              <Badge variant="outline">Check-out {hotel.checkOut}</Badge>
            </div>
          </div>
        </div>
      </section>

      <WifiCard ssid={hotel.wifi.ssid} password={hotel.wifi.password} />

      <section className="grid gap-3 sm:grid-cols-2">
        {hubLinks.map((link) => (
          <Link key={link.href} href={`${base}/${link.href}`}>
            <Card className="h-full border-border/70 transition-all hover:-translate-y-0.5 hover:shadow-md">
              <CardContent className="flex h-full gap-3 p-4">
                <div
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${link.color}`}
                >
                  <link.icon className="size-5" />
                </div>
                <div>
                  <p className="font-medium">{link.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{link.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="rounded-2xl border border-border/70 bg-muted/30 p-4 text-sm">
        <p className="font-medium">{hotel.receptionHours}</p>
        <p className="mt-1 text-muted-foreground">{hotel.breakfastHours}</p>
        <ul className="mt-3 space-y-1 text-muted-foreground">
          {hotel.houseRules.map((rule) => (
            <li key={rule}>• {rule}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
