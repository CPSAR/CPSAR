import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

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

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[660px] flex-col overflow-hidden bg-[var(--cpsar-navy)] text-white sm:min-h-[700px] lg:min-h-[min(760px,calc(100svh-116px))]">
      <Image
        src="/images/HagyImagesStudio0782569627(90).jpg"
        alt=""
        fill
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* A deep blue veil protects text contrast while preserving the photo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,45,85,0.35)_0%,rgba(15,45,85,0.75)_45%,rgba(15,45,85,0.92)_100%)] max-lg:bg-[linear-gradient(180deg,rgba(15,45,85,0.42)_0%,rgba(15,45,85,0.66)_38%,rgba(15,45,85,0.94)_100%)]"
      />
      <div aria-hidden="true" className="absolute -right-56 top-1/2 size-[38rem] -translate-y-1/2 rounded-full border border-[#9be0f5]/10" />
      <div aria-hidden="true" className="absolute -right-36 top-1/2 size-[28rem] -translate-y-1/2 rounded-full border border-[#9be0f5]/10" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 items-center justify-center px-5 pb-12 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pb-16 lg:pt-32 xl:px-20">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="mb-6 inline-flex items-center justify-center gap-2 whitespace-nowrap text-[clamp(0.4375rem,2.2vw,0.85rem)] font-bold uppercase leading-none tracking-[0.15em] text-[var(--cpsar-light-blue)] sm:gap-3 sm:text-[0.85rem]">
            <span aria-hidden="true" className="h-px w-3 shrink-0 bg-[var(--cpsar-light-blue)] sm:w-8" />
            CLINICAL PSYCHOLOGY STUDENTS ASSOCIATION
            <span aria-hidden="true" className="h-px w-3 shrink-0 bg-[var(--cpsar-light-blue)] sm:w-8" />
          </p>

          <h1
            className="mx-auto max-w-[20ch] text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] tracking-[-0.045em] text-white [text-wrap:balance] [text-shadow:0_4px_28px_rgba(4,22,42,0.35)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Advancing mental health <span className="text-[var(--cpsar-light-blue)]">in Rwanda.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[48ch] text-base leading-[1.5] text-white sm:text-lg">
            A student-led community connecting clinical psychology students in Rwanda through learning, research, and community service.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/membership"
              className="group inline-flex min-h-14 w-full items-center justify-center gap-4 rounded-full bg-[var(--cpsar-light-blue)] px-7 text-sm font-bold text-[var(--cpsar-navy)] shadow-[0_12px_32px_rgba(3,17,34,0.30)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#82d5ed] hover:shadow-[0_18px_42px_rgba(3,17,34,0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transform-none motion-reduce:transition-none sm:w-auto"
            >
              Join CPSAR
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" />
            </Link>
            <Link
              href="/programs"
              className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full border-2 border-white bg-transparent px-7 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transform-none motion-reduce:transition-none sm:w-auto"
            >
              Our Work
            </Link>
          </div>

          <a
            href="#home-mission-title"
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
          >
            <ArrowDown aria-hidden="true" className="size-4" />
            Explore CPSAR
          </a>
        </div>
      </div>

      <div className="relative z-10 overflow-hidden border-t border-white/20 bg-[#102b4b]/45 py-2.5 backdrop-blur-sm" aria-hidden="true">
        <div className="cpsar-photo-marquee flex w-max gap-2 px-2">
          {[...photoStrip, ...photoStrip].map((src, index) => (
            <div key={`${src}-${index}`} className="relative h-[72px] w-[118px] shrink-0 overflow-hidden rounded-lg bg-[#24578E] ring-1 ring-white/15 sm:h-[96px] sm:w-[158px] lg:h-[108px] lg:w-[176px]">
              <Image src={src} alt="" fill sizes="(max-width: 640px) 118px, 176px" className="object-cover opacity-85 transition-opacity duration-300 hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9be0f5]/55 to-transparent" />
    </section>
  );
}
