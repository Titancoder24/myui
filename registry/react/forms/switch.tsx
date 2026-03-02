"use client";

import * as React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  label?: string;
  description?: string;
  size?: "sm" | "md";
}

const Switch = React.forwardRef<
  React.ElementRef<typeof RadixSwitch.Root>,
  SwitchProps
>(({ className, label, description, size = "md", id, ...props }, ref) => {
  const innerId = id || React.useId();

  const trackSizeClasses = size === "sm" ? "h-4 w-7" : "h-5 w-9";
  const thumbSizeClasses =
    size === "sm"
      ? "h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0.5"
      : "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5";

  const switchEl = (
    <RadixSwitch.Root
      ref={ref}
      id={innerId}
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        trackSizeClasses,
        className
      )}
      {...props}
    >
      <RadixSwitch.Thumb
        className={cn(
          "pointer-events-none block rounded-full bg-background shadow-sm transition-transform duration-200 ease-spring",
          thumbSizeClasses
        )}
      />
    </RadixSwitch.Root>
  );

  if (!label && !description) {
    return switchEl;
  }

  return (
    <div className="flex items-start gap-3">
      {switchEl}
      <div className="grid gap-0.5 leading-none">
        {label && (
          <label
            htmlFor={innerId}
            className="text-sm font-medium leading-none cursor-pointer"
          >
            {label}
          </label>
        )}
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
});
Switch.displayName = "Switch";

export { Switch };
export type { SwitchProps };
