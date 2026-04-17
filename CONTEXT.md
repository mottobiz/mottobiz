# CONTEXT.md - Project Context & Memory

## Document Purpose

This file serves as the **single source of truth** for the current state of the MottoBiz project. It captures recent changes, execution learnings, troubleshooting steps, architectural decisions, and strategic context.

**Last Updated:** 2026-04-17
**Project Status:** Production Ready (v2.8)
**Current Focus:** Fix 3 and Fix 4 both complete

---

## Quick Status

| Aspect | Status | Notes |
|--------|--------|-------|
| Landing Page | ✅ Live | https://mottobiz.com |
| Lead Form | ✅ Working | WhatsApp fallback when webhook empty |
| WhatsApp Integration | ✅ Working | Config-based links + form pre-fill |
| SEO Schema | ✅ Implemented | LocalBusiness + ServiceAreas + Article + FAQPage |
| Deployment | ✅ Automated | Git + Hostinger auto-deploy |
| Resources Hub | ✅ Live | `/resources` with filtering, search, industry hubs |
| Article Pages | ✅ Live | `/resources/:slug` dynamic routing |
| Per-Article OG Images | ✅ Done | 58 PNGs auto-generated in `public/og/` |
| SEO Enrichment | ✅ Complete | FAQ schema for all articles |
| TL;DR Boxes | ✅ All articles | TLDR_DATABASE entries |
| Privacy Policy | ✅ Live | `/privacy` |
| Terms of Service | ✅ Live | `/terms` |
| Sitemap | ✅ Updated | All article URLs + static pages |
| Article Data | ✅ 75 articles | 55 ARTICLES + 20 LOCATION_SERVICE_ARTICLES |
| FAQ Coverage | ✅ 85 entries | All 75 articles + 10 shared articles |
| Architecture | ✅ Fixed | getEnrichedArticle() + generateFAQ/SEO/Links/Related all search both arrays |
| Enrichment Databases | ✅ Complete | StatCards, Checklist, ProTip, Warning for all 75 articles |
| WhatsApp Links | ✅ Fixed | Config-based replacement at render time |

---

## Architecture Overview

### Project Structure
```
src/
├── data/
│   └── articles.ts           # Monolithic barrel file (~5,400 lines)
│                              # Contains: ARTICLES[55], LOCATION_SERVICE_ARTICLES[20],
│                              # ARTICLE_CONTENT{}, all enrichment databases, helpers
├── components/
│   ├── effects.tsx, SEOHead.tsx, ErrorBoundary.tsx, Navbar.tsx, Hero.tsx
│   ├── Footer.tsx, LeadMagnet.tsx, FAQ.tsx, FinalCTA.tsx
│   └── resources/
│       ├── ArticleCard.tsx, ArticleThumbnail.tsx, ArticleGrid.tsx
│       ├── CategoryFilter.tsx, ResourcesHero.tsx, ResourcesPage.tsx
│       ├── ArticleComponents.tsx  # StatCards, Checklist, Steps, ProTip, Warning, CTABox, TLDRBox
│       └── HubPage.tsx           # Reusable hub page component
├── pages/
│   ├── HomePage.tsx, ResourcesPage.tsx, ArticlePage.tsx
│   ├── PrivacyPolicy.tsx, TermsOfService.tsx
│   ├── industries/               # Industry hub pages
│   │   └── TextileDiamondHubPage, CoachingEducationHubPage, RealEstateHubPage,
│   │       RestaurantFoodHubPage, RetailConsumerHubPage
│   └── locations/               # Location hub pages
│       └── VarachhaHubPage, KatargamHubPage, VesuHubPage, AdajanHubPage, OtherAreasHubPage
├── types/article.ts          # Types + CATEGORY_INFO + INDUSTRY_HUBS
└── lib/config.ts             # ⭐ All contact/business constants (never hardcode)
public/
├── sitemap.xml
├── og-image.png (default)
└── og/                      # Per-article OG images (58 PNGs)
dist/                          # Production build output (deployed to Hostinger)
```

### Data Architecture
- Single barrel file `articles.ts` (~5,400 lines) containing all article data and helper functions
- `getEnrichedArticle()` searches both `ARTICLES` and `LOCATION_SERVICE_ARTICLES`
- `generateFAQ()`, `generateSEO()`, `generateInternalLinks()`, `generateRelatedSlugs()` all search both arrays
- All enrichment databases (TLDR, FAQ, StatCards, Checklists, ProTips, Warnings) keyed by slug — entries for both article types
- WhatsApp links replaced at render time in `ArticlePage.tsx` using `.replace(/https:\/\/wa\.me\/917487957972/g, WHATSAPP_LINK)`
- Build-time OG image generation: `npm run generate:og` (uses sharp)

### Article Counts
- Total: 75 articles (55 main + 20 location)
- Categories: industries: 43, comparisons: 9, guides: 3, case-studies: 1, locations: 20
- FAQ_DATABASE: 85 entries (all 75 articles + 10 shared articles)
- TLDR_DATABASE: covers all main + location articles
- STATCARDS_DATABASE: covers all 75 articles
- CHECKLISTS_DATABASE: covers all 75 articles
- PROTIPS_DATABASE: covers all 75 articles
- WARNINGS_DATABASE: covers all 75 articles

