import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className={styles.page}>
      <section className={styles.content} aria-label="Page not found">
        <div className={styles.iconWrapper} aria-hidden="true">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="var(--color-sand)"
              strokeWidth="2"
            />
            <path
              d="M40 70C40 55 28 48 28 35C28 28.3726 33.3726 23 40 23C46.6274 23 52 28.3726 52 35C52 48 40 55 40 70Z"
              stroke="var(--color-sage)"
              strokeWidth="2"
            />
            <path
              d="M40 23V18"
              stroke="var(--color-sage)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h1 className={styles.title}>This page does not exist</h1>
        <p className={styles.message}>
          Perhaps the path you are looking for has moved, or maybe it was never
          here to begin with. Either way, there are plenty of gentle places to
          land.
        </p>
        <div className={styles.links}>
          <Link href="/" className={styles.primaryLink}>
            Go Home
          </Link>
          <Link href="/journal" className={styles.secondaryLink}>
            Read the Journal
          </Link>
        </div>
      </section>
    </div>
  );
}
