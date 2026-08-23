import { Section } from "@/components/layout/Section";
import { ShieldCheck, Zap, HeartHandshake } from "lucide-react";

const guarantees = [
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: "Massima Trasparenza",
    description: "Nessuna sorpresa. Ti spiego il problema chiaramente e concordo i costi prima di ogni intervento.",
    gradient: "from-blue-500/20 to-blue-600/5",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Interventi Rapidi",
    description: "Risolvo i tuoi problemi nel minor tempo possibile per rimettere in funzione la tua tecnologia senza stress.",
    gradient: "from-indigo-500/20 to-indigo-600/5",
  },
  {
    icon: <HeartHandshake className="h-8 w-8" />,
    title: "Supporto Umano",
    description: "Parlo la tua lingua, senza inutili tecnicismi. Mi assicuro che tu comprenda come usare al meglio le tue soluzioni.",
    gradient: "from-violet-500/20 to-violet-600/5",
  }
];

export function Testimonials() {
  return (
    <Section id="perche-principal" chapter="06" chapterLabel="Il mio modo di lavorare" tone="violet" className="relative overflow-hidden">
      {/* Background dinamico */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-14">
          <div
            className="section-kicker mb-5"
          >
            PERCHÉ PRINCIPAL S.I.L.
          </div>
          <h2
            className="section-title mb-4"
          >
            Tre promesse. In ogni intervento.
          </h2>
          <p
            className="section-lead"
          >
            Sai sempre cosa sto facendo, perché lo sto facendo e quale risultato aspettarti.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guarantees.map((item) => (
            <div
              key={item.title}
              className={`tech-panel p-7 rounded-2xl text-center flex flex-col items-center hover:-translate-y-1 transition-all duration-500 group bg-gradient-to-b ${item.gradient}`}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 text-primary group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-all duration-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
