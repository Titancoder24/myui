"use client";

import * as React from "react";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Deterministic hash from a string, returns a number. */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

const FALLBACK_COLORS = [
  "bg-red-500/15 text-red-700 dark:text-red-400",
  "bg-orange-500/15 text-orange-700 dark:text-orange-400",
  "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
  "bg-lime-500/15 text-lime-700 dark:text-lime-400",
  "bg-green-500/15 text-green-700 dark:text-green-400",
  "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  "bg-teal-500/15 text-teal-700 dark:text-teal-400",
  "bg-cyan-500/15 text-cyan-700 dark:text-cyan-400",
  "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400",
  "bg-violet-500/15 text-violet-700 dark:text-violet-400",
  "bg-purple-500/15 text-purple-700 dark:text-purple-400",
  "bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-400",
  "bg-pink-500/15 text-pink-700 dark:text-pink-400",
  "bg-rose-500/15 text-rose-700 dark:text-rose-400",
];

function colorFromName(name: string): string {
  return FALLBACK_COLORS[hashString(name) % FALLBACK_COLORS.length];
}

// ---------------------------------------------------------------------------
// Size maps
// ---------------------------------------------------------------------------

const sizeClasses: Record<string, string> = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

const statusSizeClasses: Record<string, string> = {
  xs: "h-1.5 w-1.5",
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
  xl: "h-3.5 w-3.5",
};

const statusColorClasses: Record<string, string> = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  away: "bg-amber-500",
  busy: "bg-red-500",
};

const fallbackTextSizes: Record<string, string> = {
  xs: "text-[0.625rem]",
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

// ---------------------------------------------------------------------------
// Context to propagate size to children
// ---------------------------------------------------------------------------

interface AvatarContextValue {
  size: "xs" | "sm" | "md" | "lg" | "xl";
}

const AvatarContext = React.createContext<AvatarContextValue>({ size: "md" });

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof RadixAvatar.Root> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "away" | "busy";
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof RadixAvatar.Root>,
  AvatarProps
>(({ className, size = "md", status, children, ...props }, ref) => (
  <AvatarContext.Provider value={{ size }}>
    <div className={cn("relative inline-flex", sizeClasses[size])}>
      <RadixAvatar.Root
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full",
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
      </RadixAvatar.Root>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-background",
            statusSizeClasses[size],
            statusColorClasses[status],
          )}
          aria-label={status}
        />
      )}
    </div>
  </AvatarContext.Provider>
));
Avatar.displayName = "Avatar";

// ---------------------------------------------------------------------------
// AvatarImage
// ---------------------------------------------------------------------------

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof RadixAvatar.Image>,
  React.ComponentPropsWithoutRef<typeof RadixAvatar.Image>
>(({ className, ...props }, ref) => (
  <RadixAvatar.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

// ---------------------------------------------------------------------------
// AvatarFallback
// ---------------------------------------------------------------------------

interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof RadixAvatar.Fallback> {
  /** Name string used to generate a deterministic background color. */
  name?: string;
}

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof RadixAvatar.Fallback>,
  AvatarFallbackProps
>(({ className, name, children, ...props }, ref) => {
  const { size } = React.useContext(AvatarContext);
  const deterministicColor = name ? colorFromName(name) : "bg-muted text-muted-foreground";

  return (
    <RadixAvatar.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full font-medium",
        deterministicColor,
        fallbackTextSizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </RadixAvatar.Fallback>
  );
});
AvatarFallback.displayName = "AvatarFallback";

// ---------------------------------------------------------------------------
// AvatarGroup
// ---------------------------------------------------------------------------

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum number of avatars to show before displaying a "+N" counter. */
  max?: number;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, max, children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visibleChildren = max ? childArray.slice(0, max) : childArray;
    const overflowCount = max ? childArray.length - max : 0;

    return (
      <div
        ref={ref}
        className={cn("flex -space-x-2", className)}
        {...props}
      >
        {visibleChildren.map((child, index) => (
          <div key={index} className="ring-2 ring-background rounded-full">
            {child}
          </div>
        ))}
        {overflowCount > 0 && (
          <div
            className={cn(
              "ring-2 ring-background rounded-full",
              "relative flex shrink-0 items-center justify-center",
              "h-10 w-10 bg-muted text-muted-foreground text-xs font-medium",
            )}
          >
            +{overflowCount}
          </div>
        )}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
export type { AvatarProps, AvatarFallbackProps, AvatarGroupProps };
