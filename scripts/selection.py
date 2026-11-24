# Genera assets-source/selection.json dalla mappa qui sotto.
# Le foto stock ricavano fonte e licenza dal nome file; il fotografo viene
# letto da assets-source/stock/CREDITS.md quando disponibile.
import json, re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
src = root / "assets-source"

A = "aziendale"; S = "illustrativa"
ARCH = "Archivio Facchini · Vecchio sito aziendale (via Internet Archive)"

items = [
  # id, file, origin, alt, focus
  ("hero/pezzo", "stock/masters/stock_machined-part-on-technical-drawing_unsplash-SRqJ3eli-4I.jpg", S,
   "Un particolare metallico lavorato appoggiato sul proprio disegno tecnico", "44% 55%"),
  ("storia/roberto", "archive/roberto_300.jpg", A, "Roberto Facchini in barca, con il mare alle spalle", "50% 40%"),
  ("archivio/piastra-marcata", "archive/slide1.jpg", A,
   "Piastra in acciaio per l'attrezzatura subacquea, con la scritta facchinimario.it Made in Italy incisa al laser", "50% 50%"),
  ("archivio/piastra-acqua", "archive/slide5.jpg", A,
   "Piastra nera per l'attrezzatura subacquea, marcata facchinimario.it, immersa nell'acqua tra le bolle", "50% 50%"),
  ("archivio/anelli-colorati", "archive/slide2.jpg", A,
   "Anelli e maglie in filo metallico piegato, colorati in rosso e azzurro", "50% 50%"),
  ("archivio/anelli", "archive/minuterie_facchini_8585.jpg", A,
   "Anelli, maglie a D e triangoli in filo metallico, al naturale e colorati", "50% 50%"),
  ("archivio/anelli-nero", "archive/minuterie_facchini_8505.jpg", A,
   "Anelli e triangoli in filo d'acciaio piegato su fondo nero", "50% 50%"),
  ("archivio/sostegni-stoppino", "archive/cereria_facchini_8726.jpg", A,
   "Fermagli metallici per gli stoppini delle candele", "50% 50%"),
  ("archivio/carboncini", "archive/cereria_carboncini_e_bruciaincenso_499.jpg", A,
   "Confezioni di carboncini per turibolo e un bruciaincenso in metallo", "50% 50%"),
  ("archivio/marcatura", "archive/marcatura_650.jpg", A,
   "Dettaglio di una piastra metallica marcata al laser", "50% 50%"),
  ("lavorazioni/commissione", "stock/masters/stock_turned-bushings-rows_unsplash-C2S_2gmmQlw.jpg", S,
   "File ordinate di boccole metalliche tornite", "50% 50%"),
  ("lavorazioni/metallo", "stock/masters/stock_lathe-turning-steel-closeup_unsplash-xNDB0o4_m-Q.jpg", S,
   "Un pezzo d'acciaio in lavorazione sul tornio", "55% 50%"),
  ("lavorazioni/marcatura", "stock/masters/stock_laser-engraving-head-closeup_pexels-7254420.jpg", S,
   "Testa di una macchina di marcatura laser al lavoro", "50% 60%"),
  ("lavorazioni/colore", "stock/masters/stock_bronze-anodized-belay-rope_pexels-5916215.jpg", S,
   "Moschettone in metallo colorato bronzo con una corda verde", "50% 45%"),
  ("lavorazioni/sviluppo", "stock/masters/stock_technical-drawing-metal-ruler_pexels-38908429.jpg", S,
   "Disegno tecnico quotato con una riga metallica", "50% 50%"),
  ("lavorazioni/misura", "stock/masters/stock_caliper-on-lathe_pexels-16630111.jpg", S,
   "Un calibro appoggiato sul carrello di un tornio", "50% 50%"),
  ("lavorazioni/fresatura", "stock/masters/stock_cnc-milling-coolant-warm_unsplash-8MBTn3Z71zI.jpg", S,
   "Fresa a controllo numerico che lavora un pezzo d'alluminio", "50% 50%"),
  ("lavorazioni/taglio-laser", "stock/masters/stock_laser-cutting-sheet-sparks_unsplash-CxGLY283rWs.jpg", S,
   "Taglio laser di una lamiera", "50% 50%"),
  ("lavorazioni/officina", "stock/masters/stock_workshop-interior-lathe-window_pexels-27348514.jpg", S,
   "Interno di un'officina con un tornio vicino alla finestra", "50% 50%"),
  ("settori/subacquea", "stock/masters/stock_freediver-deep-blue-rays_unsplash-RTtUA2iBwRw.jpg", S,
   "Un apneista scende nel blu tra i raggi di luce", "50% 45%"),
  ("settori/subacquea-apnea", "stock/masters/stock_freediver-silhouette_unsplash-DT4S4fCze9s.jpg", S,
   "Sagoma di un apneista che risale verso la luce", "50% 40%"),
  ("settori/neve", "stock/masters/stock_alpine-ski-course-gates-aerial_pexels-39439688.jpg", S,
   "Tracciato di gara visto dall'alto, segnato dalle porte di slalom", "50% 50%"),
  ("settori/soccorso", "stock/masters/stock_fire-hoses-couplings-stowed_unsplash-OhipBwuII2I.jpg", S,
   "Manichette antincendio arrotolate con i raccordi metallici", "50% 50%"),
  ("settori/difesa", "stock/masters/stock_hands-caliper-measuring-metal_pexels-3621231.jpg", S,
   "Mani che controllano la misura di un pezzo metallico con il calibro", "50% 50%"),
  ("settori/cererie", "stock/masters/stock_church-candles-brass-holder_unsplash-WrL6kj_HVgo.jpg", S,
   "Candele accese su un candelabro in ottone", "50% 55%"),
  ("settori/industria", "stock/masters/stock_steel-springs-bw-macro_unsplash-MrjCNYLcTpQ.jpg", S,
   "Molle in filo d'acciaio in primo piano", "50% 50%"),
  ("luoghi/lecco", "stock/masters/stock_lecco-lakefront-mountain_unsplash-wSr2HkPlirs.jpg", S,
   "Il lungolago di Lecco e le montagne alle spalle", "50% 50%"),
  ("luoghi/lago", "stock/masters/stock_lecco-piani-erna-lake-view_unsplash-gerJ958P7mg.jpg", S,
   "Il lago di Lecco visto dai Piani d'Erna", "50% 50%"),
]

