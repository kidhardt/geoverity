# Phase 11: Template Organization & Review

## Current State Audit

### What Already Exists

**Layouts** (2 files):
- `src/layouts/BasePageEn.astro` - Base English layout with metadata, hreflang, mobile-first structure
- `src/layouts/BasePageEs.astro` - Base Spanish layout (mirror of English)

**Pages** (4 files):
- `src/pages/index.astro` - English homepage (Phase 1-3 scaffold placeholder)
- `src/pages/es/index.astro` - Spanish homepage
- `src/pages/placeholder.astro` - Example page showing React island mounting
- `src/pages/es/placeholder.astro` - Spanish example page

**Data Infrastructure**:
- `src/data/loaders.ts` - Data loading functions
- `src/data/structured/models.ts` - TypeScript interfaces for Pillars, Deliverables
- `src/data/structured/pillars.sample.ts` - Sample pillar data
- `src/data/unstructured/consultingHigherEd.en.json` - Higher Ed content (English)
- `src/data/unstructured/consultingHigherEd.es.json` - Higher Ed content (Spanish)

**React Infrastructure**:
- `src/apps/island.types.ts` - Island type definitions
- `src/apps/research-integrity/` - Research integrity island (from placeholder example)

### What Does NOT Exist Yet

**No dedicated templates for**:
- Homepage (uses basic BasePageEn)
- Services Hub page
- Service Pillar pages
- Service Spoke pages
- Insights Hub
- Insights Category pages
- Insights Post pages
- Contact page

**No components directory** - All page structure is currently inline in .astro files

**No styling system** - Minimal inline styles only

---

## Proposed Template Architecture

### Template Hierarchy

```
src/
├── layouts/
│   ├── BasePageEn.astro          [EXISTS - base layout]
│   ├── BasePageEs.astro          [EXISTS - Spanish base]
│   ├── HomepageLayout.astro      [NEED - specialized homepage]
│   ├── ServicesHubLayout.astro   [NEED - services landing]
│   ├── PillarLayout.astro        [NEED - pillar pages]
│   ├── SpokeLayout.astro         [NEED - spoke pages]
│   ├── InsightsHubLayout.astro   [NEED - insights landing]
│   ├── InsightsCategoryLayout.astro [NEED - category pages]
│   ├── InsightsPostLayout.astro  [NEED - blog posts]
│   └── ContactLayout.astro       [NEED - contact page]
│
├── components/                    [NEED TO CREATE]
│   ├── Navigation.astro          [Global header nav]
│   ├── Footer.astro              [Global footer]
│   ├── LanguageSwitcher.astro    [EN/ES toggle]
│   ├── CTAButton.astro           [Call-to-action button]
│   ├── PillarCard.astro          [Service pillar card]
│   ├── SpokeCard.astro           [Spoke/sub-service card]
│   ├── InsightCard.astro         [Insight post preview card]
│   ├── CategoryBadge.astro       [Category label]
│   └── Breadcrumb.astro          [Breadcrumb navigation]
│
└── pages/
    └── [All actual pages use layouts + components]
```

---

## Template Specifications for Review

Below are the proposed templates for your approval. Each template includes:
1. Purpose
2. Visual structure
3. Data requirements
4. Example usage

---

## 1. Homepage Template

**Purpose**: Main landing page highlighting GeoVerity mission and Higher Education Consulting as flagship

**Layout**: `HomepageLayout.astro`

**Visual Structure**:
```
┌─────────────────────────────────────────────┐
│ [Navigation]                       [EN | ES]│
├─────────────────────────────────────────────┤
│                                             │
│  Hero Section                               │
│  ┌─────────────────────────────────────┐  │
│  │ GeoVerity: Truth at Global Scale    │  │
│  │                                     │  │
│  │ [Large headline about mission]      │  │
│  │                                     │  │
│  │ [CTA: Schedule Consultation]        │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  Flagship Service Highlight                 │
│  ┌─────────────────────────────────────┐  │
│  │ 🏆 Higher Education Consulting      │  │
│  │                                     │  │
│  │ [Short description paragraph]       │  │
│  │                                     │  │
│  │ [CTA: Learn More]                   │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  Services Overview                          │
│  ┌────────┐ ┌────────┐ ┌────────┐        │
│  │Pillar 1│ │Pillar 2│ │Pillar 3│        │
│  │ Card   │ │ Card   │ │ Card   │        │
│  └────────┘ └────────┘ └────────┘        │
│                                             │
│  [CTA: View All Services]                  │
│  [CTA: Explore Insights]                   │
│                                             │
├─────────────────────────────────────────────┤
│ [Footer with language switcher]            │
└─────────────────────────────────────────────┘
```

