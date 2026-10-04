import Image from "next/image";

import { people } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * "Our people": Founder, Grand Patron, patrons and matrons, and volunteers.
 *
 * Its own section after "What we do", at the client's request, and well
 * away from the Friends of Love & Light panel so the patrons never read as
 * the ones asking for money.
 *
 * Layout: two by two on desktop. On phones the portraits sit side by side
 * and each group shot takes the full width, where a half-width tile would
 * crop people out of the frame.
 */
export function People() {
  return (
    <section id="people" aria-labelledby="people-heading" className="px-page py-[110px]">
      <h2 id="people-heading" className="eyebrow text-green">
        {people.heading}
      </h2>
      <ul className="mt-8 grid grid-cols-2 gap-3 nav:gap-5">
        {people.items.map((p) => (
          <li key={p.name} className={cn(p.wide && "col-span-2 nav:col-span-1")}>
            <figure className="flex h-full flex-col">
              <div className="relative h-[210px] w-full overflow-hidden rounded-card nav:h-[340px]">
                <Image
                  src={p.photo.src}
                  alt={p.photo.alt}
                  fill
                  sizes={p.wide ? "(max-width: 900px) 92vw, 640px" : "(max-width: 900px) 46vw, 640px"}
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex flex-col gap-0.5">
                <span className="text-[15px] leading-[1.3] font-semibold text-ink">{p.name}</span>
                {p.role && <span className="text-[13px] leading-[1.3] text-body">{p.role}</span>}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
