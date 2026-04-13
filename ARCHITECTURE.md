# ARCHITECTURE.md - System Architecture Documentation

## System Overview

MottoBiz is a statically-generated single-page application (SPA) designed for high performance, SEO optimization, and lead generation. The architecture follows a component-based approach with clear separation of concerns.

```
┌─────────────────────────────────────────────────────────────────┐
│                         BROWSER                                  │
├─────────────────────────────────────────────────────────────────┤
│  React App (SPA)                                                │
│  ├── Components (UI Layer)                                      │
│  ├── Hooks (State Management)                                   │
│  └── Utils (Helper Functions)                                   │
└──────────────────────────┬──────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│  Google Fonts │  │   WhatsApp    │  │   Webhook     │
│   (CDN)       │  │   (wa.me)     │  │  (n8n/Make)   │
└───────────────┘  └───────────────┘  └───────────────┘
```

---

## Component Architecture

### Component Hierarchy

```
App
├── SEOHead                    # Meta tags, JSON-LD schema
├── CustomCursor               # Pointer device cursor
├── AnimatedBackground         # Gradient orb effect
│
└── Page Container
    ├── Navbar                 # Fixed navigation
    │   ├── Logo
    │   ├── Nav Links
    │   └── CTA Button
    │
    ├── Main Content
    │   ├── Hero               # Landing section
    │   │   ├── Badge
    │   │   ├── Headline
    │   │   ├── Subheadline
    │   │   ├── CTAs
    │   │   ├── Stats
    │   │   └── Scroll Indicator
    │   │
    │   ├── Pain               # Problem agitation
    │   ├── Proof              # Credibility markers
    │   │
    │   ├── Services           # Service offerings
    │   │   └── ServiceCard[]
    │   │
    │   ├── HowItWorks         # Process steps
    │   ├── Qualifier          # Ideal client filter
    │   ├── SocialProof        # Testimonials
    │   │
    │   ├── LeadMagnet         # Form section
    │   │   ├── Form
    │   │   ├── SuccessState
    │   │   └── ErrorState
    │   │
    │   ├── FAQ                # Accordion Q&A
    │   │   └── AccordionItem[]
    │   │
    │   └── FinalCTA           # Last conversion push
    │
    └── Footer
        ├── Brand Info
        ├── Contact Info
        ├── Quick Links
        └── WhatsApp FAB
```

### Component Categories

| Category | Components | Purpose |
|----------|------------|---------|
| Layout | Navbar, Footer | Page structure |
| Sections | Hero, Services, FAQ, etc. | Content sections |
| Effects | CustomCursor, AnimatedBackground | Visual enhancement |
| Forms | LeadMagnet | User interaction |
| SEO | SEOHead | Meta optimization |

---

## Data Flow

### Lead Capture Flow

```
┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌─────────────┐
│  User    │───▶│  Form Input  │───▶│  Validation  │───▶│  Webhook    │
│          │    │  (Zod)       │    │  (Zod)       │    │  (n8n)      │
└──────────┘    └──────────────┘    └──────────────┘    └─────────────┘
                     │                    │                    │
                     │                    │                    │
                     ▼                    ▼                    ▼
               ┌──────────┐         ┌──────────┐         ┌──────────┐
               │ React    │         │ Error    │         │ Success  │
               │ Hook     │         │ Messages │         │ State    │
               │ Form     │         │ Display  │         │ Update   │
               └──────────┘         └──────────┘         └──────────┘
```

### Configuration Flow

```
┌─────────────────┐
│  config.ts      │  ← Single source of truth
│  ├── WHATSAPP   │
│  ├── EMAIL      │
│  ├── SITE_URL   │
│  └── WEBHOOK    │
└────────┬────────┘
         │
         │ imports
         │
    ┌────┴────┬────────────┬────────────┐
    ▼         ▼            ▼            ▼
┌───────┐ ┌───────┐  ┌──────────┐ ┌──────────┐
│ Hero  │ │ Footer│  │ SEOHead  │ │LeadMagnet│
└───────┘ └───────┘  └──────────┘ └──────────┘
```

---

## State Management

