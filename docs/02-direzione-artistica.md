# Fase 2 — Direzione artistica

## Concept: «Tavola tecnica»

Ogni componente di Minuteria Facchini nasce su un foglio: un'esigenza del
cliente che diventa disegno, poi pezzo. Il sito è impaginato come una tavola
di disegno tecnico: carta avorio, inchiostro, linee di quota, il cartiglio
nell'angolo. Sopra questo foglio appoggiamo la materia — fotografie grandi,
dettagli di metallo — e la voce delle persone che lo lavorano.

Tre registri convivono e hanno ciascuno un ruolo preciso:

| Registro | Che cosa racconta | Come si vede |
| --- | --- | --- |
| **Il progetto** | precisione, metodo, ascolto tecnico | quote, griglie, numerazione delle tavole, etichette monospaziate |
| **La materia** | il metallo, la lavorazione, il pezzo finito | fotografia grande, ritagli netti, rivelazioni "a sipario" |
| **Le persone** | la famiglia, l'ingegno, il rapporto diretto | corsivo serif, citazioni, fotografie d'archivio trattate come documenti |

L'idea guida, ripetuta in forme diverse in tutto il sito: **il pezzo che ancora
non esiste**. Il cliente arriva con una domanda; l'azienda risponde con un
componente. Il sito non mostra un catalogo, mostra un modo di lavorare.

## Posizionamento visivo

- **Non** il sito industriale blu-grigio-bianco, **non** il template AI con
  gradienti e card tutte uguali.
- Solidità da grande gruppo (impaginazione ampia, titoli grandi, ritmo
  lento, fotografia protagonista) con la sensibilità di uno studio di design
  (spazi generosi, tipografia curata, dettagli grafici ispirati al disegno
  tecnico).
- Calore di un'azienda di famiglia: carta al posto del bianco ottico,
  corsivo per la voce umana, immagini d'archivio presentate con didascalia.

## Palette — "materia e tempo"

Il rame e la sua patina verde sono due stati dello stesso metallo: il colore
del metallo appena lavorato e quello che acquista con gli anni. La palette
racconta la stessa cosa dell'azienda: lavorazione e storia.

| Token | Hex | Uso | Contrasto |
| --- | --- | --- | --- |
| `--paper` Carta | `#EEE8DC` | fondo principale (carta da disegno) | — |
| `--paper-deep` Carta scura | `#E3DBCB` | superfici secondarie, campi | — |
| `--ink` Inchiostro | `#1B1E1B` | testo, linee | 13,8:1 su carta |
| `--ink-soft` Grafite | `#5E584D` | testo secondario | 5,8:1 su carta |
| `--oxide` Verde ossido | `#1E2D27` | sezioni scure (storia, CTA finale) | carta su ossido 11,8:1 |
| `--copper` Rame | `#A34825` | link e accenti su carta | 4,9:1 su carta |
| `--copper-strong` Rame pieno | `#9C4322` | fondo pulsanti principali | carta su rame 5,3:1 |
| `--copper-glow` Rame chiaro | `#E08A62` | accenti su fondo ossido | 5,5:1 su ossido |
| `--patina` Patina | `#93B5A2` | dettagli minimi su fondo scuro | 6,4:1 su ossido |

Regola d'uso: carta e inchiostro occupano quasi tutta la superficie; il verde
ossido scandisce i capitoli; il rame è un accento (CTA, quote, parole chiave)
e non supera mai una piccola percentuale della pagina. Tutte le coppie usate
per il testo superano WCAG AA.

## Tipografia — una famiglia che cambia forma

| Ruolo | Carattere | Perché |
| --- | --- | --- |
| Titoli e testo | **Archivo** (variabile, asse larghezza 62–125) | Un grottesco di tradizione ottocentesca, robusto e leggibile. L'asse della larghezza permette di passare da titoli espansi e leggeri (precisione, respiro) a etichette condensate e piene (forza, segnaletica d'officina): **lo stesso materiale lavorato in forme diverse**, come fa l'azienda. |
| Voce umana | **Newsreader** corsivo (asse dimensione ottica) | Interviene solo dove parla una persona o dove una parola deve pesare: la storia di famiglia, le citazioni, le parole chiave nei titoli. |
| Annotazioni | **IBM Plex Mono** | Le etichette delle tavole, le quote, i dati del cartiglio. È il registro del disegno tecnico. |

