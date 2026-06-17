import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/siteConfig";
import styles from "./AuthorBio.module.css";

/**
 * Reusable author bio block for article footers.
 * Displays author photo, a short bio, and a link to the about page.
 */
const AuthorBio = () => {
  return (
    <div className={styles.authorBio}>
      <div className={styles.authorAvatar}>
        <Image
          src="/images/about-hero.png"
          alt={SITE.author.name}
          width={48}
          height={48}
          className={styles.authorImage}
        />
      </div>
      <div className={styles.authorInfo}>
        <p className={styles.authorName}>
          Written by {SITE.author.name}
        </p>
        <p className={styles.authorDescription}>
          Nina writes about attention, the body, and the quiet work of
          staying present. Her journal is honest practice, shared slowly.
        </p>
        <Link href="/about" className={styles.authorLink}>
          Read her story
        </Link>
      </div>
    </div>
  );
};

export default AuthorBio;
