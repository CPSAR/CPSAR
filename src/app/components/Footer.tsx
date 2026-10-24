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
    { label: "+250 788 418 232", path: "tel:+250788418232" },
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
    <footer className="bg-[#24578E] border-t border-white/6">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Newsletter band */}
        <div className="py-12 border-b border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div>
            <p
              className="text-white font-bold text-xl mb-1"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              Stay in the loop.
            </p>
            <p className="text-white/35 text-sm">News, events, and resources — straight to your inbox.</p>
          </div>
          {done ? (
            <p className="text-[#71C0DF] text-sm font-medium">You're subscribed ✓</p>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full sm:w-auto">
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
                className="flex-1 sm:w-64 bg-white/6 border border-white/10 rounded-none px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#71C0DF]/60 transition-colors"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                aria-label="Subscribe to newsletter"
                className="flex-shrink-0 w-10 h-10 rounded-none bg-[#71C0DF] flex items-center justify-center text-white hover:bg-[#71C0DF]/90 transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
          {submitError && <p role="alert" className="mt-3 text-sm text-red-400">{submitError}</p>}
        </div>

        {/* Main footer grid */}
        <div className="py-14 grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
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
            <p className="text-white/35 text-sm leading-relaxed max-w-xs mb-8">
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
                  className="w-10 h-10 rounded-none border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#71C0DF] hover:bg-[#71C0DF]/10 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#71C0DF]"
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
                className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {section}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.path}
                      className="text-white/45 text-sm hover:text-white transition-colors duration-150"
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
        <div className="border-t border-white/6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} CPSAR — Clinical Psychology Students Association of Rwanda
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Accessibility"].map((l) => (
              <a key={l} href="#" className="text-white/20 text-xs hover:text-white/50 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
