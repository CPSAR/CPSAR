import type { NextResponse } from "next/server";
import { ADMIN_ACCESS_COOKIE, ADMIN_REFRESH_COOKIE } from "@/lib/admin-auth";

type SessionTokens = { access_token: string; refresh_token: string; expires_in?: number };

export function setAdminSessionCookies(response: NextResponse, session: SessionTokens) {
  const shared = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
  response.cookies.set(ADMIN_ACCESS_COOKIE, session.access_token, {
    ...shared,
    maxAge: session.expires_in ?? 3600,
  });
  response.cookies.set(ADMIN_REFRESH_COOKIE, session.refresh_token, {
    ...shared,
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

export function clearAdminSessionCookies(response: NextResponse) {
  response.cookies.set(ADMIN_ACCESS_COOKIE, "", { path: "/", maxAge: 0, httpOnly: true, sameSite: "lax" });
  response.cookies.set(ADMIN_REFRESH_COOKIE, "", { path: "/", maxAge: 0, httpOnly: true, sameSite: "lax" });
  return response;
}
