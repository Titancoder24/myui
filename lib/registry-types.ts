// =============================================================================
// MyUI Component Registry — Type Definitions
// =============================================================================

/**
 * Category of a UI component in the registry.
 */
export type ComponentCategory =
  | "forms"
  | "navigation"
  | "data-display"
  | "overlays"
  | "utility";

/**
 * Metadata for a single component in the MyUI registry.
 *
 * Every component registered in the system conforms to this shape. The
 * information is used by the MCP search tooling, the CLI installer, and
 * the documentation site.
 */
export interface ComponentMeta {
  /** Kebab-case identifier, e.g. "date-range-picker". */
  name: string;

  /** Human-readable display name, e.g. "Date Range Picker". */
  displayName: string;

  /** Top-level category used for browsing / filtering. */
  category: ComponentCategory;

  /** Short (one- or two-sentence) description of what the component does. */
  description: string;

  /** Frameworks the component is available for (currently always ["react"]). */
  frameworks: string[];

  /** Named style / behaviour variants shipped with the component. */
  variants: string[];

  /** Other MyUI component `name`s this component imports directly. */
  dependencies: string[];

  /**
   * NPM packages required per framework.
   * Key = framework name (e.g. "react"), value = array of npm package names.
   */
  peerDependencies: Record<string, string[]>;

  /** Free-form search keywords used by the fuzzy-search index. */
  tags: string[];

  /**
   * Source files per framework, paths relative to the project root
   * (e.g. `registry/react/forms/button.tsx`).
   */
  files: Record<string, string[]>;
}

/**
 * Shape returned by `searchComponents` for each hit.
 */
export interface SearchResult {
  /** The matched component metadata. */
  component: ComponentMeta;

  /** Relevance score (higher is better). */
  score: number;
}

/**
 * Options accepted by the `searchComponents` helper.
 */
export interface SearchOptions {
  /** Optional category filter. */
  category?: ComponentCategory;

  /** Optional framework filter (defaults to matching all). */
  framework?: string;
}
