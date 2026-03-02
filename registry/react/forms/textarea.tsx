"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  autoResize?: boolean;
  maxLength?: number;
  showCount?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      hint,
      autoResize = false,
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
    const internalRef = React.useRef<HTMLTextAreaElement | null>(null);

    const [internalValue, setInternalValue] = React.useState(
      defaultValue?.toString() ?? ""
    );
    const isControlled = value !== undefined;
    const currentValue = isControlled ? String(value) : internalValue;
    const hasValue = currentValue.length > 0;
    const charCount = currentValue.length;
    const charLimitNear = maxLength ? charCount >= maxLength * 0.9 : false;

    // Merge forwarded ref with internal ref
    const mergedRef = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current =
            node;
        }
      },
      [ref]
    );

    // Auto-resize effect
    React.useEffect(() => {
      if (!autoResize || !internalRef.current) return;
      const el = internalRef.current;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }, [currentValue, autoResize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    return (
      <div className="relative w-full">
        <div
          className={cn(
            "relative rounded-lg border bg-background transition-colors duration-200",
            error
              ? "border-destructive focus-within:ring-2 focus-within:ring-destructive/30 animate-shake"
              : "border-input focus-within:border-primary focus-within:ring-2 focus-within:ring-ring",
            props.disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <div className="relative">
            <textarea
              id={innerId}
              ref={mergedRef}
              value={isControlled ? value : undefined}
              defaultValue={!isControlled ? defaultValue : undefined}
              onChange={handleChange}
              maxLength={maxLength}
              className={cn(
                "peer flex min-h-[80px] w-full bg-transparent px-3 py-2 text-sm transition-colors duration-200",
                "placeholder:text-transparent",
                "focus-visible:outline-none",
                "disabled:cursor-not-allowed",
                autoResize && "resize-none overflow-hidden",
                label && "pt-5 pb-2",
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
                  "pointer-events-none absolute left-3 top-3 origin-[0] text-sm text-muted-foreground transition-all duration-200 ease-smooth",
                  "peer-focus:-translate-y-[0.85rem] peer-focus:scale-[0.85]",
                  hasValue && "-translate-y-[0.85rem] scale-[0.85]"
                )}
              >
                {label}
              </label>
            )}
          </div>
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
Textarea.displayName = "Textarea";

export { Textarea };
export type { TextareaProps };
