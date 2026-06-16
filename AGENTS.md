<!-- Document: AGENTS.md | Version: 1.3 | Last updated: 2026-06-15
     Owner: Project Lead | Review cadence: Quarterly -->

> **Precedence:** This file overrides `GEMINI.md` (global defaults) for all Nina Healthy project work.
> It is read by Claude Code, Gemini, Codex, and all other AI agents.
> It is the single source of truth for all project-specific rules.

---

# Shared Rules

## Environment

- Never run `npm run dev`, `npm run build`, `npm run start`
- Never open a browser preview
- When DevTools output is needed, stop and ask the user to provide it

## Code Style

- No emoji in UI or content -- use modern inline SVG only
- No em dashes ( -- ) in any generated text or content; use commas, semicolons, colons, or shorter sentences instead
- No third-party libraries -- use only packages from Vercel (`@vercel/*`), Next.js built-ins, React, framer-motion, and plain CSS. Nodemailer is the sole non-Vercel exception.
- Use framer-motion by default for animations, transitions, and interactive motion.
- ✦ **Code comments:** Comment non-obvious decisions and "why" explanations. Add brief JSDoc-style comments on exported functions and components. Do not add trivial comments that restate the code. Use `// TODO:` for incomplete work and `// HACK:` for intentional workarounds. (This overrides the global requirement in GEMINI.md for linked issues on TODOs; this project does not use an external issue tracker.)

## Path Aliases

The project uses `@/` as a root alias (configured in `jsconfig.json`). Always use it for imports:

```js
// Correct
import { ARTICLES } from "@/lib/articles";
import { SITE } from "@/lib/siteConfig";
import Card from "@/components/Card/Card";

// Incorrect -- do not use relative paths from pages
import { ARTICLES } from "../../../lib/articles";
```

> **Note:** Some older files (`app/page.js`, `app/layout.js`) still use relative imports (`../components/...`). New code must always use `@/`. Do not refactor the existing relative imports unless explicitly asked.

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
- Reference the Squircle Clip-Paths section below for the size mapping (10, 20, 36, 48, 60)

## Next.js Imports

| Avoid                    | Use instead                            |
|--------------------------|----------------------------------------|
| `<img src="...">`       | `<Image>` from `next/image`            |
| `<script ...>`          | `<Script>` from `next/script`          |
| `<a href="/internal">`  | `<Link href="/internal">` from `next/link` |

## Server vs Client Components

- Default to Server Components. Only add `"use client"` when the component genuinely needs client-side interactivity (state, effects, event handlers).
- The journal index page (`app/journal/page.js`) is a Server Component that passes serialized article data to the `JournalFilter` client component. Article pages are also server components.
- Do not import large client libraries. Solve problems with CSS and built-in React.
- Never import `ARTICLES` from `@/lib/articles` in a Client Component; it is server-only data.

## Static Generation

Dynamic routes that draw from a known data set must export `generateStaticParams` so all pages are pre-rendered at build time:

```js
export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}
```

---

# ✦ Agent Behavior

<!-- ✦ NEW SECTION: Defines how the agent should reason, respond, and handle errors
     in the context of this project. Complements the global defaults in GEMINI.md. -->

## ✦ Response Standards

- For article-related tasks, always reference the Content Quality Standards section before generating content.
- When creating or modifying components, confirm the change aligns with the Component Library table before proceeding.
- When modifying SEO-related code, cross-reference the Metadata Architecture and Structured Data sections.
- Before creating a new article, run through the pre-creation checks: thematic differentiation, category balance, emotional register diversity, and hook type diversity.

## ✦ Error and Edge-Case Protocols

| Scenario | Required Action |
|----------|----------------|
| Article slug collision (new slug matches existing) | Stop and ask the user to choose an alternative slug. |
| `dateISO` collision (new date matches existing article) | Stop and flag the collision; suggest the nearest available date. |
| Referenced component does not exist in the Component Library | Flag the missing component; do not create a stub without confirmation. |
| Image file referenced but not found in `public/images/` | Flag the missing image; proceed with the code but note the dependency. |
| Ambiguous instruction (could be interpreted multiple ways) | Ask for clarification; present the interpretations you see. |
| Conflicting rules within this file | Follow the more specific rule; flag the conflict for the user to resolve. |
| Content falls below quality thresholds (word count, subheadings, etc.) | Note the specific metric(s) that are off and suggest adjustments before finalizing. |
| Category at or above 30% cap | Flag the cap; suggest an underrepresented category or confirm override with user. |

## ✦ Context Management

<!-- This file is approximately 93KB. Agents with limited context windows should
     prioritize sections based on the current task. -->

**Priority reading order** (if context is constrained):

1. **Shared Rules** -- environment, code style, component and CSS rules (always read)
2. **Agent Behavior** (this section) -- how to reason, confirm, and handle errors (always read)
3. **Content Quality Standards** (within Project Architecture) AND **Content Creation Standards** -- read both when creating or editing articles
4. **Generative Engine Optimization (GEO) Standards** -- read when creating articles (for citability, citations field), modifying JSON-LD, or working on AI crawler policy
5. **Design Standards** -- read when creating or modifying UI components
5. **SEO Standards** -- read when working on metadata, structured data, or page-level changes
6. **Pinterest SEO and Algorithm Standards** -- read when creating articles, generating pin content, or optimizing for Pinterest discovery
7. **Accessibility Standards** -- always reference when touching interactive components or forms
8. **Performance Guidelines** -- read when optimizing images, fonts, or Core Web Vitals

**Session continuity:**

- Each conversation is ephemeral. Do not assume prior context from previous sessions.
- When resuming work on a multi-step task, re-read the relevant section of this file before proceeding.
- If the user references a previous conversation, ask for the specific details rather than guessing.

---

# Project Architecture

## `lib/` Directory

All shared data, configuration, and utilities live in `lib/`. Never duplicate these values; import from the canonical source.

| File | Purpose | Key Exports |
|---|---|---|
| `lib/siteConfig.js` | Centralized site metadata (name, URL, author, social, OG image) | `SITE` |
| `lib/articles/index.js` | Barrel export of all journal articles keyed by slug | `ARTICLES` |
| `lib/articles/<slug>.js` | Individual article data files | `default` (article object) |
| `lib/cardImages.js` | Canonical slug-to-thumbnail mapping for all articles | `CARD_IMAGES` |
| `lib/cardExcerpts.js` | Custom card-level excerpts for journal article cards | `CARD_EXCERPTS` |
| `lib/entryOrder.js` | Canonical display order for journal + home page featured selection | `ENTRY_ORDER`, `HOME_FEATURED` |
| `lib/categories.js` | Derives unique category list from article data | `CATEGORIES` |
| `lib/readingTime.js` | Calculates reading time from content blocks (230 wpm) | `getReadingTime(content)` |
| `lib/invitations.js` | Daily invitation pool, rotated by day of year | `getTodaysInvitation()`, `getSeasonLabel()` |
| `lib/socialLinks.js` | Social link definitions with inline SVG icons | `SOCIAL_LINKS`, `getSameAsUrls()` |
| `lib/escapeHtml.js` | HTML entity escaping utility | `escapeHtml(str)` |

### Adding a New Article

1. Create `lib/articles/<slug>.js` following the article data schema (see below).
2. Import and register it in `lib/articles/index.js`.
3. Add the slug to `ENTRY_ORDER` in `lib/entryOrder.js`.
4. Add a slug-to-image mapping in `lib/cardImages.js`.
5. Add a card excerpt to `lib/cardExcerpts.js`.
6. Place the thumbnail image in `public/images/`.

<!-- ✦ Validation steps added to catch common edge cases before starting. -->

**✦ Before starting, verify:**

- The chosen slug does not already exist in `lib/articles/index.js` (a slug collision will silently overwrite the existing article).
- The chosen `dateISO` is unique across all existing articles (check files in `lib/articles/`).
- The target category is not already at the 30% cap (see Content Ecosystem Health below).
- The opening hook type is not overrepresented in the library (see Opening Hook Diversity below).

Categories are auto-derived from article data; no manual category update is needed. If the article should appear on the home page, also add it to `HOME_FEATURED` in `lib/entryOrder.js`.

### Article Data Schema

Every article file must export a default object with these fields:

```js
const article = {
  title: "The Kindness of Routine",           // string, the article headline
  date: "May 6, 2026",                        // string, human-readable display date (full date: Month Day, Year)
  dateISO: "2026-05-06",                       // string, ISO 8601 for structured data (MUST be unique per article)
  dateModified: "2026-05-06",                  // string, ISO 8601, updated when article content changes
  category: "Quiet Architecture",                // string, one of: Still Point, The Body Knows, Quiet Architecture, Inner Weather, Chosen Life
  lead: "Routine is not the enemy of freedom. It is the quiet structure that holds everything else in place, the rhythm I return to when the rest begins to shift.",
                                                // string, 1-2 sentences; doubles as meta description (150-160 chars ideal)
  contentNote: null,                           // string|null, trauma-informed content warning
  tags: ["routine", "morning practice", "daily rhythm"],
                                                // string[], 2-5 topic-specific tags for semantic SEO (never generic)
  relatedSlugs: ["morning-rituals-that-anchor-me", "the-quiet-power-of-a-slow-morning"],
                                                // string[], optional; 2-3 curated slugs for the RelatedArticles component
  hookType: "paradox",                          // string, optional; one of: "confession" | "scene" | "paradox" | "question" | "observation"
  emotionalRegister: "acceptance",              // string, optional; one of: "acceptance" | "difficulty" | "joy" | "curiosity" | "grief"
  citations: [                                    // array, optional; named researchers/works referenced in the article
    { name: "Harriet Lerner", work: "The Dance of Anger", type: "Book" },
  ],
  content: [
    { type: "paragraph", text: "..." },        // body paragraph
    { type: "subheading", text: "..." },       // h2 section break
    { type: "quote", text: "..." },            // pull quote / blockquote
    { type: "list", items: ["...", "..."] },   // bulleted list (optional)
    { type: "divider" },                       // decorative dots before closing section
  ],
};

export default article;
```

#### Content block rules

- Every article must have at least one `subheading`, one `quote`, and one `divider`.
- The `divider` always appears before the final closing invitation paragraph(s).
- `contentNote` is required (set to `null` if not applicable) for pieces discussing anxiety, overwhelm, grief, burnout, perfectionism, depression, or emotional distress.

#### Content Quality Standards

These standards ensure a consistent quality baseline across the library. Every new article and every revised article must meet them.

##### Date Uniqueness

- Every article must have a **unique `dateISO`** value. No two articles may share the same ISO date.
- The `date` display field must use the full format: `"Month Day, Year"` (e.g., `"May 6, 2026"`), not month-year shorthand.
- When adding a new article, verify the chosen date does not collide with any existing article.
- `dateModified` must be present and set to `dateISO` on initial creation, then updated whenever content changes.

##### Lead / Meta Description

- The `lead` field doubles as the article's meta description. It must be **150-160 characters** to maximize SERP click-through.
- It must answer "why should I read this?" with a benefit or provocative question, not just describe the topic.
- It must end with a period.
- **Dual-purpose tension:** The lead serves as both meta description (SERP-optimized, keyword-carrying) and essay opening (literary, first-person, reflective). When voice and SERP optimization conflict, **prioritize voice**. Use the `tags` array and `cardExcerpts.js` entry to carry keyword load that the lead cannot.

