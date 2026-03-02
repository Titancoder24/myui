// =============================================================================
// MyUI MCP Server — Core Logic & Tool Definitions
// =============================================================================
//
// Implements the MCP (Model Context Protocol) JSON-RPC 2.0 server. This module
// owns the tool schema, method routing, and protocol-level concerns. Actual
// tool execution is delegated to the handler functions in ./handlers.ts.
// =============================================================================

import { handleToolCall } from "./handlers";

// ---------------------------------------------------------------------------
// MCP Protocol Constants
// ---------------------------------------------------------------------------

const SERVER_NAME = "myui";
const SERVER_VERSION = "0.1.0";
const PROTOCOL_VERSION = "2024-11-05";

// ---------------------------------------------------------------------------
// JSON-RPC 2.0 Types
// ---------------------------------------------------------------------------

interface JsonRpcRequest {
  jsonrpc: "2.0";
  id?: string | number | null;
  method: string;
  params?: Record<string, unknown>;
}

interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: string | number | null;
  result?: unknown;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

// Standard JSON-RPC error codes
const ERROR_PARSE = -32700;
const ERROR_INVALID_REQUEST = -32600;
const ERROR_METHOD_NOT_FOUND = -32601;
const ERROR_INTERNAL = -32603;

// ---------------------------------------------------------------------------
// Tool Definitions
// ---------------------------------------------------------------------------

/**
 * Complete tool definitions returned by `tools/list`. Each tool includes its
 * name, description, and a JSON Schema describing the expected input.
 */
const TOOLS = [
  {
    name: "search_components",
    description:
      "Search the MyUI component library. Returns matching components with descriptions, categories, variants, and supported frameworks. Use this to find components by name or functionality.",
    inputSchema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description: "Search query (e.g., 'date picker', 'modal', 'table')",
        },
        category: {
          type: "string",
          enum: ["forms", "navigation", "data-display", "overlays", "utility"],
          description: "Optional category filter",
        },
        framework: {
          type: "string",
          enum: ["react"],
          description: "Optional framework filter",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "browse_category",
    description:
      "Browse all MyUI components in a specific category. Returns the complete list of components with metadata.",
    inputSchema: {
      type: "object" as const,
      properties: {
        category: {
          type: "string",
          enum: ["forms", "navigation", "data-display", "overlays", "utility"],
          description: "Component category to browse",
        },
        framework: {
          type: "string",
          enum: ["react"],
          description: "Optional framework filter",
        },
      },
      required: ["category"],
    },
  },
  {
    name: "preview_component",
    description:
      "Preview the source code of a MyUI component before installing it. Returns the complete TypeScript/React source code.",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description:
            "Component name in kebab-case (e.g., 'date-picker', 'data-table')",
        },
        framework: {
          type: "string",
          enum: ["react"],
          description: "Target framework",
        },
        variant: {
          type: "string",
          description: "Optional variant name",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "install_component",
    description:
      "Install a MyUI component into the user's project. Returns all source files and their contents, resolved dependencies, and required npm packages. The AI assistant should write these files to the user's project.",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "Component name in kebab-case",
        },
        framework: {
          type: "string",
          enum: ["react"],
          description: "Target framework (auto-detected if not specified)",
        },
        outputPath: {
          type: "string",
          description: "Output directory path (default: src/components/ui)",
        },
        includeDemo: {
          type: "boolean",
          description: "Include a demo/example file",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "generate_variant",
    description:
      "Generate a custom variant of a MyUI component using AI. Describe what you want and receive generated source code based on the base component.",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "Base component name",
        },
        framework: {
          type: "string",
          enum: ["react"],
          description: "Target framework",
        },
        description: {
          type: "string",
          description:
            "Natural language description of the desired variant",
        },
      },
      required: ["name", "description"],
    },
  },
] as const;

// ---------------------------------------------------------------------------
// Method Handlers
// ---------------------------------------------------------------------------

