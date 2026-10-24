import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { readJsonObject } from "@/lib/read-json-object";

export const runtime = "nodejs";

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  }

  const parsed = await readJsonObject(request, 2_048);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: parsed.tooLarge ? "Request is too large." : "Invalid request." },
      { status: parsed.tooLarge ? 413 : 400 },
    );
  }
  const input = parsed.value;
  if (typeof input.website === "string" && input.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    // Treat an existing email as success so the endpoint reveals no subscription state.
    if (error && error.code !== "23505") throw error;
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "We couldn't save your subscription right now. Please try again shortly." },
      { status: 503 },
    );
  }
}
