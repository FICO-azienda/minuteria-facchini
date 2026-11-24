import { getImage, type ImageId } from "./Picture";

/**
 * Etichetta di provenienza sovrapposta all'immagine (il contenitore deve
 * essere position: relative). Distingue le foto illustrative da quelle
 * dell'archivio aziendale, come richiesto dalla brief.
 */
export function OriginTag({ id }: { id: ImageId }) {
  const img = getImage(id);
  return (
    <span className="img-tag" data-origin={img.origin}>
      {img.origin === "aziendale" ? "Archivio Facchini" : "Foto illustrativa"}
    </span>
  );
}
