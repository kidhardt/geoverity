---
name: branding
description: GeoVerity 2026 brand identity and visual styling - colors, typography, spacing, voice and tone for consistent corporate identity across web, documentation, and presentations
---

# GeoVerity Branding Skill

Use this skill when creating or styling GeoVerity-branded materials including web pages, documentation, presentations, or visual assets.

**Keywords:** branding, corporate identity, visual identity, styling, brand colors, typography, GeoVerity brand, visual design, design system

---

## Brand Overview

GeoVerity positions itself as a **trustworthy, precise, and globally-minded** AI data and governance partner. The brand conveys:

- **Precision**: Data accuracy, scientific rigor, verifiable claims
- **Trust**: Transparency, ethical practices, proven methodologies
- **Global Reach**: Multilingual capabilities (120+ languages), cultural awareness
- **Academic Authority**: Graduate-level rigor, research-backed approaches

---

## Brand Colors

### Primary Colors

**Primary Blue (Trust)**
- Hex: `#2C5F8D` (RGB: 44, 95, 141)
- Usage: Primary CTAs, headers, links, navigation
- Conveys: Trust, stability, professionalism

**Neutral Dark (Text)**
- Hex: `#1A1A1A` (RGB: 26, 26, 26)
- Usage: Primary text, headings on light backgrounds
- Conveys: Clarity, readability, authority

**Neutral Light (Background)**
- Hex: `#F8F9FA` (RGB: 248, 249, 250)
- Usage: Page backgrounds, light sections
- Conveys: Cleanliness, space, accessibility

### Secondary Colors

**Accent Green (Verification)**
- Hex: `#3B7A57` (RGB: 59, 122, 87)
- Usage: Success states, verification badges, data quality indicators
- Conveys: Accuracy, validation, positive outcomes

**Accent Orange (Insight)**
- Hex: `#D97757` (RGB: 217, 119, 87)
- Usage: Highlights, callouts, key insights, interactive elements
- Conveys: Energy, discovery, human expertise

**Neutral Mid (Borders/Dividers)**
- Hex: `#D1D5DB` (RGB: 209, 213, 219)
- Usage: Borders, dividers, subtle backgrounds
- Conveys: Structure, organization

**Neutral White (Contrast)**
- Hex: `#FFFFFF` (RGB: 255, 255, 255)
- Usage: Card backgrounds, text on dark, high contrast areas
- Conveys: Clarity, focus

### Usage Guidelines

**Primary Blue:**
- CTAs: `background: #2C5F8D; color: #FFFFFF;`
- Links: `color: #2C5F8D; hover: darken 10%`
- Navigation: Active state background

**Accent Green:**
- Success messages
- Checkmarks and validation icons
- Data quality badges (e.g., "120 Languages Verified")

**Accent Orange:**
- Secondary CTAs
- Hover states for interactive elements
- Insight callout boxes
- Important highlights

**Do NOT use:**
- ❌ Pure black `#000000` (too harsh, use `#1A1A1A`)
- ❌ Pure white text on colored backgrounds without contrast check
- ❌ Red (conveys error/danger, conflicts with trust positioning)

---

## Typography

### Font Stack

**Headings:**
- Primary: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Weight: 600 (semibold) for h1-h3, 500 (medium) for h4-h6
- Letter-spacing: `-0.02em` for large headings (h1-h2)

**Body Text:**
- Primary: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Weight: 400 (regular), 500 (medium) for emphasis
- Line-height: `1.6` for readability

**Monospace (Code/Technical):**
- Primary: `'Fira Code', 'Monaco', 'Courier New', monospace`
- Usage: Code blocks, technical specifications, data samples

### Type Scale (Desktop)

```css
h1: 2.5rem (40px)   - Hero headings, page titles
h2: 2rem (32px)     - Section headings
h3: 1.5rem (24px)   - Subsection headings
h4: 1.25rem (20px)  - Card titles, component headings
h5: 1.125rem (18px) - Minor headings
h6: 1rem (16px)     - Small headings, labels
body: 1rem (16px)   - Body text
small: 0.875rem (14px) - Meta information, captions
```

### Type Scale (Mobile)

```css
h1: 2rem (32px)     - Scaled down for mobile
h2: 1.75rem (28px)
h3: 1.375rem (22px)
h4: 1.125rem (18px)
body: 1rem (16px)   - Keep body text at 16px minimum
```

### Typography Rules

1. **Headings:**
   - Use sentence case, not UPPERCASE (except acronyms like AI, GDPR)
   - Maximum line length: 60 characters
   - Add breathing space: `margin-top: 2em; margin-bottom: 0.5em;`

2. **Body Text:**
   - Line length: 60-75 characters for optimal readability
   - Line height: `1.6` minimum
   - Paragraph spacing: `1em` between paragraphs

