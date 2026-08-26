import { MapPin, Globe, CheckCircle2, ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const coverageNodes = [
  { x: 310, y: 190 },
  { x: 400, y: 225 },
  { x: 470, y: 235 },
  { x: 355, y: 305 },
  { x: 425, y: 350 },
  { x: 485, y: 420 },
  { x: 515, y: 495 },
  { x: 565, y: 555 },
  { x: 645, y: 615 },
  { x: 630, y: 625 },
  { x: 675, y: 675 },
  { x: 260, y: 620 },
  { x: 250, y: 690 },
  { x: 515, y: 880 },
  { x: 575, y: 895 },
];

export function PresenceRemote() {
  return (
    <Section id="presenza-remoto" chapter="02" chapterLabel="Dove e come lavoro" tone="cyan" className="relative overflow-clip">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <div
            className="section-kicker mb-5"
          >
            MODALITÀ DI LAVORO
          </div>
          <h2
            className="section-title mb-4"
          >
            Vicino quando serve. Ovunque quando basta una connessione.
          </h2>
          <p
            className="section-lead"
          >
            La modalità giusta in base a ciò di cui hai bisogno.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Cards Section */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {/* Card 1: In Presenza */}
            <div
              className="tech-panel p-5 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-r from-blue-900/10 via-transparent to-transparent transition-all duration-500 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-primary uppercase">IN PRESENZA</span>
                    <h3 className="content-title-accent mt-0.5 text-xl font-bold">Operatività Locale</h3>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary self-start sm:self-center">
                  Biella + comuni limitrofi
                </div>
              </div>

              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Operativo sul territorio a Biella e nei comuni limitrofi per assistenza hardware e configurazione di reti, dispositivi e accessori plug-and-play.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  "Assistenza PC a domicilio",
                  "Configurazione router, Wi-Fi e reti",
                  "Domotica e accessori plug-and-play",
                  "Videocamere IP plug-and-play",
                  "Supporto tecnico locale",
                  "Collegamento a reti e prese esistenti"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2.5 text-xs text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button size="default" className="w-full sm:w-auto group" asChild>
                <Link href="#contatti" className="flex items-center justify-center whitespace-nowrap">
                  Richiedi un intervento
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 shrink-0" />
                </Link>
              </Button>
            </div>

            {/* Card 2: Da Remoto */}
            <div
              className="tech-panel p-5 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-r from-cyan-900/10 via-transparent to-transparent transition-all duration-500 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">DA REMOTO</span>
                    <h3 className="content-title-accent mt-0.5 text-xl font-bold">Operatività Nazionale</h3>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 self-start sm:self-center">
                  Tutta Italia
                </div>
              </div>

              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Per tutti i servizi digitali o di supporto software gestibili via internet, con strumenti di teleassistenza avanzati e sicuri.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  "Assistenza software",
                  "Supporto informatico da remoto",
                  "Consulenza tecnica",
                  "Realizzazione siti web",
                  "Manutenzione e aggiornamento siti",
                  "Configurazioni da remoto compatibili"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2.5 text-xs text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button size="default" variant="glass" className="w-full sm:w-auto border-cyan-500/20 text-white hover:bg-cyan-500/10 group" asChild>
                <Link href="#contatti" className="flex items-center justify-center whitespace-nowrap">
                  Richiedi assistenza
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 shrink-0 text-cyan-400" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Interactive SVG Visual Section */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start flex justify-center items-center">
            <div
              className="relative w-full max-w-sm aspect-[4/5] tech-panel rounded-2xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden"
            >
              {/* Grid background effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              <div className="relative z-10 flex items-center w-full border-b border-white/5 pb-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Connessione Digitale</span>
              </div>

              {/* Minimal Italy Map Graphic */}
              <div className="relative w-full h-[280px] flex items-center justify-center my-6">
                <svg viewBox="0 0 1024 1024" className="w-full h-full text-white" fill="currentColor">
                  <image
                    href="/images/italy.svg"
                    width="1024"
                    height="1024"
                    className="italy-map-shape"
                  />
                  
                  <g className="text-primary">
                    <circle cx="210" cy="160" r="15" fill="#2563EB" />
                    <circle
                      cx="210"
                      cy="160"
                      r="40"
                      stroke="#2563EB"
                      strokeWidth="3"
                      fill="none"
                      className="map-hq-pulse"
                    />
                  </g>

                  {/* Le connessioni restano continue anche nei tratti che attraversano il mare. */}
                  {coverageNodes.map((pt, i) => (
                    <path
                      key={`line-${i}`}
                      d={`M 210,160 Q ${(210 + pt.x)/2 - 50} ${(160 + pt.y)/2 - 50} ${pt.x},${pt.y}`}
                      stroke="url(#gradient-line)"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.38"
                    />
                  ))}

                  <g>
                    {coverageNodes.map((pt, i) => (
                      <g key={`node-${i}`}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={i < 3 || i > 10 ? 6.5 : 5.5}
                          fill="#22D3EE"
                          opacity="0.9"
                          className="drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]"
                        />
                      </g>
                    ))}
                  </g>

                  {/* Gradient for lines */}
                  <defs>
                    <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Biella Pointer Label */}
                <div className="absolute top-[30px] left-[10px] bg-[#111827] border border-primary/30 px-2 py-0.5 rounded text-[10px] font-semibold text-white flex items-center gap-1 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  BIELLA (HQ)
                </div>
              </div>

              <div className="text-center pt-4 border-t border-white/5">
                <p className="text-xs text-muted-foreground italic">
                  &ldquo;Assistenza locale. Soluzioni digitali ovunque.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
