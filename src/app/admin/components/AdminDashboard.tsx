"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cmsCollections } from "@/lib/admin-cms";

type Stats = { content: Record<string, number>; unreadMessages: number; subscribers: number };

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("/api/admin/stats").then(async (response) => {
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load the overview.");
      setStats(data);
    }).catch((cause) => setError(cause instanceof Error ? cause.message : "Could not load the overview."));
  }, []);

  return <>
    <header className="mb-8"><p className="text-sm font-semibold uppercase tracking-wider text-[#24578E]">Website management</p><h1 className="mt-1 text-3xl font-bold">Overview</h1><p className="mt-2 text-slate-600">A live snapshot of published content and visitor enquiries.</p></header>
    {error && <p role="alert" className="mb-5 rounded-lg bg-red-50 p-4 text-red-800">{error}</p>}
    {!stats && !error && <p role="status" className="mb-5 text-slate-600">Loading website activity…</p>}
    <section aria-label="Website statistics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Stat title="Unread messages" count={stats?.unreadMessages} href="/admin/messages" />
      <Stat title="Newsletter subscribers" count={stats?.subscribers} href="/admin/subscribers" />
      {Object.entries(cmsCollections).map(([key, item]) => <Stat key={key} title={`Published ${item.label.toLowerCase()}`} count={stats?.content[key]} href={`/admin/${key}`} />)}
    </section>
    <section className="mt-8 rounded-xl bg-white p-6 shadow-sm"><h2 className="text-lg font-bold">Quick actions</h2><div className="mt-4 flex flex-wrap gap-3"><Link className="rounded-lg bg-[#24578E] px-4 py-2 text-white" href="/admin/events">Manage events</Link><Link className="rounded-lg border border-slate-300 px-4 py-2" href="/admin/articles">Write an article</Link><Link className="rounded-lg border border-slate-300 px-4 py-2" href="/admin/resources">Add a resource</Link></div></section>
  </>;
}

function Stat({ title, count, href }: { title: string; count?: number | null; href: string }) {
  return <Link href={href} className="rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md"><p className="text-sm text-slate-600">{title}</p><p className="mt-2 text-3xl font-bold">{count == null ? "—" : count}</p><span className="mt-3 inline-block text-sm font-medium text-[#24578E]">Open →</span></Link>;
}
