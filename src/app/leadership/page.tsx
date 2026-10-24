import type { Metadata } from "next";
import Image from "next/image";
import { getPublishedContent, type PublicContentRecord } from "@/lib/public-content";
export const metadata: Metadata = { title: "Leadership" };
function text(item: PublicContentRecord, field: string) { return typeof item[field] === "string" ? item[field] as string : ""; }
export default async function Page() {
  const members = await getPublishedContent("leadership_members", 100);
  members.sort((a, b) => Number(a.display_order ?? 0) - Number(b.display_order ?? 0));
  return <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24"><header className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-widest text-[#24578E]">The people behind CPSAR</p><h1 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">Leadership team</h1><p className="mt-4 text-lg text-slate-600">Meet the leaders guiding the organization’s work.</p></header>{members.length ? <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{members.map((member) => <article key={member.id} className="overflow-hidden rounded-2xl border border-slate-200">{text(member, "image_url") && <Image src={text(member, "image_url")} alt={text(member, "name")} width={800} height={640} unoptimized className="h-64 w-full object-cover" />}<div className="p-6"><h2 className="text-xl font-bold">{text(member, "name")}</h2><p className="mt-1 font-medium text-[#24578E]">{text(member, "role")}</p>{text(member, "bio") && <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">{text(member, "bio")}</p>}</div></article>)}</div> : <p className="mt-10 rounded-xl bg-slate-50 p-6 text-slate-600">Leadership profiles will appear here when published.</p>}</main>;
}
