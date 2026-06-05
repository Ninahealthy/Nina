"use client";
import styles from "./error.module.css";

export default function Error({ error, reset }) {
  return (
    <div className={styles.page}>
      <section className={styles.content} aria-label="Error">
        <div className={styles.iconWrapper} aria-hidden="true">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="30"
              cy="30"
              r="25"
              stroke="var(--color-sand)"
              strokeWidth="2"
            />
            <path
              d="M30 20V32"
              stroke="var(--color-terracotta)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="30" cy="38" r="1.5" fill="var(--color-terracotta)" />
          </svg>
        </div>
        <h1 className={styles.title}>Something went wrong</h1>
        <p className={styles.message}>
          A small hiccup in the quiet. Take a breath, and let us try again.
        </p>
        <button className={styles.retryButton} onClick={() => reset()}>
          Try again
        </button>
      </section>
    </div>
  );
}
