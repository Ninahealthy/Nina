import Link from "next/link";
import Image from "next/image";
import styles from "./Card.module.css";

/**
 * Card component for journal article previews.
 * Uses a stretched-link pattern: the title link's ::after pseudo-element
 * covers the entire card surface, making the full card clickable via a
 * single accessible link. No redundant secondary links.
 */
const Card = ({ image, alt, title, excerpt, href, readingTime, date, dateISO }) => {
  return (
    <article className={styles.card}>
      {image && (
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={alt || title}
            width={600}
            height={400}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.content}>
        <h3 className={styles.title}>
          {href ? (
            <Link href={href} className={styles.titleLink}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        {excerpt && <p className={styles.excerpt}>{excerpt}</p>}
        <div className={styles.cardFooter}>
          <div className={styles.cardMeta}>
            {date && (
              <time className={styles.date} dateTime={dateISO || undefined}>{date}</time>
            )}
            {readingTime && (
              <span className={styles.readingTime}>{readingTime} min read</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
