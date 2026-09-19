import Link from "next/link";
import { QrCode, Smartphone, Sparkles } from "lucide-react";

import { FeatureGrid } from "@/components/feature-grid";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DEMO_ROOM } from "@/lib/hotel/repository";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.12),_transparent_45%)]">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-5 bg-teal-700 text-white hover:bg-teal-700">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Alfred Hotel — portal QR
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Un QR en la habitación para que el huésped lo resuelva todo
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground text-pretty">
              Room service, recepción, chat, instalaciones, eventos, toallas, agua y más —
              desde el celular, sin apps ni llamadas innecesarias.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={`/habitacion/${DEMO_ROOM}`}
                className={cn(buttonVariants({ size: "lg" }), "inline-flex")}
              >
                <Smartphone className="size-4" />
                Probar demo habitación {DEMO_ROOM}
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
            {[
              {
                icon: QrCode,
                title: "QR por habitación",
                text: "Cada cuarto abre su portal personalizado al escanear.",
              },
              {
                icon: Smartphone,
                title: "Mobile-first",
                text: "Diseñado para usarse en el teléfono del huésped.",
              },
              {
                icon: Sparkles,
                title: "Recepción conectada",
                text: "Pedidos y chat avisan a recepción vía Telegram/WhatsApp.",
              },
            ].map((item) => (
              <Card key={item.title} className="border-border/70">
                <CardContent className="space-y-2 p-5 text-left">
                  <item.icon className="size-5 text-teal-700" />
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <FeatureGrid />
      </main>

      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p>Alfred Hotel — portal QR para huéspedes</p>
          <Link href={`/habitacion/${DEMO_ROOM}`} className="text-teal-700 hover:underline">
            Demo: /habitacion/{DEMO_ROOM}
          </Link>
        </div>
      </footer>
    </div>
  );
}
