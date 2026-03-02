"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Shared helper types                                                       */
/* -------------------------------------------------------------------------- */

interface TypographyProps<T extends React.ElementType>
  extends React.HTMLAttributes<HTMLElement> {
  /** When true, merges props onto the child element instead of rendering the default element. */
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
}

/* -------------------------------------------------------------------------- */
/*  Factory for heading / block-level typography components                    */
/* -------------------------------------------------------------------------- */

function createTypographyComponent<T extends React.ElementType>(
  tag: T,
  displayName: string,
  defaultClassName: string
) {
  const Component = React.forwardRef<HTMLElement, TypographyProps<T>>(
    ({ className, asChild = false, ...props }, ref) => {
      const Comp = asChild ? Slot : (tag as React.ElementType);
      return (
        <Comp
          ref={ref}
          className={cn(defaultClassName, className)}
          {...props}
        />
      );
    }
  );
  Component.displayName = displayName;
  return Component;
}

/* -------------------------------------------------------------------------- */
/*  Heading components                                                        */
/* -------------------------------------------------------------------------- */

const H1 = createTypographyComponent(
  "h1",
  "H1",
  "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
);

const H2 = createTypographyComponent(
  "h2",
  "H2",
  "scroll-m-20 text-3xl font-semibold tracking-tight"
);

const H3 = createTypographyComponent(
  "h3",
  "H3",
  "scroll-m-20 text-2xl font-semibold tracking-tight"
);

const H4 = createTypographyComponent(
  "h4",
  "H4",
  "scroll-m-20 text-xl font-semibold tracking-tight"
);

const H5 = createTypographyComponent(
  "h5",
  "H5",
  "scroll-m-20 text-lg font-semibold tracking-tight"
);

const H6 = createTypographyComponent(
  "h6",
  "H6",
  "scroll-m-20 text-base font-semibold tracking-tight"
);

/* -------------------------------------------------------------------------- */
/*  Body / text components                                                    */
/* -------------------------------------------------------------------------- */

const Paragraph = createTypographyComponent(
  "p",
  "Paragraph",
  "leading-7 [&:not(:first-child)]:mt-6"
);

const Lead = createTypographyComponent(
  "p",
  "Lead",
  "text-xl text-muted-foreground"
);

const Large = createTypographyComponent(
  "div",
  "Large",
  "text-lg font-semibold"
);

const Small = createTypographyComponent(
  "small",
  "Small",
  "text-sm font-medium leading-none"
);

const Muted = createTypographyComponent(
  "p",
  "Muted",
  "text-sm text-muted-foreground"
);

/* -------------------------------------------------------------------------- */
/*  Inline / block special components                                         */
/* -------------------------------------------------------------------------- */

const InlineCode = createTypographyComponent(
  "code",
  "InlineCode",
  "relative rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm"
);

const Blockquote = createTypographyComponent(
  "blockquote",
  "Blockquote",
  "mt-6 border-l-2 pl-6 italic"
);

/* -------------------------------------------------------------------------- */
/*  Exports                                                                   */
/* -------------------------------------------------------------------------- */

export {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Paragraph,
  Lead,
  Large,
  Small,
  Muted,
  InlineCode,
  Blockquote,
};
