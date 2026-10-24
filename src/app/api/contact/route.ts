import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { readJsonObject } from "@/lib/read-json-object";

export const runtime = "nodejs";

const allowedSubjects = new Set([
  "General Enquiry",
  "Membership",
  "Programmes & Events",
  "Research Collaboration",
  "Partnerships & Sponsorship",
  "Media & Press",
  "Other",
]);

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  }

  const parsed = await readJsonObject(request, 8_192);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: parsed.tooLarge ? "Message is too large." : "Invalid request." },
      { status: parsed.tooLarge ? 413 : 400 },
    );
  }
  const input = parsed.value;
  // A hidden honeypot field catches simple automated form submissions.
  if (typeof input.website === "string" && input.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof input.name === "string" ? input.name.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const subject = typeof input.subject === "string" ? input.subject : "";
  const message = typeof input.message === "string" ? input.message.trim() : "";

  if (
    name.length < 2 || name.length > 120 ||
    email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !allowedSubjects.has(subject) ||
    message.length < 10 || message.length > 500
  ) {
    return NextResponse.json({ error: "Please check the information and try again." }, { status: 400 });
  }

  try {
    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("contact_messages").insert({ name, email, subject, message });
    if (error) throw error;
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "We couldn't save your message right now. Please try again shortly." },
      { status: 503 },
    );
  }
}
