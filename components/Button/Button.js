import Link from "next/link";
import styles from "./Button.module.css";

const Button = ({ children, href, onClick, variant = "primary", disabled }) => {
  const className = `${styles.button} ${styles[variant]}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
