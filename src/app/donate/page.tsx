import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, HandHeart, HeartHandshake, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Donate to CPSAR",
  description: "Support CPSAR’s work in psychology education, research, and community engagement in Rwanda.",
};

const priorities = [
  {
    icon: BookOpenCheck,
    title: "Learning and professional growth",
    description: "Help create opportunities for clinical psychology students to learn, connect, and develop their skills.",
  },
  {
    icon: HeartHandshake,
    title: "Community engagement",
    description: "Support activities that bring mental health education and conversation into the community.",
  },
  {
    icon: HandHeart,
    title: "Research and advocacy",
    description: "Contribute to student research and a stronger collective voice for psychology in Rwanda.",
  },
];

export default function DonatePage() {
  return (
    <main className="bg-white">
      <section className="bg-[#f3f7fb] pt-32 sm:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-14 sm:px-8 sm:pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#24578E]">Support CPSAR</p>
            <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-[#173a60] sm:text-5xl lg:text-6xl">
              Help strengthen psychology in Rwanda.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Your support can help CPSAR create learning opportunities, contribute to research, and connect students with community mental health work.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#24578E] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#173a60] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#24578E]">
                Ask how to donate <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <a href="tel:+250788418232" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#24578E]/25 bg-white px-5 py-3 text-sm font-semibold text-[#173a60] transition-colors hover:bg-[#e8f1f8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#24578E]">
                Call CPSAR
              </a>
            </div>
          </div>
          <div className="relative min-h-72 overflow-hidden rounded-2xl sm:min-h-96">
            <Image
              src="/images/HagyImagesStudio0782569627(90).jpg"
              alt="CPSAR community members taking part in an activity together"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#102c49]/60 via-transparent to-transparent" aria-hidden="true" />
            <p className="absolute bottom-5 left-5 right-5 max-w-md text-sm font-medium leading-6 text-white sm:bottom-7 sm:left-7">
              Supporting the people and ideas that advance mental health in Rwanda.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="support-priorities">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#24578E]">Where support helps</p>
          <h2 id="support-priorities" className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Invest in a stronger psychology community.</h2>
          <p className="mt-4 leading-7 text-slate-600">Contributions can help CPSAR continue its work across education, research, and community engagement.</p>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {priorities.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="flex size-11 items-center justify-center rounded-xl bg-[#e8f3fb] text-[#24578E]">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f8fafc]" aria-labelledby="donation-process">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#24578E]">A clear next step</p>
            <h2 id="donation-process" className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Talk with our team before you give.</h2>
            <p className="mt-4 leading-7 text-slate-600">CPSAR can confirm current donation methods, any active fundraising priorities, and how to document your contribution.</p>
          </div>
          <ol className="space-y-4">
            {[
              ["01", "Get in touch", "Tell CPSAR whether you are considering a financial contribution, in-kind support, or a collaboration."],
              ["02", "Confirm the details", "Ask the team to confirm the current process, intended use, and any relevant terms before proceeding."],
              ["03", "Agree on follow-up", "If you need an acknowledgement or update, discuss that with CPSAR when arranging your support."],
            ].map(([number, title, detail]) => (
              <li key={number} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
                <span className="pt-0.5 text-sm font-bold tracking-wider text-[#24578E]">{number}</span>
                <div>
                  <h3 className="font-bold text-slate-950">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20" aria-labelledby="donation-faq">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#24578E]">Good to know</p>
        <h2 id="donation-faq" className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Donation questions</h2>
        <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
          <details className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">How can I make a donation?<span aria-hidden="true" className="text-xl text-[#24578E] transition-transform group-open:rotate-45">+</span></summary>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Contact CPSAR to confirm the current donation options and instructions. The team can also discuss in-kind contributions and organizational support.</p>
          </details>
          <details className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">Can I support a specific activity?<span aria-hidden="true" className="text-xl text-[#24578E] transition-transform group-open:rotate-45">+</span></summary>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Ask CPSAR about current priorities and whether a contribution can be directed to a particular activity. Confirm any conditions with the team before making a contribution.</p>
          </details>
          <details className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">Can organizations discuss a partnership?<span aria-hidden="true" className="text-xl text-[#24578E] transition-transform group-open:rotate-45">+</span></summary>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">Yes. Use the contact page to describe your organization and the kind of collaboration you would like to explore.</p>
          </details>
        </div>
      </section>

      <section className="bg-[#173a60]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-8 sm:py-14 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <ShieldCheck aria-hidden="true" className="mt-1 size-6 shrink-0 text-[#9be0f5]" />
            <div>
              <h2 className="text-xl font-bold text-white">Want to support CPSAR?</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">Get in touch to confirm the current options and discuss how your contribution could support the association’s work.</p>
            </div>
          </div>
          <Link href="/contact" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#173a60] transition-colors hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Contact CPSAR <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
