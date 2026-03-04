"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  FormInput,
  BarChart3,
  Navigation,
  PanelTop,
  Wrench,
  ArrowLeft,
  Box,
} from "lucide-react";

/* ──── Component Registry (inline for the docs page) ──── */
type Category = "forms" | "data-display" | "navigation" | "overlays" | "utility";

interface ComponentEntry {
  name: string;
  displayName: string;
  category: Category;
  description: string;
  tags: string[];
}

const categoryMeta: Record<
  Category,
  { icon: typeof FormInput; label: string; color: string }
> = {
  forms: { icon: FormInput, label: "Forms", color: "text-blue-500 bg-blue-500/10" },
  "data-display": { icon: BarChart3, label: "Data Display", color: "text-emerald-500 bg-emerald-500/10" },
  navigation: { icon: Navigation, label: "Navigation", color: "text-amber-500 bg-amber-500/10" },
  overlays: { icon: PanelTop, label: "Overlays", color: "text-purple-500 bg-purple-500/10" },
  utility: { icon: Wrench, label: "Utility", color: "text-rose-500 bg-rose-500/10" },
};

const components: ComponentEntry[] = [
  // Forms (36)
  { name: "button", displayName: "Button", category: "forms", description: "Primary action trigger with multiple variants and sizes", tags: ["action", "click", "submit"] },
  { name: "icon-button", displayName: "Icon Button", category: "forms", description: "Compact button with icon-only display", tags: ["action", "icon"] },
  { name: "split-button", displayName: "Split Button", category: "forms", description: "Button with a dropdown for secondary actions", tags: ["action", "dropdown"] },
  { name: "input", displayName: "Input", category: "forms", description: "Text input field with label and validation support", tags: ["text", "field"] },
  { name: "textarea", displayName: "Textarea", category: "forms", description: "Multi-line text input with auto-resize", tags: ["text", "multiline"] },
  { name: "number-input", displayName: "Number Input", category: "forms", description: "Numeric input with increment/decrement controls", tags: ["number", "stepper"] },
  { name: "password-input", displayName: "Password Input", category: "forms", description: "Secure text input with visibility toggle", tags: ["password", "security"] },
  { name: "search-input", displayName: "Search Input", category: "forms", description: "Input optimized for search with icon and clear button", tags: ["search", "filter"] },
  { name: "phone-input", displayName: "Phone Input", category: "forms", description: "International phone number input with country selector", tags: ["phone", "international"] },
  { name: "color-picker", displayName: "Color Picker", category: "forms", description: "Visual color selection with hex/rgb support", tags: ["color", "picker"] },
  { name: "date-picker", displayName: "Date Picker", category: "forms", description: "Calendar-based date selection", tags: ["date", "calendar"] },
  { name: "time-picker", displayName: "Time Picker", category: "forms", description: "Time selection with hour and minute controls", tags: ["time", "clock"] },
  { name: "date-range-picker", displayName: "Date Range Picker", category: "forms", description: "Select a date range with start and end dates", tags: ["date", "range"] },
  { name: "checkbox", displayName: "Checkbox", category: "forms", description: "Binary toggle with indeterminate state", tags: ["toggle", "boolean"] },
  { name: "checkbox-group", displayName: "Checkbox Group", category: "forms", description: "Group of checkboxes for multi-select", tags: ["group", "multi-select"] },
  { name: "radio-group", displayName: "Radio Group", category: "forms", description: "Single selection from a set of options", tags: ["radio", "selection"] },
  { name: "switch", displayName: "Switch", category: "forms", description: "Toggle switch for on/off states", tags: ["toggle", "boolean"] },
  { name: "toggle", displayName: "Toggle", category: "forms", description: "Pressable button for toggling states", tags: ["toggle", "pressed"] },
  { name: "toggle-group", displayName: "Toggle Group", category: "forms", description: "Group of toggles for option selection", tags: ["toggle", "group"] },
  { name: "select", displayName: "Select", category: "forms", description: "Dropdown select with search and custom rendering", tags: ["dropdown", "selection"] },
  { name: "multi-select", displayName: "Multi Select", category: "forms", description: "Select multiple values with tags display", tags: ["dropdown", "multi-select"] },
  { name: "combobox", displayName: "Combobox", category: "forms", description: "Searchable dropdown with autocomplete", tags: ["search", "dropdown"] },
  { name: "tag-input", displayName: "Tag Input", category: "forms", description: "Input for creating and managing tags", tags: ["tags", "chips"] },
  { name: "autocomplete", displayName: "Autocomplete", category: "forms", description: "Text input with suggestion dropdown", tags: ["search", "suggestions"] },
  { name: "listbox", displayName: "Listbox", category: "forms", description: "Scrollable list for option selection", tags: ["list", "selection"] },
  { name: "file-upload", displayName: "File Upload", category: "forms", description: "File selection with progress and preview", tags: ["file", "upload"] },
  { name: "file-upload-dropzone", displayName: "File Upload Dropzone", category: "forms", description: "Drag-and-drop file upload area", tags: ["file", "drag-drop"] },
  { name: "image-upload-crop", displayName: "Image Upload Crop", category: "forms", description: "Image upload with built-in cropping", tags: ["image", "crop"] },
  { name: "avatar-upload", displayName: "Avatar Upload", category: "forms", description: "Circular image upload for profile photos", tags: ["avatar", "profile"] },
  { name: "slider", displayName: "Slider", category: "forms", description: "Range input with single thumb", tags: ["range", "value"] },
  { name: "range-slider", displayName: "Range Slider", category: "forms", description: "Dual-thumb slider for range selection", tags: ["range", "min-max"] },
  { name: "rating", displayName: "Rating", category: "forms", description: "Star-based rating input", tags: ["stars", "feedback"] },
  { name: "otp-input", displayName: "OTP Input", category: "forms", description: "One-time password input with individual digit fields", tags: ["otp", "verification"] },
  { name: "signature-input", displayName: "Signature Input", category: "forms", description: "Canvas-based signature capture", tags: ["signature", "drawing"] },
  { name: "form", displayName: "Form", category: "forms", description: "Form container with validation and submission handling", tags: ["form", "validation"] },
  { name: "field", displayName: "Field", category: "forms", description: "Form field wrapper with label, error, and description", tags: ["field", "label"] },

  // Data Display (26)
  { name: "data-table", displayName: "Data Table", category: "data-display", description: "Full-featured table with sorting, filtering, and pagination", tags: ["table", "data", "grid"] },
  { name: "virtualized-table", displayName: "Virtualized Table", category: "data-display", description: "High-performance table for large datasets", tags: ["table", "virtual", "performance"] },
  { name: "list", displayName: "List", category: "data-display", description: "Structured list with customizable items", tags: ["list", "items"] },
  { name: "tree-view", displayName: "Tree View", category: "data-display", description: "Hierarchical data display with expand/collapse", tags: ["tree", "hierarchy"] },
  { name: "timeline", displayName: "Timeline", category: "data-display", description: "Chronological event display", tags: ["timeline", "events", "history"] },
  { name: "card", displayName: "Card", category: "data-display", description: "Flexible content container", tags: ["card", "container"] },
  { name: "stat-card", displayName: "Stat Card", category: "data-display", description: "Card for displaying key metrics", tags: ["stats", "metrics", "kpi"] },
  { name: "metric-card", displayName: "Metric Card", category: "data-display", description: "Detailed metric display with trends", tags: ["metric", "trend"] },
  { name: "profile-card", displayName: "Profile Card", category: "data-display", description: "User profile information card", tags: ["profile", "user"] },
  { name: "pricing-card", displayName: "Pricing Card", category: "data-display", description: "Pricing tier display with features list", tags: ["pricing", "plan"] },
  { name: "testimonial-card", displayName: "Testimonial Card", category: "data-display", description: "Customer testimonial display", tags: ["testimonial", "review"] },
  { name: "avatar", displayName: "Avatar", category: "data-display", description: "User avatar with image, initials, and fallback", tags: ["avatar", "user", "image"] },
  { name: "avatar-group", displayName: "Avatar Group", category: "data-display", description: "Stacked avatar group with overflow", tags: ["avatar", "group"] },
  { name: "badge", displayName: "Badge", category: "data-display", description: "Small label for status or count", tags: ["badge", "status", "label"] },
  { name: "tag", displayName: "Tag", category: "data-display", description: "Categorization label with optional remove", tags: ["tag", "label", "category"] },
  { name: "chip", displayName: "Chip", category: "data-display", description: "Interactive compact element for filters or inputs", tags: ["chip", "filter"] },
  { name: "code-block", displayName: "Code Block", category: "data-display", description: "Syntax-highlighted code display with copy", tags: ["code", "syntax", "highlight"] },
  { name: "kbd", displayName: "Kbd", category: "data-display", description: "Keyboard shortcut display", tags: ["keyboard", "shortcut"] },
  { name: "image", displayName: "Image", category: "data-display", description: "Optimized image with loading states", tags: ["image", "media"] },
  { name: "image-gallery", displayName: "Image Gallery", category: "data-display", description: "Grid gallery with lightbox viewing", tags: ["gallery", "images", "lightbox"] },
  { name: "skeleton", displayName: "Skeleton", category: "data-display", description: "Loading placeholder with shimmer effect", tags: ["loading", "placeholder"] },
  { name: "spinner", displayName: "Spinner", category: "data-display", description: "Animated loading indicator", tags: ["loading", "spinner"] },
  { name: "progress-bar", displayName: "Progress Bar", category: "data-display", description: "Linear progress indicator", tags: ["progress", "loading"] },
  { name: "progress-circle", displayName: "Progress Circle", category: "data-display", description: "Circular progress indicator", tags: ["progress", "circular"] },
  { name: "empty-state", displayName: "Empty State", category: "data-display", description: "Placeholder for empty data views", tags: ["empty", "placeholder"] },
  { name: "error-state", displayName: "Error State", category: "data-display", description: "Error display with retry action", tags: ["error", "retry"] },

  // Navigation (16)
  { name: "dropdown-menu", displayName: "Dropdown Menu", category: "navigation", description: "Context-aware dropdown with submenus", tags: ["menu", "dropdown"] },
  { name: "context-menu", displayName: "Context Menu", category: "navigation", description: "Right-click context menu", tags: ["menu", "right-click"] },
  { name: "menubar", displayName: "Menubar", category: "navigation", description: "Horizontal menu bar with dropdowns", tags: ["menu", "bar"] },
  { name: "command-palette", displayName: "Command Palette", category: "navigation", description: "Searchable command launcher (Cmd+K)", tags: ["command", "search", "keyboard"] },
  { name: "mega-menu", displayName: "Mega Menu", category: "navigation", description: "Large dropdown with categories and icons", tags: ["menu", "mega", "navigation"] },
  { name: "action-menu", displayName: "Action Menu", category: "navigation", description: "Compact action list triggered by button", tags: ["menu", "actions"] },
  { name: "navbar", displayName: "Navbar", category: "navigation", description: "Top navigation bar with responsive mobile menu", tags: ["navigation", "header"] },
  { name: "sidebar", displayName: "Sidebar", category: "navigation", description: "Collapsible side navigation", tags: ["navigation", "sidebar"] },
  { name: "breadcrumb", displayName: "Breadcrumb", category: "navigation", description: "Hierarchical page path navigation", tags: ["navigation", "path"] },
  { name: "tabs", displayName: "Tabs", category: "navigation", description: "Tabbed content navigation", tags: ["tabs", "panels"] },
  { name: "segmented-control", displayName: "Segmented Control", category: "navigation", description: "Inline option group selector", tags: ["segment", "toggle"] },
  { name: "stepper", displayName: "Stepper", category: "navigation", description: "Multi-step progress indicator", tags: ["steps", "wizard"] },
  { name: "bottom-navigation", displayName: "Bottom Navigation", category: "navigation", description: "Mobile bottom navigation bar", tags: ["mobile", "bottom"] },
  { name: "pagination", displayName: "Pagination", category: "navigation", description: "Page navigation controls", tags: ["pagination", "pages"] },
  { name: "infinite-scroll", displayName: "Infinite Scroll", category: "navigation", description: "Automatic content loading on scroll", tags: ["scroll", "lazy-load"] },
  { name: "back-to-top", displayName: "Back to Top", category: "navigation", description: "Scroll-to-top floating button", tags: ["scroll", "top"] },

  // Overlays (18)
  { name: "dialog", displayName: "Dialog", category: "overlays", description: "Modal dialog with focus trapping", tags: ["modal", "dialog"] },
  { name: "alert-dialog", displayName: "Alert Dialog", category: "overlays", description: "Confirmation dialog for destructive actions", tags: ["alert", "confirm"] },
  { name: "drawer", displayName: "Drawer", category: "overlays", description: "Slide-in panel from screen edge", tags: ["drawer", "panel"] },
  { name: "sheet", displayName: "Sheet", category: "overlays", description: "Bottom sheet overlay for mobile", tags: ["sheet", "bottom"] },
  { name: "fullscreen-modal", displayName: "Fullscreen Modal", category: "overlays", description: "Full-screen takeover modal", tags: ["modal", "fullscreen"] },
  { name: "multi-step-modal", displayName: "Multi-Step Modal", category: "overlays", description: "Modal with step-by-step wizard flow", tags: ["modal", "wizard", "steps"] },
  { name: "popover", displayName: "Popover", category: "overlays", description: "Floating content anchored to a trigger", tags: ["popover", "floating"] },
  { name: "tooltip", displayName: "Tooltip", category: "overlays", description: "Informational text on hover", tags: ["tooltip", "hover"] },
  { name: "hover-card", displayName: "Hover Card", category: "overlays", description: "Rich content preview on hover", tags: ["hover", "preview"] },
  { name: "toast", displayName: "Toast", category: "overlays", description: "Non-intrusive notification messages", tags: ["toast", "notification"] },
  { name: "notification-center", displayName: "Notification Center", category: "overlays", description: "Centralized notification panel", tags: ["notification", "inbox"] },
  { name: "banner", displayName: "Banner", category: "overlays", description: "Full-width announcement banner", tags: ["banner", "announcement"] },
  { name: "alert", displayName: "Alert", category: "overlays", description: "Inline alert message with severity levels", tags: ["alert", "message"] },
  { name: "inline-alert", displayName: "Inline Alert", category: "overlays", description: "Compact inline feedback message", tags: ["alert", "inline"] },
  { name: "tour-spotlight", displayName: "Tour Spotlight", category: "overlays", description: "Guided feature tour with spotlight overlay", tags: ["tour", "onboarding"] },
  { name: "confirmation-dialog", displayName: "Confirmation Dialog", category: "overlays", description: "Configurable confirmation prompt", tags: ["confirm", "dialog"] },
  { name: "cookie-consent", displayName: "Cookie Consent", category: "overlays", description: "Cookie consent banner with preferences", tags: ["cookie", "consent", "gdpr"] },
  { name: "command-k-overlay", displayName: "Command K Overlay", category: "overlays", description: "Full-screen command overlay", tags: ["command", "overlay"] },

  // Utility (10)
  { name: "accordion", displayName: "Accordion", category: "utility", description: "Collapsible content sections", tags: ["accordion", "collapse"] },
  { name: "collapsible", displayName: "Collapsible", category: "utility", description: "Simple expand/collapse container", tags: ["collapse", "expand"] },
  { name: "separator", displayName: "Separator", category: "utility", description: "Visual divider between content", tags: ["divider", "line"] },
  { name: "resizable-panels", displayName: "Resizable Panels", category: "utility", description: "Draggable resizable panel layout", tags: ["resize", "panels", "layout"] },
  { name: "scroll-area", displayName: "Scroll Area", category: "utility", description: "Custom scrollbar container", tags: ["scroll", "overflow"] },
  { name: "aspect-ratio", displayName: "Aspect Ratio", category: "utility", description: "Maintain aspect ratio for content", tags: ["aspect", "ratio", "responsive"] },
  { name: "virtualized-list", displayName: "Virtualized List", category: "utility", description: "Performant rendering for large lists", tags: ["virtual", "list", "performance"] },
  { name: "lazy-image", displayName: "Lazy Image", category: "utility", description: "Image with lazy loading and blur-up", tags: ["image", "lazy", "loading"] },
  { name: "portal", displayName: "Portal", category: "utility", description: "Render content in a different DOM location", tags: ["portal", "dom"] },
  { name: "typography", displayName: "Typography", category: "utility", description: "Consistent text styling primitives", tags: ["text", "heading", "paragraph"] },
];

