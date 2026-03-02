// =============================================================================
// MyUI Component Registry
// =============================================================================
//
// Central catalogue of every component shipped with MyUI.  Used by:
//   - the MCP search tool  (fuzzy search, category browse, dependency graph)
//   - the CLI installer     (dependency resolution, file copying)
//   - the documentation site (sidebar nav, search, component pages)
//
// When adding a new component make sure to:
//   1. Add its `ComponentMeta` entry to the correct category section below.
//   2. List any sibling component dependencies in `dependencies`.
//   3. List framework-specific npm packages in `peerDependencies`.
//   4. Add descriptive `tags` — they power the fuzzy search.
// =============================================================================

import type {
  ComponentMeta,
  ComponentCategory,
  SearchResult,
  SearchOptions,
} from "./registry-types";

// Re-export types for convenience
export type {
  ComponentMeta,
  ComponentCategory,
  SearchResult,
  SearchOptions,
} from "./registry-types";

// ---------------------------------------------------------------------------
// Helper — shorthand to build the `files` object
// ---------------------------------------------------------------------------

function reactFile(category: string, name: string): Record<string, string[]> {
  return { react: [`registry/react/${category}/${name}.tsx`] };
}

// =============================================================================
// FORMS  (35 components)
// =============================================================================

const formsComponents: ComponentMeta[] = [
  // ---------- button family ------------------------------------------------
  {
    name: "button",
    displayName: "Button",
    category: "forms",
    description:
      "Versatile button component with multiple variants, sizes, and loading states. The foundational interactive element for triggering actions.",
    frameworks: ["react"],
    variants: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-slot", "class-variance-authority"],
    },
    tags: ["button", "click", "action", "submit", "cta", "primary", "secondary", "ghost", "link", "interactive"],
    files: reactFile("forms", "button"),
  },
  {
    name: "icon-button",
    displayName: "Icon Button",
    category: "forms",
    description:
      "Compact button that renders a single icon with an accessible label. Ideal for toolbars, table actions, and tight layouts.",
    frameworks: ["react"],
    variants: ["default", "outline", "ghost"],
    dependencies: ["button"],
    peerDependencies: {
      react: ["@radix-ui/react-slot", "lucide-react"],
    },
    tags: ["icon", "button", "toolbar", "action", "compact", "square"],
    files: reactFile("forms", "icon-button"),
  },
  {
    name: "split-button",
    displayName: "Split Button",
    category: "forms",
    description:
      "Button split into a primary action and a dropdown trigger, letting users choose between a default action and alternatives.",
    frameworks: ["react"],
    variants: ["default", "outline"],
    dependencies: ["button", "dropdown-menu"],
    peerDependencies: {
      react: ["@radix-ui/react-dropdown-menu", "lucide-react"],
    },
    tags: ["split", "button", "dropdown", "action", "menu", "primary", "secondary"],
    files: reactFile("forms", "split-button"),
  },

  // ---------- text inputs --------------------------------------------------
  {
    name: "input",
    displayName: "Input",
    category: "forms",
    description:
      "Single-line text input with built-in label, helper text, error state, and optional leading/trailing addons.",
    frameworks: ["react"],
    variants: ["default", "filled", "flushed"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-label"],
    },
    tags: ["input", "text", "field", "form", "text-field", "textbox", "entry"],
    files: reactFile("forms", "input"),
  },
  {
    name: "textarea",
    displayName: "Textarea",
    category: "forms",
    description:
      "Multi-line text input that auto-resizes with content. Supports character counts, max length, and all standard input states.",
    frameworks: ["react"],
    variants: ["default", "filled"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-label"],
    },
    tags: ["textarea", "multiline", "text", "editor", "long-text", "message", "comment", "description"],
    files: reactFile("forms", "textarea"),
  },
  {
    name: "number-input",
    displayName: "Number Input",
    category: "forms",
    description:
      "Numeric input with increment/decrement controls, min/max constraints, step size, and locale-aware formatting.",
    frameworks: ["react"],
    variants: ["default", "stepper"],
    dependencies: ["input"],
    peerDependencies: {
      react: ["@radix-ui/react-label", "lucide-react"],
    },
    tags: ["number", "numeric", "input", "stepper", "counter", "quantity", "increment", "decrement", "spin-button"],
    files: reactFile("forms", "number-input"),
  },
  {
    name: "password-input",
    displayName: "Password Input",
    category: "forms",
    description:
      "Password field with a show/hide toggle, optional strength indicator, and configurable validation rules.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["input", "icon-button"],
    peerDependencies: {
      react: ["@radix-ui/react-label", "lucide-react"],
    },
    tags: ["password", "secret", "hidden", "toggle", "visibility", "auth", "login", "credential", "security"],
    files: reactFile("forms", "password-input"),
  },
  {
    name: "search-input",
    displayName: "Search Input",
    category: "forms",
    description:
      "Search-optimised input with a magnifying-glass icon, clear button, and optional keyboard shortcut hint.",
    frameworks: ["react"],
    variants: ["default", "expandable"],
    dependencies: ["input"],
    peerDependencies: {
      react: ["@radix-ui/react-label", "lucide-react"],
    },
    tags: ["search", "find", "filter", "query", "lookup", "magnifying-glass", "input"],
    files: reactFile("forms", "search-input"),
  },
  {
    name: "phone-input",
    displayName: "Phone Input",
    category: "forms",
    description:
      "International phone number input with country code selector, flag icons, automatic formatting, and validation.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["input", "select", "popover"],
    peerDependencies: {
      react: ["@radix-ui/react-popover", "lucide-react"],
    },
    tags: ["phone", "telephone", "mobile", "international", "country-code", "dial", "number", "contact"],
    files: reactFile("forms", "phone-input"),
  },

  // ---------- pickers ------------------------------------------------------
  {
    name: "color-picker",
    displayName: "Color Picker",
    category: "forms",
    description:
      "Color selection control with a saturation/lightness area, hue slider, opacity slider, and hex/RGB/HSL input.",
    frameworks: ["react"],
    variants: ["default", "inline", "compact"],
    dependencies: ["popover", "input"],
    peerDependencies: {
      react: ["@radix-ui/react-popover"],
    },
    tags: ["color", "colour", "picker", "palette", "swatch", "hex", "rgb", "hsl", "hue", "saturation", "design"],
    files: reactFile("forms", "color-picker"),
  },
  {
    name: "date-picker",
    displayName: "Date Picker",
    category: "forms",
    description:
      "Calendar-based date selection with month/year navigation, disabled dates, locale support, and keyboard accessibility.",
    frameworks: ["react"],
    variants: ["default", "inline"],
    dependencies: ["popover", "button", "input"],
    peerDependencies: {
      react: ["@radix-ui/react-popover", "lucide-react"],
    },
    tags: ["date", "calendar", "picker", "day", "month", "year", "schedule", "booking", "time"],
    files: reactFile("forms", "date-picker"),
  },
  {
    name: "time-picker",
    displayName: "Time Picker",
    category: "forms",
    description:
      "Time selection input supporting 12- and 24-hour formats, minute intervals, and optional period (AM/PM) toggle.",
    frameworks: ["react"],
    variants: ["default", "inline"],
    dependencies: ["popover", "select", "input"],
    peerDependencies: {
      react: ["@radix-ui/react-popover", "@radix-ui/react-select"],
    },
    tags: ["time", "clock", "hour", "minute", "am", "pm", "picker", "schedule"],
    files: reactFile("forms", "time-picker"),
  },
  {
    name: "date-range-picker",
    displayName: "Date Range Picker",
    category: "forms",
    description:
      "Dual-calendar date range selector with preset ranges, comparison mode, and min/max span constraints.",
    frameworks: ["react"],
    variants: ["default", "with-presets"],
    dependencies: ["popover", "button", "date-picker"],
    peerDependencies: {
      react: ["@radix-ui/react-popover", "lucide-react"],
    },
    tags: ["date", "range", "calendar", "period", "span", "from", "to", "start", "end", "booking", "filter"],
    files: reactFile("forms", "date-range-picker"),
  },

  // ---------- toggles / checks ---------------------------------------------
  {
    name: "checkbox",
    displayName: "Checkbox",
    category: "forms",
    description:
      "Accessible checkbox with label, indeterminate state, and error messaging. Can be controlled or uncontrolled.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-checkbox", "@radix-ui/react-label"],
    },
    tags: ["checkbox", "check", "tick", "toggle", "boolean", "option", "form"],
    files: reactFile("forms", "checkbox"),
  },
  {
    name: "checkbox-group",
    displayName: "Checkbox Group",
    category: "forms",
    description:
      "Group of related checkboxes with select-all support, orientation options, and shared validation state.",
    frameworks: ["react"],
    variants: ["default", "card"],
    dependencies: ["checkbox"],
    peerDependencies: {
      react: ["@radix-ui/react-checkbox", "@radix-ui/react-label"],
    },
    tags: ["checkbox", "group", "multi-select", "options", "check-all", "form"],
    files: reactFile("forms", "checkbox-group"),
  },
  {
    name: "radio-group",
    displayName: "Radio Group",
    category: "forms",
    description:
      "Set of mutually-exclusive radio buttons with horizontal or vertical layout and rich card variant.",
    frameworks: ["react"],
    variants: ["default", "card"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-radio-group", "@radix-ui/react-label"],
    },
    tags: ["radio", "option", "select-one", "exclusive", "choice", "group", "form"],
    files: reactFile("forms", "radio-group"),
  },
  {
    name: "switch",
    displayName: "Switch",
    category: "forms",
    description:
      "Toggle switch for binary settings with smooth animation, optional label placement, and size variants.",
    frameworks: ["react"],
    variants: ["default", "small", "large"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-switch", "@radix-ui/react-label"],
    },
    tags: ["switch", "toggle", "on-off", "boolean", "settings", "preference", "form"],
    files: reactFile("forms", "switch"),
  },
  {
    name: "toggle",
    displayName: "Toggle",
    category: "forms",
    description:
      "Single pressable toggle button that can be on or off, often used for formatting controls (bold, italic).",
    frameworks: ["react"],
    variants: ["default", "outline"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-toggle"],
    },
    tags: ["toggle", "press", "active", "formatting", "toolbar", "on-off"],
    files: reactFile("forms", "toggle"),
  },
  {
    name: "toggle-group",
    displayName: "Toggle Group",
    category: "forms",
    description:
      "Group of toggle buttons where one or multiple can be active. Useful for view switchers and toolbars.",
    frameworks: ["react"],
    variants: ["default", "outline"],
    dependencies: ["toggle"],
    peerDependencies: {
      react: ["@radix-ui/react-toggle-group"],
    },
    tags: ["toggle", "group", "toolbar", "view", "switcher", "segment", "option"],
    files: reactFile("forms", "toggle-group"),
  },

  // ---------- selects / combos ---------------------------------------------
  {
    name: "select",
    displayName: "Select",
    category: "forms",
    description:
      "Dropdown select with search filtering, grouped options, custom option rendering, and keyboard navigation.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-select", "@radix-ui/react-label", "lucide-react"],
    },
    tags: ["select", "dropdown", "pick", "option", "choice", "form", "single-select", "menu"],
    files: reactFile("forms", "select"),
  },
  {
    name: "multi-select",
    displayName: "Multi Select",
    category: "forms",
    description:
      "Select control allowing multiple selections displayed as removable badges. Supports search, grouping, and max-selection limits.",
    frameworks: ["react"],
    variants: ["default", "creatable"],
    dependencies: ["badge", "popover"],
    peerDependencies: {
      react: ["@radix-ui/react-popover", "cmdk", "lucide-react"],
    },
    tags: ["multi-select", "multiple", "tags", "badge", "pills", "dropdown", "combo", "form"],
    files: reactFile("forms", "multi-select"),
  },
  {
    name: "combobox",
    displayName: "Combobox",
    category: "forms",
    description:
      "Autocomplete-enabled select that combines a text input with a filterable dropdown list. Supports async option loading.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["popover"],
    peerDependencies: {
      react: ["@radix-ui/react-popover", "cmdk", "lucide-react"],
    },
    tags: ["combobox", "autocomplete", "search", "select", "typeahead", "combo", "form"],
    files: reactFile("forms", "combobox"),
  },
  {
    name: "tag-input",
    displayName: "Tag Input",
    category: "forms",
    description:
      "Input for creating and managing a set of tags or tokens. Supports paste splitting, duplicate prevention, and validation.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["badge", "input"],
    peerDependencies: {
      react: ["@radix-ui/react-label", "lucide-react"],
    },
    tags: ["tag", "token", "chip", "pill", "input", "create", "list", "form"],
    files: reactFile("forms", "tag-input"),
  },
  {
    name: "autocomplete",
    displayName: "Autocomplete",
    category: "forms",
    description:
      "Text input with real-time suggestion dropdown powered by local filtering or async data sources.",
    frameworks: ["react"],
    variants: ["default", "inline"],
    dependencies: ["input", "popover"],
    peerDependencies: {
      react: ["@radix-ui/react-popover", "cmdk"],
    },
    tags: ["autocomplete", "suggest", "typeahead", "search", "complete", "prediction", "form"],
    files: reactFile("forms", "autocomplete"),
  },
  {
    name: "listbox",
    displayName: "Listbox",
    category: "forms",
    description:
      "Accessible, always-visible list of selectable options. Supports single and multi-selection with keyboard navigation.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["listbox", "list", "select", "option", "pick", "choice", "form"],
    files: reactFile("forms", "listbox"),
  },

  // ---------- file uploads -------------------------------------------------
  {
    name: "file-upload",
    displayName: "File Upload",
    category: "forms",
    description:
      "File input with click-to-browse, file type restrictions, size limits, and progress indication.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["button"],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["file", "upload", "browse", "attachment", "document", "media", "form"],
    files: reactFile("forms", "file-upload"),
  },
  {
    name: "file-upload-dropzone",
    displayName: "File Upload Dropzone",
    category: "forms",
    description:
      "Drag-and-drop zone for uploading files with visual feedback, multi-file support, and upload progress bars.",
    frameworks: ["react"],
    variants: ["default", "compact"],
    dependencies: ["button", "progress-bar"],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["dropzone", "drag", "drop", "file", "upload", "zone", "area", "batch", "form"],
    files: reactFile("forms", "file-upload-dropzone"),
  },
  {
    name: "image-upload-crop",
    displayName: "Image Upload & Crop",
    category: "forms",
    description:
      "Image upload with built-in cropping, zoom, rotation, and aspect-ratio enforcement. Outputs a cropped blob or data URL.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["button", "dialog", "slider"],
    peerDependencies: {
      react: ["@radix-ui/react-dialog", "@radix-ui/react-slider", "lucide-react"],
    },
    tags: ["image", "upload", "crop", "resize", "avatar", "photo", "picture", "zoom", "rotate", "form"],
    files: reactFile("forms", "image-upload-crop"),
  },
  {
    name: "avatar-upload",
    displayName: "Avatar Upload",
    category: "forms",
    description:
      "Specialised avatar upload that combines a circular preview, file picker, and optional crop dialog.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["avatar", "image-upload-crop", "button"],
    peerDependencies: {
      react: ["@radix-ui/react-avatar", "@radix-ui/react-dialog", "lucide-react"],
    },
    tags: ["avatar", "profile", "photo", "upload", "picture", "user", "form"],
    files: reactFile("forms", "avatar-upload"),
  },

  // ---------- sliders / ratings --------------------------------------------
  {
    name: "slider",
    displayName: "Slider",
    category: "forms",
    description:
      "Range slider with one thumb for selecting a single value within a min/max range. Supports steps, marks, and tooltips.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-slider"],
    },
    tags: ["slider", "range", "value", "scrub", "drag", "control", "volume", "brightness", "form"],
    files: reactFile("forms", "slider"),
  },
  {
    name: "range-slider",
    displayName: "Range Slider",
    category: "forms",
    description:
      "Dual-thumb slider for selecting a numeric range (e.g., price range). Includes min-distance and collision constraints.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["slider"],
    peerDependencies: {
      react: ["@radix-ui/react-slider"],
    },
    tags: ["range", "slider", "dual", "min-max", "between", "price", "filter", "form"],
    files: reactFile("forms", "range-slider"),
  },
  {
    name: "rating",
    displayName: "Rating",
    category: "forms",
    description:
      "Star-based (or custom icon) rating input/display supporting half-star precision and read-only mode.",
    frameworks: ["react"],
    variants: ["default", "hearts", "emoji"],
    dependencies: [],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["rating", "stars", "review", "score", "feedback", "rank", "vote", "form"],
    files: reactFile("forms", "rating"),
  },
  {
    name: "otp-input",
    displayName: "OTP Input",
    category: "forms",
    description:
      "One-time password input that auto-advances between digit cells, supports paste, and handles backspace navigation.",
    frameworks: ["react"],
    variants: ["default", "separated"],
    dependencies: ["input"],
    peerDependencies: {
      react: [],
    },
    tags: ["otp", "pin", "code", "verification", "2fa", "mfa", "one-time", "digit", "auth", "form"],
    files: reactFile("forms", "otp-input"),
  },
  {
    name: "signature-input",
    displayName: "Signature Input",
    category: "forms",
    description:
      "Canvas-based signature capture pad with undo, clear, and export to PNG/SVG. Works with mouse, touch, and stylus.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["button"],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["signature", "sign", "draw", "canvas", "handwriting", "pen", "autograph", "form"],
    files: reactFile("forms", "signature-input"),
  },

  // ---------- form / field -------------------------------------------------
  {
    name: "form",
    displayName: "Form",
    category: "forms",
    description:
      "Form wrapper that integrates with React Hook Form (or any form lib) for validation, error display, and submission handling.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["field"],
    peerDependencies: {
      react: ["@radix-ui/react-label"],
    },
    tags: ["form", "validation", "submit", "hook-form", "schema", "zod", "yup", "errors", "wrapper"],
    files: reactFile("forms", "form"),
  },
  {
    name: "field",
    displayName: "Field",
    category: "forms",
    description:
      "Form field wrapper that provides a label, description, error message, and required indicator to any child input.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-label"],
    },
    tags: ["field", "label", "error", "description", "helper", "required", "form-control", "form"],
    files: reactFile("forms", "field"),
  },
];

