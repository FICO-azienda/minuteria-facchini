import type { ReactNode } from "react";
import styles from "./LegalPage.module.css";

/** Impaginato sobrio per le pagine di servizio (privacy, crediti). */
export function LegalPage({ index, label, title, intro, children }: {
  index: string;
  label: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className={`wrap ${styles.page}`}>
      <header className={`grid ${styles.head}`}>
        <p className={`label ${styles.meta}`}>
          <span className={styles.index}>Tav. {index}</span> {label}
        </p>
        <div className={styles.titleBox}>
          <h1 className={`display ${styles.title}`}>{title}</h1>
          {intro ? <div className={`lede ${styles.intro}`}>{intro}</div> : null}
        </div>
      </header>
      <div className={`grid`}>
        <div className={styles.body}>{children}</div>
      </div>
    </article>
  );
}
