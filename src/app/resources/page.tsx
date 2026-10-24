import type { Metadata } from "next";
import { getPublishedContent, type PublicContentRecord } from "@/lib/public-content";

export const metadata: Metadata = { title: "Resources" };
function text(item: PublicContentRecord, field: string) { return typeof item[field] === "string" ? item[field] as string : ""; }

export default async function Page() {
  const resources = await getPublishedContent("resources", 200);
  const groups = new Map<string, PublicContentRecord[]>();
  for (const item of resources) { const category = text(item, "category") || "Documents"; groups.set(category, [...(groups.get(category) ?? []), item]); }
  return <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24"><header className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-widest text-[#24578E]">Learn and explore</p><h1 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">Resources</h1><p className="mt-4 text-lg text-slate-600">Browse published reports, research, policies, and other materials from CPSAR.</p></header>{resources.length ? <div className="mt-12 space-y-12">{Array.from(groups, ([category, items]) => <section key={category}><h2 className="text-2xl font-bold">{category}</h2><ul className="mt-5 grid gap-4 md:grid-cols-2">{items.map((item) => <li key={item.id} className="rounded-2xl border border-slate-200 p-6"><h3 className="text-lg font-bold">{text(item, "title")}</h3>{text(item, "summary") && <p className="mt-2 text-slate-600">{text(item, "summary")}</p>}{text(item, "body") && <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">{text(item, "body")}</p>}{text(item, "resource_url") ? <a href={text(item, "resource_url")} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-lg bg-[#24578E] px-4 py-2 font-semibold text-white">Open or download</a> : <p className="mt-4 text-sm text-slate-500">File not available yet.</p>}</li>)}</ul></section>)}</div> : <p className="mt-10 rounded-xl bg-slate-50 p-6 text-slate-600">No public resources have been added yet. Check back for reports, research, and policies.</p>}</main>;
}
