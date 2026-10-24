"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Calendar, User, ArrowUpRight, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const CATEGORIES = ["All", "Conference", "Research", "Outreach", "Opportunities", "Partnership"];

const featured = {
  title: "CPSAR Hosts Largest Mental Health Conference in East Africa",
  excerpt:
    "Clinicians, researchers, and students from across the region gathered for three days of keynotes, research presentations, and professional networking — marking a watershed moment for clinical psychology in Rwanda.",
  author: "Marie Uwase",
  date: "June 10, 2026",
  category: "Conference",
  readTime: "5 min read",
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=700&fit=crop",
};

const posts = [
  {
    title: "New Research on Trauma Recovery in Rwanda Published",
    excerpt: "CPSAR members contribute to a groundbreaking study on culturally-adapted psychosocial interventions.",
    author: "Grace Umuhoza",
    date: "June 8, 2026",
    category: "Research",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1604480132736-44c188fe4d20?w=600&h=400&fit=crop",
  },
  {
    title: "Mental Health Awareness Campaign Reaches 5,000 Students",
    excerpt: "Our campus outreach initiative spread awareness across 10 universities throughout Rwanda.",
    author: "Patrick Habimana",
    date: "June 5, 2026",
    category: "Outreach",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1744973149087-179e3ed54eae?w=600&h=400&fit=crop",
  },
  {
    title: "Scholarship Opportunities for Clinical Psychology Students",
    excerpt: "Applications are now open for our scholarship programme supporting graduate studies in clinical psychology.",
    author: "Jean Claude Mutabazi",
    date: "June 1, 2026",
    category: "Opportunities",
    readTime: "2 min read",
    image: "https://images.unsplash.com/photo-1744973004697-f0c468d6dfc4?w=600&h=400&fit=crop",
  },
  {
    title: "Partnership with International Mental Health Organisation",
    excerpt: "CPSAR formalises a partnership with global leaders to enhance clinical training and research capacity.",
    author: "Diane Mukamana",
    date: "May 28, 2026",
    category: "Partnership",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1778230123972-07eafe417fc4?w=600&h=400&fit=crop",
  },
  {
    title: "Reflections on World Mental Health Day 2025",
    excerpt: "A recap of our nationwide awareness events and the communities we reached across all five provinces.",
    author: "Claudine Ingabire",
    date: "May 20, 2026",
    category: "Outreach",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1592392821486-71f028a00581?w=600&h=400&fit=crop",
  },
  {
    title: "Research Methodology Workshop — A Member Perspective",
    excerpt: "Members share key takeaways from our advanced statistics and research design workshop at UR.",
    author: "Emmanuel Nzeyimana",
    date: "May 14, 2026",
    category: "Research",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1678132218412-0f18fab9b537?w=600&h=400&fit=crop",
  },
];

function ArticleCard({ post, index }: { post: typeof posts[0]; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
    >
      <a href="#" className="group block h-full">
        <div className="relative overflow-hidden bg-neutral-100 aspect-[3/2] mb-5">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-[#24578E]/15 group-hover:bg-[#24578E]/5 transition-colors" />
          <span
            className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-[#71C0DF]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.category}
          </span>
        </div>
        <h3
          className="text-[#0a0a0a] font-bold text-lg leading-snug mb-2 group-hover:text-[#71C0DF] transition-colors"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}
        >
          {post.title}
        </h3>
        <p className="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between text-neutral-400 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <User className="w-3 h-3" /> {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> {post.date}
            </span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-[#71C0DF] transition-colors" />
        </div>
      </a>
    </motion.article>
  );
}

export function News() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-[60px] lg:pt-[92px]">

      {/* Dark hero */}
      <section className="bg-[#24578E] pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#71C0DF] text-xs font-bold uppercase tracking-[0.15em] mb-6">News & Blog</p>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white max-w-3xl leading-[1.0]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
            >
              Stories from Our Community.
            </h1>
            <p className="text-white/45 text-xl mt-6 max-w-lg leading-relaxed">
              Insights, research updates, event recaps, and opportunities from the people shaping CPSAR.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="bg-white">

        {/* Featured article */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-14 border-b border-neutral-100">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <a href="#" className="group grid lg:grid-cols-[1fr_380px] border border-neutral-100 overflow-hidden hover:border-neutral-200 transition-colors">
              {/* Image */}
              <div className="relative overflow-hidden bg-neutral-100 aspect-[16/9] lg:aspect-auto">
                <ImageWithFallback
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#24578E]/20 group-hover:bg-[#24578E]/10 transition-colors" />
                <span
                  className="absolute top-5 left-5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-[#71C0DF]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {featured.category}
                </span>
              </div>
              {/* Content */}
              <div className="flex flex-col justify-between p-8 lg:p-10 bg-white border-t lg:border-t-0 lg:border-l border-neutral-100">
                <div>
                  <p className="text-[#71C0DF] text-xs font-bold uppercase tracking-wider mb-5"
                    style={{ fontFamily: "var(--font-display)" }}>
                    Featured Story
                  </p>
                  <h2
                    className="text-2xl lg:text-3xl font-bold text-[#0a0a0a] mb-4 leading-snug group-hover:text-[#71C0DF] transition-colors"
                    style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-8">{featured.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-neutral-400 text-xs">
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {featured.author}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {featured.date}</span>
                    <span className="text-neutral-300">·</span>
                    <span>{featured.readTime}</span>
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-neutral-100 pt-6">
                  <span className="text-sm font-semibold text-[#0a0a0a] group-hover:text-[#71C0DF] transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}>
                    Read full article
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-neutral-300 group-hover:text-[#71C0DF] transition-colors" />
                </div>
              </div>
            </a>
          </motion.div>
        </section>

        {/* Filter + Grid */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 py-14">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
            {/* Category filters */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2"
            >
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
            </motion.div>
            <span className="text-xs text-neutral-400 flex-shrink-0">
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filtered.map((post, i) => (
              <ArticleCard key={post.title} post={post} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-14 flex justify-center"
          >
            <button
              className="inline-flex items-center gap-2 px-8 py-3 border border-neutral-200 text-sm font-semibold text-neutral-500 hover:border-[#0a0a0a] hover:text-[#0a0a0a] transition-all"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Load more articles <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </section>

        {/* Newsletter band */}
        <section className="bg-[#24578E] py-16">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[#71C0DF] text-xs font-bold uppercase tracking-[0.15em] mb-3"
                  style={{ fontFamily: "var(--font-display)" }}>Newsletter</p>
                <h3
                  className="text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}
                >
                  Stay up to date with CPSAR.
                </h3>
                <p className="text-white/40 text-sm">
                  News, events, and resources — delivered to your inbox. No spam, ever.
                </p>
              </div>
              {subscribed ? (
                <div className="flex items-center gap-3 text-[#71C0DF]">
                  <div className="w-5 h-5 bg-[#71C0DF] flex items-center justify-center text-white text-xs font-bold">✓</div>
                  <span className="text-sm font-medium" style={{ fontFamily: "var(--font-display)" }}>
                    You're subscribed — thank you!
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-white/6 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#71C0DF]/60 transition-colors"
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 px-5 py-3 bg-[#71C0DF] text-white text-sm font-semibold hover:bg-[#71C0DF]/90 transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
