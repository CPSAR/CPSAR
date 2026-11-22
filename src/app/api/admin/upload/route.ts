import { NextResponse } from "next/server";
import { getAdminSession, isSameOrigin } from "@/lib/admin-auth";

export const runtime = "nodejs";
const allowedTypes = new Map([
  ["application/pdf", "pdf"],
  ["application/msword", "doc"],
  ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx"],
]);
const logoTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const contentImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

async function matchesFileSignature(file: File) {
  const header = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const startsWith = (...bytes: number[]) => bytes.every((byte, index) => header[index] === byte);
  const ascii = (start: number, value: string) => value.split("").every((character, index) => header[start + index] === character.charCodeAt(0));

  if (file.type === "image/jpeg") return startsWith(0xff, 0xd8, 0xff);
  if (file.type === "image/png") return startsWith(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);
  if (file.type === "image/webp") return ascii(0, "RIFF") && ascii(8, "WEBP");
  if (file.type === "application/pdf") return ascii(0, "%PDF-");
  if (file.type === "application/msword") return startsWith(0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1);
  if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") return startsWith(0x50, 0x4b, 0x03, 0x04);
  return false;
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Your staff session has expired. Sign in again." }, { status: 401 });
  const contentLength = Number(request.headers.get("content-length"));
  const hostingBodyLimit = process.env.VERCEL_SUPPORT_LARGE_REQUEST_BODY === "1" ? 20 * 1024 * 1024 : 4.5 * 1024 * 1024;
  if (Number.isFinite(contentLength) && contentLength > hostingBodyLimit) {
    return NextResponse.json({ error: "This upload exceeds the current hosting request limit. Optimize the file or enable Vercel's larger request body support." }, { status: 413 });
  }
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  const kind = form?.get("kind");
  const isPartnerLogo = kind === "partner-logo";
  const isContentImage = kind === "image";
  if (!(file instanceof File)) return NextResponse.json({ error: isContentImage ? "Choose a content image to upload." : isPartnerLogo ? "Choose a partner logo to upload." : "Choose a document to upload." }, { status: 400 });
  if (isContentImage && (!contentImageTypes.has(file.type) || file.size > 8 * 1024 * 1024)) {
    return NextResponse.json({ error: "Upload a JPG, PNG, or WebP image smaller than 8 MB." }, { status: 400 });
  }
  if (isPartnerLogo ? (!logoTypes.has(file.type) || file.size > 5 * 1024 * 1024) : !isContentImage && (!allowedTypes.has(file.type) || file.size > 20 * 1024 * 1024)) {
    if (isPartnerLogo) return NextResponse.json({ error: "Upload a PNG, JPG, or WebP image smaller than 5 MB." }, { status: 400 });
    return NextResponse.json({ error: "Upload a PDF, DOC, or DOCX file smaller than 20 MB." }, { status: 400 });
  }
  if (!(await matchesFileSignature(file))) {
    return NextResponse.json({ error: "The file contents do not match the selected file type." }, { status: 400 });
  }
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-100) || (isContentImage ? "image" : isPartnerLogo ? "partner-logo" : "document");
  const path = `${crypto.randomUUID()}-${safeName}`;
  const bucket = isContentImage ? "cpsar-images" : isPartnerLogo ? "cpsar-partner-logos" : "cpsar-resources";
  const { error } = await session.client.storage.from(bucket).upload(path, file, { contentType: file.type });
  if (error) return NextResponse.json({ error: `The ${isContentImage ? "image" : isPartnerLogo ? "logo" : "document"} could not be uploaded. Check that storage is configured.` }, { status: 503 });
  const { data } = session.client.storage.from(bucket).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
