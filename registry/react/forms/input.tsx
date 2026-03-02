"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  maxLength?: number;
  showCount?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      hint,
      prefix,
      suffix,
      clearable = false,
      onClear,
      maxLength,
      showCount = false,
      value,
      defaultValue,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const innerId = id || React.useId();
    const [internalValue, setInternalValue] = React.useState(
      defaultValue?.toString() ?? ""
    );
    const isControlled = value !== undefined;
    const currentValue = isControlled ? String(value) : internalValue;
    const hasValue = currentValue.length > 0;
    const charCount = currentValue.length;
    const charLimitNear = maxLength ? charCount >= maxLength * 0.9 : false;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue("");
      }
      onClear?.();
    };

    return (
      <div className="relative w-full">
        <div
          className={cn(
            "relative flex items-center rounded-lg border bg-background transition-colors duration-200",
            error
              ? "border-destructive focus-within:ring-2 focus-within:ring-destructive/30 animate-shake"
              : "border-input focus-within:border-primary focus-within:ring-2 focus-within:ring-ring",
            props.disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {/* Prefix */}
          {prefix && (
            <span className="flex items-center pl-3 text-muted-foreground">
              {prefix}
            </span>
          )}

          {/* Input + floating label */}
          <div className="relative flex-1">
            <input
              id={innerId}
              ref={ref}
              type={type}
              value={isControlled ? value : undefined}
              defaultValue={!isControlled ? defaultValue : undefined}
              onChange={handleChange}
              maxLength={maxLength}
              className={cn(
                "peer flex h-10 w-full bg-transparent px-3 py-2 text-sm transition-colors duration-200",
                "file:border-0 file:bg-transparent file:text-sm file:font-medium",
                "placeholder:text-transparent",
                "focus-visible:outline-none",
                "disabled:cursor-not-allowed",
                label && "pt-4 pb-1",
                !prefix && "pl-3",
                className
              )}
              placeholder={label || " "}
              {...props}
            />

            {/* Floating label */}
            {label && (
              <label
                htmlFor={innerId}
                className={cn(
                  "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 origin-[0] text-sm text-muted-foreground transition-all duration-200 ease-smooth",
                  "peer-focus:-translate-y-[1.25rem] peer-focus:scale-[0.85]",
                  hasValue && "-translate-y-[1.25rem] scale-[0.85]",
                  prefix && "left-0"
                )}
              >
                {label}
              </label>
            )}
          </div>

          {/* Clear button */}
          {clearable && hasValue && !props.disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center pr-2 text-muted-foreground transition-opacity duration-150 hover:text-foreground focus:outline-none"
              tabIndex={-1}
              aria-label="Clear input"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}

          {/* Suffix */}
          {suffix && (
            <span className="flex items-center pr-3 text-muted-foreground">
              {suffix}
            </span>
          )}
        </div>

        {/* Bottom row: error / hint / char count */}
        <div className="flex items-start justify-between px-1 pt-1">
          <div className="flex-1">
            {error && (
              <p className="text-xs text-destructive animate-slide-in-from-top">
                {error}
              </p>
            )}
            {!error && hint && (
              <p className="text-xs text-muted-foreground">{hint}</p>
            )}
          </div>

          {showCount && maxLength != null && (
            <span
              className={cn(
                "text-xs tabular-nums ml-2",
                charLimitNear ? "text-destructive" : "text-muted-foreground"
              )}
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
export type { InputProps };