// =============================================================================
// DATA DISPLAY  (26 components)
// =============================================================================

const dataDisplayComponents: ComponentMeta[] = [
  // ---------- tables -------------------------------------------------------
  {
    name: "data-table",
    displayName: "Data Table",
    category: "data-display",
    description:
      "Feature-rich data table with sorting, filtering, pagination, row selection, column resizing, and pinned columns.",
    frameworks: ["react"],
    variants: ["default", "striped", "compact"],
    dependencies: ["button", "checkbox", "select", "input", "badge", "dropdown-menu"],
    peerDependencies: {
      react: ["@tanstack/react-table", "lucide-react"],
    },
    tags: ["table", "data", "grid", "sort", "filter", "paginate", "rows", "columns", "spreadsheet", "list"],
    files: reactFile("data-display", "data-table"),
  },
  {
    name: "virtualized-table",
    displayName: "Virtualized Table",
    category: "data-display",
    description:
      "High-performance table that virtualises rows and columns for rendering tens of thousands of records without lag.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["data-table"],
    peerDependencies: {
      react: ["@tanstack/react-table", "@tanstack/react-virtual", "lucide-react"],
    },
    tags: ["table", "virtual", "performance", "large-data", "scroll", "windowed", "grid", "big-data"],
    files: reactFile("data-display", "virtualized-table"),
  },

  // ---------- list / tree / timeline ---------------------------------------
  {
    name: "list",
    displayName: "List",
    category: "data-display",
    description:
      "Composable list component with dividers, icons, actions, and optional drag-to-reorder functionality.",
    frameworks: ["react"],
    variants: ["default", "bordered", "card"],
    dependencies: [],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["list", "items", "rows", "feed", "ordered", "unordered", "display"],
    files: reactFile("data-display", "list"),
  },
  {
    name: "tree-view",
    displayName: "Tree View",
    category: "data-display",
    description:
      "Hierarchical tree with expand/collapse, selection (single or multi), icons per node, drag-to-reorder, and lazy loading.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["tree", "hierarchy", "nested", "folder", "file", "explorer", "expand", "collapse", "nodes"],
    files: reactFile("data-display", "tree-view"),
  },
  {
    name: "timeline",
    displayName: "Timeline",
    category: "data-display",
    description:
      "Vertical or horizontal timeline for displaying chronological events with customisable markers, connectors, and content.",
    frameworks: ["react"],
    variants: ["default", "horizontal", "alternating"],
    dependencies: [],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["timeline", "history", "events", "chronological", "steps", "log", "activity", "feed"],
    files: reactFile("data-display", "timeline"),
  },

  // ---------- cards --------------------------------------------------------
  {
    name: "card",
    displayName: "Card",
    category: "data-display",
    description:
      "General-purpose card container with header, body, footer slots and optional hover/click interactions.",
    frameworks: ["react"],
    variants: ["default", "outline", "elevated", "interactive"],
    dependencies: [],
    peerDependencies: {
      react: [],
    },
    tags: ["card", "container", "box", "panel", "surface", "tile", "layout"],
    files: reactFile("data-display", "card"),
  },
  {
    name: "stat-card",
    displayName: "Stat Card",
    category: "data-display",
    description:
      "Dashboard stat card showing a key metric with label, value, change indicator, and optional sparkline.",
    frameworks: ["react"],
    variants: ["default", "with-icon", "with-chart"],
    dependencies: ["card"],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["stat", "metric", "kpi", "dashboard", "number", "analytics", "card", "statistic", "summary"],
    files: reactFile("data-display", "stat-card"),
  },
  {
    name: "metric-card",
    displayName: "Metric Card",
    category: "data-display",
    description:
      "Detailed metric display card with trend arrows, comparison values, progress ring, and tooltip explanations.",
    frameworks: ["react"],
    variants: ["default", "compact"],
    dependencies: ["card", "progress-circle"],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["metric", "kpi", "trend", "dashboard", "analytics", "card", "performance", "goal"],
    files: reactFile("data-display", "metric-card"),
  },
  {
    name: "profile-card",
    displayName: "Profile Card",
    category: "data-display",
    description:
      "User profile card with avatar, name, bio, social links, and action buttons. Great for team pages and directories.",
    frameworks: ["react"],
    variants: ["default", "horizontal", "compact"],
    dependencies: ["card", "avatar", "button"],
    peerDependencies: {
      react: ["@radix-ui/react-avatar", "lucide-react"],
    },
    tags: ["profile", "user", "person", "team", "member", "contact", "card", "bio", "social"],
    files: reactFile("data-display", "profile-card"),
  },
  {
    name: "pricing-card",
    displayName: "Pricing Card",
    category: "data-display",
    description:
      "Pricing tier card with plan name, price, feature list, highlight badge, and call-to-action button.",
    frameworks: ["react"],
    variants: ["default", "featured", "horizontal"],
    dependencies: ["card", "button", "badge"],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["pricing", "plan", "tier", "subscription", "billing", "saas", "card", "price", "cost"],
    files: reactFile("data-display", "pricing-card"),
  },
  {
    name: "testimonial-card",
    displayName: "Testimonial Card",
    category: "data-display",
    description:
      "Testimonial display card with quote, author avatar, name, title, and optional star rating.",
    frameworks: ["react"],
    variants: ["default", "minimal", "featured"],
    dependencies: ["card", "avatar", "rating"],
    peerDependencies: {
      react: ["@radix-ui/react-avatar", "lucide-react"],
    },
    tags: ["testimonial", "review", "quote", "feedback", "social-proof", "card", "customer"],
    files: reactFile("data-display", "testimonial-card"),
  },

  // ---------- avatar / badge / tag -----------------------------------------
  {
    name: "avatar",
    displayName: "Avatar",
    category: "data-display",
    description:
      "Circular user avatar with image, initials fallback, online/offline indicator, and configurable sizes.",
    frameworks: ["react"],
    variants: ["default", "square"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-avatar"],
    },
    tags: ["avatar", "user", "profile", "photo", "image", "initials", "icon", "picture"],
    files: reactFile("data-display", "avatar"),
  },
  {
    name: "avatar-group",
    displayName: "Avatar Group",
    category: "data-display",
    description:
      "Stacked group of avatars with overlap, overflow count badge, and tooltip listing additional users.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["avatar", "tooltip"],
    peerDependencies: {
      react: ["@radix-ui/react-avatar", "@radix-ui/react-tooltip"],
    },
    tags: ["avatar", "group", "stack", "team", "users", "people", "overlap", "faces"],
    files: reactFile("data-display", "avatar-group"),
  },
  {
    name: "badge",
    displayName: "Badge",
    category: "data-display",
    description:
      "Small status label for counts, categories, or states. Supports dot indicator and multiple colour schemes.",
    frameworks: ["react"],
    variants: ["default", "secondary", "destructive", "outline"],
    dependencies: [],
    peerDependencies: {
      react: ["class-variance-authority"],
    },
    tags: ["badge", "label", "status", "count", "notification", "pill", "indicator", "chip"],
    files: reactFile("data-display", "badge"),
  },
  {
    name: "tag",
    displayName: "Tag",
    category: "data-display",
    description:
      "Categorisation tag with optional remove button, colour variants, and click interaction for filtering.",
    frameworks: ["react"],
    variants: ["default", "outline", "solid"],
    dependencies: [],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["tag", "label", "category", "filter", "removable", "closable", "chip", "token"],
    files: reactFile("data-display", "tag"),
  },
  {
    name: "chip",
    displayName: "Chip",
    category: "data-display",
    description:
      "Interactive chip for selections, filters, or entity representation. Supports avatar, icon, and dismiss action.",
    frameworks: ["react"],
    variants: ["default", "outlined", "filled"],
    dependencies: [],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["chip", "pill", "filter", "selection", "entity", "removable", "tag", "token"],
    files: reactFile("data-display", "chip"),
  },

  // ---------- code / kbd ---------------------------------------------------
  {
    name: "code-block",
    displayName: "Code Block",
    category: "data-display",
    description:
      "Syntax-highlighted code display with line numbers, copy button, filename header, and language badge.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["button"],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["code", "syntax", "highlight", "snippet", "pre", "monospace", "programming", "copy", "source"],
    files: reactFile("data-display", "code-block"),
  },
  {
    name: "kbd",
    displayName: "Keyboard Shortcut",
    category: "data-display",
    description:
      "Inline keyboard shortcut display rendering key combinations like Ctrl+K in styled key caps.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: [],
    },
    tags: ["keyboard", "shortcut", "key", "hotkey", "keybinding", "combo", "modifier", "inline"],
    files: reactFile("data-display", "kbd"),
  },

  // ---------- media --------------------------------------------------------
  {
    name: "image",
    displayName: "Image",
    category: "data-display",
    description:
      "Enhanced image component with lazy loading, blur-up placeholder, fallback, aspect ratio, and zoom-on-click.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: [],
    },
    tags: ["image", "photo", "picture", "media", "lazy", "placeholder", "responsive", "img"],
    files: reactFile("data-display", "image"),
  },
  {
    name: "image-gallery",
    displayName: "Image Gallery",
    category: "data-display",
    description:
      "Responsive image gallery with grid/masonry layouts, lightbox preview, thumbnails, and keyboard navigation.",
    frameworks: ["react"],
    variants: ["default", "masonry", "carousel"],
    dependencies: ["image", "dialog"],
    peerDependencies: {
      react: ["@radix-ui/react-dialog", "lucide-react"],
    },
    tags: ["gallery", "images", "grid", "masonry", "lightbox", "photos", "carousel", "media", "portfolio"],
    files: reactFile("data-display", "image-gallery"),
  },

  // ---------- loading / progress -------------------------------------------
  {
    name: "skeleton",
    displayName: "Skeleton",
    category: "data-display",
    description:
      "Animated placeholder shimmer for content that is still loading. Comes in text, circle, and rectangle shapes.",
    frameworks: ["react"],
    variants: ["default", "circle", "text"],
    dependencies: [],
    peerDependencies: {
      react: [],
    },
    tags: ["skeleton", "loading", "placeholder", "shimmer", "pulse", "ghost", "loader"],
    files: reactFile("data-display", "skeleton"),
  },
  {
    name: "spinner",
    displayName: "Spinner",
    category: "data-display",
    description:
      "Animated loading spinner with configurable size, colour, speed, and optional status text.",
    frameworks: ["react"],
    variants: ["default", "dots", "bars"],
    dependencies: [],
    peerDependencies: {
      react: [],
    },
    tags: ["spinner", "loading", "progress", "wait", "busy", "indicator", "rotate", "animation"],
    files: reactFile("data-display", "spinner"),
  },
  {
    name: "progress-bar",
    displayName: "Progress Bar",
    category: "data-display",
    description:
      "Horizontal progress indicator with determinate, indeterminate, and multi-segment modes plus label and value display.",
    frameworks: ["react"],
    variants: ["default", "striped", "indeterminate"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-progress"],
    },
    tags: ["progress", "bar", "loading", "percentage", "completion", "status", "indicator", "meter"],
    files: reactFile("data-display", "progress-bar"),
  },
  {
    name: "progress-circle",
    displayName: "Progress Circle",
    category: "data-display",
    description:
      "Circular / ring progress indicator with percentage label, configurable thickness, and gradient colour support.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: [],
    },
    tags: ["progress", "circle", "ring", "donut", "radial", "percentage", "gauge", "indicator"],
    files: reactFile("data-display", "progress-circle"),
  },

  // ---------- empty / error states -----------------------------------------
  {
    name: "empty-state",
    displayName: "Empty State",
    category: "data-display",
    description:
      "Placeholder for empty views with illustration, title, description, and call-to-action button.",
    frameworks: ["react"],
    variants: ["default", "compact"],
    dependencies: ["button"],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["empty", "no-data", "placeholder", "zero", "blank", "illustration", "onboarding"],
    files: reactFile("data-display", "empty-state"),
  },
  {
    name: "error-state",
    displayName: "Error State",
    category: "data-display",
    description:
      "Error display with icon, message, optional details, and retry button. Useful for failed data fetches and 404 pages.",
    frameworks: ["react"],
    variants: ["default", "inline", "full-page"],
    dependencies: ["button"],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["error", "failure", "retry", "oops", "broken", "500", "404", "warning", "state"],
    files: reactFile("data-display", "error-state"),
  },
];