### Local Component State
Most components are stateless. State exists only where needed:

| Component | State | Purpose |
|-----------|-------|---------|
| LeadMagnet | `submitted`, `submitError`, `isSubmitting` | Form handling |
| FAQ | Internal accordion state | Expand/collapse |
| Navbar | Mobile menu open/closed | Responsive nav |

### Form State (LeadMagnet)
```typescript
interface FormState {
  name: string
  whatsapp: string
  email: string
  businessType: string
}

// Managed by react-hook-form
const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>()
```

### No Global State
The application does not require global state management (Redux, Zustand, etc.) due to its simplicity.

---

## Styling Architecture

### CSS Layers

```css
@layer base {
  /* Reset, HTML/BODY styles */
}

@layer components {
  /* Reusable component classes */
  .glass { }
  .card { }
  .btn-primary { }
  .btn-secondary { }
}

@layer utilities {
  /* Animation utilities */
  .animate-accordion-down { }
}
```

### Design Tokens (CSS Variables)

```css
@theme {
  /* Colors */
  --color-base: #0a0a0b;
  --color-accent: #6366f1;
  --color-gold: #f59e0b;
  
  /* Typography */
  --font-display: 'Space Grotesk';
  --font-body: 'Inter';
  
  /* Spacing & Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}
```

### Tailwind Utility Classes
Component-specific styles use Tailwind utilities directly:
- Layout: `flex`, `grid`, `gap-*`, `p-*`, `m-*`
- Typography: `text-*`, `font-*`, `leading-*`
- Colors: `bg-*`, `text-*`, `border-*`
- Effects: `backdrop-blur`, `shadow-*`, `rounded-*`

---

## Animation System

### Framer Motion Integration

```typescript
// lib/animations.ts
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
}
```

### Scroll Trigger Pattern
```typescript
const ref = useRef(null)
const inView = useInView(ref, { once: true, margin: '-100px' })

<motion.div
  ref={ref}
  variants={staggerContainer}
  initial="hidden"
  animate={inView ? 'visible' : 'hidden'}
>
  {/* Content */}
</motion.div>
```

---

## Build Process

### Development
```
npm run dev
    │
    ▼
Vite Dev Server
    │
    ├── Hot Module Replacement (HMR)
    ├── TypeScript checking (on save)
    └── Tailwind JIT compilation
```

### Production Build
```
npm run build
    │
    ├── TypeScript compiler (tsc)
    │   └── Type checking
    │
    ├── Vite build
    │   ├── Bundle JavaScript
    │   ├── Process CSS
    │   ├── Optimize assets
    │   └── Generate hashes
    │
    └── Output to dist/
        ├── index.html
        ├── assets/
        │   ├── index-[hash].js
        │   └── index-[hash].css
        └── (static assets)
```

---

## Deployment Architecture

### CI/CD Pipeline

```yaml
GitHub Actions (deploy.yml)
    │
    ├── Trigger: Push to main
    │
    ├── Steps:
    │   1. Checkout code
    │   2. Setup Node.js 20
    │   3. npm ci (install dependencies)
    │   4. npm run build
    │   5. FTP deploy to Hostinger
    │
    └── Output: dist/ → /public_html/
```

### Hosting Stack

| Component | Provider | Details |
|-----------|----------|---------|
| Hosting | Hostinger | Shared hosting, FTP deploy |
| Domain | Hostinger | mottobiz.com |
| SSL | Let's Encrypt | Auto-renewal |
| CDN | None currently | Future consideration |

---

## Security Considerations

### Frontend Security
- No sensitive data stored client-side
- Form validation both client and server-side
- HTTPS enforced
- External links use `rel="noopener noreferrer"`

### Webhook Security
- Webhook URL stored as environment constant
- Server-side validation required
- Rate limiting on webhook endpoint (n8n/Make)

### XSS Prevention
- React auto-escapes JSX
- No `dangerouslySetInnerHTML` usage
- CSP headers (server-side, future)

---

## Performance Optimization

### Current Optimizations
- Static site generation (no server-side rendering)
- Tailwind CSS purging (unused styles removed)
- Font preloading
- Image optimization (manual)
- Minimal JavaScript bundle

