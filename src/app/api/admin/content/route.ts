import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getAdminSession, isSameOrigin, isSafeReadOrigin } from "@/lib/admin-auth";
import { cmsCollections, isCmsCollection } from "@/lib/admin-cms";
import { readJsonObject } from "@/lib/read-json-object";

export const runtime = "nodejs";

function normalizeRecord(collection: keyof typeof cmsCollections, input: Record<string, unknown>) {
  const config = cmsCollections[collection];
  const output: Record<string, string | number | boolean | null> = {};

  for (const field of config.fields) {
    if (!(field in input)) continue;
    const value = input[field];
    if (field === "published" || field === "featured") {
      if (typeof value !== "boolean") return { error: `${field} must be true or false.` };
      output[field] = value;
      continue;
    }
    if (field === "display_order" || field === "graduation_year") {
      if (value === "" || value === null) {
        output[field] = null;
      } else {
        const number = typeof value === "number" ? value : Number(value);
        if (!Number.isInteger(number) || number < 0 || number > 9999) return { error: `${field} must be a valid whole number.` };
        output[field] = number;
      }
      continue;
    }
    if (value === "" && ["starts_at", "ends_at", "published_at", "image_url", "logo_url", "website"].includes(field)) {
      output[field] = null;
      continue;
    }
    if (typeof value !== "string") return { error: `${field} must be text.` };
    const text = value.trim();
    const maxLength = field === "body" || field === "bio" || field === "summary" || field === "quote" ? 20_000 : 500;
    if (text.length > maxLength) return { error: `${field} is too long.` };
    if (["starts_at", "ends_at", "published_at"].includes(field) && text && Number.isNaN(Date.parse(text))) {
      return { error: `${field} must be a valid date and time.` };
    }
    if (["website", "image_url", "logo_url", "resource_url"].includes(field) && text && !text.startsWith("/") && !/^https:\/\//i.test(text)) {
      return { error: `${field} must be an HTTPS URL or a path beginning with /.` };
    }
    if (field === "slug" && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(text)) {
      return { error: "Slug must use lowercase letters, numbers, and hyphens." };
    }
    output[field] = text;
  }

  for (const field of config.required) {
    if (typeof output[field] !== "string" || !output[field]) return { error: `${field} is required.` };
  }

  if (collection === "articles" && output.published === true && !output.published_at) {
    output.published_at = new Date().toISOString();
  }
  if (collection === "resources") delete output.slug;

  return { data: output };
}

function revalidateCollection(collection: keyof typeof cmsCollections) {
  const paths: Partial<Record<keyof typeof cmsCollections, string[]>> = {
    programmes: ["/programs", "/"],
    events: ["/events", "/"],
    articles: ["/news", "/"],
    resources: ["/resources", "/"],
    team: ["/leadership", "/about"],
    partners: ["/partners", "/"],
    testimonials: ["/", "/alumni"],
    alumni: ["/alumni"],
  };
  for (const path of paths[collection] ?? []) revalidatePath(path);
}

async function authorize(request: Request, mutating = false) {
  if (mutating ? !isSameOrigin(request) : !isSafeReadOrigin(request)) return { response: NextResponse.json({ error: "Request not allowed." }, { status: 403 }) };
  const session = await getAdminSession();
  if (!session) return { response: NextResponse.json({ error: "Your staff session has expired. Sign in again." }, { status: 401 }) };
  return { session };
}

export async function GET(request: Request) {
  const auth = await authorize(request);
  if ("response" in auth) return auth.response;
  const collection = new URL(request.url).searchParams.get("collection") ?? "";
  if (!isCmsCollection(collection)) return NextResponse.json({ error: "Unknown content type." }, { status: 400 });

  const config = cmsCollections[collection];
  const orderColumn = collection === "team" || collection === "partners" ? "display_order" : "created_at";
  const { data, error } = await auth.session.client.from(config.table).select("*").order(orderColumn, { ascending: orderColumn === "display_order" }).limit(200);
  if (error) return NextResponse.json({ error: "Could not load content. Check that the CMS migration has been applied." }, { status: 503 });
  return NextResponse.json({ items: data ?? [] });
}

export async function POST(request: Request) {
  const auth = await authorize(request, true);
  if ("response" in auth) return auth.response;
  const parsed = await readJsonObject(request, 65_536);
  if (!parsed.ok) return NextResponse.json({ error: "Invalid or oversized content request." }, { status: 400 });
  const collection = typeof parsed.value.collection === "string" ? parsed.value.collection : "";
  if (!isCmsCollection(collection) || !parsed.value.data || typeof parsed.value.data !== "object" || Array.isArray(parsed.value.data)) {
    return NextResponse.json({ error: "Choose a valid content type and provide content fields." }, { status: 400 });
  }
  const normalized = normalizeRecord(collection, parsed.value.data as Record<string, unknown>);
  if ("error" in normalized) return NextResponse.json({ error: normalized.error }, { status: 400 });
  const { data, error } = await auth.session.client.from(cmsCollections[collection].table).insert(normalized.data).select("*").single();
  if (error) return NextResponse.json({ error: error.code === "23505" ? "That slug is already in use." : "Could not save this item." }, { status: 400 });
  revalidateCollection(collection);
  return NextResponse.json({ item: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  const auth = await authorize(request, true);
  if ("response" in auth) return auth.response;
  const parsed = await readJsonObject(request, 65_536);
  if (!parsed.ok) return NextResponse.json({ error: "Invalid or oversized content request." }, { status: 400 });
  const collection = typeof parsed.value.collection === "string" ? parsed.value.collection : "";
  const id = typeof parsed.value.id === "string" ? parsed.value.id : "";
  if (!isCmsCollection(collection) || !id || !parsed.value.data || typeof parsed.value.data !== "object" || Array.isArray(parsed.value.data)) {
    return NextResponse.json({ error: "Choose a valid item and provide content fields." }, { status: 400 });
  }
  const normalized = normalizeRecord(collection, parsed.value.data as Record<string, unknown>);
  if ("error" in normalized) return NextResponse.json({ error: normalized.error }, { status: 400 });
  const { data, error } = await auth.session.client.from(cmsCollections[collection].table).update(normalized.data).eq("id", id).select("*").single();
  if (error) return NextResponse.json({ error: error.code === "23505" ? "That slug is already in use." : "Could not update this item." }, { status: 400 });
  revalidateCollection(collection);
  return NextResponse.json({ item: data });
}

export async function DELETE(request: Request) {
  const auth = await authorize(request, true);
  if ("response" in auth) return auth.response;
  const parsed = await readJsonObject(request, 4_096);
  if (!parsed.ok) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const collection = typeof parsed.value.collection === "string" ? parsed.value.collection : "";
  const id = typeof parsed.value.id === "string" ? parsed.value.id : "";
  if (!isCmsCollection(collection) || !id) return NextResponse.json({ error: "Choose a valid item to delete." }, { status: 400 });
  const { error } = await auth.session.client.from(cmsCollections[collection].table).delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Could not delete this item." }, { status: 400 });
  revalidateCollection(collection);
  return NextResponse.json({ ok: true });
}
