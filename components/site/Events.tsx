import { linkProps } from "@/lib/links";
import type { CSSProperties } from "react";

import { events, type EventItem } from "@/content/site";
import { cn } from "@/lib/utils";

import { PhotoSlot, SectionHeader, sectionClass } from "./primitives";

/**
 * One event card, shared by past and current events. A missing photograph
 * shows an illustrated panel instead, so a card is never visibly empty.
 */
function EventCard({ item }: { item: EventItem }) {
  return (
    <article className="glass flex h-full flex-col gap-3 rounded-card p-2 nav:gap-5 nav:p-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-photo">
        <PhotoSlot
          photo={item.photo}
          art={item.art}
          sizes="(max-width: 900px) 46vw, 420px"
          className="rounded-photo"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-2 pb-3 nav:gap-2 nav:px-3 nav:pb-5">
        {item.date &&
          (item.dateTime ? (
            <time dateTime={item.dateTime} className="text-[13px] font-semibold text-green">
              {item.date}
            </time>
          ) : (
            <span className="text-[13px] font-semibold text-green">{item.date}</span>
          ))}
        <h3 className="text-[17px] leading-[1.25] font-medium tracking-[-0.02em] text-ink nav:text-[22px]">
          {item.title}
        </h3>
        {item.detail && <p className="text-[13px] leading-[1.5] text-body">{item.detail}</p>}
        {item.blurb && (
          <p className="text-[14px] leading-[1.55] text-body nav:text-[15px]">{item.blurb}</p>
        )}
        {item.cta && (
          <a
            href={item.cta.href}
            {...linkProps(item.cta.href)}
            className="mt-auto pt-2 text-[14px] font-semibold text-green hover:text-green-hover nav:text-[15px]"
          >
            {item.cta.label}
          </a>
        )}
      </div>
    </article>
  );
}

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** Chapter 05 — the track record: what has already been done. */
export function PastEvents() {
  const { past } = events;
  return (
    <section id="events" aria-labelledby="events-past-heading" className={sectionClass}>
      <SectionHeader id="events-past-heading" eyebrow={past.eyebrow} title={past.heading} />
      {/* Three cards: on phones the first spans the row, so no card is left
          hanging on its own. */}
      <ul className="mt-8 grid grid-cols-2 gap-3 nav:mt-14 nav:grid-cols-3 nav:gap-5">
        {past.items.map((item, i) => (
          <li
            key={item.title}
            data-reveal
            style={stagger(i)}
            className={cn(i === 0 && "col-span-2 nav:col-span-1")}
          >
            <EventCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Chapter 06 — what comes next, and where a reader can step in. */
export function Opportunities() {
  const { current } = events;
  return (
    <section id="opportunities" aria-labelledby="events-current-heading" className={sectionClass}>
      <SectionHeader
        id="events-current-heading"
        eyebrow={current.eyebrow}
        title={current.heading}
      />
      <ul className="mt-8 grid grid-cols-2 gap-3 nav:mt-14 nav:grid-cols-4 nav:gap-5">
        {current.items.map((item, i) => (
          <li key={item.title} data-reveal style={stagger(i)}>
            <EventCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
