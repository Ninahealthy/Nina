<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes -- APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->



<!-- ================================================================
     AGENTS.md -- Universal Agent Rules
     Read by: Claude Code, Gemini, Codex, and all other AI agents
     Single source of truth for all shared project rules.
     ================================================================ -->



---

# Shared Rules

## Environment

- Never run `npm run dev`, `npm run build`, `npm run start`
- Never open a browser preview
- When DevTools output is needed, stop and ask the user to provide it

## Code Style

- No emoji in UI or content -- use modern inline SVG only
- No em dashes ( -- ) in any generated text or content; use commas, semicolons, colons, or shorter sentences instead
- No third-party libraries -- use only official Next.js built-ins, React, and plain CSS

## Components

- Always create reusable components when the same UI pattern appears more than once
- Each component lives in its own folder under `components/` with a co-located `.module.css` file
- Export a single default function or `const` per component file

## Responsive Design

- Mobile-first always: base styles target small screens, scale up with `min-width` media queries
- Standard breakpoints: `640px` (small), `768px` (medium), `1024px` (large), `1280px` (xlarge)
- Test touch targets: all interactive elements must be at least 44x44 CSS pixels on mobile

## CSS / Styling

- No global selectors (`*`, `html body`, etc.) inside `.module.css` files
- Never use plain `border-radius` on cards or images
- Always use `--clip-path-squircle` (defined in `globals.css`) on cards and images
- Reference `CONTEXT.md` for the squircle size mapping (10, 20, 36, 48, 60)

## Next.js Imports

| Avoid                    | Use instead                            |
|--------------------------|----------------------------------------|
| `<img src="...">`       | `<Image>` from `next/image`            |
| `<script ...>`          | `<Script>` from `next/script`          |
| `<a href="/internal">`  | `<Link href="/internal">` from `next/link` |

---

# SEO Standards

These rules apply to every page and component that affects search visibility.

## Metadata Architecture

### Root Layout (`app/layout.js`)

The root layout must export a `metadata` object with at minimum:

```js
export const metadata = {
  metadataBase: new URL('https://ninahealthy.com'),
  title: {
    default: 'Nina Healthy',
    template: '%s | Nina Healthy',
  },
  description: '...compelling 150-160 character description...',
  openGraph: {
    title: 'Nina Healthy',
    description: '...',
    url: 'https://ninahealthy.com',
    siteName: 'Nina Healthy',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Descriptive alt text for the OG image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nina Healthy',
    description: '...',
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://ninahealthy.com',
  },
};
```

### Per-Page Metadata

Every route segment (`page.js`) must export its own `metadata` (or `generateMetadata` for dynamic routes) that includes:

| Field | Requirement |
|---|---|
| `title` | Unique, descriptive, 50-60 characters. Uses the `template` from layout. |
| `description` | Unique, compelling, 150-160 characters. Summarize user benefit, not just topic. |
| `openGraph.title` | Match or expand on `title`. |
| `openGraph.description` | Match or expand on `description`. |
| `openGraph.url` | The canonical URL for this specific page. |
| `openGraph.images` | At least one 1200x630 image with descriptive `alt` text. |
| `alternates.canonical` | The canonical URL. Required for every page. |

### Dynamic Routes (Journal Articles)

For `app/journal/[slug]/page.js` use `generateMetadata`:

