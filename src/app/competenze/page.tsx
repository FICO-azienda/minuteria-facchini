import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { PageHero } from "@/components/layout/PageHero";
import { OriginTag } from "@/components/OriginTag";
import { Picture } from "@/components/Picture";
import { CtaBand } from "@/components/ui/CtaBand";
import { capabilities } from "@/content/capabilities";
import styles from "./competenze.module.css";

export const metadata: Metadata = pageMeta({
  title: "Competenze e lavorazioni",
  description:
    "Componenti metallici su commissione: tornitura e fresatura CNC, taglio laser, stampaggio a freddo, marcatura laser e componenti colorati.",
  path: "/competenze/",
});

export default function CompetenzePage() {
  return (
    <>
      <PageHero
        index="02"
        label="Competenze"
        path="/competenze/"
        title={[
          <>Quello che sappiamo</>,
          <>
            fare, <em>al servizio</em>
          </>,
          <>
            <em>del tuo pezzo.</em>
          </>,
        ]}
        lede={
          <p>
            Le competenze che mettiamo a disposizione quando ci porti un’esigenza: lavorazioni, materiali, marcatura,
            colore. Le combiniamo a seconda di quello che il componente deve fare.
          </p>
        }
      />

      <nav className={`wrap ${styles.toc}`} aria-label="Competenze in questa pagina">
        <ol role="list">
          {capabilities.map((c, i) => (
            <li key={c.slug}>
              <a href={`#${c.slug}`}>
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                {c.name}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className={styles.list}>
        {capabilities.map((c, i) => (
          <section key={c.slug} id={c.slug} className={`wrap ${styles.cap}`} data-flip={i % 2 === 1 || undefined}
            aria-labelledby={`${c.slug}-t`}>
            <div className={styles.media} data-reveal="wipe">
              <Picture id={c.image} sizes="(max-width: 900px) 100vw, 55vw" fill />
              <OriginTag id={c.image} />
            </div>
            <div className={styles.body}>
              <p className={`label ${styles.n}`}>
                {String(i + 1).padStart(2, "0")} / {String(capabilities.length).padStart(2, "0")}
              </p>
              <h2 id={`${c.slug}-t`} className={`display ${styles.title}`} data-reveal="up">
                {c.name}
              </h2>
              <dl className={styles.facts} data-reveal="up">
                <div>
                  <dt className="label">Che cosa facciamo</dt>
                  <dd>{c.what}</dd>
                </div>
                <div>
                  <dt className="label">Il valore per te</dt>
                  <dd>{c.value}</dd>
                </div>
              </dl>
              {c.details ? (
                <ul className={styles.details} role="list">
                  {c.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              ) : null}
              {c.archive ? (
                <figure className={styles.archive} data-reveal="up">
                  <Picture id={c.archive.id} sizes="180px" />
                  <figcaption>
                    <span className="label">Archivio Facchini</span>
                    {c.archive.caption}
                  </figcaption>
                </figure>
              ) : null}
            </div>
          </section>
        ))}
      </div>

      <section className={`wrap ${styles.materials}`} aria-labelledby="materiali-title">
        <p className="label">Materiali</p>
        <h2 id="materiali-title" className={`display ${styles.matTitle}`}>
          Acciaio inox, alluminio, <em>titanio.</em>
        </h2>
        <p className={styles.matText}>
          Sono i metalli che lavoriamo più spesso. Se il tuo componente richiede un materiale diverso, parliamone: la
          scelta del materiale è una delle prime cose che decidiamo insieme.
        </p>
      </section>

      <CtaBand
        title={[<>Hai un disegno</>, <><em>o solo un’idea?</em></>]}
        text={<p>Vanno bene entrambi. Allegalo alla richiesta, oppure descrivilo con parole tue: partiamo da lì.</p>}
        cta="Raccontaci la tua esigenza"
      />
    </>
  );
}
