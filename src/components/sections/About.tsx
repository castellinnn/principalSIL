"use client";

import type { PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Section } from "@/components/layout/Section";
import Image from "next/image";

export function About() {
  const prefersReducedMotion = useReducedMotion();
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(7);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(45);
  const rawGlareOpacity = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, { stiffness: 170, damping: 22, mass: 0.7 });
  const rotateY = useSpring(rawRotateY, { stiffness: 170, damping: 22, mass: 0.7 });
  const glareOpacity = useSpring(rawGlareOpacity, { stiffness: 130, damping: 24 });
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.72) 0%, rgba(103,232,249,0.34) 11%, rgba(37,99,235,0.16) 24%, transparent 48%)`;

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width;
    const vertical = (event.clientY - bounds.top) / bounds.height;

    rawRotateY.set(7 + (0.5 - horizontal) * 12);
    rawRotateX.set((0.5 - vertical) * 9);
    glareX.set(horizontal * 100);
    glareY.set(vertical * 100);
  };

  const resetCard = () => {
    rawRotateX.set(0);
    rawRotateY.set(7);
    rawGlareOpacity.set(0);
  };

  return (
    <Section id="chi-sono" chapter="05" chapterLabel="Chi c’è dietro" tone="cyan" className="relative overflow-hidden">
      {/* Background dinamico */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="mx-auto w-[94%] max-w-md sm:w-full [perspective:1400px]">
            <motion.div
              onPointerEnter={() => !prefersReducedMotion && rawGlareOpacity.set(0.9)}
              onPointerMove={handlePointerMove}
              onPointerLeave={resetCard}
              whileHover={prefersReducedMotion ? undefined : { y: -7, scale: 1.025 }}
              transition={{ type: "spring", stiffness: 190, damping: 20 }}
              style={{
                rotateX: prefersReducedMotion ? 0 : rotateX,
                rotateY: prefersReducedMotion ? 0 : rotateY,
                transformStyle: "preserve-3d",
                transformOrigin: "right center",
              }}
              className="group relative aspect-[4/5] w-full cursor-default overflow-hidden rounded-[1.4rem] border border-cyan-300/15 bg-[#0b111c] shadow-[-20px_28px_80px_rgba(0,0,0,0.42),0_0_45px_rgba(6,182,212,0.08)] will-change-transform"
            >
              <Image
                src="/images/foto_profilo.webp"
                alt="Marco Castellin"
                fill
                sizes="(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1279px) 44vw, 448px"
                quality={75}
                className="absolute inset-0 h-full w-full scale-[1.12] object-cover object-[center_32%] opacity-90 transition-all duration-700 ease-out group-hover:scale-[1.17] group-hover:opacity-100"
              />

              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#080B12]/85 via-transparent to-[#2563EB]/10" />

              <div
                className="pointer-events-none absolute inset-0 z-20 opacity-[0.13] mix-blend-screen transition-opacity duration-500 group-hover:opacity-35"
                style={{
                  backgroundImage:
                    "linear-gradient(115deg, transparent 18%, rgba(37,99,235,.55) 34%, rgba(103,232,249,.75) 43%, rgba(255,255,255,.85) 50%, rgba(139,92,246,.5) 58%, transparent 74%)",
                  backgroundSize: "220% 220%",
                }}
              />

              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-30 mix-blend-screen"
                style={{ backgroundImage: glare, opacity: glareOpacity }}
              />

              <div
                className="pointer-events-none absolute bottom-5 right-5 z-40 flex h-[4.25rem] w-[4.75rem] items-center justify-center rounded-2xl border border-cyan-200/25 bg-[#080B12]/80 shadow-[0_12px_35px_rgba(0,0,0,0.42),0_0_24px_rgba(6,182,212,0.14)] backdrop-blur-md transition-all duration-500 group-hover:border-cyan-200/50 group-hover:shadow-[0_14px_38px_rgba(0,0,0,0.46),0_0_32px_rgba(6,182,212,0.24)]"
                style={{ transform: "translateZ(48px)" }}
                aria-hidden="true"
              >
                <Image
                  src="/images/logoCorto.svg"
                  alt=""
                  width={70}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>

              <div className="pointer-events-none absolute inset-0 z-40 rounded-[1.4rem] ring-1 ring-inset ring-white/15 transition-all duration-500 group-hover:ring-cyan-200/50 group-hover:shadow-[inset_-12px_0_30px_rgba(34,211,238,0.1)]" />
              <div className="pointer-events-none absolute inset-y-6 right-0 z-40 w-px bg-gradient-to-b from-transparent via-cyan-200/70 to-transparent opacity-65 shadow-[0_0_18px_rgba(103,232,249,0.55)]" />
            </motion.div>
          </div>
          
          {/* Decorazioni */}
          <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -top-6 -left-6 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -z-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="section-kicker mb-5"
          >
            CHI SONO
          </motion.div>

          <h2 className="section-title mb-6">
            Competenza tecnica, rapporto umano.
          </h2>
          
          <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              Sono Marco, il referente dietro Principal S.I.L. Aiuto privati e piccole attività a usare la tecnologia con più sicurezza, continuità e meno frustrazione.
            </p>
            <p>
              Dall&apos;assistenza hardware alle reti, fino allo sviluppo web: unisco competenze diverse per offrirti una soluzione completa, con un linguaggio chiaro e un interlocutore sempre riconoscibile.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="tech-panel rounded-xl p-4">
              <p className="text-lg font-bold text-white mb-1">Competenza</p>
              <p className="text-sm text-muted-foreground">Aggiornamento continuo</p>
            </div>
            <div className="tech-panel rounded-xl p-4">
              <p className="text-lg font-bold text-white mb-1">Disponibilità</p>
              <p className="text-sm text-muted-foreground">Supporto rapido e chiaro</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
