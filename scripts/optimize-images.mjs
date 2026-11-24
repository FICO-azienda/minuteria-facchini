// Converte le immagini selezionate in assets-source/ in AVIF + WebP responsive
// e genera src/content/images.generated.json (dimensioni, colore medio, alt,
// provenienza). Uso: npm run images
//
// La selezione vive in assets-source/selection.json:
// [{ "id": "storia/roberto", "src": "archive/roberto_300.jpg",
//    "alt": "...", "origin": "aziendale" | "illustrativa",
//    "credit": "...", "sourceUrl": "...", "focus": "50% 40%" }]
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "assets-source");
const outDir = path.join(root, "public", "images");
const manifestPath = path.join(root, "src", "content", "images.generated.json");

const WIDTHS = [480, 800, 1200, 1600, 2400];

const selection = JSON.parse(await fs.readFile(path.join(srcDir, "selection.json"), "utf8"));
const manifest = {};

for (const item of selection) {
  const input = path.join(srcDir, item.src);
  try {
    await fs.access(input);
  } catch {
    console.warn(`⚠ manca ${item.src} (${item.id}): saltata`);
    continue;
  }
  const base = sharp(input, { failOn: "none" }).rotate();
  const meta = await base.metadata();
  const crop = item.crop; // { left, top, width, height } in pixel sorgente, opzionale
  const pipelineFor = () => {
    let p = sharp(input, { failOn: "none" }).rotate();
    if (crop) p = p.extract(crop);
    return p;
  };
  const srcW = crop ? crop.width : meta.width;
  const srcH = crop ? crop.height : meta.height;
  // Mai oltre l'originale, mai oltre 2400 px.
  const widths = WIDTHS.filter((w) => w < srcW);
  if (srcW <= WIDTHS[WIDTHS.length - 1] && (!widths.length || srcW - widths[widths.length - 1] > 160)) widths.push(srcW);

  const dir = path.join(outDir, path.dirname(item.id));
  await fs.mkdir(dir, { recursive: true });
  const name = path.basename(item.id);

  // Le varianti già generate (e più recenti dell'originale) non si rifanno.
  const srcStat = await fs.stat(input);
  const fresh = async (f) => {
    try {
      return (await fs.stat(f)).mtimeMs > srcStat.mtimeMs && !process.env.FORCE;
    } catch {
      return false;
    }
  };

  for (const w of widths) {
    const avifPath = path.join(dir, `${name}-${w}.avif`);
    const webpPath = path.join(dir, `${name}-${w}.webp`);
    if ((await fresh(avifPath)) && (await fresh(webpPath))) continue;
    const resized = pipelineFor().resize({ width: w, withoutEnlargement: true });
    const grade = item.grade
      ? resized.modulate({ saturation: item.grade.saturation ?? 1, brightness: item.grade.brightness ?? 1 })
      : resized;
    await grade.clone().avif({ quality: 52, effort: 4 }).toFile(avifPath);
    await grade.clone().webp({ quality: 78, effort: 5 }).toFile(webpPath);
  }

  const { dominant } = await pipelineFor().stats();
  manifest[item.id] = {
    width: srcW,
    height: srcH,
    widths,
    color: `rgb(${dominant.r} ${dominant.g} ${dominant.b})`,
    alt: item.alt,
    origin: item.origin,
    credit: item.credit ?? null,
    sourceUrl: item.sourceUrl ?? null,
    focus: item.focus ?? "50% 50%",
  };
  console.log(`✓ ${item.id} ${srcW}×${srcH} → ${widths.join(", ")}`);
}

await fs.mkdir(path.dirname(manifestPath), { recursive: true });
await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${Object.keys(manifest).length} immagini → ${path.relative(root, manifestPath)}`);
