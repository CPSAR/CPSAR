"use client";

import { useCallback, useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { cmsCollections, type CmsCollection } from "@/lib/admin-cms";

type Item = Record<string, string | number | boolean | null | string[]> & { id: string };
const labels: Record<string, string> = {
  title: "Title", name: "Name", slug: "URL slug", summary: "Summary", body: "Full text", category: "Category", location: "Location", starts_at: "Starts", ends_at: "Ends", published_at: "Publish date", author: "Author", role: "Role", bio: "Biography", quote: "Story / quote", image_url: "Content image", gallery_images: "Programme photo gallery", logo_url: "Logo URL", website: "Website", resource_url: "Document URL", graduation_year: "Graduation year", current_role: "Current role", display_order: "Display order",
};
const multiline = new Set(["body", "bio", "summary", "quote"]);
const booleans = new Set(["published", "featured"]);

async function optimizeImageForUpload(file: File) {
  const bitmap = await createImageBitmap(file);
  const encode = async (maxDimension: number, quality: number) => {
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("This browser could not prepare the image. Try a JPG, PNG, or WebP file.");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", quality));
    if (!blob) throw new Error("This image could not be prepared. Try another file.");
    return blob;
  };

  try {
    let blob = await encode(2560, 0.88);
    if (blob.size > 4 * 1024 * 1024) blob = await encode(1920, 0.82);
    if (blob.size > 4 * 1024 * 1024) blob = await encode(1600, 0.76);
    if (blob.size > 4 * 1024 * 1024) throw new Error("This image is still too large after optimization. Choose a smaller image.");
    const filename = file.name.replace(/\.[^.]+$/, "") || "cpsar-image";
    return new File([blob], `${filename}.webp`, { type: "image/webp" });
  } finally {
    bitmap.close();
  }
}

function ProgrammeGalleryField({
  images,
  busy,
  upload,
  onChange,
  onBusyChange,
  onError,
}: {
  images: string[];
  busy: boolean;
  upload: (file: File, kind: "image") => Promise<string>;
  onChange: (images: string[]) => void;
  onBusyChange: (busy: boolean) => void;
  onError: (message: string) => void;
}) {
  async function addFiles(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const files = Array.from(input.files ?? []);
    input.value = "";
    if (!files.length) return;
    if (images.length + files.length > 24) {
      onError("A programme gallery can contain up to 24 photos.");
      return;
    }

    onBusyChange(true);
    onError("");
    try {
      const uploaded: string[] = [];
      for (const file of files) uploaded.push(await upload(file, "image"));
      onChange([...images, ...uploaded]);
    } catch (cause) {
      onError(cause instanceof Error ? cause.message : "Could not upload the gallery photos.");
    } finally {
      onBusyChange(false);
    }
  }

  return (
    <div className="mt-1.5 space-y-3 sm:col-span-2">
      <input type="hidden" name="gallery_images" value={JSON.stringify(images)} />
      <p className="text-sm text-slate-600">Upload several photos to show a gallery on this programme’s public page.</p>
      <input type="file" accept="image/png,image/jpeg,image/webp" multiple disabled={busy || images.length >= 24} aria-label="Upload programme gallery photos" className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:font-semibold file:text-[#173a60]" onChange={addFiles} />
      <p className="text-xs text-slate-500">JPG, PNG, or WebP. Photos are optimized before upload. Maximum 24 photos.</p>
      {images.length > 0 && <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{images.map((image, index) => <li key={`${image}-${index}`} className="relative overflow-hidden rounded-lg border border-slate-200"><img src={image} alt={`Programme gallery photo ${index + 1}`} className="h-32 w-full object-cover" /><button type="button" disabled={busy} onClick={() => onChange(images.filter((_, imageIndex) => imageIndex !== index))} className="absolute right-2 top-2 rounded-md bg-white/95 px-2 py-1 text-xs font-semibold text-slate-800 shadow hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#24578E]" aria-label={`Remove photo ${index + 1}`}>Remove</button></li>)}</ul>}
    </div>
  );
}

export function ContentManager({ collection }: { collection: CmsCollection }) {
  const config = cmsCollections[collection];
  const [items, setItems] = useState<Item[]>([]);
  const [editing, setEditing] = useState<Item | null>(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/admin/content?collection=${collection}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load content.");
      setItems(data.items ?? []);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not load content."); }
    finally { setLoading(false); }
  }, [collection]);
  useEffect(() => { const timer = window.setTimeout(() => void load(), 0); return () => window.clearTimeout(timer); }, [load]);

  const fields = useMemo(() => config.fields as readonly string[], [config.fields]);
  function newItem() {
    const initial: Item = { id: "" };
    fields.forEach((field) => { initial[field] = booleans.has(field) ? false : field === "gallery_images" ? [] : ""; });
    initial.published = false;
    setEditing(initial); setNotice(""); setError("");
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!editing) return;
    setBusy(true); setError(""); setNotice("");
    const form = new FormData(event.currentTarget);
    const data: Record<string, unknown> = {};
    fields.forEach((field) => {
      if (booleans.has(field)) data[field] = form.get(field) === "on";
      else if (field === "gallery_images") {
        try { data[field] = JSON.parse(String(form.get(field) ?? "[]")); }
        catch { data[field] = []; }
      } else {
        const value = String(form.get(field) ?? "");
        data[field] = field.endsWith("_at") && value ? new Date(value).toISOString() : value;
      }
    });
    try {
      const response = await fetch("/api/admin/content", { method: editing.id ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ collection, ...(editing.id ? { id: editing.id } : {}), data }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save content.");
      setEditing(null); setNotice("Changes saved."); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not save content."); }
    finally { setBusy(false); }
  }

  async function remove(item: Item) {
    if (!window.confirm(`Permanently delete “${item.title ?? item.name ?? "this item"}”?`)) return;
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/content", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ collection, id: item.id }) });
      const result = await response.json(); if (!response.ok) throw new Error(result.error || "Could not delete item.");
      setNotice("Item deleted."); await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not delete item."); }
    finally { setBusy(false); }
  }

  async function upload(file: File, kind: "document" | "partner-logo" | "image" = "document") {
    const uploadFile = kind === "image" ? await optimizeImageForUpload(file) : file;
    const form = new FormData(); form.set("file", uploadFile); form.set("kind", kind);
    const response = await fetch("/api/admin/upload", { method: "POST", body: form });
    const result = await response.json(); if (!response.ok) throw new Error(result.error || "Upload failed.");
    return result.url as string;
  }

  return <>
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-wider text-[#24578E]">Website content</p><h1 className="mt-1 text-3xl font-bold">{config.label}</h1><p className="mt-2 text-slate-600">Create, edit, publish, or remove {config.label.toLowerCase()}.</p></div><button onClick={newItem} className="rounded-lg bg-[#24578E] px-4 py-2.5 font-semibold text-white">Add {config.label.replace(/s$/, "")}</button></header>
    {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-red-800">{error}</p>}{notice && <p role="status" className="mb-4 rounded-lg bg-green-50 p-3 text-green-800">{notice}</p>}
    {editing && <form onSubmit={save} className="mb-7 grid gap-4 rounded-xl bg-white p-5 shadow-sm sm:grid-cols-2">
      <h2 className="text-xl font-bold sm:col-span-2">{editing.id ? "Edit item" : "New item"}</h2>
      {fields.map((field) => booleans.has(field) ? <label key={field} className="flex items-center gap-2 text-sm font-medium sm:col-span-2"><input type="checkbox" name={field} defaultChecked={Boolean(editing[field])} className="size-4 accent-[#24578E]" />{field === "published" ? "Published on the public website" : "Feature this item"}</label> : <label key={field} className={`block text-sm font-medium text-slate-700 ${multiline.has(field) ? "sm:col-span-2" : ""}`}>{labels[field] ?? field}
        {field === "gallery_images" && collection === "programmes" ? <ProgrammeGalleryField images={Array.isArray(editing.gallery_images) ? editing.gallery_images.filter((image): image is string => typeof image === "string") : typeof editing.image_url === "string" && editing.image_url ? [editing.image_url] : []} busy={busy} upload={upload} onChange={(images) => setEditing((current) => current ? { ...current, gallery_images: images } : current)} onBusyChange={setBusy} onError={setError} /> : field === "image_url" ? <div className="mt-1.5 space-y-3"><input name={field} defaultValue={String(editing[field] ?? "")} placeholder="Paste an image URL or upload a file below" className="w-full rounded-lg border border-slate-300 px-3 py-2" required={config.required.includes(field as never)} /><p className="text-xs font-semibold text-[#173a60]">Upload an image from your device</p><input type="file" accept="image/png,image/jpeg,image/webp" aria-label="Upload image" className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:font-semibold file:text-[#173a60]" onChange={async (event) => { const file = event.currentTarget.files?.[0]; if (!file) return; const input = event.currentTarget.form?.elements.namedItem(field) as HTMLInputElement; setBusy(true); setError(""); try { const url = await upload(file, "image"); if (input) input.value = url; setEditing((current) => current ? { ...current, image_url: url } : current); } catch (cause) { setError(cause instanceof Error ? cause.message : "Upload failed."); } finally { setBusy(false); } }} />{typeof editing.image_url === "string" && editing.image_url && <img src={editing.image_url} alt={`${String(editing.name ?? editing.title ?? "Content")} preview`} className="max-h-56 w-auto rounded-xl border border-slate-200 object-cover" />}<p className="text-xs text-slate-500">JPG, PNG, or WebP. Large photos are optimized automatically before upload.</p></div> : field === "resource_url" ? <div className="mt-1.5 space-y-2"><input name={field} defaultValue={String(editing[field] ?? "")} placeholder="https://… or /path" className="w-full rounded-lg border border-slate-300 px-3 py-2" /><input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" aria-label="Upload document" className="block w-full text-sm" onChange={async (event) => { const file = event.target.files?.[0]; if (!file) return; const input = event.currentTarget.form?.elements.namedItem(field) as HTMLInputElement; setBusy(true); setError(""); try { const url = await upload(file); if (input) input.value = url; } catch (cause) { setError(cause instanceof Error ? cause.message : "Upload failed."); } finally { setBusy(false); } }} /></div> : field === "logo_url" && collection === "partners" ? <div className="mt-1.5 space-y-3"><input name={field} defaultValue={String(editing[field] ?? "")} placeholder="Logo URL (or upload below)" className="w-full rounded-lg border border-slate-300 px-3 py-2" /><input type="file" accept="image/png,image/jpeg,image/webp" aria-label="Upload partner logo" className="block w-full text-sm" onChange={async (event) => { const file = event.currentTarget.files?.[0]; if (!file) return; const input = event.currentTarget.form?.elements.namedItem(field) as HTMLInputElement; setBusy(true); setError(""); try { const url = await upload(file, "partner-logo"); if (input) input.value = url; setEditing((current) => current ? { ...current, logo_url: url } : current); } catch (cause) { setError(cause instanceof Error ? cause.message : "Upload failed."); } finally { setBusy(false); } }} />{typeof editing.logo_url === "string" && editing.logo_url && <img src={editing.logo_url} alt="Current partner logo preview" className="h-16 max-w-48 rounded border border-slate-200 bg-white p-2 object-contain" />}<p className="text-xs text-slate-500">PNG, JPG, or WebP, up to 5 MB. Uploaded files are stored in CPSAR media storage.</p></div> : multiline.has(field) ? <textarea name={field} defaultValue={String(editing[field] ?? "")} rows={field === "body" || field === "bio" ? 7 : 3} maxLength={20_000} className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2" /> : <input name={field} type={field.endsWith("_at") ? "datetime-local" : field === "graduation_year" || field === "display_order" ? "number" : "text"} defaultValue={field.endsWith("_at") && editing[field] ? new Date(String(editing[field])).toISOString().slice(0, 16) : String(editing[field] ?? "")} required={config.required.includes(field as never)} className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2" />}
      </label>)}
      <div className="flex gap-3 sm:col-span-2"><button disabled={busy} className="rounded-lg bg-[#24578E] px-4 py-2 text-white disabled:opacity-60">{busy ? "Saving…" : "Save"}</button><button type="button" onClick={() => setEditing(null)} className="rounded-lg border px-4 py-2">Cancel</button></div>
    </form>}
    {loading ? <p role="status" className="text-slate-600">Loading content…</p> : items.length === 0 ? <p className="rounded-xl bg-white p-8 text-center text-slate-600">No content yet. Add the first item when it is ready for the website.</p> : <div className="space-y-3">{items.map((item) => <article key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-sm"><div className="min-w-0"><h2 className="truncate font-semibold">{String(item.title ?? item.name ?? "Untitled")}</h2><p className="mt-1 text-sm text-slate-600">{String(item.summary ?? item.role ?? item.category ?? "")}</p></div><div className="flex items-center gap-3"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.published ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"}`}>{item.published ? "Published" : "Draft"}</span><button onClick={() => { setEditing(item); setNotice(""); setError(""); }} className="text-sm font-medium text-[#24578E] underline">Edit</button><button disabled={busy} onClick={() => void remove(item)} className="text-sm font-medium text-red-700 underline disabled:opacity-50">Delete</button></div></article>)}</div>}
  </>;
}
