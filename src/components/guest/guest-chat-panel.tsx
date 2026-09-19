"use client";

import { useState } from "react";
import { Phone, Send } from "lucide-react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { buildWhatsAppUrl } from "@/lib/hotel/requests";
import { cn } from "@/lib/utils";

type GuestChatPanelProps = {
  room: string;
  hotelId: string;
  hotelName: string;
  receptionPhone: string;
  receptionWhatsApp: string;
};

export function GuestChatPanel({
  room,
  hotelId,
  hotelName,
  receptionPhone,
  receptionWhatsApp,
}: GuestChatPanelProps) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message.trim()) {
      toast.error("Escribí un mensaje");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/hotel/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room,
          hotelId,
          message: message.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "No se pudo enviar el mensaje");
      }

      toast.success("Mensaje enviado a recepción");
      setMessage("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al enviar");
    } finally {
      setLoading(false);
    }
  }

  const whatsappText = `[${hotelName}] Hab. ${room}: ${message || "Consulta desde QR"}`;
  const whatsappUrl = buildWhatsAppUrl(receptionWhatsApp, whatsappText);

  return (
    <div className="space-y-4">
      <Card className="border-border/70 bg-muted/20">
        <CardContent className="space-y-2 p-4 text-sm">
          <p className="font-medium">Recepción disponible 24 hs</p>
          <p className="text-muted-foreground">
            Enviá tu consulta acá o llamanos directamente.
          </p>
          <a
            href={`tel:${receptionPhone}`}
            className={cn(buttonVariants({ variant: "outline" }), "w-full inline-flex")}
          >
            <Phone className="size-4" />
            Llamar a recepción
          </a>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Textarea
          rows={5}
          placeholder="Ej: ¿A qué hora cierra el spa? Necesito late checkout."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <Button className="w-full" disabled={loading} onClick={sendMessage}>
          <Send className="size-4" />
          {loading ? "Enviando..." : "Enviar mensaje"}
        </Button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }), "w-full inline-flex")}
        >
          Continuar por WhatsApp
        </a>
      </div>
    </div>
  );
}
