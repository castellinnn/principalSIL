import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { SITE_CONFIG } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cookie Policy | Principal S.I.L.",
  description: "Informazioni sui cookie e sulle tecnologie presenti nel sito Principal S.I.L.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="COOKIE · TRASPARENZA"
      title="Cookie Policy"
      description="Una fotografia concreta delle tecnologie presenti: niente categorie inventate e nessun consenso richiesto quando non serve."
      version="1.2"
      lastUpdated="6 settembre 2026"
    >
      <section>
        <h2>1. Situazione attuale</h2>
        <p>Al momento dell’audit, il codice del sito non imposta cookie e non integra strumenti di analytics, pubblicità, profilazione, mappe, video, social widget o chat di terze parti.</p>
        <p>Il sito utilizza esclusivamente una memoria tecnica di sessione per evitare di ripetere l’animazione introduttiva durante la stessa sessione di navigazione. Non serve a identificare l’utente, misurarne il comportamento o creare un profilo.</p>
        <p>Di conseguenza non viene mostrato un banner di consenso: non risultano categorie facoltative da accettare o rifiutare.</p>
      </section>

      <section>
        <h2>2. Tabella delle tecnologie rilevate</h2>
        <div className="legal-table-wrap">
          <table>
            <thead><tr><th>Nome</th><th>Tipo</th><th>Fornitore</th><th>Finalità</th><th>Durata</th></tr></thead>
            <tbody>
              <tr><td><code>principal-sil-ready</code></td><td>Session Storage tecnico</td><td>Principal S.I.L.</td><td>Evita di ripetere l’animazione introduttiva nella stessa sessione.</td><td>Sessione del browser</td></tr>
            </tbody>
          </table>
        </div>
        <p>Il sito è ospitato su <strong>Netlify</strong> e il dominio è registrato tramite <strong>Aruba</strong>. Il codice applicativo non aggiunge cookie propri né conserva dati persistenti nel browser.</p>
      </section>

      <section>
        <h2>3. Servizi esterni</h2>
        <p>Il form utilizza FormSubmit solo dopo un’azione esplicita di invio. WhatsApp e Principal Sites vengono contattati esclusivamente se l’utente apre i rispettivi collegamenti. Queste comunicazioni non installano cookie nella pagina corrente e non costituiscono strumenti di tracciamento incorporati.</p>
      </section>

      <section id="preferenze-cookie" className="scroll-mt-28">
        <h2>4. Preferenze cookie</h2>
        <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.045] p-5 sm:p-6">
          <p className="m-0 font-medium text-white">Nessuna preferenza facoltativa da gestire.</p>
          <p className="mb-0 mt-2">Non essendoci cookie o strumenti non necessari, non è presente un pannello separato per le preferenze. Se in futuro verranno aggiunti analytics, video incorporati, mappe, chat o strumenti pubblicitari, questa pagina e il sistema di consenso verranno aggiornati prima della loro attivazione.</p>
        </div>
      </section>

      <section>
        <h2>5. Come controllare il browser</h2>
        <p>Puoi comunque visualizzare, bloccare o cancellare cookie e dati dei siti dalle impostazioni del browser. Il blocco di tecnologie strettamente necessarie, se introdotte dal provider, potrebbe impedire il corretto funzionamento di alcune funzioni.</p>
      </section>

      <section>
        <h2>6. Contatti e aggiornamenti</h2>
        <p>Per domande scrivi a <a href={SITE_CONFIG.contact.emailHref}>{SITE_CONFIG.contact.email}</a>. Per informazioni più ampie sul trattamento dei dati consulta la <Link href="/privacy-policy">Privacy Policy</Link>.</p>
      </section>
    </LegalPage>
  );
}
