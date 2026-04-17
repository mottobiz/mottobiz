# CHANGELOG.md - MottoBiz Version History

All notable changes to the MottoBiz project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [2.8.0] - 2026-04-17

### Fixed

#### Architecture
- **`getEnrichedArticle()`** — Now searches both `ARTICLES` and `LOCATION_SERVICE_ARTICLES` arrays. Location articles can now use the full enrichment system.
- **Generator functions** — `generateFAQ()`, `generateSEO()`, `generateInternalLinks()`, and `generateRelatedSlugs()` all updated to search both article arrays.
- **TypeScript conflict** — Removed duplicate `ArticleEnrichment` type declaration from `articles.ts`. Type is now imported from `types/article.ts`.
- **Build error** — Fixed `articles-content.ts` missing closing backtick for `business-automation-jahangirabad` template literal.
- **Duplicate slug** — `website-development-varachha` existed in both `ARTICLES` and `LOCATION_SERVICE_ARTICLES`. LOCATION version renamed to `website-development-varachha-location` across all references + sitemap.

#### Content
- **FAQ coverage** — Added 26 new FAQ entries covering all 20 location articles and 6 comparison articles (whatsapp-api-vs-360dialog, make-vs-zapier, whatsapp-business-vs-instagram-business, website-vs-google-business-profile, manual-followups-vs-automated, email-vs-whatsapp-business).
- **Enrichment databases** — Added `STATCARDS_DATABASE`, `CHECKLISTS_DATABASE`, `STEPS_DATABASE`, `PROTIPS_DATABASE`, and `WARNINGS_DATABASE` for all 75 articles to `articles.ts`.
- **`getInteractiveBlocks()`** — Full implementation added to `articles.ts` for interactive article components.
- **WhatsApp links** — 20 hardcoded `https://wa.me/917487957972` URLs replaced with config-based replacement at render time in `ArticlePage.tsx`.

#### Counts
- **`CATEGORY_INFO`** — Updated: industries: 43, comparisons: 9, guides: 3, case-studies: 1, locations: 20.
- **`INDUSTRY_HUBS`** — Updated article counts: Textile & Diamond: 19, Restaurants & Food: 15, Real Estate: 14, Coaching & Education: 11, Retail & Consumer: 12.

---

## [2.7.0] - 2026-04-16

### Added

#### Performance
- **Code splitting** — All 5 route pages lazy-loaded via `React.lazy` + `Suspense`. Initial JS bundle dropped from 740KB to 192KB (60KB gzipped). Articles data (259KB) loads only when visiting `/resources`.
- **Error boundary** — `ErrorBoundary` component wrapping all routes with styled error screen and refresh button.

#### Content System
- **20 location articles** — Added `LOCATION_SERVICE_ARTICLES[]` for Surat area-specific content (Katargam, Udhna, Ring Road, Nanpura, City Light, Parle Point, Chowk Bazar, Rander, Palanpur, Jahangirabad, Vesu, Adajan, Varachha, Athwa, Piplod).
- **TL;DR database** — 3-5 key takeaway bullets for every article, injected before first H2 heading via `TLDR_DATABASE` + `getTLDR()`.
- **Hand-written FAQs** — All 75 articles now have 3 specific Q&A pairs in `FAQ_DATABASE`. FAQ schema markup renders on every article page.
- **Comparison tables** — 12 articles have interactive comparison tables (markdown table parser + dedicated content tables for n8n-vs-make, whatsapp-business-api-vs-automation, getting-started-business-automation, etc.).
- **Article thumbnails** — Dynamic SVG component (`ArticleThumbnail.tsx`) with category-colored gradients and emoji icon map per article slug.
- **SEO enrichment** — `getEnrichedArticle()` auto-generates meta titles, descriptions, keywords, FAQ, internal links, related articles, and TLDR for every article.
- **8 interactive components** — ComparisonTable, StatCards, Checklist, Steps, ProTip, Warning, CTABox, TLDRBox in `ArticleComponents.tsx`.
- **Article content parser** — Detects markdown headings, bullets, numbered lists, tables, and TLDR patterns, rendering them as styled React components.

### Changed
- **Sitemap** — Updated with all 75 article URLs plus `/privacy` and `/terms`.

---

## [2.5.0] - 2026-04-16

### Added

#### Performance
- **Code splitting** — All 5 route pages lazy-loaded via `React.lazy` + `Suspense`. Initial JS bundle dropped from 740KB to 192KB (60KB gzipped). Articles data (259KB) loads only when visiting `/resources`.
- **Error boundary** — `ErrorBoundary` component wrapping all routes with styled error screen and refresh button.

