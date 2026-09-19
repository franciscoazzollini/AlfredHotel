import { NextResponse } from "next/server";

import { handleTelegramUpdate, type TelegramUpdate } from "@/lib/telegram/client";
import { isTelegramConfigured } from "@/lib/telegram/config";

export async function POST(request: Request) {
  if (!isTelegramConfigured()) {
    return NextResponse.json({ error: "Telegram bot is not configured" }, { status: 503 });
  }

  try {
    const update = (await request.json()) as TelegramUpdate;
    const result = await handleTelegramUpdate(update);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook processing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "/api/telegram/webhook",
    configured: isTelegramConfigured(),
  });
}