/**
 * Handle the `initialize` handshake.
 */
function handleInitialize(
  _params: Record<string, unknown> | undefined,
): unknown {
  return {
    protocolVersion: PROTOCOL_VERSION,
    capabilities: {
      tools: {},
    },
    serverInfo: {
      name: SERVER_NAME,
      version: SERVER_VERSION,
    },
  };
}

/**
 * Handle `tools/list` — returns the full tool catalogue.
 */
function handleToolsList(): unknown {
  return { tools: TOOLS };
}

/**
 * Handle `tools/call` — dispatches to the appropriate tool handler.
 */
async function handleToolsCall(
  params: Record<string, unknown> | undefined,
): Promise<unknown> {
  const toolName = params?.name as string | undefined;
  const args = (params?.arguments ?? {}) as Record<string, unknown>;

  if (!toolName) {
    throw new McpError(ERROR_INVALID_REQUEST, "Missing required field: name");
  }

  // Validate tool exists
  const toolExists = TOOLS.some((t) => t.name === toolName);
  if (!toolExists) {
    throw new McpError(
      ERROR_METHOD_NOT_FOUND,
      `Unknown tool: ${toolName}`,
    );
  }

  return handleToolCall(toolName, args);
}

// ---------------------------------------------------------------------------
// Error helper
// ---------------------------------------------------------------------------

class McpError extends Error {
  code: number;
  data?: unknown;

  constructor(code: number, message: string, data?: unknown) {
    super(message);
    this.name = "McpError";
    this.code = code;
    this.data = data;
  }
}

// ---------------------------------------------------------------------------
// Main Request Router
// ---------------------------------------------------------------------------

/**
 * Process a single JSON-RPC 2.0 request and return the response object.
 * This is the primary entry point called by the Vercel serverless function.
 */
export async function processRequest(
  body: unknown,
): Promise<JsonRpcResponse | null> {
  // --- Parse & validate the JSON-RPC envelope ---
  if (typeof body !== "object" || body === null) {
    return makeError(null, ERROR_PARSE, "Invalid JSON");
  }

  const req = body as Partial<JsonRpcRequest>;

  if (req.jsonrpc !== "2.0") {
    return makeError(
      req.id ?? null,
      ERROR_INVALID_REQUEST,
      'Missing or invalid "jsonrpc" field — expected "2.0"',
    );
  }

  if (typeof req.method !== "string") {
    return makeError(
      req.id ?? null,
      ERROR_INVALID_REQUEST,
      'Missing or invalid "method" field',
    );
  }

  // Notifications (no id) — acknowledge silently per MCP spec.
  // The `notifications/initialized` message from clients is a notification.
  if (req.id === undefined || req.id === null) {
    return null;
  }

  // --- Route to the correct handler ---
  try {
    let result: unknown;

    switch (req.method) {
      case "initialize":
        result = handleInitialize(req.params);
        break;

      case "tools/list":
        result = handleToolsList();
        break;

      case "tools/call":
        result = await handleToolsCall(req.params);
        break;

      // Respond gracefully to ping
      case "ping":
        result = {};
        break;

      default:
        return makeError(
          req.id,
          ERROR_METHOD_NOT_FOUND,
          `Unknown method: ${req.method}`,
        );
    }

    return {
      jsonrpc: "2.0",
      id: req.id,
      result,
    };
  } catch (err: unknown) {
    if (err instanceof McpError) {
      return makeError(req.id, err.code, err.message, err.data);
    }

    const message =
      err instanceof Error ? err.message : "Internal server error";
    return makeError(req.id, ERROR_INTERNAL, message);
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeError(
  id: string | number | null,
  code: number,
  message: string,
  data?: unknown,
): JsonRpcResponse {
  return {
    jsonrpc: "2.0",
    id: id ?? null,
    error: { code, message, ...(data !== undefined ? { data } : {}) },
  };
}
