# PRD.md - Product Requirements Document

## Product Overview

**Product Name:** MottoBiz Landing Page  
**Version:** 1.0.0  
**Status:** Production Ready (Live at https://mottobiz.com)  
**Last Updated:** 2026-04-13  
**Next Review:** See ROADMAP.md for upcoming features

---

## Executive Summary

MottoBiz is a business automation studio based in Surat, Gujarat, India. The landing page serves as the primary digital touchpoint for lead generation, showcasing AI automation services to solopreneurs and small businesses in the Surat region.

### Core Value Proposition
> "We build the digital system that runs your business — so you can focus on growth without hiring a team."

---

## Goals & Objectives

### Primary Goals
1. **Lead Generation** - Capture qualified leads through the audit booking form
2. **Brand Awareness** - Establish MottoBiz as Surat's first AI automation studio
3. **Conversion** - Drive WhatsApp conversations for immediate engagement
4. **SEO Visibility** - Rank for local automation-related searches in Surat

### Success Metrics
- Form submissions (audit bookings)
- WhatsApp click-through rate
- Time on page / scroll depth
- Organic search rankings for target keywords
- Mobile vs desktop conversion rates

---

## Target Audience

### Primary Persona: The Overwhelmed Solopreneur
- **Demographics:** Age 28-50, Surat-based business owner
- **Business Types:** Retail shops, food/tiffin services, coaching centers, professional services, health & wellness, interior design, manufacturing/trade
- **Pain Points:**
  - Spending too much time on repetitive tasks
  - Missing customer inquiries
  - Cannot afford to hire support staff
  - Inconsistent follow-ups leading to lost sales
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

**Services Offered:**
1. Smart Website - Lead forms, SEO optimized, Mobile-first
2. AI Automation - Auto-responses, Lead nurturing, 24/7 availability
3. Social Media - Auto-posting, Content AI, Multi-platform
4. Business Intelligence - Analytics, Reports, Insights
5. Workflow Automation - Integrations, Triggers, Notifications
6. Lead Pipeline - CRM sync, Scoring, Routing

### 3. Lead Magnet (Audit Booking Form)
| Feature | Priority | Status |
|---------|----------|--------|
| Name field (validation) | High | Done |
| WhatsApp field (validation) | High | Done |
| Email field (validation) | High | Done |
| Business type dropdown | High | Done |
| Form submission to webhook | High | Done |
| Success state UI | High | Done |
| Error handling | High | Done |
| Zod validation schema | High | Done |

**Business Type Options:**
- Retail / Shop
- Food & Tiffin Service
- Coaching / Education
- Professional Services
- Health & Wellness
- Interior / Decor
- Manufacturing / Trade
- Other

### 4. Social Proof & Testimonials
| Feature | Priority | Status |
|---------|----------|--------|
| Client logos/brands | Medium | Done |
| Testimonial quotes | Medium | Done |
| Results/metrics display | Medium | Done |

### 5. FAQ Section
| Feature | Priority | Status |
|---------|----------|--------|
| Accordion component | High | Done |
| Common questions (6-8) | High | Done |
| Animated expand/collapse | Medium | Done |

### 6. Final CTA Section
| Feature | Priority | Status |
|---------|----------|--------|
| Urgency headline | High | Done |
| WhatsApp button | High | Done |

### 7. Navigation & Footer
| Feature | Priority | Status |
|---------|----------|--------|
| Sticky navbar with links | High | Done |
| Mobile hamburger menu | High | Done |
| Contact information | High | Done |
| Social links | Medium | Done |
| Floating WhatsApp button | High | Done |

### 8. SEO & Technical
| Feature | Priority | Status |
|---------|----------|--------|
| JSON-LD LocalBusiness schema | High | Done |
| Open Graph tags | High | Done |
| Twitter Card tags | Medium | Done |
| Canonical URL | High | Done |
| Meta description | High | Done |
| Geo meta tags | Medium | Done |
| Preconnect for fonts | Medium | Done |

---

## Design Requirements

### Visual Identity
- **Theme:** Dark luxury / Tech-forward
- **Base Color:** `#0A0A0B` (near black)
- **Primary Accent:** `#6366F1` (indigo)
- **Secondary Accent:** `#F59E0B` (amber/gold)
- **Typography:** Space Grotesk (display) + Inter (body)

### UI Components
- **Glass morphism cards** - Subtle blur + border
- **Gradient text** - For headlines and emphasis
- **Custom cursor** - Pointer devices only
- **Animated background** - Cursor-reactive gradient orbs
- **Scroll-triggered animations** - Staggered fade-up reveals

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## Technical Constraints

### Performance
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Total blocking time < 200ms
- Cumulative Layout Shift < 0.1

### Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari / Chrome

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader compatible
- Proper ARIA labels

---

## Out of Scope (Future Considerations)

1. **Blog/Content Section** - Educational articles on automation
2. **Case Studies** - Detailed project showcases
3. **Pricing Page** - Transparent pricing tiers
4. **Client Portal** - Project management dashboard
5. **Multi-language Support** - Gujarati/Hindi versions
6. **Dark/Light Mode Toggle** - User preference
7. **Live Chat Widget** - Real-time support
8. **Analytics Dashboard** - Self-service insights

---

## Dependencies

### External Services
- **Webhook Endpoint** - n8n or Make for form processing
- **WhatsApp Business API** - For messaging
- **Font CDN** - Google Fonts

### Third-Party Integrations (Future)
- Google Analytics 4
- Google Tag Manager
- Hotjar/Clarity for heatmaps
- CRM integration (HubSpot/Salesforce)

---

## Timeline & Milestones

| Phase | Deliverable | Status |
|-------|-------------|--------|
| Phase 1 | Core landing page structure | Done |
| Phase 2 | All sections implemented | Done |
| Phase 3 | Form integration ready | Done |
| Phase 4 | SEO optimization | Done |
| Phase 5 | Deployment pipeline | Done |
| Phase 6 | Production deployment | Done |

---

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Webhook endpoint not configured | Form submissions fail | Graceful error messaging, fallback to WhatsApp |
| Slow loading on mobile | Lost conversions | Optimized assets, lazy loading |
| SEO competition | Low organic traffic | Local SEO focus, quality content |
| WhatsApp API changes | Broken CTA links | Regular monitoring, alternative contact methods |

---

## Appendices

### A. Key Files Reference
- `src/lib/config.ts` - All configuration constants
- `src/components/LeadMagnet.tsx` - Form implementation
- `src/components/SEOHead.tsx` - Meta tags and schema
- `src/index.css` - Design system tokens

## Appendices

### A. Key Files Reference
- `src/lib/config.ts` - All configuration constants
- `src/components/LeadMagnet.tsx` - Form implementation
- `src/components/SEOHead.tsx` - Meta tags and schema
- `src/index.css` - Design system tokens

### B. Related Documents
- `AGENTS.md` - Development guidelines
- `CONTEXT.md` - **Project state & execution memory (START HERE)**
- `TASKS.md` - Task tracking
- `TECHSTACK.md` - Technology details
- `ROADMAP.md` - Future development plans

### C. Deployment Notes

**Current Deployment Method:** Hostinger Git Integration
- Push to `main` branch triggers auto-deployment
- `dist/` folder is committed to repository (required by Hostinger)
- Deployment scripts: `deploy.ps1` / `deploy.bat`

**Deployment Process:**
```powershell
# From repo root:
.\deploy.bat
```

See `CONTEXT.md` for detailed troubleshooting and architecture decisions.

### D. Webhook Configuration Status

The `LEAD_WEBHOOK_URL` in `src/lib/config.ts` is currently **empty**. This is intentional:

1. Site is live and generating traffic
2. Webhook (n8n/Make) not yet configured
3. Form shows graceful error with WhatsApp fallback
4. No leads are lost - users redirected to WhatsApp

**To configure webhook:**
1. Set up n8n or Make workflow
2. Create webhook endpoint
3. Update `LEAD_WEBHOOK_URL` in config.ts
4. Test form submission end-to-end
5. Deploy

### E. Recent Changes (v1.0)

| Date | Change | Impact |
|------|--------|--------|
| 2026-04-13 | Switched to Hostinger Git deployment | More reliable than FTP Actions |
| 2026-04-13 | Added deploy.ps1 script | One-click deployment |
| 2026-04-13 | Added .env to .gitignore | Security improvement |
| 2026-04-12 | Added Local SEO guides | GBP + citation strategy |
| 2026-04-10 | Initial production release | Site live at mottobiz.com |
