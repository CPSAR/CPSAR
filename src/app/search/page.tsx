import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { getPublishedContent, type PublicContentRecord } from "@/lib/public-content";

export const metadata: Metadata = { title: "Search CPSAR" };

const pages = [
  { title: "About CPSAR", href: "/about", description: "Our story, mission, and the association." },
  { title: "Programmes", href: "/programs", description: "Programmes, learning, and professional development." },
  { title: "Events", href: "/events", description: "Upcoming activities, events, and conferences." },
  { title: "Resources", href: "/resources", description: "Research, study materials, and downloadable resources." },
  { title: "News and updates", href: "/news", description: "Latest CPSAR news and announcements." },
  { title: "Leadership", href: "/leadership", description: "CPSAR leadership and team profiles." },
  { title: "Membership", href: "/membership", description: "Membership information and opportunities." },
  { title: "Partners", href: "/partners", description: "CPSAR partner organizations." },
  { title: "Gallery", href: "/gallery", description: "Photos from CPSAR activities." },
  { title: "Alumni", href: "/alumni", description: "Connect with the CPSAR alumni community." },
  { title: "Contact", href: "/contact", description: "Contact the CPSAR team." },
];

const searchableTables = [
  { table: "programmes", label: "Programme", href: (item: PublicContentRecord) => `/programs/${text(item, "slug")}` },
  { table: "events", label: "Event", href: (item: PublicContentRecord) => `/events/${text(item, "slug")}` },
  { table: "news_articles", label: "News", href: (item: PublicContentRecord) => `/news/${text(item, "slug")}` },
  { table: "resources", label: "Resource", href: () => "/resources" },
  { table: "partners", label: "Partner", href: () => "/partners" },
  { table: "leadership_members", label: "Team", href: () => "/leadership" },
  { table: "alumni_members", label: "Alumni", href: () => "/alumni" },
  { table: "gallery_items", label: "Gallery", href: () => "/gallery" },
];

function text(item: PublicContentRecord, key: string) {
  return typeof item[key] === "string" ? item[key] as string : "";
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const params = await searchParams;
  const rawQuery = typeof params.q === "string" ? params.q : "";
  const query = rawQuery.trim().slice(0, 100);
  const needle = query.toLocaleLowerCase();

  const contentGroups = query
    ? await Promise.all(searchableTables.map(async (collection) => ({
        ...collection,
        items: await getPublishedContent(collection.table, 100),
      })))
    : [];

  const matchingPages = query ? pages.filter((page) => `${page.title} ${page.description}`.toLocaleLowerCase().includes(needle)) : [];
  const matchingContent = contentGroups.flatMap((group) => group.items
    .filter((item) => ["title", "name", "summary", "body", "bio", "role", "category", "caption", "alt_text"].some((field) => text(item, field).toLocaleLowerCase().includes(needle)))
    .map((item) => ({
      title: text(item, "title") || text(item, "name") || text(item, "caption") || group.label,
      description: text(item, "summary") || text(item, "role") || text(item, "category") || text(item, "caption"),
      label: group.label,
      href: group.href(item),
    })));

  const results = [...matchingPages.map((page) => ({ ...page, label: "Page" })), ...matchingContent].slice(0, 40);

  return (
    <main className="mx-auto min-h-[65vh] max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
      <header className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#24578E]">Find your way</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#14365F] sm:text-5xl">Search CPSAR</h1>
        <p className="mt-4 text-lg leading-7 text-slate-600">Search pages, programmes, events, news, and published resources.</p>
      </header>

      <form action="/search" className="mt-8 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="site-search" className="sr-only">Search the website</label>
        <div className="relative flex-1">
          <Search aria-hidden="true" className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
          <input id="site-search" name="q" type="search" defaultValue={query} maxLength={100} placeholder="What are you looking for?" className="min-h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base text-slate-900 outline-none focus:border-[#24578E] focus:ring-2 focus:ring-[#5BC0DE]/40" />
        </div>
        <button className="min-h-12 rounded-xl bg-[#14365F] px-6 font-semibold text-white transition hover:bg-[#24578E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14365F]">Search</button>
      </form>

      {query && <section aria-live="polite" className="mt-10">
        <h2 className="text-lg font-bold text-slate-900">{results.length ? `${results.length} results for “${query}”` : `No results for “${query}”`}</h2>
        {results.length ? <ul className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5">
          {results.map((result, index) => <li key={`${result.href}-${result.title}-${index}`} className="py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#24578E]">{result.label}</p>
            <Link href={result.href} className="mt-1 inline-block text-lg font-semibold text-[#14365F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24578E]">{result.title}</Link>
            {result.description && <p className="mt-1 text-sm leading-6 text-slate-600">{result.description}</p>}
          </li>)}
        </ul> : <p className="mt-4 rounded-xl bg-slate-50 p-5 text-slate-600">Try another word or browse the navigation links.</p>}
      </section>}
    </main>
  );
}
