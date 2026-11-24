import type { ImageId } from "@/components/Picture";
import type { SectorKey } from "@/components/ui/SectorGlyph";

/**
 * Settori applicativi. Nessun nome di cliente o marchio: solo il tipo di
 * applicazione e la competenza che si trasferisce agli altri ambiti.
 * Fonti in docs/01-ricerca.md (subacquea, cererie e "altre industrie" sono
 * documentati; neve, soccorso e difesa sono indicati dal titolare).
 */
export type Sector = {
  key: SectorKey;
  slug: string;
  name: string;
  short: string;
  image: ImageId;
  application: string;
  transfer: string;
  examples?: string[];
  /** Foto autentiche dall'archivio aziendale */
  archive?: { id: ImageId; caption: string }[];
};

export const sectors: Sector[] = [
  {
    key: "subacquea",
    slug: "subacquea",
    name: "Subacquea",
    short: "Componenti per l’immersione e la pesca in apnea. Il settore che ci ha portato sui mercati internazionali.",
    image: "settori/subacquea",
    archive: [{ id: "archivio/piastra-marcata", caption: "Piastra in metallo con marcatura laser" }],
    application:
      "Componenti in acciaio per attrezzature da immersione e da pesca subacquea. È nato da una passione di Roberto Facchini ed è diventato il settore che ci ha aperto i mercati internazionali.",
    transfer:
      "Pezzi che lavorano in acqua salata, sotto carico, nelle mani di chi non può permettersi un guasto: lo stesso rigore serve ovunque un componente debba resistere e durare.",
  },
  {
    key: "neve",
    slug: "sport-invernali",
    name: "Sport invernali",
    short: "Componentistica per i paletti utilizzati nello slalom.",
    image: "settori/neve",
    application:
      "Componentistica per i paletti utilizzati nelle gare di slalom: attrezzature che lavorano al freddo e vengono colpite a ogni passaggio.",
    transfer:
      "Progettare per gli urti ripetuti e le basse temperature è un problema meccanico preciso, che si risolve con il materiale e la lavorazione giusti.",
  },
  {
    key: "soccorso",
    slug: "sicurezza-e-soccorso",
    name: "Sicurezza e soccorso",
    short: "Componenti per attrezzature destinate ai vigili del fuoco.",
    image: "settori/soccorso",
    application:
      "Componenti per attrezzature utilizzate dai vigili del fuoco, in condizioni in cui non c’è margine per un pezzo che non funziona.",
    transfer:
      "Quando un componente fa parte di un’attrezzatura di sicurezza, la costanza da un pezzo all’altro conta quanto il disegno.",
  },
  {
    key: "difesa",
    slug: "difesa",
    name: "Difesa",
    short: "Componentistica per attrezzature e applicazioni militari.",
    image: "settori/difesa",
    application:
      "Componentistica destinata ad attrezzature e applicazioni in ambito militare, realizzata secondo le specifiche del committente.",
    transfer:
      "Specifiche rigorose, documentazione e riservatezza: un modo di lavorare che portiamo anche nelle commesse di altri settori.",
  },
  {
    key: "cererie",
    slug: "cererie",
    name: "Cererie",
    short: "Fermagli per stoppini, carboncini per turibolo e incensi: un rapporto lungo mezzo secolo.",
    image: "settori/cererie",
    archive: [
      { id: "archivio/sostegni-stoppino", caption: "Fermagli per stoppini" },
      { id: "archivio/carboncini", caption: "Carboncini per turibolo" },
    ],
    application:
      "Da più di mezzo secolo lavoriamo con le cererie: fermagli metallici per gli stoppini delle candele, carboncini per turibolo prodotti in un reparto dedicato e incensi selezionati.",
    transfer:
      "Restare per decenni in un settore tradizionale significa produrre con costanza lo stesso pezzo, lotto dopo lotto, senza che nessuno debba più pensarci.",
  },
  {
    key: "industria",
    slug: "altre-applicazioni",
    name: "Altre industrie",
    short: "Macchine tessili, illuminazione, occhialeria, pelletteria e molto altro.",
    image: "settori/industria",
    archive: [{ id: "archivio/anelli", caption: "Anelli e maglie a D in filo piegato" }],
    application:
      "Nel tempo abbiamo realizzato accessori per macchine tessili, componenti per l’illuminazione e l’occhialeria, fibbie e minuteria in filo per la pelletteria, morsetti e particolari su disegno per l’industria.",
    transfer:
      "Ogni nuovo settore è stato, all’inizio, la richiesta di un singolo cliente. Il prossimo potrebbe essere il tuo.",
    examples: ["Accessori per macchine tessili", "Illuminazione", "Occhialeria", "Pelletteria e fibbie", "Morsetti"],
  },
];
