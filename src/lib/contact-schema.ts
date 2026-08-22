import * as z from "zod";

const optionalText = (max: number) =>
  z.string().trim().max(max, "Il testo inserito è troppo lungo").optional();

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Il nome è troppo corto").max(80, "Il nome è troppo lungo"),
  surname: optionalText(80),
  email: z.string().trim().email("Inserisci un'email valida").max(160, "L'email è troppo lunga"),
  phone: optionalText(30),
  company: optionalText(120),
  service: z.string().trim().min(1, "Seleziona un servizio").max(80),
  modality: z.string().trim().min(1, "Seleziona una modalità").max(80),
  location: optionalText(120),
  message: z
    .string()
    .trim()
    .min(10, "Il messaggio deve contenere almeno 10 caratteri")
    .max(3000, "Il messaggio non può superare 3000 caratteri"),
  website: optionalText(200),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
