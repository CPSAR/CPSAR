"use client";

import Link from "next/link";
import { ArrowRight, BookOpenText, CalendarDays, Handshake, UsersRound } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

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

const cardTones = [
  "bg-[#07558E] border-[#2F78AA]",
  "bg-[#07558E] border-[#2F78AA]",
  "bg-[#07558E] border-[#2F78AA]",
  "bg-[#07558E] border-[#2F78AA]",
];

export function AudiencePaths() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="home-paths-title" className="relative overflow-hidden bg-[#14365F] py-12 sm:py-16 lg:py-20">
      <div aria-hidden="true" className="absolute -right-28 -top-40 size-[28rem] rounded-full border border-white/[0.08]" />
      <div aria-hidden="true" className="absolute -right-12 -top-24 size-[22rem] rounded-full border border-white/[0.08]" />
      <div className="relative mx-auto max-w-[1800px] px-5 sm:px-8 lg:px-10">
        <header className="mb-9 flex flex-col gap-4 border-b border-white/20 pb-7 sm:mb-12 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h2 id="home-paths-title" className="max-w-4xl text-[clamp(2.5rem,4.1vw,4rem)] font-bold leading-[1.04] tracking-[-0.045em] text-white [text-wrap:balance]">
              Find what you came for.
            </h2>
          </div>
          <p className="max-w-md pb-1 text-base leading-7 text-[#d7e8f5] sm:text-right sm:text-lg">
            Choose a path to explore the association, its work, and ways to take part.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-5">
          {pathways.map(({ number, icon: Icon, title, description, links }, index) => (
            <motion.article
              key={number}
              initial={reduceMotion ? false : { opacity: 0, y: 38, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={reduceMotion ? undefined : { y: -7, boxShadow: "0 22px 48px rgba(4, 25, 48, 0.3)" }}
              whileTap={reduceMotion ? undefined : { scale: 0.99 }}
              transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : 0.12 + index * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative flex min-h-[23rem] flex-col overflow-hidden rounded-[1.4rem] border p-5 shadow-[0_8px_30px_rgba(18,44,75,0.08)] sm:p-7 lg:p-4 xl:min-h-[27rem] xl:p-8 ${cardTones[index]}`}
            >
              <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-[#5BC0DE]/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold tracking-[0.16em] text-[#CFE8F7]">{number}</span>
                <span className="flex size-14 items-center justify-center rounded-lg bg-white/15 text-white transition duration-300 group-hover:rotate-3 group-hover:bg-white/25 motion-reduce:transform-none motion-reduce:transition-none">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
              </div>
              <h3 className="relative mt-8 text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-lg xl:text-2xl">{title}</h3>
              <p className="mt-3 min-h-14 text-base leading-7 text-[#E7F3FA]">{description}</p>
              <ul className="mt-auto grid grid-cols-2 gap-x-3 gap-y-3 border-t border-white/20 pt-6 lg:grid-cols-1 xl:grid-cols-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-semibold text-white underline-offset-4 hover:text-[#CFE8F7] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-base">
                      {link.label}<ArrowRight aria-hidden="true" className="size-4 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
