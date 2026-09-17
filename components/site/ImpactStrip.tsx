import { impact } from "@/content/site";

/**
 * Six-cell stat strip. The design has no visible heading here; the brief's
 * own section title is kept as a screen-reader/crawler heading.
 */
export function ImpactStrip() {
  return (
    <section aria-labelledby="impact-heading" className="mx-page border-y border-hairline">
      <h2 id="impact-heading" className="sr-only">
        {impact.heading}
      </h2>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))]">
        {impact.items.map((item) => (
          <li
            key={item.label}
            className="-mb-px flex flex-col gap-1.5 border-b border-l border-hairline px-6 py-9"
          >
            <span className="text-4xl font-medium tracking-[-0.03em] text-ink">{item.value}</span>
            <span className="text-sm leading-[1.4] text-body">{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
