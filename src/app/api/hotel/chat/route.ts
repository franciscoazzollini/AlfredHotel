import { NextResponse } from "next/server";

import { notifyHotelStaff } from "@/lib/hotel/notify";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      room?: string;
      hotelId?: string;
      message?: string;
    };

    if (!body.room || !body.hotelId || !body.message?.trim()) {
      return NextResponse.json({ error: "Mensaje requerido" }, { status: 400 });
    }

    const result = await notifyHotelStaff({
      room: body.room,
      hotelId: body.hotelId,
      type: "chat",
      message: body.message.trim(),
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error al enviar mensaje";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
