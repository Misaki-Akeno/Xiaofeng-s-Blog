# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 blog using the [Tailwind Next.js Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) template. It uses:
- **Next.js 15** with App Router and React Server Components
- **Tailwind CSS v4** with CSS-based configuration
- **Contentlayer2** for MDX content management
- **Pliny** for analytics, comments, and newsletter integration

## Common Commands

```bash
# Development (uses Yarn as package manager)
yarn dev              # Start development server on localhost:3000

# Build and deploy
yarn build            # Build for production (runs postbuild.mjs for RSS)
yarn serve            # Start production server

# Code quality
yarn lint             # Run ESLint with auto-fix
yarn prettier         # Format code with Prettier
yarn prettier:check   # Check code formatting

# Bundle analysis
yarn analyze          # Analyze bundle size with @next/bundle-analyzer
```

## Architecture

### Content Management with Contentlayer

Content is defined in `contentlayer.config.ts` and processed through Contentlayer:

- **Blog posts**: `data/blog/**/*.mdx` - MDX files with frontmatter (title, date, tags, draft, etc.)
- **Authors**: `data/authors/**/*.mdx` - Author profiles
- **Generated files**: Contentlayer generates typed content in `.contentlayer/`
- **Tag data**: `app/tag-data.json` is auto-generated during build
- **Search index**: `public/search.json` is auto-generated for kbar search

Content frontmatter schema is defined in `contentlayer.config.ts`. Computed fields include `readingTime`, `slug`, `path`, and `toc`.

### MDX Processing Pipeline

MDX content goes through a remark/rehype pipeline configured in `contentlayer.config.ts`:

**Remark plugins**: GFM, math, code titles, image-to-JSX, GitHub alerts
**Rehype plugins**: Slug generation, autolink headings, KaTeX for math, citations, Prism Plus for syntax highlighting

Custom MDX components can be added in `components/MDXComponents.tsx`.

### Layout System

Three post layouts available (configured via frontmatter `layout` field):
- `PostLayout` (default): Two-column layout with author info and TOC
- `PostSimple`: Simplified single-column layout
- `PostBanner`: Full-width banner image layout

Two listing layouts:
- `ListLayout`: With search bar
- `ListLayoutWithTags`: With tag sidebar (default)

### Configuration Files

- `data/siteMetadata.js` - Site info, analytics, comments, newsletter, search config
- `data/headerNavLinks.ts` - Navigation links
- `data/projectsData.ts` - Projects page data
- `next.config.js` - Next.js config with Content Security Policy headers
- `css/tailwind.css` - Tailwind v4 theme configuration (colors, fonts)

### Post Build Process

`scripts/postbuild.mjs` runs after Next.js build to generate:
- RSS feed via `scripts/rss.mjs`

### Environment Variables

Required for features to work:
- `NEXT_PUBLIC_GISCUS_*` - Giscus comments (see `.env.example`)
- `BUTTONDOWN_API_KEY` - Newsletter provider
- `NEXT_UMAMI_ID` - Umami analytics

### Static Export

For static hosting (GitHub Pages, etc.):
```bash
EXPORT=1 UNOPTIMIZED=1 yarn build
```
For deployment with base path:
```bash
EXPORT=1 UNOPTIMIZED=1 BASE_PATH=/myblog yarn build
```

Note: Static export requires commenting out `headers()` in `next.config.js` and removing API routes.
