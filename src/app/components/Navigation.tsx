"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const navLinks = [
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

export function Navigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<
    string | null
  >(null);
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className="hidden border-b border-white/10 bg-[#173a60] lg:block"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-9">
          <p className="text-xs text-white/80">
            Rwanda&apos;s National Clinical Psychology Students Association
          </p>
          <div className="flex items-center gap-1" aria-label="CPSAR social media">
            {socialLinks.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="inline-flex h-7 w-7 items-center justify-center text-white/75 transition-colors hover:text-white">
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Main nav bar */}
      <div className="border-b border-slate-200 bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[60px]">
            {/* Logo */}
            <Link
              href="/"
              className="group flex shrink-0 items-center rounded-sm outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#24578E]"
              aria-label="CPSAR home"
            >
              <Image
                src="/cpsar-logo.png"
                alt="CPSAR — Clinical Psychology Students’ Association of Rwanda"
                width={916}
                height={210}
                priority
                className="h-9 w-[157px] object-contain sm:h-11 sm:w-[190px]"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onFocus={() => link.children && setActiveDropdown(link.name)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setActiveDropdown(null);
                  }}
                >
                  <Link
                    href={link.path}
                    className={`flex items-center gap-1 px-2 py-2 text-xs font-medium uppercase tracking-wide transition-all duration-150 xl:px-3 xl:text-[13px] ${
                      (pathname === link.path || link.children?.some((child) => child.path === pathname))
                        ? "text-[#24578E]"
                        : "text-neutral-700 hover:text-[#173a60]"
                    }`}
                    aria-expanded={link.children ? activeDropdown === link.name : undefined}
                    aria-controls={link.children ? `submenu-${link.name.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}` : undefined}
                  >
                    {link.name}
                    {link.children && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-150 ${activeDropdown === link.name ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>

                  {link.children && (
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.12 }}
                          id={`submenu-${link.name.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`}
                          className="absolute left-0 top-full mt-1 w-60 overflow-hidden border border-black/6 bg-white py-1.5 shadow-lg"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.path}
                              className="block px-4 py-2.5 text-[13px] text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-[#173a60]"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link
                href="/contact"
                className="px-2 py-2 text-xs font-medium text-neutral-700 transition-colors hover:text-[#173a60] xl:px-3 xl:text-[13px]"
              >
                Contact
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white bg-[#71C0DF] hover:bg-[#71C0DF]/90 transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Donate
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-[#173a60] transition-colors hover:bg-neutral-100 lg:hidden"
              aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-navigation"
              type="button"
            >
              {isMobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </div>

            {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            id="mobile-navigation"
            className="lg:hidden bg-white border-b border-black/8 overflow-hidden"
          >
            <div className="py-4 px-5 space-y-0.5">
              {navLinks.map((link) => link.children ? (
                <details key={link.name} className="group border-b border-neutral-100 last:border-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-3 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 [&::-webkit-details-marker]:hidden">
                    {link.name}<ChevronDown aria-hidden="true" className="h-4 w-4 text-neutral-500 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="pb-2 pl-3">
                    {link.children.map((child) => (
                      <Link key={`${link.name}-${child.name}`} href={child.path} onClick={() => setIsMobileOpen(false)} className={`block rounded-md px-3 py-2.5 text-sm transition-colors ${pathname === child.path ? "bg-[#e8f3fb] font-semibold text-[#173a60]" : "text-neutral-600 hover:bg-neutral-50 hover:text-[#173a60]"}`}>
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link key={link.name} href={link.path} onClick={() => setIsMobileOpen(false)} className={`block rounded-md px-3 py-3 text-sm font-semibold transition-colors ${pathname === link.path ? "bg-[#e8f3fb] text-[#173a60]" : "text-neutral-800 hover:bg-neutral-50"}`}>
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-neutral-100 space-y-2 mt-2">
                <Link
                  href="/donate"
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-3 py-3 text-sm font-semibold text-white bg-[#71C0DF] text-center"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Donate
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