3. **Emphasis:**
   - Bold (`font-weight: 600`) for strong emphasis
   - Italic (`font-style: italic`) for quotes, subtle emphasis
   - Avoid underline (reserve for links)

---

## Spacing System

Use consistent spacing for rhythm and hierarchy:

```css
--space-xs: 0.25rem (4px)   - Tight spacing, icon gaps
--space-sm: 0.5rem (8px)    - Small gaps, list items
--space-md: 1rem (16px)     - Default component spacing
--space-lg: 1.5rem (24px)   - Section spacing
--space-xl: 2rem (32px)     - Large section gaps
--space-2xl: 3rem (48px)    - Major section breaks
--space-3xl: 4rem (64px)    - Hero section padding
```

**Mobile:**
- Reduce spacing by 25-50% on mobile
- Minimum padding: 1rem (16px) on all sides
- Tap targets: 44px minimum (per building-pages skill)

---

## Voice and Tone

### Brand Voice Attributes

**Precise:**
- Use specific numbers: "120+ languages" not "many languages"
- Cite sources: "NIST AI Risk Management Framework"
- Avoid vague claims: "we believe" → "our methodology demonstrates"

**Trustworthy:**
- Transparent about limitations: "Currently supports 120 languages"
- Use active voice: "We verify data quality" not "Data quality is verified"
- Avoid marketing hyperbole: "revolutionary," "game-changing," "best-in-class"

**Globally-Minded:**
- Reference international standards (GDPR, ISO, NIST)
- Use bilingual examples where appropriate
- Respect cultural nuance in examples

**Academically Rigorous:**
- Graduate-level vocabulary where appropriate
- Citations and references for claims
- Methodology explanations for technical audiences

### Tone by Context

**Homepage/Marketing Pages:**
- Confident but not boastful
- "GeoVerity provides verifiable AI training data" ✅
- "GeoVerity is the world's best AI data provider" ❌

**Technical Documentation:**
- Direct, precise, instructional
- Use imperative mood: "Configure the API endpoint..."
- Include code examples and expected outputs

**Insights/Blog Posts:**
- Thoughtful, analytical, research-driven
- Question-driven: "How do institutions maintain trust in the age of AI?"
- Supported by data and real-world examples

**Legal/Compliance Pages:**
- Formal, complete, unambiguous
- Define terms explicitly
- Link to authoritative sources (GDPR official text, NIST frameworks)

---

## Component Styling

### Buttons

**Primary CTA:**
```css
background: #2C5F8D;
color: #FFFFFF;
padding: 12px 24px;
border-radius: 4px;
font-weight: 600;
min-height: 44px; /* Tap target */
transition: background 0.2s;

&:hover {
  background: #234B6E; /* 15% darker */
}
```

**Secondary CTA:**
```css
background: #D97757;
color: #FFFFFF;
/* Same padding/height as primary */
```

**Tertiary/Ghost Button:**
```css
background: transparent;
color: #2C5F8D;
border: 2px solid #2C5F8D;
/* Same padding/height */
```

### Cards

```css
background: #FFFFFF;
border: 1px solid #D1D5DB;
border-radius: 8px;
padding: 1.5rem;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

&:hover {
  box-shadow: 0 4px 12px rgba(44, 95, 141, 0.15);
  border-color: #2C5F8D;
}
```

### Links

```css
color: #2C5F8D;
text-decoration: underline;
text-underline-offset: 2px;

&:hover {
  color: #234B6E;
  text-decoration-thickness: 2px;
}

&:focus-visible {
  outline: 2px solid #2C5F8D;
  outline-offset: 2px;
}
```

### Forms

```css
input, textarea, select {
  border: 1px solid #D1D5DB;
  border-radius: 4px;
  padding: 12px;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  min-height: 44px; /* Accessibility */

  &:focus {
    outline: 2px solid #2C5F8D;
    outline-offset: 0;
    border-color: #2C5F8D;
  }

  &:invalid {
    border-color: #B91C1C; /* Red for errors */
  }
}

label {
  font-weight: 500;
  margin-bottom: 0.25rem;
  display: block;
}
```

---

## Design Tokens (CSS Variables)

For consistency, use CSS custom properties:

```css
:root {
  /* Colors */
  --color-primary: #2C5F8D;
  --color-primary-dark: #234B6E;
  --color-accent-green: #3B7A57;
  --color-accent-orange: #D97757;
  --color-text: #1A1A1A;
  --color-text-muted: #6B7280;
  --color-bg: #F8F9FA;
  --color-bg-white: #FFFFFF;
  --color-border: #D1D5DB;

  /* Typography */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'Fira Code', 'Monaco', 'Courier New', monospace;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 12px rgba(44, 95, 141, 0.15);
  --shadow-lg: 0 10px 24px rgba(44, 95, 141, 0.2);

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.2s ease;
  --transition-slow: 0.3s ease;
}
```

---

## Accessibility (WCAG 2.2 AA+)

### Color Contrast

