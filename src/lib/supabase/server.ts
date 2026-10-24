import { createClient } from "@supabase/supabase-js";

/** Server-only Supabase client. Never use a service-role/secret key here. */
export function createSupabaseServerClient(accessToken?: string) {
  const url = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error("Supabase server environment is not configured.");
  }

  return createClient(url, publishableKey, {
    ...(accessToken ? { global: { headers: { Authorization: `Bearer ${accessToken}` } } } : {}),
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
