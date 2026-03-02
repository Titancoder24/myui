// =============================================================================
// MyUI MCP Server — Vercel Serverless Function Entry Point
// =============================================================================
//
// POST /api/mcp
//
// Handles MCP (Model Context Protocol) JSON-RPC 2.0 messages over HTTP.
// This function is the single entry point for all MCP communication. Clients
// send JSON-RPC requests via POST and receive JSON-RPC responses.
//
// The endpoint also accepts batched requests (JSON arrays of JSON-RPC
// messages) per the JSON-RPC 2.0 specification.
// =============================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { processRequest } from "../lib/mcp/server";

// ---------------------------------------------------------------------------
// CORS Headers
// ---------------------------------------------------------------------------

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  // Apply CORS headers to every response.
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    res.setHeader(key, value);
  }

  // --- Preflight ---
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  // --- Only POST is accepted for MCP ---
  if (req.method !== "POST") {
    res.status(405).json({
      jsonrpc: "2.0",
      id: null,
      error: {
        code: -32600,
        message: "Method not allowed. Use POST for MCP requests.",
      },
    });
    return;
  }

  // --- Parse the request body ---
  const body = req.body;

  if (body === undefined || body === null) {
    res.status(400).json({
      jsonrpc: "2.0",
      id: null,
      error: {
        code: -32700,
        message: "Parse error: empty request body",
      },
    });
    return;
  }

  try {
    // --- Handle batched requests (JSON-RPC 2.0 batch) ---
    if (Array.isArray(body)) {
      if (body.length === 0) {
        res.status(400).json({
          jsonrpc: "2.0",
          id: null,
          error: {
            code: -32600,
            message: "Invalid request: empty batch",
          },
        });
        return;
      }

      const results = await Promise.all(
        body.map((item: unknown) => processRequest(item)),
      );

      // Filter out null responses (notifications don't produce responses).
      const responses = results.filter(
        (r): r is NonNullable<typeof r> => r !== null,
      );

      // If all messages were notifications, return 204 (no content).
      if (responses.length === 0) {
        res.status(204).end();
        return;
      }

      res.status(200).json(responses);
      return;
    }

    // --- Handle single request ---
    const result = await processRequest(body);

    // Notifications return null — respond with 204.
    if (result === null) {
      res.status(204).end();
      return;
    }

    // Determine appropriate HTTP status based on JSON-RPC response.
    const httpStatus = result.error ? 200 : 200; // JSON-RPC errors use 200
    res.status(httpStatus).json(result);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unexpected server error";

    console.error("[myui-mcp] Unhandled error:", err);

    res.status(500).json({
      jsonrpc: "2.0",
      id: null,
      error: {
        code: -32603,
        message: `Internal server error: ${message}`,
      },
    });
  }
}
