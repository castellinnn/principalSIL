"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

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
          new Promise<void>((resolve) => window.setTimeout(resolve, 650)),
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

    if (document.readyState === "complete") void finish();
    else window.addEventListener("load", finish, { once: true });

    const safetyTimer = window.setTimeout(() => void finish(), 1600);

    return () => {
      cancelled = true;
      window.removeEventListener("load", finish);
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
          <Image
            src="/images/logoCorto.svg"
            alt="Principal S.I.L."
            width={96}
            height={84}
            priority
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
