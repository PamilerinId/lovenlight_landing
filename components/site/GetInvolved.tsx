import Image from "next/image";

import { Button } from "@/components/ui/button";
import { involved, links } from "@/content/site";

import { Eyebrow, Glow } from "./primitives";
import { CheckIcon } from "./ProgrammeIcon";

/**
 * "Get involved" as an asymmetric composition rather than two equal panels.
 *
 * Desktop (12-column grid, two rows):
 *   row 1:  Volunteer panel (5 cols)        | photo mosaic, 3 tiles (7 cols)
 *   row 2:  Friends panel, green (8 cols)   | single photo (4 cols)
 * The glass and green panels sit diagonally, the photos fill the other two
 * corners. Rows size to the panels; the photos stretch to match.
 *
 * Mobile: one column in DOM order — Volunteer, mosaic, photo, Friends.
 */
export function GetInvolved() {
  const { volunteer, friends, gallery } = involved;
  const [hall, pulpit, rebirth, outdoor] = gallery;

  return (
    <section
      id="involved"
      aria-labelledby="involved-heading"
      className="relative px-page py-[110px]"
    >
      <Glow className="top-[40px] right-[-120px]" />
      <Eyebrow as="p" className="relative">
        {involved.eyebrow}
      </Eyebrow>
      <h2 id="involved-heading" className="sr-only">
        Ways to get involved
      </h2>

      <div className="relative mt-8 grid grid-cols-1 gap-5 nav:grid-cols-12">
        {/* Volunteer panel */}
        <article className="glass flex flex-col rounded-panel p-[clamp(28px,3.3vw,48px)] nav:col-span-5 nav:row-start-1">
          <Eyebrow>{volunteer.label}</Eyebrow>
          <h3 className="mt-5 text-[clamp(28px,2.5vw,36px)] leading-[1.1] font-medium tracking-[-0.03em] text-ink">
            {volunteer.heading}
          </h3>
          <p className="mt-6 flex-1 text-base leading-[1.7] text-body">{volunteer.body}</p>
          <div className="mt-9">
            <Button asChild variant="secondary" size="secondary">
              <a href={links.volunteer} target="_blank" rel="noopener">
                {volunteer.cta}
              </a>
            </Button>
          </div>
        </article>

        {/* Mosaic: one tall tile, two stacked beside it */}
        <div className="grid h-[420px] grid-cols-2 grid-rows-2 gap-5 nav:col-span-7 nav:row-start-1 nav:h-auto nav:min-h-0">
          <figure className="relative row-span-2 overflow-hidden rounded-panel">
            <Image
              src={hall.src}
              alt={hall.alt}
              fill
              sizes="(max-width: 900px) 50vw, 400px"
              className="object-cover"
            />
          </figure>
          <figure className="relative overflow-hidden rounded-panel">
            <Image
              src={pulpit.src}
              alt={pulpit.alt}
              fill
              sizes="(max-width: 900px) 50vw, 400px"
              className="object-cover"
            />
          </figure>
          <figure className="relative overflow-hidden rounded-panel">
            <Image
              src={rebirth.src}
              alt={rebirth.alt}
              fill
              sizes="(max-width: 900px) 50vw, 400px"
              className="object-cover object-[50%_30%]"
            />
          </figure>
        </div>

        {/* Single photo, bottom right on desktop */}
        <figure className="relative h-[240px] overflow-hidden rounded-panel nav:col-span-4 nav:col-start-9 nav:row-start-2 nav:h-auto">
          <Image
            src={outdoor.src}
            alt={outdoor.alt}
            fill
            sizes="(max-width: 900px) 100vw, 440px"
            className="object-cover object-[50%_25%]"
          />
        </figure>

        {/* Friends panel, wide, bottom left on desktop */}
        <article className="glass-panel-strong flex flex-col rounded-panel p-[clamp(28px,3.3vw,48px)] nav:col-span-8 nav:col-start-1 nav:row-start-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Eyebrow className="text-white/85">{friends.label}</Eyebrow>
            <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-[13px] font-semibold text-white">
              {friends.badge}
            </span>
          </div>
          <h3 className="mt-5 max-w-[640px] text-[clamp(28px,2.5vw,36px)] leading-[1.1] font-medium tracking-[-0.03em] text-white">
            {friends.heading}
          </h3>
          <p className="mt-6 max-w-[640px] text-base leading-[1.7] text-white/90">{friends.body}</p>
          <ul className="mt-6 flex flex-1 flex-col gap-3">
            {friends.perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-[15px] font-medium text-white">
                <CheckIcon />
                {perk}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-[640px] text-[15px] leading-[1.6] text-white/85">{friends.closing}</p>
          <div className="mt-9">
            <Button asChild variant="inverse" size="primary">
              <a href={links.friend} target="_blank" rel="noopener">
                {friends.cta}
              </a>
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}
