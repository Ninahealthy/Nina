"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "./BreathPacer.module.css";

const PATTERNS = [
  {
    name: "Box Breathing",
    description:
      "Four counts in, hold, out, hold. A steady rhythm that may help ease the nervous system.",
    phases: [
      { label: "Breathe in", duration: 4000 },
      { label: "Hold", duration: 4000 },
      { label: "Breathe out", duration: 4000 },
      { label: "Hold", duration: 4000 },
    ],
  },
  {
    name: "4-7-8 Relaxing",
    description:
      "A longer exhale pattern that some find calming. If the hold feels too long, shorten it to what feels comfortable.",
    phases: [
      { label: "Breathe in", duration: 4000 },
      { label: "Hold", duration: 7000 },
      { label: "Breathe out", duration: 8000 },
    ],
  },
  {
    name: "Simple Awareness",
    description:
      "A gentle in-and-out rhythm. No holding, just following the breath. If this feels intense, return to your natural rhythm.",
    phases: [
      { label: "Breathe in", duration: 6000 },
      { label: "Breathe out", duration: 6000 },
    ],
  },
  {
    name: "Energizing",
    description:
      "A shorter, quicker rhythm. Try this when you want to feel more alert, and pause if you feel lightheaded.",
    phases: [
      { label: "Breathe in", duration: 3000 },
      { label: "Breathe out", duration: 3000 },
    ],
  },
];

const BreathPacer = () => {
  const [patternIndex, setPatternIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(4);

  const pattern = PATTERNS[patternIndex];
  const phases = pattern.phases;
  const currentPhase = phases[phaseIndex];

  const reset = useCallback(() => {
    setIsActive(false);
    setPhaseIndex(0);
    setCountdown(PATTERNS[patternIndex].phases[0].duration / 1000);
  }, [patternIndex]);

  const handlePatternChange = (index) => {
    if (isActive) reset();
    setPatternIndex(index);
    setPhaseIndex(0);
    setCountdown(PATTERNS[index].phases[0].duration / 1000);
  };

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setPhaseIndex((p) => {
            const next = (p + 1) % phases.length;
            return next;
          });
          return phases[(phaseIndex + 1) % phases.length].duration / 1000;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phaseIndex, phases]);

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
      <div
        className={styles.patternSelector}
        role="group"
        aria-label="Breathing pattern"
      >
        {PATTERNS.map((p, i) => (
          <button
            key={p.name}
            className={`${styles.patternButton} ${
              patternIndex === i ? styles.patternActive : ""
            }`}
            onClick={() => handlePatternChange(i)}
            aria-pressed={patternIndex === i}
          >
            {p.name}
          </button>
        ))}
      </div>

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
      <p className={styles.description}>{pattern.description}</p>
      <button
        className={styles.toggleButton}
        onClick={() => (isActive ? reset() : setIsActive(true))}
        aria-label={
          isActive ? "Stop breathing exercise" : "Start breathing exercise"
        }
      >
        {isActive ? "Pause" : "Begin"}
      </button>
    </div>
  );
};

export default BreathPacer;
