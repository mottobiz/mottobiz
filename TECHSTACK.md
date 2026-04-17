# TECHSTACK.md - Technology Stack Documentation

## Overview

MottoBiz is a modern single-page application built with React, TypeScript, and Vite, focused on performance, SEO, and content-driven lead generation.

---

## Core Technologies

### Frontend Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.0.0 | UI component library |
| TypeScript | 6.0.2 | Type-safe JavaScript |
| React Router | 7.x | Client-side routing with lazy loading |

### Build Tools
| Technology | Version | Purpose |
|------------|---------|---------|
| Vite | 8.0.4 | Build tool & dev server |
| @vitejs/plugin-react | 6.0.1 | React plugin for Vite |

### Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 4.2.2 | Utility-first CSS framework |
| @tailwindcss/vite | 4.2.2 | Vite integration for Tailwind v4 |

---

## Libraries & Dependencies

### Animation
| Library | Version | Purpose |
|---------|---------|---------|
| framer-motion | 12.38.0 | Scroll animations, page transitions, micro-interactions |

### Form Handling
| Library | Version | Purpose |
|---------|---------|---------|
| react-hook-form | 7.72.1 | Form state management |
| @hookform/resolvers | 5.2.2 | Schema validation integration |
| zod | 4.3.6 | Schema validation |

### UI Components
| Library | Version | Purpose |
|---------|---------|---------|
| @radix-ui/react-accordion | 1.2.12 | Accessible accordion |
| @radix-ui/react-dialog | 1.1.15 | Modal dialog |
| @radix-ui/react-select | 2.2.6 | Dropdown select |
| @radix-ui/react-tooltip | 1.2.8 | Tooltip component |

### Utilities
| Library | Version | Purpose |
|---------|---------|---------|
| clsx | 2.1.1 | Conditional class names |
| tailwind-merge | 3.5.0 | Merge Tailwind classes |
| class-variance-authority | 0.7.1 | Component variants |
| lucide-react | 1.8.0 | Icon library |

### SEO
| Library | Version | Purpose |
|---------|---------|---------|
| react-helmet-async | 3.0.0 | Document head management |

---

## Development Dependencies

### Type Definitions
| Package | Version |
|---------|---------|
| @types/node | 25.6.0 |
| @types/react | 19.2.14 |
| @types/react-dom | 19.2.3 |

---

## Architecture Decisions

### Why React 19?
- Latest stable release with improved performance
- Concurrent rendering capabilities
- Better error boundaries

### Why Vite over Create React App?
- Faster development server startup
- Lightning-fast HMR
- Optimized production builds with code splitting
- Native ESM support

### Why Tailwind CSS v4?
- New engine with better performance
- CSS-first configuration (no tailwind.config.js)
- Smaller bundle size
- Built-in Vite plugin

### Why React.lazy for Code Splitting?
- Reduced initial bundle from 740KB to 192KB
- Articles data (259KB) loads only on resources pages
- Each route loaded on demand
- Error boundary provides crash resilience

### Why react-helmet-async?
- Works with React 19 concurrent rendering
- Server-side compatible for future SSR migration
- Prevents memory leaks with automatic cleanup

---

## Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |
| iOS Safari | Last 2 versions |
| Android Chrome | Last 2 versions |

---

## Performance Optimizations

### Build-Time
- Tree-shaking via Vite
- CSS minification via LightningCSS
- Asset hashing for cache busting
- Code splitting with React.lazy

### Runtime
- ✅ Code splitting (lazy routes)
- ✅ Error boundary for crash resilience
- ✅ Font preloading
- ✅ Preconnect to external origins
- ✅ On-demand article data loading (259KB only when needed)

### CSS
- Utility-first approach (smaller CSS)
- No unused styles in production
- CSS custom properties for theming

### Bundle Sizes (Production)
```
index.js           192KB (60KB gzipped)   - Core React + Router
HomePage.js        148KB (45KB gzipped)   - Landing page sections
articles.js        259KB (88KB gzipped)   - All 57 articles data
proxy.js           158KB (51KB gzipped)   - React Helmet + shared
chunk.js            41KB (14KB gzipped)   - Shared utilities
ResourcesPage.js    14KB (4KB gzipped)    - Resources hub
ArticlePage.js      10KB (3KB gzipped)    - Article detail + parser
PrivacyPolicy.js     7KB (3KB gzipped)    - Privacy page
TermsOfService.js    9KB (4KB gzipped)    - Terms page
effects.js           6KB (2KB gzipped)    - Cursor + background
use-in-view.js       1KB (0.5KB gzipped)  - Framer Motion hook
index.css           50KB (9KB gzipped)    - All styles
```

---

## Deployment Stack

### Hosting
| Component | Provider | Details |
|-----------|----------|--------|
| Hosting | Hostinger | Shared hosting, Git deployment |
| Domain | Hostinger | mottobiz.com |
| SSL | Let's Encrypt | Auto-renewal |
| CDN | None currently | CloudFlare considered for future |

### Deployment Architecture

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

