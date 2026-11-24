import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Newsreader } from "next/font/google";
import { RevealObserver } from "@/components/RevealObserver";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import "./globals.css";

// I font sono scaricati in fase di build e serviti dal sito stesso:
// nessuna richiesta a server di terze parti dal browser del visitatore.
const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
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
    images: [{ url: "/og/og-default.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#eee8dc",
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
            __html: "document.documentElement.classList.replace('no-js','js')",
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
