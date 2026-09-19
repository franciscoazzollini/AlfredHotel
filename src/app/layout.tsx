import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AppProviders } from "@/components/app-providers";
import { HideNetlifyBranding } from "@/components/hide-netlify-branding";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alfred Hotel | Portal QR para huéspedes",
  description:
    "Portal QR por habitación: room service, recepción, instalaciones, eventos y pedidos rápidos.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function r(){document.querySelectorAll('script[src*="netlify/scripts/hud"],script[data-netlify-site-id]').forEach(function(n){n.remove()});}r();new MutationObserver(r).observe(document,{childList:true,subtree:true});})();`,
          }}
        />
        <AppProviders>
          <HideNetlifyBranding />
          {children}
          <Toaster richColors position="top-center" />
        </AppProviders>
      </body>
    </html>
  );
}
