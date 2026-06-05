import styles from "./Timeline.module.css";

const Timeline = ({ items }) => {
  return (
    <div className={styles.timeline} role="list">
      {items.map((item, i) => (
        <div key={i} className={styles.item} role="listitem">
          <div className={styles.marker} aria-hidden="true">
            <div className={styles.dot} />
            {i < items.length - 1 && <div className={styles.line} />}
          </div>
          <div className={styles.content}>
            <span className={styles.year}>{item.year}</span>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.description}>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
