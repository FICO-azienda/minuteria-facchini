import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { site } from "@/lib/site";
import styles from "./contatti.module.css";

export const metadata: Metadata = pageMeta({
  title: "Contatti",
  description:
    "Hai un componente metallico da realizzare? Raccontaci la tua esigenza e allega il tuo disegno tecnico. Minuteria Facchini, Via dell’Industria 2, Olginate (LC).",
  path: "/contatti/",
});

export default function ContattiPage() {
  const c = site.contact;
  const osm = `https://www.openstreetmap.org/?mlat=${c.geo.lat}&mlon=${c.geo.lng}#map=16/${c.geo.lat}/${c.geo.lng}`;
  return (
    <>
      <PageHero
        index="05"
        label="Contatti"
        path="/contatti/"
        title={[
          <>Raccontaci</>,
          <>
            <em>la tua esigenza.</em>
          </>,
        ]}
        lede={
          <p>
            Un disegno, uno schizzo o poche righe: qualsiasi punto di partenza va bene. Ogni richiesta la legge una
            persona dell’azienda.
          </p>
        }
      />

      <section className={`wrap ${styles.grid}`} aria-label="Modulo e recapiti">
        <div className={styles.formCol}>
          <h2 className={styles.colTitle}>
            <span className="label">Modulo di richiesta</span>
          </h2>
          <ContactForm />
        </div>

        <aside className={styles.info} aria-label="Recapiti">
          <div className={styles.block}>
            <h2 className="label">Telefono</h2>
            <a href={`tel:${c.phoneIntl}`} className={styles.big}>
              {c.phone}
            </a>
          </div>
          <div className={styles.block}>
            <h2 className="label">Email</h2>
            <a href={`mailto:${c.email}`} className={styles.big}>
              {c.email}
            </a>
          </div>
          <div className={styles.block}>
            <h2 className="label">Sede e officina</h2>
            <address>
              {c.legalName}
              <br />
              {c.street}
              <br />
              {c.postalCode} {c.city} ({c.province}), {c.country}
            </address>
            <p className={styles.small}>P. IVA {c.vat}</p>
          </div>
          <div className={styles.block}>
            <h2 className="label">Come raggiungerci</h2>
            <p>
              Olginate si trova a pochi chilometri a sud di Lecco, sulla sponda dell’Adda. Se vuoi passare a trovarci
              o portarci un campione, chiamaci prima: fissiamo un appuntamento e ti aspettiamo in officina.
            </p>
            <p className={styles.coords} aria-label="Coordinate">
              {c.geo.lat.toFixed(4)}° N · {c.geo.lng.toFixed(4)}° E
            </p>
            <ul role="list" className={styles.maps}>
              <li>
                <a href={c.mapsUrl} target="_blank" rel="noopener noreferrer">
                  Apri in Google Maps<span className="visually-hidden"> (nuova finestra)</span> ↗
                </a>
              </li>
              <li>
                <a href={osm} target="_blank" rel="noopener noreferrer">
                  Apri in OpenStreetMap<span className="visually-hidden"> (nuova finestra)</span> ↗
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