// =============================================================================
// NAVIGATION  (16 components)
// =============================================================================

const navigationComponents: ComponentMeta[] = [
  // ---------- menus --------------------------------------------------------
  {
    name: "dropdown-menu",
    displayName: "Dropdown Menu",
    category: "navigation",
    description:
      "Context-triggered dropdown menu with items, sub-menus, checkboxes, radio items, separators, and keyboard navigation.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-dropdown-menu", "lucide-react"],
    },
    tags: ["dropdown", "menu", "context", "actions", "options", "popup", "submenu", "navigation"],
    files: reactFile("navigation", "dropdown-menu"),
  },
  {
    name: "context-menu",
    displayName: "Context Menu",
    category: "navigation",
    description:
      "Right-click context menu with nested sub-menus, icons, shortcuts display, and check/radio items.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-context-menu", "lucide-react"],
    },
    tags: ["context", "right-click", "menu", "popup", "actions", "shortcut", "navigation"],
    files: reactFile("navigation", "context-menu"),
  },
  {
    name: "menubar",
    displayName: "Menubar",
    category: "navigation",
    description:
      "Horizontal menubar with dropdown menus, keyboard arrow-key navigation, and shortcut labels — like a desktop app menu.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-menubar", "lucide-react"],
    },
    tags: ["menubar", "menu", "horizontal", "app-menu", "toolbar", "desktop", "navigation"],
    files: reactFile("navigation", "menubar"),
  },
  {
    name: "command-palette",
    displayName: "Command Palette",
    category: "navigation",
    description:
      "Searchable command launcher (Cmd+K) with grouped actions, recent items, keyboard navigation, and fuzzy matching.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["dialog"],
    peerDependencies: {
      react: ["@radix-ui/react-dialog", "cmdk", "lucide-react"],
    },
    tags: ["command", "palette", "cmdk", "search", "launcher", "spotlight", "omnibar", "quick-action", "navigation"],
    files: reactFile("navigation", "command-palette"),
  },
  {
    name: "mega-menu",
    displayName: "Mega Menu",
    category: "navigation",
    description:
      "Wide dropdown menu with multi-column layout, category headers, icons, and featured content sections.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["popover"],
    peerDependencies: {
      react: ["@radix-ui/react-navigation-menu", "lucide-react"],
    },
    tags: ["mega-menu", "navigation", "dropdown", "multi-column", "header", "categories", "large-menu"],
    files: reactFile("navigation", "mega-menu"),
  },
  {
    name: "action-menu",
    displayName: "Action Menu",
    category: "navigation",
    description:
      "Lightweight actions dropdown for table rows and cards. Pre-composed with common patterns like edit, delete, and duplicate.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["dropdown-menu", "icon-button"],
    peerDependencies: {
      react: ["@radix-ui/react-dropdown-menu", "lucide-react"],
    },
    tags: ["action", "menu", "kebab", "dots", "more", "options", "row-action", "table-action", "navigation"],
    files: reactFile("navigation", "action-menu"),
  },

  // ---------- primary nav --------------------------------------------------
  {
    name: "navbar",
    displayName: "Navbar",
    category: "navigation",
    description:
      "Responsive top navigation bar with logo, links, mobile hamburger menu, and optional search and user menu.",
    frameworks: ["react"],
    variants: ["default", "transparent", "bordered"],
    dependencies: ["button"],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["navbar", "header", "top-bar", "navigation", "responsive", "mobile", "hamburger", "nav"],
    files: reactFile("navigation", "navbar"),
  },
  {
    name: "sidebar",
    displayName: "Sidebar",
    category: "navigation",
    description:
      "Collapsible side navigation with nested links, icons, badges, sections, and responsive drawer mode on mobile.",
    frameworks: ["react"],
    variants: ["default", "compact", "floating"],
    dependencies: ["button", "tooltip"],
    peerDependencies: {
      react: ["@radix-ui/react-tooltip", "@radix-ui/react-collapsible", "lucide-react"],
    },
    tags: ["sidebar", "side-nav", "navigation", "drawer", "menu", "panel", "collapse", "links", "dashboard"],
    files: reactFile("navigation", "sidebar"),
  },
  {
    name: "breadcrumb",
    displayName: "Breadcrumb",
    category: "navigation",
    description:
      "Breadcrumb trail showing the current page hierarchy with configurable separators, truncation, and dropdown for overflow.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["breadcrumb", "path", "trail", "hierarchy", "navigation", "crumb", "location"],
    files: reactFile("navigation", "breadcrumb"),
  },
  {
    name: "tabs",
    displayName: "Tabs",
    category: "navigation",
    description:
      "Tab set for switching between content panels with underline, pill, and card variants. Supports lazy rendering and overflow scrolling.",
    frameworks: ["react"],
    variants: ["default", "pills", "underline", "card"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-tabs"],
    },
    tags: ["tabs", "tab", "panel", "switch", "section", "navigation", "view"],
    files: reactFile("navigation", "tabs"),
  },
  {
    name: "segmented-control",
    displayName: "Segmented Control",
    category: "navigation",
    description:
      "iOS-style segmented control for toggling between a small set of views, with smooth sliding animation.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-toggle-group"],
    },
    tags: ["segmented", "control", "toggle", "view-switcher", "tabs", "ios", "switch", "navigation"],
    files: reactFile("navigation", "segmented-control"),
  },
  {
    name: "stepper",
    displayName: "Stepper",
    category: "navigation",
    description:
      "Multi-step progress indicator showing completed, current, and upcoming steps. Works with wizard/form flows.",
    frameworks: ["react"],
    variants: ["default", "vertical", "dots"],
    dependencies: [],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["stepper", "steps", "wizard", "progress", "multi-step", "flow", "sequence", "navigation"],
    files: reactFile("navigation", "stepper"),
  },
  {
    name: "bottom-navigation",
    displayName: "Bottom Navigation",
    category: "navigation",
    description:
      "Mobile-first bottom tab bar with icon + label items, active state indicator, and badge counts.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["badge"],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["bottom", "navigation", "mobile", "tab-bar", "footer", "app", "ios", "android", "nav"],
    files: reactFile("navigation", "bottom-navigation"),
  },
  {
    name: "pagination",
    displayName: "Pagination",
    category: "navigation",
    description:
      "Page navigation with page numbers, previous/next buttons, ellipsis truncation, and page-size selector.",
    frameworks: ["react"],
    variants: ["default", "simple", "compact"],
    dependencies: ["button", "select"],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["pagination", "pages", "paging", "next", "previous", "table", "list", "navigation"],
    files: reactFile("navigation", "pagination"),
  },
  {
    name: "infinite-scroll",
    displayName: "Infinite Scroll",
    category: "navigation",
    description:
      "Intersection-observer based infinite scroll trigger that loads more content as the user scrolls to the bottom.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["spinner"],
    peerDependencies: {
      react: [],
    },
    tags: ["infinite", "scroll", "load-more", "lazy", "feed", "stream", "endless", "pagination"],
    files: reactFile("navigation", "infinite-scroll"),
  },
  {
    name: "back-to-top",
    displayName: "Back to Top",
    category: "navigation",
    description:
      "Floating button that appears on scroll and smoothly scrolls the page back to the top when clicked.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["button"],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["back-to-top", "scroll", "up", "floating", "anchor", "jump", "navigation"],
    files: reactFile("navigation", "back-to-top"),
  },
];

