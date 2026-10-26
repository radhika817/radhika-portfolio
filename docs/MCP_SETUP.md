# Model Context Protocol (MCP) Setup & Architecture

This document outlines the Model Context Protocol (MCP) integrations configured for Radhika Kandalkar's developer portfolio during the `feature/mcp-design-upgrade` initiative.

---

## 1. Overview & Objective

The Model Context Protocol (MCP) enables our AI coding assistants (such as Antigravity) to communicate with external developer tools, component registries, and design ecosystems through standardized protocol transports.

For this portfolio, MCP servers provide:
1. **Accurate Component Structure:** Real-time access to official, accessible shadcn/ui primitives.
2. **Design Inspiration:** Curated community component and layout ideas from 21st.dev without manual copy-pasting.
3. **Consistency:** Automated verification that all generated UI conforms strictly to the portfolio's **Violet After Dark** design tokens.

---

## 2. Configured MCP Servers

### A. shadcn/ui MCP Server (`shadcn`)
* **Registry Documentation:** [ui.shadcn.com/docs/mcp](https://ui.shadcn.com/docs/mcp)
* **Purpose:** Inspects, lists, and scaffolds standard, accessible Radix-based UI components (buttons, dialogs, badges, inputs, tooltips, cards, sonner toasts).
* **Transport Mechanism:** Stdio
* **Execution Command:**
  ```bash
  npx shadcn@latest mcp
  ```
* **Authentication:** None required (queries public open-source registry).

### B. 21st.dev Magic MCP Server (`21st` / `@21st-dev/magic`)
* **Service Documentation:** [21st.dev/mcp](https://21st.dev/mcp)
* **Purpose:** Searches a curated catalog of modern community React and Tailwind components, hero patterns, and interactive micro-interactions for design inspiration.
* **Transport Mechanism:** Stdio
* **Execution Command:**
  ```bash
  npx -y @21st-dev/magic@latest
  ```
* **Authentication:** Requires a 21st.dev API key (`API_KEY` / `TWENTY_FIRST_API_KEY` / `TWENTYFIRST_TOKEN`).
* **Security Handling:** API keys are never stored in version control. They are read from environment variables or an untracked local environment file (`.env` or `.env.local`), which are strictly ignored in `.gitignore`.

---

## 3. Antigravity MCP Configuration Format

Antigravity discovers MCP servers either at the global level (`~/.gemini/config/mcp_config.json`) or at the workspace level via project customizations (`.agents/mcp_config.json` or `.agents/plugins/<name>/mcp_config.json`).

Configuration schema follows standard Stdio transport definitions:

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    },
    "21st": {
      "command": "npx",
      "args": ["-y", "@21st-dev/magic@latest"],
      "env": {
        "API_KEY": "${API_KEY_21ST}"
      }
    }
  }
}
```

---

## 4. Development & Assistant Rules

When implementing new components using MCP assistance:

1. **Component Structure:** Query the `shadcn` MCP server for semantic markup, accessibility (ARIA attributes), and standard keyboard navigation.
2. **Design Inspiration:** Query the `21st.dev` MCP server for visual inspiration, creative layouts, and aesthetic patterns.
3. **Token Compliance:** Always re-theme and re-style any fetched components to match the **Violet After Dark** design system:
   - Midnight backgrounds (`#07040d`, `#0d0718`, `#130b24`)
   - Violet primary accents (`#8b5cf6`, `#a78bfa`)
   - Lavender highlights (`#c4b5fd`, `#ede9fe`)
   - Subtle glassmorphic borders (`rgba(139, 92, 246, 0.16)`)
4. **Motion & Accessibility:** Preserve `prefers-reduced-motion` compliance across all Framer Motion and GSAP animations.
5. **Data Integrity:** Never invent or hallucinate portfolio credentials, project achievements, or personal background facts.
