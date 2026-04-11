# Portfolio v4

## Project Rules

- Make no assumptions, always ask for clarification before making decisions.
- Do not invent content. All content must come from the existing Framer site or be provided by Mariah.

## Tech Stack

- **Framework:** Astro 6 (static default, hybrid SSR for protected routes)
- **Styling:** Tailwind CSS v4 with two-tier token system (primitives + semantic) defined in `src/styles/global.css`
- **Content:** MDX via Astro Content Collections (glob loader)
- **Font:** Geist (variable, self-hosted at `/fonts/Geist-Variable.woff2`)
- **Deployment:** Vercel via `@astrojs/vercel` adapter

## Architecture

- **Token system:** Primitives (`--color-primitive-*`) are source values never used directly. Semantic tokens (`--color-foreground`, `--color-muted`, etc.) reference primitives and are used in markup.
- **Password protection:** Per-project `protected: true` in MDX frontmatter. Single shared password via `SITE_PASSWORD` env var. Middleware checks cookie, redirects to `/password` page. Cookie is HttpOnly, 7-day expiry.
- **Content collections:** Schema in `src/content.config.ts`. Projects use glob loader with MDX files in `src/content/projects/`.
- **SSR routes:** Only `projects/[slug].astro`, `password.astro`, and `api/auth.ts` are server-rendered (`prerender = false`). All other pages are static.

## Key Files

- `src/styles/global.css` — Token system and base styles
- `src/content.config.ts` — Content collection schema
- `src/middleware.ts` — Password protection middleware
- `src/components/SectionRow.astro` — Core two-column layout component
- `src/pages/projects/[slug].astro` — Dynamic project page template
- `src/pages/api/auth.ts` — Password validation endpoint

## Development

- Dev server: `npm run dev` (port 4567 configured in `.claude/launch.json`)
- Build: `npm run build`
- Set `SITE_PASSWORD` in `.env` locally and in Vercel dashboard for production
