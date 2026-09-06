import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Accessibilità | Principal S.I.L.",
  description: "Impegno, misure e canali di contatto per l’accessibilità del sito Principal S.I.L.",
  alternates: { canonical: "/accessibilita" },
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="ACCESSIBILITÀ · INCLUSIONE"
      title="Accessibilità"
      description="Un sito più chiaro e utilizzabile per persone, dispositivi e modalità di navigazione differenti."
      version="1.0"
      lastUpdated="6 settembre 2026"
    >
      <section>
        <h2>1. Impegno</h2>
        <p>Principal S.I.L. si impegna a rendere <strong>principalsil.it</strong> fruibile dal maggior numero possibile di persone. Il sito è progettato prendendo come riferimento le <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noreferrer">Web Content Accessibility Guidelines (WCAG) 2.2</a>, livello AA.</p>
        <p>Questa pagina descrive l’approccio adottato e non costituisce una certificazione formale di conformità o il risultato di un audit indipendente.</p>
      </section>

      <section>
        <h2>2. Misure adottate</h2>
        <ul>
          <li>struttura semantica, titoli ordinati e testi leggibili;</li>
          <li>navigazione utilizzabile da tastiera e indicatori di focus visibili;</li>
          <li>contrasto cromatico, spaziatura e dimensioni dei controlli pensati per la leggibilità;</li>
          <li>layout responsivo per smartphone, tablet e desktop;</li>
          <li>testi alternativi o etichette accessibili per immagini e controlli rilevanti;</li>
          <li>riduzione delle animazioni quando il dispositivo segnala la preferenza per un movimento ridotto.</li>
        </ul>
      </section>

      <section>
        <h2>3. Stato e limiti conosciuti</h2>
        <p>Il sito è sottoposto a verifiche interne e a miglioramenti progressivi. Alcune animazioni decorative e il modello grafico tridimensionale possono non offrire lo stesso livello di esperienza visiva con tecnologie assistive, ma non contengono informazioni indispensabili per comprendere i servizi o contattare l’azienda.</p>
        <p>I servizi esterni raggiungibili tramite collegamento, come WhatsApp, FormSubmit e Principal Sites, sono gestiti da terzi e possono avere caratteristiche di accessibilità indipendenti da questo sito.</p>
      </section>

      <section>
        <h2>4. Segnalare una difficoltà</h2>
        <p>Se incontri una barriera, un contenuto non comprensibile o una funzione difficile da utilizzare, scrivi a <a href={SITE_CONFIG.contact.emailHref}>{SITE_CONFIG.contact.email}</a> oppure chiama il <a href={SITE_CONFIG.contact.phoneHref}>{SITE_CONFIG.contact.phone}</a>.</p>
        <p>Per aiutarci a verificare il problema, indica se possibile la pagina interessata, la difficoltà riscontrata, il dispositivo, il browser e l’eventuale tecnologia assistiva utilizzata. La segnalazione verrà esaminata e riceverai riscontro appena possibile.</p>
      </section>

      <section>
        <h2>5. Miglioramento continuo</h2>
        <p>L’accessibilità viene considerata durante l’evoluzione dei contenuti e delle funzionalità. Questa pagina sarà aggiornata quando cambieranno il sito, le misure adottate o le criticità note.</p>
      </section>
    </LegalPage>
  );
}