### Bundle Analysis
```
Main chunks:
- React + ReactDOM: ~140KB (gzipped: ~45KB)
- Framer Motion: ~50KB (gzipped: ~15KB)
- Application code: ~20KB (gzipped: ~8KB)
- CSS: ~10KB (gzipped: ~3KB)
```

### Future Optimizations
- [ ] Lazy load below-fold sections
- [ ] Code split by route (if multi-page)
- [ ] Service worker for caching
- [ ] Image CDN for optimization

---

## Error Handling

### Form Errors
```typescript
// Graceful fallback when webhook not configured
if (!LEAD_WEBHOOK_URL) {
  setSubmitError('Form temporarily unavailable. Please use WhatsApp.')
  return
}

// Network error handling
try {
  const res = await fetch(LEAD_WEBHOOK_URL, { ... })
  if (!res.ok) throw new Error(`Server error: ${res.status}`)
  setSubmitted(true)
} catch {
  setSubmitError('Something went wrong. Please try WhatsApp instead.')
}
```

### Component Error Boundaries
Currently not implemented. Future consideration for:
- Form component isolation
- Animation fallbacks

---

## Scalability Considerations

### Current Limits
- Single page, static content
- No backend dependencies
- Limited interactivity

### Scaling Paths

| Need | Solution |
|------|----------|
| More pages | Add React Router or Next.js migration |
| Backend API | Add Express/Fastify + database |
| User auth | Add Clerk, Auth.js, or NextAuth |
| CMS | Integrate Sanity, Contentful, or MDX |
| Real-time | Add WebSocket server |

---

## Monitoring & Observability

### Current State
- No monitoring implemented

### Recommended Additions
- [ ] Google Analytics 4
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (Web Vitals)
- [ ] Uptime monitoring (UptimeRobot)

---

## Technical Debt

| Item | Priority | Effort | Impact |
|------|----------|--------|--------|
| Add unit tests | Medium | Medium | High |
| Add E2E tests | Low | Medium | Medium |
| Implement error boundaries | Low | Low | Medium |
| Add loading states | Low | Low | Low |
| Documentation (JSDoc) | Low | Low | Low |

---

## Architecture Decisions Record (ADR)

### ADR-001: Static Site vs SSR
**Decision:** Static site (Vite SPA)  
**Rationale:** Simplicity, performance, no server costs  
**Consequences:** Limited dynamic features, client-side only

### ADR-002: Tailwind CSS v4
**Decision:** Use Tailwind CSS v4 with @tailwindcss/vite  
**Rationale:** Smaller bundle, faster builds, CSS-first config  
**Consequences:** Learning curve for v4 syntax, less community examples

### ADR-003: Form Library
**Decision:** react-hook-form + Zod  
**Rationale:** Best-in-class DX, type safety, minimal re-renders  
**Consequences:** Additional dependency, learning curve

### ADR-004: Animation Library
**Decision:** Framer Motion  
**Rationale:** Declarative API, scroll triggers, gesture support  
**Consequences:** Bundle size increase (~50KB)

---

## File Dependencies Graph

```
main.tsx
├── App.tsx
│   ├── index.css (global styles)
│   ├── components/SEOHead.tsx
│   │   └── lib/config.ts
│   ├── components/effects.tsx
│   ├── components/Navbar.tsx
│   ├── components/Hero.tsx
│   │   ├── lib/animations.ts
│   │   └── lib/config.ts
│   ├── components/Pain.tsx
│   ├── components/Proof.tsx
│   ├── components/Services.tsx
│   │   └── lib/animations.ts
│   ├── components/HowItWorks.tsx
│   ├── components/Qualifier.tsx
│   ├── components/SocialProof.tsx
│   ├── components/LeadMagnet.tsx
│   │   ├── lib/animations.ts
│   │   └── lib/config.ts
│   ├── components/FAQ.tsx
│   │   └── lib/animations.ts
│   ├── components/FinalCTA.tsx
│   └── components/Footer.tsx
│       └── lib/config.ts
└── react-helmet-async (HelmetProvider)
```
