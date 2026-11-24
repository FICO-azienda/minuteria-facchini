import { Fragment, type ReactNode } from "react";

/**
 * Titolo spezzato in righe esplicite: ogni riga sale da una maschera quando
 * entra nel viewport (vedi [data-reveal="lines"] in globals.css).
 * Le righe sono decise a mano per controllare l'impaginazione.
 */
export function Lines({ lines, delay = 0 }: { lines: ReactNode[]; delay?: number }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          <span className="line" style={{ ["--i" as string]: i, ["--delay" as string]: `${delay}ms` }}>
            <span>{line}</span>
          </span>
          {i < lines.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
