import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Pagina non trovata",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className={`wrap ${styles.box}`}>
      <p className="label">Errore 404</p>
      <h1 className={`display ${styles.title}`}>
        Questo pezzo <em>non è a disegno.</em>
      </h1>
      <p className="lede">La pagina che cerchi non esiste o è stata spostata.</p>
      <div className={styles.actions}>
        <Button href="/">Torna alla home</Button>
        <Button href="/contatti/" variant="ghost">
          Scrivici
        </Button>
      </div>
    </section>
  );
}