**Data Requirements**:
- Hero headline (bilingual)
- Hero description (bilingual)
- Higher Ed highlight text (bilingual)
- 4 Pillar cards (name, short description, link)

**Example Usage**:
```astro
---
import HomepageLayout from "@/layouts/HomepageLayout.astro";

const pageMeta = {
  title: "GeoVerity - Truth at Global Scale",
  description: "AI integrity, multilingual data, and trustworthy evaluation...",
  canonical: "/",
  alternateEs: "/es/",
  translationStatus: "complete",
  lastReviewed: "2025-10-26"
};

const hero = {
  headline: "Truth at Global Scale",
  description: "GeoVerity provides...",
  cta: { text: "Schedule Consultation", href: "/contact/" }
};

const flagshipHighlight = {
  title: "Higher Education Consulting",
  description: "Graduate programs as guardians of epistemic integrity...",
  cta: { text: "Learn More", href: "/higher-education-consulting/" }
};
---

<HomepageLayout {...pageMeta} hero={hero} flagship={flagshipHighlight}>
  <!-- Additional custom sections if needed -->
</HomepageLayout>
```

---

## 2. Services Hub Template

**Purpose**: Master landing page showing all 4 service pillars

**Layout**: `ServicesHubLayout.astro`

**Visual Structure**:
```
┌─────────────────────────────────────────────┐
│ [Navigation]                       [EN | ES]│
├─────────────────────────────────────────────┤
│                                             │
│  Services                                   │
│  ═════════════════════════════             │
│                                             │
│  Truth at Global Scale                      │
│  [Mission statement paragraph]              │
│                                             │
│  Our Services                               │
│  ───────────────────────────────           │
│                                             │
│  🏆 Higher Education Consulting  [FIRST]   │
│  ┌─────────────────────────────────────┐  │
│  │ [Icon or visual]                    │  │
│  │ [2-3 paragraph description]         │  │
│  │ • Spoke 1                           │  │
│  │ • Spoke 2                           │  │
│  │ • Spoke 3                           │  │
│  │ [Learn More →]                      │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  📊 AI Data Infrastructure                  │
│  ┌─────────────────────────────────────┐  │
│  │ [Description paragraph]             │  │
│  │ • Spoke 1                           │  │
│  │ • Spoke 2                           │  │
│  │ [Learn More →]                      │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  ✓ Model Evaluation & Trust Scoring        │
│  [Similar card structure]                  │
│                                             │
│  ⚖️ AI Governance & Compliance             │
│  [Similar card structure]                  │
│                                             │
│  [CTA: Schedule Consultation]              │
│  [CTA: Explore Insights]                   │
│                                             │
├─────────────────────────────────────────────┤
│ [Footer]                                   │
└─────────────────────────────────────────────┘
```

**Data Requirements**:
- Mission statement (bilingual)
- 4 Pillar objects:
  - name
  - icon/emoji
  - description (2-3 paragraphs)
  - spoke list (names + links)
  - pillar link

**Example Usage**:
```astro
---
import ServicesHubLayout from "@/layouts/ServicesHubLayout.astro";
import { getPillarsSample } from "@/data/loaders";

const pillars = getPillarsSample(); // or fetch from CMS

const pageMeta = {
  title: "GeoVerity Services - Truth at Global Scale",
  description: "Comprehensive AI integrity services...",
  canonical: "/services/",
  alternateEs: "/es/servicios/",
  translationStatus: "complete",
  lastReviewed: "2025-10-26"
};
---

<ServicesHubLayout {...pageMeta} pillars={pillars} />
```

---

## 3. Service Pillar Template

**Purpose**: Individual pillar landing page (e.g., Higher Education Consulting)

**Layout**: `PillarLayout.astro`