// =============================================================================
// OVERLAYS  (17 components)
// =============================================================================

const overlaysComponents: ComponentMeta[] = [
  // ---------- modals / drawers ---------------------------------------------
  {
    name: "dialog",
    displayName: "Dialog",
    category: "overlays",
    description:
      "Modal dialog with accessible focus trapping, backdrop overlay, close button, and header/body/footer slots.",
    frameworks: ["react"],
    variants: ["default", "scrollable", "centered"],
    dependencies: ["portal"],
    peerDependencies: {
      react: ["@radix-ui/react-dialog", "lucide-react"],
    },
    tags: ["dialog", "modal", "popup", "window", "overlay", "focus-trap", "lightbox"],
    files: reactFile("overlays", "dialog"),
  },
  {
    name: "alert-dialog",
    displayName: "Alert Dialog",
    category: "overlays",
    description:
      "Confirmation dialog requiring an explicit user response. Prevents dismissal by clicking outside or pressing Escape.",
    frameworks: ["react"],
    variants: ["default", "destructive"],
    dependencies: ["button"],
    peerDependencies: {
      react: ["@radix-ui/react-alert-dialog"],
    },
    tags: ["alert", "dialog", "confirm", "warning", "prompt", "modal", "destructive", "acknowledge"],
    files: reactFile("overlays", "alert-dialog"),
  },
  {
    name: "drawer",
    displayName: "Drawer",
    category: "overlays",
    description:
      "Slide-in panel from any edge of the screen. Great for filters, settings, and mobile navigation.",
    frameworks: ["react"],
    variants: ["left", "right", "top", "bottom"],
    dependencies: ["portal"],
    peerDependencies: {
      react: ["@radix-ui/react-dialog", "lucide-react"],
    },
    tags: ["drawer", "slide", "panel", "side-panel", "off-canvas", "tray", "sheet", "overlay"],
    files: reactFile("overlays", "drawer"),
  },
  {
    name: "sheet",
    displayName: "Sheet",
    category: "overlays",
    description:
      "Bottom sheet overlay with drag-to-dismiss, snap points, and nested scrolling. Optimised for mobile interactions.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["portal"],
    peerDependencies: {
      react: ["@radix-ui/react-dialog"],
    },
    tags: ["sheet", "bottom-sheet", "drag", "snap", "mobile", "overlay", "panel", "tray"],
    files: reactFile("overlays", "sheet"),
  },
  {
    name: "fullscreen-modal",
    displayName: "Fullscreen Modal",
    category: "overlays",
    description:
      "Full-viewport modal with a top toolbar and scrollable content area, used for complex tasks like editors or previews.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["dialog", "button"],
    peerDependencies: {
      react: ["@radix-ui/react-dialog", "lucide-react"],
    },
    tags: ["fullscreen", "modal", "dialog", "immersive", "editor", "preview", "overlay", "viewport"],
    files: reactFile("overlays", "fullscreen-modal"),
  },
  {
    name: "multi-step-modal",
    displayName: "Multi-Step Modal",
    category: "overlays",
    description:
      "Wizard-style modal with step indicator, back/next navigation, form validation per step, and animated transitions.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["dialog", "button", "stepper"],
    peerDependencies: {
      react: ["@radix-ui/react-dialog", "lucide-react"],
    },
    tags: ["multi-step", "wizard", "modal", "flow", "steps", "form", "onboarding", "overlay"],
    files: reactFile("overlays", "multi-step-modal"),
  },

  // ---------- popovers / tooltips ------------------------------------------
  {
    name: "popover",
    displayName: "Popover",
    category: "overlays",
    description:
      "Floating content panel anchored to a trigger element with configurable placement, arrow, and dismiss behaviour.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-popover"],
    },
    tags: ["popover", "popup", "float", "anchor", "content", "overlay", "dropdown"],
    files: reactFile("overlays", "popover"),
  },
  {
    name: "tooltip",
    displayName: "Tooltip",
    category: "overlays",
    description:
      "Small informational popup shown on hover or focus with configurable delay, placement, and arrow.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-tooltip"],
    },
    tags: ["tooltip", "hint", "info", "hover", "help", "label", "description", "popup"],
    files: reactFile("overlays", "tooltip"),
  },
  {
    name: "hover-card",
    displayName: "Hover Card",
    category: "overlays",
    description:
      "Rich preview card appearing on hover, typically used for user profiles, link previews, or entity summaries.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-hover-card"],
    },
    tags: ["hover", "card", "preview", "popup", "profile", "link-preview", "summary", "peek"],
    files: reactFile("overlays", "hover-card"),
  },

  // ---------- notifications / alerts ---------------------------------------
  {
    name: "toast",
    displayName: "Toast",
    category: "overlays",
    description:
      "Lightweight, auto-dismissing notification that appears at a screen edge. Supports actions, progress bar, and stacking.",
    frameworks: ["react"],
    variants: ["default", "success", "error", "warning", "info"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-toast", "lucide-react"],
    },
    tags: ["toast", "notification", "snackbar", "alert", "message", "popup", "auto-dismiss", "feedback"],
    files: reactFile("overlays", "toast"),
  },
  {
    name: "notification-center",
    displayName: "Notification Center",
    category: "overlays",
    description:
      "Notification inbox dropdown with read/unread states, grouping by date, mark-all-as-read, and empty state.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["popover", "badge", "button", "avatar"],
    peerDependencies: {
      react: ["@radix-ui/react-popover", "@radix-ui/react-avatar", "lucide-react"],
    },
    tags: ["notification", "inbox", "bell", "alerts", "messages", "center", "unread", "updates", "feed"],
    files: reactFile("overlays", "notification-center"),
  },
  {
    name: "banner",
    displayName: "Banner",
    category: "overlays",
    description:
      "Full-width banner for announcements, promotions, or system alerts. Supports dismiss, action link, and icon.",
    frameworks: ["react"],
    variants: ["default", "info", "warning", "error", "success"],
    dependencies: [],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["banner", "announcement", "notice", "promotion", "system", "info-bar", "top-bar", "strip"],
    files: reactFile("overlays", "banner"),
  },
  {
    name: "alert",
    displayName: "Alert",
    category: "overlays",
    description:
      "Prominent alert box with icon, title, description, optional actions, and dismiss button. For important page-level messages.",
    frameworks: ["react"],
    variants: ["default", "info", "warning", "error", "success"],
    dependencies: [],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["alert", "message", "warning", "error", "info", "success", "callout", "notice"],
    files: reactFile("overlays", "alert"),
  },
  {
    name: "inline-alert",
    displayName: "Inline Alert",
    category: "overlays",
    description:
      "Compact inline alert for contextual messages near form fields or within cards. Less prominent than a full alert.",
    frameworks: ["react"],
    variants: ["default", "info", "warning", "error", "success"],
    dependencies: [],
    peerDependencies: {
      react: ["lucide-react"],
    },
    tags: ["inline", "alert", "message", "hint", "contextual", "form", "field", "helper"],
    files: reactFile("overlays", "inline-alert"),
  },
  {
    name: "tour-spotlight",
    displayName: "Tour Spotlight",
    category: "overlays",
    description:
      "Product tour overlay that highlights UI elements one by one with explanatory popovers, step counter, and navigation.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["popover", "button"],
    peerDependencies: {
      react: ["@radix-ui/react-popover", "lucide-react"],
    },
    tags: ["tour", "spotlight", "onboarding", "walkthrough", "guide", "highlight", "steps", "tutorial", "overlay"],
    files: reactFile("overlays", "tour-spotlight"),
  },
  {
    name: "confirmation-dialog",
    displayName: "Confirmation Dialog",
    category: "overlays",
    description:
      "Pre-configured confirmation dialog for destructive actions with customisable title, message, and confirm/cancel buttons.",
    frameworks: ["react"],
    variants: ["default", "destructive"],
    dependencies: ["alert-dialog", "button"],
    peerDependencies: {
      react: ["@radix-ui/react-alert-dialog"],
    },
    tags: ["confirmation", "dialog", "confirm", "delete", "remove", "destructive", "prompt", "modal", "are-you-sure"],
    files: reactFile("overlays", "confirmation-dialog"),
  },
  {
    name: "cookie-consent",
    displayName: "Cookie Consent",
    category: "overlays",
    description:
      "GDPR / cookie consent banner with accept, reject, and customise preferences options. Persists choice to storage.",
    frameworks: ["react"],
    variants: ["default", "compact", "modal"],
    dependencies: ["button", "dialog"],
    peerDependencies: {
      react: ["@radix-ui/react-dialog"],
    },
    tags: ["cookie", "consent", "gdpr", "privacy", "banner", "compliance", "legal", "preferences", "opt-in"],
    files: reactFile("overlays", "cookie-consent"),
  },
  {
    name: "command-k-overlay",
    displayName: "Command K Overlay",
    category: "overlays",
    description:
      "Full-featured Cmd+K overlay combining search, recent items, suggested actions, and contextual commands in one place.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: ["dialog"],
    peerDependencies: {
      react: ["@radix-ui/react-dialog", "cmdk", "lucide-react"],
    },
    tags: ["command-k", "cmdk", "search", "overlay", "spotlight", "launcher", "quick-actions", "keyboard", "shortcut"],
    files: reactFile("overlays", "command-k-overlay"),
  },
];

