import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Newsreader } from "next/font/google";
import { RevealObserver } from "@/components/RevealObserver";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { asset } from "@/lib/asset";
import { site } from "@/lib/site";
import "./globals.css";

// I font sono scaricati in fase di build e serviti dal sito stesso:
// nessuna richiesta a server di terze parti dal browser del visitatore.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Del Newsreader si usa solo il corsivo.
const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.defaultTitle,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: site.name,
    title: site.defaultTitle,
    description: site.description,
    url: "/",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Minuteria Facchini — Il pezzo che ancora non esiste" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: asset("/icon.svg"), type: "image/svg+xml" }],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f3f4f2",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="it"
      className={`no-js ${archivo.variable} ${newsreader.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Le animazioni di ingresso partono solo se JS è attivo. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.replace('no-js','js');" +
              // Rete di sicurezza: se il JavaScript non parte entro 2,5 s, si mostra tutto.
              "setTimeout(function(){if(!window.__reveal)document.documentElement.classList.add('reveal-all')},2500)",
          }}
        />
      </head>
      <body>
        <a href="#contenuto" className="skip-link">
          Vai al contenuto
        </a>
        <SiteHeader />
        <main id="contenuto" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
