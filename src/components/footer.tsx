import Link from "next/link";
import { Sparkles } from "lucide-react";

const footerSections = [
  {
    title: "Product",
    links: [
      { href: "#components", label: "Components" },
      { href: "#features", label: "Features" },
      { href: "#how-it-works", label: "How It Works" },
      { href: "/docs/components", label: "Documentation" },
    ],
  },
  {
    title: "Categories",
    links: [
      { href: "/docs/components?category=forms", label: "Forms" },
      { href: "/docs/components?category=data-display", label: "Data Display" },
      { href: "/docs/components?category=navigation", label: "Navigation" },
      { href: "/docs/components?category=overlays", label: "Overlays" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "https://github.com", label: "GitHub" },
      { href: "#", label: "Changelog" },
      { href: "#", label: "Contributing" },
      { href: "#", label: "License" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight">MyUI</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              MCP-first component library. Production-grade UI components that integrate directly into your AI workflow.
            </p>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} MyUI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, Tailwind CSS & Radix UI
          </p>
        </div>
      </div>
    </footer>
  );
}
