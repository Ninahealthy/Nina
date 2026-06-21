import styles from "./BrandMark.module.css";

const SIZES = { sm: 16, md: 24, lg: 32, xl: 48, hero: 64 };

/**
 * The Nina brand mark: a teardrop/leaf shape representing
 * "a breath made visible, a drop of attention."
 *
 * Uses currentColor for the body (adapts to light/dark mode)
 * and var(--color-sage) for the stem (brand-consistent).
 */
export default function BrandMark({
  size = "md",
  className,
  opacity = 1,
  animate = false,
}) {
  const px = typeof size === "number" ? size : SIZES[size];
  const classes = [
    styles.mark,
    animate ? styles.breathPulse : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      aria-hidden="true"
    >
      <path
        d="M16 28C16 20.5 9 16 9 9C9 5.13401 12.134 2 16 2C19.866 2 23 5.13401 23 9C23 16 16 20.5 16 28Z"
        fill="currentColor"
        opacity={opacity}
      />
      <path
        d="M16 2V0"
        stroke="var(--color-sage)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
