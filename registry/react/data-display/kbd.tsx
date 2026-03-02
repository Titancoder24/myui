"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Kbd
// ---------------------------------------------------------------------------

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  keys?: string[];
}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, keys, children, ...props }, ref) => {
    // If keys are provided, render them with "+" separators.
    // Otherwise fall back to rendering children as a single key.
    if (keys && keys.length > 0) {
      return (
        <kbd
          ref={ref}
          className={cn("inline-flex items-center gap-1", className)}
          {...props}
        >
          {keys.map((key, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span className="text-[0.625rem] text-muted-foreground select-none">
                  +
                </span>
              )}
              <span
                className={cn(
                  "inline-flex items-center justify-center",
                  "h-5 min-w-[1.25rem] px-1",
                  "rounded border border-b-2",
                  "bg-muted text-[0.625rem] font-mono font-medium text-muted-foreground",
                )}
              >
                {key}
              </span>
            </React.Fragment>
          ))}
        </kbd>
      );
    }

    return (
      <kbd
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center",
          "h-5 min-w-[1.25rem] px-1",
          "rounded border border-b-2",
          "bg-muted text-[0.625rem] font-mono font-medium text-muted-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </kbd>
    );
  },
);
Kbd.displayName = "Kbd";

export { Kbd };
export type { KbdProps };
