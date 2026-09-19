#!/usr/bin/env node

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i < 0) continue;
    const key = trimmed.slice(0, i).trim();
    const value = trimmed.slice(i + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(path.join(rootDir, ".env"));
loadEnvFile(path.join(rootDir, ".env.local"));

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const key =
  process.env.SUPABASE_SECRET_KEY?.trim() ??
  process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

async function main() {
  if (!url) {
    console.error("Falta NEXT_PUBLIC_SUPABASE_URL (Dashboard > Connect > Project URL)");
    process.exit(1);
  }
  if (!key) {
    console.error("Falta SUPABASE_SECRET_KEY");
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { count, error } = await supabase
    .from("restaurants")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("Conexión falló:", error.message);
    process.exit(1);
  }

  console.log("Supabase OK — tabla restaurants:", count ?? 0, "filas");
}

main();
