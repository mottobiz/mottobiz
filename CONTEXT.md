# CONTEXT.md - Project Context & Memory

## Document Purpose

This file serves as the **single source of truth** for the current state of the MottoBiz project. It captures recent changes, execution learnings, troubleshooting steps, architectural decisions, and strategic context. Anyone picking up this project should read this file first.

**Last Updated:** 2026-04-16  
**Project Status:** Production Ready (v2.1)  
**Current Focus:** Content Expansion & SEO

---

## Quick Status

| Aspect | Status | Notes |
|--------|--------|-------|
| Landing Page | ✅ Live | https://mottobiz.com |
| Lead Form | ✅ Working | Graceful fallback when webhook empty |
| WhatsApp Integration | ✅ Working | Direct wa.me links |
| SEO Schema | ✅ Implemented | LocalBusiness + ServiceAreas |
| Deployment | ✅ Automated | Git + Hostinger auto-deploy |
| Resources Hub | ✅ Live | `/resources` page with article grid |
| Article Pages | ✅ Live | `/resources/:slug` dynamic routing |
| Content Framework | ✅ Complete | 1,892-line CONTENT_STRATEGY.md |
| AI Detection Avoidance | ✅ Implemented | Humanization rules in framework |
| Proofreading QA | ✅ Implemented | Quality checklist template |
| Privacy Policy | ✅ Live | `/privacy` page |
| Terms of Service | ✅ Live | `/terms` page |
| Article Content | ✅ 29 articles | All 5 pillars + comparisons + guides + locations |
| Sitemap | ✅ Updated | All 29 articles + static pages |
| Google Business Profile | ✅ Claimed | Profile created and verified |
| Google Search Console | ✅ Setup | Property added, sitemap submitted |
| Webhook | ⬜ Not Configured | n8n/Make endpoint needed |
| Google Analytics 4 | ⬜ Not Setup | Tracking code not added |

---

## Content Generation Framework

### Overview

The content generation system is fully implemented with:
- **CONTENT_STRATEGY.md** - Complete 1,892-line master framework
- **Article Briefs** - Detailed briefs for content writers
- **Full Articles** - Human-written articles using the framework
- **Templates** - Reusable templates for consistent output
- **React Components** - Frontend for displaying content

### Framework Components

| Component | File | Status |
|-----------|------|--------|
| Master Framework | `CONTENT_STRATEGY.md` | ✅ Complete |
| Article Brief Template | `content/templates/article-brief-template.md` | ✅ Complete |
| Quality Checklist | `content/templates/quality-checklist-template.md` | ✅ Complete |
| AI Detection Avoidance | Section 6 in CONTENT_STRATEGY.md | ✅ Complete |
| AEO/SEO Checklist | Section 8 in CONTENT_STRATEGY.md | ✅ Complete |
| Proofreading System | Section 7 in CONTENT_STRATEGY.md | ✅ Complete |

### Content Pillars

| Pillar | Focus | Articles | Sub-Pillars |
|--------|-------|----------|-------------|
| **Textile & Diamond** | Core industry automation | 5 created | WhatsApp Automation, Lead Management, Inventory, Location Content |
| **Restaurants & Food** | Order & customer management | Planned | Order Management, Customer Communication, Delivery, Reviews |
| **Real Estate** | Lead gen & nurturing | Planned | Lead Generation, Property Marketing, Client Nurturing, Documentation |
| **Coaching & Education** | Student & admission management | Planned | Admission Management, Student Communication, Content & Engagement |
| **Retail & Consumer** | Customer service & operations | Planned | Customer Service, Marketing, Operations |

---

## Articles Generated

### Published Articles (29)

