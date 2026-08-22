"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const startedAt = performance.now();
    let hideTimer: number | undefined;
    let exitTimer: number | undefined;
    let cancelled = false;
    let finished = false;

    document.body.dataset.siteLoading = "true";

    const finish = async () => {
      if (cancelled || finished) return;
      finished = true;

      try {
        await document.fonts?.ready;
      } catch {
        // Il sito resta accessibile anche se un font remoto non risponde.
      }

      const minimumDisplay = Math.max(0, 420 - (performance.now() - startedAt));
      hideTimer = window.setTimeout(() => {
        if (cancelled) return;
        setLeaving(true);
        document.body.dataset.siteLoading = "false";
        exitTimer = window.setTimeout(() => !cancelled && setVisible(false), 420);
      }, minimumDisplay);
    };

    if (document.readyState === "complete") void finish();
    else window.addEventListener("load", finish, { once: true });

    const safetyTimer = window.setTimeout(() => void finish(), 2400);

    return () => {
      cancelled = true;
      window.removeEventListener("load", finish);
      if (hideTimer) window.clearTimeout(hideTimer);
      window.clearTimeout(safetyTimer);
      if (exitTimer) window.clearTimeout(exitTimer);
      document.body.dataset.siteLoading = "false";
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
