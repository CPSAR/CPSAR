import { NextResponse } from "next/server";
import { getAdminSession, isSameOrigin } from "@/lib/admin-auth";

export const runtime = "nodejs";
const allowedTypes = new Map([
  ["application/pdf", "pdf"],
  ["application/msword", "doc"],
  ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx"],
]);
const logoTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Your staff session has expired. Sign in again." }, { status: 401 });
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  const kind = form?.get("kind");
  const isPartnerLogo = kind === "partner-logo";
  if (!(file instanceof File)) return NextResponse.json({ error: isPartnerLogo ? "Choose a partner logo to upload." : "Choose a document to upload." }, { status: 400 });
  if (isPartnerLogo ? (!logoTypes.has(file.type) || file.size > 5 * 1024 * 1024) : (!allowedTypes.has(file.type) || file.size > 20 * 1024 * 1024)) {
    if (isPartnerLogo) return NextResponse.json({ error: "Upload a PNG, JPG, or WebP image smaller than 5 MB." }, { status: 400 });
    return NextResponse.json({ error: "Upload a PDF, DOC, or DOCX file smaller than 20 MB." }, { status: 400 });
  }
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-100) || (isPartnerLogo ? "partner-logo" : "document");
  const path = `${crypto.randomUUID()}-${safeName}`;
  const bucket = isPartnerLogo ? "cpsar-partner-logos" : "cpsar-resources";
  const { error } = await session.client.storage.from(bucket).upload(path, file, { contentType: file.type });
  if (error) return NextResponse.json({ error: `The ${isPartnerLogo ? "logo" : "document"} could not be uploaded. Check that storage is configured.` }, { status: 503 });
  const { data } = session.client.storage.from(bucket).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
