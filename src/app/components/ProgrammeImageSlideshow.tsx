"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

type Props = {
  images: string[];
  title: string;
  href: string;
  heightClassName?: string;
};

export function ProgrammeImageSlideshow({ images, title, href, heightClassName = "h-64" }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (images.length < 2 || paused || reduceMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [images.length, paused, reduceMotion]);

  if (images.length === 0) return null;

  return (
    <Link href={href} aria-label={`View ${title}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false); }} className={`group relative block overflow-hidden bg-slate-100 ${heightClassName}`}>
      {images.map((image, index) => (
        <Image
          key={`${image}-${index}`}
          src={image}
          alt={`${title} — photo ${index + 1} of ${images.length}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
          className={`object-cover transition-[opacity,transform] duration-700 ease-in-out group-hover:scale-[1.025] motion-reduce:transition-none ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
          aria-hidden={index !== activeIndex}
          priority={index === 0}
        />
      ))}
      {images.length > 1 && (
        <span className="absolute inset-x-0 bottom-0 flex justify-center gap-1.5 pb-3" aria-hidden="true">
          {images.map((image, index) => (
            <span key={`${image}-dot-${index}`} className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/65"}`} />
          ))}
        </span>
      )}
    </Link>
  );
}
