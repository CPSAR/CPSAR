"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Calendar, MapPin, Clock, Users, ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const categories = ["All", "Conference", "Workshop", "Seminar", "Outreach"];

const upcoming = [
  {
    title: "Annual National Conference 2026",
    date: "July 15–17, 2026",
    time: "9:00 AM – 5:00 PM",
    location: "Kigali Convention Centre",
    attendees: "300+",
    category: "Conference",
    status: "Registration Open",
    statusColor: "emerald",
    featured: true,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=700&fit=crop",
    desc: "Three days of keynotes, research presentations, and professional networking with leading clinical psychology experts from across East Africa and beyond.",
  },
  {
    title: "Mental Health Awareness Workshop",
    date: "June 25, 2026",
    time: "2:00 PM – 6:00 PM",
    location: "University of Rwanda, Huye Campus",
    attendees: "100+",
    category: "Workshop",
    status: "Registration Open",
    statusColor: "emerald",
    featured: false,
    image: "https://images.unsplash.com/photo-1744973149087-179e3ed54eae?w=800&h=500&fit=crop",
    desc: "Interactive workshop on promoting mental health awareness and psychological resilience in academic environments.",
  },
  {
    title: "Research Methodology Seminar",
    date: "July 5, 2026",
    time: "10:00 AM – 4:00 PM",
    location: "CPSAR Secretariat, Kigali",
    attendees: "50+",
    category: "Seminar",
    status: "Registration Open",
    statusColor: "emerald",
    featured: false,
    image: "https://images.unsplash.com/photo-1678132218412-0f18fab9b537?w=800&h=500&fit=crop",
    desc: "Advanced research methods, statistical analysis, and academic writing for graduate psychology students.",
  },
  {
    title: "Community Outreach — Musanze",
    date: "August 10, 2026",
    time: "8:00 AM – 2:00 PM",
    location: "Musanze District",
    attendees: "30+",
    category: "Outreach",
    status: "Volunteers Needed",
    statusColor: "amber",
    featured: false,
    image: "https://images.unsplash.com/photo-1592392821486-71f028a00581?w=800&h=500&fit=crop",
    desc: "Mental health screening and community awareness campaign serving rural populations across the Northern Province.",
  },
];

const past = [
  { title: "World Mental Health Day Celebration 2025", date: "Oct 2025", category: "Outreach" },
  { title: "Trauma-Informed Care Workshop 2025", date: "Sep 2025", category: "Workshop" },
  { title: "Student Research Symposium 2025", date: "Aug 2025", category: "Conference" },
  { title: "Mental Health First Aid Training 2025", date: "Jul 2025", category: "Workshop" },
  { title: "CBT Skills Bootcamp 2025", date: "May 2025", category: "Workshop" },
  { title: "Annual Conference 2025 — Kigali", date: "Apr 2025", category: "Conference" },
];

