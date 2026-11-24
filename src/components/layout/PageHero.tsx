import type { ReactNode } from "react";
import { Picture, type ImageId } from "@/components/Picture";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Dimension } from "@/components/ui/Dimension";
import styles from "./PageHero.module.css";

type Props = {
  index: string;
  label: string;
  path: string;
  /** Righe del titolo h1 */
  title: ReactNode[];
  lede: ReactNode;
  image?: ImageId;
  imageLabel?: string;
};

/** Apertura delle pagine interne: tavola, titolo grande, sottotitolo, immagine ampia. */
export function PageHero({ index, label, path, title, lede, image, imageLabel }: Props) {
  return (
    <header className={styles.hero}>
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }, { name: label, path }]} />
      <div className={`wrap ${styles.inner}`}>
        <p className={`label ${styles.meta}`}>
          <span className={styles.index}>Tav. {index}</span>
          <span className={styles.rule} aria-hidden="true" />
          <span>{label}</span>
        </p>
        <h1 className={`display ${styles.title}`}>
          {title.map((l, i) => (
            <span key={i} className={styles.line} style={{ animationDelay: `${80 + i * 100}ms` }}>
              {l}
            </span>
          ))}
        </h1>
        <div className={`lede ${styles.lede}`}>{lede}</div>
      </div>
      {image ? (
        <div className={`wrap ${styles.mediaWrap}`}>
          <div className={styles.media}>
            <Picture id={image} sizes="100vw" priority fill />
          </div>
          <Dimension label={imageLabel ?? "Scala 1 : 1"} className={styles.dim} />
        </div>
      ) : null}
    </header>
  );
}
