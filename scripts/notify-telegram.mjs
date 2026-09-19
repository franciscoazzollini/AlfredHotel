#!/usr/bin/env node

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return;
  }

  const content = readFileSync(filePath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.join(rootDir, ".env"));
loadEnvFile(path.join(rootDir, ".env.local"));

function getEnv(name, required = false) {
  const value = process.env[name]?.trim();
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function parseArgs(argv) {
  const args = {
    message: undefined,
    file: undefined,
    caption: undefined,
    chatId: undefined,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    const next = argv[index + 1];

    if (current === "--message" && next) {
      args.message = next;
      index += 1;
    } else if (current === "--file" && next) {
      args.file = next;
      index += 1;
    } else if (current === "--caption" && next) {
      args.caption = next;
      index += 1;
    } else if (current === "--chat-id" && next) {
      args.chatId = next;
      index += 1;
    }
  }

  return args;
}

async function sendDirectTelegramMessage(chatId, text) {
  const token = getEnv("TELEGRAM_BOT_TOKEN", true);
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  const data = await response.json();
  if (!data.ok) {
    throw new Error(data.description ?? "Failed to send Telegram message");
  }
}

async function sendDirectTelegramDocument(chatId, filePath, caption) {
  const token = getEnv("TELEGRAM_BOT_TOKEN", true);
  const resolvedPath = path.resolve(filePath);
  const fileBuffer = readFileSync(resolvedPath);
  const fileName = path.basename(resolvedPath);
  const blob = new Blob([fileBuffer]);
  const formData = new FormData();

  formData.append("chat_id", String(chatId));
  formData.append("document", blob, fileName);
  if (caption) {
    formData.append("caption", caption);
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!data.ok) {
    throw new Error(data.description ?? "Failed to send Telegram document");
  }
}

async function notifyViaApi(args) {
  const appUrl = getEnv("NEXT_PUBLIC_APP_URL") ?? "http://localhost:43123";
  const secret = getEnv("TELEGRAM_NOTIFY_SECRET", true);

  const response = await fetch(`${appUrl}/api/telegram/notify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-telegram-notify-secret": secret,
    },
    body: JSON.stringify({
      message: args.message,
      filePath: args.file,
      caption: args.caption,
      chatId: args.chatId,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error ?? "Notification API request failed");
  }

  return data;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const chatId = args.chatId ?? getEnv("TELEGRAM_CHAT_ID");

  if (!args.message && !args.file) {
    console.error(
      "Usage: npm run telegram:notify -- --message \"Build finished\" [--file ./dist/app.apk] [--caption \"Latest APK\"]",
    );
    process.exit(1);
  }

  if (!chatId) {
    console.error(
      "Missing TELEGRAM_CHAT_ID. Send /start to your bot and copy the chat ID into .env.local.",
    );
    process.exit(1);
  }

  try {
    if (args.file) {
      await sendDirectTelegramDocument(chatId, args.file, args.caption);
      console.log(`Sent file to Telegram chat ${chatId}: ${path.resolve(args.file)}`);
    }

    if (args.message) {
      await sendDirectTelegramMessage(chatId, args.message);
      console.log(`Sent message to Telegram chat ${chatId}`);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
