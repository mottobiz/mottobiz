# Mottobiz — Project Status

**Last Updated:** 2026-07-15  
**Repository:** github.com/mottobiz/mottobiz  
**Branch:** main  
**URL:** mottobiz.com  

## Overview
Business automation services website. Single-page React application offering AI-powered business automation, CRM, and workflow solutions to small and medium businesses.

## Tech Stack
- **Framework:** React 19 + TypeScript + Vite
- **UI:** Tailwind CSS + custom animations
- **SEO:** JSON-LD schemas, dynamic MetaTags component, robots.txt, sitemap.xml
- **Analytics:** Google Analytics 4
- **Pre-Rendering:** Static Site Generation (SSG) via Puppeteer (`build:full` / `prerender.mjs` script)
- **Deployment:** Static pre-rendered SPA served directly via Apache/Hostinger

## Architecture
- `src/App.tsx` — Main SPA with React Router (10+ routes)
- `src/components/` — Hero, Services, Pain, Proof, HowItWorks, Qualifier, FAQ, FinalCTA, LeadMagnet, Navbar, Footer
- `src/pages/` — Service hub pages (6) for each vertical
- `src/seo/SEOHead.tsx` — Dynamic meta tag injection
- `src/utils/config.ts` — Centralized business config
- `public/` — robots.txt, sitemap.xml, .htaccess, llms.txt
- `scripts/prerender.mjs` — Puppeteer crawler to generate static HTML directories

## Critical Issues (July 2026 Audit)

### 🔴 Critical (Fix Immediately)
1. **No mobile navigation menu** — Hamburger button exists but doesn't toggle. Mobile users CANNOT navigate the site except by scrolling. This is a deal-breaker UX issue.

### 🟡 High Priority
2. **Title says "Web Design"** — Should emphasize "AI Business Automation" to match actual services
3. **No CSRF protection** on forms
4. **Duplicate LocalBusiness schema** — Hero and Footer both have microdata AND JSON-LD, causing conflicts
5. **Missing AggregateRating schema** for "4.9/5" claim
6. **Service cards have no outbound links** to hub pages
7. **Footer service areas are plain text** — not linked to hub pages
8. **Missing `twitter:site` tag**
9. **No tests at all**

### 🟢 Medium Priority
10. **No BreadcrumbList schema**
11. **No SearchAction schema**
12. **`/privacy` and `/terms` lack custom titles/descriptions**
13. **Form input name duplication** in Contact section
14. **Static fallback meta tags needed in index.html** for crawler compatibility

## SEO Priority Fixes (Completed & Pending)
1. ✅ **Implement prerendering** — Completed via Puppeteer SSG pre-renderer compiling all 112 routes to HTML directories (July 4, 2026).
2. **Fix mobile nav** — hamburger toggle must work
3. **Update title** from "Web Design" to "AI Business Automation"
4. **Remove duplicate LocalBusiness microdata** from Hero/Footer
5. **Add AggregateRating schema** for the 4.9/5 claim
6. **Link service cards and footer areas** to hub pages
7. **Add static fallback meta tags** in index.html
8. **Add BreadcrumbList and SearchAction schemas**

## Development Setup
```bash
cd Mottobiz
npm install
npm run dev          # Vite development server
npm run build        # Production build
npm run prerender    # Execute static pre-rendering crawler
npm run build:full   # Build + pre-render static HTML pipeline
npm run preview      # Preview production build
npm run lint         # ESLint
```

## Key Paths
- App: `src/App.tsx`
- Components: `src/components/`
- Hub Pages: `src/pages/`
- SEO: `src/seo/SEOHead.tsx`
- Config: `src/utils/config.ts`
- Sitemap: `public/sitemap.xml`
- Robots: `public/robots.txt`

## Pending Tasks
- [ ] Fix mobile navigation (hamburger toggle)
- [x] Implement SSR/prerendering (critical for SEO)
- [ ] Update page title to "AI Business Automation"
- [ ] Remove duplicate LocalBusiness microdata
- [ ] Add AggregateRating schema
- [ ] Link service cards and footer to hub pages
- [ ] Add CSRF protection to contact forms
- [ ] Add static fallback meta tags to index.html
- [ ] Add BreadcrumbList and SearchAction schemas
- [ ] Add test suite
