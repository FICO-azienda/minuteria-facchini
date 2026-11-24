import type { Metadata } from "next";
import { site } from "./site";

const ogImage = { url: "/og.jpg", width: 1200, height: 630, alt: "Minuteria Facchini — Il pezzo che ancora non esiste" };

/**
 * Metadati di pagina completi: titolo, descrizione, canonical e Open Graph.
 * Next sostituisce (non fonde) l'oggetto openGraph del layout, quindi ogni
 * pagina lo riceve intero da qui.
 */
export function pageMeta({ title, description, path, index = true }: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: index ? undefined : { index: false, follow: true },
    openGraph: {
      type: "website",
      locale: "it_IT",
      siteName: site.name,
      title: `${title} — ${site.name}`,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: `${title} — ${site.name}`, description },
  };
}
