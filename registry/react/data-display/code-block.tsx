"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// CodeBlock
// ---------------------------------------------------------------------------

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-2 py-1 text-xs",
        "text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#30363d]",
        "transition-colors duration-150",
        "opacity-0 group-hover:opacity-100 focus:opacity-100",
      )}
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? (
        <>
          {/* Checkmark icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          {/* Copy icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      code,
      language,
      filename,
      showLineNumbers = false,
      highlightLines = [],
      className,
    },
    ref,
  ) => {
    const lines = code.split("\n");
    // Remove trailing empty line that often comes from template literals
    if (lines[lines.length - 1] === "") {
      lines.pop();
    }

    const highlightSet = React.useMemo(
      () => new Set(highlightLines),
      [highlightLines],
    );

    return (
      <div
        ref={ref}
        className={cn(
          "group bg-[#0d1117] text-[#e6edf3] rounded-xl overflow-hidden",
          className,
        )}
      >
        {/* Filename bar */}
        {filename && (
          <div className="px-4 py-2 text-xs text-[#8b949e] bg-[#161b22] border-b border-[#30363d] flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* File icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              </svg>
              <span>{filename}</span>
            </div>
            <CopyButton text={code} />
          </div>
        )}

        {/* Code area */}
        <div className="relative">
          {/* Copy button when no filename bar */}
          {!filename && (
            <div className="absolute right-2 top-2 z-10">
              <CopyButton text={code} />
            </div>
          )}

          <pre
            className={cn(
              "overflow-x-auto p-4 text-sm leading-relaxed font-mono",
              "[&::-webkit-scrollbar]:h-2",
              "[&::-webkit-scrollbar-track]:bg-transparent",
              "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#30363d]",
            )}
          >
            <code className={language ? `language-${language}` : undefined}>
              {lines.map((line, index) => {
                const lineNumber = index + 1;
                const isHighlighted = highlightSet.has(lineNumber);

                return (
                  <div
                    key={index}
                    className={cn(
                      "px-2 -mx-2",
                      isHighlighted &&
                        "bg-[#1f6feb]/10 border-l-2 border-l-[#1f6feb]",
                      !isHighlighted && "border-l-2 border-l-transparent",
                    )}
                  >
                    {showLineNumbers && (
                      <span className="inline-block text-[#484f58] select-none pr-4 text-right w-8">
                        {lineNumber}
                      </span>
                    )}
                    <span>{line || "\n"}</span>
                  </div>
                );
              })}
            </code>
          </pre>
        </div>
      </div>
    );
  },
);
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
export type { CodeBlockProps };
