"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:saturate-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-elevation-1 hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground shadow-elevation-1 hover:bg-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground shadow-elevation-1 hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded-md gap-1",
        sm: "h-8 px-3 text-sm rounded-md gap-1.5",
        md: "h-9 px-4 text-sm rounded-lg gap-2",
        lg: "h-10 px-5 text-base rounded-lg gap-2",
        xl: "h-12 px-6 text-base rounded-lg gap-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin h-4 w-4", className)}
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      asChild = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={isDisabled}
          {...props}
        />
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <>
            <Spinner
              className={cn(
                size === "xs" && "h-3 w-3",
                size === "sm" && "h-3.5 w-3.5",
                size === "xl" && "h-5 w-5"
              )}
            />
            {loadingText && <span>{loadingText}</span>}
          </>
        ) : (
          <>
            {leftIcon && (
              <span className="inline-flex shrink-0">{leftIcon}</span>
            )}
            {children}
            {rightIcon && (
              <span className="inline-flex shrink-0">{rightIcon}</span>
            )}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

/* -------------------------------------------------------------------------- */
/*  ButtonGroup                                                               */
/* -------------------------------------------------------------------------- */

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "inline-flex",
          orientation === "vertical" && "flex-col",
          /*
           * Merge adjacent button borders:
           * - First child: remove trailing radius
           * - Middle children: remove all radii, collapse margin
           * - Last child: remove leading radius, collapse margin
           */
          orientation === "horizontal" &&
            "[&>*:first-child]:rounded-r-none [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:last-child]:rounded-l-none [&>*:not(:first-child)]:-ml-px",
          orientation === "vertical" &&
            "[&>*:first-child]:rounded-b-none [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:last-child]:rounded-t-none [&>*:not(:first-child)]:-mt-px",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ButtonGroup.displayName = "ButtonGroup";

export { Button, ButtonGroup, buttonVariants };
export type { ButtonProps, ButtonGroupProps };
