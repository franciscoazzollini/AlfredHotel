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

async function callTelegram(method, payload) {
  const token = getEnv("TELEGRAM_BOT_TOKEN", true);
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!data.ok) {
    throw new Error(data.description ?? `Telegram API error on ${method}`);
  }

  return data.result;
}

async function main() {
  const appUrl = process.argv[2] ?? getEnv("NEXT_PUBLIC_APP_URL") ?? "http://localhost:43123";
  const webhookUrl = `${appUrl.replace(/\/$/, "")}/api/telegram/webhook`;

  try {
    const bot = await callTelegram("getMe", {});
    console.log(`Bot connected: @${bot.username ?? "unknown"} (${bot.first_name ?? "bot"})`);

    const webhook = await callTelegram("setWebhook", {
      url: webhookUrl,
      allowed_updates: ["message"],
      drop_pending_updates: true,
    });

    console.log(`Webhook registered: ${webhookUrl}`);
    console.log(`Webhook status: ${webhook ? "ok" : "failed"}`);
    console.log("");
    console.log("Next steps:");
    console.log("1. Open your bot in Telegram and send /start");
    console.log("2. Copy the chat ID into TELEGRAM_CHAT_ID in .env.local");
    console.log("3. Send build outputs with: npm run telegram:notify -- --file ./path/to/app.apk");
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
