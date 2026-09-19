import Link from "next/link";
import { Building2 } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="size-4" aria-hidden="true" />
          </span>
          <span>Harbor Hotels</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link href="#features" className="transition-colors hover:text-foreground">
            Funciones
          </Link>
          <Link href="/habitacion/305" className="transition-colors hover:text-foreground">
            Demo QR
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/habitacion/305" className={cn(buttonVariants({ size: "sm" }))}>
            Probar demo
          </Link>
        </div>
      </div>
    </header>
  );
}
