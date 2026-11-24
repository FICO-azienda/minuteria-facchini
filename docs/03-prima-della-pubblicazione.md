# Prima della pubblicazione ufficiale

Il sito è completo e funzionante. Queste sono le cose da confermare o
configurare con il cliente prima di comunicarlo come sito ufficiale.

## Da configurare

- [ ] **Modulo contatti**: creare l'endpoint (es. Formspree con piano che
  supporta gli allegati, Basin, Getform o una funzione serverless) e impostare
  la variabile di repository `FORM_ENDPOINT`. Senza endpoint il modulo funziona
  in modalità ripiego: prepara una email già compilata. Vedi README.
- [ ] **Casella email**: verificare che info@facchinimario.it riceva ancora
  posta (il dominio ha i record MX attivi, ma la casella non è stata testata).
- [ ] **Dominio**: decidere se pubblicare il sito su facchinimario.it (oggi in
  errore) o su un dominio nuovo; poi aggiornare `NEXT_PUBLIC_SITE_URL` e
  `NEXT_PUBLIC_BASE_PATH` nel workflow.
- [ ] **Scheda Google Business**: rivendicarla, correggere la categoria
  («Saldatore»), aggiungere sito e orari.

## Da confermare con l'azienda

- [ ] Uso del nome **«Minuteria Facchini»** come marchio commerciale.
- [ ] **Storia**: anno e fondatore dell'attività; ruolo di Mario come inventore;
  elenco dei brevetti (abbiamo trovato solo il modello di utilità IT212007Z2 del
  1987, fascetta stringitubo).
- [ ] **Fiera di Miami**: nome e anno (probabilmente DEMA Show, Miami Beach 2003).
- [ ] **Lavorazioni e materiali** citati in *Competenze*: sono del 2011
  (taglio laser, tornitura e fresatura CNC, stampaggio a freddo di filo e
  lamiera, marcatura laser CNC; acciaio inox, alluminio, titanio). Sono ancora
  tutti attuali?
- [ ] **Colorazione**: come funziona, se è fatta in casa o con partner.
- [ ] **Settori neve, soccorso, difesa**: conferma e, se possibile, un esempio
  di applicazione pubblicabile senza nomi di clienti.
- [ ] **Quota di mercato**: non pubblicata. Se l'azienda ha documenti che la
  dimostrano (fatturati di settore, dichiarazioni di clienti), si può valutare
  una formulazione prudente.
- [ ] **Fotografie d'archivio**: conferma che sono di proprietà dell'azienda.
- [ ] **Ruolo di Giambattista Facchini** (citato nel 2011, non sul nuovo sito).
- [ ] **Orari** e modalità di visita.
- [ ] **Informativa privacy**: revisione da parte del consulente dell'azienda
  (servizio scelto per il modulo, tempi di conservazione).

## Da migliorare appena possibile

- [ ] **Servizio fotografico in azienda**: officina, macchine, mani al lavoro,
  pezzi finiti, Roberto. È l'intervento che più cambierebbe la percezione del
  sito: oggi le immagini grandi sono illustrative. Ogni foto nuova si inserisce
  aggiornando `assets-source/selection.json` (vedi README).
- [ ] **Logo vettoriale**: il sito usa un logotipo tipografico provvisorio
  (simbolo del centro foro + «Minuteria Facchini»). Il logo storico «FM —
  arts of manufactured steel» esiste solo a bassa risoluzione.
- [ ] Eventuale versione inglese, utile per i mercati esteri.
