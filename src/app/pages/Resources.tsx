"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Search, BookOpen, FileText, Briefcase, Brain, Download, ArrowUpRight, Filter } from "lucide-react";

const CATEGORIES = ["All", "Study Materials", "Research", "Career Guidance", "Articles"];

const resources = [
  {
    title: "Introduction to Cognitive Behavioural Therapy",
    category: "Study Materials",
    type: "PDF",
    icon: BookOpen,
    desc: "A comprehensive practitioner guide to CBT principles, session structure, and evidence-based techniques for clinical settings.",
    pages: "48 pages",
    featured: true,
  },
  {
    title: "Mental Health Assessment Tools in East Africa",
    category: "Research",
    type: "PDF",
    icon: FileText,
    desc: "Collection of validated assessment instruments adapted for use in Rwandan and East African clinical contexts.",
    pages: "62 pages",
    featured: false,
  },
  {
    title: "Career Pathways in Clinical Psychology",
    category: "Career Guidance",
    type: "PDF",
    icon: Briefcase,
    desc: "Exploring specialisations, career trajectories, postgraduate options, and how to build a clinical psychology career in Rwanda.",
    pages: "35 pages",
    featured: false,
  },
  {
    title: "Trauma-Informed Care: Principles and Practice",
    category: "Articles",
    type: "PDF",
    icon: Brain,
    desc: "Evidence-based approaches to trauma treatment with culturally adapted frameworks for the Rwandan and East African context.",
    pages: "28 pages",
    featured: false,
  },
  {
    title: "Research Methods in Psychology",
    category: "Study Materials",
    type: "PDF",
    icon: BookOpen,
    desc: "Statistical analysis, quantitative and qualitative research design, and academic writing for psychology graduate students.",
    pages: "74 pages",
    featured: false,
  },
  {
    title: "Cultural Competency in Mental Health Practice",
    category: "Articles",
    type: "PDF",
    icon: Brain,
    desc: "Culturally sensitive clinical practice frameworks developed specifically for the Rwandan and East African context.",
    pages: "41 pages",
    featured: false,
  },
  {
    title: "Mental Health Policy Landscape in Rwanda",
    category: "Research",
    type: "PDF",
    icon: FileText,
    desc: "An overview of national mental health policy, legislation, available services, and advocacy priorities.",
    pages: "55 pages",
    featured: false,
  },
  {
    title: "Clinical Internship Preparation Guide",
    category: "Career Guidance",
    type: "PDF",
    icon: Briefcase,
    desc: "How to find, apply for, and succeed in clinical placements and supervised internships in Rwanda.",
    pages: "30 pages",
    featured: false,
  },
  {
    title: "Group Therapy: Theory and Application",
    category: "Study Materials",
    type: "PDF",
    icon: BookOpen,
    desc: "Theoretical foundations and practical guidance for facilitating group therapy in community and clinical settings.",
    pages: "52 pages",
    featured: false,
  },
];

