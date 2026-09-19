import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Facility } from "@/lib/hotel/types";

type FacilitiesGridProps = {
  facilities: Facility[];
};

export function FacilitiesGrid({ facilities }: FacilitiesGridProps) {
  return (
    <div className="space-y-4">
      {facilities.map((facility) => (
        <Card key={facility.id} className="overflow-hidden border-border/70">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={facility.image}
              alt={facility.name}
              fill
              className="object-cover"
              sizes="(max-width: 512px) 100vw, 512px"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-lg">{facility.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{facility.description}</p>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            {facility.hours ? <p>Horario: {facility.hours}</p> : null}
            <p className="text-muted-foreground">Ubicación: {facility.location}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
