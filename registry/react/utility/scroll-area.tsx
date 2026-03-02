"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  ScrollBar                                                                 */
/* -------------------------------------------------------------------------- */

interface ScrollBarProps
  extends React.ComponentPropsWithoutRef<
    typeof ScrollAreaPrimitive.ScrollAreaScrollbar
  > {
  orientation?: "horizontal" | "vertical";
}

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={cn(
        "relative flex-1 rounded-full bg-border",
        "opacity-0 transition-opacity duration-200",
        "group-hover/scroll-area:opacity-100",
        "data-[state=visible]:opacity-100"
      )}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));

ScrollBar.displayName = "ScrollBar";

/* -------------------------------------------------------------------------- */
/*  ScrollArea                                                                */
/* -------------------------------------------------------------------------- */

interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  /** Orientation of the scrollbar(s) to display. Defaults to "vertical". */
  orientation?: "horizontal" | "vertical" | "both";
  /** Radix scroll type: "auto" | "always" | "scroll" | "hover". */
  type?: "auto" | "always" | "scroll" | "hover";
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(
  (
    {
      className,
      children,
      orientation = "vertical",
      type = "hover",
      ...props
    },
    ref
  ) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      type={type}
      className={cn("group/scroll-area relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      {(orientation === "vertical" || orientation === "both") && (
        <ScrollBar orientation="vertical" />
      )}
      {(orientation === "horizontal" || orientation === "both") && (
        <ScrollBar orientation="horizontal" />
      )}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
);

ScrollArea.displayName = "ScrollArea";

export { ScrollArea, ScrollBar };
export type { ScrollAreaProps, ScrollBarProps };
