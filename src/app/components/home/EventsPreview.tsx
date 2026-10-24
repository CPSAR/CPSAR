"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const events = [
  {
    img: "/images/HagyImagesStudio0782569627(109).jpg",
    category: "Conference",
    title: "Annual Clinical Psychology Conference 2026",
    date: "July 15–17, 2026",
    location: "Kigali Convention Centre",
    featured: true,
  },
  {
    img: "/images/HagyImagesStudio0782569627(153).jpg",
    category: "Workshop",
    title: "Trauma-Informed Care Workshop",
    date: "June 28, 2026",
    location: "University of Rwanda",
    featured: false,
  },
  {
    img: "/images/HagyImagesStudio0782569627(179).jpg",
    category: "Outreach",
    title: "Mental Health Awareness Campaign",
    date: "July 1, 2026",
    location: "Nyarugenge District",
    featured: false,
  },
];

export function EventsPreview() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[#71C0DF] text-sm font-semibold uppercase tracking-widest mb-3">Events</p>
            <h2
              className="text-4xl lg:text-5xl font-bold text-[#0a0a0a] leading-[1.05]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
            >
              Events & Activities.
            </h2>
          </motion.div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-400 hover:text-[#0a0a0a] group transition-colors flex-shrink-0"
            style={{ fontFamily: "var(--font-display)" }}
          >
            All events <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {events.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group cursor-pointer"
            >
              <Link href="/events">
                <div className="relative rounded-none overflow-hidden bg-neutral-100 aspect-[3/2] mb-5">
                  <ImageWithFallback
                    src={e.img}
                    alt={e.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#24578E]/20 group-hover:bg-[#24578E]/10 transition-colors" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 rounded-sm text-xs font-semibold text-white bg-[#71C0DF]"
                      style={{ fontFamily: "var(--font-display)" }}>
                      {e.category}
                    </span>
                  </div>
                </div>
                <h3
                  className="text-[#0a0a0a] font-bold text-lg mb-3 group-hover:text-[#71C0DF] transition-colors leading-snug"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                >
                  {e.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-neutral-400 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />{e.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />{e.location}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
