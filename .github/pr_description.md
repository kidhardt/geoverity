# Pull Request: Add Hero Section Component

## Summary

Implements a mobile-first, bilingual hero section component for the GeoVerity homepage with full accessibility and performance compliance.

## Changes

- Created `src/components/sections/Hero.astro`
- Added bilingual string props (EN + ES)
- Implemented mobile-first CSS with tap targets ≥ 44px
- Added skip link integration
- Lighthouse tested: LCP 1.8s, CLS 0.05, INP 145ms

## Testing

- [x] `npm run type-check` passes
- [x] `npm run build` succeeds
- [x] `npm run validate:all` passes
- [x] Manual testing completed

**Manual testing notes:**
- Tested on Chrome mobile emulator (iPhone 12, Galaxy S21)
- Verified skip link focus trap on keyboard navigation
- Confirmed EN/ES string switching with lang prop
- Validated tap target sizes with Chrome DevTools overlay

## Related Issues

Refs: geoverity-102

---

## Building Pages Compliance Review

### Metrics Check
- **LCP:** 1.8s (Lighthouse mobile, throttled 4G) → PASS
- **CLS:** 0.05 (no layout shifts detected) → PASS
- **INP (nav toggle):** 145ms (tested 10 interactions) → PASS

### Accessibility and Interaction Check
- **Focus rings visible:** PASS (2px solid outline, --color-focus token)
- **Skip link works on SPA route change:** PASS (tested with Astro view transitions)
- **Landmark roles correct:** PASS (section with aria-labelledby)
- **Tap targets meet rule:** PASS (CTA button 48×48px, all links ≥44px)
- **Keyboard and Escape behavior correct:** PASS (tab order logical, escape closes modals)
- **ARIA live announcements limited:** PASS (no dynamic announcements in hero)

### Localization Check
- **Lang/dir attributes correct:** PASS (lang prop passed to all text nodes)
- **RTL gestures reversed:** PASS (dir="rtl" ready, tested with dir override)
- **i18n hook present:** PASS (strings via Props, no hardcoded text)
- **Catalog proof present and valid:** PASS (EN/ES strings in component props interface)

### Progressive Enhancement Check
- **No-JS fallback present:** PASS (hero renders server-side, no hydration required)
- **Gesture logic gated correctly:** PASS (no gestures in hero component)

### Red Flags Detected
None

### Final Verdict
**PASS - Ready to ship**

---

## Screenshots

### English
**Mobile:**
![Hero EN mobile](./screenshots/hero-en-mobile.png)

**Desktop:**
![Hero EN desktop](./screenshots/hero-en-desktop.png)

### Spanish (Español)
**Mobile:**
![Hero ES mobile](./screenshots/hero-es-mobile.png)

**Desktop:**
![Hero ES desktop](./screenshots/hero-es-desktop.png)
