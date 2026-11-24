import Link from "next/link";
import { Picture } from "@/components/Picture";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { capabilities } from "@/content/capabilities";
import styles from "./Capabilities.module.css";

/**
 * Le competenze come indice di righe ampie. Su desktop l'immagine della riga
 * attiva appare in una finestra fissa a destra (hover e focus da tastiera);
 * su mobile ogni riga mostra la propria immagine.
 */
export function Capabilities() {
  return (
    <section className={styles.section} aria-labelledby="cap-title">
      <div className="wrap">
        <SectionHead
          id="cap-title"
          index="03"
          label="Competenze"
          title={[
            <>Dal disegno</>,
            <>
              <em>alla finitura.</em>
            </>,
          ]}
          intro={
            <p>
              Lavorazioni diverse, un solo obiettivo: arrivare al componente che serve davvero. Non è un catalogo, è
              quello che possiamo mettere al lavoro sul tuo progetto.
            </p>
          }
        />

        <div className={styles.layout}>
          <ol className={styles.list} role="list">
            {capabilities.map((c, i) => (
              <li key={c.slug} className={styles.item} data-reveal="up" style={{ ["--delay" as string]: `${i * 70}ms` }}>
                <Link href={`/competenze/#${c.slug}`} className={styles.row}>
                  <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.name}>{c.name}</span>
                  <span className={styles.short}>{c.short}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                  <span className={styles.thumb} aria-hidden="true">
                    <Picture id={c.image} sizes="(max-width: 900px) 100vw, 34vw" fill alt="" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.more} data-reveal="up">
          <Button href="/competenze/" variant="ghost">
            Tutte le competenze
          </Button>
        </div>
      </div>
    </section>
  );
}
