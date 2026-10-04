import Image from "next/image";

import { people } from "@/content/site";

import { SectionHeader, sectionClass } from "./primitives";

/**
 * Chapter 04 — who does the work: Founder, Grand Patron, patrons and
 * matrons, and volunteers. Kept well away from the Friends of Love & Light
 * ask so the patrons never read as the ones asking for money.
 *
 * Phones: a swipeable row, one portrait at a time with the next peeking in.
 * Desktop: two by two.
 */
export function People() {
  return (
    <section id="people" aria-labelledby="people-heading" className={sectionClass}>
      <SectionHeader id="people-heading" eyebrow={people.eyebrow} title={people.heading} />
      <ul
        data-reveal
        tabIndex={0}
        aria-label="Our people. On small screens, swipe sideways for more."
        className="max-nav:swipe mt-8 outline-none focus-visible:ring-2 focus-visible:ring-green nav:mt-14 nav:grid nav:grid-cols-2 nav:gap-5"
      >
        {people.items.map((p) => (
          <li key={p.name}>
            <figure className="flex h-full flex-col">
              {/* One height for every card so the swipe row reads as a set.
                  Each card is 84% of the screen wide, so the group shots
                  keep everyone in frame. */}
              <div className="relative h-[260px] w-full overflow-hidden rounded-card nav:h-[340px]">
                <Image
                  src={p.photo.src}
                  alt={p.photo.alt}
                  fill
                  sizes="(max-width: 900px) 84vw, 640px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex flex-col gap-0.5">
                <span className="text-[15px] leading-[1.3] font-semibold text-ink">{p.name}</span>
                {p.role && <span className="text-[13px] leading-[1.3] text-body">{p.role}</span>}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