| # | Title | Slug | Category | Pillar | Word Count |
|---|-------|------|----------|--------|------------|
| 1 | WhatsApp Automation for Textile Traders in Surat | `whatsapp-automation-textile-traders-surat` | industries | Textile & Diamond | ~1,800 |
| 2 | How to Handle Bulk Order Inquiries Automatically | `bulk-order-inquiries-automation` | industries | Textile & Diamond | ~1,500 |
| 3 | Lead Capture Automation for Diamond Businesses | `lead-capture-diamond-businesses` | industries | Textile & Diamond | ~1,400 |
| 4 | Stock Alert Automation for Textile Shops | `stock-alert-automation-textile` | industries | Textile & Diamond | ~1,300 |
| 5 | Textile Business Automation in Varachha | `textile-business-automation-varachha` | locations | Textile & Diamond | ~1,600 |
| 6 | How a Varachha Trader 3x'd His Response Rate | `varachha-textile-case-study` | case-studies | Textile & Diamond | ~1,200 |
| 7 | Restaurant Order Automation in Adajan | `restaurant-automation-adajan` | locations | Restaurants & Food | ~1,400 |
| 8 | WhatsApp Order Automation for Restaurants | `whatsapp-order-automation-restaurants` | industries | Restaurants & Food | ~1,500 |
| 9 | Auto-Confirming Orders and Sending Estimates | `auto-confirming-orders-estimates` | industries | Restaurants & Food | ~1,300 |
| 10 | Reservation Booking via WhatsApp | `reservation-booking-whatsapp` | industries | Restaurants & Food | ~1,200 |
| 11 | Delivery Status Updates via WhatsApp | `delivery-status-updates-whatsapp` | industries | Restaurants & Food | ~1,200 |
| 12 | Automated Review Requests After Dining | `automated-review-requests-restaurants` | industries | Restaurants & Food | ~1,100 |
| 13 | Real Estate Lead Generation in Vesu | `real-estate-leads-vesu` | locations | Real Estate | ~1,300 |
| 14 | Real Estate Lead Automation in Surat | `real-estate-lead-automation-surat` | industries | Real Estate | ~1,500 |
| 15 | Qualifying Property Buyers Automatically | `qualifying-property-buyers-automatically` | industries | Real Estate | ~1,300 |
| 16 | Auto-Sharing Property Listings on WhatsApp | `property-listings-whatsapp-automation` | industries | Real Estate | ~1,200 |
| 17 | Long-Term Lead Nurturing for Real Estate | `long-term-lead-nurturing-real-estate` | industries | Real Estate | ~1,200 |
| 18 | Coaching Center Automation in Surat | `coaching-center-automation` | industries | Coaching & Education | ~1,400 |
| 19 | Handling Admission Inquiries 24/7 | `handling-admission-inquiries-24-7` | industries | Coaching & Education | ~1,300 |
| 20 | Class Schedule Reminders That Actually Work | `class-schedule-reminders` | industries | Coaching & Education | ~1,100 |
| 21 | Fee Payment Reminders Without the Awkwardness | `fee-payment-reminders-coaching` | industries | Coaching & Education | ~1,200 |
| 22 | Student Progress Updates for Parents | `student-progress-updates-parents` | industries | Coaching & Education | ~1,100 |
| 23 | Retail WhatsApp Automation in Surat | `retail-whatsapp-automation` | industries | Retail & Consumer | ~1,100 |
| 24 | Product Availability Checks via WhatsApp | `product-availability-checks-whatsapp` | industries | Retail & Consumer | ~1,200 |
| 25 | Sale & Offer Announcements That Get Opened | `sale-announcements-automation` | industries | Retail & Consumer | ~1,200 |
| 26 | Inventory Alerts When Stock Runs Low | `inventory-alerts-retail` | industries | Retail & Consumer | ~1,100 |
| 27 | n8n vs Make: Which Automation Tool? | `n8n-vs-make` | comparisons | — | ~1,400 |
| 28 | WhatsApp Business API vs Automation Tools | `whatsapp-business-api-vs-automation` | comparisons | — | ~1,300 |
| 29 | Free vs Paid Automation: What Works | `free-vs-paid-automation` | comparisons | — | ~1,200 |
| 30 | Website Development in Varachha | `website-development-varachha` | locations | — | ~1,300 |
| 31 | Business Automation in Vesu | `business-automation-vesu` | locations | Real Estate | ~1,200 |
| 32 | Restaurant & Cafe Automation in Adajan | `restaurant-automation-adajan-location` | locations | Restaurants & Food | ~1,300 |
| 33 | Getting Started with Business Automation | `getting-started-business-automation` | guides | — | ~1,500 |
| 34 | The Complete WhatsApp Business Guide for Surat | `complete-whatsapp-business-guide-surat` | guides | — | ~1,800 |
| 35 | How Much Does Business Automation Cost? | `how-much-does-business-automation-cost` | guides | — | ~1,400 |

### Article Briefs Created (5)

| # | Brief | Status |
|---|-------|--------|
| 1 | 01-whatsapp-automation-textile-traders.md | ✅ Full article generated |
| 2 | 02-bulk-order-inquiries-automation.md | ✅ Full article generated |
| 3 | 03-lead-capture-diamond-businesses.md | ✅ Full article generated |
| 4 | 04-stock-alert-automation-textile.md | ✅ Full article generated |
| 5 | 05-textile-business-automation-varachha.md | ✅ Full article generated |

