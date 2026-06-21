import { READING_PATHS } from "@/lib/readingPaths";
import { ARTICLES } from "@/lib/articles";
import { CARD_IMAGES } from "@/lib/cardImages";
import { SITE } from "@/lib/siteConfig";
import { getReadingTime } from "@/lib/readingTime";
import ReadingPaths from "@/components/ReadingPaths/ReadingPaths";
import PageHero from "@/components/PageHero/PageHero";
import JsonLd from "@/components/JsonLd/JsonLd";
import styles from "./page.module.css";

export const metadata = {
  title: "Start Here",
  description:
    "Not sure where to begin? Four curated reading paths guide you through " +
    "somatic attention, embodiment, sitting with difficulty, and the quiet " +
    "architecture of daily life.",
  openGraph: {
    title: "Start Here",
    description:
      "Not sure where to begin? Four curated reading paths guide you through " +
      "somatic attention, embodiment, sitting with difficulty, and the quiet " +
      "architecture of daily life.",
    url: `${SITE.url}/start-here`,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Nina, curated reading paths for mindful living",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Start Here",
    description:
      "Not sure where to begin? Four curated reading paths guide you through " +
      "somatic attention, embodiment, sitting with difficulty, and the quiet " +
      "architecture of daily life.",
    images: ["/og-default.png"],
  },
  alternates: {
    canonical: `${SITE.url}/start-here`,
  },
};

/**
 * Resolves reading path slugs into article card data
 * for the client-side ReadingPaths component.
 */
function buildPathsWithArticles() {
  return READING_PATHS.map((path) => ({
    id: path.id,
    title: path.title,
    subtitle: path.subtitle,
    description: path.description,
    articles: path.slugs
      .filter((slug) => {
        if (!ARTICLES[slug]) {
          if (process.env.NODE_ENV === "development") {
            console.warn(
              `Reading path "${path.id}" references slug "${slug}" but no matching article exists.`
            );
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
          category: article.category,
          readingTime: getReadingTime(article.content),
          image: CARD_IMAGES[slug] || "/images/journal-1.png",
        };
      }),
  }));
}

function buildPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Start Here: Curated Reading Paths",
    description:
      "Four curated reading paths guide you through somatic attention, " +
      "embodiment, sitting with difficulty, and the quiet architecture of daily life.",
    url: `${SITE.url}/start-here`,
    author: {
      "@type": "Person",
      name: SITE.author.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

function buildBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Start Here",
        item: `${SITE.url}/start-here`,
      },
    ],
  };
}

export default function StartHerePage() {
  const paths = buildPathsWithArticles();

  return (
    <div className={styles.page}>
      <JsonLd data={buildPageJsonLd()} />
      <JsonLd data={buildBreadcrumbJsonLd()} />
      <PageHero
        title="Start Here"
        subtitle="Not sure where to begin? These reading paths are a good place to settle in."
      />
      <section className={styles.content} aria-label="Reading paths">
        <ReadingPaths paths={paths} />
      </section>
    </div>
  );
}
