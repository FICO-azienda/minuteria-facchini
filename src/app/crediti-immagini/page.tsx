import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import images from "@/content/images.generated.json";

export const metadata: Metadata = {
  title: "Crediti immagini",
  description: "Provenienza e licenza delle fotografie usate sul sito di Minuteria Facchini.",
  alternates: { canonical: "/crediti-immagini/" },
  robots: { index: false, follow: true },
};

type Entry = { alt: string; origin: string; credit: string | null; sourceUrl: string | null };

export default function CreditsPage() {
  const entries = Object.entries(images as Record<string, Entry>);
  const authentic = entries.filter(([, e]) => e.origin === "aziendale");
  const illustrative = entries.filter(([, e]) => e.origin !== "aziendale");

  return (
    <LegalPage
      index="B"
      label="Crediti"
      title="Crediti immagini"
      intro={
        <p>
          Teniamo distinte le fotografie dell’azienda da quelle usate a scopo illustrativo: queste ultime raccontano
          lavorazioni e settori, non mostrano il nostro stabilimento né i nostri prodotti.
        </p>
      }
    >
      <h2>Fotografie aziendali ({authentic.length})</h2>
      <Table rows={authentic} />
      <h2>Fotografie illustrative ({illustrative.length})</h2>
      <Table rows={illustrative} />
    </LegalPage>
  );
}

function Table({ rows }: { rows: [string, Entry][] }) {
  if (!rows.length) return <p>Nessuna.</p>;
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Soggetto</th>
          <th scope="col">Autore / fonte</th>
          <th scope="col">Licenza</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([id, e]) => {
          const [author, license] = (e.credit ?? "—").split(" · ");
          return (
            <tr key={id}>
              <td>{e.alt}</td>
              <td>
                {e.sourceUrl ? (
                  <a href={e.sourceUrl} target="_blank" rel="noopener noreferrer">
                    {author}
                  </a>
                ) : (
                  author
                )}
              </td>
              <td>{license ?? "—"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
