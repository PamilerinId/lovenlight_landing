import Image from "next/image";
import type { CSSProperties } from "react";

import { programmes } from "@/content/site";
import { cn } from "@/lib/utils";

import { SectionHeader, sectionClass } from "./primitives";
import { ProgrammeIcon } from "./ProgrammeIcon";

/**
 * Chapter 03 — how the work is done, in six programmes.
 *
 * Phones: one compact row per programme, a square photo beside the title and
 * description. All six stay visible (the client did not want this section
 * hidden behind a toggle), at about half the height of stacked cards.
 * Desktop: a three-column grid of photo cards.
 */
export function Programmes() {
  return (
    <section id="programmes" aria-labelledby="programmes-heading" className={sectionClass}>
      <SectionHeader
        id="programmes-heading"
        eyebrow={programmes.eyebrow}
        title={programmes.heading}
      />

      <ul className="mt-8 flex flex-col gap-3 nav:mt-16 nav:grid nav:grid-cols-3 nav:gap-5">
        {programmes.items.map((item, i) => (
          <li key={item.n} data-reveal style={{ "--i": i % 3 } as CSSProperties}>
            <article
              className={cn(
                "grid h-full grid-cols-[92px_1fr] gap-4 overflow-hidden rounded-card p-3 nav:flex nav:flex-col nav:gap-0 nav:p-0",
                item.strong ? "glass-panel-strong" : "glass"
              )}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-[14px] nav:aspect-[4/3] nav:rounded-none">
                {item.photo && (
                  <Image
                    src={item.photo.src}
                    alt={item.photo.alt}
                    fill
                    sizes="(max-width: 900px) 92px, 420px"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="flex flex-col gap-1.5 py-1 nav:flex-1 nav:gap-2.5 nav:p-6">
                {/* Icon and number: desktop only, where there is room. */}
                <div className="hidden items-center justify-between gap-2 nav:flex">
                  <ProgrammeIcon
                    name={item.icon}
                    className={cn("size-6", item.strong ? "text-white" : "text-green")}
                  />
                  <span
                    className={cn(
                      "text-[13px] font-semibold tabular-nums",
                      item.strong ? "text-white" : "text-green"
                    )}
                  >
                    {item.n}
                  </span>
                </div>
                <h3
                  className={cn(
                    "text-[17px] leading-[1.25] font-medium tracking-[-0.02em] nav:text-xl",
                    item.strong ? "text-white" : "text-ink"
                  )}
                >
                  {item.title}
                </h3>
                {item.blurb && (
                  <p
                    className={cn(
                      "text-[14px] leading-[1.5] nav:text-[15px] nav:leading-[1.55]",
                      item.strong ? "text-white/90" : "text-body"
                    )}
                  >
                    {item.blurb}
                  </p>
                )}
                {item.cta && (
                  <a
                    href={item.cta.href}
                    className={cn(
                      "mt-auto pt-1 text-[14px] font-semibold nav:pt-2 nav:text-[15px]",
                      item.strong
                        ? "text-white hover:text-white/80"
                        : "text-green hover:text-green-hover"
                    )}
                  >
                    {item.cta.label}
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
