"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SkeletonVariant = "text" | "circle" | "rectangle" | "card";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual shape variant. */
  variant?: SkeletonVariant;
  /** Explicit width (CSS value). */
  width?: string | number;
  /** Explicit height (CSS value). */
  height?: string | number;
  /** Number of lines to render when variant is "text". */
  lines?: number;
  /** Enable shimmer animation. Defaults to true. */
  animated?: boolean;
}

const shimmerClasses =
  "overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent";

const variantClasses: Record<SkeletonVariant, string> = {
  text: "h-4 w-full rounded-md",
  circle: "rounded-full",
  rectangle: "rounded-md",
  card: "rounded-lg h-32 w-full",
};

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = "rectangle",
      width,
      height,
      lines = 3,
      animated = true,
      style,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      "relative bg-muted",
      variantClasses[variant],
      animated && shimmerClasses,
      className
    );

    const resolvedStyle: React.CSSProperties = {
      ...style,
      ...(width != null
        ? { width: typeof width === "number" ? `${width}px` : width }
        : {}),
      ...(height != null
        ? { height: typeof height === "number" ? `${height}px` : height }
        : {}),
    };

    /* For circle variant, ensure equal dimensions when only one is provided. */
    if (variant === "circle") {
      if (width != null && height == null) {
        resolvedStyle.height = resolvedStyle.width;
      } else if (height != null && width == null) {
        resolvedStyle.width = resolvedStyle.height;
      } else if (width == null && height == null) {
        resolvedStyle.width = "40px";
        resolvedStyle.height = "40px";
      }
    }

    /* Text variant: render multiple lines */
    if (variant === "text" && lines > 1) {
      return (
        <div className="flex flex-col gap-2" ref={ref} {...props}>
          {Array.from({ length: lines }, (_, i) => (
            <div
              key={i}
              className={cn(
                baseClasses,
                /* Make the last line shorter for a natural look */
                i === lines - 1 && "w-3/4"
              )}
              style={
                i === lines - 1
                  ? { ...resolvedStyle, width: undefined }
                  : resolvedStyle
              }
            />
          ))}
        </div>
      );
    }

    return (
      <div ref={ref} className={baseClasses} style={resolvedStyle} {...props} />
    );
  }
);

Skeleton.displayName = "Skeleton";

export { Skeleton };
export type { SkeletonProps, SkeletonVariant };
