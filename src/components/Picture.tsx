import images from "@/content/images.generated.json";
import { asset } from "@/lib/asset";

export type ImageId = keyof typeof images;

type Entry = {
  width: number;
  height: number;
  widths: number[];
  color: string;
  alt: string;
  origin: "aziendale" | "illustrativa";
  credit: string | null;
  sourceUrl: string | null;
  focus: string;
};

export function getImage(id: ImageId): Entry {
  return images[id] as Entry;
}

type Props = {
  id: ImageId;
  /** Attributo sizes per la scelta della risoluzione. */
  sizes: string;
  alt?: string;
  className?: string;
  /** Immagini above-the-fold: niente lazy loading, priorità alta. */
  priority?: boolean;
  /** Riempie il contenitore (object-fit: cover) invece di seguire il proprio rapporto. */
  fill?: boolean;
  focus?: string;
};

export function Picture({ id, sizes, alt, className, priority, fill, focus }: Props) {
  const img = getImage(id);
  const srcSet = (ext: string) =>
    img.widths.map((w) => `${asset(`/images/${id}-${w}.${ext}`)} ${w}w`).join(", ");
  const fallback = asset(`/images/${id}-${img.widths[Math.min(1, img.widths.length - 1)]}.webp`);

  return (
    <picture className={className} style={{ backgroundColor: img.color }}>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={fallback}
        alt={alt ?? img.alt}
        width={img.width}
        height={img.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        style={
          fill
            ? { width: "100%", height: "100%", objectFit: "cover", objectPosition: focus ?? img.focus }
            : { width: "100%", height: "auto" }
        }
      />
    </picture>
  );
}
