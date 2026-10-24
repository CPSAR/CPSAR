"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    name: "Marie Uwase",
    role: "Clinical Psychology Student, University of Rwanda",
    avatar: "/images/HagyImagesStudio0782569627(17).jpg",
    text: "CPSAR has been instrumental in my professional development. The workshops and mentorship programs have given me practical skills that complement my academic studies perfectly.",
  },
  {
    name: "Jean Baptiste Nkurunziza",
    role: "Psychology Graduate, AUCA",
    avatar: "/images/HagyImagesStudio0782569627(22).jpg",
    text: "The networking opportunities and research collaborations through CPSAR have been invaluable. I've connected with peers and professionals who share my passion for mental health advocacy.",
  },
  {
    name: "Grace Mukamana",
    role: "Master's Student in Clinical Psychology",
    avatar: "/images/HagyImagesStudio0782569627(60).jpg",
    text: "Being part of CPSAR opened doors I never imagined. From international conferences to community outreach, every experience has shaped me into a better future psychologist.",
  },
];

export function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);
  const t = testimonials[idx];

  return (
    <section className="bg-[#24578E] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">

          {/* Left */}
          <div>
            <p className="text-[#71C0DF] text-sm font-semibold uppercase tracking-widest mb-5">Testimonials</p>
            <h2
              className="text-4xl font-bold text-white mb-10 leading-[1.05]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
            >
              What our members say.
            </h2>
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-sm border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-sm border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right */}
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              <div className="text-3xl text-white/20 mb-6" style={{ fontFamily: "var(--font-display)" }}>"</div>
              <p className="text-white/80 text-xl lg:text-2xl leading-relaxed mb-10 font-light">
                {t.text}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-sm overflow-hidden bg-neutral-700 flex-shrink-0">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-display)" }}>
                    {t.name}
                  </div>
                  <div className="text-white/35 text-xs mt-0.5">{t.role}</div>
                </div>
              </div>

              {/* Dots */}
              <div className="flex gap-2 mt-10">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`h-0.5 rounded-sm transition-all duration-300 ${
                      i === idx ? "w-8 bg-[#71C0DF]" : "w-4 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
