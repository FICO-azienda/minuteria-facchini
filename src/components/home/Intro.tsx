import { Dimension } from "@/components/ui/Dimension";
import { SectionHead } from "@/components/ui/SectionHead";
import styles from "./Intro.module.css";

const steps = [
  {
    n: "A",
    title: "Ci arriva una domanda",
    text: "Un disegno, un campione da migliorare, a volte solo un problema che nessun pezzo in commercio risolve.",
  },
  {
    n: "B",
    title: "La sviluppiamo insieme",
    text: "Materiale, forma, finitura, marcatura: decidiamo con te ogni caratteristica, in funzione dell’uso reale del componente.",
  },
  {
    n: "C",
    title: "Consegniamo il pezzo",
    text: "Un componente metallico pensato per il lavoro che dovrà fare.",
  },
];

export function Intro() {
  return (
    <section className={styles.section} aria-labelledby="intro-title">
      <div className="wrap">
        <SectionHead
          id="intro-title"
          label="Il nostro mestiere"
          title={[
            <>Il nostro catalogo</>,
            <>
              lo scrivono <em>i clienti.</em>
            </>,
          ]}
          intro={
            <p>
              Minuteria Facchini produce componenti metallici su commissione. Il punto di partenza non è un codice da
              ordinare ma un’esigenza precisa: la tua. Per questo quasi ogni pezzo che realizziamo nasce da una
              richiesta diversa.
            </p>
          }
        />

        <ol className={styles.steps} role="list">
          {steps.map((s, i) => (
            <li key={s.n} className={styles.step} data-reveal="up" style={{ ["--delay" as string]: `${i * 120}ms` }}>
              <span className={styles.n} aria-hidden="true">
                {s.n}
              </span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepText}>{s.text}</p>
            </li>
          ))}
        </ol>
        <Dimension label="Dalla domanda al pezzo" className={styles.dim} />
      </div>
    </section>
  );
}
