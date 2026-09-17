import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * shadcn Button, re-skinned to the five pill styles in the handoff. Every CTA
 * on the site is a link, so `asChild` with an <a> is the normal usage.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full text-[15px] font-semibold whitespace-nowrap outline-none select-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-ground disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-green text-white hover:bg-green-hover hover:text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_12px_32px_rgba(30,122,44,0.28)]",
        nav: "bg-green text-white hover:bg-green-hover hover:text-white text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_24px_rgba(30,122,44,0.25)]",
        secondary:
          "border border-[rgba(30,122,44,0.35)] bg-[rgba(30,122,44,0.04)] text-green hover:bg-[rgba(30,122,44,0.08)] hover:text-green",
        link: "text-green hover:text-green-hover",
        inverse:
          "bg-white text-green hover:text-green-hover shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
      },
      size: {
        primary: "px-7 py-4",
        secondary: "px-7 py-[15px]",
        link: "px-2 py-[15px]",
        nav: "px-[22px] py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "primary",
    },
  }
);

function Button({
  className,
  variant = "primary",
  size = "primary",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
