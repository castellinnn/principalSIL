import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy | Principal S.I.L.",
  description: "Informativa sul trattamento dei dati personali del sito Principal S.I.L.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="PRIVACY · GDPR"
      title="Privacy Policy"
      description="Questa informativa descrive in modo trasparente quali dati vengono trattati durante la navigazione e quando invii una richiesta dal sito."
      version="1.1"
    >
      <section>
        <h2>1. Titolare del trattamento</h2>
        <p><strong>Marco Castellin, operante con denominazione Principal S.I.L.</strong></p>
        <ul>
          <li>Email: <a href={SITE_CONFIG.contact.emailHref}>{SITE_CONFIG.contact.email}</a></li>
          <li>Telefono: <a href={SITE_CONFIG.contact.phoneHref}>{SITE_CONFIG.contact.phone}</a></li>
        </ul>
      </section>

      <section>
        <h2>2. Dati trattati durante la navigazione</h2>
        <p>I sistemi che rendono disponibile il sito possono trattare dati tecnici come indirizzo IP, data e ora della richiesta, pagina richiesta, tipo di browser, sistema operativo e informazioni diagnostiche o di sicurezza.</p>
        <p>Questi dati sono trattati per mostrare e proteggere il sito sulla base del legittimo interesse al corretto funzionamento e alla sicurezza, art. 6.1.f GDPR. Il sito è ospitato su <strong>Netlify</strong>; il dominio è registrato tramite <strong>Aruba</strong>.</p>
      </section>

      <section>
        <h2>3. Dati inviati tramite il form di contatto</h2>
        <p>Il form raccoglie nome, email, servizio richiesto, modalità preferita e messaggio. Cognome, telefono, azienda e località sono facoltativi. I dati sono forniti direttamente dall’interessato.</p>
        <p>I dati vengono utilizzati esclusivamente per rispondere, valutare l’intervento e predisporre un eventuale preventivo, sulla base delle misure precontrattuali richieste dall’interessato, art. 6.1.b GDPR. I campi contrassegnati con * sono necessari. I dati non vengono usati per newsletter o comunicazioni promozionali.</p>
      </section>

      <section>
        <h2>4. Destinatari e fornitori</h2>
        <p>I dati sono trattati dal titolare e dai soli fornitori necessari al funzionamento del sito:</p>
        <ul>
          <li><strong>FormSubmit</strong>, per recapitare via email i dati inseriti nel form; il servizio dichiara una conservazione fino a 30 giorni.</li>
          <li><strong>Netlify</strong>, per l’hosting del sito.</li>
          <li><strong>Aruba</strong>, per la registrazione e gestione del dominio.</li>
        </ul>
      </section>

      <section>
        <h2>5. Sicurezza</h2>
        <p>Il sito utilizza controlli tecnici essenziali per validare le richieste, limitare lo spam e proteggere il form.</p>
      </section>

      <section>
        <h2>6. Cookie e tecnologie simili</h2>
        <p>Il codice del sito non imposta cookie applicativi, non utilizza analytics, pixel pubblicitari, profilazione o archivi persistenti nel browser. Per il dettaglio consulta la <Link href="/cookie-policy">Cookie Policy</Link>.</p>
      </section>

      <section>
        <h2>7. Diritti dell’interessato</h2>
        <p>Nei casi previsti dal GDPR puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità dei dati e opposizione al trattamento. Puoi anche proporre reclamo al Garante per la protezione dei dati personali.</p>
        <p>Per esercitare i diritti scrivi a <a href={SITE_CONFIG.contact.emailHref}>{SITE_CONFIG.contact.email}</a>. Il titolare può chiedere informazioni necessarie a verificare l’identità del richiedente.</p>
      </section>

      <section>
        <h2>8. Decisioni automatizzate e profilazione</h2>
        <p>Il sito non effettua decisioni unicamente automatizzate, profilazione o monitoraggio comportamentale degli utenti.</p>
      </section>

      <section>
        <h2>9. Aggiornamenti</h2>
        <p>Questa informativa può essere aggiornata per riflettere cambiamenti tecnici, organizzativi o normativi. La data e la versione in alto permettono di identificare il testo vigente.</p>
      </section>
    </LegalPage>
  );
}
