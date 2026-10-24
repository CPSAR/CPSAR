"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function QuoteSection() {
  return (
    <section className="bg-[#F8FAFC] border-y border-neutral-100 py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-[80px] lg:text-[120px] leading-none text-[#71C0DF] font-serif mb-2 select-none" aria-hidden>
              "
            </div>
            <blockquote
              className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#0a0a0a] leading-snug mb-6"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
            >
              The greatest weapon against stress is our ability to choose one thought over another.
            </blockquote>
            <cite className="flex items-center gap-3 not-italic">
              <div className="w-8 h-px bg-[#71C0DF]" />
              <span className="text-sm font-semibold text-neutral-500 uppercase tracking-widest"
                style={{ fontFamily: "var(--font-display)" }}>
                William James — Father of American Psychology
              </span>
            </cite>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="border-l-2 border-[#71C0DF] pl-6">
              <p className="text-neutral-600 text-sm leading-relaxed">
                CPSAR is built on the conviction that clinical psychology students in Rwanda deserve a professional home — a community that challenges, supports, and advances them.
              </p>
            </div>
            <div className="border-l-2 border-neutral-200 pl-6">
              <p className="text-neutral-500 text-sm leading-relaxed">
                We are a not-for-profit student association operating across Rwanda's universities, committed to professional excellence, community service, and mental health advocacy.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a0a0a] group mt-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Our story and values
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