export function Resources() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = resources.filter((r) => {
    const matchCat = activeCategory === "All" || r.category === activeCategory;
    const matchQ = !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.desc.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const featuredResource = resources.find((r) => r.featured);

  return (
    <div className="pt-[60px] lg:pt-[92px]">

      {/* Dark hero with integrated search */}
      <section className="bg-[#24578E] pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#71C0DF] text-xs font-bold uppercase tracking-[0.15em] mb-6">Resources</p>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white max-w-3xl leading-[1.0] mb-6"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
            >
              Knowledge Hub.
            </h1>
            <p className="text-white/45 text-lg max-w-xl leading-relaxed mb-10">
              Curated study materials, research publications, career guides, and mental health resources — free for all CPSAR members.
            </p>
            {/* Search in hero */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search resources..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white/8 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#71C0DF]/50 transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="bg-white">

        {/* Featured resource */}
        {featuredResource && !query && activeCategory === "All" && (
          <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-14 pb-10 border-b border-neutral-100">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-[#71C0DF] text-xs font-bold uppercase tracking-[0.15em] mb-6"
                style={{ fontFamily: "var(--font-display)" }}>Editor's Pick</p>
              <a href="#" className="group flex flex-col sm:flex-row gap-8 p-8 border border-neutral-100 hover:border-neutral-200 bg-neutral-50 hover:bg-white transition-all">
                <div className="w-14 h-14 flex-shrink-0 bg-[#71C0DF]/10 flex items-center justify-center">
                  <featuredResource.icon className="w-6 h-6 text-[#71C0DF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#71C0DF] mb-2 block"
                    style={{ fontFamily: "var(--font-display)" }}>{featuredResource.category}</span>
                  <h3
                    className="text-[#0a0a0a] font-bold text-xl mb-3 group-hover:text-[#71C0DF] transition-colors"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                  >
                    {featuredResource.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-4">{featuredResource.desc}</p>
                  <div className="flex items-center gap-5 text-neutral-400 text-xs">
                    <span className="flex items-center gap-1.5"><FileText className="w-3 h-3" /> {featuredResource.type} · {featuredResource.pages}</span>
                    <span className="flex items-center gap-1.5 text-[#71C0DF] font-semibold hover:underline">
                      <Download className="w-3 h-3" /> Download free
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-neutral-200 group-hover:text-[#71C0DF] transition-colors flex-shrink-0 mt-1 self-start" />
              </a>
            </motion.div>
          </section>
        )}

        {/* Filter bar + list */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12">

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-8 border-b border-neutral-100">
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-3.5 h-3.5 text-neutral-300 flex-shrink-0" />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                    activeCategory === cat
                      ? "bg-[#24578E] text-white border-[#24578E]"
                      : "bg-white text-neutral-400 border-neutral-200 hover:border-neutral-400 hover:text-[#0a0a0a]"
                  }`}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="text-xs text-neutral-400 flex-shrink-0">
              {filtered.length} resource{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Resource rows */}
          <div className="divide-y divide-neutral-100">
            {filtered.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <a
                  href="#"
                  className="group flex items-start gap-5 py-6 hover:bg-neutral-50 -mx-5 sm:-mx-8 px-5 sm:px-8 transition-colors"
                >
                  <div className="w-10 h-10 flex-shrink-0 bg-neutral-100 group-hover:bg-[#71C0DF]/10 flex items-center justify-center transition-colors mt-0.5">
                    <r.icon className="w-4.5 h-4.5 text-neutral-400 group-hover:text-[#71C0DF] transition-colors" style={{ width: "18px", height: "18px" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <span
                          className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#71C0DF] mb-1.5 block"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {r.category}
                        </span>
                        <h3
                          className="text-[#0a0a0a] font-bold text-[15px] leading-snug mb-1.5 group-hover:text-[#71C0DF] transition-colors"
                          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
                        >
                          {r.title}
                        </h3>
                        <p className="text-neutral-500 text-sm leading-relaxed hidden sm:block">{r.desc}</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-neutral-200 group-hover:text-[#71C0DF] transition-colors flex-shrink-0 mt-1" />
                    </div>
                    <div className="flex items-center gap-5 mt-3 text-neutral-400 text-xs">
                      <span className="flex items-center gap-1.5">
                        <FileText className="w-3 h-3" /> {r.type} · {r.pages}
                      </span>
                      <button className="flex items-center gap-1.5 text-[#71C0DF] font-semibold hover:underline">
                        <Download className="w-3 h-3" /> Download
                      </button>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-neutral-300 text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                No resources found.
              </p>
              <p className="text-neutral-400 text-sm">Try a different search term or category.</p>
              <button
                onClick={() => { setQuery(""); setActiveCategory("All"); }}
                className="mt-6 text-sm font-semibold text-[#71C0DF] hover:underline"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
