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
 * The cover of the story: a full-screen photograph of the children behind the
 * headline, with the two volunteers in front, on the right, and the navigation
 * floating over the top. The volunteers' portrait doubles as the
 * "Become a Volunteer" button.
 *
 * The photograph is dimmed by a flat dark layer so white text stays readable
 * over its brightest areas (a flat layer rather than a gradient, which the
 * brand rules rule out). The section is dark before the image arrives, so the
 * text is legible from the first paint.
 *
 * The headline and opening paragraph render immediately with no animation,
 * since the paragraph is the page's largest text paint. The supporting pieces
 * rise in around them, and on scroll the volunteers sink while the stat chips
 * drift up at different speeds (CSS only, see globals.css).
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      // Marker the navigation looks for (see globals.css) to float over this
      // section with white links.
      data-hero-dark
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink"
    >
      {/* Behind, on desktop: a tiny blurred copy, stretched to fill the
          screen, so the bars beside the photo are soft colour rather than
          flat. Not on phones: the photo spans the full width there, and
          stretching the copy down a tall screen turns the light shirt at the
          bottom of the picture into a pale strip. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 hidden scale-110 bg-cover bg-center blur-2xl nav:block"
        style={{ backgroundImage: "url(/images/hero-students-blur.jpg)" }}
      />
      {/* The photograph itself, uncropped and scaled down to fit inside the
          screen: full width on phones (sitting at the top, behind the
          headline), full height on desktop. Its edges feather into the
          blurred fill so there is no hard line. */}
      <div className="absolute inset-0 -z-20 flex items-start justify-center nav:items-center">
        <div className="edge-fade relative aspect-[3/2] w-full nav:w-[min(100%,calc(100svh*1.5))]">
          <Image
            src={hero.background.src}
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover"
          />
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/80" />
      <Glow className="-z-10 top-[-160px] right-[-120px]" />

      <div className="relative w-full px-page pt-28 pb-14 nav:pt-32 nav:pb-20">
        <div className="grid grid-cols-1 items-center gap-10 nav:grid-cols-[1.1fr_0.9fr] nav:gap-10">
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
            {/* The portrait is also the "Become a Volunteer" button: the whole
                circle is the link, and a pill on its lower edge says so, so it
                reads as tappable rather than decorative. */}
            <a
              href={links.volunteer}
              {...linkProps(links.volunteer)}
              aria-label={hero.ctas.volunteer}
              className="group absolute inset-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
            >
              <span className="depth-photo photo-fade absolute inset-0 block overflow-hidden rounded-full transition-transform duration-500 group-hover:scale-[1.03]">
                <PhotoSlot
                  photo={hero.photo}
                  sizes="(max-width: 900px) 78vw, 460px"
                  className="rounded-full"
                />
              </span>
              <span className="absolute -bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white px-5 py-3 text-[14px] font-semibold whitespace-nowrap text-green shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-colors group-hover:bg-green group-hover:text-white nav:text-[15px]">
                {hero.ctas.volunteer}
                <span aria-hidden="true">→</span>
              </span>
            </a>
            {/* Stat chips, now on phones too: smaller there, and held inside the
                screen edge. Both sit clear of faces and hands. */}
            <div className="depth-chip-a pointer-events-none absolute top-[2%] -left-[8%] nav:top-auto nav:bottom-[3%] nav:-left-[17%]">
              <div
                className="intro glass-chip flex flex-col gap-0.5 rounded-[14px] px-3 py-2.5 nav:rounded-chip nav:px-[22px] nav:py-4"
                style={delay(450)}
              >
                <span className="text-[20px] font-semibold tracking-[-0.03em] text-ink nav:text-[28px]">
                  {hero.chips[0].value}
                </span>
                <span className="text-[11px] text-body nav:text-[13px]">{hero.chips[0].label}</span>
              </div>
            </div>
            <div className="depth-chip-b pointer-events-none absolute top-[2%] -right-[8%] nav:top-[6%] nav:-right-[4%]">
              <div
                className="intro glass-chip flex flex-col gap-0.5 rounded-[14px] px-3 py-2.5 nav:rounded-chip nav:px-[22px] nav:py-4"
                style={delay(600)}
              >
                <span className="text-[20px] font-semibold tracking-[-0.03em] text-ink nav:text-[28px]">
                  {hero.chips[1].value}
                </span>
                <span className="text-[11px] text-body nav:text-[13px]">{hero.chips[1].label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
