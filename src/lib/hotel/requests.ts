import type { GuestRequestPayload, QuickServiceId } from "./types";

const serviceLabels: Record<QuickServiceId, string> = {
  towels: "Pedido de toallas extra",
  water: "Pedido de agua / minibar",
  housekeeping: "Solicitud de limpieza",
  maintenance: "Reporte de mantenimiento",
  pillows: "Pedido de almohadas extra",
  checkout: "Solicitud de late checkout",
};

export function buildRequestMessage(payload: GuestRequestPayload, hotelName: string) {
  const header = `🏨 *${hotelName}* — Habitación *${payload.room}*`;

  if (payload.type === "chat") {
    return `${header}\n💬 *Mensaje del huésped*\n${payload.message ?? ""}`;
  }

  if (payload.type === "room-service") {
    const lines = payload.items?.map(
      (item) => `• ${item.quantity}x ${item.name} (${item.price})`,
    );
    return [
      header,
      "🍽 *Room service*",
      ...(lines ?? []),
      payload.message ? `\nNotas: ${payload.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  const label = serviceLabels[payload.type as QuickServiceId] ?? payload.type;
  return [
    header,
    `📋 *${label}*`,
    payload.message ? `Detalle: ${payload.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildWhatsAppUrl(phone: string, text: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