| Style | Example Lead | Chars |
|---|---|---|
| **Balanced** (default) | "Routine is not the enemy of freedom. It is the quiet structure that holds everything else in place, the rhythm I return to when the rest begins to shift." | 155 |
| **Voice-forward** | "There are some things you cannot organize your way out of. Grief is one of them, and so is the body remembering what the mind has tried to put away." | 152 |
| **SERP-forward** | "A simple morning breathing practice for calming the nervous system, rooted in years of learning how the body holds stress and how stillness can release it." | 157 |

##### Tags

- Every article must include a `tags` array of 2-5 topic-specific keywords.
- Tags must be unique to the article's subject matter; never use generic site-level tags like `"mindfulness"` or `"intentional living"` unless the article is directly about that concept.
- Tags are metadata-only and do not generate standalone pages. If tag pages are introduced in the future, tags with fewer than 3 associated articles should be `noindex`'d to prevent thin content.
- Tags are used for OpenGraph metadata and internal semantic grouping.

##### Depth and Structure

- Every article must have a minimum of **3 subheadings** to ensure adequate depth and scannability.
- Every article should target **700-1000 words** of body content (excluding metadata). Shorter articles risk reading as blog advice rather than essay-grade reflection.
- At least one section should include a named concept, researcher, cultural reference, or specific anecdote that grounds the piece in irreplaceable personal experience.
- Use the `list` content block type when describing sequences, steps, or enumerated practices rather than embedding them in paragraph prose.

##### Categories

Allowed categories (exactly five):

| Category | Focus |
|---|---|
| Still Point | Present-moment awareness, attention, the discipline of noticing, slowness as intelligence |
| The Body Knows | Physical sensation as intelligence, the nervous system, embodied experience, what the body holds and communicates |
| Quiet Architecture | The structures that hold a life together: routines, rituals, daily rhythms, seasonal living, small ceremonies |
| Inner Weather | Emotional life: grief, anger, joy, exhaustion, loneliness, the unnamed feelings, the internal climate that shifts without permission |
| Chosen Life | Boundaries, decisions, values, the conscious design of how you spend your time, energy, attention, and resources |

##### Content Notes

Articles must include a `contentNote` (not `null`) when the content discusses any of the following:

- Anxiety, panic, or overwhelm
- Grief, loss, or mourning (named or unnamed)
- Burnout or emotional exhaustion
- Depression or persistent low mood
- Perfectionism as a fear/shame response
- Body awareness that may be activating for trauma survivors
- Disordered eating or emotional hunger
- Insomnia or sleep distress
- Self-harm references, even oblique
- Substance use or addiction
- Domestic or relational abuse
- Medical trauma (hospitalization, diagnosis, chronic illness)
- Childhood adversity or adverse childhood experiences

This list is not exhaustive. If the article discusses any experience that a reasonable reader might find emotionally activating or re-traumatizing, include a content note.

The note should be 1-2 sentences, written in the brand voice (gentle, non-clinical), and include an exit ramp such as "Read at your own pace" or "Take breaks as needed."

##### Thematic Differentiation

Before creating a new article, review existing articles in the same category for thematic overlap. If a similar topic already exists:

- The new article must clearly differentiate itself in the `title`, `lead`, and opening paragraphs.
- Consider whether the existing article should be revised and deepened instead of creating a new one.
- Use `relatedSlugs` (if available) or the `RelatedArticles` component to explicitly cross-link similar articles so search engines understand they serve different intents.

##### Title SEO and Keyword Strategy

- Titles should be literary and on-brand, but the `lead` field must carry discoverable search keywords that the title omits.
- If the title is poetic (e.g., "The Long Exhale"), the lead must include the functional keyword (e.g., "breathing technique", "nervous system").
- Avoid titles that have zero search-discoverable keywords unless the lead compensates fully.
- The `cardExcerpts.js` entry can also carry keyword-rich language to bridge the gap between poetic titles and search intent.

| Title / Lead Pair | Assessment |
|---|---|
| **Title:** "The Long Exhale" **Lead:** "A breathing technique for calming your nervous system, drawn from years of learning how the body holds tension and how a single slow exhale can begin to release it." | Good: poetic title; lead carries functional keywords (breathing technique, nervous system, tension) |
| **Title:** "The Long Exhale" **Lead:** "Sometimes the longest breath is the one you did not know you were holding." | Weak: beautiful lead, but no discoverable keywords; search engines cannot connect this to user intent |
| **Title:** "Morning Breathing Technique for Calm" **Lead:** "What I have learned about the nervous system by breathing slowly before the rest of the day begins." | Acceptable: title carries keywords; lead adds personal experience |

##### Content Depth Baseline (Tier 1 Standard)

All articles must meet this quality baseline. Articles that fall below it should be revised before new articles are created.

| Metric | Minimum |
|---|---|
| Word count (body text) | 700 words |
| Subheadings | 3 |
| Named research, concept, or cultural reference | 1 |
| Personal anecdote with specific detail | 1 |
| Closing invitation (after divider) | 1, with opt-out language |

Signs that an article is below baseline:

- Only 2 subheadings (indicates insufficient depth)
- No named researchers, traditions, or specific anecdotes (reads as generic advice)
- Under 500 words of body content (reads as a blog post, not an essay)
- Closing paragraph that commands rather than invites

##### Related Articles Curation

- Every article should include a `relatedSlugs` array of 2-3 editorially curated article slugs.
- The `getRelatedArticles` function in `app/journal/[slug]/page.js` prioritizes these curated slugs, then falls back to category matching.
- When choosing related slugs, prefer articles that complement (different angle on adjacent topic) over articles that duplicate (same angle on same topic).
- Cross-category pairings are encouraged when thematically natural (e.g., a "Quiet Architecture" article about breathwork paired with a "The Body Knows" article about body sensation).

##### Technical Consistency

- **Line endings:** All article files must use LF (`\n`) line endings, not CRLF. Configure `.gitattributes` to enforce this.
- **Reading time:** The `readingTime.js` utility counts text from paragraph, quote, subheading, and list blocks at 230 wpm. When adding new block types, ensure they are included in the word count.
  <!-- ✦ Rationale: 230 wpm is the average silent reading speed for non-fiction English
       prose (Brysbaert, 2019). This produces reading time estimates that match user
       expectations better than the commonly used but inflated 200 wpm or 250 wpm figures. -->
- **No Unicode special characters:** Do not use em dashes (`\u2014`), en dashes (`\u2013`), or other typographic Unicode in article text. Use standard ASCII punctuation (commas, semicolons, colons).
  <!-- ✦ Rationale: Unicode typographic characters cause inconsistent rendering across
       email clients, RSS readers, and some CMS exports. ASCII punctuation is universally
       safe and avoids encoding issues in downstream consumers of the RSS feed. -->

##### Opening Hook Diversity

The library must maintain diversity in opening rhetorical strategies. No more than 40% of articles should share the same hook pattern. When creating a new article, check the existing library and choose a hook type that is underrepresented.

Approved hook types (aim for a balanced mix across the library):

| Hook Type | Description | Example |
|---|---|---|
| Confession | First-person admission of past behavior or belief | "I used to treat sleep like a project." |
| Scene | A concrete moment with setting, time, and sensory detail | "It was eleven at night, and I was standing in front of the open refrigerator." |
| Paradox | Naming a contradiction the reader already feels but has not articulated | "There are two kinds of walking." |
| Question | A genuine question that reframes something the reader takes for granted | "What if sleep is the one thing that cannot be optimized?" |
| Observation | A third-person notice about the world that implicates the reader | "We live in artificial constancy." |

Do not default to the confession pattern. If the library already has many "I used to..." openings, choose a scene, paradox, question, or observation instead.

**Tracking:** Each article's `hookType` field (see Article Data Schema) records its opening strategy. To check the current distribution before creating a new article, scan the `hookType` values across all files in `lib/articles/`. If `hookType` is missing from older articles, classify them by reading the first paragraph and add the field retroactively.

##### Sensory Grounding

Every article must contain at least three instances of named physical sensation (temperature, texture, weight, sound, smell, taste, or specific visual detail). Sensory language must be specific and irreplaceable, not generic.

| Weak (generic) | Strong (specific) |
|---|---|
| "a warm drink" | "a cup of chamomile, still too hot to hold" |
| "outside sounds" | "the sound of rain tapping on a single-pane window" |
| "a comfortable space" | "the weight of the blanket when I first sit up" |
| "I felt calm" | "something in my chest loosened that I did not know was tight" |

A "named physical sensation" must reference a specific sense modality (temperature, texture, weight, sound, smell, taste, or sight) AND a concrete quality. Use this test: could a reader physically replicate or recognize the sensation?

| Example | Qualifies? | Why |
|---|---|---|
| "the tightness in my jaw" | Yes | Names body region + tactile quality |
| "a heavy feeling" | No | No sense modality; could be emotional |
| "the weight of the blanket" | Yes | Tactile + concrete object |
| "the weight of grief" | No | Metaphorical, not physical |
| "the sound of silence" | No | Names modality but describes an absence |
| "the hum of the refrigerator" | Yes | Auditory + specific source |

Sensory detail is what distinguishes essay-grade writing from advice-grade writing. Articles that rely primarily on conceptual language without physical grounding should be revised before new articles are created.

##### Emotional Range

The library must represent a full spectrum of human emotional experience. Track the dominant emotional register of each article and maintain diversity across the collection.

Required representation targets (across the full library):

| Register | Target |
|---|---|
| Acceptance / peace | Maximum 50% (to avoid a false-arrival tone) |
| Active difficulty (unresolved) | At least 15% |
| Joy, humor, or lightness | At least 10% |
| Curiosity and wonder | At least 10% |
| Grief, sorrow, or loss | At least 5% |

When an article reaches a resolution, include at least one sentence acknowledging that the resolution is not permanent (e.g., "This is not a place I have arrived. It is a direction I keep choosing."). Avoid the implication that the struggle is fully behind the author.

Do not let the library become uniformly solemn. Include moments of genuine humor, wry self-awareness, or playful observation. The absence of lightness makes the brand voice feel performatively serious.

**Tracking:** Each article's `emotionalRegister` field (see Article Data Schema) records its dominant emotional tone. To check the current distribution before creating a new article, scan the `emotionalRegister` values across all files in `lib/articles/`. If `emotionalRegister` is missing from older articles, classify them by overall tone and add the field retroactively.

##### Pacing and Rhythm

Articles must vary their paragraph length deliberately. A uniform wall of medium-length paragraphs creates monotone pacing.

Rules:

- Every article must contain at least one paragraph of 25 words or fewer, used for rhetorical emphasis (e.g., "But that is not what gentleness is. Not the kind I mean.").
- No more than 3 consecutive paragraphs should be in the same length range. Length ranges are defined as:
  - **Short:** 35 words or fewer
  - **Medium:** 36-80 words
  - **Long:** 81 words or more
