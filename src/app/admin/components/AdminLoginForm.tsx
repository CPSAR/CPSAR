"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Sign in failed.");
      router.replace("/admin/overview");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not sign in. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <form onSubmit={submit} className="w-full max-w-md space-y-6 rounded-2xl bg-white p-7 shadow-lg sm:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#24578E]">CPSAR staff</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">Admin sign in</h1>
          <p className="mt-2 text-slate-600">Use your authorized staff account to manage the website.</p>
        </div>
        <label className="block text-sm font-medium text-slate-800">Email
          <input name="email" type="email" autoComplete="username" required className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5" />
        </label>
        <label className="block text-sm font-medium text-slate-800">Password
          <input name="password" type="password" autoComplete="current-password" required className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5" />
        </label>
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        <button disabled={busy} className="w-full rounded-lg bg-[#24578E] px-4 py-3 font-semibold text-white disabled:opacity-60">
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
