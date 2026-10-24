import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedBySlug } from "@/lib/public-content";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const article = await getPublishedBySlug("news_articles", slug);
  return { title: article && typeof article.title === "string" ? `${article.title} | CPSAR News` : "News | CPSAR" };
}
export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params; const article = await getPublishedBySlug("news_articles", slug); if (!article) notFound();
  const text = (key: string) => typeof article[key] === "string" ? article[key] as string : "";
  return <main className="mx-auto max-w-3xl px-5 py-16 sm:py-24"><Link href="/news" className="font-semibold text-[#24578E] underline">← All news</Link><article className="mt-8"><p className="text-sm font-semibold text-[#24578E]">{text("category")}{text("published_at") ? ` · ${new Date(text("published_at")).toLocaleDateString()}` : ""}</p><h1 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">{text("title")}</h1>{text("summary") && <p className="mt-5 text-xl text-slate-600">{text("summary")}</p>}{text("author") && <p className="mt-4 text-sm text-slate-500">By {text("author")}</p>}<div className="mt-8 whitespace-pre-wrap leading-7 text-slate-800">{text("body")}</div></article></main>;
}
