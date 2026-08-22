"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const sectionHref = (hash: string) => pathname === "/" ? hash : `/${hash}`;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070a10] border-t border-white/5 pt-8 pb-5 sm:pt-9">
      <div className="container max-w-7xl mx-auto px-4 sm:px-5 md:px-8">
        <div className="mb-8 grid grid-cols-1 gap-7 md:mb-9 md:grid-cols-[1.25fr_1fr_1fr] lg:gap-12">
          <div>
            <Link href={sectionHref("#hero")} aria-label="Torna all'inizio" className="mb-3 inline-flex items-center">
              <Image
                src="/images/logoLungo.svg"
                alt="Principal S.I.L."
                width={1200}
                height={440}
                className="h-auto w-52 sm:w-56 object-contain object-left"
              />
            </Link>
            <p className="text-sm text-muted-foreground/80 max-w-xs leading-relaxed">
              Soluzioni digitali e assistenza informatica su misura, in presenza e da remoto.
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-white/70 mb-3">Navigazione</h3>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-2 text-sm">
              <li><Link href={sectionHref("#servizi")} className="text-muted-foreground hover:text-white transition-colors">Servizi</Link></li>
              <li><Link href={sectionHref("#presenza-remoto")} className="text-muted-foreground hover:text-white transition-colors">Dove opero</Link></li>
              <li><Link href={sectionHref("#come-funziona")} className="text-muted-foreground hover:text-white transition-colors">Come funziona</Link></li>
              <li><Link href={sectionHref("#siti-web")} className="text-muted-foreground hover:text-white transition-colors">Siti Web</Link></li>
              <li><Link href={sectionHref("#chi-sono")} className="text-muted-foreground hover:text-white transition-colors">Chi sono</Link></li>
              <li><Link href={sectionHref("#perche-principal")} className="text-muted-foreground hover:text-white transition-colors">Perché Principal</Link></li>
              <li><Link href={sectionHref("#faq")} className="text-muted-foreground hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href={sectionHref("#contatti")} className="text-muted-foreground hover:text-white transition-colors">Contatti</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-white/70 mb-3">Contatti</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:castellin.marco@gmail.com"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  castellin.marco@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+393452294306"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  345 229 4306
                </a>
              </li>
              <li className="text-muted-foreground">Biella e dintorni</li>
            </ul>
          </div>
        </div>

        <div className="pt-5 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex max-w-xl flex-col gap-1 text-center md:text-left">
            <p className="text-xs text-muted-foreground">
              © {currentYear} Principal S.I.L. Tutti i diritti riservati.
            </p>
            <p className="text-[11px] text-muted-foreground/60">
              Titolare Marco Castellin &middot; Principal S.I.L.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs md:justify-end">
            <Link href="/privacy-policy" className="text-muted-foreground hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="text-muted-foreground hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <Link href="/cookie-policy#preferenze-cookie" className="text-muted-foreground hover:text-white transition-colors">
              Preferenze cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
