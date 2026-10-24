import { NextResponse } from "next/server";
import { getAdminSession, isSameOrigin, isSafeReadOrigin } from "@/lib/admin-auth";
import { readJsonObject } from "@/lib/read-json-object";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isSafeReadOrigin(request)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Sign in to continue." }, { status: 401 });
  const filter = new URL(request.url).searchParams.get("view") ?? "inbox";
  let query = session.client.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(300);
  if (filter === "inbox") query = query.is("archived_at", null);
  if (filter === "archived") query = query.not("archived_at", "is", null);
  if (!new Set(["inbox", "archived", "all"]).has(filter)) return NextResponse.json({ error: "Unknown message filter." }, { status: 400 });
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: "Could not load contact messages." }, { status: 503 });
  return NextResponse.json({ items: data ?? [] });
}

export async function PATCH(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Sign in to continue." }, { status: 401 });
  const parsed = await readJsonObject(request, 4_096);
  if (!parsed.ok) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const id = typeof parsed.value.id === "number" ? parsed.value.id : Number(parsed.value.id);
  const action = parsed.value.action;
  if (!Number.isInteger(id) || id < 1 || !["read", "unread", "archive", "unarchive"].includes(String(action))) {
    return NextResponse.json({ error: "Choose a valid message and action." }, { status: 400 });
  }
  const updates = action === "read" ? { read_at: new Date().toISOString() }
    : action === "unread" ? { read_at: null }
    : action === "archive" ? { archived_at: new Date().toISOString() }
    : { archived_at: null };
  const { data, error } = await session.client.from("contact_messages").update(updates).eq("id", id).select("id").maybeSingle();
  if (error || !data) return NextResponse.json({ error: "Could not update this message." }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Sign in to continue." }, { status: 401 });
  const parsed = await readJsonObject(request, 4_096);
  if (!parsed.ok) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const id = typeof parsed.value.id === "number" ? parsed.value.id : Number(parsed.value.id);
  if (!Number.isInteger(id) || id < 1) return NextResponse.json({ error: "Choose a valid message." }, { status: 400 });
  const { error } = await session.client.from("contact_messages").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Could not delete this message." }, { status: 400 });
  return NextResponse.json({ ok: true });
}
