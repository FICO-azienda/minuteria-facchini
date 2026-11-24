import type { ImageId } from "@/components/Picture";

/**
 * Competenze. Le lavorazioni e i materiali citati sono documentati sul sito
 * ufficiale archiviato (pagina "Chi siamo", 2011) e nella brief del cliente:
 * vedi docs/01-ricerca.md. Da riconfermare con l'azienda prima del lancio.
 */
export type Capability = {
  slug: string;
  name: string;
  short: string;
  image: ImageId;
  /** Foto autentica dall'archivio aziendale, se esiste */
  archive?: { id: ImageId; caption: string };
  /** Testi per la pagina Competenze */
  what: string;
  value: string;
  details?: string[];
};

export const capabilities: Capability[] = [
  {
    slug: "componenti-su-commissione",
    name: "Componenti su commissione",
    short: "Minuteria e particolari metallici realizzati sulle tue specifiche.",
    image: "lavorazioni/commissione",
    archive: { id: "archivio/anelli", caption: "Anelli e maglie in filo piegato, al naturale e colorati" },
    what:
      "Produciamo minuteria e particolari metallici a partire dal tuo disegno o dal campione che vuoi riprodurre e migliorare. Lavoriamo acciaio inox, alluminio e titanio.",
    value:
      "Il pezzo è fatto per l’applicazione, non il contrario.",
  },
  {
    slug: "lavorazioni-metalliche",
    name: "Lavorazioni metalliche",
    short: "Dal filo e dalla lamiera al pezzo, con macchine a controllo numerico e laser.",
    image: "lavorazioni/metallo",
    what:
      "In officina: tornitura e fresatura CNC, taglio laser, piegatura e stampaggio a freddo di filo e lamiera. Per le finiture superficiali lavoriamo con partner di fiducia.",
    value:
      "Più lavorazioni sotto lo stesso tetto significano meno passaggi tra fornitori e tempi più facili da governare.",
    details: ["Tornitura e fresatura CNC", "Taglio laser", "Stampaggio a freddo di filo e lamiera", "Piegatura del filo"],
  },
  {
    slug: "marcatura-e-personalizzazione",
    name: "Marcatura e personalizzazione",
    short: "Loghi, marchi e scritte impressi direttamente sul metallo.",
    image: "lavorazioni/marcatura",
    archive: { id: "archivio/piastra-marcata", caption: "Piastra per la subacquea, marcata al laser" },
    what:
      "Con un sistema di marcatura laser a controllo numerico imprimiamo loghi, marchi, scritte e codici sui nostri componenti e su pezzi forniti dai clienti, dal singolo esemplare alla serie. Il segno è permanente e fa parte del pezzo.",
    value:
      "Il tuo marchio sul componente che monti, la tracciabilità di un codice, un’indicazione d’uso che resta leggibile nel tempo.",
  },
  {
    slug: "colorazione",
    name: "Colorazione",
    short: "Componenti colorati per distinguere modelli, misure o marchi.",
    image: "lavorazioni/colore",
    archive: { id: "archivio/anelli-colorati", caption: "Anelli colorati in rosso e azzurro" },
    what:
      "Forniamo componenti colorati, come gli anelli in filo del nostro archivio, con tecniche in cui il colore penetra nel materiale invece di restare in superficie. Scegliamo con te la soluzione adatta al metallo e all’uso.",
    value:
      "Un colore che distingue un modello, una misura o un marchio, e che fa parte del pezzo come la sua forma.",
  },
  {
    slug: "sviluppo-su-specifica",
    name: "Sviluppo su specifica",
    short: "Quando il pezzo non esiste ancora, lo progettiamo con te.",
    image: "lavorazioni/sviluppo",
    what:
      "Molte richieste arrivano senza un disegno definitivo: un’idea, un problema, un componente che non funziona come dovrebbe. Partiamo da lì e definiamo insieme forma, materiale e lavorazioni.",
    value:
      "Puoi partire anche da un’idea incompleta: a definirla ci pensiamo insieme, pezzo per pezzo.",
  },
];
