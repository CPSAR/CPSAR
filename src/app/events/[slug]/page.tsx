import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedBySlug } from "@/lib/public-content";
import { getContentGalleryImages } from "@/lib/programme-images";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const event = await getPublishedBySlug("events", slug);
  return { title: event && typeof event.title === "string" ? `${event.title} | CPSAR` : "Event | CPSAR" };
}
export default async function EventPage({ params }: Props) {
  const { slug } = await params; const event = await getPublishedBySlug("events", slug); if (!event) notFound();
  const text = (key: string) => typeof event[key] === "string" ? event[key] as string : "";
  const images = getContentGalleryImages(event);
  const date = text("starts_at") ? new Intl.DateTimeFormat("en", { dateStyle: "full", timeZone: "Africa/Kigali" }).format(new Date(text("starts_at"))) : "Date to be announced";
  return <main className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24"><Link href="/events" className="font-semibold text-[#24578E] underline">← All events</Link><article className="mt-8"><header className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-wider text-[#24578E]">{date}{text("location") ? ` · ${text("location")}` : ""}</p><h1 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">{text("title")}</h1>{text("summary") && <p className="mt-5 text-xl text-slate-600">{text("summary")}</p>}</header>{images.length > 0 && <section aria-label={`${text("title")} photo gallery`} className="mt-10"><h2 className="sr-only">Photo gallery</h2><ul className="grid gap-4 sm:grid-cols-2">{images.map((image, index) => <li key={`${image}-${index}`} className={`overflow-hidden rounded-2xl bg-slate-100 ${index === 0 ? "sm:col-span-2" : ""}`}><Image src={image} alt={`${text("title")} — photo ${index + 1}`} width={1400} height={900} unoptimized className={`w-full object-cover ${index === 0 ? "max-h-[34rem]" : "h-64"}`} /></li>)}</ul></section>}<div className="prose prose-slate mt-8 max-w-none whitespace-pre-wrap leading-7">{text("body")}</div></article></main>;
}
