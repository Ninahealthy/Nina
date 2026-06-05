import Link from "next/link";
import Image from "next/image";
import styles from "./Card.module.css";

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
          {href && (
            <Link
              href={href}
              className={styles.readMore}
              aria-hidden="true"
              tabIndex={-1}
            >
              Read more
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default Card;
