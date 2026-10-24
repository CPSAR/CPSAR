import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedContent, type PublicContentRecord } from "@/lib/public-content";

export const metadata: Metadata = { title: "Programs" };
function text(item: PublicContentRecord, field: string) { return typeof item[field] === "string" ? item[field] as string : ""; }
export default async function Page() {
  const programs = await getPublishedContent("programmes", 100);
  return <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24"><header className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-widest text-[#24578E]">What we do</p><h1 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">Programs and activities</h1><p className="mt-4 text-lg text-slate-600">Explore CPSAR’s published learning, research, and community activities.</p></header>{programs.length ? <div className="mt-12 grid gap-6 md:grid-cols-2">{programs.map((program) => <article key={program.id} className="rounded-2xl border border-slate-200 p-6"><h2 className="text-2xl font-bold"><Link href={`/programs/${text(program, "slug")}`} className="hover:underline">{text(program, "title")}</Link></h2><p className="mt-3 text-slate-600">{text(program, "summary")}</p><Link href={`/programs/${text(program, "slug")}`} className="mt-5 inline-block font-semibold text-[#24578E] underline">Learn more</Link></article>)}</div> : <p className="mt-10 rounded-xl bg-slate-50 p-6 text-slate-600">Program information will appear here once published.</p>}</main>;
}
