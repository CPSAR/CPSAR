import Link from "next/link";
import { ArrowRight, BookOpenText, CalendarDays, Handshake, UsersRound } from "lucide-react";

const pathways = [
  {
    number: "01",
    icon: UsersRound,
    title: "Discover CPSAR",
    description: "Our story, leadership, and membership.",
    links: [
      { label: "About us", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Membership", href: "/membership" },
    ],
  },
  {
    number: "02",
    icon: BookOpenText,
    title: "Explore our work",
    description: "Programmes, activities, and learning resources.",
    links: [
      { label: "Programmes", href: "/programs" },
      { label: "Resources", href: "/resources" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    number: "03",
    icon: CalendarDays,
    title: "Stay up to date",
    description: "Upcoming activities and the latest CPSAR news.",
    links: [
      { label: "Events", href: "/events" },
      { label: "News", href: "/news" },
    ],
  },
  {
    number: "04",
    icon: Handshake,
    title: "Connect with us",
    description: "Meet our community and find ways to connect.",
    links: [
      { label: "Partners", href: "/partners" },
      { label: "Alumni", href: "/alumni" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function AudiencePaths() {
  return (
    <section aria-labelledby="home-paths-title" className="relative overflow-hidden bg-[#f3f7fb] py-16 sm:py-20 lg:py-24">
      <div aria-hidden="true" className="absolute -right-28 -top-40 size-[28rem] rounded-full border border-[#24578E]/[0.07]" />
      <div aria-hidden="true" className="absolute -right-12 -top-24 size-[22rem] rounded-full border border-[#24578E]/[0.07]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <header className="mb-9 flex flex-col gap-4 border-b border-[#173a60]/10 pb-7 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#24578E]">Your guide to CPSAR</p>
            <h2 id="home-paths-title" className="mt-3 max-w-xl text-3xl font-bold tracking-[-0.035em] text-[#122c4b] sm:text-4xl lg:text-[2.75rem]">
              Find what you came for.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-600 sm:text-right">
            Choose a path to explore the association, its work, and ways to take part.
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {pathways.map(({ number, icon: Icon, title, description, links }) => (
            <article key={number} className="group flex min-h-64 flex-col rounded-2xl border border-[#173a60]/10 bg-white p-5 shadow-[0_8px_30px_rgba(18,44,75,0.035)] transition duration-200 hover:-translate-y-1 hover:border-[#71C0DF]/70 hover:shadow-[0_18px_45px_rgba(18,44,75,0.10)] motion-reduce:transform-none motion-reduce:transition-none sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.16em] text-[#24578E]/55">{number}</span>
                <span className="flex size-10 items-center justify-center rounded-xl bg-[#eaf5fa] text-[#24578E] transition-colors group-hover:bg-[#d8f0f8]">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
              </div>
              <h3 className="mt-6 text-lg font-bold tracking-tight text-[#122c4b]">{title}</h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{description}</p>
              <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-100 pt-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex min-h-10 items-center gap-1 rounded-sm text-sm font-semibold text-[#24578E] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24578E]">
                      {link.label}<ArrowRight aria-hidden="true" className="size-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-7 flex flex-wrap items-center gap-x-2 text-sm text-slate-600">
          Want to support CPSAR?
          <Link href="/donate" className="inline-flex min-h-11 items-center gap-1 rounded-sm font-semibold text-[#24578E] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24578E]">
            Learn about donating<ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </p>
      </div>
    </section>
  );
}
