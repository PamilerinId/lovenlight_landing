import { programmes } from "@/content/site";
import { cn } from "@/lib/utils";

import { Eyebrow } from "./primitives";
import { ProgrammeIcon } from "./ProgrammeIcon";

/**
 * "What we do" — a minimal list rather than a grid of cards.
 *
 * Always visible at every width. On phones the rows tighten and the 01–06
 * counters drop away (the heading already says there are six), which keeps
 * the whole set on screen without hiding anything behind a toggle.
 */
export function Programmes() {
  return (
    <section id="programmes" aria-labelledby="programmes-heading" className="px-page py-[110px]">
      <Eyebrow>{programmes.eyebrow}</Eyebrow>
      <h2
        id="programmes-heading"
        className="mt-5 max-w-[900px] text-[clamp(36px,3.6vw,52px)] leading-[1.08] font-medium tracking-[-0.03em] text-ink"
      >
        {programmes.heading}
      </h2>

      <ul className="mt-8 grid grid-cols-1 border-t border-hairline nav:mt-10 nav:grid-cols-2 nav:gap-x-16">
        {programmes.items.map((item) => (
          <li
            key={item.n}
            className="flex items-center gap-3 border-b border-hairline py-4 nav:gap-4 nav:py-5"
          >
            <ProgrammeIcon
              name={item.icon}
              className="size-5 shrink-0 text-green nav:size-6"
            />
            <h3
              className={cn(
                "flex-1 text-[17px] leading-[1.3] font-medium tracking-[-0.02em] nav:text-xl",
                item.strong ? "text-green" : "text-ink"
              )}
            >
              {item.title}
            </h3>
            <span className="hidden text-[13px] font-semibold text-green tabular-nums nav:block">
              {item.n}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
