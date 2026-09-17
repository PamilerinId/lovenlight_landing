import { programmes } from "@/content/site";
import { cn } from "@/lib/utils";

import { Eyebrow } from "./primitives";
import { ProgrammeIcon } from "./ProgrammeIcon";

/**
 * "What we do" — a minimal list rather than a grid of cards.
 *
 * The programmes have names only (no descriptions exist in the client brief),
 * so there is nothing to put behind a per-item accordion. Instead the whole
 * list is a native <details> disclosure: collapsed on small screens to keep
 * the page short, and forced open from the nav breakpoint up by CSS. Using
 * <details> keeps this working with no client-side JavaScript.
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

      <details className="disclosure mt-10">
        <summary className="flex items-center justify-between gap-3 border-t border-hairline py-4 text-[15px] font-semibold text-green">
          <span className="disclosure-show">Show the six programmes</span>
          <span className="disclosure-hide">Hide the six programmes</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="disclosure-chevron shrink-0"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </summary>

        {/* Plain wrapper: the desktop rule that forces the disclosure open
            sets display on the direct child, so the grid lives one level in
            where it cannot be overridden. */}
        <div className="disclosure-content">
          <ul className="grid grid-cols-1 border-t border-hairline nav:grid-cols-2 nav:gap-x-16">
            {programmes.items.map((item) => (
              <li
                key={item.n}
                className="flex items-center gap-4 border-b border-hairline py-5"
              >
                <ProgrammeIcon
                  name={item.icon}
                  className="size-6 shrink-0 text-green"
                />
                <h3
                  className={cn(
                    "flex-1 text-xl font-medium tracking-[-0.02em]",
                    item.strong ? "text-green" : "text-ink"
                  )}
                >
                  {item.title}
                </h3>
                <span className="text-[13px] font-semibold text-green tabular-nums">
                  {item.n}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </section>
  );
}
