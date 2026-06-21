import Link from "next/link";
import JsonLd from "@/components/JsonLd/JsonLd";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import PageHero from "@/components/PageHero/PageHero";
import NewsletterSignup from "@/components/NewsletterSignup/NewsletterSignup";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import { SITE } from "@/lib/siteConfig";
import { getEpisodeList, getLatestEpisode } from "@/lib/episodes";
import { ARTICLES } from "@/lib/articles";
import { CARD_EXCERPTS } from "@/lib/cardExcerpts";
import styles from "./page.module.css";

export const metadata = {
  title: "Listen | Audio Essays",
  description:
    "Hear select journal essays read aloud by the author. A slower way to take in words about attention, the body, and what it means to stay present.",
  openGraph: {
    title: "Listen | Audio Essays by Nina",
    description:
      "Hear select journal essays read aloud by the author. A slower way to take in words about attention, the body, and what it means to stay present.",
    url: `${SITE.url}/listen`,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Nina audio essays, read aloud by the author",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Listen | Audio Essays by Nina",
    description:
      "Select journal essays read aloud by the author. Attention, the body, and staying present.",
    images: ["/og-default.png"],
  },
  alternates: {
    canonical: `${SITE.url}/listen`,
  },
};

const PODCAST_JSONLD = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  name: "Nina",
  description:
    "Select journal essays read aloud by the author. A slower way to take in words about attention, the body, and what it means to stay present.",
  url: `${SITE.url}/listen`,
  author: {
    "@type": "Person",
    "@id": SITE.entityIds.author,
    name: "Nina",
  },
  webFeed: `${SITE.url}/feed/podcast.xml`,
};

export default function ListenPage() {
  const episodes = getEpisodeList();
  const latest = getLatestEpisode();

  return (
    <div className={styles.page}>
      <JsonLd data={PODCAST_JSONLD} />

      <PageHero
        title="Listen"
        subtitle="Select essays, read aloud. The same words, but slower, and with breath between them."
      />

      {/* Featured / latest episode */}
      {latest && (
        <ScrollReveal>
          <section
            className={styles.featured}
            aria-label="Featured episode"
          >
            <div className={styles.featuredLabel}>Latest Episode</div>
            <AudioPlayer
              src={latest.audioUrl}
              title={latest.title}
              duration={latest.duration}
              variant="full"
              episodeNumber={String(latest.episodeNumber)}
            />
            <p className={styles.featuredDescription}>
              {latest.description}
            </p>
            {ARTICLES[latest.slug] && (
              <Link
                href={`/journal/${latest.slug}`}
                className={styles.readLink}
              >
                Read the written essay
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </section>
        </ScrollReveal>
      )}

      {/* Episode grid */}
      {episodes.length > 0 && (
        <ScrollReveal>
          <section
            className={styles.episodes}
            aria-label="All episodes"
          >
            <h2 className={styles.sectionTitle}>All Episodes</h2>
            <div className={styles.episodeGrid}>
              {episodes.map((ep) => (
                <div key={ep.slug} className={styles.episodeCard}>
                  <div className={styles.episodeHeader}>
                    <span className={styles.episodeNumber}>
                      {String(ep.episodeNumber).padStart(2, "0")}
                    </span>
                    <span className={styles.episodeDuration}>
                      {ep.duration}
                    </span>
                  </div>
                  <h3 className={styles.episodeTitle}>{ep.title}</h3>
                  <p className={styles.episodeDescription}>
                    {CARD_EXCERPTS[ep.slug] || ep.description}
                  </p>
                  <AudioPlayer
                    src={ep.audioUrl}
                    title={ep.title}
                    duration={ep.duration}
                    variant="mini"
                  />
                  {ARTICLES[ep.slug] && (
                    <Link
                      href={`/journal/${ep.slug}`}
                      className={styles.episodeReadLink}
                    >
                      Read essay
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* Empty state */}
      {episodes.length === 0 && (
        <section className={styles.emptyState} aria-label="Coming soon">
          <p className={styles.emptyText}>
            Audio essays are coming soon. Each one will be a journal essay,
            read aloud, at the pace of breath.
          </p>
        </section>
      )}

      {/* Subscribe to podcast */}
      <ScrollReveal>
        <section className={styles.subscribe} aria-label="Subscribe to podcast">
          <h2 className={styles.sectionTitle}>Subscribe</h2>
          <p className={styles.subscribeText}>
            Listen wherever you prefer. The same essays, carried by voice
            instead of screen.
          </p>
          <div className={styles.subscribeLinks}>
            <a
              href={`${SITE.url}/feed/podcast.xml`}
              className={styles.subscribeButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="6.18" cy="17.82" r="2.18" />
                <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56z" />
                <path d="M4 10.1v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
              </svg>
              RSS Feed
            </a>
          </div>
          <p className={styles.subscribeNote}>
            Apple Podcasts and Spotify directories coming once recordings are
            published.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className={styles.newsletter} aria-label="Newsletter signup">
          <NewsletterSignup headingLevel="h2" />
        </section>
      </ScrollReveal>
    </div>
  );
}
