import Image from "next/image";

import { sdgs, story } from "@/content/site";

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
      <ul className="mt-11 flex flex-wrap gap-[14px]" aria-label="UN Sustainable Development Goals we work towards">
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
