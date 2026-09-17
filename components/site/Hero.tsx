import { Button } from "@/components/ui/button";
import { hero, links } from "@/content/site";

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
        <p className="mt-7 max-w-[560px] text-lg leading-[1.6] text-body">{hero.body}</p>
        <div className="mt-10 flex flex-wrap items-center gap-[14px]">
          <Button asChild variant="primary" size="primary">
            <a href={links.friend} target="_blank" rel="noopener">
              {hero.ctas.friend}
            </a>
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

      <div className="relative z-[1] mx-auto aspect-[680/620] w-full max-w-[680px]">
        <div className="photo-fade absolute top-[2%] left-[6%] aspect-square w-[88%] overflow-hidden rounded-full">
          <PhotoSlot
            photo={hero.photo}
            placeholder={hero.photoPlaceholder}
            sizes="(max-width: 900px) 88vw, 600px"
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
