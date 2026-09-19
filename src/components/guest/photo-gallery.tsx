import Image from "next/image";

import type { GalleryPhoto } from "@/lib/hotel/types";

type PhotoGalleryProps = {
  photos: GalleryPhoto[];
};

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {photos.map((photo) => (
        <figure
          key={photo.id}
          className="overflow-hidden rounded-2xl border border-border/70 bg-card"
        >
          <div className="relative aspect-square">
            <Image
              src={photo.image}
              alt={photo.title}
              fill
              className="object-cover"
              sizes="(max-width: 512px) 50vw, 256px"
            />
          </div>
          <figcaption className="p-3">
            <p className="font-medium">{photo.title}</p>
            <p className="text-xs text-muted-foreground">{photo.category}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
