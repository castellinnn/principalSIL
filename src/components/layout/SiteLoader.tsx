"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";

export function SiteLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!elements.length) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.01 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (root.dataset.skipSiteLoader === "true") {
      body.dataset.siteLoading = "false";
      const frame = window.requestAnimationFrame(() => setVisible(false));
      return () => window.cancelAnimationFrame(frame);
    }

    const startedAt = performance.now();
    let hideTimer: number | undefined;
    let exitTimer: number | undefined;
    let cancelled = false;
    let finished = false;

    body.dataset.siteLoading = "true";

    const rememberReady = () => {
      try {
        window.sessionStorage.setItem("principal-sil-ready", "1");
      } catch {
        // Il loader continua a funzionare anche con storage disabilitato.
      }
    };

    const restoreImmediately = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      root.dataset.skipSiteLoader = "true";
      rememberReady();
      body.dataset.siteLoading = "false";
      setLeaving(true);
      setVisible(false);
    };

    window.addEventListener("pageshow", restoreImmediately);

    const finish = async () => {
      if (cancelled || finished) return;
      finished = true;

      try {
        await Promise.race([
          document.fonts?.ready ?? Promise.resolve(),
          new Promise<void>((resolve) => window.setTimeout(resolve, 250)),
        ]);
      } catch {
        // Il sito resta accessibile anche se un font remoto non risponde.
      }

      const minimumDisplay = Math.max(0, 420 - (performance.now() - startedAt));
      hideTimer = window.setTimeout(() => {
        if (cancelled) return;
        rememberReady();
        setLeaving(true);
        body.dataset.siteLoading = "false";
        exitTimer = window.setTimeout(() => !cancelled && setVisible(false), 420);
      }, minimumDisplay);
    };

    const startWhenPainted = () => {
      window.requestAnimationFrame(() => window.requestAnimationFrame(() => void finish()));
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", startWhenPainted, { once: true });
    } else {
      startWhenPainted();
    }

    const safetyTimer = window.setTimeout(() => void finish(), 900);

    return () => {
      cancelled = true;
      document.removeEventListener("DOMContentLoaded", startWhenPainted);
      window.removeEventListener("pageshow", restoreImmediately);
      if (hideTimer) window.clearTimeout(hideTimer);
      window.clearTimeout(safetyTimer);
      if (exitTimer) window.clearTimeout(exitTimer);
      body.dataset.siteLoading = "false";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`site-loader${leaving ? " is-leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Caricamento del sito"
    >
      <div className="site-loader-glow" />
      <div className="site-loader-content">
        <div className="site-loader-logo-shell">
          <BrandLogo
            preload
            className="site-loader-logo"
          />
        </div>
        <p>PRINCIPAL S.I.L.</p>
        <div className="site-loader-track" aria-hidden="true"><span /></div>
        <span className="site-loader-label">Synk your world</span>
      </div>
    </div>
  );
}
