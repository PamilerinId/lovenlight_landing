import { Button } from "@/components/ui/button";
import { hero, links, org } from "@/content/site";

import { Glow, PhotoSlot } from "./primitives";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,520px),1fr))] items-center gap-[60px] px-page pt-[72px] pb-[110px]"
    >
      <Glow className="top-[-120px] right-[-60px]" />

      <div className="relative z-[1]">
        <p className="eyebrow inline-flex items-center gap-2 text-green">
          <span aria-hidden="true" className="inline-block size-[7px] rounded-full bg-green" />
          {hero.eyebrow}
        </p>
        <h1
          id="hero-heading"
          className="mt-[22px] text-[clamp(42px,5.3vw,76px)] leading-[1.02] font-medium tracking-[-0.03em] text-ink"
        >
          {hero.title}
        </h1>
        {/* The registered name in full, which the client asked to appear on
            the first page. It also gives search engines the legal name in
            visible text, not just in the footer and structured data. */}
        <p className="mt-4 text-[15px] leading-[1.5] font-medium text-body">{org.legalName}</p>
        <p className="mt-6 max-w-[560px] text-lg leading-[1.6] text-body">{hero.body}</p>
        <div className="mt-10 flex flex-wrap items-center gap-[14px]">
          <Button asChild variant="primary" size="primary">
            <a href={links.friend} target="_blank" rel="noopener">
              {hero.ctas.friend}
            </a>
          </Button>
          <Button asChild variant="secondary" size="secondary">
            <a href={links.donate}>Donate now</a>
          </Button>
          <Button asChild variant="secondary" size="secondary">
            <a href={links.volunteer} target="_blank" rel="noopener">
              {hero.ctas.volunteer}
            </a>
          </Button>
          <Button asChild variant="link" size="link">
            <a href={links.partner}>{hero.ctas.partner}</a>
          </Button>
        </div>
      </div>

      {/* Enlarged at the client's request: a wider box and the circle pushed
          almost to its edge. Beyond this it crowds the headline at 1440px. */}
      <div className="relative z-[1] mx-auto aspect-[760/660] w-full max-w-[760px]">
        <div className="photo-fade absolute top-[1%] left-[2%] aspect-square w-[96%] overflow-hidden rounded-full">
          <PhotoSlot
            photo={hero.photo}
            placeholder={hero.photoPlaceholder}
            sizes="(max-width: 900px) 96vw, 730px"
            priority
            className="rounded-full"
          />
        </div>
        <div className="glass-chip absolute top-[120px] left-0 flex flex-col gap-0.5 rounded-chip px-[22px] py-4">
          <span className="text-[28px] font-semibold tracking-[-0.03em] text-ink">
            {hero.chips[0].value}
          </span>
          <span className="text-[13px] text-body">{hero.chips[0].label}</span>
        </div>
        <div className="glass-chip absolute right-0 bottom-[90px] flex flex-col gap-0.5 rounded-chip px-[22px] py-4">
          <span className="text-[28px] font-semibold tracking-[-0.03em] text-ink">
            {hero.chips[1].value}
          </span>
          <span className="text-[13px] text-body">{hero.chips[1].label}</span>
        </div>
      </div>
    </section>
  );
}
