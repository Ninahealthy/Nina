<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->



<!-- ================================================================
     AGENTS.md — Universal Agent Rules
     Read by: Claude Code, Gemini, Codex, and all other AI agents
     Single source of truth for all shared project rules.
     ================================================================ -->



---

# Shared Rules

## Environment

- Never run `npm run dev`, `npm run build`, `npm run start`
- Never open a browser preview
- When DevTools output is needed, stop and ask the user to provide it

## Code Style

- No emoji — use modern inline SVG only
- No em dashes ( — ) in any generated text or content
- No third-party libraries — use only official Next.js built-ins, React, and plain CSS

## Components

- Always create reusable components when the same UI pattern appears more than once


## Responsive Design

- Mobile-first always: base styles target small screens, scale up with `min-width` media queries

## CSS / Styling

- No global selectors (`*`, `html body`, etc.) inside `.module.css` files
- Never use plain `border-radius` on cards or images
- Always use `--clip-path-squircle` (defined in `global.css`) on cards and images

## Next.js Imports

| Avoid                    | Use instead                            |
|--------------------------|----------------------------------------|
| `<img src="…">`          | `<Image>` from `next/image`            |
| `<script …>`             | `<Script>` from `next/script`          |
| `<a href="/internal">`   | `<Link href="/internal">` from `next/link` |

---

> See `CONTEXT.md` for project-specific architecture, conventions, and active tasks.
