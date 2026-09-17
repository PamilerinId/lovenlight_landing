import { impact } from "@/content/site";

/**
 * Six-cell stat strip. The design has no visible heading here; the brief's
 * own section title is kept as a screen-reader/crawler heading.
 *
 * Column count steps up with width — two on phones, three on small tablets,
 * all six in a row on desktop — so the strip stays a compact band instead of
 * a long stack of single cells on mobile.
 */
export function ImpactStrip() {
  return (
    <section aria-labelledby="impact-heading" className="mx-page border-y border-hairline">
      <h2 id="impact-heading" className="sr-only">
        {impact.heading}
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 nav:grid-cols-6">
        {impact.items.map((item) => (
          <li
            key={item.label}
            className="-mb-px flex flex-col gap-1 border-b border-l border-hairline px-4 py-6 sm:gap-1.5 sm:px-6 sm:py-9"
          >
            <span className="text-[26px] leading-none font-medium tracking-[-0.03em] text-ink sm:text-4xl">
              {item.value}
            </span>
            <span className="text-[13px] leading-[1.35] text-body sm:text-sm sm:leading-[1.4]">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
