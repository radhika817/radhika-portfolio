# AI Assistant Guidelines for Portfolio Development

This repository utilizes Model Context Protocol (MCP) integrations alongside a strictly defined design system. All AI coding assistants working in this workspace must follow these directives:

---

## 1. MCP Server Delegation
* **shadcn MCP (`shadcn`)**: Query for semantic markup, accessible Radix component structures, keyboard navigation patterns, and clean utility bindings.
* **21st.dev Magic MCP (`21st`)**: Query for layout design inspiration, visual structure ideas, and contemporary UI patterns.

---

## 2. Strict Design System Adherence ("Violet After Dark")
* **Theme Tokens**: Always restyle and adapt any retrieved component code to the signature **Violet After Dark** design system:
  * **Midnight Backgrounds**: `--bg-primary` (`#07040d`), `--bg-secondary` (`#0d0718`), `--bg-tertiary` (`#130b24`), `--bg-surface` (`#180d2f`)
  * **Violet Primary Accents**: `--color-violet` (`#8b5cf6`), `--color-violet-light` (`#a78bfa`), `--color-violet-dark` (`#6d28d9`)
  * **Lavender Accents**: `--color-lavender` (`#c4b5fd`), `--color-lavender-soft` (`#ede9fe`)
  * **Glass Borders**: `--border-subtle` (`rgba(139, 92, 246, 0.16)`), `--border-glow` (`rgba(167, 139, 250, 0.55)`)
  * **Typography**: `--font-sans` (`'Space Grotesk'`) and `--font-mono` (`'JetBrains Mono'`)
* Never leave default Tailwind zinc/slate/gray or stark white backgrounds.

---

## 3. Accessibility & Motion Rules
* **Reduced Motion**: Always support `prefers-reduced-motion: reduce`. Any GSAP, Lenis, or Framer Motion animation must gracefully disable or simplify without causing layout shifts.
* **Interactive Elements**: Maintain unique IDs, visible high-contrast focus rings, and proper keyboard traps for modals and dialogs.

---

## 4. Content Truth & Integrity
* **No Invented Content**: Strictly never fabricate, hallucinate, or alter Radhika Kandalkar's academic stats, projects, dates, or credentials. Always refer to verified entries in [`src/data/content.js`](file:///home/radhika/Desktop/my_portfolio/src/data/content.js).