**Required ratios:**
- Normal text (< 18pt): 4.5:1 minimum
- Large text (≥ 18pt or ≥ 14pt bold): 3:1 minimum
- UI components: 3:1 minimum

**Verified combinations:**
- `#2C5F8D` on `#FFFFFF`: 5.8:1 ✅
- `#1A1A1A` on `#F8F9FA`: 15.1:1 ✅
- `#FFFFFF` on `#2C5F8D`: 5.8:1 ✅
- `#D97757` on `#FFFFFF`: 3.5:1 ⚠️ (use for large text only)

**Test all color combinations:**
```
Use WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
```

### Focus States

Always visible focus indicators:
```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

---

## Usage Examples

### Example: Hero Section (Homepage)

```astro
---
// Hero.astro
export interface Props {
  heading: string;
  subheading: string;
  ctaText: string;
  ctaHref: string;
  lang: 'en' | 'es';
}

const { heading, subheading, ctaText, ctaHref, lang } = Astro.props;
---

<section class="hero" aria-labelledby="hero-heading">
  <div class="hero-content">
    <h1 id="hero-heading" class="hero-heading">{heading}</h1>
    <p class="hero-subheading">{subheading}</p>
    <a href={ctaHref} class="cta-primary">{ctaText}</a>
  </div>
</section>

<style>
  .hero {
    background: var(--color-bg);
    padding: var(--space-3xl) var(--space-md);
    text-align: center;
  }

  .hero-content {
    max-width: 60ch;
    margin: 0 auto;
  }

  .hero-heading {
    font-family: var(--font-sans);
    font-size: 2.5rem;
    font-weight: 600;
    color: var(--color-text);
    letter-spacing: -0.02em;
    margin-bottom: var(--space-md);
  }

  .hero-subheading {
    font-size: 1.25rem;
    color: var(--color-text-muted);
    line-height: 1.6;
    margin-bottom: var(--space-xl);
  }

  .cta-primary {
    display: inline-block;
    background: var(--color-primary);
    color: var(--color-bg-white);
    padding: 12px 24px;
    border-radius: var(--radius-sm);
    font-weight: 600;
    text-decoration: none;
    min-height: 44px;
    transition: background var(--transition-base);
  }

  .cta-primary:hover {
    background: var(--color-primary-dark);
  }

  .cta-primary:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    .hero-heading {
      font-size: 2rem;
    }

    .hero-subheading {
      font-size: 1.125rem;
    }
  }
</style>
```

### Example: Service Card

```astro
---
// ServiceCard.astro
export interface Props {
  title: string;
  description: string;
  href: string;
  icon?: string; // Optional icon class
}

const { title, description, href, icon } = Astro.props;
---

<article class="service-card">
  {icon && <div class={`service-icon ${icon}`} aria-hidden="true"></div>}
  <h3 class="service-title">{title}</h3>
  <p class="service-description">{description}</p>
  <a href={href} class="service-link">Learn more →</a>
</article>

<style>
  .service-card {
    background: var(--color-bg-white);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-lg);
    box-shadow: var(--shadow-sm);
    transition: all var(--transition-base);
  }

  .service-card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary);
    transform: translateY(-2px);
  }

  .service-icon {
    width: 48px;
    height: 48px;
    margin-bottom: var(--space-md);
    /* Icon styling */
  }

  .service-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: var(--space-sm);
  }

  .service-description {
    color: var(--color-text-muted);
    line-height: 1.6;
    margin-bottom: var(--space-md);
  }

  .service-link {
    color: var(--color-primary);
    font-weight: 500;
    text-decoration: none;
  }

  .service-link:hover {
    text-decoration: underline;
  }
</style>
```

---

## Integration with Other Skills

When using the branding skill:

1. **Always combine with `building-pages`** for accessibility/performance compliance
2. **Use with `templating-pages`** for Astro-specific implementation
3. **Reference in `generating-json-ld`** for consistent brand representation in structured data

---

## Brand Checklist

Before shipping any branded material:

- [ ] Colors match specified hex values (no approximations)
- [ ] Typography uses Inter font family (or system fallback)
- [ ] Contrast ratios meet WCAG 2.2 AA (4.5:1 minimum)
- [ ] Spacing follows design tokens (no arbitrary values)
- [ ] Voice is precise, trustworthy, and globally-minded
- [ ] Tone matches content context (marketing, technical, legal)
- [ ] CTAs use primary blue (#2C5F8D)
- [ ] Focus states are visible and meet 2px minimum
- [ ] Mobile scales typography and spacing appropriately
- [ ] No pure black (#000000) used for text

---

## Maintenance

**Last Updated:** 2025-10-26
**Owner:** GeoVerity Brand Team
**Contact:** See .claude/skills/ for updates

This skill will evolve as the brand matures. Update this file when:
- New colors are added to the palette
- Typography requirements change
- New component patterns emerge
- Brand voice guidelines are refined
