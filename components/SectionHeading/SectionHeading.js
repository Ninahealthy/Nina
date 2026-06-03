import styles from "./SectionHeading.module.css";

const SectionHeading = ({ children, subtitle }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{children}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