// =============================================================================
// UTILITY  (10 components)
// =============================================================================

const utilityComponents: ComponentMeta[] = [
  {
    name: "accordion",
    displayName: "Accordion",
    category: "utility",
    description:
      "Vertically stacking set of collapsible sections. Supports single or multiple open panels and animated transitions.",
    frameworks: ["react"],
    variants: ["default", "bordered", "separated"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-accordion", "lucide-react"],
    },
    tags: ["accordion", "collapse", "expand", "faq", "sections", "panels", "disclosure"],
    files: reactFile("utility", "accordion"),
  },
  {
    name: "collapsible",
    displayName: "Collapsible",
    category: "utility",
    description:
      "Single collapsible section with animated expand/collapse. Building block for accordions and show-more patterns.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-collapsible"],
    },
    tags: ["collapsible", "collapse", "expand", "toggle", "show-more", "disclosure", "fold"],
    files: reactFile("utility", "collapsible"),
  },
  {
    name: "separator",
    displayName: "Separator",
    category: "utility",
    description:
      "Visual divider between content sections. Renders as horizontal or vertical line with optional label.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-separator"],
    },
    tags: ["separator", "divider", "line", "hr", "rule", "border", "split"],
    files: reactFile("utility", "separator"),
  },
  {
    name: "resizable-panels",
    displayName: "Resizable Panels",
    category: "utility",
    description:
      "Split view with draggable resize handle between two or more panels. Supports min/max sizes, persistence, and nested layouts.",
    frameworks: ["react"],
    variants: ["default", "vertical"],
    dependencies: [],
    peerDependencies: {
      react: ["react-resizable-panels"],
    },
    tags: ["resizable", "panels", "split", "drag", "resize", "layout", "pane", "editor", "ide"],
    files: reactFile("utility", "resizable-panels"),
  },
  {
    name: "scroll-area",
    displayName: "Scroll Area",
    category: "utility",
    description:
      "Custom-styled scrollable container with thin overlay scrollbars that match your design system.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-scroll-area"],
    },
    tags: ["scroll", "scrollbar", "overflow", "container", "area", "custom-scroll"],
    files: reactFile("utility", "scroll-area"),
  },
  {
    name: "aspect-ratio",
    displayName: "Aspect Ratio",
    category: "utility",
    description:
      "Wrapper that enforces a fixed aspect ratio on its child content (e.g., 16:9, 4:3, 1:1).",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-aspect-ratio"],
    },
    tags: ["aspect-ratio", "ratio", "responsive", "video", "embed", "16:9", "4:3", "square", "proportion"],
    files: reactFile("utility", "aspect-ratio"),
  },
  {
    name: "virtualized-list",
    displayName: "Virtualized List",
    category: "utility",
    description:
      "High-performance list renderer that only mounts visible items. Handles variable-height rows and smooth scrolling.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@tanstack/react-virtual"],
    },
    tags: ["virtual", "list", "performance", "windowed", "large-data", "scroll", "lazy-render", "infinite"],
    files: reactFile("utility", "virtualized-list"),
  },
  {
    name: "lazy-image",
    displayName: "Lazy Image",
    category: "utility",
    description:
      "Image component that defers loading until the element enters the viewport using IntersectionObserver, with blur-up placeholder.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: [],
    },
    tags: ["lazy", "image", "deferred", "intersection-observer", "placeholder", "blur", "performance", "loading"],
    files: reactFile("utility", "lazy-image"),
  },
  {
    name: "portal",
    displayName: "Portal",
    category: "utility",
    description:
      "Renders children into a DOM node outside the parent component tree. Used internally by modals, popovers, and tooltips.",
    frameworks: ["react"],
    variants: ["default"],
    dependencies: [],
    peerDependencies: {
      react: ["@radix-ui/react-portal"],
    },
    tags: ["portal", "teleport", "mount", "dom", "outside", "root", "layer", "z-index"],
    files: reactFile("utility", "portal"),
  },
  {
    name: "typography",
    displayName: "Typography",
    category: "utility",
    description:
      "Semantic text components (heading, paragraph, lead, muted, code, blockquote) with consistent typographic styles.",
    frameworks: ["react"],
    variants: ["h1", "h2", "h3", "h4", "p", "lead", "large", "small", "muted", "code", "blockquote"],
    dependencies: [],
    peerDependencies: {
      react: [],
    },
    tags: ["typography", "text", "heading", "paragraph", "font", "prose", "title", "body", "copy"],
    files: reactFile("utility", "typography"),
  },
];

