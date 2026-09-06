"use client";

import { useState, useEffect, useRef, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const progressRef = useRef<HTMLDivElement>(null);
  const isScrolledRef = useRef(false);
  const activeSectionRef = useRef("");

  const handleSectionNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    selector: string
  ) => {
    const wasMobileMenuOpen = mobileMenuOpen;
    setMobileMenuOpen(false);

    if (!isHome) return;

    event.preventDefault();

    // Restituisce subito lo scroll alla pagina: menu e spostamento possono
    // completare insieme, senza una pausa blu prima della nuova sezione.
    if (wasMobileMenuOpen) document.body.style.overflow = "";

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

    scrollToTarget();
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
    const restorePageState = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      document.body.style.overflow = "";
      setMobileMenuOpen(false);
    };

    window.addEventListener("pageshow", restorePageState);
    return () => window.removeEventListener("pageshow", restorePageState);
  }, []);

  useEffect(() => {
    let animationFrame: number | null = null;
    const sections = NAV_ITEMS
      .map((link) => ({ ...link, element: document.querySelector(link.selector) }))
      .filter((item): item is typeof item & { element: Element } => Boolean(item.element));
    let sectionPositions: Array<{ href: string; top: number }> = [];

    const measureSections = () => {
      sectionPositions = sections.map((section) => ({
        href: section.href,
        top: section.element.getBoundingClientRect().top + window.scrollY,
      }));
    };

    const updateScrollState = () => {
      animationFrame = null;
      const nextIsScrolled = window.scrollY > 20;
      if (nextIsScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextIsScrolled;
        setIsScrolled(nextIsScrolled);
      }

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? Math.min(window.scrollY / scrollableHeight, 1) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      const threshold = window.scrollY + window.innerHeight * 0.4;
      let currentSection = "";
      for (const section of sectionPositions) {
        if (section.top > threshold) break;
        currentSection = section.href;
      }

      if (currentSection !== activeSectionRef.current) {
        activeSectionRef.current = currentSection;
        setActiveSection(currentSection);
      }
    };

    const handleScroll = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateScrollState);
      }
    };

    const handleResize = () => {
      measureSections();
      handleScroll();
    };

    const restoreScrollState = () => {
      measureSections();
      handleScroll();
    };

    measureSections();
    updateScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pageshow", restoreScrollState);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pageshow", restoreScrollState);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-2.5 border-b border-white/5" : "py-4 bg-transparent",
        isScrolled && !mobileMenuOpen && "glass"
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-5 md:px-8 flex items-center justify-between">
        {/* Logo corto nella navbar */}
        <Link
          href={isHome ? "#hero" : "/#hero"}
          aria-label="Torna all'inizio"
          onClick={(event) => handleSectionNavigation(event, "#hero")}
          className="z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100/80 bg-gradient-to-br from-white via-slate-50 to-blue-100 p-1 shadow-[0_6px_22px_rgba(37,99,235,0.2)]"
        >
          <BrandLogo
            loading="eager"
            className="h-9 object-contain"
            style={{ width: "auto" }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-5">
            {NAV_ITEMS.map((link) => (
              <li key={link.href}>
                <Link
                  href={isHome ? link.href.slice(1) : link.href}
                  onClick={(event) => handleSectionNavigation(event, link.selector)}
                  aria-current={activeSection === link.href ? "location" : undefined}
                  className={cn(
                    "relative py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-white",
                    activeSection === link.href && "text-white"
                  )}
                >
                  {link.label}
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
          inert={!mobileMenuOpen}
          className={cn(
            "fixed inset-0 z-40 flex flex-col items-center overflow-y-auto bg-background/95 px-5 pb-8 pt-24 backdrop-blur-xl transition-all duration-300 ease-in-out sm:justify-center sm:py-20",
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <ul className="mb-8 flex flex-col items-center gap-5 sm:mb-12 sm:gap-7">
            {NAV_ITEMS.map((link) => (
              <li key={link.href}>
                <Link
                  href={isHome ? link.href.slice(1) : link.href}
                  onClick={(event) => handleSectionNavigation(event, link.selector)}
                  aria-current={activeSection === link.href ? "location" : undefined}
                  className={cn(
                    "flex min-h-11 items-center px-4 text-xl font-semibold text-white/70 transition-colors hover:text-white sm:text-2xl",
                    activeSection === link.href && "text-cyan-300"
                  )}
                >
                  {link.label}
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
