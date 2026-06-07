import styles from "./PracticeSkeleton.module.css";

/**
 * Skeleton loading placeholders for practice page interactive tools.
 * Used as Suspense fallback while client components hydrate.
 */

/** Skeleton for the BreathPacer component (tabs + circle + button) */
export function BreathPacerSkeleton() {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      <div className={styles.skeletonTabs}>
        <div className={styles.skeletonTab} />
        <div className={styles.skeletonTab} />
        <div className={styles.skeletonTab} />
        <div className={styles.skeletonTab} />
      </div>
      <div className={styles.skeletonCircle} />
      <div className={styles.skeletonText} />
      <div className={styles.skeletonButton} />
    </div>
  );
}

/** Skeleton for the MeditationTimer component (duration grid + button) */
export function MeditationTimerSkeleton() {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      <div className={styles.skeletonTimerGrid}>
        <div className={styles.skeletonTimerOption} />
        <div className={styles.skeletonTimerOption} />
        <div className={styles.skeletonTimerOption} />
        <div className={styles.skeletonTimerOption} />
        <div className={styles.skeletonTimerOption} />
      </div>
      <div className={styles.skeletonButton} />
    </div>
  );
}

/** Skeleton for the GroundingExercise component (step cards) */
export function GroundingExerciseSkeleton() {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      <div className={styles.skeletonSteps}>
        <div className={styles.skeletonStep} />
        <div className={styles.skeletonStep} />
        <div className={styles.skeletonStep} />
        <div className={styles.skeletonStep} />
        <div className={styles.skeletonStep} />
      </div>
      <div className={styles.skeletonButton} />
    </div>
  );
}

/** Skeleton for the DailyIntention component (text + button) */
export function DailyIntentionSkeleton() {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      <div className={styles.skeletonText} style={{ width: "80%" }} />
      <div className={styles.skeletonText} style={{ width: "60%" }} />
      <div className={styles.skeletonButton} />
    </div>
  );
}
