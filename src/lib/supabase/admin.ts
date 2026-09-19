import { createClient } from "@supabase/supabase-js";

import { getSupabaseSecretKey, getSupabaseUrl, isSupabaseAdminConfigured } from "./env";

export { isSupabaseAdminConfigured as isSupabaseConfigured };

export function getSupabaseAdmin() {
  const url = getSupabaseUrl();
  const key = getSupabaseSecretKey();

  if (!url || !key) {
    throw new Error("Missing Supabase admin environment variables");
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
