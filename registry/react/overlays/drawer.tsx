"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

/* ---------------------------------- Types --------------------------------- */

type DrawerSide = "top" | "right" | "bottom" | "left";

interface DrawerContextValue {
  side: DrawerSide;
}

const DrawerContext = React.createContext<DrawerContextValue>({ side: "right" });

function useDrawerContext() {
  return React.useContext(DrawerContext);
}

/* --------------------------------- Drawer --------------------------------- */

interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: DrawerSide;
  children: React.ReactNode;
}

const Drawer = ({ open, onOpenChange, side = "right", children }: DrawerProps) => (
  <DrawerContext.Provider value={{ side }}>
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </DialogPrimitive.Root>
  </DrawerContext.Provider>
);
Drawer.displayName = "Drawer";

/* -------------------------------- Trigger --------------------------------- */

const DrawerTrigger = DialogPrimitive.Trigger;
DrawerTrigger.displayName = "DrawerTrigger";

/* --------------------------------- Close ---------------------------------- */

const DrawerClose = DialogPrimitive.Close;
DrawerClose.displayName = "DrawerClose";

/* -------------------------------- Overlay --------------------------------- */

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-dialog-overlay-in data-[state=closed]:animate-fade-out",
      className
    )}
    {...props}
  />
));
DrawerOverlay.displayName = "DrawerOverlay";

/* -------------------------------- Content --------------------------------- */

const sideStyles: Record<DrawerSide, string> = {
  right:
    "fixed inset-y-0 right-0 z-50 w-3/4 max-w-sm data-[state=open]:animate-slide-in-from-right data-[state=closed]:animate-slide-in-from-right",
  left:
    "fixed inset-y-0 left-0 z-50 w-3/4 max-w-sm data-[state=open]:animate-slide-in-from-left data-[state=closed]:animate-slide-in-from-left",
  bottom:
    "fixed inset-x-0 bottom-0 z-50 max-h-[85vh] data-[state=open]:animate-slide-in-from-bottom data-[state=closed]:animate-slide-in-from-bottom",
  top:
    "fixed inset-x-0 top-0 z-50 max-h-[85vh] data-[state=open]:animate-slide-in-from-top data-[state=closed]:animate-slide-in-from-top",
};

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { side } = useDrawerContext();

  return (
    <DialogPrimitive.Portal>
      <DrawerOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "border bg-background p-6 shadow-elevation-3",
          "dark:border-white/10",
          sideStyles[side],
          className
        )}
        {...props}
      >
        {/* Drag handle for bottom drawer */}
        {side === "bottom" && (
          <div className="mx-auto mb-4 h-1.5 w-12 shrink-0 rounded-full bg-muted-foreground/20" />
        )}
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});
DrawerContent.displayName = "DrawerContent";

/* ------------------------------- Sub-parts -------------------------------- */

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = "DrawerDescription";

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
};
