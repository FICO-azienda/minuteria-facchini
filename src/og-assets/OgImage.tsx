// Sorgente di public/og.png. Per rigenerarla: copiare questo file in
// src/app/opengraph-image.tsx, avviare npm run dev, salvare
// http://localhost:3000/opengraph-image come public/og.png e rimuovere la copia.
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// Immagine di anteprima per i social, generata in fase di build.
export const dynamic = "force-static";
export const alt = "Minuteria Facchini — Il pezzo che ancora non esiste";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const dir = path.join(process.cwd(), "src", "og-assets");
  const [archivo, newsreader, mono, hero] = await Promise.all([
    readFile(path.join(dir, "archivo-light.ttf")),
    readFile(path.join(dir, "newsreader-italic.ttf")),
    readFile(path.join(dir, "plexmono-medium.ttf")),
    readFile(path.join(dir, "hero.jpg")),
  ]);
  const heroSrc = `data:image/jpeg;base64,${hero.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#eee8dc", color: "#1b1e1b" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 60px", width: 680 }}>
          <div style={{ display: "flex", fontFamily: "Plex", fontSize: 17, letterSpacing: 3, color: "#5e584d" }}>
            <span style={{ color: "#a34825", marginRight: 16 }}>TAV. 00</span>MINUTERIA FACCHINI · OLGINATE (LC)
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Archivo", fontSize: 84, lineHeight: 1, letterSpacing: -3.5 }}>
            <span>Il pezzo che</span>
            <span style={{ display: "flex" }}>
              <span style={{ fontFamily: "Newsreader", color: "#a34825", marginRight: 22, letterSpacing: -2 }}>ancora</span>
              non
            </span>
            <span>esiste.</span>
          </div>
          <div style={{ display: "flex", fontFamily: "Plex", fontSize: 17, letterSpacing: 2, color: "#5e584d" }}>
            COMPONENTI METALLICI SU MISURA
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={heroSrc} width={520} height={630} alt="" style={{ objectFit: "cover" }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivo, weight: 300, style: "normal" },
        { name: "Newsreader", data: newsreader, weight: 400, style: "italic" },
        { name: "Plex", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
