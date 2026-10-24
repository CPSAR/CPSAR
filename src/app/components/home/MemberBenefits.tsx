"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Calendar, Microscope, Heart } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "A national student network",
    desc: "Meet clinical psychology students and graduates, share ideas, and build lasting professional connections.",
    img: "/images/HagyImagesStudio0782569627(1).jpg",
  },
  {
    icon: Calendar,
    title: "Practical learning",
    desc: "Take part in workshops, seminars, and conferences that build skills alongside your studies.",
    img: "/images/HagyImagesStudio0782569627(11).jpg",
  },
  {
    icon: Microscope,
    title: "Research and knowledge",
    desc: "Explore research opportunities and share evidence that speaks to mental health in Rwanda.",
    img: "/images/HagyImagesStudio0782569627(17).jpg",
  },
  {
    icon: Heart,
    title: "Community impact",
    desc: "Contribute to mental health awareness and community programmes across Rwanda.",
    img: "/images/HagyImagesStudio0782569627(22).jpg",
  },
];

export function MemberBenefits() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-12 border-b border-neutral-100">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#71C0DF] text-xs font-bold uppercase tracking-[0.15em] mb-4">Membership</p>
            <h2
              className="text-4xl lg:text-5xl font-bold text-[#0a0a0a] leading-[1.05] max-w-lg"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
            >
              Grow your future in clinical psychology.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-3 lg:items-end"
          >
            <p className="text-neutral-500 text-sm max-w-xs lg:text-right leading-relaxed">
              Learn with peers, gain practical experience, and contribute to better mental health care in Rwanda.
            </p>
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0a0a0a] group"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Join CPSAR today
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Benefits grid — image cards like ACPUK */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-100">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group bg-white cursor-pointer"
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-neutral-200 aspect-[4/3]">
                <img
                  src={b.img}
                  alt={b.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-[#24578E]/20 group-hover:bg-[#24578E]/10 transition-colors" />
                <div className="absolute bottom-3 left-3">
                  <div className="w-8 h-8 bg-[#71C0DF] flex items-center justify-center">
                    <b.icon className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="p-5">
                <h3
                  className="text-[#0a0a0a] font-bold text-base mb-2 group-hover:text-[#71C0DF] transition-colors leading-snug"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                >
                  {b.title}
                </h3>
                <p className="text-neutral-500 text-xs leading-relaxed line-clamp-3">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-px bg-[#24578E] p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <p
              className="text-white font-bold text-lg mb-1"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
            >
              Ready to become a member?
            </p>
            <p className="text-white/40 text-sm">Join Rwanda's premier clinical psychology student association.</p>
          </div>
          <Link
            href="/membership"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-[#71C0DF] text-white text-sm font-semibold hover:bg-[#71C0DF]/90 transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Join CPSAR <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
