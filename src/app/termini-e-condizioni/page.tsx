import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Termini e Condizioni | Principal S.I.L.",
  description: "Condizioni di utilizzo del sito e informazioni sulle richieste di assistenza e consulenza a Principal S.I.L.",
  alternates: { canonical: "/termini-e-condizioni" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="CONDIZIONI · CHIAREZZA"
      title="Termini e Condizioni"
      description="Le regole essenziali per utilizzare il sito e richiedere informazioni sui servizi di Principal S.I.L."
      version="1.0"
      lastUpdated="6 settembre 2026"
    >
      <section>
        <h2>1. Titolare del sito</h2>
        <p>Il sito <strong>principalsil.it</strong> è gestito da <strong>{SITE_CONFIG.legalName}</strong>, contattabile all’indirizzo <a href={SITE_CONFIG.contact.emailHref}>{SITE_CONFIG.contact.email}</a> o al numero <a href={SITE_CONFIG.contact.phoneHref}>{SITE_CONFIG.contact.phone}</a>.</p>
      </section>

      <section>
        <h2>2. Finalità e ambito</h2>
        <p>Il sito presenta servizi di assistenza informatica, infrastrutture di rete, consulenza digitale e realizzazione di siti web. I contenuti hanno finalità informative e consentono di inviare una richiesta di contatto o di preventivo.</p>
        <p>L’accesso e l’utilizzo del sito comportano l’accettazione delle presenti condizioni. Il trattamento dei dati personali è descritto nella <Link href="/privacy-policy">Privacy Policy</Link>; le tecnologie utilizzate dal browser sono indicate nella <Link href="/cookie-policy">Cookie Policy</Link>.</p>
      </section>

      <section>
        <h2>3. Richieste, preventivi e incarichi</h2>
        <p>L’invio di un modulo, di un’e-mail o di un messaggio WhatsApp non conclude automaticamente un contratto e non comporta obblighi di acquisto. La presa in carico di un’attività avviene solo dopo la definizione e l’accettazione delle condizioni specifiche applicabili al singolo intervento.</p>
        <p>Oggetto, costi, tempi, modalità operative, eventuali materiali, licenze e servizi di terzi vengono definiti nel preventivo o nell’accordo dedicato. Se il cliente è un consumatore, restano sempre applicabili i diritti inderogabili previsti dalla normativa vigente.</p>
      </section>

      <section>
        <h2>4. Uso corretto del sito</h2>
        <p>L’utente si impegna a utilizzare il sito in modo lecito e a non comprometterne sicurezza, disponibilità o funzionamento. Non è consentito trasmettere contenuti illeciti, ingannevoli, lesivi di diritti altrui o codice dannoso, né tentare accessi non autorizzati ai sistemi collegati.</p>
      </section>

      <section>
        <h2>5. Contenuti e proprietà intellettuale</h2>
        <p>Testi, marchi, loghi, elementi grafici, fotografie, illustrazioni, animazioni, codice e struttura del sito appartengono a Principal S.I.L. o sono utilizzati con idoneo titolo. È consentita la normale consultazione personale; riproduzione, modifica, distribuzione o uso commerciale richiedono preventiva autorizzazione, salvo quanto consentito dalla legge.</p>
      </section>

      <section>
        <h2>6. Informazioni, disponibilità e sicurezza</h2>
        <p>Le informazioni vengono curate e aggiornate con attenzione, ma possono contenere inesattezze o non riflettere immediatamente una variazione dei servizi. Il sito può essere temporaneamente sospeso per manutenzione, aggiornamenti, guasti o cause esterne.</p>
        <p>Nei limiti consentiti dalla legge, Principal S.I.L. non risponde di danni derivanti da usi impropri del sito, interruzioni non controllabili o decisioni prese sulla base di contenuti puramente informativi. Restano ferme le responsabilità che non possono essere escluse o limitate, incluse quelle derivanti da dolo o colpa grave.</p>
      </section>

      <section>
        <h2>7. Collegamenti e servizi esterni</h2>
        <p>Il sito può rimandare a servizi esterni, tra cui WhatsApp, FormSubmit e Principal Sites. Quando l’utente apre tali collegamenti si applicano condizioni e informative del rispettivo gestore. Principal S.I.L. non controlla disponibilità, sicurezza o contenuti di piattaforme terze.</p>
      </section>

      <section>
        <h2>8. Legge applicabile</h2>
        <p>Le presenti condizioni sono regolate dalla legge italiana. Per gli utenti qualificabili come consumatori restano competenti le autorità e il foro individuati dalle norme inderogabili a loro tutela; per ogni altro caso si applicano le ordinarie regole di competenza.</p>
      </section>

      <section>
        <h2>9. Aggiornamenti e contatti</h2>
        <p>Le condizioni possono essere aggiornate per riflettere modifiche del sito, dei servizi o della normativa. La versione pubblicata in questa pagina è quella applicabile alla consultazione corrente. Per chiarimenti scrivi a <a href={SITE_CONFIG.contact.emailHref}>{SITE_CONFIG.contact.email}</a>.</p>
      </section>
    </LegalPage>
  );
}
