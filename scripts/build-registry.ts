#!/usr/bin/env tsx
// =============================================================================
// MyUI — Build Registry Script
// =============================================================================
//
// Usage:  npm run build:registry
//         npx tsx scripts/build-registry.ts
//
// This script:
//   1. Imports the component registry data
//   2. Validates that all referenced source files exist on disk
//   3. Writes a `registry.json` to the public directory for CDN caching
//   4. Logs statistics about the registry
// =============================================================================

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { REGISTRY } from "../lib/registry";
import type { ComponentCategory } from "../lib/registry-types";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const PROJECT_ROOT = resolve(import.meta.dirname, "..");
const OUTPUT_DIR = join(PROJECT_ROOT, "public");
const OUTPUT_FILE = join(OUTPUT_DIR, "registry.json");

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

interface ValidationError {
  component: string;
  framework: string;
  file: string;
  reason: string;
}

function validateRegistry(): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const component of REGISTRY) {
    // Validate that each file entry references an existing file.
    for (const [framework, files] of Object.entries(component.files)) {
      for (const filePath of files) {
        const absolutePath = join(PROJECT_ROOT, filePath);
        if (!existsSync(absolutePath)) {
          errors.push({
            component: component.name,
            framework,
            file: filePath,
            reason: "File does not exist",
          });
        }
      }
    }

    // Validate that declared dependencies reference real registry entries.
    for (const dep of component.dependencies) {
      const depExists = REGISTRY.some((c) => c.name === dep);
      if (!depExists) {
        errors.push({
          component: component.name,
          framework: "*",
          file: "",
          reason: `Dependency "${dep}" is not in the registry`,
        });
      }
    }
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Statistics
// ---------------------------------------------------------------------------

function logStatistics(): void {
  const categories = new Map<ComponentCategory, number>();
  const frameworks = new Map<string, number>();
  let totalFiles = 0;
  let totalDependencies = 0;
  let totalVariants = 0;

  for (const component of REGISTRY) {
    // Count by category
    const count = categories.get(component.category) ?? 0;
    categories.set(component.category, count + 1);

    // Count by framework
    for (const fw of component.frameworks) {
      const fwCount = frameworks.get(fw) ?? 0;
      frameworks.set(fw, fwCount + 1);
    }

    // Count files
    for (const files of Object.values(component.files)) {
      totalFiles += files.length;
    }

    totalDependencies += component.dependencies.length;
    totalVariants += component.variants.length;
  }

  console.log("\n--- MyUI Registry Statistics ---\n");
  console.log(`  Components:    ${REGISTRY.length}`);
  console.log(`  Total files:   ${totalFiles}`);
  console.log(`  Total variants: ${totalVariants}`);
  console.log(`  Dependencies:  ${totalDependencies} (declared)`);
  console.log("");

  console.log("  By category:");
  const sortedCategories = Array.from(categories.entries()).sort(
    (a, b) => b[1] - a[1],
  );
  for (const [cat, count] of sortedCategories) {
    console.log(`    ${cat.padEnd(16)} ${count}`);
  }

  console.log("");
  console.log("  By framework:");
  for (const [fw, count] of frameworks.entries()) {
    console.log(`    ${fw.padEnd(16)} ${count}`);
  }

  console.log("");
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

function buildRegistryJson(): void {
  // Ensure the output directory exists.
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Build the JSON payload.
  const payload = {
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    components: REGISTRY.map((c) => ({
      name: c.name,
      displayName: c.displayName,
      category: c.category,
      description: c.description,
      frameworks: c.frameworks,
      variants: c.variants,
      dependencies: c.dependencies,
      peerDependencies: c.peerDependencies,
      tags: c.tags,
      files: c.files,
    })),
  };

  const json = JSON.stringify(payload, null, 2);
  writeFileSync(OUTPUT_FILE, json, "utf-8");

  console.log(`  Output: ${OUTPUT_FILE} (${(json.length / 1024).toFixed(1)} KB)`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  console.log("Building MyUI registry...\n");

  // 1. Validate
  const errors = validateRegistry();

  if (errors.length > 0) {
    console.log(`  Validation warnings: ${errors.length}\n`);
    for (const err of errors) {
      const location = err.file
        ? `${err.component} [${err.framework}] ${err.file}`
        : `${err.component}`;
      console.log(`    WARN  ${location}`);
      console.log(`          ${err.reason}`);
    }
    console.log("");
    // Warnings are non-fatal — component files may not exist yet during
    // early development. The registry JSON is still generated.
  } else {
    console.log("  Validation: all checks passed\n");
  }

  // 2. Generate JSON
  buildRegistryJson();

  // 3. Statistics
  logStatistics();

  console.log("Registry build complete.\n");
}

main();
