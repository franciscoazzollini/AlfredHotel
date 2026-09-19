import { createClient } from "@supabase/supabase-js";

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
}

function getSupabaseSecretKey() {
  return (
    process.env.SUPABASE_SECRET_KEY?.trim() ??
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  );
}

function getSupabasePublishableKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  );
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseSecretKey());
}

export function getSupabaseAdmin() {
  const url = getSupabaseUrl();
  const key = getSupabaseSecretKey();

  if (!url || !key) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function getSupabaseBrowser() {
  const url = getSupabaseUrl();
  const key = getSupabasePublishableKey();

  if (!url || !key) {
    throw new Error("Missing Supabase public environment variables");
  }

  return createClient(url, key);
}
