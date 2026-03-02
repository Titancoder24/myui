"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// EmptyState
// ---------------------------------------------------------------------------

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center py-12 text-center",
        className,
      )}
    >
      {icon && (
        <div className="text-muted-foreground mb-4 animate-[float_3s_ease-in-out_infinite]">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}

      {/* Float animation keyframes */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-6px); }
            }
          `,
        }}
      />
    </div>
  ),
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
export type { EmptyStateProps };