export function Events() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featuredEvent = upcoming[0];
  const secondaryEvents = upcoming.slice(1).filter(
    (e) => activeCategory === "All" || e.category === activeCategory
  );
  const showFeatured = activeCategory === "All" || featuredEvent.category === activeCategory;

  return (
    <div className="pt-[60px] lg:pt-[92px]">
      <section className="bg-[#24578E] pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#71C0DF] text-xs font-bold uppercase tracking-[0.15em] mb-6">Events</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white max-w-3xl leading-[1.0]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}>
              Where Psychologists Connect.
            </h1>
            <p className="text-white/45 text-xl mt-6 max-w-xl leading-relaxed">
              Conferences, workshops, outreach programmes, and seminars — opportunities to learn, collaborate, and grow professionally.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="bg-white">
        <div className="border-b border-neutral-100 sticky top-[72px] bg-white/95 backdrop-blur-sm z-10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="flex items-center gap-1.5 overflow-x-auto py-4" style={{ scrollbarWidth: "none" }}>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border ${
                    activeCategory === cat
                      ? "bg-[#24578E] text-white border-[#24578E]"
                      : "bg-white text-neutral-400 border-neutral-200 hover:border-neutral-400 hover:text-[#0a0a0a]"
                  }`} style={{ fontFamily: "var(--font-display)" }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
          {showFeatured && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
              <div className="grid lg:grid-cols-[1fr_400px] border border-neutral-100 overflow-hidden group cursor-pointer hover:border-neutral-200 transition-colors">
                <div className="relative overflow-hidden bg-neutral-100 aspect-[16/9] lg:aspect-auto">
                  <ImageWithFallback src={featuredEvent.image} alt={featuredEvent.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
                  <div className="absolute inset-0 bg-[#24578E]/25 group-hover:bg-[#24578E]/15 transition-colors" />
                  <span className="absolute top-5 left-5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-[#71C0DF]"
                    style={{ fontFamily: "var(--font-display)" }}>{featuredEvent.category}</span>
                </div>
                <div className="flex flex-col justify-between p-8 lg:p-10 bg-[#24578E]">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[#71C0DF] text-xs font-bold uppercase tracking-[0.12em]"
                        style={{ fontFamily: "var(--font-display)" }}>Featured Event</span>
                      <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1"
                        style={{ fontFamily: "var(--font-display)" }}>{featuredEvent.status}</span>
                    </div>
                    <h2 className="text-white text-2xl lg:text-3xl font-bold leading-snug mb-4"
                      style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>{featuredEvent.title}</h2>
                    <p className="text-white/40 text-sm leading-relaxed mb-8">{featuredEvent.desc}</p>
                    <div className="space-y-2.5">
                      {[
                        { icon: Calendar, text: featuredEvent.date },
                        { icon: Clock, text: featuredEvent.time },
                        { icon: MapPin, text: featuredEvent.location },
                        { icon: Users, text: `${featuredEvent.attendees} Expected` },
                      ].map(({ icon: Icon, text }, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-white/40 text-sm">
                          <Icon className="w-3.5 h-3.5 text-[#71C0DF] flex-shrink-0" />{text}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8 flex items-center justify-between border-t border-white/8 pt-6">
                    <span className="text-sm font-semibold text-white group-hover:text-[#71C0DF] transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}>Register Now</span>
                    <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-[#71C0DF] transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {secondaryEvents.map((e, i) => (
              <motion.div key={e.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="group border border-neutral-100 overflow-hidden hover:border-neutral-200 hover:shadow-sm transition-all cursor-pointer">
                <div className="relative overflow-hidden bg-neutral-100 aspect-[16/9]">
                  <ImageWithFallback src={e.image} alt={e.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                  <div className="absolute inset-0 bg-[#24578E]/20 group-hover:bg-[#24578E]/10 transition-colors" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-[#71C0DF]"
                    style={{ fontFamily: "var(--font-display)" }}>{e.category}</span>
                  <span className={`absolute top-3 right-3 px-2 py-0.5 text-[10px] font-semibold bg-[#24578E]/70 ${e.statusColor === "emerald" ? "text-emerald-400" : "text-amber-400"}`}
                    style={{ fontFamily: "var(--font-display)" }}>{e.status}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-[#0a0a0a] font-bold text-lg leading-snug mb-3 group-hover:text-[#71C0DF] transition-colors"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>{e.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-5 line-clamp-2">{e.desc}</p>
                  <div className="space-y-1.5">
                    {[{ icon: Calendar, text: e.date }, { icon: MapPin, text: e.location }].map(({ icon: Icon, text }, j) => (
                      <div key={j} className="flex items-center gap-2 text-neutral-400 text-xs">
                        <Icon className="w-3.5 h-3.5 text-[#71C0DF]" />{text}
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0a0a0a] group-hover:text-[#71C0DF] transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}>View Details</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-[#71C0DF] transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-neutral-100 pt-14">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
              <h2 className="text-2xl font-bold text-[#0a0a0a]"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>Past Events</h2>
              <p className="text-neutral-500 text-sm mt-1">A record of previous CPSAR events and activities.</p>
            </motion.div>
            <div className="divide-y divide-neutral-100">
              {past.map((e, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between py-4 group cursor-pointer hover:bg-neutral-50 -mx-5 sm:-mx-8 px-5 sm:px-8 transition-colors">
                  <div className="flex items-center gap-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#71C0DF] w-20 flex-shrink-0"
                      style={{ fontFamily: "var(--font-display)" }}>{e.category}</span>
                    <span className="text-sm font-medium text-[#0a0a0a] group-hover:text-[#71C0DF] transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}>{e.title}</span>
                  </div>
                  <span className="text-xs text-neutral-400 flex-shrink-0 ml-4">{e.date}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
