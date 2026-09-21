import Image from "next/image";

import { programmes } from "@/content/site";
import { cn } from "@/lib/utils";

import { Eyebrow } from "./primitives";
import { ProgrammeIcon } from "./ProgrammeIcon";

/**
 * "What we do" — six cards, each with a photograph and a line of explanation.
 *
 * This returned to cards once the client supplied imagery and copy. The
 * earlier minimal list existed because a card holding only an icon and a title
 * had nothing to justify its height; with a photo and a description it does.
 * Two columns on phones keeps the extra height in check.
 */
export function Programmes() {
  return (
    <section id="programmes" aria-labelledby="programmes-heading" className="px-page py-[110px]">
      <Eyebrow>{programmes.eyebrow}</Eyebrow>
      <h2
        id="programmes-heading"
        className="mt-5 max-w-[900px] text-[clamp(36px,3.6vw,52px)] leading-[1.08] font-medium tracking-[-0.03em] text-ink"
      >
        {programmes.heading}
      </h2>

      <ul className="mt-10 grid grid-cols-2 gap-3 nav:mt-16 nav:grid-cols-3 nav:gap-5">
        {programmes.items.map((item) => (
          <li key={item.n}>
            <article
              className={cn(
                "flex h-full flex-col overflow-hidden rounded-card",
                item.strong ? "glass-panel-strong" : "glass"
              )}
            >
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
                {item.photo ? (
                  <Image
                    src={item.photo.src}
                    alt={item.photo.alt}
                    fill
                    sizes="(max-width: 900px) 46vw, 420px"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[rgba(30,122,44,0.05)] p-3 text-center text-[12px] text-muted">
                    [PHOTO: {item.title}]
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-2 p-4 nav:gap-2.5 nav:p-6">
                <div className="flex items-center justify-between gap-2">
                  <ProgrammeIcon
                    name={item.icon}
                    className={cn("size-5 nav:size-6", item.strong ? "text-white" : "text-green")}
                  />
                  <span
                    className={cn(
                      "text-[13px] font-semibold tabular-nums",
                      item.strong ? "text-white/80" : "text-green"
                    )}
                  >
                    {item.n}
                  </span>
                </div>
                <h3
                  className={cn(
                    "text-[17px] leading-[1.25] font-medium tracking-[-0.02em] nav:text-xl",
                    item.strong ? "text-white" : "text-ink"
                  )}
                >
                  {item.title}
                </h3>
                {item.blurb ? (
                  <p
                    className={cn(
                      "text-[14px] leading-[1.55] nav:text-[15px]",
                      item.strong ? "text-white/90" : "text-body"
                    )}
                  >
                    {item.blurb}
                  </p>
                ) : (
                  <p className="text-[13px] leading-[1.5] text-muted">
                    [COPY: one line about {item.title}]
                  </p>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
