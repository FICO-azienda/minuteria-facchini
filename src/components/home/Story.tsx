import { Picture } from "@/components/Picture";
import { Button } from "@/components/ui/Button";
import { Lines } from "@/components/ui/Lines";
import styles from "./Story.module.css";

const chapters = [
  {
    n: "01",
    title: "L’ingegno",
    text: "L’azienda porta il nome di Mario Facchini, il padre di Roberto. Quando per una lavorazione mancava l’utensile giusto, lo progettava e lo costruiva da sé.",
  },
  {
    n: "02",
    title: "Il testimone",
    text: "Roberto, perito industriale specializzato nel controllo numerico, raccoglie il testimone dal padre e porta le macchine CNC in un’officina con quasi un secolo di mestiere alle spalle.",
  },
  {
    n: "03",
    title: "Il mare",
    text: "Appassionato di immersioni e pesca subacquea, Roberto realizza i primi pezzi per la propria attrezzatura. Dopo una fiera del settore a Miami diventano una linea dell’azienda, presente nel catalogo almeno dal 2007.",
  },
];

export function Story() {
  return (
    <section className={`on-dark ${styles.section}`} aria-labelledby="story-title">
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.head}>
          <p className={`label ${styles.meta}`} data-reveal="fade">
            <span className={styles.index}>Tav. 01</span> Storia
          </p>
          <h2 id="story-title" className={`display ${styles.title}`} data-reveal="lines">
            <Lines
              lines={[
                <>Quasi cent’anni</>,
                <>
                  di <em>ingegno</em>
                </>,
                <>
                  <em>di famiglia.</em>
                </>,
              ]}
            />
          </h2>
        </div>

        <figure className={styles.portrait} data-reveal="wipe">
          <Picture id="storia/roberto" sizes="(max-width: 820px) 70vw, 300px" />
          <figcaption className={styles.caption}>
            <span className="label">Archivio Facchini</span>
            Roberto Facchini
          </figcaption>
        </figure>

        <ol className={styles.chapters} role="list">
          {chapters.map((c, i) => (
            <li key={c.n} className={styles.chapter} data-reveal="up" style={{ ["--delay" as string]: `${i * 120}ms` }}>
              <span className={styles.n}>{c.n}</span>
              <h3 className={styles.chapterTitle}>{c.title}</h3>
              <p>{c.text}</p>
            </li>
          ))}
        </ol>

        <figure className={styles.archive} data-reveal="wipe" style={{ ["--delay" as string]: "150ms" }}>
          <Picture id="archivio/piastra-marcata" sizes="(max-width: 820px) 100vw, 480px" />
          <figcaption className={styles.caption}>
            <span className="label">Archivio Facchini</span>
            Piastra per l’attrezzatura subacquea, marcata al laser
          </figcaption>
        </figure>

        <div className={styles.more} data-reveal="up">
          <Button href="/azienda/" variant="ghost">
            Leggi la storia completa
          </Button>
        </div>
      </div>
    </section>
  );
}
