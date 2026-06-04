"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "./BreathPacer.module.css";

const PHASES = [
  { label: "Breathe in", duration: 4000 },
  { label: "Hold", duration: 4000 },
  { label: "Breathe out", duration: 4000 },
  { label: "Hold", duration: 4000 },
];

const BreathPacer = () => {
  const [isActive, setIsActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(4);

  const currentPhase = PHASES[phaseIndex];

  const reset = useCallback(() => {
    setIsActive(false);
    setPhaseIndex(0);
    setCountdown(4);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setPhaseIndex((p) => (p + 1) % PHASES.length);
          return PHASES[(phaseIndex + 1) % PHASES.length].duration / 1000;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phaseIndex]);

  useEffect(() => {
    if (isActive) {
      setCountdown(currentPhase.duration / 1000);
    }
  }, [phaseIndex, isActive, currentPhase.duration]);

  const getCircleScale = () => {
    if (!isActive) return "scale(0.6)";
    if (currentPhase.label === "Breathe in") return "scale(1)";
    if (currentPhase.label === "Breathe out") return "scale(0.6)";
    return phaseIndex === 1 ? "scale(1)" : "scale(0.6)";
  };

  return (
    <div className={styles.pacer} role="region" aria-label="Breathing exercise">
      <div className={styles.circleContainer}>
        <div
          className={styles.circle}
          style={{ transform: getCircleScale() }}
          aria-hidden="true"
        >
          <div className={styles.circleInner} />
        </div>
        <div className={styles.circleLabel} aria-live="polite">
          {isActive ? (
            <>
              <span className={styles.phaseText}>{currentPhase.label}</span>
              <span className={styles.countdownText}>{countdown}</span>
            </>
          ) : (
            <span className={styles.phaseText}>Ready</span>
          )}
        </div>
      </div>
      <p className={styles.description}>
        Box breathing: four counts in, hold, out, hold. A simple rhythm to calm the nervous system.
      </p>
      <button
        className={styles.toggleButton}
        onClick={() => (isActive ? reset() : setIsActive(true))}
        aria-label={isActive ? "Stop breathing exercise" : "Start breathing exercise"}
      >
        {isActive ? "Pause" : "Begin"}
      </button>
    </div>
  );
};

export default BreathPacer;