**Visual Structure**:
```
┌─────────────────────────────────────────────┐
│ [Navigation]                       [EN | ES]│
│ [Breadcrumb: Home > Services > This Pillar] │
├─────────────────────────────────────────────┤
│                                             │
│  Higher Education Consulting                │
│  ═════════════════════════════════         │
│                                             │
│  The Problem                                │
│  ───────────────────────────────           │
│  [2-3 paragraphs describing the problem:   │
│   AI collapse of authorship, need for      │
│   epistemic integrity, etc.]               │
│                                             │
│  Our Approach                               │
│  ───────────────────────────────           │
│  [2-3 paragraphs on GeoVerity solution]    │
│                                             │
│  What We Offer                              │
│  ───────────────────────────────           │
│                                             │
│  ┌──────────────────┐ ┌──────────────────┐│
│  │ Spoke 1          │ │ Spoke 2          ││
│  │ [Card with icon] │ │ [Card with icon] ││
│  │ Short desc       │ │ Short desc       ││
│  │ [Learn More]     │ │ [Learn More]     ││
│  └──────────────────┘ └──────────────────┘│
│                                             │
│  ┌──────────────────┐ ┌──────────────────┐│
│  │ Spoke 3          │ │ Spoke 4          ││
│  └──────────────────┘ └──────────────────┘│
│  [Continue for all spokes...]              │
│                                             │
│  Why This Matters                           │
│  ───────────────────────────────           │
│  [Value proposition paragraph]              │
│                                             │
│  [CTA: Request Academic Consultation]      │
│  [CTA: Explore Related Insights]           │
│                                             │
├─────────────────────────────────────────────┤
│ [Footer]                                   │
└─────────────────────────────────────────────┘
```

**Data Requirements**:
- Pillar name (bilingual)
- Problem statement (2-3 paragraphs, bilingual)
- Approach/solution (2-3 paragraphs, bilingual)
- Spoke cards array:
  - name
  - icon/emoji
  - short description (1 paragraph)
  - link
- Value proposition (1 paragraph)
- CTA buttons

**Example Usage**:
```astro
---
import PillarLayout from "@/layouts/PillarLayout.astro";

const pageMeta = {
  title: "Higher Education Consulting | GeoVerity",
  description: "Graduate programs as guardians of epistemic integrity...",
  canonical: "/higher-education-consulting/",
  alternateEs: "/es/consultoria-academica/",
  translationStatus: "complete",
  lastReviewed: "2025-10-26"
};

const pillar = {
  name: "Higher Education Consulting",
  problem: "[2-3 paragraphs]",
  approach: "[2-3 paragraphs]",
  spokes: [
    { name: "Graduate Students...", description: "...", link: "/..." },
    // ... more spokes
  ],
  valueProp: "[1 paragraph]"
};
---

<PillarLayout {...pageMeta} pillar={pillar} />
```

---

## 4. Service Spoke Template

**Purpose**: Individual spoke/sub-service page

**Layout**: `SpokeLayout.astro`

**Visual Structure**:
```
┌─────────────────────────────────────────────┐
│ [Navigation]                       [EN | ES]│
│ [Breadcrumb: Home > Services > Pillar > This]│
├─────────────────────────────────────────────┤
│                                             │
│  Graduate Students as Epistemic Guardians   │
│  ═════════════════════════════════         │
│                                             │
│  Overview                                   │
│  ───────────────────────────────           │
│  [1-2 paragraphs describing this service]  │
│                                             │
│  Key Features                               │
│  ───────────────────────────────           │
│  • Feature 1                               │
│  • Feature 2                               │
│  • Feature 3                               │
│  • Feature 4                               │
│                                             │
│  Who This Serves                            │
│  ───────────────────────────────           │
│  [1 paragraph on target audience]          │
│                                             │
│  Related Services                           │
│  ───────────────────────────────           │
│  ┌───────────┐ ┌───────────┐              │
│  │ Spoke 2   │ │ Spoke 3   │              │
│  └───────────┘ └───────────┘              │
│                                             │
│  [CTA: Back to Pillar]                     │
│  [CTA: Request Consultation]               │
│                                             │
├─────────────────────────────────────────────┤
│ [Footer]                                   │
└─────────────────────────────────────────────┘
```

**Data Requirements**:
- Spoke name (bilingual)
- Overview (1-2 paragraphs, bilingual)
- Key features list (4-6 items)
- Target audience (1 paragraph)
- Related spokes array (for cross-linking)
- Parent pillar info (for breadcrumb + back link)

