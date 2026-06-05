import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loader} aria-label="Loading page content">
      <div className={styles.breathCircle}>
        <div className={styles.breathInner} />
      </div>
    </div>
  );
}