// =============================================================================
// Combined registry
// =============================================================================

export const registry: ComponentMeta[] = [
  ...formsComponents,
  ...dataDisplayComponents,
  ...navigationComponents,
  ...overlaysComponents,
  ...utilityComponents,
];

// ---------------------------------------------------------------------------
// Fast lookup maps (built once, used by query functions)
// ---------------------------------------------------------------------------

const byName = new Map<string, ComponentMeta>();
for (const c of registry) {
  byName.set(c.name, c);
}

// =============================================================================
// Query functions
// =============================================================================

/**
 * Get a single component by its kebab-case name.
 * Returns `undefined` if no component with that name exists.
 */
export function getComponent(name: string): ComponentMeta | undefined {
  return byName.get(name);
}

/**
 * Return every component in a given category, optionally filtered to a
 * specific framework.
 */
export function getComponentsByCategory(
  category: ComponentCategory,
  framework?: string,
): ComponentMeta[] {
  return registry.filter(
    (c) =>
      c.category === category &&
      (framework == null || c.frameworks.includes(framework)),
  );
}

// ---------------------------------------------------------------------------
// Fuzzy search helpers
// ---------------------------------------------------------------------------

/**
 * Compute a relevance score for `component` given a free-text `query`.
 *
 * Scoring heuristics (higher = more relevant):
 *   - Exact name match           -> +100
 *   - Name starts-with           -> +60
 *   - Name contains              -> +40
 *   - DisplayName contains       -> +35
 *   - Description contains       -> +20
 *   - Tag exact match            -> +30 per tag
 *   - Tag starts-with            -> +15 per tag
 *   - Tag contains               -> +8 per tag
 *   - Category match             -> +10
 *   - Multi-word: all terms match-> +25 bonus
 */