**Example Usage**:
```astro
---
import SpokeLayout from "@/layouts/SpokeLayout.astro";

const pageMeta = {
  title: "Graduate Students as Epistemic Guardians | GeoVerity",
  description: "Identity formation, ethical AI use, hiring relevance...",
  canonical: "/higher-education-consulting/graduate-students-epistemic-integrity/",
  alternateEs: "/es/consultoria-academica/estudiantes-integridad-epistemica/",
  translationStatus: "complete",
  lastReviewed: "2025-10-26"
};

const spoke = {
  name: "Graduate Students as Epistemic Guardians",
  parentPillar: { name: "Higher Education Consulting", link: "/..." },
  overview: "[1-2 paragraphs]",
  features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  audience: "[1 paragraph]",
  relatedSpokes: [...]
};
---

<SpokeLayout {...pageMeta} spoke={spoke} />
```

---

## 5. Insights Hub Template

**Purpose**: Main Insights landing page (thought leadership hub)

**Layout**: `InsightsHubLayout.astro`

**Visual Structure**:
```
┌─────────────────────────────────────────────┐
│ [Navigation]                       [EN | ES]│
├─────────────────────────────────────────────┤
│                                             │
│  Insights                                   │
│  ═════════════════════════════════         │
│                                             │
│  Thought leadership on AI integrity,        │
│  governance, and global-scale truth.        │
│                                             │
│  Categories                                 │
│  ───────────────────────────────           │
│  ┌─────────────┐ ┌─────────────┐          │
│  │ Academic    │ │ AI          │          │
│  │ Integrity   │ │ Governance  │          │
│  │ [12 posts]  │ │ [8 posts]   │          │
│  └─────────────┘ └─────────────┘          │
│  ┌─────────────┐ ┌─────────────┐          │
│  │ Multilingual│ │ Trust &     │          │
│  │ Data        │ │ Evaluation  │          │
│  └─────────────┘ └─────────────┘          │
│  ┌─────────────┐                           │
│  │ Research    │                           │
│  │ Integrity   │                           │
│  └─────────────┘                           │
│                                             │
│  Recent Posts                               │
│  ───────────────────────────────           │
│  ┌─────────────────────────────────────┐  │
│  │ Post Title                          │  │
│  │ [Category Badge] | Date             │  │
│  │ [Excerpt...]                        │  │
│  │ [Read More →]                       │  │
│  └─────────────────────────────────────┘  │
│  [More post cards...]                      │
│                                             │
│  [View All Posts]                          │
│                                             │
├─────────────────────────────────────────────┤
│ [Footer]                                   │
└─────────────────────────────────────────────┘
```

**Data Requirements**:
- Hub description (1-2 sentences, bilingual)
- Categories array:
  - name
  - slug/link
  - post count
  - icon/emoji
- Recent posts array (query from content collection or JSON):
  - title
  - category
  - date
  - excerpt
  - link

**Example Usage**:
```astro
---
import InsightsHubLayout from "@/layouts/InsightsHubLayout.astro";
import { getCollection } from "astro:content";

const posts = await getCollection("insights");
const recentPosts = posts.slice(0, 6);

const categories = [
  { name: "Academic Integrity", slug: "academic-integrity", count: 12 },
  { name: "AI Governance", slug: "ai-governance", count: 8 },
  // ...
];

const pageMeta = {
  title: "Insights | GeoVerity",
  description: "Thought leadership on AI integrity...",
  canonical: "/insights/",
  alternateEs: "/es/insights/",
  translationStatus: "complete",
  lastReviewed: "2025-10-26"
};
---

<InsightsHubLayout {...pageMeta} categories={categories} recentPosts={recentPosts} />
```

---

## 6. Insights Category Template

**Purpose**: Category landing page showing all posts in a category

**Layout**: `InsightsCategoryLayout.astro`

**Visual Structure**:
```
┌─────────────────────────────────────────────┐
│ [Navigation]                       [EN | ES]│
│ [Breadcrumb: Home > Insights > Category]    │
├─────────────────────────────────────────────┤
│                                             │
│  Academic Integrity                         │
│  ═════════════════════════════════         │
│                                             │
│  Exploring graduate education, epistemic    │
│  responsibility, and AI use in academia.    │
│                                             │
│  Related Service: Higher Education Consulting│
│                                             │
│  All Posts in This Category                 │
│  ───────────────────────────────           │
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │ Post Title 1                        │  │
│  │ Date | 3 min read                   │  │
│  │ [Excerpt paragraph...]              │  │
│  │ [Read More →]                       │  │
│  └─────────────────────────────────────┘  │
│  [More post cards...]                      │
│                                             │
│  [Load More] or [Pagination]               │
│                                             │
├─────────────────────────────────────────────┤
│ [Footer]                                   │
└─────────────────────────────────────────────┘
```

