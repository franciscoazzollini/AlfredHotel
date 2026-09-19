import { getTelegramBotToken } from "./config";

const TELEGRAM_API_BASE = "https://api.telegram.org";

type TelegramResponse<T> = {
  ok: boolean;
  result?: T;
  description?: string;
};

async function callTelegram<T>(
  method: string,
  payload: Record<string, unknown> | FormData,
): Promise<T> {
  const token = getTelegramBotToken();
  const isFormData = payload instanceof FormData;
  const response = await fetch(`${TELEGRAM_API_BASE}/bot${token}/${method}`, {
    method: "POST",
    headers: isFormData ? undefined : { "Content-Type": "application/json" },
    body: isFormData ? payload : JSON.stringify(payload),
  });

  const data = (await response.json()) as TelegramResponse<T>;
  if (!data.ok) {
    throw new Error(data.description ?? `Telegram API error on ${method}`);
  }

  return data.result as T;
}

export async function sendTelegramMessage(
  chatId: string | number,
  text: string,
  options?: { parseMode?: "HTML" | "Markdown" | "MarkdownV2" },
) {
  return callTelegram("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: options?.parseMode,
    disable_web_page_preview: true,
  });
}

export async function sendTelegramDocument(
  chatId: string | number,
  file: Blob | File,
  options?: { caption?: string; filename?: string },
) {
  const formData = new FormData();
  formData.append("chat_id", String(chatId));
  formData.append(
    "document",
    file,
    options?.filename ?? (file instanceof File ? file.name : "build.apk"),
  );

  if (options?.caption) {
    formData.append("caption", options.caption);
  }

  return callTelegram("sendDocument", formData);
}

export async function getTelegramBotInfo() {
  return callTelegram<{ username?: string; first_name?: string }>("getMe", {});
}

export async function setTelegramWebhook(url: string) {
  return callTelegram("setWebhook", {
    url,
    allowed_updates: ["message"],
    drop_pending_updates: true,
  });
}

export async function deleteTelegramWebhook() {
  return callTelegram("deleteWebhook", { drop_pending_updates: true });
}

export type TelegramUpdate = {
  update_id: number;
  message?: {
    message_id: number;
    chat: { id: number; type: string; username?: string; first_name?: string };
    text?: string;
  };
};

export function buildStartMessage(chatId: number) {
  return [
    "Harbor Hotels bot is connected.",
    "",
    "Use this chat to receive build outputs (APK, release notes, and status updates).",
    "",
    `Your chat ID: <code>${chatId}</code>`,
    "",
    "Add this value to TELEGRAM_CHAT_ID in your environment to receive automated build notifications.",
    "",
    "Commands:",
    "/status — project status",
    "/help — available commands",
  ].join("\n");
}

export function buildHelpMessage() {
  return [
    "Harbor Hotels Telegram bot",
    "",
    "/start — connect and show your chat ID",
    "/status — show project status",
    "/help — show this message",
    "",
    "Build pipeline usage:",
    "npm run telegram:notify -- --message \"Build finished\"",
    "npm run telegram:notify -- --file ./dist/app-release.apk --caption \"Latest APK\"",
  ].join("\n");
}

export function buildStatusMessage() {
  return [
    "Harbor Hotels — status",
    "",
    "Platform: Next.js starter",
    "Delivery: Telegram notifications enabled",
    "Next output: APK/build artifacts can be sent to this chat.",
  ].join("\n");
}

export async function handleTelegramUpdate(update: TelegramUpdate) {
  const message = update.message;
  if (!message?.text) {
    return { handled: false as const };
  }

  const chatId = message.chat.id;
  const command = message.text.trim().split(/\s+/)[0]?.toLowerCase();

  switch (command) {
    case "/start":
      await sendTelegramMessage(chatId, buildStartMessage(chatId), { parseMode: "HTML" });
      return { handled: true as const, command, chatId };
    case "/help":
      await sendTelegramMessage(chatId, buildHelpMessage());
      return { handled: true as const, command, chatId };
    case "/status":
      await sendTelegramMessage(chatId, buildStatusMessage());
      return { handled: true as const, command, chatId };
    default:
      if (message.text.startsWith("/")) {
        await sendTelegramMessage(
          chatId,
          "Unknown command. Send /help to see available commands.",
        );
        return { handled: true as const, command, chatId };
      }
      return { handled: false as const };
  }
}
