"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const photoStrip = [
  "/images/HagyImagesStudio0782569627.jpg",
  "/images/HagyImagesStudio0782569627(1).jpg",
  "/images/HagyImagesStudio0782569627(109).jpg",
  "/images/HagyImagesStudio0782569627(117).jpg",
  "/images/HagyImagesStudio0782569627(153).jpg",
  "/images/HagyImagesStudio0782569627(2).jpg",
  "/images/HagyImagesStudio0782569627(22).jpg",
  "/images/HagyImagesStudio0782569627(90).jpg",
];

const allPhotos = [...photoStrip, ...photoStrip];

export function HeroSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let position = 0;

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      track.style.transform = "translateX(0)";
    };

    const tick = () => {
      if (reducedMotion.matches) return stop();
      position += 0.35;
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth > 0 && position >= halfWidth) position = 0;
      track.style.transform = `translateX(-${position}px)`;
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      stop();
      position = 0;
      if (!reducedMotion.matches) frame = requestAnimationFrame(tick);
    };

    reducedMotion.addEventListener("change", start);
    start();
    return () => {
      reducedMotion.removeEventListener("change", start);
      stop();
    };
  }, []);

  return (
    <section className="relative flex min-h-[min(900px,100svh)] flex-col overflow-hidden bg-[#102b4b]">
      <div className="absolute inset-0" aria-hidden="true">
        <ImageWithFallback
          src="/images/HagyImagesStudio0782569627.jpg"
          alt=""
          className="size-full object-cover opacity-25"
          fetchPriority="high"
        />
        <div className="absolute inset-y-0 right-0 hidden w-[52%] grid-cols-2 grid-rows-2 gap-2 overflow-hidden p-3 opacity-75 lg:grid xl:w-[48%]">
          {[
            "/images/HagyImagesStudio0782569627(1).jpg",
            "/images/HagyImagesStudio0782569627(109).jpg",
            "/images/HagyImagesStudio0782569627(117).jpg",
            "/images/HagyImagesStudio0782569627(153).jpg",
          ].map((src) => (
            <div key={src} className="relative min-h-0 overflow-hidden rounded-2xl bg-[#24578E] ring-1 ring-white/15">
              <ImageWithFallback src={src} alt="" className="size-full object-cover" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#102b4b] via-[#173a60]/95 via-50% to-[#116080]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#102b4b]/30 via-transparent to-[#102b4b]/90" />
        <svg className="absolute inset-y-0 left-0 h-full w-[55%] opacity-[0.13]" viewBox="0 0 640 900" preserveAspectRatio="xMinYMid slice" aria-hidden="true">
          <defs>
            <pattern id="cpsar-hero-geometry" width="88" height="88" patternUnits="userSpaceOnUse">
              <path d="M44 0 88 44 44 88 0 44 44 0Zm0 0v88M0 44h88M0 0l88 88M88 0 0 88" fill="none" stroke="#a8e7f8" strokeWidth="1.4" />
              <circle cx="44" cy="44" r="7" fill="none" stroke="#a8e7f8" strokeWidth="1.4" />
            </pattern>
          </defs>
          <rect width="640" height="900" fill="url(#cpsar-hero-geometry)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-8 pt-28 sm:px-8 sm:pb-10 sm:pt-36 lg:pt-28">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#9be0f5]/30 bg-[#102b4b]/45 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#c2efff] backdrop-blur-sm sm:mb-7 sm:text-xs">
            <span aria-hidden="true" className="size-2 rounded-full bg-[#71C0DF] shadow-[0_0_14px_#71C0DF]" />
            Clinical Psychology Students Association of Rwanda
          </p>

          <h1
            className="mb-6 max-w-[17ch] text-[clamp(2.7rem,6.7vw,5.8rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white [text-wrap:balance]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Advancing mental health <span className="whitespace-nowrap">in <span className="text-[#9be0f5]">Rwanda.</span></span>
          </h1>

          <div className="max-w-xl">
            <p className="text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
              A student-led community connecting clinical psychology students in Rwanda through learning, research, and community service.
            </p>
            <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <Link
                href="/membership"
                className="group inline-flex min-h-14 w-full items-center justify-between gap-5 rounded-xl bg-[#9be0f5] px-5 py-3 text-sm font-bold text-[#102b4b] shadow-[0_12px_32px_rgba(2,20,42,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_38px_rgba(2,20,42,0.3)] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transform-none motion-reduce:transition-none sm:w-auto sm:min-w-52"
              >
                <span>Become a member</span>
                <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#102b4b]/10 transition group-hover:bg-[#102b4b]/[0.14]">
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" />
                </span>
              </Link>
              <Link
                href="/programs"
                className="group inline-flex min-h-14 w-full items-center justify-between gap-5 rounded-xl border border-white/35 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/[0.12] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transform-none motion-reduce:transition-none sm:w-auto sm:min-w-48"
              >
                <span>Explore our work</span>
                <ArrowRight aria-hidden="true" className="size-4 text-[#9be0f5] transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" />
              </Link>
            </div>
          </div>

          <a
            href="#home-paths-title"
            className="mt-7 inline-flex min-h-11 w-fit items-center gap-2 rounded-md text-sm font-medium text-white/85 underline-offset-4 transition hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
          >
            <ArrowDown aria-hidden="true" className="size-4" />
            Explore CPSAR
          </a>
        </div>
      </div>

      <div className="relative z-10 overflow-hidden border-t border-white/15" aria-hidden="true">
        <div ref={trackRef} className="flex w-max gap-2 py-2 will-change-transform">
          {allPhotos.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="h-[82px] w-[132px] shrink-0 overflow-hidden bg-[#24578E] sm:h-[110px] sm:w-[170px] lg:h-[132px] lg:w-[205px]"
            >
              <ImageWithFallback
                src={src}
                alt=""
                className="size-full object-cover opacity-80"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
