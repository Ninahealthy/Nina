/**
 * Curated reading paths that guide readers through Nina's thinking
 * on specific dimensions of somatic attention.
 *
 * Each path is a sequenced list of article slugs designed to build
 * on each other. Paths span multiple categories to demonstrate range.
 *
 * @module readingPaths
 */

export const READING_PATHS = [
  {
    id: "new-to-somatic-attention",
    title: "New to Somatic Attention",
    subtitle: "If you are just arriving, start here.",
    description:
      "Five articles that introduce the practice of starting with the body's " +
      "experience rather than the mind's narrative. Begin with the body you " +
      "actually have, learn to breathe through intensity, sit with what is " +
      "uncomfortable, find steadiness in routine, and discover what gentleness " +
      "really means.",
    slugs: [
      "the-body-you-are-in",
      "breathing-through-the-overwhelm",
      "learning-to-sit-with-discomfort",
      "the-kindness-of-routine",
      "what-i-mean-when-i-say-gentle",
    ],
  },
  {
    id: "when-the-body-speaks-louder",
    title: "When the Body Speaks Louder",
    subtitle: "For readers drawn to embodiment, nervous system, physical sensation.",
    description:
      "Six articles on the body as teacher. From the quiet scores it keeps " +
      "to the intelligence hidden inside exhaustion, these essays explore " +
      "what happens when you stop overriding the body and start listening.",
    slugs: [
      "the-body-keeps-a-quiet-score",
      "the-long-exhale",
      "what-the-body-holds-after",
      "the-intelligence-of-exhaustion",
      "when-the-body-slows",
      "living-alongside-pain",
    ],
  },
  {
    id: "sitting-with-difficulty",
    title: "Sitting with Difficulty",
    subtitle: "For readers processing grief, anger, confusion, or unresolved emotion.",
    description:
      "Six articles on staying present with what is hard. Anger as honest " +
      "reporting, grief without a clear source, the courage it takes to " +
      "weep, the weight of apology, the arithmetic of worry, and the " +
      "radical act of staying still when everything says run.",
    slugs: [
      "anger-as-information",
      "on-grief-without-a-name",
      "the-permission-to-weep",
      "the-practice-of-apologizing",
      "the-arithmetic-of-worry",
      "the-courage-of-staying-still",
    ],
  },
  {
    id: "the-quiet-structure",
    title: "The Quiet Structure",
    subtitle: "For readers interested in routines, rituals, and daily design.",
    description:
      "Five articles on the architecture of a deliberate life. Morning " +
      "rituals, kitchen ceremonies, the steadiness of routine, the power " +
      "of a slow morning, and the practice of living in rhythm with the " +
      "seasons.",
    slugs: [
      "morning-rituals-that-anchor-me",
      "finding-ritual-in-the-kitchen",
      "the-kindness-of-routine",
      "the-quiet-power-of-a-slow-morning",
      "seasonal-living-as-practice",
    ],
  },
];

export default READING_PATHS;
