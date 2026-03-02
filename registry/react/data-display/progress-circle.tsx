"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// ProgressCircle
// ---------------------------------------------------------------------------

interface ProgressCircleProps {
  value?: number;
  max?: number;
  size?: "sm" | "md" | "lg" | number;
  strokeWidth?: number;
  showValue?: boolean;
  color?: "auto" | "primary" | "success" | "warning" | "destructive";
  className?: string;
}

const namedSizes: Record<string, number> = {
  sm: 48,
  md: 64,
  lg: 96,
};

const colorToStroke: Record<string, string> = {
  primary: "stroke-primary",
  success: "stroke-success",
  warning: "stroke-warning",
  destructive: "stroke-destructive",
};

function getAutoStrokeColor(percentage: number): string {
  if (percentage < 25) return "stroke-destructive";
  if (percentage < 50) return "stroke-warning";
  if (percentage >= 75) return "stroke-success";
  return "stroke-primary";
}

const ProgressCircle = React.forwardRef<SVGSVGElement, ProgressCircleProps>(
  (
    {
      value = 0,
      max = 100,
      size = "md",
      strokeWidth = 4,
      showValue = false,
      color = "primary",
      className,
    },
    ref,
  ) => {
    const resolvedSize =
      typeof size === "number" ? size : (namedSizes[size] ?? 64);

    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const radius = (resolvedSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const strokeColor =
      color === "auto"
        ? getAutoStrokeColor(percentage)
        : colorToStroke[color];

    const valueFontSize = resolvedSize * 0.22;

    return (
      <div
        className={cn(
          "relative inline-flex items-center justify-center",
          className,
        )}
        style={{ width: resolvedSize, height: resolvedSize }}
      >
        <svg
          ref={ref}
          width={resolvedSize}
          height={resolvedSize}
          viewBox={`0 0 ${resolvedSize} ${resolvedSize}`}
          fill="none"
          className="-rotate-90"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          {/* Track */}
          <circle
            cx={resolvedSize / 2}
            cy={resolvedSize / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-secondary"
            fill="none"
          />
          {/* Indicator */}
          <circle
            cx={resolvedSize / 2}
            cy={resolvedSize / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            className={cn(
              "transition-[stroke-dashoffset] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]",
              strokeColor,
            )}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
            }}
          />
        </svg>

        {showValue && (
          <span
            className="absolute inset-0 flex items-center justify-center font-semibold tabular-nums text-foreground"
            style={{ fontSize: valueFontSize }}
          >
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  },
);
ProgressCircle.displayName = "ProgressCircle";

export { ProgressCircle };
export type { ProgressCircleProps };
