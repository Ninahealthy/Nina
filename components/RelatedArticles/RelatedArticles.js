import Link from "next/link";
import Image from "next/image";
import styles from "./RelatedArticles.module.css";

/**
 * Displays related journal articles at the bottom of an article page.
 *
 * @param {Object[]} articles - Array of { slug, title, category, image }
 */
const RelatedArticles = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <aside className={styles.wrapper} aria-label="Related articles">
      <h2 className={styles.title}>You might also enjoy</h2>
      <div className={styles.grid}>
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/journal/${article.slug}`}
            className={styles.card}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 640px) 80px, 100px"
                className={styles.image}
              />
            </div>
            <div className={styles.info}>
              <span className={styles.category}>{article.category}</span>
              <h3 className={styles.cardTitle}>{article.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default RelatedArticles;
