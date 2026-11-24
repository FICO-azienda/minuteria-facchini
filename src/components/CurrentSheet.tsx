"use client";

import { usePathname } from "next/navigation";

const sheets: Record<string, string> = {
  "/": "00 · Home",
  "/azienda/": "01 · Azienda",
  "/competenze/": "02 · Competenze",
  "/settori/": "03 · Settori",
  "/approccio/": "04 · Approccio",
  "/contatti/": "05 · Contatti",
  "/privacy/": "A · Privacy",
  "/crediti-immagini/": "B · Crediti",
};

/** Nel cartiglio, il numero di tavola segue la pagina che si sta guardando. */
export function CurrentSheet() {
  const p = usePathname();
  const key = p.endsWith("/") ? p : `${p}/`;
  return <>{sheets[key] ?? "—"}</>;
}
