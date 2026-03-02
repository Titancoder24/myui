// =============================================================================
// MyUI MCP Server — Tool Handlers
// =============================================================================
//
// Each exported handler corresponds to one MCP tool. Handlers receive validated
// arguments and return MCP-formatted content blocks. File I/O uses Node.js
// `fs/promises` to read component source from the `registry/` directory.
// =============================================================================

import { readFile } from "node:fs/promises";
import { join, basename } from "node:path";
import type { ComponentMeta, ComponentCategory } from "../registry-types";
import {
  searchComponents,
  getComponent,
  getComponentsByCategory,
  resolveDependencies,
} from "../registry";

// ---------------------------------------------------------------------------
// MCP Content Types
// ---------------------------------------------------------------------------

interface TextContent {
  type: "text";
  text: string;
}

interface ToolResult {
  content: TextContent[];
  isError?: boolean;
}

// ---------------------------------------------------------------------------
// Root directory for resolving registry file paths.
// In Vercel, `process.cwd()` points to the project root where the files are
// bundled. For local development the same applies.
// ---------------------------------------------------------------------------

const PROJECT_ROOT = process.cwd();

// ---------------------------------------------------------------------------
// Dispatcher
// ---------------------------------------------------------------------------

/**
 * Route a `tools/call` invocation to the correct handler.
 */
export async function handleToolCall(
  toolName: string,
  args: Record<string, unknown>,
): Promise<ToolResult> {
  switch (toolName) {
    case "search_components":
      return handleSearchComponents(args);
    case "browse_category":
      return handleBrowseCategory(args);
    case "preview_component":
      return handlePreviewComponent(args);
    case "install_component":
      return handleInstallComponent(args);
    case "generate_variant":
      return handleGenerateVariant(args);
    default:
      return errorResult(`Unknown tool: ${toolName}`);
  }
}

// ---------------------------------------------------------------------------
// search_components
// ---------------------------------------------------------------------------

function handleSearchComponents(
  args: Record<string, unknown>,
): ToolResult {
  const query = args.query as string | undefined;
  if (!query || typeof query !== "string") {
    return errorResult("Missing required argument: query");
  }

  const category = args.category as ComponentCategory | undefined;
  const framework = args.framework as string | undefined;

  const results = searchComponents(query, { category, framework });

  if (results.length === 0) {
    return textResult(
      `No components found matching "${query}".` +
        (category ? ` Category filter: ${category}.` : "") +
        (framework ? ` Framework filter: ${framework}.` : "") +
        "\n\nTry a broader search or browse by category with the browse_category tool.",
    );
  }

  const formatted = results.map((r) => {
    const c = r.component;
    return [
      `**${c.displayName}** (\`${c.name}\`)`,
      `  Category: ${c.category}`,
      `  Description: ${c.description}`,
      `  Frameworks: ${c.frameworks.join(", ")}`,
      `  Variants: ${c.variants.join(", ") || "default"}`,
      `  Dependencies: ${c.dependencies.length > 0 ? c.dependencies.join(", ") : "none"}`,
      `  Relevance: ${r.score}`,
    ].join("\n");
  });

  return textResult(
    `Found ${results.length} component${results.length === 1 ? "" : "s"} matching "${query}":\n\n` +
      formatted.join("\n\n"),
  );
}

// ---------------------------------------------------------------------------
// browse_category
// ---------------------------------------------------------------------------

