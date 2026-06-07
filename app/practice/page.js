import { Suspense } from "react";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import Button from "@/components/Button/Button";
import BreathPacer from "@/components/BreathPacer/BreathPacer";
import MeditationTimer from "@/components/MeditationTimer/MeditationTimer";
import DailyIntention from "@/components/DailyIntention/DailyIntention";
import GroundingExercise from "@/components/GroundingExercise/GroundingExercise";
import {
  BreathPacerSkeleton,
  MeditationTimerSkeleton,
  DailyIntentionSkeleton,
  GroundingExerciseSkeleton,
} from "@/components/PracticeSkeleton/PracticeSkeleton";
import PageHero from "@/components/PageHero/PageHero";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import JsonLd from "@/components/JsonLd/JsonLd";
import { SITE } from "@/lib/siteConfig";
import styles from "./page.module.css";

export const metadata = {
  title: "Practice",
  description:
    "Simple mindfulness practices for everyday calm. Breathing exercises, meditation timer, grounding techniques, and morning rituals.",
  openGraph: {
    title: "Practice",
    description:
      "Simple mindfulness practices for everyday calm. Breathing exercises, meditation timer, grounding techniques, and morning rituals.",
    url: `${SITE.url}/practice`,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Nina Healthy mindfulness practices",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Practice",
    description:
      "Simple mindfulness practices for everyday calm. Breathing exercises, meditation timer, and grounding techniques.",
    images: ["/og-default.png"],
  },
  alternates: {
    canonical: `${SITE.url}/practice`,
  },
};

const PRACTICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Practice",
  description:
    "Simple mindfulness practices for everyday calm. Breathing exercises, meditation timer, grounding techniques, and morning rituals.",
  url: `${SITE.url}/practice`,
  specialty: "Mindfulness",
};

const BREATHING_HOWTO_JSONLD = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Practice Box Breathing for Calm",
  description:
    "A simple four-step breathing exercise that helps regulate your nervous system and bring you back to the present moment.",
  totalTime: "PT4M",
  supply: [],
  tool: [],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Inhale",
      text: "Breathe in slowly through your nose for 4 seconds, filling your lungs completely.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Hold",
      text: "Hold your breath gently for 4 seconds. Stay relaxed.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Exhale",
      text: "Breathe out slowly through your mouth for 4 seconds, releasing all the air.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Hold",
      text: "Hold your breath for 4 seconds before beginning the next cycle. Repeat for 3 to 5 minutes.",
    },
  ],
};

const GROUNDING_HOWTO_JSONLD = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "5-4-3-2-1 Grounding Exercise for Anxiety",
  description:
    "A sensory awareness technique that uses your five senses to anchor you in the present moment during moments of anxiety or overwhelm.",
  totalTime: "PT5M",
  supply: [],
  tool: [],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "See",
      text: "Name five things you can see around you right now.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Touch",
      text: "Name four things you can feel or touch, like the texture of your clothing or the chair beneath you.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Hear",
      text: "Name three things you can hear, such as distant traffic, birdsong, or the hum of a refrigerator.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Smell",
      text: "Name two things you can smell. If nothing is obvious, move closer to something like a candle, your sleeve, or a plant.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Taste",
      text: "Name one thing you can taste. Take a sip of water or notice the residual taste in your mouth.",
    },
  ],
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
      <JsonLd data={PRACTICE_JSONLD} />
      <JsonLd data={BREATHING_HOWTO_JSONLD} />
      <JsonLd data={GROUNDING_HOWTO_JSONLD} />
      <PageHero
        title="Practice"
        subtitle="Mindfulness is not something you master. It is something you practice, gently, every day. Start wherever you are."
      />

      <ScrollReveal>
        <section id="daily-intention" className={styles.intention} aria-label="Daily intention">
          <SectionHeading subtitle="A small anchor for your day.">
            Set Your Intention
          </SectionHeading>
          <Suspense fallback={<DailyIntentionSkeleton />}>
            <DailyIntention />
          </Suspense>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section
          id="grounding-exercise"
          className={styles.groundingSection}
          aria-label="Grounding exercise"
        >
          <SectionHeading subtitle="A gentle return to the present moment through your five senses.">
            Ground Yourself
          </SectionHeading>
          <Suspense fallback={<GroundingExerciseSkeleton />}>
            <GroundingExercise />
          </Suspense>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section
          id="breath-pacer"
          className={styles.breathPacerSection}
          aria-label="Breathing exercise"
        >
          <SectionHeading subtitle="Follow the circle. If comfortable, let your eyes soften or close. Let your breath find its rhythm.">
            Breathe With Me
          </SectionHeading>
          <Suspense fallback={<BreathPacerSkeleton />}>
            <BreathPacer />
          </Suspense>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section
          id="meditation-timer"
          className={styles.timerSection}
          aria-label="Meditation timer"
        >
          <SectionHeading subtitle="Choose a duration. Sit quietly. If it feels intense, feel free to return to your natural rhythm at any time.">
            Meditation Timer
          </SectionHeading>
          <Suspense fallback={<MeditationTimerSkeleton />}>
            <MeditationTimer />
          </Suspense>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section
          id="ways-to-begin"
          className={styles.practices}
          aria-label="Mindfulness practices"
        >
          <SectionHeading subtitle="Simple practices for everyday calm. Try what resonates; leave what does not.">
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
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 22C12 17 7 14 7 9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9C17 14 12 17 12 22Z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
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
      </ScrollReveal>

      <section className={styles.cta} aria-label="Call to action">
        <p className={styles.ctaText}>
          Want to explore these ideas further? The journal has longer
          reflections on each of these practices.
        </p>
        <Button href="/journal">Read the Journal</Button>
      </section>
    </div>
  );
}
