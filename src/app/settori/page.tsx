import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Picture } from "@/components/Picture";
import { CtaBand } from "@/components/ui/CtaBand";
import { SectorGlyph } from "@/components/ui/SectorGlyph";
import { sectors } from "@/content/sectors";
import styles from "./settori.module.css";

export const metadata: Metadata = {
  title: "Settori applicativi",
  description:
    "Subacquea, sport invernali, sicurezza e soccorso, difesa, cererie e industria: le stesse competenze nei componenti metallici, applicate a esigenze produttive molto diverse.",
  alternates: { canonical: "/settori/" },
};

export default function SettoriPage() {
  return (
    <>
      <PageHero
        index="03"
        label="Settori"
        path="/settori/"
        title={[
          <>Sei settori.</>,
          <>
            <em>Lo stesso modo</em>
          </>,
          <>
            <em>di lavorare.</em>
          </>,
        ]}
        lede={
          <>
            <p>
              Non siamo legati a un solo mercato. Sappiamo portare le stesse competenze in contesti molto diversi,
              perché ogni settore ci chiede la stessa cosa: un componente che funzioni dove deve funzionare.
            </p>
            <p>Non pubblichiamo i nomi dei nostri clienti. Ti raccontiamo invece che tipo di problemi risolviamo.</p>
          </>
        }
      />

      <nav className={`wrap ${styles.index}`} aria-label="Settori in questa pagina">
        <ol role="list">
          {sectors.map((s, i) => (
            <li key={s.slug}>
              <a href={`#${s.slug}`}>
                <SectorGlyph sector={s.key} className={styles.indexGlyph} />
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.indexName}>{s.name}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className={styles.list}>
        {sectors.map((s, i) => (
          <section
            key={s.slug}
            id={s.slug}
            className={`${styles.sector} ${i === 0 ? `on-dark ${styles.lead}` : ""}`}
            aria-labelledby={`${s.slug}-t`}
          >
            <div className={`wrap ${styles.inner}`}>
              <header className={styles.head}>
                <span className={styles.num}>
                  <SectorGlyph sector={s.key} className={styles.glyph} />
                  <span className="label">
                    {String(i + 1).padStart(2, "0")} / {String(sectors.length).padStart(2, "0")}
                  </span>
                </span>
                <h2 id={`${s.slug}-t`} className={`display ${styles.name}`} data-reveal="up">
                  {s.name}.
                </h2>
              </header>
              <div className={styles.media} data-reveal="wipe">
                <Picture id={s.image} sizes="(max-width: 900px) 100vw, 50vw" fill />
              </div>
              <dl className={styles.facts} data-reveal="up">
                <div>
                  <dt className="label">L’applicazione</dt>
                  <dd>{s.application}</dd>
                </div>
                <div>
                  <dt className="label">La competenza che si trasferisce</dt>
                  <dd>{s.transfer}</dd>
                </div>
                {s.examples ? (
                  <div>
                    <dt className="label">Alcuni ambiti</dt>
                    <dd>
                      <ul role="list" className={styles.examples}>
                        {s.examples.map((e) => (
                          <li key={e}>{e}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ) : null}
              </dl>
              {s.archive ? (
                <div className={styles.archive}>
                  {s.archive.map((a) => (
                    <figure key={a.id}>
                      <Picture id={a.id} sizes="200px" />
                      <figcaption>
                        <span className="label">Archivio Facchini</span>
                        {a.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ))}
      </div>

      <section className={`wrap ${styles.yours}`} aria-labelledby="tuo-title">
        <p className="label">07 / ?</p>
        <h2 id="tuo-title" className={`display ${styles.yoursTitle}`}>
          Il tuo settore <em>non è in elenco?</em>
        </h2>
        <p className={styles.yoursText}>
          Ogni settore di questa pagina è iniziato con la richiesta di un singolo cliente. Se lavori in un ambito
          diverso e hai bisogno di un componente metallico che non trovi,{" "}
          <Link href="/contatti/">raccontaci la tua applicazione</Link>.
        </p>
      </section>

      <CtaBand
        title={[<>Una nuova applicazione?</>, <><em>Parliamone.</em></>]}
        text={<p>Descrivici il contesto in cui il pezzo dovrà lavorare. Il resto lo definiamo insieme.</p>}
        cta="Contattaci per una nuova applicazione"
      />
    </>
  );
}
