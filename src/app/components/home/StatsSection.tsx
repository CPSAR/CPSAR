"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start: number;
    const duration = 1800;
    const tick = (now: number) => {
      if (!start) start = now;
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [end, inView]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="bg-[#24578E] border-t border-white/6 py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/8">
          {[
            { end: 500, suffix: "+", label: "Active members across Rwanda" },
            { end: 15, suffix: "+", label: "Universities represented" },
            { end: 100, suffix: "+", label: "Events conducted annually" },
            { end: 50, suffix: "+", label: "Community outreach programs" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="lg:px-12 first:lg:pl-0 last:lg:pr-0"
            >
              <div
                className="text-5xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
              >
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <div className="text-white/40 text-sm leading-snug">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
