import type { ReactNode } from "react";

export function LegalPage({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-[60vh] bg-[#f5f9fc] px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <header className="relative isolate overflow-hidden rounded-[2rem] bg-[#14365F] px-6 py-10 text-white sm:px-10 sm:py-14">
          <div aria-hidden="true" className="absolute -right-20 -top-32 -z-10 h-80 w-80 rounded-full border border-white/10 sm:h-[28rem] sm:w-[28rem]" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#83dcf1]">CPSAR · Information</p>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-blue-100 sm:text-lg">{lead}</p>
          <p className="mt-6 text-xs text-blue-100/75">Last updated: 19 November 2026</p>
        </header>
        <article className="legal-copy mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          {children}
        </article>
      </div>
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="mt-9 first:mt-0"><h2 className="text-xl font-bold tracking-tight text-[#14365F] sm:text-2xl">{title}</h2><div className="mt-3 space-y-4 text-sm leading-7 text-slate-700 sm:text-base">{children}</div></section>;
}
