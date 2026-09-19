import { Building2, ConciergeBell, QrCode, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: QrCode,
    title: "QR en cada habitación",
    description:
      "El huésped escanea y accede al hub: WiFi, pedidos, chat y guía del hotel sin instalar nada.",
  },
  {
    icon: ConciergeBell,
    title: "Room service y pedidos",
    description:
      "Comida a la habitación, toallas, agua, limpieza, mantenimiento y late checkout en segundos.",
  },
  {
    icon: Building2,
    title: "Instalaciones y eventos",
    description:
      "Mapa de facilities con fotos, horarios, galería del hotel y cronograma de actividades.",
  },
  {
    icon: ShieldCheck,
    title: "Recepción en tiempo real",
    description:
      "Cada pedido y mensaje llega a recepción por Telegram (y WhatsApp como respaldo).",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="secondary" className="mb-4">
          Funcionalidades
        </Badge>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Todo lo que pediste, en una sola experiencia
        </h2>
        <p className="mt-4 text-muted-foreground">
          Basado en la vertical hotelera que ya tenías en QR-master, extendido para hoteles
          completos con portal de huésped por habitación.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <Card key={feature.title} className="border-border/70 bg-card/80">
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                <feature.icon className="size-5" aria-hidden="true" />
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
