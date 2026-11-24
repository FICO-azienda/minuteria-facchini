import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { PageHero } from "@/components/layout/PageHero";
import { OriginTag } from "@/components/OriginTag";
import { Picture, type ImageId } from "@/components/Picture";
import { CtaBand } from "@/components/ui/CtaBand";
import { Lines } from "@/components/ui/Lines";
import styles from "./azienda.module.css";

export const metadata: Metadata = pageMeta({
  title: "Azienda e storia",
  description:
    "Quasi un secolo di lavorazione dei metalli nella famiglia Facchini: l’ingegno di Mario, il passaggio di testimone a Roberto, la subacquea.",
  path: "/azienda/",
});

const archive: { id: ImageId; caption: string }[] = [
  { id: "archivio/piastra-acqua", caption: "Piastra per l’attrezzatura subacquea" },
  { id: "archivio/piastra-marcata", caption: "La stessa piastra, marcata al laser" },
  { id: "archivio/anelli-colorati", caption: "Anelli in filo piegato, colorati" },
  { id: "archivio/sostegni-stoppino", caption: "Fermagli per stoppini, per le cererie" },
  { id: "archivio/anelli-nero", caption: "Anelli e triangoli in filo d’acciaio" },
  { id: "archivio/carboncini", caption: "Carboncini per turibolo" },
];

