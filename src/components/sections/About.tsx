"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { Section } from "@/components/layout/Section";
import Image from "next/image";

export function About() {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const lastFrameRef = useRef(0);
  const springRef = useRef({
    rotateX: 0,
    rotateY: 7,
    lift: 0,
    scale: 1,
    glare: 0,
    rotateXVelocity: 0,
    rotateYVelocity: 0,
    liftVelocity: 0,
    scaleVelocity: 0,
    glareVelocity: 0,
    targetRotateX: 0,
    targetRotateY: 7,
    targetLift: 0,
    targetScale: 1,
    targetGlare: 0,
  });

  const motionDisabled = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const runSpring = (timestamp: number) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;

    const state = springRef.current;
    const dt = Math.min((timestamp - (lastFrameRef.current || timestamp)) / 1000, 0.032);
    lastFrameRef.current = timestamp;

    const step = (
      value: number,
      velocity: number,
      target: number,
      stiffness: number,
      damping: number,
      mass = 1
    ) => {
      const acceleration = (-stiffness * (value - target) - damping * velocity) / mass;
      const nextVelocity = velocity + acceleration * dt;
      return [value + nextVelocity * dt, nextVelocity] as const;
    };

    [state.rotateX, state.rotateXVelocity] = step(state.rotateX, state.rotateXVelocity, state.targetRotateX, 170, 22, 0.7);
    [state.rotateY, state.rotateYVelocity] = step(state.rotateY, state.rotateYVelocity, state.targetRotateY, 170, 22, 0.7);
    [state.lift, state.liftVelocity] = step(state.lift, state.liftVelocity, state.targetLift, 190, 20);
    [state.scale, state.scaleVelocity] = step(state.scale, state.scaleVelocity, state.targetScale, 190, 20);
    [state.glare, state.glareVelocity] = step(state.glare, state.glareVelocity, state.targetGlare, 130, 24);

    card.style.transform = `translateY(${state.lift}px) scale(${state.scale}) rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg)`;
    glare.style.opacity = String(Math.max(0, Math.min(1, state.glare)));

    const moving =
      Math.abs(state.rotateX - state.targetRotateX) > 0.01 ||
      Math.abs(state.rotateY - state.targetRotateY) > 0.01 ||
      Math.abs(state.lift - state.targetLift) > 0.01 ||
      Math.abs(state.scale - state.targetScale) > 0.0001 ||
      Math.abs(state.glare - state.targetGlare) > 0.005;

    frameRef.current = moving ? window.requestAnimationFrame(runSpring) : null;
  };

  const startSpring = () => {
    if (frameRef.current === null) {
      lastFrameRef.current = 0;
      frameRef.current = window.requestAnimationFrame(runSpring);
    }
  };

  useEffect(() => () => {
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (motionDisabled() || event.pointerType === "touch") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width;
    const vertical = (event.clientY - bounds.top) / bounds.height;

    const state = springRef.current;
    state.targetRotateY = 7 + (0.5 - horizontal) * 12;
    state.targetRotateX = (0.5 - vertical) * 9;
    if (glareRef.current) {
      glareRef.current.style.backgroundImage = `radial-gradient(circle at ${horizontal * 100}% ${vertical * 100}%, rgba(255,255,255,0.72) 0%, rgba(103,232,249,0.34) 11%, rgba(37,99,235,0.16) 24%, transparent 48%)`;
    }
    startSpring();
  };

  const activateCard = () => {
    if (motionDisabled()) return;
    springRef.current.targetLift = -7;
    springRef.current.targetScale = 1.025;
    springRef.current.targetGlare = 0.9;
    startSpring();
  };

  const resetCard = () => {
    const state = springRef.current;
    state.targetRotateX = 0;
    state.targetRotateY = 7;
    state.targetLift = 0;
    state.targetScale = 1;
    state.targetGlare = 0;
    startSpring();
  };

  return (
    <Section id="chi-sono" chapter="05" chapterLabel="Chi c’è dietro" tone="cyan" className="relative overflow-hidden">
      {/* Background dinamico */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div
          data-reveal
          className="reveal-about-photo relative"
        >
          <div className="mx-auto w-[94%] max-w-md sm:w-full [perspective:1400px]">
            <div
              ref={cardRef}
              onPointerEnter={activateCard}
              onPointerMove={handlePointerMove}
              onPointerLeave={resetCard}
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "right center",
                transform: "rotateX(0deg) rotateY(7deg)",
              }}
              className="about-profile-card group relative aspect-[4/5] w-full cursor-default overflow-hidden rounded-[1.4rem] border border-cyan-300/15 bg-[#0b111c] shadow-[-20px_28px_80px_rgba(0,0,0,0.42),0_0_45px_rgba(6,182,212,0.08)] will-change-transform"
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

              <div
                ref={glareRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-30 mix-blend-screen"
                style={{
                  backgroundImage: "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.72) 0%, rgba(103,232,249,0.34) 11%, rgba(37,99,235,0.16) 24%, transparent 48%)",
                  opacity: 0,
                }}
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
            </div>
          </div>
          
          {/* Decorazioni */}
          <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -top-6 -left-6 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -z-10" />
        </div>

        <div
          data-reveal
          className="reveal-about-copy"
        >
          <div
            data-reveal
            className="reveal-about-kicker section-kicker mb-5"
          >
            CHI SONO
          </div>

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
        </div>
      </div>
    </Section>
  );
}
