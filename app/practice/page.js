import SectionHeading from "../../components/SectionHeading/SectionHeading";
import Button from "../../components/Button/Button";
import styles from "./page.module.css";

export const metadata = {
  title: "Practice",
  description: "Simple mindfulness practices for everyday calm. Breathing exercises, morning rituals, and seasonal guides.",
};

const PRACTICES = [
  {
    title: "Morning Rituals",
    description:
      "Begin the day before the day begins. Small, intentional acts that set the tone for everything that follows.",
    items: [
      "A glass of water before anything else",
      "Five minutes of stillness, no screens",
      "Write down one intention for the day",
      "Step outside, even briefly, and feel the air",
    ],
  },
  {
    title: "Breathing Exercises",
    description:
      "The breath is always available. These simple practices take just a few minutes and can shift the entire shape of a moment.",
    items: [
      "Box breathing: inhale 4, hold 4, exhale 4, hold 4",
      "4-7-8 breath: inhale 4, hold 7, exhale 8",
      "Simple awareness: just notice each breath without changing it",
      "Three sighs: three deep exhales with an audible release",
    ],
  },
  {
    title: "Evening Wind-Down",
    description:
      "The way you end the day matters as much as how you begin it. Gentle practices for letting the day go.",
    items: [
      "Put screens away one hour before sleep",
      "Write three things you are grateful for",
      "A body scan: slowly relax from head to toe",
      "Read something that nourishes, not stimulates",
    ],
  },
  {
    title: "Seasonal Practices",
    description:
      "Align your energy with the natural rhythms of the world around you. Each season invites a different kind of attention.",
    items: [
      "Winter: rest more, reflect, turn inward",
      "Spring: plant seeds, begin gently, open up",
      "Summer: expand, connect, move freely",
      "Autumn: release, simplify, prepare",
    ],
  },
];

export default function PracticePage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Practice</h1>
        <p className={styles.heroSubtitle}>
          Mindfulness is not something you master. It is something you
          practice, gently, every day. Start wherever you are.
        </p>
      </section>

      <section className={styles.invitation}>
        <div className={styles.invitationCard}>
          <p className={styles.invitationLabel}>A moment before you begin</p>
          <p className={styles.invitationText}>
            Close your eyes. Take one full breath. Feel your feet on the
            ground. You are here. That is enough to start.
          </p>
        </div>
      </section>

      <section className={styles.practices}>
        <SectionHeading subtitle="Simple practices for everyday calm.">
          Ways to Begin
        </SectionHeading>
        <div className={styles.practiceGrid}>
          {PRACTICES.map((practice) => (
            <div key={practice.title} className={styles.practiceCard}>
              <h3 className={styles.practiceTitle}>{practice.title}</h3>
              <p className={styles.practiceDescription}>
                {practice.description}
              </p>
              <ul className={styles.practiceList}>
                {practice.items.map((item, i) => (
                  <li key={i} className={styles.practiceItem}>
                    <span className={styles.practiceItemIcon}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C12 17 7 14 7 9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9C17 14 12 17 12 22Z" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <p className={styles.ctaText}>
          Want to explore these ideas further? The journal has longer
          reflections on each of these practices.
        </p>
        <Button href="/journal">Read the Journal</Button>
      </section>
    </div>
  );
}
