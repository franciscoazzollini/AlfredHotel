import { BadgeCheck, ConciergeBell, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: ConciergeBell,
    title: "Property management",
    description:
      "Manage rooms, rates, and availability from one dashboard built for hotel teams.",
  },
  {
    icon: BadgeCheck,
    title: "Direct bookings",
    description:
      "Offer a branded booking experience that keeps guests on your site and reduces fees.",
  },
  {
    icon: ShieldCheck,
    title: "Operations ready",
    description:
      "Start with a clean foundation for reservations, guest profiles, and reporting.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="secondary" className="mb-4">
          Project starter
        </Badge>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Built for modern hotel operations
        </h2>
        <p className="mt-4 text-muted-foreground">
          This repository is ready for your product direction. Share your requirements
          and we will extend booking flows, admin tools, and integrations from here.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
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
