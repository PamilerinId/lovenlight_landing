import type { CSSProperties } from "react";

import { impact } from "@/content/site";

import { SectionHeader, sectionClass } from "./primitives";

/** "5,000+" → { count: 5000, suffix: "+" }. */
function parse(value: string) {
  const match = value.match(/^([\d,]+)(.*)$/);
  if (!match) return null;
  return { count: Number(match[1].replace(/,/g, "")), suffix: match[2] };
}

/**
 * Chapter 02 — the scale of the work so far, answering the "why" before it
 * with numbers. Each figure counts up from zero once as it arrives. The HTML
 * always contains the final value, so crawlers, screen readers and visitors
 * without JavaScript read the real number.
 */
export function Reach() {
  return (
    <section aria-labelledby="impact-heading" className={sectionClass}>
      <SectionHeader id="impact-heading" eyebrow={impact.eyebrow} title={impact.heading} />
      <ul className="mt-8 grid grid-cols-2 border-t border-hairline nav:mt-14 nav:grid-cols-3">
        {impact.items.map((item, i) => {
          const n = parse(item.value);
          return (
            <li
              key={item.label}
              data-reveal
              style={{ "--i": i % 3 } as CSSProperties}
              className="flex flex-col gap-1.5 border-b border-hairline py-6 pr-3 nav:gap-2.5 nav:py-11 nav:pr-8 [&:nth-last-child(-n+2)]:border-b-0 nav:[&:nth-last-child(-n+3)]:border-b-0"
            >
              <span
                className="text-[34px] leading-none font-medium tracking-[-0.04em] text-ink tabular-nums nav:text-[clamp(48px,5vw,72px)]"
                data-count={n?.count}
                data-suffix={n?.suffix}
              >
                {item.value}
              </span>
              <span className="text-[13px] leading-[1.4] text-body nav:text-base">
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
