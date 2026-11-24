/**
 * Le quattro fasi sono una proposta narrativa del modo di lavorare
 * dell'azienda, non la descrizione di un processo certificato.
 */
export const phases = [
  {
    n: "01",
    verb: "Ascoltare",
    lead: "Comprendere l’esigenza e il contesto in cui il pezzo dovrà lavorare.",
    text: "Prima del componente ci interessa il suo lavoro: dove verrà montato, che sforzi subirà, che cosa non ha funzionato finora. Le domande giuste all’inizio evitano i problemi alla fine.",
    ask: ["A cosa serve il componente?", "In che ambiente lavora?", "Quante unità, entro quando?"],
  },
  {
    n: "02",
    verb: "Progettare",
    lead: "Individuare insieme la soluzione più adatta.",
    text: "Valutiamo con te materiale, forma, lavorazioni e finitura. Se esiste una strada più semplice o più robusta di quella che avevi in mente, te la proponiamo.",
    ask: ["Materiale e trattamenti", "Lavorazioni necessarie", "Marcatura e colore"],
  },
  {
    n: "03",
    verb: "Realizzare",
    lead: "Trasformare l’idea in un componente concreto.",
    text: "Il disegno diventa un pezzo vero, da tenere in mano e mettere alla prova. È il momento in cui un’idea smette di essere un’ipotesi.",
    ask: ["Primi pezzi", "Verifica delle quote", "Prova in uso"],
  },
  {
    n: "04",
    verb: "Perfezionare",
    lead: "Verificare il risultato e sviluppare eventuali miglioramenti.",
    text: "Controlliamo insieme come si comporta il componente. Se qualcosa si può fare meglio, lo rivediamo: è così che un buon pezzo diventa quello giusto.",
    ask: ["Riscontro del cliente", "Modifiche", "Produzione"],
  },
] as const;
