"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Collapsible (Root)                                                        */
/* -------------------------------------------------------------------------- */

const Collapsible = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Root
    ref={ref}
    className={cn(className)}
    {...props}
  />
));

Collapsible.displayName = "Collapsible";

/* -------------------------------------------------------------------------- */
/*  CollapsibleTrigger                                                        */
/* -------------------------------------------------------------------------- */

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <CollapsiblePrimitive.Trigger
    ref={ref}
    className={cn(className)}
    {...props}
  />
));

CollapsibleTrigger.displayName = "CollapsibleTrigger";

/* -------------------------------------------------------------------------- */
/*  CollapsibleContent                                                        */
/* -------------------------------------------------------------------------- */

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    {children}
  </CollapsiblePrimitive.Content>
));

CollapsibleContent.displayName = "CollapsibleContent";

/* -------------------------------------------------------------------------- */
/*  Exports                                                                   */
/* -------------------------------------------------------------------------- */

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
