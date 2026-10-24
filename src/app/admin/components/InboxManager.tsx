"use client";

import { useCallback, useEffect, useState } from "react";

type Message = { id: number; name: string; email: string; subject?: string; message: string; created_at: string; read_at?: string | null; archived_at?: string | null };

export function InboxManager() {
  const [items, setItems] = useState<Message[]>([]);
  const [view, setView] = useState("inbox");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const load = useCallback(async () => {
    setLoading(true); setError("");
    try { const response = await fetch(`/api/admin/messages?filter=${view}`); const result = await response.json(); if (!response.ok) throw new Error(result.error || "Could not load messages."); setItems(result.messages ?? []); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not load messages."); }
    finally { setLoading(false); }
  }, [view]);
  useEffect(() => { void load(); }, [load]);
  async function action(message: Message, action: string) {
    setError(""); setNotice("");
    try { const response = await fetch("/api/admin/messages", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: message.id, action }) }); const result = await response.json(); if (!response.ok) throw new Error(result.error || "Could not update message."); setNotice("Message updated."); await load(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not update message."); }
  }
  async function remove(message: Message) {
    if (!window.confirm("Permanently delete this contact message?")) return;
    try { const response = await fetch("/api/admin/messages", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: message.id }) }); const result = await response.json(); if (!response.ok) throw new Error(result.error || "Could not delete message."); setNotice("Message deleted."); await load(); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Could not delete message."); }
  }
  return <>
    <header className="mb-6"><h1 className="text-3xl font-bold">Contact messages</h1><p className="mt-2 text-slate-600">Review enquiries sent through the website contact form.</p></header>
    <div className="mb-5 flex gap-2" role="group" aria-label="Message view">{[["inbox", "Inbox"], ["archived", "Archived"], ["all", "All"]].map(([value, label]) => <button key={value} aria-pressed={view === value} onClick={() => setView(value)} className={`rounded-lg px-4 py-2 text-sm ${view === value ? "bg-[#24578E] text-white" : "bg-white text-slate-700"}`}>{label}</button>)}</div>
    {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-red-800">{error}</p>}{notice && <p role="status" className="mb-4 rounded-lg bg-green-50 p-3 text-green-800">{notice}</p>}
    {loading ? <p role="status">Loading messages…</p> : items.length === 0 ? <p className="rounded-xl bg-white p-8 text-center text-slate-600">No messages in this view.</p> : <div className="space-y-4">{items.map((item) => <article key={item.id} className={`rounded-xl bg-white p-5 shadow-sm ${item.read_at ? "" : "border-l-4 border-[#71C0DF]"}`}><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-bold">{item.subject || "Website enquiry"}</h2><p className="mt-1 text-sm text-slate-600">{item.name} · <a className="text-[#24578E] underline" href={`mailto:${encodeURIComponent(item.email)}`}>{item.email}</a> · {new Date(item.created_at).toLocaleString()}</p></div><span className="text-xs text-slate-500">{item.read_at ? "Read" : "Unread"}{item.archived_at ? " · Archived" : ""}</span></div><p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-800">{item.message}</p><div className="mt-4 flex flex-wrap gap-3">{!item.read_at && <button onClick={() => void action(item, "read")} className="text-sm text-[#24578E] underline">Mark read</button>}{item.read_at && <button onClick={() => void action(item, "unread")} className="text-sm text-[#24578E] underline">Mark unread</button>}<button onClick={() => void action(item, item.archived_at ? "unarchive" : "archive")} className="text-sm text-[#24578E] underline">{item.archived_at ? "Move to inbox" : "Archive"}</button><button onClick={() => void remove(item)} className="text-sm text-red-700 underline">Delete</button></div></article>)}</div>}
  </>;
}
