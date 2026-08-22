import { Section } from "@/components/layout/Section";
import { MessageSquare, Search, Handshake, Rocket, MessageCircleQuestion } from "lucide-react";

const steps = [
  {
    icon: <MessageSquare className="h-6 w-6" />,
    number: "01",
    title: "Raccontami",
    description: "Descrivi il problema o il progetto. Anche a parole tue, senza tecnicismi.",
    color: "from-blue-500/20 to-blue-600/5",
  },
  {
    icon: <Search className="h-6 w-6" />,
    number: "02",
    title: "Analizzo",
    description: "Studio la richiesta e ti propongo la soluzione più adatta ed efficiente.",
    color: "from-indigo-500/20 to-indigo-600/5",
  },
  {
    icon: <Handshake className="h-6 w-6" />,
    number: "03",
    title: "Concordiamo",
    description: "Definiamo insieme intervento, tempistiche e costi. Totale trasparenza.",
    color: "from-violet-500/20 to-violet-600/5",
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    number: "04",
    title: "Risolvo",
    description: "Realizzo il lavoro e ti consegno una soluzione funzionante e comprensibile.",
    color: "from-sky-500/20 to-sky-600/5",
  },
];

export function Process() {
  return (
    <Section id="come-funziona" chapter="03" chapterLabel="Come arriviamo alla soluzione" tone="indigo" className="relative overflow-hidden">
      {/* Background animato */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-14">
          <div
            className="section-kicker mb-5"
          >
            UN METODO CHIARO
          </div>
          <h2
            className="section-title mb-4"
          >
            Da ciò che racconti alla soluzione giusta.
          </h2>
          <p
            className="section-lead"
          >
            Un percorso trasparente, costruito sulle tue esigenze e spiegato senza gergo.
          </p>
        </div>

        <div
          className="relative mx-auto mb-12 flex max-w-4xl flex-col items-center gap-5 overflow-hidden rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.045] p-6 text-center md:flex-row md:p-7 md:text-left"
        >
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-cyan-300/80 to-transparent" />
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200 shadow-[0_0_30px_rgba(6,182,212,0.12)]">
            <MessageCircleQuestion className="h-6 w-6" />
          </div>
          <div>
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-200/70">
              Il punto di partenza
            </p>
            <p className="leading-relaxed text-white/65">
              <strong className="font-semibold text-white">Non devi conoscere il problema.</strong>{" "}
              Basta raccontarmi cosa succede: faccio io le domande giuste, individuo la causa e ti propongo una soluzione comprensibile prima di iniziare.
            </p>
          </div>
        </div>

        {/* Desktop: Cards orizzontali con connettori */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-6 relative">
            {/* Linea orizzontale di connessione */}
            <div className="absolute top-16 left-[12.5%] right-[12.5%] h-px z-0">
              <div
                className="w-full h-full bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-sky-500/40 origin-left"
              />
            </div>

            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group"
              >
                {/* Indicatore numerato */}
                <div className="relative z-10 w-12 h-12 mx-auto mb-8 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] group-hover:border-primary transition-all duration-500">
                  <span className="text-primary font-bold text-sm">{step.number}</span>
                </div>

                {/* Card */}
                <div className={`tech-panel p-6 rounded-2xl group-hover:-translate-y-1 transition-all duration-500 h-full bg-gradient-to-b ${step.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-primary">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Cards compatte */}
        <div className="md:hidden space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`tech-panel p-5 rounded-2xl flex items-start gap-4 bg-gradient-to-r ${step.color}`}
            >
              <div className="w-10 h-10 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <span className="text-primary font-bold text-xs">{step.number}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary">{step.icon}</span>
                  <h3 className="font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
