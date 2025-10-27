---
name: branding
description: GeoVerity 2026 brand identity and visual styling - colors, typography, spacing, voice and tone for consistent corporate identity across web, documentation, and presentations
---

# GeoVerity Branding Skill — Minimalist Web Experience

**Version:** 3.0.0
**Effective:** January 2026
**Review Cadence:** Quarterly
**Maintained by:** GeoVerity Brand & Experience Council

Use this skill when creating or styling GeoVerity-branded materials including web pages, documentation, presentations, or visual assets.

**Keywords:** branding, corporate identity, visual identity, styling, brand colors, typography, GeoVerity brand, visual design, design system, minimalism

---

## Brand Vision

GeoVerity's digital presence embodies **clarity, focus, and humanity**.

Minimalism is the core design language — every element has purpose, every space breathes intention. Bold typography, confident whitespace, and subtle motion express our precision and empathy. Performance, accessibility, and trust are non-negotiable.

GeoVerity positions itself as a **trustworthy, precise, and globally-minded** AI data and governance partner. The brand conveys:

- **Precision**: Data accuracy, scientific rigor, verifiable claims
- **Trust**: Transparency, ethical practices, proven methodologies
- **Global Reach**: Multilingual capabilities (120+ languages), cultural awareness
- **Academic Authority**: Graduate-level rigor, research-backed approaches

---

## Core Design Principles

1. **Clarity Enhancement** – Remove distractions; emphasize message hierarchy
2. **Stronger Visual Hierarchy** – Use scale, weight, and space to direct attention
3. **Performance & Device Readiness** – Lean, fast, and fluid across all devices
4. **Intentional Whitespace** – Space is structure, not an afterthought
5. **Minimal but Expressive** – Bold typography and authentic visuals replace clutter
6. **Personality-Driven Interaction** – GeoVerity feels human, warm, and confident

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

**Register-Appropriate Language:**
- **IMPORTANT:** See `languaging` skill for mandatory register stratification rules
- **Homepage/Services pages:** Plain professional language (B2-C1 CEFR)
  - Active voice, SVO order, main clause initial (no "Because X, Y..." or "While X, Y...")
  - Define technical terms on first use
  - Target: Administrators and project managers who value clear, actionable language
- **Insights Posts ONLY:** Academic register (C1-C2 CEFR)
  - Complex syntax, nominalization, disciplinary terminology acceptable
  - Target: Researchers and thought leaders expecting scholarly argumentation
  - Graduate-level vocabulary, citations, methodology explanations

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

---

## Interactive Experience Layer

### Interactive Product Playgrounds

**Purpose:** Let users *experience* value before commitment.

**Benefits:**
- Faster understanding of complex offerings
- Higher engagement and time-on-site
- Better-qualified leads
- Reduced friction in decision-making

**Implementation Guidelines:**
- Begin with one interactive feature (calculator, demo, visualization)
- Provide instant feedback for every user action
- Integrate seamlessly into minimalist layouts with clear CTAs
- Track engagement metrics; surface high-conversion interactions

**Examples:**
- ROI/pacing calculators
- Parameter-driven product previews
- Interactive data quality visualizations
- Model evaluation sandboxes

**Technical Requirements:**
- Performant builds (tree-shaken modules, minimal dependencies)
- Full keyboard accessibility and ARIA labeling
- Mobile-responsive with touch optimization
- Consistent with typography/color/spacing tokens
- Lazy-loaded where appropriate (`client:idle` or `client:visible`)

---

## Layout & Grid System

### Grid Structure
- **Desktop:** 12-column grid
- **Tablet:** 8-column grid
- **Mobile:** 4-column grid
- **Base spacing unit:** 8px scale (8, 16, 24, 32, 40, 48...)

### Section Guidelines
**Hero Section:**
- One headline
- One supporting visual
- One primary CTA
- Maximum 5 modules per page
- Whitespace separation ≥ 48px between modules

