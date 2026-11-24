// Su GitHub Pages il sito vive sotto un sottopercorso: gli URL statici
// (immagini, file in /public) vanno prefissati a mano, next/link lo fa da sé.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(p: string): string {
  return `${basePath}${p.startsWith("/") ? p : `/${p}`}`;
}
