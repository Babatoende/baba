# Ledger — Persoonlijk beleggingsdashboard

Een eenvoudige, statische website voor je eigen aandelen- en ETF-portfolio,
klaar om te hosten op GitHub Pages.

## Wat zit erin

- **Home (`index.html`)** — Beursnieuws uit live RSS-feeds (MarketWatch,
  CNBC, Dow Jones) plus een mini-tickerbalk met de koersen van je eigen
  posities.
- **Mijn portfolio (`portfolio.html`)** — Voeg aandelen/ETF's toe met
  ticker-symbool, aantal en aankoopprijs. De pagina toont:
  - de actuele koers (live, via Yahoo Finance)
  - je huidige waarde per positie
  - je resultaat van vandaag (in euro en %)
  - je totale winst/verlies sinds aankoop (in euro en %)
  - een totaaloverzicht boven de tabel (totale waarde, totale winst,
    winst vandaag, aantal posities)

Je gegevens worden opgeslagen in `localStorage` van je browser — er is geen
server of database nodig. **Let op:** dit betekent dat je portfolio per
apparaat/browser apart wordt opgeslagen.

## Lokaal bekijken

Open gewoon `index.html` in je browser, of start een kleine lokale server:

```bash
python3 -m http.server 8000
```

en ga naar `http://localhost:8000`.

## Hosten op GitHub Pages

1. Maak een nieuwe GitHub-repository (bv. `mijn-portfolio`).
2. Upload alle bestanden uit deze map (behoud de mapstructuur:
   `index.html`, `portfolio.html`, `css/`, `js/`).
3. Ga naar **Settings → Pages**.
4. Kies bij "Source" de branch `main` en map `/ (root)`.
5. Na een minuut is je site live op
   `https://<jouw-gebruikersnaam>.github.io/mijn-portfolio/`.

## Ticker-symbolen

Gebruik de symbolen zoals Yahoo Finance ze gebruikt:

| Wat | Symbool |
|---|---|
| Apple | `AAPL` |
| ASML (Euronext Amsterdam) | `ASML.AS` |
| Vanguard FTSE All-World ETF (Xetra) | `VWCE.DE` |
| iShares Core MSCI World ETF (Euronext A'dam) | `IWDA.AS` |
| KBC Groep (Euronext Brussel) | `KBC.BR` |

Je kunt het juiste symbool opzoeken op [finance.yahoo.com](https://finance.yahoo.com).

## Technische opmerkingen

- Koersdata komt via een gratis CORS-proxy (`corsproxy.io`) naar de
  Yahoo Finance API. Dit is een publieke, niet-gegarandeerde dienst — als
  koersen een keer niet laden, vernieuw de pagina dan na enkele seconden.
- Nieuws komt via `rss2json.com`, dat RSS-feeds omzet naar JSON zodat ze
  in de browser geladen kunnen worden.
- Geen build-stap, geen dependencies — puur HTML, CSS en vanilla JS.

## Uitbreiden

Ideeën om zelf verder uit te werken:
- Bewerken van bestaande posities (nu enkel toevoegen/verwijderen)
- Aandelenkoersgrafiek per positie
- Export/import van je portfolio als JSON-bestand (voor backups of een
  ander apparaat)
- Eigen valuta-instelling i.p.v. automatisch detecteren
