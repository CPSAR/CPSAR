"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Instagram, Facebook, Linkedin, ArrowRight } from "lucide-react";

const links = {
  Organisation: [
    { label: "About CPSAR", path: "/about" },
    { label: "Leadership Team", path: "/leadership" },
    { label: "Alumni", path: "/alumni" },
    { label: "Partners", path: "/partners" },
    { label: "Programmes", path: "/programs" },
    { label: "Events", path: "/events" },
    { label: "Gallery", path: "/gallery" },
  ],
  Resources: [
    { label: "Research & Publications", path: "/resources" },
    { label: "Study Materials", path: "/resources" },
    { label: "Career Guidance", path: "/resources" },
    { label: "News & Blog", path: "/news" },
    { label: "Membership", path: "/membership" },
    { label: "Support CPSAR", path: "/donate" },
  ],
  Contact: [
    { label: "Get in Touch", path: "/contact" },
    { label: "Join CPSAR", path: "/membership" },
    { label: "www.cpsarwanda.org", path: "https://www.cpsarwanda.org" },
    { label: "+250 791 507 709", path: "tel:+250791507709" },
    { label: "Kigali, Rwanda", path: "/contact" },
  ],
};

const socials = [
  { icon: Twitter, href: "https://x.com/cpsarwanda", label: "X / Twitter" },
  { icon: Instagram, href: "https://instagram.com/cpsa_rwanda", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/cpsarwanda", label: "Facebook" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/cpsarwanda", label: "LinkedIn" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");
    try {
      const data = new FormData(event.currentTarget);
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: data.get("website") }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to subscribe.");
      setDone(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#14365F] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Newsletter band */}
        <div className="flex flex-col justify-between gap-8 border-b border-white/15 py-10 sm:py-12 md:flex-row md:items-center">
          <div>
            <p
              className="mb-1 text-xl font-bold text-white"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              Stay in the loop.
            </p>
            <p className="text-sm text-white/75">News, events, and resources — straight to your inbox.</p>
          </div>
          {done ? (
            <p className="text-sm font-medium text-[#5BC0DE]">You&apos;re subscribed ✓</p>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex w-full gap-2 md:w-auto">
              <div className="absolute h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="newsletter-website">Leave this field empty</label>
                <input id="newsletter-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={email}
                maxLength={254}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address for newsletter"
                className="min-h-11 min-w-0 flex-1 rounded-md border border-white/25 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/65 transition-colors focus:border-[#5BC0DE] focus:outline-none focus:ring-2 focus:ring-[#5BC0DE]/35 sm:w-64"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                aria-label="Subscribe to newsletter"
                className="flex min-h-11 min-w-11 flex-shrink-0 items-center justify-center rounded-md bg-[#5BC0DE] text-[#14365F] transition-colors hover:bg-[#8bd8eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-wait disabled:opacity-70"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
          {submitError && <p role="alert" className="mt-3 text-sm font-medium text-red-200">{submitError}</p>}
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-16 lg:py-14">
          {/* Brand */}
          <div className="col-span-full lg:col-span-1">
            <Link href="/" aria-label="CPSAR home" className="mb-6 inline-flex">
              <span className="flex h-12 w-[200px] items-center justify-center bg-white">
                <Image
                  src="/cpsar-logo.png"
                  alt="CPSAR — Clinical Psychology Students’ Association of Rwanda"
                  width={916}
                  height={210}
                  className="h-full w-full object-contain"
                />
              </span>
            </Link>
            <p className="mb-8 max-w-xs text-sm leading-relaxed text-white/75">
              Empowering future clinical psychologists in Rwanda through education, collaboration, and mental health advocacy 
            </p>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-11 items-center justify-center rounded-lg border border-white/20 text-white/75 transition-all hover:border-[#5BC0DE] hover:bg-[#5BC0DE]/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5BC0DE]"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <p
                className="mb-5 text-xs font-semibold uppercase tracking-widest text-[#5BC0DE]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {section}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.path}
                      className="text-sm text-white/75 transition-colors duration-150 hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5BC0DE]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/15 py-6 md:flex-row">
          <p className="text-xs text-white/65">
            © {new Date().getFullYear()} CPSAR — Clinical Psychology Students Association of Rwanda
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 md:justify-end">
            {["Privacy Policy", "Terms of Service", "Accessibility"].map((l) => (
              <a key={l} href="#" className="text-xs text-white/65 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5BC0DE]">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
