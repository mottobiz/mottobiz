# ARCHITECTURE.md - System Architecture Documentation

## System Overview

MottoBiz is a React SPA with code-split routing, rich content rendering, and SEO optimization. The architecture follows a component-based approach with clear separation of concerns and a data-driven content system.

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER                                  │
├─────────────────────────────────────────────────────────────────┤
│  React App (SPA)                                                │
│  ├── Suspense + ErrorBoundary                                   │
│  │   ├── HomePage (lazy)                                        │
│  │   ├── ResourcesPage (lazy)                                   │
│  │   ├── ArticlePage (lazy) ← rich content parser               │
│  │   ├── PrivacyPolicy (lazy)                                   │
│  │   └── TermsOfService (lazy)                                 │
│  ├── Navbar + Footer                                            │
│  ├── SEOHead + HelmetProvider                                   │
│  └── CustomCursor + AnimatedBackground                         │
└──────────────────────────┬──────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│  Google Fonts │  │   WhatsApp    │  │   Webhook     │
│   (CDN)       │  │   (wa.me)     │  │  (Make/n8n)   │
└───────────────┘  └───────────────┘  └───────────────┘
```

---

## Component Architecture

### Page Hierarchy

```
App (Suspense + ErrorBoundary)
├── SEOHead                    # Meta tags, JSON-LD schema
├── CustomCursor               # Pointer device cursor (fine media query)
├── AnimatedBackground         # Gradient orb effect
│
├── Routes
│   ├── / → HomePage (lazy)
│   │   ├── Navbar
│   │   ├── Hero
│   │   ├── Pain
│   │   ├── Proof
│   │   ├── Services
│   │   ├── HowItWorks
│   │   ├── Qualifier
│   │   ├── SocialProof
│   │   ├── LeadMagnet         # Form with WhatsApp fallback
│   │   ├── FAQ
│   │   ├── FinalCTA
│   │   └── Footer
│   │
│   ├── /resources → ResourcesPage (lazy)
│   │   ├── ResourcesHero
│   │   ├── CategoryFilter
│   │   ├── ArticleGrid
│   │   └── ArticleCard (with thumbnails)
│   │
│   ├── /resources/:slug → ArticlePage (lazy)
│   │   ├── ArticleThumbnailStatic
│   │   ├── Content Parser → ParsedBlock[]
│   │   │   ├── heading2, heading3
│   │   │   ├── tldr → TLDRBox
│   │   │   ├── comparisonTable → ComparisonTable
│   │   │   ├── bulletList, numberedList
│   │   │   ├── paragraph
│   │   │   └── (injected from enrichment data)
│   │   ├── FAQ Section (with schema markup)
│   │   ├── Internal Links Section
│   │   ├── Related Articles
│   │   └── WhatsApp CTA
│   │
│   ├── /privacy → PrivacyPolicy (lazy)
│   └── /terms → TermsOfService (lazy)
│
└── Footer
```

### Resource Components (`components/resources/`)

| Component | Purpose |
|-----------|---------|
| `ArticleCard.tsx` | Card + featured card with dynamic SVG thumbnail |
| `ArticleComponents.tsx` | 8 interactive components (ComparisonTable, StatCards, Checklist, Steps, ProTip, Warning, CTABox, TLDRBox) |
| `ArticleThumbnail.tsx` | Dynamic SVG thumbnail with category colors + emoji icons |
| `ArticleGrid.tsx` | Responsive grid with load-more pagination |
| `CategoryFilter.tsx` | Pill-based category filter + search |
| `ResourcesHero.tsx` | Hero section with CTAs |
| `ResourcesPage.tsx` | Full hub page composition |
| `index.ts` | Barrel export |

### Data Flow

```
articles.ts
├── ARTICLES[]              # 57 metadata objects
├── ARTICLE_CONTENT{}        # 57 content strings (markdown-like)
├── TLDR_DATABASE{}          # 57 TL;DR entries (3-5 bullets)
├── FAQ_DATABASE{}           # 57 FAQ entries (3 Q&As)
│
├── getEnrichedArticle(slug)
│   → Returns: metadata + seo + faq + internalLinks + relatedSlugs + tldr
│
├── getRelatedArticlesEnriched(slug, limit)
│   → Returns: 3 enriched related articles
│
└── getTLDR(slug)
    → Returns: TL;DR bullets array
```

ArticlePage content parser detects:
- `## Heading` → H2
- `### Heading` → H3
- `- Bullet items` → BulletList with colored dots
- `1. **Title** — description` → NumberedList with badges
- `| Table | rows |` → ComparisonTable component (3+ rows)
- `**TL;DR**` lines → TLDRBox component
- FAQ from `faq` array → FAQ section with FAQPage schema
- Internal links from `internalLinks` array → Links section
- TLDR from `TLDR_DATABASE` → Injected before first H2 if not in content

---

## Configuration Architecture

```
.env → VITE_LEAD_WEBHOOK_URL
                │
config.ts ← ────┘
├── WHATSAPP_NUMBER
├── WHATSAPP_LINK
├── EMAIL, PHONE_DISPLAY
├── SITE_URL
├── BUSINESS_* (address, geo)
├── SERVICE_AREAS[]
└── LEAD_WEBHOOK_URL (from env)
        │
        ├── LeadMagnet.tsx (form submission)
        ├── Footer.tsx (contact info)
        ├── Hero.tsx (WhatsApp CTA)
        ├── FinalCTA.tsx (WhatsApp CTA)
        └── SEOHead.tsx (schema markup)
```