function scoreComponent(component: ComponentMeta, query: string): number {
  const q = query.toLowerCase().trim();
  if (q.length === 0) return 0;

  const terms = q.split(/\s+/);
  let score = 0;

  const name = component.name.toLowerCase();
  const displayName = component.displayName.toLowerCase();
  const description = component.description.toLowerCase();
  const category = component.category.toLowerCase();

  // --- name matching ---
  if (name === q) {
    score += 100;
  } else if (name.startsWith(q)) {
    score += 60;
  } else if (name.includes(q)) {
    score += 40;
  }

  // --- displayName matching ---
  if (displayName === q) {
    score += 80;
  } else if (displayName.includes(q)) {
    score += 35;
  }

  // --- description matching ---
  if (description.includes(q)) {
    score += 20;
  }

  // --- category matching ---
  if (category === q || category.includes(q)) {
    score += 10;
  }

  // --- tag matching ---
  for (const tag of component.tags) {
    const t = tag.toLowerCase();
    if (t === q) {
      score += 30;
    } else if (t.startsWith(q)) {
      score += 15;
    } else if (t.includes(q)) {
      score += 8;
    }
  }

  // --- multi-word matching ---
  if (terms.length > 1) {
    const blob = [name, displayName, description, category, ...component.tags]
      .join(" ")
      .toLowerCase();

    const matchedTerms = terms.filter((term) => blob.includes(term));
    if (matchedTerms.length === terms.length) {
      score += 25;
    } else {
      // Partial multi-word: add a fraction
      score += Math.floor((matchedTerms.length / terms.length) * 15);
    }

    // Per-term scoring (additive)
    for (const term of terms) {
      if (name.includes(term)) score += 10;
      if (displayName.includes(term)) score += 8;
      if (description.includes(term)) score += 4;
      for (const tag of component.tags) {
        if (tag.toLowerCase() === term) score += 10;
        else if (tag.toLowerCase().includes(term)) score += 3;
      }
    }
  }

  return score;
}

