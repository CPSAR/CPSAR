import { NextResponse } from "next/server";
import { getAdminSession, isSameOrigin, isSafeReadOrigin } from "@/lib/admin-auth";
import { readJsonObject } from "@/lib/read-json-object";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isSafeReadOrigin(request)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Sign in to continue." }, { status: 401 });
  const { data, error } = await session.client.from("newsletter_subscribers").select("email,created_at").order("created_at", { ascending: false }).limit(2_000);
  if (error) return NextResponse.json({ error: "Could not load newsletter subscribers." }, { status: 503 });
  return NextResponse.json({ items: (data ?? []).map((item) => ({ ...item, id: item.email })) });
}

export async function DELETE(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Sign in to continue." }, { status: 401 });
  const parsed = await readJsonObject(request, 4_096);
  if (!parsed.ok) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const email = typeof parsed.value.email === "string" ? parsed.value.email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Choose a valid subscriber." }, { status: 400 });
  const { error } = await session.client.from("newsletter_subscribers").delete().eq("email", email);
  if (error) return NextResponse.json({ error: "Could not remove this subscriber." }, { status: 400 });
  return NextResponse.json({ ok: true });
}
