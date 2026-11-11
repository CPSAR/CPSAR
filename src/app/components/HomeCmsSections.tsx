import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, FileText } from "lucide-react";
import { getPublishedContent, type PublicContentRecord } from "@/lib/public-content";
import { getProgrammeImages } from "@/lib/programme-images";
import { officialPartnerNames, partnerNameKey } from "@/lib/official-partners";

function text(record: PublicContentRecord, key: string) {
  const value = record[key];
  return typeof value === "string" ? value : "";
}

function dateLabel(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? "Date to be announced"
    : new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "Africa/Kigali" }).format(date);
}

function currentTimestamp() {
  return Date.now();
}

const cardClass = "h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none";
const focusLinkClass = "rounded-sm font-semibold text-[#24578E] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#24578E]";

export async function HomeCmsSections() {
  const [programmes, rawEvents, rawArticles, partners, stories] = await Promise.all([
    getPublishedContent("programmes", 12),
    getPublishedContent("events", 100),
    getPublishedContent("news_articles", 20),
    getPublishedContent("partners", 12),
    getPublishedContent("testimonials", 3),
  ]);

  const now = currentTimestamp();
  const events = rawEvents
    .filter((item) => {
      const startsAt = Date.parse(text(item, "starts_at"));
      return Number.isFinite(startsAt) && startsAt >= now;
    })
    .sort((a, b) => Date.parse(text(a, "starts_at")) - Date.parse(text(b, "starts_at")))
    .slice(0, 3);
  const articles = rawArticles
    .filter((item) => !text(item, "published_at") || Date.parse(text(item, "published_at")) <= now)
    .sort((a, b) => Date.parse(text(b, "published_at") || text(b, "created_at")) - Date.parse(text(a, "published_at") || text(a, "created_at")))
    .slice(0, 3);
  const partnerNames: string[] = [...officialPartnerNames];
  const knownPartnerNames = new Set(partnerNames.map(partnerNameKey));
  for (const partner of partners) {
    const name = text(partner, "name").trim();
    const key = partnerNameKey(name);
    if (name && !knownPartnerNames.has(key)) {
      partnerNames.push(name);
      knownPartnerNames.add(key);
    }
  }

  return (
    <div className="space-y-0">
      <section aria-labelledby="home-community-title" className="bg-[#f4f8fb] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#24578E]">Community</p>
            <h2 id="home-community-title" className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Connected through shared work.</h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">Explore CPSAR’s official partner organizations and the experiences members have chosen to share.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Partner directory</h3>
              {partnerNames.length ? (
                <ul className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white px-4">
                  {partnerNames.slice(0, 6).map((name) => <li key={name} className="py-3 text-sm font-medium text-slate-700">{name}</li>)}
                </ul>
              ) : <p className="mt-3 rounded-xl border border-dashed border-slate-300 p-4 text-sm leading-6 text-slate-600">Partner details will appear here when CPSAR has approved entries for publication.</p>}
              <Link href="/partners" className={`${focusLinkClass} mt-4 inline-flex items-center gap-2 text-sm`}>View directory <ArrowRight aria-hidden="true" className="size-4" /></Link>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Member stories</h3>
              {stories.length ? (
                <div className="mt-4 space-y-3">{stories.slice(0, 2).map((story) => <figure key={story.id} className="rounded-xl border border-slate-200 bg-white p-4"><blockquote className="line-clamp-4 text-sm leading-6 text-slate-700">“{text(story, "quote")}”</blockquote><figcaption className="mt-3 text-xs font-semibold text-slate-600">{text(story, "name")}{text(story, "role") ? ` · ${text(story, "role")}` : ""}</figcaption></figure>)}</div>
              ) : <p className="mt-3 rounded-xl border border-dashed border-slate-300 p-4 text-sm leading-6 text-slate-600">Member stories will appear here when shared and approved for publication.</p>}
              <Link href="/alumni" className={`${focusLinkClass} mt-4 inline-flex items-center gap-2 text-sm`}>Meet our alumni <ArrowRight aria-hidden="true" className="size-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="home-programmes-title" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionHeading eyebrow="Learn and contribute" title="Programmes" id="home-programmes-title" href="/programs" linkText="All programmes" />
        {programmes.length ? <div className="mt-8 grid gap-5 md:grid-cols-3">{programmes.slice(0, 3).map((programme) => { const images = getProgrammeImages(programme); return <article key={programme.id} className={`${cardClass} overflow-hidden p-0`}>{images[0] && <Link href={`/programs/${text(programme, "slug")}`} aria-label={`View ${text(programme, "title")}`}><Image src={images[0]} alt={text(programme, "title")} width={900} height={600} unoptimized className="h-52 w-full object-cover" /></Link>}<div className="p-6"><p className="text-xs font-semibold uppercase tracking-wider text-[#24578E]">CPSAR programme</p><h3 className="mt-3 text-xl font-bold leading-snug text-slate-950"><Link className={focusLinkClass} href={`/programs/${text(programme, "slug")}`}>{text(programme, "title")}</Link></h3><p className="mt-3 text-sm leading-6 text-slate-600">{text(programme, "summary")}</p><Link href={`/programs/${text(programme, "slug")}`} className={`${focusLinkClass} mt-5 inline-flex items-center gap-2 text-sm`}>Learn more <ArrowRight aria-hidden="true" className="size-4" /></Link></div></article>; })}</div> : <EmptyState text="Programme details will appear here when published." href="/programs" linkText="Explore programmes" />}
      </section>

      <section aria-labelledby="home-events-title" className="bg-[#f4f8fb] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Take part" title="Upcoming events" id="home-events-title" href="/events" linkText="Events archive" />
          {events.length ? <div className="mt-8 grid gap-5 md:grid-cols-3">{events.map((event) => <article key={event.id} className={cardClass}><p className="flex items-center gap-2 text-sm font-semibold text-[#24578E]"><CalendarDays aria-hidden="true" className="size-4 shrink-0" />{dateLabel(text(event, "starts_at"))}</p><h3 className="mt-4 text-xl font-bold leading-snug text-slate-950"><Link className={focusLinkClass} href={`/events/${text(event, "slug")}`}>{text(event, "title")}</Link></h3>{text(event, "location") && <p className="mt-2 text-sm text-slate-500">{text(event, "location")}</p>}<p className="mt-3 text-sm leading-6 text-slate-600">{text(event, "summary")}</p><Link href={`/events/${text(event, "slug")}`} className={`${focusLinkClass} mt-5 inline-flex items-center gap-2 text-sm`}>Event details <ArrowRight aria-hidden="true" className="size-4" /></Link></article>)}</div> : <EmptyState text="No upcoming events are listed right now. Browse the archive for past activities or check back for new dates." href="/events" linkText="Browse events archive" />}
        </div>
      </section>

      <section aria-labelledby="home-updates-title" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <SectionHeading eyebrow="From CPSAR" title="Latest updates" id="home-updates-title" href="/news" linkText="All news" />
        {articles.length ? <div className="mt-8 grid gap-5 md:grid-cols-3">{articles.map((article) => <article key={article.id} className={cardClass}><p className="flex items-center gap-2 text-sm text-slate-500"><FileText aria-hidden="true" className="size-4" />{dateLabel(text(article, "published_at") || text(article, "created_at"))}</p><h3 className="mt-4 text-xl font-bold leading-snug text-slate-950"><Link className={focusLinkClass} href={`/news/${text(article, "slug")}`}>{text(article, "title")}</Link></h3><p className="mt-3 text-sm leading-6 text-slate-600">{text(article, "summary")}</p></article>)}</div> : <EmptyState text="News and announcements will appear here when published." href="/news" linkText="Visit news" />}
      </section>
    </div>
  );
}

function SectionHeading({ eyebrow, title, id, href, linkText }: { eyebrow: string; title: string; id: string; href: string; linkText: string }) {
  return <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#24578E]">{eyebrow}</p><h2 id={id} className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h2></div><Link href={href} className={`${focusLinkClass} inline-flex items-center gap-2 text-sm`}>{linkText}<ArrowRight aria-hidden="true" className="size-4" /></Link></div>;
}

function EmptyState({ text: message, href, linkText }: { text: string; href: string; linkText: string }) {
  return <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-2xl text-sm leading-6 text-slate-600">{message}</p><Link href={href} className={`${focusLinkClass} inline-flex shrink-0 items-center gap-2 text-sm`}>{linkText}<ArrowRight aria-hidden="true" className="size-4" /></Link></div>;
}
