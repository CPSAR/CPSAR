import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const values = [
  { label: "Mission", text: "Advance clinical psychology education and practice in Rwanda through collaboration, research, and community engagement." },
  { label: "Vision", text: "To be an excellent organization in promoting mental health and well-being and awareness in the community." },
  { label: "Values", text: "Excellence · Compassion · Integrity · Collaboration · Cultural Sensitivity · Innovation" },
];

export function AboutPreview() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Left */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#24578E]">About CPSAR</p>
            <h2
              className="mb-6 max-w-xl text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
            >
              Building Tomorrow&apos;s Mental Health Leaders.
            </h2>
            <p className="mb-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              The Clinical Psychology Students Association of Rwanda (CPSAR) is a student-led organization dedicated to advancing mental health education, research, and advocacy — bringing together aspiring psychologists from universities across the nation.
            </p>
            <Link
              href="/about"
              className="group inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-[#24578E] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#24578E]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Learn more about us
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
            </Link>
          </div>

          {/* Right */}
          <div className="space-y-0">
            {/* Image */}
            <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
              <ImageWithFallback
                src="/images/HagyImagesStudio0782569627(117).jpg"
                alt="CPSAR members at a conference"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-lg bg-[#173a60]/90 px-4 py-3 backdrop-blur-sm">
                <span className="text-white text-sm font-medium" style={{ fontFamily: "var(--font-display)" }}>
                  CPSAR · Rwanda
                </span>
              </div>
            </div>

            {/* Values */}
            <div className="divide-y divide-neutral-100">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="flex gap-6 py-4 sm:gap-8"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-300 w-16 flex-shrink-0 pt-0.5"
                    style={{ fontFamily: "var(--font-display)" }}>
                    {v.label}
                  </span>
                  <p className="text-neutral-600 text-sm leading-relaxed">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
