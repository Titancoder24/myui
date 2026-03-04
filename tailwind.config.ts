import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
    "./registry/**/*.{ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        "var(--font-sans, Inter)",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ],
      mono: [
        "SF Mono",
        "Fira Code",
        "Fira Mono",
        "Roboto Mono",
        "monospace",
      ],
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "elevation-1": "0 1px 2px 0 rgb(0 0 0 / 0.03), 0 1px 3px 0 rgb(0 0 0 / 0.06)",
        "elevation-2": "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
        "elevation-3": "0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -4px rgb(0 0 0 / 0.05)",
        "glass": "0 0 0 1px rgb(255 255 255 / 0.05), 0 4px 6px -1px rgb(0 0 0 / 0.1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-from-left": {
          from: { transform: "translateX(-10px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-from-right": {
          from: { transform: "translateX(10px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.95)", opacity: "0" },
        },
        "spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "checkmark-draw": {
          from: { strokeDashoffset: "24" },
          to: { strokeDashoffset: "0" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-4px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(4px)" },
        },
        "pulse-gentle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "progress-bar-stripe": {
          from: { backgroundPosition: "1rem 0" },
          to: { backgroundPosition: "0 0" },
        },
        "toast-slide-in": {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "dialog-overlay-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "dialog-content-in": {
          from: { opacity: "0", transform: "translate(-50%, -48%) scale(0.95)" },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-out": "fade-out 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-from-top": "slide-in-from-top 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-from-bottom": "slide-in-from-bottom 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-from-left": "slide-in-from-left 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in-from-right": "slide-in-from-right 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scale-in 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-out": "scale-out 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "spin": "spin 1s linear infinite",
        "shimmer": "shimmer 2s ease-in-out infinite",
        "checkmark-draw": "checkmark-draw 200ms ease-out forwards",
        "shake": "shake 500ms ease-in-out",
        "pulse-gentle": "pulse-gentle 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "progress-bar-stripe": "progress-bar-stripe 1s linear infinite",
        "toast-slide-in": "toast-slide-in 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-down": "accordion-down 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        "accordion-up": "accordion-up 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        "dialog-overlay-in": "dialog-overlay-in 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        "dialog-content-in": "dialog-content-in 200ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.16, 1, 0.3, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
