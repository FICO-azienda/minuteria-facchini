# Minuteria Facchini — sito web

Sito istituzionale di **Minuteria Facchini** (Facchini Mario s.a.s.,
Olginate – LC): componenti metallici su misura.

- Produzione: <https://fico-azienda.github.io/minuteria-facchini/>
- Documenti di progetto: [`docs/`](docs/)
  - [`01-ricerca.md`](docs/01-ricerca.md) — informazioni confermate, da verificare, immagini, criticità
  - [`02-direzione-artistica.md`](docs/02-direzione-artistica.md) — concept, palette, tipografia, componenti
  - [`03-prima-della-pubblicazione.md`](docs/03-prima-della-pubblicazione.md) — cosa resta da confermare con il cliente

## Stack

| Scelta | Perché |
| --- | --- |
| **Next.js 16** (App Router) con `output: "export"` | Componenti React riutilizzabili e pagine generate in HTML statico: nessun server da mantenere, compatibile con GitHub Pages, ottimo per SEO e prestazioni. |
| **TypeScript** | Tipi sui contenuti (immagini, settori, fasi) e meno errori nelle modifiche future. |
| **CSS Modules** + variabili CSS | Un sistema di design leggibile (token in `src/app/globals.css`) senza dipendenze runtime. |
| **next/font** | Archivo, Newsreader e IBM Plex Mono scaricati in build e serviti dal sito: nessuna chiamata a Google dal browser. |
| **sharp** (solo in sviluppo) | Converte le foto in AVIF/WebP a più risoluzioni. |
| Animazioni in **CSS + un IntersectionObserver** | Nessuna libreria di animazione: peso minimo, rispetto di `prefers-reduced-motion`. |

## Sviluppo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # genera il sito statico in out/
npm run typecheck
npm run lint
```

## Immagini

Le immagini sorgente stanno in `assets-source/`:

- `archive/` — fotografie aziendali recuperate dal vecchio sito (Wayback Machine), con `MANIFEST.md`
- `stock/` — fotografie illustrative con licenza Unsplash/Pexels, con `CREDITS.md`
- `selection.json` — le immagini effettivamente usate dal sito, con testo alternativo, provenienza (`aziendale` / `illustrativa`) e crediti

Dopo aver modificato `selection.json`:

```bash
npm run images
```

Lo script genera i file in `public/images/<categoria>/` (AVIF + WebP, 480–2400 px,
mai oltre la risoluzione originale) e `src/content/images.generated.json`, che il
componente `<Picture>` usa per dimensioni, testo alternativo e colore di
caricamento. La pagina *Crediti immagini* si genera da qui.

**Per sostituire un'immagine illustrativa con una foto aziendale:** mettere il file
in `assets-source/azienda/`, aggiornare la voce in `selection.json` (`src`,
`origin: "aziendale"`, `credit`) e rilanciare `npm run images`.

## Modulo contatti

GitHub Pages ospita solo file statici, quindi il modulo invia i dati
(`multipart/form-data`, allegati compresi) a un servizio esterno indicato da una
variabile d'ambiente:

```
NEXT_PUBLIC_FORM_ENDPOINT=https://…
```

- Il valore è un **URL pubblico** (non una chiave segreta): va impostato su GitHub
  in *Settings → Secrets and variables → Actions → Variables* con nome
  `FORM_ENDPOINT`. Il workflow di deploy lo passa alla build.
- Servizi compatibili senza modifiche al codice (rispondono a `Accept: application/json`):
  **Formspree** (gli allegati richiedono un piano a pagamento), **Basin**,
  **Getform**, oppure una funzione serverless propria (Cloudflare Workers,
  Netlify Functions, Supabase Edge Functions) che valida i dati e li inoltra via email.
- Il servizio scelto deve: limitare dimensione e tipo degli allegati anche lato
  server, filtrare lo spam, conservare i dati in UE o con garanzie adeguate
  (va citato nell'informativa privacy).

**Finché l'endpoint non è configurato** il modulo valida comunque i campi e, all'invio,
prepara un'email già compilata verso l'indirizzo aziendale (l'allegato va aggiunto a
mano). Nessuna richiesta va persa, ma la soluzione definitiva è l'endpoint.

Validazioni lato browser: campi obbligatori, formato email, massimo 3 allegati da
10 MB ciascuno (PDF, DWG, DXF, STEP/STP, IGES/IGS, JPG, PNG, ZIP), consenso privacy
obbligatorio, campo nascosto anti-spam (honeypot).

## Deploy

Ogni push su `main` avvia `.github/workflows/deploy.yml`, che compila il sito e lo
pubblica su GitHub Pages. Le variabili usate in build:

| Variabile | Valore | Dove |
| --- | --- | --- |
| `NEXT_PUBLIC_BASE_PATH` | `/minuteria-facchini` | workflow (togliere con un dominio proprio) |
| `NEXT_PUBLIC_SITE_URL` | `https://fico-azienda.github.io/minuteria-facchini` | workflow (URL canonico, sitemap, Open Graph) |
| `NEXT_PUBLIC_FORM_ENDPOINT` | endpoint del modulo | variabile di repository `FORM_ENDPOINT` |

**Con un dominio proprio** (es. `www.minuteriafacchini.it`): aggiungere il dominio in
*Settings → Pages*, impostare `NEXT_PUBLIC_BASE_PATH` vuoto e `NEXT_PUBLIC_SITE_URL`
con il nuovo indirizzo.

## Privacy e cookie

Il sito non usa cookie, analytics né servizi di terze parti caricati nella pagina
(font locali, nessuna mappa incorporata: il link a Google Maps si apre a parte).
Per questo non serve un banner cookie. Se in futuro si aggiungono analytics o
mappe incorporate, serve un sistema di consenso prima di caricarli.