```js
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  return {
    title: article.title,
    description: article.lead,   // the lead serves as meta description
    openGraph: {
      title: article.title,
      description: article.lead,
      url: `https://ninahealthy.com/journal/${slug}`,
      type: 'article',
      publishedTime: article.dateISO,  // ISO 8601 format
      authors: ['Nina'],
      section: article.category,
    },
    alternates: {
      canonical: `https://ninahealthy.com/journal/${slug}`,
    },
  };
}
```

## Structured Data (JSON-LD)

Embed JSON-LD structured data in every page that qualifies. Use a `<script type="application/ld+json">` tag inside the page component (Next.js handles this in the body).

### Required Schemas

| Page | Schema Type | Key Properties |
|---|---|---|
| Home `/` | `WebSite` + `Organization` | `name`, `url`, `logo`, `sameAs` (social links), `potentialAction` (SearchAction if search exists) |
| Journal index `/journal` | `CollectionPage` + `ItemList` | `itemListElement` with each article as a `ListItem` |
| Journal article `/journal/[slug]` | `Article` or `BlogPosting` | `headline`, `author`, `datePublished`, `dateModified`, `description`, `image`, `publisher`, `mainEntityOfPage` |
| About `/about` | `Person` | `name`, `description`, `url`, `sameAs` |
| Practice `/practice` | `WebPage` with `specialty` | `name`, `description`, `specialty: "Mindfulness"` |
| Connect `/connect` | `ContactPage` | `name`, `url` |

### JSON-LD Implementation Pattern

```jsx
function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

Create this as a reusable component at `components/JsonLd/JsonLd.js`.

