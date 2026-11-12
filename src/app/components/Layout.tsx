"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement;
      const scrollableHeight = root.scrollHeight - root.clientHeight;
      setProgress(scrollableHeight > 0 ? (root.scrollTop / scrollableHeight) * 100 : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[100] h-0.5 bg-[#71C0DF] transition-[width] duration-75"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const desktopHeaderOverlapRoutes = ["/about", "/leadership", "/membership", "/programs", "/events", "/resources", "/partners", "/gallery", "/news", "/search", "/alumni", "/contact", "/donate"];
  const needsDesktopHeaderOffset = desktopHeaderOverlapRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  if (pathname.startsWith("/admin")) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <a
        href="#maincontent"
        className="fixed left-4 top-4 z-[110] -translate-y-20 rounded-md bg-white px-4 py-3 font-semibold text-[#173a60] shadow-lg outline-offset-4 focus:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#173a60]"
      >
        Skip to main content
      </a>
      <Navigation />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          id="maincontent"
          tabIndex={-1}
          className={`flex-1 scroll-mt-24 outline-none ${needsDesktopHeaderOffset ? "pt-16 xl:pt-28" : ""}`}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <BackToTop />
    </div>
  );
}
