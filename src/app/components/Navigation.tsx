"use client";

import { useEffect, useState } from "react";
import type { FocusEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  Search,
  Twitter,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type NavLink = {
  name: string;
  path: string;
  children?: { name: string; path: string }[];
};

const navLinks: NavLink[] = [
  { name: "Home", path: "/" },
  {
    name: "About Us",
    path: "/about",
    children: [
      { name: "Our Story", path: "/about" },
      { name: "Leadership", path: "/leadership" },
      { name: "Membership", path: "/membership" },
    ],
  },
  {
    name: "Our Work & Services",
    path: "/programs",
    children: [
      { name: "Programmes", path: "/programs" },
      { name: "Events", path: "/events" },
      { name: "Resources", path: "/resources" },
      { name: "Partners", path: "/partners" },
      { name: "Gallery", path: "/gallery" },
    ],
  },
  {
    name: "News & Updates",
    path: "/news",
    children: [{ name: "Latest News", path: "/news" }],
  },
  { name: "Alumni", path: "/alumni" },
  { name: "Contact", path: "/contact" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/cpsar_rwanda", icon: Instagram },
  { label: "X / Twitter", href: "https://x.com/cpsarwanda", icon: Twitter },
  { label: "Facebook", href: "https://www.facebook.com/cpsarwanda", icon: Facebook },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/cpsarwanda", icon: Linkedin },
];

const menuId = (name: string) =>
  `submenu-${name.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`;

function SearchToggle({ variant = "light", inline = false }: { variant?: "light" | "dark"; inline?: boolean }) {
  const [open, setOpen] = useState(false);
  const dark = variant === "dark";

  return (
    <div className={inline ? "w-full" : "relative"}>
      <button
        type="button"
        aria-label={open ? "Close search" : "Open website search"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 ${dark ? "text-[#CFE8F7] hover:bg-white/10 hover:text-white focus-visible:outline-[#5BC0DE]" : "text-[#24578E] hover:bg-[#edf6fb] hover:text-[#14365F] focus-visible:outline-[#24578E]"} ${inline ? "w-full justify-start rounded-lg" : "justify-center"}`}
      >
        <Search aria-hidden="true" className="size-5 shrink-0" />
        {inline && "Search"}
      </button>
      {open && (
        <form action="/search" role="search" className={`${inline ? "mt-2" : "absolute right-0 top-full z-30 mt-3 w-[min(22rem,calc(100vw-2rem))]"} flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-xl`}>
          <label htmlFor={inline ? "mobile-site-search" : dark ? "top-site-search" : "site-search-nav"} className="sr-only">Search CPSAR</label>
          <input
            id={inline ? "mobile-site-search" : dark ? "top-site-search" : "site-search-nav"}
            name="q"
            type="search"
            maxLength={100}
            required
            autoFocus
            placeholder="What are you looking for?"
            className="min-h-10 min-w-0 flex-1 rounded-lg px-3 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-[#5BC0DE]/50"
          />
          <button type="submit" aria-label="Search" className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#14365F] text-white hover:bg-[#24578E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14365F]">
            <Search aria-hidden="true" className="size-4" />
          </button>
        </form>
      )}
    </div>
  );
}

function isCurrentPath(pathname: string, path: string) {
  return pathname === path || (path !== "/" && pathname.startsWith(`${path}/`));
}

function isCurrentLink(pathname: string, link: NavLink) {
  return isCurrentPath(pathname, link.path) || Boolean(link.children?.some((child) => isCurrentPath(pathname, child.path)));
}

export function Navigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const homeAtTop = pathname === "/" && !isScrolled;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileOpen]);

  function closeDropdownOnBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setActiveDropdown(null);
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`${pathname === "/" ? "hidden" : "hidden min-[1200px]:block"} border-b border-white/10 bg-[#173a60]`}>
        <div className="mx-auto flex h-11 max-w-[1440px] items-center justify-between px-5 sm:px-8">
          <p className="text-[11px] font-medium tracking-[0.12em] text-white/80">
            CLINICAL PSYCHOLOGY STUDENTS ASSOCIATION OF RWANDA
          </p>
          <div className="flex items-center gap-0.5" role="group" aria-label="Search and social media">
            <SearchToggle variant="dark" />
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-11 items-center justify-center rounded-full text-[#CFE8F7] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5BC0DE]"
              >
                <Icon aria-hidden="true" className="size-[21px]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={`transition-[background-color,box-shadow,border-color] duration-200 ${homeAtTop ? "border-b border-white/15 bg-[linear-gradient(180deg,rgba(16,43,75,0.78)_0%,rgba(16,43,75,0.42)_66%,rgba(16,43,75,0)_100%)] shadow-none" : "border-b border-slate-200/90 bg-white/95 shadow-[0_8px_30px_rgba(16,43,75,0.08)] backdrop-blur-lg"}`}>
        <nav aria-label="Main navigation" className="mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="flex h-16 items-center justify-between min-[1200px]:h-[68px]">
            <Link
              href="/"
              className={`flex shrink-0 items-center rounded-md outline-offset-4 focus-visible:outline focus-visible:outline-2 ${homeAtTop ? "bg-white/95 px-2 py-1.5 shadow-md focus-visible:outline-white" : "focus-visible:outline-[#24578E]"}`}
              aria-label="CPSAR home"
            >
              <Image
                src="/cpsar-logo-transparent.png"
                alt="CPSAR — Clinical Psychology Students’ Association of Rwanda"
                width={916}
                height={210}
                fetchPriority="high"
                className="h-9 w-[148px] object-contain sm:h-10 sm:w-[168px] 2xl:h-11 2xl:w-[184px]"
              />
            </Link>

            <div className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 px-3 min-[1200px]:flex 2xl:gap-1">
              {navLinks.map((link) => {
                const active = isCurrentLink(pathname, link);
                const open = activeDropdown === link.name;

                return (
                  <div
                    key={link.name}
                    className="relative shrink-0"
                    onMouseEnter={() => link.children && setActiveDropdown(link.name)}
                    onMouseLeave={() => link.children && setActiveDropdown(null)}
                    onBlur={closeDropdownOnBlur}
                  >
                    {link.children ? (
                      <button
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={open}
                        aria-controls={menuId(link.name)}
                        aria-current={active ? "page" : undefined}
                        onFocus={() => setActiveDropdown(link.name)}
                        onClick={() => setActiveDropdown(open ? null : link.name)}
                        className={`group relative flex min-h-11 items-center gap-1 whitespace-nowrap rounded-md px-2 py-2 text-[12px] font-semibold uppercase tracking-[0.025em] transition-colors after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:rounded-full after:transition-transform after:content-[''] 2xl:px-2.5 2xl:text-[13px] ${homeAtTop ? "after:bg-[#5BC0DE] focus-visible:outline-white" : "after:bg-[#14365F] focus-visible:outline-[#24578E]"} ${
                          active
                            ? homeAtTop ? "text-white after:scale-x-100" : "text-[#14365F] after:scale-x-100"
                            : homeAtTop ? "text-white/90 after:scale-x-0 hover:bg-white/10 hover:text-white hover:after:scale-x-100" : "text-slate-700 after:scale-x-0 hover:bg-[#f2f7fa] hover:text-[#173a60] hover:after:scale-x-100"
                        } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                      >
                        {link.name}
                        <ChevronDown aria-hidden="true" className={`size-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
                      </button>
                    ) : (
                      <Link
                        href={link.path}
                        aria-current={active ? "page" : undefined}
                        className={`relative flex min-h-11 items-center whitespace-nowrap rounded-md px-2 py-2 text-[12px] font-semibold uppercase tracking-[0.025em] transition-colors after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:rounded-full after:transition-transform after:content-[''] 2xl:px-2.5 2xl:text-[13px] ${homeAtTop ? "after:bg-[#5BC0DE] focus-visible:outline-white" : "after:bg-[#14365F] focus-visible:outline-[#24578E]"} ${
                          active
                            ? homeAtTop ? "text-white after:scale-x-100" : "text-[#14365F] after:scale-x-100"
                            : homeAtTop ? "text-white/90 after:scale-x-0 hover:bg-white/10 hover:text-white hover:after:scale-x-100" : "text-slate-700 after:scale-x-0 hover:bg-[#f2f7fa] hover:text-[#173a60] hover:after:scale-x-100"
                        } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                      >
                        {link.name}
                      </Link>
                    )}

                    {link.children && (
                      <AnimatePresence>
                        {open && (
                          <motion.div
                            id={menuId(link.name)}
                            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduceMotion ? undefined : { opacity: 0, y: 6 }}
                            transition={{ duration: reduceMotion ? 0 : 0.14 }}
                            className="absolute left-0 top-full z-10 mt-1 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_18px_45px_rgba(16,43,75,0.16)]"
                          >
                            {link.children.map((child) => {
                              const childActive = isCurrentPath(pathname, child.path);
                              return (
                                <Link
                                  key={child.name}
                                  href={child.path}
                                  aria-current={childActive ? "page" : undefined}
                                  onClick={() => setActiveDropdown(null)}
                                  className={`block rounded-lg px-3.5 py-3 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#24578E] ${
                                    childActive
                                      ? "bg-[#edf6fb] font-semibold text-[#14365F]"
                                      : "text-slate-700 hover:bg-[#f2f7fa] hover:text-[#173a60]"
                                  }`}
                                >
                                  {child.name}
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </div>

            {pathname === "/" && (
              <div className="hidden shrink-0 items-center gap-0.5 min-[1200px]:flex" role="group" aria-label="Search and social media">
                <SearchToggle variant={homeAtTop ? "dark" : "light"} />
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex size-10 items-center justify-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 2xl:size-11 ${homeAtTop ? "text-white hover:bg-white/15 hover:text-white focus-visible:outline-white" : "text-[#24578E] hover:bg-[#edf6fb] hover:text-[#14365F] focus-visible:outline-[#24578E]"}`}
                  >
                    <Icon aria-hidden="true" className="size-5" />
                  </a>
                ))}
              </div>
            )}

            <div className="hidden shrink-0 items-center min-[1200px]:flex">
              <Link
                href="/donate"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#5BC0DE] px-5 text-sm font-bold text-[#102b4b] transition duration-200 hover:-translate-y-0.5 hover:bg-[#8edcf2] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24578E] motion-reduce:transform-none motion-reduce:transition-none"
              >
                Donate
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileOpen((open) => !open)}
              className={`inline-flex size-11 items-center justify-center rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 min-[1200px]:hidden ${homeAtTop ? "bg-[#102b4b]/35 text-white hover:bg-[#102b4b]/60 focus-visible:outline-white" : "text-[#173a60] hover:bg-[#f2f7fa] focus-visible:outline-[#14365F]"}`}
              aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-slate-200 bg-white shadow-xl min-[1200px]:hidden"
          >
            <nav aria-label="Mobile navigation" className="mx-auto max-w-2xl px-5 py-3 sm:px-8">
              <Link
                href="/"
                onClick={() => setIsMobileOpen(false)}
                aria-current={pathname === "/" ? "page" : undefined}
                className={`block rounded-lg px-3 py-3 text-sm font-semibold ${pathname === "/" ? "bg-[#edf6fb] text-[#14365F]" : "text-slate-800 hover:bg-slate-50"}`}
              >
                Home
              </Link>

              {navLinks.filter((link) => link.path !== "/").map((link) => {
                const active = isCurrentLink(pathname, link);
                return link.children ? (
                  <details key={link.name} className="group border-b border-slate-100" open={active || undefined}>
                    <summary className={`flex min-h-12 cursor-pointer list-none items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden ${active ? "text-[#14365F]" : "text-slate-800 hover:bg-slate-50"}`}>
                      {link.name}
                      <ChevronDown aria-hidden="true" className="size-4 text-slate-500 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="space-y-1 pb-2 pl-3">
                      {link.children.map((child) => {
                        const childActive = isCurrentPath(pathname, child.path);
                        return (
                          <Link
                            key={`${link.name}-${child.name}`}
                            href={child.path}
                            aria-current={childActive ? "page" : undefined}
                            onClick={() => setIsMobileOpen(false)}
                            className={`block min-h-11 rounded-lg px-3 py-3 text-sm ${childActive ? "bg-[#edf6fb] font-semibold text-[#14365F]" : "text-slate-600 hover:bg-slate-50 hover:text-[#14365F]"}`}
                          >
                            {child.name}
                          </Link>
                        );
                      })}
                    </div>
                  </details>
                ) : (
                  <Link
                    key={link.name}
                    href={link.path}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setIsMobileOpen(false)}
                    className={`block min-h-12 rounded-lg px-3 py-3 text-sm font-semibold ${active ? "bg-[#edf6fb] text-[#14365F]" : "text-slate-800 hover:bg-slate-50"}`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="mt-3 border-t border-slate-200 pt-3">
                <SearchToggle inline />
                <div className="flex flex-wrap items-center gap-1 px-1 py-2" role="group" aria-label="CPSAR social media">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex size-11 items-center justify-center rounded-full text-[#24578E] transition-colors hover:bg-[#edf6fb] hover:text-[#14365F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#24578E]"
                    >
                      <Icon aria-hidden="true" className="size-5" />
                    </a>
                  ))}
                </div>
                <Link
                  href="/donate"
                  onClick={() => setIsMobileOpen(false)}
                  className="mt-2 flex min-h-11 items-center justify-center rounded-full bg-[#5BC0DE] px-4 text-sm font-bold text-[#102b4b] transition-colors hover:bg-[#8edcf2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24578E]"
                >
                  Donate
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
