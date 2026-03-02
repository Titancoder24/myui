"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Image
// ---------------------------------------------------------------------------

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: number;
  fallback?: React.ReactNode;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, aspectRatio, fallback, alt, style, onLoad, onError, ...props }, ref) => {
    const [status, setStatus] = React.useState<"loading" | "loaded" | "error">(
      "loading",
    );

    const handleLoad = React.useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        setStatus("loaded");
        onLoad?.(e);
      },
      [onLoad],
    );

    const handleError = React.useCallback(
      (e: React.SyntheticEvent<HTMLImageElement>) => {
        setStatus("error");
        onError?.(e);
      },
      [onError],
    );

    const containerStyle: React.CSSProperties = {
      ...style,
      ...(aspectRatio ? { aspectRatio: String(aspectRatio) } : {}),
    };

    // Error state - show fallback
    if (status === "error") {
      return (
        <div
          className={cn(
            "relative overflow-hidden rounded-md bg-muted",
            "flex items-center justify-center",
            className,
          )}
          style={containerStyle}
        >
          {fallback ?? (
            <div className="flex flex-col items-center gap-1 text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <span className="text-xs">Failed to load</span>
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        className={cn("relative overflow-hidden rounded-md", className)}
        style={containerStyle}
      >
        {/* Skeleton loading placeholder */}
        {status === "loading" && (
          <div
            className={cn(
              "absolute inset-0 bg-muted",
              "animate-pulse",
            )}
          />
        )}

        {/* Actual image */}
        <img
          ref={ref}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "h-full w-full object-cover",
            "transition-opacity duration-300",
            status === "loaded" ? "opacity-100" : "opacity-0",
          )}
          {...props}
        />
      </div>
    );
  },
);
Image.displayName = "Image";

export { Image };
export type { ImageProps };
