# ROADMAP.md - Development Roadmap

## Vision Statement

MottoBiz aims to become the go-to business automation partner for small businesses in Surat and eventually across Gujarat. The platform will evolve from a landing page to a comprehensive digital presence including content, client tools, and scalable service delivery.

---

## Current State (v2.5)

### Completed
- [x] Landing page with all core sections
- [x] Lead capture form with validation + WhatsApp fallback
- [x] WhatsApp integration (direct links + form pre-fill)
- [x] SEO optimization with LocalBusiness + Article + FAQPage schema
- [x] Mobile-responsive design
- [x] Automated deployment pipeline (Hostinger Git)
- [x] Production deployment (https://mottobiz.com)
- [x] Resources hub with 57 articles, filtering, and search
- [x] Article detail pages with rich content parser
- [x] Interactive article components (8 types)
- [x] Dynamic SVG thumbnails per article
- [x] SEO enrichment system (auto-generated meta, FAQ, links)
- [x] TL;DR boxes for all 57 articles
- [x] Hand-written FAQs for all 57 articles (3 Q&As each)
- [x] Comparison tables in 12 articles
- [x] Code splitting (740KB → 192KB initial bundle)
- [x] Error boundary for crash resilience
- [x] Privacy Policy and Terms of Service pages
- [x] Sitemap with all 57 article URLs
- [x] Google Business Profile claimed
- [x] Google Search Console setup

### Known Limitations
- Per-article OG images (currently one generic image)
- Google Analytics 4 not yet installed
- No unit tests
- No E2E tests

---

## Q2 2026 (v2.6 - Polish & Analytics)

### Goals
- Complete production readiness
- Establish analytics baseline
- Begin SEO traction

### Tasks

#### Must Have
- [ ] Configure Make/n8n webhook URL
- [ ] Setup Google Analytics 4
- [ ] Setup Google Tag Manager
- [ ] Create per-article OG images (or dynamic generation)

#### Should Have
- [ ] Add 3-5 real client testimonials to landing page
- [ ] Optimize images with WebP format
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility audit (WCAG 2.1)
- [ ] Bing Webmaster Tools setup

#### Nice to Have
- [ ] Add loading skeleton states
- [ ] Add more interactive content (StatCards, Checklists) to articles
- [ ] Service schema markup
- [ ] PWA manifest

---

## Q3 2026 (v3.0 - Content Authority)

### Goals
- Establish thought leadership through content
- Improve SEO through quality + freshness
- Build trust with social proof

### Features

#### Content Enhancements
- [ ] Add 10-15 new articles (new topics + updating existing)
- [ ] Industry hub landing pages (5 pillar pages)
- [ ] Author profiles on articles
- [ ] Reading progress indicator
- [ ] Table of contents for long articles
- [ ] Related article recommendations (beyond same category)

#### Enhanced Social Proof
- [ ] Video testimonials section
- [ ] Client logo carousel
- [ ] Before/after metrics
- [ ] Case study section with data visualizations

#### Service Pages
- [ ] Individual service detail pages
- [ ] Service-specific CTAs
- [ ] Pricing transparency

---

## Q4 2026 (v4.0 - Client Portal MVP)

### Goals
- Provide client self-service tools
- Streamline project management
- Create competitive moat

### Features

#### Client Dashboard
- [ ] Secure authentication (Clerk or Auth.js)
- [ ] Project status tracking
- [ ] Document sharing
- [ ] Communication history
- [ ] Invoice viewing

#### Project Management
- [ ] Task tracking
- [ ] Milestone timelines
- [ ] File uploads
- [ ] Progress updates

#### Automation Tools
- [ ] Basic analytics dashboard
- [ ] Lead pipeline view
- [ ] Automation status monitoring

---

## 2027 (v5.0 - Platform Expansion)

### Goals
- Geographic expansion
- Service scalability
- Partner ecosystem

### Potential Features

#### Multi-Language Support
- [ ] Gujarati translation
- [ ] Hindi translation
- [ ] Language switcher

#### Partner Program
- [ ] Referral tracking
- [ ] Partner dashboard
- [ ] Commission system

#### Marketplace
- [ ] Pre-built automation templates
- [ ] Self-service configuration
- [ ] Community contributions

#### Advanced Analytics
- [ ] Custom reporting
- [ ] Predictive insights
- [ ] ROI calculators

---

## Technical Evolution

### Infrastructure

#### Current
- **Hosting:** Hostinger (shared hosting, Git deployment)
- **Deployment:** Hostinger Git Integration (auto-deploy on push to main)
- **Build:** Local build, commit dist/ folder
- **Scripts:** deploy.ps1 / deploy.bat for one-click deployment
- **Bundle:** 192KB initial JS (60KB gzipped), 259KB articles loaded on demand

#### Phase 1 (Q3 2026)
- Consider Vercel/Netlify for better DX
- Edge functions for form handling (eliminate webhook dependency)
- Automatic deployments
- Dynamic OG image generation

#### Phase 2 (Q4 2026)
- Backend API (Node.js or Go)
- Database (PostgreSQL or PlanetScale)
- Authentication (Clerk or Auth.js)

#### Phase 3 (2027)
- Microservices architecture
- Real-time features
- Multi-region deployment

### Testing Strategy

#### Phase 1 (Q3 2026)
- [ ] Unit tests (Vitest + React Testing Library)
- [ ] Component tests
- [ ] Form validation tests

#### Phase 2 (Q4 2026)
- [ ] E2E tests (Playwright)
- [ ] Visual regression tests
- [ ] Performance tests

#### Phase 3 (2027)
- [ ] Load testing
- [ ] Security testing
- [ ] Accessibility audits

---

## Success Metrics

### Traffic & Engagement
| Metric | Current | Q2 Target | Q4 Target |
|--------|---------|-----------|-----------|
| Monthly visitors | - | 500 | 2,000 |
| Avg. session duration | - | 2 min | 3 min |
| Bounce rate | - | < 60% | < 50% |
| Article pageviews | - | 200/month | 1,000/month |

### Conversion
| Metric | Current | Q2 Target | Q4 Target |
|--------|---------|-----------|-----------|
| Form submissions | - | 10/month | 30/month |
| WhatsApp clicks | - | 20/month | 50/month |
| Conversion rate | - | 3% | 5% |

### SEO
| Metric | Current | Q2 Target | Q4 Target |
|--------|---------|-----------|-----------|
| Organic traffic | - | 30% | 50% |
| Keyword rankings | - | Top 10 local | Top 5 local |
| Pages indexed | 59 | 59+ | 80+ |
| Featured snippets | 0 | 5 | 15 |

---

## Risk Assessment

### Technical Risks
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Bundle size growth | Medium | Medium | Code splitting + lazy loading ✅ |
| SEO competition | Medium | High | 57 articles + local focus |
| Form submissions lost | Low | High | WhatsApp fallback ✅ |
| Hosting reliability | Low | Medium | Uptime monitoring |

### Business Risks
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Low lead conversion | Medium | High | A/B testing, UX improvements |
| Competition increases | Medium | Medium | Differentiation, quality content |
| Service demand changes | Low | Medium | Market monitoring, pivot capability |

---

## Notes

This roadmap is a living document and should be updated quarterly based on:
- Business performance
- Market feedback
- Technical learnings
- Resource availability

Last updated: 2026-04-16