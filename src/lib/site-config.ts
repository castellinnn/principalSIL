export const SITE_CONFIG = {
  name: "Principal S.I.L.",
  legalName: "Marco Castellin · Principal S.I.L.",
  url: "https://principalsil.it",
  description:
    "Assistenza informatica a domicilio a Biella e provincia. Servizi digitali, supporto software e realizzazione siti web da remoto in tutta Italia.",
  contact: {
    email: "castellin.marco@gmail.com",
    emailHref: "mailto:castellin.marco@gmail.com",
    phone: "345 229 4306",
    phoneInternational: "+393452294306",
    phoneHref: "tel:+393452294306",
    whatsappHref: "https://wa.me/393452294306",
  },
  logos: {
    short: {
      src: "/images/logo-corto-originale.webp",
      width: 507,
      height: 492,
    },
    long: {
      src: "/images/logo-lungo-originale.webp",
      width: 650,
      height: 202,
    },
  },
} as const;

export const NAV_ITEMS = [
  { label: "Servizi", href: "/#servizi", selector: "#servizi" },
  { label: "Dove opero", href: "/#presenza-remoto", selector: "#presenza-remoto" },
  { label: "Come funziona", href: "/#come-funziona", selector: "#come-funziona" },
  { label: "Siti Web", href: "/#siti-web", selector: "#siti-web" },
  { label: "Chi sono", href: "/#chi-sono", selector: "#chi-sono" },
  { label: "Perché", footerLabel: "Perché Principal", href: "/#perche-principal", selector: "#perche-principal" },
  { label: "FAQ", href: "/#faq", selector: "#faq" },
  { label: "Contatti", href: "/#contatti", selector: "#contatti" },
] as const;