### Content Files Location

```
content/
├── articles/          # Full articles (markdown)
│   ├── whatsapp-automation-textile-traders-surat.md
│   ├── bulk-order-inquiries-automation.md
│   ├── lead-capture-diamond-businesses.md
│   ├── stock-alert-automation-textile.md
│   └── textile-business-automation-varachha.md
├── briefs/            # Article briefs
│   ├── 01-whatsapp-automation-textile-traders.md
│   ├── 02-bulk-order-inquiries-automation.md
│   ├── 03-lead-capture-diamond-businesses.md
│   ├── 04-stock-alert-automation-textile.md
│   └── 05-textile-business-automation-varachha.md
└── templates/         # Reusable templates
    ├── article-brief-template.md
    └── quality-checklist-template.md
```

---

## SEO Implementation

### What's Done

| SEO Element | Status | Implementation |
|------------|--------|----------------|
| Meta Tags | ✅ | Dynamic via SEOHead component |
| Canonical URLs | ✅ | Auto-generated per article |
| Schema Markup | ✅ | LocalBusiness + Service + Article |
| Internal Linking | ✅ | 3-5 links per article |
| External Authority Links | ✅ | 2-3 per article |
| Sitemap | ✅ Generated | All 12 articles + static pages included |
| robots.txt | ✅ Configured | Points to sitemap.xml |
| OG Images | ⬜ | Needs generation |
| Article Structured Data | ✅ | JSON-LD via SEOHead |
| FAQ Schema | ✅ | Per-article FAQ sections |

### SEO Components

| Component | File | Purpose |
|-----------|------|---------|
| SEOHead | `components/SEOHead.tsx` | Dynamic meta tags |
| ResourcesPage | `components/resources/ResourcesPage.tsx` | Article listing |
| ArticlePage | `pages/ArticlePage.tsx` | Individual article rendering |
| ArticleCard | `components/resources/ArticleCard.tsx` | Article preview cards |

### Article SEO Requirements (Per Framework)

Every article must include:
- [x] Primary keyword in first 100 words
- [x] Primary keyword in H1, at least 1 H2, conclusion
- [x] Meta title ≤60 chars with "Surat"
- [x] Meta description 150-160 chars with CTA
- [x] Minimum 3 Surat location references
- [x] Minimum 1 local business example
- [x] 3-5 internal links
- [x] 2-3 external authority links
- [x] FAQ schema markup
- [x] WhatsApp CTA in conclusion

---

## Recent Execution Log

### 2026-04-16: Content System Implementation

**What Was Done:**
1. Created comprehensive `CONTENT_STRATEGY.md` (1,892 lines)
2. Integrated Universal Content Framework with Mottobiz brand
3. Added AI detection avoidance system
4. Added proofreading/quality assurance process
5. Defined 5 industry pillars with sub-pillars (20+ total)
6. Created article template schema (JSON)
7. Specified interactive components for articles
8. Added color theme guidelines matching brand
9. Generated 5 full articles from briefs
10. Created React resources page with routing
11. Implemented dynamic article pages with content rendering
12. Added category filtering and search functionality

**Key Decisions:**
- **Industry-first approach:** Focus on Textile, Restaurant, Real Estate, Coaching, Retail
- **3-5 sub-pillars per industry:** Focused approach for each vertical
- **Category landing pages:** Hub pages with sub-category breakdowns
- **Humanization mandatory:** All articles must pass AI detection checks
- **React Router:** Used for client-side routing (not Next.js)

**Files Created:**
```
content/
├── articles/
│   ├── whatsapp-automation-textile-traders-surat.md
│   ├── bulk-order-inquiries-automation.md
│   ├── lead-capture-diamond-businesses.md
│   ├── stock-alert-automation-textile.md
│   └── textile-business-automation-varachha.md
├── briefs/
│   ├── 01-whatsapp-automation-textile-traders.md
│   ├── 02-bulk-order-inquiries-automation.md
│   ├── 03-lead-capture-diamond-businesses.md
│   ├── 04-stock-alert-automation-textile.md
│   └── 05-textile-business-automation-varachha.md
└── templates/
    ├── article-brief-template.md
    └── quality-checklist-template.md

mottobiz/src/
├── types/article.ts          # Article TypeScript definitions
├── data/articles.ts         # Article data + content
├── pages/
│   ├── HomePage.tsx         # Home page wrapper
│   ├── ResourcesPage.tsx    # Resources wrapper
│   └── ArticlePage.tsx      # Individual article page
└── components/resources/
    ├── ArticleCard.tsx     # Article cards
    ├── ArticleGrid.tsx       # Grid layouts
    ├── CategoryFilter.tsx   # Filters + search
    ├── ResourcesHero.tsx    # Hero + CTAs
    └── ResourcesPage.tsx   # Main page component
```

