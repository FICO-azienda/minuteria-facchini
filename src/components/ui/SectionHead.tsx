import type { ReactNode } from "react";
import { Lines } from "./Lines";
import styles from "./SectionHead.module.css";

type Props = {
  /** Numero di tavola, es. "02" (facoltativo) */
  index?: string;
  label: string;
  /** Righe del titolo, impaginate a mano. */
  title: ReactNode[];
  intro?: ReactNode;
  as?: "h1" | "h2";
  size?: "lg" | "md";
  id?: string;
};

export function SectionHead({ index, label, title, intro, as: Tag = "h2", size = "lg", id }: Props) {
  return (
    <div className={`grid ${styles.head}`} data-size={size}>
      <p className={`label ${styles.meta}`} data-reveal="fade">
        {index ? (
          <>
            <span className={styles.index}>Tav. {index}</span>
            <span className={styles.rule} aria-hidden="true" />
          </>
        ) : null}
        <span>{label}</span>
      </p>
      <div className={styles.body}>
        <Tag className={`display ${styles.title}`} data-reveal="lines" id={id}>
          <Lines lines={title} />
        </Tag>
        {intro ? (
          <div className={`lede ${styles.intro}`} data-reveal="up" style={{ ["--delay" as string]: "200ms" }}>
            {intro}
          </div>
        ) : null}
      </div>
    </div>
  );
}
