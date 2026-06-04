import Link from "next/link";
import Image from "next/image";
import styles from "./Card.module.css";

const Card = ({ image, alt, title, excerpt, href, readingTime }) => {
  return (
    <article className={styles.card}>
      {image && (
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={alt || title}
            width={600}
            height={400}
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
          {href && (
            <Link href={href} className={styles.readMore}>
              Read more
            </Link>
          )}
          {readingTime && (
            <span className={styles.readingTime}>{readingTime} min read</span>
          )}
        </div>
      </div>
    </article>
  );
};

export default Card;
