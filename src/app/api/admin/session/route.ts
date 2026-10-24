import { NextResponse } from "next/server";
import { getAdminSession, isSameOrigin } from "@/lib/admin-auth";
import { setAdminSessionCookies, clearAdminSessionCookies } from "@/lib/admin-session-cookies";
import { readJsonObject } from "@/lib/read-json-object";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Sign in to continue." }, { status: 401 });

  const response = NextResponse.json({ user: session.user });
  if (session.refreshed && session.refreshToken) {
    setAdminSessionCookies(response, {
      access_token: session.accessToken,
      refresh_token: session.refreshToken,
      expires_in: session.expiresIn,
    });
  }
  return response;
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  const parsed = await readJsonObject(request, 4_096);
  if (!parsed.ok) return NextResponse.json({ error: "Invalid sign-in request." }, { status: 400 });

  const email = typeof parsed.value.email === "string" ? parsed.value.email.trim().toLowerCase() : "";
  const password = typeof parsed.value.password === "string" ? parsed.value.password : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8 || password.length > 256) {
    return NextResponse.json({ error: "Enter a valid email and password." }, { status: 400 });
  }

  try {
    const authClient = createSupabaseServerClient();
    const { data, error } = await authClient.auth.signInWithPassword({ email, password });
    if (error || !data.user || !data.session) {
      return NextResponse.json({ error: "Email or password is incorrect, or this account is not enabled for staff access." }, { status: 401 });
    }

    const adminClient = createSupabaseServerClient(data.session.access_token);
    const { data: adminRecord, error: adminError } = await adminClient
      .from("site_admins")
      .select("user_id")
      .eq("user_id", data.user.id)
      .eq("active", true)
      .maybeSingle();
    if (adminError || !adminRecord) {
      await authClient.auth.signOut({ scope: "local" });
      return NextResponse.json({ error: "Email or password is incorrect, or this account is not enabled for staff access." }, { status: 401 });
    }

    const response = NextResponse.json({ user: { id: data.user.id, email: data.user.email } });
    return setAdminSessionCookies(response, data.session);
  } catch {
    return NextResponse.json({ error: "Staff sign-in is unavailable. Check the Supabase configuration and try again." }, { status: 503 });
  }
}

export async function DELETE(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  return clearAdminSessionCookies(NextResponse.json({ ok: true }));
}
