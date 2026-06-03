import styles from "./page.module.css";

export const metadata = {
  title: "About",
  description: "Meet Nina and learn about her journey to mindfulness and intentional living.",
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <div className={styles.heroImagePlaceholder}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1" />
              <path d="M5 20C5 17.2386 8.13401 15 12 15C15.866 15 19 17.2386 19 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <h1 className={styles.heroTitle}>Hi, I'm Nina</h1>
        <p className={styles.heroSubtitle}>
          A seeker of stillness in a world that never stops moving.
        </p>
      </section>

      <section className={styles.story}>
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

      <section className={styles.philosophy}>
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

      <section className={styles.closing}>
        <p className={styles.closingText}>
          I am not a doctor, a therapist, or a guru. I am someone who found
          peace through small, daily acts of attention and I believe you can
          too. Thank you for being here.
        </p>
      </section>
    </div>
  );
}
