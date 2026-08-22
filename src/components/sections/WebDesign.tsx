import { ArrowRight, ExternalLink, Layout, Zap, Smartphone, Search } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const features = [
  { icon: <Layout className="h-5 w-5" />, text: "Design su misura" },
  { icon: <Zap className="h-5 w-5" />, text: "Velocità estrema" },
  { icon: <Smartphone className="h-5 w-5" />, text: "100% Responsive" },
  { icon: <Search className="h-5 w-5" />, text: "Ottimizzato SEO" },
];

export function WebDesign() {
  return (
    <Section id="siti-web" chapter="04" chapterLabel="Progetti digitali" tone="blue" className="relative overflow-hidden">
      {/* Background con glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-900/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div
        >
          <div
            className="section-kicker mb-5"
          >
            WEB DESIGN
          </div>

          <h2 className="section-title mb-6">
            Un sito bello è solo l&apos;inizio. Deve portarti clienti.
          </h2>
          <p className="section-lead mb-8">
            Progetto esperienze veloci e credibili che fanno capire subito chi sei, cosa offri e perché scegliere te.
          </p>

          <ul className="grid grid-cols-2 gap-4 mb-10">
            {features.map((feature, i) => (
              <li
                key={i}
                className="flex items-center text-white/80"
              >
                <span className="text-primary mr-3 shrink-0">{feature.icon}</span>
                <span className="font-medium text-sm">{feature.text}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="group w-full sm:w-[230px]">
              <Link href="#contatti" className="flex items-center justify-center whitespace-nowrap">
                Richiedi un sito web
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 shrink-0" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="glass" className="group w-full sm:w-[230px]">
              <a
                href="https://dainty-bavarois-e5ed30.netlify.app/#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center whitespace-nowrap"
              >
                Visita Principal Sites
                <ExternalLink className="ml-2 h-4 w-4 shrink-0" />
              </a>
            </Button>
          </div>
        </div>

        {/* Mockups Visual */}
        <div
          className="relative h-[400px] sm:h-[450px] md:h-[500px] w-full"
        >
            {/* Mockup principale — cliccabile verso il sito reale */}
            <a
              href="https://dainty-bavarois-e5ed30.netlify.app/#"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-0 top-0 h-[305px] w-[94%] overflow-hidden rounded-2xl tech-panel shadow-2xl z-20 group transition-colors duration-500 hover:border-cyan-400/30 sm:h-[350px] sm:w-[92%] md:w-[86%]"
            >
              <div className="w-full h-8 bg-black/60 flex items-center px-4 gap-2 border-b border-white/10 absolute top-0 left-0 z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="text-[10px] text-white/40 ml-2 font-mono">www.principalsites.it</span>
                <ExternalLink className="ml-auto h-3 w-3 text-white/30 group-hover:text-[#06B6D4] transition-colors" />
              </div>
              <Image
                src="/images/principal-sites-preview.webp"
                alt="Principal Sites — Sito web esempio"
                fill
                sizes="(max-width: 1023px) 92vw, 43vw"
                quality={82}
                className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[2px]">
                <span className="flex items-center gap-2 text-white font-semibold text-sm bg-[#2563EB]/80 px-4 py-2 rounded-full">
                  Visita il sito <ExternalLink className="h-4 w-4" />
                </span>
              </div>
            </a>

          {/* Mockup secondario */}
          <div className="absolute bottom-0 left-0 z-10 h-[215px] w-[72%] overflow-hidden rounded-2xl tech-panel shadow-2xl sm:h-[250px] sm:w-[70%] md:h-[280px] md:w-3/4">
            <Image
              src="/images/data-analytics-dashboard.webp"
              alt="Dashboard di analisi dati su un computer portatile"
              fill
              sizes="(max-width: 1023px) 70vw, 32vw"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>

          {/* Decorazione glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10" />
        </div>
      </div>
    </Section>
  );
}
