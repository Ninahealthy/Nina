import styles from "./PageHero.module.css";

const PageHero = ({ title, subtitle, children }) => {
  return (
    <section className={styles.hero} aria-label="Introduction">
      <h1 className={styles.heroTitle}>{title}</h1>
      {subtitle && (
        <p className={styles.heroSubtitle}>{subtitle}</p>
      )}
      {children}
    </section>
  );
};

export default PageHero;
