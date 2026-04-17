# TASKS.md - Development Task Tracking

> **Quick Context:** See `CONTEXT.md` for current project state, recent changes, and troubleshooting.

## Current Sprint

### Status Legend
- [ ] Not Started
- [~] In Progress
- [x] Completed
- [!] Blocked

---

## Phase 1: Foundation (Completed)
- [x] Initialize React + Vite project
- [x] Configure TypeScript with path aliases
- [x] Setup Tailwind CSS v4
- [x] Create project structure
- [x] Define design tokens

## Phase 2: Core Components (Completed)
- [x] Create Hero section
- [x] Create Navbar component (with Resources link)
- [x] Create Services section
- [x] Create Pain section
- [x] Create Proof section
- [x] Create HowItWorks section
- [x] Create Qualifier section
- [x] Create SocialProof section
- [x] Create LeadMagnet form (WhatsApp fallback)
- [x] Create FAQ section
- [x] Create FinalCTA section
- [x] Create Footer component (with privacy/terms links)

## Phase 3: Effects & Animations (Completed)
- [x] Implement CustomCursor component
- [x] Implement AnimatedBackground
- [x] Create FloatingOrbs effect
- [x] Setup Framer Motion variants
- [x] Add scroll-triggered animations
- [x] Implement stagger animations

## Phase 4: Form & Integration (Completed)
- [x] Create Zod validation schema
- [x] Implement react-hook-form integration
- [x] Add form error handling
- [x] Create success state UI
- [x] Implement webhook submission (env variable)
- [x] Add WhatsApp fallback when webhook not configured

## Phase 5: Content System (Completed)
- [x] Create Resources hub page with filtering, search, industry hubs
- [x] Create ArticlePage with rich content parser
- [x] Create 8 interactive article components (ComparisonTable, StatCards, etc.)
- [x] Create ArticleThumbnail dynamic SVG component
- [x] Generate 57 articles across 5 industry pillars + comparisons + guides + locations
- [x] Build SEO enrichment system (meta, FAQ, internal links, related articles)
- [x] Add hand-written FAQs for all 57 articles (3 Q&As each)
- [x] Add TL;DR boxes for all 57 articles (3-5 bullets each)
- [x] Add comparison tables and interactive content to 12 articles
- [x] Add Legal pages (Privacy Policy, Terms of Service)
- [x] Update sitemap.xml with all 57 article URLs

## Phase 6: Performance & Polish (Completed)
- [x] Code splitting with React.lazy (740KB → 192KB initial bundle)
- [x] Error boundary for crash resilience
- [x] Lead webhook env variable (VITE_LEAD_WEBHOOK_URL)
- [x] Lead form WhatsApp redirect fallback

---

## Backlog

### High Priority
- [ ] Configure Make/n8n webhook URL (set VITE_LEAD_WEBHOOK_URL in .env)
- [ ] Setup Google Analytics 4 (needs measurement ID)
- [ ] Setup Google Tag Manager

### Medium Priority
- [ ] Generate per-article OG images (57 images)
- [ ] Add more interactive content to articles (StatCards, Checklists)
- [ ] Add unit tests (Vitest + React Testing Library)
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility audit (WCAG 2.1)
- [ ] Add structured data for services (Service schema)

### Low Priority
- [ ] Add dark/light mode toggle
- [ ] Implement service detail modals
- [ ] Add video testimonials section
- [ ] Create pricing page
- [ ] Add live chat widget integration
- [ ] Multi-language support (Gujarati)
- [ ] Lazy load below-fold images

---

## Bugs & Issues

### Open Issues
- None currently identified

### Resolved Issues
- [x] Form submission graceful fallback when webhook URL empty → now redirects to WhatsApp with form data
- [x] Custom cursor only on pointer devices
- [x] Mobile responsive design
- [x] 740KB JS bundle → code splitting reduced to 192KB initial

---

## Technical Debt

| Item | Priority | Notes |
|------|----------|-------|
| Per-article OG images | Medium | Currently one generic og-image.png |
| Unit tests | Medium | Vitest + React Testing Library |
| E2E tests | Low | Playwright |
| Performance audit | Medium | Lighthouse scoring |
| Accessibility audit | Medium | WCAG compliance check |
| Code documentation | Low | JSDoc comments |

---

## Future Features

### Q3 2026
- [ ] Client testimonials section with real reviews
- [ ] Service detail pages
- [ ] Case study deep-dives
- [ ] Video testimonials
- [ ] Industry hub landing pages

### Q4 2026
- [ ] Client portal MVP
- [ ] Project tracking dashboard
- [ ] Invoice generation
- [ ] Advanced analytics dashboard

### 2027
- [ ] Multi-language support (Gujarati, Hindi)
- [ ] Partner program
- [ ] Automation template marketplace
- [ ] CRM integration

---

## Notes

### Webhook Configuration
The `VITE_LEAD_WEBHOOK_URL` is now configurable via `.env` file. When empty (default), form submissions redirect to WhatsApp with pre-filled form data. To configure:
1. Create Make.com or n8n webhook endpoint
2. Add `VITE_LEAD_WEBHOOK_URL=https://your-webhook-url` to `.env`
3. Rebuild and deploy

### Asset Requirements
- `/public/logo-static.svg` - Main logo ✅
- `/public/og-image.png` - Social share image (1200x630px) - generic, not per-article
- Per-article OG images - 57 needed, currently using generic