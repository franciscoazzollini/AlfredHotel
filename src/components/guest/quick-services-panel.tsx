"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { quickServices } from "@/lib/hotel/repository";
import type { QuickServiceId } from "@/lib/hotel/types";

type QuickServicesPanelProps = {
  room: string;
  hotelId: string;
  receptionWhatsApp: string;
};

export function QuickServicesPanel({
  room,
  hotelId,
  receptionWhatsApp,
}: QuickServicesPanelProps) {
  const [selected, setSelected] = useState<QuickServiceId | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitRequest(type: QuickServiceId) {
    setLoading(true);
    try {
      const response = await fetch("/api/hotel/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room,
          hotelId,
          type,
          message: message || undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "No se pudo enviar el pedido");
      }

      toast.success("Pedido enviado a recepción");
      setSelected(null);
      setMessage("");

      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al enviar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Tocá lo que necesitás. Recepción recibe el aviso al instante.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {quickServices.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => setSelected(service.id)}
            className="rounded-2xl border border-border/70 bg-card p-4 text-left transition-colors hover:border-teal-300 hover:bg-teal-50/40 dark:hover:border-teal-400/30 dark:hover:bg-teal-400/10"
          >
            <div className="text-2xl">{service.emoji}</div>
            <p className="mt-2 font-medium">{service.label}</p>
          </button>
        ))}
      </div>

      {selected ? (
        <Card>
          <CardContent className="space-y-3 p-4">
            <p className="font-medium">
              {quickServices.find((service) => service.id === selected)?.label}
            </p>
            <Textarea
              placeholder="Detalle opcional (ej: 2 toallas grandes, sin molestar)"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <div className="flex gap-2">
              <Button
                className="flex-1"
                disabled={loading}
                onClick={() => submitRequest(selected)}
              >
                {loading ? "Enviando..." : "Confirmar pedido"}
              </Button>
              <Button variant="outline" onClick={() => setSelected(null)}>
                Cancelar
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              También podés escribir por WhatsApp: {receptionWhatsApp}
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
