import { linkProps } from "@/lib/links";
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
      className="relative grid grid-cols-1 items-center gap-10 px-page pt-6 pb-16 nav:grid-cols-[0.85fr_1.15fr] nav:gap-[60px] nav:pt-[72px] nav:pb-[110px]"
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
            <a href={links.friend} {...linkProps(links.friend)}>
              {hero.ctas.friend}
            </a>
          </Button>
          <Button asChild variant="secondary" size="secondary">
            <a href={links.donate} {...linkProps(links.donate)}>Donate now</a>
          </Button>
          <Button asChild variant="secondary" size="secondary">
            <a href={links.volunteer} {...linkProps(links.volunteer)}>
              {hero.ctas.volunteer}
            </a>
          </Button>
          <Button asChild variant="link" size="link">
            <a href={links.partner} {...linkProps(links.partner)}>{hero.ctas.partner}</a>
          </Button>
        </div>
      </div>

      {/* The photo runs edge to edge (it bleeds out of the page padding) and
          is shown whole: the three faces span nearly its full width, so any
          square or circular crop cuts one off. */}
      <div className="relative z-[1] -mx-page nav:mr-[calc(var(--spacing-page)*-1)] nav:ml-0">
        <div className="depth-photo relative aspect-[3/2] w-full overflow-hidden nav:rounded-l-[32px]">
          <PhotoSlot
            photo={hero.photo}
            sizes="(max-width: 900px) 100vw, 780px"
            eager
          />
        </div>
        {/* Chips sit over the two outer T-shirts: clear of faces and the watermark.
          Desktop only: on a phone the image is too short for them, and the same
          figures open the numbers chapter a few screens down. */}
        <div className="depth-chip-a absolute -left-6 bottom-[6%] hidden nav:block">
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
        <div className="depth-chip-b absolute right-4 bottom-[6%] hidden nav:block">
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
