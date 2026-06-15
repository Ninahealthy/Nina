import { ARTICLES } from "@/lib/articles";
import { CARD_IMAGES } from "@/lib/cardImages";
import { CARD_EXCERPTS } from "@/lib/cardExcerpts";
import { ENTRY_ORDER } from "@/lib/entryOrder";
import { SITE } from "@/lib/siteConfig";
import JournalFilter from "@/components/JournalFilter/JournalFilter";
import PageHero from "@/components/PageHero/PageHero";
import JournalSearchBar from "@/components/JournalSearchBar/JournalSearchBar";
import JsonLd from "@/components/JsonLd/JsonLd";
import { getReadingTime } from "@/lib/readingTime";
import styles from "./page.module.css";

export const metadata = {
  title: "Journal",
  description:
    "Explore reflections on mindfulness, intentional living, and inner wellness. Personal essays on breathing, routine, grief, and the practice of slowing down.",
  openGraph: {
    title: "Journal",
    description:
      "Explore reflections on mindfulness, intentional living, and inner wellness. Personal essays on breathing, routine, grief, and the practice of slowing down.",
    url: `${SITE.url}/journal`,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Nina Healthy journal, reflections on mindful living",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Journal",
    description:
      "Explore reflections on mindfulness, intentional living, and inner wellness. Personal essays on breathing, routine, grief, and the practice of slowing down.",
    images: ["/og-default.png"],
  },
  alternates: {
    canonical: `${SITE.url}/journal`,
  },
};

/**
 * Card-level entries derived from the full articles.
 * This runs on the server; only the lightweight card data
 * is serialized and passed to the JournalFilter client component.
 */
function buildEntries() {
  return ENTRY_ORDER
    .filter((slug) => {
      if (!ARTICLES[slug]) {
        if (process.env.NODE_ENV === "development") {
          console.warn(`ENTRY_ORDER contains slug "${slug}" but no matching article exists.`);
        }
        return false;
      }
      return true;
    })
    .map((slug) => {
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
    url: `${SITE.url}/journal`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: entries.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE.url}/journal/${entry.slug}`,
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

      <JournalSearchBar />

      <JournalFilter entries={entries} />
    </div>
  );
}
