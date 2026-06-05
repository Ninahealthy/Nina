import { ARTICLES } from "@/lib/articles";
import JournalFilter from "@/components/JournalFilter/JournalFilter";
import PageHero from "@/components/PageHero/PageHero";
import JsonLd from "@/components/JsonLd/JsonLd";
import { getReadingTime } from "@/lib/readingTime";
import styles from "./page.module.css";

export const metadata = {
  title: "Journal",
  description:
    "Thoughts on mindful living, written from wherever I am in the journey.",
  openGraph: {
    title: "Journal",
    description:
      "Thoughts on mindful living, written from wherever I am in the journey.",
    url: "https://ninahealthy.com/journal",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Nina Healthy journal, reflections on mindful living",
      },
    ],
  },
  alternates: {
    canonical: "https://ninahealthy.com/journal",
  },
};

/**
 * Card-level entries derived from the full articles.
 * This runs on the server; only the lightweight card data
 * is serialized and passed to the JournalFilter client component.
 */
const ENTRY_ORDER = [
  "water-as-teacher",
  "learning-to-be-a-beginner",
  "the-freedom-of-small-spaces",
  "hunger-beyond-food",
  "the-ritual-of-repair",
  "on-grief-without-a-name",
  "what-the-garden-teaches",
  "the-practice-of-receiving",
  "silence-as-a-language",
  "the-kindness-of-routine",
  "sleep-as-surrender",
  "tending-the-inner-weather",
  "the-long-exhale",
  "on-walking-without-a-destination",
  "the-body-keeps-a-quiet-score",
  "the-art-of-gentle-transitions",
  "digital-minimalism-in-a-loud-world",
  "finding-ritual-in-the-kitchen",
  "the-gentle-discipline-of-saying-no",
  "cultivating-a-mindful-workspace",
  "the-art-of-doing-nothing",
  "morning-rituals-that-anchor-me",
  "letting-go-of-perfect",
  "the-quiet-power-of-a-slow-morning",
  "breathing-through-the-overwhelm",
  "seasonal-living-as-practice",
  "the-weight-of-being-available",
  "what-i-mean-when-i-say-gentle",
  "learning-to-sit-with-discomfort",
  "the-myth-of-balance",
];

const CARD_IMAGES = {
  "water-as-teacher": "/images/journal-30.png",
  "learning-to-be-a-beginner": "/images/journal-29.png",
  "the-freedom-of-small-spaces": "/images/journal-28.png",
  "hunger-beyond-food": "/images/journal-27.png",
  "the-ritual-of-repair": "/images/journal-26.png",
  "on-grief-without-a-name": "/images/journal-25.png",
  "what-the-garden-teaches": "/images/journal-24.png",
  "the-practice-of-receiving": "/images/journal-23.png",
  "silence-as-a-language": "/images/journal-22.png",
  "the-kindness-of-routine": "/images/journal-21.png",
  "sleep-as-surrender": "/images/journal-20.png",
  "tending-the-inner-weather": "/images/journal-19.png",
  "the-long-exhale": "/images/journal-18.png",
  "on-walking-without-a-destination": "/images/journal-17.png",
  "the-body-keeps-a-quiet-score": "/images/journal-16.png",
  "the-art-of-gentle-transitions": "/images/journal-11.png",
  "digital-minimalism-in-a-loud-world": "/images/journal-12.png",
  "finding-ritual-in-the-kitchen": "/images/journal-13.png",
  "the-gentle-discipline-of-saying-no": "/images/journal-14.png",
  "cultivating-a-mindful-workspace": "/images/journal-15.png",
  "the-art-of-doing-nothing": "/images/journal-1.png",
  "morning-rituals-that-anchor-me": "/images/journal-2.png",
  "letting-go-of-perfect": "/images/journal-3.png",
  "the-quiet-power-of-a-slow-morning": "/images/journal-4.png",
  "breathing-through-the-overwhelm": "/images/journal-5.png",
  "seasonal-living-as-practice": "/images/journal-6.png",
  "the-weight-of-being-available": "/images/journal-7.png",
  "what-i-mean-when-i-say-gentle": "/images/journal-8.png",
  "learning-to-sit-with-discomfort": "/images/journal-9.png",
  "the-myth-of-balance": "/images/journal-10.png",
};

