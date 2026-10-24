import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedContent, type PublicContentRecord } from "@/lib/public-content";

export const metadata: Metadata = { title: "Events" };

function text(item: PublicContentRecord, field: string) { return typeof item[field] === "string" ? item[field] as string : ""; }
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.valueOf()) ? "Date to be announced" : new Intl.DateTimeFormat("en", { dateStyle: "full", timeZone: "Africa/Kigali" }).format(date); }
function currentTimestamp() { return Date.now(); }

export default async function Page() {
  const events = await getPublishedContent("events", 200);
  const datedEvents = events.filter((event) => Number.isFinite(Date.parse(text(event, "starts_at"))));
  const undated = events.filter((event) => !text(event, "starts_at") || !Number.isFinite(Date.parse(text(event, "starts_at"))));
  const upcoming = datedEvents.filter((event) => Date.parse(text(event, "starts_at")) >= currentTimestamp()).sort((a, b) => Date.parse(text(a, "starts_at")) - Date.parse(text(b, "starts_at")));
  const past = datedEvents.filter((event) => Date.parse(text(event, "starts_at")) < currentTimestamp()).sort((a, b) => Date.parse(text(b, "starts_at")) - Date.parse(text(a, "starts_at")));
  return <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24"><header className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-widest text-[#24578E]">Connect and participate</p><h1 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">Events</h1><p className="mt-4 text-lg text-slate-600">Explore CPSAR gatherings, learning opportunities, and community activities.</p></header><section className="mt-12"><h2 className="text-2xl font-bold">Upcoming events</h2>{upcoming.length ? <EventList events={upcoming} /> : <p className="mt-4 rounded-xl bg-slate-50 p-6 text-slate-600">There are no upcoming events with confirmed dates right now. Please check again soon.</p>}</section>{undated.length > 0 && <section className="mt-14"><h2 className="text-2xl font-bold">Dates to be confirmed</h2><p className="mt-2 text-slate-600">These published events do not have a confirmed start date yet.</p><EventList events={undated} /></section>}<section className="mt-14"><h2 className="text-2xl font-bold">Past events</h2>{past.length ? <EventList events={past} /> : <p className="mt-4 text-slate-600">Past events will be listed here.</p>}</section></main>;
}

function EventList({ events }: { events: PublicContentRecord[] }) { return <div className="mt-5 grid gap-5 md:grid-cols-2">{events.map((event) => <article key={event.id} className="rounded-2xl border border-slate-200 p-6"><p className="text-sm font-semibold text-[#24578E]">{formatDate(text(event, "starts_at"))}{text(event, "location") ? ` · ${text(event, "location")}` : ""}</p><h3 className="mt-3 text-xl font-bold"><Link className="hover:underline" href={`/events/${text(event, "slug")}`}>{text(event, "title")}</Link></h3><p className="mt-3 text-slate-600">{text(event, "summary")}</p><Link className="mt-4 inline-block font-semibold text-[#24578E] underline" href={`/events/${text(event, "slug")}`}>View event</Link></article>)}</div>; }
