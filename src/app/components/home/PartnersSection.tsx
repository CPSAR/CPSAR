"use client";

import { motion } from "motion/react";

const partners = [
  { name: "University of Rwanda", abbr: "UR" },
  { name: "AUCA", abbr: "AUCA" },
  { name: "Mount Kenya University", abbr: "MKU" },
  { name: "Rwanda Mental Health", abbr: "RMH" },
  { name: "Ministry of Health", abbr: "MoH" },
  { name: "WHO Rwanda", abbr: "WHO" },
  { name: "Rwanda Biomedical Center", abbr: "RBC" },
  { name: "Ndera Hospital", abbr: "NH" },
];

export function PartnersSection() {
  return (
    <section className="bg-white border-t border-neutral-100 py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-neutral-300 text-xs font-semibold uppercase tracking-widest text-center mb-10"
        >
          Trusted by leading institutions
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {partners.map((p, i) => (
            <div
              key={i}
              className="px-6 py-3 rounded-sm border border-neutral-150 bg-neutral-50 text-neutral-400 text-sm font-medium hover:border-[#71C0DF] hover:text-[#0a0a0a] hover:bg-white transition-all duration-200 cursor-default"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {p.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
