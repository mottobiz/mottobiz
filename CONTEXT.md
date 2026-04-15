# CONTEXT.md - Project Context & Memory

## Document Purpose

This file serves as the **single source of truth** for the current state of the MottoBiz project. It captures recent changes, execution learnings, troubleshooting steps, architectural decisions, and strategic context. Anyone picking up this project should read this file first.

**Last Updated:** 2026-04-13  
**Project Status:** Production Ready (v1.0)  
**Current Focus:** Deployment Optimization & Local SEO

---

## Quick Status

| Aspect | Status | Notes |
|--------|--------|-------|
| Landing Page | ✅ Live | https://mottobiz.com |
| Lead Form | ✅ Working | Graceful fallback when webhook empty |
| WhatsApp Integration | ✅ Working | Direct wa.me links |
| SEO Schema | ✅ Implemented | LocalBusiness + ServiceAreas |
| Deployment | ✅ Automated | Git + Hostinger auto-deploy |
| Analytics | ❌ Not Setup | GA4 & GTM pending |
| Webhook | ❌ Not Configured | n8n/Make endpoint needed |

---

## Recent Execution Log

### 2026-04-13: Deployment Pipeline Setup

**What Was Done:**
1. Created PowerShell deployment script (`deploy.ps1`) with build automation
2. Created batch file wrapper (`deploy.bat`) for one-click deployment
3. Configured Hostinger Git integration for auto-deployment
4. Removed GitHub Actions workflow (switched to Hostinger's native Git)
5. Added `.env` to `.gitignore` for security
6. Configured `dist/` folder to be committed for Hostinger deployment

**Key Decisions:**
- **Hostinger Git > GitHub Actions:** Hostinger's built-in Git integration is simpler and more reliable than FTP-based Actions
- **Commit dist/ folder:** Required because Hostinger pulls directly from GitHub
- **PowerShell script:** Windows-native, no WSL dependency for deployment

**Files Created/Modified:**
```
NEW: deploy.ps1          # Main deployment script
NEW: deploy.bat          # Windows wrapper
MOD: .gitignore          # Added .env, removed dist/ ignore
MOD: mottobiz/.gitignore # Added .env
DEL: .github/workflows/deploy.yml  # Removed (using Hostinger Git)
```

**Deployment Process (Current):**
```powershell
# From repo root:
.\deploy.bat
# Or with custom message:
.\deploy.ps1 -Message "Your commit message"
```

**How It Works:**
1. Script checks for uncommitted changes
2. Builds the project (`npm run build`)
3. Stages `dist/` folder
4. Commits with provided message
5. Pushes to `main` branch
6. Hostinger detects push and auto-deploys

---

### 2026-04-13: Environment Security

**What Was Done:**
- Added `.env` to `.gitignore` in both root and `mottobiz/` directories
- Ensured no sensitive data (webhook URLs, API keys) can be accidentally committed

**Critical Security Rule:**
> NEVER commit `.env` files or any file containing secrets. The webhook URL will be configured server-side on Hostinger when needed.

---

### 2026-04-12: Local SEO Documentation

**What Was Done:**
1. Created comprehensive Google Business Profile guide
2. Created Local Citation Building guide with 30+ directories
3. Defined 20 service areas in Surat for geo-targeting
4. Documented NAP (Name/Address/Phone) consistency requirements

**Key Files:**
- `GOOGLE_BUSINESS_PROFILE_GUIDE.md` - Complete GBP setup instructions
- `LOCAL_CITATION_BUILDING_GUIDE.md` - 30+ directories to list on

**Service Areas Configured (config.ts):**
```typescript
// 20 Surat neighborhoods defined with lat/lng
// Primary: Varachha, Adajan, Vesu, Piplod, Athwa, etc.
// Extended: Katargam, Udhna, Rander, etc.
```

---

## Architecture & Technical Learnings

### Deployment Architecture (Current)

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

**Why This Architecture:**
1. **Simple:** No CI/CD pipeline to maintain
2. **Reliable:** Hostinger's native Git is purpose-built
3. **Fast:** Deploys within 2-3 minutes of push
4. **Versioned:** Every deployment is a Git commit

**Previous Architecture (Abandoned):**
```
GitHub Actions → FTP upload → Hostinger
```
**Why Abandoned:** FTP credentials in GitHub secrets, flaky connections, slower

---

### Critical Configuration: Single Source of Truth

**ALWAYS** import from `@/lib/config.ts` - never hardcode:

```typescript
// ✅ CORRECT - In any component:
import { WHATSAPP_LINK, EMAIL, SITE_URL } from '@/lib/config'

// ❌ WRONG - Never do this:
<a href="https://wa.me/917487957972">...</a>
```

**Config File Location:** `mottobiz/src/lib/config.ts`

**Current Values:**
```typescript
WHATSAPP_NUMBER = '917487957972'
EMAIL = 'webmaster@mottobiz.com'
PHONE_DISPLAY = '+91 74879 57972'
SITE_URL = 'https://mottobiz.com'
LEAD_WEBHOOK_URL = ''  // Empty = graceful error handling
```

---

### Form Handling: Graceful Degradation

**Current Implementation:**
```typescript
// When webhook URL is empty (not configured):
if (!LEAD_WEBHOOK_URL) {
  setSubmitError('Form temporarily unavailable. Please use WhatsApp.')
  return
}
```

**Why This Pattern:**
- Site is live and generating traffic
- Webhook (n8n/Make) not yet configured
- Don't block leads - redirect to WhatsApp
- Error message is user-friendly and actionable

**Future Enhancement:**
When webhook is ready:
1. Set up n8n workflow with form submission endpoint
2. Update `LEAD_WEBHOOK_URL` in config.ts
3. Test end-to-end submission
4. Deploy

---

## Troubleshooting Log

### Issue: GitHub Actions FTP Deployment Failures

**Symptom:** Intermittent deployment failures, FTP timeout errors

**Root Cause:** GitHub Actions FTP action unreliable for Hostinger shared hosting

**Resolution:** Switched to Hostinger's native Git integration

**Prevention:** Documented deployment process in CONTEXT.md

---

### Issue: dist/ Folder Not Deploying

**Symptom:** Changes visible in GitHub but not on live site

**Root Cause:** `.gitignore` was excluding `dist/` folder

**Resolution:** Commented out `dist` in `.gitignore`:
```gitignore
# dist - committed for Hostinger deployment
```

**Lesson:** Hostinger needs `dist/` committed since it pulls from GitHub directly

---

### Issue: Environment Variables Exposed

**Symptom:** Nearly committed `.env` file with webhook URL

**Root Cause:** `.env` not in `.gitignore`

**Resolution:** Added `.env` to both `.gitignore` files:
```gitignore
# Environment variables
.env
.env.local
.env.*.local
```

**Lesson:** Always add `.env` to `.gitignore` BEFORE creating the file

---

### Issue: Custom Cursor on Touch Devices

**Symptom:** Custom cursor appearing on mobile/tablet

**Root Cause:** No media query check for pointer type

**Resolution:** Added CSS media query:
```css
@media (pointer: fine) and (hover: hover) {
  /* Custom cursor styles */
}
```

**Code Location:** `mottobiz/src/components/effects.tsx`

---

### Issue: TypeScript baseUrl Deprecation Warning

**Symptom:** TS warnings about `baseUrl` deprecation in tsconfig.json

**Root Cause:** TypeScript 6.0 deprecated `baseUrl` without `paths`

**Resolution:** Added to tsconfig.json:
```json
{
  "compilerOptions": {
    "ignoreDeprecations": "6.0"
  }
}
```

**Note:** DO NOT REMOVE - this is required for Vite path aliasing to work

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

### Making Changes

```powershell
# 1. Make your code changes
# 2. Test locally with npm run dev
# 3. Build and deploy:
cd D:\IDEprojects\Mottobiz
.\deploy.bat
```

### Project Structure Quick Reference

```
mottobiz/
├── src/
│   ├── components/          # All section components
│   │   ├── Hero.tsx         # Landing hero section
│   │   ├── Services.tsx     # Service cards
│   │   ├── LeadMagnet.tsx   # Lead capture form ⭐
│   │   ├── FAQ.tsx          # Accordion FAQ
│   │   ├── effects.tsx      # CustomCursor + AnimatedBackground
│   │   └── SEOHead.tsx      # Meta tags + JSON-LD
│   ├── lib/
│   │   ├── config.ts        # ⭐ ALL constants - EDIT HERE
│   │   ├── animations.ts    # Framer Motion variants
│   │   └── utils.ts         # cn() helper
│   ├── index.css            # Tailwind theme + custom styles
│   ├── App.tsx              # Section composition
│   └── main.tsx             # Entry point
├── dist/                    # ⭐ COMMITTED (for Hostinger)
└── package.json
```

---

## Strategic Context

### Business Goals

1. **Lead Generation:** Primary goal - capture qualified leads through audit booking form
2. **Local SEO:** Rank for automation-related searches in Surat
3. **Brand Authority:** Position as "Surat's first AI automation studio"
4. **Conversion:** Drive WhatsApp conversations for immediate engagement

### Target Audience

**Primary:** Overwhelmed solopreneurs (28-50 years, Surat-based)
- Retail shops, food services, coaching centers
- Pain: Too much time on repetitive tasks, can't afford staff
- Goal: Automate without hiring

**Secondary:** Growth-focused small businesses (5-20 employees)
- Pain: Inefficient workflows, manual data entry
- Goal: Streamline operations

### Marketing Strategy

1. **Local SEO (In Progress):**
   - Google Business Profile optimization
   - Local citation building (30+ directories)
   - Service area geo-targeting (20 Surat neighborhoods)

2. **Content (Planned):**
   - Blog posts on automation
   - Case studies
   - Client testimonials

3. **Conversion Optimization:**
   - WhatsApp CTAs throughout site
   - Lead magnet (free audit)
   - Social proof

---

## Technical Debt & Known Issues

| Item | Priority | Status | Notes |
|------|----------|--------|-------|
| Webhook Configuration | High | Pending | n8n/Make endpoint needed |
| Google Analytics 4 | High | Pending | Tracking code not added |
| Google Tag Manager | Medium | Pending | For conversion tracking |
| Unit Tests | Medium | Not Started | Jest + React Testing Library |
| E2E Tests | Low | Not Started | Playwright |
| Lazy Loading | Low | Not Started | For below-fold images |
| Error Boundaries | Low | Not Started | React error handling |

---

## Future Plans

### Q2 2026 (Immediate)
1. Configure production webhook for lead form
2. Setup Google Analytics 4
3. Claim Google Business Profile
4. Start citation building (Week 1-4)
5. Add 3-5 real client testimonials

### Q3 2026 (Short-term)
1. Blog/CMS integration
2. Individual service detail pages
3. Video testimonials
4. Case studies section

### Q4 2026 (Long-term)
1. Client portal MVP
2. Project tracking dashboard
3. Multi-language support (Gujarati)

---

## External Dependencies

### Required Setup

| Service | Purpose | Status | Action Needed |
|---------|---------|--------|---------------|
| Google Business Profile | Local SEO | ⬜ Not Claimed | Claim and verify |
| n8n or Make | Form webhook | ⬜ Not Setup | Create workflow |
| Google Analytics 4 | Traffic analytics | ⬜ Not Setup | Add tracking code |
| Google Tag Manager | Tag management | ⬜ Not Setup | Configure tags |

### Current Integrations

| Service | Purpose | Status |
|---------|---------|--------|
| WhatsApp (wa.me) | Primary CTA | ✅ Working |
| Hostinger | Hosting | ✅ Working |
| GitHub | Version control | ✅ Working |

---

## Resources & References

### Documentation Files
- `AGENTS.md` - Development guidelines for AI assistants
- `PRD.md` - Product requirements document
- `TASKS.md` - Task tracking and backlog
- `ROADMAP.md` - Future development plans
- `TECHSTACK.md` - Technology stack details
- `ARCHITECTURE.md` - System architecture
- `DESIGN.md` - Design system
- `GOOGLE_BUSINESS_PROFILE_GUIDE.md` - GBP optimization
- `LOCAL_CITATION_BUILDING_GUIDE.md` - Citation building

### Useful Commands

```powershell
# Development
npm run dev           # Start dev server
npm run build         # Production build
npm run preview       # Preview production build

# Deployment
.\deploy.bat          # Deploy with default message
.\deploy.ps1 -Message "Custom message"  # Deploy with custom message

# Git
git status            # Check changes
git log --oneline -10 # View recent commits
```

---

## Decision Log

| Date | Decision | Context | Impact |
|------|----------|---------|--------|
| 2026-04-13 | Hostinger Git over GitHub Actions | FTP was unreliable | Simpler, faster deployments |
| 2026-04-13 | Commit dist/ folder | Hostinger needs it | Required for auto-deploy |
| 2026-04-13 | Empty webhook URL | Not ready yet | Graceful fallback to WhatsApp |
| 2026-04-12 | 20 service areas | Local SEO targeting | Better geo-ranking |
| 2026-04-10 | React 19 + Vite 8 | Latest stable | Better performance |

---

## Contact & Ownership

**Project:** MottoBiz  
**Domain:** https://mottobiz.com  
**Business Location:** Surat, Gujarat, India  
**Phone:** +91 74879 57972  
**Email:** webmaster@mottobiz.com  

---

## How to Update This File

1. **After significant changes:** Add entry to "Recent Execution Log"
2. **After issues resolved:** Add to "Troubleshooting Log"
3. **After decisions made:** Add to "Decision Log"
4. **When status changes:** Update "Quick Status" table
5. **Regularly:** Update "Last Updated" date

**Remember:** This file is for HUMANS - be verbose, explain the "why", include examples.
