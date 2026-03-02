"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Tag
// ---------------------------------------------------------------------------

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline";
  onRemove?: () => void;
  onClick?: () => void;
  className?: string;
}

const variantStyles: Record<NonNullable<TagProps["variant"]>, string> = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  outline: "border text-foreground bg-transparent",
};

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  (
    { children, variant = "default", onRemove, onClick, className },
    ref,
  ) => {
    const [removing, setRemoving] = React.useState(false);

    const handleRemove = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        setRemoving(true);
        // Wait for the scale-out animation to finish before calling onRemove
        setTimeout(() => {
          onRemove?.();
        }, 150);
      },
      [onRemove],
    );

    return (
      <div
        ref={ref}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
          "transition-all duration-150",
          variantStyles[variant],
          onClick && "cursor-pointer hover:opacity-80",
          removing && "scale-0 opacity-0",
          !removing && "scale-100 opacity-100",
          className,
        )}
      >
        <span>{children}</span>
        {onRemove && (
          <button
            type="button"
            onClick={handleRemove}
            className={cn(
              "inline-flex items-center justify-center rounded-full",
              "ml-0.5 h-3.5 w-3.5",
              "hover:bg-black/10 dark:hover:bg-white/10",
              "transition-colors duration-100",
              "focus:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            )}
            aria-label="Remove"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
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
  },
);
Tag.displayName = "Tag";

export { Tag };
export type { TagProps };
