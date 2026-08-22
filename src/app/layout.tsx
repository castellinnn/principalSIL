import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://principalsil.it"),
  title: "Principal S.I.L. | Assistenza Informatica Biella e Servizi da Remoto",
  description: "Assistenza informatica a domicilio a Biella e provincia. Servizi digitali, supporto software e realizzazione siti web da remoto in tutta Italia.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Principal S.I.L. | Synk your world",
    description: "Assistenza informatica a Biella e servizi digitali da remoto in tutta Italia.",
    url: "/",
    siteName: "Principal S.I.L.",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og.png",
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
    images: ["/og.png"],
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
    "name": "Principal S.I.L.",
    "url": "https://principalsil.it",
    "telephone": "+393452294306",
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
    "description": "Assistenza informatica a domicilio a Biella e provincia. Servizi digitali, supporto software e realizzazione siti web da remoto in tutta Italia. — Principal S.I.L., Synk your world."
  };

  return (
    <html lang="it" className={`${montserrat.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
