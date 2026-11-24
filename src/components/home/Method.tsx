import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { phases } from "@/content/method";
import styles from "./Method.module.css";

/** Il metodo disegnato come un righello: quattro tacche, quattro fasi. */
export function Method() {
  return (
    <section className={styles.section} aria-labelledby="method-title">
      <div className="wrap">
        <SectionHead
          id="method-title"
          index="05"
          label="Metodo"
          title={[
            <>Come nasce</>,
            <>
              un pezzo <em>su misura.</em>
            </>,
          ]}
          intro={<p>Quattro passaggi, sempre gli stessi. Cambia il pezzo, non l’attenzione.</p>}
        />

        <div className={styles.ruler} data-reveal="ruler">
          <div className={styles.scale} aria-hidden="true">
            <span className={styles.ticks} />
            <span className={styles.zero}>0</span>
          </div>
          <ol className={styles.phases} role="list">
            {phases.map((p, i) => (
              <li key={p.n} className={styles.phase} style={{ ["--i" as string]: i }}>
                <span className={styles.marker} aria-hidden="true" />
                <span className={styles.n}>{p.n}</span>
                <h3 className={styles.verb}>{p.verb}</h3>
                <p className={styles.lead}>{p.lead}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.more} data-reveal="up">
          <Button href="/approccio/" variant="ghost">
            Il nostro approccio
          </Button>
        </div>
      </div>
    </section>
  );
}
