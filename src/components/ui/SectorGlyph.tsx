/**
 * Piccoli disegni al tratto, uno per settore, nello stile delle viste di un
 * disegno tecnico (linea continua per i contorni, tratto-punto per gli assi).
 * Disegnati per questo sito: niente set di icone standard.
 */
export type SectorKey = "subacquea" | "neve" | "soccorso" | "difesa" | "cererie" | "industria";

const AXIS = { strokeDasharray: "6 3 1.5 3", strokeWidth: 0.9 } as const;

export function SectorGlyph({ sector, className }: { sector: SectorKey; className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {sector === "subacquea" && (
        <>
          {/* Profilo di un fucile subacqueo: testata, fusto, asta */}
          <path d="M6 30h34v6H6z" />
          <path d="M40 31.5h18M40 34.5h14" />
          <path d="M12 36v8l5 2v-10" />
          <path d="M6 22c4-3 8 3 12 0s8 3 12 0 8 3 12 0 8 3 12 0" />
          <circle cx="50" cy="48" r="2" />
          <circle cx="44" cy="53" r="1.3" />
        </>
      )}
      {sector === "neve" && (
        <>
          {/* Paletto da slalom con snodo alla base */}
          <path d="M30 6h4v36h-4z" />
          <path d="M28 42h8l-1 6h-6z" />
          <circle cx="32" cy="45" r="1.4" />
          <path d="M29 48h6v10h-6z" />
          <path d="M18 58h28" />
          <path d="M32 2v60" {...AXIS} />
        </>
      )}
      {sector === "soccorso" && (
        <>
          {/* Raccordo per tubazioni, in sezione */}
          <path d="M8 24h14v16H8z" />
          <path d="M22 20h20v24H22z" />
          <path d="M42 26h14v12H42z" />
          <path d="M26 20v-4h12v4M26 44v4h12v-4" />
          <path d="M4 32h56" {...AXIS} />
        </>
      )}
      {sector === "difesa" && (
        <>
          {/* Fibbia con perno: un componente di equipaggiamento */}
          <rect x="12" y="18" width="40" height="28" rx="6" />
          <rect x="20" y="25" width="24" height="14" rx="3" />
          <path d="M32 12v40" {...AXIS} />
          <circle cx="32" cy="32" r="2" />
          <path d="M6 32h6M52 32h6" />
        </>
      )}
      {sector === "cererie" && (
        <>
          {/* Cero su piattino metallico */}
          <path d="M32 8c-3 4-3 7 0 9 3-2 3-5 0-9z" />
          <path d="M32 17v4" />
          <path d="M25 21h14v26H25z" />
          <path d="M18 47h28l-3 5H21z" />
          <path d="M27 52h10v4H27z" />
          <path d="M32 4v58" {...AXIS} />
        </>
      )}
      {sector === "industria" && (
        <>
          {/* Particolare tornito: boccola filettata, vista laterale */}
          <path d="M8 22h12v20H8z" />
          <path d="M20 26h28v12H20z" />
          <path d="M24 26v12M28 26v12M32 26v12M36 26v12M40 26v12M44 26v12" strokeWidth="0.8" />
          <path d="M48 28h8v8h-8z" />
          <path d="M4 32h56" {...AXIS} />
        </>
      )}
    </svg>
  );
}