---

## State Management

### Local Component State
Most components are stateless. State exists only where needed:

| Component | State | Purpose |
|-----------|-------|---------|
| App | Route rendering, Suspense, ErrorBoundary | Page navigation |
| LeadMagnet | `submitted`, `submitError`, `isSubmitting`, `dropdownOpen` | Form handling |
| ResourcesPage | `selectedCategory`, `searchQuery` | Filtering |
| ArticlePage | URL params, parsed content | Article rendering |
| FAQ | Accordion open/close state | UX |
| Navbar | `scrolled`, `mobileOpen` | Responsive behavior |

### No Global State
The application does not require global state management. All data flows from:
1. **Route params** (article slug from URL)
2. **Config file** (business constants)
3. **Static data** (articles.ts)

---

## Build & Bundle Architecture

### Code Splitting
```
Initial Load (~192KB / 60KB gzipped):
├── index.js         - React, Router, core libs
├── index.css         - All styles
├── proxy.js          - React Helmet, async chunks
└── effects.js        - Custom cursor, animated background

Lazy Loaded (on demand):
├── HomePage.js       - Landing page sections (148KB)
├── articles.js        - All 57 articles data (259KB)
├── ResourcesPage.js   - Resources hub (14KB)
├── ArticlePage.js     - Article detail + parser (10KB)
├── PrivacyPolicy.js   - Legal page (7KB)
└── TermsOfService.js  - Legal page (9KB)
```

### Error Handling

```typescript
// ErrorBoundary wraps all routes
<ErrorBoundary>
  <Suspense fallback={<PageLoader />}>
    <Routes>...</Routes>
  </Suspense>
</ErrorBoundary>

// Lead form graceful fallback
if (!LEAD_WEBHOOK_URL) {
  // Redirect to WhatsApp with form data
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  setSubmitted(true)
  return
}
// If webhook POST fails, also fall back to WhatsApp
```

---

## Deployment Architecture

### CI/CD Pipeline

```
Developer Machine
    │
    ├──► npm run build ──► dist/ folder
    │
    └──► git push origin main ──► GitHub
                                         │
                                         ▼
                               Hostinger Git Integration
                                         │
                                         ▼
                               Auto-deploy to /public_html/
```

### Environment Variables
- `VITE_LEAD_WEBHOOK_URL` — Make/n8n webhook endpoint. Empty = WhatsApp fallback.

---

## Scalability Considerations

### Current Limits
- Articles data loaded on demand (not in initial bundle)
- No backend dependencies for article rendering
- Content management requires code changes (no CMS)

### Scaling Paths

| Need | Solution | Status |
|------|----------|--------|
| More articles | Add to `articles.ts` | ✅ Current approach |
| CMS integration | Migrate toSanity/Contentful | Future |
| Backend API | Add Express/Fastify + database | Future |
| User auth | Add Clerk/Auth.js | Future |
| Dynamic OG images | Add API endpoint | Future |

---

## Technical Debt

| Item | Priority | Effort | Impact | Status |
|------|----------|--------|--------|--------|
| Per-article OG images | Medium | Medium | High | Pending |
| Unit tests | Medium | Medium | High | Not Started |
| E2E tests | Low | Medium | Medium | Not Started |
| Loading skeletons | Low | Low | Low | Not Started |

---

## Architecture Decisions Record

### ADR-001: Static Site vs SSR
**Decision:** Static site (Vite SPA)  
**Rationale:** Simplicity, performance, no server costs, easy deployment  
**Consequences:** No server-side rendering, client-side routing

### ADR-002: Code Splitting
**Decision:** React.lazy + Suspense for all routes  
**Rationale:** 740KB initial bundle was too large; articles data (259KB) only needed on resources pages  
**Consequences:** Initial load 192KB, articles load on demand, small loading delay on navigation

### ADR-003: Content in articles.ts (no CMS)
**Decision:** Store all article data in a single TypeScript file  
**Rationale:** No backend needed, type-safe, instant rendering, Git version control  
**Consequences:** Code changes required for content updates; scaling to 200+ articles would warrant a CMS

### ADR-004: TLDR_DATABASE + FAQ_DATABASE (separate maps)
**Decision:** Store TL;DR and FAQ data in separate lookup maps, inject at render time  
**Rationale:** Keeps article content strings clean, allows enrichment without modifying content, easy to update  
**Consequences:** Need to maintain consistency between article slug and database keys

### ADR-005: WhatsApp Fallback for Lead Form
**Decision:** Redirect to WhatsApp with pre-filled form data when no webhook configured  
**Rationale:** Zero data loss, better UX than error message, works immediately without backend setup  
**Consequences:** Less structured data capture vs webhook POST; can upgrade to webhook when ready

### ADR-006: Error Boundary
**Decision:** Wrap all routes in ErrorBoundary with styled recovery UI  
**Rationale:** Prevents white screen of death; provides user-friendly error message and refresh button  
**Consequences:** Small bundle increase, error state needs to match design system