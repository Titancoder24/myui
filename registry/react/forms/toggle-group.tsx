"use client";

import * as React from "react";
import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Context for sharing variant/size with items                               */
/* -------------------------------------------------------------------------- */

interface ToggleGroupContextValue {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  variant: "default",
  size: "md",
});

/* -------------------------------------------------------------------------- */
/*  Variants (shared with toggle-group items)                                 */
/* -------------------------------------------------------------------------- */

const toggleGroupItemVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium transition-colors duration-200 hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground data-[state=on]:border-accent",
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

/* -------------------------------------------------------------------------- */
/*  ToggleGroup                                                               */
/* -------------------------------------------------------------------------- */

type ToggleGroupProps = React.ComponentPropsWithoutRef<
  typeof RadixToggleGroup.Root
> &
  VariantProps<typeof toggleGroupItemVariants> & {
    variant?: "default" | "outline";
    size?: "sm" | "md" | "lg";
  };

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof RadixToggleGroup.Root>,
  ToggleGroupProps
>(({ className, variant = "default", size = "md", children, ...props }, ref) => (
  <ToggleGroupContext.Provider value={{ variant, size }}>
    <RadixToggleGroup.Root
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 rounded-lg bg-muted p-1",
        className
      )}
      {...props}
    >
      {children}
    </RadixToggleGroup.Root>
  </ToggleGroupContext.Provider>
));
ToggleGroup.displayName = "ToggleGroup";

/* -------------------------------------------------------------------------- */
/*  ToggleGroupItem                                                           */
/* -------------------------------------------------------------------------- */

interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadixToggleGroup.Item>,
    VariantProps<typeof toggleGroupItemVariants> {}

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof RadixToggleGroup.Item>,
  ToggleGroupItemProps
>(({ className, variant, size, ...props }, ref) => {
  const ctx = React.useContext(ToggleGroupContext);

  return (
    <RadixToggleGroup.Item
      ref={ref}
      className={cn(
        toggleGroupItemVariants({
          variant: variant ?? ctx.variant,
          size: size ?? ctx.size,
        }),
        "rounded-md",
        "data-[state=on]:bg-background data-[state=on]:shadow-sm",
        className
      )}
      {...props}
    />
  );
});
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem, toggleGroupItemVariants };
export type { ToggleGroupProps, ToggleGroupItemProps };
