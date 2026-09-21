import Image from "next/image";

import { sdgs, story } from "@/content/site";
import { cn } from "@/lib/utils";

import { Eyebrow } from "./primitives";

export function Story() {
  return (
    <section id="about" aria-labelledby="story-heading" className="relative px-page pt-[120px] pb-[110px]">
      <Eyebrow>{story.eyebrow}</Eyebrow>
      <h2
        id="story-heading"
        className="mt-5 max-w-[1000px] text-[clamp(36px,3.6vw,52px)] leading-[1.08] font-medium tracking-[-0.03em] text-ink"
      >
        {story.heading}
      </h2>
      <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-12 text-[17px] leading-[1.7] text-body">
        {story.paragraphs.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>
      <p className="mt-12 text-2xl font-medium tracking-[-0.02em] text-ink">{story.closing}</p>
      {/* Our people. Kept here, well away from the Friends of Love & Light
          panel, so the patrons never read as the ones asking for money. */}
      <h3
        id="people-heading"
        className="mt-16 text-[clamp(24px,2vw,30px)] leading-[1.15] font-medium tracking-[-0.02em] text-ink"
      >
        {story.peopleHeading}
      </h3>
      <ul
        aria-labelledby="people-heading"
        className="mt-6 grid grid-cols-2 gap-3 nav:mt-8 nav:gap-5"
      >
        {story.people.map((p) => (
          // Group shots take the full width on phones, where a half-width tile
          // would crop people out. On desktop every tile is equal.
          <li key={p.name} className={cn(p.wide && "col-span-2 nav:col-span-1")}>
            <figure className="flex h-full flex-col">
              <div className="relative h-[210px] w-full overflow-hidden rounded-card nav:h-[340px]">
                <Image
                  src={p.photo.src}
                  alt={p.photo.alt}
                  fill
                  sizes={
                    p.wide
                      ? "(max-width: 900px) 92vw, 640px"
                      : "(max-width: 900px) 46vw, 640px"
                  }
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

      <ul
        className="mt-16 flex flex-wrap gap-[14px]"
        aria-label="UN Sustainable Development Goals we work towards"
      >
        {sdgs.map((goal) => (
          <li key={goal.id}>
            <a
              href={goal.href}
              target="_blank"
              rel="noopener"
              title={`${goal.title} — read about this goal on the UN website`}
              className="block rounded-sdg outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-ground"
            >
              {/* Animated WebP: served as-is, so the optimiser is bypassed. */}
              <Image
                src={goal.src}
                alt={`SDG ${goal.id}: ${goal.title}`}
                width={120}
                height={120}
                unoptimized
                className="size-[120px] rounded-sdg"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