function handleBrowseCategory(
  args: Record<string, unknown>,
): ToolResult {
  const category = args.category as ComponentCategory | undefined;
  if (!category || typeof category !== "string") {
    return errorResult("Missing required argument: category");
  }

  const validCategories: ComponentCategory[] = [
    "forms",
    "navigation",
    "data-display",
    "overlays",
    "utility",
  ];
  if (!validCategories.includes(category)) {
    return errorResult(
      `Invalid category "${category}". Valid categories: ${validCategories.join(", ")}`,
    );
  }

  const framework = args.framework as string | undefined;
  const components = getComponentsByCategory(category, framework);

  if (components.length === 0) {
    return textResult(
      `No components found in category "${category}"` +
        (framework ? ` for framework "${framework}"` : "") +
        ".",
    );
  }

  const formatted = components.map((c) =>
    [
      `**${c.displayName}** (\`${c.name}\`)`,
      `  ${c.description}`,
      `  Variants: ${c.variants.join(", ") || "default"}`,
      `  Dependencies: ${c.dependencies.length > 0 ? c.dependencies.join(", ") : "none"}`,
    ].join("\n"),
  );

  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
  return textResult(
    `## ${categoryLabel} Components (${components.length})\n\n` +
      formatted.join("\n\n"),
  );
}

// ---------------------------------------------------------------------------
// preview_component
// ---------------------------------------------------------------------------

async function handlePreviewComponent(
  args: Record<string, unknown>,
): Promise<ToolResult> {
  const name = args.name as string | undefined;
  if (!name || typeof name !== "string") {
    return errorResult("Missing required argument: name");
  }

  const framework = (args.framework as string) ?? "react";
  const component = getComponent(name);

  if (!component) {
    return errorResult(
      `Component "${name}" not found. Use search_components to find available components.`,
    );
  }

  const files = component.files[framework];
  if (!files || files.length === 0) {
    return errorResult(
      `Component "${name}" is not available for framework "${framework}".`,
    );
  }

  const sections: string[] = [
    `## ${component.displayName} — Preview`,
    "",
    `**Category:** ${component.category}`,
    `**Framework:** ${framework}`,
    `**Variants:** ${component.variants.join(", ") || "default"}`,
    `**Description:** ${component.description}`,
    "",
  ];

  for (const filePath of files) {
    const absolutePath = join(PROJECT_ROOT, filePath);
    try {
      const source = await readFile(absolutePath, "utf-8");
      const filename = basename(filePath);
      sections.push(`### ${filename}\n`);
      sections.push("```tsx");
      sections.push(source);
      sections.push("```\n");
    } catch {
      sections.push(
        `### ${basename(filePath)}\n`,
        `> Source file not yet available at \`${filePath}\`. ` +
          "The component may still be in development.\n",
      );
    }
  }

  // Peer dependencies note
  const peers = component.peerDependencies[framework];
  if (peers && peers.length > 0) {
    sections.push(
      `**Required npm packages:** \`${peers.join("` `")}\``,
    );
  }

  return textResult(sections.join("\n"));
}

// ---------------------------------------------------------------------------
// install_component
// ---------------------------------------------------------------------------

