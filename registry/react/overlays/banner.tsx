"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* -------------------------------- Variants -------------------------------- */

type BannerVariant = "info" | "success" | "warning" | "error";

const variantStyles: Record<BannerVariant, string> = {
  info: "bg-primary/10 text-primary border-primary/20 [&>svg]:text-primary",
  success:
    "bg-success/10 text-success border-success/20 [&>svg]:text-success",
  warning:
    "bg-warning/10 text-warning border-warning/20 [&>svg]:text-warning",
  error:
    "bg-destructive/10 text-destructive border-destructive/20 [&>svg]:text-destructive",
};

/* --------------------------------- Props ---------------------------------- */

interface BannerProps {
  variant?: BannerVariant;
  icon?: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  sticky?: boolean;
  className?: string;
}

/* -------------------------------- Component ------------------------------- */

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      variant = "info",
      icon,
      children,
      action,
      dismissible = false,
      onDismiss,
      sticky = false,
      className,
    },
    ref
  ) => {
    const [visible, setVisible] = React.useState(true);

    if (!visible) return null;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "flex w-full items-center gap-3 border-b px-4 py-3 text-sm animate-slide-in-from-top",
          sticky && "sticky top-0 z-50",
          variantStyles[variant],
          className
        )}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <div className="flex-1 font-medium">{children}</div>
        {action && <div className="shrink-0">{action}</div>}
        {dismissible && (
          <button
            type="button"
            onClick={() => {
              setVisible(false);
              onDismiss?.();
            }}
            className="shrink-0 rounded-sm p-0.5 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Dismiss"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);
Banner.displayName = "Banner";

export { Banner };
export type { BannerProps, BannerVariant };
