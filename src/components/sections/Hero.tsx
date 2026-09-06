import { ArrowDown, ArrowRight, Globe2, MapPin, Monitor, Wifi } from "lucide-react";
import Link from "next/link";
import NetworkBackground from "@/components/3d/NetworkBackground";
import { Button } from "@/components/ui/button";

const coreServices = [
  { icon: Monitor, label: "Assistenza PC" },
  { icon: Wifi, label: "Wi-Fi e reti" },
  { icon: Globe2, label: "Siti web" },
];

export function Hero() {
  return (
    <section id="hero" className="hero-shell scroll-mt-24">
      <NetworkBackground />

      <div className="hero-layout">
        <div className="hero-copy">
          <p className="hero-reveal hero-reveal-1 hero-kicker">
            <span className="hero-kicker-line" aria-hidden="true" />
            <span className="hero-brand-name">
              <strong>Principal S.I.L.</strong>
              <small>System Integration Link</small>
            </span>
          </p>

          <h1 className="hero-reveal hero-reveal-2 hero-title">
            Synk your world.
            <span>Tecnologia che crea valore.</span>
          </h1>

          <p className="hero-reveal hero-reveal-3 hero-description">
            Principal S.I.L. integra assistenza informatica, infrastrutture di rete
            e soluzioni web su misura. Un approccio consulenziale, un unico referente
            e tecnologie progettate per evolvere insieme alle tue esigenze.
          </p>

          <div className="hero-reveal hero-reveal-4 hero-actions">
            <Button size="lg" className="group hero-action-button hero-primary-action" asChild>
              <Link href="#contatti">
                Richiedi una consulenza
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="glass" className="group hero-action-button hero-secondary-action" asChild>
              <Link href="#servizi">
                Esplora le soluzioni
                <ArrowDown className="h-4 w-4 shrink-0 transition-transform group-hover:translate-y-0.5" />
              </Link>
            </Button>
          </div>

        </div>

        <div className="hero-visual" aria-hidden="true" />
      </div>

      <ul className="hero-reveal hero-reveal-5 hero-service-list" aria-label="Servizi principali">
        {coreServices.map(({ icon: Icon, label }) => (
          <li key={label}>
            <span className="hero-service-icon"><Icon aria-hidden="true" /></span>
            {label}
          </li>
        ))}
      </ul>

      <div className="hero-availability hero-reveal hero-reveal-5">
        <span><MapPin /> A domicilio a Biella e provincia</span>
        <span><Globe2 /> Da remoto in tutta Italia</span>
      </div>
    </section>
  );
}
