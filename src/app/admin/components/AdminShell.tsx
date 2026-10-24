"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { cmsCollections } from "@/lib/admin-cms";

const links = [
  ["/admin/overview", "Overview"],
  ...Object.entries(cmsCollections).map(([key, value]) => [`/admin/${key}`, value.label] as [string, string]),
  ["/admin/messages", "Contact messages"],
  ["/admin/subscribers", "Newsletter subscribers"],
];

export function AdminShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/api/admin/session").then(async (response) => {
      if (!response.ok) { router.replace("/admin/login"); return; }
      const data = await response.json();
      setEmail(data.user?.email ?? "Staff");
      setReady(true);
    }).catch(() => router.replace("/admin/login"));
  }, [router]);

  async function signOut() {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.replace("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 md:flex">
      <aside className="bg-[#173a60] p-4 text-white md:min-h-screen md:w-64 md:shrink-0 md:p-6">
        <Link href="/admin/overview" className="text-lg font-bold">CPSAR Admin</Link>
        <nav aria-label="Admin navigation" className="mt-5 flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible">
          {links.map(([href, label]) => <Link key={href} href={href} aria-current={path === href ? "page" : undefined} className={`shrink-0 rounded-lg px-3 py-2 text-sm ${path === href ? "bg-white font-semibold text-[#173a60]" : "text-blue-100 hover:bg-white/10"}`}>{label}</Link>)}
        </nav>
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/20 pt-4 md:block">
          <span className="truncate text-xs text-blue-100">{email || "Checking session…"}</span>
          <button onClick={signOut} className="mt-2 text-sm underline underline-offset-4">Sign out</button>
        </div>
        <Link href="/" className="mt-4 inline-block text-xs text-blue-100 underline">View public website</Link>
      </aside>
      <main className="min-w-0 flex-1 p-4 sm:p-8">{ready ? children : <p role="status" className="p-6 text-slate-600">Checking staff access…</p>}</main>
    </div>
  );
}
