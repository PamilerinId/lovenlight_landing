import Image from "next/image";

import { Button } from "@/components/ui/button";
import { involved, links, type PersonPhoto } from "@/content/site";
import { cn } from "@/lib/utils";

import { Eyebrow, Glow } from "./primitives";
import { CheckIcon } from "./ProgrammeIcon";

/**
 * One mosaic tile. When the photo names a person, a caption chip sits in the
 * bottom-left corner. It is always visible rather than hover-only: phones
 * have no hover, and the names should be real page text for search engines.
 * The chip reuses the hero stat-chip surface so it reads as the same family.
 */
function Tile({
  photo,
  sizes,
  className,
  imgClassName,
}: {
  photo: PersonPhoto;
  sizes: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <figure className={cn("relative overflow-hidden rounded-panel", className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        className={cn("object-cover", imgClassName)}
      />
      {photo.person && (
        <figcaption className="glass-chip absolute bottom-3 left-3 max-w-[calc(100%-24px)] rounded-[14px] px-3 py-2">
          <span className="block text-[13px] leading-[1.3] font-semibold text-ink">
            {photo.person.name}
          </span>
          <span className="block text-[12px] leading-[1.3] text-body">{photo.person.role}</span>
        </figcaption>
      )}
    </figure>
  );
}

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

        {/* Mosaic. Desktop: one tall tile with two stacked beside it.
            Phones: the two unnamed tiles share the top row and the named tile
            takes the full width below, so its caption has room for the role. */}
        <div className="grid grid-cols-2 grid-rows-[190px_230px] gap-5 nav:col-span-7 nav:row-start-1 nav:h-auto nav:min-h-0 nav:grid-rows-2">
          <Tile
            photo={hall}
            sizes="(max-width: 900px) 45vw, 400px"
            className="col-start-1 row-start-1 nav:row-span-2"
          />
          <Tile
            photo={pulpit}
            sizes="(max-width: 900px) 92vw, 400px"
            className="col-span-2 col-start-1 row-start-2 nav:col-span-1 nav:col-start-2 nav:row-start-1"
          />
          <Tile
            photo={rebirth}
            sizes="(max-width: 900px) 45vw, 400px"
            className="col-start-2 row-start-1 nav:col-start-2 nav:row-start-2"
            imgClassName="object-[50%_30%]"
          />
        </div>

        {/* Single photo, bottom right on desktop */}
        <Tile
          photo={outdoor}
          sizes="(max-width: 900px) 100vw, 440px"
          className="h-[240px] nav:col-span-4 nav:col-start-9 nav:row-start-2 nav:h-auto"
          imgClassName="object-[50%_25%]"
        />

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
