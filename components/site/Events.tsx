import { events } from "@/content/site";

import { Eyebrow, PhotoSlot } from "./primitives";

export function Events() {
  return (
    <section id="events" aria-labelledby="events-heading" className="px-page py-[110px]">
      <Eyebrow>{events.eyebrow}</Eyebrow>
      <h2
        id="events-heading"
        className="mt-5 max-w-[900px] text-[clamp(36px,3.6vw,52px)] leading-[1.08] font-medium tracking-[-0.03em] text-ink"
      >
        {events.heading}
      </h2>
      <ul className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
        {events.items.map((item) => (
          <li key={item.title}>
            <article className="glass flex flex-col gap-5 rounded-card px-3 pt-3 pb-7">
              <div className="relative h-[260px] overflow-hidden rounded-photo">
                <PhotoSlot
                  photo={item.photo}
                  placeholder={item.placeholder}
                  sizes="(max-width: 900px) 100vw, 440px"
                  className="rounded-photo"
                />
              </div>
              <div className="flex flex-col gap-2 px-4">
                {item.dateTime ? (
                  <time dateTime={item.dateTime} className="text-[13px] font-semibold text-green">
                    {item.date}
                  </time>
                ) : (
                  <span className="text-[13px] font-semibold text-green">{item.date}</span>
                )}
                <h3 className="text-[22px] leading-[1.25] font-medium tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
