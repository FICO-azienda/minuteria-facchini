import styles from "./Wordmark.module.css";

/**
 * Logotipo tipografico del sito. Il segno è il simbolo del "centro foro"
 * del disegno tecnico: il punto da cui parte ogni lavorazione.
 * Da sostituire con il marchio ufficiale se l'azienda ne fornisce uno vettoriale.
 */
export function Wordmark({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <span className={styles.mark} data-size={size}>
      <svg className={styles.symbol} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
        <circle cx="20" cy="20" r="11.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="20" cy="20" r="2.2" fill="var(--copper, currentColor)" />
        <path
          d="M20 1v8M20 31v8M1 20h8M31 20h8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="square"
        />
      </svg>
      <span className={styles.text}>
        <span className={styles.top}>Minuteria</span>
        <span className={styles.bottom}>Facchini</span>
      </span>
    </span>
  );
}
