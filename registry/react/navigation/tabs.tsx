"use client";

import * as React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = RadixTabs.Root;

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof RadixTabs.List> {
  variant?: "underline" | "pills" | "bordered";
}

const TabsListContext = React.createContext<
  "underline" | "pills" | "bordered"
>("underline");

const TabsList = React.forwardRef<
  React.ElementRef<typeof RadixTabs.List>,
  TabsListProps
>(({ className, variant = "underline", ...props }, ref) => (
  <TabsListContext.Provider value={variant}>
    <RadixTabs.List
      ref={ref}
      className={cn(
        variant === "underline" &&
          "inline-flex h-10 items-center justify-center gap-1 border-b border-border",
        variant === "pills" &&
          "inline-flex h-10 items-center justify-center gap-1 rounded-lg bg-muted p-1",
        variant === "bordered" && "inline-flex items-center gap-0",
        className
      )}
      {...props}
    />
  </TabsListContext.Provider>
));
TabsList.displayName = RadixTabs.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(TabsListContext);

  return (
    <RadixTabs.Trigger
      ref={ref}
      className={cn(
        variant === "underline" &&
          "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:text-foreground relative after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform data-[state=active]:after:scale-x-100",
        variant === "pills" &&
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm",
        variant === "bordered" &&
          "inline-flex items-center justify-center whitespace-nowrap border px-3 py-1.5 text-sm font-medium transition-colors first:rounded-l-md last:rounded-r-md -ml-px first:ml-0 hover:bg-muted data-[state=active]:bg-background data-[state=active]:z-10",
        className
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = RadixTabs.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Content>
>(({ className, ...props }, ref) => (
  <RadixTabs.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-fade-in",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = RadixTabs.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
