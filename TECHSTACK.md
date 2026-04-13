# TECHSTACK.md - Technology Stack Documentation

## Overview

MottoBiz is a modern single-page application built with a focus on performance, developer experience, and maintainability.

---

## Core Technologies

### Frontend Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.0.0 | UI component library |
| TypeScript | 6.0.2 | Type-safe JavaScript |

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
| framer-motion | 12.38.0 | Animation library for React |

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
- Better hydration for SSR (future-proofing)

### Why Vite over Create React App?
- Faster development server startup
- Lightning-fast HMR
- Optimized production builds
- Native ESM support

### Why Tailwind CSS v4?
- New engine with better performance
- CSS-first configuration (no tailwind.config.js)
- Smaller bundle size
- Built-in Vite plugin

### Why Framer Motion?
- Declarative animation syntax
- Hardware-accelerated animations
- Built-in gesture support
- Excellent React integration

### Why Radix UI?
- Unstyled, accessible primitives
- Full keyboard navigation
- ARIA compliance out of the box
- Composable API

### Why Zod + react-hook-form?
- Type-safe form validation
- Runtime type checking
- Excellent DX with TypeScript
- Minimal re-renders

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

### Runtime
- Lazy loading (planned)
- Code splitting (planned)
- Font preloading
- Preconnect to external origins

### CSS
- Utility-first approach (smaller CSS)
- No unused styles in production
- CSS custom properties for theming

---

## Deployment Stack

### Hosting
- **Provider:** Hostinger
- **Method:** FTP deployment via GitHub Actions
- **Domain:** mottobiz.com

### CI/CD
- **Platform:** GitHub Actions
- **Trigger:** Push to main branch
- **Steps:**
  1. Checkout code
  2. Setup Node.js 20
  3. Install dependencies (npm ci)
  4. Build project (npm run build)
  5. Deploy via FTP to Hostinger

---

## External Services

### Currently Used
| Service | Purpose |
|---------|---------|
| Google Fonts | Typography hosting |
| WhatsApp | Primary contact channel |

### Planned Integrations
| Service | Purpose |
|---------|---------|
| n8n / Make | Webhook automation |
| Google Analytics 4 | Traffic analytics |
| Google Tag Manager | Tag management |
| Hotjar / Clarity | User behavior analysis |

---

## File Structure

```
mottobiz/
├── src/
│   ├── components/        # React components
│   │   ├── effects.tsx    # Visual effects
│   │   ├── FAQ.tsx
│   │   ├── FinalCTA.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── LeadMagnet.tsx
│   │   ├── Navbar.tsx
│   │   ├── Pain.tsx
│   │   ├── Proof.tsx
│   │   ├── Qualifier.tsx
│   │   ├── SEOHead.tsx
│   │   ├── Services.tsx
│   │   └── SocialProof.tsx
│   ├── lib/
│   │   ├── animations.ts  # Framer Motion variants
│   │   ├── config.ts      # Environment constants
│   │   └── utils.ts       # Utility functions
│   ├── assets/            # Static assets
│   ├── index.css          # Global styles + Tailwind
│   ├── main.tsx           # App entry point
│   ├── App.tsx            # Root component
│   └── vite-env.d.ts      # Vite type declarations
├── .github/
│   └── workflows/
│       └── deploy.yml     # CI/CD pipeline
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

---

## Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build locally |

---

## Upgrade Path

### Near-Term
- [ ] React 19 → Latest patch versions
- [ ] Tailwind CSS v4 → Keep updated
- [ ] Add testing libraries

### Long-Term
- [ ] Consider React Server Components (if SSR needed)
- [ ] Evaluate Bun as runtime alternative
- [ ] Consider tRPC if backend is added
