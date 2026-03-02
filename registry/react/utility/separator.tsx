"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

interface SeparatorProps
  extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  /** Orientation of the separator line. */
  orientation?: "horizontal" | "vertical";
  /** When true, indicates the separator is purely visual and not semantic. */
  decorative?: boolean;
  /** Optional label displayed centered on the separator (e.g. "or"). */
  label?: string;
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      label,
      ...props
    },
    ref
  ) => {
    if (label && orientation === "horizontal") {
      return (
        <div className="relative flex w-full items-center" role="none">
          <SeparatorPrimitive.Root
            ref={ref}
            decorative={decorative}
            orientation="horizontal"
            className={cn("shrink-0 bg-border h-[1px] flex-1", className)}
            {...props}
          />
          <span className="mx-3 shrink-0 bg-background px-2 text-xs text-muted-foreground">
            {label}
          </span>
          <SeparatorPrimitive.Root
            decorative={decorative}
            orientation="horizontal"
            className={cn("shrink-0 bg-border h-[1px] flex-1", className)}
          />
        </div>
      );
    }

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

export { Separator };
export type { SeparatorProps };
