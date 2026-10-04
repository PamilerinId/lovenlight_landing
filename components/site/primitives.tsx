import Image from "next/image";
import type { ReactNode } from "react";

import type { Photo, ProgrammeIconName } from "@/content/site";
import { cn } from "@/lib/utils";

import { ProgrammeIcon } from "./ProgrammeIcon";

/** Vertical rhythm for every section: tighter on phones, generous on desktop. */
export const sectionClass = "px-page py-16 nav:py-[110px]";

/** Small uppercase label above a heading. Green unless a colour class is passed. */
export function Eyebrow({
  children,
  className,
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  as?: "span" | "p";
}) {
  return <Tag className={cn("eyebrow block text-green", className)}>{children}</Tag>;
}

/**
 * The chapter label and heading that open each section. Revealed as one
 * block so the label and the line it introduces arrive together.
 */
export function SectionHeader({
  id,
  eyebrow,
  title,
  level = 2,
  className,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  level?: 1 | 2;
  className?: string;
  children?: ReactNode;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div data-reveal className={className}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading
        id={id}
        className="mt-4 max-w-[900px] text-[clamp(32px,3.6vw,52px)] leading-[1.08] font-medium tracking-[-0.03em] text-ink nav:mt-5"
      >
        {title}
      </Heading>
      {children}
    </div>
  );
}

/** Soft yellow radial light. Purely decorative; positioned by the caller. */
export function Glow({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("page-glow", className)} />;
}

/** Hairline divider between sections, inset by the page padding. */
export function SectionRule() {
  return <hr className="mx-page h-px border-0 bg-hairline" />;
}

/**
 * Stand-in for a photograph that has not arrived yet: one of the brand's
 * line icons at the centre of concentric rings, under a soft yellow light,
 * like a ripple spreading outward. It reads as an illustration rather than a
 * gap, and uses only the two brand hues. Decorative, so hidden from screen
 * readers; the card's own title says what it is.
 */
export function ArtPanel({ icon, className }: { icon: ProgrammeIconName; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 overflow-hidden bg-[rgba(30,122,44,0.07)]", className)}
    >
      <div className="art-glow absolute inset-0" />
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full text-green"
      >
        {[34, 64, 96, 130, 166, 204, 244].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="150"
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity={0.22 - i * 0.025}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <ProgrammeIcon
        name={icon}
        className="absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2 text-green nav:size-14"
      />
    </div>
  );
}

/**
 * Fills its positioned parent with the photograph, or with an ArtPanel when
 * the photograph has not been supplied yet.
 */
export function PhotoSlot({
  photo,
  art = "person",
  className,
  sizes,
  eager = false,
}: {
  photo: Photo | null;
  art?: ProgrammeIconName;
  className?: string;
  sizes: string;
  /** For the one above-the-fold image: load immediately, at high priority. */
  eager?: boolean;
}) {
  if (photo) {
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className={cn("object-cover", className)}
      />
    );
  }
  return <ArtPanel icon={art} className={className} />;
}
