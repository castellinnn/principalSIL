import { ArrowRight, ChevronDown, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import NetworkBackground from "@/components/3d/NetworkBackground";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[min(100svh,820px)] flex flex-col items-center justify-center overflow-hidden scroll-mt-24"
    >
      <NetworkBackground />

      <div className="container max-w-7xl mx-auto px-4 sm:px-5 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-10 relative z-30 flex-1 grid lg:grid-cols-[1.08fr_0.92fr] items-center gap-8 lg:gap-14 w-full">
        <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
          <div className="hero-reveal hero-reveal-1 inline-flex items-center gap-2.5 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-4 py-2 mb-4 sm:mb-5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
            </span>
            <span className="text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase text-cyan-100/80">
              Principal S.I.L.
            </span>
          </div>

          <h1 className="hero-reveal hero-reveal-2 text-[clamp(2.35rem,10.8vw,4.55rem)] font-extrabold tracking-[-0.05em] leading-[0.98] text-white mb-4 sm:mb-5">
            <span className="text-gradient-primary">Synk your world.</span>
            <span className="block mt-2 text-white">Tecnologia semplice.</span>
          </h1>

          <p className="hero-reveal hero-reveal-3 text-sm md:text-base text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-6 sm:mb-7">
            Assistenza informatica, reti e siti web progettati intorno alle tue esigenze.
            Un unico referente, risposte chiare e soluzioni che funzionano davvero.
          </p>

          <div className="hero-reveal hero-reveal-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <Button size="lg" className="group h-12 w-full px-8 sm:h-14 sm:w-auto" asChild>
              <Link href="#contatti" className="flex items-center whitespace-nowrap">
                Richiedi assistenza
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 shrink-0" />
              </Link>
            </Button>
            <Button size="lg" variant="glass" className="h-12 w-full px-8 sm:h-14 sm:w-auto" asChild>
              <Link href="#servizi" className="whitespace-nowrap">Scopri i servizi</Link>
            </Button>
          </div>

          <div className="hero-reveal hero-reveal-5 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-5 mt-5 sm:mt-6 text-[10px] md:text-[11px] text-white/45 tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-[#06B6D4]/60" />
              Biella e provincia
            </span>
            <span className="hidden sm:block w-px h-3 bg-white/10" />
            <span className="flex items-center gap-1.5">
              <Globe className="h-3 w-3 text-[#06B6D4]/60" />
              Da remoto in tutta Italia
            </span>
          </div>
        </div>

        <div className="hidden lg:block min-h-[470px]" aria-hidden="true" />
      </div>

      <div className="hero-reveal hero-reveal-5 relative z-30 pb-4 flex flex-col items-center gap-1.5">
        <div className="hero-scroll-indicator flex flex-col items-center gap-1.5">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/25">Scorri</span>
          <ChevronDown className="h-4 w-4 text-[#06B6D4]/50" />
        </div>
      </div>
    </section>
  );
}
