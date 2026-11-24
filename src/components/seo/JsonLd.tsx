import { site } from "@/lib/site";

/**
 * Dati strutturati Schema.org. Contiene solo informazioni verificate
 * (vedi docs/01-ricerca.md): niente fatturato, numero di dipendenti,
 * anno di fondazione o certificazioni non documentate.
 */
export function OrganizationJsonLd() {
  const c = site.contact;
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organizzazione`,
    name: site.name,
    legalName: c.legalName,
    url: `${site.url}/`,
    logo: `${site.url}/icon.svg`,
    description: site.description,
    ...(c.vat ? { vatID: c.vat } : {}),
    ...(c.email ? { email: c.email } : {}),
    ...(c.phone ? { telephone: c.phoneIntl } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: c.street,
      postalCode: c.postalCode,
      addressLocality: c.city,
      addressRegion: c.province,
      addressCountry: "IT",
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "Componenti metallici su misura",
      "Minuteria metallica",
      "Marcatura laser su metallo",
      "Componentistica per la subacquea",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
