"use client";

import * as React from "react";
import { createPortal } from "react-dom";

/* -------------------------------------------------------------------------- */
/*  Portal                                                                    */
/* -------------------------------------------------------------------------- */

interface PortalProps {
  /** Content to render inside the portal. */
  children: React.ReactNode;
  /** Target DOM element. Defaults to document.body. */
  container?: Element | null;
}

const Portal: React.FC<PortalProps> = ({ children, container }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  const target = container ?? document.body;

  return createPortal(children, target);
};

Portal.displayName = "Portal";

export { Portal };
export type { PortalProps };
