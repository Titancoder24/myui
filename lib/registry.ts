// =============================================================================
// MyUI Component Registry — Data & Search
// =============================================================================

import type {
  ComponentMeta,
  ComponentCategory,
  SearchResult,
  SearchOptions,
} from "./registry-types";

// ---------------------------------------------------------------------------
// Registry Data
// ---------------------------------------------------------------------------

/**
 * The complete component registry. Each entry describes a single MyUI
 * component with all the metadata needed for search, install, and preview.
 *
 * File paths are relative to the project root so that the MCP server,
 * the docs site, and the build script can all resolve them consistently.
 */
export const REGISTRY: ComponentMeta[] = [
  // ── Forms ─────────────────────────────────────────────────────────────
  {
    name: "button",
    displayName: "Button",
    category: "forms",
    description:
      "Versatile button component with multiple variants, sizes, and states. Supports icons, loading spinners, and accessible disabled states.",
    frameworks: ["react"],
    variants: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-slot"],
    },
    tags: ["button", "action", "submit", "click", "cta"],
    files: {
      react: ["registry/react/forms/button.tsx"],
    },
  },
  {
    name: "input",
    displayName: "Input",
    category: "forms",
    description:
      "Text input field with built-in label, error state, and helper text support. Integrates with form libraries.",
    frameworks: ["react"],
    variants: ["default", "filled", "underline"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-label"],
    },
    tags: ["input", "text", "field", "form", "text-field"],
    files: {
      react: ["registry/react/forms/input.tsx"],
    },
  },
  {
    name: "checkbox",
    displayName: "Checkbox",
    category: "forms",
    description:
      "Accessible checkbox built on Radix UI. Supports indeterminate state, custom labels, and form integration.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-checkbox"],
    },
    tags: ["checkbox", "check", "toggle", "form", "boolean"],
    files: {
      react: ["registry/react/forms/checkbox.tsx"],
    },
  },
  {
    name: "select",
    displayName: "Select",
    category: "forms",
    description:
      "Dropdown select component built on Radix UI. Supports search/filter, groups, and custom option rendering.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-select"],
    },
    tags: ["select", "dropdown", "picker", "form", "combobox"],
    files: {
      react: ["registry/react/forms/select.tsx"],
    },
  },
  {
    name: "switch",
    displayName: "Switch",
    category: "forms",
    description:
      "Toggle switch for boolean settings. Accessible, animated, and available in multiple sizes.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-switch"],
    },
    tags: ["switch", "toggle", "on-off", "boolean", "form"],
    files: {
      react: ["registry/react/forms/switch.tsx"],
    },
  },
  {
    name: "textarea",
    displayName: "Textarea",
    category: "forms",
    description:
      "Multi-line text input with auto-resize support, character count, and error state handling.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: [],
    },
    tags: ["textarea", "text", "multiline", "form", "input"],
    files: {
      react: ["registry/react/forms/textarea.tsx"],
    },
  },
  {
    name: "radio-group",
    displayName: "Radio Group",
    category: "forms",
    description:
      "Radio button group for single-choice selection. Built on Radix UI with keyboard navigation support.",
    frameworks: ["react"],
    variants: ["default", "cards"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-radio-group"],
    },
    tags: ["radio", "radio-group", "choice", "form", "select"],
    files: {
      react: ["registry/react/forms/radio-group.tsx"],
    },
  },
  {
    name: "slider",
    displayName: "Slider",
    category: "forms",
    description:
      "Range slider with single or dual thumb support. Customizable track, marks, and value display.",
    frameworks: ["react"],
    variants: ["default", "range"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-slider"],
    },
    tags: ["slider", "range", "input", "form", "number"],
    files: {
      react: ["registry/react/forms/slider.tsx"],
    },
  },
  {
    name: "label",
    displayName: "Label",
    category: "forms",
    description:
      "Accessible form label component. Pairs with inputs, checkboxes, and other form controls.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-label"],
    },
    tags: ["label", "form", "accessibility", "text"],
    files: {
      react: ["registry/react/forms/label.tsx"],
    },
  },

  // ── Navigation ────────────────────────────────────────────────────────
  {
    name: "tabs",
    displayName: "Tabs",
    category: "navigation",
    description:
      "Tabbed navigation component with accessible keyboard handling. Supports both controlled and uncontrolled modes.",
    frameworks: ["react"],
    variants: ["default", "pills", "underline"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-tabs"],
    },
    tags: ["tabs", "navigation", "panel", "tab-bar"],
    files: {
      react: ["registry/react/navigation/tabs.tsx"],
    },
  },
  {
    name: "breadcrumb",
    displayName: "Breadcrumb",
    category: "navigation",
    description:
      "Breadcrumb navigation for hierarchical page structures. Supports custom separators and collapsed states.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: [],
    },
    tags: ["breadcrumb", "navigation", "path", "hierarchy"],
    files: {
      react: ["registry/react/navigation/breadcrumb.tsx"],
    },
  },
  {
    name: "navigation-menu",
    displayName: "Navigation Menu",
    category: "navigation",
    description:
      "Full-featured navigation menu with dropdowns, mega-menu support, and mobile-responsive behavior.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-navigation-menu"],
    },
    tags: ["navigation", "menu", "navbar", "header", "nav"],
    files: {
      react: ["registry/react/navigation/navigation-menu.tsx"],
    },
  },
  {
    name: "dropdown-menu",
    displayName: "Dropdown Menu",
    category: "navigation",
    description:
      "Context-aware dropdown menu with submenus, checkable items, and keyboard navigation. Built on Radix UI.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-dropdown-menu"],
    },
    tags: ["dropdown", "menu", "context-menu", "action-menu", "navigation"],
    files: {
      react: ["registry/react/navigation/dropdown-menu.tsx"],
    },
  },
  {
    name: "command",
    displayName: "Command",
    category: "navigation",
    description:
      "Command palette / combobox for fast keyboard-driven navigation. Filterable list with groups and shortcuts.",
    frameworks: ["react"],
    variants: ["default", "dialog"],
    dependencies: ["dialog"],
    peerDependencies: {
      react: ["cmdk"],
    },
    tags: ["command", "palette", "search", "combobox", "cmd-k"],
    files: {
      react: ["registry/react/navigation/command.tsx"],
    },
  },

  // ── Data Display ──────────────────────────────────────────────────────
  {
    name: "card",
    displayName: "Card",
    category: "data-display",
    description:
      "Flexible card container with header, content, and footer sections. Supports hover effects and click handling.",
    frameworks: ["react"],
    variants: ["default", "interactive", "outlined"],
    dependencies: [],
    peerDependencies: {
      react: [],
    },
    tags: ["card", "container", "panel", "box", "surface"],
    files: {
      react: ["registry/react/data-display/card.tsx"],
    },
  },
  {
    name: "badge",
    displayName: "Badge",
    category: "data-display",
    description:
      "Small status indicator for labels, counts, and tags. Multiple color variants and sizes.",
    frameworks: ["react"],
    variants: ["default", "secondary", "destructive", "outline"],
    dependencies: [],
    peerDependencies: {
      react: [],
    },
    tags: ["badge", "tag", "label", "chip", "status", "indicator"],
    files: {
      react: ["registry/react/data-display/badge.tsx"],
    },
  },
  {
    name: "avatar",
    displayName: "Avatar",
    category: "data-display",
    description:
      "User avatar with image, initials fallback, and online status indicator. Supports grouping.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-avatar"],
    },
    tags: ["avatar", "user", "profile", "image", "picture"],
    files: {
      react: ["registry/react/data-display/avatar.tsx"],
    },
  },
  {
    name: "table",
    displayName: "Table",
    category: "data-display",
    description:
      "Data table with sorting, row selection, and responsive behavior. Composable header, body, and footer.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: [],
    },
    tags: ["table", "data-table", "grid", "list", "data"],
    files: {
      react: ["registry/react/data-display/table.tsx"],
    },
  },
  {
    name: "accordion",
    displayName: "Accordion",
    category: "data-display",
    description:
      "Collapsible content sections with smooth animations. Supports single or multiple open panels.",
    frameworks: ["react"],
    variants: ["default", "bordered"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-accordion"],
    },
    tags: ["accordion", "collapse", "expand", "faq", "disclosure"],
    files: {
      react: ["registry/react/data-display/accordion.tsx"],
    },
  },
  {
    name: "progress",
    displayName: "Progress",
    category: "data-display",
    description:
      "Progress bar with determinate and indeterminate modes. Supports labels, stripes, and color variants.",
    frameworks: ["react"],
    variants: ["default", "striped", "indeterminate"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-progress"],
    },
    tags: ["progress", "loading", "bar", "status", "percentage"],
    files: {
      react: ["registry/react/data-display/progress.tsx"],
    },
  },
  {
    name: "separator",
    displayName: "Separator",
    category: "data-display",
    description:
      "Visual divider for separating content sections. Supports horizontal and vertical orientations.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-separator"],
    },
    tags: ["separator", "divider", "hr", "line", "border"],
    files: {
      react: ["registry/react/data-display/separator.tsx"],
    },
  },
  {
    name: "scroll-area",
    displayName: "Scroll Area",
    category: "data-display",
    description:
      "Custom scrollbar container with cross-browser consistent styling. Supports both axes.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-scroll-area"],
    },
    tags: ["scroll", "scrollbar", "overflow", "container"],
    files: {
      react: ["registry/react/data-display/scroll-area.tsx"],
    },
  },
  {
    name: "aspect-ratio",
    displayName: "Aspect Ratio",
    category: "data-display",
    description:
      "Container that maintains a fixed aspect ratio. Useful for images, videos, and embedded content.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-aspect-ratio"],
    },
    tags: ["aspect-ratio", "image", "video", "responsive", "container"],
    files: {
      react: ["registry/react/data-display/aspect-ratio.tsx"],
    },
  },
  {
    name: "collapsible",
    displayName: "Collapsible",
    category: "data-display",
    description:
      "Simple collapsible section with trigger and animated content. Building block for more complex components.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-collapsible"],
    },
    tags: ["collapsible", "collapse", "expand", "toggle", "disclosure"],
    files: {
      react: ["registry/react/data-display/collapsible.tsx"],
    },
  },
  {
    name: "hover-card",
    displayName: "Hover Card",
    category: "data-display",
    description:
      "Rich preview card that appears on hover. Great for user profiles, link previews, and contextual info.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-hover-card"],
    },
    tags: ["hover-card", "preview", "tooltip", "popover", "user-card"],
    files: {
      react: ["registry/react/data-display/hover-card.tsx"],
    },
  },

  // ── Overlays ──────────────────────────────────────────────────────────
  {
    name: "dialog",
    displayName: "Dialog",
    category: "overlays",
    description:
      "Modal dialog with focus trapping, scroll locking, and accessible keyboard handling. Supports custom sizes.",
    frameworks: ["react"],
    variants: ["default", "sheet"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-dialog"],
    },
    tags: ["dialog", "modal", "popup", "overlay", "lightbox"],
    files: {
      react: ["registry/react/overlays/dialog.tsx"],
    },
  },
  {
    name: "alert-dialog",
    displayName: "Alert Dialog",
    category: "overlays",
    description:
      "Confirmation dialog for destructive or irreversible actions. Requires explicit user acknowledgment.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["button"],
    peerDependencies: {
      react: ["@radix-ui/react-alert-dialog"],
    },
    tags: ["alert", "confirm", "dialog", "modal", "warning"],
    files: {
      react: ["registry/react/overlays/alert-dialog.tsx"],
    },
  },
  {
    name: "popover",
    displayName: "Popover",
    category: "overlays",
    description:
      "Floating content panel anchored to a trigger element. Supports arrow, custom positioning, and focus management.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-popover"],
    },
    tags: ["popover", "popup", "floating", "panel", "dropdown"],
    files: {
      react: ["registry/react/overlays/popover.tsx"],
    },
  },
  {
    name: "tooltip",
    displayName: "Tooltip",
    category: "overlays",
    description:
      "Informational tooltip that appears on hover or focus. Supports rich content and custom positioning.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-tooltip"],
    },
    tags: ["tooltip", "hint", "help", "info", "hover"],
    files: {
      react: ["registry/react/overlays/tooltip.tsx"],
    },
  },
  {
    name: "toast",
    displayName: "Toast",
    category: "overlays",
    description:
      "Non-blocking notification toast with auto-dismiss, action buttons, and queue management.",
    frameworks: ["react"],
    variants: ["default", "destructive"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-toast"],
    },
    tags: ["toast", "notification", "snackbar", "alert", "message"],
    files: {
      react: ["registry/react/overlays/toast.tsx"],
    },
  },
  {
    name: "context-menu",
    displayName: "Context Menu",
    category: "overlays",
    description:
      "Right-click context menu with nested submenus, shortcuts display, and checkable items.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-context-menu"],
    },
    tags: ["context-menu", "right-click", "menu", "actions"],
    files: {
      react: ["registry/react/overlays/context-menu.tsx"],
    },
  },
  {
    name: "menubar",
    displayName: "Menubar",
    category: "overlays",
    description:
      "Application-style horizontal menu bar with dropdown submenus, keyboard navigation, and shortcuts.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-menubar"],
    },
    tags: ["menubar", "menu", "toolbar", "application", "navigation"],
    files: {
      react: ["registry/react/overlays/menubar.tsx"],
    },
  },

  // ── Utility ───────────────────────────────────────────────────────────
  {
    name: "toggle",
    displayName: "Toggle",
    category: "utility",
    description:
      "Pressable toggle button for binary states. Useful for bold/italic toggles, view mode switches, etc.",
    frameworks: ["react"],
    variants: ["default", "outline"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-toggle"],
    },
    tags: ["toggle", "press", "button", "binary", "switch"],
    files: {
      react: ["registry/react/utility/toggle.tsx"],
    },
  },
  {
    name: "toggle-group",
    displayName: "Toggle Group",
    category: "utility",
    description:
      "Group of toggle buttons for single or multiple selection. Great for toolbar button groups.",
    frameworks: ["react"],
    variants: ["default", "outline"],
    dependencies: ["toggle"],
    peerDependencies: {
      react: ["@radix-ui/react-toggle-group"],
    },
    tags: ["toggle-group", "button-group", "toolbar", "segmented"],
    files: {
      react: ["registry/react/utility/toggle-group.tsx"],
    },
  },
  {
    name: "skeleton",
    displayName: "Skeleton",
    category: "utility",
    description:
      "Placeholder loading skeleton with shimmer animation. Matches common content shapes automatically.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: [],
    },
    tags: ["skeleton", "loading", "placeholder", "shimmer", "loader"],
    files: {
      react: ["registry/react/utility/skeleton.tsx"],
    },
  },
];

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

