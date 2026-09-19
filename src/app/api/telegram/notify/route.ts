import { readFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import {
  sendTelegramDocument,
  sendTelegramMessage,
} from "@/lib/telegram/client";
import {
  getTelegramChatId,
  getTelegramNotifySecret,
  isTelegramConfigured,
} from "@/lib/telegram/config";

type NotifyPayload = {
  message?: string;
  caption?: string;
  filePath?: string;
  chatId?: string;
};

function isAuthorized(request: Request): boolean {
  const headerSecret = request.headers.get("x-telegram-notify-secret");
  const urlSecret = new URL(request.url).searchParams.get("secret");
  const expected = getTelegramNotifySecret();
  return headerSecret === expected || urlSecret === expected;
}

export async function POST(request: Request) {
  if (!isTelegramConfigured()) {
    return NextResponse.json({ error: "Telegram bot is not configured" }, { status: 503 });
  }

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as NotifyPayload;
    const chatId = payload.chatId ?? getTelegramChatId();

    if (!chatId) {
      return NextResponse.json(
        {
          error:
            "No chat ID configured. Send /start to your bot and set TELEGRAM_CHAT_ID.",
        },
        { status: 400 },
      );
    }

    const results: string[] = [];

    if (payload.message) {
      await sendTelegramMessage(chatId, payload.message);
      results.push("message");
    }

    if (payload.filePath) {
      const resolvedPath = path.resolve(payload.filePath);
      const fileBuffer = await readFile(resolvedPath);
      const fileName = path.basename(resolvedPath);
      const blob = new Blob([fileBuffer]);

      await sendTelegramDocument(chatId, blob, {
        caption: payload.caption,
        filename: fileName,
      });
      results.push("document");
    }

    if (results.length === 0) {
      return NextResponse.json(
        { error: "Provide at least one of: message, filePath" },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: true, delivered: results, chatId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Notification failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "/api/telegram/notify",
    configured: isTelegramConfigured(),
    chatConfigured: Boolean(getTelegramChatId()),
    usage: {
      method: "POST",
      auth: "x-telegram-notify-secret header or ?secret= query param",
      body: {
        message: "Optional status text",
        filePath: "Optional absolute or relative path to APK/build artifact",
        caption: "Optional caption when sending a file",
        chatId: "Optional override for TELEGRAM_CHAT_ID",
      },
    },
  });
}
