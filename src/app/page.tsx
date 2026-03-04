"use client";

import {
  Sparkles,
  Zap,
  Shield,
  Palette,
  Layers,
  Terminal,
  ArrowRight,
  Check,
  Copy,
  Box,
  FormInput,
  BarChart3,
  Navigation,
  PanelTop,
  Wrench,
  Code2,
  MousePointerClick,
  Accessibility,
  Moon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/* ───────── Hero Section ───────── */
function HeroSection() {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText(
      'npx myui add --mcp-server "https://myui.dev/api/mcp"'
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Gradient backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[80px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary animate-fade-in">
          <Sparkles className="h-3.5 w-3.5" />
          <span>MCP-First Component Library</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] animate-fade-in">
          Build stunning UIs
          <br />
          <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            at the speed of thought
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in">
          106 production-grade components. Accessible, themeable, and designed to
          integrate directly into your AI-powered development workflow.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
          <Link
            href="/docs/components"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-7 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5"
          >
            Browse Components
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={copyCommand}
            className="group inline-flex h-12 items-center gap-3 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm px-5 text-sm font-mono transition-all hover:bg-card hover:border-border hover:shadow-lg"
          >
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">npx myui add --mcp-server</span>
            {copied ? (
              <Check className="h-4 w-4 text-success" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            )}
          </button>
        </div>

        {/* Stats row */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-sm animate-fade-in">
          {[
            { value: "106", label: "Components" },
            { value: "5", label: "Categories" },
            { value: "100%", label: "Accessible" },
            { value: "0", label: "Runtime deps" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-foreground">
                {stat.value}
              </span>
              <span className="text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Features Section ───────── */
const features = [
  {
    icon: Zap,
    title: "MCP-First Architecture",
    description:
      "Install components through your AI assistant. No CLI needed — just ask and it delivers the exact code you need.",
  },
  {
    icon: Palette,
    title: "Beautiful by Default",
    description:
      "Every component is designed with meticulous attention to detail. Smooth animations, consistent spacing, and polished interactions.",
  },
  {
    icon: Shield,
    title: "Accessible Out of the Box",
    description:
      "Built on Radix UI primitives with full WCAG compliance. Keyboard navigation, screen readers, and focus management included.",
  },
  {
    icon: Layers,
    title: "Composable & Extensible",
    description:
      "Components are built to be composed together. Variants via CVA, class merging with cn(), and full TypeScript support.",
  },
  {
    icon: Moon,
    title: "Dark Mode Ready",
    description:
      "Every component supports light and dark themes through CSS custom properties. Switch themes with a single class toggle.",
  },
  {
    icon: MousePointerClick,
    title: "Copy & Own",
    description:
      "No opaque package dependency. Every component lives in your codebase — fully customizable, fully yours.",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Why developers choose MyUI
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A component library built for the modern AI-assisted development era.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border/50 bg-card/50 p-7 transition-all hover:bg-card hover:border-border hover:shadow-elevation-2 hover:-translate-y-0.5"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Component Categories Section ───────── */
const categories = [
  {
    icon: FormInput,
    name: "Forms",
    count: 36,
    color: "text-blue-500 bg-blue-500/10",
    examples: [
      "Button",
      "Input",
      "Select",
      "Combobox",
      "Date Picker",
      "File Upload",
      "Slider",
      "Switch",
    ],
  },
  {
    icon: BarChart3,
    name: "Data Display",
    count: 26,
    color: "text-emerald-500 bg-emerald-500/10",
    examples: [
      "Data Table",
      "Card",
      "Avatar",
      "Badge",
      "Progress",
      "Skeleton",
      "Timeline",
      "Code Block",
    ],
  },
  {
    icon: Navigation,
    name: "Navigation",
    count: 16,
    color: "text-amber-500 bg-amber-500/10",
    examples: [
      "Dropdown Menu",
      "Command Palette",
      "Tabs",
      "Sidebar",
      "Breadcrumb",
      "Pagination",
      "Stepper",
      "Navbar",
    ],
  },
  {
    icon: PanelTop,
    name: "Overlays",
    count: 18,
    color: "text-purple-500 bg-purple-500/10",
    examples: [
      "Dialog",
      "Drawer",
      "Popover",
      "Tooltip",
      "Toast",
      "Alert",
      "Sheet",
      "Banner",
    ],
  },
  {
    icon: Wrench,
    name: "Utility",
    count: 10,
    color: "text-rose-500 bg-rose-500/10",
    examples: [
      "Accordion",
      "Separator",
      "Scroll Area",
      "Resizable Panels",
      "Typography",
      "Portal",
      "Collapsible",
      "Aspect Ratio",
    ],
  },
];

function ComponentsSection() {
  return (
    <section
      id="components"
      className="py-24 sm:py-32 border-t border-border/50"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            106 components across 5 categories
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build complete applications — from form
            controls to complex data displays.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="group rounded-2xl border border-border/50 bg-card/50 p-7 transition-all hover:bg-card hover:border-border hover:shadow-elevation-2"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${cat.color}`}
                >
                  <cat.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {cat.count} components
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.examples.map((ex) => (
                  <span
                    key={ex}
                    className="inline-flex items-center rounded-md border border-border/50 bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover:border-border group-hover:text-foreground"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Browse all CTA card */}
          <Link
            href="/docs/components"
            className="group flex items-center justify-center rounded-2xl border border-dashed border-border/60 bg-transparent p-7 transition-all hover:bg-card/50 hover:border-primary/30"
          >
            <div className="text-center">
              <Box className="h-8 w-8 mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors" />
              <p className="font-semibold group-hover:text-primary transition-colors">
                Browse All Components
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                View the full catalogue
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ───────── How It Works Section ───────── */
function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-24 sm:py-32 border-t border-border/50"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Get started in seconds
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            No CLI installs, no config files. Just connect the MCP server and start building.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {[
            {
              step: "01",
              title: "Connect the MCP Server",
              description:
                "Add the MyUI MCP server URL to your AI assistant. Works with any MCP-compatible client.",
              code: `{
  "mcpServers": {
    "myui": {
      "url": "https://myui.dev/api/mcp"
    }
  }
}`,
            },
            {
              step: "02",
              title: "Ask for Components",
              description:
                "Tell your assistant what you need. It searches the registry, resolves dependencies, and delivers the code.",
              code: `> "Add a date picker with range
   selection and a combobox
   for country selection"

✓ Searching registry...
✓ Found: date-range-picker, combobox
✓ Resolving dependencies...`,
            },
            {
              step: "03",
              title: "Ship It",
              description:
                "Components land in your codebase — fully typed, accessible, and ready for production. Customize as needed.",
              code: `registry/react/forms/
├── date-range-picker.tsx  ✓
├── combobox.tsx            ✓
├── popover.tsx             ✓  (dep)
└── button.tsx              ✓  (dep)

Ready to use!`,
            },
          ].map((item) => (
            <div key={item.step} className="relative">
              <div className="mb-4">
                <span className="text-5xl font-black text-primary/15">
                  {item.step}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {item.description}
              </p>
              <div className="rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm p-4 font-mono text-xs leading-relaxed text-muted-foreground overflow-x-auto">
                <pre>{item.code}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Tech Stack Section ───────── */
function TechStackSection() {
  const tech = [
    { icon: Code2, name: "TypeScript", desc: "Strict types everywhere" },
    { icon: Accessibility, name: "Radix UI", desc: "Accessible primitives" },
    { icon: Palette, name: "Tailwind CSS", desc: "Utility-first styling" },
    { icon: Layers, name: "CVA", desc: "Variant management" },
  ];

  return (
    <section className="py-24 sm:py-32 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Built on proven foundations
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Industry-standard tools trusted by thousands of teams.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {tech.map((t) => (
            <div
              key={t.name}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border/50 bg-card/30 p-6 text-center transition-all hover:bg-card/60 hover:border-border"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <t.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── CTA Section ───────── */
function CTASection() {
  return (
    <section className="py-24 sm:py-32 border-t border-border/50">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="relative rounded-3xl border border-border/50 bg-card/50 p-12 sm:p-16 overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[400px] bg-primary/10 blur-[100px] rounded-full -z-10" />

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to build something amazing?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Connect the MCP server and start adding production-grade components in seconds.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/docs/components"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-7 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-border/60 bg-background/50 px-7 text-sm font-semibold transition-all hover:bg-background hover:border-border"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Page ───────── */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ComponentsSection />
      <HowItWorksSection />
      <TechStackSection />
      <CTASection />
    </>
  );
}
