import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedBySlug } from "@/lib/public-content";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const item = await getPublishedBySlug("programmes", slug); return { title: item && typeof item.title === "string" ? `${item.title} | CPSAR Programs` : "Programs | CPSAR" }; }
export default async function Page({ params }: Props) { const { slug } = await params; const item = await getPublishedBySlug("programmes", slug); if (!item) notFound(); const value = (key: string) => typeof item[key] === "string" ? item[key] as string : ""; return <main className="mx-auto max-w-3xl px-5 py-16 sm:py-24"><Link href="/programs" className="font-semibold text-[#24578E] underline">← All programs</Link><h1 className="mt-8 text-4xl font-bold text-slate-950">{value("title")}</h1>{value("summary") && <p className="mt-5 text-xl text-slate-600">{value("summary")}</p>}<div className="mt-8 whitespace-pre-wrap leading-7 text-slate-800">{value("body")}</div></main>; }
