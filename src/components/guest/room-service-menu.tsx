"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { formatPrice } from "@/lib/hotel/repository";
import type { Hotel, MenuItem } from "@/lib/hotel/types";

type RoomServiceMenuProps = {
  hotel: Hotel;
  room: string;
};

type CartItem = MenuItem & { quantity: number };

export function RoomServiceMenu({ hotel, room }: RoomServiceMenuProps) {
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const cartItems = useMemo(() => Object.values(cart), [cart]);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function updateQuantity(item: MenuItem, delta: number) {
    setCart((current) => {
      const existing = current[item.id];
      const nextQty = (existing?.quantity ?? 0) + delta;
      if (nextQty <= 0) {
        const { [item.id]: _, ...rest } = current;
        return rest;
      }
      return { ...current, [item.id]: { ...item, quantity: nextQty } };
    });
  }

  async function submitOrder() {
    if (cartItems.length === 0) {
      toast.error("Agregá al menos un plato");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/hotel/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room,
          hotelId: hotel.id,
          type: "room-service",
          message: notes || undefined,
          items: cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "No se pudo enviar el pedido");
      }

      toast.success("Pedido enviado a cocina");
      setCart({});
      setNotes("");

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
    <div className="space-y-5">
      {hotel.menu.map((category) => (
        <section key={category.id} className="space-y-3">
          <h2 className="text-lg font-semibold">{category.name}</h2>
          {category.items.map((item) => {
            const quantity = cart[item.id]?.quantity ?? 0;
            return (
              <Card key={item.id} className="border-border/70">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-base">{item.name}</CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <p className="text-brand shrink-0 font-semibold">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {item.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon-sm"
                      variant="outline"
                      onClick={() => updateQuantity(item, -1)}
                      aria-label={`Quitar ${item.name}`}
                    >
                      <Minus className="size-4" />
                    </Button>
                    <span className="w-6 text-center font-medium">{quantity}</span>
                    <Button
                      size="icon-sm"
                      onClick={() => updateQuantity(item, 1)}
                      aria-label={`Agregar ${item.name}`}
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>
      ))}

      <Card className="sticky bottom-24 border-teal-200/70 bg-background/95 backdrop-blur">
        <CardContent className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium">
              <ShoppingBag className="size-4" />
              Tu pedido
            </div>
            <span>{formatPrice(total)}</span>
          </div>
          <Textarea
            placeholder="Notas para cocina (sin cebolla, alergias, etc.)"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
          <Button className="w-full" disabled={loading} onClick={submitOrder}>
            {loading ? "Enviando pedido..." : "Enviar a room service"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