credits = {}
cpath = src / "stock" / "CREDITS.md"
if cpath.exists():
    for line in cpath.read_text().splitlines():
        m = re.search(r"(stock_[\w.-]+\.jpg)", line)
        if not m: continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        credits[m.group(1)] = cells

def stock_meta(fname):
    fname = pathlib.Path(fname).name
    m = re.search(r"_(unsplash|pexels)-([\w-]+)\.jpg$", fname)
    site, pid = m.group(1), m.group(2)
    if site == "unsplash":
        url, lic = f"https://unsplash.com/photos/{pid}", "Licenza Unsplash"
    else:
        url, lic = f"https://www.pexels.com/photo/{pid}/", "Licenza Pexels"
    author = None
    cells = credits.get(fname)
    if cells:
        for c in cells:
            if c and "stock_" not in c and "http" not in c and "icen" not in c.lower() and len(c) < 60 and not c.lower().startswith(("unsplash", "pexels")):
                author = re.sub(r"[\[\]*]", "", c); break
    who = f"{author} su {site.capitalize()}" if author else site.capitalize()
    return f"{who} · {lic}", url

out = []
for id_, f, origin, alt, focus in items:
    alt = alt.replace("'", "’")
    e = {"id": id_, "src": f, "alt": alt, "origin": origin, "focus": focus}
    if origin == A:
        e["credit"] = ARCH
        e["sourceUrl"] = "https://web.archive.org/web/2016*/facchinimario.it*"
    else:
        e["credit"], e["sourceUrl"] = stock_meta(pathlib.Path(f).name)
        e["grade"] = {"saturation": 0.86}
    out.append(e)
(src / "selection.json").write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n")
print(len(out), "voci;", len(credits), "crediti stock letti")
