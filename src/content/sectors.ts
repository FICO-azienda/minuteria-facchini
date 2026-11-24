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
    short: "Componenti per l’immersione e la pesca in apnea, nati da una passione di famiglia.",
    image: "settori/subacquea",
    archive: [
      { id: "archivio/piastra-acqua", caption: "Piastra per l’attrezzatura subacquea, versione nera" },
      { id: "archivio/piastra-marcata", caption: "La stessa piastra in acciaio, marcata al laser" },
    ],
    application:
      "Componenti in acciaio per attrezzature da immersione e da pesca subacquea. La linea nasce dalla passione di Roberto Facchini e, dopo una fiera del settore a Miami, diventa stabile: è nel catalogo dell’azienda almeno dal 2007.",
    transfer:
      "Pezzi che lavorano in acqua salata e sotto carico: materiale e lavorazione si scelgono pensando a dove il componente dovrà durare.",
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
      "Componenti per attrezzature utilizzate dai vigili del fuoco.",
    transfer:
      "In un’attrezzatura di sicurezza conta che ogni pezzo sia uguale al precedente: la costanza della produzione vale quanto il disegno.",
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
      "Si lavora sulle specifiche del committente, con la riservatezza che questo settore richiede.",
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
      "Già nel 2011 l’azienda produceva carboncini per turibolo da oltre cinquant’anni. Per le cererie realizziamo anche i fermagli metallici per gli stoppini e selezioniamo incensi.",
    transfer:
      "Restare per decenni in un settore tradizionale significa produrre con costanza lo stesso pezzo, lotto dopo lotto, senza che nessuno debba più pensarci.",
  },
  {
    key: "industria",
    slug: "altre-applicazioni",
    name: "Altre industrie",
    short: "Macchine tessili, illuminazione, occhialeria, pelletteria.",
    image: "settori/industria",
    archive: [{ id: "archivio/anelli", caption: "Anelli e maglie a D in filo piegato" }],
    application:
      "Accessori per macchine tessili, componenti per illuminazione e occhialeria, fibbie e minuteria in filo piegato per la pelletteria, fascette, morsetti e particolari su disegno.",
    transfer:
      "Cambiano le forme e le quantità, non il modo di lavorare filo, lamiera e barra.",
    examples: ["Accessori per macchine tessili", "Illuminazione", "Occhialeria", "Pelletteria e fibbie", "Fascette e morsetti", "Ganci e portachiavi"],
  },
];
