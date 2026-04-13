# DESIGN.md - Design System & Guidelines

## Brand Identity

### Brand Name
**MottoBiz** - A play on "motto" (guiding principle) and "business"

### Tagline
> "Your Business, Automated."

### Brand Personality
- **Professional** - Trustworthy, competent, reliable
- **Modern** - Forward-thinking, tech-savvy, innovative
- **Accessible** - Approachable, clear, jargon-free
- **Premium** - Quality-focused, attention to detail

---

## Color Palette

### Primary Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Base | `#0A0A0B` | Background, primary surface |
| Base Elevated | `#121214` | Cards, elevated surfaces |
| Accent (Indigo) | `#6366F1` | Primary actions, highlights |
| Gold (Amber) | `#F59E0B` | Secondary accent, CTAs |

### Semantic Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Text Primary | `#FAFAFA` | Headlines, important text |
| Text Secondary | `rgba(250,250,250,0.7)` | Body text |
| Text Tertiary | `rgba(250,250,250,0.4)` | Captions, labels |
| Success | `#22C55E` | Success states, WhatsApp |
| Error | `#EF4444` | Error messages |
| Warning | `#F59E0B` | Warnings, highlights |

### Gradient Applications

```css
/* Text gradient - Headlines */
text-gradient: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #f59e0b 100%)

/* Button gradient */
btn-gradient: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)

/* Section divider */
divider-gradient: linear-gradient(90deg, transparent, rgba(99,102,241,0.3), rgba(245,158,11,0.2), rgba(99,102,241,0.3), transparent)
```

---

## Typography

### Font Families

| Font | Usage | Weights |
|------|-------|---------|
| Space Grotesk | Display, Headlines | 400, 500, 600, 700 |
| Inter | Body, UI | 300, 400, 500, 600 |

### Type Scale

| Element | Size (Mobile) | Size (Desktop) | Weight | Line Height |
|---------|---------------|----------------|--------|-------------|
| H1 | 2.5rem (40px) | 4.5rem (72px) | 700 | 1.1 |
| H2 | 2rem (32px) | 3rem (48px) | 700 | 1.2 |
| H3 | 1.25rem (20px) | 1.5rem (24px) | 600 | 1.3 |
| Body | 1rem (16px) | 1rem (16px) | 400 | 1.7 |
| Small | 0.875rem (14px) | 0.875rem (14px) | 400 | 1.5 |
| Caption | 0.75rem (12px) | 0.75rem (12px) | 500 | 1.5 |

### Letter Spacing
- Headlines: `-0.02em` (tight)
- Labels: `0.1em` (wide, uppercase)
- Body: Normal

---

## Spacing System

### Base Unit
`4px` - All spacing should be multiples of 4

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight spacing |
| sm | 8px | Component internal |
| md | 16px | Default spacing |
| lg | 24px | Section spacing |
| xl | 32px | Large gaps |
| 2xl | 48px | Section padding |
| 3xl | 64px | Major sections |
| 4xl | 96px | Hero sections |

### Section Padding
- Mobile: `py-28` (112px vertical)
- Desktop: `py-40` (160px vertical)

---

## Components

### Cards

```css
/* Base card */
.card {
  background: linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}

/* Card hover */
.card:hover {
  background: linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));
  border-color: rgba(99,102,241,0.25);
  transform: translateY(-6px);
  box-shadow: 0 24px 48px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.08);
}
```

### Buttons

#### Primary Button
```css
.btn-primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 18px 40px;
  border-radius: 14px;
  font-weight: 600;
  box-shadow: 0 4px 24px rgba(99,102,241,0.4);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 40px rgba(99,102,241,0.5);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: rgba(255,255,255,0.05);
  color: #fafafa;
  padding: 18px 40px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.12);
  font-weight: 600;
}

.btn-secondary:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.25);
  transform: translateY(-2px);
}
```

### Form Inputs

```css
input, select {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 16px 20px;
  color: white;
}

input:focus, select:focus {
  border-color: rgba(99,102,241,0.5);
  outline: none;
}

input::placeholder {
  color: rgba(255,255,255,0.3);
}
```

### Glass Effect

```css
.glass {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  backdrop-filter: blur(24px);
}
```

---

## Animation Guidelines

### Timing Functions
- **Default:** `cubic-bezier(0.25, 0.1, 0.25, 1)` - Smooth ease
- **Bounce:** `cubic-bezier(0.34, 1.56, 0.64, 1)` - Playful overshoot
- **Quick:** `ease-out` - Fast response

### Durations
- **Micro:** 150-200ms (hover states)
- **Default:** 300-400ms (transitions)
- **Emphasis:** 500-600ms (page reveals)

### Scroll Animations (Framer Motion)

```typescript
// Container stagger
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

// Item fade up
const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  }
}
```

### Hover Effects
- Scale: `1.02` to `1.05` (subtle)
- Translate Y: `-2px` to `-6px` (lift)
- Glow: Add subtle box-shadow

---

## Iconography

### Icon Library
**Lucide React** - Consistent, clean, customizable

### Icon Sizes
| Size | Value | Usage |
|------|-------|-------|
| sm | 16px | Inline, small UI |
| md | 20px | Default |
| lg | 24px | Emphasis |
| xl | 32px | Feature icons |

### Emoji Usage
Services use emoji icons for quick recognition:
- 🌐 Smart Website
- 🤖 AI Automation
- 📱 Social Media
- 📊 Business Intelligence
- ⚡ Workflow Automation
- 🎯 Lead Pipeline

---

## Responsive Design

### Breakpoints

| Name | Min Width | Target |
|------|-----------|--------|
| sm | 640px | Large phones, small tablets |
| md | 768px | Tablets |
| lg | 1024px | Laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large screens |

### Mobile-First Approach
All base styles target mobile, with `sm:` and above breakpoints adding complexity.

### Key Responsive Patterns
- Single column → Multi-column grids
- Stacked CTAs → Side-by-side buttons
- Collapsed navigation → Expanded navbar
- Reduced padding → Full padding

---

## Accessibility

### Color Contrast
- Text on dark: Minimum 4.5:1 ratio
- Large text: Minimum 3:1 ratio
- Interactive elements: Clear focus states

### Focus States
```css
:focus-visible {
  outline: 2px solid #6366F1;
  outline-offset: 2px;
}
```

### ARIA Guidelines
- All interactive elements have accessible names
- Form inputs have associated labels
- Modal dialogs trap focus
- Skip links for main content

---

## Assets

### Logo
- **File:** `logo-static.svg`
- **Format:** SVG (scalable)
- **Style:** Wordmark with accent color

### OG Image
- **File:** `og-image.png`
- **Size:** 1200x630px
- **Content:** Logo + tagline + visual element

### Favicon
- **Files:** favicon.ico, apple-touch-icon.png
- **Sizes:** 16x16, 32x32, 180x180

---

## Design Principles

1. **Dark by Default** - Embrace the dark theme for sophistication
2. **Subtle Motion** - Animations should enhance, not distract
3. **Generous Space** - Let content breathe
4. **Clear Hierarchy** - Guide the eye naturally
5. **Consistent Patterns** - Reuse components and styles
6. **Accessible Always** - Every interaction should be usable

---

## Do's and Don'ts

### Do
- Use consistent spacing multiples
- Maintain color contrast ratios
- Apply subtle animations
- Test on multiple devices
- Use semantic HTML

### Don't
- Add unnecessary visual noise
- Use more than 2 font families
- Create jarring animations
- Ignore mobile experience
- Hardcode colors outside of theme