**Data Requirements**:
- Category name (bilingual)
- Category description (1-2 sentences, bilingual)
- Related service pillar link
- Posts array (filtered by category)

**Example Usage**:
```astro
---
import InsightsCategoryLayout from "@/layouts/InsightsCategoryLayout.astro";
import { getCollection } from "astro:content";

const allPosts = await getCollection("insights");
const categoryPosts = allPosts.filter(p => p.data.category === "academic-integrity");

const category = {
  name: "Academic Integrity",
  description: "Exploring graduate education...",
  relatedService: { name: "Higher Education Consulting", link: "/..." }
};

const pageMeta = {
  title: "Academic Integrity | Insights | GeoVerity",
  description: "Articles on graduate education...",
  canonical: "/insights/category/academic-integrity/",
  alternateEs: "/es/insights/categoria/integridad-academica/",
  translationStatus: "complete",
  lastReviewed: "2025-10-26"
};
---

<InsightsCategoryLayout {...pageMeta} category={category} posts={categoryPosts} />
```

---

## 7. Insights Post Template

**Purpose**: Individual blog post / article

**Layout**: `InsightsPostLayout.astro`

**Visual Structure**:
```
┌─────────────────────────────────────────────┐
│ [Navigation]                       [EN | ES]│
│ [Breadcrumb: Home > Insights > Category > Post]│
├─────────────────────────────────────────────┤
│                                             │
│  [Category Badge]                           │
│  Why Trust is the New Academic Currency     │
│  ═════════════════════════════════         │
│                                             │
│  By GeoVerity Team | Oct 26, 2025 | 5 min  │
│  Last Reviewed: Oct 26, 2025                │
│                                             │
│  ───────────────────────────────           │
│                                             │
│  [Article content - multiple paragraphs]   │
│  [Can include headings, lists, quotes]     │
│                                             │
│  Related Service                            │
│  ───────────────────────────────           │
│  This topic relates to:                    │
│  → Higher Education Consulting             │
│                                             │
│  ───────────────────────────────           │
│                                             │
│  Work With Us                               │
│  [CTA: Request Consultation]               │
│                                             │
│  Related Posts                              │
│  ───────────────────────────────           │
│  ┌────────┐ ┌────────┐ ┌────────┐         │
│  │Post 2  │ │Post 3  │ │Post 4  │         │
│  └────────┘ └────────┘ └────────┘         │
│                                             │
├─────────────────────────────────────────────┤
│ [Footer]                                   │
└─────────────────────────────────────────────┘
```

**Data Requirements**:
- Post frontmatter:
  - title (bilingual)
  - category
  - date
  - lastReviewed
  - author
  - readTime
  - excerpt
  - relatedService (link to pillar/spoke)
- Post body content (markdown or HTML)
- Related posts array (same category, exclude current)
- JSON twin (same content for AI ingestion)

**Example Usage**:
```astro
---
import InsightsPostLayout from "@/layouts/InsightsPostLayout.astro";

const pageMeta = {
  title: "Why Trust is the New Academic Currency | Insights | GeoVerity",
  description: "Exploring how trustworthiness becomes...",
  canonical: "/insights/why-trust-is-the-new-academic-currency/",
  alternateEs: "/es/insights/por-que-la-confianza-es-la-nueva-moneda-academica/",
  translationStatus: "complete",
  lastReviewed: "2025-10-26"
};

const post = {
  title: "Why Trust is the New Academic Currency",
  category: { name: "Academic Integrity", slug: "academic-integrity" },
  date: "2025-10-26",
  author: "GeoVerity Team",
  readTime: "5 min",
  relatedService: { name: "Trust as Currency", link: "/higher-education-consulting/trust-as-currency/" }
};
---

<InsightsPostLayout {...pageMeta} post={post}>
  <!-- Post body content -->
  <p>In an era where AI can generate...</p>
  <!-- ... -->
</InsightsPostLayout>
```

---

## 8. Contact Page Template

**Purpose**: Contact form with React island mount

**Layout**: `ContactLayout.astro`

