import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Dimension } from "@/components/ui/Dimension";
import { Lines } from "@/components/ui/Lines";
import { phases } from "@/content/method";
import styles from "./approccio.module.css";

export const metadata: Metadata = {
  title: "Il nostro approccio",
  description:
    "Ascoltare, progettare, realizzare, perfezionare: come nasce un componente metallico su misura insieme a Minuteria Facchini.",
  alternates: { canonical: "/approccio/" },
};

const sheet = [
  { k: "Applicazione", v: "Che cosa deve fare il componente e dove verrà montato." },
  { k: "Riferimenti", v: "Un disegno, uno schizzo, una foto o un campione. Anche solo una descrizione." },
  { k: "Ambiente", v: "Acqua, freddo, urti, carichi, contatto con altri materiali." },
  { k: "Quantità", v: "Un’indicazione, anche approssimativa." },
  { k: "Personalizzazione", v: "Marchi, scritte, codici, colori." },
  { k: "Tempi", v: "Quando ti serve il primo pezzo." },
];

export default function ApproccioPage() {
  return (
    <>
      <PageHero
        index="04"
        label="Approccio"
        path="/approccio/"
        title={[
          <>Ogni progetto</>,
          <>
            parte da <em>una</em>
          </>,
          <>
            <em>conversazione.</em>
          </>,
        ]}
        lede={
          <p>
            Non vendiamo componenti a scaffale. Ogni commessa nasce da un’esigenza specifica e prende forma nel
            dialogo tra noi e il cliente: è il modo in cui lavoriamo da sempre.
          </p>
        }
      />

      <section className={`on-dark ${styles.statement}`} aria-label="La nostra filosofia">
        <div className={`wrap ${styles.statementInner}`}>
          <p className={`display ${styles.big}`} data-reveal="lines">
            <Lines
              lines={[
                <>Il cliente non è</>,
                <>chi compra il pezzo.</>,
                <>
                  <em>È chi lo progetta</em>
                </>,
                <>
                  <em>insieme a noi.</em>
                </>,
              ]}
            />
          </p>
        </div>
      </section>

      <section className={`wrap ${styles.phases}`} aria-labelledby="fasi-title">
        <h2 id="fasi-title" className="visually-hidden">
          Le quattro fasi
        </h2>
        {phases.map((p, i) => (
          <article key={p.n} className={styles.phase} aria-labelledby={`fase-${p.n}`}>
            <div className={styles.phaseNum} aria-hidden="true">
              {p.n}
            </div>
            <div className={styles.phaseBody}>
              <h3 id={`fase-${p.n}`} className={`display ${styles.verb}`} data-reveal="up">
                {p.verb}
              </h3>
              <p className={`lede ${styles.lead}`} data-reveal="up">
                {p.lead}
              </p>
              <p className={styles.text} data-reveal="up">
                {p.text}
              </p>
              <ul role="list" className={styles.ask} aria-label={`In questa fase: ${p.verb.toLowerCase()}`}>
                {p.ask.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
            {i < phases.length - 1 ? <Dimension label={`${p.n} → ${phases[i + 1].n}`} className={styles.dim} /> : null}
          </article>
        ))}
      </section>

      <section className={`${styles.sheetSection}`} aria-labelledby="scheda-title">
        <div className={`wrap ${styles.sheetWrap}`}>
          <div className={styles.sheetIntro}>
            <p className="label">Scheda di partenza</p>
            <h2 id="scheda-title" className={`display ${styles.sheetTitle}`}>
              Che cosa ci serve <em>per iniziare.</em>
            </h2>
            <p>
              Non devi avere tutte le risposte. Queste sono le informazioni che ci aiutano a capire il pezzo: quelle
              che non conosci, le scopriamo insieme.
            </p>
          </div>
          <dl className={styles.sheet}>
            {sheet.map((r, i) => (
              <div key={r.k}>
                <dt>
                  <span className={styles.sheetN}>{String(i + 1).padStart(2, "0")}</span>
                  {r.k}
                </dt>
                <dd>{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={`wrap ${styles.promise}`} aria-labelledby="promessa-title">
        <h2 id="promessa-title" className={`display ${styles.promiseTitle}`}>
          Un interlocutore diretto, <em>dall’inizio alla fine.</em>
        </h2>
        <p>
          In un’azienda di famiglia chi ti risponde conosce l’officina, le macchine e il pezzo. Non ci sono passaggi
          intermedi tra la tua domanda e chi la trasforma in un componente.
        </p>
      </section>

      <CtaBand
        title={[<>Sviluppiamo insieme</>, <><em>la soluzione.</em></>]}
        text={<p>Il primo passo è la fase uno: ascoltare. Raccontaci la tua esigenza.</p>}
      />
    </>
  );
}
