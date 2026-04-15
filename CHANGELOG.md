# CHANGELOG.md - MottoBiz Version History

All notable changes to the MottoBiz project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0.1] - 2026-04-13

### Changed
- **Deployment Method:** Switched from GitHub Actions FTP to Hostinger Git Integration
  - More reliable deployment process
  - Faster deploy times (2-3 minutes)
  - No FTP credentials in GitHub secrets
  - See `CONTEXT.md` for detailed reasoning

### Added
- `deploy.ps1` - PowerShell deployment script with interactive prompts
- `deploy.bat` - Windows batch wrapper for one-click deployment
- `CONTEXT.md` - Comprehensive project context and execution memory
- `.env` to `.gitignore` - Security improvement to prevent secret exposure

### Removed
- `.github/workflows/deploy.yml` - GitHub Actions workflow (replaced by Hostinger Git)

### Security
- Added `.env` and `.env.*.local` to `.gitignore` in both root and mottobiz directories
- Prevents accidental commit of environment variables and secrets

---

## [1.0.0] - 2026-04-10 to 2026-04-12

### Added - Initial Production Release

#### Core Website
- Complete landing page with 10 sections
  - Hero with animated headline and stats
  - Pain points section
  - Social proof/credibility markers
  - Services showcase (6 services)
  - How it works process
  - Qualifier section
  - Testimonials
  - Lead magnet form (audit booking)
  - FAQ accordion
  - Final CTA
  - Footer with contact info

#### Visual Effects
- Custom cursor (pointer devices only)
- Animated background with gradient orbs
- Scroll-triggered fade-up animations
- Glass morphism card effects
- Hover animations on CTAs and cards

#### Form Integration
- React Hook Form for state management
- Zod schema validation
- Graceful error handling
- WhatsApp fallback when webhook unavailable

#### SEO
- JSON-LD LocalBusiness schema
- ServiceArea schema with 20 Surat neighborhoods
- Open Graph tags
- Twitter Card tags
- Canonical URL
- Geo meta tags
- Preconnect for Google Fonts

#### Documentation
- `AGENTS.md` - Development guidelines
- `PRD.md` - Product requirements
- `TASKS.md` - Task tracking
- `ROADMAP.md` - Future plans
- `TECHSTACK.md` - Technology details
- `ARCHITECTURE.md` - System architecture
- `DESIGN.md` - Design system
- `GOOGLE_BUSINESS_PROFILE_GUIDE.md` - GBP optimization
- `LOCAL_CITATION_BUILDING_GUIDE.md` - Citation building strategy

### Technical Stack
- React 19.0.0
- TypeScript 6.0.2
- Vite 8.0.4
- Tailwind CSS v4.2.2
- Framer Motion 12.38.0
- react-hook-form 7.72.1
- Zod 4.3.6
- Radix UI primitives
- lucide-react icons

### Infrastructure
- Hostinger shared hosting
- Domain: https://mottobiz.com
- Let's Encrypt SSL
- GitHub repository for version control

### Known Limitations (v1.0.0)
- Webhook URL empty (graceful fallback to WhatsApp)
- No analytics tracking (GA4, GTM)
- Google Business Profile not claimed
- No blog/content section

---

## Pre-Release Development History

### 2026-04-10 - Project Initialization
- Initialize React + Vite project
- Configure TypeScript with path aliases
- Setup Tailwind CSS v4
- Create project structure
- Define design tokens

### 2026-04-10 to 2026-04-11 - Core Development
- Build all page sections
- Implement animations with Framer Motion
- Create form with validation
- Add SEO components

### 2026-04-11 to 2026-04-12 - Polish & Deployment
- Mobile responsive design
- Performance optimization
- Initial GitHub Actions workflow (FTP)
- Production deployment

---

## Versioning Strategy

We use [Semantic Versioning](https://semver.org/spec/v2.0.0.html):

- **MAJOR** version - Incompatible changes, major redesigns
- **MINOR** version - New features, sections, functionality
- **PATCH** version - Bug fixes, documentation updates, optimizations

### Version Labels

| Label | Meaning |
|-------|---------|
| [Unreleased] | Changes on main branch, not yet deployed |
| [X.Y.Z] | Specific released version |

---

## Planned Versions

### [1.1.0] - Q2 2026 - Polish & Optimization
- Configure production webhook URL
- Setup Google Analytics 4
- Setup Google Tag Manager
- Add privacy policy page
- Add terms of service page
- Create XML sitemap
- Add robots.txt optimization

### [1.2.0] - Q3 2026 - Content & Authority
- Blog/CMS integration
- Individual service detail pages
- Video testimonials
- Case studies section
- Enhanced structured data

### [2.0.0] - Q4 2026 - Client Portal MVP
- Client authentication
- Project status tracking
- Document sharing
- Basic analytics dashboard

### [3.0.0] - 2027 - Platform Expansion
- Multi-language support (Gujarati, Hindi)
- Partner program
- Automation template marketplace
- Advanced analytics

---

## How to Update This Changelog

### When to Add Entries

1. **For each deployment** - Add a new version section
2. **For significant changes** - Document in [Unreleased] section during development
3. **For breaking changes** - Mark clearly and explain migration path

### Categories

Use these categories under each version:

- `Added` - New features
- `Changed` - Changes to existing functionality
- `Deprecated` - Soon-to-be removed features
- `Removed` - Removed features
- `Fixed` - Bug fixes
- `Security` - Security improvements

### Format

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added/Changed/Fixed/Security
- Description of change
- Reference to issue/PR if applicable
```

---

## References

- See `CONTEXT.md` for detailed execution context
- See `ROADMAP.md` for future plans
- See `TASKS.md` for task-level tracking