---

## Architecture

### Routing Structure

```
/                          → HomePage
/resources                  → ResourcesPage
/resources/:slug           → ArticlePage
```

### Routing Implementation

Uses `react-router-dom` for client-side routing:

```typescript
// App.tsx
<Router>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/resources" element={<ResourcesPageWrapper />} />
    <Route path="/resources/:slug" element={<ArticlePage />} />
  </Routes>
</Router>
```

### Data Flow

```
content/articles/*.md  →  articles.ts  →  ResourcesPage/ArticlePage
                              ↓
                        ArticleCard
                              ↓
                        ArticleGrid
```

---

## Development Workflow

### Starting Development

```powershell
# 1. Navigate to project
cd D:\IDEprojects\Mottobiz\mottobiz

# 2. Start dev server
npm run dev

# 3. Open browser to shown port (usually http://localhost:5173)
```

### Making Content Changes

```powershell
# 1. Add/Edit article markdown in:
#    content/articles/*.md

# 2. Add/Edit article metadata in:
#    mottobiz/src/data/articles.ts

# 3. Test locally
npm run dev

# 4. Build and deploy:
cd D:\IDEprojects\Mottobiz
.\deploy.bat
```

### Creating New Articles

1. **Create Brief:** Copy `content/templates/article-brief-template.md`
2. **Fill Brief:** Complete SEO, structure, requirements
3. **Generate Article:** Use master AI prompt from CONTENT_STRATEGY.md
4. **Humanize:** Apply AI detection avoidance rules
5. **Proofread:** Use quality checklist template
6. **Add to Site:** Add to `mottobiz/src/data/articles.ts`
7. **Test:** Build and verify

---

## Technical Debt & Known Issues

| Item | Priority | Status | Notes |
|------|----------|--------|-------|
| Webhook Configuration | High | Pending | n8n/Make endpoint needed |
| Google Analytics 4 | High | Pending | Tracking code not added |
| Google Business Profile | High | Done | Claimed and verified |
| Sitemap & robots.txt | Medium | Done | Submitted to Google Search Console |
| OG Images | Medium | Pending | Social sharing images |
| Unit Tests | Medium | Not Started | Jest + React Testing Library |
| E2E Tests | Low | Not Started | Playwright |
| Error Boundaries | Low | Not Started | React error handling |

---

## Next Steps

### Immediate (This Week)

| Task | Priority | Status | Owner |
|------|----------|--------|-------|
| Generate 5 more articles (Restaurant pillar) | High | Done | Content Team |
| Create sitemap.xml | High | Done | Dev |
| Setup robots.txt | Medium | Done | Dev |
| Claim Google Business Profile | High | Done | Client |
| Generate OG images for articles | Medium | Pending | Design |

### Content Generation (Next Sprint)

| Pillar | Articles Planned | Briefs Needed |
|--------|-----------------|---------------|
| Restaurants & Food | 6 | 6 |
| Real Estate | 5 | 5 |
| Coaching & Education | 5 | 5 |
| Retail & Consumer | 4 | 4 |
| Comparisons | 5 | 5 |
| Location Pages | 10 | 10 |

**Total Articles to Generate:** ~40

### SEO Next Steps