---

## Key Rules

### Contact Info
- All contact info from `src/lib/config.ts` — never hardcode
- `WHATSAPP_NUMBER`, `WHATSAPP_LINK`, `EMAIL`, `PHONE_DISPLAY`
- `LEAD_WEBHOOK_URL` from `VITE_LEAD_WEBHOOK_URL` — empty = WhatsApp fallback

### Design System
- Colors, fonts, animations in `src/index.css` and `src/lib/animations.ts` are frozen
- Design tokens: `glass`, `glass-hover`, `text-gradient`, `text-gradient-gold`, `btn-primary`, `btn-secondary`, `card`, `number-badge`, `section-divider`

### Content Rules
- See `AGENTS.md` and `CONTENT_STRATEGY.md` for mandatory rules
- Every article needs: SEO fields, FAQ (min 3), internal links (min 3), TL;DR, Surat refs (min 3)
- Article slugs are unique — `ARTICLES` + `LOCATION_SERVICE_ARTICLES` must not overlap
- Use `WHATSAPP_LINK` from config for WhatsApp links — never hardcode wa.me URLs

---

## Recent Execution Log

### 2026-04-17: Fix 3 + Fix 4 Complete

**Fix 3 — Architecture & FAQ Coverage:**

1. Fixed `articles-content.ts` — missing closing backtick for `business-automation-jahangirabad` template literal
2. Fixed `website-development-varachha` duplicate — renamed LOCATION version to `website-development-varachha-location` across all 4 files + sitemap
3. Updated `CATEGORY_INFO.count` in `types/article.ts`: industries: 25→43, comparisons: 11→7
4. Updated `INDUSTRY_HUBS[].articles` counts in `types/article.ts`: Textile: 13→19, Restaurants: 11→15, Real Estate: 10→14, Coaching: 8→11, Retail: 7→12
5. **Architecture fix:** Updated `getEnrichedArticle()` to search both `ARTICLES` and `LOCATION_SERVICE_ARTICLES`
6. **Architecture fix:** Updated `generateFAQ()`, `generateSEO()`, `generateInternalLinks()`, `generateRelatedSlugs()` to search both arrays
7. **FAQ additions:** Added 26 new FAQ entries to `FAQ_DATABASE`:
   - All 20 location articles (textile-automation-katargam through coaching-automation-city-light)
   - 6 comparison articles (whatsapp-api-vs-360dialog, make-vs-zapier, whatsapp-business-vs-instagram-business, website-vs-google-business-profile, manual-followups-vs-automated, email-vs-whatsapp-business)

**Fix 4 — Enrichment & WhatsApp Links:**

1. Added all 20 `LOCATION_SERVICE_ARTICLES` to `articles.ts` (metadata objects)
2. Added all enrichment databases to `articles.ts`:
   - `STATCARDS_DATABASE` — StatCards for all 75 articles
   - `CHECKLISTS_DATABASE` — Checklists for all 75 articles
   - `STEPS_DATABASE` — Steps for main articles
   - `PROTIPS_DATABASE` — ProTips for all 75 articles
   - `WARNINGS_DATABASE` — Warnings for all 75 articles
3. Added `getInteractiveBlocks()` implementation to `articles.ts`
4. Added `ArticleEnrichment` type to `types/article.ts`
5. Fixed TypeScript conflict — removed local `type ArticleEnrichment` declaration from `articles.ts` (was conflicting with import from `@/types/article`)
6. **WhatsApp link fix:** In `ArticlePage.tsx`, article content now has hardcoded `https://wa.me/917487957972` replaced at render time using `.replace(/https:\/\/wa\.me\/917487957972/g, WHATSAPP_LINK)`

**Key Discoveries:**
- `getEnrichedArticle()` only searched `ARTICLES` — location articles couldn't use the enrichment system
- `website-development-varachha` existed in both arrays with identical slugs (ARTICLES won in `getArticleBySlug`)
- TLDR_DATABASE and FAQ_DATABASE are separate objects — same key in both is fine
- Count mismatch: `CATEGORY_INFO` and `INDUSTRY_HUBS` had wrong numbers from earlier content additions
- `ArticleEnrichment` type defined in both `articles.ts` (local) and `types/article.ts` — caused TS2440 conflict
- The monolithic `articles.ts` is the canonical file — split files from earlier session were never integrated and don't exist in current codebase

---

## Technical Debt & Known Issues

| Item | Priority | Status | Notes |
|------|----------|--------|-------|
| Fix 3 & Fix 4 | Done | ✅ | Both complete, build passes |
| Per-Article OG Images | Done | ✅ | 58 PNGs auto-generated |
| Google Analytics 4 | Medium | Pending | Needs GA measurement ID |
| Webhook URL Configuration | Medium | Ready | VITE_LEAD_WEBHOOK_URL configured |

---

## How to Update This File

1. **After significant changes:** Add entry to "Recent Execution Log"
2. **When status changes:** Update "Quick Status" table
3. **After content created:** Update article counts
4. **Regularly:** Update "Last Updated" date

---

**Last Updated:** 2026-04-17
**Version:** 2.8 — Fix 3 + Fix 4 complete, build passes, all 75 articles fully enriched
