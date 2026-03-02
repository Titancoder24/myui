import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

interface PaginationLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
  size?: "sm" | "md";
}

const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, isActive, size = "md", ...props }, ref) => (
    <a
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        size === "md" && "h-9 w-9",
        size === "sm" && "h-8 w-8",
        isActive && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
        className
      )}
      {...props}
    />
  )
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = React.forwardRef<
  HTMLAnchorElement,
  PaginationLinkProps
>(({ className, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to previous page"
    size="md"
    className={cn("gap-1 pl-2.5 w-auto pr-3", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
));
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = React.forwardRef<
  HTMLAnchorElement,
  PaginationLinkProps
>(({ className, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to next page"
    size="md"
    className={cn("gap-1 pr-2.5 w-auto pl-3", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
));
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn(
      "flex h-9 w-9 items-center justify-center",
      className
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
