import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function CTASection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#173a60]">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <ImageWithFallback
          src="/images/HagyImagesStudio0782569627(90).jpg"
          alt=""
          className="size-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#173a60] via-[#173a60]/95 to-[#173a60]/70" />
      </div>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9be0f5]">Get involved</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">Be part of CPSAR.</h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-blue-100 sm:text-lg">Connect with Rwanda’s clinical psychology student community and take part in its work.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/membership" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#173a60] transition hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none">Explore membership <ArrowRight aria-hidden="true" className="size-4" /></Link>
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/50 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none">Contact CPSAR</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
