# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal Chinese-language blog for Meowjay Zhou, built on Astro 6 with Tailwind CSS 4. Deployed to Cloudflare Workers. Content is authored in Obsidian and stored as Markdown in `src/contents/posts/`.

## Commands

```bash
pnpm dev            # Start dev server
pnpm build          # Type-check → build → pagefind index → copy pagefind to public/
pnpm preview        # Preview built site locally
pnpm format         # Auto-format with Prettier
pnpm format:check   # Check formatting without writing
pnpm lint           # ESLint
pnpm cf:preview     # Build + preview on Cloudflare Workers locally
pnpm cf:deploy      # Build + deploy to Cloudflare Workers
```

There are no unit tests. Type-checking is run as part of `pnpm build`.

## Architecture

### Content Layer

Posts live in `src/contents/posts/` as Markdown files. The collection schema is defined in `src/content.config.ts`. Key frontmatter fields:

- `pubDatetime` (required) — controls sort order and scheduling
- `draft: true` — hides post from production; drafts in progress often live in `_`-prefixed subdirectories
- `featured: true` — shows on homepage feature section
- `tags` — array of strings; drives the `/tags/` pages
- `timezone` — overrides the site default (`Asia/Shanghai`) for datetime display

The Obsidian vault config (`.obsidian/`) and `_bases/` template directory are excluded from Astro's watch and the sitemap.

### Site Config

All site-wide settings are in `src/config.ts` (exported as `SITE`). Social links and the default copyright license are in `src/constants.ts`.

### Routing

| URL pattern | Source |
|---|---|
| `/` | `src/pages/index.astro` |
| `/posts/` | `src/pages/posts/[...page].astro` |
| `/posts/[slug]/` | `src/pages/posts/[...slug]/index.astro` |
| `/tags/[tag]/` | `src/pages/tags/[tag]/[...page].astro` |
| `/archives/` | `src/pages/archives/index.astro` |
| `/search/` | `src/pages/search.astro` (Pagefind) |

### OG Images

Generated at build time with Satori + Sharp. `src/pages/og.png.ts` is the default; `src/pages/posts/[...slug]/index.png.ts` generates per-post images. `SITE.dynamicOgImage` controls whether dynamic generation is enabled.

### Search

Full-text search uses [Pagefind](https://pagefind.app/). The index is built during `pnpm build` (after Astro build) and output to `dist/pagefind/`, then copied to `public/pagefind/` so it's available in dev mode.

### Styling

Tailwind CSS 4 via Vite plugin (no `tailwind.config.*` file — config is done in `src/styles/global.css` with `@theme`). Typography styles for prose content are in `src/styles/typography.css`. GitHub-style alerts from `remark-github-alert` are styled in `src/styles/alerts.css`.

### Fonts

LXGW Bright (local) is the primary font, loaded via `astro-font-fallback` in `Layout.astro`. Font files are in `src/assets/fonts/`.

### Comments

Artalk comment system, configured in `src/components/Comment.astro`.

## Path Alias

`@/*` resolves to `src/*` (configured in `tsconfig.json`).

## Linting Rules

ESLint is configured with `no-console: error` — avoid `console.*` calls in source files.