async function handleInstallComponent(
  args: Record<string, unknown>,
): Promise<ToolResult> {
  const name = args.name as string | undefined;
  if (!name || typeof name !== "string") {
    return errorResult("Missing required argument: name");
  }

  const framework = (args.framework as string) ?? "react";
  const outputPath = (args.outputPath as string) ?? "src/components/ui";
  const includeDemo = (args.includeDemo as boolean) ?? false;

  const component = getComponent(name);
  if (!component) {
    return errorResult(
      `Component "${name}" not found. Use search_components to find available components.`,
    );
  }

  // Resolve full dependency tree
  const allComponents = resolveDependencies(name);

  // Gather all files and npm packages
  const fileMap: Record<string, string> = {};
  const allNpmPackages = new Set<string>();
  const componentNames: string[] = [];

  for (const comp of allComponents) {
    componentNames.push(comp.name);
    const files = comp.files[framework];
    if (!files || files.length === 0) continue;

    // Collect npm peer dependencies
    const peers = comp.peerDependencies[framework];
    if (peers) {
      for (const pkg of peers) {
        allNpmPackages.add(pkg);
      }
    }

    for (const filePath of files) {
      const absolutePath = join(PROJECT_ROOT, filePath);
      const filename = basename(filePath);
      const destPath = `${outputPath}/${filename}`;

      try {
        const source = await readFile(absolutePath, "utf-8");
        fileMap[destPath] = source;
      } catch {
        fileMap[destPath] =
          `// Source file not yet available: ${filePath}\n` +
          "// This component may still be in development.\n";
      }
    }
  }

  // Build the response
  const sections: string[] = [
    `## Install: ${component.displayName}`,
    "",
  ];

  // Dependency info
  if (allComponents.length > 1) {
    const depNames = allComponents
      .filter((c) => c.name !== name)
      .map((c) => c.displayName);
    sections.push(
      `**Dependencies resolved:** ${depNames.join(", ")}`,
      "",
    );
  }

  // NPM packages
  if (allNpmPackages.size > 0) {
    const pkgList = Array.from(allNpmPackages).sort();
    sections.push(
      "**Install required npm packages:**",
      "",
      "```bash",
      `npm install ${pkgList.join(" ")}`,
      "```",
      "",
    );
  }

  // Also need the utility function
  sections.push(
    "**Required utility:** Ensure `src/lib/utils.ts` exists with the `cn()` helper:",
    "",
    "```ts",
    'import { type ClassValue, clsx } from "clsx";',
    'import { twMerge } from "tailwind-merge";',
    "",
    "export function cn(...inputs: ClassValue[]) {",
    "  return twMerge(clsx(inputs));",
    "}",
    "```",
    "",
    "If not present, also install: `npm install clsx tailwind-merge`",
    "",
  );

  // File contents
  sections.push(`**Files to write (${Object.keys(fileMap).length}):**`, "");

  for (const [destPath, content] of Object.entries(fileMap)) {
    sections.push(`### \`${destPath}\``, "");
    sections.push("```tsx");
    sections.push(content);
    sections.push("```", "");
  }

  // Demo file placeholder
  if (includeDemo) {
    const demoPath = `${outputPath}/${name}-demo.tsx`;
    sections.push(`### \`${demoPath}\` (demo)`, "");
    sections.push("```tsx");
    sections.push(`"use client";`);
    sections.push("");
    sections.push(
      `import { ${toPascalCase(name)} } from "./${name}";`,
    );
    sections.push("");
    sections.push(`export function ${toPascalCase(name)}Demo() {`);
    sections.push(`  return (`);
    sections.push(`    <div className="space-y-4 p-8">`);
    sections.push(
      `      <h2 className="text-2xl font-bold">${component.displayName} Demo</h2>`,
    );
    sections.push(`      <${toPascalCase(name)} />`);
    sections.push(`    </div>`);
    sections.push(`  );`);
    sections.push(`}`);
    sections.push("```", "");
  }

  return textResult(sections.join("\n"));
}

// ---------------------------------------------------------------------------
// generate_variant
// ---------------------------------------------------------------------------

function handleGenerateVariant(
  args: Record<string, unknown>,
): ToolResult {
  const name = args.name as string | undefined;
  const description = args.description as string | undefined;

  if (!name || typeof name !== "string") {
    return errorResult("Missing required argument: name");
  }
  if (!description || typeof description !== "string") {
    return errorResult("Missing required argument: description");
  }

  const component = getComponent(name);
  if (!component) {
    return errorResult(
      `Component "${name}" not found. Use search_components to find available components.`,
    );
  }

  return textResult(
    `## Generate Variant: ${component.displayName}\n\n` +
      `**Requested variant:** ${description}\n\n` +
      "Custom variant generation requires an API key to be configured. " +
      "To enable this feature:\n\n" +
      "1. Set the `MYUI_API_KEY` environment variable in your Vercel project settings.\n" +
      "2. Redeploy the MCP server.\n\n" +
      "In the meantime, you can use the `preview_component` tool to view the base " +
      `component source for \`${name}\` and manually create a variant based on that code.`,
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function textResult(text: string): ToolResult {
  return {
    content: [{ type: "text", text }],
  };
}

function errorResult(message: string): ToolResult {
  return {
    content: [{ type: "text", text: message }],
    isError: true,
  };
}

/**
 * Convert a kebab-case string to PascalCase.
 * e.g. "date-picker" -> "DatePicker"
 */
function toPascalCase(kebab: string): string {
  return kebab
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("");
}
