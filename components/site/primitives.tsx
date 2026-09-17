import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { Photo } from "@/content/site";
import Image from "next/image";

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

/** Soft yellow radial light. Purely decorative; positioned by the caller. */
export function Glow({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("page-glow", className)} />;
}

/** Hairline divider between sections, inset by the page padding. */
export function SectionRule() {
  return <hr className="mx-page h-px border-0 bg-hairline" />;
}

/**
 * Fills its (positioned) parent with either the supplied photo or a labelled
 * placeholder, e.g. "[PHOTO: Food Outreach]". The label is real page text by
 * design: the handoff keeps missing content visible until the client supplies it.
 */
export function PhotoSlot({
  photo,
  placeholder,
  className,
  sizes,
  priority = false,
}: {
  photo: Photo | null;
  placeholder: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  if (photo) {
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center border border-dashed border-[rgba(30,122,44,0.3)] bg-[rgba(30,122,44,0.05)] p-4 text-center text-[13px] font-medium text-muted",
        className
      )}
    >
      {placeholder}
    </div>
  );
}
