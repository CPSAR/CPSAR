import type { ReactNode } from "react";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageIntro({ eyebrow, title, description, children }: PageIntroProps) {
  return (
    <header className="relative isolate overflow-hidden border-b border-[#dbe6ee] bg-[#f2f7fa]">
      <div aria-hidden="true" className="absolute -right-24 -top-36 -z-10 size-[25rem] rounded-full border border-[#24578E]/[0.07] sm:size-[32rem]" />
      <div aria-hidden="true" className="absolute -right-8 -top-20 -z-10 size-[19rem] rounded-full border border-[#24578E]/[0.06] sm:size-[25rem]" />
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-28 sm:px-8 sm:pb-[4.5rem] sm:pt-32 lg:pb-20 lg:pt-36">
        <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#24578E]">
          <span aria-hidden="true" className="h-px w-8 bg-[#71C0DF]" />
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1.04] tracking-[-0.045em] text-[#173a60] [text-wrap:balance]">
          {title}
        </h1>
        {description && <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{description}</p>}
        {children}
      </div>
    </header>
  );
}