- When an article describes a sequence, practice, or set of options, use the `list` content block instead of embedding items in paragraph prose.
- After a dense, long section, follow with a shorter paragraph or a pull quote to create visual and cognitive breathing room.
- For articles over 800 words, consider using two pull quotes instead of one. Place the second near the closing section for rhythm.

##### Authority Scaffolding

Every article must include at least one of the following authority anchors:

1. A **named researcher or author**, with their field identified (e.g., "Lisa Feldman Barrett, a neuroscientist who has studied this extensively")
2. A **named cultural tradition or practice**, with its lineage acknowledged (e.g., "pranayama, from the Vedic tradition")
3. A **named scientific concept** with a plain-language explanation (e.g., "interoception, the ability to sense internal body states")

Quality rules:

- When referencing a specific study finding (a percentage, a measurable outcome, a named effect), name the researchers or institution. Vague references like "studies show" or "research suggests" should be reserved only for well-established, consensus-level findings that do not depend on a single study.
- When a quote is widely misattributed, note the uncertainty ("often attributed to...") rather than stating it as fact.
- When the author lacks evidence for a personal claim, name the gap honestly. But also check whether supporting evidence exists; many experiential claims have published literature that strengthens the article without overstating certainty.
- Never fabricate a citation, invent a researcher, or attribute a finding to a field that has not produced it. If no credible source exists, rely on personal experience framed as such.

| Authority Reference | Assessment |
|---|---|
| "Studies show that breathing slowly is good for you." | Weak: unnamed studies; no researcher, institution, or field; unverifiable |
| "Research suggests that slow exhalation activates the parasympathetic nervous system." | Acceptable: well-established consensus finding; hedged appropriately |
| "Lisa Feldman Barrett, a neuroscientist at Northeastern University, has argued that emotions are constructed, not triggered." | Strong: named researcher, institution, field, and specific claim |
| "In the Buddhist tradition of anapanasati, breath awareness is not a technique but a form of attention." | Strong: named tradition, specific practice, acknowledged lineage |

##### Closing Invitation Quality

The closing invitation (the paragraph(s) after the divider) must meet all of these criteria:

1. **Specific**: Name a concrete action the reader can take ("try placing your feet flat on the floor and taking one full breath"), not a vague one ("be more mindful today").
2. **Brief**: The closing should be no more than 3-4 sentences. Simplicity is the goal; do not re-argue the article's thesis in the closing.
3. **Conditional**: Use opt-in framing: "if you are willing", "if it feels right", "when you are ready". Never use bare imperatives ("Look at your calendar", "Take five minutes to clean your workspace") without conditional language.
4. **Low-barrier**: The suggested action should require no equipment, no cost, and less than 5 minutes. It should be doable right now, wherever the reader is.
5. **Exit ramp**: End with permission to not do it: "If it does not help, let it go." or "That is enough for today." The reader must never feel commanded.

**Specificity test:** A closing invitation is specific enough if it answers at least two of: *what* (the physical action), *where* (body position or setting), and *how long* (a duration or breath count). Example pass: "Try placing your feet flat on the floor and taking one full breath" (answers *what* and *where*). Example fail: "Try pausing for a moment today" (answers only a vague *what*).

| Closing Invitation | Assessment |
|---|---|
| "If you are willing, try placing your feet flat on the floor and taking one slow breath. If it does not help, let it go." | Pass: specific (what + where), conditional, low-barrier, exit ramp |
| "Be more mindful today." | Fail: vague, imperative, no exit ramp, no specificity |
| "Take five minutes to journal about your feelings." | Fail: bare imperative (no conditional), assumes equipment (journal), exceeds low-barrier threshold for some readers |
| "When you are ready, try noticing the temperature of the next thing you touch. That is enough." | Pass: conditional, specific (what + sensory), brief, exit ramp |

Articles whose closing invitations read as commands (bare imperatives without opt-out language) must be revised.

##### Thematic Cluster Management

When three or more articles cover overlapping territory, they form a thematic cluster. Clusters are valuable (depth signals authority), but they require active management to avoid content cannibalization.

Rules:

- When creating a new article, scan the existing library for thematic overlap. If a similar topic already exists, the new article must clearly differentiate itself in the title, lead, and opening paragraphs.
- Consider whether deepening and revising an existing article is more valuable than creating a new one on a similar topic.
- Articles within a cluster must use `relatedSlugs` to cross-link each other, so search engines understand they serve different intents.
- Each article in a cluster must target a distinct search intent. For example, in a "morning/routine" cluster: one article covers the emotional case for routine, another covers a specific ritual sequence, a third covers the science of morning cortisol. They share a theme but not an angle.

Current clusters to monitor (last verified: June 15, 2026):

| Cluster | Articles | Differentiation Status |
|---|---|---|
| Morning / routine | `morning-rituals-that-anchor-me`, `the-quiet-power-of-a-slow-morning`, `the-kindness-of-routine` | Needs sharper differentiation in leads and openings |
| Breathing / nervous system | `breathing-through-the-overwhelm`, `the-long-exhale`, `the-body-keeps-a-quiet-score` | Well-differentiated |
| Boundaries / availability | `the-gentle-discipline-of-saying-no`, `the-weight-of-being-available`, `digital-minimalism-in-a-loud-world` | Moderate overlap; each should target a different angle |
| Nature as metaphor | `water-as-teacher`, `what-the-garden-teaches`, `seasonal-living-as-practice` | Well-differentiated by subject matter |
| Body / embodiment | `the-body-keeps-a-quiet-score`, `the-body-you-are-in`, `living-alongside-pain`, `what-the-body-holds-after`, `when-the-body-slows`, `what-the-illness-left-behind` | Large cluster; well-differentiated (sensation vs. image vs. chronic pain vs. aftermath vs. aging vs. illness recovery) |
| Emotional processing | `anger-as-information`, `the-permission-to-weep`, `tending-the-inner-weather`, `the-courage-of-staying-still` | Well-differentiated (anger vs. tears vs. general weather vs. stillness under pressure) |
| Rest / recovery | `the-art-of-doing-nothing`, `sleep-as-surrender`, `rest-is-not-recovery` | Well-differentiated (stillness vs. sleep vs. active recovery) |
| Craft / hands / making | `hands-that-remember`, `the-thing-you-make-badly`, `finding-ritual-in-the-kitchen` | Well-differentiated (memory vs. imperfection vs. cooking) |
| Money / scarcity / enough | `money-scarcity-and-enough`, `the-taste-of-enough`, `hunger-beyond-food` | Monitor; overlapping "enough" theme across categories |
| Attention / presence | `the-edges-of-attention`, `cultivating-a-mindful-workspace`, `the-art-of-doing-nothing` | Well-differentiated (peripheral attention vs. workspace vs. stillness) |
| Unseen labor / time | `the-hours-no-one-sees`, `the-hours-that-belong-to-someone-else` | Well-differentiated (invisible work vs. caretaking time) |

##### Content Ecosystem Health

The article library must be managed as a balanced ecosystem, not an unplanned collection.

**Category balance:**

- No single category should exceed 30% of the total library.
- No category should fall below 10% of the total library.
- When a category is underrepresented, prioritize new articles for that category before creating additional articles in dominant categories.
- **Threshold:** These percentage targets apply when the library contains 15 or more articles. Below that threshold, prioritize filling underrepresented categories but do not block article creation based on percentage limits.

**Content gap planning:**

- Maintain awareness of topic gaps that align with the brand and have search potential.
- Prioritize gap-filling over cluster-deepening when the library already has 3 or more articles in a single thematic cluster.
- Before creating a new article, verify: (a) the topic is not already covered, (b) the target category is not already over-represented, (c) the emotional register is not already dominant in the library.

**Current category distribution (last verified: June 15, 2026, 59 articles):**

> [!WARNING]
> This snapshot may be outdated. Always verify the actual article count by checking `lib/articles/index.js` before making category-balance decisions.

| Category | Count | % | Status |
|---|---|---|---|
| Still Point | 11 | 19% | Healthy |
| The Body Knows | 11 | 19% | Healthy |
| Quiet Architecture | 11 | 19% | Healthy |
| Inner Weather | 13 | 22% | Healthy |
| Chosen Life | 13 | 22% | Healthy |

##### Content Lifecycle

Articles are living documents. When an article falls below the current quality baseline and cannot be revised to meet it:

1. **Revise** (first preference): Update the article to meet current standards. Update `dateModified` when content changes.
2. **Consolidate**: If the article is thematically redundant within a cluster, merge its strongest insights into a stronger cluster article. Remove the weaker article.
3. **Redirect**: If an article is removed, implement a 301 redirect to the most relevant replacement. Never hard-delete an article URL without a redirect.

Articles should also be reviewed when:
- A referenced study is retracted or superseded
- A cultural or scientific claim is found to be inaccurate
- The brand voice standards are updated and the article no longer meets them
- Three or more articles in the same cluster make differentiation impractical

## Component Library

| Component | Path | Purpose |
|---|---|---|
| Accordion | `components/Accordion/` | Collapsible content sections |
| AdSenseRefresh | `components/AdSenseRefresh/` | Google AdSense ad slot refresh on route changes |
| AuthorBio | `components/AuthorBio/` | Author bio section displayed on article pages |
| Breadcrumb | `components/Breadcrumb/` | Breadcrumb navigation for journal articles |
| BreathPacer | `components/BreathPacer/` | Guided breathing animation |
| Button | `components/Button/` | Primary and secondary CTA buttons |
| Card | `components/Card/` | Journal entry / content cards |
| ContactMe | `components/ContactMe/` | Contact form |
| DailyIntention | `components/DailyIntention/` | Rotating daily mindfulness invitation |
| Footer | `components/Footer/` | Site footer with social links |
| GoogleAnalytics | `components/GoogleAnalytics/` | GA4 tracking script wrapper |
| GroundingExercise | `components/GroundingExercise/` | Interactive grounding practice |
| Header | `components/Header/Header.js` | Site header with mobile menu |
| JournalFilter | `components/JournalFilter/` | Category filter tabs for journal index |
| JournalSearchBar | `components/JournalSearchBar/` | Search input for journal articles |
| JsonLd | `components/JsonLd/` | Reusable JSON-LD structured data injection |
| MeditationTimer | `components/MeditationTimer/` | Timed meditation with audio cues |
| NewsletterSignup | `components/NewsletterSignup/` | Email signup form |
| PageHero | `components/PageHero/` | Reusable hero section with title and subtitle |
| PracticeSkeleton | `components/PracticeSkeleton/` | Loading skeleton placeholder for practice page |
| ReadingProgress | `components/ReadingProgress/` | Scroll progress indicator for articles |
| RelatedArticles | `components/RelatedArticles/` | Related article suggestions at end of articles |
| ScrollReveal | `components/ScrollReveal/` | Fade-in-on-scroll wrapper |
| ScrollToTop | `components/ScrollToTop/` | Return-to-top button |
| SectionHeading | `components/SectionHeading/` | Consistent section title with optional subtitle |
| ShareBar | `components/ShareBar/` | Social sharing links for articles |
| TestimonialCarousel | `components/TestimonialCarousel/` | Rotating testimonial display |
| ThemeToggle | `components/ThemeToggle/` | Light/dark mode toggle |
| Timeline | `components/Timeline/` | Vertical timeline layout |

## App-Level Error and Loading Files

