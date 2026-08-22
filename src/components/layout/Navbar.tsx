"use client";

import { useState, useEffect, useRef, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Servizi", href: "/#servizi", selector: "#servizi" },
  { name: "Dove opero", href: "/#presenza-remoto", selector: "#presenza-remoto" },
  { name: "Come funziona", href: "/#come-funziona", selector: "#come-funziona" },
  { name: "Siti Web", href: "/#siti-web", selector: "#siti-web" },
  { name: "Chi sono", href: "/#chi-sono", selector: "#chi-sono" },
  { name: "Perché", href: "/#perche-principal", selector: "#perche-principal" },
  { name: "FAQ", href: "/#faq", selector: "#faq" },
  { name: "Contatti", href: "/#contatti", selector: "#contatti" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const progressRef = useRef<HTMLDivElement>(null);

  const handleSectionNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    selector: string
  ) => {
    setMobileMenuOpen(false);

    if (!isHome) return;

    event.preventDefault();

    const scrollToTarget = () => {
      if (selector === "#hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.querySelector(selector)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}${selector}`
      );
    };

    // Su mobile aspetta che l'overlay abbia restituito lo scroll alla pagina.
    window.setTimeout(scrollToTarget, mobileMenuOpen ? 320 : 0);
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    let animationFrame: number | null = null;
    const sections = navLinks
      .map((link) => ({ ...link, element: document.querySelector(link.selector) }))
      .filter((item) => item.element);

    const updateScrollState = () => {
      animationFrame = null;
      setIsScrolled(window.scrollY > 20);

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? Math.min(window.scrollY / scrollableHeight, 1) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      const threshold = window.innerHeight * 0.4;
      let currentSection = "";

      sections.forEach((section) => {
        if (section.element && section.element.getBoundingClientRect().top <= threshold) {
          currentSection = section.href;
        }
      });

      setActiveSection(currentSection);
    };

    const handleScroll = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateScrollState);
      }
    };

    updateScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-2.5 glass border-b border-white/5" : "py-4 bg-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-5 md:px-8 flex items-center justify-between">
        {/* Logo corto nella navbar */}
        <Link
          href={isHome ? "#hero" : "/#hero"}
          aria-label="Torna all'inizio"
          onClick={(event) => handleSectionNavigation(event, "#hero")}
          className="z-50 flex min-h-11 min-w-11 items-center"
        >
          <Image
            src="/images/logoCorto.svg"
            alt="Principal S.I.L."
            width={48}
            height={48}
            className="object-contain h-9 lg:h-10"
            style={{ width: "auto" }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-5">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={isHome ? link.href.slice(1) : link.href}
                  onClick={(event) => handleSectionNavigation(event, link.selector)}
                  aria-current={activeSection === link.href ? "location" : undefined}
                  className={cn(
                    "relative py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-white",
                    activeSection === link.href && "text-white"
                  )}
                >
                  {link.name}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-px origin-center bg-gradient-to-r from-primary to-cyan-400 transition-transform duration-300",
                      activeSection === link.href ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <div className="h-6 w-px bg-border"></div>
          <Button asChild variant={isScrolled ? "default" : "glass"}>
            <Link
              href={isHome ? "#contatti" : "/#contatti"}
              onClick={(event) => handleSectionNavigation(event, "#contatti")}
            >
              Richiedi un preventivo
            </Link>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="z-50 flex h-11 w-11 items-center justify-center rounded-xl text-white transition-colors hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary/60 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Chiudi menu" : "Apri menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div
          id="mobile-navigation"
          aria-hidden={!mobileMenuOpen}
          className={cn(
            "fixed inset-0 z-40 flex flex-col items-center overflow-y-auto bg-background/95 px-5 pb-8 pt-24 backdrop-blur-xl transition-all duration-300 ease-in-out sm:justify-center sm:py-20",
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <ul className="mb-8 flex flex-col items-center gap-5 sm:mb-12 sm:gap-7">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={isHome ? link.href.slice(1) : link.href}
                  onClick={(event) => handleSectionNavigation(event, link.selector)}
                  aria-current={activeSection === link.href ? "location" : undefined}
                  className={cn(
                    "flex min-h-11 items-center px-4 text-xl font-semibold text-white/70 transition-colors hover:text-white sm:text-2xl",
                    activeSection === link.href && "text-cyan-300"
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="w-full max-w-xs">
            <Link
              href={isHome ? "#contatti" : "/#contatti"}
              onClick={(event) => handleSectionNavigation(event, "#contatti")}
            >
              Richiedi un preventivo
            </Link>
          </Button>
        </div>
      </div>
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-cyan-400 to-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.45)] will-change-transform"
      />
    </header>
  );
}