**Visual Structure**:
```
┌─────────────────────────────────────────────┐
│ [Navigation]                       [EN | ES]│
├─────────────────────────────────────────────┤
│                                             │
│  Contact Us                                 │
│  ═════════════════════════════════         │
│                                             │
│  Request a Consultation                     │
│  ───────────────────────────────           │
│                                             │
│  Whether you're a university administrator, │
│  enterprise ML team, or compliance officer, │
│  we're here to help.                        │
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │                                     │  │
│  │  [React Contact Form Island]       │  │
│  │                                     │  │
│  │  Name: _______________             │  │
│  │  Email: ______________             │  │
│  │  Organization: ________             │  │
│  │  Interest: [dropdown]              │  │
│  │  Message: _____________            │  │
│  │           _____________            │  │
│  │                                     │  │
│  │  [Submit]                          │  │
│  │                                     │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  Other Ways to Reach Us                    │
│  ───────────────────────────────           │
│  Email: contact@geoverity.com              │
│                                             │
├─────────────────────────────────────────────┤
│ [Footer]                                   │
└─────────────────────────────────────────────┘
```

**Data Requirements**:
- Intro paragraph (bilingual)
- Contact email
- Form interest dropdown options:
  - Higher Education Consulting
  - AI Data Infrastructure
  - Model Evaluation
  - AI Governance
  - General Inquiry

**Example Usage**:
```astro
---
import ContactLayout from "@/layouts/ContactLayout.astro";
import { ContactFormIsland } from "@/apps/ContactForm/Island";

const pageMeta = {
  title: "Contact Us | GeoVerity",
  description: "Request a consultation with GeoVerity...",
  canonical: "/contact/",
  alternateEs: "/es/contacto/",
  translationStatus: "complete",
  lastReviewed: "2025-10-26"
};
---

<ContactLayout {...pageMeta}>
  <!-- React Contact Form island mounts here -->
  <ContactFormIsland client:idle lang="en" />
</ContactLayout>
```

---

## Questions for Your Approval

Before I create these templates, please review and answer:

### 1. Visual Design & Styling

**UPDATED:** Brand guidelines now defined in [.claude/skills/branding/SKILL.md](.claude/skills/branding/SKILL.md) v3.0.0