### Article Schema Example

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Art of Doing Nothing",
  "description": "On the radical act of stillness in a world that rewards constant motion.",
  "author": {
    "@type": "Person",
    "name": "Nina",
    "url": "https://ninahealthy.com/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Nina Healthy",
    "url": "https://ninahealthy.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ninahealthy.com/icon.svg"
    }
  },
  "datePublished": "2026-05-01",
  "dateModified": "2026-05-01",
  "mainEntityOfPage": "https://ninahealthy.com/journal/the-art-of-doing-nothing",
  "image": "https://ninahealthy.com/images/journal-1.png"
}
```

## Heading Hierarchy

- **One `<h1>` per page.** No exceptions.
- Headings must follow a strict descending order: `h1` then `h2` then `h3`. Never skip levels (e.g., `h1` to `h3`).
- The `<h1>` must contain the page's primary keyword or topic naturally.
- Subheadings (`h2`, `h3`) should be descriptive and scannable; they act as an outline.

## Semantic HTML

| Purpose | Element |
|---|---|
| Page regions | `<header>`, `<main>`, `<footer>`, `<nav>`, `<aside>` |
| Content sections | `<section>` with `aria-label` or `aria-labelledby` |
| Blog posts / entries | `<article>` |
| Time-sensitive content | `<time datetime="YYYY-MM-DD">` |
| Quotes | `<blockquote>` with optional `<cite>` |
| Lists of links or items | `<ul>` / `<ol>` with `<li>` |
| Figures with captions | `<figure>` + `<figcaption>` |
| Abbreviations | `<abbr title="...">` |

Never use `<div>` or `<span>` when a semantic element exists for the purpose.

## URL Structure

- All URLs must be lowercase, hyphenated, and human-readable
- No trailing slashes (Next.js default)
- Journal slugs should mirror the article title: `/journal/the-art-of-doing-nothing`
- Keep URLs under 75 characters where possible
- No unnecessary nesting (e.g., `/blog/posts/2026/article` -- keep it flat as `/journal/article`)

## Internal Linking

- Every journal article should link to at least one other related article
- The home page should surface the latest or most relevant journal entries
- Use descriptive anchor text; never use "click here" or "read more" without surrounding context (screen readers read links out of context)
- Navigation must include all primary routes: Home, Journal, Practice, About, Connect

## Image SEO

- Every `<Image>` must have a descriptive `alt` attribute that conveys the image's content and function
- Decorative images should use `alt=""`  and `aria-hidden="true"`
- Use the `priority` prop on above-the-fold hero images (LCP candidates)
- Specify `sizes` for responsive images to prevent unnecessary downloads
- Use descriptive filenames: `morning-ritual-tea-cup.png` not `IMG_4382.png`
- Always provide `width` and `height` (or use `fill` with a sized container) to prevent CLS

## Sitemap and Robots

- Next.js generates `sitemap.xml` automatically when you export a `sitemap()` function from `app/sitemap.js`
- Create `app/sitemap.js` listing all static routes and dynamic journal slugs with `lastModified` dates
- Create `app/robots.js` (or `robots.txt`) allowing all crawlers, linking to the sitemap

### Sitemap Pattern

```js
export default function sitemap() {
  const staticRoutes = ['', '/journal', '/practice', '/about', '/connect', '/privacy', '/terms'];
  const journalSlugs = Object.keys(ARTICLES);

  return [
    ...staticRoutes.map((route) => ({
      url: `https://ninahealthy.com${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1.0 : 0.8,
    })),
    ...journalSlugs.map((slug) => ({
      url: `https://ninahealthy.com/journal/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];
}
```

---

# Design Standards

These rules define the visual language of Nina Healthy across all pages and components.

## Design Philosophy

Nina Healthy's design must communicate: calm, warmth, intentionality, and spaciousness. Every visual decision should ask: "Does this reduce cognitive noise or add to it?"

### Core Principles

1. **Breathing room over density.** Generous whitespace is a feature, not wasted space. Sections should feel spacious and unhurried.
2. **Warmth over neutrality.** The palette is earthy and organic. Avoid sterile, corporate, or high-contrast aesthetics.
3. **Subtlety over spectacle.** Animations and transitions should feel like a gentle exhale, not a firework. If a user notices the animation more than the content, it is too much.
4. **Consistency over novelty.** Reuse the established palette, spacing, and type scale. Do not introduce one-off colors, fonts, or patterns.

## Color System

All colors are defined as CSS custom properties in `globals.css`. Always reference the variable, never hardcode hex values.

| Variable | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `--color-cream` | `#FAF7F2` | `#1A1714` | Page background |
| `--color-linen` | `#F3EDE4` | `#2A2520` | Card / section backgrounds |
| `--color-warmwhite` | `#FEFCF8` | `#221E1A` | Subtle background variant |
| `--color-charcoal` | `#3D3832` | `#E8E0D6` | Primary text |
| `--color-stone` | `#6B6560` | `#B0A89E` | Secondary text |
| `--color-pebble` | `#9A9490` | `#8A837D` | Tertiary / caption text |
| `--color-terracotta` | `#C07A56` | `#D4926B` | Primary accent, CTAs |
| `--color-sage` | `#8FA98B` | `#A3BDA0` | Secondary accent |
| `--color-olive` | `#6B7D5E` | `#8A9E7D` | Hover states |
| `--color-clay` | `#C4A882` | `#B09974` | Borders, subtle UI |
| `--color-sand` | `#E8DFD0` | `#3D3530` | Light accent backgrounds |

### Color Usage Rules

- **Text contrast:** Primary text (`--color-charcoal` on `--color-cream`) must meet WCAG 2.2 AA minimum (4.5:1 for body text, 3:1 for large text). Verify contrast ratios when combining any foreground/background pair.
- **Accent restraint:** Terracotta is reserved for CTAs, active states, and key highlights. Do not use it for decorative backgrounds or large surfaces.
- **Dark mode parity:** Every component must render correctly in both light and dark modes. The dark palette in `globals.css` handles this via `prefers-color-scheme: dark`. Do not create separate dark-mode stylesheets.

## Typography

| Role | Font | Variable | Fallback Stack |
|---|---|---|---|
| Headings | Playfair Display | `var(--font-heading)` | Georgia, "Times New Roman", serif |
| Body | Lora | `var(--font-body)` | Georgia, "Times New Roman", serif |

Both fonts are loaded via `next/font/google` with `display: 'swap'` in `app/layout.js`.

### Type Scale (Mobile-First)

| Element | Mobile | Desktop (min-width: 768px) | Weight |
|---|---|---|---|
| `h1` | `2rem` | `2.75rem` - `3.5rem` | 700 |
| `h2` | `1.5rem` | `2rem` - `2.25rem` | 600-700 |
| `h3` | `1.25rem` | `1.5rem` | 600 |
| Body text | `1rem` | `1.05rem` - `1.125rem` | 400 |
| Captions / meta | `0.85rem` | `0.9rem` | 400 |
| Buttons | `0.95rem` | `1rem` | 600 |

### Typography Rules

- **Line height:** Body text should use `1.7` - `1.8` for comfortable reading. Headings use `1.2` - `1.3`.
- **Measure (line length):** Body text should never exceed `65ch` (`max-width: 65ch`). This is critical for readability.
- **Letter spacing:** Headings may use slight negative tracking (`-0.01em` to `-0.02em`). Body text stays at default.
- **Font smoothing:** Already enabled globally via `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale`.

## Spacing System

Use a consistent spacing scale based on `rem` units:

| Token | Value | Usage |
|---|---|---|
| `0.25rem` | 4px | Micro gaps (icon padding) |
| `0.5rem` | 8px | Tight spacing (inline elements) |
| `1rem` | 16px | Standard element spacing |
| `1.5rem` | 24px | Section padding (mobile) |
| `2rem` | 32px | Between content blocks |
| `3rem` | 48px | Section gaps |
| `4rem` | 64px | Major section separation |
| `6rem` - `8rem` | 96-128px | Hero / page-level vertical padding |

## Animation and Motion

### Guiding Principle

Motion should feel like breathing: slow, smooth, and natural. It reinforces the brand's sense of calm.

### Transition Defaults

```css
/* Standard transition for interactive elements */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Subtle hover lift for cards */
transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Fade-in for content entering view */
transition: opacity 0.6s ease, transform 0.6s ease;
```

### Motion Rules

- **Reduced motion:** Always wrap animations in a `prefers-reduced-motion` check. The global stylesheet already includes a blanket override; respect it in component-level animations too.
- **Duration range:** Keep transitions between `0.2s` (micro-interactions like button hover) and `0.8s` (page-level reveals). Nothing should exceed `1s`.
- **Easing:** Use `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out variant) for most UI transitions. Avoid linear easing.
- **No bounce or overshoot:** The brand is calm and grounded. No spring physics or elastic easings.
- **Hover effects:** Cards may lift slightly (`translateY(-4px)`) and gain a subtle shadow. Links gain color change. Buttons shift background. Keep it minimal.
- **Scroll animations:** If used, they must be CSS-only (e.g., `@keyframes` triggered by scroll-driven animation or intersection observer). Keep them understated: a gentle fade + slight upward translate (`translateY(16px)` to `translateY(0)`).

## Squircle Clip-Paths

Cards and images use `clip-path` instead of `border-radius`. The squircle variables are defined in `globals.css`.

| Variable | Radius Equivalent | Use Case |
|---|---|---|
| `--clip-path-squircle-10` | ~10px | Small elements, badges, tags |
| `--clip-path-squircle-20` | ~20px | Buttons, inputs, small interactive elements |
| `--clip-path-squircle-36` | ~36px | Images |
| `--clip-path-squircle-48` | ~48px | Cards |
| `--clip-path-squircle-60` | ~60px | Large sections, hero images |

### Squircle Rules

- Never use `border-radius` on cards or images. Always use the clip-path variable.
- `border-radius` is permitted only for perfectly circular elements (e.g., avatar circles) or tiny UI details (e.g., 2px rounding on a focus ring).
- When applying a squircle, the element must have explicit dimensions or a sized container to ensure the polygon renders correctly.

## Layout Patterns

### Page Structure

Every page follows this vertical rhythm:

```
<div className={styles.page}>
  <section className={styles.hero}>     <!-- h1 + lead text + optional CTA -->
  <section>                              <!-- Main content sections -->
  <section>                              <!-- Secondary content -->
  <section>                              <!-- Newsletter or closing CTA -->
</div>
```

### Grid System

- Card grids: Use CSS Grid with `repeat(auto-fill, minmax(300px, 1fr))` or explicit columns
- Mobile: single column, full width
- Tablet (768px+): 2 columns
- Desktop (1024px+): 3 columns
- Max content width: `1200px`, centered with `margin: 0 auto`

### Section Padding

- Mobile: `padding: 3rem 1.25rem`
- Tablet: `padding: 4rem 2rem`
- Desktop: `padding: 5rem 2rem` (content constrained by max-width, not padding)

---

# Content Creation Standards

These rules govern all written content: page copy, journal articles, meta descriptions, alt text, button labels, and microcopy.

## Brand Voice

Nina Healthy speaks in first person. The voice is:

| Trait | Means | Does Not Mean |
|---|---|---|
| **Warm** | Conversational, intimate, like a letter to a friend | Saccharine, performative, or artificially cheerful |
| **Reflective** | Thoughtful, introspective, drawing from lived experience | Academic, preachy, or instructional |
| **Gentle** | Patient, kind, non-judgmental, offering invitations not commands | Passive, vague, or avoidant |
| **Honest** | Vulnerable, direct, naming hard things plainly | Blunt, oversharing, or self-deprecating for effect |
| **Grounded** | Practical, embodied, connected to the physical world | Abstract, airy, or disconnected from reality |

### Voice Checklist

Before publishing any content, verify:

- [ ] Is this written as Nina speaking, not a generic wellness brand?
- [ ] Does it invite rather than instruct? ("Try this" not "You must")
- [ ] Does it acknowledge difficulty rather than promising easy fixes?
- [ ] Is the language concrete and sensory, not abstract?
- [ ] Would someone feel calmer after reading this, not more pressured?

## Content Boundaries

Nina is **not** a medical professional. All content must respect this:

- Never use clinical or diagnostic language ("treatment", "therapy", "cure", "heal")
- Never promise health outcomes ("this will reduce your anxiety")
- Use framing like "what I have found", "what works for me", "you might try"
- Include content notes for pieces that discuss anxiety, overwhelm, grief, or emotional distress (see `CONTENT_NOTES` in `app/journal/[slug]/page.js`)

## Writing Style

### Sentence Structure

- Prefer short to medium sentences (12-20 words average)
- Vary rhythm: follow a longer sentence with a short, punchy one
- Use sentence fragments deliberately and sparingly for emphasis
- Avoid compound sentences with three or more clauses

### Paragraph Structure

- Keep paragraphs to 2-4 sentences
- Each paragraph should carry one idea
- Use whitespace generously; dense walls of text contradict the brand

### Word Choice

- Prefer the simpler word: "start" over "commence", "use" over "utilize"
- Use sensory language: textures, sounds, temperatures, physical sensations
- Avoid jargon, buzzwords, and wellness cliches ("self-care journey", "live your best life", "manifest your dreams")
- No em dashes. Use commas, semicolons, colons, or break into two sentences.

### Formatting in Articles

| Block Type | HTML Element | Style Notes |
|---|---|---|
| Paragraph | `<p>` | Standard body text |
| Subheading | `<h2>` | Breaks the article into scannable sections |
| Pull quote | `<blockquote>` | Italicized, centered, with vertical accent line |
| Divider | `<hr>` | Visual separator before the closing section |
| Closing invitation | Final `<p>` | Ends with a gentle, actionable invitation to the reader |

### Article Structure Pattern

Every journal article should follow this arc:

1. **Opening hook** (1-2 paragraphs): A personal observation or admission that draws the reader in.
2. **Exploration** (2-3 sections with subheadings): Deeper reflection, personal stories, observations.
3. **Pull quote**: A single distilled thought that captures the essence.
4. **Practical dimension** (1 section): How this shows up in daily life.
5. **Closing invitation** (after a divider): A gentle, specific invitation for the reader to try something. Not a command. An offer.

## SEO Content Guidelines

### Title Tags

- Include the primary keyword naturally in the first 40 characters
- Format for articles: `{Article Title} | Nina Healthy`
- Format for pages: `{Page Purpose} | Nina Healthy`
- Keep total length between 50-60 characters
- Make every title unique across the site

### Meta Descriptions

- Write as a compelling one-sentence summary that answers "why should I read this?"
- Include the primary keyword naturally
- 150-160 characters
- End with a period
- Do not duplicate the title tag content
- Use active voice

### Heading Content

- `h1`: The page's single primary topic or article title
- `h2`: Major section breaks; should be meaningful standalone (imagine someone scanning only headings)
- `h3`: Subsections within an `h2` block
- Include relevant keywords naturally; never keyword-stuff

### Alt Text

| Image Type | Alt Text Pattern | Example |
|---|---|---|
| Hero / editorial | Describe the scene, mood, and key elements | "Serene meadow with soft morning light filtering through wildflowers" |
| Journal thumbnail | Describe what the image depicts | "Woman sitting quietly with tea by a rain-streaked window" |
| Decorative | Empty alt, aria-hidden | `alt="" aria-hidden="true"` |
| Functional (icons) | Describe the action | "Search", "Close menu", "Open navigation" |

### Internal Content Links

- Link to related articles within journal content using descriptive text
- Example: "I wrote about this in [The Art of Doing Nothing](/journal/the-art-of-doing-nothing)"
- Aim for 2-3 internal links per article
- Link anchor text should describe the destination, not "click here"

---

# Accessibility Standards

Accessibility is not optional. Every component must meet WCAG 2.2 Level AA.

## Keyboard Navigation

- All interactive elements must be reachable and operable via keyboard
- Focus indicators must be visible and high-contrast (do not remove default outlines without providing a custom focus style)
- Modals and menus must trap focus and restore it on close (see `Header.js` for the reference pattern)
- `Escape` key must close any overlay, modal, or expanded menu

## ARIA Patterns

| Pattern | Implementation |
|---|---|
| Navigation landmarks | `<nav aria-label="Main navigation">`, `<nav aria-label="Mobile navigation">` |
| Content sections | `<section aria-label="...">` or `aria-labelledby` referencing a heading |
| Toggle buttons | `aria-expanded`, `aria-pressed` |
| Modals | `role="dialog"`, `aria-modal="true"` |
| Skip link | `<a href="#main-content" className="skipLink">Skip to content</a>` (already in layout) |
| Visually hidden text | Use the `.visuallyHidden` class from `globals.css` |

## Color Contrast

- Body text on backgrounds: minimum 4.5:1 ratio
- Large text (18px+ bold or 24px+): minimum 3:1 ratio
- Interactive element borders and focus indicators: minimum 3:1 against adjacent colors
- Do not rely on color alone to convey meaning; pair with text, icons, or patterns

## Reduced Motion

The global stylesheet already includes:

```css
@media (prefers-reduced-motion: reduce) {
  a, button, div, section, article {
    transition: none !important;
    animation: none !important;
  }
}
```

Any component-level animation must also respect this media query.

---

# Performance Guidelines

## Core Web Vitals Targets

| Metric | Target | Primary Lever |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | `priority` on hero images, font `display: swap` |
| INP (Interaction to Next Paint) | < 200ms | Minimal JS, no heavy event handlers |
| CLS (Cumulative Layout Shift) | < 0.1 | Explicit image dimensions, font fallback matching |

## Image Optimization

- Always use `next/image` for automatic format negotiation (WebP/AVIF), resizing, and lazy loading
- Set `priority` only on the single largest above-the-fold image per page (hero image)
- Provide `sizes` prop that matches your responsive layout breakpoints
- Use `fill` layout when the image should match its container, and set `sizes` accordingly
- Keep original source images high-resolution; Next.js handles downscaling

## Font Loading

- Fonts are loaded via `next/font/google` with `display: 'swap'`
- The `variable` option is used so fonts are applied via CSS custom properties
- This prevents FOIT (Flash of Invisible Text) and minimizes CLS

## JavaScript Minimization

- Default to Server Components. Only add `"use client"` when the component genuinely needs client-side interactivity (state, effects, event handlers).
- The journal index page (`app/journal/page.js`) is `"use client"` because it has interactive category filtering. The article pages are server components.
- Do not import large client libraries. Solve problems with CSS and built-in React.

---

> See `CONTEXT.md` for project-specific architecture, component inventory, and active tasks.
