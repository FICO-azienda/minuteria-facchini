// Dati del sito. Ogni recapito qui è verificato: la fonte è indicata in
// docs/01-ricerca.md. Ciò che manca resta vuoto (null) e non viene mostrato.

export const site = {
  name: "Minuteria Facchini",
  defaultTitle: "Minuteria Facchini — Componenti metallici su misura, Olginate (LC)",
  description:
    "Da quasi un secolo, a Olginate, sviluppiamo insieme ai clienti componenti metallici su misura: dalla subacquea allo sport, dalla sicurezza all'industria.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://fico-azienda.github.io/minuteria-facchini").replace(/\/$/, ""),
  contact: {
    // Ragione sociale e P.IVA: registro VIES della Commissione europea (verificato 24/11/2026).
    legalName: "Facchini Mario s.a.s. di Facchini Roberto & C.",
    street: "Via dell’Industria, 2",
    postalCode: "23854",
    city: "Olginate",
    province: "LC",
    country: "Italia",
    // Telefono ed email: vecchio sito ufficiale (2007–2025), PagineGialle, Google Maps.
    phone: "0341 682695" as string | null,
    phoneIntl: "+390341682695" as string | null,
    email: "info@facchinimario.it",
    vat: "IT02710880135" as string | null,
    geo: { lat: 45.7870165, lng: 9.422223 },
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Facchini+Mario+Sas+Via+dell%27Industria+2+23854+Olginate+LC",
  },
};

export const nav = [
  { href: "/azienda/", label: "Azienda", index: "01" },
  { href: "/competenze/", label: "Competenze", index: "02" },
  { href: "/settori/", label: "Settori", index: "03" },
  { href: "/approccio/", label: "Approccio", index: "04" },
] as const;

export const pages: { path: string; priority?: number }[] = [
  { path: "/" },
  { path: "/azienda/", priority: 0.8 },
  { path: "/competenze/", priority: 0.8 },
  { path: "/settori/", priority: 0.9 },
  { path: "/approccio/", priority: 0.8 },
  { path: "/contatti/", priority: 0.9 },
  { path: "/privacy/", priority: 0.2 },
  { path: "/crediti-immagini/", priority: 0.2 },
];
