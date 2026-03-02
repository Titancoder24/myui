"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-lg bg-foreground px-3 py-1.5 text-xs text-background shadow-elevation-2 animate-fade-in",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

/**
 * Convenience wrapper that provides a Tooltip with default 700ms delay.
 *
 * Usage:
 * ```tsx
 * <TooltipProvider delayDuration={700}>
 *   <Tooltip>
 *     <TooltipTrigger>Hover me</TooltipTrigger>
 *     <TooltipContent side="top">Tooltip text</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
const TooltipProviderWithDefaults = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Provider>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>
>(({ delayDuration = 700, ...props }, _ref) => (
  <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
));
TooltipProviderWithDefaults.displayName = "TooltipProviderWithDefaults";

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipProviderWithDefaults,
};
