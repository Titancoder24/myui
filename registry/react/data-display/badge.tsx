"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Badge
// ---------------------------------------------------------------------------

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning";
  dot?: boolean;
  icon?: React.ReactNode;
  pill?: boolean;
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  outline: "border text-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant = "default",
      dot = false,
      icon,
      pill = false,
      children,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 font-medium transition-colors",
        "px-2.5 py-0.5 text-xs",
        pill ? "rounded-full" : "rounded-md",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-current"
          aria-hidden="true"
        />
      )}
      {icon && (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </div>
  ),
);
Badge.displayName = "Badge";

export { Badge };
export type { BadgeProps };
