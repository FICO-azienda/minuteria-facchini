import styles from "./Dimension.module.css";

/**
 * Linea di quota da disegno tecnico: estremità, frecce e valore al centro.
 * Puramente decorativa (aria-hidden): il contenuto vero è sempre nel testo.
 */
export function Dimension({
  label,
  className,
  vertical = false,
}: {
  label: string;
  className?: string;
  vertical?: boolean;
}) {
  return (
    <div
      className={`${styles.dim} ${vertical ? styles.vertical : ""} ${className ?? ""}`}
      data-reveal="dim"
      aria-hidden="true"
    >
      <span className={styles.tick} />
      <span className={`${styles.seg} ${styles.left}`}>
        <svg className={styles.head} viewBox="0 0 10 10">
          <path d="M0 5L10 1.5v7z" fill="currentColor" />
        </svg>
      </span>
      <span className={`label ${styles.value}`}>{label}</span>
      <span className={`${styles.seg} ${styles.right}`}>
        <svg className={styles.head} viewBox="0 0 10 10">
          <path d="M10 5L0 1.5v7z" fill="currentColor" />
        </svg>
      </span>
      <span className={styles.tick} />
    </div>
  );
}
