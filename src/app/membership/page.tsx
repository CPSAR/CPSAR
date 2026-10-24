import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, HeartHandshake, Users, Check } from "lucide-react";
export const metadata: Metadata = { title: "Membership" };
const benefits = [
  { icon: Users, title: "A connected community", description: "Connect with fellow psychology students and professionals." },
  { icon: BookOpen, title: "Learning and research", description: "Take part in learning, research, and community activities." },
  { icon: HeartHandshake, title: "A chance to contribute", description: "Contribute to the growth of psychology in Rwanda." },
];

export default function Page() {
  return (
    <main className="pt-[60px] lg:pt-[92px] text-slate-900">
      <section className="border-b border-slate-200 bg-[#f4f8fb]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_auto] lg:gap-16 lg:py-20">
          <header className="max-w-3xl">
            <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#24578E]"><span aria-hidden="true" className="h-px w-8 bg-[#71C0DF]" /> Get involved</p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-[#173a60] sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-display)" }}>Grow with the CPSAR community.</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">Membership is a way to connect with Rwanda&apos;s clinical psychology community and take part in its work.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#24578E] px-6 text-sm font-bold text-white transition-colors hover:bg-[#173a60] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#24578E]">Ask about joining <ArrowRight aria-hidden="true" className="size-4" /></Link>
              <Link href="/resources" className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#24578E]/30 px-6 text-sm font-semibold text-[#173a60] transition-colors hover:border-[#24578E] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#24578E]">Browse resources</Link>
            </div>
          </header>
          <aside aria-label="Membership at a glance" className="rounded-2xl bg-[#173a60] p-6 text-white shadow-lg shadow-[#173a60]/10 sm:p-8 lg:w-72">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9be0f5]">Membership</p>
            <p className="mt-4 text-2xl font-bold leading-snug" style={{ fontFamily: "var(--font-display)" }}>Connect, learn, and contribute.</p>
            <p className="mt-3 text-sm leading-6 text-blue-100">Reach out to the CPSAR team for current eligibility and application details.</p>
          </aside>
        </div>
      </section>

      <section aria-labelledby="membership-benefits-title" className="py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#24578E]">Why get involved</p>
            <h2 id="membership-benefits-title" className="mt-3 text-3xl font-bold tracking-tight text-[#173a60] sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>Make room for growth.</h2>
            <p className="mt-4 leading-7 text-slate-600">Membership brings opportunities to connect with the people and work shaping psychology in Rwanda.</p>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
            {benefits.map(({ icon: Icon, title, description }) => (
              <li key={title} className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7">
                <div className="flex size-11 items-center justify-center rounded-lg bg-[#24578E]/10 text-[#24578E]"><Icon aria-hidden="true" className="size-5" /></div>
                <h3 className="mt-5 text-lg font-bold text-[#173a60]" style={{ fontFamily: "var(--font-display)" }}>{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="membership-next-title" className="bg-slate-50 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#24578E]">Next steps</p>
            <h2 id="membership-next-title" className="mt-3 text-3xl font-bold tracking-tight text-[#173a60] sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>Get the details you need.</h2>
            <p className="mt-4 leading-7 text-slate-600">Eligibility, fees, and application steps can change. Contact CPSAR for the latest information before applying.</p>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex size-11 items-center justify-center rounded-lg bg-[#24578E]/10 text-[#24578E]"><Users aria-hidden="true" className="size-5" /></div>
              <h3 className="mt-5 text-xl font-bold text-[#173a60]" style={{ fontFamily: "var(--font-display)" }}>How to join</h3>
              <p className="mt-3 flex-1 leading-7 text-slate-600">Contact CPSAR to confirm current eligibility, membership fees, and the application process. The team can provide the latest registration information.</p>
              <Link href="/contact" className="mt-6 inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-[#24578E] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#24578E]">Ask about membership <ArrowRight aria-hidden="true" className="size-4" /></Link>
            </article>
            <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex size-11 items-center justify-center rounded-lg bg-[#24578E]/10 text-[#24578E]"><BookOpen aria-hidden="true" className="size-5" /></div>
              <h3 className="mt-5 text-xl font-bold text-[#173a60]" style={{ fontFamily: "var(--font-display)" }}>Membership resources</h3>
              <p className="mt-3 flex-1 leading-7 text-slate-600">Downloadable application forms and member documents are listed in the resources library when available.</p>
              <Link href="/resources" className="mt-6 inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-[#24578E] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#24578E]">Browse resources <ArrowRight aria-hidden="true" className="size-4" /></Link>
            </article>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm leading-6 text-slate-500"><Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#24578E]" />CPSAR can confirm the latest membership information directly.</p>
        </div>
      </section>
    </main>
  );
}
