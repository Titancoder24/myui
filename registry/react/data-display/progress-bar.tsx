"use client";

import * as React from "react";
import * as RadixProgress from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// ProgressBar
// ---------------------------------------------------------------------------

interface ProgressBarProps
  extends React.ComponentPropsWithoutRef<typeof RadixProgress.Root> {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  striped?: boolean;
  animated?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "auto" | "primary" | "success" | "warning" | "destructive";
}

const trackSizeClasses: Record<string, string> = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

const colorClasses: Record<string, string> = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
};

function getAutoColor(percentage: number): string {
  if (percentage < 25) return "bg-destructive";
  if (percentage < 50) return "bg-warning";
  if (percentage >= 75) return "bg-success";
  return "bg-primary";
}

const ProgressBar = React.forwardRef<
  React.ElementRef<typeof RadixProgress.Root>,
  ProgressBarProps
>(
  (
    {
      className,
      value = 0,
      max = 100,
      label,
      showValue = false,
      striped = false,
      animated = false,
      size = "md",
      color = "primary",
      ...props
    },
    ref,
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    const indicatorColor =
      color === "auto" ? getAutoColor(percentage) : colorClasses[color];

    return (
      <div className="w-full">
        {(label || showValue) && (
          <div className="flex items-center justify-between mb-1.5">
            {label && (
              <span className="text-sm font-medium text-foreground">
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-sm tabular-nums text-muted-foreground">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <RadixProgress.Root
          ref={ref}
          className={cn(
            "relative w-full overflow-hidden rounded-full bg-secondary",
            trackSizeClasses[size],
            className,
          )}
          value={value}
          max={max}
          {...props}
        >
          <RadixProgress.Indicator
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]",
              indicatorColor,
              striped &&
                "bg-[length:1rem_1rem] bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)]",
              animated &&
                striped &&
                "animate-[progress-bar-stripe_1s_linear_infinite]",
            )}
            style={{ width: `${percentage}%` }}
          />
        </RadixProgress.Root>

        {/* Inline keyframes for the stripe animation */}
        {animated && striped && (
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @keyframes progress-bar-stripe {
                  0% { background-position: 1rem 0; }
                  100% { background-position: 0 0; }
                }
              `,
            }}
          />
        )}
      </div>
    );
  },
);
ProgressBar.displayName = "ProgressBar";

export { ProgressBar };
export type { ProgressBarProps };
