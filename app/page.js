import SectionHeading from "../components/SectionHeading/SectionHeading";
import Card from "../components/Card/Card";
import Button from "../components/Button/Button";
import NewsletterSignup from "../components/NewsletterSignup/NewsletterSignup";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Finding peace in the everyday</h1>
          <p className={styles.heroSubtitle}>
            A personal space for slowing down, breathing deeper,
            and living with more intention. Welcome to Nina Healthy.
          </p>
          <Button href="/practice">Begin the journey</Button>
        </div>
        <div className={styles.heroImageWrapper}>
          <div className={styles.heroImagePlaceholder}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C12 17 7 14 7 9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9C17 14 12 17 12 22Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 4V2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </section>

      <section className={styles.philosophy}>
        <div className={styles.philosophyCard}>
          <h2 className={styles.philosophyTitle}>
            What does healthy really mean?
          </h2>
          <p className={styles.philosophyText}>
            For me, healthy has never been about diets or routines. It is about
            the quiet moments between the noise. The deep breath before you
            respond. The choice to be present instead of productive. Nina
            Healthy is a space where inner wellness comes first -- where mental
            clarity, calm, and intentional living are the foundation of a
            good life.
          </p>
        </div>
      </section>

      <section className={styles.featured}>
        <SectionHeading subtitle="Reflections on mindful living, one thought at a time.">
          From the Journal
        </SectionHeading>
        <div className={styles.cardGrid}>
          <Card
            image="/images/journal-1.jpg"
            title="The Art of Doing Nothing"
            excerpt="Why rest is not laziness, and how learning to be still changed the way I move through my days."
            href="/journal/the-art-of-doing-nothing"
          />
          <Card
            image="/images/journal-2.jpg"
            title="Morning Rituals That Anchor Me"
            excerpt="A simple sequence of small acts that turns the first hour of the day into something sacred."
            href="/journal/morning-rituals-that-anchor-me"
          />
          <Card
            image="/images/journal-3.jpg"
            title="Letting Go of Perfect"
            excerpt="Perfectionism kept me busy but never at peace. Here is what happened when I stopped chasing it."
            href="/journal/letting-go-of-perfect"
          />
        </div>
      </section>

      <section className={styles.practiceTeaser}>
        <div className={styles.practiceTeaserCard}>
          <p className={styles.practiceLabel}>Today's invitation</p>
          <p className={styles.practiceQuote}>
            Take three slow breaths before your next task.
            Let each exhale carry something you no longer need.
          </p>
          <Button href="/practice" variant="secondary">
            Explore practices
          </Button>
        </div>
      </section>

      <section className={styles.newsletter}>
        <NewsletterSignup />
      </section>
    </div>
  );
}
