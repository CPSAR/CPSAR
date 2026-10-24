import type { Metadata } from "next";
import Image from "next/image";
import { getPublishedContent, type PublicContentRecord } from "@/lib/public-content";

export const metadata: Metadata = { title: "Gallery" };
function text(item: PublicContentRecord, field: string) { return typeof item[field] === "string" ? item[field] as string : ""; }

export default async function GalleryPage() {
  const images = await getPublishedContent("gallery_items", 200);
  return <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24"><header className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-widest text-[#24578E]">CPSAR in action</p><h1 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">Gallery</h1><p className="mt-4 text-lg text-slate-600">Photos from CPSAR activities and community events.</p></header>{images.length ? <ul className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">{images.map((item) => <li key={item.id} className="mb-5 break-inside-avoid overflow-hidden rounded-2xl bg-slate-100">{text(item, "image_url") && <Image src={text(item, "image_url")} alt={text(item, "alt_text")} width={900} height={700} unoptimized className="h-auto w-full object-cover" />}<p className="p-4 text-sm text-slate-700">{text(item, "caption")}</p></li>)}</ul> : <p className="mt-10 rounded-xl bg-slate-50 p-6 text-slate-600">Activity photos will appear here as CPSAR publishes them.</p>}</main>;
}
