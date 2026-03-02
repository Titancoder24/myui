"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SpinnerSize = "sm" | "md" | "lg";
type SpinnerVariant = "circle" | "dots";

const sizeMap: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Predefined size or custom pixel value. */
  size?: SpinnerSize | number;
  /** Visual variant. */
  variant?: SpinnerVariant;
}

/* -------------------------------------------------------------------------- */
/*  Circle variant: SVG with animated stroke-dashoffset                       */
/* -------------------------------------------------------------------------- */

const CircleSpinner = React.forwardRef<
  HTMLDivElement,
  SpinnerProps & { resolvedSize: number }
>(({ resolvedSize, className, ...props }, ref) => {
  const strokeWidth = resolvedSize >= 32 ? 3 : 2;
  const radius = (resolvedSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = resolvedSize / 2;

  return (
    <div
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <svg
        width={resolvedSize}
        height={resolvedSize}
        viewBox={`0 0 ${resolvedSize} ${resolvedSize}`}
        fill="none"
        className="animate-spin"
      >
        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="opacity-20"
        />
        {/* Animated arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.75}
          className="origin-center"
          style={{ transformOrigin: "center" }}
        />
      </svg>
      <span className="sr-only">Loading</span>
    </div>
  );
});

CircleSpinner.displayName = "CircleSpinner";

/* -------------------------------------------------------------------------- */
/*  Dots variant: three dots pulsing in sequence                              */
/* -------------------------------------------------------------------------- */

const DotsSpinner = React.forwardRef<
  HTMLDivElement,
  SpinnerProps & { resolvedSize: number }
>(({ resolvedSize, className, ...props }, ref) => {
  const dotSize = Math.max(4, Math.round(resolvedSize / 4));
  const gap = Math.max(2, Math.round(dotSize / 2));

  return (
    <div
      ref={ref}
      role="status"
      aria-label="Loading"
      className={cn("inline-flex items-center", className)}
      style={{ gap: `${gap}px` }}
      {...props}
    >
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="rounded-full bg-current animate-pulse-gentle"
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            animationDelay: `${index * 150}ms`,
          }}
        />
      ))}
      <span className="sr-only">Loading</span>
    </div>
  );
});

DotsSpinner.displayName = "DotsSpinner";

/* -------------------------------------------------------------------------- */
/*  Main Spinner component                                                    */
/* -------------------------------------------------------------------------- */

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "md", variant = "circle", ...props }, ref) => {
    const resolvedSize =
      typeof size === "number" ? size : sizeMap[size];

    if (variant === "dots") {
      return (
        <DotsSpinner ref={ref} resolvedSize={resolvedSize} {...props} />
      );
    }

    return (
      <CircleSpinner ref={ref} resolvedSize={resolvedSize} {...props} />
    );
  }
);

Spinner.displayName = "Spinner";

export { Spinner };
export type { SpinnerProps, SpinnerSize, SpinnerVariant };
