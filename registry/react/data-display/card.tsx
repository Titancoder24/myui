"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 1 | 2 | 3;
  interactive?: boolean;
  glass?: boolean;
}

const elevationMap: Record<1 | 2 | 3, string> = {
  1: "shadow-elevation-1",
  2: "shadow-elevation-2",
  3: "shadow-elevation-3",
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      elevation = 1,
      interactive = false,
      glass = false,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground transition-all duration-200",
        elevationMap[elevation],
        interactive &&
          "hover:shadow-elevation-2 hover:-translate-y-0.5 cursor-pointer",
        glass && "bg-card/80 backdrop-blur-xl border-white/10",
        "dark:border-t-white/5",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

// ---------------------------------------------------------------------------
// CardHeader
// ---------------------------------------------------------------------------

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// ---------------------------------------------------------------------------
// CardTitle
// ---------------------------------------------------------------------------

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// ---------------------------------------------------------------------------
// CardDescription
// ---------------------------------------------------------------------------

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// ---------------------------------------------------------------------------
// CardContent
// ---------------------------------------------------------------------------

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// ---------------------------------------------------------------------------
// CardFooter
// ---------------------------------------------------------------------------

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export type { CardProps };
