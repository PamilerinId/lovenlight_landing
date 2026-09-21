import { news } from "@/content/site";

import { Eyebrow } from "./primitives";

/**
 * News & Stories. The nav has always pointed here; until now the anchor landed
 * on the closing partner band, which was a stand-in. The two reviews are on
 * their way from the client, so each slot shows a labelled placeholder.
 */
export function News() {
  const slots = news.reviews.length > 0 ? news.reviews : news.placeholders;

  return (
    <section id="news" aria-labelledby="news-heading" className="px-page py-[110px]">
      <Eyebrow>{news.eyebrow}</Eyebrow>
      <h2
        id="news-heading"
        className="mt-5 max-w-[900px] text-[clamp(36px,3.6vw,52px)] leading-[1.08] font-medium tracking-[-0.03em] text-ink"
      >
        {news.heading}
      </h2>

      <ul className="mt-10 grid grid-cols-1 gap-5 nav:mt-14 nav:grid-cols-2">
        {slots.map((slot, i) =>
          typeof slot === "string" ? (
            <li key={slot}>
              <div className="flex min-h-[200px] items-center justify-center rounded-panel border border-dashed border-[rgba(30,122,44,0.3)] bg-[rgba(30,122,44,0.05)] p-6 text-center text-[13px] font-medium text-muted">
                {slot}
              </div>
            </li>
          ) : (
            <li key={slot.name + i}>
              <figure className="glass flex h-full flex-col rounded-panel p-[clamp(28px,3.3vw,40px)]">
                <blockquote className="flex-1 text-lg leading-[1.6] text-ink">
                  {slot.quote}
                </blockquote>
                <figcaption className="mt-6 flex flex-col gap-1">
                  <span className="text-[15px] font-semibold text-ink">{slot.name}</span>
                  <span className="text-[13px] text-body">{slot.project}</span>
                </figcaption>
              </figure>
            </li>
          )
        )}
      </ul>
    </section>
  );
}
