# Mottobiz ΓÇö Project Status

**Last Updated:** 2026-05-06  
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
- **Deployment:** Static SPA on mottobiz.com

## Architecture
- `src/App.tsx` ΓÇö Main SPA with React Router (10+ routes)
- `src/components/` ΓÇö Hero, Services, Pain, Proof, HowItWorks, Qualifier, FAQ, FinalCTA, LeadMagnet, Navbar, Footer
- `src/pages/` ΓÇö Service hub pages (6) for each vertical
- `src/seo/SEOHead.tsx` ΓÇö Dynamic meta tag injection
- `src/utils/config.ts` ΓÇö Centralized business config
- `public/` ΓÇö robots.txt, sitemap.xml, .htaccess, llms.txt

## Critical Issues (May 2026 Audit)

### ≡ƒö┤ Critical (Fix Immediately)
1. **No mobile navigation menu** ΓÇö Hamburger button exists but doesn't toggle. Mobile users CANNOT navigate the site except by scrolling. This is a deal-breaker UX issue.
2. **No SSR/prerendering** ΓÇö SPA renders empty `<div id="root">` for crawlers. Search engines and social media see blank content. ALL meta tags are client-rendered only.

### ≡ƒƒí High Priority
3. **Title says "Web Design"** ΓÇö Should emphasize "AI Business Automation" to match actual services
4. **No CSRF protection** on forms
5. **Duplicate LocalBusiness schema** ΓÇö Hero and Footer both have microdata AND JSON-LD, causing conflicts
6. **Missing AggregateRating schema** for "4.9/5" claim
7. **Service cards have no outbound links** to hub pages
8. **Footer service areas are plain text** ΓÇö not linked to hub pages
9. **Missing `twitter:site` tag**
10. **No tests at all**

### ≡ƒƒí Medium Priority
11. **No BreadcrumbList schema**
12. **No SearchAction schema**
13. **`/privacy` and `/terms` lack custom titles/descriptions**
14. **Form input name duplication** in Contact section
15. **Static fallback meta tags needed in index.html** for crawler compatibility

## SEO Priority Fixes
1. **Implement prerendering** ΓÇö Use react-snap, react-helmet-async, or migrate to Next.js
2. **Fix mobile nav** ΓÇö hamburger toggle must work
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
npm run preview       # Preview production build
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
- [ ] Implement SSR/prerendering (critical for SEO)
- [ ] Update page title to "AI Business Automation"
- [ ] Remove duplicate LocalBusiness microdata
- [ ] Add AggregateRating schema
- [ ] Link service cards and footer to hub pages
- [ ] Add CSRF protection to contact forms
- [ ] Add static fallback meta tags to index.html
- [ ] Add BreadcrumbList and SearchAction schemas
- [ ] Add test suite
