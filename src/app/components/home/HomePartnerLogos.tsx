import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublishedContent, type PublicContentRecord } from "@/lib/public-content";

function text(record: PublicContentRecord, field: string) {
  return typeof record[field] === "string" ? record[field] as string : "";
}

export async function HomePartnerLogos() {
  const partners = await getPublishedContent("partners", 12);
  const visiblePartners = partners
    .filter((partner) => text(partner, "name").trim())
    .sort((a, b) => Number(a.display_order ?? 0) - Number(b.display_order ?? 0))
    .slice(0, 6);

  if (!visiblePartners.length) return null;

  return (
    <section aria-labelledby="home-partners-title" className="bg-[#14365F] py-10 sm:py-12">
      <div className="mx-auto flex max-w-[1800px] flex-col gap-7 px-5 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9dddf0]">Working together</p>
            <h2 id="home-partners-title" className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Our partners</h2>
          </div>
          <Link href="/partners" className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-white underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Meet our partners <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <ul className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {visiblePartners.map((partner) => {
            const name = text(partner, "name");
            const logo = text(partner, "logo_url");
            const website = text(partner, "website");
            const content = logo ? (
              <span className="flex h-20 items-center justify-center rounded-xl bg-white px-5 py-3 sm:h-24">
                <Image src={logo} alt={`${name} logo`} width={220} height={100} unoptimized className="max-h-16 w-auto max-w-full object-contain" />
              </span>
            ) : (
              <span className="flex min-h-20 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-sm font-semibold leading-5 text-white sm:min-h-24 sm:text-base">
                {name}
              </span>
            );

            return (
              <li key={partner.id}>
                {website ? (
                  <a href={website} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${name} website`} className="block rounded-xl outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
                    {content}
                  </a>
                ) : content}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
