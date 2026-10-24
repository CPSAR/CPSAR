import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedContent, type PublicContentRecord } from "@/lib/public-content";

export const metadata: Metadata = { title: "News" };

function text(item: PublicContentRecord, field: string) { return typeof item[field] === "string" ? item[field] as string : ""; }
function currentTimestamp() { return Date.now(); }
export default async function Page() {
  const articles = (await getPublishedContent("news_articles", 100)).filter((item) => !text(item, "published_at") || Date.parse(text(item, "published_at")) <= currentTimestamp()).sort((a, b) => Date.parse(text(b, "published_at") || text(b, "created_at")) - Date.parse(text(a, "published_at") || text(a, "created_at")));
  return <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24"><header className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-widest text-[#24578E]">What’s happening</p><h1 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">News and stories</h1><p className="mt-4 text-lg text-slate-600">Updates, perspectives, and announcements from CPSAR and its community.</p></header>{articles.length ? <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{articles.map((article) => <article key={article.id} className="rounded-2xl border border-slate-200 p-6"><p className="text-sm text-slate-500">{text(article, "published_at") ? new Date(text(article, "published_at")).toLocaleDateString() : ""}{text(article, "category") ? ` · ${text(article, "category")}` : ""}</p><h2 className="mt-3 text-xl font-bold"><Link href={`/news/${text(article, "slug")}`} className="hover:underline">{text(article, "title")}</Link></h2><p className="mt-3 text-slate-600">{text(article, "summary")}</p><Link className="mt-4 inline-block font-semibold text-[#24578E] underline" href={`/news/${text(article, "slug")}`}>Read article</Link></article>)}</div> : <p className="mt-10 rounded-xl bg-slate-50 p-6 text-slate-600">There are no news articles published yet.</p>}</main>;
}