export default function AziendaPage() {
  return (
    <>
      <PageHero
        index="01"
        label="Azienda"
        path="/azienda/"
        title={[
          <>Una famiglia</>,
          <>che lavora il metallo</>,
          <>
            <em>da quasi un secolo.</em>
          </>,
        ]}
        lede={
          <p>
            Minuteria Facchini è un’azienda di famiglia di Olginate, in provincia di Lecco. La sua storia è fatta di
            persone che, davanti a un problema tecnico, preferiscono costruire la soluzione piuttosto che cercarla a
            catalogo.
          </p>
        }
        image="luoghi/lago"
        imageLabel="Il territorio · il lago di Lecco"
      />

      <section className={`wrap ${styles.chapters}`} aria-label="La storia">
        <article className={styles.chapter}>
          <p className={`label ${styles.n}`}>01 · Le origini</p>
          <h2 className={`display ${styles.h}`} data-reveal="lines">
            <Lines lines={[<>Un mestiere</>, <><em>nato nel metallo.</em></>]} />
          </h2>
          <div className={styles.text} data-reveal="up">
            <p>
              La tradizione della famiglia Facchini nella lavorazione dei metalli ha quasi cent’anni. Già nel 2011
              l’azienda raccontava più di ottant’anni di esperienza, maturati in un territorio, quello di Lecco, che
              da generazioni vive di officine e di lavorazioni meccaniche.
            </p>
          </div>
        </article>

        <article className={`${styles.chapter} ${styles.quoteChapter}`}>
          <p className={`label ${styles.n}`}>02 · L’ingegno</p>
          <h2 className={`display ${styles.h}`} data-reveal="lines">
            <Lines lines={[<>Quando lo strumento</>, <>non esisteva,</>, <><em>lo inventava.</em></>]} />
          </h2>
          <div className={styles.text} data-reveal="up">
            <p>
              L’azienda porta il nome di Mario Facchini, il padre di Roberto. Era un uomo con una mentalità da
              inventore: se per una lavorazione mancava l’utensile adatto, lo progettava e lo costruiva. Alcune di
              quelle soluzioni le ha anche brevettate.
            </p>
            <p>
              È da lui che arriva l’abitudine che ancora oggi guida il lavoro: partire dal problema, non dal
              prodotto.
            </p>
          </div>
        </article>

        <article className={`${styles.chapter} ${styles.withImage}`}>
          <div className={styles.chapterBody}>
            <p className={`label ${styles.n}`}>03 · Il testimone</p>
            <h2 className={`display ${styles.h}`} data-reveal="lines">
              <Lines lines={[<>Dal padre</>, <><em>al figlio.</em></>]} />
            </h2>
            <div className={styles.text} data-reveal="up">
              <p>
                Roberto Facchini, perito industriale specializzato nelle tecnologie a controllo numerico, raccoglie il
                testimone dal padre Mario. Porta in azienda la conoscenza delle macchine CNC e, insieme, la volontà
                di aprire l’officina a settori nuovi.
              </p>
              <p>Il metodo resta quello di famiglia: prima si ascolta, poi si progetta.</p>
            </div>
          </div>
          <figure className={styles.portrait} data-reveal="wipe">
            <Picture id="storia/roberto" sizes="300px" />
            <figcaption>
              <span className="label">Archivio Facchini</span>
              Roberto Facchini
            </figcaption>
          </figure>
        </article>
      </section>

      <section className={`on-dark ${styles.sea}`} aria-labelledby="mare-title">
        <div className={styles.seaMedia}>
          <Picture id="settori/subacquea-apnea" sizes="(max-width: 900px) 100vw, 50vw" fill />
          <OriginTag id="settori/subacquea-apnea" />
        </div>
        <div className={styles.seaText}>
          <p className="label">04 · Il mare</p>
          <h2 id="mare-title" className={`display ${styles.seaTitle}`} data-reveal="lines">
            <Lines lines={[<>Una passione</>, <>diventata</>, <><em>un mercato.</em></>]} />
          </h2>
          <div className={styles.seaBody} data-reveal="up">
            <p>
              Roberto è appassionato di immersioni e di pesca subacquea. I primi componenti li realizza per la propria
              attrezzatura, praticamente in casa: pezzi pensati da chi li usa.
            </p>
            <p>
              Poi li porta a una fiera internazionale del settore a Miami. Da quell’esperienza nasce una collaborazione
              che fa della componentistica per la subacquea una linea stabile dell’azienda.
            </p>
            <p>
              Già dal 2007 il sito aziendale presentava una linea dedicata agli accessori per l’attrezzatura subacquea
              e nautica.
            </p>
          </div>
        </div>
      </section>

      <section className={`wrap ${styles.today}`} aria-labelledby="oggi-title">
        <div className={styles.todayHead}>
          <p className={`label ${styles.n}`}>05 · Oggi</p>
          <h2 id="oggi-title" className={`display ${styles.h}`} data-reveal="lines">
            <Lines lines={[<>Stessa officina,</>, <><em>molti più settori.</em></>]} />
          </h2>
        </div>
        <div className={styles.todayText} data-reveal="up">
          <p>
            Oggi Minuteria Facchini realizza componenti per la subacquea, lo sport, la sicurezza, la difesa, le cererie
            e l’industria, lavorando quasi sempre su commissione.
          </p>
          <p>
            Chi ci contatta di solito non ha un codice da ordinare ma una domanda. Dall’altra parte trova un’azienda di
            famiglia, con persone che conoscono l’officina e il pezzo.
          </p>
        </div>
      </section>

      <section className={`wrap ${styles.archive}`} aria-labelledby="archivio-title">
        <div className={styles.archiveHead}>
          <p className="label">Dall’archivio</p>
          <h2 id="archivio-title" className={styles.archiveTitle}>
            Alcuni pezzi dal vecchio catalogo aziendale.
          </h2>
        </div>
        <ul className={styles.archiveGrid} role="list">
          {archive.map((a, i) => (
            <li key={a.id} data-reveal="wipe" style={{ ["--delay" as string]: `${i * 90}ms` }}>
              <Picture id={a.id} sizes="(max-width: 700px) 50vw, 20vw" />
              <p className={styles.archiveCaption}>
                <span className="label">Fig. {String(i + 1).padStart(2, "0")}</span> {a.caption}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        eyebrow="Il prossimo capitolo"
        title={[<>Il prossimo pezzo</>, <><em>potrebbe essere il tuo.</em></>]}
        text={<p>Raccontaci che cosa ti serve. Ne parliamo con calma, come si fa in un’azienda di famiglia.</p>}
      />
    </>
  );
}