/** Map for O(1) lookup by component name. */
const registryByName = new Map<string, ComponentMeta>(
  REGISTRY.map((c) => [c.name, c]),
);

/**
 * Get a single component by its kebab-case name.
 * Returns `undefined` when the name is not found.
 */
export function getComponent(name: string): ComponentMeta | undefined {
  return registryByName.get(name);
}

/**
 * Get every component in a given category, optionally filtered by framework.
 */
export function getComponentsByCategory(
  category: ComponentCategory,
  framework?: string,
): ComponentMeta[] {
  return REGISTRY.filter((c) => {
    if (c.category !== category) return false;
    if (framework && !c.frameworks.includes(framework)) return false;
    return true;
  });
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

/**
 * Simple but effective text search over the registry.
 *
 * Scoring rules (cumulative):
 *   +10  exact name match
 *    +5  name starts with query
 *    +3  name contains query
 *    +4  displayName contains query (case-insensitive)
 *    +3  description contains query (case-insensitive)
 *    +2  per matching tag
 *
 * Results are returned in descending score order.
 */
export function searchComponents(
  query: string,
  options: SearchOptions = {},
): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const component of REGISTRY) {
    // Apply optional filters before scoring.
    if (options.category && component.category !== options.category) continue;
    if (options.framework && !component.frameworks.includes(options.framework))
      continue;

    let score = 0;

    // Name matching
    const name = component.name.toLowerCase();
    if (name === q) {
      score += 10;
    } else if (name.startsWith(q)) {
      score += 5;
    } else if (name.includes(q)) {
      score += 3;
    }

    // Display name matching
    if (component.displayName.toLowerCase().includes(q)) {
      score += 4;
    }

    // Description matching
    if (component.description.toLowerCase().includes(q)) {
      score += 3;
    }

    // Tag matching
    for (const tag of component.tags) {
      if (tag.toLowerCase().includes(q)) {
        score += 2;
      }
    }

    if (score > 0) {
      results.push({ component, score });
    }
  }

  // Sort descending by score, then alphabetically by name for ties.
  results.sort((a, b) =>
    b.score - a.score || a.component.name.localeCompare(b.component.name),
  );

  return results;
}

// ---------------------------------------------------------------------------
// Dependency resolution
// ---------------------------------------------------------------------------

/**
 * Resolve the full transitive dependency tree for a component.
 * Returns an ordered array (dependencies first, then the root component).
 */
export function resolveDependencies(name: string): ComponentMeta[] {
  const resolved: ComponentMeta[] = [];
  const visited = new Set<string>();

  function walk(componentName: string): void {
    if (visited.has(componentName)) return;
    visited.add(componentName);

    const meta = registryByName.get(componentName);
    if (!meta) return;

    for (const dep of meta.dependencies) {
      walk(dep);
    }

    resolved.push(meta);
  }

  walk(name);
  return resolved;
}
