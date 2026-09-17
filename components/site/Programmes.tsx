import { programmes } from "@/content/site";
import { cn } from "@/lib/utils";

import { Eyebrow } from "./primitives";
import { ProgrammeIcon } from "./ProgrammeIcon";

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
      <ul className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
        {programmes.items.map((item) => (
          <li key={item.n}>
            <article
              className={cn(
                "flex min-h-[240px] flex-col justify-between gap-7 rounded-card p-8",
                item.strong ? "glass-strong text-white" : "glass text-green"
              )}
            >
              <div className="flex items-start justify-between">
                <ProgrammeIcon name={item.icon} />
                <span
                  className={cn(
                    "text-[13px] font-semibold",
                    item.strong ? "text-white/80" : "text-green"
                  )}
                >
                  {item.n}
                </span>
              </div>
              <h3
                className={cn(
                  "text-2xl font-medium tracking-[-0.02em]",
                  item.strong ? "text-white" : "text-ink"
                )}
              >
                {item.title}
              </h3>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
