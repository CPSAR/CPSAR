import { NextResponse } from "next/server";
import { getAdminSession, isSafeReadOrigin } from "@/lib/admin-auth";
import { cmsCollections } from "@/lib/admin-cms";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isSafeReadOrigin(request)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Sign in to continue." }, { status: 401 });

  const tables = Object.fromEntries(Object.entries(cmsCollections).map(([key, value]) => [key, value.table]));
  const counts = await Promise.all([
    ...Object.entries(tables).map(async ([key, table]) => {
      const { count, error } = await session.client.from(table).select("id", { count: "exact", head: true }).eq("published", true);
      return [key, error ? null : count] as const;
    }),
    session.client.from("contact_messages").select("id", { count: "exact", head: true }).is("read_at", null),
    session.client.from("newsletter_subscribers").select("email", { count: "exact", head: true }),
  ]);
  const entries = counts.slice(0, Object.keys(tables).length) as Array<readonly [string, number | null]>;
  const recordCounts = Object.fromEntries(entries);
  const messages = counts[Object.keys(tables).length] as { count: number | null; error: { message: string } | null };
  const subscribers = counts[Object.keys(tables).length + 1] as { count: number | null; error: { message: string } | null };
  if (Object.values(recordCounts).some((count) => count === null) || messages.error || subscribers.error) {
    return NextResponse.json({ error: "Could not load CMS statistics. Check the database migrations and admin permissions." }, { status: 503 });
  }
  return NextResponse.json({
    content: recordCounts,
    unreadMessages: messages.count ?? 0,
    subscribers: subscribers.count ?? 0,
  });
}