The following files in `app/` handle error states and loading. They must follow the brand voice and design standards.

| File | Purpose | Design Constraints |
|---|---|---|
| `app/error.js` | Client-side error boundary for unexpected runtime errors | Must use gentle, non-technical language ("Something went wrong" not "Error 500"). Include a link back to the home page. Follow the warm, reassuring brand voice. |
| `app/not-found.js` | Custom 404 page for unmatched routes | Must feel calming, not alarming. Include a link to the journal and home page. Use the brand palette and typography. |
| `app/loading.js` | Global loading state shown during route transitions | Keep minimal and unobtrusive. Use a subtle animation that respects `prefers-reduced-motion`. |

## Search

The project includes a search page at `app/search/page.js` (accessible at `/search`). It provides client-side article search functionality via the `JournalSearchBar` component.

| Attribute | Value |
|---|---|
| Route | `/search` |
| Schema type | `SearchResultsPage` (only when results are displayed) |
| Navigation | Not in main nav; accessible via journal search bar and direct URL |
| Sitemap | Excluded (search results pages are dynamic and should not be indexed as static content) |

---

# SEO Standards

These rules apply to every page and component that affects search visibility.

## Metadata Architecture

### Root Layout (`app/layout.js`)

The root layout must export a `metadata` object with at minimum:

```js
import { SITE } from "@/lib/siteConfig";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: 'en_US',
    type: 'website',
    images: [SITE.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
    images: [SITE.ogImage.url],
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
    canonical: SITE.url,
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
import { ARTICLES } from "@/lib/articles";
import { SITE } from "@/lib/siteConfig";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.lead || article.content.find((b) => b.type === "paragraph")?.text.slice(0, 160),
    openGraph: {
      title: article.title,
      description: article.lead,
      url: `${SITE.url}/journal/${slug}`,
      type: 'article',
      publishedTime: article.dateISO,
      authors: [SITE.author.name],
      section: article.category,
      tags: article.tags || [article.category],
      images: [
        {
          url: CARD_IMAGES[slug]
            ? `${SITE.url}${CARD_IMAGES[slug]}`
            : SITE.ogImage.url,
          width: SITE.ogImage.width,
          height: SITE.ogImage.height,
          alt: article.title,
        },
      ],
    },
    alternates: {
      canonical: `${SITE.url}/journal/${slug}`,
    },
  };
}
```

> [!IMPORTANT]
> The `openGraph.images` must use the article-specific card image from `CARD_IMAGES[slug]` (with a fallback to the site default). This ensures Pinterest Rich Pins, social shares, and link previews display the correct per-article image, matching the JSON-LD `image` field.

## Structured Data (JSON-LD)

Embed JSON-LD structured data in every page that qualifies. Use the reusable `JsonLd` component at `components/JsonLd/JsonLd.js`:

```jsx
import JsonLd from "@/components/JsonLd/JsonLd";

// Usage in any page component:
<JsonLd data={structuredDataObject} />
```

### Required Schemas

| Page | Schema Type | Key Properties |
|---|---|---|
| Home `/` | `WebSite` + `Organization` | `name`, `url`, `logo`, `sameAs` (from `getSameAsUrls()`), `potentialAction` (SearchAction if search exists) |
| Journal index `/journal` | `CollectionPage` + `ItemList` | `itemListElement` with each article as a `ListItem` |
| Journal article `/journal/[slug]` | `Article` + `BreadcrumbList` | `headline`, `author`, `datePublished`, `dateModified`, `description`, `image`, `publisher`, `mainEntityOfPage`; `BreadcrumbList` with Home > Journal > Article |
| About `/about` | `Person` + `FAQPage` | `name`, `description`, `url`, `sameAs`; FAQ items as `Question`/`Answer` pairs |
| Practice `/practice` | `WebPage` with `specialty` | `name`, `description`, `specialty: "Mindfulness"` |
| Connect `/connect` | `ContactPage` | `name`, `url` |
| Search `/search` | `SearchResultsPage` | `name`, `url`; only when search results are displayed |

### Article Schema Example

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Kindness of Routine",
  "description": "Routine is not the enemy of freedom. It is the quiet structure that makes freedom possible.",
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
  "datePublished": "2026-05-06",
  "dateModified": "2026-05-06",
  "mainEntityOfPage": "https://ninahealthy.com/journal/the-kindness-of-routine",
  "image": "https://ninahealthy.com/images/journal-21.png"
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
- No unnecessary nesting -- keep it flat as `/journal/article`

## Internal Linking

- Every journal article should link to at least one other related article (use `RelatedArticles` component)
- The home page should surface the latest or most relevant journal entries
- Use descriptive anchor text; never use "click here" or "read more" without surrounding context (screen readers read links out of context)
- Navigation must include all primary routes: Home, Journal, Practice, About, Connect

## Image SEO

- Every `<Image>` must have a descriptive `alt` attribute that conveys the image's content and function
- Decorative images should use `alt=""` and `aria-hidden="true"`
- Use the `priority` prop on above-the-fold hero images (LCP candidates)
- Specify `sizes` for responsive images to prevent unnecessary downloads
- Use descriptive filenames: `morning-ritual-tea-cup.png` not `IMG_4382.png`
- Always provide `width` and `height` (or use `fill` with a sized container) to prevent CLS

## Sitemap and Robots

- `app/sitemap.js` generates the sitemap listing all static routes and journal slugs
- `app/robots.js` allows all crawlers and links to the sitemap
- Both files already exist; update them when adding new static routes

### Sitemap Pattern

