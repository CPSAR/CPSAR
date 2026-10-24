import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const ADMIN_ACCESS_COOKIE = "cpsar-admin-access";
export const ADMIN_REFRESH_COOKIE = "cpsar-admin-refresh";

export type AdminSession = {
  client: ReturnType<typeof createSupabaseServerClient>;
  user: { id: string; email?: string };
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  refreshed: boolean;
};

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ADMIN_ACCESS_COOKIE)?.value;
  const refreshToken = cookieStore.get(ADMIN_REFRESH_COOKIE)?.value;
  if (!accessToken) return null;

  try {
    let client = createSupabaseServerClient(accessToken);
    const authResult = await client.auth.getUser(accessToken);
    let user = authResult.data.user;
    const error = authResult.error;
    let activeAccessToken = accessToken;
    let activeRefreshToken = refreshToken;
    let expiresIn: number | undefined;
    let refreshed = false;

    if ((!user || error) && refreshToken) {
      const refreshedAuth = createSupabaseServerClient();
      const { data, error: refreshError } = await refreshedAuth.auth.refreshSession({ refresh_token: refreshToken });
      if (refreshError || !data.session || !data.user) return null;
      user = data.user;
      activeAccessToken = data.session.access_token;
      activeRefreshToken = data.session.refresh_token;
      expiresIn = data.session.expires_in;
      refreshed = true;
      client = createSupabaseServerClient(activeAccessToken);
    }

    if (!user) return null;
    const { data: admin, error: adminError } = await client
      .from("site_admins")
      .select("user_id")
      .eq("user_id", user.id)
      .eq("active", true)
      .maybeSingle();
    if (adminError || !admin) return null;

    return {
      client,
      user: { id: user.id, email: user.email },
      accessToken: activeAccessToken,
      refreshToken: activeRefreshToken,
      expiresIn,
      refreshed,
    };
  } catch {
    return null;
  }
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !!origin && origin === new URL(request.url).origin;
}

export function isSafeReadOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}
