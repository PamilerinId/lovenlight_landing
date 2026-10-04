import { events, type EventItem } from "@/content/site";
import { cn } from "@/lib/utils";

import { Eyebrow, PhotoSlot } from "./primitives";

const headingClass =
  "max-w-[900px] text-[clamp(36px,3.6vw,52px)] leading-[1.08] font-medium tracking-[-0.03em] text-ink";

/**
 * One event card. Past and current events share it; optional fields (detail,
 * blurb, link) only render when present. Two columns on phones keeps seven
 * cards from becoming a very long scroll.
 */
function EventCard({ item }: { item: EventItem }) {
  return (
    <article className="glass flex h-full flex-col gap-3 rounded-card p-2 nav:gap-5 nav:p-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-photo">
        <PhotoSlot
          photo={item.photo}
          placeholder={item.placeholder}
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
            className="mt-auto pt-2 text-[14px] font-semibold text-green hover:text-green-hover nav:text-[15px]"
          >
            {item.cta.label}
          </a>
        )}
      </div>
    </article>
  );
}

/**
 * Events: past events first, then current opportunities — the order the
 * client asked for, so the track record comes before the ask.
 */
export function Events() {
  const { past, current } = events;

  return (
    <section id="events" aria-labelledby="events-past-heading" className="px-page py-[110px]">
      <Eyebrow>{events.eyebrow}</Eyebrow>

      <h2 id="events-past-heading" className={cn("mt-5", headingClass)}>
        {past.heading}
      </h2>
      {/* Three cards: on phones the first takes the full row so the grid
          never leaves a lone card hanging. */}
      <ul className="mt-10 grid grid-cols-2 gap-3 nav:mt-14 nav:grid-cols-3 nav:gap-5">
        {past.items.map((item, i) => (
          <li key={item.title} className={cn(i === 0 && "col-span-2 nav:col-span-1")}>
            <EventCard item={item} />
          </li>
        ))}
      </ul>

      <h2 className={cn("mt-24 nav:mt-32", headingClass)}>{current.heading}</h2>
      <ul className="mt-10 grid grid-cols-2 gap-3 nav:mt-14 nav:grid-cols-4 nav:gap-5">
        {current.items.map((item) => (
          <li key={item.title}>
            <EventCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
