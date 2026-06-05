"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./MeditationTimer.module.css";

const PRESETS = [
  { label: "3 min", seconds: 180 },
  { label: "5 min", seconds: 300 },
  { label: "10 min", seconds: 600 },
  { label: "15 min", seconds: 900 },
  { label: "20 min", seconds: 1200 },
];

const MeditationTimer = () => {
  const [selectedPreset, setSelectedPreset] = useState(1); // 5 min default
  const [timeLeft, setTimeLeft] = useState(PRESETS[1].seconds);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef(null);

  const totalSeconds = PRESETS[selectedPreset].seconds;

  const reset = useCallback(() => {
    setIsActive(false);
    setIsComplete(false);
    setTimeLeft(PRESETS[selectedPreset].seconds);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [selectedPreset]);

  const toggleTimer = useCallback(() => {
    if (isComplete) {
      reset();
      return;
    }
    setIsActive((prev) => !prev);
  }, [isComplete, reset]);

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          setIsComplete(true);
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  const handlePresetChange = (index) => {
    if (isActive) return;
    setSelectedPreset(index);
    setTimeLeft(PRESETS[index].seconds);
    setIsComplete(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;

  return (
    <div className={styles.timer} role="region" aria-label="Meditation timer">
      <div className={styles.presets} role="group" aria-label="Duration presets">
        {PRESETS.map((preset, i) => (
          <button
            key={preset.label}
            className={`${styles.presetButton} ${
              selectedPreset === i ? styles.presetActive : ""
            }`}
            onClick={() => handlePresetChange(i)}
            disabled={isActive}
            aria-pressed={selectedPreset === i}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className={styles.display}>
        <svg
          className={styles.progressRing}
          width="180"
          height="180"
          viewBox="0 0 180 180"
          aria-hidden="true"
        >
          <circle
            cx="90"
            cy="90"
            r="80"
            fill="none"
            stroke="var(--color-sand)"
            strokeWidth="3"
          />
          <circle
            cx="90"
            cy="90"
            r="80"
            fill="none"
            stroke="var(--color-sage)"
            strokeWidth="3"
            strokeDasharray={`${2 * Math.PI * 80}`}
            strokeDashoffset={`${2 * Math.PI * 80 * (1 - progress / 100)}`}
            strokeLinecap="round"
            transform="rotate(-90 90 90)"
            className={styles.progressCircle}
          />
        </svg>
        <div className={styles.timeDisplay} aria-live="polite">
          <span className={styles.time}>
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          {isComplete && (
            <span className={styles.completeText}>Session complete</span>
          )}
        </div>
      </div>

      <div className={styles.controls}>
        <button className={styles.controlButton} onClick={toggleTimer}>
          {isComplete ? "Reset" : isActive ? "Pause" : "Begin"}
        </button>
        {(isActive || timeLeft !== totalSeconds) && !isComplete && (
          <button
            className={styles.resetButton}
            onClick={reset}
            aria-label="Reset timer"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default MeditationTimer;
