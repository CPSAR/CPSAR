import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Learn",
    description: "Explore programmes, resources, and research that support clinical psychology students.",
    link: "Explore programmes",
    href: "/programs",
  },
  {
    number: "02",
    title: "Practice",
    description: "Build experience through workshops, seminars, and learning alongside peers.",
    link: "Browse upcoming events",
    href: "/events",
  },
  {
    number: "03",
    title: "Serve",
    description: "Contribute to mental health advocacy and community engagement across Rwanda.",
    link: "Become a member",
    href: "/membership",
  },
];

export function JourneySection() {
  return (
    <section id="home-journey" aria-labelledby="home-journey-title" className="scroll-mt-24 bg-[#173a60] py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9be0f5]">The CPSAR journey</p>
          <h2 id="home-journey-title" className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Learn. Practice. <span className="text-[#9be0f5]">Serve.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-blue-100">
            A student community connecting knowledge, professional growth, and service to mental health in Rwanda.
          </p>
        </div>

        <ol className="mt-10 grid border-t border-white/20 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.number}
              className={`py-7 md:px-7 md:py-8 ${
                index < steps.length - 1 ? "border-b border-white/20 md:border-b-0 md:border-r" : ""
              } ${index > 0 ? "md:pl-8" : "md:pl-0"}`}
            >
              <p className="text-sm font-bold tracking-[0.16em] text-[#9be0f5]">{step.number}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-blue-100">{step.description}</p>
              <Link
                href={step.href}
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-white underline-offset-4 hover:text-[#9be0f5] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {step.link}
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
