# MyUI — Development Guide

## Project Structure

```
myui/
├── api/              # Vercel serverless functions
│   └── mcp.ts        # MCP server endpoint
├── lib/              # Shared library code
│   ├── mcp/          # MCP server implementation
│   ├── registry.ts   # Component registry & search
│   └── utils.ts      # Shared utilities (cn, etc.)
├── registry/         # Component source files (served statically)
│   └── react/        # React components
│       ├── forms/
│       ├── data-display/
│       ├── navigation/
│       ├── overlays/
│       └── utility/
├── scripts/          # Build scripts
├── src/              # Next.js app (docs site)
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── styles/
└── vercel.json       # Vercel config
```

## Architecture

- **MCP-first**: Primary interface is the MCP server, not a CLI
- **Vercel serverless**: MCP server runs as a serverless function
- **Static registry**: Component metadata served as cached JSON
- **Component source**: Raw .tsx files served from registry/

## Design Tokens

All colors use HSL CSS custom properties defined in `src/styles/globals.css`.
Light and dark themes are defined with the `.dark` class.

## Component Standards

- Every component uses `"use client"` directive
- All use `cn()` from `@/lib/utils` for class merging
- forwardRef + displayName on all components
- TypeScript strict types
- Radix UI primitives for accessibility
- class-variance-authority (cva) for variant styles
- Tailwind CSS for all styling
- Animations use the custom keyframes defined in tailwind.config.ts

## Branches

- Development: `claude/build-myui-foundation-ywp0y`
