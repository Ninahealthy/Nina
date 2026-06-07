import Link from "next/link";
import styles from "./Breadcrumb.module.css";

/**
 * Visible breadcrumb navigation for article pages.
 * Mirrors the BreadcrumbList JSON-LD schema already present in the article template.
 * Provides users with clear positional context (Home > Journal > Article).
 */
const Breadcrumb = ({ articleTitle }) => {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link href="/" className={styles.breadcrumbLink}>
        Home
      </Link>
      <span className={styles.separator} aria-hidden="true">
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <Link href="/journal" className={styles.breadcrumbLink}>
        Journal
      </Link>
      <span className={styles.separator} aria-hidden="true">
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={styles.current} aria-current="page">
        {articleTitle}
      </span>
    </nav>
  );
};

export default Breadcrumb;
