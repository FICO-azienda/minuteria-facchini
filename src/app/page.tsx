import type { Metadata } from "next";
import { Capabilities } from "@/components/home/Capabilities";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Method } from "@/components/home/Method";
import { Sectors } from "@/components/home/Sectors";
import { Story } from "@/components/home/Story";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Story />
      <Capabilities />
      <Sectors />
      <Method />
      <CtaBand
        title={[
          <>Hai un componente</>,
          <>
            <em>da realizzare?</em>
          </>,
        ]}
        text={
          <p>
            Mandaci un disegno, uno schizzo o anche solo due righe che descrivono il problema. Ne parliamo
            direttamente, senza intermediari, e ti diciamo come lo faremmo.
          </p>
        }
      />
    </>
  );
}