const CARD_EXCERPTS = {
  "water-as-teacher": "Water does not force its way. It finds it. On the oldest teacher and what it knows about patience, persistence, and letting go.",
  "learning-to-be-a-beginner": "Somewhere between childhood and now, we lost the willingness to be bad at things. Reclaiming it might be the most freeing thing you ever do.",
  "the-freedom-of-small-spaces": "We chase expansiveness, but some of the deepest peace lives in the smallest moments and the tightest corners.",
  "hunger-beyond-food": "Sometimes the thing you are reaching for in the kitchen is not in the kitchen at all. On recognizing what you truly need.",
  "the-ritual-of-repair": "We discard what is broken. But some things were meant to be mended, and the mending is where the beauty lives.",
  "on-grief-without-a-name": "Not all grief comes with a funeral. Some losses are so quiet that you do not realize you are mourning until the ache has already settled in.",
  "what-the-garden-teaches": "A garden does not care about your timeline. It grows at its own pace, and it will teach you to do the same.",
  "the-practice-of-receiving": "We practice giving so often that we forget: receiving is a skill too, and most of us are out of practice.",
  "silence-as-a-language": "We fill silence because we are afraid of what it might say. But silence is not empty. It is full of answers.",
  "the-kindness-of-routine": "Routine is not the enemy of freedom. It is the quiet structure that makes freedom possible.",
  "sleep-as-surrender": "What if sleep is the one thing that cannot be optimized, only invited? On letting go of the performance of rest.",
  "tending-the-inner-weather": "Emotions are not problems to solve. They are weather to notice, name, and let pass.",
  "the-long-exhale": "The science and ritual behind a longer breath out, and why your nervous system has been waiting for it.",
  "on-walking-without-a-destination": "What happens when you walk with no route, no earbuds, and no purpose other than presence.",
  "the-body-keeps-a-quiet-score": "Your body has been keeping notes long before your mind started paying attention. On learning to listen.",
  "the-art-of-gentle-transitions": "How learning to pause between tasks can protect your energy and bring ease to your day.",
  "digital-minimalism-in-a-loud-world": "Practical ways to clear the digital noise and reclaim your attention for the things that matter.",
  "finding-ritual-in-the-kitchen": "How turning cooking into a sensory practice can ground you in the present moment.",
  "the-gentle-discipline-of-saying-no": "Saying no is not selfish. It is the boundary that allows your yes to have true meaning.",
  "cultivating-a-mindful-workspace": "Simple adjustments to your physical and mental environment to bring more peace to your work hours.",
  "the-art-of-doing-nothing": "Why rest is not laziness, and how learning to be still changed the way I move through my days.",
  "morning-rituals-that-anchor-me": "A simple sequence of small acts that turns the first hour of the day into something sacred.",
  "letting-go-of-perfect": "Perfectionism kept me busy but never at peace. Here is what happened when I stopped chasing it.",
  "the-quiet-power-of-a-slow-morning": "What happens when you stop rushing through the first hours of your day and let them unfold at their own pace.",
  "breathing-through-the-overwhelm": "When everything feels like too much, three breaths can change the entire shape of the moment.",
  "seasonal-living-as-practice": "Aligning your rhythms with the natural world is one of the gentlest forms of self-care I know.",
  "the-weight-of-being-available": "On the quiet exhaustion of a life with no boundaries between reachable and resting.",
  "what-i-mean-when-i-say-gentle": "Gentleness is not weakness. It is the strongest way I know to move through a hard world.",
  "learning-to-sit-with-discomfort": "The urge to fix, flee, or distract is strong. But some feelings just need a witness.",
  "the-myth-of-balance": "What if balance is not a state to achieve but a conversation to keep having with yourself?",
};

function buildEntries() {
  return ENTRY_ORDER.map((slug) => {
    const article = ARTICLES[slug];
    return {
      slug,
      title: article.title,
      excerpt: CARD_EXCERPTS[slug] || article.lead,
      category: article.category,
      image: CARD_IMAGES[slug] || "/images/journal-1.png",
      readingTime: getReadingTime(article.content),
      date: article.date,
      dateISO: article.dateISO,
    };
  });
}

function buildCollectionJsonLd(entries) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Journal",
    description:
      "Thoughts on mindful living, written from wherever I am in the journey.",
    url: "https://ninahealthy.com/journal",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: entries.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://ninahealthy.com/journal/${entry.slug}`,
        name: entry.title,
      })),
    },
  };
}

export default function JournalPage() {
  const entries = buildEntries();
  const collectionJsonLd = buildCollectionJsonLd(entries);

  return (
    <div className={styles.page}>
      <JsonLd data={collectionJsonLd} />
      <PageHero
        title="Journal"
        subtitle="Thoughts on mindful living, written from wherever I am in the journey."
      />

      <JournalFilter entries={entries} />
    </div>
  );
}
