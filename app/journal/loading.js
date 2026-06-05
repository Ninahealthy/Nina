import styles from "../loading.module.css";

export default function JournalLoading() {
  return (
    <div className={styles.loader} aria-label="Loading journal">
      <div className={styles.breathCircle}>
        <div className={styles.breathInner} />
      </div>
    </div>
  );
}
