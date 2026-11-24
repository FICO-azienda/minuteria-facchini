import type { Metadata } from "next";
import { pageMeta } from "@/lib/meta";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Informativa privacy",
  description:
    "Come Minuteria Facchini tratta i dati personali inviati tramite il sito e il modulo di contatto.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  const c = site.contact;
  return (
    <LegalPage
      index="A"
      label="Privacy"
      title="Informativa privacy"
      intro={
        <p>
          Ai sensi degli articoli 13 e 14 del Regolamento (UE) 2016/679 (GDPR): quali dati raccogliamo quando ci
          contatti, perché e per quanto tempo.
        </p>
      }
    >
      <h2>Titolare del trattamento</h2>
      <p>
        {c.legalName}, {c.street}, {c.postalCode} {c.city} ({c.province}), {c.country}.
        {c.email ? (
          <>
            {" "}
            Per qualsiasi richiesta sui tuoi dati puoi scrivere a <a href={`mailto:${c.email}`}>{c.email}</a>.
          </>
        ) : null}
      </p>

      <h2>Quali dati trattiamo</h2>
      <ul>
        <li>
          <strong>Dati che ci invii tu</strong> tramite il <Link href="/contatti/">modulo di contatto</Link>, via email o
          per telefono: nome e cognome, azienda, settore, indirizzo email, numero di telefono, il testo della richiesta
          e gli eventuali file allegati (disegni, specifiche, fotografie).
        </li>
        <li>
          <strong>Dati tecnici di navigazione</strong>: il sito è ospitato su GitHub Pages (GitHub, Inc.), che per
          ragioni di sicurezza e funzionamento registra dati tecnici come l’indirizzo IP del visitatore. Noi non usiamo
          questi dati per identificarti.
        </li>
      </ul>
      <p>Ti chiediamo di non inserire nel modulo dati particolari (ad esempio dati sulla salute) non necessari alla richiesta.</p>

      <h2>Perché li trattiamo</h2>
      <ul>
        <li>
          Per rispondere alla tua richiesta e, se lo vuoi, preparare un’offerta o sviluppare il componente: la base
          giuridica è l’esecuzione di misure precontrattuali adottate su tua richiesta (art. 6.1.b GDPR).
        </li>
        <li>
          Per la sicurezza del sito e per prevenire abusi: legittimo interesse del titolare (art. 6.1.f GDPR).
        </li>
      </ul>
      <p>
        Il conferimento dei dati è facoltativo, ma senza un recapito e una descrizione dell’esigenza non possiamo
        risponderti.
      </p>

      <h2>Chi può vederli</h2>
      <p>
        I dati sono trattati da persone autorizzate dell’azienda e dai fornitori dei servizi informatici necessari
        (hosting del sito, servizio di ricezione del modulo, posta elettronica), che agiscono come responsabili del
        trattamento. Non vendiamo né cediamo i tuoi dati a terzi per finalità di marketing.
      </p>

      <h2>Trasferimenti fuori dall’Unione europea</h2>
      <p>
        Alcuni fornitori (ad esempio GitHub, Inc.) hanno sede negli Stati Uniti. In questi casi il trasferimento avviene
        sulla base delle garanzie previste dal GDPR, come la decisione di adeguatezza UE-USA (Data Privacy Framework)
        o le clausole contrattuali standard approvate dalla Commissione europea.
      </p>

      <h2>Per quanto tempo li conserviamo</h2>
      <p>
        Per il tempo necessario a gestire la richiesta. Se ne nasce un rapporto commerciale, i dati sono conservati per
        la durata del rapporto e per i tempi previsti dagli obblighi di legge (ad esempio fiscali).
      </p>

      <h2>I tuoi diritti</h2>
      <p>
        Puoi chiedere in qualsiasi momento l’accesso ai tuoi dati, la rettifica, la cancellazione, la limitazione del
        trattamento, la portabilità e opporti al trattamento (artt. 15–22 GDPR). Se ritieni che il trattamento violi
        il GDPR puoi proporre reclamo al Garante per la protezione dei dati personali (
        <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
          garanteprivacy.it
        </a>
        ).
      </p>

      <h2>Cookie</h2>
      <p>
        Questo sito non installa cookie di profilazione né strumenti di statistica, e non carica contenuti di terze
        parti (i caratteri tipografici sono serviti dal sito stesso; il collegamento a Google Maps si apre solo se lo
        scegli). Per questo non ti chiediamo alcun consenso ai cookie.
      </p>
    </LegalPage>
  );
}
