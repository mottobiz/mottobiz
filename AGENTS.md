# AGENTS.md

This file provides mandatory guidance for any AI agent or developer working on this repository. **Read this entire file before making any changes.**

## Table of Contents
1. Commonly Used Commands
2. High-Level Architecture & Structure
3. Key Rules & Constraints
4. Content Generation Rules (MANDATORY)
5. Design System Preservation (MANDATORY)
6. Development Hints
7. Related Documentation

## Commands
- `npm run dev` — Start Vite dev server (port auto-increments if 5173 in use)
- `npm run build` — TypeScript check + Vite production build
- `npm run preview` — Preview production build locally
- `npm run generate:og` — Generate per-article OG images (58 PNGs in `public/og/`)
- `..\deploy.bat` — Deploy to production (from repo root)

## Architecture

### Tech Stack
- **Framework:** React 19 + TypeScript 6
- **Build Tool:** Vite 8 with `@vitejs/plugin-react`
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`)
- **Animation:** Framer Motion for scroll-triggered reveals and micro-interactions
- **Forms:** React Hook Form + Zod for validation
- **Headless UI:** Radix UI primitives (Accordion, Dialog, Select, Tooltip)
- **SEO:** `react-helmet-async` with JSON-LD LocalBusiness schema

### Project Structure
```
mottobiz/
├── src/
│   ├── components/          # Page sections & reusable components
│   │   ├── effects.tsx      # CustomCursor + AnimatedBackground
│   │   ├── SEOHead.tsx      # Meta tags + schema.org markup (uses props for OG/Twitter)
│   │   └── resources/      # Article system components
│   │       ├── ArticleCard.tsx
│   │       ├── ArticleComponents.tsx  # Interactive content components
│   │       ├── ArticleGrid.tsx
│   │       ├── ArticleThumbnail.tsx    # Dynamic SVG thumbnails
│   │       ├── CategoryFilter.tsx
│   │       ├── ResourcesHero.tsx
│   │       └── ResourcesPage.tsx
│   ├── pages/               # Route-level page components
│   │   ├── HomePage.tsx
│   │   ├── ResourcesPage.tsx
│   │   ├── ArticlePage.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   └── TermsOfService.tsx
│   ├── data/
│   │   └── articles.ts     # ALL article metadata + content
│   ├── types/
│   │   └── article.ts       # Article types, category config, interactive component types
│   ├── lib/
│   │   ├── config.ts        # [CRITICAL] All contact/business constants
│   │   ├── animations.ts    # Framer Motion variants
│   │   └── utils.ts         # cn() helper for Tailwind classes
│   ├── index.css            # Tailwind v4 theme + custom keyframes
│   ├── App.tsx               # Section composition + routes
│   └── main.tsx              # Entry point with HelmetProvider
├── scripts/
│   └── generate-og-images.mjs  # Build-time OG image generator (sharp)
├── public/
│   ├── robots.txt
│   ├── sitemap.xml           # Must be updated when adding new pages/articles
│   ├── og-image.png          # Default OG image for homepage/other pages
│   ├── og/                   # Per-article OG images (58 PNGs, auto-generated)
│   │   └── {slug}.png        # e.g., whatsapp-automation-textile-traders-surat.png
│   └── logo-static.svg
├── vite.config.ts            # Path alias `@/` → `./src`
└── tsconfig.json             # `ignoreDeprecations: "6.0"` required for baseUrl
```

## Key Rules & Constraints

### 🔴 CRITICAL: All Contact Info in `src/lib/config.ts`
- **Never** hardcode phone/email/WhatsApp in components
- Always import from `@/lib/config` — single source of truth for:
  - `WHATSAPP_NUMBER`, `WHATSAPP_LINK`, `EMAIL`, `PHONE_DISPLAY`
  - `SITE_URL`, business address, geo coordinates
  - `LEAD_WEBHOOK_URL` (empty = graceful error on form submit)

### 🔴 CRITICAL: Design System Must Not Be Changed Without Approval
- The color palette, typography, effects, and animation system defined in `src/index.css` and `src/lib/animations.ts` are **frozen**.
- **NEVER** change brand colors (`#0A0A0B`, `#6366F1`, `#F59E0B`, etc.), font families, or glass effects without explicit approval.
- **NEVER** introduce a new CSS framework, UI library, or design system without explicit approval.
- When creating new components, you MUST use the existing design tokens:
  - Colors: Use Tailwind utility classes or CSS variables from `@theme` in `index.css`
  - Glass effect: `className="glass"` or `className="glass-hover"`
  - Text gradients: `className="text-gradient"` or `"text-gradient-gold"`
  - Buttons: `btn-primary` or `btn-secondary` classes
  - Cards: `card` class
  - Number badges: `number-badge` class
  - Section dividers: `section-divider` class

### Cursor Behavior
- Custom cursor only on `@media (pointer: fine) and (hover: hover)`
- Uses event delegation — no per-element listeners
- Falls back to native cursor on touch devices