| Task | Priority | Notes |
|------|----------|-------|
| Generate sitemap.xml | High | Include all /resources/* URLs |
| Setup robots.txt | High | Allow crawlers, point to sitemap |
| Google Search Console | High | Submit sitemap, monitor indexing |
| Bing Webmaster Tools | Medium | Secondary search engine |
| Schema Validation | Medium | Test all structured data |
| Core Web Vitals | Medium | Monitor LCP, FID, CLS |
| Backlink Building | Medium | Guest posts, citations |

### SEO Success Metrics

| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| Organic Traffic | ~0 | 500/month | 3 months |
| Ranking Keywords | 0 | 50 | 3 months |
| Featured Snippets | 0 | 5 | 6 months |
| Top 10 Rankings | 0 | 10 | 6 months |
| AI Citations | 0 | 5/month | 6 months |

---

## Future Plans

### Q2 2026

1. Complete content generation (40+ articles)
2. SEO setup (sitemap, robots, Search Console)
3. Google Business Profile optimization
4. Citation building (30+ directories)
5. Lead form webhook configuration

### Q3 2026

1. Second content pillar (Restaurants + Real Estate)
2. Video testimonials
3. Case studies section
4. Industry hub pages
5. AEO optimization (featured snippets, PAA)

### Q4 2026

1. Third content pillar (Coaching + Retail)
2. Client portal MVP
3. Project tracking dashboard
4. Multi-language support (Gujarati)

---

## External Dependencies

| Service | Purpose | Status | Action Needed |
|---------|---------|--------|--------------|
| Google Business Profile | Local SEO | ✅ Claimed | Optimize profile |
| Google Search Console | SEO Monitoring | ✅ Setup | Monitor indexing |
| Bing Webmaster Tools | SEO Monitoring | ⬜ Not Setup | Add property |
| n8n or Make | Form webhook | ⬜ Not Setup | Create workflow |
| Google Analytics 4 | Traffic analytics | ⬜ Not Setup | Add tracking code |
| Google Tag Manager | Tag management | ⬜ Not Setup | Configure tags |

---

## Resources & References

### Documentation Files

| File | Purpose |
|------|---------|
| `CONTENT_STRATEGY.md` | **Content generation framework** - Master guide for all content |
| `CONTEXT.md` | This file - Project state and history |
| `GOOGLE_BUSINESS_PROFILE_GUIDE.md` | GBP optimization guide |
| `LOCAL_CITATION_BUILDING_GUIDE.md` | Citation building (30+ directories) |
| `DESIGN.md` | Design system and brand colors |
| `PRD.md` | Product requirements |
| `AGENTS.md` | Development guidelines |

### Useful Commands

```powershell
# Development
npm run dev           # Start dev server
npm run build         # Production build
npm run preview       # Preview production build

# Deployment
cd D:\IDEprojects\Mottobiz
.\deploy.bat          # Deploy with default message

# Git
git status            # Check changes
git log --oneline -10 # View recent commits
```

---

## How to Update This File

1. **After significant changes:** Add entry to "Recent Execution Log"
2. **After issues resolved:** Add to "Troubleshooting Log"
3. **After decisions made:** Add to "Decision Log"
4. **When status changes:** Update "Quick Status" table
5. **After content created:** Update "Articles Generated" section
6. **Regularly:** Update "Last Updated" date

**Remember:** This file is for HUMANS - be verbose, explain the "why", include examples.

---

## Contact & Ownership

| Field | Value |
|-------|-------|
| Project | MottoBiz |
| Domain | https://mottobiz.com |
| Business Location | Surat, Gujarat, India |
| Phone | +91 74879 57972 |
| Email | webmaster@mottobiz.com |
| WhatsApp | https://wa.me/917487957972 |

---

## For New Team Members

### Getting Started Checklist

1. ⬜ Read this CONTEXT.md file completely
2. ⬜ Read CONTENT_STRATEGY.md (content framework)
3. ⬜ Setup local development environment
4. ⬜ Run `npm run dev` and verify site loads
5. ⬜ Test /resources page and article navigation
6. ⬜ Review existing articles in content/articles/
7. ⬜ Understand brand voice from CONTENT_STRATEGY.md Section 1
8. ⬜ Review AI detection avoidance rules (Section 6)
9. ⬜ Create your first article using the template

### Key Files to Know

| File | What It Contains |
|------|------------------|
| `CONTENT_STRATEGY.md` | Master content framework - READ FIRST |
| `CONTEXT.md` | Project state - You are here |
| `content/templates/article-brief-template.md` | Template for new articles |
| `mottobiz/src/data/articles.ts` | Where to add new articles to show on site |
| `mottobiz/src/components/resources/` | Frontend components for resources |

### Common Tasks

| Task | How To Do It |
|------|--------------|
| Add new article | Add markdown to `content/articles/` + entry to `articles.ts` |
| Create article brief | Copy template from `content/templates/article-brief-template.md` |
| Generate article | Use master AI prompt from CONTENT_STRATEGY.md Section 5 |
| Add page to site | Edit `App.tsx` routes |
| Change SEO | Edit `SEOHead.tsx` or page-level props |
| Deploy | Run `.\deploy.bat` from repo root |

---

**Last Updated:** 2026-04-16  
**Version:** 2.1 - All 5 Content Pillars + Legal Pages Complete
