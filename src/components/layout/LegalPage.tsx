import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  version: string;
  children: ReactNode;
};

export function LegalPage({ eyebrow, title, description, version, children }: LegalPageProps) {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden bg-[#080B12] pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_8%,rgba(6,182,212,0.10),transparent_30rem),radial-gradient(circle_at_10%_32%,rgba(37,99,235,0.08),transparent_28rem)]" />
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(34,211,238,.055)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.055)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />

        <div className="relative mx-auto w-full max-w-5xl px-5 pb-20 md:px-8 md:pb-28">
          <Link
            href="/#hero"
            className="mb-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 text-sm text-white/65 transition-colors hover:border-cyan-300/30 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna al sito
          </Link>

          <header className="tech-panel relative overflow-hidden rounded-3xl p-6 sm:p-9 md:p-12">
            <div className="absolute right-0 top-0 h-48 w-48 translate-x-1/3 -translate-y-1/3 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-2 text-[0.68rem] font-bold tracking-[0.16em] text-cyan-200">
                <ShieldCheck className="h-4 w-4" />
                {eyebrow}
              </div>
              <h1 className="max-w-3xl text-4xl font-bold leading-[1.02] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl">
                {title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300/75 sm:text-lg">{description}</p>
              <p className="mt-6 font-mono text-xs tracking-wide text-white/40">Ultimo aggiornamento: 22 agosto 2026 · Versione {version}</p>
            </div>
          </header>

          <article className="legal-copy mt-8">{children}</article>
        </div>
      </main>
      <Footer />
    </>
  );
}
