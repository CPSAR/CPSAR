import type { Metadata } from "next";
import Image from "next/image";
import { getPublishedContent, type PublicContentRecord } from "@/lib/public-content";
export const metadata: Metadata = { title: "Official Partners" };
function text(item: PublicContentRecord, field: string) { return typeof item[field] === "string" ? item[field] as string : ""; }
export default async function Page() {
  const items = await getPublishedContent("partners", 200);
  items.sort((a, b) => Number(a.display_order ?? 0) - Number(b.display_order ?? 0));
  const partnerEntries = items.map((item) => ({ name: text(item, "name"), item }));

  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
      <header className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-widest text-[#24578E]">Collaboration</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">Official partners</h1>
        <p className="mt-4 text-lg text-slate-600">Organizations whose partnership details have been published by CPSAR.</p>
      </header>
      {partnerEntries.length > 0 ? <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {partnerEntries.map(({ name, item }) => (
          <li key={item?.id ?? name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {item && text(item, "logo_url") && (text(item, "website") ? <a href={text(item, "website")} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${name} website`} className="mb-5 inline-flex rounded-lg outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#24578E]"><Image src={text(item, "logo_url")} alt={`${name} logo`} width={192} height={64} unoptimized className="h-16 max-w-48 object-contain object-left" /></a> : <Image src={text(item, "logo_url")} alt={`${name} logo`} width={192} height={64} unoptimized className="mb-5 h-16 max-w-48 object-contain object-left" />)}
            <h2 className="text-xl font-bold text-slate-950">{name}</h2>
            {item && text(item, "summary") && <p className="mt-2 leading-6 text-slate-600">{text(item, "summary")}</p>}
            {item && text(item, "website") && <a href={text(item, "website")} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold text-[#24578E] underline">Visit partner website</a>}
            {!(item && text(item, "logo_url")) && <p className="mt-4 text-sm text-slate-500">Partner logo coming soon.</p>}
          </li>
        ))}
      </ul> : <p className="mt-10 rounded-xl bg-slate-50 p-6 text-slate-600">Partner information will appear here when CPSAR publishes approved details.</p>}
    </main>
  );
}