/**
 * Search components with fuzzy matching and optional category/framework filters.
 *
 * @param query     - Free-text search string (matched against name, displayName,
 *                    description, tags, and category).
 * @param category  - Optional category to restrict results to.
 * @param framework - Optional framework filter (e.g. "react").
 * @returns Array of `SearchResult` sorted by descending relevance score.
 *          Only components with a score > 0 are returned.
 */
export function searchComponents(
  query: string,
  category?: ComponentCategory,
  framework?: string,
): SearchResult[] {
  let pool = registry as ComponentMeta[];

  if (category != null) {
    pool = pool.filter((c) => c.category === category);
  }
  if (framework != null) {
    pool = pool.filter((c) => c.frameworks.includes(framework));
  }

  const results: SearchResult[] = [];

  for (const component of pool) {
    const score = scoreComponent(component, query);
    if (score > 0) {
      results.push({ component, score });
    }
  }

  // Sort by score descending, then alphabetically by name for ties
  results.sort(
    (a, b) => b.score - a.score || a.component.name.localeCompare(b.component.name),
  );

  return results;
}

// ---------------------------------------------------------------------------
// Dependency resolution
// ---------------------------------------------------------------------------

/**
 * Recursively resolve all transitive MyUI component dependencies for a given
 * component `name`.
 *
 * Returns a flat, de-duplicated array of `ComponentMeta` objects in
 * topological order (dependencies before dependents).  The requested
 * component itself is included as the last element.
 *
 * Throws if a component name is not found in the registry.
 */
export function resolveDependencies(name: string): ComponentMeta[] {
  const resolved: ComponentMeta[] = [];
  const visited = new Set<string>();

  function walk(current: string): void {
    if (visited.has(current)) return;
    visited.add(current);

    const meta = byName.get(current);
    if (!meta) {
      throw new Error(
        `resolveDependencies: component "${current}" not found in the registry.`,
      );
    }

    for (const dep of meta.dependencies) {
      walk(dep);
    }

    resolved.push(meta);
  }

  walk(name);
  return resolved;
}

/**
 * Convenience: return just the dependency *names* (excluding the component itself).
 */
export function resolveDependencyNames(name: string): string[] {
  return resolveDependencies(name)
    .map((c) => c.name)
    .filter((n) => n !== name);
}

// ---------------------------------------------------------------------------
// Aggregate helpers (useful for CLI & docs)
// ---------------------------------------------------------------------------

/** All distinct categories present in the registry. */
export function getCategories(): ComponentCategory[] {
  return [...new Set(registry.map((c) => c.category))];
}

/** Total number of components registered. */
export function getComponentCount(): number {
  return registry.length;
}

/** Get all component names as a sorted array. */
export function getAllComponentNames(): string[] {
  return registry.map((c) => c.name).sort();
}

/**
 * Collect every npm peer dependency across all components for a given
 * framework.  Useful for generating an install command.
 */
export function collectPeerDependencies(
  componentNames: string[],
  framework: string = "react",
): string[] {
  const deps = new Set<string>();

  for (const name of componentNames) {
    const meta = byName.get(name);
    if (!meta) continue;
    const frameworkDeps = meta.peerDependencies[framework];
    if (frameworkDeps) {
      for (const d of frameworkDeps) {
        deps.add(d);
      }
    }
  }

  return [...deps].sort();
}
