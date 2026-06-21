import BrandMark from "@/components/BrandMark/BrandMark";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loader} aria-label="Loading page content">
      <BrandMark size="hero" animate />
    </div>
  );
}
