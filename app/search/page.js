import PageHero from "@/components/PageHero/PageHero";
import { SITE } from "@/lib/siteConfig";
import Script from "next/script";
import styles from "./page.module.css";

export const metadata = {
  title: "Search",
  description:
    "Search Nina Healthy for articles on mindfulness, intentional living, breathing exercises, and inner wellness.",
  openGraph: {
    title: "Search",
    description:
      "Search Nina Healthy for articles on mindfulness, intentional living, breathing exercises, and inner wellness.",
    url: `${SITE.url}/search`,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Search Nina Healthy",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Search",
    description:
      "Search Nina Healthy for articles on mindfulness, intentional living, and inner wellness.",
  },
  alternates: {
    canonical: `${SITE.url}/search`,
  },
};

/**
 * Search page powered by Google Programmable Search Engine.
 * Results render inline via the gcse-searchresults-only widget,
 * which only shows results (no search box; the query comes from
 * the page's own input or URL parameter).
 */
export default function SearchPage() {
  return (
    <div className={styles.page}>
      <PageHero
        title="Search"
        subtitle="Find reflections, practices, and ideas across the journal."
      />

      <section className={styles.searchSection} aria-label="Search results">
        <div className={styles.searchContainer}>
          <div className="gcse-searchbox-only" data-resultsurl="/search" data-newwindow="false" data-queryparametername="q"></div>
          <div className="gcse-searchresults-only"></div>
        </div>
      </section>

      <Script
        src="https://cse.google.com/cse.js?cx=763af41fbeba0fc8e"
        strategy="afterInteractive"
      />
    </div>
  );
}
