# Principal S.I.L.

Sito ufficiale di Principal S.I.L.: assistenza informatica a Biella e provincia, servizi digitali e realizzazione di siti web da remoto in tutta Italia.

## Avvio locale

Richiede Node.js 20.9 o successivo.

```bash
npm ci
npm run dev
```

Il sito sarà disponibile su [http://localhost:3000](http://localhost:3000).

## Verifica prima della pubblicazione

```bash
npm run lint
npm run build
```

## Pubblicazione su Netlify

1. Carica il progetto in un repository GitHub.
2. In Netlify scegli **Add new site → Import an existing project** e collega il repository.
3. Lascia il framework su **Next.js**, usa `npm run build` come comando di build e `.next` come directory di pubblicazione.
4. Pubblica il sito. Non sono richieste variabili d'ambiente.

Il form contatti usa una funzione server e FormSubmit. Al primo invio reale, FormSubmit può richiedere la conferma dell'indirizzo `castellin.marco@gmail.com`; è sufficiente completarla una volta.
