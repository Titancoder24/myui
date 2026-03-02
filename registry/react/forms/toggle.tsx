"use client";

import * as React from "react";
import * as RadixToggle from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors duration-200 hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-8 px-2.5 gap-1.5",
        md: "h-9 px-3 gap-2",
        lg: "h-10 px-4 gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof RadixToggle.Root>,
    VariantProps<typeof toggleVariants> {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof RadixToggle.Root>,
  ToggleProps
>(({ className, variant, size, ...props }, ref) => (
  <RadixToggle.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));
Toggle.displayName = "Toggle";

export { Toggle, toggleVariants };
export type { ToggleProps };
