import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedBySlug } from "@/lib/public-content";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const event = await getPublishedBySlug("events", slug);
  return { title: event && typeof event.title === "string" ? `${event.title} | CPSAR` : "Event | CPSAR" };
}
export default async function EventPage({ params }: Props) {
  const { slug } = await params; const event = await getPublishedBySlug("events", slug); if (!event) notFound();
  const text = (key: string) => typeof event[key] === "string" ? event[key] as string : "";
  const date = text("starts_at") ? new Intl.DateTimeFormat("en", { dateStyle: "full", timeZone: "Africa/Kigali" }).format(new Date(text("starts_at"))) : "Date to be announced";
  return <main className="mx-auto max-w-3xl px-5 py-16 sm:py-24"><Link href="/events" className="font-semibold text-[#24578E] underline">← All events</Link><article className="mt-8"><p className="text-sm font-bold uppercase tracking-wider text-[#24578E]">{date}{text("location") ? ` · ${text("location")}` : ""}</p><h1 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">{text("title")}</h1>{text("summary") && <p className="mt-5 text-xl text-slate-600">{text("summary")}</p>}<div className="prose prose-slate mt-8 max-w-none whitespace-pre-wrap leading-7">{text("body")}</div></article></main>;
}
