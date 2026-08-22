"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, AlertCircle, MapPin, Globe, X } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      surname: "",
      phone: "",
      company: "",
      service: "",
      modality: "",
      location: "",
      website: "",
    },
  });

  const selectedModality = useWatch({ control, name: "modality" });

  useEffect(() => {
    if (!submitStatus) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSubmitStatus(null);
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [submitStatus]);

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitErrorMessage("");

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: controller.signal,
        body: JSON.stringify(data),
      });

      const result = (await response.json().catch(() => null)) as { message?: string } | null;
      if (!response.ok) throw new Error(result?.message || "Invio non riuscito");

      setSubmitStatus("success");
      reset();
    } catch (error) {
      const timedOut = error instanceof DOMException && error.name === "AbortError";
      setSubmitErrorMessage(
        timedOut
          ? "La connessione sta impiegando troppo tempo. I dati sono ancora nel form: puoi chiudere questo messaggio e riprovare."
          : error instanceof Error && error.message
            ? `${error.message} I dati sono ancora nel form: riprova oppure contattami direttamente.`
            : "Il servizio non ha confermato l’invio. I dati sono ancora nel form: riprova oppure contattami direttamente."
      );
      setSubmitStatus("error");
    } finally {
      window.clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contatti" chapter="08" chapterLabel="Il prossimo passo" tone="cyan" className="relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080B12] via-[#0c111d] to-[#080B12] opacity-80 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="section-kicker mb-5">PARLIAMONE</div>
            <h2 className="section-title mb-6">
              Una soluzione chiara parte da qui.
            </h2>
            <p className="section-lead mb-8">
              Raccontami cosa non funziona o cosa vuoi realizzare. Ti risponderò con le domande giuste e un prossimo passo concreto.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-medium">Telefono</h4>
                  <a
                    href="tel:+393452294306"
                    className="inline-block text-muted-foreground mt-1 hover:text-white hover:underline underline-offset-4 transition-colors"
                  >
                    345 229 4306
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1 flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9(2-2) 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-medium">Email</h4>
                  <a
                    href="mailto:castellin.marco@gmail.com"
                    className="inline-block text-muted-foreground mt-1 hover:text-white hover:underline underline-offset-4 transition-colors break-all"
                  >
                    castellin.marco@gmail.com
                  </a>
                </div>
              </div>

              {/* Dove opero */}
              <div className="pt-6 border-t border-white/5">
                <h4 className="text-white font-semibold mb-3">Dove opero</h4>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#06B6D4]/70 shrink-0" />
                    <span><strong className="text-white">In presenza:</strong> Biella e comuni limitrofi</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-[#06B6D4]/70 shrink-0" />
                    <span><strong className="text-white">Da remoto:</strong> Tutta Italia</span>
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-2 leading-relaxed">
                    Per interventi tecnici che richiedono presenza fisica opero a Biella e nei comuni limitrofi. Per assistenza informatica, servizi digitali e progetti web compatibili con il lavoro online, posso lavorare da remoto in tutta Italia.
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Button asChild variant="outline" className="w-full sm:w-auto border-white/10 hover:bg-white/5 text-white">
                  <a href="https://wa.me/393452294306" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center whitespace-nowrap">
                    Scrivimi su WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="tech-panel p-5 sm:p-6 md:p-8 rounded-2xl shadow-2xl relative z-10">
              <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Non compilare questo campo</label>
                <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
              </div>

              <p className="mb-6 text-xs text-white/45"><span className="text-cyan-300">*</span> Campi obbligatori</p>
              <div className="mb-4 grid grid-cols-1 gap-4 md:mb-6 md:grid-cols-2 md:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">Nome <span className="text-cyan-300">*</span></label>
                  <input
                    id="name"
                    type="text"
                    required
                    autoComplete="given-name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    placeholder="Il tuo nome"
                  />
                  {errors.name && <p id="name-error" className="mt-2 text-sm text-red-400 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="surname" className="block text-sm font-medium text-white/80 mb-2">Cognome <span className="text-white/35">(opzionale)</span></label>
                  <input
                    id="surname"
                    type="text"
                    autoComplete="family-name"
                    {...register("surname")}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    placeholder="Il tuo cognome"
                  />
                  {errors.surname && <p className="mt-2 text-sm text-red-400 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>{errors.surname.message}</p>}
                </div>
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 md:mb-6 md:grid-cols-2 md:gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email <span className="text-cyan-300">*</span></label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    placeholder="La tua email"
                  />
                  {errors.email && <p id="email-error" className="mt-2 text-sm text-red-400 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">Telefono <span className="text-white/35">(opzionale)</span></label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    {...register("phone")}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    placeholder="Il tuo numero"
                  />
                  {errors.phone && <p className="mt-2 text-sm text-red-400 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>{errors.phone.message}</p>}
                </div>
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 md:mb-6 md:grid-cols-2 md:gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">Azienda <span className="text-white/35">(opzionale)</span></label>
                  <input
                    id="company"
                    type="text"
                    autoComplete="organization"
                    {...register("company")}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    placeholder="Nome azienda"
                  />
                  {errors.company && <p className="mt-2 text-sm text-red-400 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>{errors.company.message}</p>}
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-white/80 mb-2">Di cosa hai bisogno? <span className="text-cyan-300">*</span></label>
                  <select
                    id="service"
                    required
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={errors.service ? "service-error" : undefined}
                    {...register("service")}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="" disabled className="bg-[#111827] text-white">Seleziona un servizio...</option>
                    <option value="Assistenza PC" className="bg-[#111827] text-white">Assistenza PC</option>
                    <option value="Wi-Fi / Rete" className="bg-[#111827] text-white">Wi-Fi / Rete</option>
                    <option value="Sito Web" className="bg-[#111827] text-white">Sito Web</option>
                    <option value="Smartphone / Tablet" className="bg-[#111827] text-white">Smartphone / Tablet</option>
                    <option value="Smart TV" className="bg-[#111827] text-white">Smart TV</option>
                    <option value="Backup / Trasferimento dati" className="bg-[#111827] text-white">Backup / Trasferimento dati</option>
                    <option value="Dispositivi Smart" className="bg-[#111827] text-white">Dispositivi Smart</option>
                    <option value="Altro" className="bg-[#111827] text-white">Altro</option>
                  </select>
                  {errors.service && <p id="service-error" className="mt-2 text-sm text-red-400 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>{errors.service.message}</p>}
                </div>
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 md:mb-6 md:grid-cols-2 md:gap-6">
                <div>
                  <label htmlFor="modality" className="block text-sm font-medium text-white/80 mb-2">Modalità preferita <span className="text-cyan-300">*</span></label>
                  <select
                    id="modality"
                    required
                    aria-invalid={Boolean(errors.modality)}
                    aria-describedby={errors.modality ? "modality-error" : undefined}
                    {...register("modality")}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="" disabled className="bg-[#111827] text-white">Seleziona una modalità...</option>
                    <option value="In presenza" className="bg-[#111827] text-white">In presenza (Biella e limitrofi)</option>
                    <option value="Da remoto" className="bg-[#111827] text-white">Da remoto (Tutta Italia)</option>
                    <option value="Non so, consigliami tu" className="bg-[#111827] text-white">Non so, consigliami tu</option>
                  </select>
                  {errors.modality && <p id="modality-error" className="mt-2 text-sm text-red-400 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>{errors.modality.message}</p>}
                </div>
                
                <div>
                  {selectedModality !== "Da remoto" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label htmlFor="location" className="block text-sm font-medium text-white/80 mb-2">
                        Comune / Zona {selectedModality === "In presenza" ? "" : "(opzionale)"}
                      </label>
                      <input
                        id="location"
                        type="text"
                        {...register("location")}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                        placeholder="Es: Biella, Cossato..."
                      />
                    </motion.div>
                  )}
                </div>
              </div>

              {selectedModality === "Non so, consigliami tu" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20 text-cyan-400 text-xs leading-relaxed"
                >
                  Nessun problema. Descrivimi ciò di cui hai bisogno nel messaggio e valuterò la soluzione più adatta.
                </motion.div>
              )}

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">Descrizione del problema/progetto <span className="text-cyan-300">*</span></label>
                <textarea
                  id="message"
                  required
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  maxLength={3000}
                  {...register("message")}
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
                  placeholder="Descrivimi cosa vorresti realizzare o quale problema stai cercando di risolvere..."
                />
                {errors.message && <p id="message-error" className="mt-2 text-sm text-red-400 flex items-center"><AlertCircle className="h-3 w-3 mr-1"/>{errors.message.message}</p>}
              </div>

              <p className="mb-8 rounded-xl border border-white/8 bg-black/20 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                I dati inseriti saranno utilizzati per rispondere alla tua richiesta e, ove richiesto, predisporre un preventivo. Per maggiori informazioni consulta la{" "}
                <Link href="/privacy-policy" className="font-medium text-cyan-300 underline decoration-cyan-300/35 underline-offset-4 hover:text-cyan-200">
                  Privacy Policy
                </Link>.
              </p>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full relative overflow-hidden"
                disabled={isSubmitting}
              >
                <span className={cn("flex items-center justify-center whitespace-nowrap transition-all duration-300", isSubmitting ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0")}>
                  Richiedi preventivo
                  <Send className="ml-2 h-4 w-4" />
                </span>
                
                {isSubmitting && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {submitStatus && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-5 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setSubmitStatus(null)}
          >
            <div className="absolute inset-0 bg-[#03050a]/85 backdrop-blur-md" />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="form-result-title"
              aria-describedby="form-result-description"
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              onMouseDown={(event) => event.stopPropagation()}
              className="tech-panel relative max-h-[calc(100svh-2rem)] w-full max-w-md overflow-y-auto overflow-x-hidden rounded-3xl border border-white/10 p-6 text-center shadow-[0_30px_100px_rgba(0,0,0,0.65)] sm:p-7 md:p-9"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(6,182,212,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,.08) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div
                className={cn(
                  "pointer-events-none absolute left-1/2 top-0 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
                  submitStatus === "success" ? "bg-cyan-400/25" : "bg-red-500/20"
                )}
              />

              <button
                type="button"
                autoFocus
                aria-label="Chiudi messaggio"
                onClick={() => setSubmitStatus(null)}
                className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary/60"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative z-10">
                <div
                  className={cn(
                    "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border shadow-[0_0_40px_rgba(6,182,212,0.16)]",
                    submitStatus === "success"
                      ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                      : "border-red-400/30 bg-red-400/10 text-red-300"
                  )}
                >
                  {submitStatus === "success" ? (
                    <CheckCircle2 className="h-10 w-10" strokeWidth={1.7} />
                  ) : (
                    <AlertCircle className="h-10 w-10" strokeWidth={1.7} />
                  )}
                </div>

                <p
                  className={cn(
                    "mb-3 font-mono text-xs font-semibold tracking-[0.2em]",
                    submitStatus === "success" ? "text-cyan-300" : "text-red-300"
                  )}
                >
                  {submitStatus === "success" ? "INVIO COMPLETATO" : "INVIO NON RIUSCITO"}
                </p>
                <h3 id="form-result-title" className="mb-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  {submitStatus === "success"
                    ? "Richiesta inviata."
                    : "Qualcosa ha interrotto l’invio."}
                </h3>
                <p id="form-result-description" className="mb-7 text-sm leading-relaxed text-white/60 md:text-base">
                  {submitStatus === "success"
                    ? "Ho ricevuto le informazioni. Ti ricontatterò appena possibile con un primo riscontro concreto."
                    : submitErrorMessage}
                </p>

                {submitStatus === "success" ? (
                  <Button type="button" size="lg" className="w-full" onClick={() => setSubmitStatus(null)}>
                    Perfetto
                  </Button>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button type="button" size="lg" className="w-full" onClick={() => setSubmitStatus(null)}>
                      Torna al form
                    </Button>
                    <a
                      href="https://wa.me/393452294306"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/15 bg-white/5 px-5 text-sm font-medium text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/60"
                    >
                      Usa WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
