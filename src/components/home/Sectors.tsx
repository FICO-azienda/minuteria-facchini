import Link from "next/link";
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
          index="04"
          label="Settori"
          title={[
            <>Nata sott’acqua,</>,
            <>
              <em>messa al lavoro</em> ovunque.
            </>,
          ]}
          intro={
            <p>
              La subacquea ci ha insegnato a costruire pezzi che non possono sbagliare. Oggi quella competenza lavora
              in settori che, sulla carta, non hanno nulla in comune.
            </p>
          }
        />

        <div className={styles.lead} data-reveal="up">
          <Link href={`/settori/#${lead.slug}`} className={styles.leadLink}>
            <div className={styles.leadMedia} data-reveal="wipe">
              <Picture id={lead.image} sizes="(max-width: 900px) 100vw, 58vw" fill />
            </div>
            <div className={styles.leadText}>
              <span className={styles.leadIndex}>
                <SectorGlyph sector={lead.key} className={styles.glyph} />
                01 / 06
              </span>
              <h3 className={styles.leadName}>{lead.name}.</h3>
              <p>{lead.short}</p>
              <span className={styles.leadMore}>
                Scopri il settore <span aria-hidden="true">→</span>
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
