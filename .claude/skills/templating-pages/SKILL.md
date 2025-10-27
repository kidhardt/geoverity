---
name: templating-pages
description: Use when creating Astro layouts, page templates, or section components - enforces building-pages compliance and Astro conventions before code generation
---

# Templating Pages Skill

Use this skill when implementing page layouts, templates, or major UI sections for GeoVerity 2026.

## Prerequisites

Before invoking this skill, you **MUST** have:
1. ✅ Invoked `building-pages` skill
2. ✅ Completed compliance review template with verdict "PASS - Ready to ship"
3. ✅ Documented the review in your implementation plan

**If you have not completed the building-pages compliance review, STOP. Do that first.**

---

## Step 1: Mandatory Compliance Check

**Verify you have:**
- [ ] Building Pages compliance review completed (all PASS)
- [ ] Identified target locales (minimum: EN + ES)
- [ ] Confirmed mobile-first requirements (tap targets, gestures, performance)
- [ ] Design tokens or visual spec available

**If any checkbox is unchecked, STOP and complete prerequisites.**

---

## Step 2: Choose the Correct Astro Pattern

GeoVerity uses specific Astro patterns. Select the appropriate one:

### Pattern A: Full Page Layout
**When:** Creating a complete page shell (base HTML structure)

**Guardrails:**
- Must extend or live in `src/layouts/`
- Must include `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`
- Must define `lang` and `dir` attributes from frontmatter
- Must include skip link as first interactive element
- Must have `<slot />` for page content

**Bilingual Frontmatter (MANDATORY):**
```astro
---
export interface Props {
  lang: 'en' | 'es';
  title: string;
  description: string;
  // ... other props
}

const { lang = 'en', title, description } = Astro.props;
const dir = lang === 'ar' ? 'rtl' : 'ltr'; // Future-proof for RTL
---
```

**Example:**
```astro
<!DOCTYPE html>
<html lang={lang} dir={dir}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <!-- JSON-LD structured data via generating-json-ld skill -->
</head>
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  <slot />
</body>
</html>
```

---

### Pattern B: Section Component
**When:** Creating reusable sections (hero, features, CTA, etc.)

**Guardrails:**
- Must live in `src/components/sections/`
- Must accept bilingual strings as props (no hardcoded English)
- Must use semantic HTML (`<section>`, `<article>`, `<nav>`)
- Must include `id` or `aria-label` for landmark identification

**Bilingual Props (MANDATORY):**
```astro
---
export interface Props {
  heading: string;
  subheading?: string;
  cta?: { text: string; href: string; };
  lang?: 'en' | 'es';
}

const { heading, subheading, cta, lang = 'en' } = Astro.props;
---
```

**Example:**
```astro
<section aria-labelledby="hero-heading" class="hero">
  <h1 id="hero-heading">{heading}</h1>
  {subheading && <p class="subheading">{subheading}</p>}
  {cta && (
    <a href={cta.href} class="cta-button">
      {cta.text}
    </a>
  )}
</section>

<style>
  /* Mobile-first: base styles for smallest screens */
  .hero {
    padding: 1rem;
  }

  .cta-button {
    /* Tap target: minimum 44×44px */
    min-height: 44px;
    padding: 12px 24px;
    display: inline-block;
  }

  /* Progressive enhancement for larger screens */
  @media (min-width: 768px) {
    .hero {
      padding: 2rem;
    }
  }
</style>
```

---

### Pattern C: React Island (Interactive Component)
**When:** Adding client-side interactivity (forms, toggles, dynamic behavior)

**Guardrails:**
- Must live in `src/apps/` (NOT `src/components/`)
- Must export a manifest with bilingual strings
- Must render with `client:idle` or `client:visible` (NOT `client:load`)
- Must work with JavaScript disabled (progressive enhancement)
- Must follow React island compliance from Phase 4

**Manifest (MANDATORY):**
```typescript
// src/apps/contact-form/manifest.ts
export const manifest = {
  name: 'contact-form',
  sensitivity: 'medium', // legal data collection
  strings: {
    en: {
      nameLabel: 'Your Name',
      emailLabel: 'Email Address',
      submit: 'Send Message'
    },
    es: {
      nameLabel: 'Su Nombre',
      emailLabel: 'Correo Electrónico',
      submit: 'Enviar Mensaje'
    }
  }
};
```

**Hydration in Page:**
```astro
---
import ContactForm from '@/apps/contact-form/ContactForm';
import { manifest } from '@/apps/contact-form/manifest';

const lang = Astro.currentLocale || 'en';
const strings = manifest.strings[lang];
---

<!-- Lazy hydration: only load when visible -->
<ContactForm client:visible strings={strings} />

<!-- No-JS fallback -->
<noscript>
  <form action="/api/contact" method="POST">
    <!-- Standard HTML form for accessibility -->
  </form>
</noscript>
```

---

## Step 3: Implement Mobile-First CSS

**Rules:**
1. **Base styles = mobile** (320px-767px)
2. **Use `min-width` media queries** for larger screens
3. **Tap targets ≥ 44×44px** (or 32×32px + 12px padding)
4. **Test gesture conflicts** (swipe vs. scroll)

**Example:**
```css
/* ❌ WRONG: Desktop-first */
.nav {
  display: flex;
  gap: 2rem;
}
@media (max-width: 768px) {
  .nav {
    flex-direction: column; /* Overriding desktop styles */
  }
}

/* ✅ CORRECT: Mobile-first */
.nav {
  display: flex;
  flex-direction: column; /* Mobile default */
}
@media (min-width: 768px) {
  .nav {
    flex-direction: row;
    gap: 2rem;
  }
}
```