### Component Patterns
- Sections use `useInView` from Framer Motion for scroll-triggered animations
- Glass cards: combine `.glass` class + hover state transitions
- CTAs: dual pattern — primary (gradient) + secondary (outline)
- Article pages use `ArticleThumbnailStatic` for thumbnails — no image files needed
- Interactive content uses components from `ArticleComponents.tsx`

### TypeScript
- `ignoreDeprecations: "6.0"` is required — do not remove
- Path alias `@/` resolves to `./src` — always use for imports

### SEO Requirements
- `HelmetProvider` wraps `<App />` in `main.tsx` — never inside components
- LocalBusiness schema includes Surat-specific geo coordinates
- NAP (Name/Address/Phone) must match exactly across Footer + Schema
- Every new page MUST have a `<SEOHead>` component with `title`, `description`, and `canonicalUrl`
- Every new page MUST be added to `public/sitemap.xml`

---

## Content Generation Rules (MANDATORY)

**These rules MUST be followed for ALL article/content creation. No exceptions.**

When generating ANY article or content for this project, you MUST follow the content strategy defined in `CONTENT_STRATEGY.md`. The following is a summary but `CONTENT_STRATEGY.md` is the authoritative source.

### 1. Article Data Structure — Every Article MUST Include

Every new article in `src/data/articles.ts` MUST have ALL of these fields:

```typescript
{
  id: string,              // slug-format
  title: string,           // max 60 chars, include primary keyword
  excerpt: string,         // 150-160 chars, include Surat reference
  slug: string,             // URL-friendly, matches id
  category: ArticleCategory,
  pillar?: string,          // Industry pillar name
  subPillar?: string,      // Sub-pillar name
  readingTime: number,
  publishDate: string,      // ISO date
  featured?: boolean,
  difficulty?: 'beginner' | 'intermediate' | 'advanced',
  
  // MANDATORY SEO fields
  seo: {
    metaTitle: string,           // max 60 chars, keyword + "Surat"
    metaDescription: string,     // 150-160 chars, CTA + Surat reference
    primaryKeyword: string,      // Main target keyword
    secondaryKeywords: string[], // 3-5 related keywords
    searchIntent: 'informational' | 'commercial' | 'transactional' | 'navigational',
    targetAudience: string,      // e.g., "Textile traders in Varachha"
  },
  
  // MANDATORY FAQ (min 3 questions for SEO schema markup)
  faq: [
    { question: string, answer: string },  // Exact question format for rich snippets
  ],
  
  // MANDATORY Internal Links (min 3 per article)
  internalLinks: [
    { anchor: string, url: string, type: 'service' | 'article' | 'pillar' | 'hub' },
  ],
  
  // Related articles (3 slugs)
  relatedArticleSlugs: string[],
}
```

### 2. Article Content MUST Include

Every article's content (the `ARTICLE_CONTENT` string) MUST include:

