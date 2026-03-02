"use client";

import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  AspectRatio                                                               */
/* -------------------------------------------------------------------------- */

interface AspectRatioProps
  extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  /** The desired width-to-height ratio (e.g. 16/9, 4/3, 1). Defaults to 16/9. */
  ratio?: number;
}

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(({ className, ratio = 16 / 9, children, ...props }, ref) => (
  <div className={cn("overflow-hidden", className)}>
    <AspectRatioPrimitive.Root ref={ref} ratio={ratio} {...props}>
      {children}
    </AspectRatioPrimitive.Root>
  </div>
));

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
export type { AspectRatioProps };
