"use client";

import * as React from "react";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  RadioGroup                                                                */
/* -------------------------------------------------------------------------- */

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Root>,
  React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>
>(({ className, ...props }, ref) => (
  <RadixRadioGroup.Root
    ref={ref}
    className={cn("grid gap-2", className)}
    {...props}
  />
));
RadioGroup.displayName = "RadioGroup";

/* -------------------------------------------------------------------------- */
/*  RadioGroupItem                                                            */
/* -------------------------------------------------------------------------- */

interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Item> {
  label?: string;
  description?: string;
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Item>,
  RadioGroupItemProps
>(({ className, label, description, id, ...props }, ref) => {
  const innerId = id || React.useId();

  const radio = (
    <RadixRadioGroup.Item
      ref={ref}
      id={innerId}
      className={cn(
        "h-4 w-4 rounded-full border border-input shadow-sm transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-primary",
        className
      )}
      {...props}
    >
      <RadixRadioGroup.Indicator className="flex items-center justify-center">
        <span
          className={cn(
            "block h-2 w-2 rounded-full bg-primary",
            "transition-transform duration-200 ease-spring",
            "scale-0 data-[state=checked]:scale-100"
          )}
          /* The data-state attribute is inherited from the parent indicator */
        />
      </RadixRadioGroup.Indicator>
    </RadixRadioGroup.Item>
  );

  if (!label && !description) {
    return radio;
  }

  return (
    <div className="flex items-start gap-2">
      {radio}
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
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
export type { RadioGroupItemProps };