Evitati di proposito: Inter, Roboto, Poppins e l'abbinamento Instrument
Serif + Inter, ormai riconoscibile come "estetica AI". I font sono scaricati
in fase di build e serviti dal dominio del sito (nessuna richiesta a Google
dal browser del visitatore: meglio per prestazioni e privacy).

Scala: titoli fluidi con `clamp()` da 3,1 rem a 9,5 rem; testo 16–18 px;
interlinea 1,6; misura del testo 60–68 caratteri.

## Stile fotografico

1. **Immagini aziendali autentiche** (dall'archivio del vecchio sito):
   presentate come documenti, con didascalia «Archivio Facchini», mai
   ingrandite oltre la loro risoluzione reale.
2. **Immagini illustrative** (Unsplash/Pexels, licenza verificata): solo
   dettagli di materiale, lavorazioni generiche e contesti dei settori.
   Scelte calde, desaturate, con luce naturale. Mai presentate come lo
   stabilimento o i prodotti dell'azienda: ogni immagine è registrata come
   "illustrativa" in `assets-source/selection.json` e la pagina *Crediti
   immagini* le elenca tutte.
3. Leggero viraggio caldo e desaturazione per rendere coerenti fonti diverse.

## Struttura del sito

| Pagina | URL | Ruolo |
| --- | --- | --- |
| Home | `/` | posizionamento e percorso completo in sintesi |
| Azienda | `/azienda/` | la storia: famiglia, ingegno, subacquea, Miami |
| Competenze | `/competenze/` | che cosa sappiamo fare, senza diventare un catalogo |
| Settori | `/settori/` | la versatilità: sei ambiti applicativi |
| Approccio | `/approccio/` | le quattro fasi: ascoltare, progettare, realizzare, perfezionare |
| Contatti | `/contatti/` | modulo con allegato, recapiti, come arrivare |
| Privacy | `/privacy/` | informativa (da completare con i dati del titolare) |
| Crediti immagini | `/crediti-immagini/` | provenienza e licenza di ogni immagine |

## Gerarchia dell'homepage

1. **Hero** — la promessa: il pezzo che ancora non esiste. Due CTA.
2. **Come lavoriamo** — non un catalogo: una domanda, una soluzione.
3. **Storia** — un capitolo scuro, editoriale: famiglia, ingegno, passaggio generazionale.
4. **Competenze** — lavorazioni presentate come verbi, non come schede.
5. **Settori** — indice tipografico grande con anteprime: la subacquea è il primo, non l'unico.
6. **Metodo** — quattro fasi, tracciate come quote su una tavola.
7. **CTA finale** — personale: «Hai un componente da realizzare?»

## Sistema di componenti

- `SiteHeader` — fisso, si compatta e si nasconde allo scroll; menu mobile a schermo intero con focus trap.
- `SiteFooter` — il **cartiglio**: ragione sociale, indirizzo, recapiti impaginati come il riquadro dati di una tavola.
- `SectionHead` — numero di tavola + etichetta + titolo.
- `Dimension` — linea di quota animata (decorativa, `aria-hidden`).
- `Lines` — titoli rivelati riga per riga da una maschera.
- `Picture` — `<picture>` AVIF/WebP responsive, lazy, colore medio come segnaposto.
- `Button` — pieno (rame), contorno, testuale; riempimento che sale come un livello.
- `ContactForm` — validazione accessibile, allegati con trascinamento.

## Movimento

- Ingresso dei contenuti allo scroll: righe dei titoli da maschera, immagini
  rivelate a sipario, quote che si tracciano.
- Microinterazioni: frecce che avanzano, sottolineature che partono dal
  centro come una quota, simbolo del centro foro che ruota sul logo.
- Nessuno scroll hijacking, nessun 3D, nessuna animazione continua.
- Un solo `IntersectionObserver` per tutto il sito; animazioni solo su
  `transform`, `opacity`, `clip-path`.
- `prefers-reduced-motion: reduce` → tutto visibile e fermo. Senza JS → tutto
  visibile.
