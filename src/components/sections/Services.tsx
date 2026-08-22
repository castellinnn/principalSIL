"use client";

import { motion } from "framer-motion";
import { Monitor, Wifi, Globe, Smartphone, HardDrive, Cpu, ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import Link from "next/link";

const services = [
  {
    icon: <Monitor className="h-6 w-6" />,
    title: "Assistenza PC",
    description: "Il computer torna veloce, stabile e pronto all'uso, senza perdere tempo in tentativi inutili.",
    gradient: "from-blue-500/10 via-transparent to-transparent",
    modality: "Presenza + Remoto",
  },
  {
    icon: <Wifi className="h-6 w-6" />,
    title: "Wi-Fi & Reti",
    description: "Copertura affidabile in ogni stanza, dispositivi connessi e una rete configurata come si deve.",
    gradient: "from-sky-500/10 via-transparent to-transparent",
    modality: "Presenza",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Siti Web",
    description: "Siti moderni e veloci che raccontano il tuo valore e trasformano visite in opportunità.",
    gradient: "from-indigo-500/10 via-transparent to-transparent",
    modality: "100% Remoto",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Dispositivi Smart",
    description: "Smart TV, smartphone, tablet e domotica configurati per funzionare insieme, senza stress.",
    gradient: "from-violet-500/10 via-transparent to-transparent",
    modality: "Presenza",
  },
  {
    icon: <HardDrive className="h-6 w-6" />,
    title: "Backup & Dati",
    description: "Dati trasferiti e protetti con backup chiari, automatici e realmente recuperabili.",
    gradient: "from-cyan-500/10 via-transparent to-transparent",
    modality: "Presenza + Remoto",
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "Soluzioni Tecnologiche",
    description: "Telecamere IP, dispositivi e strumenti digitali integrati in un sistema semplice da gestire.",
    gradient: "from-teal-500/10 via-transparent to-transparent",
    modality: "Presenza + Remoto",
  },
];

export function Services() {
  return (
    <Section id="servizi" chapter="01" chapterLabel="Cosa posso fare" tone="blue" className="relative overflow-hidden">
      {/* Sfondo dinamico */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] items-end gap-6 mb-12 md:mb-14">
          <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-kicker mb-5"
          >
            SERVIZI
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="section-title"
          >
            Tutto ciò che serve.<br />Niente di superfluo.
          </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-lead max-w-xl text-center lg:text-left lg:justify-self-end"
          >
            Dalla rete di casa alla presenza online della tua attività: soluzioni tecniche solide, spiegate con parole semplici e costruite intorno a te.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative tech-panel rounded-2xl p-5 sm:p-6 md:p-7 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-500">
                    {service.icon}
                  </div>
                  <span className="text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground group-hover:text-primary group-hover:border-primary/30 transition-all duration-300">
                    {service.modality}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                  {service.description}
                </p>

                <Link href="#contatti" className="inline-flex items-center text-sm font-medium text-cyan-300/70 group-hover:text-cyan-200 transition-colors cursor-pointer w-fit whitespace-nowrap">
                  Parliamone <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 shrink-0" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
