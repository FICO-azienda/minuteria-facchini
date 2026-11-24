import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { Button } from "./Button";
import { Lines } from "./Lines";
import styles from "./CtaBand.module.css";

type Props = {
  eyebrow?: string;
  title: ReactNode[];
  text: ReactNode;
  cta?: string;
};

/** Chiusura di ogni pagina: un invito personale a raccontare un'esigenza. */
export function CtaBand({ eyebrow = "Il prossimo pezzo", title, text, cta = "Parliamo del tuo progetto" }: Props) {
  const c = site.contact;
  return (
    <section className={`on-dark ${styles.band}`} aria-labelledby="cta-title">
      <div className={`wrap ${styles.inner}`}>
        <svg className={styles.mark} viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="4" fill="currentColor" />
          <path d="M100 0v70M100 130v70M0 100h70M130 100h70" stroke="currentColor" strokeWidth="1" strokeDasharray="14 6 3 6" />
        </svg>
        <p className="label" data-reveal="fade">
          {eyebrow}
        </p>
        <h2 id="cta-title" className={`display ${styles.title}`} data-reveal="lines">
          <Lines lines={title} />
        </h2>
        <div className={styles.row}>
          <div className={`lede ${styles.text}`} data-reveal="up">
            {text}
          </div>
          <div className={styles.actions} data-reveal="up" style={{ ["--delay" as string]: "120ms" }}>
            <Button href="/contatti/">{cta}</Button>
            {c.phone ? (
              <a className={styles.direct} href={`tel:${c.phoneIntl}`}>
                <span className="label">Oppure chiama</span> {c.phone}
              </a>
            ) : c.email ? (
              <a className={styles.direct} href={`mailto:${c.email}`}>
                <span className="label">Oppure scrivi a</span> {c.email}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
