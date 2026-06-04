import Image from "next/image";
import JsonLd from "@/components/JsonLd/JsonLd";
import styles from "./page.module.css";

export const metadata = {
  title: "About",
  description:
    "Meet Nina and learn about her journey to mindfulness and intentional living.",
  openGraph: {
    title: "About Nina",
    description:
      "Meet Nina and learn about her journey to mindfulness and intentional living.",
    url: "https://ninahealthy.com/about",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "About Nina, a mindfulness and intentional living guide",
      },
    ],
  },
  alternates: {
    canonical: "https://ninahealthy.com/about",
  },
};

const PERSON_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nina",
  description:
    "A seeker of stillness in a world that never stops moving. Sharing reflections on mindfulness and intentional living.",
  url: "https://ninahealthy.com/about",
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={PERSON_JSONLD} />
      <section className={styles.hero} aria-label="About Nina">
        <div className={styles.heroImageWrapper}>
          <Image
            src="/images/about-hero.png"
            alt="Nina, a wellness guide with a warm and peaceful expression"
            fill
            sizes="(max-width: 768px) 180px, 220px"
            priority
            className={styles.heroImage}
          />
        </div>
        <h1 className={styles.heroTitle}>Hi, I'm Nina</h1>
        <p className={styles.heroSubtitle}>
          A seeker of stillness in a world that never stops moving.
        </p>
      </section>

      <section className={styles.story} aria-label="My story">
        <h2 className={styles.sectionTitle}>My Story</h2>
        <div className={styles.storyContent}>
          <p>
            For years, I chased the version of life everyone told me was right.
            Busy schedules, constant productivity, never enough time. I was
            always moving, always doing, but rarely feeling present.
          </p>
          <p>
            The shift came quietly. Not through a dramatic moment, but through
            small, repeated choices to slow down. I started paying attention to
            my breath. I let mornings be slow. I stopped filling silence with
            noise.
          </p>
          <p>
            Nina Healthy grew from those small choices. It is not a program or
            a prescription. It is an open invitation to explore what peace looks
            like in your own life. I share what I have learned, what I am still
            learning, and what helps me stay grounded when the world feels
            heavy.
          </p>
        </div>
      </section>

      <section className={styles.philosophy} aria-label="Values">
        <h2 className={styles.sectionTitle}>What Healthy Means Here</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <h3 className={styles.valueTitle}>Inner Wellness</h3>
            <p className={styles.valueText}>
              Health starts within. Mental clarity, emotional balance, and a
              calm mind are the foundation everything else rests on.
            </p>
          </div>
          <div className={styles.valueCard}>
            <h3 className={styles.valueTitle}>Intentional Living</h3>
            <p className={styles.valueText}>
              Not doing more, but doing what matters. Making choices that align
              with who you are and who you want to become.
            </p>
          </div>
          <div className={styles.valueCard}>
            <h3 className={styles.valueTitle}>Gentle Practice</h3>
            <p className={styles.valueText}>
              No perfection required. Mindfulness is a practice, not a
              performance. Show up as you are and start from there.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.closing} aria-label="Closing note">
        <p className={styles.closingText}>
          I am not a doctor, a therapist, or a guru. I am someone who found
          peace through small, daily acts of attention and I believe you can
          too. Thank you for being here.
        </p>
      </section>
    </div>
  );
}
