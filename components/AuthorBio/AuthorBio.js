import Link from "next/link";
import { SITE } from "@/lib/siteConfig";
import styles from "./AuthorBio.module.css";

/**
 * Reusable author bio block for article footers.
 * Displays author name, a short bio, and a link to the about page.
 */
const AuthorBio = () => {
  return (
    <div className={styles.authorBio}>
      <div className={styles.authorAvatar} aria-hidden="true">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="24"
            cy="24"
            r="22"
            stroke="var(--color-sand)"
            strokeWidth="1.5"
          />
          <circle
            cx="24"
            cy="18"
            r="7"
            stroke="var(--color-sage)"
            strokeWidth="1.5"
          />
          <path
            d="M10 40C10 34 16 30 24 30C32 30 38 34 38 40"
            stroke="var(--color-sage)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className={styles.authorInfo}>
        <p className={styles.authorName}>
          Written by {SITE.author.name}
        </p>
        <p className={styles.authorDescription}>
          A seeker of stillness sharing reflections on mindfulness,
          intentional living, and the quiet art of paying attention.
        </p>
        <Link href="/about" className={styles.authorLink}>
          More about {SITE.author.name}
        </Link>
      </div>
    </div>
  );
};

export default AuthorBio;
