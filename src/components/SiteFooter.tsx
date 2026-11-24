import Link from "next/link";
import { nav, site } from "@/lib/site";
import { CurrentSheet } from "./CurrentSheet";
import { Wordmark } from "./Wordmark";
import styles from "./SiteFooter.module.css";

/**
 * Il piè di pagina è il cartiglio della tavola: il riquadro in basso a destra
 * di ogni disegno tecnico con i dati di chi l'ha prodotto.
 */
export function SiteFooter() {
  const c = site.contact;
  const year = new Date().getFullYear();
  return (
    <footer className={`on-dark ${styles.footer}`}>
      <div className="wrap">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" aria-label="Minuteria Facchini — home">
              <Wordmark size="lg" />
            </Link>
            <p className={styles.claim}>
              Componenti metallici su misura.
              <br />
              <em className="serif-accent">Da un’idea al pezzo finito.</em>
            </p>
          </div>

          <nav aria-label="Pagine del sito" className={styles.col}>
            <p className="label">Indice</p>
            <ul role="list">
              <li>
                <Link href="/">Home</Link>
              </li>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/contatti/">Contatti</Link>
              </li>
            </ul>
          </nav>

          <div className={styles.col}>
            <p className="label">Dove siamo</p>
            <address>
              {c.street}
              <br />
              {c.postalCode} {c.city} ({c.province})
              <br />
              {c.country}
            </address>
            <a href={c.mapsUrl} className={styles.mapLink} target="_blank" rel="noopener noreferrer">
              Apri in Google Maps<span className="visually-hidden"> (si apre in una nuova finestra)</span>
            </a>
          </div>

          <div className={styles.col}>
            <p className="label">Scrivici</p>
            <ul role="list">
              {c.email ? (
                <li>
                  <a href={`mailto:${c.email}`}>{c.email}</a>
                </li>
              ) : null}
              {c.phone ? (
                <li>
                  <a href={`tel:${c.phoneIntl}`}>{c.phone}</a>
                </li>
              ) : null}
              <li>
                <Link href="/contatti/" className={styles.formLink}>
                  Modulo di richiesta →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <dl className={styles.cartiglio} aria-label="Dati aziendali">
          <div className={styles.cellWide}>
            <dt>Ragione sociale</dt>
            <dd>{c.legalName}</dd>
          </div>
          <div>
            <dt>Sede</dt>
            <dd>
              {c.city} ({c.province})
            </dd>
          </div>
          {c.vat ? (
            <div>
              <dt>P. IVA</dt>
              <dd>{c.vat}</dd>
            </div>
          ) : null}
          <div>
            <dt>Tavola</dt>
            <dd>
              <CurrentSheet />
            </dd>
          </div>
          <div>
            <dt>Scala</dt>
            <dd>1 : 1</dd>
          </div>
          <div>
            <dt>Rev.</dt>
            <dd>{year}</dd>
          </div>
        </dl>

        <div className={styles.bottom}>
          <p>
            © {year} {c.legalName}
          </p>
          <ul role="list">
            <li>
              <Link href="/privacy/">Privacy</Link>
            </li>
            <li>
              <Link href="/crediti-immagini/">Crediti immagini</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
