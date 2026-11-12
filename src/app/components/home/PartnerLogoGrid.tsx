"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type PartnerLogo = {
  id: string;
  name: string;
  logo: string;
  website: string;
};

export function PartnerLogoGrid({ partners }: { partners: PartnerLogo[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <ul className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {partners.map((partner, index) => {
        const content = partner.logo ? (
          <span className="flex h-20 items-center justify-center rounded-xl bg-white px-5 py-3 sm:h-24">
            <Image
              src={partner.logo}
              alt={`${partner.name} logo`}
              width={220}
              height={100}
              unoptimized
              className="max-h-16 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </span>
        ) : (
          <span className="flex min-h-20 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-sm font-semibold leading-5 text-white sm:min-h-24 sm:text-base">
            {partner.name}
          </span>
        );

        return (
          <motion.li
            key={partner.id}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            whileHover={reduceMotion ? undefined : { y: -5, scale: 1.025 }}
            transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group"
          >
            {partner.website ? (
              <a href={partner.website} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${partner.name} website`} className="block rounded-xl outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                {content}
              </a>
            ) : content}
          </motion.li>
        );
      })}
    </ul>
  );
}
