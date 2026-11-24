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
      "Hai un fornitore che parte dal tuo progetto, non un catalogo a cui adattarlo. Il pezzo è fatto per l’applicazione, non il contrario.",
  },
  {
    slug: "lavorazioni-metalliche",
    name: "Lavorazioni metalliche",
    short: "Dal filo e dalla lamiera al pezzo finito, con macchine tradizionali e a controllo numerico.",
    image: "lavorazioni/metallo",
    what:
      "In officina lavoriamo il metallo con macchine tradizionali e a controllo numerico: torni e frese CNC, taglio laser, piegatura e stampaggio a freddo di filo e lamiera.",
    value:
      "Più lavorazioni sotto lo stesso tetto significano meno passaggi tra fornitori e un unico interlocutore che conosce il pezzo dall’inizio alla fine.",
    details: ["Tornitura e fresatura CNC", "Taglio laser", "Stampaggio a freddo di filo e lamiera", "Piegatura del filo"],
  },
  {
    slug: "marcatura-e-personalizzazione",
    name: "Marcatura e personalizzazione",
    short: "Loghi, marchi e scritte impressi direttamente sul metallo.",
    image: "lavorazioni/marcatura",
    archive: { id: "archivio/piastra-marcata", caption: "Piastra con il marchio inciso al laser" },
    what:
      "Con la marcatura laser imprimiamo sul componente loghi, marchi, scritte e codici. Il segno fa parte del pezzo: non è un’etichetta applicata dopo.",
    value:
      "Il tuo marchio sul componente che monti, la tracciabilità di un codice, un’indicazione d’uso che resta leggibile nel tempo.",
  },
  {
    slug: "colorazione",
    name: "Colorazione",
    short: "Il colore entra nel materiale invece di restare in superficie.",
    image: "lavorazioni/colore",
    archive: { id: "archivio/anelli-colorati", caption: "Anelli colorati in rosso e azzurro" },
    what:
      "Offriamo componenti colorati con tecniche che fanno penetrare il colore direttamente nel materiale, invece di depositarlo in superficie come una vernice.",
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
      "Non devi arrivare con tutte le risposte. Ti serve qualcuno che sappia fare le domande giuste sul pezzo e su come verrà usato.",
  },
];