**Tap Target Token:**
```css
:root {
  --tap-target-min: 44px;
  --tap-target-comfortable: 48px;
}

.button,
.nav-link,
.toggle {
  min-height: var(--tap-target-min);
  min-width: var(--tap-target-min);
}
```

---

## Step 4: Bilingual Implementation Checklist

- [ ] All user-facing strings accept props (no hardcoded text)
- [ ] `lang` attribute propagates to all components
- [ ] `dir` attribute supports RTL (even if not used yet)
- [ ] Date/number formatting uses `Intl` APIs
- [ ] Image `alt` text is localized
- [ ] Form labels, placeholders, errors are localized
- [ ] ARIA labels and live regions are localized

**Example i18n Pattern:**
```astro
---
// Use centralized i18n utility (create if missing)
import { t } from '@/i18n/utils';

const { lang = 'en' } = Astro.props;
const strings = {
  en: { title: 'Our Services', viewAll: 'View All Services' },
  es: { title: 'Nuestros Servicios', viewAll: 'Ver Todos los Servicios' }
};
---

<section aria-labelledby="services-title">
  <h2 id="services-title">{strings[lang].title}</h2>
  <a href={`/${lang}/services`}>
    {strings[lang].viewAll}
  </a>
</section>
```

---

## Step 5: Performance Optimization

**Checklist:**
- [ ] Images use `<picture>` with WebP + fallback, or Astro's `<Image>`
- [ ] Critical CSS inlined in `<head>` (< 14KB)
- [ ] Non-critical CSS loaded async
- [ ] Fonts preloaded with `font-display: swap`
- [ ] No render-blocking scripts in `<head>` without `defer`
- [ ] React islands use `client:idle` or `client:visible` (NOT `client:load`)

**Astro Image Example:**
```astro
---
import { Image } from 'astro:assets';
import heroImage from '@/assets/hero.jpg';
---

<Image
  src={heroImage}
  alt="GeoVerity team collaborating"
  width={1200}
  height={600}
  loading="eager" /* Only for above-fold hero */
  format="webp"
/>
```

---

## Step 6: Accessibility Final Check

Before marking the template complete:

- [ ] Skip link visible on focus and functional
- [ ] Heading hierarchy is logical (`h1` → `h2` → `h3`, no skips)
- [ ] All interactive elements keyboard-accessible
- [ ] Focus rings visible (not `outline: none` without replacement)
- [ ] Color contrast ≥ 4.5:1 for text, ≥ 3:1 for UI elements
- [ ] ARIA used only where semantic HTML insufficient
- [ ] Forms have `<label>` for every `<input>`
- [ ] Error messages associated with fields via `aria-describedby`

**Run local scan:**
```bash
npm run build
node scripts/accessibility_scan.js
```

---

## Step 7: Commit and Document

### Git Commit Message Format:
```
feat(templates): add [component name] with bilingual support

- Implements [Pattern A/B/C] for [page/section]
- Passes building-pages compliance review (see PR description)
- Mobile-first CSS with tap targets ≥44px
- EN + ES strings via props
- LCP target ≤2.5s verified locally

Refs: geoverity-[bead-number]
```

### PR Description Must Include:
1. **Building Pages Compliance Review** (completed template from skill)
2. **Screenshots** (mobile + desktop, EN + ES)
3. **Performance Metrics** (Lighthouse scores or local measurements)
4. **Accessibility Notes** (any deviations or special considerations)

---

## Common Mistakes to Avoid

### ❌ Hardcoded English Strings
```astro
<h1>Welcome to GeoVerity</h1> <!-- Will fail localization validator -->
```

### ✅ Localized Props
```astro
<h1>{heading}</h1> <!-- Accepts EN or ES via props -->
```

---

### ❌ Desktop-First CSS
```css
@media (max-width: 768px) {
  /* Mobile overrides */
}
```

### ✅ Mobile-First CSS
```css
/* Mobile base */
@media (min-width: 768px) {
  /* Desktop enhancements */
}
```

---

### ❌ Eager Island Hydration
```astro
<ReactComponent client:load /> <!-- Blocks LCP -->
```

### ✅ Lazy Hydration
```astro
<ReactComponent client:visible /> <!-- Loads when scrolled into view -->
```

---

### ❌ Missing Tap Targets
```css
.icon-button {
  width: 24px;
  height: 24px; /* Too small, fails mobile compliance */
}
```

### ✅ Proper Tap Targets
```css
.icon-button {
  width: 24px;
  height: 24px;
  padding: 12px; /* Effective hit area: 48×48px ✅ */
}
```

---

## Integration with Other Skills

After completing this skill, you may need:

- **`generating-json-ld`** - Add Schema.org structured data to all public pages
- **`requesting-code-review`** - Final review before PR submission
- **`using-astro`** - Framework-specific advanced patterns (collections, routing, SSR)

---

## Enforcement Note

This skill works with the `page-templating` workflow. Skipping steps or bypassing conventions will:

1. **Fail CI** - `validate_building_pages_review.js` will block merge
2. **Fail localization validator** - Hardcoded strings will be caught
3. **Fail accessibility scan** - Missing `lang`, poor contrast, etc.
4. **Fail performance audit** - LCP > 2.5s or CLS > 0.1

**Every guardrail exists because someone tried to skip it and broke production.**

Follow the checklist. Complete the compliance review. Ship with confidence.
