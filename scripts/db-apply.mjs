#!/usr/bin/env node

/**
 * Applies supabase/apply-all.sql when SUPABASE_DB_PASSWORD is set.
 * Password: Supabase Dashboard → Project Settings → Database
 */

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL?.match(
  /https:\/\/([^.]+)\.supabase\.co/,
)?.[1];
const password = process.env.SUPABASE_DB_PASSWORD?.trim();

async function main() {
  if (!projectRef) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL");
    process.exit(1);
  }

  if (!password) {
    console.error(
      "Set SUPABASE_DB_PASSWORD in .env.local (Dashboard → Project Settings → Database)",
    );
    console.error("Then run: npm run db:apply");
    console.error("Or paste supabase/apply-all.sql into Supabase SQL Editor.");
    process.exit(1);
  }

  const { default: pg } = await import("pg");
  const client = new pg.Client({
    host: `db.${projectRef}.supabase.co`,
    port: 5432,
    database: "postgres",
    user: "postgres",
    password,
    ssl: { rejectUnauthorized: false },
  });

  const sql = readFileSync(path.join(rootDir, "supabase/apply-all.sql"), "utf8");

  await client.connect();
  await client.query(sql);
  await client.end();

  console.log("Migrations applied successfully.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
