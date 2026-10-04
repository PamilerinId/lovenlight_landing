import Image from "next/image";
import type { CSSProperties } from "react";

import { sdgs, story } from "@/content/site";

import { SectionHeader, sectionClass } from "./primitives";

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Chapter 01 — why the foundation exists, closing on the four UN goals it
 * works towards. This is the "why" that every later chapter answers.
 */
export function Story() {
  return (
    <section id="about" aria-labelledby="story-heading" className={sectionClass}>
      <SectionHeader
        id="story-heading"
        eyebrow={story.eyebrow}
        title={story.heading}
        className="[&_h2]:max-w-[1000px]"
      />
      <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-6 text-[16px] leading-[1.7] text-body nav:mt-14 nav:gap-12 nav:text-[17px]">
        {story.paragraphs.map((p, i) => (
          <p key={p.slice(0, 24)} data-reveal style={stagger(i)}>
            {p}
          </p>
        ))}
      </div>
      <p
        data-reveal
        className="mt-8 text-[21px] leading-[1.35] font-medium tracking-[-0.02em] text-ink nav:mt-12 nav:text-2xl"
      >
        {story.closing}
      </p>

      <ul
        className="mt-8 flex flex-wrap gap-3 nav:mt-12 nav:gap-[14px]"
        aria-label="UN Sustainable Development Goals we work towards"
      >
        {sdgs.map((goal, i) => (
          <li key={goal.id} data-reveal style={stagger(i)}>
            <a
              href={goal.href}
              target="_blank"
              rel="noopener"
              title={`${goal.title}: read about this goal on the UN website`}
              className="block rounded-sdg outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-ground"
            >
              {/* Static 240px stills, 2x the render size. */}
              <Image
                src={goal.src}
                alt={`SDG ${goal.id}: ${goal.title}`}
                width={120}
                height={120}
                unoptimized
                className="size-[76px] rounded-sdg nav:size-[120px]"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
