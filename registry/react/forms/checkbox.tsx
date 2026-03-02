"use client";

import * as React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  label?: string;
  description?: string;
  error?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  CheckboxProps
>(({ className, label, description, error, id, ...props }, ref) => {
  const innerId = id || React.useId();

  const checkbox = (
    <RadixCheckbox.Root
      ref={ref}
      id={innerId}
      className={cn(
        "h-4 w-4 shrink-0 rounded-sm border border-input shadow-sm transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary",
        "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:border-primary",
        error && "border-destructive",
        className
      )}
      {...props}
    >
      <RadixCheckbox.Indicator className="flex items-center justify-center text-current">
        {props.checked === "indeterminate" ? (
          /* Indeterminate: horizontal line */
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="h-2.5 w-2.5"
          >
            <line
              x1="2"
              y1="5"
              x2="8"
              y2="5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          /* Checked: animated checkmark */
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="h-2.5 w-2.5"
          >
            <path
              d="M2 5.5L4 7.5L8 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="24"
              className="animate-checkmark-draw"
            />
          </svg>
        )}
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );

  if (!label && !description) {
    return checkbox;
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start gap-2">
        {checkbox}
        <div className="grid gap-0.5 leading-none">
          {label && (
            <label
              htmlFor={innerId}
              className={cn(
                "text-sm font-medium leading-none cursor-pointer",
                "peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {error && (
        <p className="text-xs text-destructive ml-6 animate-slide-in-from-top">
          {error}
        </p>
      )}
    </div>
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };
