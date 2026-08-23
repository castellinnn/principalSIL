import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/site-config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070a10] border-t border-white/5 pt-8 pb-5 sm:pt-9">
      <div className="container max-w-7xl mx-auto px-4 sm:px-5 md:px-8">
        <div className="mb-8 grid grid-cols-1 gap-7 md:mb-9 md:grid-cols-[1.25fr_1fr_1fr] lg:gap-12">
          <div>
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
            <p className="text-sm text-muted-foreground/80 max-w-xs leading-relaxed">
              Soluzioni digitali e assistenza informatica su misura, in presenza e da remoto.
            </p>
          </div>
          
          <div>
            <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-white/70 mb-3">Navigazione</h3>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground transition-colors hover:text-white">
                    {"footerLabel" in item ? item.footerLabel : item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-white/70 mb-3">Contatti</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={SITE_CONFIG.contact.emailHref}
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.contact.phoneHref}
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  {SITE_CONFIG.contact.phone}
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
              Titolare {SITE_CONFIG.legalName}
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
