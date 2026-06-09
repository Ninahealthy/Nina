"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import styles from "./GroundingExercise.module.css";

const STEPS = [
  {
    sense: "See",
    count: 5,
    instruction: "Look around and name five things you can see right now.",
    detail: "A color on the wall, the shape of a shadow, light on a surface.",
  },
  {
    sense: "Touch",
    count: 4,
    instruction: "Notice four things you can physically feel.",
    detail:
      "The fabric on your skin, the temperature of the air, the weight of your hands.",
  },
  {
    sense: "Hear",
    count: 3,
    instruction: "Listen for three sounds around you.",
    detail:
      "A distant hum, the rhythm of your own breathing, something you usually filter out.",
  },
  {
    sense: "Smell",
    count: 2,
    instruction: "Notice two things you can smell.",
    detail:
      "The air itself, something nearby. If nothing comes, bring your wrist close and breathe.",
  },
  {
    sense: "Taste",
    count: 1,
    instruction: "Notice one thing you can taste.",
    detail:
      "The inside of your mouth, the echo of your last sip. Just one small awareness.",
  },
];

const GroundingExercise = () => {
  const [currentStep, setCurrentStep] = useState(-1); // -1 = intro
  const [isComplete, setIsComplete] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleStart = () => setCurrentStep(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(-1);
    setIsComplete(false);
  };

  const step = currentStep >= 0 ? STEPS[currentStep] : null;
  const progress =
    currentStep >= 0 ? ((currentStep + 1) / STEPS.length) * 100 : 0;

  return (
    <div
      className={styles.wrapper}
      role="region"
      aria-label="Guided grounding exercise"
    >
      <div className={styles.card}>
        <AnimatePresence mode="wait">
          {currentStep === -1 && !isComplete && (
            <motion.div
              key="intro"
              className={styles.intro}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <h3 className={styles.introTitle}>5-4-3-2-1 Grounding</h3>
              <p className={styles.introText}>
                A gentle exercise that brings you back to the present moment
                through your five senses. It takes just a few minutes.
              </p>
              <button className={styles.startButton} onClick={handleStart}>
                Begin
              </button>
            </motion.div>
          )}

          {step && !isComplete && (
            <motion.div
              key={`step-${currentStep}`}
              className={styles.stepContent}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className={styles.progressBar}>
                <motion.div
                  className={styles.progressFill}
                  initial={shouldReduceMotion ? false : { width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
              <span className={styles.stepLabel}>
                {step.count} thing{step.count > 1 ? "s" : ""} you can{" "}
                <strong>{step.sense.toLowerCase()}</strong>
              </span>
              <p className={styles.stepInstruction}>{step.instruction}</p>
              <p className={styles.stepDetail}>{step.detail}</p>
              <button className={styles.nextButton} onClick={handleNext}>
                {currentStep < STEPS.length - 1
                  ? "Next sense"
                  : "Complete"}
              </button>
            </motion.div>
          )}

          {isComplete && (
            <motion.div
              key="complete"
              className={styles.complete}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 22C12 17 7 14 7 9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9C17 14 12 17 12 22Z"
                  stroke="var(--color-sage)"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 4V2"
                  stroke="var(--color-sage)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <p className={styles.completeText}>
                You are here. You are present. That is enough.
              </p>
              <button className={styles.resetButton} onClick={handleReset}>
                Start again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GroundingExercise;
