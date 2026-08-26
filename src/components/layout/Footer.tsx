import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/site-config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070a10] border-t border-cyan-300/10 pt-8 pb-5 sm:pt-9">
      <div className="container max-w-7xl mx-auto px-4 sm:px-5 md:px-8">
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-6 md:mb-9 md:grid-cols-[1.25fr_1fr_1fr] lg:gap-12">
          <div className="border-b border-white/5 pb-6 sm:col-span-2 md:col-span-1 md:border-0 md:pb-0">
            <Link
              href="/#hero"
              aria-label="Torna all'inizio"
              className="mb-3 inline-flex items-center rounded-xl border border-blue-100/80 bg-gradient-to-br from-white via-slate-50 to-blue-100 px-3 py-2 shadow-[0_8px_28px_rgba(37,99,235,0.14)]"
            >
              <BrandLogo
                variant="long"
                className="h-auto w-52 sm:w-56 object-contain object-left"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-white/65">
              Soluzioni digitali e assistenza informatica su misura, in presenza e da remoto.
            </p>
          </div>
          
          <div className="rounded-2xl border border-white/5 bg-white/[0.025] p-4 md:rounded-none md:border-0 md:bg-transparent md:p-0">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Navigazione</h3>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-2.5 text-sm md:grid-cols-1 lg:grid-cols-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/80 transition-colors hover:text-cyan-200">
                    {"footerLabel" in item ? item.footerLabel : item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.025] p-4 md:rounded-none md:border-0 md:bg-transparent md:p-0">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sky-300">Contatti</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={SITE_CONFIG.contact.emailHref}
                  className="break-words text-white/80 transition-colors hover:text-cyan-200"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.contact.phoneHref}
                  className="text-white/80 transition-colors hover:text-cyan-200"
                >
                  {SITE_CONFIG.contact.phone}
                </a>
              </li>
              <li className="text-white/80">Biella e dintorni</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-5 md:flex-row">
          <div className="flex max-w-xl flex-col gap-1 text-center md:text-left">
            <p className="text-xs text-muted-foreground">
              © {currentYear} Principal S.I.L. Tutti i diritti riservati.
            </p>
            <p className="text-[11px] text-muted-foreground/60">
              Titolare {SITE_CONFIG.legalName}
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-2 text-center text-xs sm:flex sm:w-auto sm:flex-wrap sm:justify-center sm:gap-x-5 md:justify-end">
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
