"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import BrandMark from "@/components/BrandMark/BrandMark";
import styles from "./AudioPlayer.module.css";

/**
 * Format seconds into mm:ss display string.
 * @param {number} seconds
 * @returns {string}
 */
function formatTime(seconds) {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5];

/**
 * AudioPlayer wraps the native <audio> element with a custom UI.
 *
 * Two variants:
 * - "full": Used on the Listen page for the active episode.
 * - "mini": Used inline on article pages.
 *
 * @param {Object} props
 * @param {string} props.src - Audio file URL
 * @param {string} props.title - Episode/essay title
 * @param {string} props.duration - Human-readable duration (e.g., "6:42")
 * @param {"full"|"mini"} [props.variant="full"]
 * @param {string} [props.episodeNumber] - Episode number for full variant
 */
const AudioPlayer = ({
  src,
  title,
  duration,
  variant = "full",
  episodeNumber,
}) => {
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        // Autoplay blocked; silently handle
      });
    }
  }, [isPlaying]);

  const skip = useCallback((seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(
      0,
      Math.min(audio.currentTime + seconds, audio.duration)
    );
  }, []);

  const cycleSpeed = useCallback(() => {
    setSpeed((prev) => {
      const idx = SPEED_OPTIONS.indexOf(prev);
      const next = SPEED_OPTIONS[(idx + 1) % SPEED_OPTIONS.length];
      if (audioRef.current) audioRef.current.playbackRate = next;
      return next;
    });
  }, []);

  const handleProgressClick = useCallback((e) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar) return;

    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
  }, []);

  // Keyboard controls
  const handleKeyDown = useCallback(
    (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowRight":
          e.preventDefault();
          skip(15);
          break;
        case "ArrowLeft":
          e.preventDefault();
          skip(-15);
          break;
        default:
          break;
      }
    },
    [togglePlay, skip]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      setTotalDuration(audio.duration);
      setIsLoaded(true);
    };
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;
  const isMini = variant === "mini";

  return (
    <div
      className={`${styles.player} ${isMini ? styles.mini : styles.full}`}
      role="region"
      aria-label={`Audio player: ${title}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Hidden native audio element */}
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Play/Pause button */}
      <button
        className={styles.playButton}
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Play"}
        type="button"
      >
        {isPlaying ? (
          <motion.div
            className={styles.playIcon}
            animate={shouldReduceMotion ? {} : { scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          </motion.div>
        ) : (
          <div className={styles.playIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36A1 1 0 008 5.14z" />
            </svg>
          </div>
        )}
      </button>

      {/* Info + controls */}
      <div className={styles.content}>
        {/* Title row */}
        <div className={styles.titleRow}>
          {!isMini && episodeNumber && (
            <span className={styles.episodeLabel}>
              Episode {episodeNumber}
            </span>
          )}
          <span className={styles.title}>{title}</span>
        </div>

        {/* Progress bar */}
        <div
          className={styles.progressBar}
          ref={progressRef}
          onClick={handleProgressClick}
          role="slider"
          aria-label="Audio progress"
          aria-valuenow={Math.round(currentTime)}
          aria-valuemin={0}
          aria-valuemax={Math.round(totalDuration)}
          tabIndex={0}
        >
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
          <div
            className={styles.progressHandle}
            style={{ left: `${progress}%` }}
          />
        </div>

        {/* Time + controls row */}
        <div className={styles.controlsRow}>
          <span className={styles.time}>
            {formatTime(currentTime)} / {isLoaded ? formatTime(totalDuration) : duration}
          </span>

          {!isMini && (
            <div className={styles.secondaryControls}>
              <button
                className={styles.skipButton}
                onClick={() => skip(-15)}
                aria-label="Rewind 15 seconds"
                type="button"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 4v6h6" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
                <span className={styles.skipLabel}>15</span>
              </button>

              <button
                className={styles.skipButton}
                onClick={() => skip(15)}
                aria-label="Forward 15 seconds"
                type="button"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 4v6h-6" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                <span className={styles.skipLabel}>15</span>
              </button>

              <button
                className={styles.speedButton}
                onClick={cycleSpeed}
                aria-label={`Playback speed: ${speed}x`}
                type="button"
              >
                {speed}x
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
