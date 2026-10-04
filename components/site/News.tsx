import Image from "next/image";

import { news } from "@/content/site";

import { Eyebrow } from "./primitives";

/**
 * News & Stories: reviews from people who have worked with the foundation.
 * A review may carry a photograph of its author, shown above the quote.
 */
export function News() {
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
        {news.reviews.map((review) => (
          <li key={review.name}>
            <figure className="glass flex h-full flex-col overflow-hidden rounded-panel">
              {review.photo && (
                <div className="relative aspect-[16/10] w-full shrink-0">
                  <Image
                    src={review.photo.src}
                    alt={review.photo.alt}
                    fill
                    sizes="(max-width: 900px) 92vw, 640px"
                    className="object-cover object-[50%_30%]"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-[clamp(24px,3vw,40px)]">
                <blockquote className="flex flex-1 flex-col gap-4 text-[17px] leading-[1.65] text-ink">
                  {review.quote.map((paragraph, i) => (
                    <p key={paragraph.slice(0, 24)}>
                      {i === 0 && "“"}
                      {paragraph}
                      {i === review.quote.length - 1 && "”"}
                    </p>
                  ))}
                </blockquote>
                <figcaption className="mt-6 flex flex-col gap-1 border-t border-hairline pt-5">
                  <span className="text-[15px] font-semibold text-ink">{review.name}</span>
                  <span className="text-[13px] text-body">{review.role}</span>
                </figcaption>
              </div>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