#### Content System
- **57 articles** across 5 industry pillars (Textile & Diamond, Restaurants & Food, Real Estate, Coaching & Education, Retail & Consumer) plus comparisons, guides, and location pages.
- **TL;DR database** — 3-5 key takeaway bullets for every article, injected before first H2 heading via `TLDR_DATABASE` + `getTLDR()`.
- **Hand-written FAQs** — All 57 articles now have 3 specific Q&A pairs in `FAQ_DATABASE` (up from 6). FAQ schema markup renders on every article page.
- **Comparison tables** — 12 articles have interactive comparison tables (markdown table parser + dedicated content tables for n8n-vs-make, whatsapp-business-api-vs-automation, getting-started-business-automation, etc.).
- **Article thumbnails** — Dynamic SVG component (`ArticleThumbnail.tsx`) with category-colored gradients and emoji icon map per article slug.
- **SEO enrichment** — `getEnrichedArticle()` auto-generates meta titles, descriptions, keywords, FAQ, internal links, related articles, and TLDR for every article.
- **8 interactive components** — ComparisonTable, StatCards, Checklist, Steps, ProTip, Warning, CTABox, TLDRBox in `ArticleComponents.tsx`.
- **Article content parser** — Detects markdown headings, bullets, numbered lists, tables, and TLDR patterns, rendering them as styled React components.
- **Legal pages** — Privacy Policy (`/privacy`) and Terms of Service (`/terms`) with Framer Motion animations and proper SEO.

#### Lead Form
- **WhatsApp fallback** — When `VITE_LEAD_WEBHOOK_URL` is empty (default), form submissions redirect to WhatsApp with pre-filled name, phone, email, and business type instead of showing an error.
- **Environment variable** — `VITE_LEAD_WEBHOOK_URL` configurable via `.env` file. Set it to a Make/n8n endpoint to POST form data.
- **Error recovery** — If webhook POST fails, falls back to WhatsApp redirect instead of showing an error message.

### Changed
- **App.tsx** — Refactored to use `React.lazy` + `Suspense` for all 5 route pages. Added `ErrorBoundary` wrapper.
- **Navbar** — Resources link now visible on both homepage and other pages.
- **Footer** — Added links to Privacy Policy and Terms of Service.
- **Sitemap** — Updated with all 57 article URLs plus `/privacy` and `/terms`.

### Fixed
- Form submission no longer shows "Form temporarily unavailable" — redirects to WhatsApp with form data pre-filled.
- Bundle size warning resolved through code splitting (no single chunk over 500KB).

---

## [2.0.0] - 2026-04-14

### Added

#### Resources Hub
- **Resources page** — Full hub with category filtering, search, industry hubs, and featured articles.
- **Article detail pages** — Dynamic routing at `/resources/:slug` with rich content rendering.
- **Article grid** — Responsive grid with load-more pagination.
- **Category filter** — Pill-based category filter with search.
- **Resources hero** — Hero section with newsletter CTA and WhatsApp button.

#### Content Generation
- **CONTENT_STRATEGY.md** — 1,892-line master framework for content creation.
- **Article brief templates** — Reusable templates for consistent article output.
- **Quality checklists** — Proofreading and AI detection avoidance guidelines.
- **5 full articles** with SEO metadata (Textile & Diamond pillar).

---

## [1.0.1] - 2026-04-13

### Changed
- **Deployment Method:** Switched from GitHub Actions FTP to Hostinger Git Integration
- More reliable deployment, faster deploy times, no FTP credentials in secrets

### Added
- `deploy.ps1` — PowerShell deployment script with interactive prompts
- `deploy.bat` — Windows batch wrapper for one-click deployment
- `CONTEXT.md` — Comprehensive project context and execution memory
- `.env` to `.gitignore` — Security improvement

### Security
- Added `.env` and `.env.*.local` to `.gitignore`

---

## [1.0.0] - 2026-04-10 to 2026-04-12

### Added - Initial Production Release

#### Core Website
- Complete landing page with 10 sections
- Custom cursor (pointer devices only)
- Animated background with gradient orbs
- Scroll-triggered fade-up animations
- Glass morphism card effects

#### Form & Integration
- React Hook Form + Zod validation
- WhatsApp integration
- Graceful error handling

#### SEO
- JSON-LD LocalBusiness + ServiceArea schema
- Open Graph and Twitter Card tags
- Canonical URLs and geo meta tags

#### Documentation
- AGENTS.md, PRD.md, TASKS.md, ROADMAP.md, TECHSTACK.md, ARCHITECTURE.md, DESIGN.md, CHANGELOG.md

---

## Versioning Strategy

We use [Semantic Versioning](https://semver.org/spec/v2.0.0.html):
- **MAJOR** — Incompatible changes, major redesigns
- **MINOR** — New features, sections, functionality
- **PATCH** — Bug fixes, documentation, optimizations

---

## References

- See `CONTEXT.md` for detailed execution context
- See `ROADMAP.md` for future plans
- See `TASKS.md` for task-level tracking
