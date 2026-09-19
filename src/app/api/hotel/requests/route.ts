import { NextResponse } from "next/server";

import { notifyHotelStaff } from "@/lib/hotel/notify";
import type { GuestRequestPayload } from "@/lib/hotel/types";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as GuestRequestPayload;

    if (!payload.room || !payload.hotelId || !payload.type) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const result = await notifyHotelStaff(payload);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al procesar pedido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
