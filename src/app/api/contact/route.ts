import { createHash } from "node:crypto";
import { contactFormSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const FORM_ENDPOINT = "https://formsubmit.co/ajax/castellin.marco@gmail.com";

type RateLimitEntry = { count: number; expiresAt: number };
const rateLimits = new Map<string, RateLimitEntry>();

function json(message: string, status: number) {
  return Response.json({ message }, { status });
}

function clientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = request.headers.get("cf-connecting-ip") ?? forwardedFor ?? "unknown";
  return createHash("sha256").update(address).digest("hex");
}

function isRateLimited(request: Request) {
  const now = Date.now();

  if (rateLimits.size > 500) {
    for (const [key, entry] of rateLimits) {
      if (entry.expiresAt <= now) rateLimits.delete(key);
    }
  }

  const key = clientKey(request);
  const current = rateLimits.get(key);

  if (!current || current.expiresAt <= now) {
    rateLimits.set(key, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function clean(value?: string) {
  if (!value) return "";
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F<>]/g, "").trim();
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return json("Richiesta non autorizzata.", 403);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json("Formato della richiesta non valido.", 415);
  }

  if (isRateLimited(request)) {
    return json("Hai effettuato troppi tentativi. Attendi qualche minuto e riprova.", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json("Dati del form non validi.", 400);
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return json("Controlla i campi evidenziati e riprova.", 400);
  }

  const data = parsed.data;

  if (data.website) {
    return json("Richiesta ricevuta.", 200);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
      signal: controller.signal,
      body: JSON.stringify({
        _subject: `Nuova richiesta dal sito — ${clean(data.service)}`,
        _template: "table",
        _honey: "",
        Nome: clean(data.name),
        Cognome: clean(data.surname) || "Non indicato",
        email: clean(data.email),
        Telefono: clean(data.phone) || "Non indicato",
        Azienda: clean(data.company) || "Non indicata",
        Servizio: clean(data.service),
        Modalità: clean(data.modality),
        "Comune / Zona": clean(data.location) || "Non indicata",
        Messaggio: clean(data.message),
      }),
    });

    const result = (await response.json().catch(() => null)) as {
      success?: boolean | string;
    } | null;

    if (!response.ok || result?.success === false || result?.success === "false") {
      return json("Il servizio di invio non ha confermato la richiesta.", 502);
    }

    return json("Richiesta inviata correttamente.", 200);
  } catch {
    return json("Il servizio di invio non è momentaneamente raggiungibile.", 502);
  } finally {
    clearTimeout(timeout);
  }
}
