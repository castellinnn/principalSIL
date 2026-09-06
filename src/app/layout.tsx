import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SiteLoader } from "@/components/layout/SiteLoader";
import { SITE_CONFIG } from "@/lib/site-config";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: "Principal S.I.L. | Assistenza Informatica Biella e Servizi da Remoto",
  description: SITE_CONFIG.description,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: SITE_CONFIG.logos.short.src,
  },
  openGraph: {
    title: "Principal S.I.L. | Synk your world",
    description: "Assistenza informatica a Biella e servizi digitali da remoto in tutta Italia.",
    url: "/",
    siteName: SITE_CONFIG.name,
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Principal S.I.L. — Synk your world",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Principal S.I.L. | Synk your world",
    description: "Assistenza informatica a Biella e servizi digitali da remoto in tutta Italia.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "telephone": SITE_CONFIG.contact.phoneInternational,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Biella",
      "addressRegion": "BI",
      "addressCountry": "IT"
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Biella e provincia"
      },
      {
        "@type": "Country",
        "name": "Italia"
      }
    ],
    "description": `${SITE_CONFIG.description} — ${SITE_CONFIG.name}, Synk your world.`
  };

  return (
    <html lang="it" className={`${montserrat.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var n=performance.getEntriesByType("navigation")[0];if(sessionStorage.getItem("principal-sil-ready")==="1"||n&&n.type==="back_forward")document.documentElement.dataset.skipSiteLoader="true"}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground" suppressHydrationWarning>
        <SiteLoader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
