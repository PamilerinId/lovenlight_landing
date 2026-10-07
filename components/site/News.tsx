import Image from "next/image";

import { news } from "@/content/site";

import { SectionHeader, sectionClass } from "./primitives";

/**
 * Chapter 07 — in other people's words. The proof that comes right before
 * the ask, which is the most persuasive place for it.
 *
 * Phones: a swipeable row, one review at a time. These are the two longest
 * blocks of text on the page, so stacking them cost the most scrolling.
 * Desktop: side by side.
 */
export function News() {
  return (
    <section id="news" aria-labelledby="news-heading" className={sectionClass}>
      <SectionHeader id="news-heading" eyebrow={news.eyebrow} title={news.heading} />

      <ul
        data-reveal
        tabIndex={0}
        aria-label="Reviews. On small screens, swipe sideways for more."
        className="max-nav:swipe mt-8 outline-none focus-visible:ring-2 focus-visible:ring-green nav:mt-14 nav:grid nav:grid-cols-2 nav:gap-5"
      >
        {news.reviews.map((review) => (
          <li key={review.name}>
            <figure className="glass flex h-full flex-col overflow-hidden rounded-panel">
              {review.photo && (
                <div className="relative aspect-[16/10] w-full shrink-0">
                  <Image
                    src={review.photo.src}
                    alt={review.photo.alt}
                    fill
                    sizes="(max-width: 900px) 84vw, 640px"
                    style={{ objectPosition: review.photo.position ?? "50% 30%" }}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5 nav:p-[clamp(24px,3vw,40px)]">
                <blockquote className="flex flex-1 flex-col gap-4 text-[15px] leading-[1.65] text-ink nav:text-[17px]">
                  {review.quote.map((paragraph, i) => (
                    <p key={paragraph.slice(0, 24)}>
                      {i === 0 && "“"}
                      {paragraph}
                      {i === review.quote.length - 1 && "”"}
                    </p>
                  ))}
                </blockquote>
                <figcaption className="mt-5 flex flex-col gap-1 border-t border-hairline pt-4 nav:mt-6 nav:pt-5">
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