- **Hook** — An attention-grabbing opening that creates empathy (story, statistic, or pain point). Always include a Surat-specific reference.
- **TL;DR box** — Use the `TLDRBox` component format (bulleted key takeaways)
- **Section headings** — Use `##` and `###` markdown headings (parsed by ArticlePage)
- **Interactive elements** — At least ONE of: comparison table, stat cards, checklist, steps, pro tip, or warning callout per article (use the special syntax that ArticlePage's parser recognizes)
- **Internal links** — Naturally woven into content, linking to other MottoBiz articles using `[anchor text](/resources/slug)` format
- **FAQ section** — Not in the content string but in the `faq` array (rendered separately with schema markup)
- **CTA** — Every article ends with "Your Next Steps" (3 actionable items) linking to WhatsApp
- **Surat references** — Minimum 3 per article (area names, local business context, Surat-specific data)

### 3. Content Quality Checklist (Before Submitting)

Every article MUST pass this checklist:

- [ ] **Surat specificity** — At least 3 local references (area names, market names, local context)
- [ ] **Human tone** — 70% friendly mentor + 30% expert guide. No generic AI phrases ("In today's digital landscape", "It's important to note", "delve", "leverage", "synergy")
- [ ] **Active voice** — "Submit your application" not "Applications should be submitted"
- [ ] **Actionable** — Every section has a specific next step, not vague advice
- [ ] **SEO keywords** — Primary keyword in title, first paragraph, at least one heading
- [ ] **Internal links** — At least 3 links to other MottoBiz articles
- [ ] **FAQ** — At least 3 questions in exact-question format
- [ ] **CTA** — Ends with "Your Next Steps" (3 items) + WhatsApp link
- [ ] **No hardcoded contact info** — WhatsApp links use `WHATSAPP_LINK` from config, not raw numbers
- [ ] **Reading time** — Accurate based on word count (200 words/min)
- [ ] **Difficulty badge** — Appropriate for the content level

### 4. Interactive Component Syntax in Article Content

The `ArticlePage` parser recognizes these patterns in article content:

| Pattern | Renders As |
|---------|-----------|
| `## Heading` | H2 heading |
| `### Heading` | H3 heading |
| Lines starting with `- ` | Bullet list with colored dots |
| Lines matching `1. **Title** — description` | Numbered list with badges |
| `| Feature \| Option A \| Option B \|` (3+ rows) | ComparisonTable component |
| `TL;DR:` or `**Key Takeaways**` followed by bullet items | TLDRBox component |

For more complex interactive elements (StatCards, Checklist, ProTip, Warning, CTABox), they are rendered via the `faq`/`internalLinks` arrays on the article data object, or the content parser detects markdown patterns.

### 5. Sitemap Updates

When adding new articles or pages:
1. Add the slug to `ARTICLES` in `src/data/articles.ts`
2. Add article content to `ARTICLE_CONTENT` in same file
3. Add thumbnail icon to `THUMBNAIL_ICONS` in `src/components/resources/ArticleThumbnail.tsx`
4. Add `<url>` entry to `public/sitemap.xml`
5. Update `CATEGORY_INFO` counts in `src/types/article.ts`
6. Update `INDUSTRY_HUBS` article counts in `src/types/article.ts`

---

## Design System Preservation (MANDATORY)

### 🔴 Colors — DO NOT CHANGE
```
Base:         #0A0A0B (near-black background)
Surface:      rgba(255,255,255,0.03)
Border:       rgba(255,255,255,0.06)
Accent/Primary: #6366F1 (indigo)
Accent-glow:  rgba(99,102,241,0.4)
Gold:         #F59E0B (amber)
Text:         #FAFAFA (near-white)
Text-secondary: rgba(250,250,250,0.7)
Text-tertiary: rgba(250,250,250,0.4)
Error:        rgba(255,96,96,0.6) / #ff6060
Success:      #10B981 (emerald)
WhatsApp:     #25D366
```

### 🔴 Typography — DO NOT CHANGE
- Display: `Space Grotesk` (`.font-display`)
- Body: `Inter` (`.font-body`)

### 🔴 Layout Patterns — Preserve These
- Section background: `#0A0A0B` (never white or light backgrounds)
- Section dividers: `section-divider` class (gradient line)
- Hero patterns: Gradient orb backgrounds (indigo + gold)
- Card style: `card` class with hover states
- Max width: `max-w-6xl` for sections, `max-w-4xl` for article content

### 🔴 Animation Patterns — Preserve These
- Scroll reveal: `useInView` + Framer Motion `fadeUp` variants
- Hover glows: Box-shadow transitions on CTAs
- Accordion: Radix primitives with custom CSS animations
- Custom cursor: `@media (pointer: fine)` only

---

## Development Hints

### Adding a New Page
1. Create `src/pages/NewPage.tsx` with `SEOHead` component
2. Add route in `App.tsx`
3. Add link in `Navbar` or `Footer` as appropriate
4. Add entry to `public/sitemap.xml`
5. Run `npm run build` to verify

### Adding a New Article
1. Add entry to `ARTICLES` array in `src/data/articles.ts` (with ALL mandatory fields)
2. Add content string to `ARTICLE_CONTENT` in same file
3. Add icon to `THUMBNAIL_ICONS` in `src/components/resources/ArticleThumbnail.tsx`
4. Add `<url>` to `public/sitemap.xml`
5. Update `CATEGORY_INFO` and `INDUSTRY_HUBS` counts in `src/types/article.ts`
6. Run `npm run generate:og` to create the OG image for the new article
7. Run `npm run build` to verify

### Adding a New Section
1. Create `src/components/NewSection.tsx`
2. Use `useInView` + motion variants from `@/lib/animations`
3. Add to `App.tsx` between existing sections
4. Update `Navbar` anchor links if section has in-page nav

### Modifying Contact Info
- Edit **only** `src/lib/config.ts`
- All components auto-update via imports

### Adding Form Fields
- Extend Zod schema in `LeadMagnet.tsx`
- Register with `react-hook-form`'s `register()`
- Error messages use `#ff6060` color

### Deployment Prep
1. Verify `LEAD_WEBHOOK_URL` is set (or form shows error gracefully)
2. Confirm `SITE_URL` matches production domain
3. Check `dist/` output: `npm run build && npm run preview`

---

## Related Documentation

| Document | Purpose |
|----------|---------|
| `CONTEXT.md` | **⭐ START HERE** - Current project state, execution memory, troubleshooting |
| `CONTENT_STRATEGY.md` | **⭐ CONTENT BIBLE** - Must-read before ANY content creation. Voice, SEO, templates, AI detection rules, quality rubric |
| `PRD.md` | Product requirements and feature specifications |
| `TASKS.md` | Task tracking and backlog management |
| `TECHSTACK.md` | Technology stack details and decisions |
| `ROADMAP.md` | Development roadmap and future plans |
| `DESIGN.md` | Design system, colors, typography |
| `ARCHITECTURE.md` | System architecture and data flow |
| `CHANGELOG.md` | Version history and release notes |