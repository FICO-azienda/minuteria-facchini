import Link from "next/link";
import { OriginTag } from "@/components/OriginTag";
import { Picture } from "@/components/Picture";
import { SectionHead } from "@/components/ui/SectionHead";
import { SectorGlyph } from "@/components/ui/SectorGlyph";
import { sectors } from "@/content/sectors";
import styles from "./Sectors.module.css";

/**
 * I settori come un grande indice tipografico. La subacquea apre l'elenco
 * con un'immagine propria (è il settore che ha fatto conoscere l'azienda
 * all'estero) ma è una voce tra sei, non la protagonista unica.
 */
export function Sectors() {
  const [lead, ...rest] = sectors;
  return (
    <section className={`${styles.section}`} aria-labelledby="sect-title">
      <div className="wrap">
        <SectionHead
          id="sect-title"
          index="03"
          label="Settori"
          title={[
            <>Dal mare alle cererie,</>,
            <>
              <em>un solo mestiere.</em>
            </>,
          ]}
          intro={
            <p>
              Componenti per chi va sott’acqua, per le gare di slalom, per i vigili del fuoco, per le cererie.
              Settori lontani tra loro, lo stesso modo di lavorare il metallo.
            </p>
          }
        />

        <div className={styles.lead} data-reveal="up">
          <Link href={`/settori/#${lead.slug}`} className={styles.leadLink}>
            <div className={styles.leadMedia} data-reveal="wipe">
              <Picture id={lead.image} sizes="(max-width: 900px) 100vw, 58vw" fill alt="" />
              <span aria-hidden="true">
                <OriginTag id={lead.image} />
              </span>
            </div>
            <div className={styles.leadText}>
              <span className={styles.leadIndex}>
                <SectorGlyph sector={lead.key} className={styles.glyph} />
                01 / 06
              </span>
              <span className={styles.leadName}>{lead.name}.</span>
              <p>{lead.short}</p>
              <span className={styles.leadMore}>
                Componenti per la subacquea <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </div>

        <ul className={styles.index} role="list">
          {rest.map((s, i) => (
            <li key={s.slug} data-reveal="up" style={{ ["--delay" as string]: `${i * 60}ms` }}>
              <Link href={`/settori/#${s.slug}`} className={styles.row}>
                <span className={styles.rowIndex}>{String(i + 2).padStart(2, "0")}</span>
                <SectorGlyph sector={s.key} className={styles.glyph} />
                <span className={styles.rowName}>{s.name}.</span>
                <span className={styles.rowShort}>{s.short}</span>
                <span className={styles.rowPeek} aria-hidden="true">
                  <Picture id={s.image} sizes="220px" fill alt="" />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className={styles.footnote} data-reveal="up">
          Il tuo settore non è in elenco?{" "}
          <Link href="/contatti/" className={styles.footLink}>
            È un buon motivo per parlarne.
          </Link>
        </p>
      </div>
    </section>
  );
}
