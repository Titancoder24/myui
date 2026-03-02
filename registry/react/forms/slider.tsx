"use client";

import * as React from "react";
import * as RadixSlider from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof RadixSlider.Root> {}

const Slider = React.forwardRef<
  React.ElementRef<typeof RadixSlider.Root>,
  SliderProps
>(({ className, ...props }, ref) => (
  <RadixSlider.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <RadixSlider.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary">
      <RadixSlider.Range className="absolute h-full bg-primary" />
    </RadixSlider.Track>
    {(props.defaultValue ?? props.value ?? [0]).map((_, index) => (
      <RadixSlider.Thumb
        key={index}
        className={cn(
          "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow-sm",
          "transition-transform duration-200",
          "hover:scale-110",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "active:scale-95",
          "disabled:pointer-events-none disabled:opacity-50"
        )}
      />
    ))}
  </RadixSlider.Root>
));
Slider.displayName = "Slider";

export { Slider };
export type { SliderProps };
