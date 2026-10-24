"use client";

import { motion } from "motion/react";
import { Mail, Linkedin, Twitter } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const leaders = [
  {
    name: "Dr. Amani Mugisha",
    role: "President",
    image: "https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?w=400&h=400&fit=crop&crop=face",
    bio: "PhD candidate in Clinical Psychology, passionate about mental health advocacy and student empowerment.",
  },
  {
    name: "Grace Uwimana",
    role: "Vice President",
    image: "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=400&h=400&fit=crop&crop=face",
    bio: "Master's student specialising in trauma psychology with focus on community-based interventions.",
  },
  {
    name: "Jean Baptiste Nkurunziza",
    role: "Secretary General",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    bio: "Dedicated to organisational excellence and fostering collaboration among member universities.",
  },
  {
    name: "Marie Claire Mukamana",
    role: "Treasurer",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&crop=face",
    bio: "Financial strategist ensuring sustainable growth and resource allocation for CPSAR programmes.",
  },
  {
    name: "Patrick Habimana",
    role: "Programs Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Coordinates all academic programmes, workshops, and professional development initiatives.",
  },
  {
    name: "Sandrine Ingabire",
    role: "Research Coordinator",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    bio: "Leads collaborative research projects and partnerships with academic institutions.",
  },
];

export function LeadershipPage() {
  return (
    <div className="pt-[60px] lg:pt-[92px]">
      {/* Hero */}
      <section className="bg-[#24578E] pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#71C0DF] text-xs font-bold uppercase tracking-[0.15em] mb-6">Leadership</p>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white max-w-3xl leading-[1.0]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
            >
              Meet the Team.
            </h1>
            <p className="text-white/45 text-xl mt-6 max-w-xl leading-relaxed">
              Dedicated students shaping the future of clinical psychology in Rwanda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team grid */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group"
              >
                {/* Photo */}
                <div className="relative rounded-none overflow-hidden bg-neutral-100 aspect-[4/5] mb-5">
                  <ImageWithFallback
                    src={l.image}
                    alt={l.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#24578E]/0 group-hover:bg-[#24578E]/20 transition-colors duration-300" />
                  {/* Social overlay */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[Mail, Linkedin, Twitter].map((Icon, j) => (
                      <a
                        key={j}
                        href="#"
                        className="w-9 h-9 bg-white rounded-none flex items-center justify-center text-[#0a0a0a] hover:bg-[#71C0DF] hover:text-white transition-colors shadow-sm"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div>
                  <span className="text-[#71C0DF] text-xs font-semibold uppercase tracking-widest"
                    style={{ fontFamily: "var(--font-display)" }}>
                    {l.role}
                  </span>
                  <h3
                    className="text-[#0a0a0a] font-bold text-xl mt-1 mb-2"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                  >
                    {l.name}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{l.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
