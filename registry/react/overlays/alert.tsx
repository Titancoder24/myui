"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* -------------------------------- Variants -------------------------------- */

type AlertVariant = "default" | "info" | "success" | "warning" | "error";

const variantStyles: Record<AlertVariant, string> = {
  default: "bg-background text-foreground",
  info: "border-primary/50 text-primary dark:border-primary [&>svg]:text-primary",
  success:
    "border-success/50 text-success dark:border-success [&>svg]:text-success",
  warning:
    "border-warning/50 text-warning dark:border-warning [&>svg]:text-warning",
  error:
    "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
};

/* --------------------------------- Props ---------------------------------- */

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  icon?: React.ReactNode;
  title?: string;
}

/* -------------------------------- Component ------------------------------- */

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", icon, title, children, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "relative w-full rounded-xl border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {icon}
      <div>
        {title && (
          <AlertTitle>{title}</AlertTitle>
        )}
        {children && (
          <AlertDescription>{children}</AlertDescription>
        )}
      </div>
    </div>
  )
);
Alert.displayName = "Alert";

/* --------------------------------- Title ---------------------------------- */

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

/* ------------------------------ Description ------------------------------- */

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
export type { AlertProps, AlertVariant };