### CI/CD Pipeline
- **Trigger:** Push to `main` branch
- **Process:** Pre-commit hook runs `npm run build` → Hostinger auto-deploys
- **Scripts:** `deploy.ps1` / `deploy.bat` for one-click deployment

### Environment Variables

| Variable | Purpose | Required | Default |
|----------|---------|----------|---------|
| `VITE_LEAD_WEBHOOK_URL` | Make/n8n webhook endpoint | No | Empty string (WhatsApp fallback) |

**Security Rule:** `.env` files are gitignored. Never commit secrets.

---

## External Services

### Currently Used
| Service | Purpose |
|---------|---------|
| Google Fonts | Typography hosting (Space Grotesk, Inter) |
| WhatsApp | Primary contact channel (wa.me links + form pre-fill) |

### Planned Integrations
| Service | Purpose | Priority |
|---------|---------|----------|
| Make/n8n | Lead webhook processing | High |
| Google Analytics 4 | Traffic analytics | Medium |
| Google Tag Manager | Tag management | Medium |
| Hotjar/Clarity | User behavior analysis | Low |

---

## File Structure

```
mottobiz/
├── src/
│   ├── components/
│   │   ├── effects.tsx              # CustomCursor + AnimatedBackground
│   │   ├── ErrorBoundary.tsx        # React error boundary with styled UI
│   │   ├── SEOHead.tsx              # Meta tags + JSON-LD schema markup
│   │   ├── Navbar.tsx               # Navigation with Resources link
│   │   ├── Hero.tsx                 # Landing page hero section
│   │   ├── Pain.tsx                 # Problem agitation section
│   │   ├── Proof.tsx                # Credibility markers
│   │   ├── Services.tsx             # Service offerings (6 cards)
│   │   ├── HowItWorks.tsx           # Process steps
│   │   ├── Qualifier.tsx             # Ideal client filter
│   │   ├── SocialProof.tsx          # Testimonials
│   │   ├── LeadMagnet.tsx           # Lead capture form (WhatsApp fallback)
│   │   ├── FAQ.tsx                  # Accordion Q&A
│   │   ├── FinalCTA.tsx             # Final conversion push
│   │   ├── Footer.tsx               # Footer with privacy/terms links
│   │   └── resources/
│   │       ├── ArticleCard.tsx       # Card + Featured card with thumbnails
│   │       ├── ArticleComponents.tsx # 8 interactive content components
│   │       ├── ArticleThumbnail.tsx  # Dynamic SVG thumbnail generator
│   │       ├── ArticleGrid.tsx       # Grid with load more
│   │       ├── CategoryFilter.tsx    # Category pill filter + search
│   │       ├── ResourcesHero.tsx    # Hero + newsletter/WhatsApp CTAs
│   │       ├── ResourcesPage.tsx    # Full hub page composition
│   │       └── index.ts             # Barrel export
│   ├── pages/
│   │   ├── HomePage.tsx              # Landing page section composition
│   │   ├── ResourcesPage.tsx          # Resources hub wrapper (lazy loaded)
│   │   ├── ArticlePage.tsx           # Article detail with content parser (lazy)
│   │   ├── PrivacyPolicy.tsx         # Privacy page (lazy loaded)
│   │   └── TermsOfService.tsx        # Terms page (lazy loaded)
│   ├── data/
│   │   └── articles.ts              # ALL 57 articles + enrichment functions
│   ├── types/
│   │   └── article.ts               # Types, CATEGORY_COLORS, CATEGORY_INFO, INDUSTRY_HUBS
│   ├── lib/
│   │   ├── config.ts                # ⭐ All contact/business constants + env vars
│   │   ├── animations.ts             # Framer Motion variants
│   │   └── utils.ts                  # cn() helper for Tailwind classes
│   ├── index.css                     # Tailwind v4 theme + custom keyframes + design tokens
│   ├── App.tsx                       # Lazy routes + Suspense + ErrorBoundary
│   ├── main.tsx                       # Entry point with HelmetProvider
│   └── vite-env.d.ts                 # Vite type declarations + env vars
├── public/
│   ├── robots.txt
│   ├── sitemap.xml                   # All 57 article URLs + static pages
│   ├── og-image.png                  # Generic OG image
│   └── logo-static.svg               # Logo
├── .env                               # VITE_LEAD_WEBHOOK_URL
├── .env.example                       # Template for env vars
├── package.json
├── tsconfig.json                      # ignoreDeprecations: "6.0"
└── vite.config.ts                     # Path alias @/ → ./src
```

---

## Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (port auto-increments) |
| `npm run build` | TypeScript check + Vite production build |
| `npm run preview` | Preview production build locally |
| `cd .. && deploy.bat` | Deploy to production (from repo root) |

---

## Upgrade Path

### Near-Term
- [ ] React 19 → Latest patch versions
- [ ] Tailwind CSS v4 → Keep updated
- [ ] Add Vitest for unit testing
- [ ] Add Playwright for E2E testing

### Long-Term
- [ ] Consider React Server Components (if SSR needed)
- [ ] Evaluate Bun as runtime alternative
- [ ] Consider tRPC if backend is added