import type { CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import { hero, links, org } from "@/content/site";

import { Glow, PhotoSlot } from "./primitives";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/**
 * The cover of the story. The headline and opening paragraph render
 * immediately with no animation: on phones the paragraph is the page's
 * largest paint, and hiding it even briefly would slow the page down. The
 * supporting pieces rise in around them, and on scroll the photo sinks while
 * the stat chips drift up at different speeds (CSS only, see globals.css).
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative grid grid-cols-[repeat(auto-fit,minmax(min(100%,520px),1fr))] items-center gap-10 px-page pt-6 pb-16 nav:gap-[60px] nav:pt-[72px] nav:pb-[110px]"
    >
      <Glow className="top-[-120px] right-[-60px]" />

      <div className="relative z-[1]">
        <p className="intro eyebrow inline-flex items-center gap-2 text-green">
          <span aria-hidden="true" className="inline-block size-[7px] rounded-full bg-green" />
          {hero.eyebrow}
        </p>
        <h1
          id="hero-heading"
          className="mt-4 text-[clamp(40px,5.3vw,76px)] leading-[1.02] font-medium tracking-[-0.03em] text-ink nav:mt-[22px]"
        >
          {hero.title}
        </h1>
        {/* The registered name in full, which the client asked to be big and
            prominent. It also gives search engines the legal name in visible
            text, not just in the footer and structured data. */}
        <p
          className="intro mt-4 max-w-[600px] text-[clamp(19px,1.8vw,26px)] leading-[1.25] font-semibold tracking-[-0.015em] text-ink nav:mt-5"
          style={delay(120)}
        >
          {org.legalName}
        </p>
        <p className="mt-5 max-w-[560px] text-[17px] leading-[1.6] text-body nav:mt-6 nav:text-lg">
          {hero.body}
        </p>
        <div
          className="intro mt-8 flex flex-wrap items-center gap-3 nav:mt-10 nav:gap-[14px]"
          style={delay(240)}
        >
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

      <div className="relative z-[1] mx-auto aspect-[760/660] w-full max-w-[760px]">
        <div className="depth-photo photo-fade absolute top-[1%] left-[2%] aspect-square w-[96%] overflow-hidden rounded-full">
          <PhotoSlot
            photo={hero.photo}
            sizes="(max-width: 900px) 92vw, 730px"
            eager
            className="rounded-full"
          />
        </div>
        <div className="depth-chip-a absolute top-[18%] left-0">
          <div
            className="intro glass-chip flex flex-col gap-0.5 rounded-chip px-4 py-3 nav:px-[22px] nav:py-4"
            style={delay(450)}
          >
            <span className="text-[22px] font-semibold tracking-[-0.03em] text-ink nav:text-[28px]">
              {hero.chips[0].value}
            </span>
            <span className="text-[12px] text-body nav:text-[13px]">{hero.chips[0].label}</span>
          </div>
        </div>
        <div className="depth-chip-b absolute right-0 bottom-[14%]">
          <div
            className="intro glass-chip flex flex-col gap-0.5 rounded-chip px-4 py-3 nav:px-[22px] nav:py-4"
            style={delay(600)}
          >
            <span className="text-[22px] font-semibold tracking-[-0.03em] text-ink nav:text-[28px]">
              {hero.chips[1].value}
            </span>
            <span className="text-[12px] text-body nav:text-[13px]">{hero.chips[1].label}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