**Content Modules:**
- **Benefits:** Concise statements with minimal iconography
- **Testimonials:** Single quote or focused slider with ample breathing room
- **Interactive Tools:** Framed modules with generous margins
- **Footer:** Simple structure, clear legal/accessibility links, language toggle

### Component Specifications
**Maximum line length:** 60-75 characters for body text
**Hero max-width:** 60ch for readability
**Cards:** Consistent padding (1.5rem), 8px border-radius
**Buttons:** 8px border-radius, ample padding, 44px minimum tap target

---

## Performance & UX Targets

### Core Web Vitals
- **LCP** (Largest Contentful Paint): ≤ 2.5s
- **INP** (Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **TTI** (Time to Interactive): < 3s

### Perceived Performance
- **Brand Latency:** ≤ 150ms (time from user action to visual feedback)
- **Animation Duration:** 100-300ms for micro-interactions
- **Page Transitions:** < 500ms

### Instrumentation
Embed UserTiming marks for RUM dashboards:
```javascript
performance.mark('cta_click');
performance.measure('hero_interaction', 'nav_start', 'cta_click');
```

---

## Motion & Interaction Design

### Motion System
- Use `@media (prefers-reduced-motion: reduce)` to respect user preferences
- All micro-animations must have reduced-motion fallback
- Transition durations: 100-150ms (fast), 200-300ms (standard)
- Easing: `ease-out` for entrances, `ease-in` for exits

**Framer Motion Example:**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
>
  {content}
</motion.div>
```

### Haptic Feedback (Mobile)
Optional haptic feedback for mobile CTAs via Web Vibration API:
```javascript
if ('vibrate' in navigator) {
  navigator.vibrate(10); // 10ms subtle vibration
}
```

### Ambient Mode (Dark Mode Support)
Detect and adapt to user preferences:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #4A90C8; /* Lightened for dark backgrounds */
    --color-bg: #1A1A1A;
    --color-text: #F8F9FA;
  }
}
```

---

## Localization & Cultural Adaptivity

### Localization Parity Rule
Every content surface must include:
- **Translation status metadata** (`translationStatus: "complete" | "placeholder" | "needs-review"`)
- **RTL layout verification** for Arabic, Hebrew
- **hreflang + `lang` attributes** on all pages
- **Tone alignment review** for cultural appropriateness

### Cultural Flexibility Matrix

| Region | Font Pair | Tone Adjustment |
|---------|------------|-----------------|
| North America | Inter + Fira Code | Friendly-professional |
| Latin America | Inter + Fira Code | Warm + direct |
| MENA | Noto Sans Arabic + system | Respectful-formal |

### RTL Support
```css
[dir="rtl"] {
  text-align: right;
  direction: rtl;
}

[dir="rtl"] .hero-content {
  margin-right: auto;
  margin-left: 0;
}
```

---

## Governance & Quality Assurance

### Brand QA Layer (Automated)
Each merge to `main` runs automated checks for:
- ✅ Font-weight usage compliance (600-700 for headings, 400-500 for body)
- ✅ Color-contrast ratios (WCAG 2.2 AA minimum)
- ✅ Spacing uniformity (8px scale adherence)
- ✅ Alt-text completeness on all images

**Non-compliant PRs are blocked until fixed.**

### Governance Cadence
- **Quarterly review:** Accessibility updates, typography performance, analytics insights
- **Annual audit:** Alignment with brand personality & AI tone systems
- **Versioning:** Update header metadata (v3.x.x, date, reviewer)

---

## AI Content & Co-Design Alignment

### AI Co-Design Protocol
All AI-assisted content must include:
```json
{
  "aiGenerated": true,
  "reviewedBy": "HumanReviewerID",
  "provenanceHash": "C2PA-compatible-hash",
  "approvalDate": "2025-10-26"
}
```

**Human reviewer approval required before publication.**

### Tone Calibration System
- Train internal AI tools on brand voice embeddings
- Validate quarterly via content audits
- Maintain dataset of approved tone samples
- Flag deviations from brand voice for review

### Content Integrity Layer
- Embed provenance metadata into all final assets
- Automate verification through CI/CD
- Track content lineage from generation to publication

---

## Data-Driven Brand Analytics

### Success Metrics Dashboard

| Module | Metric | Tool | Threshold |
|---------|---------|------|-----------|
| Hero | Engagement time | RUM / GA4 | > 3s avg |
| CTA | Click-through rate | Plausible | > 7% |
| Calculator | Completion rate | Mixpanel | > 40% |
| Typography | Brand recall | Quarterly survey | +15% YoY |
| Accessibility | Contrast compliance | Lighthouse | 100% |

### Tracking Implementation
```javascript
// Track interactive module engagement
function trackModuleEngagement(moduleName, action) {
  if (typeof plausible !== 'undefined') {
    plausible('Module Interaction', {
      props: { module: moduleName, action: action }
    });
  }
}
```

---

## Integration with Other Skills

When using the branding skill:

1. **MANDATORY: Use `languaging` first** before writing ANY content - establishes register stratification (plain language for services, academic for Insights)
2. **Always combine with `building-pages`** for accessibility/performance compliance
3. **Use with `templating-pages`** for Astro-specific implementation
4. **Reference in `generating-json-ld`** for consistent brand representation in structured data
5. **Follow `making-skill-decisions`** for skill discovery and usage workflows

---

## Brand Checklist

Before shipping any branded material:

### Visual Consistency
- [ ] Colors match specified hex values (no approximations)
- [ ] Typography uses Inter font family (or system fallback)
- [ ] Contrast ratios meet WCAG 2.2 AA (4.5:1 minimum)
- [ ] Spacing follows 8px scale tokens (no arbitrary values)
- [ ] CTAs use primary blue (#2C5F8D)
- [ ] Focus states are visible and meet 2px minimum
- [ ] Mobile scales typography and spacing appropriately
- [ ] No pure black (#000000) used for text

### Content & Voice
- [ ] Voice is precise, trustworthy, and globally-minded
- [ ] Tone matches content context (marketing, technical, legal)
- [ ] All user-facing strings have bilingual support (EN + ES minimum)
- [ ] Real people, real contexts (no stock photo clichés)
- [ ] Microcopy is helpful and low-friction

### Performance & Accessibility
- [ ] LCP ≤ 2.5s, INP < 200ms, CLS < 0.1
- [ ] Keyboard navigation fully functional
- [ ] Screen reader tested
- [ ] `prefers-reduced-motion` respected
- [ ] RTL layout verified if applicable

### Governance
- [ ] AI-generated content has provenance metadata
- [ ] Translation status documented
- [ ] Interactive modules have success metrics defined
- [ ] Brand QA checks pass in CI

---

## Brand Systems Roadmap 2026–2028

**2026 Q1-Q2:**
- Complete interactive playground suite (calculators, demos)
- Implement automated brand QA layer
- Launch quarterly brand analytics dashboard

**2026 Q3-Q4:**
- Expand cultural flexibility matrix to 5+ regions
- Deploy AI tone calibration system
- Complete accessibility AAA compliance audit

**2027:**
- Advanced motion design system
- Multisensory brand experience (haptics, spatial audio)
- Predictive personalization based on user engagement patterns

**2028:**
- AI-native content co-design workflows
- Real-time brand performance optimization
- Automated localization with cultural adaptation

---

## Maintenance

**Version:** 3.0.0
**Last Updated:** 2025-10-26
**Owner:** GeoVerity Brand & Experience Council
**Contact:** See .claude/skills/ for updates

This skill is no longer a static reference — it's a governed, measurable, adaptive system. It evolves with accessibility standards, localization demands, and AI ethics. Every visual, motion, or word in GeoVerity's ecosystem must serve one purpose: **clarity with integrity**.

### Update Triggers
Update this file when:
- New colors are added to the palette
- Typography requirements change
- New component patterns emerge
- Brand voice guidelines are refined
- Performance targets are adjusted
- Cultural flexibility matrix expands
- AI governance protocols evolve
