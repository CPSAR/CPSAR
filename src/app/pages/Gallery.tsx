"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn, Grid3X3, LayoutList } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const categories = ["All", "Conferences", "Workshops", "Outreach", "Team"];

const galleryItems = [
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop", alt: "Annual CPSAR Conference 2025", category: "Conferences", caption: "Annual National Conference 2025, Kigali" },
  { src: "https://images.unsplash.com/photo-1744973149087-179e3ed54eae?w=600&h=800&fit=crop", alt: "Workshop participants", category: "Workshops", caption: "CBT Skills Workshop, University of Rwanda" },
  { src: "https://images.unsplash.com/photo-1678132218412-0f18fab9b537?w=800&h=500&fit=crop", alt: "Community outreach session", category: "Outreach", caption: "Community Mental Health Outreach, Musanze" },
  { src: "https://images.unsplash.com/photo-1744973056064-0484e01486fc?w=600&h=700&fit=crop", alt: "Leadership team", category: "Team", caption: "CPSAR Executive Committee 2025/2026" },
  { src: "https://images.unsplash.com/photo-1778230123972-07eafe417fc4?w=800&h=600&fit=crop", alt: "Mental health professionals", category: "Conferences", caption: "Keynote Panel — Mental Health in East Africa" },
  { src: "https://images.unsplash.com/photo-1744973149714-46786187c6aa?w=600&h=900&fit=crop", alt: "Student presentation", category: "Conferences", caption: "Student Research Presentation Competition" },
  { src: "https://images.unsplash.com/photo-1592392821486-71f028a00581?w=800&h=600&fit=crop", alt: "Group therapy workshop", category: "Workshops", caption: "Group Therapy Techniques Workshop" },
  { src: "https://images.unsplash.com/photo-1744973004697-f0c468d6dfc4?w=700&h=500&fit=crop", alt: "Award ceremony", category: "Team", caption: "Excellence Awards Ceremony 2025" },
  { src: "https://images.unsplash.com/photo-1689763408012-8aa7d2dcd3d0?w=600&h=800&fit=crop", alt: "Community engagement", category: "Outreach", caption: "School Mental Health Awareness Drive" },
  { src: "https://images.unsplash.com/photo-1729844106587-15464ab65ad5?w=800&h=700&fit=crop", alt: "Student networking", category: "Team", caption: "CPSAR Annual Member Gathering" },
  { src: "https://images.unsplash.com/photo-1604480132736-44c188fe4d20?w=800&h=500&fit=crop", alt: "Research symposium", category: "Conferences", caption: "Research Symposium — Psychology & Society" },
  { src: "https://images.unsplash.com/photo-1621887348744-6b0444f8a058?w=600&h=800&fit=crop", alt: "Mental health awareness", category: "Outreach", caption: "World Mental Health Day Campaign" },
];

type ViewMode = "masonry" | "grid";

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<typeof galleryItems[0] | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("masonry");

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((i) => i.category === activeCategory);

  return (
    <div className="pt-[60px] lg:pt-[92px]">

      {/* Hero */}
      <section className="bg-[#24578E] pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[#71C0DF] text-xs font-bold uppercase tracking-[0.15em] mb-6"
              style={{ fontFamily: "var(--font-display)" }}>Gallery</p>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white max-w-3xl leading-[1.0]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
            >
              Moments That Define Us.
            </h1>
            <p className="text-white/45 text-xl mt-6 max-w-lg leading-relaxed">
              Conferences, workshops, outreach programmes, and community events — captured in photographs.
            </p>
            <div className="flex items-center gap-2 mt-8 text-white/25 text-sm">
              <span style={{ fontFamily: "var(--font-display)" }}>{galleryItems.length} photos</span>
              <span>·</span>
              <span style={{ fontFamily: "var(--font-display)" }}>{categories.length - 1} categories</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky filter + view toggle */}
      <div className="sticky top-[60px] lg:top-[92px] bg-white/95 backdrop-blur-sm border-b border-neutral-100 z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between py-4 gap-4">
            {/* Category filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto flex-1" style={{ scrollbarWidth: "none" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border ${
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
            {/* View toggle */}
            <div className="flex items-center gap-1 flex-shrink-0 border border-neutral-200">
              <button
                onClick={() => setViewMode("masonry")}
                className={`p-2 transition-colors ${viewMode === "masonry" ? "bg-[#24578E] text-white" : "text-neutral-400 hover:text-[#0a0a0a]"}`}
                aria-label="Masonry layout"
              >
                <LayoutList className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${viewMode === "grid" ? "bg-[#24578E] text-white" : "text-neutral-400 hover:text-[#0a0a0a]"}`}
                aria-label="Grid layout"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {viewMode === "masonry" ? (
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 2, 1024: 3 }}>
                  <Masonry gutter="12px">
                    {filtered.map((item, i) => (
                      <motion.div
                        key={item.src}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="relative group cursor-pointer overflow-hidden bg-neutral-100"
                        onClick={() => setLightbox(item)}
                      >
                        <ImageWithFallback
                          src={item.src}
                          alt={item.alt}
                          className="w-full object-cover block group-hover:scale-[1.02] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#24578E]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <span
                              className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white bg-[#71C0DF] mb-2"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              {item.category}
                            </span>
                            <p className="text-white text-sm font-medium leading-snug"
                              style={{ fontFamily: "var(--font-display)" }}>
                              {item.caption}
                            </p>
                          </div>
                          <div className="absolute top-3 right-3 w-8 h-8 bg-white/15 backdrop-blur-sm flex items-center justify-center">
                            <ZoomIn className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {filtered.map((item, i) => (
                    <motion.div
                      key={item.src}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="relative group cursor-pointer overflow-hidden bg-neutral-100 aspect-square"
                      onClick={() => setLightbox(item)}
                    >
                      <ImageWithFallback
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-[#24578E]/0 group-hover:bg-[#24578E]/50 transition-colors duration-300 flex items-center justify-center">
                        <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-neutral-300 text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
                No photos in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#24578E]/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-12 right-0 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="overflow-hidden bg-[#24578E]">
                <ImageWithFallback
                  src={lightbox.src.replace(/w=\d+/, "w=1400").replace(/h=\d+/, "h=900")}
                  alt={lightbox.alt}
                  className="w-full object-contain max-h-[80vh]"
                />
              </div>
              <div className="mt-4 flex items-center gap-4">
                <span
                  className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-[#71C0DF]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {lightbox.category}
                </span>
                <p className="text-white/70 text-sm" style={{ fontFamily: "var(--font-display)" }}>
                  {lightbox.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
