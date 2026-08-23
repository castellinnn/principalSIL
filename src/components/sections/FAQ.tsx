"use client";

import { useState, type CSSProperties } from "react";
import { Plus, Minus } from "lucide-react";
import { Section } from "@/components/layout/Section";

const faqs = [
  {
    question: "Quanto costa un intervento?",
    answer: "Il costo dipende dal tipo di lavoro e dalla sua complessità. Dopo aver compreso la tua richiesta durante il nostro primo contatto, ti fornirò sempre una stima o un preventivo chiaro prima di procedere.",
  },
  {
    question: "Lavori a domicilio?",
    answer: "Sì, offro interventi a domicilio a Biella e nei comuni limitrofi, previa disponibilità e appuntamento.",
  },
  {
    question: "Realizzi siti web personalizzati?",
    answer: "Assolutamente sì. Progetto e sviluppo siti web moderni, veloci e ottimizzati per convertire, curando ogni aspetto dal design alle performance tecniche.",
  },
  {
    question: "Posso spiegarti il problema anche se non conosco termini tecnici?",
    answer: "Certo! Il mio obiettivo è proprio semplificare la tecnologia. Spiegami il problema a parole tue e io mi occuperò di trovare la soluzione tecnica adeguata.",
  },
  {
    question: "Quanto tempo richiede la realizzazione di un sito web?",
    answer: "Dipende dalla complessità del progetto e dalle funzionalità richieste. In media, un sito vetrina professionale richiede dalle 2 alle 4 settimane. Dopo una valutazione iniziale, ti fornirò tempistiche realistiche e precise.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" chapter="07" chapterLabel="Prima di iniziare" tone="slate" className="relative overflow-hidden">
      {/* Sfondo dinamico */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-14">
          <div
            data-reveal
            className="reveal-faq-kicker section-kicker mb-5"
          >
            FAQ
          </div>
          <h2
            data-reveal
            className="reveal-faq-heading section-title mb-4"
          >
            Domande chiare. Risposte altrettanto chiare.
          </h2>
          <p
            data-reveal
            className="reveal-faq-lead section-lead"
          >
            Tutto quello che c&apos;è da sapere prima di iniziare.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              data-reveal
              style={{ "--reveal-delay": `${index * 0.08}s` } as CSSProperties}
              className="tech-panel rounded-xl overflow-hidden group transition-colors duration-300"
            >
              <button
                onClick={() => setOpenIndex((current) => current === index ? null : index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                aria-expanded={openIndex === index}
              >
                <span className="pr-3 text-base font-medium leading-snug text-white sm:pr-4 sm:text-lg">{faq.question}</span>
                <span className="ml-4 flex-shrink-0 text-muted-foreground">
                  {openIndex === index ? <Minus className="h-5 w-5 text-primary" /> : <Plus className="h-5 w-5" />}
                </span>
              </button>
              
              <div className={`faq-answer${openIndex === index ? " is-open" : ""}`} aria-hidden={openIndex !== index}>
                <div>
                    <div className="px-4 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pb-6 sm:text-base">
                      {faq.answer}
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
