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

GitHub Pages ospita solo file statici: il modulo è inviato a
**[FormSubmit](https://formsubmit.co)** (gratuito, nessun account) con un normale
POST `multipart/form-data`, il metodo che FormSubmit documenta per gli allegati.
Dopo l'invio FormSubmit rimanda a `/contatti/?inviato=1`, dove compare la conferma.

**Attivazione (una volta sola):**

1. Impostare su GitHub la variabile di repository `FORMSUBMIT_ID`
   (*Settings → Secrets and variables → Actions → Variables*) con l'indirizzo
   destinatario, es. `info@facchinimario.it`. Il workflow la passa alla build
   come `NEXT_PUBLIC_FORMSUBMIT_ID`. Rilanciare il deploy (*Actions → Deploy → Run workflow*).
2. Inviare una richiesta di prova dal sito pubblicato: FormSubmit manda una mail
   di attivazione al destinatario. Cliccare il link di conferma.
3. Nella mail di conferma FormSubmit fornisce anche un **alias casuale**:
   sostituire l'indirizzo nella variabile `FORMSUBMIT_ID` con l'alias, così
   l'email non compare nel codice della pagina. Rilanciare il deploy.

Campi speciali già impostati: `_subject` (con nome o azienda), `_template=table`,
`_captcha=false` (l'anti-spam è affidato al campo nascosto `_honey`), `_next`.
L'allegato si chiama `attachment`; i file trascinati nell'area di caricamento
vengono rimessi nel campo prima dell'invio.

Validazioni lato browser: campi obbligatori, formato email, massimo 3 allegati
e 10 MB in tutto (limite di FormSubmit, che inoltra i file via email), formati
PDF, DWG, DXF, STEP/STP, IGES/IGS, JPG, PNG, ZIP, consenso privacy obbligatorio.

**Finché `FORMSUBMIT_ID` non è impostata** il modulo valida comunque i campi e
prepara un'email già compilata verso l'indirizzo aziendale (l'allegato va
aggiunto a mano).

Per cambiare servizio (Formspree, funzione serverless propria…) basta
modificare `ACTION` e i campi nascosti in `src/components/contact/ContactForm.tsx`.

## Deploy

Ogni push su `main` avvia `.github/workflows/deploy.yml`, che compila il sito e lo
pubblica su GitHub Pages. Le variabili usate in build:

| Variabile | Valore | Dove |
| --- | --- | --- |
| `NEXT_PUBLIC_BASE_PATH` | `/minuteria-facchini` | workflow (togliere con un dominio proprio) |
| `NEXT_PUBLIC_SITE_URL` | `https://fico-azienda.github.io/minuteria-facchini` | workflow (URL canonico, sitemap, Open Graph) |
| `NEXT_PUBLIC_FORMSUBMIT_ID` | destinatario o alias FormSubmit | variabile di repository `FORMSUBMIT_ID` |

**Con un dominio proprio** (es. `www.minuteriafacchini.it`): aggiungere il dominio in
*Settings → Pages*, impostare `NEXT_PUBLIC_BASE_PATH` vuoto e `NEXT_PUBLIC_SITE_URL`
con il nuovo indirizzo.

## Privacy e cookie

Il sito non usa cookie, analytics né servizi di terze parti caricati nella pagina
(font locali, nessuna mappa incorporata: il link a Google Maps si apre a parte).
Per questo non serve un banner cookie. Se in futuro si aggiungono analytics o
mappe incorporate, serve un sistema di consenso prima di caricarli.
