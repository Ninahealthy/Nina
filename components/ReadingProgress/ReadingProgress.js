"use client";
import { useState, useEffect } from "react";
import styles from "./ReadingProgress.module.css";

/**
 * Thin progress bar at the top of the viewport that fills as the user
 * scrolls through article content.
 */
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.track} role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Reading progress">
      <div className={styles.fill} style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ReadingProgress;
