"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const slides = [
  "/images/cpsar-workshop-audience.webp",
  "/images/cpsar-workshop-speaker.webp",
  "/images/cpsar-conference-panel.webp",
  "/images/cpsar-delegates-session.webp",
  "/images/cpsar-campus-group.webp",
  "/images/cpsar-conference-hall.webp",
  "/images/cpsar-community-group.webp",
  "/images/cpsar-peer-discussion.webp",
];

export function HeroBackgroundSlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <div aria-hidden="true" className="absolute inset-0 bg-[#14365F]">
      <AnimatePresence initial={false}>
        <motion.div
          key={slides[activeSlide]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 1.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[activeSlide]}
            alt=""
            fill
            priority={activeSlide === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
