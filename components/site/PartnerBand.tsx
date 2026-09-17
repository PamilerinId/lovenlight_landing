import { Button } from "@/components/ui/button";
import { links, partner } from "@/content/site";

/** The nav's "News & Stories" anchor lands here, as in the prototype. */
export function PartnerBand() {
  return (
    <section
      id="news"
      aria-labelledby="partner-heading"
      className="flex flex-wrap items-center justify-between gap-x-[60px] gap-y-8 px-page py-[90px]"
    >
      <div className="flex flex-col gap-4">
        <h2
          id="partner-heading"
          className="text-[clamp(32px,3vw,44px)] leading-[1.08] font-medium tracking-[-0.03em] text-ink"
        >
          {partner.heading}
        </h2>
        <p className="max-w-[760px] text-lg leading-[1.6] text-body">{partner.body}</p>
      </div>
      <Button asChild variant="primary" size="primary">
        <a href={links.partner}>{partner.cta}</a>
      </Button>
    </section>
  );
}
