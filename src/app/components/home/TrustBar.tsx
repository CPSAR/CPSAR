"use client";

import { motion } from "motion/react";
import { ShieldCheck, Users, Globe, BookOpenCheck } from "lucide-react";

const credentials = [
  {
    icon: ShieldCheck,
    title: "Not-for-Profit Association",
    desc: "CPSAR is a student-led, not-for-profit association operating transparently in the interest of its members.",
  },
  {
    icon: Users,
    title: "Representing All Members",
    desc: "We give clinical psychology students a collective voice in national mental health policy and education.",
  },
  {
    icon: Globe,
    title: "National Reach",
    desc: "Active across universities in Kigali, Huye, Musanze, and beyond — Rwanda's only national psychology student body.",
  },
  {
    icon: BookOpenCheck,
    title: "Academically Grounded",
    desc: "Our programmes are developed in partnership with faculty, clinicians, and leading mental health organisations.",
  },
];

export function TrustBar() {
  return (
    <section className="bg-[#24578E] border-t border-white/6 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[#71C0DF] text-xs font-bold uppercase tracking-[0.15em] mb-4">
            Why CPSAR
          </p>
          <h2
            className="text-3xl lg:text-4xl font-bold text-white max-w-2xl mx-auto leading-snug"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
          >
            A National Voice for Clinical Psychology Students.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/6">
          {credentials.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-[#24578E] p-8 group hover:bg-white/[0.03] transition-colors"
            >
              <div className="w-10 h-10 bg-[#71C0DF]/15 flex items-center justify-center mb-6 group-hover:bg-[#71C0DF]/25 transition-colors">
                <c.icon className="w-5 h-5 text-[#71C0DF]" />
              </div>
              <h3
                className="text-white font-bold text-base mb-3"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
              >
                {c.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Partnership acknowledgement strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-px bg-white/[0.02] border border-white/6 p-6 flex flex-col sm:flex-row items-center gap-6 justify-center text-center sm:text-left"
        >
          <div className="w-px h-6 bg-[#71C0DF] hidden sm:block flex-shrink-0" />
          <p className="text-white/30 text-xs leading-relaxed max-w-2xl">
            CPSAR partners with the University of Rwanda, AUCA, Mount Kenya University Rwanda, the Rwanda Biomedical Center, 
            the Ministry of Health, and WHO Rwanda to deliver evidence-based programmes and advance clinical psychology in East Africa.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
