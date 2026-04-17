# PRD.md - Product Requirements Document

## Product Overview

**Product Name:** MottoBiz Landing Page + Resources Hub  
**Version:** 2.5  
**Status:** Production Ready (Live at https://mottobiz.com)  
**Last Updated:** 2026-04-16  
**Next Review:** See ROADMAP.md for upcoming features

---

## Executive Summary

MottoBiz is a business automation studio based in Surat, Gujarat, India. The website serves as the primary digital touchpoint for lead generation, showcasing AI automation services to solopreneurs and small businesses in the Surat region, and publishing SEO-optimized content to attract organic search traffic.

### Core Value Proposition
> "We build the digital system that runs your business — so you can focus on growth without hiring a team."

---

## Goals & Objectives

### Primary Goals
1. **Lead Generation** — Capture qualified leads through the audit booking form (WhatsApp fallback when no webhook)
2. **Brand Awareness** — Establish MottoBiz as Surat's first automation studio
3. **Conversion** — Drive WhatsApp conversations for immediate engagement
4. **SEO Visibility** — Rank for local automation-related searches through 57 articles across 5 industry pillars
5. **Thought Leadership** — Position as automation experts through comprehensive content

### Success Metrics
- Form submissions and WhatsApp clicks
- Organic search rankings for target keywords
- Article pageviews and time on page
- Mobile vs desktop conversion rates

---

## Target Audience

### Primary Persona: The Overwhelmed Solopreneur
- **Demographics:** Age 28-50, Surat-based business owner
- **Business Types:** Textile traders, restaurant owners, real estate agents, coaching center owners, retail shop owners
- **Pain Points:** Spending too much time on repetitive tasks, missing customer inquiries, cannot afford to hire support staff, inconsistent follow-ups
- **Goals:** Automate daily operations, reduce workload, scale without hiring

### Secondary Persona: The Growth-Focused Small Business
- **Demographics:** Established businesses with 5-20 employees
- **Pain Points:** Inefficient workflows, manual data entry, disconnected tools
- **Goals:** Streamline operations, improve customer experience, data-driven decisions

---

## Features & Requirements

### 1. Hero Section
| Feature | Priority | Status |
|---------|----------|--------|
| Animated headline with gradient text | High | Done |
| Stats display (10x, 0, 24/7) | High | Done |
| Primary CTA (Explore Services) | High | Done |
| WhatsApp CTA button | High | Done |
| Floating orbs background effect | Medium | Done |
| Scroll indicator animation | Medium | Done |

### 2. Services Section
| Feature | Priority | Status |
|---------|----------|--------|
| 6 service cards with icons | High | Done |
| Hover animations | Medium | Done |
| Feature tags per service | Medium | Done |
| Responsive grid layout | High | Done |

### 3. Lead Magnet (Audit Booking Form)
| Feature | Priority | Status |
|---------|----------|--------|
| Name field (validation) | High | Done |
| WhatsApp field (validation) | High | Done |
| Email field (validation) | High | Done |
| Business type dropdown | High | Done |
| Form submission to webhook | High | Done |
| WhatsApp fallback (no webhook) | High | Done |
| Success state UI | High | Done |
| Error handling | High | Done |
| Zod validation schema | High | Done |

### 4. Resources Hub
| Feature | Priority | Status |
|---------|----------|--------|
| Resources page with category filtering | High | Done |
| Search functionality | High | Done |
| Industry hub sections (5 pillars) | High | Done |
| Featured articles section | Medium | Done |
| Article grid with load more | Medium | Done |
| Dynamic SVG thumbnails per article | Medium | Done |
| Mobile responsive layout | High | Done |

### 5. Article Pages
| Feature | Priority | Status |
|---------|----------|--------|
| Dynamic routing by slug | High | Done |
| Rich content parser (headings, bullets, tables) | High | Done |
| 8 interactive components (ComparisonTable, StatCards, etc.) | Medium | Done |
| TL;DR box (auto-injected from database) | High | Done |
| FAQ section with schema markup | High | Done |
| Internal links section | Medium | Done |
| Related articles | Medium | Done |
| SEO meta tags per article | High | Done |
| Article + FAQPage JSON-LD schema | High | Done |
| Breadcrumb and category badges | Medium | Done |
| WhatsApp CTA in article footer | High | Done |

### 6. Content System
| Feature | Priority | Status |
|---------|----------|--------|
| 57 articles across 5 industry pillars | High | Done |
| Hand-written FAQs (3 Q&As per article) | High | Done |
| TL;DR boxes (3-5 bullets per article) | High | Done |
| Comparison tables in 12 articles | Medium | Done |
| SEO enrichment system (auto-generated) | High | Done |
| Internal link generation | Medium | Done |
| Related article recommendations | Medium | Done |

### 7. Legal Pages
| Feature | Priority | Status |
|---------|----------|--------|
| Privacy Policy page | Medium | Done |
| Terms of Service page | Medium | Done |
| Framer Motion animations | Low | Done |
| Footer links to both pages | Medium | Done |

### 8. Navigation & Footer
| Feature | Priority | Status |
|---------|----------|--------|
| Sticky navbar with sections links (homepage) | High | Done |
| Resources link in nav | High | Done |
| Home link on non-homepage pages | Medium | Done |
| Mobile hamburger menu | High | Done |
| Contact information in footer | High | Done |
| Privacy/Terms links in footer | Medium | Done |
| Floating WhatsApp button | High | Done |

### 9. SEO & Technical
| Feature | Priority | Status |
|---------|----------|--------|
| JSON-LD LocalBusiness schema | High | Done |
| JSON-LD Article schema per article | High | Done |
| JSON-LD FAQPage schema per article | High | Done |
| Open Graph tags | High | Done |
| Canonical URLs per page | High | Done |
| Sitemap.xml (59 URLs) | High | Done |
| robots.txt | High | Done |
| Code splitting (React.lazy) | High | Done |
| Error boundary | Medium | Done |
| Responsive design | High | Done |

---

## Design Requirements

### Visual Identity
- **Theme:** Dark luxury / Tech-forward
- **Base Color:** `#0A0A0B` (near black)
- **Primary Accent:** `#6366F1` (indigo)
- **Secondary Accent:** `#F59E0B` (amber/gold)
- **Typography:** Space Grotesk (display) + Inter (body)

### UI Components
- **Glass morphism cards** — `.glass` and `.glass-hover` classes
- **Gradient text** — `.text-gradient` and `.text-gradient-gold`
- **Custom cursor** — Pointer devices only `@media (pointer: fine)`
- **Animated background** — Cursor-reactive gradient orbs
- **Scroll-triggered animations** — Framer Motion `useInView` + `fadeUp` variants
- **Section dividers** — `.section-divider` class

### Component Classes (from index.css)
| Class | Purpose |
|-------|---------|
| `.glass` | Glass morphism card background |
| `.glass-hover` | Glass card with hover state |
| `.card` | Standard card with hover |
| `.btn-primary` | Gradient button (indigo to purple) |
| `.btn-secondary` | Outline button |
| `.text-gradient` | Indigo-to-gold gradient text |
| `.text-gradient-gold` | Gold gradient text |
| `.number-badge` | Numbered badge circle |
| `.section-divider` | Gradient line between sections |

---

## Technical Constraints

### Performance
- First Contentful Paint < 1.5s
- Initial JS bundle < 200KB gzipped
- Articles loaded on demand via code splitting
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1

### Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari / Chrome

---

## Out of Scope (Future Considerations)

1. **CMS/Blog Engine** — Content is in `articles.ts`, not a CMS
2. **Client Portal** — Authentication, project tracking, dashboards
3. **Pricing Page** — Transparent pricing tiers
4. **Multi-language** — Gujarati/Hindi versions
5. **Live Chat Widget** — Real-time support
6. **Analytics Dashboard** — Self-service insights

---

## Dependencies

### External Services
- **WhatsApp** — Primary contact channel (wa.me links + form pre-fill)
- **Webhook** — Make/n8n for form processing (configurable via VITE_LEAD_WEBHOOK_URL)
- **Google Fonts** — Typography hosting
- **GitHub + Hostinger** — Version control and deployment

### Third-Party Integrations (Future)
- Google Analytics 4
- Google Tag Manager
- Hotjar/Clarity for heatmaps
- CRM integration (HubSpot/Salesforce)

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/lib/config.ts` | All contact/business constants + env vars |
| `src/data/articles.ts` | All 57 articles (metadata + content + TLDR + FAQ databases) |
| `src/pages/ArticlePage.tsx` | Article detail page with rich content parser |
| `src/components/resources/` | Resources hub components (8 files) |
| `src/components/ErrorBoundary.tsx` | Error boundary wrapping all routes |
| `src/components/LeadMagnet.tsx` | Lead form with WhatsApp fallback |
| `src/components/SEOHead.tsx` | Meta tags + JSON-LD schema |
| `src/lib/animations.ts` | Framer Motion animation variants |
| `.env` | VITE_LEAD_WEBHOOK_URL (empty = WhatsApp fallback) |
| `AGENTS.md` | Mandatory development rules (READ BEFORE CHANGES) |

---

## Deployment Notes

**Current Deployment Method:** Hostinger Git Integration
- Push to `main` branch triggers auto-deployment
- `dist/` folder is committed to repository (required by Hostinger)
- Deployment scripts: `deploy.ps1` / `deploy.bat`
- Pre-commit hook runs `npm run build` to verify

**Environment Variables:**
- `VITE_LEAD_WEBHOOK_URL` — Optional. Set in `.env` to POST form data to Make/n8n. When empty, form redirects to WhatsApp.

---

## Recent Changes (v2.5)

| Date | Change | Impact |
|------|--------|--------|
| 2026-04-16 | Code splitting with React.lazy | 740KB → 192KB initial bundle |
| 2026-04-16 | Error boundary for crash resilience | Styled error screen with refresh |
| 2026-04-16 | TLDR_DATABASE for all 57 articles | Key takeaways on every article |
| 2026-04-16 | FAQ_DATABASE for all 57 articles | Rich snippet schema on every article |
| 2026-04-16 | Comparison tables in 12 articles | Interactive content engagement |
| 2026-04-16 | WhatsApp lead fallback | Zero data loss on form submit |
| 2026-04-16 | VITE_LEAD_WEBHOOK_URL env variable | Configurable webhook without code changes |
| 2026-04-13 | Switched to Hostinger Git deployment | More reliable than FTP Actions |