"use client";

import { motion } from "motion/react";
import { Check, Star, Users, BookOpen, Calendar, Award, Heart, Zap } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Membership() {
  const benefits = [
    { icon: BookOpen, title: "Access to Resources", description: "Exclusive study materials, research papers, and career guides" },
    { icon: Calendar, title: "Event Invitations", description: "Priority registration for workshops, conferences, and seminars" },
    { icon: Users, title: "Professional Network", description: "Connect with peers and mentors across Rwanda and East Africa" },
    { icon: Award, title: "Certifications", description: "Official CPSAR certificates for participation and achievements" },
    { icon: Heart, title: "Mental Health Support", description: "Access to counseling services and peer support groups" },
    { icon: Zap, title: "Leadership Opportunities", description: "Run for office and lead national initiatives" },
  ];

  const testimonials = [
    {
      name: "Claudine Ingabire",
      role: "Psychology Student, UR",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face",
      text: "CPSAR changed my academic journey. The workshops and mentor connections helped me secure a research internship I never thought possible.",
    },
    {
      name: "Emmanuel Nzeyimana",
      role: "Graduate, AUCA",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      text: "The professional network I built through CPSAR events is invaluable. I landed my first clinical placement through a connection made at their annual conference.",
    },
    {
      name: "Sandrine Mukamana",
      role: "PhD Candidate",
      avatar: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=100&h=100&fit=crop&crop=face",
      text: "As a PhD candidate, CPSAR's research collaboration programs gave me access to datasets and co-authors that have shaped my thesis significantly.",
    },
  ];

  const steps = [
    { step: "01", title: "Complete Application", desc: "Fill out our online membership form with your academic details" },
    { step: "02", title: "Pay Membership Fee", desc: "Complete payment via mobile money or bank transfer" },
    { step: "03", title: "Verification", desc: "Our team reviews your application within 48 hours" },
    { step: "04", title: "Welcome!", desc: "Receive your membership certificate and access credentials" },
  ];

  const memberIncludes = [
    "Full access to all resources and study materials",
    "Priority event registration for workshops and conferences",
    "Peer networking and mentorship access",
    "Newsletter and research digest subscription",
    "Official CPSAR membership certificate",
    "Voting rights and leadership eligibility",
    "International conference participation discount",
    "Research collaboration opportunities",
  ];

  return (
    <div className="pt-[60px] lg:pt-[92px]">
      {/* Hero */}
      <section className="bg-[#24578E] pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[#71C0DF] text-xs font-bold uppercase tracking-[0.15em] mb-6">Membership</p>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white max-w-3xl leading-[1.0] mb-6"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
            >
              Join Rwanda's Premier Psychology Community.
            </h1>
            <p className="text-white/45 text-xl max-w-xl leading-relaxed">
              Connect with fellow students, access exclusive resources, and shape the future of mental healthcare in Rwanda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <p className="text-[#71C0DF] text-xs font-bold uppercase tracking-[0.15em] mb-4">Why Join</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a0a0a]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
              What Membership Gives You.
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-100">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <div className="bg-white p-8 h-full group hover:bg-neutral-50 transition-colors">
                  <div className="w-10 h-10 flex items-center justify-center mb-5 bg-neutral-100 group-hover:bg-[#71C0DF]/10 transition-colors">
                    <b.icon className="w-5 h-5 text-neutral-400 group-hover:text-[#71C0DF] transition-colors" />
                  </div>
                  <h3 className="text-base font-bold mb-2 text-[#0a0a0a]" style={{ fontFamily: "var(--font-display)" }}>{b.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{b.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership includes */}
      <section className="py-20 bg-[#24578E]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-[#71C0DF] text-xs font-bold uppercase tracking-[0.15em] mb-5">Membership Includes</p>
              <h2
                className="text-4xl font-bold text-white mb-10"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
              >
                Everything You Need to Thrive.
              </h2>
              <ul className="space-y-4">
                {memberIncludes.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-4 text-white/70 text-sm"
                  >
                    <Check className="w-4 h-4 text-[#71C0DF] mt-0.5 flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="border border-white/10 p-10"
            >
              <p className="text-[#71C0DF] text-xs font-semibold uppercase tracking-widest mb-6">How to Join</p>
              <div className="space-y-0">
                {steps.map((s, i) => (
                  <div key={i} className="flex gap-6 py-6 border-b border-white/6 last:border-0">
                    <span className="text-2xl font-bold text-white/20 w-10 flex-shrink-0"
                      style={{ fontFamily: "var(--font-display)" }}>
                      {s.step}
                    </span>
                    <div>
                      <h3 className="text-white font-bold mb-1 text-sm" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3>
                      <p className="text-white/40 text-xs leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <p className="text-[#71C0DF] text-xs font-bold uppercase tracking-[0.15em] mb-4">Member Stories</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a0a0a]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
              What Our Members Say.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="h-full bg-white shadow-none border border-neutral-200">
                  <CardContent className="p-8">
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, k) => <Star key={k} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-7">"{t.text}"</p>
                    <div className="flex items-center gap-3 border-t border-neutral-100 pt-5">
                      <div className="w-9 h-9 overflow-hidden bg-neutral-100 flex-shrink-0">
                        <ImageWithFallback src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-[#0a0a0a]" style={{ fontFamily: "var(--font-display)" }}>{t.name}</div>
                        <div className="text-xs text-neutral-400">{t.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