**Brand System Summary:**
- **Colors:** Primary Blue (#2C5F8D), Accent Green (#3B7A57), Accent Orange (#D97757)
- **Typography:** Inter font family (600 weight headings, 400 body)
- **Type Scale (Desktop):** h1: 2.5rem, h2: 2rem, h3: 1.5rem, body: 1rem
- **Type Scale (Mobile):** h1: 2rem, h2: 1.75rem, h3: 1.375rem, body: 1rem
- **Spacing System:** 8px scale (--space-xs: 0.25rem → --space-3xl: 4rem)
- **Border Radius:** 4px (buttons), 8px (cards), 12px (large modules)
- **Design Tokens:** CSS custom properties defined in `:root`
- **Accessibility:** WCAG 2.2 AA+ (contrast ratios verified)
- **Grid System:** 12-column (desktop), 8-column (tablet), 4-column (mobile)

**Q**: What's your preferred approach to styling?
- **Option A:** Inline Tailwind classes in components ❌ (Not aligned with branding skill)
- **Option B:** Scoped CSS in each .astro component + CSS design tokens ✅ **RECOMMENDED**
- **Option C:** Global CSS + CSS modules ⚠️ (Possible but less component-scoped)
- **Option D:** Mix of above ⚠️ (Can lead to inconsistency)

**Recommendation:** Option B (Scoped CSS with design tokens) per branding skill examples

### 2. Component Structure

**Q**: Should I create the full component library (`src/components/`) as shown above?
- Navigation, Footer, Cards, Buttons, etc.

**Q**: Or would you prefer simpler inline components in each layout for now?

### 3. Data Strategy

**Q**: Content source preference?
- Option A: JSON files (like current `consultingHigherEd.en.json`)
- Option B: Astro Content Collections (markdown with frontmatter)
- Option C: External CMS (which one?)
- Option D: Mix of above

### 4. Template Priorities

**Q**: Which templates do you want created FIRST for review?
Please rank 1-8:
- [ ] Homepage
- [ ] Services Hub
- [ ] Service Pillar (Higher Ed)
- [ ] Service Spoke
- [ ] Insights Hub
- [ ] Insights Category
- [ ] Insights Post
- [ ] Contact Page

### 5. Content Decisions

**UPDATED:** Voice and tone guidelines defined in branding skill v3.0.0

**Brand Voice Attributes:**
- **Precise:** Specific numbers, cited sources, avoid vague claims
- **Trustworthy:** Transparent about limitations, active voice, no hyperbole
- **Globally-Minded:** International standards (GDPR, NIST), cultural nuance
- **Academically Rigorous:** Graduate-level vocabulary, citations, methodology

**Q**: For the initial stub pages (Phase 11), should content be:
- Option A: Actual marketing copy (requires content writing) ✅ **RECOMMENDED** for Homepage + Higher Ed pillar
- Option B: "Lorem ipsum" style placeholders ❌ (Conflicts with brand authenticity)
- Option C: Factual descriptions only (like current placeholder) ✅ **ACCEPTABLE** for remaining pages
- Option D: Mix depending on page type ✅ **RECOMMENDED** (A for key pages, C for others)

**Q**: Should I draft actual content for key pages (Homepage, Higher Ed pillar)?
**Recommendation:** YES for Homepage and Higher Ed pillar, using branding voice guidelines

### 6. React Islands

**UPDATED:** Interactive experience guidelines defined in branding skill v3.0.0

**Interactive Product Playgrounds Philosophy:**
- "Let users *experience* value before commitment"
- Faster understanding of complex offerings
- Higher engagement and time-on-site
- Better-qualified leads

**Technical Requirements (per branding):**
- Performant builds (tree-shaken modules)
- Full keyboard accessibility + ARIA labeling
- Mobile-responsive with touch optimization
- Consistent with design tokens
- Lazy-loaded (`client:idle` or `client:visible`)

**Q**: Contact form priority?
- Build React Contact Form island now (bead 700)? ⚠️ **PHASE 11 DEFER**
- Create mount point placeholder? ✅ **RECOMMENDED** (aligns with phased approach)

**Q**: Research Integrity tools?
- Build P-Value Assessor now (bead 701)? ❌ **PHASE 12+**
- Wait for later phase? ✅ **RECOMMENDED** (focus on content surfaces first)

### 7. Mobile-First Specifics

**UPDATED:** Mobile specifications defined in branding skill v3.0.0

**Q**: Mobile breakpoints?
- **Branding Standard:** 768px (tablet), 1024px (desktop)
- **Grid:** 4-column (mobile), 8-column (tablet), 12-column (desktop)
- **Spacing:** Reduce by 25-50% on mobile, minimum 1rem padding on all sides
- **Typography:** Responsive type scale (h1: 2.5rem desktop → 2rem mobile)
- **Tap Targets:** 44px minimum (building-pages + branding requirement)

**Q**: Navigation on mobile?
- Hamburger menu? ✅ **RECOMMENDED** (aligns with minimalist design principles)
- Bottom nav? ❌ (Not aligned with desktop-to-mobile consistency)
- Simple stacked menu? ⚠️ (Acceptable for small nav items, but may clutter)

### 8. Additional Pages

**Q**: Any other page types needed that weren't in the original hierarchy?
- About page?
- Team page?
- Case studies?
- FAQ?

---

## Next Steps

Once you answer the remaining questions above, I will:

1. **Set up design system:**
   - Create `src/styles/tokens.css` with CSS custom properties from branding skill
   - Create `src/styles/global.css` with base styles (typography, resets)
   - Import design tokens in BasePageEn/BasePageEs layouts

2. **Create component library** (if approved):
   - Navigation.astro (with hamburger menu for mobile)
   - Footer.astro (with language switcher)
   - CTAButton.astro (primary/secondary/tertiary variants per branding)
   - PillarCard.astro, SpokeCard.astro, InsightCard.astro
   - Breadcrumb.astro, CategoryBadge.astro

3. **Create templates in priority order:**
   - Each template uses scoped CSS + design tokens
   - All components follow branding guidelines (colors, typography, spacing)
   - WCAG 2.2 AA+ accessibility requirements
   - Mobile-first responsive design (768px tablet, 1024px desktop)

4. **Draft content for key pages:**
   - Homepage hero (precise, trustworthy, globally-minded voice)
   - Higher Ed pillar content (academically rigorous tone)
   - Factual stubs for remaining pages

5. **Execute Phase 11 beads:**
   - Start with geoverity-100 (Homepage EN)
   - Continue with geoverity-200 (Higher Ed Pillar)
   - Follow priority order from template approval

**Updated Questions Still Requiring Answers:**
- Question 2: Full component library or inline components?
- Question 3: Content source preference (JSON, Content Collections, mix)?
- Question 4: Template creation priority order (rank 1-8)

**Please review the updated template specifications above and provide your approval/modifications.**
