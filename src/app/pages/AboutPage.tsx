import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Target, Eye, Heart, Award, Users, TrendingUp, ShieldCheck, BookOpen, HandHeart } from "lucide-react";

const values = [
  { icon: Award, title: "Excellence", desc: "Striving for the highest standards in clinical psychology education, research, and professional practice." },
  { icon: Heart, title: "Compassion", desc: "Approaching mental health with deep empathy, understanding, and cultural sensitivity in all our work." },
  { icon: Users, title: "Collaboration", desc: "Believing that the most meaningful progress in mental health happens when we work together." },
  { icon: ShieldCheck, title: "Integrity", desc: "Operating with transparency, honesty, and unwavering commitment to our members and the communities we serve." },
  { icon: TrendingUp, title: "Innovation", desc: "Embracing new approaches to mental health education, advocacy, and community engagement across Rwanda." },
  { icon: Target, title: "Advocacy", desc: "Giving clinical psychology students a collective voice in national health policy, education, and public discourse." },
];

export function AboutPage() {
  return (
    <main className="pt-[60px] lg:pt-[92px] text-slate-900">
      <section className="overflow-hidden border-b border-slate-200 bg-[#f4f8fb]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:py-20">
          <div className="py-2">
            <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#24578E]">
              <span aria-hidden="true" className="h-px w-8 bg-[#71C0DF]" /> About CPSAR
            </p>
            <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-[#173a60] sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
              A community shaping the future of <span className="text-[#3184aa]">psychology.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              We are a not-for-profit student association building Rwanda&apos;s next generation of clinical psychologists through community, research, and advocacy.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/programs" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#24578E] px-6 text-sm font-bold text-white transition-colors hover:bg-[#173a60] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#24578E]">
                Explore our work <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link href="/membership" className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#24578E]/30 px-6 text-sm font-semibold text-[#173a60] transition-colors hover:border-[#24578E] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#24578E]">
                Become a member
              </Link>
            </div>
          </div>
          <figure className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div aria-hidden="true" className="absolute -right-3 -top-3 h-full w-full rounded-2xl border-2 border-[#71C0DF] sm:-right-4 sm:-top-4" />
            <div className="relative overflow-hidden rounded-2xl bg-slate-200 shadow-xl shadow-[#173a60]/15">
              <Image src="/images/HagyImagesStudio0782569627.jpg" alt="CPSAR members coming together as a community" width={1200} height={900} priority sizes="(max-width: 1024px) 100vw, 45vw" className="aspect-[5/4] w-full object-cover" />
            </div>
            <figcaption className="relative mt-3 text-right text-xs font-medium tracking-wide text-slate-500">Learning, connection, and service</figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="about-story-title" className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#24578E]">Our story</p>
            <h2 id="about-story-title" className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
              Born from a need. Built for purpose.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-slate-600">
              <p>CPSAR began when a small group of clinical psychology students at the University of Rwanda recognised that their profession lacked a unified student voice — a community where aspiring psychologists could connect, learn, and advocate together.</p>
              <p>What started as a student group has grown into Rwanda&apos;s national clinical psychology student association, with members across universities throughout the country.</p>
              <p>Today, CPSAR provides professional development, research opportunities, community outreach programmes, and a collective voice in mental health policy — all operating as a not-for-profit association in the interest of its members.</p>
            </div>
            <blockquote className="mt-8 border-l-4 border-[#71C0DF] bg-slate-50 px-5 py-5 sm:px-6">
              <p className="text-base font-semibold leading-7 text-[#173a60]" style={{ fontFamily: "var(--font-display)" }}>&ldquo;Empowering clinical psychology students to provide psychological influence — making the world a better place, one community at a time.&rdquo;</p>
              <cite className="mt-2 block text-sm not-italic text-slate-500">CPSAR Mission Statement</cite>
            </blockquote>
          </div>
          <figure className="overflow-hidden rounded-2xl bg-slate-100 shadow-xl shadow-[#173a60]/10">
            <Image src="/images/HagyImagesStudio0782569627.jpg" alt="CPSAR members coming together as a community" width={1200} height={900} sizes="(max-width: 1024px) 100vw, 48vw" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="border-t border-slate-100 bg-white px-5 py-4 text-sm text-slate-600">A community of students learning, connecting, and advocating together.</figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="about-purpose-title" className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#24578E]">Our purpose</p>
            <h2 id="about-purpose-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>A shared direction for our work.</h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex size-11 items-center justify-center rounded-lg bg-[#24578E]/10 text-[#24578E]"><Target aria-hidden="true" className="size-5" /></div>
              <h3 className="mt-5 text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Our mission</h3>
              <p className="mt-3 leading-7 text-slate-600">Advance psychology through collaboration.</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex size-11 items-center justify-center rounded-lg bg-[#24578E]/10 text-[#24578E]"><Eye aria-hidden="true" className="size-5" /></div>
              <h3 className="mt-5 text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>Our vision</h3>
              <p className="mt-3 leading-7 text-slate-600">To be an excellent organization in promoting mental health and well-being and awareness in the community.</p>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-journey-title" className="bg-[#173a60] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9be0f5]">The CPSAR journey</p>
            <h2 id="about-journey-title" className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Learn. Practice. <span className="text-[#9be0f5]">Serve.</span></h2>
            <p className="mt-4 leading-7 text-blue-100">Discover how students can connect learning, professional growth, and service to mental health in Rwanda.</p>
          </div>
          <ol className="mt-10 grid border-t border-white/20 md:grid-cols-3">
            {[
              { number: "01", title: "Learn", Icon: BookOpen, description: "Explore programmes, resources, and research that support clinical psychology students.", label: "Explore programmes", href: "/programs" },
              { number: "02", title: "Practice", Icon: Users, description: "Build experience through workshops, seminars, and learning alongside peers.", label: "Browse events", href: "/events" },
              { number: "03", title: "Serve", Icon: HandHeart, description: "Contribute to mental health advocacy and community engagement across Rwanda.", label: "Become a member", href: "/membership" },
            ].map(({ number, title, Icon, description, label, href }, index) => (
              <li key={number} className={`py-7 md:px-7 md:py-8 ${index < 2 ? "border-b border-white/20 md:border-b-0 md:border-r" : ""} ${index > 0 ? "md:pl-8" : "md:pl-0"}`}>
                <div className="flex items-center justify-between"><span className="text-sm font-bold tracking-[0.16em] text-[#9be0f5]">{number}</span><Icon aria-hidden="true" className="size-5 text-[#9be0f5]" /></div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-blue-100">{description}</p>
                <Link href={href} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:text-[#9be0f5] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  {label}<ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="about-values-title" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#24578E]">Core values</p>
            <h2 id="about-values-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>What guides us.</h2>
            <p className="mt-4 leading-7 text-slate-600">The principles behind how we learn, work together, and serve our communities.</p>
          </div>
          <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <li key={value.title} className="rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-[#71C0DF] hover:bg-slate-50">
                <div className="flex size-11 items-center justify-center rounded-lg bg-[#24578E]/10 text-[#24578E]"><value.icon aria-hidden="true" className="size-5" /></div>
                <h3 className="mt-4 text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{value.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#24578E] py-14 text-white sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9be0f5]">Leadership</p>
            <h2 className="mt-3 max-w-2xl text-2xl font-bold leading-tight sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>Meet the people driving CPSAR forward.</h2>
          </div>
          <Link href="/leadership" className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-md bg-white px-6 text-sm font-bold text-[#173a60] transition-colors hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:self-auto">
            Meet the team <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
