"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, GraduationCap, Users, Heart, Microscope, BookOpen, Globe } from "lucide-react";

const programs = [
  { icon: GraduationCap, title: "Workshops & Training", desc: "Hands-on clinical skills and therapeutic technique sessions." },
  { icon: Users, title: "Conferences", desc: "Annual national conference bringing students and experts together." },
  { icon: Heart, title: "Mental Health Campaigns", desc: "Community awareness and stigma-reduction initiatives." },
  { icon: Microscope, title: "Research Projects", desc: "Collaborative research addressing Rwanda's mental health landscape." },
  { icon: BookOpen, title: "Student Development", desc: "Mentorship, career guidance, and professional networking." },
  { icon: Globe, title: "Community Outreach", desc: "Service programs supporting underserved communities." },
];

export function ProgramsPreview() {
  return (
    <section className="bg-[#24578E] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#71C0DF] text-sm font-semibold uppercase tracking-widest mb-4">Programmes</p>
            <h2
              className="text-4xl lg:text-5xl font-bold text-white leading-[1.1]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
            >
              What We Offer.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white group transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              View all programmes <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/6 rounded-none overflow-hidden">
          {programs.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-[#24578E] p-8 group hover:bg-white/4 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-none bg-[#71C0DF]/15 flex items-center justify-center mb-6 group-hover:bg-[#71C0DF]/25 transition-colors">
                <p.icon className="w-5 h-5 text-[#71C0DF]" />
              </div>
              <h3
                className="text-white font-bold mb-3 text-lg"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
              >
                {p.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href="/programs" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#71C0DF]">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
