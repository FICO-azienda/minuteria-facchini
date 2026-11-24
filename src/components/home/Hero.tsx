import { Picture } from "@/components/Picture";
import { Button } from "@/components/ui/Button";
import { Dimension } from "@/components/ui/Dimension";
import styles from "./Hero.module.css";

/**
 * Prima schermata. Il titolo è visibile al primo paint: l'animazione di
 * ingresso è CSS puro (non aspetta JavaScript) e si spegne con il movimento
 * ridotto.
 */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`wrap ${styles.inner}`}>
        <p className={`label ${styles.meta}`}>
          <span className={styles.metaIndex}>Tav. 00</span>
          <span>Olginate, Lecco</span>
          <span className={styles.metaRule} aria-hidden="true" />
          <span>Componenti metallici su misura</span>
        </p>

        <h1 id="hero-title" className={`display ${styles.title}`}>
          <span className={styles.l1}>Il pezzo che</span>{" "}
          <span className={styles.l2}>
            <em>ancora</em> non
          </span>{" "}
          <span className={styles.l3}>esiste.</span>
        </h1>

        <div className={styles.copy}>
          <p className={`lede ${styles.lede}`}>
            Ci porti un’esigenza, un problema tecnico o solo un’idea. Da quasi un secolo, a Olginate, la trasformiamo
            insieme a te in un componente metallico fatto su misura.
          </p>
          <div className={styles.actions}>
            <Button href="/contatti/">Parliamo del tuo progetto</Button>
            <Button href="/azienda/" variant="text">
              Scopri la nostra storia
            </Button>
          </div>
        </div>

        <figure className={styles.figure}>
          <div className={styles.frame}>
            <Picture
              id="hero/pezzo"
              sizes="(max-width: 900px) 100vw, 46vw"
              priority
              fill
              className={styles.picture}
            />
          </div>
          <Dimension label="Su misura" className={styles.dimX} />
          <Dimension label="Dall’idea al pezzo" vertical className={styles.dimY} />
          <span className={styles.cross} aria-hidden="true" />
        </figure>

        <dl className={styles.strip}>
          <div>
            <dt className="label">Attività</dt>
            <dd>Quasi un secolo di lavorazioni</dd>
          </div>
          <div>
            <dt className="label">Modello</dt>
            <dd>Produzione su commissione</dd>
          </div>
          <div>
            <dt className="label">Applicazioni</dt>
            <dd>Dalla subacquea all’industria</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
