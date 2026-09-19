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
const secretKey =
  process.env.SUPABASE_SECRET_KEY?.trim() ??
  process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const publishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

async function probeTable(supabase, table) {
  const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true });
  return { table, count: count ?? 0, error: error?.message ?? null };
}

async function main() {
  if (!url) {
    console.error("Falta NEXT_PUBLIC_SUPABASE_URL");
    process.exit(1);
  }

  const key = secretKey ?? publishableKey;
  if (!key) {
    console.error("Falta SUPABASE_SECRET_KEY o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: health, error: healthError } = await supabase.auth.getSession();
  if (healthError && !secretKey) {
    console.error("Auth probe failed:", healthError.message);
  }

  console.log("URL:", url);
  console.log("Key:", secretKey ? "secret (admin)" : "publishable (public)");
  console.log("Session probe:", health?.session ? "active" : "none");

  for (const table of ["restaurants", "todos", "guest_requests"]) {
    const result = await probeTable(supabase, table);
    if (result.error) {
      console.log(`- ${result.table}: ${result.error}`);
    } else {
      console.log(`- ${result.table}: ${result.count} filas`);
    }
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