```js
import { ARTICLES } from "@/lib/articles";
import { SITE } from "@/lib/siteConfig";

export default function sitemap() {
  const staticRoutes = ['', '/journal', '/practice', '/about', '/connect', '/privacy', '/terms'];
  const journalSlugs = Object.keys(ARTICLES);

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE.url}${route}`,
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1.0 : route === '/privacy' || route === '/terms' ? 0.1 : 0.8,
    })),
    ...journalSlugs.map((slug) => ({
      url: `${SITE.url}/journal/${slug}`,
      lastModified: new Date(ARTICLES[slug].dateModified || ARTICLES[slug].dateISO),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];
}
```

## RSS Feed

The project has a full RSS 2.0 feed at `app/feed.xml/route.js` (accessible at `/feed.xml`). The root layout advertises it via `alternates.types["application/rss+xml"]`. When adding new articles, no manual feed update is needed; it reads from `ARTICLES` automatically.

The feed includes full article content via `<content:encoded>` and uses `<dc:creator>` for author attribution. This ensures AI crawlers indexing the feed get complete article text, not just the lead.

---

# Generative Engine Optimization (GEO) Standards

<!-- ✦ Rationale: GEO optimizes content for citation, attribution, and source selection
     by AI-powered answer engines (Google AI Overviews, Bing Copilot, Perplexity,
     ChatGPT with browsing). Unlike traditional SEO (optimizing for click-through on a
     results page), GEO optimizes for being surfaced, cited, and attributed by LLMs.
     Nina Healthy's first-person essay format, named researcher references, and strong
     structured data make it well-suited for AI citation, but explicit optimization
     ensures the content is machine-interpretable at the entity level. -->

These standards govern how Nina Healthy content is structured and annotated to maximize visibility, citation, and attribution in AI-powered search and answer engines.

## Entity Architecture

All JSON-LD schemas across the site use stable `@id` values to form a connected knowledge graph. AI engines use `@id` references to link entities across pages, treating them as a single graph rather than fragmented duplicates.

### Entity IDs

Defined in `lib/siteConfig.js` under `SITE.entityIds`:

| Entity | `@id` Value | Used On |
|---|---|---|
| Author (Person) | `https://ninahealthy.com/#author` | About page, every article page |
| Organization | `https://ninahealthy.com/#organization` | Home page, every article page |
| WebSite | `https://ninahealthy.com/#website` | Home page |

### Entity Linking Rules

- **Never inline author or publisher details** in article JSON-LD. Always use `{ "@id": SITE.entityIds.author }` and `{ "@id": SITE.entityIds.organization }`.
- **The canonical Person definition** lives on the About page (`app/about/page.js`). It includes `knowsAbout`, `sameAs`, `jobTitle`, and `description`.
- **The canonical Organization definition** lives on the Home page (`app/page.js`). It includes `name`, `url`, `logo`, and `sameAs`.
- When adding new pages with JSON-LD, reference existing entities by `@id`. Do not create inline duplicates.

### knowsAbout

The Person schema's `knowsAbout` array uses specific topical signals for entity disambiguation. Avoid generic terms that could match thousands of entities.

| Weak (generic) | Strong (specific) |
|---|---|
| "Mindfulness" | "Mindfulness meditation" |
| "Breathing exercises" | "Breathwork practices" |
| "Wellness" | "Nervous system regulation" |
| "Body awareness" | "Somatic awareness and interoception" |

## Citability Standards

AI answer engines select sources based on citability: the presence of clear, self-contained claims that can be extracted and attributed. Nina Healthy's essay format already supports this, but these rules ensure consistency.

### What Makes Content Citable

1. **Named claims**: Statements that reference a specific researcher, study, concept, or data point. AI engines prefer sources that provide verifiable, attributed claims over generic advice.
2. **Self-contained paragraphs**: Paragraphs that make sense when extracted in isolation, without requiring the preceding or following paragraph for context.
3. **Pull quotes**: The `quote` content block type is designed to be extractable. Every pull quote should work as a standalone citation.
4. **Concrete definitions**: When introducing a concept (e.g., "attention residue", "sleep effort", "distress tolerance"), define it clearly in the same paragraph. AI engines extract definitions as featured snippets.

### Citability Rules for Articles

- Every article must contain at least **one citable statement**: a clear, attributed claim that an AI engine could extract and cite with author attribution.
- When referencing a researcher or concept, include enough context for verification: full name, institutional affiliation (when known), and the specific concept or work being referenced.
- Pull quotes (`quote` content blocks) must be self-contained and attributable. They should make sense to a reader who has not read the rest of the article.

### Citation Data Schema

Articles that reference named researchers should include a `citations` array in the article data:

```js
citations: [
  { name: "Harriet Lerner", work: "The Dance of Anger", type: "Book" },
  { name: "Stephen Porges", work: "The Polyvagal Theory", type: "Book" },
],
```

| Field | Type | Description |
|---|---|---|
| `name` | string | Full name of the cited researcher or author |
| `work` | string | Title of the cited work (book, paper, framework) |
| `type` | string | Category: "Book", "Research paper", "Research instrument", "Therapeutic framework" |

When `citations` is present, the article page automatically adds `citation` (CreativeWork) and `mentions` (Person) properties to the Article JSON-LD. This gives AI engines structured links to the entities mentioned in the content.

## Speakable Content

The Article JSON-LD includes a `speakable` property using `SpeakableSpecification` with CSS selectors. This tells Google and AI engines which portions of content are suitable for voice synthesis, audio reading, and AI citation extraction.

### Speakable Selectors

The article page targets three CSS classes:

| CSS Class | Content Type | Why It Is Speakable |
|---|---|---|
| `.articleLead` | Opening lead paragraph | Summarizes the article's thesis; ideal for AI answer snippets |
| `.pullQuote` | Pull quotes / blockquotes | Self-contained, quotable statements |
| `.subheading` | H2 section headings | Provides scannable structure for AI extraction |

### Speakable Rules

- Do not add interactive or decorative content to speakable selectors.
- The `articleLead` class must be present on the lead paragraph element in the article template. If this class is missing, the speakable schema will not match any content.
- When adding new content block types to the article renderer, evaluate whether they should be speakable.

## Section Deep-Linking

All `<h2>` subheadings in articles receive a slugified `id` attribute, enabling AI engines and users to deep-link to specific sections within an article.

The ID is generated by:
1. Converting the heading text to lowercase
2. Replacing non-alphanumeric characters with hyphens
3. Trimming leading and trailing hyphens

Example: `"The Message in the Heat"` becomes `id="the-message-in-the-heat"`, linkable as `/journal/anger-as-information#the-message-in-the-heat`.

## AI Crawler Policy

The project explicitly allows all major AI crawlers in `app/robots.js`. This is an intentional decision: Nina Healthy benefits from being cited by AI answer engines, and blocking crawlers would reduce GEO visibility.

### Allowed AI Crawlers

| User Agent | Engine | Purpose |
|---|---|---|
| `GPTBot` | OpenAI | ChatGPT browsing and search |
| `ChatGPT-User` | OpenAI | ChatGPT user-initiated browsing |
| `Google-Extended` | Google | Gemini and AI Overviews |
| `Anthropic-ai` | Anthropic | Claude web search |
| `Claude-Web` | Anthropic | Claude web access |
| `PerplexityBot` | Perplexity | Perplexity answer engine |

### Blocked Crawlers

SEO scraper bots (AhrefsBot, SemrushBot, MJ12bot, etc.) are blocked. These are not AI answer engines; they are competitive intelligence scrapers that provide no visibility benefit.

### Policy Rationale

- Nina Healthy's content is public and attribution is desired. AI citation drives referral traffic and brand awareness.
- All content is copyrighted. The `llms.txt` file includes explicit attribution requirements.
- If an AI training-only crawler (distinct from search/retrieval) emerges in the future, evaluate on a case-by-case basis.

## llms.txt and llms-full.txt

The project provides two files for AI engine consumption:

### llms.txt (Static)

- **Location:** `public/llms.txt` (served at `/llms.txt`)
- **Purpose:** A structured summary of the site for LLMs, following the emerging `llms.txt` standard
- **Contents:** Site description, author info, content summary, links to key pages, and citation/attribution requirements
- **Update cadence:** Update manually when adding new site sections or changing the site's purpose

### llms-full.txt (Dynamic)

- **Location:** `app/llms-full.txt/route.js` (served at `/llms-full.txt`)
- **Purpose:** A comprehensive plain-text dump of all article content, optimized for LLM indexing
- **Contents:** Full body text of every article, ordered by `ENTRY_ORDER`, with metadata (title, URL, date, category, tags, citations)
- **Caching:** 24-hour cache (`Cache-Control: public, max-age=86400, s-maxage=86400`)
- **Update cadence:** Automatic; reads from `ARTICLES` and `ENTRY_ORDER` at request time

### Maintenance Rules

- When adding a new article, no manual update to `llms-full.txt` is needed (it reads from `ARTICLES` automatically).
- When changing the site's structure, purpose, or adding new sections, update `public/llms.txt` manually.
- When modifying article content block types (e.g., adding a new block type), ensure the `llms-full.txt` route handles it in the `bodyText` builder.

---

# Pinterest SEO and Algorithm Standards

<!-- ✦ Rationale: Pinterest functions as a visual search engine, not a social media platform.
     Content on Pinterest has a lifespan of 3-6 months (vs. hours on Instagram/Twitter),
     making it the highest-ROI organic channel for evergreen wellness content. The Nina
     Healthy Pinterest publisher script (scripts/pinterest/) automates pin creation, but
     the quality of pin metadata, keyword targeting, and image design determines whether
     the algorithm surfaces that content to the right audience. These rules ensure every
     article is Pinterest-algorithm-ready from the moment it is created. -->

These standards govern how content is prepared, structured, and optimized for discovery on Pinterest. They apply to every article, every pin payload generated by the publisher script, and every image created for Pinterest distribution.

## Algorithm Ranking Pillars

Pinterest's algorithm evaluates content on four pillars. Every decision in this section maps to one or more of them.

| Pillar | What Pinterest Measures | How Nina Healthy Addresses It |
|---|---|---|
| **Relevance** | Keywords in pin title, description, board name, and linked page OG tags | Pin titles and descriptions are keyword-optimized; boards are named with search terms; article pages emit full OG metadata |
| **Engagement** | Saves, closeups, outbound clicks, time spent | High-quality pin images with clear text overlays; compelling descriptions that drive click-through; landing pages that deliver on the pin's promise |
| **Freshness** | New, unique image URLs; consistent publishing cadence | Each article gets a unique pin image; the publisher script staggers posts to maintain a steady cadence |
| **Domain Quality** | Claimed website; consistent pinning history; user engagement with domain content | Domain is claimed via `p:domain_verify` meta tag; Rich Pins are active; all pins link to `ninahealthy.com/journal/*` |

## Pinterest Profile and Domain

### Domain Verification

The site must include a Pinterest domain verification meta tag in the root layout. In Next.js App Router, add it to the `metadata` export in `app/layout.js`:

```js
export const metadata = {
  // ... existing metadata
  other: {
    'p:domain_verify': 'd384da0f4f21f33b58ef09218a6fffd5',
  },
};
```

Domain verification enables:
- Rich Pin auto-sync (article title, description, and author pulled from OG tags)
- Attribution (profile photo and "Follow" button on all pins from the domain)
- Enhanced analytics (see which pins from your domain others create)
- Algorithm trust signal (claimed domains receive higher distribution priority)

### Profile Optimization

| Element | Current Value | SEO Purpose |
|---|---|---|
| Display Name | Nina Healthy | Brand recognition; searchable |
| Username | `@Nina_Vibes` | URL slug (`pinterest.com/Nina_Vibes/`) |
| Bio | Must include keywords: mindfulness, intentional living, wellness, self-care, journal | Pinterest indexes profile bios for topical authority |
| Profile URL | `${SITE.social.pinterest}` (from `lib/siteConfig.js`) | Canonical; used in `sameAs` structured data |

The bio should read as a natural sentence, not a keyword list. Example: "Personal reflections on mindfulness, daily rituals, and the quiet work of building an intentional life. New journal entries weekly."

## Board Architecture

Pinterest boards function as topical containers. The algorithm uses board names and descriptions to categorize pins and match them to user search intent. The five boards mirror the article category taxonomy.

| Article Category | Pinterest Board Name | Board Description (keyword-rich, max 500 chars) |
|---|---|---|
| Still Point | Still Point: Presence and Attention | Reflections on present-moment awareness, mindfulness practice, the discipline of noticing, and slowness as a form of intelligence. Essays on attention, stillness, and learning to be where you are. |
| The Body Knows | The Body Knows: Embodied Living | Essays on the body as teacher: nervous system awareness, breathwork, physical sensation, embodied self-care, and what the body holds when the mind looks away. |
| Quiet Architecture | Quiet Architecture: Routines and Rituals | Daily rhythms, morning routines, seasonal living, small ceremonies, and the gentle structures that hold a life together. Practical inspiration for intentional living. |
| Inner Weather | Inner Weather: The Emotional Life | Honest reflections on grief, anger, joy, exhaustion, loneliness, and the feelings that arrive without permission. Emotional wellness without toxic positivity. |
| Chosen Life | Chosen Life: Boundaries and Decisions | Essays on boundaries, values, digital minimalism, decision-making, and the conscious design of how you spend your time, energy, and attention. |

### Board Rules

- Board names are fixed. Do not rename them; renaming resets the board's SEO authority.
- Board descriptions must be updated when the content focus shifts, but changes should be infrequent (quarterly at most).
- Each board should contain 20-100 pins. Boards with fewer than 10 pins lack authority signals; boards with more than 200 become unfocused.
- Pin only to the single most relevant board per article. Multi-board pinning of the same URL dilutes engagement signals.
- The publisher script at `scripts/pinterest/` handles board mapping automatically via the `boards.js` module.

## Pin Content Optimization

### Pin Titles

Pinterest caps titles at 100 characters. The publisher script appends " | Nina Healthy" when space allows.

**Rules:**

- Place the primary Pinterest keyword in the first 40 characters of the title.
- When the article title is literary and keyword-free (e.g., "The Long Exhale"), the pin title should be rewritten to lead with a functional keyword. Use the `pinterestTitle` field in the article schema (see below).
- Titles should read as benefit statements or curiosity hooks, not generic labels.

| Article Title | Pin Title (auto-generated) | Assessment |
|---|---|---|
| "The Kindness of Routine" | "The Kindness of Routine \| Nina Healthy" | Acceptable: "routine" is discoverable |
| "The Long Exhale" | "The Long Exhale \| Nina Healthy" | Weak: no discoverable keyword; Pinterest users do not search for "the long exhale" |
| "The Long Exhale" | "Calming Breathing Technique for Your Nervous System \| Nina Healthy" | Strong: leads with the search term a user would type |

### Pin Descriptions

Pinterest caps descriptions at 500 characters. The publisher script constructs descriptions from `cardExcerpt` (or `lead`), `tags`, and a call-to-action.

**Rules:**

- Lead with a benefit-driven sentence that answers "why should I click?"
- Include 2-3 long-tail keywords naturally. Pinterest indexes descriptions for search matching.
- End with a soft call-to-action: "Read more at ninahealthy.com" (the publisher script adds this automatically).
- Never keyword-stuff. Descriptions must read as natural, helpful language.
- Include the article's `tags` as a pipe-separated keyword line. The publisher script handles this.

**Keyword placement hierarchy** (most important first):

1. Pin title (first 40 characters)
2. Pin description (first 100 characters)
3. Board name
4. Board description
5. Image text overlay
6. Linked page OG tags and content

### Pin Descriptions for Wellness Content

Pinterest wellness audiences search with intent-driven queries. Descriptions should bridge the literary brand voice with the functional language pinners use.

| Voice Register | Example Description | When to Use |
|---|---|---|
| **Search-forward** | "A simple morning breathing practice for calming the nervous system. Learn how slow exhalation activates your body's natural rest response." | When the article title is literary and keyword-free |
| **Balanced** | "Routine is not the enemy of freedom; it is the structure that holds everything else in place. A reflection on daily rituals and why small rhythms matter." | Default for most articles |
| **Voice-forward** | "Some mornings, the hardest thing is getting up. This essay is about what happens when you stop trying to be productive and start trying to be present." | When the topic is emotionally resonant and the card excerpt already carries keywords |

## Pinterest-Optimized Article Schema

Two optional fields extend the article data schema for Pinterest-specific metadata. When present, the publisher script uses these instead of the default `title` and `cardExcerpt`/`lead`.

```js
const article = {
  // ... existing required fields

  // Pinterest-specific overrides (optional)
  pinterestTitle: "Calming Breathing Technique for Your Nervous System",
    // string, optional; keyword-optimized pin title (max 100 chars including " | Nina Healthy")
    // Use when the article title is literary and lacks discoverable search keywords.
    // Falls back to article.title if omitted.

  pinterestDescription: "A simple breathwork practice for activating your parasympathetic nervous system. Learn why the exhale matters more than the inhale for calming anxiety and finding stillness.",
    // string, optional; keyword-rich pin description (max 500 chars)
    // Use when the card excerpt or lead is too literary for Pinterest discovery.
    // Falls back to cardExcerpt or lead if omitted.
};
```

### When to Use Pinterest Overrides

| Scenario | Use `pinterestTitle`? | Use `pinterestDescription`? |
|---|---|---|
| Article title contains a discoverable keyword ("Morning Routine...") | No | No |
| Article title is literary ("The Long Exhale") | Yes | Evaluate |
| Card excerpt is keyword-rich | No | No |
| Card excerpt is poetic/literary | No | Yes |
| Both title and excerpt are literary | Yes | Yes |

**Decision rule:** If the auto-generated pin title (article title + " \| Nina Healthy") would return zero results if typed into Pinterest search, write a `pinterestTitle`. Apply the same test to the description.

## Pin Image Specifications

Pinterest is a visual search engine. The algorithm's Visual Graph scans images for objects, text, and context. Image quality directly affects ranking.

### Dimensions and Format

| Attribute | Requirement |
|---|---|
| Aspect ratio | **2:3** (vertical) |
| Recommended size | **1000 x 1500 px** |
| Maximum file size | 20 MB |
| Accepted formats | PNG, JPG, WebP |
| Minimum resolution | 600 px wide |

### Image Design Rules

- **Vertical orientation is mandatory.** Horizontal or square images are cropped in the feed and receive lower distribution.
- **Text overlay:** Include a clear, readable headline on the image. This serves dual purposes: (a) the Visual Graph reads it for relevance signals, and (b) it increases click-through by communicating value before the user reads the description.
- **Font legibility:** Use the brand's heading typeface (Playfair Display) or a clean sans-serif at a size readable on a mobile screen (minimum 36px effective). High contrast between text and background is critical.
- **Safe zones:** Keep text and key visual elements away from the top 50px and bottom 100px. Pinterest overlays the Save button and profile icon in these areas.
- **Brand consistency:** Include the Nina Healthy wordmark or URL (small, bottom corner) on every pin image. This builds brand recognition in the feed.
- **No stock-photo cliches:** Avoid generic wellness imagery (woman on mountaintop, hands in prayer position, candles in a spa). Use images that match the article's specific sensory details.

### Current Pin Images

The publisher script uses the existing card thumbnails from `lib/cardImages.js` (mapped to files in `public/images/`). These images are 1200x630 (OG aspect ratio), which Pinterest will accept but display with letterboxing.

> [!IMPORTANT]
> For optimal Pinterest performance, create dedicated 1000x1500 pin images for high-priority articles. Store them in `public/images/pins/` and reference them via a future `pinterestImage` field in the article schema. Until dedicated pin images exist, the publisher script will continue using card thumbnails.

## Rich Pins

Rich Pins automatically pull metadata from the linked page's Open Graph tags. The site already emits the required OG tags via Next.js `generateMetadata`.

### Required OG Tags (Already Implemented)

| OG Property | Source | Emitted By |
|---|---|---|
| `og:type` | `"article"` | `generateMetadata` in `app/journal/[slug]/page.js` |
| `og:title` | `article.title` | `generateMetadata` |
| `og:description` | `article.lead` | `generateMetadata` |
| `og:url` | `${SITE.url}/journal/${slug}` | `generateMetadata` |
| `og:site_name` | `SITE.name` | Root layout metadata |
| `article:published_time` | `article.dateISO` | `generateMetadata` (as `publishedTime`) |
| `article:author` | `SITE.author.name` | `generateMetadata` (as `authors`) |
| `og:image` | Card thumbnail URL | `generateMetadata` |

### Rich Pin Validation

Rich Pins require a one-time validation per domain:

1. Go to the [Pinterest Rich Pin Validator](https://developers.pinterest.com/tools/url-debugger/)
2. Enter any article URL (e.g., `https://ninahealthy.com/journal/the-kindness-of-routine`)
3. Click **Validate**

Once validated, all pins linking to the domain automatically display Rich Pin formatting. No per-article setup is needed.

## Keyword Strategy for Pinterest

Pinterest keyword research differs from Google keyword research. Pinterest users search with planning intent ("how to start a morning routine") rather than informational intent ("what is a morning routine").

### Keyword Research Method

1. **Pinterest Search Bar:** Type the article's core topic and observe autocomplete suggestions. These are high-volume, real-time search terms.
2. **Pinterest Trends:** Use [trends.pinterest.com](https://trends.pinterest.com) to identify seasonal spikes. Wellness topics have predictable cycles (New Year: routines; Spring: renewal; Fall: slowing down; Winter: rest).
3. **Related Pins:** After searching, observe the "Related" bubbles at the top of results. These are semantic clusters Pinterest uses for content matching.

### Keyword Placement Rules

- Every pin must target **one primary keyword** and **1-2 secondary keywords**.
- The primary keyword must appear in the pin title.
- At least one secondary keyword must appear in the pin description's first 100 characters.
- Tags in the article schema (`tags` array) should include Pinterest-discoverable terms, not just editorial labels.

### Pinterest Keyword Examples for Nina Healthy

| Article Topic | Pinterest Primary Keyword | Pinterest Secondary Keywords |
|---|---|---|
| Morning routine | morning routine ideas | daily rituals, mindful morning, slow morning |
| Breathwork | breathing exercises for anxiety | calming breathing technique, nervous system regulation |
| Boundaries | how to set boundaries | saying no, emotional boundaries, people pleasing |
| Grief | coping with grief | grief journaling, processing loss, emotional healing |
| Sleep | sleep hygiene tips | bedtime routine, falling asleep naturally, sleep ritual |
| Nature connection | nature therapy | grounding exercises outdoors, forest bathing, nature mindfulness |
| Digital detox | digital minimalism | screen time reduction, phone-free routine, intentional technology use |

> [!TIP]
> When creating a new article, run the topic through Pinterest's search bar before finalizing the `tags` array. Add at least one Pinterest-native keyword (a term that autocompletes on Pinterest) to the tags. This ensures the publisher script generates descriptions that match real search behavior.

## Seasonal Content Planning

Pinterest content performs best when published **45-90 days before peak search interest.** Wellness topics follow seasonal patterns that the editorial calendar should anticipate.

| Season | Peak Search Window | Topics to Publish 45-90 Days Before |
|---|---|---|
| Winter (Dec-Feb) | Rest, reflection, cozy rituals | Sleep, evening routines, stillness, winter self-care, rest |
| Spring (Mar-May) | Renewal, fresh starts, decluttering | Morning routines, boundaries, digital detox, walking |
| Summer (Jun-Aug) | Energy, outdoor wellness, simplicity | Nature connection, body awareness, seasonal living, simplicity |
| Autumn (Sep-Nov) | Slowing down, introspection, nesting | Routine, journaling, emotional processing, letting go |

### Evergreen vs. Seasonal Pins

- **Evergreen:** Most Nina Healthy content is evergreen (breathwork, boundaries, mindfulness). These pins compound value over months. Ensure their descriptions use timeless language ("every morning" not "this January").
- **Seasonal:** A few topics have seasonal peaks. When publishing pins for these, include the season in the pin title or description ("A Gentle Evening Routine for the Darker Months") to capture seasonal search traffic, then rotate the pin title to a timeless version after the season passes.

## Publisher Script Integration

The existing Pinterest publisher at `scripts/pinterest/` automates pin creation from article data. These standards govern how the script constructs pin payloads.

### Data Flow

```
lib/articles/*.js         title, lead, tags, category, pinterestTitle, pinterestDescription
lib/cardImages.js         slug to thumbnail URL
lib/cardExcerpts.js       slug to card excerpt
lib/siteConfig.js         SITE.url, SITE.social.pinterest
        |
        v
  [data-loader.js]        Loads all data via Node.js vm module
        |
        v
  [publish.js]            Builds pin payloads (title, description, image, link)
        |
        v
  [boards.js]             Ensures 5 category-mapped boards exist
  [auth.js]               Validates/refreshes OAuth token
  [api-client.js]         HTTPS requests to Pinterest API v5
        |
        v
  Pinterest API           POST /v5/pins
        |
        v
  [pin-log.json]          Records pin IDs, timestamps, links
```

### Publishing Cadence

| Action | Cadence | Rationale |
|---|---|---|
| New article published | Pin within 24 hours | Freshness signal; early engagement lifts ranking |
| Batch initial rollout | 10-15 pins per day, 2s delay between calls | Avoids spam flags; respects Pinterest rate limits |
| Re-pin existing content | Monthly, with updated pin image or description | Freshness signal; new image URL counts as a new pin |
| Seasonal boost | 45-90 days before peak season | Captures early search traffic before competition peaks |

### Anti-spam Rules

- Never publish more than 25 pins per day.
- Maintain at least a 2-second delay between API calls (the publisher script default).
- Do not delete and re-create pins for the same URL. Use `--force` to create a second pin with a different image instead.
- Never pin the same URL to multiple boards in a single session.

## Pinterest-Aware Content Creation Checklist

When creating a new article, verify the following Pinterest readiness items in addition to the standard content quality checklist:

- [ ] At least one `tags` entry is a term that autocompletes in Pinterest search
- [ ] The pin title (article title or `pinterestTitle` override) contains a discoverable keyword in the first 40 characters
- [ ] The pin description (card excerpt, lead, or `pinterestDescription` override) leads with a benefit statement and includes at least one long-tail keyword
- [ ] The card thumbnail exists in `lib/cardImages.js` (required for the publisher script)
- [ ] The article's OG tags will emit correctly (title, description, image, `og:type: article`, `publishedTime`)
- [ ] If the article is seasonally relevant, it is scheduled for publication 45-90 days before peak search interest

## Anti-Patterns

| Anti-Pattern | Why It Hurts | What to Do Instead |
|---|---|---|
| Keyword-stuffing pin descriptions | Pinterest penalizes unnatural language; reduces engagement | Write naturally; place keywords in title and first sentence |
| Horizontal or square pin images | Cropped in feed; lower visibility and save rates | Always use 2:3 vertical (1000x1500) |
| Identical descriptions across multiple pins | Duplicate content signal; confuses the algorithm | Each pin for a different article should have a unique description |
| Deleting underperforming pins | Erases accumulated SEO value; resets engagement history | Leave pins live; create new pins with improved images instead |
| Pinning 50+ items at once | Triggers spam detection; account may be flagged | Use the publisher script's `--batch` flag (max 15 per run) |
| Clever/artistic board names | "Sacred Stillness" is unsearchable; users type "mindfulness tips" | Use descriptive, keyword-bearing board names (already configured) |
| Neglecting the profile bio | Missed topical authority signal | Include 3-5 core keywords naturally in the bio |
| Treating Pinterest like Instagram | Pinterest rewards search optimization, not aesthetic grids or hashtag games | Optimize for search intent; focus on keyword relevance over visual curation |
| Linking to the homepage instead of the article | Dilutes click-through engagement; user cannot find the promised content | Always link to the specific article URL (`/journal/<slug>`) |
| Ignoring Pinterest Trends for content planning | Missed seasonal traffic; content published after peak interest | Check [trends.pinterest.com](https://trends.pinterest.com) before finalizing the editorial calendar |

---

# Design Standards

These rules define the visual language of Nina Healthy across all pages and components.

## Design Philosophy

Nina Healthy's design must communicate: calm, warmth, intentionality, and spaciousness. Every visual decision should ask: "Does this reduce cognitive noise or add to it?"

### Core Principles

1. **Breathing room over density.** Generous whitespace is a feature, not wasted space. Prioritize high-density whitespace to lower cognitive friction. The UI must structurally induce calm through uncrowded layout hierarchies.
2. **Warmth over neutrality.** The palette is earthy and organic. Avoid sterile, corporate, or high-contrast aesthetics. Use biologically soothing, low-saturation, nature-mimicking color palettes.
3. **Subtlety over spectacle.** Animations and transitions should feel like a gentle exhale, not a firework. If a user notices the animation more than the content, it is too much.
4. **Consistency over novelty.** Reuse the established palette, spacing, and type scale. Do not introduce one-off colors, fonts, or patterns.
5. **Agency over coercion.** The user maintains total control over their sensory experience. Never include autoplay audio, un-skippable animations, or intrusive modal pop-ups. Design clear "exit" or "pause" mechanics within experiential flows (e.g., breath sessions, meditation timers).

### Cognitive Load Management

- Present data and user pathways linearly. Prevent choice paralysis by enforcing progressive disclosure for complex content.
- Avoid gamification tactics that leverage anxiety, FOMO, or artificial urgency (e.g., breaking "streaks" aggressively). Reward consistency through reflective metrics and soft milestones.
- Design interfaces that feel private and safe. Keep personal data minimized on visible surfaces.

## Image Generation Standards

<!-- ✦ Rationale: journal-51 through journal-59 were generated in a "digital watercolor
     illustration" style that reads as obviously AI-generated. They undermine the brand's
     credibility and visual consistency. This section prevents agents from repeating the
     mistake by defining the mandatory photographic style. -->

All article thumbnail images in `public/images/` must follow a **photographic realism** style. The visual standard is set by images journal-1 through journal-50, which look like editorial photographs with natural light, depth of field, and organic texture.

### Mandatory Style: Photographic Realism

When generating article thumbnail images, the result must look like a high-quality editorial photograph, not an illustration. Key characteristics:

- **Natural light**: Soft, directional light that creates realistic shadows and highlights (golden hour, window light, overcast diffusion)
- **Depth of field**: Shallow or medium depth of field with natural bokeh; foreground subjects in focus, backgrounds softly blurred
- **Photographic texture**: Grain, lens softness, and tonal variation consistent with real camera sensors
- **Material realism**: Surfaces (wood, linen, ceramic, skin, stone, water) must look tangible and textured, not painted or smoothed
- **Color grading**: Warm, muted tones consistent with the brand palette (creams, terracottas, sage, olive, soft neutrals)

### Banned Styles

The following styles are **explicitly prohibited** for article thumbnails:

| Banned Style | Visual Markers | Why It Fails |
|---|---|---|
| Digital watercolor illustration | Visible brushstroke textures, painted edges, paper-texture borders, washed-out color bleeds | Reads as obviously AI-generated; undermines editorial credibility |
| Cartoon or vector illustration | Flat color fills, black outlines, simplified shapes | Inconsistent with brand's photographic identity |
| Oil painting or impasto style | Thick visible paint strokes, canvas texture overlay | Same as watercolor; reads as AI art |
| Pencil or charcoal sketch | Hatching, line-drawing quality, monochrome strokes | Too far from the established photographic look |
| 3D render or CGI | Plastic surfaces, perfect geometry, uncanny lighting | Sterile, corporate; antithetical to warmth principle |
| Collage or mixed media | Layered cutouts, scrapbook aesthetic, visible edges between elements | Inconsistent with the clean photographic grid |

### Specific Anti-Patterns from journal-51 to journal-59

These images exhibit a recognizable "AI watercolor" style that must not be repeated:

- **Painted brush edge borders**: A white or cream border with visible paint strokes framing the image (journal-51, journal-53, journal-54)
- **Illustrative hands**: Human hands rendered with visible brushwork and exaggerated vein/wrinkle detail that looks drawn, not photographed (journal-51, journal-52, journal-59)
- **Flat watercolor washes**: Large areas of blended color without photographic detail or texture (journal-54, journal-56)
- **Painted window light**: Light rendered as streaky yellow-white paint strokes rather than realistic light falloff (journal-55, journal-57)
- **Illustrated objects with paint texture**: Cups, spoons, notebooks rendered with visible brushwork rather than photographic material detail (journal-55, journal-58)

### Prompt Guidance

When generating images, prompts should emphasize photographic qualities:

| Include in prompts | Avoid in prompts |
|---|---|
| "editorial photograph", "natural light" | "watercolor", "illustration", "painting" |
| "shallow depth of field", "35mm film" | "digital art", "sketch", "drawn" |
| "warm tones", "soft focus" | "brushstrokes", "canvas texture" |
| "muted colors", "lifestyle photography" | "artistic", "hand-painted", "gouache" |
| "candid", "intimate", "documentary style" | "storybook", "concept art", "whimsical" |

### Consistency Check

Before adding a new image to `public/images/`, compare it visually against journal-1 through journal-10. If the new image looks drawn, painted, or illustrated when placed next to the existing set, it must be regenerated with a photographic prompt.

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
| `--color-terracotta-dark` | `#8C4E2A` | `#D4926B` | WCAG-compliant text variant of terracotta; use for inline links and text on light backgrounds |
| `--color-sage` | `#8FA98B` | `#A3BDA0` | Secondary accent |
| `--color-olive` | `#6B7D5E` | `#8A9E7D` | Hover states |
| `--color-clay` | `#C4A882` | `#B09974` | Borders, subtle UI |
| `--color-sand` | `#E8DFD0` | `#3D3530` | Light accent backgrounds |
| `--color-error` | `#b45309` | `#b45309` | Validation feedback; warm amber, not harsh red |

### Color Usage Rules

- **Text contrast:** Primary text (`--color-charcoal` on `--color-cream`) must meet WCAG 2.2 AA minimum (4.5:1 for body text, 3:1 for large text). Verify contrast ratios when combining any foreground/background pair.
- **Accent restraint:** Terracotta is reserved for CTAs, active states, and key highlights. Do not use it for decorative backgrounds or large surfaces.
- **Dark mode parity:** Every component must render correctly in both light and dark modes. The dark palette in `globals.css` handles this via `prefers-color-scheme: dark`. Do not create separate dark-mode stylesheets.
- **Error states:** Avoid harsh warning reds. Use soft, grounding earth tones or informative ambers for validation feedback that does not trigger anxiety.

## Typography

| Role | Font | Variable | Fallback Stack |
|---|---|---|---|
| Headings | Playfair Display | `var(--font-heading)` | Georgia, "Times New Roman", serif |
| Body | Lora | `var(--font-body)` | Georgia, "Times New Roman", serif |

Both fonts are loaded via `next/font/google` with `display: 'swap'` in `app/layout.js`.

### Type Scale (Mobile-First)

Use the `--text-*` CSS custom properties defined in `globals.css`. Never hardcode `rem` values directly.

| Element | Token | Mobile | Desktop (min-width: 768px) | Weight |
|---|---|---|---|---|
| `h1` | `--text-3xl` / `--text-4xl` | `2rem` | `2.75rem` - `3.5rem` | 700 |
| `h2` | `--text-2xl` | `1.5rem` | `2rem` - `2.25rem` | 600-700 |
| `h3` | `--text-xl` | `1.25rem` | `1.5rem` | 600 |
| Body text | `--text-base` / `--text-md` | `1rem` | `1.05rem` - `1.125rem` | 400 |
| Captions / meta | `--text-sm` | `0.85rem` | `0.9rem` | 400 |
| Buttons | `--text-base` | `0.95rem` | `1rem` | 600 |

### Typography Rules

- **Line height:** Body text should use `1.7` - `1.8` for comfortable reading. Headings use `1.2` - `1.3`.
- **Measure (line length):** Body text should never exceed `65ch` (`max-width: 65ch`). This is critical for readability and neurodivergent-friendly design.
  <!-- ✦ Rationale: 65ch (approximately 45-75 characters per line) is the typographic
       standard for comfortable reading (Bringhurst, Elements of Typographic Style).
       Lines beyond this range increase saccade distance and reduce comprehension,
       disproportionately affecting readers with ADHD or visual processing differences. -->
- **Letter spacing:** Headings may use slight negative tracking (`-0.01em` to `-0.02em`). Body text stays at default. Generous character spacing accommodates cognitively fatigued users.
- **Font smoothing:** Already enabled globally via `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale`.

## Spacing System

Use the `--space-*` CSS custom properties defined in `globals.css`. Never hardcode `rem` values directly.

| Variable | Value | Pixels | Usage |
|---|---|---|---|
| `--space-1` | `0.25rem` | 4px | Micro gaps (icon padding) |
| `--space-2` | `0.5rem` | 8px | Tight spacing (inline elements) |
| `--space-3` | `0.75rem` | 12px | Small gaps (between related elements) |
| `--space-4` | `1rem` | 16px | Standard element spacing |
| `--space-5` | `1.25rem` | 20px | Medium gaps |
| `--space-6` | `1.5rem` | 24px | Section padding (mobile) |
| `--space-8` | `2rem` | 32px | Between content blocks |
| `--space-10` | `2.5rem` | 40px | Large gaps |
| `--space-12` | `3rem` | 48px | Section gaps |
| `--space-16` | `4rem` | 64px | Major section separation |
| `--space-20` | `5rem` | 80px | Large section separation |
| `--space-24` | `6rem` | 96px | Hero / page-level vertical padding |

## Animation and Motion

### Guiding Principle

Motion should feel like breathing: slow, smooth, and natural. Design transitions to mimic natural physiological rhythms. It reinforces the brand's sense of calm.

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
- **Experiential flows:** Breath pacer, meditation timer, and grounding exercise animations must include visible pause/stop controls and respect user agency at all times.

## Squircle Clip-Paths

Cards and images use `clip-path` instead of `border-radius`. The squircle variables are defined in `globals.css`.

<!-- ✦ Rationale: Squircles (superellipse curves) produce corners with continuous
     curvature, unlike CSS border-radius which creates abrupt circular arcs. Apple's
     iOS uses the same geometry for app icons. The result is a softer, more organic
     appearance that aligns with the brand's warmth-over-sterility design principle. -->

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

These rules govern all written content: page copy, journal articles, meta descriptions, alt text, button labels, and microcopy. They are grounded in evidence-based behavioral science and trauma-informed practice.

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

- [ ] Is this written in Nina's first-person voice ("I", "me", "my"), not a generic wellness brand or third-person description of Nina?
- [ ] Does it invite rather than instruct? ("Try this" not "You must")
- [ ] Does it acknowledge difficulty rather than promising easy fixes?
- [ ] Is the language concrete and sensory, not abstract?
- [ ] Would someone feel calmer after reading this, not more pressured?

### Voice Anti-Examples

These examples show what Nina does NOT sound like and why:

| Violation | Why It Fails | Nina Version |
|---|---|---|
| "You deserve to shine today, beautiful soul!" | Saccharine; performative; hollow affirmation | "Some mornings, the hardest thing is just getting up. That counts." |
| "Studies have conclusively shown that mindfulness reduces cortisol by 23%." | Academic; clinical; overstates certainty | "There is some evidence that stillness changes the body. I have felt it, though I cannot measure it." |
| "STOP scrolling and START living!" | Commanding; judgmental; urgency as coercion | "If the screen is where you are right now, that is okay. When you are ready, something else will be here." |
| "In this article, we will explore five tips for better sleep." | Generic blog voice; not first-person; listicle framing | "I have been thinking about what happens when we stop trying to fall asleep." |
| "You are worthy of rest, queen." | Performative warmth; gendered assumption; empty affirmation | "Rest is not a reward. It is just what your body needs, and it does not have to be earned." |

### Voice by Context

The brand voice adapts its register depending on content type:

| Context | Register | Key Adaptation |
|---|---|---|
| Journal articles | Full literary voice | First-person, reflective, sensory |
| Meta descriptions | Compressed literary | First-person optional; benefit-led; keyword-aware |
| Button / CTA copy | Warm imperative | "Begin" over "Start"; invitational, never urgent |
| Error messages | Gentle functional | "We could not find that" not "Error 404" |
| Content notes | Institutional-warm | Slightly more formal; clear and direct, not literary |
| Alt text | Functional-descriptive | Scene + mood; no first-person |
| Legal pages (privacy, terms) | Clear informational | Professional; not literary; not first-person |
| Newsletter subject lines | Curious / invitational | First-person; question or observation |

## Content Boundaries

Nina is **not** a medical professional. All content must respect this:

- Never use clinical or diagnostic language ("treatment", "therapy", "cure", "heal")
- Never promise health outcomes ("this will reduce your anxiety")
- Never imply, suggest, or state that content is a medical, clinical, or psychiatric cure
- Use framing like "what I have found", "what works for me", "you might try"
- Include `contentNote` in article data for pieces that discuss anxiety, overwhelm, grief, or emotional distress

## Scientific and Cultural Integrity

- Where practices have roots in specific traditions (e.g., Vedic, Buddhist, Indigenous), acknowledge the lineage with respect. Avoid over-secularized dilution or cultural appropriation.
- Mechanistic claims (e.g., references to the nervous system, cortisol, breathing physiology) should be grounded in established neurobiology. Use hedged language: "research suggests", "some evidence points to". Never use or validate pseudoscientific jargon.
- Actively eliminate toxic positivity and spiritual bypassing. Validate real human struggle, discomfort, and systemic realities rather than manufacturing forced optimism or toxic resilience.

## Trauma-Informed Language

Every guided experiential prompt, breathwork instruction, or meditation cue must:

- Prioritize optionality and agency (e.g., "if comfortable, close your eyes, or simply soften your gaze")
- Offer exit ramps (e.g., "if this feels intense, feel free to return to your natural rhythm")
- Use body-neutral, socioeconomically accessible, and neurodivergent-inclusive language (see implementation guidelines below)
- Not assume specific physical abilities, baseline financial status, or neurotypical cognitive processing

### Implementation Guidelines

**Body-neutral language:**
- Do not assume the reader can stand, sit cross-legged, close their eyes, or hold a specific posture. Always offer alternatives.
- Avoid: "Sit comfortably on the floor." Use: "Find a position that feels supported, whether sitting, lying down, or standing."
- Avoid: "Feel your belly rise and fall." Use: "Notice whatever movement your breath makes, wherever you feel it."

**Socioeconomically accessible language:**
- Do not assume the reader has access to specific equipment, a quiet private space, organic food, or paid wellness services.
- Avoid: "Light your favorite candle and draw a bath." Use: "Find one small thing that signals rest to you, whatever that is."
- Never frame wellbeing as requiring purchases, subscriptions, or specific living conditions.

**Neurodivergent-inclusive language:**
- Do not assume linear attention, consistent energy, or typical sensory processing. Offer flexible timeframes ("30 seconds or 5 minutes, whatever feels right").
- Avoid: "Clear your mind completely." Use: "Let your thoughts move without trying to direct them."
- Avoid: "Sit still and focus." Use: "Find a kind of stillness that works for you; movement counts too."
- Do not assume the reader finds stillness calming; some neurodivergent readers find movement more regulating.

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
- Avoid jargon, buzzwords, and wellness cliches. Prohibited phrases include (non-exhaustive): "self-care journey", "live your best life", "manifest your dreams", "lean into [anything]", "show up for yourself", "hold space", "do the inner work", "your body is a temple", "positive vibes only", "everything happens for a reason", "trust the process", "radical self-love", "align with your highest self", "healing journey", "mind-body-spirit". If a phrase could appear on a mass-market wellness Instagram account without attribution, it is likely a cliche; replace it with specific, personal language.
- No em dashes. Use commas, semicolons, colons, or break into two sentences.
- Build credibility with grounded, precise vocabulary; ban empty marketing hyperbole

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

1. **Opening hook** (1-2 paragraphs): A personal observation or admission that draws the reader in. Vulnerable but not dramatic.
2. **Exploration** (2-3 sections with subheadings): Deeper reflection, personal stories, observations. Each section should stand alone as a scannable unit.
3. **Pull quote**: A single distilled thought that captures the essence. This is the sentence someone would highlight or share.

   Pull quote quality criteria:
   - Drawn from or adapted from the article body (not entirely new text)
   - A single sentence of 10-25 words
   - Captures the article's central insight, not a supporting detail
   - Works as a standalone statement (comprehensible without surrounding context)
   - Placed after the second or third subheading, providing a mid-article breathing point
   - For articles over 800 words, consider a second pull quote near the closing section

4. **Practical dimension** (1 section): How this shows up in daily life. Concrete, sensory, actionable.
5. **Closing invitation** (after a divider): A gentle, specific invitation for the reader to try something. Not a command. An offer. Always framed as optional.

## E-E-A-T Content Strategy

Every piece of content must demonstrate Experience, Expertise, Authoritativeness, and Trustworthiness:

### Experience (the "first E")
- All articles are written from Nina's lived experience. Never write in a detached, third-person editorial voice.
- Include specific, personal details: the weight of a tea cup, the sound of a morning kitchen, the feeling of feet on a cold floor. Specificity builds trust.
- Name the difficulty before offering the insight. Show the struggle, not just the resolution.

### Expertise
- Draw on established behavioral science where relevant (decision fatigue, parasympathetic activation, circadian rhythms) but express it in plain, accessible language.
- Never cite studies you cannot verify. Use "research suggests" or "psychologists have observed" when referencing well-established principles.

### Authoritativeness
- The About page clearly states who Nina is and is not (not a therapist, not a doctor). This transparency builds authority through honesty.
- Internal linking between articles builds topical depth. Each article should reference at least one related piece.
- The FAQ section on the About page addresses common concerns directly.

### Trustworthiness
- No dark patterns. No manipulative urgency. No countdown timers on newsletter signups.
- Content notes before emotionally heavy articles.
- Clear contact information. Visible privacy policy and terms.
- No affiliate links or paid recommendations disguised as personal endorsements.

### E-E-A-T by Page Type

E-E-A-T signals vary by page. Each page should emphasize its primary trust dimension:

| Page | Primary Signal | Implementation |
|---|---|---|
| Journal articles | Experience, Expertise | First-person narrative, cited research, sensory detail |
| About `/about` | Trust, Experience | Bio, credentials, transparent scope ("not a therapist"), FAQ |
| Practice `/practice` | Expertise | Named techniques, clear scope, no overclaiming |
| Home `/` | Authority | Curated content selection, breadth of topics, internal linking |
| Connect `/connect` | Trust | Clear contact method, no dark patterns, visible privacy policy |

## SEO Content Guidelines

### Title Tags

- When the article title includes a discoverable keyword, place it in the first 40 characters of the title tag. When the title is literary and keyword-free (see Title SEO and Keyword Strategy in Content Quality Standards), ensure the meta description carries the primary keyword in its first 80 characters. This overrides the global SEO rule that primary keywords must appear in the h1.
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
- Modals and menus must trap focus and restore it on close (see `components/Header/Header.js` for the reference pattern)
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

## Form Accessibility

The project includes forms in `ContactMe` and `NewsletterSignup`. All forms must:

- Associate every input with a visible `<label>` via `htmlFor` / `id` pairing
- Use `aria-describedby` to link inputs to their validation messages or helper text
- Mark required fields with both the `required` attribute and a visible indicator
- Provide clear, specific error messages (e.g., "Please enter a valid email address" not "Invalid input")
- Use `aria-invalid="true"` on fields that fail validation
- Ensure error messages use `role="alert"` or `aria-live="polite"` so screen readers announce them
- Never rely on color alone to indicate an error state; pair with text and/or icons
- Use `type="email"` for email fields, `type="tel"` for phone, etc. for mobile keyboard optimization

## Color Contrast

- Body text on backgrounds: minimum 4.5:1 ratio
- Large text (18px+ bold or 24px+): minimum 3:1 ratio
- Interactive element borders and focus indicators: minimum 3:1 against adjacent colors
- Do not rely on color alone to convey meaning; pair with text, icons, or patterns

## Reduced Motion

The global stylesheet already includes:

```css
@media (prefers-reduced-motion: reduce) {
  /* Only suppress motion-related properties. Color, opacity, and
     background transitions remain because they are not vestibular
     triggers and provide useful state feedback (WCAG 2.3.3). */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
```

Any component-level animation must also respect this media query. This is especially critical for `BreathPacer`, `MeditationTimer`, `GroundingExercise`, and `ScrollReveal`.

---

# Performance Guidelines

## Core Web Vitals Targets

| Metric | Target | Primary Lever |
|---|---|---|
| LCP (Largest Contentful Paint) |  ≤ 2.5s | `priority` on hero images, font `display: swap` |
| INP (Interaction to Next Paint) |  ≤ 200ms | Minimal JS, no heavy event handlers |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | Explicit image dimensions, font fallback matching |

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

## Resource Hints

When adding external resources (third-party scripts, APIs, CDN origins), use React 19's `preconnect()` and `prefetchDNS()` functions in the root layout to reduce connection latency:

```js
import { preconnect, prefetchDNS } from "react-dom";

// Inside the root layout component, before the return statement:
preconnect("https://example.com", { crossOrigin: "anonymous" });
prefetchDNS("https://example.com");
```

The root layout already uses this pattern for Google AdSense and Google Tag Manager. When adding new external origins, follow the same pattern.

## CSS Class Conventions

The global stylesheet at `app/globals.css` defines scoped prose link styles using the `.articleBody` and `.legalContent` class names. Inline `<a>` tags inside these containers receive visible underline styling with `--color-terracotta-dark`. Without these parent class names, inline links inherit the global reset (no underline, inherited color) and become invisible to sighted users.

- Any template rendering article body content must wrap it in an element with `className="articleBody"` (or use the CSS module equivalent that outputs this class)
- Legal pages (privacy, terms) must wrap prose content in an element with `className="legalContent"`
