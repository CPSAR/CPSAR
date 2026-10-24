"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#24578E] flex flex-col items-center justify-center px-5 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-[#71C0DF] text-xs font-bold uppercase tracking-[0.15em] mb-6"
          style={{ fontFamily: "var(--font-display)" }}>
          Error 404
        </p>
        <h1
          className="text-white font-bold leading-none mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(4rem, 15vw, 12rem)",
            letterSpacing: "-0.04em",
          }}
        >
          404
        </h1>
        <h2
          className="text-white/60 text-xl font-semibold mb-4"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
        >
          Page not found.
        </h2>
        <p className="text-white/30 text-sm leading-relaxed max-w-sm mb-12">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0a0a0a] bg-white hover:bg-neutral-100 transition-colors group"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <Home className="w-4 h-4" />
            Go to Homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-white/20 hover:border-white/40 transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Contact Us <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>

      {/* Decorative large text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="text-white/[0.02] font-bold"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(12rem, 40vw, 40rem)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          404
        </span>
      </div>
    </div>
  );
}
