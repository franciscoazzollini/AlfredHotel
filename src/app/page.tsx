import { Sparkles } from "lucide-react";

import { BookingSearch } from "@/components/booking-search";
import { FeatureGrid } from "@/components/feature-grid";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.12),_transparent_45%)]">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-5 bg-teal-700 text-white hover:bg-teal-700">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Hotel platform foundation
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Run your hotel business from one modern platform
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground text-pretty">
              A Next.js starter for property listings, direct bookings, and guest
              experiences. The environment is ready — tell us what to build next.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-4xl">
            <BookingSearch />
          </div>
        </section>

        <FeatureGrid />
      </main>

      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p>Harbor Hotels — starter repository</p>
          <p>Ready for GitHub and your next instructions</p>
        </div>
      </footer>
    </div>
  );
}
