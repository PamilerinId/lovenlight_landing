import Image from "next/image";
import type { CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import { hero, links, org } from "@/content/site";
import { linkProps } from "@/lib/links";

import { Glow, PhotoSlot } from "./primitives";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** Outline pill for use on the dark hero. */
const onDark = "border-white/60 bg-transparent text-white hover:bg-white hover:text-green";

/** Tighter horizontal padding on phones so two buttons share a row. */
const tight = "px-4 nav:px-7";

/**
 * The cover of the story: a dark card with the children's photograph behind
 * the headline and the two volunteers in front, on the right.
 *
 * The photograph is dimmed by a flat dark layer so white text stays readable
 * over its brightest areas (a flat layer rather than a gradient, which the
 * brand rules rule out). The card is dark before the image arrives, so the
 * text is legible from the first paint.
 *
 * The headline and opening paragraph render immediately with no animation,
 * since the paragraph is the page's largest text paint. The supporting pieces
 * rise in around them, and on scroll the volunteers sink while the stat chips
 * drift up at different speeds (CSS only, see globals.css).
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="px-page pt-2 pb-16 nav:pt-4 nav:pb-[110px]">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-ink nav:rounded-[40px]">
        <Image
          src={hero.background.src}
          alt=""
          fill
          sizes="(max-width: 900px) 100vw, 1280px"
          loading="eager"
          fetchPriority="high"
          // Anchored low and scaled up from the bottom, which trims about a
          // fifth off the top and so crops out the "Made to Love" watermark
          // in the photograph's top-left corner.
          style={{ objectPosition: "50% 100%" }}
          className="-z-20 origin-bottom scale-[1.14] object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/70" />
        <Glow className="-z-10 top-[-160px] right-[-120px]" />

        <div className="relative grid grid-cols-1 items-center gap-10 p-6 pt-10 pb-9 nav:grid-cols-[1.1fr_0.9fr] nav:gap-10 nav:p-14 nav:pr-10">
          <div>
            <p className="intro eyebrow inline-flex items-center gap-2 text-white/90">
              <span aria-hidden="true" className="inline-block size-[7px] rounded-full bg-white" />
              {hero.eyebrow}
            </p>
            <h1
              id="hero-heading"
              className="mt-4 text-[clamp(40px,5.3vw,76px)] leading-[1.02] font-medium tracking-[-0.03em] text-white nav:mt-[22px]"
            >
              {hero.title}
            </h1>
            {/* The registered name in full, which the client asked to be big
                and prominent. It also gives search engines the legal name in
                visible text, not just in the footer and structured data. */}
            <p
              className="intro mt-4 max-w-[600px] text-[clamp(19px,1.8vw,26px)] leading-[1.25] font-semibold tracking-[-0.015em] text-white nav:mt-5"
              style={delay(120)}
            >
              {org.legalName}
            </p>
            <p className="mt-5 max-w-[560px] text-[17px] leading-[1.6] text-white/90 nav:mt-6 nav:text-lg">
              {hero.body}
            </p>
            <div
              className="intro mt-8 grid grid-cols-2 gap-3 nav:mt-10 nav:flex nav:flex-wrap nav:items-center nav:gap-[14px]"
              style={delay(240)}
            >
              <Button asChild variant="inverse" size="primary" className={tight}>
                <a href={links.friend} {...linkProps(links.friend)}>
                  {hero.ctas.friend}
                </a>
              </Button>
              <Button asChild variant="secondary" size="secondary" className={`${onDark} ${tight}`}>
                <a href={links.donate} {...linkProps(links.donate)}>
                  Donate now
                </a>
              </Button>
              <Button asChild variant="secondary" size="secondary" className={`${onDark} ${tight}`}>
                <a href={links.volunteer} {...linkProps(links.volunteer)}>
                  {hero.ctas.volunteer}
                </a>
              </Button>
              <Button
                asChild
                variant="link"
                size="link"
                className="justify-start text-white hover:text-white/80 nav:justify-center"
              >
                <a href={links.partner} {...linkProps(links.partner)}>
                  {hero.ctas.partner}
                </a>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-[78%] max-w-[420px] nav:w-full nav:max-w-[460px]">
            <div className="depth-photo photo-fade absolute inset-0 overflow-hidden rounded-full">
              <PhotoSlot
                photo={hero.photo}
                sizes="(max-width: 900px) 78vw, 460px"
                className="rounded-full"
              />
            </div>
            <div className="depth-chip-a absolute top-[14%] -left-6 hidden nav:block">
              <div
                className="intro glass-chip flex flex-col gap-0.5 rounded-chip px-[22px] py-4"
                style={delay(450)}
              >
                <span className="text-[28px] font-semibold tracking-[-0.03em] text-ink">
                  {hero.chips[0].value}
                </span>
                <span className="text-[13px] text-body">{hero.chips[0].label}</span>
              </div>
            </div>
            <div className="depth-chip-b absolute right-0 bottom-[10%] hidden nav:block">
              <div
                className="intro glass-chip flex flex-col gap-0.5 rounded-chip px-[22px] py-4"
                style={delay(600)}
              >
                <span className="text-[28px] font-semibold tracking-[-0.03em] text-ink">
                  {hero.chips[1].value}
                </span>
                <span className="text-[13px] text-body">{hero.chips[1].label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