/* ──── Page ──── */
export default function ComponentsDocsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const filtered = useMemo(() => {
    let result = components;

    if (activeCategory !== "all") {
      result = result.filter((c) => c.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.includes(q) ||
          c.displayName.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t) => t.includes(q))
      );
    }

    return result;
  }, [search, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: components.length };
    for (const c of components) {
      counts[c.category] = (counts[c.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Components
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
            Browse all 106 production-ready components. Each one is accessible,
            themeable, and ready to drop into your project.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 rounded-xl border border-border/60 bg-card/50 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-primary/50 transition-all"
            />
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory("all")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
              activeCategory === "all"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Box className="h-3.5 w-3.5" />
            All
            <span className="ml-1 text-xs opacity-70">{categoryCounts.all}</span>
          </button>
          {(Object.keys(categoryMeta) as Category[]).map((cat) => {
            const meta = categoryMeta[cat];
            const Icon = meta.icon;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {meta.label}
                <span className="ml-1 text-xs opacity-70">
                  {categoryCounts[cat] || 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filtered.length} component{filtered.length !== 1 ? "s" : ""}
          {search && ` matching "${search}"`}
        </p>

        {/* Component grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((comp) => {
              const meta = categoryMeta[comp.category];
              const CatIcon = meta.icon;
              return (
                <div
                  key={comp.name}
                  className="group rounded-xl border border-border/50 bg-card/30 p-5 transition-all hover:bg-card hover:border-border hover:shadow-elevation-1"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${meta.color}`}
                      >
                        <CatIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm leading-tight">
                          {comp.displayName}
                        </h3>
                        <p className="text-xs text-muted-foreground font-mono">
                          {comp.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {comp.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {comp.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="h-10 w-10 text-muted-foreground/30 mb-4" />
            <p className="font-medium text-muted-foreground">No components found</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Try adjusting your search or filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
