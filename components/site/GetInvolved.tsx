import { Button } from "@/components/ui/button";
import { involved, links } from "@/content/site";

import { Eyebrow, Glow } from "./primitives";
import { CheckIcon } from "./ProgrammeIcon";

export function GetInvolved() {
  const { volunteer, friends } = involved;
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
      <div className="relative mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-5">
        <article className="glass flex flex-col rounded-panel p-[clamp(28px,3.3vw,48px)]">
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

        <article className="glass-panel-strong flex flex-col rounded-panel p-[clamp(28px,3.3vw,48px)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Eyebrow className="text-white/85">{friends.label}</Eyebrow>
            <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-[13px] font-semibold text-white">
              {friends.badge}
            </span>
          </div>
          <h3 className="mt-5 text-[clamp(28px,2.5vw,36px)] leading-[1.1] font-medium tracking-[-0.03em] text-white">
            {friends.heading}
          </h3>
          <p className="mt-6 text-base leading-[1.7] text-white/90">{friends.body}</p>
          <ul className="mt-6 flex flex-1 flex-col gap-3">
            {friends.perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-[15px] font-medium text-white">
                <CheckIcon />
                {perk}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] leading-[1.6] text-white/85">{friends.closing}</p>
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
