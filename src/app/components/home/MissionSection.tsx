import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function MissionSection() {
  return (
    <section aria-labelledby="home-mission-title" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#24578E]">Our mission</p>
          <h2 id="home-mission-title" className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[#173a60] [text-wrap:balance]">
            Advancing Clinical Psychology and Promoting Mental Health in Rwanda.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            CPSAR brings together clinical psychology students to advance mental health awareness, strengthen professional development, promote research and contribute to community wellbeing.
          </p>
          <Link href="/about" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#24578E] px-5 py-3 text-sm font-bold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#173a60] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#24578E] motion-reduce:transform-none motion-reduce:transition-none">
            About CPSAR <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <figure className="relative mx-auto w-full max-w-lg lg:ml-auto">
          <div aria-hidden="true" className="absolute -right-3 -top-3 h-full w-full rounded-2xl border border-[#71C0DF]/70 sm:-right-4 sm:-top-4" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#eaf1f5] shadow-[0_24px_60px_rgba(16,43,75,0.14)]">
            <Image src="/images/HagyImagesStudio0782569627(11).jpg" alt="Clinical psychology students participating in a CPSAR learning session" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
          </div>
          <figcaption className="mt-3 text-right text-xs font-medium tracking-wide text-slate-500">Students learning and connecting at a CPSAR activity</figcaption>
        </figure>
      </div>
    </section>
  );
}
