<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Styling conventions

- Use Tailwind utilities for new and refactored UI, including responsive states, hover and focus.
- Keep `src/app/globals.css` limited to the Tailwind import, theme tokens and document-wide defaults/accessibility.
- Keep component styles beside their markup. Reuse `src/components/styles.ts` for recurring utility recipes; keep complete class names so Tailwind can detect them.
- If CSS is genuinely necessary, use a colocated `*.module.css` and explain why utilities are insufficient. Avoid global component selectors and `@apply` wrappers that recreate a separate CSS framework.
- Preserve the project's documented breakpoints and verify mobile and desktop when changing layout.
